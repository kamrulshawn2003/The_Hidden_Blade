/* ===== 微游戏 2：地下资金链追查（4×4 管道旋转解谜） ===== */
window.MiniGame2 = (function(){
  let timer = null;
  let timeLeft = 45;
  let alarm = 0;
  let grid = [];
  let onSuccess = null, onFail = null;
  let wasContaminated = false;
  let _active = false;

  /* 初始布局（保证有解；陷阱位于非必经路径） */
  function initialGrid(){
    return [
      [{type:'start',rot:0,fixed:true}, {type:'straight',rot:1},          {type:'corner',rot:0},   {type:'corner',rot:1}],
      [{type:'straight',rot:0},        {type:'trap',rot:2,trap:true},     {type:'straight',rot:0}, {type:'corner',rot:3}],
      [{type:'corner',rot:3},          {type:'trap',rot:0,trap:true},     {type:'corner',rot:2},   {type:'corner',rot:0}],
      [{type:'straight',rot:1},        {type:'corner',rot:0},             {type:'straight',rot:1}, {type:'end',rot:0,fixed:true}]
    ];
  }

  /* 各类型在 rot=0 时的连接方向 */
  const BASE_CONN = {
    straight: ['E','W'],
    corner:   ['N','E'],
    tee:      ['N','E','S'],
    trap:     ['N','E'],
    start:    ['E'],
    end:      ['W','N']
  };
  const OPPOSITE = { N:'S', S:'N', E:'W', W:'E' };
  const DELTA = { N:[-1,0], S:[1,0], E:[0,1], W:[0,-1] };

  function getConnections(tile){
    if(tile.type === 'start' || tile.type === 'end') return BASE_CONN[tile.type];
    const base = BASE_CONN[tile.type] || [];
    const r = ((tile.rot % 4) + 4) % 4;
    const order = ['N','E','S','W'];
    return base.map(d => order[(order.indexOf(d) + r) % 4]);
  }

  function start(success, fail){
    onSuccess = success; onFail = fail;
    timeLeft = 45; alarm = 0; wasContaminated = false; _active = true;
    grid = initialGrid();
    Engine.showScreen('minigame2');
    render();
    updateHUD();
    timer = setInterval(tick, 1000);
  }

  function tick(){
    timeLeft--;
    updateHUD();
    if(timeLeft <= 0){ fail(); }
  }

  function updateHUD(){
    document.getElementById('mg2-timer-val').textContent = timeLeft;
    document.getElementById('mg2-alarm-val').textContent = alarm;
  }

  function render(){
    const container = document.getElementById('mg2-grid');
    container.innerHTML = '';
    for(let r=0;r<4;r++){
      for(let c=0;c<4;c++){
        const tile = grid[r][c];
        const div = document.createElement('div');
        div.className = 'pipe-tile';
        if(tile.fixed) div.classList.add('fixed');
        if(tile.trap) div.classList.add('trap');
        div.dataset.r = r; div.dataset.c = c;
        div.innerHTML = tileSVG(tile);
        if(!tile.fixed){
          div.addEventListener('click', ()=> onTileClick(r,c));
        }
        container.appendChild(div);
      }
    }
  }

  function tileSVG(tile){
    const conns = (tile.type === 'start' || tile.type === 'end') ? BASE_CONN[tile.type] : BASE_CONN[tile.type];
    const dirs = { N:[50,4], S:[50,96], E:[96,50], W:[4,50] };
    let lines = '';
    const color = tile.trap ? '#e74c3c' : (tile.type==='start' ? '#d4af37' : tile.type==='end' ? '#5cb85c' : '#c9a961');
    conns.forEach(d=>{
      const [x,y] = dirs[d];
      lines += `<line x1="50" y1="50" x2="${x}" y2="${y}" stroke="${color}" stroke-width="11" stroke-linecap="round"/>`;
    });
    lines += `<circle cx="50" cy="50" r="9" fill="${color}"/>`;
    let label = '';
    if(tile.type==='start') label = `<text x="50" y="88" text-anchor="middle" fill="#d4af37" font-size="16" font-weight="bold">${I18N.getLang()==='en'?'S':'起'}</text>`;
    if(tile.type==='end') label = `<text x="50" y="88" text-anchor="middle" fill="#5cb85c" font-size="16" font-weight="bold">${I18N.getLang()==='en'?'E':'终'}</text>`;
    const rot = (tile.type==='start'||tile.type==='end') ? 0 : (tile.rot * 90);
    return `<svg class="pipe-svg" viewBox="0 0 100 100" style="transform:rotate(${rot}deg)">${lines}${label}</svg>`;
  }

  function onTileClick(r,c){
    const tile = grid[r][c];
    if(tile.fixed) return;
    AudioSys.sfx.click();
    tile.rot = (tile.rot + 1) % 4;
    render();
    checkConnection();
  }

  /* BFS：从起点出发，沿匹配连接搜索 */
  function bfs(avoidTraps){
    const visited = Array.from({length:4},()=>Array(4).fill(false));
    const parent = Array.from({length:4},()=>Array(4).fill(null));
    const queue = [[0,0]];
    visited[0][0] = true;
    while(queue.length){
      const [r,c] = queue.shift();
      const tile = grid[r][c];
      if(avoidTraps && tile.trap) continue;
      const conns = getConnections(tile);
      for(const d of conns){
        const [dr,dc] = DELTA[d];
        const nr = r+dr, nc = c+dc;
        if(nr<0||nr>=4||nc<0||nc>=4||visited[nr][nc]) continue;
        const nt = grid[nr][nc];
        if(avoidTraps && nt.trap) continue;
        const nconns = getConnections(nt);
        if(nconns.includes(OPPOSITE[d])){
          visited[nr][nc] = true;
          parent[nr][nc] = [r,c];
          queue.push([nr,nc]);
        }
      }
    }
    return { visited, parent, reached: visited[3][3] };
  }

  function getPath(parent){
    const path = [];
    let cur = [3,3];
    while(cur){
      path.push(cur);
      cur = parent[cur[0]][cur[1]];
    }
    return path.reverse();
  }

  function checkConnection(){
    // 先检查是否存在无陷阱的干净路径
    const clean = bfs(true);
    if(clean.reached){
      highlightPath(getPath(clean.parent), false);
      success();
      return;
    }
    // 再检查是否存在含陷阱的连通路径
    const any = bfs(false);
    if(any.reached){
      const path = getPath(any.parent);
      const hasTrap = path.some(([r,c])=>grid[r][c].trap);
      if(hasTrap){
        if(!wasContaminated){
          wasContaminated = true;
          alarm++;
          AudioSys.sfx.alert();
          updateHUD();
          SaveSys.showToast(I18N.t('mg2.trapWarn'));
          if(alarm >= 3){ fail(); return; }
        }
        highlightPath(path, true);
      }
    } else {
      wasContaminated = false;
      clearHighlight();
    }
  }

  function highlightPath(path, contaminated){
    clearHighlight();
    path.forEach(([r,c])=>{
      const el = document.querySelector(`.pipe-tile[data-r="${r}"][data-c="${c}"]`);
      if(el) el.classList.add('connected');
    });
  }
  function clearHighlight(){
    document.querySelectorAll('.pipe-tile.connected').forEach(el=>el.classList.remove('connected'));
  }

  function success(){
    AudioSys.sfx.success();
    cleanup();
    onSuccess && onSuccess();
  }
  function fail(){
    AudioSys.sfx.fail();
    cleanup();
    onFail && onFail();
  }
  function cleanup(){
    if(timer){ clearInterval(timer); timer = null; }
    _active = false;
  }

  function refreshLabels(){
    if(_active) render();
  }

  function resetLayout(){
    AudioSys.sfx.click();
    grid = initialGrid();
    wasContaminated = false;
    render();
    clearHighlight();
  }

  function bind(){
    const btn = document.getElementById('mg2-reset');
    if(btn) btn.addEventListener('click', resetLayout);
  }

  return { start, bind, cleanup, refreshLabels, get _active(){ return _active; } };
})();
