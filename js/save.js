/* ===== The Hidden Blade · 多槽位存档系统 =====
 * 槽位：0 = 自动存档，1~6 = 手动存档。
 * 标题页"存档游戏"按钮 = 读取最新存档（自动/手动取新）；
 * 游戏中快捷菜单"存档/读档" = 打开槽位选择界面。
 */
window.SaveSys = (function(){
  const PREFIX = 'thb_save_';
  const AUTO = 0;
  const MANUAL = [1,2,3,4,5,6];
  const ALL = [AUTO].concat(MANUAL);

  function key(idx){ return PREFIX + idx; }
  function read(idx){
    try{ const raw = localStorage.getItem(key(idx)); return raw ? JSON.parse(raw) : null; }
    catch(e){ return null; }
  }
  function write(idx, data){
    try{ localStorage.setItem(key(idx), JSON.stringify(data)); }catch(e){}
  }

  /* 根据节点推断存档显示名（章节名 / 小游戏前 / 结局） */
  function chapterLabel(node){
    const n = (window.STORY && STORY.nodes) ? STORY.nodes[node] : null;
    if(!n) return I18N.t('chapter.default');
    if(n.type === 'minigame1') return I18N.t('save.beforeMg1');
    if(n.type === 'minigame2') return I18N.t('save.beforeMg2');
    if(n.type === 'minigame3') return I18N.t('save.beforeMg3');
    if(n.type === 'ending') return I18N.t('chapter.ending');
    const c = n.chapter;
    if(c && I18N.t(c) !== c) return I18N.t(c);
    return I18N.t('chapter.default');
  }

  function doSave(idx, label){
    if(!window.Game) return false;
    const state = window.Game.getState();
    if(!state || !state.node) return false;
    const n = (window.STORY && STORY.nodes) ? STORY.nodes[state.node] : null;
    const data = {
      node: state.node,
      flags: state.flags || {},
      stats: state.stats || { evidence:0, trust:0, exposure:0, revenge:0 },
      timestamp: Date.now(),
      chapter: n ? n.chapter || '' : '',
      bg: (n && n.bg) || 'title',
      progress: state.progress || 0,
      label: label || chapterLabel(state.node),
      agent: (window.LoginSys && LoginSys.getAgent()) ? (LoginSys.getAgent().codename || LoginSys.getAgent().name) : ''
    };
    write(idx, data);
    return true;
  }

  /* ---------- 核心操作 ---------- */
  function saveToSlot(idx){
    if(!doSave(idx)) return false;
    showToast(I18N.t('save.saved'));
    if(window.AudioSys && AudioSys.sfx && AudioSys.sfx.save) AudioSys.sfx.save();
    notifyChanged();
    return true;
  }
  function save(){ return saveToSlot(1); } // 兼容旧调用

  function autoSave(){
    if(!window.Game) return;
    doSave(AUTO, I18N.t('save.autoLabel'));
  }

  function getLatest(){
    let best = null, bestTs = -1;
    for(const idx of ALL){
      const d = read(idx);
      if(d && (d.timestamp || 0) > bestTs){ bestTs = d.timestamp || 0; best = d; }
    }
    return best;
  }
  function hasSave(){ return getLatest() !== null; }

  function resume(){
    const data = getLatest();
    if(!data || !window.Game){ showToast(I18N.t('save.empty')); return false; }
    window.Game.loadState(data);
    return true;
  }
  function loadSlot(idx){
    const d = read(idx);
    if(!d || !window.Game){ showToast(I18N.t('save.empty')); return false; }
    window.Game.loadState(d);
    return true;
  }

  function slotMeta(idx){
    const d = read(idx);
    if(!d) return null;
    return {
      node: d.node, label: d.label || chapterLabel(d.node),
      progress: d.progress || 0, timestamp: d.timestamp || 0, chapter: d.chapter || '',
      agent: d.agent || ''
    };
  }

  function notifyChanged(){
    if(typeof window.updateSavedGameButton === 'function') window.updateSavedGameButton();
    refreshUI();
  }

  /* ---------- 槽位选择界面 ---------- */
  let mode = 'save';
  const openSaveUI = () => { mode = 'save'; openUI(); };
  const openLoadUI = () => { mode = 'load'; openUI(); };

  function openUI(){
    const ov = document.getElementById('save-overlay');
    if(!ov) return;
    buildUI();
    ov.classList.add('active');
  }
  function closeUI(){
    const ov = document.getElementById('save-overlay');
    if(ov) ov.classList.remove('active');
  }

  function buildUI(){
    const ov = document.getElementById('save-overlay');
    if(!ov) return;
    ov.innerHTML = '';
    const panel = document.createElement('div');
    panel.className = 'save-panel';
    const title = mode === 'save' ? I18N.t('save.title') : I18N.t('save.loadTitle');
    panel.innerHTML =
      '<div class="save-title">' + title + '</div>' +
      '<div class="save-grid"></div>' +
      '<div class="save-actions"><button class="btn-ghost" id="save-close">' + I18N.t('save.cancel') + '</button></div>';
    ov.appendChild(panel);

    const grid = panel.querySelector('.save-grid');
    for(const idx of ALL){
      const meta = slotMeta(idx);
      const card = document.createElement('button');
      card.className = 'save-card' + (meta ? '' : ' empty');
      const slotName = idx === AUTO ? I18N.t('save.auto') : I18N.t('save.slot') + ' ' + idx;
      const label = meta ? meta.label : (idx === AUTO ? I18N.t('save.autoEmpty') : I18N.t('save.emptySlot'));
      let metaLine = '';
      if(meta){
        metaLine = I18N.t('save.progress') + ' ' + meta.progress + '%' +
                   (meta.timestamp ? ' · ' + fmtTime(meta.timestamp) : '') +
                   (meta.agent ? ' · ' + meta.agent : '');
      }
      card.innerHTML =
        '<div class="save-slot">' + slotName + '</div>' +
        '<div class="save-label">' + label + '</div>' +
        '<div class="save-meta">' + metaLine + '</div>';
      card.addEventListener('click', function(){
        if(window.AudioSys && AudioSys.sfx && AudioSys.sfx.click) AudioSys.sfx.click();
        if(mode === 'save'){ saveToSlot(idx); closeUI(); }
        else if(loadSlot(idx)) closeUI();
      });
      grid.appendChild(card);
    }

    const closeBtn = panel.querySelector('#save-close');
    if(closeBtn) closeBtn.addEventListener('click', function(){
      if(window.AudioSys && AudioSys.sfx && AudioSys.sfx.click) AudioSys.sfx.click();
      closeUI();
    });
  }

  function refreshUI(){
    const ov = document.getElementById('save-overlay');
    if(ov && ov.classList.contains('active')) buildUI();
  }

  function fmtTime(ts){
    try{
      const d = new Date(ts);
      const loc = I18N.getLang() === 'zh' ? 'zh-CN' : 'en-US';
      return d.toLocaleDateString(loc, { month:'short', day:'numeric' }) + ' ' +
             d.toLocaleTimeString(loc, { hour:'2-digit', minute:'2-digit' });
    }catch(e){ return ''; }
  }

  /* ---------- Toast ---------- */
  function showToast(msg){
    let t = document.getElementById('game-toast');
    if(!t){
      t = document.createElement('div');
      t.id = 'game-toast';
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._tm);
    t._tm = setTimeout(()=> t.classList.remove('show'), 1600);
  }

  function bindUI(){
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape'){
        const ov = document.getElementById('save-overlay');
        if(ov && ov.classList.contains('active')) closeUI();
      }
    });
  }

  return {
    save: save,
    saveToSlot, autoSave, resume, loadSlot,
    hasSave, getLatest, slotMeta,
    openSaveUI, openLoadUI, closeUI, bindUI, showToast
  };
})();
