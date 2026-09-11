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
      'settings.textSpeed': 'Text Speed',
      'settings.fontSize': 'Font Size',
      'settings.autoPlay': 'Auto Play',
      'settings.skipRead': 'Skip Read Text (SKIP)',
      'settings.brightness': 'Brightness',
      'settings.spriteShadow': 'Sprite Shadows',
      'settings.screenShake': 'Screen Shake',
      'settings.sfxOn': 'Sound Effects',

      /* 存档界面 */
      'save.loadTitle': 'Load Game',
      'save.saveTitle': 'Save Game',
      'save.manual': 'Manual',
      'save.quick': 'Quick',
      'save.auto': 'Auto',
      'save.back': 'Back',
      'save.empty': 'Empty Slot',
      'save.saveConfirm': 'Save Confirm',
      'save.loadConfirm': 'Load Confirm',
      'save.overwriteQ': 'Overwrite this save slot?',
      'save.saveToQ': 'Save to this slot?',
      'save.loadQ': 'Load this save? Current unsaved progress will be lost.',
      'save.cancel': 'Cancel',
      'save.confirm': 'Confirm',
      'save.saved': 'Game saved.',
      'save.loaded': 'Game loaded.',
      'save.quickSaved': 'Quick save complete.',
      'save.emptySlot': 'This slot is empty.',

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

      /* 小游戏 1 */
      'mg1.title': 'BREACH PROTOCOL · Su Lan',
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

      /* 小游戏 2 */
      'mg2.title': 'PRECISION LOCKPICKING',
      'mg2.timer': 'Time',
      'mg2.picks': 'Picks',
      'mg2.stress': 'Tension',
      'mg2.noise': 'Noise',
      'mg2.statusIdle': 'Move mouse to set pick angle, hold SPACE to apply tension',
      'mg2.pickBroken': 'Pick snapped! Noise +30%. Remaining picks reduced.',
      'mg2.hint': 'Hold SPACE within ±5° of the sweet spot to fully rotate the cylinder. Holding at a wrong angle for 1.5s snaps the pick!',
      'mg2.ctrlAngle': 'Fine-tune angle',
      'mg2.ctrlTension': 'Hold to apply tension',

      /* 结局 */
      'ending.backTitle': 'Back to Title',
      'ending.gallery': 'View Gallery',

      /* 章节名 */
      'chapter.s1': 'Chapter 1 · School Bullying Incident',
      'chapter.s2': 'Chapter 2 · The Kidnapping of Lin Yu',
      'chapter.mg1': 'Chapter 3 · HQ Infiltration',
      'chapter.mg2': 'Chapter 4 · Financial Trace',
      'chapter.final': 'Chapter 5 · Final Showdown',
      'chapter.ending': 'Ending',
      'chapter.act1': 'Act I · The Life Raven Buried',
      'chapter.act2': 'Act II · Raven Returns',
      'chapter.act3': 'Act III · The People Behind the Mirror',
      'chapter.act4': 'Act IV · Break the Prediction',
      'chapter.default': 'The Hidden Blade',

      /* 成就 */
      'ach.peace.name': 'Peaceful Father',
      'ach.peace.desc': 'Unlock the True Justice Ending.',
      'ach.vengeance.name': 'Vengeful Ghost',
      'ach.vengeance.desc': 'Unlock the Vengeance Ending.',
      'ach.reunion.name': 'Old Team Reunited',
      'ach.reunion.desc': 'Successfully recruit both Gu Chen and Su Lan.',
      'ach.perfect.name': 'Perfect Infiltration',
      'ach.perfect.desc': 'Complete Mission 1 with zero detection.',
      'ach.truth.name': 'Truth Exposed',
      'ach.truth.desc': 'Publicly reveal all core evidence of the conspiracy.',
      'ach.secret.name': 'Mirror Breaker',
      'ach.secret.desc': 'Unlock the secret ending: Rewrite Mirror.'
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
      'settings.textSpeed': '文字显示速度',
      'settings.fontSize': '字号',
      'settings.autoPlay': '自动播放',
      'settings.skipRead': '跳过已读剧情 (SKIP)',
      'settings.brightness': '画面亮度',
      'settings.spriteShadow': '角色立绘阴影',
      'settings.screenShake': '画面震动效果',
      'settings.sfxOn': '音效提示',

      'save.loadTitle': '读取存档',
      'save.saveTitle': '保存存档',
      'save.manual': '手动存档',
      'save.quick': '快速存档',
      'save.auto': '自动存档',
      'save.back': '返回',
      'save.empty': '空档位',
      'save.saveConfirm': '保存确认',
      'save.loadConfirm': '读取确认',
      'save.overwriteQ': '是否覆盖此存档？',
      'save.saveToQ': '是否保存到此档位？',
      'save.loadQ': '是否读取此存档？当前未保存的进度将会丢失。',
      'save.cancel': '取消',
      'save.confirm': '确认',
      'save.saved': '存档成功',
      'save.loaded': '读取成功',
      'save.quickSaved': '已快速存档',
      'save.emptySlot': '该档位为空',

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

      'game.back': 'BACK',

      'mg1.title': '入侵协议 · 苏岚',
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

      'mg2.title': '精密撬锁',
      'mg2.timer': '时间',
      'mg2.picks': '撬针',
      'mg2.stress': '张力',
      'mg2.noise': '噪音',
      'mg2.statusIdle': '移动鼠标调整撬针角度，按住空格施加张力',
      'mg2.pickBroken': '撬针折断！噪音 +30%。剩余撬针减少。',
      'mg2.hint': '在甜蜜点±5°范围内按住空格可完全转动锁芯。错误角度持续1.5秒会折断撬针！',
      'mg2.ctrlAngle': '微调角度',
      'mg2.ctrlTension': '按住施加张力',

      'ending.backTitle': '返回标题',
      'ending.gallery': '查看画廊',

      'chapter.s1': '第一章 · 校园霸凌事件',
      'chapter.s2': '第二章 · 林雨绑架案',
      'chapter.mg1': '第三章 · 潜入总部',
      'chapter.mg2': '第四章 · 资金链追踪',
      'chapter.final': '第五章 · 终局决战',
      'chapter.ending': '结局',
      'chapter.act1': '第一幕 · 渡鸦埋葬的生活',
      'chapter.act2': '第二幕 · 渡鸦归来',
      'chapter.act3': '第三幕 · 镜后的人',
      'chapter.act4': '第四幕 · 打破预言',
      'chapter.default': '隐秘之刃',

      'ach.peace.name': '和平的父亲',
      'ach.peace.desc': '解锁【真实正义结局】。',
      'ach.vengeance.name': '复仇之鬼',
      'ach.vengeance.desc': '解锁【复仇结局】。',
      'ach.reunion.name': '重聚旧部',
      'ach.reunion.desc': '成功招募顾晨与苏岚两名旧队友。',
      'ach.perfect.name': '完美潜入',
      'ach.perfect.desc': '在微游戏1（潜入集团总部）中达成零失误通关。',
      'ach.truth.name': '真相大白',
      'ach.truth.desc': '向公众完整公开阴谋的所有核心证据。',
      'ach.secret.name': '破镜者',
      'ach.secret.desc': '解锁秘密结局：改写镜系统。'
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
    if(window.Gallery && Gallery._rendered) Gallery.render();
    if(window.Achievements && Achievements._rendered) Achievements.render();
    if(window.TeamPage && document.getElementById('screen-team')?.classList.contains('active')) TeamPage.render();
    if(window.MiniGame1 && MiniGame1._active) MiniGame1.refreshLabels();
    if(window.MiniGame2 && MiniGame2._active) MiniGame2.refreshLabels();
    // 如果正在游戏中，刷新当前节点文本
    const g = (window.Engine && Engine.Game) ? Engine.Game : (window.Game || null);
    if(g && g.inGame && g.node){
      const node = STORY.nodes[g.node];
      if(node && node.type !== 'minigame1' && node.type !== 'minigame2' && node.type !== 'ending' && node.type !== 'endingCheck'){
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
