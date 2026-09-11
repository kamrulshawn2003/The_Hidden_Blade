/* ===== 设置系统 ===== */
window.Settings = (function(){
  const KEY = 'thb_settings';
  const defaults = { master:80, bgm:80, sfx:80, voice:100, textSpeed:3, fontSize:2, autoPlay:false, skipRead:false, brightness:100, spriteShadow:true, screenShake:true, sfxOn:true, bgmOn:true };
  let data = load();

  function load(){
    try{
      const raw = localStorage.getItem(KEY);
      if(raw) return Object.assign({}, defaults, JSON.parse(raw));
    }catch(e){}
    return Object.assign({}, defaults);
  }
  function save(){
    try{ localStorage.setItem(KEY, JSON.stringify(data)); }catch(e){}
  }
  function get(k){ return data[k]; }
  function set(k,v){ data[k]=v; apply(); }
  function getAll(){ return Object.assign({}, data); }
  function reset(){ data = Object.assign({}, defaults); save(); apply(); }

  function apply(){
    AudioSys.applySettings(data);
    // 画面亮度
    const stage = document.getElementById('stage');
    if(stage) stage.style.filter = `brightness(${data.brightness}%)`;
    // 字号
    const dt = document.getElementById('dialog-text');
    if(dt){ dt.classList.remove('size-1','size-3'); if(data.fontSize===1) dt.classList.add('size-1'); if(data.fontSize===3) dt.classList.add('size-3'); }
    // 立绘阴影
    document.querySelectorAll('.sprite').forEach(s=>{ s.classList.toggle('shadow', data.spriteShadow); });
    // BGM
    AudioSys.setBGM(!!data.bgmOn);
  }

  /* 绑定设置界面控件 */
  function bindUI(){
    document.querySelectorAll('#screen-settings input[type=range]').forEach(inp=>{
      const key = inp.dataset.setting;
      inp.value = data[key];
      const valSpan = inp.parentElement.querySelector('.val');
      if(valSpan) valSpan.textContent = data[key];
      inp.addEventListener('input', ()=>{
        data[key] = Number(inp.value);
        if(valSpan) valSpan.textContent = inp.value;
        apply();
      });
    });
    document.querySelectorAll('#screen-settings input[type=checkbox]').forEach(inp=>{
      const key = inp.dataset.setting;
      inp.checked = !!data[key];
      inp.addEventListener('change', ()=>{ data[key] = inp.checked; apply(); });
    });
    // 语言选项
    document.querySelectorAll('.lang-opt').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        AudioSys.sfx.click();
        if(I18N.getLang() !== btn.dataset.lang){
          I18N.setLang(btn.dataset.lang);
          document.documentElement.lang = I18N.getLang();
        }
      });
    });
    // tab 切换
    document.querySelectorAll('#screen-settings .nav-tab').forEach(tab=>{
      tab.addEventListener('click', ()=>{
        AudioSys.sfx.click();
        document.querySelectorAll('#screen-settings .nav-tab').forEach(t=>t.classList.remove('active'));
        document.querySelectorAll('#screen-settings .tab-content').forEach(t=>t.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('tab-'+tab.dataset.tab).classList.add('active');
      });
    });
  }

  return { load, save, get, set, getAll, reset, apply, bindUI };
})();
