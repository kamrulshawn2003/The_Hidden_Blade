/* ===== 成就系统 ===== */
window.Achievements = (function(){
  const KEY = 'thb_achievements';
  const list = [
    { id:'ach_corruption', nameKey:'ach.corruption.name', descKey:'ach.corruption.desc', icon:'🕸️' },
    { id:'ach_trapped',    nameKey:'ach.trapped.name',    descKey:'ach.trapped.desc',    icon:'🌑' },
    { id:'ach_triumph',    nameKey:'ach.triumph.name',    descKey:'ach.triumph.desc',    icon:'🃏' },
    { id:'ach_sacrifice',  nameKey:'ach.sacrifice.name',  descKey:'ach.sacrifice.desc',  icon:'🩸' },
    { id:'ach_justice',    nameKey:'ach.justice.name',    descKey:'ach.justice.desc',    icon:'⚖️' },
    { id:'ach_reunion',    nameKey:'ach.reunion.name',    descKey:'ach.reunion.desc',    icon:'🤝' },
    { id:'ach_perfect',    nameKey:'ach.perfect.name',    descKey:'ach.perfect.desc',    icon:'🎯' }
  ];
  let unlocked = load();
  let _rendered = false;

  function load(){
    try{
      const raw = localStorage.getItem(KEY);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    }catch(e){ return new Set(); }
  }
  function save(){
    try{ localStorage.setItem(KEY, JSON.stringify([...unlocked])); }catch(e){}
  }
  function unlock(id){
    if(unlocked.has(id)) return false;
    unlocked.add(id);
    save();
    const a = list.find(x=>x.id===id);
    if(a){
      AudioSys.sfx.achievement();
      showToast(`🏆 ${I18N.t('ach.unlocked')} ${I18N.t(a.nameKey)}`, true);
    }
    return true;
  }
  function isUnlocked(id){ return unlocked.has(id); }
  function getAll(){ return list.map(a=>({...a, unlocked: unlocked.has(a.id)})); }

  function render(){
    _rendered = true;
    const grid = document.getElementById('ach-grid');
    grid.innerHTML = '';
    getAll().forEach(a=>{
      const card = document.createElement('div');
      card.className = 'ach-card' + (a.unlocked ? ' unlocked' : '');
      card.innerHTML = `
        <div class="ach-icon">${a.unlocked ? a.icon : '🔒'}</div>
        <div class="ach-info">
          <h4>${I18N.t(a.nameKey)}</h4>
          <p>${I18N.t(a.descKey)}</p>
        </div>`;
      grid.appendChild(card);
    });
  }

  function showToast(msg, isAch){
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = 'toast show' + (isAch ? ' ach' : '');
    clearTimeout(t._timer);
    t._timer = setTimeout(()=>t.classList.remove('show'), 2800);
  }

  return { unlock, isUnlocked, getAll, render, list };
})();
