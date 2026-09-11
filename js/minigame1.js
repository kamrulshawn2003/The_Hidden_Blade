/* ===== 微游戏 1：入侵协议 (Breach Protocol) — Su Lan 黑客小游戏 ===== */
window.MiniGame1 = (function(){
  const GRID_SIZE = 5;
  const BUFFER_SIZE = 5;
  const TIME_LIMIT = 45;
  const CODES = ['55','1C','7A','BD','E9','FF','3B','D2'];

  let grid = [];
  let targets = [];
  let buffer = [];
  let usedCells = new Set();
  let lastPos = null;      // {row, col}
  let nextAxis = 'row';    // 'row' or 'col' — constraint for next pick
  let timer = null;
  let timeLeft = TIME_LIMIT;
  let onSuccess = null, onFail = null;
  let _active = false;
  let matchedCount = 0;

  /* ---------- 生成可解的谜题 ---------- */
  function generatePuzzle(){
    // 1. 随机填充矩阵
    grid = [];
    for(let r=0; r<GRID_SIZE; r++){
      const row = [];
      for(let c=0; c<GRID_SIZE; c++){
        row.push(CODES[Math.floor(Math.random()*CODES.length)]);
      }
      grid.push(row);
    }

    // 2. 生成一条合法路径（游戏规则：首步自由 → 同列 → 同行 → 同列...）
    //    取其代码作为目标序列，保证可解且不重复
    const path = [];
    let r = Math.floor(Math.random()*GRID_SIZE);
    let c = Math.floor(Math.random()*GRID_SIZE);
    path.push({r, c});
    // 第二步：同列（改变行，保持列），确保不同行
    let r2;
    do { r2 = Math.floor(Math.random()*GRID_SIZE); } while(r2 === r);
    r = r2;
    path.push({r, c});
    // 第三步：同行（改变列，保持行），确保不同列
    let c2;
    do { c2 = Math.floor(Math.random()*GRID_SIZE); } while(c2 === c);
    c = c2;
    path.push({r, c});
    const target1 = path.map(p => grid[p.r][p.c]);

    // 3. 生成第二条目标序列（长度2，可选挑战）
    const path2 = [];
    r = Math.floor(Math.random()*GRID_SIZE);
    c = Math.floor(Math.random()*GRID_SIZE);
    path2.push({r, c});
    // 第二步：同列，确保不同行
    do { r2 = Math.floor(Math.random()*GRID_SIZE); } while(r2 === r);
    r = r2;
    path2.push({r, c});
    const target2 = path2.map(p => grid[p.r][p.c]);

    targets = [
      { seq: target1, done: false, label: 'mg1.targetPrimary' },
      { seq: target2, done: false, label: 'mg1.targetSecondary' }
    ];
  }

  /* ---------- 渲染矩阵 ---------- */
  function renderMatrix(){
    const el = document.getElementById('breach-matrix');
    if(!el) return;
    el.innerHTML = '';
    for(let r=0; r<GRID_SIZE; r++){
      for(let c=0; c<GRID_SIZE; c++){
        const cell = document.createElement('div');
        cell.className = 'breach-cell';
        cell.dataset.row = r;
        cell.dataset.col = c;
        cell.textContent = grid[r][c];
        const key = r+','+c;
        if(usedCells.has(key)){
          cell.classList.add('used');
        } else if(isValidPick(r, c)){
          cell.classList.add('valid');
        }
        cell.addEventListener('click', ()=> onCellClick(r, c));
        el.appendChild(cell);
      }
    }
  }

  /* ---------- 判断是否可选 ---------- */
  function isValidPick(r, c){
    if(usedCells.has(r+','+c)) return false;
    if(!lastPos) return true; // 第一个任意选
    if(nextAxis === 'row') return r === lastPos.r;
    return c === lastPos.c;
  }

  /* ---------- 点击单元格 ---------- */
  function onCellClick(r, c){
    if(!_active) return;
    if(!isValidPick(r, c)){
      AudioSys.sfx.alert();
      return;
    }
    AudioSys.sfx.click();
    usedCells.add(r+','+c);
    buffer.push(grid[r][c]);
    lastPos = {r, c};
    nextAxis = (nextAxis === 'row') ? 'col' : 'row';

    // 检查是否匹配目标
    checkTargets();

    // 缓冲满：主序列已匹配则成功，否则失败
    if(buffer.length >= BUFFER_SIZE){
      if(primaryDone()){ success(); } else { fail(); }
      return;
    }
    // 主序列匹配后可继续挑战副序列（不立即结束）
    renderAll();
  }

  /* ---------- 检查目标匹配 ---------- */
  function checkTargets(){
    targets.forEach(t=>{
      if(t.done) return;
      if(buffer.length >= t.seq.length){
        const tail = buffer.slice(buffer.length - t.seq.length);
        if(tail.every((v,i)=> v === t.seq[i])){
          t.done = true;
          matchedCount++;
          AudioSys.sfx.success();
          if(t === targets[0]){
            setStatus(I18N.t('mg1.primaryDone'));
          } else {
            setStatus(I18N.t('mg1.uploaded') + '：' + t.seq.join(' '));
          }
        }
      }
    });
  }

  function allTargetsDone(){
    return targets.every(t=>t.done);
  }

  function primaryDone(){
    return targets.length > 0 && targets[0].done;
  }

  /* ---------- 渲染目标序列 ---------- */
  function renderTargets(){
    const el = document.getElementById('breach-targets');
    if(!el) return;
    el.innerHTML = '';
    targets.forEach((t, i)=>{
      const row = document.createElement('div');
      row.className = 'breach-target' + (t.done ? ' done' : '');
      const label = document.createElement('span');
      label.className = 'breach-target-label';
      label.textContent = I18N.t(t.label);
      const codes = document.createElement('span');
      codes.className = 'breach-target-codes';
      codes.textContent = t.seq.join('  ');
      row.appendChild(label);
      row.appendChild(codes);
      el.appendChild(row);
    });
  }

  /* ---------- 渲染缓冲 ---------- */
  function renderBuffer(){
    const el = document.getElementById('breach-buffer');
    if(!el) return;
    el.innerHTML = '';
    for(let i=0; i<BUFFER_SIZE; i++){
      const slot = document.createElement('div');
      slot.className = 'breach-buffer-slot' + (buffer[i] ? ' filled' : '');
      slot.textContent = buffer[i] || '';
      el.appendChild(slot);
    }
  }

  /* ---------- 提示文字 ---------- */
  function renderHint(){
    const el = document.getElementById('breach-hint');
    if(!el) return;
    if(!lastPos){
      el.textContent = I18N.t('mg1.hintRow');
    } else if(nextAxis === 'col'){
      el.textContent = I18N.t('mg1.hintCol');
    } else {
      el.textContent = I18N.t('mg1.hintRow');
    }
  }

  function setStatus(msg){
    const el = document.getElementById('breach-status');
    if(el) el.textContent = msg;
  }

  function renderAll(){
    renderMatrix();
    renderTargets();
    renderBuffer();
    renderHint();
  }

  /* ---------- 计时器 ---------- */
  function tick(){
    timeLeft--;
    const el = document.getElementById('breach-timer-val');
    if(el) el.textContent = timeLeft;
    if(timeLeft <= 10){
      const timerEl = document.querySelector('.breach-timer');
      if(timerEl) timerEl.classList.add('warning');
    }
    if(timeLeft <= 0){
      if(primaryDone()){ success(); } else { fail(); }
    }
  }

  /* ---------- 成功/失败 ---------- */
  function success(){
    if(!_active) return;
    AudioSys.sfx.success();
    cleanup();
    const isPerfect = matchedCount >= targets.length && timeLeft > 10;
    onSuccess && onSuccess({ perfect: isPerfect });
  }

  function fail(){
    if(!_active) return;
    AudioSys.sfx.fail();
    cleanup();
    onFail && onFail();
  }

  function cleanup(){
    if(timer){ clearInterval(timer); timer = null; }
    _active = false;
  }

  /* ---------- 启动 ---------- */
  function start(success, fail){
    cleanup();
    onSuccess = success; onFail = fail;
    grid = []; targets = []; buffer = [];
    usedCells = new Set();
    lastPos = null; nextAxis = 'row';
    timeLeft = TIME_LIMIT; matchedCount = 0;
    _active = true;

    generatePuzzle();
    Engine.showScreen('minigame1');
    const timerEl = document.querySelector('.breach-timer');
    if(timerEl) timerEl.classList.remove('warning');
    setStatus('');
    renderAll();
    timer = setInterval(tick, 1000);
  }

  function refreshLabels(){
    if(_active) renderAll();
  }

  function bind(){
    // 单元格点击在 renderMatrix 中动态绑定
  }

  return { start, bind, cleanup, refreshLabels, get _active(){ return _active; } };
})();
