/* ===== 微游戏 2：精密撬锁系统 (Precision Lockpicking) ===== */
window.MiniGame2 = (function(){
  const TIME_LIMIT = 60;
  const MAX_PICKS = 3;
  const TOLERANCE = 5;       // ±5° 甜蜜点容差
  const BREAK_TIME = 1500;   // 错误角度持续1.5秒折断
  const PARTIAL_ZONE = 25;   // ±25° 内可部分转动

  let timer = null;
  let timeLeft = TIME_LIMIT;
  let picks = MAX_PICKS;
  let noise = 0;
  let targetAngle = 90;      // 随机甜蜜点
  let pickAngle = 90;        // 当前撬针角度
  let cylinderRot = 0;       // 锁芯当前旋转角度
  let tensioning = false;
  let wrongHoldStart = 0;    // 错误角度持续时间戳
  let stress = 0;            // 张力百分比
  let onSuccess = null, onFail = null;
  let _active = false;
  let rafId = null;
  let breakAnim = 0;

  /* ---------- 启动 ---------- */
  function start(success, fail){
    cleanup();
    onSuccess = success; onFail = fail;
    timeLeft = TIME_LIMIT;
    picks = MAX_PICKS;
    noise = 0;
    targetAngle = 10 + Math.random() * 160; // 10°~170°
    pickAngle = 90;
    cylinderRot = 0;
    tensioning = false;
    wrongHoldStart = 0;
    stress = 0;
    breakAnim = 0;
    _active = true;

    Engine.showScreen('minigame2');
    updateHUD();
    renderLock();
    bindInput();
    timer = setInterval(tick, 1000);
    rafId = requestAnimationFrame(loop);
  }

  /* ---------- 主循环 ---------- */
  function loop(){
    if(!_active) return;
    const now = performance.now();

    if(tensioning){
      const diff = Math.abs(pickAngle - targetAngle);
      if(diff <= TOLERANCE){
        // 甜蜜点：锁芯完全转动
        cylinderRot = Math.min(180, cylinderRot + 3);
        stress = 100;
        wrongHoldStart = 0;
        if(cylinderRot >= 180){
          success();
          return;
        }
      } else if(diff <= PARTIAL_ZONE){
        // 接近：部分转动
        const partial = 1 - (diff - TOLERANCE) / (PARTIAL_ZONE - TOLERANCE);
        const targetRot = partial * 90;
        cylinderRot += (targetRot - cylinderRot) * 0.1;
        stress = partial * 70;
        wrongHoldStart = 0;
      } else {
        // 错误角度：锁芯不动，张力累积
        cylinderRot *= 0.9;
        stress = Math.min(100, stress + 2);
        if(wrongHoldStart === 0) wrongHoldStart = now;
        if(now - wrongHoldStart >= BREAK_TIME){
          breakPick();
        }
      }
    } else {
      // 松开张力：锁芯回弹
      cylinderRot *= 0.92;
      stress = Math.max(0, stress - 4);
      wrongHoldStart = 0;
    }

    renderLock();
    rafId = requestAnimationFrame(loop);
  }

  /* ---------- 折断撬针 ---------- */
  function breakPick(){
    AudioSys.sfx.fail();
    picks--;
    noise = Math.min(100, noise + 30);
    tensioning = false;
    wrongHoldStart = 0;
    cylinderRot = 0;
    stress = 0;
    breakAnim = 1;

    setStatus(I18N.t('mg2.pickBroken'));
    updateHUD();

    if(picks <= 0){
      setTimeout(fail, 600);
    } else {
      setTimeout(()=>{
        if(_active){
          breakAnim = 0;
          setStatus(I18N.t('mg2.statusIdle'));
          renderLock();
        }
      }, 800);
    }
  }

  /* ---------- 计时器 ---------- */
  function tick(){
    timeLeft--;
    updateHUD();
    if(timeLeft <= 10){
      const el = document.querySelector('.lock-timer');
      if(el) el.classList.add('warning');
    }
    if(timeLeft <= 0){ fail(); }
  }

  /* ---------- 渲染锁 ---------- */
  function renderLock(){
    const pick = document.getElementById('lock-pick');
    const cylinder = document.getElementById('lock-cylinder');
    const wrench = document.getElementById('tension-wrench');
    const angleVal = document.getElementById('lock-angle-val');

    if(pick){
      // 撬针角度：0-180°，以锁芯中心为轴
      const pickRot = pickAngle - 90; // SVG中0度是向上，所以偏移-90
      let transform = `rotate(${pickRot} 150 160)`;
      if(breakAnim > 0){
        const shake = (Math.random() - 0.5) * 8 * breakAnim;
        transform += ` translate(${shake},0)`;
      }
      pick.setAttribute('transform', transform);
    }
    if(cylinder){
      cylinder.setAttribute('transform', `rotate(${cylinderRot} 150 160)`);
    }
    if(wrench){
      // 张力扳手随锁芯转动
      wrench.setAttribute('transform', `rotate(${cylinderRot * 0.5} 150 250)`);
    }
    if(angleVal) angleVal.textContent = Math.round(pickAngle);

    // 张力条
    const stressFill = document.getElementById('lock-stress-fill');
    const stressVal = document.getElementById('lock-stress-val');
    if(stressFill) stressFill.style.width = stress + '%';
    if(stressVal) stressVal.textContent = Math.round(stress) + '%';
    if(stressFill){
      if(stress > 80) stressFill.style.background = 'var(--alert)';
      else if(stress > 50) stressFill.style.background = 'var(--yellow)';
      else stressFill.style.background = 'var(--green)';
    }
  }

  /* ---------- HUD ---------- */
  function updateHUD(){
    const t = document.getElementById('lock-timer-val');
    const p = document.getElementById('lock-picks-val');
    const nf = document.getElementById('lock-noise-fill');
    const nv = document.getElementById('lock-noise-val');
    if(t) t.textContent = timeLeft;
    if(p) p.textContent = picks;
    if(nf) nf.style.width = noise + '%';
    if(nv) nv.textContent = Math.round(noise) + '%';
  }

  function setStatus(msg){
    const el = document.getElementById('lock-status');
    if(el) el.textContent = msg;
  }

  /* ---------- 输入绑定 ---------- */
  function bindInput(){
    const stage = document.getElementById('lock-stage');

    // 鼠标移动调整角度
    stage.onmousemove = (e)=>{
      if(!_active || tensioning) return;
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const ratio = x / rect.width;
      pickAngle = Math.max(0, Math.min(180, ratio * 180));
    };

    // 鼠标按下/松开 = 张力
    stage.onmousedown = (e)=>{
      e.preventDefault();
      if(_active) { tensioning = true; AudioSys.sfx.click(); }
    };
    document.addEventListener('mouseup', onMouseUp);

    // 键盘
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
  }

  function onMouseUp(){
    tensioning = false;
  }

  function onKeyDown(e){
    if(!_active) return;
    if(e.code === 'Space'){
      e.preventDefault();
      if(!tensioning){ tensioning = true; AudioSys.sfx.click(); }
    } else if(e.code === 'ArrowLeft'){
      e.preventDefault();
      if(!tensioning) pickAngle = Math.max(0, pickAngle - 1);
    } else if(e.code === 'ArrowRight'){
      e.preventDefault();
      if(!tensioning) pickAngle = Math.min(180, pickAngle + 1);
    }
  }

  function onKeyUp(e){
    if(e.code === 'Space'){
      tensioning = false;
    }
  }

  function unbindInput(){
    const stage = document.getElementById('lock-stage');
    if(stage){ stage.onmousemove = null; stage.onmousedown = null; }
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('keyup', onKeyUp);
  }

  /* ---------- 成功/失败 ---------- */
  function success(){
    if(!_active) return;
    AudioSys.sfx.success();
    cleanup();
    onSuccess && onSuccess();
  }

  function fail(){
    if(!_active) return;
    AudioSys.sfx.fail();
    cleanup();
    onFail && onFail();
  }

  function cleanup(){
    if(timer){ clearInterval(timer); timer = null; }
    if(rafId){ cancelAnimationFrame(rafId); rafId = null; }
    unbindInput();
    tensioning = false;
    _active = false;
    const el = document.querySelector('.lock-timer');
    if(el) el.classList.remove('warning');
  }

  function refreshLabels(){
    if(_active){
      setStatus(I18N.t('mg2.statusIdle'));
    }
  }

  function bind(){
    // 输入在 start() 中动态绑定
  }

  return { start, bind, cleanup, refreshLabels, get _active(){ return _active; } };
})();
