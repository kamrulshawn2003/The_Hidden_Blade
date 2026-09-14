/* ===== 微游戏 3：最终对决 (Final Duel) — v2 =====
   街霸式 2D 横版格斗：渡鸦（raven_fight）vs 沈局长（shen_fight）。
   全新战斗精灵 + 地下格斗场背景图 + 空气拳 + 无伤完美胜利。
   ←→ 移动，↑/W/空格 跳跃，J 拳击，K 踢击。先打空对方 HP 者胜。 */
window.MiniGame3 = (function(){
  const W = 960, H = 540, GROUND = 470;
  const MAX_HP = 100;
  const MOVE = 250, JUMP_V = -570, GRAV = 1550;
  const PUNCH = { dmg:9,  range:66, active:0.16, cd:0.42, knock:235 };
  const KICK  = { dmg:13, range:84, active:0.26, cd:0.92, knock:330 };
  const FIGHTER_H = 128;

  let onSuccess = null, onFail = null;
  let _active = false, rafId = null, last = 0;
  let keys = {}, sparks = [], shake = 0, endT = 0, ended = '';
  let hitStop = 0, introT = 0, dmgNums = [], combo = 0, comboT = 0, _t = 0;
  let dust = [], flawless = false, arenaImg = null;
  let player = null, shen = null;

  (function(){
    const im = new Image();
    im.onload = () => { arenaImg = im; };
    im.src = 'assets/bg/arena_bg.jpg';
  })();

  function makeFighter(x, face){
    return { x, y:GROUND, vx:0, vy:0, face, hp:MAX_HP, state:'idle', t:0,
             atk:null, hitDone:false, cd:0.4, anim:0, koT:0 };
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
    updateDust(dt);
  }

  function canAct(f){ return f.state === 'idle' || f.state === 'walk' || f.state === 'jump'; }

  function updateFighter(f, dt, isPlayer){
    if(f.cd > 0) f.cd -= dt;
    f.anim += dt;

    if(f.state === 'ko'){ f.koT += dt; return; }

    let mx = 0;
    if(isPlayer && canAct(f)){
      if(keys.ArrowLeft || keys.KeyA) mx -= 1;
      if(keys.ArrowRight || keys.KeyD) mx += 1;
      if((keys.ArrowUp || keys.KeyW || keys.Space) && f.onGround){ f.vy = JUMP_V; f.onGround = false; f.state = 'jump'; spawnDust(f.x, f.y); }
      if(keys.KeyJ && f.cd <= 0){ beginAttack(f, 'punch'); }
      else if(keys.KeyK && f.cd <= 0){ beginAttack(f, 'kick'); }
    } else if(!isPlayer && canAct(f)){
      mx = aiDecide(f, dt);
    }

    if(f.state === 'idle' || f.state === 'walk'){
      f.vx = mx * MOVE;
      if(mx !== 0) f.face = mx > 0 ? 1 : -1;
      f.state = mx !== 0 ? 'walk' : 'idle';
    } else if(f.state === 'jump'){
      f.vx = mx * MOVE * 0.85;
      if(mx !== 0) f.face = mx > 0 ? 1 : -1;
    }

    f.vy += GRAV * dt;
    f.x += f.vx * dt;
    f.y += f.vy * dt;
    if(f.y >= GROUND){
      f.y = GROUND; f.vy = 0;
      if(!f.onGround){ f.onGround = true; spawnDust(f.x, f.y); if(f.state === 'jump') f.state = 'idle'; }
    }
    f.x = Math.max(30, Math.min(W - 30, f.x));

    if(f.state === 'punch' || f.state === 'kick'){
      f.t += dt;
      const opp = (f === player) ? shen : player;
      if(!f.hitDone && f.t <= f.atk.active){
        if(tryHit(f, opp)) f.hitDone = true;
      }
      if(f.t >= f.atk.active + 0.12){
        f.state = f.onGround ? 'idle' : 'jump';
        f.atk = null; f.hitDone = false;
      }
    } else if(f.state === 'hurt'){
      f.t += dt;
      if(f.t >= 0.26){ f.state = f.onGround ? 'idle' : 'jump'; f.vx = 0; }
    }

    if(f.hp <= 0 && f.state !== 'ko'){
      f.state = 'ko'; f.koT = 0; f.vx = 0; f.vy = -130;
      ended = (f === player) ? 'lose' : 'win';
      endT = 1.7;
      shake = 0.5;
      if(ended === 'win') flawless = (player.hp >= MAX_HP);
      AudioSys.sfx.fail();
    }
  }

  function beginAttack(f, kind){
    const spec = kind === 'punch' ? PUNCH : KICK;
    f.state = kind;
    f.t = 0;
    f.atk = Object.assign({}, spec);
    f.hitDone = false;
    f.cd = spec.cd;
  }

  function tryHit(a, b){
    if(b.state === 'ko') return false;
    const f = a.face;
    const hx1 = a.x + (f > 0 ? 10 : -10);
    const hx2 = hx1 + f * a.atk.range;
    const boxA = { x1: Math.min(hx1, hx2), x2: Math.max(hx1, hx2), y1: a.y - 74, y2: a.y - 12 };
    const boxB = { x1: b.x - 19, x2: b.x + 19, y1: b.y - 74, y2: b.y - 6 };
    if(boxA.x2 > boxB.x1 && boxA.x1 < boxB.x2 && boxA.y2 > boxB.y1 && boxA.y1 < boxB.y2){
      b.hp = Math.max(0, b.hp - a.atk.dmg);
      if(b.hp > 0){
        b.state = 'hurt'; b.t = 0;
        b.vx = f * a.atk.knock;
        b.vy = Math.min(b.vy, -170);
      }
      sparks.push({ x:(a.x + b.x) / 2, y: b.y - 44, t:0, f });
      dmgNums.push({ x:b.x, y:b.y - 96, t:0, v:a.atk.dmg, crit:a.atk === KICK });
      if(a === player){ combo++; comboT = 1.6; } else { combo = 0; }
      shake = 0.2;
      hitStop = 0.06;
      AudioSys.sfx.hit();
      updateHPBars();
      return true;
    }
    return false;
  }

  /* ---------- AI：沈局长 ---------- */
  function aiDecide(f, dt){
    const opp = player;
    const dist = opp.x - f.x;
    const ad = Math.abs(dist);
    let mx = 0;
    if(ad > 120){
      mx = dist > 0 ? 1 : -1;
    } else if(f.cd <= 0){
      if(ad < KICK.range + 24){
        const r = Math.random();
        if(r < 0.4) beginAttack(f, 'kick');
        else if(r < 0.92) beginAttack(f, 'punch');
        else { mx = dist > 0 ? -1 : 1; f.cd = 0.85; }
      } else {
        mx = dist > 0 ? 1 : -1;
        if(Math.random() < 0.15) f.cd = 0.2;
      }
    } else if(ad < 90 && f.onGround && Math.random() < 0.02){
      f.vy = JUMP_V * 0.9; f.onGround = false; f.state = 'jump';
      mx = dist > 0 ? -1 : 1;
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

    // 背景底
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#0a0d12');
    bg.addColorStop(1, '#111820');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // 格斗场背景图
    if(arenaImg){
      ctx.drawImage(arenaImg, 0, 0, W, H);
      ctx.fillStyle = 'rgba(4,6,10,.38)';
      ctx.fillRect(0, 0, W, H);
    } else {
      ctx.strokeStyle = 'rgba(120,140,160,.10)';
      ctx.lineWidth = 1;
      for(let row = 0; row < 8; row++){
        for(let col = 0; col < 14; col++){
          ctx.strokeRect(col * 70 + (row % 2 ? 35 : 0), row * 46, 70, 46);
        }
      }
    }

    // 中央聚光灯
    const sp = ctx.createRadialGradient(W/2, -60, 20, W/2, 60, 340);
    sp.addColorStop(0, 'rgba(255,235,170,.16)');
    sp.addColorStop(1, 'rgba(255,235,170,0)');
    ctx.fillStyle = sp;
    ctx.fillRect(0, 0, W, H);

    // 悬浮尘埃
    for(let i = 0; i < 18; i++){
      const dx = (i * 61 + gameTime() * 8) % W;
      const dy = 60 + (i * 97) % 300;
      ctx.globalAlpha = 0.05 + 0.05 * Math.sin(gameTime() * 1.4 + i);
      ctx.fillStyle = '#ffd74a';
      ctx.beginPath(); ctx.arc(dx, dy, 1.6, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;

    // 地板
    ctx.fillStyle = 'rgba(12,14,18,.92)';
    ctx.fillRect(0, GROUND, W, H - GROUND);
    ctx.fillStyle = 'rgba(212,175,55,.28)';
    ctx.fillRect(0, GROUND, W, 2);
    ctx.fillStyle = 'rgba(0,0,0,.45)';
    ctx.fillRect(0, GROUND + 2, W, 5);
    ctx.strokeStyle = 'rgba(255,255,255,.04)';
    for(let i = 1; i < 14; i++){ ctx.beginPath(); ctx.moveTo(i * 70, GROUND + 8); ctx.lineTo(i * 70, H); ctx.stroke(); }

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
      ctx.strokeStyle = 'rgba(255,215,90,' + a + ')';
      ctx.lineWidth = 3.5;
      for(let k = 0; k < 5; k++){
        const ang = s.f > 0 ? (k * Math.PI / 2.5 + 0.35) : (k * Math.PI / 2.5 + 0.35 + Math.PI);
        const r = 8 + s.t * 140;
        ctx.beginPath();
        ctx.moveTo(s.x + Math.cos(ang) * 4, s.y + Math.sin(ang) * 4);
        ctx.lineTo(s.x + Math.cos(ang) * r, s.y + Math.sin(ang) * r);
        ctx.stroke();
      }
      ctx.fillStyle = 'rgba(255,255,220,' + a * 0.8 + ')';
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
        bob = Math.sin(f.anim * 3.2) * 1.8;
      }
    } else if(f.state === 'jump'){
      scaleY = 1.06;
      rot = f.face * 0.04;
    } else if(f.state === 'punch' || f.state === 'kick'){
      const prog = Math.min(f.t / Math.max(0.001, f.atk.active), 1);
      const p = Math.sin(prog * Math.PI);
      dx = f.face * (f.state === 'kick' ? 19 : 13) * p;
      rot = f.face * 0.16 * p;
      drawStrikeArc(ctx, x + f.face * 34, y - 50, f.face, f.state === 'kick' ? 28 : 20, prog);
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
    if(y) y.style.width = player.hp + '%';
    if(s) s.style.width = shen.hp + '%';
    if(yv) yv.textContent = player.hp;
    if(sv) sv.textContent = shen.hp;
    if(y) y.classList.toggle('danger', player.hp <= 30);
    if(s) s.classList.toggle('danger', shen.hp <= 30);
  }

  /* ---------- 输入 ---------- */
  function onKeyDown(e){
    if(!_active) return;
    if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Space','KeyW','KeyA','KeyS','KeyD','KeyJ','KeyK'].indexOf(e.code) >= 0){
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
      setPos: (px, sx) => { if(player) player.x = px; if(shen) shen.x = sx; }
    };
  }

  return { start, bind, cleanup, refreshLabels, get _active(){ return _active; } };
})();
