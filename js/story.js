/* ===== The Hidden Blade · 隐秘之刃 — 剧情脚本 v5.0 (EN/ZH 双语) ===== */
window.STORY = {
  start: 's1_1',

  /* 背景图映射 */
  backgrounds: {
    school:   'assets/backgrounds/bg_school.png',
    home:     'assets/backgrounds/bg_home.png',
    hq:       'assets/backgrounds/bg_hq.png',
    server:   'assets/backgrounds/bg_server.png',
    safehouse:'assets/backgrounds/bg_safehouse.png',
    bunker:   'assets/backgrounds/bg_bunker.png',
    title:    'assets/backgrounds/bg_title.png'
  },

  /* 角色立绘映射 */
  sprites: {
    linxiao:   { base:'assets/sprites/linxiao_base.png', sad:'assets/sprites/linxiao_sad.png', happy:'assets/sprites/linxiao_happy.png', angry:'assets/sprites/linxiao_angry.png' },
    linyu:     { base:'assets/sprites/linyu_base.png', sad:'assets/sprites/linyu_sad.png' },
    guchen:    { base:'assets/sprites/guchen_base.png', fierce:'assets/sprites/guchen_fierce.png' },
    sulan:     { base:'assets/sprites/sulan_base.png', focused:'assets/sprites/sulan_focused.png' },
    mastermind:{ base:'assets/sprites/mastermind_base.png' },
    kidnapper: { base:'assets/sprites/kidnapper_base.png' },
    mei:       { base:'assets/sprites/mei_base.png' },
    shen:      { base:'assets/sprites/shen_base.png' },
    victor:    { base:'assets/sprites/victor_base.png' },
    zhaokai:   { base:'assets/sprites/zhaokai_base.png' },
    drhe:      { base:'assets/sprites/drhe_base.png' }
  },

  /* 角色图鉴 */
  characters: [
    { id:'linxiao',   name:'林骁', nameEn:'Lin Xiao / Raven', role:'退役特工 / 主角', roleEn:'Retired Agent / Protagonist',
      desc:'前精英特工，退役后成为档案管理员和单亲父亲。为救女儿被迫重新成为"渡鸦"。',
      descEn:'Former elite operative, now an archivist and single father. Forced to become Raven again to save his daughter.' },
    { id:'linyu',     name:'林雨', nameEn:'Lin Yu', role:'林骁之女 / 可玩角色', roleEn:"Lin Xiao's Daughter / Playable",
      desc:'十六岁，敏锐而倔强。从表面受害者成长为调查者，她的选择可以拯救父亲。',
      descEn:'Sixteen, observant and stubborn. Grows from apparent victim to investigator whose choices can save her father.' },
    { id:'guchen',    name:'顾晨', nameEn:'Gu Chen', role:'旧队友 / 战术专家', roleEn:'Old Teammate / Tactical Expert',
      desc:'林骁昔日战场搭档。忠诚能干，却背负着"归乡行动"中服从命令的重担。',
      descEn:"Lin Xiao's former field partner. Loyal and capable, burdened by the order he obeyed during Operation Homecoming." },
    { id:'sulan',     name:'苏岚', nameEn:'Su Lan', role:'旧队友 / 情报专家', roleEn:'Old Teammate / Intelligence Expert',
      desc:'前情报分析师与系统专家。对两个男人都不信任，却是团队最清醒的道德与技术之声。',
      descEn:'Former intelligence analyst and systems specialist. Distrusts both men but becomes the team\'s clearest moral and technical voice.' },
    { id:'mei',       name:'梅晨', nameEn:'Mei Chen / M', role:'林雨之母 / 镜之工程师', roleEn:"Lin Yu's Mother / Mirror Engineer",
      desc:'镜系统原始工程师之一。官方记录已死亡十年，实则潜伏在网络中 dismantle 自己参与创建的系统。',
      descEn:'One of Mirror\'s original engineers. Officially dead for ten years; secretly working to dismantle the system she helped create.' },
    { id:'shen',      name:'沈局长', nameEn:'Director Shen', role:'最终反派 / 前指挥官', roleEn:'Final Antagonist / Former Commander',
      desc:'林骁的前指挥官与导师。相信预测是比混乱更人道的控制方式。',
      descEn:"Lin Xiao's former commander and mentor. Believes prediction is a more humane form of control than chaos." },
    { id:'victor',    name:'赵维克多', nameEn:'Victor Zhao', role:'洛伦集团CEO', roleEn:'CEO of Loren Group',
      desc:'参与镜系统创建，但并非当前掌控者。一个令人信服的虚假最终反派。',
      descEn:'Complicit in Mirror\'s creation, but not its current master. A convincing false final villain.' },
    { id:'zhaokai',   name:'赵凯', nameEn:'Zhao Kai', role:'校园霸凌者 / 意外证人', roleEn:'School Bully / Unexpected Witness',
      desc:'维克多之子，林雨的校园霸凌者。知道父亲秘密的碎片，可能成为意外证人。',
      descEn:"Victor's son and Lin Yu's bully. Knows fragments of his father's secrets and can become an unexpected witness." },
    { id:'drhe',      name:'何亮博士', nameEn:'Dr. He Liang', role:'前镜之工程师', roleEn:'Former Mirror Engineer',
      desc:'前镜系统工程师，官方推定死亡。联系林雨并触发了整个事件链。',
      descEn:'Former Mirror engineer, presumed dead. Contacts Lin Yu and triggers the chain of events.' },
    { id:'mastermind',name:'幕后黑手', nameEn:'The Mastermind', role:'神秘身影', roleEn:'Mysterious Figure',
      desc:'阴影中操纵一切的神秘存在。',
      descEn:'A mysterious figure pulling strings from the shadows.' },
    { id:'kidnapper', name:'执行者', nameEn:'The Enforcer', role:'现场执行者', roleEn:'Field Enforcer',
      desc:'受雇执行绑架与押运的神秘人物。',
      descEn:'Mysterious operative hired for abductions and transport.' }
  ],

  /* Tips 词条 */
  tips: [
    { id:'tip_homecoming', title:'归乡行动', titleEn:'Operation Homecoming',
      text:'十年前的一次秘密行动，官方记录为清剿武装极端分子。17人死亡，1人失踪。真相被刻意掩埋。',
      textEn:'A covert operation ten years ago, officially described as eliminating armed extremists. 17 dead, 1 missing. The truth was deliberately buried.',
      unlock:'s1_12' },
    { id:'tip_mirror', title:'镜系统', titleEn:'Project Mirror',
      text:'一个预测性监控系统，通过分析行为数据预测犯罪。梅晨是原始工程师之一，沈局长秘密夺取了其预测引擎。',
      textEn:'A predictive surveillance system that forecasts crime through behavioral analysis. Mei Chen was one of its original engineers; Director Shen secretly seized its prediction engine.',
      unlock:'s12_6' },
    { id:'tip_keys', title:'双密钥', titleEn:'The Two Keys',
      text:'梅晨将镜系统核心授权拆分为两部分：林骁（密钥一）和林雨（密钥二）。只有两人同时在场才能激活原始核心。',
      textEn:'Mei split Mirror\'s core authorization into two parts: Lin Xiao (Key One) and Lin Yu (Key Two). Both must be present to activate the original core.',
      unlock:'s14_3' },
    { id:'tip_raven', title:'渡鸦', titleEn:'Raven',
      text:'林骁在特工时期的代号。SUBJECT_017档案显示他在战术装备中的照片。',
      textEn:"Lin Xiao's codename during his operative years. The SUBJECT_017 file shows him in tactical gear.",
      unlock:'s4_3' },
    { id:'tip_evidence', title:'证据系统', titleEn:'Evidence System',
      text:'游戏中收集的证据影响最终结局。高证据可以解锁"改写镜系统"的秘密结局，并使沈局长被合法逮捕。',
      textEn:'Evidence collected throughout the game affects the ending. High evidence unlocks the secret "Rewrite Mirror" ending and allows Shen to be lawfully arrested.',
      unlock:'s17_1' },
    { id:'tip_truth', title:'真相与正义', titleEn:'Truth & Justice',
      text:'将完整证据移交司法机关，才能让阴谋在阳光下被审判。以暴制暴或许快意，却永远无法换来真正的平静。',
      textEn:'Only by handing complete evidence to the authorities can the conspiracy be tried in daylight. Vigilantism may feel satisfying, but it never brings true peace.',
      unlock:'end_justice' }
  ],

  /* 场景 CG */
  cgs: [
    { id:'cg_homecoming', title:'CG 01 · 归乡行动', titleEn:'CG 01 · Operation Homecoming', bg:'bunker', unlock:'s1_1' },
    { id:'cg_family', title:'CG 02 · 烧焦的早餐', titleEn:'CG 02 · Burnt Breakfast', bg:'home', unlock:'s2_1' },
    { id:'cg_school', title:'CG 03 · 校门口', titleEn:'CG 03 · School Gate', bg:'school', unlock:'s3_1' },
    { id:'cg_usb', title:'CG 04 · U盘中的秘密', titleEn:'CG 04 · The USB Secret', bg:'home', unlock:'s4_1' },
    { id:'cg_cctv', title:'CG 05 · CCTV监控', titleEn:'CG 05 · CCTV Investigation', bg:'server', unlock:'s7_1' },
    { id:'cg_warehouse', title:'CG 06 · 仓库搜寻', titleEn:'CG 06 · Warehouse Hunt', bg:'bunker', unlock:'s10_1' },
    { id:'cg_guchen', title:'CG 07 · 死去的搭档', titleEn:'CG 07 · The Dead Partner', bg:'safehouse', unlock:'s12_1' },
    { id:'cg_hack', title:'CG 08 · 入侵镜系统', titleEn:'CG 08 · Break Into Mirror', bg:'server', unlock:'s14_1' },
    { id:'cg_linyu', title:'CG 09 · 071号实验体', titleEn:'CG 09 · Subject 071', bg:'server', unlock:'s15_1' },
    { id:'cg_mei', title:'CG 10 · M的真面目', titleEn:'CG 10 · M Has a Face', bg:'server', unlock:'s20_1' },
    { id:'cg_gala', title:'CG 11 · 洛伦慈善晚宴', titleEn:'CG 11 · Loren Gala', bg:'hq', unlock:'s18_1' },
    { id:'cg_family2', title:'CG 12 · 家人重逢', titleEn:'CG 12 · The Family', bg:'server', unlock:'s26_1' },
    { id:'cg_final', title:'CG 13 · 最后的命令', titleEn:'CG 13 · The Last Order', bg:'bunker', unlock:'s30_1' },
    { id:'cg_justice', title:'CG 14 · 真实正义', titleEn:'CG 14 · True Justice', bg:'school', unlock:'end_justice' },
    { id:'cg_vengeance', title:'CG 15 · 复仇', titleEn:'CG 15 · Vengeance', bg:'bunker', unlock:'end_vengeance' },
    { id:'cg_secret', title:'CG 16 · 打破镜子', titleEn:'CG 16 · Break the Mirror', bg:'home', unlock:'end_secret' }
  ],

  /* ===== 剧情节点 ===== */
  nodes: {

    /* ================================================================
       ACT I — THE LIFE RAVEN BURIED
       ================================================================ */

    /* ---------- 场景1：归乡行动（十年前） ---------- */
    s1_1: {
      bg:'bunker', cg:'cg_homecoming',
      sprites:[],
      speaker:'旁白', speakerEn:'Narrator',
      text:'十年前。凌晨2点17分。废弃铁路研究站上空，大雨倾盆。',
      textEn:'Ten years earlier. 02:17 AM. Heavy rain over an abandoned railway research station.',
      next:'s1_2'
    },
    s1_2: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'base',slot:'left'},{char:'guchen',pose:'base',slot:'right'},{char:'shen',pose:'base',slot:'center'}],
      speaker:'沈局长（无线电）', speakerEn:'Shen (radio)',
      text:'渡鸦小队，确认位置。',
      textEn:'Raven Team, confirm position.',
      next:'s1_3'
    },
    s1_3: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'base',slot:'left'},{char:'guchen',pose:'base',slot:'right'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'两百米。没有外部守卫。',
      textEn:'Two hundred meters. No external guards.',
      next:'s1_4'
    },
    s1_4: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'guchen',pose:'base',slot:'right'},{char:'shen',pose:'base',slot:'center'}],
      speaker:'沈局长（无线电）', speakerEn:'Shen (radio)',
      text:'取回硬盘。消灭敌对人员。不留证据。',
      textEn:'Retrieve the drive. Eliminate hostile personnel. Leave no evidence.',
      next:'s1_5'
    },
    s1_5: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'最后一部分不在简报里。',
      textEn:'That last part wasn\'t in the briefing.',
      next:'s1_6'
    },
    s1_6: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'shen',pose:'base',slot:'center'}],
      speaker:'沈局长（无线电）', speakerEn:'Shen (radio)',
      text:'现在在了。',
      textEn:'It is now.',
      next:'s1_7'
    },
    s1_7: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'建筑内部，一名受伤的研究人员伸手向林骁——不是去拿武器。',
      textEn:'Inside, a wounded researcher reaches for Lin Xiao rather than a weapon.',
      next:'s1_8'
    },
    s1_8: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'研究人员', speakerEn:'Researcher',
      text:'别让他得到"镜"……',
      textEn:'Don\'t let him have Mirror…',
      next:'s1_9'
    },
    s1_9: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'谁？',
      textEn:'Who?',
      next:'s1_10'
    },
    s1_10: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'研究人员', speakerEn:'Researcher',
      text:'沈——',
      textEn:'Shen—',
      next:'s1_11'
    },
    s1_11: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'guchen',pose:'fierce',slot:'right'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'枪声打断了他。烟雾中，林骁看到一个熟悉的女人——梅。与此同时，顾晨收到了一条私人命令。',
      textEn:'Gunfire cuts him off. Through smoke, Lin Xiao sees a familiar woman: Mei. At the same moment, Gu Chen receives a private order.',
      next:'s1_12'
    },
    s1_12: {
      bg:'bunker',
      sprites:[{char:'guchen',pose:'fierce',slot:'right'},{char:'shen',pose:'base',slot:'center'}],
      speaker:'沈局长（无线电）', speakerEn:'Shen (radio)',
      text:'七号协议。执行。',
      textEn:'Protocol Seven. Execute.',
      next:'s1_13'
    },
    s1_13: {
      bg:'bunker',
      sprites:[{char:'guchen',pose:'fierce',slot:'right'}],
      speaker:'顾晨', speakerEn:'Gu Chen',
      text:'里面有平民。',
      textEn:'There are civilians inside.',
      next:'s1_14'
    },
    s1_14: {
      bg:'bunker',
      sprites:[{char:'guchen',pose:'fierce',slot:'right'},{char:'shen',pose:'base',slot:'center'}],
      speaker:'沈局长（无线电）', speakerEn:'Shen (radio)',
      text:'这是命令。',
      textEn:'That is an order.',
      next:'s1_15'
    },
    s1_15: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'base',slot:'left'},{char:'guchen',pose:'base',slot:'right'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'林骁可以停下来帮助受伤的研究人员，或者追向梅。这个选择将被铭记，影响秘密结局。',
      textEn:'Lin Xiao can stop to help a wounded researcher or chase Mei. This choice is remembered for the secret ending.',
      choices:[
        { label:'帮助受伤的研究人员', labelEn:'Help the wounded researcher', flag:{homecoming:'help'}, stats:{trust:+15, evidence:+10}, next:'s1_16' },
        { label:'追向梅', labelEn:'Chase Mei', flag:{homecoming:'chase'}, stats:{revenge:+5, exposure:+5}, next:'s1_16' }
      ]
    },
    s1_16: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'爆炸吞噬了整个研究站。林骁独自醒来，看到监视器上破碎的黑羽符号，呼喊着梅的名字。',
      textEn:'An explosion consumes the station. Lin Xiao wakes alone, sees the broken-black-feather symbol on a monitor, and calls for Mei.',
      next:'s1_17'
    },
    s1_17: {
      bg:'bunker',
      sprites:[],
      speaker:'旁白', speakerEn:'Narrator',
      text:'画面切黑。归乡行动 —— 17人死亡 —— 1人失踪。',
      textEn:'Cut to black: OPERATION HOMECOMING — 17 DEAD — 1 MISSING.',
      next:'s2_1'
    },

    /* ---------- 场景2：烧焦的早餐 ---------- */
    s2_1: {
      bg:'home', cg:'cg_family',
      sprites:[{char:'linxiao',pose:'happy',slot:'left'},{char:'linyu',pose:'base',slot:'right'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'现在。林骁把早餐烤焦了。林雨拍了照作为"证据"。他们的调侃熟练而温馨。',
      textEn:'Present day. Lin Xiao burns breakfast. Lin Yu photographs the result as "evidence." Their teasing feels practiced and comfortable.',
      next:'s2_2'
    },
    s2_2: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'happy',slot:'left'},{char:'linyu',pose:'base',slot:'right'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'昨天是楼梯，今天是体育课。明天呢？',
      textEn:'Yesterday it was the stairs. Today it\'s PE. What happens tomorrow?',
      next:'s2_3'
    },
    s2_3: {
      bg:'home',
      sprites:[{char:'linyu',pose:'base',slot:'right'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'也许我会撞到门。留点余地嘛。',
      textEn:'Maybe I walk into a door. Keep your options open.',
      next:'s2_4'
    },
    s2_4: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'base',slot:'left'},{char:'linyu',pose:'base',slot:'right'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'雨雨。',
      textEn:'Yu Yu.',
      next:'s2_5'
    },
    s2_5: {
      bg:'home',
      sprites:[{char:'linyu',pose:'base',slot:'right'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'我能应付学校。',
      textEn:'I can handle school.',
      next:'s2_6'
    },
    s2_6: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'base',slot:'left'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'我问的不是这个。',
      textEn:'That wasn\'t my question.',
      next:'s2_7'
    },
    s2_7: {
      bg:'home',
      sprites:[{char:'linyu',pose:'sad',slot:'right'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'所以我要在你把早餐变成审讯之前离开。',
      textEn:'And that\'s why I\'m leaving before you turn breakfast into an interrogation.',
      next:'s3_1'
    },

    /* ---------- 场景3：校门口 ---------- */
    s3_1: {
      bg:'school', cg:'cg_school',
      sprites:[{char:'linyu',pose:'sad',slot:'left'},{char:'linxiao',pose:'base',slot:'right'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'校门口。林骁看到林雨撕破的袖子，以及赵凯得意的告别。',
      textEn:'At the school gate. Lin Xiao sees Lin Yu\'s torn sleeve and Zhao Kai\'s smug farewell.',
      next:'s3_2'
    },
    s3_2: {
      bg:'school',
      sprites:[{char:'linyu',pose:'sad',slot:'left'},{char:'zhaokai',pose:'base',slot:'right'}],
      speaker:'赵凯', speakerEn:'Zhao Kai',
      text:'明天见，林雨。',
      textEn:'See you tomorrow, Lin Yu.',
      next:'s3_3'
    },
    s3_3: {
      bg:'school',
      sprites:[{char:'linxiao',pose:'angry',slot:'right'},{char:'linyu',pose:'sad',slot:'left'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'他是谁？',
      textEn:'Who is he?',
      next:'s3_4'
    },
    s3_4: {
      bg:'school',
      sprites:[{char:'linyu',pose:'sad',slot:'left'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'没人。',
      textEn:'Nobody.',
      next:'s3_5'
    },
    s3_5: {
      bg:'school',
      sprites:[{char:'linxiao',pose:'angry',slot:'right'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'"没人"给你弄了这个伤口？',
      textEn:'Nobody gave you that cut?',
      next:'s3_6'
    },
    s3_6: {
      bg:'school',
      sprites:[{char:'linyu',pose:'sad',slot:'left'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'求你别变成奇怪老爸。',
      textEn:'Please don\'t become weird Dad.',
      next:'s3_7'
    },
    s3_7: {
      bg:'school',
      sprites:[{char:'linxiao',pose:'base',slot:'right'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'定义一下"奇怪"。',
      textEn:'Define weird.',
      next:'s3_8'
    },
    s3_8: {
      bg:'school',
      sprites:[{char:'linyu',pose:'sad',slot:'left'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'就是你盯着一个十六岁孩子，像在策划他葬礼的那种版本。',
      textEn:'The version where you stare at a sixteen-year-old like you\'re planning his funeral.',
      next:'s3_9'
    },
    s3_9: {
      bg:'school',
      sprites:[{char:'linxiao',pose:'angry',slot:'right'},{char:'linyu',pose:'sad',slot:'left'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'林骁必须决定如何处理赵凯。',
      textEn:'Lin Xiao must decide how to handle Zhao Kai.',
      choices:[
        { label:'通过学校举报赵凯（合法）', labelEn:'Report Zhao Kai through the school (lawful)', stats:{trust:+10, evidence:+5}, flag:{zhao:'report'}, next:'s4_1' },
        { label:'悄悄威胁他', labelEn:'Quietly threaten him', stats:{revenge:+15, exposure:+10}, flag:{zhao:'threaten'}, next:'s4_1' },
        { label:'让林雨自己处理', labelEn:'Let Lin Yu handle it', stats:{trust:+5}, flag:{zhao:'letgo'}, next:'s4_1' }
      ]
    },

    /* ---------- 场景4：U盘 ---------- */
    s4_1: {
      bg:'home', cg:'cg_usb',
      sprites:[{char:'linyu',pose:'base',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'当晚，以林雨的视角游玩。一个未知来源将U盘悄悄塞进了她的书包。',
      textEn:'That evening, play as Lin Yu. An unknown source slipped a USB drive into her bag.',
      next:'s4_2'
    },
    s4_2: {
      bg:'home',
      sprites:[{char:'linyu',pose:'base',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'文件包括：归乡行动十周年、镜系统、017号实验体，以及一个损坏的"梅晨"目录。',
      textEn:'Files include: HOMECOMING_10Y, MIRROR, SUBJECT_017, and a damaged MEI_CHEN directory.',
      next:'s4_3'
    },
    s4_3: {
      bg:'home',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'爸……你到底做了什么？',
      textEn:'Dad… what did you do?',
      next:'s4_4'
    },
    s4_4: {
      bg:'home',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'017号实验体档案显示了身着战术装备的林骁，代号：渡鸦。林雨试图打开母亲的文件。',
      textEn:'SUBJECT_017 displays Lin Xiao in tactical gear with CODENAME: RAVEN. Lin Yu tries to open her mother\'s file.',
      next:'s4_5'
    },
    s4_5: {
      bg:'home',
      sprites:[{char:'linyu',pose:'angry',slot:'center'}],
      speaker:'系统', speakerEn:'System',
      text:'检测到远程连接。摄像头已激活。',
      textEn:'REMOTE CONNECTION DETECTED. Webcam activated.',
      next:'s4_6'
    },
    s4_6: {
      bg:'home',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'外面，一辆黑色面包车驶离。林雨的手机收到一条未知发件人的消息。',
      textEn:'Outside, a black van pulls away. A message appears on Lin Yu\'s phone from an unknown sender.',
      next:'s4_7'
    },
    s4_7: {
      bg:'home',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'未知发件人（H）', speakerEn:'Unknown (H)',
      text:'如果你想知道关于你母亲的真相，明天一个人来。——H',
      textEn:'IF YOU WANT THE TRUTH ABOUT YOUR MOTHER, COME ALONE TOMORROW. — H',
      next:'s5_1'
    },

    /* ---------- 场景5：最后的正常夜晚 ---------- */
    s5_1: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'base',slot:'left'},{char:'linyu',pose:'base',slot:'right'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'一个安静的晚餐场景，在一切消失之前。',
      textEn:'A quiet dinner scene before the disappearance.',
      next:'s5_2'
    },
    s5_2: {
      bg:'home',
      sprites:[{char:'linyu',pose:'base',slot:'right'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'爸，妈妈在我出生前是做什么的？',
      textEn:'Dad, what did Mom do before I was born?',
      next:'s5_3'
    },
    s5_3: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'base',slot:'left'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'为什么问这个？',
      textEn:'Why?',
      next:'s5_4'
    },
    s5_4: {
      bg:'home',
      sprites:[{char:'linyu',pose:'base',slot:'right'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'作业。',
      textEn:'Homework.',
      next:'s5_5'
    },
    s5_5: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'你的作业问我死去的妻子？',
      textEn:'Your homework asks about my dead wife?',
      next:'s5_6'
    },
    s5_6: {
      bg:'home',
      sprites:[{char:'linyu',pose:'base',slot:'right'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'家族史。',
      textEn:'Family history.',
      next:'s5_7'
    },
    s5_7: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'她做电脑相关的工作，讨厌被拍照。',
      textEn:'She worked with computers and hated being photographed.',
      next:'s5_8'
    },
    s5_8: {
      bg:'home',
      sprites:[{char:'linyu',pose:'sad',slot:'right'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'她有没有骗过你？',
      textEn:'Did she ever lie to you?',
      next:'s5_9'
    },
    s5_9: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'每个人都会撒谎。',
      textEn:'Everyone lies.',
      next:'s5_10'
    },
    s5_10: {
      bg:'home',
      sprites:[{char:'linyu',pose:'sad',slot:'right'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'真让人安心。',
      textEn:'That\'s comforting.',
      next:'s5_11'
    },
    s5_11: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'重要的问题是为什么。',
      textEn:'The important question is why.',
      next:'s5_12'
    },
    s5_12: {
      bg:'home',
      sprites:[{char:'linyu',pose:'sad',slot:'right'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'林雨凝视着他，知道他也在撒谎。',
      textEn:'Lin Yu studies him, knowing he is lying too.',
      next:'s6_1'
    },

    /* ---------- 场景6：失踪 ---------- */
    s6_1: {
      bg:'school',
      sprites:[{char:'linxiao',pose:'sad',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'第二天下午，林骁收到一条消息："爸，我在学校留晚一点，别等我。"',
      textEn:'The next afternoon, Lin Xiao receives: "Dad, staying late at school. Don\'t wait."',
      next:'s6_2'
    },
    s6_2: {
      bg:'school',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'不对。她平时叫我"老林"。',
      textEn:'Something\'s wrong. She normally calls me "Old Lin."',
      next:'s6_3'
    },
    s6_3: {
      bg:'school',
      sprites:[{char:'linxiao',pose:'sad',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'在学校，他找到了她被砸碎的手机、背包，以及破碎的黑羽标记。',
      textEn:'At school he finds her smashed phone, backpack, and the broken-black-feather mark.',
      next:'s6_4'
    },
    s6_4: {
      bg:'school',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'扭曲的声音', speakerEn:'Distorted Voice',
      text:'你好，渡鸦。',
      textEn:'Hello, Raven.',
      next:'s6_5'
    },
    s6_5: {
      bg:'school',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'我女儿在哪？',
      textEn:'Where is my daughter?',
      next:'s6_6'
    },
    s6_6: {
      bg:'school',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'扭曲的声音', speakerEn:'Distorted Voice',
      text:'活着。我们需要她携带的东西。',
      textEn:'Alive. We need what she carries.',
      next:'s6_7'
    },
    s6_7: {
      bg:'school',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'她只是个孩子。',
      textEn:'She\'s a child.',
      next:'s6_8'
    },
    s6_8: {
      bg:'school',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'扭曲的声音', speakerEn:'Distorted Voice',
      text:'不。她是一把钥匙。',
      textEn:'No. She\'s a key.',
      next:'s7_1'
    },

    /* ================================================================
       ACT II — RAVEN RETURNS
       ================================================================ */

    /* ---------- 场景7：CCTV监控（小游戏1） ---------- */
    s7_1: {
      bg:'server',
      sprites:[{char:'sulan',pose:'focused',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'苏岚接入了学校周边的监控服务器。她必须绕过防火墙，上传入侵序列，才能调取六个摄像头的完整录像。',
      textEn:'Su Lan breaches the school\'s CCTV server. She must bypass the firewall by uploading breach sequences to access all six camera feeds.',
      next:'s7_mg'
    },
    s7_mg: {
      type:'minigame1',
      nextSuccess:'s7_ok',
      nextFail:'s7_fail'
    },
    s7_ok: {
      bg:'server',
      sprites:[{char:'sulan',pose:'focused',slot:'center'}],
      speaker:'苏岚', speakerEn:'Su Lan',
      text:'入侵成功。完整录像拿到了——林雨独自离开学校，自愿与官方记录已死亡八年的何亮博士见面。他给她看了一张梅的照片。第二辆车到达，蒙面人袭击了何博士并带走了林雨。车牌LH-0719，洛伦物流贴纸。',
      textEn:'Breach successful. Got the full footage — Lin Yu leaves school alone, voluntarily meets Dr. He Liang (officially dead eight years). He shows her a photo of Mei. A second vehicle arrives; masked men attack Dr. He and seize Lin Yu. Plate LH-0719, a Loren logistics sticker.',
      stats:{evidence:+20},
      next:'s8_1'
    },
    s7_fail: {
      bg:'server',
      sprites:[{char:'sulan',pose:'base',slot:'center'}],
      speaker:'苏岚', speakerEn:'Su Lan',
      text:'防火墙把我踢出来了。只拿到一段不完整的画面——林雨上了一辆黑色厢式车，但有三个可能的仓库位置。',
      textEn:'The firewall kicked me out. Only got partial footage — Lin Yu entered a black van, but there are three possible warehouse locations.',
      stats:{exposure:+10},
      next:'s8_1'
    },

    /* ---------- 场景8：正常手段失效 ---------- */
    s8_1: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'base',slot:'left'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'林骁首先尝试使用正规渠道。一名警探说学校监控已损坏，让他回家等。',
      textEn:'Lin Xiao first tries official channels. A detective says the school footage is corrupted and tells him to go home and wait.',
      next:'s8_2'
    },
    s8_2: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'警探', speakerEn:'Detective',
      text:'林先生，回家吧。我们会打电话给你。',
      textEn:'Mr. Lin, go home. We\'ll call you.',
      next:'s8_3'
    },
    s8_3: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'你已经知道我是谁了。',
      textEn:'You already know who I am.',
      next:'s8_4'
    },
    s8_4: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'警探', speakerEn:'Detective',
      text:'我知道你是个焦急的父亲。',
      textEn:'I know you\'re a worried father.',
      next:'s8_5'
    },
    s8_5: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'我问的不是这个。',
      textEn:'That isn\'t what I asked.',
      next:'s8_6'
    },
    s8_6: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'林骁注意到警探收到一条带有黑羽图标的消息，然后悄悄删除了它。在停车场，他看到警探在拍他的车。',
      textEn:'Lin Xiao notices the detective receive a message with the black-feather icon, then quietly delete it. In the parking lot, he sees the detective photographing his car.',
      next:'s9_1'
    },

    /* ---------- 场景9：打开盒子 ---------- */
    s9_1: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'sad',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'只有现在，林骁才确定正常手段已经被渗透。他打开书架后面的隐藏暗格。',
      textEn:'Only now does Lin Xiao decide normal methods are compromised. He opens the hidden cache behind his bookshelf.',
      next:'s9_2'
    },
    s9_2: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'sad',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'徽章、加密无线电、旧配枪、战术刀、归乡行动的照片。',
      textEn:'Badge, encrypted radio, old sidearm, field knife, the Homecoming photograph.',
      next:'s9_3'
    },
    s9_3: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'最后一次。',
      textEn:'One last time.',
      next:'s10_1'
    },

    /* ---------- 场景10：仓库搜寻 ---------- */
    s10_1: {
      bg:'bunker', cg:'cg_warehouse',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'林骁潜入仓库。屋顶进入、装卸区断电、或直接突入。避免不必要的伤亡可以降低复仇值。',
      textEn:'Lin Xiao infiltrates the warehouse using roof access, loading bay blackout, or direct entry. Avoiding unnecessary casualties lowers Revenge.',
      next:'s10_2'
    },
    s10_2: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'他找到了监控画面中受伤的何博士，他几乎失去意识。',
      textEn:'He finds an injured Dr. He from the CCTV footage, barely conscious.',
      next:'s10_3'
    },
    s10_3: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'},{char:'drhe',pose:'base',slot:'right'}],
      speaker:'何亮博士', speakerEn:'Dr. He',
      text:'渡鸦……你女儿问的问题比你曾经问的都好。',
      textEn:'Raven… your daughter asked better questions than you ever did.',
      next:'s10_4'
    },
    s10_4: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'她在哪？',
      textEn:'Where is she?',
      next:'s10_5'
    },
    s10_5: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'},{char:'drhe',pose:'base',slot:'right'}],
      speaker:'何亮博士', speakerEn:'Dr. He',
      text:'被转移了。他们知道你会找到这个地方。',
      textEn:'Moved. They knew you\'d find this place.',
      next:'s10_6'
    },
    s10_6: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'一名守卫提到"071号实验体"和"第二把钥匙"。林骁到达一间关押室——只找到林雨的外套，以及她在另一个设施的实时视频画面。',
      textEn:'A guard mentions "Subject 071" and "the second key." Lin Xiao reaches a holding room—only to find Lin Yu\'s jacket and a live video feed of her in another facility.',
      next:'s10_7'
    },
    s10_7: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'center'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'雨雨！',
      textEn:'Yu Yu!',
      next:'s10_8'
    },
    s10_8: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'林雨似乎听到了他，看向摄像头。画面中断。这是虚假的救援：玩家足够接近以为她在这里，却发现仓库只是诱饵。',
      textEn:'Lin Yu looks toward the camera as if she hears him. The feed cuts. This is the false rescue: the player gets close enough to believe she is here, then learns the warehouse was bait.',
      stats:{exposure:+10},
      next:'s11_1'
    },

    /* ---------- 场景11：审讯 ---------- */
    s11_1: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'kidnapper',pose:'base',slot:'right'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'林骁审讯一名被俘的物流官员，使用证据卡片而非简单的威胁计量。',
      textEn:'Lin Xiao interrogates a captured logistics officer using evidence cards instead of a simple threat meter.',
      next:'s11_2'
    },
    s11_2: {
      bg:'bunker',
      sprites:[{char:'kidnapper',pose:'base',slot:'right'}],
      speaker:'物流官员', speakerEn:'Logistics Officer',
      text:'我们没有选择那个女孩。我们被告知要活捉071号实验体。',
      textEn:'We didn\'t choose the girl. We were told to retrieve Subject 071 alive.',
      next:'s11_3'
    },
    s11_3: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'是赵维克多下的令？',
      textEn:'By Victor Zhao?',
      next:'s11_4'
    },
    s11_4: {
      bg:'bunker',
      sprites:[{char:'kidnapper',pose:'base',slot:'right'}],
      speaker:'物流官员', speakerEn:'Logistics Officer',
      text:'我从没听过这个名字。授权比洛伦更古老。',
      textEn:'I never heard that name. The authorization was older than Loren.',
      stats:{evidence:+15},
      next:'s12_1'
    },

    /* ---------- 场景12：死去的搭档 ---------- */
    s12_1: {
      bg:'safehouse', cg:'cg_guchen',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'guchen',pose:'base',slot:'right'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'一段加密无线电信号将林骁引到一间废弃拳击馆，顾晨正在那里等他。',
      textEn:'A coded radio signal leads Lin Xiao to an abandoned boxing gym, where Gu Chen is waiting.',
      next:'s12_2'
    },
    s12_2: {
      bg:'safehouse',
      sprites:[{char:'guchen',pose:'base',slot:'right'}],
      speaker:'顾晨', speakerEn:'Gu Chen',
      text:'你迟到了。',
      textEn:'You\'re late.',
      next:'s12_3'
    },
    s12_3: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'你死了。',
      textEn:'You\'re dead.',
      next:'s12_4'
    },
    s12_4: {
      bg:'safehouse',
      sprites:[{char:'guchen',pose:'base',slot:'right'}],
      speaker:'顾晨', speakerEn:'Gu Chen',
      text:'那个也是。',
      textEn:'That too.',
      next:'s12_5'
    },
    s12_5: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'guchen',pose:'fierce',slot:'right'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'我妻子死了。你消失了。现在我女儿也不见了。',
      textEn:'My wife died. You disappeared. Now my daughter is gone.',
      next:'s12_6'
    },
    s12_6: {
      bg:'safehouse',
      sprites:[{char:'guchen',pose:'fierce',slot:'right'}],
      speaker:'顾晨', speakerEn:'Gu Chen',
      text:'那沈终于找到了第二把钥匙。',
      textEn:'Then Shen finally found the second key.',
      next:'s12_7'
    },
    s12_7: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'沈已经退休了。',
      textEn:'Shen is retired.',
      next:'s12_8'
    },
    s12_8: {
      bg:'safehouse',
      sprites:[{char:'guchen',pose:'fierce',slot:'right'}],
      speaker:'顾晨', speakerEn:'Gu Chen',
      text:'那是他想让你相信的。归乡行动的目标是研究人员，不是恐怖分子。那个项目叫"镜"。',
      textEn:'That\'s what he wanted you to believe. Homecoming targeted researchers, not terrorists. The project was called Mirror.',
      stats:{evidence:+15, trust:+10},
      next:'s13_1'
    },

    /* ---------- 场景13：苏岚 ---------- */
    s13_1: {
      bg:'safehouse',
      sprites:[{char:'sulan',pose:'focused',slot:'left'},{char:'linxiao',pose:'base',slot:'center'},{char:'guchen',pose:'base',slot:'right'}],
      speaker:'苏岚', speakerEn:'Su Lan',
      text:'不。',
      textEn:'No.',
      next:'s13_2'
    },
    s13_2: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'base',slot:'center'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'我还没问呢。',
      textEn:'I haven\'t asked yet.',
      next:'s13_3'
    },
    s13_3: {
      bg:'safehouse',
      sprites:[{char:'sulan',pose:'focused',slot:'left'}],
      speaker:'苏岚', speakerEn:'Su Lan',
      text:'你把顾晨从死人堆里带回来，还带了把枪进我公寓。我猜得很有把握。',
      textEn:'You brought Gu Chen back from the dead and a gun into my apartment. I\'m comfortable guessing.',
      next:'s13_4'
    },
    s13_4: {
      bg:'safehouse',
      sprites:[{char:'guchen',pose:'base',slot:'right'}],
      speaker:'顾晨', speakerEn:'Gu Chen',
      text:'见到你也很高兴。',
      textEn:'Nice to see you too.',
      next:'s13_5'
    },
    s13_5: {
      bg:'safehouse',
      sprites:[{char:'sulan',pose:'focused',slot:'left'}],
      speaker:'苏岚', speakerEn:'Su Lan',
      text:'你只能讲一个复活笑话。刚才那个就是了。',
      textEn:'You get one resurrection joke. That was it.',
      stats:{trust:+10},
      next:'s14_1'
    },

    /* ---------- 场景14：入侵镜系统（小游戏2） ---------- */
    s14_1: {
      bg:'server', cg:'cg_hack',
      sprites:[{char:'sulan',pose:'focused',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'苏岚带领团队入侵镜系统网络。路由网络地图，隔离安全节点，解密可选档案。',
      textEn:'Su Lan leads the team to break into the Mirror network. Route through a network map, isolate security nodes, decrypt optional archives.',
      next:'s14_mg'
    },
    s14_mg: {
      type:'minigame2',
      nextSuccess:'s14_ok',
      nextFail:'s14_fail'
    },
    s14_ok: {
      bg:'server',
      sprites:[{char:'sulan',pose:'focused',slot:'center'},{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'核心发现不可避免：017号实验体——林骁——访问组件一。071号实验体——林雨——访问组件二。001号实验体——梅晨——状态：活跃。',
      textEn:'The core discovery is unavoidable: SUBJECT 017 — LIN XIAO — ACCESS COMPONENT ONE. SUBJECT 071 — LIN YU — ACCESS COMPONENT TWO. SUBJECT 001 — MEI CHEN — STATUS: ACTIVE.',
      stats:{evidence:+25},
      next:'s14_3'
    },
    s14_fail: {
      bg:'server',
      sprites:[{char:'sulan',pose:'focused',slot:'center'},{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'部分解密成功。017号和071号实验体的信息被获取，但001号实验体的档案被远程擦除。',
      textEn:'Partial decryption succeeded. Subjects 017 and 071 were retrieved, but Subject 001\'s file was remotely wiped.',
      stats:{evidence:+10, exposure:+15},
      next:'s14_3'
    },
    s14_3: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'她死了。',
      textEn:'She died.',
      next:'s14_4'
    },
    s14_4: {
      bg:'server',
      sprites:[{char:'sulan',pose:'focused',slot:'center'}],
      speaker:'苏岚', speakerEn:'Su Lan',
      text:'政府记录上，是的。但根据镜系统……她四十八小时前刚登录过。',
      textEn:'According to the government, yes. According to Mirror? She logged in forty-eight hours ago.',
      next:'s15_1'
    },

    /* ================================================================
       ACT III — THE PEOPLE BEHIND THE MIRROR
       ================================================================ */

    /* ---------- 场景15：071号实验体 ---------- */
    s15_1: {
      bg:'server', cg:'cg_linyu',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'视角切换到林雨，在一间研究设施内。',
      textEn:'Switch to Lin Yu inside a research facility.',
      next:'s15_2'
    },
    s15_2: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'守卫1', speakerEn:'Guard 1',
      text:'071号实验体醒了。',
      textEn:'Subject 071 is awake.',
      next:'s15_3'
    },
    s15_3: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'守卫2', speakerEn:'Guard 2',
      text:'沈说不要用镇静剂。渡鸦会来的。',
      textEn:'Shen said no sedation. He\'ll come. Raven, I mean.',
      next:'s15_4'
    },
    s15_4: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'守卫1', speakerEn:'Guard 1',
      text:'镜系统的预测呢？',
      textEn:'Mirror prediction?',
      next:'s15_5'
    },
    s15_5: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'守卫2', speakerEn:'Guard 2',
      text:'没有。他是她父亲。',
      textEn:'No. He\'s her father.',
      next:'s15_6'
    },
    s15_6: {
      bg:'server',
      sprites:[{char:'linyu',pose:'base',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'林雨无法制服守卫。她爬过维修管道，制造干扰，偷取钥匙卡并拍摄文件。终端显示她是"镜系统访问组件——活跃"。这一刻，林雨明白她不只是人质。',
      textEn:'Lin Yu cannot overpower guards. She crawls through maintenance shafts, creates distractions, steals a keycard and photographs files. A terminal identifies her as MIRROR ACCESS COMPONENT — ACTIVE. This is the moment Lin Yu understands she is not merely leverage.',
      next:'s16_1'
    },

    /* ---------- 场景16：M ---------- */
    s16_1: {
      bg:'server',
      sprites:[{char:'linyu',pose:'base',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'门开始远程打开。附近的监视器上出现消息。',
      textEn:'Doors begin opening remotely. Messages appear on nearby monitors.',
      next:'s16_2'
    },
    s16_2: {
      bg:'server',
      sprites:[{char:'linyu',pose:'base',slot:'center'}],
      speaker:'M', speakerEn:'M',
      text:'继续走。',
      textEn:'KEEP MOVING.',
      next:'s16_3'
    },
    s16_3: {
      bg:'server',
      sprites:[{char:'linyu',pose:'angry',slot:'center'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'你是谁？',
      textEn:'WHO ARE YOU?',
      next:'s16_4'
    },
    s16_4: {
      bg:'server',
      sprites:[{char:'linyu',pose:'angry',slot:'center'}],
      speaker:'M', speakerEn:'M',
      text:'一个欠你真相的人。',
      textEn:'SOMEONE WHO OWES YOU THE TRUTH.',
      next:'s16_5'
    },
    s16_5: {
      bg:'server',
      sprites:[{char:'linyu',pose:'base',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'林雨可以信任M的指引，或忽略方向走更艰难的路。信任影响梅之后的关系值。',
      textEn:'Lin Yu may trust M or ignore directions and take a harder route. Trust affects Mei\'s later relationship score.',
      choices:[
        { label:'信任M，跟随指引', labelEn:'Trust M, follow directions', stats:{trust:+15}, flag:{trustM:true}, next:'s16_6' },
        { label:'忽略M，自己找路', labelEn:'Ignore M, find your own way', stats:{revenge:+5, exposure:+5}, flag:{trustM:false}, next:'s16_6' }
      ]
    },
    s16_6: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'林雨发现一段损坏的录音，是十年前梅与沈的争论。',
      textEn:'Lin Yu finds a damaged recording of Mei arguing with Shen ten years ago.',
      next:'s16_7'
    },
    s16_7: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'梅（录音）', speakerEn:'Mei (recording)',
      text:'预测不是有罪。',
      textEn:'Prediction is not guilt.',
      next:'s16_8'
    },
    s16_8: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'left'},{char:'shen',pose:'base',slot:'right'}],
      speaker:'沈（录音）', speakerEn:'Shen (recording)',
      text:'不。预测是预防。',
      textEn:'No. Prediction is prevention.',
      next:'s16_9'
    },
    s16_9: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'梅（录音）', speakerEn:'Mei (recording)',
      text:'那么总有一天，你的系统会因为一个人从未做出的选择而惩罚他。',
      textEn:'Then one day your system will punish someone for a choice they never made.',
      next:'s17_1'
    },

    /* ---------- 场景17：证据板 I ---------- */
    s17_1: {
      bg:'safehouse',
      sprites:[{char:'sulan',pose:'focused',slot:'left'},{char:'linxiao',pose:'base',slot:'center'},{char:'guchen',pose:'base',slot:'right'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'回到苏岚的安全屋，连接人物、公司和事件。一个看似合理但不完整的推论指向赵维克多和洛伦集团。',
      textEn:'Back at Su Lan\'s safehouse, connect people, companies and events. A plausible but incomplete theory points to Victor Zhao and Loren Group.',
      next:'s17_2'
    },
    s17_2: {
      bg:'safehouse',
      sprites:[{char:'sulan',pose:'focused',slot:'left'}],
      speaker:'苏岚', speakerEn:'Su Lan',
      text:'完美的证据板还能识别何博士是前镜系统工程师，并揭示有人使用局长级凭证在覆写洛伦的命令。',
      textEn:'A perfect board also identifies Dr. He as a former Mirror engineer and reveals that someone with Director-level credentials has been overwriting Loren\'s commands.',
      stats:{evidence:+15},
      next:'s17_3'
    },
    s17_3: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'base',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'林骁可以立即追查维克多，或先调查局长级凭证。两条路线最终汇合，但第一条会制造更戏剧性的假反派对峙。',
      textEn:'Lin Xiao can pursue Victor immediately or investigate the Director credential first. Both routes converge, but the first creates a more dramatic false-villain confrontation.',
      choices:[
        { label:'立即追查赵维克多', labelEn:'Pursue Victor Zhao immediately', stats:{exposure:+10}, flag:{route:'victor'}, next:'s18_1' },
        { label:'先调查局长级凭证', labelEn:'Investigate the Director credential first', stats:{evidence:+10}, flag:{route:'director'}, next:'s18_1' }
      ]
    },

    /* ---------- 场景18：洛伦慈善晚宴 ---------- */
    s18_1: {
      bg:'hq', cg:'cg_gala',
      sprites:[{char:'linxiao',pose:'base',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'潜入洛伦慈善晚宴。三条路线：伪造邀请函/社交对话、保安伪装、或维修通道。',
      textEn:'Infiltrate a Loren charity gala. Three routes: forged invitation/social dialogue, security disguise, or maintenance route.',
      next:'s18_2'
    },
    s18_2: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'base',slot:'left'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'可选对话让赵凯更人性化。他承认欺负林雨部分是因为她拍到了与父亲有关的受限货物。如果林骁之前合法处理了校园事件，赵凯可以交出一张钥匙卡。',
      textEn:'Optional conversations humanize Zhao Kai. He admits he bullied Lin Yu partly because she photographed restricted deliveries linked to his father. If Lin Xiao handled the school incident lawfully, Zhao Kai can hand over a keycard.',
      next:'s18_3'
    },
    s18_3: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'base',slot:'left'},{char:'zhaokai',pose:'base',slot:'right'}],
      speaker:'赵凯', speakerEn:'Zhao Kai',
      text:'你以为我爸会告诉我什么？他几乎不看我，除非我让他丢脸。',
      textEn:'You think my father tells me anything? He barely looks at me unless I embarrass him.',
      next:'s18_4'
    },
    s18_4: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'zhaokai',pose:'base',slot:'right'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'你让我女儿丢脸了。',
      textEn:'You embarrassed my daughter.',
      next:'s18_5'
    },
    s18_5: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'},{char:'zhaokai',pose:'base',slot:'right'}],
      speaker:'赵凯', speakerEn:'Zhao Kai',
      text:'我知道。',
      textEn:'I know.',
      next:'s18_6'
    },
    s18_6: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'base',slot:'left'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'林骁可以帮助赵凯逃离他父亲的保安、无视他、或利用他作为诱饵。这影响证据、信任和复仇值。',
      textEn:'Lin Xiao can help Zhao Kai escape his father\'s security detail, ignore him, or use him as bait. This affects Evidence, Trust and Revenge.',
      choices:[
        { label:'帮助赵凯逃离', labelEn:'Help Zhao Kai escape', stats:{trust:+15, evidence:+10}, flag:{zhaokai:'help'}, next:'s19_1' },
        { label:'无视赵凯', labelEn:'Ignore Zhao Kai', stats:{}, flag:{zhaokai:'ignore'}, next:'s19_1' },
        { label:'利用赵凯作为诱饵', labelEn:'Use Zhao Kai as bait', stats:{revenge:+15, evidence:+5}, flag:{zhaokai:'bait'}, next:'s19_1' }
      ]
    },

    /* ---------- 场景19：错误的反派 ---------- */
    s19_1: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'victor',pose:'base',slot:'right'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'林骁在私人办公室堵住了赵维克多。',
      textEn:'Lin Xiao corners Victor Zhao in his private office.',
      next:'s19_2'
    },
    s19_2: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'victor',pose:'base',slot:'right'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'林雨在哪？',
      textEn:'Where is Lin Yu?',
      next:'s19_3'
    },
    s19_3: {
      bg:'hq',
      sprites:[{char:'victor',pose:'base',slot:'right'}],
      speaker:'赵维克多', speakerEn:'Victor Zhao',
      text:'不在我这里。',
      textEn:'Not with me.',
      next:'s19_4'
    },
    s19_4: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'victor',pose:'base',slot:'right'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'你的卡车。你的守卫。你的钱。',
      textEn:'Your trucks. Your guards. Your money.',
      next:'s19_5'
    },
    s19_5: {
      bg:'hq',
      sprites:[{char:'victor',pose:'base',slot:'right'}],
      speaker:'赵维克多', speakerEn:'Victor Zhao',
      text:'我的笼子。不是我的野兽。',
      textEn:'My cage. Not my animal.',
      next:'s19_6'
    },
    s19_6: {
      bg:'hq',
      sprites:[{char:'victor',pose:'base',slot:'right'}],
      speaker:'赵维克多', speakerEn:'Victor Zhao',
      text:'洛伦帮助工业化了镜系统，以为它会作为国家安全系统被出售。沈逐渐夺取了预测引擎和实验体数据库的控制权。',
      textEn:'Loren helped industrialize Mirror, believing it would be sold as a national-security system. Shen gradually took control of its prediction engine and subject database.',
      next:'s19_7'
    },
    s19_7: {
      bg:'hq',
      sprites:[{char:'victor',pose:'base',slot:'right'}],
      speaker:'赵维克多', speakerEn:'Victor Zhao',
      text:'我建了墙。沈决定了谁该在墙里。',
      textEn:'I built the walls. Shen decided who belonged inside them.',
      next:'s19_8'
    },
    s19_8: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'victor',pose:'base',slot:'right'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'为什么抓我女儿？',
      textEn:'Why take my daughter?',
      next:'s19_9'
    },
    s19_9: {
      bg:'hq',
      sprites:[{char:'victor',pose:'base',slot:'right'}],
      speaker:'赵维克多', speakerEn:'Victor Zhao',
      text:'因为梅确保没有任何人可以单独激活原始核心。她拆分了授权。在你和林雨之间。',
      textEn:'Because Mei made sure no single person could activate the original core. She split the authorization. Between you and Lin Yu.',
      stats:{evidence:+20},
      next:'s19_10'
    },
    s19_10: {
      bg:'hq',
      sprites:[{char:'victor',pose:'base',slot:'right'}],
      speaker:'赵维克多', speakerEn:'Victor Zhao',
      text:'我给你一个设施位置——不是出于善意，而是因为沈已经开始预测并清除洛伦的高管了。',
      textEn:'I\'ll give you a facility location—not from kindness, but because Shen has begun predicting and eliminating Loren executives too.',
      next:'s20_1'
    },

    /* ---------- 场景20：M的真面目 ---------- */
    s20_1: {
      bg:'server', cg:'cg_mei',
      sprites:[{char:'linyu',pose:'sad',slot:'left'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'林雨到达第四层，进入一间隐藏实验室。',
      textEn:'Lin Yu reaches Level 4 and enters a hidden laboratory.',
      next:'s20_2'
    },
    s20_2: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'妈？',
      textEn:'Mom?',
      next:'s20_3'
    },
    s20_3: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'梅晨', speakerEn:'Mei',
      text:'雨雨。',
      textEn:'Yu Yu.',
      next:'s20_4'
    },
    s20_4: {
      bg:'server',
      sprites:[{char:'linyu',pose:'angry',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'别这么叫我。',
      textEn:'Don\'t call me that.',
      next:'s20_5'
    },
    s20_5: {
      bg:'server',
      sprites:[{char:'linyu',pose:'angry',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'十个生日。十年来爸爸假装没事。每次我问起你，你都活着？',
      textEn:'Ten birthdays. Ten years of Dad pretending he was okay. Every time I asked about you, you were alive?',
      next:'s20_6'
    },
    s20_6: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'梅晨', speakerEn:'Mei',
      text:'如果我联系你，沈会找到你的。',
      textEn:'If I contacted you, Shen would have found you.',
      next:'s20_7'
    },
    s20_7: {
      bg:'server',
      sprites:[{char:'linyu',pose:'angry',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'他还是找到我了。',
      textEn:'He found me anyway.',
      next:'s20_8'
    },
    s20_8: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'梅晨', speakerEn:'Mei',
      text:'我知道。',
      textEn:'I know.',
      next:'s20_9'
    },
    s20_9: {
      bg:'server',
      sprites:[{char:'linyu',pose:'angry',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'不。你是现在才知道。',
      textEn:'No. You know now.',
      next:'s20_10'
    },
    s20_10: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'梅晨', speakerEn:'Mei',
      text:'我以"M"的身份留在网络里，破坏镜系统，从远处守护家人。',
      textEn:'I stayed inside the network as "M" to sabotage Mirror and watch over the family from a distance.',
      next:'s20_11'
    },
    s20_11: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'left'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'林雨拒绝立即原谅。',
      textEn:'Lin Yu refuses immediate forgiveness.',
      stats:{trust:+5},
      next:'s21_1'
    },

    /* ---------- 场景21：给家里的消息 ---------- */
    s21_1: {
      bg:'server',
      sprites:[{char:'linyu',pose:'base',slot:'left'},{char:'sulan',pose:'focused',slot:'right'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'梅可以打开一条短暂的加密通道。林雨必须决定给林骁发什么："我还活着"、设施坐标、或"妈妈还活着"。',
      textEn:'Mei can open one short encrypted channel. Lin Yu must decide what to send Lin Xiao: "I\'m alive", the facility coordinates, or "Mom is alive."',
      choices:[
        { label:'发送"我还活着"', labelEn:'Send "I\'m alive"', stats:{exposure:-5}, flag:{message:'alive'}, next:'s22_1' },
        { label:'发送设施坐标', labelEn:'Send the facility coordinates', stats:{evidence:+10}, flag:{message:'coords'}, next:'s22_1' },
        { label:'发送"妈妈还活着"', labelEn:'Send "Mom is alive"', stats:{trust:+15}, flag:{message:'mei'}, next:'s22_1' }
      ]
    },

    /* ---------- 场景22：顾晨的嫌疑 ---------- */
    s22_1: {
      bg:'safehouse',
      sprites:[{char:'sulan',pose:'focused',slot:'left'},{char:'linxiao',pose:'angry',slot:'center'},{char:'guchen',pose:'sad',slot:'right'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'苏岚发现归乡行动的爆破授权上有顾晨的生物特征确认。',
      textEn:'Su Lan discovers the Homecoming demolition authorization bears Gu Chen\'s biometric confirmation.',
      next:'s22_2'
    },
    s22_2: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'告诉我这是假的。',
      textEn:'Tell me it\'s fake.',
      next:'s22_3'
    },
    s22_3: {
      bg:'safehouse',
      sprites:[{char:'guchen',pose:'sad',slot:'right'}],
      speaker:'顾晨', speakerEn:'Gu Chen',
      text:'不是。',
      textEn:'It isn\'t.',
      next:'s22_4'
    },
    s22_4: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'是你触发的爆炸。',
      textEn:'You triggered the explosion.',
      next:'s22_5'
    },
    s22_5: {
      bg:'safehouse',
      sprites:[{char:'guchen',pose:'sad',slot:'right'}],
      speaker:'顾晨', speakerEn:'Gu Chen',
      text:'是的。你拒绝了命令。我没有。我花了十年才明白其中的区别。',
      textEn:'Yes. You refused the order. I didn\'t. I have spent ten years learning the difference.',
      next:'s22_6'
    },
    s22_6: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'梅当时在里面。',
      textEn:'Mei was inside.',
      next:'s22_7'
    },
    s22_7: {
      bg:'safehouse',
      sprites:[{char:'guchen',pose:'sad',slot:'right'}],
      speaker:'顾晨', speakerEn:'Gu Chen',
      text:'我知道。',
      textEn:'I know.',
      next:'s22_8'
    },
    s22_8: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'那你为什么还在这里？',
      textEn:'Then why are you still here?',
      next:'s22_9'
    },
    s22_9: {
      bg:'safehouse',
      sprites:[{char:'guchen',pose:'sad',slot:'right'}],
      speaker:'顾晨', speakerEn:'Gu Chen',
      text:'因为你女儿不应该为我做的事付出代价。',
      textEn:'Because your daughter shouldn\'t pay for what I did.',
      next:'s22_10'
    },
    s22_10: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'},{char:'guchen',pose:'sad',slot:'right'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'林骁必须决定如何对待顾晨。',
      textEn:'Lin Xiao must decide how to treat Gu Chen.',
      choices:[
        { label:'有条件地原谅他', labelEn:'Forgive him conditionally', stats:{trust:+20, evidence:+5}, flag:{guchen:'forgive'}, next:'s23_1' },
        { label:'拒绝他', labelEn:'Reject him', stats:{}, flag:{guchen:'reject'}, next:'s23_1' },
        { label:'攻击并抛弃他', labelEn:'Attack and abandon him', stats:{revenge:+25, trust:-15}, flag:{guchen:'attack'}, next:'s23_1' }
      ]
    },

    /* ================================================================
       ACT IV — BREAK THE PREDICTION
       ================================================================ */

    /* ---------- 场景23：回到归乡行动 ---------- */
    s23_1: {
      bg:'bunker',
      sprites:[{char:'sulan',pose:'focused',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'苏岚根据存档传感器数据重建了研究站。玩家控制年轻的林骁穿过一段碎片化的记忆。',
      textEn:'Su Lan reconstructs the station from archived sensor data. Player controls young Lin Xiao through a fragmented memory.',
      next:'s23_2'
    },
    s23_2: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'这一次，玩家看到了林骁错过的东西：梅给了何博士一份镜系统的伦理锁；沈的特工在渡鸦小队之前进入；顾晨在服从七号协议前犹豫了好几秒。',
      textEn:'This time the player sees what Lin Xiao missed: Mei gives Dr. He a copy of Mirror\'s ethical lock; Shen\'s agents enter before Raven Team; Gu Chen hesitates for several seconds before obeying Protocol Seven.',
      next:'s23_3'
    },
    s23_3: {
      bg:'bunker',
      sprites:[{char:'sulan',pose:'focused',slot:'center'}],
      speaker:'苏岚', speakerEn:'Su Lan',
      text:'他不只是掩盖了行动。他设计了你的悲伤。',
      textEn:'He didn\'t just cover up the operation. He designed your grief.',
      stats:{evidence:+20},
      next:'s23_4'
    },
    s23_4: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'林骁无言以对。',
      textEn:'Lin Xiao has no response.',
      next:'s24_1'
    },

    /* ---------- 场景24：救援之前 ---------- */
    s24_1: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'sad',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'林骁为林雨录了一段话，以防自己无法生还。',
      textEn:'Lin Xiao records a message for Lin Yu in case he does not survive.',
      next:'s24_2'
    },
    s24_2: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'sad',slot:'center'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'雨雨。有些事我早该告诉你。我以为沉默能保护你。也许它只是让你孤独。',
      textEn:'Yu Yu. There are things I should have told you. I thought silence kept you safe. Maybe it only kept you alone.',
      next:'s24_3'
    },
    s24_3: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'sad',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'玩家选择录音的结尾。',
      textEn:'The player chooses how he ends the recording.',
      choices:[
        { label:'"对不起。"', labelEn:'"I\'m sorry."', stats:{trust:+10}, flag:{recording:'sorry'}, next:'s25_1' },
        { label:'"我为你骄傲。"', labelEn:'"I\'m proud of you."', stats:{trust:+15}, flag:{recording:'proud'}, next:'s25_1' },
        { label:'"不要变成我。"', labelEn:'"Don\'t become me."', stats:{revenge:-10, trust:+5}, flag:{recording:'dont'}, next:'s25_1' }
      ]
    },

    /* ---------- 场景25：镜系统设施 ---------- */
    s25_1: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'最终潜入。路线受到整个游戏选择的影响：高证据揭示维修地图并绕过一个安全区；高暴露增加摄像头和武装守卫；高信任让顾晨或苏岚远程协助；高复仇导致守卫更少投降，因为渡鸦的暴力名声已经传开。',
      textEn:'Final infiltration with route consequences from the entire game. High Evidence reveals maintenance maps; High Exposure adds cameras and armored guards; High Trust lets Gu Chen or Su Lan assist remotely; High Revenge causes guards to surrender less often because Raven\'s violent reputation has spread.',
      next:'s25_2'
    },
    s25_2: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'shen',pose:'base',slot:'right'}],
      speaker:'沈局长（广播）', speakerEn:'Shen (PA)',
      text:'仓库里的三个守卫。有一个求饶了。你还记得自己选了什么。',
      textEn:'Three guards in the warehouse. One begged. You remember what you chose.',
      next:'s25_3'
    },
    s25_3: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'沈通过广播提及玩家过去的具体行为，让终局感觉是对玩家的回应而非通用脚本。',
      textEn:'Shen addresses specific past actions over the PA, making the finale feel reactive rather than generic.',
      next:'s26_1'
    },

    /* ---------- 场景26：家人 ---------- */
    s26_1: {
      bg:'server', cg:'cg_family2',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'},{char:'linyu',pose:'base',slot:'right'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'林骁找到了林雨，然后看到梅还活着。',
      textEn:'Lin Xiao reaches Lin Yu and sees Mei alive.',
      next:'s26_2'
    },
    s26_2: {
      bg:'server',
      sprites:[{char:'linyu',pose:'happy',slot:'right'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'爸！',
      textEn:'Dad!',
      next:'s26_3'
    },
    s26_3: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'你受伤了吗？',
      textEn:'Are you hurt?',
      next:'s26_4'
    },
    s26_4: {
      bg:'server',
      sprites:[{char:'linyu',pose:'base',slot:'right'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'我没事。',
      textEn:'I\'m okay.',
      next:'s26_5'
    },
    s26_5: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'我看着他们埋葬了你。',
      textEn:'I watched them bury you.',
      next:'s26_6'
    },
    s26_6: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'梅晨', speakerEn:'Mei',
      text:'我知道。',
      textEn:'I know.',
      next:'s26_7'
    },
    s26_7: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'我告诉我们的女儿你死了十年。',
      textEn:'I told our daughter you were dead for ten years.',
      next:'s26_8'
    },
    s26_8: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'梅晨', speakerEn:'Mei',
      text:'如果我回家，沈会找到你们所有人。',
      textEn:'If I came home, Shen would have found all of you.',
      next:'s26_9'
    },
    s26_9: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'所以你替我们决定了。',
      textEn:'So you decided for us.',
      next:'s26_10'
    },
    s26_10: {
      bg:'server',
      sprites:[{char:'linyu',pose:'angry',slot:'right'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'住手。',
      textEn:'Stop.',
      next:'s26_11'
    },
    s26_11: {
      bg:'server',
      sprites:[{char:'linyu',pose:'angry',slot:'right'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'你们两个一直在决定我能知道什么。我不是任务。不是证据。不是镜系统的实验体。我是你们的女儿。',
      textEn:'Both of you keep deciding what I\'m allowed to know. I\'m not a mission. I\'m not evidence. I\'m not one of Mirror\'s subjects. I\'m your daughter.',
      next:'s26_12'
    },
    s26_12: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'你说得对。',
      textEn:'You\'re right.',
      next:'s26_13'
    },
    s26_13: {
      bg:'server',
      sprites:[{char:'linyu',pose:'base',slot:'right'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'我知道。',
      textEn:'I know.',
      next:'s26_14'
    },
    s26_14: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'happy',slot:'left'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'短暂的一刻，林骁笑了。然后警报响起。',
      textEn:'For one brief moment, Lin Xiao laughs. Then alarms begin.',
      next:'s27_1'
    },

    /* ---------- 场景27：镜系统激活 ---------- */
    s27_1: {
      bg:'server',
      sprites:[{char:'shen',pose:'base',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'设施中的每个屏幕都激活了。沈出现了。',
      textEn:'Every screen in the facility activates. Shen appears.',
      next:'s27_2'
    },
    s27_2: {
      bg:'server',
      sprites:[{char:'shen',pose:'base',slot:'center'}],
      speaker:'沈局长', speakerEn:'Shen',
      text:'他来了。渡鸦。',
      textEn:'There he is. Raven.',
      next:'s27_3'
    },
    s27_3: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'shen',pose:'base',slot:'right'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'那个人十年前就死了。',
      textEn:'That man died ten years ago.',
      next:'s27_4'
    },
    s27_4: {
      bg:'server',
      sprites:[{char:'shen',pose:'base',slot:'right'}],
      speaker:'沈局长', speakerEn:'Shen',
      text:'是吗？',
      textEn:'Did he?',
      next:'s27_5'
    },
    s27_5: {
      bg:'server',
      sprites:[{char:'shen',pose:'base',slot:'center'}],
      speaker:'沈局长', speakerEn:'Shen',
      text:'屏幕回放着玩家的真实行为：仁慈、威胁、潜行、处决、救援、背叛。',
      textEn:'The screens replay actual player behavior: mercy, threats, stealth, executions, rescues, betrayals.',
      next:'s27_6'
    },
    s27_6: {
      bg:'server',
      sprites:[{char:'shen',pose:'base',slot:'right'}],
      speaker:'沈局长', speakerEn:'Shen',
      text:'你花了十年假装普通人。然后我碰了一个你爱的人，面具就消失了。',
      textEn:'You spent ten years pretending to be ordinary. Then I touched one person you loved and the mask disappeared.',
      next:'s27_7'
    },
    s27_7: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'shen',pose:'base',slot:'right'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'镜系统没有预测到这个。任何父亲都会来。',
      textEn:'Mirror didn\'t predict that. Any father would come.',
      next:'s27_8'
    },
    s27_8: {
      bg:'server',
      sprites:[{char:'shen',pose:'base',slot:'right'}],
      speaker:'沈局长', speakerEn:'Shen',
      text:'不是像你这样。',
      textEn:'Not like you.',
      next:'s27_9'
    },
    s27_9: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'shen',pose:'base',slot:'right'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'那你为什么还在说话？',
      textEn:'Then why are you still talking?',
      next:'s27_10'
    },
    s27_10: {
      bg:'server',
      sprites:[{char:'shen',pose:'base',slot:'right'}],
      speaker:'沈局长', speakerEn:'Shen',
      text:'什么？',
      textEn:'What?',
      next:'s27_11'
    },
    s27_11: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'shen',pose:'base',slot:'right'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'如果你已经知道我要做什么，为什么还没阻止我？',
      textEn:'If you already know what I\'m going to do, why haven\'t you stopped me?',
      next:'s27_12'
    },
    s27_12: {
      bg:'server',
      sprites:[{char:'linyu',pose:'base',slot:'right'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'他害怕了。',
      textEn:'He\'s afraid.',
      next:'s27_13'
    },
    s27_13: {
      bg:'server',
      sprites:[{char:'shen',pose:'base',slot:'right'}],
      speaker:'沈局长', speakerEn:'Shen',
      text:'怕什么？',
      textEn:'Of what?',
      next:'s27_14'
    },
    s27_14: {
      bg:'server',
      sprites:[{char:'linyu',pose:'base',slot:'right'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'怕犯错。',
      textEn:'Being wrong.',
      next:'s28_1'
    },

    /* ---------- 场景28：镜系统预测 ---------- */
    s28_1: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'镜系统适应玩家的主导习惯。潜行型玩家发现常用藏身处被扫描；战斗型玩家面对盾牌和交叉火力；黑客型玩家遇到假终端和有毒捷径。玩家必须刻意交替移动、干扰、战斗、黑客和撤退。',
      textEn:'Mirror adapts to the player\'s dominant habits. Stealth-heavy players find favorite hiding spaces scanned; combat-heavy players face shields and crossfire; hacking-heavy players encounter fake terminals. Players must deliberately alternate movement, distraction, combat, hacking and retreat.',
      next:'s28_2'
    },
    s28_2: {
      bg:'server',
      sprites:[{char:'linyu',pose:'base',slot:'right'}],
      speaker:'林雨（无线电）', speakerEn:'Lin Yu (radio)',
      text:'别再做你平时做的事。',
      textEn:'Stop doing what you normally do.',
      next:'s28_3'
    },
    s28_3: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'你在叫我做错误的决定？',
      textEn:'You\'re telling me to make bad decisions?',
      next:'s28_4'
    },
    s28_4: {
      bg:'server',
      sprites:[{char:'linyu',pose:'base',slot:'right'}],
      speaker:'林雨（无线电）', speakerEn:'Lin Yu (radio)',
      text:'这辈子就这一次，是的。',
      textEn:'For once in your life, yes.',
      stats:{evidence:+10},
      next:'s29_1'
    },

    /* ---------- 场景29：完成真相 ---------- */
    s29_1: {
      bg:'safehouse',
      sprites:[{char:'sulan',pose:'focused',slot:'left'},{char:'linxiao',pose:'base',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'进入核心之前，重建整个阴谋。',
      textEn:'Reconstruct the entire conspiracy before entering the core.',
      next:'s29_2'
    },
    s29_2: {
      bg:'safehouse',
      sprites:[{char:'sulan',pose:'focused',slot:'left'}],
      speaker:'苏岚', speakerEn:'Su Lan',
      text:'梅 → 为镜系统创建伦理锁。沈 → 秘密夺取预测引擎。归乡行动 → 消灭研究人员的掩盖。顾晨 → 服从爆破命令。林骁 → 不知情地携带密钥一。林雨 → 继承密钥二。何博士 → 联系林雨揭露真相。洛伦 → 建造基础设施但失去控制权。沈 → 策划绑架以重聚两把钥匙。',
      textEn:'Mei → created the ethical lock. Shen → secretly seized the prediction engine. Homecoming → the cover-up to eliminate researchers. Gu Chen → obeyed the demolition order. Lin Xiao → unknowingly carried Key One. Lin Yu → inherited Key Two. Dr. He → contacted Lin Yu to expose the truth. Loren → built infrastructure but lost control. Shen → engineered the kidnapping to reunite both keys.',
      stats:{evidence:+15},
      next:'s30_1'
    },

    /* ---------- 场景30：最后的命令 ---------- */
    s30_1: {
      bg:'bunker', cg:'cg_final',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'shen',pose:'base',slot:'right'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'林骁进入镜系统核心。沈没有带军队，独自等待。',
      textEn:'Lin Xiao enters the Mirror Core. Shen waits without an army.',
      next:'s30_2'
    },
    s30_2: {
      bg:'bunker',
      sprites:[{char:'shen',pose:'base',slot:'right'}],
      speaker:'沈局长', speakerEn:'Shen',
      text:'你还记得第一次任务吗？',
      textEn:'Do you remember your first mission?',
      next:'s30_3'
    },
    s30_3: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'},{char:'shen',pose:'base',slot:'right'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'我十九岁。',
      textEn:'I was nineteen.',
      next:'s30_4'
    },
    s30_4: {
      bg:'bunker',
      sprites:[{char:'shen',pose:'base',slot:'right'}],
      speaker:'沈局长', speakerEn:'Shen',
      text:'你扣不下扳机。我教了你。',
      textEn:'You couldn\'t pull the trigger. I taught you how.',
      next:'s30_5'
    },
    s30_5: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'shen',pose:'base',slot:'right'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'你教我服从。',
      textEn:'You taught me to obey.',
      next:'s30_6'
    },
    s30_6: {
      bg:'bunker',
      sprites:[{char:'shen',pose:'base',slot:'right'}],
      speaker:'沈局长', speakerEn:'Shen',
      text:'而你变得非凡。',
      textEn:'And you became extraordinary.',
      next:'s30_7'
    },
    s30_7: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'shen',pose:'base',slot:'right'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'不。你让服从感觉像勇气。我花了好几年才明白区别。',
      textEn:'No. You made obedience feel like courage. It took me years to learn the difference.',
      next:'s30_8'
    },
    s30_8: {
      bg:'bunker',
      sprites:[{char:'shen',pose:'base',slot:'right'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'沈把武器放在桌上。',
      textEn:'Shen places his weapon on the table.',
      next:'s30_9'
    },
    s30_9: {
      bg:'bunker',
      sprites:[{char:'shen',pose:'base',slot:'right'}],
      speaker:'沈局长', speakerEn:'Shen',
      text:'那就证明你变了。',
      textEn:'Then prove you\'ve changed.',
      next:'s30_final'
    },
    s30_final: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'shen',pose:'base',slot:'right'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'最终决定。你的选择将结合累积的证据、信任、暴露和复仇值，决定结局。',
      textEn:'Final decision. Your choice, filtered through accumulated Evidence, Trust, Exposure and Revenge, determines the ending.',
      choices:[
        { label:'逮捕沈局长', labelEn:'Arrest Shen', flag:{final:'arrest'}, stats:{evidence:+10}, next:'ending_check' },
        { label:'杀死沈局长', labelEn:'Kill Shen', flag:{final:'kill'}, stats:{revenge:+20}, next:'ending_check' },
        { label:'摧毁镜系统', labelEn:'Destroy Mirror', flag:{final:'destroy'}, stats:{}, next:'ending_check' },
        { label:'公开镜系统数据库', labelEn:'Release Mirror database', flag:{final:'release'}, stats:{exposure:+20}, next:'ending_check' },
        { label:'接管镜系统', labelEn:'Take control of Mirror', flag:{final:'control'}, stats:{revenge:+10, trust:-15}, next:'ending_check' },
        { label:'改写镜系统（秘密）', labelEn:'Rewrite Mirror (secret)', flag:{final:'rewrite'}, stats:{trust:+10}, next:'ending_check' }
      ]
    },
    ending_check: {
      type:'endingCheck'
    },

    /* ================================================================
       ENDINGS
       ================================================================ */

    end_justice: {
      type:'ending', bg:'school', cg:'cg_justice',
      title:'真实正义', titleEn:'TRUE JUSTICE', titleTag:'ENDING 1',
      achievements:['ach_truth'],
      text:'沈局长被逮捕。顾晨自愿认罪并作证。梅的文件证明归乡行动是一场掩盖。数月后，林骁在林雨的学校外等她。\n\n"你来得早。"\n"你迟到了。"\n"三十秒。"\n"我注意到了。"',
      textEn:'Shen is arrested. Gu Chen voluntarily confesses and testifies. Mei\'s files prove Homecoming was a cover-up. Months later, Lin Xiao waits outside Lin Yu\'s school.\n\n"You\'re early."\n"You\'re late."\n"Thirty seconds."\n"I noticed."'
    },
    end_vengeance: {
      type:'ending', bg:'bunker', cg:'cg_vengeance',
      title:'复仇', titleEn:'VENGEANCE', titleTag:'ENDING 2',
      achievements:['ach_vengeance'],
      text:'林骁在威胁已经结束后射杀了沈。林雨及时赶到，看到了后果。警笛声接近。\n\n"结束了。"\n"是吗？"\n"我为你做的。"\n"不。你是因为想做才做的。"',
      textEn:'Lin Xiao shoots Shen after the threat is already over. Lin Yu arrives in time to see the aftermath. Police sirens approach.\n\n"It\'s over."\n"Is it?"\n"I did it for you."\n"No. You did it because you wanted to."'
    },
    end_watcher: {
      type:'ending', bg:'server',
      title:'守望者', titleEn:'THE WATCHER', titleTag:'ENDING 3',
      text:'数月后，林骁秘密审查未来威胁预测。林雨走进来，他藏起了屏幕。\n\n"你摧毁了它，对吗？"\n"是的。"',
      textEn:'Months later, Lin Xiao secretly reviews future-threat predictions. Lin Yu enters; he hides the screen.\n\n"You destroyed it, right?"\n"Yes."'
    },
    end_ghost: {
      type:'ending', bg:'bunker',
      title:'幽灵之家', titleEn:'GHOST FAMILY', titleTag:'ENDING 4',
      text:'镜系统被摧毁，家庭信任度高，但暴露值过高或证据不足。林骁、梅和林雨以新身份离开临海。在火车站，他们等待开往新城市的列车。\n\n"新城市。"\n"新名字。"\n"新生活。"\n"还是那个不正常的家庭？"\n"很遗憾，是的。"',
      textEn:'Mirror destroyed, family trust high, but Exposure too high or evidence insufficient. Lin Xiao, Mei and Lin Yu leave Linhai under new identities. At a railway station they wait for a train to a new city.\n\n"New city."\n"New names."\n"New life."\n"Same dysfunctional family?"\n"Unfortunately."'
    },
    end_alone: {
      type:'ending', bg:'home',
      title:'孤独', titleEn:'ALONE', titleTag:'ENDING 5',
      text:'林雨活了下来，但复仇值极端且家庭信任度低。林骁告诉林雨他们终于可以回家了。她没有动。\n\n"你救了我的命。但我已经不认识你了。"\n"我是你父亲。"\n"那我希望你能重新找到他。"',
      textEn:'Lin Yu survives, but Revenge is extreme and family Trust is low. Lin Xiao tells Lin Yu they can finally go home. She does not move.\n\n"You saved my life. But I don\'t know who you are anymore."\n"I\'m your father."\n"Then I hope you find him again."'
    },
    end_chaos: {
      type:'ending', bg:'hq',
      title:'混沌', titleEn:'CHAOS', titleTag:'ENDING 6',
      text:'镜系统的原始数据库被公开。沈的罪行立即公之于众。数百万条私人记录、预测和秘密也同样公开。真相赢了，但隐私崩溃，动荡蔓延。\n\n"我们曝光了他。"\n"我们曝光了所有人。"',
      textEn:'The entire raw Mirror database is released. Shen\'s crimes become public immediately. So do millions of private records, predictions and secrets. The truth wins, but privacy collapses and unrest spreads.\n\n"We exposed him."\n"We exposed everyone."'
    },
    end_hidden: {
      type:'ending', bg:'bunker',
      title:'隐秘之刃', titleEn:'THE HIDDEN BLADE', titleTag:'ENDING 7',
      text:'镜系统被摧毁，但公开证据不足。沈被击败，林雨安全，但林骁被指责为袭击者。数月后，一名幸存的腐败镜系统官员进入他的公寓。灯灭了。\n\n"沈走了。但你还在。"',
      textEn:'Mirror destroyed with insufficient public evidence. Shen is defeated, Lin Yu is safe, but Lin Xiao is blamed for the attack. Months later a surviving corrupt Mirror official enters his apartment. The lights go out.\n\n"Shen is gone. But you\'re still here."'
    },
    end_secret: {
      type:'ending', bg:'home', cg:'cg_secret',
      title:'打破镜子', titleEn:'BREAK THE MIRROR', titleTag:'SECRET ENDING',
      achievements:['ach_secret'],
      text:'苏岚和梅改写了核心：平民监控被删除，经核实的犯罪证据被保留。沈被逮捕。顾晨作证。林骁被洗清。梅回到了家庭。\n\n数月后，林骁又把早餐烤焦了。\n\n"经历了这一切，你做饭还是这个水平？"\n"那是什么？"\n"早餐。"\n"他总是这么说。"',
      textEn:'Su Lan and Mei rewrite the core: civilian surveillance is deleted while verified criminal evidence is preserved. Shen is arrested. Gu Chen testifies. Lin Xiao is cleared. Mei returns to the family.\n\nMonths later, Lin Xiao burns breakfast again.\n\n"After everything we survived, this is still how you cook?"\n"What is that?"\n"Breakfast."\n"That\'s what he always says."'
    }
  }
};
