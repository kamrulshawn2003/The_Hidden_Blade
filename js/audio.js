/* ===== The Hidden Blade · 音频系统 (Web Audio 合成音效 + MP3 背景音乐) ===== */
window.AudioSys = (function(){
  let ctx = null;
  let masterGain = null;
  let sfxGain = null;
  let bgmEl = null;
  let bgmPlaying = false;
  let bgmFadeTimer = null;
  const BGM_SRC = 'assets/audio/bgm.mp3';
  let settings = { master:70, bgm:60, sfx:80, voice:100, sfxOn:true, bgmOn:true };

  function ensureCtx(){
    if(!ctx){
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = ctx.createGain();
      masterGain.gain.value = settings.master/100;
      masterGain.connect(ctx.destination);
      sfxGain = ctx.createGain();
      sfxGain.gain.value = settings.sfx/100;
      sfxGain.connect(masterGain);
    }
    if(ctx.state === 'suspended') ctx.resume();
  }

  // BGM 目标音量：主音量 × BGM 音量 × 0.7（MP3 已混音，避免盖过音效）
  function bgmVolume(){
    return (settings.master/100) * (settings.bgm/100) * 0.7;
  }

  // 软件淡入淡出（直接操作 audio.volume，兼容 file:// 本地播放）
  function fadeTo(target, duration){
    if(!bgmEl) return;
    if(bgmFadeTimer){ clearInterval(bgmFadeTimer); bgmFadeTimer=null; }
    const start = bgmEl.volume;
    const startTime = performance.now();
    bgmFadeTimer = setInterval(()=>{
      const elapsed = performance.now() - startTime;
      const t = Math.min(elapsed/duration, 1);
      bgmEl.volume = start + (target - start) * t;
      if(t >= 1){ clearInterval(bgmFadeTimer); bgmFadeTimer = null; }
    }, 30);
  }

  function applySettings(s){
    settings = Object.assign(settings, s);
    if(masterGain) masterGain.gain.value = (settings.master/100);
    if(sfxGain) sfxGain.gain.value = (settings.sfx/100) * (settings.sfxOn?1:0);
    // BGM 音量实时调节
    if(bgmEl && bgmPlaying){
      fadeTo(bgmVolume(), 400);
    }
  }

  /* 基础音色：振荡器 + 包络 */
  function tone(freq, dur, type='sine', vol=0.3, attack=0.005, release=0.1){
    if(!settings.sfxOn) return;
    ensureCtx();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t+attack);
    g.gain.exponentialRampToValueAtTime(0.001, t+dur+release);
    osc.connect(g); g.connect(sfxGain);
    osc.start(t);
    osc.stop(t+dur+release+0.05);
  }

  function sweep(f1, f2, dur, type='sawtooth', vol=0.2){
    if(!settings.sfxOn) return;
    ensureCtx();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(f1, t);
    osc.frequency.exponentialRampToValueAtTime(Math.max(f2,1), t+dur);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t+0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t+dur);
    osc.connect(g); g.connect(sfxGain);
    osc.start(t); osc.stop(t+dur+0.05);
  }

  function noise(dur, vol=0.15, filterFreq=1000){
    if(!settings.sfxOn) return;
    ensureCtx();
    const t = ctx.currentTime;
    const bufferSize = ctx.sampleRate * dur;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for(let i=0;i<bufferSize;i++) data[i] = Math.random()*2-1;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = filterFreq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t+dur);
    src.connect(filter); filter.connect(g); g.connect(sfxGain);
    src.start(t);
  }

  /* 公开音效 */
  const sfx = {
    click:   ()=> tone(880, 0.05, 'square', 0.12),
    hover:   ()=> tone(1200, 0.03, 'sine', 0.06),
    type:    ()=> tone(1400+Math.random()*200, 0.015, 'square', 0.04),
    choice:  ()=> { tone(660,0.08,'sine',0.15); setTimeout(()=>tone(880,0.1,'sine',0.15),80); },
    alert:   ()=> { sweep(800, 200, 0.4, 'sawtooth', 0.18); noise(0.3,0.1,800); },
    success: ()=> { tone(523,0.12,'sine',0.2); setTimeout(()=>tone(659,0.12,'sine',0.2),120); setTimeout(()=>tone(784,0.2,'sine',0.22),240); },
    fail:    ()=> { sweep(400, 80, 0.6, 'sawtooth', 0.2); noise(0.5,0.12,500); },
    achievement: ()=> { tone(784,0.1,'sine',0.18); setTimeout(()=>tone(988,0.1,'sine',0.18),100); setTimeout(()=>tone(1175,0.15,'sine',0.2),200); setTimeout(()=>tone(1568,0.25,'sine',0.22),350); },
    page:    ()=> sweep(300, 600, 0.15, 'sine', 0.08),
    save:    ()=> { tone(600,0.08,'sine',0.15); setTimeout(()=>tone(900,0.12,'sine',0.15),90); },
    move:    ()=> tone(300, 0.06, 'triangle', 0.1),
    hit:     ()=> { tone(180, 0.09, 'square', 0.22); noise(0.07, 0.18, 1300); },
    pickup:  ()=> { tone(1200,0.06,'sine',0.14); setTimeout(()=>tone(1600,0.08,'sine',0.12),70); }
  };

  /* 背景音乐：MP3 直接播放（不经过 Web Audio 节点，避免 file:// 下被静音），循环播放 */
  function ensureBGMElement(){
    if(!bgmEl){
      bgmEl = new Audio();
      bgmEl.src = BGM_SRC;
      bgmEl.loop = true;
      bgmEl.preload = 'auto';
      bgmEl.volume = 0;
    }
  }

  function startBGM(){
    ensureBGMElement();
    if(bgmPlaying) return;
    bgmPlaying = true;
    const playPromise = bgmEl.play();
    if(playPromise && playPromise.catch){
      playPromise.catch(()=>{
        // 自动播放被浏览器拦截，等待用户首次交互后重试
        bgmPlaying = false;
      });
    }
    fadeTo(bgmVolume(), 1500);
  }

  function stopBGM(){
    if(!bgmPlaying) return;
    bgmPlaying = false;
    fadeTo(0, 800);
    setTimeout(()=>{ if(bgmEl && !bgmPlaying) bgmEl.pause(); }, 850);
  }

  function setBGM(on){
    if(on) startBGM(); else stopBGM();
  }

  return { ensureCtx, applySettings, sfx, setBGM, getSettings:()=>settings,
    getBGMState:()=>({ playing:bgmPlaying, src:bgmEl?bgmEl.src:null, paused:bgmEl?bgmEl.paused:null, currentTime:bgmEl?bgmEl.currentTime:0, duration:bgmEl?bgmEl.duration:0, readyState:bgmEl?bgmEl.readyState:0, volume:bgmEl?bgmEl.volume:0 }) };
})();
