/* ===== The Hidden Blade · 国际化 (English default / 中文切换) ===== */
window.I18N = (function(){
  const KEY = 'thb_lang';

  const dict = {
    en: {
      /* 标题界面 */
      'title.sub': 'A story of redemption, vengeance, and justice',
      'btn.newGame': 'New Game',
      'btn.savedGame': 'Saved Game',
      'btn.settings': 'Settings',
      'btn.gallery': 'Gallery',
      'btn.achievements': 'Achievements',
      'btn.ourTeam': 'Our Team',
      'btn.back': 'Back',
      'title.footer': 'HTML5 · CSS3 · JavaScript  |  Team "Stay Home" Presents',
      'lang.toggle': '中文',

      /* 登录界面 */
      'login.title': 'AGENT ACCESS',
      'login.sub': 'Enter your agent codename or your name to begin the operation',
      'login.placeholder': 'Enter codename or name…',
      'login.enter': 'LOG IN',
      'login.hint': 'Your codename or name identifies your profile and is bound to your saves',
      'login.welcome': 'Welcome, Agent',
      'login.welcomeBack': 'Welcome back, Agent',
      'login.agent': 'AGENT',
      'login.switch': 'SWITCH',
      'login.tabLogin': 'LOG IN',
      'login.tabSignup': 'SIGN UP',
      'login.signupSub': 'New player? Enter your real name — your agent codename will be assigned.',
      'login.signupPlaceholder': 'Enter your name…',
      'login.signupBtn': 'SIGN UP',
      'login.signupHint': 'After signing up you will receive your agent codename. Saves are bound to your profile.',
      'login.signedUp': 'SIGN UP COMPLETE',
      'login.yourName': 'Your name is',
      'login.yourCodename': 'Your agent codename is',
      'login.enterAction': 'LOG IN NOW',
      'login.signupDoneHint': 'Now log in with your codename to start the operation.',
      'login.pleaseLogin': 'Sign up complete! Please log in again with your codename:',
      'login.notFound': 'No agent found with that codename or name. Please sign up first.',
      'login.exists': 'This name is already signed up. Welcome back!',
      'login.logout': 'LOGOUT',
      'login.loggedOut': 'Logged out. See you soon, Agent.',

      /* 制作团队 */
      'team.title': 'Our Team',
      'team.subtitle': 'The creators behind The Hidden Blade',
      'team.back': 'Back to Title',

      /* 设置界面 */
      'settings.title': 'Settings',
      'settings.audio': 'Audio',
      'settings.text': 'Text',
      'settings.display': 'Display',
      'settings.language': 'Language',
      'settings.languageLabel': 'Interface Language',
      'settings.reset': 'Reset Defaults',
      'settings.saveReturn': 'Save & Return',
      'settings.master': 'Master Volume',
      'settings.bgm': 'Background Music',
      'settings.sfx': 'SFX Volume',
      'settings.voice': 'Voice Volume',
      'settings.voiceOn': 'Voice Narration',
      'settings.textSpeed': 'Text Speed',
      'settings.fontSize': 'Font Size',
      'settings.autoPlay': 'Auto Play',
      'settings.skipRead': 'Skip Read Text (SKIP)',
      'settings.brightness': 'Brightness',
      'settings.spriteShadow': 'Sprite Shadows',
      'settings.screenShake': 'Screen Shake',
      'settings.sfxOn': 'Sound Effects',

      /* 存档界面 */
      'save.saved': 'Game saved.',
      'save.empty': 'No save found.',
      'save.title': 'Save Game',
      'save.loadTitle': 'Load Game',
      'save.auto': 'AUTO',
      'save.autoLabel': 'Auto Save',
      'save.autoEmpty': 'No auto save yet',
      'save.emptySlot': 'Empty Slot',
      'save.progress': 'Progress',
      'save.cancel': 'Cancel',
      'save.slot': 'SLOT',
      'save.beforeMg1': 'Before System Breach',
      'save.beforeMg2': 'Before Warehouse Infiltration',
      'save.beforeMg3': 'Before the Final Duel',
      'save.endingLoad': 'Load Save',

      /* 画廊 */
      'gallery.title': 'Gallery',
      'gallery.scenes': 'Scene CG',
      'gallery.characters': 'Characters',
      'gallery.tips': 'Tips',
      'gallery.back': 'Back to Title',
      'gallery.lockedTip': 'Not yet unlocked. Continue the story to discover more secrets.',
      'gallery.clickClose': 'Click anywhere to close',

      /* 成就 */
      'ach.title': 'Achievements',
      'ach.back': 'Back',
      'ach.unlocked': 'Achievement Unlocked:',

      /* 快捷菜单 */
      'qm.title': 'System Menu',
      'qm.resume': 'Continue',
      'qm.save': 'Save',
      'qm.load': 'Load',
      'qm.settings': 'Settings',
      'qm.backToTitle': 'Back to Title',

      /* 游戏界面 */
      'game.back': 'BACK',

      /* 小游戏 1：系统入侵 */
      'mg1.title': 'SYSTEM BREACH',
      'mg1.timer': 'TIME',
      'mg1.matrix': 'CODE MATRIX',
      'mg1.targets': 'TARGET SEQUENCES',
      'mg1.buffer': 'UPLOAD BUFFER',
      'mg1.targetPrimary': 'Primary',
      'mg1.targetSecondary': 'Secondary',
      'mg1.hintRow': 'Select a code from any ROW',
      'mg1.hintCol': 'Now select from the same COLUMN',
      'mg1.uploaded': 'Sequence uploaded',
      'mg1.primaryDone': 'Primary sequence uploaded — breach successful! Keep going for bonus data.',

      /* 小游戏 2：仓库潜入 */
      'mg2.title': 'WAREHOUSE INFILTRATION',
      'mg2.mission': 'Mission: reach the intel terminal (◆) at the far right without being spotted.',
      'mg2.alert': 'ALERT',
      'mg2.statusMove': 'Run ←/→ (A/D), jump ↑/W/Space. If any guard searchlight touches you — or you step into a floor light pool — you are caught instantly!',
      'mg2.hint': 'Guards patrol the warehouse and scan with searchlight cones — if their light touches you, you are caught on the spot. The light pools on the floor are deadly too: step into one outside a shadow and you are eliminated instantly. Cross above the lights using crates and shelves, and hide in the dark shadow zones. Hold ↑ against a wall in mid-air to climb; press SPACE to wall-jump.',
      'mg2.ctrlMove': 'Run',
      'mg2.ctrlJump': 'Jump',
      'mg2.captured': 'Alert maxed out — you have been caught!',
      'mg2.winText': 'INTEL SECURED!',
      'mg2.intelLabel': 'INTEL',
      'mg2.chipsDone': 'Intel: ',
      'mg2.perfect': 'PERFECT! All intel secured!',
      'mg2.touched': 'A guard bumped into you — alert surged!',
      'mg2.climbHint': 'Hold ↑ against wall to climb · SPACE to wall-jump',
      'mg2.ctrlClimb': 'Climb (hold ↑ against wall in air)',
      'mg2.ctrlWallJump': 'Wall Jump',
      'mg2.exposed': 'CAUGHT — you stepped into the light!',
      'mg2.escape': 'INTEL SECURED — ESCAPE! Reach the exit at the far left!',
      'mg2.escaped': 'ESCAPED!',
      'mg2.needChips': 'Terminal locked — grab all 9 intel chips first!',
      'mg2.exitLabel': 'EXIT',

      /* 小游戏 3：最终对决 */
      'mg3.title': 'FINAL DUEL · Director Shen',
      'mg3.you': 'RAVEN',
      'mg3.shen': 'SHEN',
      'mg3.ctrlMove': 'Move',
      'mg3.ctrlJump': 'Jump',
      'mg3.ctrlPunch': 'Punch',
      'mg3.ctrlKick': 'Kick',
      'mg3.ctrlFly': 'Flying Kick (Q)',
      'mg3.ctrlSpin': 'Spinning Kick (E)',
      'mg3.ctrlPalm': 'Palm Flurry (R)',
      'mg3.ctrlUpper': 'Dragon Uppercut (T)',
      'mg3.winTag': 'Shen has been defeated. Justice prevails!',
      'mg3.loseTag': 'Raven has fallen...',
      'mg3.roundTag': 'ROUND',
      'mg3.fightTag': 'FIGHT!',
      'mg3.hitsTag': 'HITS',
      'mg3.flawlessTag': 'FLAWLESS VICTORY!',
      'mg3.ctrlBlock': 'Block (hold)',
      'mg3.ctrlDash': 'Dash (invincible)',
      'mg3.ctrlSpecial': 'Raven Combo Strike (special)',

      /* 结局 */
      'ending.backTitle': 'Back to Title',
      'ending.gallery': 'View Gallery',

      /* 章节名 */
      'chapter.c1': 'Scene 1 · Operation Homecoming',
      'chapter.c2': 'Scene 2 · The Unintended Signal',
      'chapter.c3': 'Scene 3 · The Kidnapping',
      'chapter.c4': 'Scene 4 · Reunited',
      'chapter.c5': 'Scene 5 · Warehouse Infiltration',
      'chapter.c6': 'Scene 6 · Final Confrontation',
      'chapter.ending': 'Ending',
      'chapter.default': 'The Hidden Blade',

      /* 成就 */
      'ach.corruption.name': 'Web of Corruption',
      'ach.corruption.desc': 'Reach Ending 1: Web of Corruption.',
      'ach.trapped.name': 'Trapped in the Shadows',
      'ach.trapped.desc': 'Reach Ending 2: Trapped in the Shadows.',
      'ach.triumph.name': 'The Villain\'s Triumph',
      'ach.triumph.desc': 'Reach Ending 3: The Villain\'s Triumph.',
      'ach.sacrifice.name': 'A Father\'s Sacrifice',
      'ach.sacrifice.desc': 'Reach Ending 4: A Father\'s Sacrifice.',
      'ach.justice.name': 'True Justice',
      'ach.justice.desc': 'Reach Ending 5: True Justice.',
      'ach.reunion.name': 'Old Team Reunited',
      'ach.reunion.desc': 'Reunite with Su Lan and Gu Chen on the Private Route.',
      'ach.perfect.name': 'Perfect Breach',
      'ach.perfect.desc': 'Complete the System Breach minigame with zero errors.'
    },

    zh: {
      'title.sub': '一场关于救赎、复仇与正义的抉择',
      'btn.newGame': '开始游戏',
      'btn.savedGame': '存档游戏',
      'btn.settings': '系统设置',
      'btn.gallery': '媒体画廊',
      'btn.achievements': '成就一览',
      'btn.ourTeam': '制作团队',
      'btn.back': '返回',
      'title.footer': 'HTML5 · CSS3 · JavaScript  |  4班 留在家 出品',
      'lang.toggle': 'EN',

      /* 登录界面 */
      'login.title': '特工登录',
      'login.sub': '输入你的特工代号或姓名，开始行动',
      'login.placeholder': '请输入代号或姓名…',
      'login.enter': '登 入',
      'login.hint': '代号或姓名将作为你的身份标识，与存档绑定',
      'login.welcome': '欢迎，特工',
      'login.welcomeBack': '欢迎回来，特工',
      'login.agent': '特工',
      'login.switch': '切换',
      'login.tabLogin': '登 录',
      'login.tabSignup': '注 册',
      'login.signupSub': '新玩家？输入你的真实姓名，系统将为你分配特工代号。',
      'login.signupPlaceholder': '请输入你的姓名…',
      'login.signupBtn': '注 册',
      'login.signupHint': '注册成功后你将获得特工代号，存档将与你的档案绑定。',
      'login.signedUp': '注册完成',
      'login.yourName': '你的姓名是',
      'login.yourCodename': '你的特工代号是',
      'login.enterAction': '去登录',
      'login.signupDoneHint': '现在请用你的特工代号登录，开始行动。',
      'login.pleaseLogin': '注册成功！请用你的特工代号重新登录：',
      'login.notFound': '未找到该代号或姓名的特工，请先注册。',
      'login.exists': '该姓名已注册，欢迎回来！',
      'login.logout': '退出登录',
      'login.loggedOut': '已退出登录，特工，期待再见。',

      /* 制作团队 */
      'team.title': '制作团队',
      'team.subtitle': '隐秘之刃背后的创作者',
      'team.back': '返回首页',

      'settings.title': '设置界面',
      'settings.audio': '音频设置',
      'settings.text': '文本设置',
      'settings.display': '显示设置',
      'settings.language': '语言',
      'settings.languageLabel': '界面语言',
      'settings.reset': '恢复默认',
      'settings.saveReturn': '保存并返回',
      'settings.master': '主音量',
      'settings.bgm': '背景音乐',
      'settings.sfx': '音效音量',
      'settings.voice': '语音音量',
      'settings.voiceOn': '语音旁白',
      'settings.textSpeed': '文字显示速度',
      'settings.fontSize': '字号',
      'settings.autoPlay': '自动播放',
      'settings.skipRead': '跳过已读剧情 (SKIP)',
      'settings.brightness': '画面亮度',
      'settings.spriteShadow': '角色立绘阴影',
      'settings.screenShake': '画面震动效果',
      'settings.sfxOn': '音效提示',

      'save.saved': '存档成功',
      'save.empty': '没有找到存档',
      'save.title': '保存游戏',
      'save.loadTitle': '读取存档',
      'save.auto': '自动',
      'save.autoLabel': '自动存档',
      'save.autoEmpty': '暂无自动存档',
      'save.emptySlot': '空存档位',
      'save.progress': '进度',
      'save.cancel': '取消',
      'save.slot': '槽位',
      'save.beforeMg1': '系统入侵之前',
      'save.beforeMg2': '仓库潜入之前',
      'save.beforeMg3': '最终对决之前',
      'save.endingLoad': '读取存档',

      'gallery.title': '媒体画廊',
      'gallery.scenes': '场景图集',
      'gallery.characters': '角色图鉴',
      'gallery.tips': 'Tips 词条',
      'gallery.back': '返回首页',
      'gallery.lockedTip': '尚未解锁该词条，继续推进剧情以发现更多秘密。',
      'gallery.clickClose': '点击任意处关闭',

      'ach.title': '成就一览',
      'ach.back': '返回',
      'ach.unlocked': '成就解锁：',

      'qm.title': '系统菜单',
      'qm.resume': '继续游戏',
      'qm.save': '存档',
      'qm.load': '读档',
      'qm.settings': '设置',
      'qm.backToTitle': '返回标题',

      /* 游戏界面 */
      'game.back': 'BACK',

      'mg1.title': '系统入侵',
      'mg1.timer': '时间',
      'mg1.matrix': '代码矩阵',
      'mg1.targets': '上传序列',
      'mg1.buffer': '上传缓冲',
      'mg1.targetPrimary': '主序列',
      'mg1.targetSecondary': '副序列',
      'mg1.hintRow': '从任意行选择第一个代码',
      'mg1.hintCol': '现在从同一列选择',
      'mg1.uploaded': '序列已上传',
      'mg1.primaryDone': '主序列已上传——入侵成功！继续可获取额外数据。',

      'mg2.title': '仓库潜入',
      'mg2.mission': '任务：在不被发现的情况下抵达最右侧的情报终端（◆）',
      'mg2.alert': '警戒',
      'mg2.statusMove': '使用 ←/→（A/D）奔跑，↑/W/空格 跳跃。被守卫探照灯照到或走进地面灯光池——都会立刻被抓住！',
      'mg2.hint': '守卫会在仓库中巡逻并用探照灯视线锥扫描——被灯光照到会立刻被抓住。地面上的灯光池同样致命：走进灯光（不在阴影里）会当场被淘汰。利用货箱/货架从灯光上方越过，躲进暗色阴影区。空中贴墙按住 ↑ 攀爬，按 空格 蹬墙跳。',
      'mg2.ctrlMove': '奔跑',
      'mg2.ctrlJump': '跳跃',
      'mg2.captured': '警戒值已满——你被抓住了！',
      'mg2.winText': '情报已获取！',
      'mg2.intelLabel': '情报',
      'mg2.chipsDone': '情报：',
      'mg2.perfect': '完美！情报全部到手！',
      'mg2.touched': '撞到了守卫——警戒值骤升！',
      'mg2.climbHint': '空中贴墙按住 ↑ 攀爬 · 空格 蹬墙跳',
      'mg2.ctrlClimb': '攀爬（空中贴墙按住 ↑）',
      'mg2.ctrlWallJump': '蹬墙跳',
      'mg2.exposed': '被抓住了——你走进了灯光！',
      'mg2.escape': '情报到手——快逃！抵达最左侧出口！',
      'mg2.escaped': '成功逃脱！',
      'mg2.needChips': '终端已锁定——先集齐 9 枚情报芯片！',
      'mg2.exitLabel': '出口',

      'mg3.title': '最终对决 · 沈局长',
      'mg3.you': '渡鸦',
      'mg3.shen': '沈局长',
      'mg3.ctrlMove': '移动',
      'mg3.ctrlJump': '跳跃',
      'mg3.ctrlPunch': '拳击',
      'mg3.ctrlKick': '踢击',
      'mg3.ctrlFly': '飞踢（Q）',
      'mg3.ctrlSpin': '旋风腿（E）',
      'mg3.ctrlPalm': '连环掌（R）',
      'mg3.ctrlUpper': '升龙拳（T）',
      'mg3.winTag': '沈局长被击败，正义得到了伸张！',
      'mg3.loseTag': '渡鸦倒下了……',
      'mg3.roundTag': '回合',
      'mg3.fightTag': '开战！',
      'mg3.hitsTag': '连击',
      'mg3.flawlessTag': '完美胜利！',
      'mg3.ctrlBlock': '格挡（按住）',
      'mg3.ctrlDash': '冲刺（无敌）',
      'mg3.ctrlSpecial': '渡鸦突袭·三连击（必杀）',

      'ending.backTitle': '返回标题',
      'ending.gallery': '查看画廊',

      'chapter.c1': '场景1 · 归乡行动',
      'chapter.c2': '场景2 · 意外信号',
      'chapter.c3': '场景3 · 绑架',
      'chapter.c4': '场景4 · 重聚',
      'chapter.c5': '场景5 · 仓库潜入',
      'chapter.c6': '场景6 · 最终对决',
      'chapter.ending': '结局',
      'chapter.default': '隐秘之刃',

      'ach.corruption.name': '腐败之网',
      'ach.corruption.desc': '解锁结局1：腐败之网。',
      'ach.trapped.name': '困于阴影',
      'ach.trapped.desc': '解锁结局2：困于阴影。',
      'ach.triumph.name': '恶徒凯旋',
      'ach.triumph.desc': '解锁结局3：恶徒凯旋。',
      'ach.sacrifice.name': '父亲的牺牲',
      'ach.sacrifice.desc': '解锁结局4：父亲的牺牲。',
      'ach.justice.name': '真实正义',
      'ach.justice.desc': '解锁结局5：真实正义。',
      'ach.reunion.name': '重聚旧部',
      'ach.reunion.desc': '在私人路线中与苏岚和顾晨重逢。',
      'ach.perfect.name': '完美入侵',
      'ach.perfect.desc': '在系统入侵小游戏中零失误通关。'
    }
  };

  let lang = 'en';

  function t(key){
    const d = dict[lang] || dict.en;
    return d[key] !== undefined ? d[key] : (dict.en[key] || key);
  }

  function setLang(l){
    lang = (l === 'zh') ? 'zh' : 'en';
    try{ localStorage.setItem(KEY, lang); }catch(e){}
    apply();
  }

  function toggle(){
    setLang(lang === 'en' ? 'zh' : 'en');
  }

  function apply(){
    // 更新所有 data-i18n 静态文本
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });
    // 更新语言切换按钮文字
    document.querySelectorAll('[data-i18n-lang]').forEach(el=>{
      el.textContent = t('lang.toggle');
    });
    // 设置界面语言选项高亮
    document.querySelectorAll('.lang-opt').forEach(btn=>{
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    // 标题大字体：英文模式显示 THE HIDDEN BLADE，中文模式显示 隐秘之刃
    const titleCn = document.querySelector('.title-cn');
    const titleEn = document.querySelector('.title-en');
    if(titleCn) titleCn.textContent = (lang === 'zh') ? '隐秘之刃' : 'THE HIDDEN BLADE';
    if(titleEn) titleEn.textContent = (lang === 'zh') ? 'THE HIDDEN BLADE' : '隐秘之刃';
    // 通知其他模块刷新动态文本
    if(window.SaveSys && typeof SaveSys.refreshLabels === 'function') SaveSys.refreshLabels();
    if(window.LoginSys && typeof LoginSys.refreshLabels === 'function') LoginSys.refreshLabels();
    if(window.Gallery && Gallery._rendered) Gallery.render();
    if(window.Achievements && Achievements._rendered) Achievements.render();
    if(window.TeamPage && document.getElementById('screen-team')?.classList.contains('active')) TeamPage.render();
    if(window.MiniGame1 && MiniGame1._active) MiniGame1.refreshLabels();
    if(window.MiniGame2 && MiniGame2._active) MiniGame2.refreshLabels();
    if(window.MiniGame3 && MiniGame3._active) MiniGame3.refreshLabels();
    // 如果正在游戏中，刷新当前节点文本
    const g = (window.Engine && Engine.Game) ? Engine.Game : (window.Game || null);
    if(g && g.inGame && g.node){
      const node = STORY.nodes[g.node];
      if(node && node.type !== 'minigame1' && node.type !== 'minigame2' && node.type !== 'minigame3' && node.type !== 'ending'){
        Engine.refreshCurrentNode();
      }
    }
    // 如果结局界面正在显示，刷新结局文本
    const endingScreen = document.getElementById('screen-ending');
    if(endingScreen && endingScreen.classList.contains('active') && g && g.node){
      const node = STORY.nodes[g.node];
      if(node && node.type === 'ending'){
        const L = (obj, field) => {
          const ef = field + 'En';
          return (lang === 'en' && obj[ef] !== undefined) ? obj[ef] : obj[field];
        };
        document.getElementById('ending-title').textContent = L(node, 'title') || 'Ending';
        document.getElementById('ending-text').textContent = L(node, 'text') || '';
      }
    }
  }

  function init(){
    try{
      const saved = localStorage.getItem(KEY);
      lang = (saved === 'zh') ? 'zh' : 'en';
    }catch(e){ lang = 'en'; }
  }

  function getLang(){ return lang; }

  return { t, setLang, toggle, apply, init, getLang, get dict(){ return dict; } };
})();
