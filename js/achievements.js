/* ===== 成就系统 ===== */
window.Achievements = (function(){
  const KEY = 'thb_achievements';
  const list = [
    { id:'ach_peace',    nameKey:'ach.peace.name',    descKey:'ach.peace.desc',    icon:'🏅' },
    { id:'ach_vengeance',nameKey:'ach.vengeance.name',descKey:'ach.vengeance.desc',icon:'⚔️' },
    { id:'ach_reunion',  nameKey:'ach.reunion.name',  descKey:'ach.reunion.desc',  icon:'🤝' },
    { id:'ach_perfect',  nameKey:'ach.perfect.name',  descKey:'ach.perfect.desc',  icon:'🎯' },
    { id:'ach_truth',    nameKey:'ach.truth.name',    descKey:'ach.truth.desc',    icon:'📜' },
    { id:'ach_secret',   nameKey:'ach.secret.name',   descKey:'ach.secret.desc',   icon:'🪞' },
    { id:'ach_interrogator', nameKey:'ach.interrogator.name', descKey:'ach.interrogator.desc', icon:'🗣️' },
    { id:'ach_detective',    nameKey:'ach.detective.name',    descKey:'ach.detective.desc',    icon:'🕸️' },
    { id:'ach_memory',       nameKey:'ach.memory.name',       descKey:'ach.memory.desc',       icon:'🧠' },
    { id:'ach_unpredictable',nameKey:'ach.unpredictable.name',descKey:'ach.unpredictable.desc',icon:'🎲' },
    { id:'ach_truth2',       nameKey:'ach.truth2.name',       descKey:'ach.truth2.desc',       icon:'🧩' }
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
