/* ===== The Hidden Blade · 登录 / 注册机制 (Agent Login & Sign Up) =====
 * 新玩家注册：输入真实姓名，系统分配特工代号 "Raven"（对应剧情主角渡鸦），
 * 并提示“你的姓名是 X，你的特工代号是 Raven”。
 * 老玩家登录：输入特工代号即可。所有特工保存在本地档案库中，与存档绑定。
 */
window.LoginSys = (function(){
  const KEY = 'thb_agent';        // 当前登录特工
  const KEY_LIST = 'thb_agents';  // 特工档案库
  const DEFAULT_CODENAME = 'Raven';

  let mode = 'login'; // 'login' | 'signup'
  let pendingAgent = null; // 刚注册、等待重新登录的特工

  /* ---------- 档案库 ---------- */
  function getAgents(){
    try{ const l = JSON.parse(localStorage.getItem(KEY_LIST) || '[]'); return Array.isArray(l) ? l : []; }
    catch(e){ return []; }
  }
  function saveAgents(list){
    try{ localStorage.setItem(KEY_LIST, JSON.stringify(list)); }catch(e){}
  }
  function findAgentByCodename(cn){
    const c = String(cn || '').trim().toLowerCase();
    return getAgents().find(a => String(a.codename || '').trim().toLowerCase() === c) || null;
  }
  function findAgentByName(nm){
    const n = String(nm || '').trim().toLowerCase();
    return getAgents().find(a => String(a.name || '').trim().toLowerCase() === n) || null;
  }
  function addAgent(name, codename){
    const list = getAgents();
    const a = {
      name: String(name).trim().slice(0, 16),
      codename: String(codename || DEFAULT_CODENAME).trim().slice(0, 16),
      loginAt: Date.now()
    };
    list.push(a);
    saveAgents(list);
    return a;
  }
  function setCurrent(a){
    try{
      localStorage.setItem(KEY, JSON.stringify({
        name: a.name, codename: a.codename || DEFAULT_CODENAME, loginAt: Date.now()
      }));
    }catch(e){}
  }
  function getAgent(){
    try{
      const raw = localStorage.getItem(KEY);
      if(!raw) return null;
      const d = JSON.parse(raw);
      return (d && (d.name || d.codename)) ? d : null;
    }catch(e){ return null; }
  }
  function clearAgent(){
    try{ localStorage.removeItem(KEY); }catch(e){}
  }
  function isLoggedIn(){ return !!getAgent(); }

  /* 兼容旧版本：只有单个 name 的存档迁入档案库 */
  function migrateLegacy(){
    try{
      const cur = localStorage.getItem(KEY);
      if(cur && !localStorage.getItem(KEY_LIST)){
        const d = JSON.parse(cur);
        if(d && d.name && !d.codename){
          saveAgents([{ name: d.name, codename: d.name, loginAt: d.loginAt || Date.now() }]);
          d.codename = d.name;
          localStorage.setItem(KEY, JSON.stringify(d));
        }
      }
    }catch(e){}
  }

  /* ---------- 界面 ---------- */
  function setMode(m){
    mode = (m === 'signup') ? 'signup' : 'login';
    const tl = document.getElementById('tab-login');
    const ts = document.getElementById('tab-signup');
    if(tl) tl.classList.toggle('active', mode === 'login');
    if(ts) ts.classList.toggle('active', mode === 'signup');
    refreshLabels();
  }

  function show(prefill){
    migrateLegacy();
    setMode('login');
    const agent = getAgent();
    const input = document.getElementById('login-input');
    if(input){
      if(prefill !== undefined){
        input.value = prefill;
      } else {
        input.value = agent ? (agent.codename || agent.name) : '';
      }
      input.setAttribute('placeholder', I18N.t('login.placeholder'));
      setTimeout(()=>{ input.focus(); input.select(); }, 80);
    }
    Engine.showScreen('login');
  }

  function goTitle(){
    Engine.showScreen('title');
    updateChip();
  }

  function shakeInput(){
    const input = document.getElementById('login-input');
    if(input){
      input.classList.add('error');
      setTimeout(()=> input.classList.remove('error'), 600);
      input.focus();
    }
  }

  function showWelcome(a){
    const ov = document.getElementById('login-welcome');
    if(!ov) return;
    document.getElementById('welcome-name').textContent = I18N.t('login.yourName') + ' ' + a.name;
    document.getElementById('welcome-codename').textContent = I18N.t('login.yourCodename') + ' ' + (a.codename || DEFAULT_CODENAME);
    ov.classList.add('active');
  }

  function doLogin(){
    const input = document.getElementById('login-input');
    const val = (input.value || '').trim();
    if(!val){ shakeInput(); if(window.AudioSys && AudioSys.sfx && AudioSys.sfx.fail) AudioSys.sfx.fail(); return; }

    if(mode === 'signup'){
      // 注册：真实姓名 → 分配代号 Raven → 提示后要求重新登录
      const exist = findAgentByName(val);
      if(exist){
        // 已注册过：直接走登录（不重复建档）
        setCurrent(exist);
        if(window.AudioSys && AudioSys.sfx && AudioSys.sfx.success) AudioSys.sfx.success();
        goTitle();
        if(window.SaveSys) SaveSys.showToast(I18N.t('login.exists'));
        return;
      }
      const a = addAgent(val, DEFAULT_CODENAME);
      pendingAgent = a; // 不自动登录，稍后要求用代号重新登录
      if(window.AudioSys && AudioSys.sfx && AudioSys.sfx.achievement) AudioSys.sfx.achievement();
      showWelcome(a);
      return;
    }

    // 登录：按代号或姓名匹配档案
    const found = findAgentByCodename(val) || findAgentByName(val);
    if(!found){
      shakeInput();
      if(window.AudioSys && AudioSys.sfx && AudioSys.sfx.fail) AudioSys.sfx.fail();
      if(window.SaveSys) SaveSys.showToast(I18N.t('login.notFound'));
      return;
    }
    setCurrent(found);
    if(window.AudioSys && AudioSys.sfx && AudioSys.sfx.success) AudioSys.sfx.success();
    goTitle();
    if(window.SaveSys) SaveSys.showToast(I18N.t('login.welcomeBack') + '，' + (found.codename || found.name));
  }

  /* 标题页特工栏：显示特工代号 */
  function updateChip(){
    const chip = document.getElementById('title-agent');
    const nameEl = document.getElementById('agent-name');
    const agent = getAgent();
    if(!chip) return;
    if(agent){
      chip.classList.add('on');
      if(nameEl) nameEl.textContent = agent.codename || agent.name;
    } else {
      chip.classList.remove('on');
      if(nameEl) nameEl.textContent = '—';
    }
  }

  /* 语言切换 / 模式切换时刷新动态文本 */
  function refreshLabels(){
    const input = document.getElementById('login-input');
    const sub = document.getElementById('login-sub');
    const foot = document.getElementById('login-foot');
    const btn = document.getElementById('login-btn');
    if(input) input.setAttribute('placeholder', I18N.t(mode === 'login' ? 'login.placeholder' : 'login.signupPlaceholder'));
    if(sub) sub.textContent = I18N.t(mode === 'login' ? 'login.sub' : 'login.signupSub');
    if(foot) foot.textContent = I18N.t(mode === 'login' ? 'login.hint' : 'login.signupHint');
    if(btn) btn.textContent = I18N.t(mode === 'login' ? 'login.enter' : 'login.signupBtn');
    updateChip();
  }

  /* 退出登录：清除当前会话（保留档案库），回到登录界面 */
  function logout(){
    clearAgent();
    if(window.AudioSys && AudioSys.sfx && AudioSys.sfx.click) AudioSys.sfx.click();
    show();
    if(window.SaveSys) SaveSys.showToast(I18N.t('login.loggedOut'));
  }

  /* ---------- 绑定 ---------- */
  function bindUI(){
    const input = document.getElementById('login-input');
    const btn = document.getElementById('login-btn');
    if(input){
      input.addEventListener('keydown', function(e){
        if(e.key === 'Enter'){ e.preventDefault(); doLogin(); }
      });
    }
    if(btn) btn.addEventListener('click', doLogin);

    const tl = document.getElementById('tab-login');
    const ts = document.getElementById('tab-signup');
    if(tl) tl.addEventListener('click', function(){
      if(window.AudioSys && AudioSys.sfx && AudioSys.sfx.click) AudioSys.sfx.click();
      setMode('login');
    });
    if(ts) ts.addEventListener('click', function(){
      if(window.AudioSys && AudioSys.sfx && AudioSys.sfx.click) AudioSys.sfx.click();
      setMode('signup');
    });

    const we = document.getElementById('welcome-enter');
    if(we){
      we.addEventListener('click', function(){
        if(window.AudioSys && AudioSys.sfx && AudioSys.sfx.click) AudioSys.sfx.click();
        document.getElementById('login-welcome').classList.remove('active');
        const a = pendingAgent;
        pendingAgent = null;
        // 不自动登录：要求玩家用代号重新登录（预填代号，按回车即可）
        show(a ? (a.codename || a.name) : undefined);
        if(a && window.SaveSys) SaveSys.showToast(I18N.t('login.pleaseLogin') + ' ' + (a.codename || a.name));
      });
    }

    const sw = document.getElementById('btn-switch-agent');
    if(sw){
      sw.addEventListener('click', function(){
        if(window.AudioSys && AudioSys.sfx && AudioSys.sfx.click) AudioSys.sfx.click();
        show();
      });
    }

    const lo = document.getElementById('btn-logout');
    if(lo){
      lo.addEventListener('click', function(){ logout(); });
    }
    refreshLabels();
  }

  /* 启动：已登录直接进标题，否则显示登录界面 */
  function boot(){
    migrateLegacy();
    if(isLoggedIn()) goTitle();
    else show();
  }

  return {
    getAgent, setAgent: setCurrent, clearAgent, isLoggedIn, getAgents,
    show, goTitle, doLogin, logout, updateChip, refreshLabels, bindUI, boot, setMode
  };
})();
