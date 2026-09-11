/* ===== 小游戏 6：镜系统预测 (Mirror Prediction) — 基于真实行为档案的自适应博弈 =====
   在 Scene 28 触发。读取整个游戏过程中记录的行为计数（潜行/战斗/黑客/开锁/干扰/撤退），
   镜系统据此预测玩家下一步。玩家必须打乱预测。 */
window.MiniGame6 = (function(){
  const t = (k)=> MGCommon.t(k);
  const KEYS = ['stealth','combat','hacking','lockpicking','distraction','retreat'];
  const TOTAL_ROUNDS = 8;

  let meter = 0;
  let round = 0;
  let disruptions = 0;
  let streak = 0;
  let prediction = null;
  let logLines = [];
  let onSuccess = null, onFail = null;
  let _active = false;
  let resolved = false;

  /* ---------- 启动 ---------- */
  function start(success, fail){
    cleanup();
    onSuccess = success; onFail = fail;
    const profile = Behavior.getProfile();
    const total = Behavior.getTotal();
    const dominant = KEYS.reduce((best,k)=> (profile[k] > (profile[best]||0)) ? k : best, KEYS[0]);
    meter = total === 0 ? 40 : Math.min(80, 40 + Math.round(profile[dominant] * 0.5));
    round = 0; disruptions = 0; streak = 0; prediction = null;
    logLines = []; resolved = false;
    _active = true;
    Engine.showScreen('minigame6');
    bindInput();
    renderProfile();
    renderAll();
    nextRound();
  }

  /* ---------- 镜系统预测 ---------- */
  function mirrorPredict(){
    const c = Behavior.getCounters();
    const total = Behavior.getTotal();
    if(total === 0){
      return KEYS[Math.floor(Math.random() * KEYS.length)];
    }
    const dominant = KEYS.reduce((best,k)=> c[k] > c[best] ? k : best, KEYS[0]);
    const share = c[dominant] / total;
    const pDom = 0.55 + share * 0.35;
    if(Math.random() < pDom) return dominant;
    const weights = KEYS.map(k=> c[k] + 1);
    const sum = weights.reduce((a,b)=> a + b, 0);
    let r = Math.random() * sum;
    for(let i = 0; i < KEYS.length; i++){
      r -= weights[i];
      if(r <= 0) return KEYS[i];
    }
    return KEYS[KEYS.length - 1];
  }

  function nextRound(){
    if(!_active || resolved) return;
    round++;
    prediction = mirrorPredict();
    renderPrediction();
    renderActions();
    renderRound();
  }

  /* ---------- 渲染 ---------- */
  function renderProfile(){
    const wrap = document.getElementById('mg6-profile-bars');
    if(!wrap) return;
    wrap.innerHTML = '';
    const profile = Behavior.getProfile();
    const total = Behavior.getTotal();
    KEYS.forEach(k=>{
      const row = document.createElement('div');
      row.className = 'mg6-prof-row';
      const name = document.createElement('div');
      name.textContent = t('mg6.move.' + k) + (profile[k] > 0 ? ' ' + profile[k] + '%' : '');
      const bar = document.createElement('div');
      bar.className = 'mg6-prof-bar';
      const fill = document.createElement('div');
      fill.className = 'mg6-prof-fill';
      fill.style.width = profile[k] + '%';
      bar.appendChild(fill);
      row.appendChild(name); row.appendChild(bar);
      wrap.appendChild(row);
    });
    if(total === 0){
      const note = document.createElement('div');
      note.className = 'mg6-prof-row';
      note.style.color = 'var(--alert)';
      note.textContent = t('mg6.noData');
      wrap.appendChild(note);
    }
  }

  function renderPrediction(){
    const move = document.getElementById('mg6-prediction-move');
    const text = document.getElementById('mg6-prediction-text');
    if(!move) return;
    if(prediction){
      move.textContent = t('mg6.move.' + prediction);
      text.textContent = '';
    } else {
      move.textContent = '—';
      text.textContent = '';
    }
  }

  function renderActions(){
    const grid = document.getElementById('mg6-action-grid');
    if(!grid) return;
    grid.innerHTML = '';
    KEYS.forEach(k=>{
      const btn = document.createElement('button');
      btn.className = 'mg6-action' + (prediction === k ? ' predicted' : '');
      btn.textContent = t('mg6.move.' + k);
      btn.addEventListener('click', ()=> playMove(k));
      grid.appendChild(btn);
    });
  }

  function renderRound(){
    const r = document.getElementById('mg6-round-val');
    if(r) r.textContent = round;
  }

  function renderMeter(){
    const fill = document.getElementById('mg6-meter-fill');
    const val = document.getElementById('mg6-meter-val');
    if(fill){ fill.style.width = Math.min(100, meter) + '%'; fill.classList.toggle('low', meter < 40); }
    if(val) val.textContent = Math.min(100, meter) + '%';
  }

  function renderFeedback(msg, cls){
    const fb = document.getElementById('mg6-feedback');
    if(!fb) return;
    fb.textContent = msg;
    fb.className = 'mg6-feedback ' + (cls || '');
  }

  function addLog(msg, cls){
    const log = document.getElementById('mg6-log');
    if(!log) return;
    const line = document.createElement('div');
    line.style.color = cls === 'good' ? 'var(--green)' : (cls === 'bad' ? 'var(--alert)' : 'var(--muted)');
    line.textContent = 'R' + round + ' › ' + msg;
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
  }

  function renderAll(){
    renderPrediction();
    renderActions();
    renderRound();
    renderMeter();
  }

  /* ---------- 行动 ---------- */
  function playMove(move){
    if(!_active || resolved) return;
    const matched = (move === prediction);
    if(matched){
      meter = Math.min(100, meter + 12);
      streak++;
      AudioSys.sfx.alert();
      renderFeedback(t('mg6.matched') + ' ' + t('mg6.matched' + cap(move)), 'bad');
      addLog(t('mg6.move.' + move) + ' — ' + t('mg6.matched'), 'bad');
    } else {
      meter = Math.max(0, meter - 10);
      disruptions++;
      streak = 0;
      AudioSys.sfx.success();
      renderFeedback(t('mg6.dodged') + ' ' + t('mg6.dodged' + cap(move)), 'good');
      addLog(t('mg6.move.' + move) + ' — ' + t('mg6.dodged'), 'good');
    }
    renderMeter();
    document.querySelectorAll('.mg6-action').forEach(b=> b.disabled = true);
    if(round >= TOTAL_ROUNDS || meter >= 100){
      setTimeout(finishGame, 900);
    } else {
      setTimeout(nextRound, 900);
    }
  }

  function cap(s){ return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---------- 结束 ---------- */
  function finishGame(){
    if(!_active || resolved) return;
    resolved = true;
    const caught = meter >= 100;
    const flags = {
      predictionDisrupted: !caught,
      mirrorPredicted: caught,
      mirrorPredictionMeter: meter,
      mirrorDisruptions: disruptions
    };
    let stats = {};
    let resultKey, resultMsg;
    if(caught){
      stats.exposure = 15;
      resultKey = 'mg6.resultCaught';
      resultMsg = t('mg6.resultCaughtMsg');
    } else {
      stats.evidence = 10; stats.trust = 5;
      resultKey = 'mg6.resultDisrupted';
      resultMsg = t('mg6.resultDisruptedMsg');
    }
    AudioSys.sfx.success();
    MGCommon.showResult(resultKey, resultMsg, [
      { labelKey:'mg.common.continue', primary:true, onClick:()=>{ MGCommon.killResult(); finish(!caught, flags, stats); } }
    ]);
  }

  function finish(disrupted, flags, stats){
    cleanup();
    if(disrupted) onSuccess && onSuccess({ flags, stats, disrupted: true });
    else onFail && onFail({ flags, stats });
  }

  /* ---------- 键盘 ---------- */
  function onKeyDown(e){
    if(!_active || resolved) return;
    const map = { '1':'stealth','2':'distraction','3':'hacking','4':'movement','5':'combat','6':'retreat' };
    const move = map[e.key];
    if(move){
      e.preventDefault();
      playMove(move);
    }
  }

  function bindInput(){
    document.addEventListener('keydown', onKeyDown);
  }
  function unbindInput(){
    document.removeEventListener('keydown', onKeyDown);
  }

  function cleanup(){
    _active = false;
    resolved = false;
    MGCommon.killResult();
    unbindInput();
  }

  function refreshLabels(){
    if(_active){
      renderProfile();
      renderAll();
    }
  }

  return { start, bind(){}, cleanup, refreshLabels, get _active(){ return _active; } };
})();
