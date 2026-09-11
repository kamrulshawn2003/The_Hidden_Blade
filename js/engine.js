/* ===== The Hidden Blade · 视觉小说引擎核心 ===== */
window.Engine = (function(){

  /* ---------- 屏幕路由 ---------- */
  function showScreen(id){
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    const el = document.getElementById('screen-'+id);
    if(el) el.classList.add('active');
    if(id === 'title' && typeof window.updateSavedGameButton === 'function'){
      window.updateSavedGameButton();
    }
  }

  /* ---------- 游戏状态 ---------- */
  const Game = {
    node: null,
    flags: {},
    stats: { evidence:0, trust:0, exposure:0, revenge:0 },
    inGame: false,
    typing: false,
    typeTimer: null,
    fullText: '',
    autoTimer: null,

    getState(){
      return { node: this.node, flags: Object.assign({}, this.flags), stats: Object.assign({}, this.stats), progress: this.progress() };
    },
    loadState(data){
      this.node = data.node;
      this.flags = data.flags || {};
      this.stats = data.stats || { evidence:0, trust:0, exposure:0, revenge:0 };
      this.inGame = true;
      showScreen('game');
      loadNode(data.node);
    },
    isInGame(){ return this.inGame; },
    progress(){
      const n = this.node || '';
      if(n.startsWith('end')) return 100;
      const m = n.match(/^s(\d+)/);
      if(m){
        const scene = parseInt(m[1]);
        return Math.min(99, Math.round((scene / 30) * 100));
      }
      return 5;
    }
  };
  window.Game = Game;

  /* ---------- 行为追踪 (Project Mirror 数据源) ---------- */
  const Behavior = {
    KEYS: ['stealth','combat','hacking','lockpicking','distraction','retreat'],
    // 现有剧情选择 → 行为计数 映射（值相等才计数，避免重复计数）
    HOOKS: [
      { flag:{homecoming:'chase'},  counter:'combat'  },
      { flag:{zhao:'threaten'},     counter:'combat'  },
      { flag:{trustM:false},        counter:'stealth' },
      { flag:{route:'director'},    counter:'hacking' },
      { flag:{zhaokai:'bait'},      counter:'combat'  },
      { flag:{message:'coords'},    counter:'hacking' },
      { flag:{guchen:'attack'},     counter:'combat'  }
    ],
    init(){
      if(!Game.flags.mirrorCounters || typeof Game.flags.mirrorCounters !== 'object'){
        Game.flags.mirrorCounters = {};
      }
      this.KEYS.forEach(k=>{ if(typeof Game.flags.mirrorCounters[k] !== 'number') Game.flags.mirrorCounters[k] = 0; });
    },
    add(counter, amount){
      this.init();
      if(this.KEYS.indexOf(counter) < 0) return;
      Game.flags.mirrorCounters[counter] += (amount || 1);
    },
    getCounters(){
      this.init();
      return Object.assign({}, Game.flags.mirrorCounters);
    },
    getTotal(){
      const c = this.getCounters();
      return this.KEYS.reduce((s,k)=> s + c[k], 0);
    },
    /* 归一化百分比 profile */
    getProfile(){
      const c = this.getCounters();
      const total = this.getTotal() || 1;
      const p = {};
      this.KEYS.forEach(k=> p[k] = Math.round((c[k] / total) * 100));
      return p;
    },
    /* 对剧情选择挂钩行为计数 */
    onChoice(ch){
      if(!ch || !ch.flag) return;
      this.HOOKS.forEach(h=>{
        for(const key in h.flag){
          if(ch.flag[key] !== undefined && ch.flag[key] === h.flag[key]){
            this.add(h.counter, 1);
            return;
          }
        }
      });
    },
    /* 应用小游戏返回的数值变更（与现有 clamp 一致） */
    applyStats(stats){
      if(!stats) return;
      for(const k in stats){
        if(Game.stats[k] !== undefined){
          Game.stats[k] = Math.max(0, Math.min(100, Game.stats[k] + stats[k]));
        }
      }
    }
  };
  window.Behavior = Behavior;
  Behavior.init();

  /* ---------- 语言辅助：取当前语言的字段 ---------- */
  function L(node, field){
    if(!node) return '';
    const enField = field + 'En';
    return (I18N.getLang() === 'en' && node[enField] !== undefined) ? node[enField] : node[field];
  }

  /* ---------- 说话者 → 角色ID ---------- */
  function speakerToChar(speaker){
    if(!speaker) return null;
    const s = speaker.toLowerCase();
    if(speaker.startsWith('林骁') || s.indexOf('lin xiao') === 0) return 'linxiao';
    if(speaker.startsWith('林雨') || s.indexOf('lin yu') === 0) return 'linyu';
    if(speaker.startsWith('顾晨') || s.indexOf('gu chen') === 0) return 'guchen';
    if(speaker.startsWith('苏岚') || s.indexOf('su lan') === 0) return 'sulan';
    if(speaker.startsWith('梅晨') || s.indexOf('mei') === 0) return 'mei';
    if(speaker.startsWith('沈局长') || s.indexOf('shen') === 0 || speaker.startsWith('沈')) return 'shen';
    if(speaker.startsWith('赵维克多') || s.indexOf('victor') === 0) return 'victor';
    if(speaker.startsWith('赵凯') || s.indexOf('zhao kai') === 0) return 'zhaokai';
    if(speaker.startsWith('何亮博士') || s.indexOf('dr. he') === 0 || speaker.startsWith('何博士')) return 'drhe';
    if(speaker.startsWith('幕后黑手') || s.indexOf('mastermind') === 0) return 'mastermind';
    if(speaker.startsWith('绑匪') || s.indexOf('kidnapper') === 0 || s.indexOf('物流官员') >= 0 || s.indexOf('logistics officer') >= 0) return 'kidnapper';
    return null;
  }
  function isNarration(speaker){
    return speaker === '旁白' || speaker === 'Narrator';
  }

  /* ---------- 立绘管理 ---------- */
  function setSprites(list, speakerChar){
    const slots = {
      left: document.getElementById('sprite-left'),
      center: document.getElementById('sprite-center'),
      right: document.getElementById('sprite-right')
    };
    Object.values(slots).forEach(s=>{ s.classList.remove('visible','speaking'); s.innerHTML=''; });
    (list || []).forEach(sp=>{
      const slot = slots[sp.slot];
      if(!slot) return;
      const urls = STORY.sprites[sp.char];
      const url = urls ? (urls[sp.pose] || urls.base || Object.values(urls)[0]) : '';
      slot.innerHTML = `<img src="${url}" alt="${sp.char}">`;
      if(Settings.get('spriteShadow')) slot.classList.add('shadow');
      requestAnimationFrame(()=> slot.classList.add('visible'));
      if(sp.char === speakerChar) slot.classList.add('speaking');
    });
  }

  /* ---------- 打字机 ---------- */
  function textSpeed(){
    const s = Settings.get('textSpeed');
    return [0, 80, 55, 32, 18, 10][s] || 32;
  }
  function typewrite(text, el){
    Game.typing = true;
    Game.fullText = text;
    el.textContent = '';
    let i = 0;
    clearInterval(Game.typeTimer);
    const speed = textSpeed();
    Game.typeTimer = setInterval(()=>{
      if(i >= text.length){
        clearInterval(Game.typeTimer);
        Game.typing = false;
        el.textContent = text;
        onTextComplete();
        return;
      }
      el.textContent += text[i];
      if(text[i] !== ' ' && text[i] !== '\n' && Math.random() < 0.25) AudioSys.sfx.type();
      i++;
    }, speed);
  }
  function skipType(){
    clearInterval(Game.typeTimer);
    const el = document.getElementById('dialog-text');
    el.textContent = Game.fullText;
    Game.typing = false;
    onTextComplete();
  }
  function onTextComplete(){
    // 自动播放
    if(Settings.get('autoPlay') && Game.inGame){
      clearTimeout(Game.autoTimer);
      Game.autoTimer = setTimeout(()=>{ if(Game.inGame && !Game.typing) next(); }, 1400);
    }
  }

  /* ---------- 加载节点 ---------- */
  function loadNode(id){
    const node = STORY.nodes[id];
    if(!node){ console.error('Node not found:', id); return; }
    Game.node = id;
    Gallery.markVisited(id);
    clearTimeout(Game.autoTimer);

    // 特殊节点类型
    if(node.type === 'minigame1'){
      MiniGame1.start(
        (res)=>{ Game.flags.mg1 = 'success'; Behavior.add('hacking', 1); if(res && res.perfect) Achievements.unlock('ach_perfect'); loadNode(node.nextSuccess); },
        ()=>{ Game.flags.mg1 = 'fail'; Behavior.add('hacking', 1); loadNode(node.nextFail); }
      );
      return;
    }
    if(node.type === 'minigame2'){
      MiniGame2.start(
        ()=>{ Game.flags.mg2 = 'success'; Behavior.add('lockpicking', 1); loadNode(node.nextSuccess); },
        ()=>{ Game.flags.mg2 = 'fail'; Behavior.add('lockpicking', 1); loadNode(node.nextFail); }
      );
      return;
    }
    if(node.type === 'minigame3'){
      MiniGame3.start(
        (res)=>{ if(res && res.flags) Object.assign(Game.flags, res.flags); if(res && res.stats) Behavior.applyStats(res.stats); if(res && res.perfect) Achievements.unlock('ach_interrogator'); loadNode(node.nextSuccess); },
        (res)=>{ if(res && res.flags) Object.assign(Game.flags, res.flags); if(res && res.stats) Behavior.applyStats(res.stats); loadNode(node.nextFail); }
      );
      return;
    }
    if(node.type === 'minigame4'){
      MiniGame4.start(
        (res)=>{ if(res && res.flags) Object.assign(Game.flags, res.flags); if(res && res.stats) Behavior.applyStats(res.stats); if(res && res.perfect) Achievements.unlock('ach_detective'); loadNode(node.nextSuccess); },
        (res)=>{ if(res && res.flags) Object.assign(Game.flags, res.flags); if(res && res.stats) Behavior.applyStats(res.stats); loadNode(node.nextFail); }
      );
      return;
    }
    if(node.type === 'minigame5'){
      MiniGame5.start(
        (res)=>{ if(res && res.flags) Object.assign(Game.flags, res.flags); if(res && res.stats) Behavior.applyStats(res.stats); if(res && res.perfect) Achievements.unlock('ach_memory'); loadNode(node.nextSuccess); },
        (res)=>{ if(res && res.flags) Object.assign(Game.flags, res.flags); if(res && res.stats) Behavior.applyStats(res.stats); loadNode(node.nextFail); }
      );
      return;
    }
    if(node.type === 'minigame6'){
      MiniGame6.start(
        (res)=>{ if(res && res.flags) Object.assign(Game.flags, res.flags); if(res && res.stats) Behavior.applyStats(res.stats); if(res && res.disrupted) Achievements.unlock('ach_unpredictable'); loadNode(node.nextSuccess); },
        (res)=>{ if(res && res.flags) Object.assign(Game.flags, res.flags); if(res && res.stats) Behavior.applyStats(res.stats); loadNode(node.nextFail); }
      );
      return;
    }
    if(node.type === 'minigame7'){
      MiniGame7.start(
        (res)=>{ if(res && res.flags) Object.assign(Game.flags, res.flags); if(res && res.stats) Behavior.applyStats(res.stats); if(res && res.perfect) Achievements.unlock('ach_truth2'); loadNode(node.nextSuccess); },
        (res)=>{ if(res && res.flags) Object.assign(Game.flags, res.flags); if(res && res.stats) Behavior.applyStats(res.stats); loadNode(node.nextFail); }
      );
      return;
    }
    if(node.type === 'endingCheck'){
      const ending = resolveEnding();
      loadNode(ending);
      return;
    }
    if(node.type === 'ending'){
      showEnding(node);
      return;
    }

    // 普通对话节点
    showScreen('game');
    if(node.achievement) Achievements.unlock(node.achievement);

    // 背景
    const bgEl = document.getElementById('game-bg');
    const bgUrl = STORY.backgrounds[node.bg] || STORY.backgrounds.title;
    if(bgEl.style.backgroundImage !== `url("${bgUrl}")`){
      bgEl.style.opacity = 0;
      setTimeout(()=>{ bgEl.style.backgroundImage = `url('${bgUrl}')`; bgEl.style.opacity = 1; }, 200);
    }

    // 立绘
    const spChar = speakerToChar(L(node, 'speaker'));
    setSprites(node.sprites, spChar);

    // 说话者
    const nameEl = document.getElementById('speaker-name');
    const speakerText = L(node, 'speaker');
    if(speakerText && !isNarration(speakerText)){
      nameEl.style.display = 'inline-block';
      nameEl.textContent = speakerText;
    } else {
      nameEl.style.display = 'none';
    }

    // 文本
    const textEl = document.getElementById('dialog-text');
    typewrite(L(node, 'text') || '', textEl);

    // 选项
    const choiceLayer = document.getElementById('choice-layer');
    choiceLayer.classList.remove('active');
    choiceLayer.innerHTML = '';
    if(node.choices && node.choices.length){
      // 等文本播完再显示选项
      const showChoices = ()=>{
        choiceLayer.innerHTML = '';
        node.choices.forEach((ch, idx)=>{
          const btn = document.createElement('button');
          btn.className = 'choice-btn';
          btn.textContent = L(ch, 'label');
          btn.addEventListener('click', ()=> choose(idx));
          choiceLayer.appendChild(btn);
        });
        choiceLayer.classList.add('active');
      };
      if(Game.typing){
        // 打字结束后显示
        const check = setInterval(()=>{
          if(!Game.typing){ clearInterval(check); showChoices(); }
        }, 100);
      } else {
        showChoices();
      }
    }

    // 自动存档
    SaveSys.autoSave();
  }

  /* ---------- 结局判定（基于最终选择 + 四项数值） ---------- */
  function resolveEnding(){
    const f = Game.flags;
    const s = Game.stats;
    const final = f.final;

    // Secret ending: Rewrite Mirror — requires strong evidence & trust
    if(final === 'rewrite' && s.evidence >= 55 && s.trust >= 45) return 'end_secret';

    // Alone: extreme revenge, low family trust (can follow kill or violent destroy)
    if(s.revenge >= 65 && s.trust <= 25) return 'end_alone';

    // The Watcher: take control of Mirror
    if(final === 'control') return 'end_watcher';

    // Chaos: release the raw database
    if(final === 'release') return 'end_chaos';

    // Vengeance: kill Shen
    if(final === 'kill') return 'end_vengeance';

    // True Justice: arrest Shen with enough evidence
    if(final === 'arrest' && s.evidence >= 45) return 'end_justice';

    // Ghost Family: destroy mirror, decent trust, but exposure high or evidence insufficient
    if(final === 'destroy' && s.trust >= 35 && (s.exposure >= 40 || s.evidence < 35)) return 'end_ghost';

    // The Hidden Blade: destroy mirror with insufficient public evidence
    if(final === 'destroy' && s.evidence < 35) return 'end_hidden';

    // Destroy with decent trust and evidence → Ghost Family (new identities, peaceful)
    if(final === 'destroy' && s.trust >= 35) return 'end_ghost';

    // Destroy with low trust → Hidden Blade
    if(final === 'destroy') return 'end_hidden';

    // Arrest without enough evidence → Hidden Blade (blamed, no public proof)
    if(final === 'arrest') return 'end_hidden';

    return 'end_hidden';
  }

  /* ---------- 结局展示 ---------- */
  function showEnding(node){
    Game.inGame = false;
    (node.achievements || []).forEach(id => Achievements.unlock(id));
    Gallery.markVisited(node.cg || node.node || 'end');
    document.getElementById('ending-bg').style.backgroundImage = `url('${STORY.backgrounds[node.bg] || STORY.backgrounds.title}')`;
    document.getElementById('ending-tag').textContent = node.titleTag || 'ENDING';
    document.getElementById('ending-title').textContent = L(node, 'title') || 'Ending';
    document.getElementById('ending-text').textContent = L(node, 'text') || '';
    showScreen('ending');
    AudioSys.sfx.achievement();
  }

  /* ---------- 语言切换时刷新当前节点文本（不重载背景/立绘） ---------- */
  function refreshCurrentNode(){
    const node = STORY.nodes[Game.node];
    if(!node || node.type) return;
    const nameEl = document.getElementById('speaker-name');
    const speakerText = L(node, 'speaker');
    if(speakerText && !isNarration(speakerText)){
      nameEl.style.display = 'inline-block';
      nameEl.textContent = speakerText;
    } else {
      nameEl.style.display = 'none';
    }
    // 跳过打字机，直接显示全文
    clearInterval(Game.typeTimer);
    Game.typing = false;
    document.getElementById('dialog-text').textContent = L(node, 'text') || '';
    // 刷新选项
    const choiceLayer = document.getElementById('choice-layer');
    if(node.choices && node.choices.length && choiceLayer.classList.contains('active')){
      choiceLayer.innerHTML = '';
      node.choices.forEach((ch, idx)=>{
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = L(ch, 'label');
        btn.addEventListener('click', ()=> choose(idx));
        choiceLayer.appendChild(btn);
      });
    }
  }

  /* ---------- 推进 / 选择 ---------- */
  function next(){
    if(!Game.inGame) return;
    const node = STORY.nodes[Game.node];
    if(!node) return;
    if(Game.typing){ skipType(); return; }
    if(node.choices && node.choices.length) return; // 必须做选择
    if(node.next){ loadNode(node.next); }
  }
  function choose(idx){
    const node = STORY.nodes[Game.node];
    if(!node || !node.choices) return;
    const ch = node.choices[idx];
    if(!ch) return;
    AudioSys.sfx.choice();
    if(ch.flag) Object.assign(Game.flags, ch.flag);
    if(ch.stats){
      for(const k in ch.stats){
        if(Game.stats[k] !== undefined){
          Game.stats[k] = Math.max(0, Math.min(100, Game.stats[k] + ch.stats[k]));
        }
      }
    }
    if(ch.achievement) Achievements.unlock(ch.achievement);
    if(window.Behavior) Behavior.onChoice(ch);
    document.getElementById('choice-layer').classList.remove('active');
    loadNode(ch.next);
  }

  /* ---------- 新游戏 / 返回标题 ---------- */
  function startNewGame(){
    AudioSys.ensureCtx();
    Game.node = null;
    Game.flags = {};
    Game.stats = { evidence:0, trust:0, exposure:0, revenge:0 };
    Game.inGame = true;
    showScreen('game');
    loadNode(STORY.start);
  }
  function backToTitle(){
    Game.inGame = false;
    clearInterval(Game.typeTimer);
    clearTimeout(Game.autoTimer);
    closeQuickMenu();
    showScreen('title');
  }

  /* ---------- 快捷菜单 ---------- */
  function toggleQuickMenu(){
    const qm = document.getElementById('quick-menu');
    qm.classList.toggle('active');
  }
  function closeQuickMenu(){
    document.getElementById('quick-menu').classList.remove('active');
  }

  /* ---------- 绑定 ---------- */
  function bind(){
    // 游戏界面点击推进
    const gameScreen = document.getElementById('screen-game');
    gameScreen.addEventListener('click', (e)=>{
      if(e.target.closest('.choice-layer') || e.target.closest('.game-topbar') || e.target.closest('.quick-menu-overlay')) return;
      next();
    });
    // 菜单按钮
    document.getElementById('btn-menu').addEventListener('click', (e)=>{ e.stopPropagation(); AudioSys.sfx.click(); toggleQuickMenu(); });
    document.getElementById('btn-back').addEventListener('click', (e)=>{ e.stopPropagation(); AudioSys.sfx.click(); toggleQuickMenu(); });

    // 快捷菜单按钮
    document.querySelector('[data-action="qm-resume"]').addEventListener('click', ()=>{ AudioSys.sfx.click(); closeQuickMenu(); });
    document.querySelector('[data-action="qm-save"]').addEventListener('click', ()=>{ AudioSys.sfx.click(); closeQuickMenu(); SaveSys.render('save'); showScreen('save'); });
    document.querySelector('[data-action="qm-load"]').addEventListener('click', ()=>{ AudioSys.sfx.click(); closeQuickMenu(); SaveSys.render('load'); showScreen('save'); });
    document.querySelector('[data-action="qm-settings"]').addEventListener('click', ()=>{ AudioSys.sfx.click(); closeQuickMenu(); showScreen('settings'); });
    document.querySelector('[data-action="qm-title"]').addEventListener('click', ()=>{ AudioSys.sfx.click(); backToTitle(); });

    // 键盘
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape'){
        if(document.getElementById('quick-menu').classList.contains('active')) closeQuickMenu();
        else if(Game.inGame) toggleQuickMenu();
      }
      if((e.key === ' ' || e.key === 'Enter') && Game.inGame){
        const qm = document.getElementById('quick-menu');
        if(qm.classList.contains('active')) return;
        if(document.getElementById('choice-layer').classList.contains('active')) return;
        e.preventDefault();
        next();
      }
    });
  }

  return { showScreen, loadNode, next, choose, startNewGame, backToTitle, toggleQuickMenu, closeQuickMenu, bind, Game, refreshCurrentNode };
})();
