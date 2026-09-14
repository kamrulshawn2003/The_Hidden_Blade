/* ===== 画廊系统 ===== */
window.Gallery = (function(){
  const VISITED_KEY = 'thb_visited_nodes';
  let visited = loadVisited();
  let currentTab = 'characters';
  let _rendered = false;

  function loadVisited(){
    try{
      const raw = localStorage.getItem(VISITED_KEY);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    }catch(e){ return new Set(); }
  }
  function saveVisited(){
    try{ localStorage.setItem(VISITED_KEY, JSON.stringify([...visited])); }catch(e){}
  }
  function markVisited(nodeId){
    if(!visited.has(nodeId)){ visited.add(nodeId); saveVisited(); }
  }
  function isUnlocked(nodeId){ return visited.has(nodeId); }

  function L(obj, field){
    const enField = field + 'En';
    return (I18N.getLang() === 'en' && obj[enField] !== undefined) ? obj[enField] : obj[field];
  }

  function render(){
    _rendered = true;
    const content = document.getElementById('gallery-content');
    content.innerHTML = '';
    if(currentTab==='characters') renderCharacters(content);
    else if(currentTab==='tips') renderTips(content);
  }

  function renderCharacters(content){
    const grid = document.createElement('div');
    grid.className = 'char-grid';
    STORY.characters.forEach(ch=>{
      const card = document.createElement('div');
      card.className = 'char-card';
      const sprite = STORY.sprites[ch.id];
      const img = sprite ? (sprite.base || sprite[Object.keys(sprite)[0]]) : '';
      card.innerHTML = `
        <img src="${img}" alt="${L(ch,'name')}" loading="lazy">
        <div class="char-name">${L(ch,'name')}</div>
        <div class="char-role">${L(ch,'role')}</div>`;
      card.addEventListener('click', ()=>{ AudioSys.sfx.click(); showCharViewer(ch); });
      grid.appendChild(card);
    });
    content.appendChild(grid);
  }

  function renderTips(content){
    const list = document.createElement('div');
    list.className = 'tip-list';
    STORY.tips.forEach(tip=>{
      const unlocked = isUnlocked(tip.unlock);
      const item = document.createElement('div');
      item.className = 'tip-item' + (unlocked ? '' : ' locked');
      item.innerHTML = `<h4>${L(tip,'title')}</h4><p>${unlocked ? L(tip,'text') : I18N.t('gallery.lockedTip')}</p>`;
      list.appendChild(item);
    });
    content.appendChild(list);
  }

  /* 角色查看器 */
  function showCharViewer(ch){
    let overlay = document.getElementById('cg-viewer');
    if(!overlay){
      overlay = document.createElement('div');
      overlay.id = 'cg-viewer';
      overlay.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,.92);z-index:60;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-direction:column';
      overlay.innerHTML = '<img id="cg-viewer-img" style="max-height:75%;object-fit:contain"><div id="cg-viewer-caption" style="margin-top:16px;color:var(--cream);font-size:18px;letter-spacing:3px"></div><div style="margin-top:8px;color:var(--muted);font-size:13px;max-width:500px;text-align:center;line-height:1.7"></div><div style="position:absolute;bottom:20px;color:var(--muted);font-size:13px;letter-spacing:2px">点击任意处关闭</div>';
      document.getElementById('stage').appendChild(overlay);
      overlay.addEventListener('click', ()=> overlay.style.display='none');
    }
    const sprite = STORY.sprites[ch.id];
    document.getElementById('cg-viewer-img').src = sprite ? (sprite.base || sprite[Object.keys(sprite)[0]]) : '';
    overlay.querySelectorAll('div')[0].textContent = `${L(ch,'name')} · ${L(ch,'role')}`;
    overlay.querySelectorAll('div')[1].textContent = L(ch,'desc');
    overlay.style.display = 'flex';
  }

  function bindUI(){
    document.querySelectorAll('.gallery-nav .nav-tab').forEach(tab=>{
      tab.addEventListener('click', ()=>{
        AudioSys.sfx.click();
        document.querySelectorAll('.gallery-nav .nav-tab').forEach(t=>t.classList.remove('active'));
        tab.classList.add('active');
        currentTab = tab.dataset.gallery;
        render();
      });
    });
  }

  return { render, markVisited, isUnlocked, bindUI };
})();
