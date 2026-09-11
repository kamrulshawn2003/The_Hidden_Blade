/* ===== 小游戏 4：证据板 I (Evidence Board I) — 关系连接拼图 =====
   在 Scene 17 触发。将证据卡拖上调查板并建立正确关联。 */
window.MiniGame4 = (function(){
  const t = (k)=> MGCommon.t(k);

  const CATS = [
    { cat:'people', labelKey:'mg4.people' },
    { cat:'companies', labelKey:'mg4.companies' },
    { cat:'events', labelKey:'mg4.events' },
    { cat:'locations', labelKey:'mg4.locations' },
    { cat:'vehicles', labelKey:'mg4.vehicles' },
    { cat:'documents', labelKey:'mg4.documents' }
  ];

  const CARD_DEFS = [
    { id:'linyu',      cat:'people',    titleKey:'mg4.card.linyu.title',      descKey:'mg4.card.linyu.desc' },
    { id:'drhe',       cat:'people',    titleKey:'mg4.card.drhe.title',       descKey:'mg4.card.drhe.desc' },
    { id:'sulan',      cat:'people',    titleKey:'mg4.card.sulan.title',      descKey:'mg4.card.sulan.desc' },
    { id:'guchen',     cat:'people',    titleKey:'mg4.card.guchen.title',     descKey:'mg4.card.guchen.desc' },
    { id:'victor',     cat:'people',    titleKey:'mg4.card.victor.title',     descKey:'mg4.card.victor.desc' },
    { id:'loren',      cat:'companies', titleKey:'mg4.card.loren.title',      descKey:'mg4.card.loren.desc' },
    { id:'kidnap',     cat:'events',    titleKey:'mg4.card.kidnap.title',     descKey:'mg4.card.kidnap.desc' },
    { id:'homecoming', cat:'events',    titleKey:'mg4.card.homecoming.title', descKey:'mg4.card.homecoming.desc' },
    { id:'school',     cat:'locations', titleKey:'mg4.card.school.title',     descKey:'mg4.card.school.desc' },
    { id:'warehouse',  cat:'locations', titleKey:'mg4.card.warehouse.title',  descKey:'mg4.card.warehouse.desc' },
    { id:'mirror',     cat:'locations', titleKey:'mg4.card.mirror.title',     descKey:'mg4.card.mirror.desc' },
    { id:'van',        cat:'vehicles',  titleKey:'mg4.card.van.title',        descKey:'mg4.card.van.desc' },
    { id:'cctv',       cat:'documents', titleKey:'mg4.card.cctv.title',        descKey:'mg4.card.cctv.desc' },
    { id:'logistics',  cat:'documents', titleKey:'mg4.card.logistics.title',   descKey:'mg4.card.logistics.desc' },
    { id:'vehrec',     cat:'documents', titleKey:'mg4.card.vehrec.title',      descKey:'mg4.card.vehrec.desc' },
    { id:'phonerec',   cat:'documents', titleKey:'mg4.card.phonerec.title',    descKey:'mg4.card.phonerec.desc' },
    { id:'warehouselog',cat:'documents',titleKey:'mg4.card.warehouselog.title',descKey:'mg4.card.warehouselog.desc' }
  ];

  /* 关键关联（完美板必须全部命中） */
  const KEY_PAIRS = [
    ['cctv','school'], ['vehrec','warehouse'], ['logistics','loren'],
    ['drhe','mirror'], ['victor','loren'], ['loren','mirror'],
    ['homecoming','mirror'], ['linyu','kidnap']
  ].map(p=> p.sort().join('|'));

  /* 额外成立但非必需的关联 */
  const BONUS_PAIRS = [
    ['linyu','school'], ['drhe','school'], ['warehouse','kidnap'],
    ['van','loren'], ['cctv','kidnap'], ['guchen','homecoming']
  ].map(p=> p.sort().join('|'));

  const KEY_SET = new Set(KEY_PAIRS);
  const BONUS_SET = new Set(BONUS_PAIRS);

  let boardCards = [];      // {id, x, y} 百分比坐标
  let connections = [];     // {a, b, verdict}
  let selectedCard = null;
  let selectedLine = null;
  let correctCount = 0, incorrectCount = 0;
  let inspectedCount = 0;
  let startTime = 0;
  let unreliable = false;
  let onSuccess = null, onFail = null;
  let _active = false;
  let dragState = null;     // {type:'inv'|'board', id, dx, dy, moved, ghost}
  let resizeHandler = null;

  const norm = (a,b)=> [a,b].sort().join('|');
  function pairVerdict(a, b){
    const p = norm(a, b);
    if(KEY_SET.has(p)) return 'correct';
    if(BONUS_SET.has(p)){
      // 若审讯给出的是假地点，仓库与绑架的关联不成立
      if(unreliable && p === 'kidnap|warehouse') return 'incorrect';
      return 'correct';
    }
    return 'incorrect';
  }

  /* ---------- 启动 ---------- */
  function start(success, fail){
    cleanup();
    onSuccess = success; onFail = fail;
    boardCards = []; connections = [];
    selectedCard = null; selectedLine = null;
    correctCount = 0; incorrectCount = 0; inspectedCount = 0;
    startTime = Date.now();
    unreliable = !!(window.Game && Game.flags && Game.flags.falseInterrogationLocation);
    _active = true;
    Engine.showScreen('minigame4');
    renderAll();
    bindInput();
    resizeHandler = ()=> renderLines();
    window.addEventListener('resize', resizeHandler);
  }

  /* ---------- 清单渲染 ---------- */
  function renderInventory(){
    const list = document.getElementById('mg4-inv-list');
    if(!list) return;
    list.innerHTML = '';
    CATS.forEach(cat=>{
      const header = document.createElement('div');
      header.style.cssText = 'font-size:10px;letter-spacing:2px;color:var(--green);margin:8px 0 4px;text-transform:uppercase;';
      header.textContent = t(cat.labelKey);
      list.appendChild(header);
      CARD_DEFS.filter(c=> c.cat === cat.cat && !boardCards.find(b=> b.id === c.id)).forEach(c=>{
        const el = document.createElement('div');
        el.className = 'mg4-inv-card';
        el.dataset.id = c.id;
        el.innerHTML = `<span class="cat">${t(c.titleKey)}</span>${t(c.descKey).substring(0, 34)}${t(c.descKey).length > 34 ? '…' : ''}`;
        el.addEventListener('mousedown', (e)=> startInvDrag(e, c.id));
        list.appendChild(el);
      });
    });
  }

  function startInvDrag(e, id){
    if(!_active) return;
    e.preventDefault();
    const ghost = document.createElement('div');
    ghost.className = 'mg4-board-card';
    ghost.style.cssText += ';position:fixed;pointer-events:none;z-index:80;opacity:.85;';
    ghost.innerHTML = `<div class="bcard-title">${t('mg4.card.'+id+'.title')}</div><div class="bcard-cat">${t(catLabelKey(catOf(id)))}</div>`;
    ghost.style.left = (e.clientX - 60) + 'px';
    ghost.style.top = (e.clientY - 24) + 'px';
    document.body.appendChild(ghost);
    dragState = { type:'inv', id, ghost, moved:false, offX: 60, offY: 24 };
  }
  function catOf(id){
    const c = CARD_DEFS.find(x=> x.id === id);
    return c ? c.cat : '';
  }

  function moveGhost(e){
    if(!dragState) return;
    dragState.moved = true;
    const g = dragState.ghost;
    if(g){
      g.style.left = (e.clientX - dragState.offX) + 'px';
      g.style.top = (e.clientY - dragState.offY) + 'px';
    }
  }

  function endInvDrag(e){
    if(!dragState || dragState.type !== 'inv') return;
    const id = dragState.id;
    const ghost = dragState.ghost;
    dragState = null;
    if(ghost) ghost.remove();
    if(!_active) return;
    const board = document.getElementById('mg4-board');
    const rect = board.getBoundingClientRect();
    if(e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom){
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      boardCards.push({ id, x: Math.max(4, Math.min(90, x)), y: Math.max(6, Math.min(82, y)) });
      AudioSys.sfx.move();
      renderAll();
    }
  }

  /* ---------- 板上卡片 ---------- */
  function renderBoard(){
    const board = document.getElementById('mg4-board');
    if(!board) return;
    board.querySelectorAll('.mg4-board-card').forEach(el=> el.remove());
    const hint = document.getElementById('mg4-drop-hint');
    if(hint) hint.classList.toggle('hide', boardCards.length > 0);
    boardCards.forEach(card=>{
      const def = CARD_DEFS.find(d=> d.id === card.id);
      const el = document.createElement('div');
      el.className = 'mg4-board-card' + (selectedCard === card.id ? ' selected' : '');
      el.dataset.id = card.id;
      el.style.left = card.x + '%';
      el.style.top = card.y + '%';
      el.style.transform = 'translate(-50%,-50%)';
      el.innerHTML = `<div class="bcard-title">${t(def.titleKey)}</div><div class="bcard-cat">${t(catLabelKey(def.cat))}</div>`;
      el.addEventListener('mousedown', (e)=> startBoardDrag(e, card.id));
      el.addEventListener('click', (e)=>{
        if(dragState && dragState.moved) return;
        onCardClick(card.id);
      });
      board.appendChild(el);
    });
    renderLines();
  }

  function catLabelKey(cat){
    const c = CATS.find(x=> x.cat === cat);
    return c ? c.labelKey : 'mg4.documents';
  }

  function startBoardDrag(e, id){
    if(!_active) return;
    e.preventDefault();
    e.stopPropagation();
    dragState = { type:'board', id, moved:false, startX:e.clientX, startY:e.clientY, origX:null, origY:null };
    const card = boardCards.find(c=> c.id === id);
    if(card){ dragState.origX = card.x; dragState.origY = card.y; }
  }

  function moveBoardDrag(e){
    if(!dragState || dragState.type !== 'board') return;
    const dx = e.clientX - dragState.startX;
    const dy = e.clientY - dragState.startY;
    if(Math.abs(dx) + Math.abs(dy) > 5) dragState.moved = true;
    if(!dragState.moved) return;
    const board = document.getElementById('mg4-board');
    const rect = board.getBoundingClientRect();
    const card = boardCards.find(c=> c.id === dragState.id);
    if(card && rect.width && rect.height){
      card.x = Math.max(4, Math.min(90, dragState.origX + (dx / rect.width) * 100));
      card.y = Math.max(6, Math.min(82, dragState.origY + (dy / rect.height) * 100));
    }
    renderLines();
  }

  function endBoardDrag(){
    if(!dragState || dragState.type !== 'board') return;
    const wasMoved = dragState.moved;
    dragState = null;
    if(wasMoved){ renderAll(); }
  }

  /* ---------- 选择 / 连接 ---------- */
  function onCardClick(id){
    if(!_active) return;
    AudioSys.sfx.click();
    inspectedCount++;
    const def = CARD_DEFS.find(d=> d.id === id);
    renderInspector({
      title: t(def.titleKey),
      cat: t(catLabelKey(def.cat)),
      desc: t(def.descKey)
    });
    if(selectedCard && selectedCard !== id){
      const a = selectedCard, b = id;
      selectedCard = null;
      if(!connections.find(c=> c.a === b && c.b === a || c.a === a && c.b === b)){
        const verdict = pairVerdict(a, b);
        connections.push({ a, b, verdict });
        if(verdict === 'correct'){ correctCount++; AudioSys.sfx.success(); }
        else { incorrectCount++; AudioSys.sfx.alert(); }
        updateCounters();
      }
    } else if(selectedCard === id){
      selectedCard = null;
    } else {
      selectedCard = id;
    }
    selectedLine = null;
    renderBoard();
    renderInspector();
  }

  function onLineClick(idx){
    if(!_active) return;
    AudioSys.sfx.click();
    selectedLine = (selectedLine === idx) ? null : idx;
    selectedCard = null;
    renderBoard();
    renderInspector();
  }

  function removeSelectedLine(){
    if(selectedLine === null || !_active) return;
    const c = connections[selectedLine];
    if(c){
      if(c.verdict === 'correct') correctCount = Math.max(0, correctCount - 1);
      else incorrectCount = Math.max(0, incorrectCount - 1);
      updateCounters();
    }
    connections.splice(selectedLine, 1);
    selectedLine = null;
    renderAll();
    AudioSys.sfx.click();
  }

  /* ---------- 连线渲染 ---------- */
  function renderLines(){
    const svg = document.getElementById('mg4-lines');
    const board = document.getElementById('mg4-board');
    if(!svg || !board) return;
    svg.innerHTML = '';
    const rect = board.getBoundingClientRect();
    connections.forEach((c, idx)=>{
      const a = boardCards.find(x=> x.id === c.a);
      const b = boardCards.find(x=> x.id === c.b);
      if(!a || !b) return;
      const aEl = board.querySelector(`.mg4-board-card[data-id="${c.a}"]`);
      const bEl = board.querySelector(`.mg4-board-card[data-id="${c.b}"]`);
      if(!aEl || !bEl) return;
      const ar = aEl.getBoundingClientRect();
      const br = bEl.getBoundingClientRect();
      const x1 = ar.left - rect.left + ar.width/2;
      const y1 = ar.top - rect.top + ar.height/2;
      const x2 = br.left - rect.left + br.width/2;
      const y2 = br.top - rect.top + br.height/2;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1); line.setAttribute('y1', y1);
      line.setAttribute('x2', x2); line.setAttribute('y2', y2);
      line.setAttribute('class', 'mg4-line ' + c.verdict + (selectedLine === idx ? ' selected' : ''));
      line.style.pointerEvents = 'stroke';
      line.style.cursor = 'pointer';
      line.addEventListener('click', (e)=>{ e.stopPropagation(); onLineClick(idx); });
      svg.appendChild(line);
    });
  }

  /* ---------- 检查器 ---------- */
  function renderInspector(data){
    const body = document.getElementById('mg4-inspector-body');
    if(!body) return;
    body.innerHTML = '';
    if(data){
      const title = document.createElement('div');
      title.className = 'insp-title'; title.textContent = data.title;
      const cat = document.createElement('div');
      cat.className = 'insp-cat'; cat.textContent = data.cat;
      const desc = document.createElement('p');
      desc.textContent = data.desc;
      body.appendChild(title); body.appendChild(cat); body.appendChild(desc);
      return;
    }
    if(selectedLine !== null && connections[selectedLine]){
      const c = connections[selectedLine];
      const a = CARD_DEFS.find(d=> d.id === c.a);
      const b = CARD_DEFS.find(d=> d.id === c.b);
      const title = document.createElement('div');
      title.className = 'insp-title';
      title.textContent = t(a.titleKey) + ' ↔ ' + t(b.titleKey);
      const cat = document.createElement('div');
      cat.className = 'insp-cat';
      cat.textContent = c.verdict === 'correct' ? t('mg4.correct') : t('mg4.incorrect');
      cat.style.color = c.verdict === 'correct' ? 'var(--green)' : 'var(--alert)';
      body.appendChild(title); body.appendChild(cat);
      const btn = document.createElement('button');
      btn.className = 'mg4-remove-btn';
      btn.textContent = t('mg4.remove');
      btn.addEventListener('click', removeSelectedLine);
      body.appendChild(btn);
      return;
    }
    const p = document.createElement('p');
    p.textContent = t('mg4.empty');
    body.appendChild(p);
  }

  function updateCounters(){
    const c = document.getElementById('mg4-correct');
    const i = document.getElementById('mg4-incorrect');
    if(c) c.textContent = correctCount;
    if(i) i.textContent = incorrectCount;
  }

  function renderAll(){
    renderInventory();
    renderBoard();
    renderInspector();
    updateCounters();
  }

  /* ---------- 确认推论 ---------- */
  function confirmTheory(){
    if(!_active) return;
    AudioSys.sfx.click();
    const keyFound = KEY_PAIRS.filter(p=> connections.find(c=> c.verdict === 'correct' && norm(c.a, c.b) === p)).length;
    const perfect = keyFound === KEY_PAIRS.length && incorrectCount <= 2;
    const completionTime = Math.round((Date.now() - startTime) / 1000);
    const flags = {
      evidenceBoard1Perfect: !!perfect,
      evidenceBoard1Score: keyFound,
      evidenceBoard1Correct: correctCount,
      evidenceBoard1Incorrect: incorrectCount,
      evidenceBoard1Inspected: inspectedCount,
      evidenceBoard1Time: completionTime
    };
    let stats = {};
    let resultKey, resultMsg;
    if(perfect){
      stats.evidence = 20;
      resultKey = 'mg4.resultPerfect';
      resultMsg = t('mg4.resultPerfectMsg') + ' ' + t('mg4.revealPerfect');
    } else {
      stats.evidence = 5 + keyFound * 2;
      resultKey = 'mg4.resultIncomplete';
      resultMsg = t('mg4.resultIncompleteMsg');
    }
    AudioSys.sfx.success();
    MGCommon.showResult(resultKey, resultMsg, [
      { labelKey:'mg.common.continue', primary:true, onClick:()=>{ MGCommon.killResult(); finish(perfect, flags, stats); } }
    ]);
  }

  function finish(perfect, flags, stats){
    cleanup();
    if(perfect) onSuccess && onSuccess({ flags, stats, perfect: true });
    else onFail && onFail({ flags, stats });
  }

  /* ---------- 键盘 ---------- */
  function onKeyDown(e){
    if(!_active) return;
    if(e.key === 'Escape'){
      selectedCard = null; selectedLine = null;
      renderAll();
      e.preventDefault();
    } else if(e.key === 'Delete' || e.key === 'Backspace'){
      removeSelectedLine();
      e.preventDefault();
    }
  }

  function onDocMouseMove(e){ moveGhost(e); moveBoardDrag(e); }
  function onDocMouseUp(e){ endInvDrag(e); endBoardDrag(); }

  function bindInput(){
    document.addEventListener('mousemove', onDocMouseMove);
    document.addEventListener('mouseup', onDocMouseUp);
    document.addEventListener('keydown', onKeyDown);
    document.getElementById('mg4-confirm').addEventListener('click', confirmTheory);
  }

  function unbindInput(){
    document.removeEventListener('mousemove', onDocMouseMove);
    document.removeEventListener('mouseup', onDocMouseUp);
    document.removeEventListener('keydown', onKeyDown);
    const c = document.getElementById('mg4-confirm');
    if(c) c.replaceWith(c.cloneNode(true));
  }

  function cleanup(){
    _active = false;
    if(dragState){
      if(dragState.ghost) dragState.ghost.remove();
      dragState = null;
    }
    document.querySelectorAll('body > .mg4-board-card').forEach(el=> el.remove());
    if(resizeHandler){ window.removeEventListener('resize', resizeHandler); resizeHandler = null; }
    MGCommon.killResult();
    unbindInput();
  }

  function refreshLabels(){
    if(_active) renderAll();
  }

  return { start, bind(){}, cleanup, refreshLabels, get _active(){ return _active; } };
})();
