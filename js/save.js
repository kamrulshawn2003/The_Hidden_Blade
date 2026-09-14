/* ===== 存档 / 读档系统（一键式：点击即续玩） ===== */
window.SaveSys = (function(){
  const PREFIX = 'thb_save_';

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

  function doSave(type, idx){
    const state = window.Game ? window.Game.getState() : null;
    if(!state) return false;
    const node = STORY.nodes[state.node] || {};
    const data = {
      node: state.node,
      flags: state.flags,
      stats: state.stats || { evidence:0, trust:0, exposure:0, revenge:0 },
      timestamp: Date.now(),
      chapter: node.chapter || '',
      bg: node.bg || 'title',
      progress: state.progress || 0
    };
    setSlot(type, idx, data);
    return true;
  }

  /* 保存当前进度（游戏内菜单"存档"） */
  function save(){
    if(doSave('quick', 1)){
      showToast(I18N.t('save.saved'));
      AudioSys.sfx.save();
      return true;
    }
    return false;
  }

  /* 自动存档（每次节点推进时调用） */
  function autoSave(){
    if(!window.Game) return;
    doSave('auto', 1);
  }

  /* 找出所有存档中最新的一个 */
  function getLatest(){
    let best = null, bestTs = -1;
    try{
      for(let i=0; i<localStorage.length; i++){
        const k = localStorage.key(i);
        if(!k || k.indexOf(PREFIX) !== 0) continue;
        const raw = localStorage.getItem(k);
        if(!raw || raw === 'null' || raw === '') continue;
        let d;
        try{ d = JSON.parse(raw); }catch(e){ continue; }
        if(d && (d.timestamp||0) > bestTs){ bestTs = d.timestamp||0; best = d; }
      }
    }catch(e){}
    return best;
  }

  function hasSave(){ return getLatest() !== null; }

  /* 直接读取最新存档并进入游戏 */
  function resume(){
    const data = getLatest();
    if(!data || !window.Game){
      showToast(I18N.t('save.empty'));
      return false;
    }
    window.Game.loadState(data);
    return true;
  }

  function showToast(msg){
    const t = document.getElementById('toast');
    if(!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(()=>t.classList.remove('show'), 2000);
  }

  /* 兼容旧接口（无存档界面后为空操作） */
  function bindUI(){}
  function refreshLabels(){}

  return { save, autoSave, resume, hasSave, bindUI, refreshLabels, showToast };
})();
