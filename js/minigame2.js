/* ===== 微游戏 2：仓库潜入 (Warehouse Infiltration) — v8 =====
   明亮高对比视觉：高不透明度黄白光柱/探照灯锥 + 深黑阴影区（淡蓝描边）+ 暗色环境遮罩；
   检测修正：灯光池与视线锥均按眼部位置判定，阴影优先于灯光，仅两种即时抓获途径。 */
window.MiniGame2 = (function(){
  const W = 960, H = 540;
  const WORLD_W = 3400;
  const GRAV = 1900, MOVE_MAX = 265, ACCEL = 2600, FRICTION = 2300;
  const JUMP_V = -680, COYOTE = 0.10, JUMP_BUFFER = 0.13, JUMP_CUT = 0.75;
  const ALERT_MAX = 100, ALERT_DECAY = 13;
  const GROUND_Y = 480;
  const PLAYER_H = 66;
  const CONE_HALF = 0.42;
  /* v4: 攀爬 + 守卫碰撞 + 扫掠收集 */
  const CLIMB_SPEED = 180, WALL_GRAB = 15;
  const TOUCH_ALERT = 60, TOUCH_KNOCK = 320, TOUCH_CD = 0.9;
  const PLAYER_HALF_W = 12;
  /* v5: 更长关卡 + 灯光/探照灯下暴露即被抓 + 情报到手后逃脱阶段 */
  const EXIT = { x: 80 };

  const PLATFORMS = [
    { x:0,    y:GROUND_Y, w:WORLD_W },
    { x:180,  y:390, w:150 },
    { x:430,  y:390, w:140 },
    { x:330,  y:330, w:130 },
    { x:700,  y:340, w:170 },
    { x:980,  y:380, w:150 },
    { x:940,  y:320, w:140 },
    { x:1250, y:360, w:160 },
    { x:1430, y:420, w:160 },
    { x:1590, y:390, w:160 },
    { x:1700, y:430, w:100 },
    { x:1780, y:330, w:200 },
    { x:1980, y:390, w:150 },
    { x:2120, y:430, w:120 },
    { x:2150, y:330, w:140 },
    { x:2380, y:400, w:220 },
    { x:2600, y:360, w:150 },
    { x:2700, y:430, w:120 },
    { x:2850, y:330, w:150 },
    { x:3000, y:420, w:130 },
    { x:3120, y:390, w:150 },
    { x:3150, y:330, w:140 },
    { x:3260, y:420, w:130 }
  ];
  /* 阴影区：躲在其中不会被看见 */
  const SHADOWS = [
    { x:160, y:420, w:190, h:60 },
    { x:320, y:332, w:150, h:58 },
    { x:680, y:372, w:200, h:60 },
    { x:930, y:322, w:160, h:58 },
    { x:1230,y:392, w:200, h:60 },
    { x:1415,y:380, w:170, h:100 },
    { x:1650,y:330, w:150, h:60 },
    { x:1760,y:452, w:130, h:28 },
    { x:2020,y:392, w:170, h:60 },
    { x:2300,y:452, w:150, h:28 },
    { x:2560,y:362, w:160, h:58 },
    { x:2890,y:332, w:190, h:58 },
    { x:3120,y:392, w:160, h:60 },
    { x:3260,y:452, w:130, h:28 }
  ];
  /* 灯光池（y=400：只照亮地面层，货架/平台上不会被照到）：
     身处灯光且不在阴影 → 立即被淘汰（v6 即时抓获，不再走警戒条） */
  const LIGHTS = [ {x:300,w:170,y:400}, {x:1050,w:170,y:400}, {x:1450,w:170,y:400}, {x:1900,w:170,y:400}, {x:2400,w:170,y:400}, {x:2900,w:170,y:400} ];
  const CHIP_DEFS = [
    { x:265,  y:376 },
    { x:600,  y:278 },
    { x:1035, y:306 },
    { x:1360, y:346 },
    { x:1660, y:356 },
    { x:1810, y:296 },
    { x:2220, y:316 },
    { x:2700, y:346 },
    { x:3220, y:316 }
  ];
  const GOAL = { x:3340 };
  const GUARDS = [
    { x:250,  y:GROUND_Y, min:150, max:520,  speed:78,  range:150, swing:0,   swingAmp:0,    face:1,  eye:30, h:62, sprite:'guard_walk'  },
    { x:700,  y:340,      min:700, max:700,  speed:0,   range:240, swing:0.62, swingAmp:0.42, face:1,  eye:34, h:70, sprite:'guard_heavy' },
    { x:1100, y:GROUND_Y, min:900, max:1300, speed:88,  range:130, swing:0,   swingAmp:0,    face:-1, eye:30, h:62, sprite:'guard_walk'  },
    { x:1550, y:GROUND_Y, min:1330,max:1800, speed:52,  range:200, swing:0,   swingAmp:0,    face:-1, eye:34, h:70, sprite:'guard_heavy' },
    { x:1950, y:GROUND_Y, min:1750,max:2150, speed:92,  range:140, swing:0,   swingAmp:0,    face:-1, eye:30, h:62, sprite:'guard_walk'  },
    { x:2300, y:GROUND_Y, min:2100,max:2500, speed:84,  range:150, swing:0,   swingAmp:0,    face:-1, eye:30, h:62, sprite:'guard_walk'  },
    { x:2680, y:GROUND_Y, min:2450,max:2900, speed:90,  range:150, swing:0.5, swingAmp:0.35, face:1,  eye:30, h:62, sprite:'guard_walk'  },
    { x:3100, y:GROUND_Y, min:2850,max:3340, speed:86,  range:140, swing:0,   swingAmp:0,    face:-1, eye:30, h:62, sprite:'guard_walk'  }
  ];

  let onSuccess = null, onFail = null;
  let _active = false, rafId = null, last = 0;
  let player = null, guards = null, alert = 0, caught = false;
  let keys = {}, failTimer = null, winT = 0, gameT = 0;
  let particles = [], chips = [], chipsCollected = 0, camX = 0;
  let coyoteT = 0, jumpBufT = 0;
  let shake = 0, spotFlash = 0, bgImg = null;
  let climbing = false, wallSide = 0, touchCd = 0, nearWall = 0;
  let jumpPressed = false;
  let intelSecured = false, exposed = false, wasExposed = false;

  (function(){
    const im = new Image();
    im.onload = () => { bgImg = im; };
    im.src = 'assets/bg/warehouse_bg.jpg';
  })();

  /* ---------- 启动 ---------- */
  function start(success, fail){
    cleanup();
    _active = true;
    onSuccess = success; onFail = fail;
    player = { x:70, y:GROUND_Y, vx:0, vy:0, face:1, onGround:true, step:0, inShadow:false, inLight:false, squash:0, coyote:0 };
    guards = GUARDS.map(g => Object.assign({}, g, { angle: 0, alerted: false }));
    chips = CHIP_DEFS.map(c => ({ x: c.x, y: c.y, got: false }));
    alert = 0; caught = false; keys = {};
    gameT = 0; winT = 0; particles = []; chipsCollected = 0; camX = 0;
    coyoteT = 0; jumpBufT = 0; shake = 0; spotFlash = 0;
    climbing = false; wallSide = 0; touchCd = 0;
    intelSecured = false; exposed = false; wasExposed = false;
    Engine.showScreen('minigame2');
    setStatus(I18N.t('mg2.statusMove'));
    setMission(I18N.t('mg2.mission'));
    updateChips();
    resetAlertBar();
    bindInput();
    registerDebug();
    last = performance.now();
    rafId = requestAnimationFrame(loop);
  }

  /* ---------- 主循环 ---------- */
  function loop(now){
    if(!_active){ rafId = null; return; }
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    update(dt);
    render();
    rafId = requestAnimationFrame(loop);
  }

  /* ---------- 更新 ---------- */
  function update(dt){
    gameT += dt;
    if(shake > 0) shake -= dt;
    if(spotFlash > 0) spotFlash -= dt;
    if(caught || winT > 0){
      if(winT > 0){
        winT -= dt;
        if(winT <= 0) winNow();
      }
      updateParticles(dt);
      return;
    }

    /* 玩家输入与移动 */
    const left = keys.ArrowLeft || keys.KeyA;
    const right = keys.ArrowRight || keys.KeyD;
    const want = (right ? 1 : 0) - (left ? 1 : 0);
    if(want !== 0){
      player.vx += want * ACCEL * dt;
      if(Math.abs(player.vx) > MOVE_MAX) player.vx = want * MOVE_MAX;
      player.face = want;
    } else {
      const f = FRICTION * dt;
      if(Math.abs(player.vx) <= f) player.vx = 0;
      else player.vx -= Math.sign(player.vx) * f;
    }

    /* 墙壁判定：贴在非地面平台侧面时返回墙方向（墙在 +1 右侧 / -1 左侧） */
    function wallFace(){
      let best = 0, bestD = WALL_GRAB + 1;
      for(const p of PLATFORMS){
        if(p.y === GROUND_Y) continue;
        if(player.y > p.y + 4 && player.y < GROUND_Y - 6){
          const dL = Math.abs(player.x - p.x);
          if(dL < bestD && player.x <= p.x){ bestD = dL; best = 1; }
          const dR = Math.abs(player.x - (p.x + p.w));
          if(dR < bestD && player.x >= p.x + p.w){ bestD = dR; best = -1; }
        }
      }
      return bestD <= WALL_GRAB ? best : 0;
    }
    const wf = wallFace();
    nearWall = wf;
    const climbKey = (keys.ArrowUp || keys.KeyW);
    const wallJumpKey = keys.Space;
    const jumpKey = (keys.Space || keys.ArrowUp || keys.KeyW);

    if(climbing){
      if(wallJumpKey){
        // 壁跳：蹬离墙面
        climbing = false; wallSide = wf !== 0 ? wf : wallSide;
        player.vy = JUMP_V * 0.95;
        player.vx = -wallSide * 330;
        player.onGround = false; player.coyote = 0;
        player.face = -wallSide;
        AudioSys.sfx.type(); spawnDust(player.x, player.y, 8);
      } else if(wf === 0){
        climbing = false;
      } else if(climbKey){
        player.vy = 0; player.vx = 0;
        player.y -= CLIMB_SPEED * dt;
        player.face = wallSide;
        if(Math.random() < dt * 10) spawnDust(player.x - wallSide * 10, player.y, 2);
        let snap = null;
        for(const p of PLATFORMS){
          if(p.y === GROUND_Y) continue;
          const nearFace = (wallSide > 0 && Math.abs(player.x - p.x) < WALL_GRAB + 4) ||
                           (wallSide < 0 && Math.abs(player.x - (p.x + p.w)) < WALL_GRAB + 4);
          if(nearFace && player.y <= p.y + 2){ snap = p.y; break; }
        }
        if(snap !== null){
          player.y = snap; player.vy = 0; player.onGround = true; player.coyote = COYOTE;
          climbing = false; player.squash = 0.2;
          spawnDust(player.x, player.y - 2, 7);
        }
      } else {
        climbing = false;
      }
    } else if(wf !== 0 && !player.onGround && climbKey && player.vy >= 0){
      // 空中贴墙按住 ↑/W → 抓住墙面攀爬
      climbing = true; wallSide = wf; player.vy = 0; player.vx = 0; player.face = wf;
    } else if(wf !== 0 && !player.onGround && wallJumpKey && player.vy >= 0){
      // 空中贴墙按跳跃 → 壁跳（无攀爬时也能跳墙）
      player.vy = JUMP_V * 0.95;
      player.vx = -wf * 330;
      player.coyote = 0;
      player.face = -wf;
      AudioSys.sfx.type(); spawnDust(player.x, player.y, 8);
    }

    // 跳跃缓冲 + 土狼时间
    if(jumpPressed && player.onGround){
      jumpBufT = JUMP_BUFFER;
      player.vy = JUMP_V;
      player.onGround = false;
      player.coyote = 0;
      AudioSys.sfx.type();
      spawnDust(player.x, player.y, 5);
    } else if(jumpPressed && !player.onGround && !climbing && player.coyote > 0 && jumpBufT > 0){
      player.vy = JUMP_V;
      player.onGround = false;
      player.coyote = 0;
      jumpBufT = 0;
      AudioSys.sfx.type();
    }
    if(!jumpKey && player.vy < -140 && !climbing){
      player.vy *= JUMP_CUT; // 松键截断跳跃
    }

    jumpPressed = false; // 单帧按键边沿已消费

    // 跑步粒子
    if(Math.abs(player.vx) > 60 && player.onGround){
      player.step += dt * 11;
      if(Math.random() < dt * 8) spawnDust(player.x - player.face * 16, player.y - 2);
    }

    // 物理
    const prevY = player.y;
    if(!climbing) player.vy += GRAV * dt;
    // 贴墙滑落：空中贴着墙面时下落减速（更易抓墙/壁跳）
    if(!climbing && wf !== 0 && !player.onGround && player.vy > 130) player.vy = 130;
    player.x += player.vx * dt;
    player.y += player.vy * dt;
    player.onGround = false;
    for(const p of PLATFORMS){
      if(player.x + 9 > p.x && player.x - 9 < p.x + p.w){
        if(player.vy >= 0 && player.y >= p.y && player.y - player.vy * dt <= p.y + 0.1){
          player.y = p.y; player.vy = 0; player.onGround = true;
          player.coyote = COYOTE;
          if(prevY < p.y - 2){
            player.squash = 0.22;
            spawnDust(player.x, player.y - 2, 7);
          }
        }
      }
    }
    if(player.squash > 0) player.squash -= dt;
    if(player.coyote > 0) player.coyote -= dt;
    if(jumpBufT > 0) jumpBufT -= dt;
    player.x = Math.max(12, Math.min(WORLD_W - 12, player.x));
    if(player.y > H + 90){ player.y = GROUND_Y; player.vy = 0; player.onGround = true; player.coyote = COYOTE; }

    // 守卫
    for(const g of guards){
      if(g.speed > 0){
        g.x += g.face * g.speed * dt;
        if(g.x <= g.min){ g.x = g.min; g.face = 1; }
        if(g.x >= g.max){ g.x = g.max; g.face = -1; }
      }
      if(g.swingAmp > 0){
        g.angle = Math.sin(gameT * g.swing) * g.swingAmp;
      } else {
        g.angle = g.face > 0 ? 0 : Math.PI;
      }
    }

    // 守卫身体碰撞：撞到守卫 → 警戒大幅上升 + 击退（警戒满即被抓）
    if(touchCd > 0) touchCd -= dt;
    if(!caught && winT <= 0 && touchCd <= 0){
      for(const g of guards){
        const gx1 = g.x - 17, gx2 = g.x + 17;
        const gy1 = g.y - g.h, gy2 = g.y;
        if(player.x + PLAYER_HALF_W > gx1 && player.x - PLAYER_HALF_W < gx2 &&
           player.y > gy1 + 6 && player.y < gy2 + 8){
          touchCd = TOUCH_CD;
          g.alerted = true;
          alert = Math.max(alert, TOUCH_ALERT);
          const dir = (player.x >= g.x) ? 1 : -1;
          player.vx = dir * TOUCH_KNOCK;
          player.vy = Math.min(player.vy, -180);
          climbing = false;
          shake = 0.4; spotFlash = 0.5;
          AudioSys.sfx.alert();
          setStatus(I18N.t('mg2.touched'));
          break;
        }
      }
    }

    // 视线检测：被守卫看到（灯光下暴露 或 进入探照灯视线锥）→ 本帧内直接抓获
    const eyeY = player.y - 34;
    player.inShadow = SHADOWS.some(s => player.x > s.x && player.x < s.x + s.w && eyeY > s.y && eyeY < s.y + s.h);
    // 灯光池碰撞同样以眼部位置 (player.y - 34) 为准；inShadow 优先于 inLight
    player.inLight = LIGHTS.some(l => player.x > l.x && player.x < l.x + l.w && eyeY > l.y);
    let seenGuard = null;
    const underLight = player.inLight && !player.inShadow;
    exposed = underLight;
    if(underLight){
      // 灯光把身影照得清清楚楚——任意守卫都能发现你
      seenGuard = guards[0] || null;
    }
    if(!seenGuard){
      // 探照灯视线锥：无论玩家身处何处（阴影也不例外），锥内被照到即本帧抓获
      for(const g of guards){
        const gEyeY = g.y - g.eye;
        if(Math.abs(player.x - g.x) < 34 && Math.abs(eyeY - gEyeY) < 40){ seenGuard = g; break; }
        if(pointInCone(player.x, eyeY, g.x, gEyeY, g.angle, g.range)){ seenGuard = g; break; }
      }
    }
    const wasSeen = guards.some(g => g.alerted);
    if(!intelSecured) guards.forEach(g => { g.alerted = (g === seenGuard); });
    if(exposed && !wasExposed){
      spotFlash = 0.5;
      AudioSys.sfx.alert();
      setStatus(I18N.t('mg2.exposed'));
    } else if(seenGuard && !wasSeen){
      spotFlash = 0.5;
      AudioSys.sfx.alert();
    }
    wasExposed = exposed;

    if(seenGuard){
      // 被守卫看见（探照灯视线锥或灯光下暴露）→ 立即被抓住，不再积攒警戒值
      alert = ALERT_MAX;
    } else {
      alert = Math.max(0, alert - ALERT_DECAY * dt);
    }
    if(seenGuard && !caught){
      caught = true;
      alert = ALERT_MAX;
      shake = 0.5;
      setStatus(I18N.t('mg2.captured'));
      AudioSys.sfx.fail();
      failTimer = setTimeout(failNow, 950);
    }
    updateAlertBar();

    // 芯片收集（对上一帧与本帧位置做扫掠判定，快速下落/贴边也不会漏吃）
    const hipFrom = prevY - 26, hipTo = player.y - 26;
    for(const c of chips){
      if(c.got) continue;
      let hit = false;
      for(let i = 0; i <= 6; i++){
        const py = hipFrom + (hipTo - hipFrom) * (i / 6);
        const dx = player.x - c.x, dy = py - c.y;
        if(dx*dx + dy*dy < 54*54){ hit = true; break; }
      }
      if(hit){
        c.got = true; chipsCollected++;
        AudioSys.sfx.pickup();
        burst(c.x, c.y - 12, '#5cf08c', 10);
        updateChips();
        if(chipsCollected === chips.length) setStatus(I18N.t('mg2.perfect'));
      }
    }

    // 围巾拖尾
    if(Math.abs(player.vx) > 150 && player.onGround && Math.random() < dt * 14){
      particles.push({
        x: player.x - player.face * 20, y: player.y - 30 + (Math.random()-0.5)*8,
        vx: -player.face * (40 + Math.random()*40), vy: (Math.random()-0.5)*20,
        life: 0.3 + Math.random()*0.2, t: 0, r: 3 + Math.random()*3, color: 'rgba(214,70,60,'
      });
    }

    updateParticles(dt);

    // 摄像机跟随
    camX = Math.max(0, Math.min(WORLD_W - W, player.x - W * 0.38));

    // 胜利：先取情报（需集齐芯片）→ 触发逃脱阶段 → 抵达左侧出口
    if(!intelSecured){
      if(player.x >= GOAL.x && player.onGround){
        if(chipsCollected === chips.length){
          intelSecured = true;
          shake = 0.45;
          AudioSys.sfx.success();
          setStatus(I18N.t('mg2.escape'));
          setMission(I18N.t('mg2.escape'));
          // 全员警觉：加速 + 视线加长，红色警报
          guards.forEach(g => {
            g.alerted = true;
            g.speed = Math.round(g.speed * 1.45);
            g.range += 40;
          });
          camX = Math.max(0, Math.min(WORLD_W - W, player.x - W * 0.38));
        } else {
          setStatus(I18N.t('mg2.needChips'));
          AudioSys.sfx.alert();
        }
      }
    } else if(player.x <= EXIT.x && player.onGround){
      winT = 1.1;
      shake = 0.35;
      AudioSys.sfx.success();
      setStatus(I18N.t('mg2.escaped'));
    }
  }

  function pointInCone(px, py, ex, ey, angleX, range){
    const dx = Math.cos(angleX), dy = -Math.sin(angleX);
    const rx = px - ex, ry = py - ey;
    const fwd = rx * dx + ry * dy;
    if(fwd <= 0 || fwd > range) return false;
    const perp = Math.abs(rx * (-dy) + ry * dx);
    return perp <= fwd * Math.tan(CONE_HALF) + 16;
  }

  /* ---------- 粒子 ---------- */
  function spawnDust(x, y, n){
    n = n || 4;
    for(let i = 0; i < n; i++){
      particles.push({
        x: x + (Math.random() - 0.5) * 14, y: y + (Math.random() - 0.5) * 4,
        vx: (Math.random() - 0.5) * 70, vy: -Math.random() * 55 - 10,
        life: 0.4 + Math.random() * 0.25, t: 0, r: 2 + Math.random() * 2.5, color: 'rgba(200,180,138,'
      });
    }
  }
  function burst(x, y, color, n){
    for(let i = 0; i < n; i++){
      const a = Math.random() * Math.PI * 2, sp = 40 + Math.random() * 90;
      particles.push({
        x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 30,
        life: 0.5 + Math.random() * 0.3, t: 0, r: 2 + Math.random() * 2.5, color: color + ','
      });
    }
  }
  function updateParticles(dt){
    for(const p of particles){ p.t += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 70 * dt; }
    particles = particles.filter(p => p.t < p.life);
  }

  /* ---------- 渲染 ---------- */
  function render(){
    const cv = document.getElementById('infil-canvas');
    if(!cv) return;
    const ctx = cv.getContext('2d');
    const cx = camX;

    // 背景底
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#0e0b08');
    bg.addColorStop(1, '#1a120a');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // 真实仓库背景图（视差滚动）
    if(bgImg){
      const off = -((cx * 0.4) % 960);
      ctx.drawImage(bgImg, off, 0, 960, 540);
      ctx.drawImage(bgImg, off + 960, 0, 960, 540);
      ctx.fillStyle = 'rgba(0,0,0,.65)';
      ctx.fillRect(0, 0, W, H);
    } else {
      // 备用：程序化远景货架
      const pShift = -cx * 0.55;
      for(let i = -1; i < 14; i++){
        const bx = 40 + i * 126 + pShift;
        ctx.fillStyle = 'rgba(70,45,20,.24)';
        ctx.fillRect(bx, 300, 64, 180);
        ctx.fillStyle = 'rgba(0,0,0,.3)';
        ctx.fillRect(bx, 300, 64, 12);
      }
    }
    // 顶部灯管辉光
    for(let i = -1; i < 9; i++){
      const lx = 20 + i * 180 - cx * 0.25;
      const flick = 0.15 + 0.05 * Math.sin(gameT * 3 + i * 2);
      ctx.fillStyle = 'rgba(212,175,55,' + flick + ')';
      ctx.fillRect(lx, 26, 110, 4);
    }

    if(shake > 0){
      ctx.save();
      ctx.translate((Math.random() - 0.5) * shake * 16, (Math.random() - 0.5) * shake * 16);
    }

    // 地面光池（高不透明度黄白光柱；玩家暴露时泛红闪烁）
    for(const l of LIGHTS){
      const gx = l.x - cx;
      const danger = exposed && player.inLight && player.x > l.x && player.x < l.x + l.w;
      const pulse = danger ? (0.5 + 0.5 * Math.sin(gameT * 14)) : 0;
      const grad = ctx.createLinearGradient(0, l.y, 0, GROUND_Y);
      grad.addColorStop(0, danger ? 'rgba(255,70,50,0)' : 'rgba(255,238,160,0)');
      grad.addColorStop(0.30, danger ? 'rgba(255,70,50,' + (0.40 + pulse * 0.22) + ')' : 'rgba(255,240,170,.42)');
      grad.addColorStop(1, danger ? 'rgba(255,55,35,' + (0.62 + pulse * 0.25) + ')' : 'rgba(255,244,180,.82)');
      ctx.fillStyle = grad;
      ctx.fillRect(gx, l.y, l.w, GROUND_Y - l.y);
      ctx.save();
      ctx.translate(l.x + l.w/2 - cx, GROUND_Y);
      ctx.scale(1, 0.14);
      ctx.beginPath(); ctx.arc(0, 0, 30, 0, Math.PI*2);
      ctx.fillStyle = danger ? 'rgba(255,90,60,.95)' : 'rgba(255,244,185,.95)';
      ctx.fill(); ctx.restore();
      ctx.strokeStyle = danger ? 'rgba(255,80,50,.85)' : 'rgba(255,222,130,.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(gx, l.y); ctx.lineTo(gx, GROUND_Y);
      ctx.moveTo(gx + l.w, l.y); ctx.lineTo(gx + l.w, GROUND_Y);
      ctx.stroke();
    }

    // 暴露警告：红色警示条 + “暴露”标记
    if(exposed && !caught && winT <= 0){
      const a = 0.10 + 0.08 * Math.sin(gameT * 16);
      const v = ctx.createRadialGradient(W/2, H/2, H * 0.3, W/2, H/2, H * 0.95);
      v.addColorStop(0, 'rgba(255,30,20,0)');
      v.addColorStop(1, 'rgba(255,30,20,' + a + ')');
      ctx.fillStyle = v;
      ctx.fillRect(0, 0, W, H);
    }

    // 阴影区（安全藏身处）：更深 + 淡蓝描边，明确可藏身范围
    for(const s of SHADOWS){
      const grad = ctx.createLinearGradient(0, s.y, 0, s.y + s.h);
      grad.addColorStop(0, 'rgba(0,0,0,.94)');
      grad.addColorStop(1, 'rgba(0,0,0,.72)');
      ctx.fillStyle = grad;
      ctx.fillRect(s.x - cx, s.y, s.w, s.h);
      ctx.strokeStyle = 'rgba(130,220,255,.22)';
      ctx.lineWidth = 1;
      ctx.strokeRect(s.x - cx + 0.5, s.y + 0.5, s.w - 1, s.h - 1);
    }

    // 平台
    for(const p of PLATFORMS){
      const px = p.x - cx;
      if(p.x + p.w < cx || p.x > cx + W) continue;
      if(p.y === GROUND_Y){
        ctx.fillStyle = '#241709';
        ctx.fillRect(px, p.y, p.w, H - p.y);
        ctx.fillStyle = 'rgba(212,175,55,.18)';
        ctx.fillRect(px, p.y, p.w, 3);
        ctx.fillStyle = 'rgba(0,0,0,.35)';
        ctx.fillRect(px, p.y + 3, p.w, 6);
        // 地面质感线
        ctx.strokeStyle = 'rgba(0,0,0,.25)';
        ctx.lineWidth = 1;
        for(let i = 1; i < 14; i++){
          const lx = Math.floor((i * 120 - (cx * 0.9)) / 120) * 120;
          ctx.beginPath(); ctx.moveTo(lx, p.y + 10); ctx.lineTo(lx, H); ctx.stroke();
        }
      } else {
        ctx.fillStyle = '#3a2613';
        ctx.fillRect(px, p.y, p.w, 12);
        ctx.fillStyle = '#241708';
        ctx.fillRect(px, p.y + 12, p.w, 4);
        ctx.strokeStyle = 'rgba(212,175,55,.3)';
        ctx.lineWidth = 1;
        for(let i = 1; i < 4; i++){ ctx.beginPath(); ctx.moveTo(px + i * p.w / 4, p.y); ctx.lineTo(px + i * p.w / 4, p.y + 12); ctx.stroke(); }
        ctx.fillStyle = 'rgba(0,0,0,.35)';
        ctx.fillRect(px - 4, p.y + 16, p.w + 8, 6);
        // 攀爬抓握点：平台侧面可攀爬
        if(GROUND_Y - p.y >= 80){
          ctx.strokeStyle = 'rgba(212,175,55,.34)';
          ctx.lineWidth = 2;
          for(let k = 0; k < 7; k++){
            const ny = p.y + 18 + k * 22;
            if(ny > GROUND_Y - 12) break;
            ctx.beginPath(); ctx.moveTo(px - 3, ny); ctx.lineTo(px - 9, ny + 6); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(px + p.w + 3, ny); ctx.lineTo(px + p.w + 9, ny + 6); ctx.stroke();
          }
        }
      }
    }

    // 情报终端（含光柱信标）与逃脱出口
    drawGoal(ctx, cx);
    drawGoalBeacon(ctx, cx);
    drawExit(ctx, cx);

    // 芯片
    for(const c of chips) drawChip(ctx, c, cx);

    // 守卫
    for(const g of guards) drawGuard(ctx, g, cx);

    // 玩家
    drawPlayer(ctx, cx);

    // 攀爬提示
    if(nearWall !== 0 && !climbing && !caught && winT <= 0){
      const hx = player.x - cx;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 13px monospace';
      ctx.fillStyle = 'rgba(232,195,90,.95)';
      ctx.shadowColor = 'rgba(0,0,0,.9)';
      ctx.shadowBlur = 4;
      ctx.fillText(I18N.t('mg2.climbHint'), hx, player.y - 82);
      ctx.shadowBlur = 0;
    }

    // 粒子
    for(const p of particles){
      ctx.globalAlpha = (1 - p.t / p.life);
      ctx.fillStyle = p.color + (0.5 * (1 - p.t / p.life)) + ')';
      ctx.beginPath(); ctx.arc(p.x - cx, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;

    if(shake > 0) ctx.restore();

    // 首次被发现警示环
    if(spotFlash > 0 && !caught){
      const t = 1 - spotFlash / 0.5;
      ctx.strokeStyle = 'rgba(255,60,60,' + (1 - t) * 0.9 + ')';
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(player.x - cx, player.y - 34, 30 + t * 80, 0, Math.PI * 2); ctx.stroke();
    }

    // 小地图
    drawMinimap(ctx);

    // 边缘方向指示（终点/芯片在画面外时）
    drawEdgeHints(ctx, cx);

    // 静态暗角
    const vg = ctx.createRadialGradient(W/2, H/2, H * 0.42, W/2, H/2, H * 0.95);
    vg.addColorStop(0, 'rgba(0,0,0,0)');
    vg.addColorStop(1, 'rgba(0,0,0,.45)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, W, H);

    // 高警戒红晕
    if(alert > 40 && !caught && winT <= 0){
      const a = (alert - 40) / 60 * 0.34;
      const v = ctx.createRadialGradient(W/2, H/2, H * 0.36, W/2, H/2, H * 0.9);
      v.addColorStop(0, 'rgba(255,40,40,0)');
      v.addColorStop(1, 'rgba(255,40,40,' + a + ')');
      ctx.fillStyle = v;
      ctx.fillRect(0, 0, W, H);
    }

    // 开场横幅
    if(gameT < 2.0 && !caught && winT <= 0){
      ctx.fillStyle = 'rgba(0,0,0,.4)';
      ctx.fillRect(0, 0, W, H);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      if(gameT < 0.9){
        ctx.font = 'bold 40px "Times New Roman", serif';
        ctx.fillStyle = '#e8c35a';
        ctx.shadowColor = 'rgba(212,175,55,.8)';
        ctx.shadowBlur = 20;
        ctx.fillText(I18N.t('mg2.title'), W/2, H/2 - 56);
        ctx.shadowBlur = 0;
        ctx.font = '15px monospace';
        ctx.fillStyle = 'rgba(240,230,210,.7)';
        ctx.fillText(I18N.t('mg2.statusMove'), W/2, H/2 - 12);
      } else {
        const t = gameT - 0.9;
        ctx.font = 'bold 64px monospace';
        ctx.fillStyle = t < 0.4 ? '#ffd74a' : (t < 0.75 ? '#ffb14a' : '#7CFC00');
        ctx.shadowColor = 'rgba(255,180,40,.9)';
        ctx.shadowBlur = 20;
        ctx.fillText(t < 0.4 ? '3' : t < 0.75 ? '2' : 'GO!', W/2, H/2);
        ctx.shadowBlur = 0;
      }
    }

    // 被抓
    if(caught){
      ctx.fillStyle = 'rgba(70,0,0,.55)';
      ctx.fillRect(0, 0, W, H);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 52px monospace';
      ctx.fillStyle = '#ff5050';
      ctx.shadowColor = 'rgba(255,0,0,.9)';
      ctx.shadowBlur = 22;
      ctx.fillText(I18N.t('mg2.captured'), W/2, H/2);
      ctx.shadowBlur = 0;
    }

    // 胜利
    if(winT > 0){
      ctx.fillStyle = 'rgba(0,32,12,.55)';
      ctx.fillRect(0, 0, W, H);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 46px monospace';
      ctx.fillStyle = '#5cf08c';
      ctx.shadowColor = 'rgba(80,255,120,.9)';
      ctx.shadowBlur = 22;
      ctx.fillText(I18N.t('mg2.escaped'), W/2, H/2 - 16);
      ctx.shadowBlur = 0;
      ctx.font = '16px monospace';
      ctx.fillStyle = 'rgba(200,255,220,.85)';
      ctx.fillText(I18N.t('mg2.chipsDone') + chipsCollected + '/' + chips.length, W/2, H/2 + 26);
    }
  }

  /* 小地图：显示玩家/守卫/芯片/终点/出口相对位置 */
  function drawMinimap(ctx){
    const mw = 240, mh = 22, mx = W/2 - mw/2, my = 8;
    ctx.fillStyle = 'rgba(0,0,0,.6)';
    ctx.fillRect(mx, my, mw, mh);
    ctx.strokeStyle = 'rgba(212,175,55,.5)';
    ctx.lineWidth = 1;
    ctx.strokeRect(mx, my, mw, mh);
    const sc = mw / WORLD_W;
    // 出口（逃脱阶段）
    if(intelSecured){
      const px = mx + EXIT.x * sc;
      ctx.fillStyle = '#5cf08c';
      ctx.fillRect(px - 2, my + 4, 4, mh - 8);
    } else {
      // 终点
      ctx.fillStyle = '#5cf08c';
      ctx.fillRect(mx + GOAL.x * sc - 2, my + 4, 4, mh - 8);
    }
    // 芯片
    ctx.fillStyle = 'rgba(92,220,140,.9)';
    for(const c of chips){
      if(c.got) continue;
      const dx = mx + c.x * sc;
      ctx.beginPath(); ctx.moveTo(dx, my + mh/2 - 3); ctx.lineTo(dx + 3, my + mh/2); ctx.lineTo(dx, my + mh/2 + 3); ctx.lineTo(dx - 3, my + mh/2); ctx.closePath(); ctx.fill();
    }
    // 守卫
    ctx.fillStyle = intelSecured ? '#ff2020' : '#ff5050';
    for(const g of guards){
      const dx = mx + g.x * sc;
      ctx.beginPath(); ctx.arc(dx, my + mh/2, 2.4, 0, Math.PI * 2); ctx.fill();
    }
    // 玩家
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(mx + player.x * sc, my + mh/2, 3.2, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,.8)';
    ctx.stroke();
  }

  /* 终点光柱（情报取走后熄灭） */
  function drawGoalBeacon(ctx, cx){
    if(intelSecured) return;
    const gx = GOAL.x - cx;
    if(gx < -80 || gx > W + 80) return;
    const pulse = 0.5 + 0.5 * Math.sin(gameT * 3);
    const beam = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
    beam.addColorStop(0, 'rgba(92,220,140,0)');
    beam.addColorStop(1, 'rgba(92,220,140,' + (0.10 + pulse * 0.10) + ')');
    ctx.fillStyle = beam;
    ctx.fillRect(gx - 5, 0, 10, GROUND_Y);
  }

  /* 画面外指示箭头（逃脱阶段指向出口） */
  function drawEdgeHints(ctx, cx){
    const midY = H / 2;
    let targets;
    if(intelSecured){
      targets = [{ x: EXIT.x, color: '#5cf08c' }];
    } else {
      targets = [{ x: GOAL.x, color: '#5cf08c' }];
      for(const c of chips){ if(!c.got) targets.push({ x: c.x, color: 'rgba(92,220,140,.8)' }); }
    }
    for(const t of targets){
      if(t.x >= cx && t.x <= cx + W) continue;
      const side = t.x < cx ? -1 : 1;
      const ax = side > 0 ? W - 30 : 30;
      const bob = Math.sin(gameT * 5) * 5;
      ctx.save();
      ctx.translate(ax, midY + bob);
      if(side < 0) ctx.scale(-1, 1);
      ctx.strokeStyle = t.color;
      ctx.lineWidth = 3;
      ctx.shadowColor = t.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(-10, 0); ctx.lineTo(2, -9); ctx.lineTo(2, 9); ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }
  }

  /* 精灵绘制：x=脚底中心，y=脚底，h=高度，face=朝向 */
  function drawSprite(ctx, img, x, y, h, face, rot, scaleY, alpha){
    if(!img) return;
    const w = h * (img.width / img.height);
    ctx.save();
    ctx.globalAlpha = (alpha === undefined ? 1 : alpha);
    ctx.translate(x, y);
    if(rot) ctx.rotate(rot);
    if(scaleY) ctx.scale(1, scaleY);
    if(face < 0) ctx.scale(-1, 1);
    ctx.drawImage(img, -w / 2, -h, w, h);
    ctx.restore();
  }

  function drawGuard(ctx, g, cx){
    const ex = g.x - cx, eyeY = g.y - g.eye;
    const spread = Math.tan(CONE_HALF);
    const a = g.angle;
    const dx = Math.cos(a), dy = -Math.sin(a);
    const bx = -dy, by = dx;
    const tipX = g.x + dx * g.range, tipY = eyeY + dy * g.range;
    ctx.save();
    ctx.globalAlpha = g.alerted ? 0.72 : 0.55;
    const coneGrad = ctx.createLinearGradient(ex, eyeY, tipX - cx, tipY);
    coneGrad.addColorStop(0, g.alerted ? '#ff7a5a' : '#fff6cf');
    coneGrad.addColorStop(1, g.alerted ? 'rgba(255,80,50,.25)' : 'rgba(255,230,140,.18)');
    ctx.fillStyle = coneGrad;
    ctx.beginPath();
    ctx.moveTo(ex, eyeY);
    ctx.lineTo(tipX - cx + bx * (g.range * spread), tipY + by * (g.range * spread));
    ctx.lineTo(tipX - cx - bx * (g.range * spread), tipY - by * (g.range * spread));
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = g.alerted ? 0.9 : 0.7;
    ctx.strokeStyle = g.alerted ? '#ff6a4a' : '#fff0b0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ex, eyeY);
    ctx.lineTo(tipX - cx + bx * (g.range * spread), tipY + by * (g.range * spread));
    ctx.moveTo(ex, eyeY);
    ctx.lineTo(tipX - cx - bx * (g.range * spread), tipY - by * (g.range * spread));
    ctx.stroke();
    ctx.restore();

    // 精灵
    const bob = g.speed > 0 ? Math.sin(gameT * 2.4 + g.x) * 1.5 : 0;
    const img = SpriteLib.get(g.sprite);
    const f = (Math.cos(a) >= 0) ? 1 : -1;
    drawSprite(ctx, img, ex, g.y + 1 + bob, g.h, f, g.alerted ? Math.sin(gameT*30)*0.03 : 0, 1, 1);

    // 警戒感叹号
    if(g.alerted){
      const yy = g.y - g.h - 16 + Math.sin(gameT * 10) * 2;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 24px monospace';
      ctx.fillStyle = '#ff4040';
      ctx.shadowColor = 'rgba(255,0,0,.9)';
      ctx.shadowBlur = 10;
      ctx.fillText('!', ex, yy);
      ctx.shadowBlur = 0;
    }
  }

  function drawPlayer(ctx, cx){
    const x = player.x - cx, y = player.y;
    const moving = Math.abs(player.vx) > 1;
    const img = SpriteLib.get(moving || !player.onGround ? 'ninja_run' : 'ninja_idle');
    let rot = 0, scaleY = 1, alpha = 1, bob = 0;

    if(caught || winT > 0){
      rot = Math.sin(gameT * 30) * 0.04;
    } else if(climbing){
      rot = -wallSide * 0.24;
      scaleY = 0.98;
      bob = Math.sin(gameT * 9) * 1.3;
    } else if(!player.onGround){
      scaleY = 1.08;
      rot = player.face * 0.12;
    } else if(moving){
      bob = Math.sin(player.step) * 2.2;
      rot = Math.sin(player.step) * 0.05;
    }
    if(player.squash > 0){
      scaleY = 1 - 0.22 * (player.squash / 0.22);
      bob = -3;
    }
    if(player.inShadow) alpha = 0.78;

    // 脚下阴影
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.ellipse(x, player.y + 3, 20, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    drawSprite(ctx, img, x, y + bob, PLAYER_H, player.face, rot, scaleY, alpha);

    // 被看见红圈
    if(alert > 0 && !caught && winT <= 0){
      ctx.strokeStyle = 'rgba(255,60,60,' + Math.min(0.6, alert / 160 + 0.15) + ')';
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(x, y - PLAYER_H / 2, PLAYER_H * 0.58 + alert / 14, 0, Math.PI * 2); ctx.stroke();
    }
  }

  function drawChip(ctx, c, cx){
    if(c.got) return;
    const x = c.x - cx, y = c.y;
    const pulse = 0.5 + 0.5 * Math.sin(gameT * 5 + c.x);
    const s = 9 + pulse * 3;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(gameT * 1.5 + c.x * 0.01);
    ctx.fillStyle = 'rgba(92,220,140,' + (0.75 + pulse * 0.25) + ')';
    ctx.shadowColor = 'rgba(92,220,140,.9)';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(0, -s); ctx.lineTo(s * 0.7, 0); ctx.lineTo(0, s); ctx.lineTo(-s * 0.7, 0);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(220,255,235,.9)';
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.45); ctx.lineTo(s * 0.32, 0); ctx.lineTo(0, s * 0.45); ctx.lineTo(-s * 0.32, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  /* 情报终端：情报被取走后熄灭 */
  function drawGoal(ctx, cx){
    const gx = GOAL.x - cx, gy = GROUND_Y;
    if(gx < -60 || gx > W + 60) return;
    ctx.fillStyle = '#22282a';
    ctx.fillRect(gx - 15, gy - 52, 30, 52);
    ctx.fillStyle = '#101517';
    ctx.fillRect(gx - 11, gy - 46, 22, 24);
    if(intelSecured){
      // 已取走：屏幕熄灭、绿灯变红
      ctx.fillStyle = 'rgba(120,40,40,.9)';
      ctx.fillRect(gx - 9, gy - 44, 18, 20);
      ctx.fillStyle = 'rgba(255,80,80,.4)';
      for(let i = 0; i < 4; i++){
        const yy = gy - 42 + ((gameT * 26 + i * 6) % 16);
        ctx.fillRect(gx - 9 + (i % 2) * 9, yy, 8, 2);
      }
      ctx.fillStyle = '#ff4040';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('●', gx, gy - 62);
      return;
    }
    const pulse = 0.5 + 0.5 * Math.sin(gameT * 4);
    ctx.fillStyle = 'rgba(92,220,140,' + (0.55 + pulse * 0.45) + ')';
    ctx.fillRect(gx - 9, gy - 44, 18, 20);
    ctx.fillStyle = 'rgba(160,255,190,' + pulse + ')';
    for(let i = 0; i < 4; i++){
      const yy = gy - 42 + ((gameT * 26 + i * 6) % 16);
      ctx.fillRect(gx - 9 + (i % 2) * 9, yy, 8, 2);
    }
    ctx.fillStyle = 'rgba(92,220,140,' + (0.10 + pulse * 0.12) + ')';
    ctx.beginPath(); ctx.arc(gx, gy - 34, 38, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffd74a';
    ctx.shadowColor = 'rgba(255,215,74,.9)';
    ctx.shadowBlur = 14;
    ctx.beginPath(); ctx.arc(gx, gy - 62, 4, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(120,255,160,' + (0.4 + pulse * 0.6) + ')';
    ctx.fillRect(gx - 20, gy - 74, 4, 8);
    ctx.fillRect(gx + 16, gy - 74, 4, 8);
  }

  /* 逃脱出口：情报到手后在最左侧亮起 */
  function drawExit(ctx, cx){
    if(!intelSecured) return;
    const ex = EXIT.x - cx;
    if(ex < -80 || ex > W + 80) return;
    const pulse = 0.5 + 0.5 * Math.sin(gameT * 6);
    ctx.fillStyle = '#1c2a20';
    ctx.fillRect(ex - 20, GROUND_Y - 62, 40, 62);
    ctx.fillStyle = '#0d1710';
    ctx.fillRect(ex - 16, GROUND_Y - 56, 32, 50);
    ctx.fillStyle = 'rgba(92,220,140,' + (0.5 + pulse * 0.5) + ')';
    ctx.fillRect(ex - 12, GROUND_Y - 50, 24, 38);
    // 出口箭头
    ctx.fillStyle = 'rgba(140,255,180,' + (0.7 + pulse * 0.3) + ')';
    ctx.beginPath();
    ctx.moveTo(ex - 26, GROUND_Y - 92); ctx.lineTo(ex - 14, GROUND_Y - 92 - 10); ctx.lineTo(ex - 14, GROUND_Y - 92 + 10);
    ctx.closePath(); ctx.fill();
    ctx.font = 'bold 15px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(I18N.t('mg2.exitLabel'), ex, GROUND_Y - 76);
  }

  /* ---------- 成功 / 失败 ---------- */
  function winNow(){
    if(!_active) return;
    if(chipsCollected === chips.length && window.Achievements){
      try{ window.Achievements.unlock('ach_perfect'); }catch(e){}
    }
    cleanup();
    onSuccess && onSuccess();
  }
  function failNow(){
    if(!_active) return;
    cleanup();
    onFail && onFail();
  }

  function cleanup(){
    if(rafId){ cancelAnimationFrame(rafId); rafId = null; }
    if(failTimer){ clearTimeout(failTimer); failTimer = null; }
    unbindInput();
    _active = false;
  }

  /* ---------- HUD ---------- */
  function resetAlertBar(){
    const fill = document.getElementById('infil-alert-fill');
    if(fill){ fill.style.width = '0%'; fill.classList.remove('danger'); }
  }
  function updateAlertBar(){
    const fill = document.getElementById('infil-alert-fill');
    if(fill){
      fill.style.width = alert + '%';
      fill.classList.toggle('danger', alert >= 55);
    }
  }
  function updateChips(){
    const el = document.getElementById('infil-chips');
    if(el) el.textContent = chipsCollected + ' / ' + chips.length;
  }
  function setStatus(msg){
    const el = document.getElementById('infil-status');
    if(el) el.textContent = msg;
  }
  function setMission(msg){
    const el = document.getElementById('infil-mission');
    if(el) el.textContent = msg;
  }

  /* ---------- 输入 ---------- */
  function onKeyDown(e){
    if(!_active) return;
    if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Space','KeyW','KeyA','KeyS','KeyD'].indexOf(e.code) >= 0){
      e.preventDefault();
    }
    if(!e.repeat && ['Space','ArrowUp','KeyW'].indexOf(e.code) >= 0) jumpPressed = true;
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

  function refreshLabels(){
    if(!_active) return;
    if(caught || winT > 0) return;
    if(intelSecured){ setStatus(I18N.t('mg2.escape')); setMission(I18N.t('mg2.escape')); return; }
    if(exposed){ setStatus(I18N.t('mg2.exposed')); return; }
    if(gameT >= 2){ setStatus(I18N.t('mg2.statusMove')); setMission(I18N.t('mg2.mission')); }
  }

  function bind(){}

  function registerDebug(){
    if(!window.__THB_DEBUG__) return;
    window.__THB_DEBUG__.mg2 = {
      getState: () => ({
        x: Math.round(player ? player.x : 0),
        y: Math.round(player ? player.y : 0),
        onGround: player ? player.onGround : false,
        inShadow: player ? player.inShadow : false,
        inLight: player ? player.inLight : false,
        alert: Math.round(alert * 10) / 10,
        chips: chipsCollected,
        camX: Math.round(camX),
        caught, winT, intel: intelSecured, exposed,
        guards: guards ? guards.map(g => ({ x: Math.round(g.x), face: g.face, alerted: !!g.alerted, angle: Math.round(g.angle*100)/100 })) : []
      }),
      setPlayer: (x, y, onGround) => { if(player){ player.x = x; if(y !== undefined) player.y = y; if(onGround !== undefined) player.onGround = onGround; } },
      setAlert: (v) => { alert = v; },
      setIntel: (v) => { intelSecured = !!v; },
      getWorld: () => JSON.stringify({ worldW: WORLD_W, lights: LIGHTS, shadows: SHADOWS, platforms: PLATFORMS, chips: CHIP_DEFS, goal: GOAL }),
      collectAllChips: () => { chips.forEach(c => { c.got = true; }); chipsCollected = chips.length; updateChips(); return chipsCollected; },
      skipIntro: () => { gameT = 99; }
    };
  }

  return { start, bind, cleanup, refreshLabels, get _active(){ return _active; } };
})();
