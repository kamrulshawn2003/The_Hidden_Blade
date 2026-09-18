/* ===== 微游戏 3：最终对决 (Final Duel) — v5 办公室功夫版·加长对决 =====
   街霸式 2D 横版格斗：渡鸦（raven_fight）vs 沈局长（shen_fight），场景 = 局长办公室（夜景），双方各 150 HP。
   功夫招式：冲拳(J) / 侧踢(K) / 连环掌(R) / 升龙拳(T) / 飞踢(Q) / 旋风腿(E) / 渡鸦突袭·三连击(U) / 格挡(L) / 冲刺(Shift)。
   ←→ 移动，↑/W/空格 跳跃。先打空对方 HP 者胜。 */
window.MiniGame3 = (function(){
  const W = 960, H = 540, GROUND = 470;
  const MAX_HP = 150; // 加长对决：双方各 150 HP，单场战斗更持久
  const MOVE = 250, JUMP_V = -570, GRAV = 1550;
  const PUNCH = { dmg:9,  range:66, active:0.16, cd:0.42, knock:235 };
  const KICK  = { dmg:13, range:84, active:0.26, cd:0.92, knock:330 };
  /* v4 新增功夫招式 */
  const PALM  = { dmg:8,  range:62, active:0.26, cd:0.52, knock:170, hits:2, gap:0.09 }; // 连环掌：快攻双连
  const UPPER = { dmg:16, range:74, active:0.22, cd:1.05, knock:260, launch:-430, high:true }; // 升龙拳：浮空技
  /* v3 功夫招式 */
  const FLY   = { dmg:15, range:96, active:0.32, cd:1.35, knock:380 };
  const SPIN  = { dmg:9,  range:82, active:0.34, cd:1.55, knock:255, hits:2, gap:0.11, both:true };
  const MOVE_MAP = { punch: PUNCH, kick: KICK, palm: PALM, up: UPPER };
  const BLOCK_REDUCE = 0.12, BLOCK_PUSH = 70;
  const DASH    = { speed:940, time:0.18, inv:0.24, cd:1.15 };
  const SPECIAL = { dmg:10, range:126, startup:0.18, active:0.28, cd:2.2, knock:150, final:24, finalKnock:560, hits:3, gap:0.10, lunge:240 };
  const FIGHTER_H = 128;

  let onSuccess = null, onFail = null;
  let _active = false, rafId = null, last = 0;
  let keys = {}, sparks = [], shake = 0, endT = 0, ended = '';
  let hitStop = 0, introT = 0, dmgNums = [], combo = 0, comboT = 0, _t = 0;
  let dust = [], flawless = false;
  let hitWords = [], flashT = 0;
  let player = null, shen = null;
  let officeImg = null;

  (function(){
    const im = new Image();
    im.onload = () => { officeImg = im; };
    im.src = 'assets/bg/office_bg.jpg';
  })();

  function makeFighter(x, face){
    return { x, y:GROUND, vx:0, vy:0, face, hp:MAX_HP, state:'idle', t:0,
             atk:null, hitDone:false, hitCount:0, nextHitT:0, cd:0.4, anim:0, koT:0,
             dashCd:0, specialCd:0, dashT:0, blockHeld:false };
  }

  /* ---------- 启动 ---------- */
  function start(success, fail){
    cleanup();
    _active = true;
    onSuccess = success; onFail = fail;
    player = makeFighter(210, 1);
    shen   = makeFighter(750, -1);
    keys = {}; sparks = []; shake = 0; endT = 0; ended = '';
    hitStop = 0; introT = 0; dmgNums = []; combo = 0; comboT = 0; dust = [];
    flawless = false;
    hitWords = []; flashT = 0;
    Engine.showScreen('minigame3');
    resetHPBars();
    bindInput();
    registerDebug();
    last = performance.now();
    rafId = requestAnimationFrame(loop);
  }

  function loop(now){
    if(!_active){ rafId = null; return; }
    const rawDt = Math.min((now - last) / 1000, 0.05);
    last = now;
    _t += rawDt;
    introT += rawDt;
    if(shake > 0) shake -= rawDt;
    if(ended){
      update(rawDt * 0.35);
    } else if(hitStop > 0){
      hitStop -= rawDt;
      for(const s of sparks){ s.t += rawDt * 0.2; }
      updateDust(rawDt);
    } else {
      update(rawDt);
    }
    render();
    rafId = requestAnimationFrame(loop);
  }

  /* ---------- 更新 ---------- */
  function update(dt){
    if(ended){ endT -= dt; if(endT <= 0){ endT = 0; finish(); } return; }
    if(comboT > 0){ comboT -= dt; if(comboT <= 0) combo = 0; }
    updateFighter(player, dt, true);
    updateFighter(shen, dt, false);
    for(const s of sparks){ s.t += dt; }
    sparks = sparks.filter(s => s.t < 0.35);
    for(const n of dmgNums){ n.t += dt; }
    dmgNums = dmgNums.filter(n => n.t < 0.8);
    for(const w of hitWords){ w.t += dt; }
    hitWords = hitWords.filter(w => w.t < 0.6);
    if(flashT > 0) flashT -= dt;
    updateDust(dt);
  }

  function canAct(f){ return f.state === 'idle' || f.state === 'walk' || f.state === 'jump'; }

  function updateFighter(f, dt, isPlayer){
    if(f.cd > 0) f.cd -= dt;
    if(f.dashCd > 0) f.dashCd -= dt;
    if(f.specialCd > 0) f.specialCd -= dt;
    f.anim += dt;

    if(f.state === 'ko'){ f.koT += dt; return; }

    // 格挡意图（玩家按住 L；AI 在下方决策）
    if(isPlayer){
      f.blockHeld = !!(keys.KeyL);
    } else {
      const pAtk = (player.state === 'punch' || player.state === 'kick' || player.state === 'sp' || player.state === 'palm' || player.state === 'up');
      const ad = Math.abs(player.x - f.x);
      if(pAtk && ad < 170){
        if(player.t < 0.12 && !f.blockHeld && Math.random() < 0.3) f.blockHeld = true;
      } else {
        f.blockHeld = false;
      }
    }

    let mx = 0;
    if(isPlayer && canAct(f)){
      const dashKey = (keys.ShiftLeft || keys.ShiftRight);
      if(dashKey && f.dashCd <= 0 && !f.blockHeld){
        beginDash(f);
      } else if(f.blockHeld && f.onGround && (f.state === 'idle' || f.state === 'walk' || f.state === 'jump')){
        f.state = 'block'; f.vx = 0; f.vy = 0;
      } else {
        if(keys.ArrowLeft || keys.KeyA) mx -= 1;
        if(keys.ArrowRight || keys.KeyD) mx += 1;
        if((keys.ArrowUp || keys.KeyW || keys.Space) && f.onGround){ f.vy = JUMP_V; f.onGround = false; f.state = 'jump'; spawnDust(f.x, f.y); }
        if(keys.KeyQ && f.cd <= 0){ beginFly(f); }
        else if(keys.KeyE && f.cd <= 0){ beginSpin(f); }
        else if(keys.KeyT && f.cd <= 0){ beginAttack(f, 'up'); }
        else if(keys.KeyU && f.specialCd <= 0){ beginSpecial(f); }
        else if(keys.KeyJ && f.cd <= 0){ beginAttack(f, 'punch'); }
        else if(keys.KeyK && f.cd <= 0){ beginAttack(f, 'kick'); }
        else if(keys.KeyR && f.cd <= 0){ beginAttack(f, 'palm'); }
      }
    } else if(!isPlayer && canAct(f)){
      mx = aiDecide(f, dt);
      if(f.blockHeld && f.onGround && (f.state === 'idle' || f.state === 'walk' || f.state === 'jump')){
        f.state = 'block'; f.vx = 0; f.vy = 0;
      }
    }

    if(f.state === 'idle' || f.state === 'walk'){
      f.vx = mx * MOVE;
      if(mx !== 0) f.face = mx > 0 ? 1 : -1;
      f.state = mx !== 0 ? 'walk' : 'idle';
    } else if(f.state === 'jump'){
      f.vx = mx * MOVE * 0.85;
      if(mx !== 0) f.face = mx > 0 ? 1 : -1;
    } else if(f.state === 'block'){
      f.vx = 0;
      if(!f.blockHeld || !f.onGround) f.state = 'idle';
    } else if(f.state === 'dash'){
      f.vx = f.face * DASH.speed;
      f.dashT -= dt;
      if(f.dashT <= 0){ f.state = 'idle'; f.vx = 0; }
    }

    f.vy += GRAV * dt;
    f.x += f.vx * dt;
    f.y += f.vy * dt;
    if(f.y >= GROUND){
      f.y = GROUND; f.vy = 0;
      if(!f.onGround){ f.onGround = true; spawnDust(f.x, f.y); if(f.state === 'jump') f.state = 'idle'; }
    }
    f.x = Math.max(30, Math.min(W - 30, f.x));

    if(f.state === 'punch' || f.state === 'kick' || f.state === 'fly' || f.state === 'spin' || f.state === 'sp' || f.state === 'palm' || f.state === 'up'){
      f.t += dt;
      const opp = (f === player) ? shen : player;
      const spec = f.atk;
      const isSp = f.state === 'sp';
      const isFly = f.state === 'fly';
      const isSpin = f.state === 'spin';
      const isUp = f.state === 'up';
      const start = isSp ? spec.startup : 0;
      if(isSp){
        f.vx = (f.t < start) ? f.face * 90 : f.face * (spec.lunge || 220); // 必杀：先蓄力后前冲
      } else if(isFly){
        f.vx = f.face * 430; // 飞踢：快速前冲
      } else if(isSpin){
        f.vx = f.face * 95; // 旋风腿：边转边前压，避免原地转圈
      } else if(isUp){
        f.vx = f.face * 70; // 升龙拳：小幅前移，向上突进
      } else {
        f.vx = f.face * (f.state === 'kick' ? 150 : f.state === 'palm' ? 130 : 110) * Math.sin(Math.min(f.t / 0.12, 1) * Math.PI);
      }
      // 命中判定（支持多段连击）
      const hits = spec.hits || 1;
      if(hits === 1){
        if(!f.hitDone && f.t >= start && f.t <= start + spec.active){
          if(tryHit(f, opp, spec.dmg, spec.knock)) f.hitDone = true;
        }
      } else {
        if(!f.hitDone && f.t >= f.nextHitT && f.t <= start + spec.active){
          const idx = f.hitCount;
          const dmg = (idx === hits - 1 && spec.final) ? spec.final : spec.dmg;
          const knock = (idx === hits - 1 && spec.finalKnock) ? spec.finalKnock : spec.knock;
          if(tryHit(f, opp, dmg, knock)) f.hitCount++;
          f.nextHitT = f.t + spec.gap;
          if(f.hitCount >= hits || f.t >= start + spec.active) f.hitDone = true;
        }
        if(f.t >= start + spec.active) f.hitDone = true;
      }
      const endAt = start + spec.active + (isSp ? 0.18 : isFly ? 0.10 : isSpin ? 0.10 : 0.12);
      if(f.t >= endAt){
        f.state = f.onGround ? 'idle' : 'jump';
        f.atk = null; f.hitDone = false; f.hitCount = 0;
        if(isSp) f.vx = 0;
      }
    } else if(f.state === 'hurt'){
      f.t += dt;
      if(f.t >= 0.26){ f.state = f.onGround ? 'idle' : 'jump'; f.vx = 0; }
    }

    if(f.hp <= 0 && f.state !== 'ko'){
      f.state = 'ko'; f.koT = 0; f.vx = 0; f.vy = -130;
      ended = (f === player) ? 'lose' : 'win';
      endT = 1.7;
      shake = 0.55;
      flashT = 0.3;
      if(ended === 'win') flawless = (player.hp >= MAX_HP);
      AudioSys.sfx.ko();
    }
  }

  function beginAttack(f, kind){
    const spec = MOVE_MAP[kind];
    f.state = kind;
    f.t = 0;
    f.atk = Object.assign({}, spec);
    f.hitDone = false; f.hitCount = 0; f.nextHitT = 0;
    f.cd = spec.cd;
    if(kind === 'up'){
      // 升龙拳：腾身跃起
      f.vy = -300; f.onGround = false;
      spawnDust(f.x, f.y, 6);
      AudioSys.sfx.whoosh();
    }
  }
  function beginDash(f){
    f.state = 'dash'; f.dashT = DASH.time; f.dashCd = DASH.cd;
    f.vx = f.face * DASH.speed;
    spawnDust(f.x, f.y, 6);
  }
  function beginFly(f){
    f.state = 'fly'; f.t = 0;
    f.atk = Object.assign({}, FLY);
    f.hitDone = false; f.hitCount = 0;
    f.cd = FLY.cd;
    f.vy = -300; f.onGround = false; // 跃起前冲，形成飞踢弧线
    spawnDust(f.x, f.y, 6);
    AudioSys.sfx.whoosh();
  }
  function beginSpin(f){
    f.state = 'spin'; f.t = 0;
    f.atk = Object.assign({}, SPIN);
    f.hitDone = false; f.hitCount = 0; f.nextHitT = 0;
    f.cd = SPIN.cd;
    AudioSys.sfx.whoosh();
  }
  function beginSpecial(f){
    f.state = 'sp'; f.t = 0;
    f.atk = Object.assign({}, SPECIAL);
    f.hitDone = false; f.hitCount = 0;
    f.nextHitT = SPECIAL.startup;
    f.specialCd = SPECIAL.cd;
    AudioSys.sfx.charge();
  }

  const HIT_WORDS = ['啪！','砰！','喝！','哈！','咚！'];
  const FINAL_WORDS = ['轰！！','哈！！','中！！'];
  function randWord(isFinal){
    const arr = isFinal ? FINAL_WORDS : HIT_WORDS;
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function tryHit(a, b, dmg, knock){
    if(b.state === 'ko') return false;
    if(b.state === 'dash') return false; // 冲刺无敌
    const faces = a.atk.both ? [a.face, -a.face] : [a.face]; // 旋风腿 360° 判定
    for(const f of faces){
      const hx1 = a.x + (f > 0 ? 10 : -10);
      const hx2 = hx1 + f * a.atk.range;
      const boxA = a.atk.high
        ? { x1: Math.min(hx1, hx2), x2: Math.max(hx1, hx2), y1: a.y - 112, y2: a.y - 30 } // 升龙拳：高位判定
        : { x1: Math.min(hx1, hx2), x2: Math.max(hx1, hx2), y1: a.y - 74, y2: a.y - 12 };
      const boxB = { x1: b.x - 19, x2: b.x + 19, y1: b.y - 74, y2: b.y - 6 };
      if(boxA.x2 > boxB.x1 && boxA.x1 < boxB.x2 && boxA.y2 > boxB.y1 && boxA.y1 < boxB.y2){
      if(b.state === 'block'){
        // 格挡：伤害大减、无硬直、双方轻微后坐
        const d = Math.max(1, Math.round(dmg * BLOCK_REDUCE));
        b.hp = Math.max(0, b.hp - d);
        b.vx = -f * BLOCK_PUSH;
        a.vx = -f * 130;
        sparks.push({ x:(a.x + b.x) / 2, y: b.y - 44, t:0, f, block:true });
        dmgNums.push({ x:b.x, y:b.y - 96, t:0, v:d, crit:false });
        hitWords.push({ x:b.x, y:b.y - 130, t:0, txt:randWord(false) });
        if(a === player){ combo = 0; }
        shake = 0.14;
        hitStop = 0.03;
        AudioSys.sfx.block();
        updateHPBars();
        return true;
      }
      b.hp = Math.max(0, b.hp - dmg);
      const isFinal = (a.atk.hits > 1 && a.hitCount === a.atk.hits - 1);
      if(b.hp > 0){
        b.state = 'hurt'; b.t = 0;
        b.vx = f * knock;
        b.vy = a.atk.launch != null ? a.atk.launch : Math.min(b.vy, -170); // 升龙拳浮空
      }
        sparks.push({ x:(a.x + b.x) / 2, y: b.y - 44, t:0, f });
        dmgNums.push({ x:b.x, y:b.y - 96, t:0, v:dmg, crit:(dmg >= 20) });
        hitWords.push({ x:b.x, y:b.y - 132, t:0, txt:randWord(isFinal) });
        if(a === player){ combo++; comboT = 1.6; } else { combo = 0; }
        shake = isFinal ? 0.32 : 0.2;
        hitStop = isFinal ? 0.10 : 0.06;
        if(isFinal) flashT = 0.16;
        AudioSys.sfx.hit();
        updateHPBars();
        return true;
      }
    }
    return false;
  }

  /* ---------- AI：沈局长 ---------- */
  const AI_SPEED = 0.72; // 沈局长步速系数：沉稳逼近，不再飞速乱窜
  function aiDecide(f, dt){
    const opp = player;
    const dist = opp.x - f.x;
    const ad = Math.abs(dist);
    let mx = 0;
    if(ad > 120){
      mx = (dist > 0 ? 1 : -1) * AI_SPEED;
      if(Math.random() < 0.05 && f.specialCd <= 0 && ad < SPECIAL.range + 60) beginSpecial(f);
      else if(Math.random() < 0.03 && f.cd <= 0 && ad > 150 && ad < 430) beginFly(f); // 沈局长飞踢突进
      else if(Math.random() < 0.02 && f.dashCd <= 0 && ad > 90) beginDash(f);
    } else if(f.cd <= 0){
      if(ad < KICK.range + 24){
        const r = Math.random();
        if(r < 0.16) beginAttack(f, 'kick');
        else if(r < 0.33) beginAttack(f, 'punch');
        else if(r < 0.40) beginAttack(f, 'palm'); // 连环掌快攻
        else if(r < 0.46 && opp.state === 'jump') beginAttack(f, 'up'); // 对空升龙
        else if(r < 0.55 && f.specialCd <= 0) beginSpecial(f);
        else if(r < 0.63) beginSpin(f); // 旋风腿（低频，避免原地转圈）
        else if(r < 0.68 && ad > 70) beginFly(f); // 近身飞踢
        else if(r < 0.78) mx = (dist > 0 ? -1 : 1) * AI_SPEED; // 短暂后撤
        else if(f.dashCd <= 0) beginDash(f);
        else f.cd = 0.5;
      } else {
        mx = (dist > 0 ? 1 : -1) * AI_SPEED;
        if(opp.state === 'jump' && ad < 130 && Math.random() < 0.05) beginAttack(f, 'up'); // 防跳
        else if(Math.random() < 0.04 && f.specialCd <= 0) beginSpecial(f);
        else if(Math.random() < 0.02 && f.dashCd <= 0) beginDash(f);
        else if(Math.random() < 0.10) f.cd = 0.2;
      }
    } else if(ad < 90 && f.onGround && Math.random() < 0.006){
      // 偶尔小跳调整身位，频率已大幅降低
      f.vy = JUMP_V * 0.9; f.onGround = false; f.state = 'jump';
      mx = (dist > 0 ? -1 : 1) * AI_SPEED;
      f.cd = 1.1;
    }
    if(!f.onGround) mx = (dist > 0 ? 1 : -1) * 0.6;
    return mx;
  }

  /* ---------- 结束 ---------- */
  function finish(){
    if(!_active) return;
    const ok = ended === 'win';
    if(ok){ AudioSys.sfx.success(); }
    cleanup();
    if(ok) onSuccess && onSuccess();
    else onFail && onFail();
  }

  function cleanup(){
    if(rafId){ cancelAnimationFrame(rafId); rafId = null; }
    unbindInput();
    _active = false;
  }

  /* ---------- 粒子 ---------- */
  function spawnDust(x, y, n){
    n = n || 5;
    for(let i = 0; i < n; i++){
      dust.push({ x:x + (Math.random()-0.5)*14, y:y - 2, vx:(Math.random()-0.5)*90, vy:-Math.random()*60-8, t:0, life:0.35+Math.random()*0.2, r:2+Math.random()*2.5 });
    }
  }
  function updateDust(dt){
    for(const p of dust){ p.t += dt; p.x += p.vx*dt; p.y += p.vy*dt; p.vy += 80*dt; }
    dust = dust.filter(p => p.t < p.life);
  }

  /* ---------- 渲染 ---------- */
  function render(){
    const cv = document.getElementById('battle-canvas');
    if(!cv) return;
    const ctx = cv.getContext('2d');

    // 局长办公室背景（夜景）
    drawOffice(ctx);

    if(shake > 0){
      ctx.save();
      ctx.translate((Math.random() - 0.5) * shake * 26, (Math.random() - 0.5) * shake * 26);
    }

    drawShadow(ctx, player.x, 0.95);
    drawShadow(ctx, shen.x, 0.95);

    drawFighter(ctx, player, { sprite:'raven_fight', accent:'#c0392b' });
    drawFighter(ctx, shen,   { sprite:'shen_fight', accent:'#7f8ca0' });

    if(shake > 0) ctx.restore();

    // 命中火花
    for(const s of sparks){
      const a = 1 - s.t / 0.35;
      ctx.strokeStyle = s.block ? 'rgba(160,205,255,' + a + ')' : 'rgba(255,215,90,' + a + ')';
      ctx.lineWidth = s.block ? 4 : 3.5;
      for(let k = 0; k < 5; k++){
        const ang = s.f > 0 ? (k * Math.PI / 2.5 + 0.35) : (k * Math.PI / 2.5 + 0.35 + Math.PI);
        const r = 8 + s.t * 140;
        ctx.beginPath();
        ctx.moveTo(s.x + Math.cos(ang) * 4, s.y + Math.sin(ang) * 4);
        ctx.lineTo(s.x + Math.cos(ang) * r, s.y + Math.sin(ang) * r);
        ctx.stroke();
      }
      ctx.fillStyle = (s.block ? 'rgba(220,240,255,' : 'rgba(255,255,220,') + a * 0.8 + ')';
      ctx.beginPath(); ctx.arc(s.x, s.y, 6 + s.t * 32, 0, Math.PI * 2); ctx.fill();
    }

    // 飘字伤害
    for(const n of dmgNums){
      const a = 1 - n.t / 0.8;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold ' + (n.crit ? 28 : 22) + 'px monospace';
      ctx.fillStyle = n.crit ? '#ffb347' : '#ffffff';
      ctx.shadowColor = 'rgba(0,0,0,.9)';
      ctx.shadowBlur = 6;
      ctx.fillText('-' + n.v, n.x, n.y - n.t * 46);
      ctx.shadowBlur = 0;
    }

    // 功夫命中拟声字
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for(const w of hitWords){
      const a = 1 - w.t / 0.6;
      const pop = 1 + Math.min(w.t * 3, 0.25);
      ctx.save();
      ctx.translate(w.x, w.y - w.t * 34);
      ctx.scale(pop, pop);
      ctx.globalAlpha = a;
      ctx.font = 'bold 30px "KaiTi", "STKaiti", "Microsoft YaHei", sans-serif';
      ctx.fillStyle = '#ffb347';
      ctx.shadowColor = 'rgba(255,90,0,.9)';
      ctx.shadowBlur = 10;
      ctx.fillText(w.txt, 0, 0);
      ctx.restore();
    }
    ctx.shadowBlur = 0;

    // 必杀收招 / KO 全屏闪光
    if(flashT > 0){
      ctx.fillStyle = 'rgba(255,235,200,' + Math.min(0.5, flashT * 3) + ')';
      ctx.fillRect(0, 0, W, H);
    }

    // 连击数
    if(combo >= 2 && !ended){
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 28px monospace';
      ctx.fillStyle = '#ffd74a';
      ctx.shadowColor = 'rgba(255,150,0,.9)';
      ctx.shadowBlur = 12;
      ctx.fillText(combo + ' ' + I18N.t('mg3.hitsTag') + '!', player.x, player.y - 156);
      ctx.shadowBlur = 0;
    }

    // 低血量警告
    if(player.hp <= 30 && !ended){
      const a = 0.12 + 0.10 * Math.sin(gameTime() * 6);
      const v = ctx.createRadialGradient(W/2, H/2, H * 0.3, W/2, H/2, H * 0.9);
      v.addColorStop(0, 'rgba(255,40,40,0)');
      v.addColorStop(1, 'rgba(255,40,40,' + a + ')');
      ctx.fillStyle = v;
      ctx.fillRect(0, 0, W, H);
    }

    // 开场：VS 横幅 → FIGHT!
    if(introT < 1.7 && !ended){
      ctx.fillStyle = 'rgba(0,0,0,.32)';
      ctx.fillRect(0, 0, W, H);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      if(introT < 1.05){
        const a = introT < 0.75 ? 1 : (1.05 - introT) / 0.3;
        ctx.globalAlpha = Math.max(0, a);
        // 两侧角色名
        ctx.font = 'bold 30px monospace';
        ctx.fillStyle = '#e8c35a';
        ctx.shadowColor = 'rgba(212,175,55,.7)';
        ctx.shadowBlur = 10;
        ctx.fillText(I18N.t('mg3.you'), W * 0.22, H * 0.5);
        ctx.fillStyle = '#9fb4cc';
        ctx.fillText(I18N.t('mg3.shen'), W * 0.78, H * 0.5);
        ctx.shadowBlur = 0;
        // 中间 VS
        const pop = 1 + Math.max(0, 0.3 - introT * 0.6) * 2.2;
        ctx.save();
        ctx.translate(W/2, H * 0.5);
        ctx.scale(pop, pop);
        ctx.font = 'bold 74px "Times New Roman", serif';
        ctx.fillStyle = '#ff5050';
        ctx.shadowColor = 'rgba(255,0,0,.9)';
        ctx.shadowBlur = 24;
        ctx.fillText('VS', 0, 0);
        ctx.restore();
        // 回合标签
        ctx.globalAlpha = Math.max(0, a);
        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = 'rgba(240,235,215,.85)';
        ctx.fillText(I18N.t('mg3.roundTag') + ' 1', W/2, H * 0.68);
        ctx.shadowBlur = 0;
      } else {
        const t = introT - 1.05;
        const pop = 1 + Math.max(0, 0.25 - t * 0.8) * 2;
        ctx.save();
        ctx.translate(W/2, H/2 - 10);
        ctx.scale(pop, pop);
        ctx.globalAlpha = t > 0.5 ? (0.6 - t) * 2 : 1;
        ctx.font = 'bold 80px monospace';
        ctx.fillStyle = '#ff5050';
        ctx.shadowColor = 'rgba(255,0,0,.9)';
        ctx.shadowBlur = 26;
        ctx.fillText(I18N.t('mg3.fightTag'), 0, 0);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    }

    // 决胜文字
    if(ended){
      ctx.fillStyle = 'rgba(0,0,0,.58)';
      ctx.fillRect(0, 0, W, H);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 84px monospace';
      ctx.fillStyle = ended === 'win' ? '#ffd74a' : '#ff5050';
      ctx.shadowColor = 'rgba(0,0,0,.9)';
      ctx.shadowBlur = 18;
      ctx.fillText('K.O.', W/2, H/2 - 22);
      ctx.shadowBlur = 0;
      ctx.font = 'bold 34px monospace';
      ctx.fillStyle = '#fff';
      ctx.fillText(ended === 'win' ? I18N.t('mg3.winTag') : I18N.t('mg3.loseTag'), W/2, H/2 + 42);
      if(flawless){
        const pulse = 0.5 + 0.5 * Math.sin(gameTime() * 8);
        ctx.font = 'bold 30px monospace';
        ctx.fillStyle = 'rgba(255,215,74,' + (0.7 + pulse * 0.3) + ')';
        ctx.shadowColor = 'rgba(255,180,40,.9)';
        ctx.shadowBlur = 14;
        ctx.fillText(I18N.t('mg3.flawlessTag'), W/2, H/2 + 88);
        ctx.shadowBlur = 0;
      }
    }
  }

  function gameTime(){ return _t; }

  /* ---------- 办公室背景（局长办公室，AI 生成的办公楼场景图） ---------- */
  function drawOffice(ctx){
    if(officeImg){
      ctx.drawImage(officeImg, 0, 0, W, H);
      // 压暗 + 冷色调，突出角色
      ctx.fillStyle = 'rgba(6,10,18,.40)';
      ctx.fillRect(0, 0, W, H);
    } else {
      // 图片尚未加载时先铺渐变底色
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#10151d');
      bg.addColorStop(0.7, '#161c26');
      bg.addColorStop(1, '#1b2330');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);
    }

    // 地板（角色站立面，压暗保证对比度）
    ctx.fillStyle = 'rgba(8,10,14,.84)';
    ctx.fillRect(0, GROUND, W, H - GROUND);
    ctx.fillStyle = 'rgba(255,255,255,.07)';
    ctx.fillRect(0, GROUND, W, 2);
    ctx.fillStyle = 'rgba(0,0,0,.5)';
    ctx.fillRect(0, GROUND + 2, W, 5);

    // 漂浮灰尘（冷色办公室粉尘）
    for(let i = 0; i < 18; i++){
      const dx = (i * 61 + gameTime() * 6) % W;
      const dy = 60 + (i * 97) % 280;
      ctx.globalAlpha = 0.05 + 0.05 * Math.sin(gameTime() * 1.4 + i);
      ctx.fillStyle = '#9fb4cc';
      ctx.beginPath(); ctx.arc(dx, dy, 1.5, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function drawShadow(ctx, x, k){
    ctx.fillStyle = 'rgba(0,0,0,.4)';
    ctx.beginPath();
    ctx.ellipse(x, GROUND + 4, 38 * k, 8 * k, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawFighter(ctx, f, c){
    const img = SpriteLib.get(c.sprite);
    const x = f.x, y = f.y;
    let rot = 0, scaleY = 1, alpha = 1, bob = 0, dx = 0;

    if(f.state === 'ko'){
      const prog = Math.min(f.koT * 2.1, 1);
      rot = f.face * prog * 1.45;
      const sink = prog * 9;
      alpha = 1 - prog * 0.25;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(x, y - sink);
      ctx.rotate(rot);
      const w = FIGHTER_H * (img ? img.width / img.height : 0.8);
      if(f.face < 0) ctx.scale(-1, 1);
      if(img) ctx.drawImage(img, -w/2, -FIGHTER_H, w, FIGHTER_H);
      ctx.restore();
      if(f.koT < 1.2){
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 24px monospace';
        ctx.fillStyle = '#ffd74a';
        ctx.shadowColor = 'rgba(255,180,40,.9)';
        ctx.shadowBlur = 8;
        ctx.fillText('★', x + f.face * 22, y - FIGHTER_H - 12 + Math.sin(f.koT * 12) * 4);
        ctx.shadowBlur = 0;
      }
      return;
    }

    if(f.state === 'idle' || f.state === 'walk'){
      if(f.state === 'walk'){
        bob = Math.sin(f.anim * 13) * 3;
        rot = Math.sin(f.anim * 13) * 0.05;
      } else {
        // 功夫起手式：呼吸沉肩、马步微晃
        bob = Math.sin(f.anim * 3.2) * 2.2;
        rot = Math.sin(f.anim * 2.1) * 0.035;
      }
    } else if(f.state === 'jump'){
      scaleY = 1.06;
      rot = f.face * 0.04;
    } else if(f.state === 'punch' || f.state === 'kick' || f.state === 'fly' || f.state === 'spin' || f.state === 'sp' || f.state === 'palm' || f.state === 'up'){
      const isSp = f.state === 'sp';
      const isFly = f.state === 'fly';
      const isSpin = f.state === 'spin';
      const isPalm = f.state === 'palm';
      const isUp = f.state === 'up';
      const prog = Math.min(f.t / Math.max(0.001, f.atk.active + (isSp ? f.atk.startup : 0) + (isFly ? 0.10 : isSpin ? 0.10 : 0.12)), 1);
      const p = Math.sin(prog * Math.PI);
      if(isSp){
        // 必杀·渡鸦突袭三连击
        dx = f.face * 30 * p;
        if(f.t < f.atk.startup){
          // 蓄力：红光气环 + 汇聚粒子
          const blink = Math.floor(f.t * 22) % 2 === 0;
          ctx.strokeStyle = blink ? 'rgba(255,70,70,.95)' : 'rgba(255,70,70,.25)';
          ctx.lineWidth = 3;
          ctx.shadowColor = 'rgba(255,40,40,.9)';
          ctx.shadowBlur = 14;
          ctx.beginPath(); ctx.arc(x + f.face * 34, y - 54, 20 + f.t * 90, 0, Math.PI * 2); ctx.stroke();
          ctx.shadowBlur = 0;
          for(let i = 0; i < 5; i++){
            const a2 = f.t * 6 + i * 1.26;
            const rr = 14 + f.t * 120;
            const px = x + f.face * 30 + Math.cos(a2) * rr, py = y - 54 + Math.sin(a2) * rr * 0.4;
            ctx.fillStyle = 'rgba(255,90,90,.7)';
            ctx.beginPath(); ctx.arc(px, py, 2.4, 0, Math.PI * 2); ctx.fill();
          }
        } else {
          rot = f.face * 0.22 * p;
          drawStrikeArc(ctx, x + f.face * 52, y - 52, f.face, 34, prog);
          if(f.hitCount >= 1) drawStrikeArc(ctx, x + f.face * 62, y - 66, f.face, 26, prog);
          if(f.hitCount >= 2) drawStrikeArc(ctx, x + f.face * 72, y - 44, f.face, 42, prog);
          drawFistFlash(ctx, x + f.face * 60, y - 52, f.face, p);
        }
      } else if(isFly){
        // 飞踢：身体横展 + 速度线 + 踢击弧
        dx = f.face * 18 * p;
        rot = f.face * 0.55 * p;
        scaleY = 0.92;
        drawSpeedLines(ctx, f);
        drawStrikeArc(ctx, x + f.face * 54, y - 44, f.face, 32, prog);
      } else if(isSpin){
        // 旋风腿：360° 旋转 + 残影 + 双弧
        dx = f.face * 16 * Math.sin(prog * Math.PI);
        rot = f.face * prog * Math.PI * 2.4;
        drawSpinTrail(ctx, f, img, c);
        drawStrikeArc(ctx, x + f.face * 46, y - 52, f.face, 30, prog);
        drawStrikeArc(ctx, x - f.face * 34, y - 60, -f.face, 22, prog);
      } else if(isPalm){
        // 连环掌：双掌前推 + 气劲波纹
        dx = f.face * 22 * p;
        rot = f.face * 0.20 * p;
        drawPalmWave(ctx, x + f.face * (38 + f.hitCount * 10), y - 50, f.face, p);
        drawStrikeArc(ctx, x + f.face * 44, y - 56, f.face, 20, prog);
      } else if(isUp){
        // 升龙拳：腾身突进 + 上升气劲
        dx = f.face * 12 * p;
        rot = f.face * 0.14 * p;
        scaleY = 0.95 + 0.12 * p;
        drawUpArc(ctx, x + f.face * 48, y - 60, f.face, p);
        if(f.vy < 0) drawSpeedLines(ctx, f);
      } else {
        dx = f.face * (f.state === 'kick' ? 19 : 14) * p;
        if(f.state === 'punch'){
          // 冲拳：前倾沉肩 + 拳风
          rot = f.face * 0.30 * p;
          drawStrikeArc(ctx, x + f.face * 40, y - 52, f.face, 24, prog);
          drawFistFlash(ctx, x + f.face * 48, y - 52, f.face, prog);
        } else {
          // 侧踢：大幅转体
          rot = f.face * 0.36 * p;
          drawStrikeArc(ctx, x + f.face * 46, y - 56, f.face, 32, prog);
        }
      }
    } else if(f.state === 'block'){
      // 格挡架势 + 盾弧
      bob = Math.sin(f.anim * 2.4) * 1.2;
      drawBlockArc(ctx, x + f.face * 16, y - 54, f.face);
    } else if(f.state === 'dash'){
      // 冲刺残影
      rot = f.face * 0.12;
      drawDashTrail(ctx, f, img, c);
    } else if(f.state === 'hurt'){
      bob = Math.sin(f.t * 50) * 2.5;
      if(Math.floor(f.t * 26) % 2 === 0) alpha = 0.55;
      rot = -f.face * 0.08;
    }

    drawSprite(ctx, img, x + dx, y + bob, FIGHTER_H, f.face, rot, scaleY, alpha);
    drawShadow(ctx, x, 0.95);

    if(f.state === 'hurt'){
      ctx.strokeStyle = 'rgba(255,60,60,.7)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y - FIGHTER_H * 0.45, FIGHTER_H * 0.6 + f.t * 44, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  function drawStrikeArc(ctx, cx, cy, face, r, prog){
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,' + (0.85 * (1 - prog) + 0.15) + ')';
    ctx.lineWidth = 4;
    ctx.shadowColor = 'rgba(255,255,255,.8)';
    ctx.shadowBlur = 9;
    ctx.beginPath();
    ctx.arc(cx, cy, r * (0.5 + prog), face > 0 ? -0.9 : Math.PI - 0.9, face > 0 ? 0.9 : Math.PI + 0.9);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  function drawFistFlash(ctx, cx, cy, face, prog){
    const r = 6 + prog * 22;
    const a = (1 - prog) * 0.8;
    ctx.strokeStyle = 'rgba(255,235,170,' + a + ')';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = 'rgba(255,250,220,' + a * 0.5 + ')';
    ctx.beginPath(); ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2); ctx.fill();
  }

  function drawPalmWave(ctx, cx, cy, face, prog){
    // 连环掌气劲：双层椭圆波纹（随连击次数推进）
    ctx.save();
    const a = (1 - prog) * 0.85 + 0.1;
    const r = 10 + prog * 30;
    ctx.strokeStyle = 'rgba(190,225,255,' + a + ')';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = 'rgba(120,190,255,.9)';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.ellipse(cx, cy, r, r * 0.55, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(235,248,255,' + a * 0.6 + ')';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(cx + face * 9, cy, r * 0.6, r * 0.32, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  function drawUpArc(ctx, cx, cy, face, prog){
    // 升龙拳：向上斩击弧 + 尾焰
    ctx.save();
    const a = (1 - prog) * 0.9 + 0.1;
    ctx.strokeStyle = 'rgba(255,220,120,' + a + ')';
    ctx.lineWidth = 5;
    ctx.shadowColor = 'rgba(255,190,80,.9)';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(cx, cy, 22 + prog * 32, Math.PI * 0.12, Math.PI * 0.88);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,180,90,' + a * 0.5 + ')';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx + face * 8, cy - 10, 10 + prog * 20, Math.PI * 0.2, Math.PI * 0.8);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  function drawSpeedLines(ctx, f){
    ctx.strokeStyle = 'rgba(255,255,255,.5)';
    ctx.lineWidth = 2;
    for(let i = 0; i < 4; i++){
      const ly = f.y - 30 - i * 22;
      const len = 26 + (i % 2) * 18;
      const x0 = f.x - f.face * (30 + i * 8);
      ctx.beginPath();
      ctx.moveTo(x0, ly);
      ctx.lineTo(x0 - f.face * len, ly);
      ctx.stroke();
    }
  }

  function drawSpinTrail(ctx, f, img, c){
    for(let i = 1; i <= 2; i++){
      const gx = f.x - f.face * i * 22;
      ctx.save();
      ctx.globalAlpha = 0.22 - i * 0.07;
      ctx.translate(gx, f.y);
      if(f.face < 0) ctx.scale(-1, 1);
      if(img) ctx.drawImage(img, -FIGHTER_H * (img.width / img.height) / 2, -FIGHTER_H, FIGHTER_H * (img.width / img.height), FIGHTER_H);
      ctx.restore();
    }
  }

  function drawBlockArc(ctx, cx, cy, face){
    ctx.save();
    const pulse = 0.8 + Math.sin(_t * 10) * 0.2;
    ctx.strokeStyle = 'rgba(150,210,255,' + (0.85 * pulse) + ')';
    ctx.lineWidth = 5;
    ctx.shadowColor = 'rgba(110,170,255,.9)';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(cx, cy, 44, face > 0 ? -1.15 : Math.PI - 1.15, face > 0 ? 1.15 : Math.PI + 1.15);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  function drawDashTrail(ctx, f, img, c){
    for(let i = 1; i <= 3; i++){
      const gx = f.x - f.face * i * 26;
      ctx.save();
      ctx.globalAlpha = 0.34 - i * 0.09;
      ctx.translate(gx, f.y);
      if(f.face < 0) ctx.scale(-1, 1);
      if(img) ctx.drawImage(img, -FIGHTER_H * (img.width / img.height) / 2, -FIGHTER_H, FIGHTER_H * (img.width / img.height), FIGHTER_H);
      ctx.restore();
    }
  }

  function drawSprite(ctx, img, x, y, h, face, rot, scaleY, alpha){
    if(!img) return;
    const w = h * (img.width / img.height);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    if(rot) ctx.rotate(rot);
    if(scaleY) ctx.scale(1, scaleY);
    if(face < 0) ctx.scale(-1, 1);
    ctx.drawImage(img, -w / 2, -h, w, h);
    ctx.restore();
  }

  /* ---------- HP 条 ---------- */
  function resetHPBars(){ updateHPBars(true); }
  function updateHPBars(force){
    if(!player || !shen) return;
    const y = document.getElementById('battle-hp-you');
    const s = document.getElementById('battle-hp-shen');
    const yv = document.getElementById('battle-hp-you-val');
    const sv = document.getElementById('battle-hp-shen-val');
    if(y) y.style.width = (player.hp / MAX_HP * 100) + '%';
    if(s) s.style.width = (shen.hp / MAX_HP * 100) + '%';
    if(yv) yv.textContent = player.hp;
    if(sv) sv.textContent = shen.hp;
    if(y) y.classList.toggle('danger', player.hp <= 30);
    if(s) s.classList.toggle('danger', shen.hp <= 30);
  }

  /* ---------- 输入 ---------- */
  function onKeyDown(e){
    if(!_active) return;
    if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Space','KeyW','KeyA','KeyS','KeyD','KeyJ','KeyK','KeyQ','KeyE','KeyR','KeyT','KeyU','KeyL','ShiftLeft','ShiftRight'].indexOf(e.code) >= 0){
      e.preventDefault();
    }
    keys[e.code] = true;
  }
  function onKeyUp(e){ keys[e.code] = false; }
  function bindInput(){
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
  }
  function unbindInput(){
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('keyup', onKeyUp);
  }

  function refreshLabels(){}

  function bind(){}

  function registerDebug(){
    if(!window.__THB_DEBUG__) return;
    window.__THB_DEBUG__.mg3 = {
      getState: () => ({
        px: Math.round(player ? player.x : 0), ps: player ? player.state : '',
        sx: Math.round(shen ? shen.x : 0), ss: shen ? shen.state : '',
        ph: player ? player.hp : 0, sh: shen ? shen.hp : 0, ended, flawless
      }),
      setHp: (p, s) => { if(player) player.hp = p; if(shen) shen.hp = s; updateHPBars(); },
      setCd: (v) => { if(player) player.cd = v; if(shen) shen.cd = v; },
      setPos: (px, sx) => { if(player) player.x = px; if(shen) shen.x = sx; },
      setFace: (v) => { if(player) player.face = v; if(shen) shen.face = v; }
    };
  }

  return { start, bind, cleanup, refreshLabels, get _active(){ return _active; } };
})();
