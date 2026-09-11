/* ===== 存档 / 读档系统 ===== */
window.SaveSys = (function(){
  const PREFIX = 'thb_save_';
  let mode = 'load'; // 'save' or 'load'
  let currentTab = 'manual';
  let pendingSlot = null;

  function key(type, idx){ return PREFIX + type + '_' + idx; }

  function getSlot(type, idx){
    try{
      const raw = localStorage.getItem(key(type, idx));
      return raw ? JSON.parse(raw) : null;
    }catch(e){ return null; }
  }
  function setSlot(type, idx, data){
    try{ localStorage.setItem(key(type, idx), JSON.stringify(data)); }catch(e){}
  }
  function clearSlot(type, idx){
    try{ localStorage.removeItem(key(type, idx)); }catch(e){}
  }

  /* 从游戏引擎获取当前状态并保存 */
  function doSave(type, idx){
    const state = window.Game ? window.Game.getState() : null;
    if(!state){ return false; }
    const node = STORY.nodes[state.node] || {};
    const data = {
      node: state.node,
      flags: state.flags,
      stats: state.stats || { evidence:0, trust:0, exposure:0, revenge:0 },
      timestamp: Date.now(),
      chapter: node.chapter || chapterName(state.node),
      bg: node.bg || 'title',
      progress: state.progress || 0
    };
    setSlot(type, idx, data);
    return true;
  }

  function chapterName(nodeId){
    if(!nodeId) return I18N.t('chapter.default');
    if(nodeId.startsWith('end')) return I18N.t('chapter.ending');
    const m = nodeId.match(/^s(\d+)/);
    if(m){
      const scene = parseInt(m[1]);
      if(scene <= 6) return I18N.t('chapter.act1');
      if(scene <= 14) return I18N.t('chapter.act2');
      if(scene <= 22) return I18N.t('chapter.act3');
      return I18N.t('chapter.act4');
    }
    return I18N.t('chapter.default');
  }

  function doLoad(type, idx){
    const data = getSlot(type, idx);
    if(!data || !window.Game) return false;
    window.Game.loadState(data);
    return true;
  }

  /* 快速存档 */
  function quickSave(){
    const ok = doSave('quick', 1);
    if(ok) showToast(I18N.t('save.quickSaved'));
    return ok;
  }
  /* 自动存档（每次节点推进时调用） */
  function autoSave(){
    if(!window.Game) return;
    doSave('auto', 1);
  }

  /* 渲染存档界面 */
  function render(m){
    mode = m;
    document.getElementById('save-mode-title').textContent = (mode==='save') ? I18N.t('save.saveTitle') : I18N.t('save.loadTitle');
    renderGrid();
  }

  /* 语言切换时刷新（若存档界面正在显示） */
  function refreshLabels(){
    if(document.getElementById('screen-save').classList.contains('active')){
      render(mode);
    }
  }

  function renderGrid(){
    const grid = document.getElementById('save-grid');
    grid.innerHTML = '';
    const count = 6;
    for(let i=1;i<=count;i++){
      const data = getSlot(currentTab, i);
      const slot = document.createElement('div');
      slot.className = 'save-slot' + (data ? '' : ' empty');
      if(data){
        const d = new Date(data.timestamp);
        const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
        const bgUrl = STORY.backgrounds[data.bg] || STORY.backgrounds.title;
        slot.innerHTML = `
          <div class="save-thumb" style="background-image:url('${bgUrl}')"></div>
          <div class="save-info">
            <div class="save-slot-id">SLOT ${String(i).padStart(2,'0')}</div>
            <div class="save-chapter">${data.chapter || '未知章节'}</div>
            <div class="save-meta">${dateStr}</div>
          </div>
          <div class="save-progress">${data.progress||0}%</div>`;
        slot.addEventListener('click', ()=> onSlotClick(i));
      } else {
        slot.innerHTML = `<div class="save-info" style="text-align:center"><div class="save-slot-id">SLOT ${String(i).padStart(2,'0')}</div><div class="save-chapter" style="color:var(--muted)">${I18N.t('save.empty')}</div></div>`;
        if(mode==='save'){
          slot.style.cursor='pointer';
          slot.classList.remove('empty');
          slot.addEventListener('click', ()=> onSlotClick(i));
        }
      }
      grid.appendChild(slot);
    }
  }

  function onSlotClick(idx){
    AudioSys.sfx.click();
    const data = getSlot(currentTab, idx);
    if(mode==='save'){
      // 覆盖确认
      pendingSlot = idx;
      const title = data ? I18N.t('save.overwriteQ') : I18N.t('save.saveToQ');
      showModal(I18N.t('save.saveConfirm'), title, ()=>{
        if(doSave(currentTab, idx)){ showToast(I18N.t('save.saved')); AudioSys.sfx.save(); renderGrid(); }
      });
    } else {
      if(!data){ showToast(I18N.t('save.emptySlot')); return; }
      pendingSlot = idx;
      showModal(I18N.t('save.loadConfirm'), I18N.t('save.loadQ'), ()=>{
        if(doLoad(currentTab, idx)){ showToast(I18N.t('save.loaded')); hideSaveScreen(); }
      });
    }
  }

  function showModal(title, text, onOk){
    document.getElementById('save-confirm-title').textContent = title;
    document.getElementById('save-confirm-text').textContent = text;
    const modal = document.getElementById('save-confirm-modal');
    modal.classList.add('active');
    const okBtn = document.getElementById('save-confirm-ok');
    const newOk = okBtn.cloneNode(true);
    okBtn.parentNode.replaceChild(newOk, okBtn);
    newOk.addEventListener('click', ()=>{ modal.classList.remove('active'); AudioSys.sfx.click(); onOk && onOk(); });
  }

  function hideSaveScreen(){
    document.getElementById('save-confirm-modal').classList.remove('active');
    // 返回：如果在游戏中则回游戏，否则回标题
    if(window.Game && window.Game.isInGame()){
      window.Engine.showScreen('game');
    } else {
      window.Engine.showScreen('title');
    }
  }

  function bindUI(){
    document.querySelectorAll('.save-tab').forEach(tab=>{
      tab.addEventListener('click', ()=>{
        AudioSys.sfx.click();
        document.querySelectorAll('.save-tab').forEach(t=>t.classList.remove('active'));
        tab.classList.add('active');
        currentTab = tab.dataset.saveTab;
        renderGrid();
      });
    });
    document.querySelector('[data-action="cancel-save-modal"]').addEventListener('click', ()=>{
      document.getElementById('save-confirm-modal').classList.remove('active');
      AudioSys.sfx.click();
    });
    document.querySelector('[data-action="back-from-save"]').addEventListener('click', ()=>{
      AudioSys.sfx.click(); hideSaveScreen();
    });
  }

  function showToast(msg){
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(()=>t.classList.remove('show'), 2000);
  }

  return { render, quickSave, autoSave, bindUI, getSlot, doSave, doLoad, showToast, refreshLabels };
})();
