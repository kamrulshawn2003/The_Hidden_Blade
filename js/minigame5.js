/* ===== 小游戏 5：重返归乡行动 (Return to Homecoming) — 可玩闪回/时间线重构 =====
   在 Scene 23 触发。收集记忆碎片并按正确顺序排列时间线。 */
window.MiniGame5 = (function(){
  const t = (k)=> MGCommon.t(k);
  const lang = ()=> (window.I18N && I18N.getLang) ? I18N.getLang() : 'en';

  /* 事件：顺序即正确时间线；seg 内 mask=true 的片段初始失真 */
  const EVENTS = [
    { id:'briefing',  nameKey:'mg5.event.briefing.name',  hotspot:'radio',
      segsEn:[{t:'Shen briefs Raven Team: '},{t:'armed extremists',mask:true},{t:' hold the station. No prisoners.'}],
      segsZh:[{t:'沈局长向渡鸦小队简报：'},{t:'武装极端分子',mask:true},{t:'占据研究站。不留活口。'}] },
    { id:'meilock',   nameKey:'mg5.event.meilock.name',   hotspot:'computer',
      segsEn:[{t:'Mei presses a copy of Mirror\'s '},{t:'ethical lock',mask:true},{t:' into Dr. He\'s hands. "If it comes to the worst, use this."'}],
      segsZh:[{t:'梅把一份镜系统'},{t:'伦理锁',mask:true},{t:'的副本塞进何博士手里。"万不得已时，用它。"'}] },
    { id:'shenagents',nameKey:'mg5.event.shenagents.name',hotspot:'location',
      segsEn:[{t:'Shen\'s agents are '},{t:'already inside',mask:true},{t:' before Raven Team arrives. They move like they know the layout.'}],
      segsZh:[{t:'渡鸦小队抵达之前，沈的特工'},{t:'已经进入内部',mask:true},{t:'。他们熟悉这里的布局。'}] },
    { id:'entry',     nameKey:'mg5.event.entry.name',     hotspot:'door',
      segsEn:[{t:'Young Lin Xiao breaches the station through the '},{t:'maintenance door',mask:true},{t:'. Smoke and gunfire.'}],
      segsZh:[{t:'年轻的林骁从'},{t:'维修通道',mask:true},{t:'破门而入。烟雾与枪火。'}] },
    { id:'guchen',    nameKey:'mg5.event.guchen.name',    hotspot:'equipment',
      segsEn:[{t:'Gu Chen\'s hand hovers over the detonator for '},{t:'several seconds',mask:true},{t:' before he obeys Protocol Seven.'}],
      segsZh:[{t:'顾晨的手指悬在引爆器上方'},{t:'数秒',mask:true},{t:'，才执行七号协议。'}] },
    { id:'extraction',nameKey:'mg5.event.extraction.name',hotspot:'vehicle',
      segsEn:[{t:'The station comes down. Lin Xiao wakes '},{t:'alone',mask:true},{t:' in the smoke, calling for Mei.'}],
      segsZh:[{t:'研究站轰然倒塌。林骁在浓烟中'},{t:'独自',mask:true},{t:'醒来，呼唤着梅的名字。'}] }
  ];

  const SLOT_COUNT = EVENTS.length;

  let collected = [];     // 已收集事件 id（去重）
  let slots = [];         // 时间线槽位：null 或事件 id
  let selectedFrag = null;
  let submits = 0;
  let firstSubmitCorrect = false;
  let finalAccuracy = 0;
  let onSuccess = null, onFail = null;
  let _active = false;

  function totalMasked(){
    return EVENTS.reduce((s, ev)=> s + ev.segsEn.filter(x=> x.mask).length, 0);
  }
  function remainingMasked(){
    let n = 0;
    EVENTS.forEach(ev=>{
      if(collected.indexOf(ev.id) >= 0 && slots.indexOf(ev.id) < 0) n += ev.segsEn.filter(x=> x.mask).length;
    });
    // 已放入正确槽位的碎片：失真清除
    EVENTS.forEach(ev=>{
      const slotIdx = slots.indexOf(ev.id);
      if(slotIdx >= 0 && slotIdx === EVENTS.findIndex(e=> e.id === ev.id)){ /* 已恢复 */ }
      else if(slotIdx >= 0) n += ev.segsEn.filter(x=> x.mask).length;
    });
    return n;
  }

  function distPercent(){
    const total = totalMasked();
    return total ? Math.round((remainingMasked() / total) * 100) : 0;
  }

  function isCleared(evId){
    const correctIdx = EVENTS.findIndex(e=> e.id === evId);
    return slots[correctIdx] === evId;
  }

  function fragmentHtml(ev){
    const segs = lang() === 'zh' ? ev.segsZh : ev.segsEn;
    let html = '';
    segs.forEach(s=>{
      if(s.mask){
        const cleared = isCleared(ev.id);
        html += cleared ? `<span class="clear-word">${s.t}</span>` : `<span>${t('mg5.masked')}</span>`;
      } else {
        html += `<span>${s.t}</span>`;
      }
    });
    return html;
  }

  /* ---------- 启动 ---------- */
  function start(success, fail){
    cleanup();
    onSuccess = success; onFail = fail;
    collected = []; slots = new Array(SLOT_COUNT).fill(null);
    selectedFrag = null; submits = 0; firstSubmitCorrect = false; finalAccuracy = 0;
    _active = true;
    Engine.showScreen('minigame5');
    bindInput();
    renderAll();
  }

  /* ---------- 渲染 ---------- */
  function renderAll(){
    renderHotspots();
    renderFragments();
    renderSlots();
    renderDistortion();
    const sub = document.getElementById('mg5-submit');
    if(sub) sub.disabled = collected.length === 0;
  }

  function renderHotspots(){
    document.querySelectorAll('.mg5-hotspot').forEach(el=>{
      const id = el.dataset.hotspot;
      const ev = EVENTS.find(e=> e.hotspot === id);
      const found = !!(ev && collected.indexOf(ev.id) >= 0);
      el.classList.toggle('found', found);
      el.style.pointerEvents = found ? 'none' : 'auto';
      let label = el.querySelector('.mg5-hotspot-label');
      if(!label){
        label = document.createElement('span');
        label.className = 'mg5-hotspot-label';
        el.appendChild(label);
      }
      label.textContent = t('mg5.hotspot.' + id);
    });
  }

  function renderFragments(){
    const list = document.getElementById('mg5-frag-list');
    if(!list) return;
    list.innerHTML = '';
    EVENTS.forEach(ev=>{
      if(collected.indexOf(ev.id) < 0) return;
      const el = document.createElement('div');
      el.className = 'mg5-frag' + (selectedFrag === ev.id ? ' selected' : '');
      el.dataset.id = ev.id;
      el.innerHTML = `<span class="frag-name">${t(ev.nameKey)}</span><span class="frag-text">${fragmentHtml(ev)}</span>`;
      el.addEventListener('click', ()=>{
        if(!_active) return;
        AudioSys.sfx.click();
        selectedFrag = (selectedFrag === ev.id) ? null : ev.id;
        renderFragments(); renderSlots();
      });
      list.appendChild(el);
    });
  }

  function renderSlots(){
    const wrap = document.getElementById('mg5-tl-slots');
    if(!wrap) return;
    wrap.innerHTML = '';
    slots.forEach((id, idx)=>{
      const slot = document.createElement('div');
      slot.className = 'mg5-tl-slot ' + (id ? 'filled' : 'empty');
      slot.dataset.idx = idx;
      const idxEl = document.createElement('span');
      idxEl.className = 'tl-idx';
      idxEl.textContent = String(idx + 1).padStart(2, '0');
      slot.appendChild(idxEl);
      if(id){
        const ev = EVENTS.find(e=> e.id === id);
        const name = document.createElement('span');
        name.className = 'tl-name';
        name.textContent = t(ev.nameKey);
        slot.appendChild(name);
        const rm = document.createElement('span');
        rm.className = 'tl-remove';
        rm.textContent = '✕';
        rm.addEventListener('click', (e)=>{
          e.stopPropagation();
          if(!_active) return;
          AudioSys.sfx.click();
          slots[idx] = null;
          selectedFrag = null;
          renderAll();
        });
        slot.appendChild(rm);
        slot.addEventListener('click', ()=>{
          if(!_active) return;
          AudioSys.sfx.click();
          slots[idx] = null;
          selectedFrag = null;
          renderAll();
        });
      } else {
        slot.addEventListener('click', ()=>{
          if(!_active) return;
          if(!selectedFrag) return;
          AudioSys.sfx.move();
          // 若该碎片已在其他槽位，先移除
          const prev = slots.indexOf(selectedFrag);
          if(prev >= 0) slots[prev] = null;
          slots[idx] = selectedFrag;
          selectedFrag = null;
          renderAll();
        });
        slot.addEventListener('dragover', e=>{ e.preventDefault(); slot.classList.add('drag-over'); });
        slot.addEventListener('dragleave', ()=> slot.classList.remove('drag-over'));
        slot.addEventListener('drop', e=>{
          e.preventDefault();
          slot.classList.remove('drag-over');
          if(!_active) return;
          const id = e.dataTransfer.getData('text/plain');
          if(!id || collected.indexOf(id) < 0) return;
          const prev = slots.indexOf(id);
          if(prev >= 0) slots[prev] = null;
          slots[idx] = id;
          selectedFrag = null;
          renderAll();
        });
      }
      wrap.appendChild(slot);
    });
  }

  function renderDistortion(){
    const fill = document.getElementById('mg5-dist-fill');
    const val = document.getElementById('mg5-dist-val');
    const p = distPercent();
    if(fill){ fill.style.width = p + '%'; fill.style.background = p > 50 ? 'var(--red-bright)' : (p > 20 ? 'var(--yellow)' : 'var(--green)'); }
    if(val) val.textContent = p + '%';
  }

  /* ---------- 热点回收 ---------- */
  function bindHotspots(){
    document.querySelectorAll('.mg5-hotspot').forEach(el=>{
      el.addEventListener('click', ()=>{
        if(!_active) return;
        const ev = EVENTS.find(e=> e.hotspot === el.dataset.hotspot);
        if(!ev || collected.indexOf(ev.id) >= 0) return;
        AudioSys.sfx.success();
        collected.push(ev.id);
        // 碎片自动落入第一个空槽位，降低门槛
        const emptyIdx = slots.indexOf(null);
        if(emptyIdx >= 0) slots[emptyIdx] = ev.id;
        renderAll();
      });
    });
    // 拖拽支持
    document.getElementById('mg5-frag-list').addEventListener('dragstart', e=>{
      const el = e.target.closest('.mg5-frag');
      if(!el) return;
      e.dataTransfer.setData('text/plain', el.dataset.id);
    });
  }

  /* ---------- 提交 ---------- */
  function submitTimeline(){
    if(!_active) return;
    AudioSys.sfx.click();
    submits++;
    let correctSlots = 0;
    slots.forEach((id, idx)=>{
      if(id === EVENTS[idx].id) correctSlots++;
    });
    finalAccuracy = Math.round((correctSlots / SLOT_COUNT) * 100);
    if(correctSlots === SLOT_COUNT){
      firstSubmitCorrect = (submits === 1);
      finishResult(true);
    } else {
      // 指出错误槽位，允许重试
      const wrong = [];
      slots.forEach((id, idx)=>{
        if(id && id !== EVENTS[idx].id) wrong.push(idx + 1);
      });
      AudioSys.sfx.alert();
      MGCommon.showResult('mg5.wrongOrder', t('mg5.wrongOrderMsg') + (wrong.length ? ' (' + wrong.join(', ') + ')' : ''), [
        { labelKey:'mg.common.retry', primary:true, onClick:()=>{ MGCommon.killResult(); renderAll(); } },
        { labelKey:'mg.common.continue', onClick:()=>{ MGCommon.killResult(); finishResult(false); } }
      ]);
    }
  }

  function finishResult(correct){
    if(!_active) return;
    const perfect = correct && firstSubmitCorrect && collected.length === SLOT_COUNT;
    const flags = {
      homecomingTruth: !!correct,
      homecomingPerfect: !!perfect,
      memoryFragments: collected.length,
      timelineAccuracy: finalAccuracy,
      reconstructionScore: Math.round((collected.length / SLOT_COUNT) * 50 + finalAccuracy / 2)
    };
    let stats = {};
    let resultKey, resultMsg;
    if(correct){
      stats.evidence = perfect ? 20 : 15;
      resultKey = 'mg5.resultCorrect';
      resultMsg = t('mg5.resultCorrectMsg');
    } else {
      stats.evidence = 6;
      resultKey = 'mg5.resultIncomplete';
      resultMsg = t('mg5.resultIncompleteMsg');
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
      selectedFrag = null;
      renderFragments(); renderSlots();
      e.preventDefault();
    }
  }

  function bindInput(){
    document.addEventListener('keydown', onKeyDown);
    document.getElementById('mg5-submit').addEventListener('click', submitTimeline);
    document.getElementById('mg5-continue').addEventListener('click', ()=>{
      if(!_active) return;
      AudioSys.sfx.click();
      finishResult(false);
    });
    bindHotspots();
  }

  function unbindInput(){
    document.removeEventListener('keydown', onKeyDown);
    ['mg5-submit','mg5-continue'].forEach(id=>{
      const el = document.getElementById(id);
      if(el) el.replaceWith(el.cloneNode(true));
    });
    document.querySelectorAll('.mg5-hotspot').forEach(el=> el.replaceWith(el.cloneNode(true)));
    const fragList = document.getElementById('mg5-frag-list');
    if(fragList) fragList.replaceWith(fragList.cloneNode(true));
  }

  function cleanup(){
    _active = false;
    MGCommon.killResult();
    unbindInput();
  }

  function refreshLabels(){
    if(_active) renderAll();
  }

  return { start, bind(){}, cleanup, refreshLabels, get _active(){ return _active; } };
})();
