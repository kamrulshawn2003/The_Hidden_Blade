/* ===== The Hidden Blade · 隐秘之刃 — 剧情脚本 v6.0 (EN/ZH 双语) ===== */
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
    shen:      { base:'assets/sprites/shen_base.png' },
    mei:       { base:'assets/sprites/mei_base.png' }
  },

  /* 角色图鉴 */
  characters: [
    { id:'linxiao',   name:'林骁', nameEn:'Lin Xiao / Raven', role:'退役特工 / 主角', roleEn:'Retired Agent / Protagonist',
      desc:'多年前，他是沈局长手下的精英特工，代号"渡鸦"。如今，他只是一个想保护女儿的父亲。',
      descEn:'Years ago, an elite agent under Director Shen, codename "Raven." Now, just a father trying to protect his daughter.' },
    { id:'linyu',     name:'林雨', nameEn:'Lin Yu', role:'林骁之女', roleEn:"Lin Xiao's Daughter",
      desc:'十六岁，敏锐而倔强。无意中发现父亲的秘密U盘，成为整件事的导火索。',
      descEn:'Sixteen, sharp and stubborn. Her accidental discovery of her father\'s USB drive sets everything in motion.' },
    { id:'guchen',    name:'顾晨', nameEn:'Gu Chen', role:'旧队友 / 执行者', roleEn:'Old Teammate / Enforcer',
      desc:'林骁昔日的搭档。在归乡行动中，他遵从沈的直接命令执行了七号协议。',
      descEn:"Lin Xiao's former partner. During Operation Homecoming, he carried out Protocol Seven on Shen's direct orders." },
    { id:'sulan',     name:'苏岚', nameEn:'Su Lan', role:'旧队友 / 情报专家', roleEn:'Old Teammate / Intelligence Expert',
      desc:'前情报分析师与系统专家。从不轻易信任任何人，却是团队中最可靠的技术之声。',
      descEn:'Former intelligence analyst and systems specialist. Trusts no one easily, yet is the team\'s most reliable technical voice.' },
    { id:'shen',      name:'沈局长', nameEn:'Director Shen', role:'最终反派 / 前指挥官', roleEn:'Final Antagonist / Former Commander',
      desc:'林骁的前指挥官。用金钱与威胁腐蚀警方，策划绑架林雨，只为引渡鸦现身。',
      descEn:"Lin Xiao's former commander. He corrupted the police with money and threats, and engineered Lin Yu's kidnapping to lure Raven out." },
    { id:'mei',       name:'梅晨', nameEn:'Mei', role:'林骁之妻 / 工程师', roleEn:"Lin Xiao's Wife / Engineer",
      desc:'林骁的妻子，一位与机密项目有关的工程师。归乡行动中，她在那场爆炸里丧生。',
      descEn:'Lin Xiao\'s wife, an engineer tied to a classified project. She died in the explosion during Operation Homecoming.' }
  ],

  /* Tips 词条 */
  tips: [
    { id:'tip_homecoming', title:'归乡行动', titleEn:'Operation Homecoming',
      text:'多年前的一次秘密行动，目标是"被渗透的研究实验室"。一场爆炸掩埋了真相。官方记录：实验室事故。',
      textEn:'A covert operation years ago targeting a "compromised research laboratory." An explosion buried the truth. Official record: lab accident.',
      unlock:'s1_14' },
    { id:'tip_raven', title:'渡鸦', titleEn:'RAVEN',
      text:'林骁特工时期的代号。U盘中的系统启动序列显示"欢迎回来，渡鸦"。',
      textEn:"Lin Xiao's codename during his operative years. The USB drive's boot sequence reads 'WELCOME BACK, RAVEN.'",
      unlock:'s2_8' },
    { id:'tip_signal', title:'意外信号', titleEn:'The Unintended Signal',
      text:'林雨发现父亲的U盘后，远程连接警报激活了摄像头，将她的存在暴露给了沈的监控网络。',
      textEn:'After Lin Yu finds her father\'s USB drive, a remote-connection alert activates the webcam, exposing her existence to Shen\'s surveillance network.',
      unlock:'s2_10' },
    { id:'tip_corruption', title:'腐败之网', titleEn:'Web of Corruption',
      text:'当地警方早已被沈的网络渗透。报警，等于自投罗网。',
      textEn:'The local police were long ago infiltrated by Shen\'s network. Reporting to them is walking into a trap.',
      unlock:'s3_police4' },
    { id:'tip_mastermind', title:'幕后主谋', titleEn:'The Mastermind',
      text:'所有线索都指向沈局长。他策划了绑架，只为引渡鸦现身。',
      textEn:'Every lead points to Director Shen. He engineered the kidnapping for one reason: to lure Raven out.',
      unlock:'s5_ok' },
    { id:'tip_justice', title:'真实正义', titleEn:'True Justice',
      text:'国际安全机构绕过了被腐蚀的当地警方，直接将沈绳之以法。',
      textEn:'The international security agency bypassed the corrupted local police and brought Shen to justice directly.',
      unlock:'end_justice' }
  ],

  /* 场景 CG */
  cgs: [
    { id:'cg_homecoming', title:'CG 01 · 归乡行动', titleEn:'CG 01 · Operation Homecoming', bg:'bunker', unlock:'s1_1' },
    { id:'cg_family', title:'CG 02 · 平静生活', titleEn:'CG 02 · A Quiet Life', bg:'home', unlock:'s2_1' },
    { id:'cg_usb', title:'CG 03 · U盘中的秘密', titleEn:'CG 03 · The USB Secret', bg:'home', unlock:'s2_4' },
    { id:'cg_signal', title:'CG 04 · 意外信号', titleEn:'CG 04 · The Unintended Signal', bg:'home', unlock:'s2_10' },
    { id:'cg_team', title:'CG 05 · 重聚', titleEn:'CG 05 · The Reunion', bg:'safehouse', unlock:'s4_1' },
    { id:'cg_breach', title:'CG 06 · 系统入侵', titleEn:'CG 06 · System Breach', bg:'server', unlock:'s4_ok' },
    { id:'cg_warehouse', title:'CG 07 · 仓库潜入', titleEn:'CG 07 · Warehouse Infiltration', bg:'bunker', unlock:'s5_1' },
    { id:'cg_intel', title:'CG 08 · 关键情报', titleEn:'CG 08 · Critical Intel', bg:'bunker', unlock:'s5_ok' },
    { id:'cg_rescue', title:'CG 09 · 营救', titleEn:'CG 09 · The Rescue', bg:'server', unlock:'s6_1' },
    { id:'cg_final', title:'CG 10 · 最终对决', titleEn:'CG 10 · The Final Duel', bg:'bunker', unlock:'s6_mg' },
    { id:'cg_corruption', title:'CG 11 · 腐败之网', titleEn:'CG 11 · Web of Corruption', bg:'hq', unlock:'end_corruption' },
    { id:'cg_sacrifice', title:'CG 12 · 父亲的牺牲', titleEn:'CG 12 · A Father\'s Sacrifice', bg:'bunker', unlock:'end_sacrifice' },
    { id:'cg_justice', title:'CG 13 · 真实正义', titleEn:'CG 13 · True Justice', bg:'school', unlock:'end_justice' }
  ],

  /* ===== 剧情节点 ===== */
  nodes: {

    /* ================================================================
       场景 1：归乡行动（多年前）
       ================================================================ */
    s1_1: {
      chapter:'chapter.c1', bg:'bunker', cg:'cg_homecoming',
      sprites:[],
      speaker:'旁白', speakerEn:'Narrator',
      text:'多年前。临海市郊。一间被渗透的研究实验室。',
      textEn:'Years ago. On the outskirts of Linhai. A research laboratory that had been compromised.',
      next:'s1_2'
    },
    s1_2: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'base',slot:'left'},{char:'guchen',pose:'base',slot:'right'},{char:'shen',pose:'base',slot:'center'}],
      speaker:'沈局长（无线电）', speakerEn:'Shen (radio)',
      text:'渡鸦小队，出发前最后确认。目标：取回实验室内的机密项目。任何威胁——清除。',
      textEn:'Raven Team, final confirmation before launch. Objective: retrieve the classified project inside the lab. Eliminate any threat.',
      next:'s1_3'
    },
    s1_3: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'base',slot:'left'},{char:'guchen',pose:'base',slot:'right'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'苏岚，撤离路线准备好了吗？',
      textEn:'Su Lan, are the extraction routes ready?',
      next:'s1_4'
    },
    s1_4: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'base',slot:'left'},{char:'sulan',pose:'focused',slot:'center'},{char:'guchen',pose:'base',slot:'right'}],
      speaker:'苏岚（无线电）', speakerEn:'Su Lan (radio)',
      text:'通道干净。但我检测到实验室内有非军方信号。小心。',
      textEn:'Routes clear. But I\'m reading non-military signals inside the lab. Be careful.',
      next:'s1_5'
    },
    s1_5: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'base',slot:'left'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'实验室内部。一名女性研究员向林骁伸出手——不是武器。',
      textEn:'Inside the laboratory. A female researcher reaches out to Lin Xiao — not for a weapon.',
      next:'s1_6'
    },
    s1_6: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'base',slot:'left'}],
      speaker:'研究员', speakerEn:'Researcher',
      text:'别让他拿到……那个项目。它不该被任何人掌控。',
      textEn:'Don\'t let him take… the project. It should never be controlled by anyone.',
      next:'s1_7'
    },
    s1_7: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'guchen',pose:'fierce',slot:'right'},{char:'shen',pose:'base',slot:'center'}],
      speaker:'沈局长（无线电）', speakerEn:'Shen (radio)',
      text:'七号协议。执行。',
      textEn:'Protocol Seven. Execute.',
      next:'s1_8'
    },
    s1_8: {
      bg:'bunker',
      sprites:[{char:'guchen',pose:'fierce',slot:'right'}],
      speaker:'顾晨', speakerEn:'Gu Chen',
      text:'她不是武装人员。',
      textEn:'She\'s unarmed.',
      next:'s1_9'
    },
    s1_9: {
      bg:'bunker',
      sprites:[{char:'guchen',pose:'fierce',slot:'right'},{char:'shen',pose:'base',slot:'center'}],
      speaker:'沈局长（无线电）', speakerEn:'Shen (radio)',
      text:'这是命令。',
      textEn:'That is an order.',
      next:'s1_10'
    },
    s1_10: {
      bg:'bunker',
      sprites:[{char:'guchen',pose:'fierce',slot:'right'},{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'枪声。研究员倒地。林骁看着顾晨垂下手臂——然后，在混乱中，他看到了她。',
      textEn:'Gunfire. The researcher falls. Lin Xiao watches Gu Chen lower his arm — then, in the chaos, he sees her.',
      next:'s1_11'
    },
    s1_11: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'梅……？',
      textEn:'Mei…?',
      next:'s1_12'
    },
    s1_12: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'他的妻子——一位他从未知道与这个项目有关的工程师——就在设施里。',
      textEn:'His wife — an engineer he never knew was tied to this project — is inside the facility.',
      next:'s1_13'
    },
    s1_13: {
      bg:'bunker',
      sprites:[{char:'mei',pose:'base',slot:'right'}],
      speaker:'梅晨', speakerEn:'Mei',
      text:'林骁，离开这里。沈要的比你想的多。',
      textEn:'Lin Xiao, get out. Shen wants more than you think.',
      next:'s1_14'
    },
    s1_14: {
      bg:'bunker',
      sprites:[],
      speaker:'旁白', speakerEn:'Narrator',
      text:'爆炸吞没了整个实验室。火光中，一切被掩埋。林骁醒来时，只记得黑羽标记与一声呼喊。官方结论：实验室事故。他的妻子——丧生。',
      textEn:'An explosion consumes the laboratory. In the firelight, everything is buried. Lin Xiao wakes remembering only the black-feather mark and a single cry. Official conclusion: a lab accident. His wife — dead.',
      next:'s2_1'
    },

    /* ================================================================
       场景 2：意外信号（当下）
       ================================================================ */
    s2_1: {
      chapter:'chapter.c2', bg:'home', cg:'cg_family',
      sprites:[{char:'linxiao',pose:'happy',slot:'left'},{char:'linyu',pose:'base',slot:'right'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'如今。林骁过着一个安静的生活，独自抚养女儿林雨。',
      textEn:'Present day. Lin Xiao lives a quiet life, raising his daughter Lin Yu alone.',
      next:'s2_2'
    },
    s2_2: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'happy',slot:'left'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'早上好，雨雨。',
      textEn:'Morning, Yu Yu.',
      next:'s2_3'
    },
    s2_3: {
      bg:'home',
      sprites:[{char:'linyu',pose:'base',slot:'right'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'爸，我上学了。晚上见。',
      textEn:'Dad, I\'m off to school. See you tonight.',
      next:'s2_4'
    },
    s2_4: {
      bg:'home', cg:'cg_usb',
      sprites:[{char:'linyu',pose:'base',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'放学后，林雨在整理父亲的书架时，意外发现了一个藏在夹层里的U盘。',
      textEn:'After school, while tidying her father\'s bookshelf, Lin Yu accidentally uncovers a USB drive hidden in a secret compartment.',
      next:'s2_5'
    },
    s2_5: {
      bg:'home',
      sprites:[{char:'linyu',pose:'base',slot:'center'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'这是什么……爸从来没提过。',
      textEn:'What\'s this… Dad never mentioned this.',
      next:'s2_6'
    },
    s2_6: {
      bg:'home',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'她插入U盘。里面的文件揭示了一个惊人的事实：她的父亲，多年前，是一名最高机密的特工。',
      textEn:'She plugs it in. The files reveal a stunning truth: years ago, her father was a top-secret operative.',
      next:'s2_7'
    },
    s2_7: {
      bg:'home',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'一个名为"OPERATION HOMECOMING"的文件夹，触发了系统启动序列。',
      textEn:'A folder labeled "OPERATION HOMECOMING" triggers a system boot sequence.',
      next:'s2_8'
    },
    s2_8: {
      bg:'home',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'系统', speakerEn:'System',
      text:'欢迎回来，渡鸦。WELCOME BACK, RAVEN.',
      textEn:'WELCOME BACK, RAVEN.',
      next:'s2_9'
    },
    s2_9: {
      bg:'home',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'渡鸦……这是爸的代号？',
      textEn:'Raven… that\'s Dad\'s codename?',
      next:'s2_10'
    },
    s2_10: {
      bg:'home', cg:'cg_signal',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'系统', speakerEn:'System',
      text:'检测到远程连接。摄像头已激活。',
      textEn:'REMOTE CONNECTION DETECTED. Webcam activated.',
      next:'s2_11'
    },
    s2_11: {
      bg:'home',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'摄像头指示灯亮起。沈的监控网络，第一次捕捉到了林雨的存在。',
      textEn:'The camera light turns on. Director Shen\'s surveillance network has, for the first time, captured Lin Yu\'s existence.',
      next:'s3_1'
    },

    /* ================================================================
       场景 3：绑架与分支路线
       ================================================================ */
    s3_1: {
      chapter:'chapter.c3', bg:'home',
      sprites:[{char:'linxiao',pose:'base',slot:'left'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'第二天下午。林骁收到林雨的短信："爸，今天要晚点回家，别等我。"',
      textEn:'The next afternoon. Lin Xiao receives a text from Lin Yu: "Father, I\'ll be home late tonight. Don\'t wait for me."',
      next:'s3_2'
    },
    s3_2: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'"阿雅"……她从来不这么叫我。她叫我"爸爸"。',
      textEn:'"Ayah"… she never calls me that. She calls me "Papa".',
      next:'s3_3'
    },
    s3_3: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'电话响起。一个匿名来电者，只说了两句话，就挂断了。',
      textEn:'The phone rings. An anonymous caller says only two sentences, then hangs up.',
      next:'s3_4'
    },
    s3_4: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'匿名来电', speakerEn:'Anonymous Caller',
      text:'"你的女儿在我们手里。不要做傻事。"',
      textEn:'"Your daughter is in our hands. Don\'t do anything foolish."',
      next:'s3_5'
    },
    s3_5: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'林雨被绑架了。林骁面临抉择。',
      textEn:'Lin Yu has been abducted. Lin Xiao faces a choice.',
      choices:[
        { label:'报警（法律路线）', labelEn:'Report to the police (Legal Route)', flag:{route:'legal'}, next:'s3_police' },
        { label:'独自行动（私人路线）', labelEn:'Act alone (Private Route)', flag:{route:'private'}, next:'s4_1' }
      ]
    },

    /* ---------- 法律路线：报警 ---------- */
    s3_police: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'base',slot:'left'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'林骁前往警局报案。警探礼貌而冷淡地记录了一切，承诺会"尽快调查"。',
      textEn:'Lin Xiao reports the abduction to the police. The detective listens politely, coldly, promising to "look into it soon."',
      next:'s3_police2'
    },
    s3_police2: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'警探', speakerEn:'Detective',
      text:'林先生，请回家等待。我们会联系你。',
      textEn:'Mr. Lin, please go home and wait. We\'ll be in touch.',
      next:'s3_police3'
    },
    s3_police3: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'离开警局时，林骁看到警探接了一个电话，屏幕上——是黑羽标记。',
      textEn:'As he leaves the station, Lin Xiao sees the detective take a call. On the screen — the black-feather mark.',
      next:'s3_police4'
    },
    s3_police4: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'沈的网络早已渗透了当地警方。报警，等于自投罗网。数小时后，林骁被以"妨碍调查"的名义拘留。林雨的下落，石沉大海。',
      textEn:'Shen\'s network had long since infiltrated the local police. Reporting to them was walking into a trap. Hours later, Lin Xiao is detained on charges of "obstructing an investigation." Lin Yu\'s whereabouts vanish into silence.',
      next:'end_corruption'
    },

    /* ---------- 私人路线：与队友重聚 ---------- */
    s4_1: {
      chapter:'chapter.c4', bg:'safehouse', cg:'cg_team', achievement:'ach_reunion',
      sprites:[{char:'linxiao',pose:'base',slot:'left'},{char:'sulan',pose:'focused',slot:'center'},{char:'guchen',pose:'base',slot:'right'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'林骁拨通了两个多年没联系过的号码。苏岚和顾晨——他旧日的队友——在一个废弃拳击馆与他重逢。',
      textEn:'Lin Xiao dials two numbers he hasn\'t called in years. Su Lan and Gu Chen — his old teammates — meet him at an abandoned boxing gym.',
      next:'s4_2'
    },
    s4_2: {
      bg:'safehouse',
      sprites:[{char:'sulan',pose:'focused',slot:'left'}],
      speaker:'苏岚', speakerEn:'Su Lan',
      text:'你想把旧账翻出来。这次，是为了你女儿。',
      textEn:'You want to dig up old ghosts. This time, for your daughter.',
      next:'s4_3'
    },
    s4_3: {
      bg:'safehouse',
      sprites:[{char:'guchen',pose:'base',slot:'right'}],
      speaker:'顾晨', speakerEn:'Gu Chen',
      text:'告诉我该打谁。',
      textEn:'Just tell me who to hit.',
      next:'s4_4'
    },
    s4_4: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'base',slot:'center'}],
      speaker:'林骁', speakerEn:'Lin Xiao',
      text:'先找到她。苏岚，我需要你黑进那个网络。',
      textEn:'First, find her. Su Lan, I need you to breach that network.',
      next:'s4_mg'
    },
    s4_mg: {
      type:'minigame1',
      nextSuccess:'s4_ok',
      nextFail:'end_trapped'
    },
    s4_ok: {
      bg:'server', cg:'cg_breach',
      sprites:[{char:'sulan',pose:'focused',slot:'center'}],
      speaker:'苏岚', speakerEn:'Su Lan',
      text:'入侵成功。确认：林雨确实被绑架了。我还追踪到了地址——城郊一个隐蔽的集团仓库。',
      textEn:'Breach successful. Confirmed: Lin Yu has been abducted. I\'ve also traced an address — a hidden syndicate warehouse on the outskirts of the city.',
      next:'s5_1'
    },

    /* ---------- 场景 5：仓库潜入 ---------- */
    s5_1: {
      chapter:'chapter.c5', bg:'bunker', cg:'cg_warehouse',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'深夜。林骁独自潜入仓库。他必须在不被发现的情况下抵达情报终端。',
      textEn:'Deep in the night. Lin Xiao infiltrates the warehouse alone. He must reach the intel terminal without being detected.',
      next:'s5_mg'
    },
    s5_mg: {
      type:'minigame2',
      nextSuccess:'s5_ok',
      nextFail:'end_triumph'
    },
    s5_ok: {
      bg:'bunker', cg:'cg_intel',
      sprites:[{char:'guchen',pose:'base',slot:'right'}],
      speaker:'顾晨', speakerEn:'Gu Chen',
      text:'拿到关键情报了。所有线索都指向同一个人——沈局长。他就是幕后的主谋。',
      textEn:'Got the critical intel. Every lead points to one man — Director Shen. He\'s the mastermind behind all of this.',
      next:'s6_1'
    },

    /* ---------- 场景 6：最终营救与对决 ---------- */
    s6_1: {
      chapter:'chapter.c6', bg:'server', cg:'cg_rescue',
      sprites:[{char:'linxiao',pose:'base',slot:'left'},{char:'linyu',pose:'sad',slot:'right'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'林骁在设施的深处找到了林雨。她活着——但沈的最终陷阱，正在收网。',
      textEn:'Lin Xiao finds Lin Yu deep inside the facility. She\'s alive — but Shen\'s final trap is closing.',
      next:'s6_2'
    },
    s6_2: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'right'}],
      speaker:'林雨', speakerEn:'Lin Yu',
      text:'爸……他就在外面。',
      textEn:'Dad… he\'s out there.',
      next:'s6_3'
    },
    s6_3: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'base',slot:'left'},{char:'shen',pose:'base',slot:'right'}],
      speaker:'沈局长', speakerEn:'Director Shen',
      text:'渡鸦。你终于来了。苏岚和顾晨可以带她离开。但你——必须留下。',
      textEn:'Raven. You finally came. Su Lan and Gu Chen can take her away. But you — you stay.',
      next:'s6_4'
    },
    s6_4: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'顾晨护送林雨撤离。林骁转身，面对旧日的指挥官。最终对决，开始。',
      textEn:'Gu Chen escorts Lin Yu out. Lin Xiao turns to face his former commander. The final duel begins.',
      next:'s6_mg'
    },
    s6_mg: {
      type:'minigame3',
      nextSuccess:'s6_ok',
      nextFail:'end_sacrifice'
    },
    s6_ok: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'shen',pose:'base',slot:'right'}],
      speaker:'旁白', speakerEn:'Narrator',
      text:'沈倒下了。渡鸦赢了。国际安全机构早已在苏岚的引导下包围了设施——这一次，他们绕过了被腐蚀的当地警方。',
      textEn:'Shen falls. Raven wins. The international security agency, guided by Su Lan, has already surrounded the facility — this time, bypassing the corrupted local police.',
      next:'end_justice'
    },

    /* ================================================================
       结局
       ================================================================ */
    end_corruption: {
      type:'ending', bg:'hq', cg:'cg_corruption',
      title:'腐败之网', titleEn:'WEB OF CORRUPTION', titleTag:'ENDING 1',
      achievements:['ach_corruption'],
      text:'数小时后，林骁被以"妨碍调查"的名义拘留。没有律师，没有指控，只有一个冰冷的审讯室。窗外，黑羽标记在监控摄像头上闪烁。\n\n林雨的下落，石沉大海。腐败之网，吞噬了最后一线希望。',
      textEn:'Hours later, Lin Xiao is detained on charges of "obstructing an investigation." No lawyer, no charges, only a cold interrogation room. Outside the window, the black-feather mark flickers on a surveillance camera.\n\nLin Yu\'s whereabouts vanish into silence. The web of corruption swallows the last shred of hope.'
    },
    end_trapped: {
      type:'ending', bg:'server',
      title:'困于阴影', titleEn:'TRAPPED IN THE SHADOWS', titleTag:'ENDING 2',
      achievements:['ach_trapped'],
      text:'苏岚的入侵被对方防火墙反追踪。警报响起的瞬间，整个网络的出口都被封死。\n\n林骁被当场逮捕——沈的网早就张好了。林雨，仍然下落不明。他被拖入黑暗，像他埋葬了那么多年的秘密一样。',
      textEn:'Su Lan\'s breach is traced back by the enemy firewall. The moment alarms ring, every exit from the network is sealed.\n\nLin Xiao is arrested on the spot — Shen\'s net was already cast. Lin Yu remains missing. He is dragged into the shadows, like the secrets he buried for so many years.'
    },
    end_triumph: {
      type:'ending', bg:'bunker',
      title:'恶徒凯旋', titleEn:'THE VILLAIN\'S TRIUMPH', titleTag:'ENDING 3',
      achievements:['ach_triumph'],
      text:'仓库的灯在一瞬间全部亮起。无数枪口指向林骁。\n\n沈站在屏幕后，微笑着看着这场表演。"欢迎来到我的陷阱，渡鸦。"\n\n林骁被俘。林雨仍在沈的手中。阴谋继续运转——这一次，无人阻挡。',
      textEn:'Every light in the warehouse blazes on at once. Countless gun barrels aim at Lin Xiao.\n\nShen watches the show from behind a screen, smiling. "Welcome to my trap, Raven."\n\nLin Xiao is captured. Lin Yu remains in Shen\'s hands. The conspiracy continues — this time, no one stands in its way.'
    },
    end_sacrifice: {
      type:'ending', bg:'bunker', cg:'cg_sacrifice',
      title:'父亲的牺牲', titleEn:'A FATHER\'S SACRIFICE', titleTag:'ENDING 4',
      achievements:['ach_sacrifice'],
      text:'沈的最后一击刺穿了林骁的防线。他倒下时，看见林雨被顾晨和苏岚安全地带出了设施。\n\n她安全了。\n\n"爸！"\n\n林骁没有回答。他用尽最后的力气，握紧了那枚黑羽徽章。一个父亲的选择，到此为止。',
      textEn:'Shen\'s final strike pierces Lin Xiao\'s guard. As he falls, he sees Lin Yu being carried to safety by Gu Chen and Su Lan.\n\nShe\'s safe.\n\n"DAD!"\n\nLin Xiao doesn\'t answer. With his last strength, he clutches the black-feather badge. A father\'s choice, made to the very end.'
    },
    end_justice: {
      type:'ending', bg:'school', cg:'cg_justice',
      title:'真实正义', titleEn:'TRUE JUSTICE', titleTag:'ENDING 5',
      achievements:['ach_justice'],
      text:'沈被制服，被国际安全机构逮捕——这支机构绕过了被腐蚀的当地警方，直接将他绳之以法。\n\n数月后。林骁在校门口等林雨放学。\n\n"你早到了。"\n"你迟到了。"\n"三十秒。"\n"我注意到了。"\n\n归乡行动的真相被公开。黑羽，终于落定。',
      textEn:'Shen is subdued and arrested by the international security agency — an agency that bypassed the corrupted local police and brought him to justice directly.\n\nMonths later. Lin Xiao waits outside Lin Yu\'s school.\n\n"You\'re early."\n"You\'re late."\n"Thirty seconds."\n"I noticed."\n\nThe truth of Operation Homecoming is made public. At last, the black feather rests.'
    }
  }
};
