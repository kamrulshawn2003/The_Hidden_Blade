/* ===== The Hidden Blade Â· éšç§˜ä¹‹åˆƒ â€” å‰§æƒ…è„šæœ¬ v5.0 (EN/ZH åŒè¯­) ===== */
window.STORY = {
  start: 's1_1',

  /* èƒŒæ™¯å›¾æ˜ å°„ */
  backgrounds: {
    school:   'assets/backgrounds/bg_school.png',
    home:     'assets/backgrounds/bg_home.png',
    hq:       'assets/backgrounds/bg_hq.png',
    server:   'assets/backgrounds/bg_server.png',
    safehouse:'assets/backgrounds/bg_safehouse.png',
    bunker:   'assets/backgrounds/bg_bunker.png',
    title:    'assets/backgrounds/bg_title.png'
  },

  /* è§’è‰²ç«‹ç»˜æ˜ å°„ */
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

  /* è§’è‰²å›¾é‰´ */
  characters: [
    { id:'linxiao',   name:'æž—éª', nameEn:'Lin Xiao / Raven', role:'é€€å½¹ç‰¹å·¥ / ä¸»è§’', roleEn:'Retired Agent / Protagonist',
      desc:'å‰ç²¾è‹±ç‰¹å·¥ï¼Œé€€å½¹åŽæˆä¸ºæ¡£æ¡ˆç®¡ç†å‘˜å’Œå•äº²çˆ¶äº²ã€‚ä¸ºæ•‘å¥³å„¿è¢«è¿«é‡æ–°æˆä¸º"æ¸¡é¸¦"ã€‚',
      descEn:'Former elite operative, now an archivist and single father. Forced to become Raven again to save his daughter.' },
    { id:'linyu',     name:'æž—é›¨', nameEn:'Lin Yu', role:'æž—éªä¹‹å¥³ / å¯çŽ©è§’è‰²', roleEn:"Lin Xiao's Daughter / Playable",
      desc:'åå…­å²ï¼Œæ•é”è€Œå€”å¼ºã€‚ä»Žè¡¨é¢å—å®³è€…æˆé•¿ä¸ºè°ƒæŸ¥è€…ï¼Œå¥¹çš„é€‰æ‹©å¯ä»¥æ‹¯æ•‘çˆ¶äº²ã€‚',
      descEn:'Sixteen, observant and stubborn. Grows from apparent victim to investigator whose choices can save her father.' },
    { id:'guchen',    name:'é¡¾æ™¨', nameEn:'Gu Chen', role:'æ—§é˜Ÿå‹ / æˆ˜æœ¯ä¸“å®¶', roleEn:'Old Teammate / Tactical Expert',
      desc:'æž—éªæ˜”æ—¥æˆ˜åœºæ­æ¡£ã€‚å¿ è¯šèƒ½å¹²ï¼Œå´èƒŒè´Ÿç€"å½’ä¹¡è¡ŒåŠ¨"ä¸­æœä»Žå‘½ä»¤çš„é‡æ‹…ã€‚',
      descEn:"Lin Xiao's former field partner. Loyal and capable, burdened by the order he obeyed during Operation Homecoming." },
    { id:'sulan',     name:'è‹å²š', nameEn:'Su Lan', role:'æ—§é˜Ÿå‹ / æƒ…æŠ¥ä¸“å®¶', roleEn:'Old Teammate / Intelligence Expert',
      desc:'å‰æƒ…æŠ¥åˆ†æžå¸ˆä¸Žç³»ç»Ÿä¸“å®¶ã€‚å¯¹ä¸¤ä¸ªç”·äººéƒ½ä¸ä¿¡ä»»ï¼Œå´æ˜¯å›¢é˜Ÿæœ€æ¸…é†’çš„é“å¾·ä¸ŽæŠ€æœ¯ä¹‹å£°ã€‚',
      descEn:'Former intelligence analyst and systems specialist. Distrusts both men but becomes the team\'s clearest moral and technical voice.' },
    { id:'mei',       name:'æ¢…æ™¨', nameEn:'Mei Chen / M', role:'æž—é›¨ä¹‹æ¯ / é•œä¹‹å·¥ç¨‹å¸ˆ', roleEn:"Lin Yu's Mother / Mirror Engineer",
      desc:'é•œç³»ç»ŸåŽŸå§‹å·¥ç¨‹å¸ˆä¹‹ä¸€ã€‚å®˜æ–¹è®°å½•å·²æ­»äº¡åå¹´ï¼Œå®žåˆ™æ½œä¼åœ¨ç½‘ç»œä¸­ dismantle è‡ªå·±å‚ä¸Žåˆ›å»ºçš„ç³»ç»Ÿã€‚',
      descEn:'One of Mirror\'s original engineers. Officially dead for ten years; secretly working to dismantle the system she helped create.' },
    { id:'shen',      name:'æ²ˆå±€é•¿', nameEn:'Director Shen', role:'æœ€ç»ˆåæ´¾ / å‰æŒ‡æŒ¥å®˜', roleEn:'Final Antagonist / Former Commander',
      desc:'æž—éªçš„å‰æŒ‡æŒ¥å®˜ä¸Žå¯¼å¸ˆã€‚ç›¸ä¿¡é¢„æµ‹æ˜¯æ¯”æ··ä¹±æ›´äººé“çš„æŽ§åˆ¶æ–¹å¼ã€‚',
      descEn:"Lin Xiao's former commander and mentor. Believes prediction is a more humane form of control than chaos." },
    { id:'victor',    name:'èµµç»´å…‹å¤š', nameEn:'Victor Zhao', role:'æ´›ä¼¦é›†å›¢CEO', roleEn:'CEO of Loren Group',
      desc:'å‚ä¸Žé•œç³»ç»Ÿåˆ›å»ºï¼Œä½†å¹¶éžå½“å‰æŽŒæŽ§è€…ã€‚ä¸€ä¸ªä»¤äººä¿¡æœçš„è™šå‡æœ€ç»ˆåæ´¾ã€‚',
      descEn:'Complicit in Mirror\'s creation, but not its current master. A convincing false final villain.' },
    { id:'zhaokai',   name:'èµµå‡¯', nameEn:'Zhao Kai', role:'æ ¡å›­éœ¸å‡Œè€… / æ„å¤–è¯äºº', roleEn:'School Bully / Unexpected Witness',
      desc:'ç»´å…‹å¤šä¹‹å­ï¼Œæž—é›¨çš„æ ¡å›­éœ¸å‡Œè€…ã€‚çŸ¥é“çˆ¶äº²ç§˜å¯†çš„ç¢Žç‰‡ï¼Œå¯èƒ½æˆä¸ºæ„å¤–è¯äººã€‚',
      descEn:"Victor's son and Lin Yu's bully. Knows fragments of his father's secrets and can become an unexpected witness." },
    { id:'drhe',      name:'ä½•äº®åšå£«', nameEn:'Dr. He Liang', role:'å‰é•œä¹‹å·¥ç¨‹å¸ˆ', roleEn:'Former Mirror Engineer',
      desc:'å‰é•œç³»ç»Ÿå·¥ç¨‹å¸ˆï¼Œå®˜æ–¹æŽ¨å®šæ­»äº¡ã€‚è”ç³»æž—é›¨å¹¶è§¦å‘äº†æ•´ä¸ªäº‹ä»¶é“¾ã€‚',
      descEn:'Former Mirror engineer, presumed dead. Contacts Lin Yu and triggers the chain of events.' },
    { id:'mastermind',name:'å¹•åŽé»‘æ‰‹', nameEn:'The Mastermind', role:'ç¥žç§˜èº«å½±', roleEn:'Mysterious Figure',
      desc:'é˜´å½±ä¸­æ“çºµä¸€åˆ‡çš„ç¥žç§˜å­˜åœ¨ã€‚',
      descEn:'A mysterious figure pulling strings from the shadows.' },
    { id:'kidnapper', name:'æ‰§è¡Œè€…', nameEn:'The Enforcer', role:'çŽ°åœºæ‰§è¡Œè€…', roleEn:'Field Enforcer',
      desc:'å—é›‡æ‰§è¡Œç»‘æž¶ä¸ŽæŠ¼è¿çš„ç¥žç§˜äººç‰©ã€‚',
      descEn:'Mysterious operative hired for abductions and transport.' }
  ],

  /* Tips è¯æ¡ */
  tips: [
    { id:'tip_homecoming', title:'å½’ä¹¡è¡ŒåŠ¨', titleEn:'Operation Homecoming',
      text:'åå¹´å‰çš„ä¸€æ¬¡ç§˜å¯†è¡ŒåŠ¨ï¼Œå®˜æ–¹è®°å½•ä¸ºæ¸…å‰¿æ­¦è£…æžç«¯åˆ†å­ã€‚17äººæ­»äº¡ï¼Œ1äººå¤±è¸ªã€‚çœŸç›¸è¢«åˆ»æ„æŽ©åŸ‹ã€‚',
      textEn:'A covert operation ten years ago, officially described as eliminating armed extremists. 17 dead, 1 missing. The truth was deliberately buried.',
      unlock:'s1_12' },
    { id:'tip_mirror', title:'é•œç³»ç»Ÿ', titleEn:'Project Mirror',
      text:'ä¸€ä¸ªé¢„æµ‹æ€§ç›‘æŽ§ç³»ç»Ÿï¼Œé€šè¿‡åˆ†æžè¡Œä¸ºæ•°æ®é¢„æµ‹çŠ¯ç½ªã€‚æ¢…æ™¨æ˜¯åŽŸå§‹å·¥ç¨‹å¸ˆä¹‹ä¸€ï¼Œæ²ˆå±€é•¿ç§˜å¯†å¤ºå–äº†å…¶é¢„æµ‹å¼•æ“Žã€‚',
      textEn:'A predictive surveillance system that forecasts crime through behavioral analysis. Mei Chen was one of its original engineers; Director Shen secretly seized its prediction engine.',
      unlock:'s12_6' },
    { id:'tip_keys', title:'åŒå¯†é’¥', titleEn:'The Two Keys',
      text:'æ¢…æ™¨å°†é•œç³»ç»Ÿæ ¸å¿ƒæŽˆæƒæ‹†åˆ†ä¸ºä¸¤éƒ¨åˆ†ï¼šæž—éªï¼ˆå¯†é’¥ä¸€ï¼‰å’Œæž—é›¨ï¼ˆå¯†é’¥äºŒï¼‰ã€‚åªæœ‰ä¸¤äººåŒæ—¶åœ¨åœºæ‰èƒ½æ¿€æ´»åŽŸå§‹æ ¸å¿ƒã€‚',
      textEn:'Mei split Mirror\'s core authorization into two parts: Lin Xiao (Key One) and Lin Yu (Key Two). Both must be present to activate the original core.',
      unlock:'s14_3' },
    { id:'tip_raven', title:'æ¸¡é¸¦', titleEn:'Raven',
      text:'æž—éªåœ¨ç‰¹å·¥æ—¶æœŸçš„ä»£å·ã€‚SUBJECT_017æ¡£æ¡ˆæ˜¾ç¤ºä»–åœ¨æˆ˜æœ¯è£…å¤‡ä¸­çš„ç…§ç‰‡ã€‚',
      textEn:"Lin Xiao's codename during his operative years. The SUBJECT_017 file shows him in tactical gear.",
      unlock:'s4_3' },
    { id:'tip_evidence', title:'è¯æ®ç³»ç»Ÿ', titleEn:'Evidence System',
      text:'æ¸¸æˆä¸­æ”¶é›†çš„è¯æ®å½±å“æœ€ç»ˆç»“å±€ã€‚é«˜è¯æ®å¯ä»¥è§£é”"æ”¹å†™é•œç³»ç»Ÿ"çš„ç§˜å¯†ç»“å±€ï¼Œå¹¶ä½¿æ²ˆå±€é•¿è¢«åˆæ³•é€®æ•ã€‚',
      textEn:'Evidence collected throughout the game affects the ending. High evidence unlocks the secret "Rewrite Mirror" ending and allows Shen to be lawfully arrested.',
      unlock:'s17_1' },
    { id:'tip_truth', title:'çœŸç›¸ä¸Žæ­£ä¹‰', titleEn:'Truth & Justice',
      text:'å°†å®Œæ•´è¯æ®ç§»äº¤å¸æ³•æœºå…³ï¼Œæ‰èƒ½è®©é˜´è°‹åœ¨é˜³å…‰ä¸‹è¢«å®¡åˆ¤ã€‚ä»¥æš´åˆ¶æš´æˆ–è®¸å¿«æ„ï¼Œå´æ°¸è¿œæ— æ³•æ¢æ¥çœŸæ­£çš„å¹³é™ã€‚',
      textEn:'Only by handing complete evidence to the authorities can the conspiracy be tried in daylight. Vigilantism may feel satisfying, but it never brings true peace.',
      unlock:'end_justice' }
  ],

  /* åœºæ™¯ CG */
  cgs: [
    { id:'cg_homecoming', title:'CG 01 Â· å½’ä¹¡è¡ŒåŠ¨', titleEn:'CG 01 Â· Operation Homecoming', bg:'bunker', unlock:'s1_1' },
    { id:'cg_family', title:'CG 02 Â· çƒ§ç„¦çš„æ—©é¤', titleEn:'CG 02 Â· Burnt Breakfast', bg:'home', unlock:'s2_1' },
    { id:'cg_school', title:'CG 03 Â· æ ¡é—¨å£', titleEn:'CG 03 Â· School Gate', bg:'school', unlock:'s3_1' },
    { id:'cg_usb', title:'CG 04 Â· Uç›˜ä¸­çš„ç§˜å¯†', titleEn:'CG 04 Â· The USB Secret', bg:'home', unlock:'s4_1' },
    { id:'cg_cctv', title:'CG 05 Â· CCTVç›‘æŽ§', titleEn:'CG 05 Â· CCTV Investigation', bg:'server', unlock:'s7_1' },
    { id:'cg_warehouse', title:'CG 06 Â· ä»“åº“æœå¯»', titleEn:'CG 06 Â· Warehouse Hunt', bg:'bunker', unlock:'s10_1' },
    { id:'cg_guchen', title:'CG 07 Â· æ­»åŽ»çš„æ­æ¡£', titleEn:'CG 07 Â· The Dead Partner', bg:'safehouse', unlock:'s12_1' },
    { id:'cg_hack', title:'CG 08 Â· å…¥ä¾µé•œç³»ç»Ÿ', titleEn:'CG 08 Â· Break Into Mirror', bg:'server', unlock:'s14_1' },
    { id:'cg_linyu', title:'CG 09 Â· 071å·å®žéªŒä½“', titleEn:'CG 09 Â· Subject 071', bg:'server', unlock:'s15_1' },
    { id:'cg_mei', title:'CG 10 Â· Mçš„çœŸé¢ç›®', titleEn:'CG 10 Â· M Has a Face', bg:'server', unlock:'s20_1' },
    { id:'cg_gala', title:'CG 11 Â· æ´›ä¼¦æ…ˆå–„æ™šå®´', titleEn:'CG 11 Â· Loren Gala', bg:'hq', unlock:'s18_1' },
    { id:'cg_family2', title:'CG 12 Â· å®¶äººé‡é€¢', titleEn:'CG 12 Â· The Family', bg:'server', unlock:'s26_1' },
    { id:'cg_final', title:'CG 13 Â· æœ€åŽçš„å‘½ä»¤', titleEn:'CG 13 Â· The Last Order', bg:'bunker', unlock:'s30_1' },
    { id:'cg_justice', title:'CG 14 Â· çœŸå®žæ­£ä¹‰', titleEn:'CG 14 Â· True Justice', bg:'school', unlock:'end_justice' },
    { id:'cg_vengeance', title:'CG 15 Â· å¤ä»‡', titleEn:'CG 15 Â· Vengeance', bg:'bunker', unlock:'end_vengeance' },
    { id:'cg_secret', title:'CG 16 Â· æ‰“ç ´é•œå­', titleEn:'CG 16 Â· Break the Mirror', bg:'home', unlock:'end_secret' }
  ],

  /* ===== å‰§æƒ…èŠ‚ç‚¹ ===== */
  nodes: {

    /* ================================================================
       ACT I â€” THE LIFE RAVEN BURIED
       ================================================================ */

    /* ---------- åœºæ™¯1ï¼šå½’ä¹¡è¡ŒåŠ¨ï¼ˆåå¹´å‰ï¼‰ ---------- */
    s1_1: {
      bg:'bunker', cg:'cg_homecoming',
      sprites:[],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'åå¹´å‰ã€‚å‡Œæ™¨2ç‚¹17åˆ†ã€‚åºŸå¼ƒé“è·¯ç ”ç©¶ç«™ä¸Šç©ºï¼Œå¤§é›¨å€¾ç›†ã€‚',
      textEn:'Ten years earlier. 02:17 AM. Heavy rain over an abandoned railway research station.',
      next:'s1_2'
    },
    s1_2: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'base',slot:'left'},{char:'guchen',pose:'base',slot:'right'},{char:'shen',pose:'base',slot:'center'}],
      speaker:'æ²ˆå±€é•¿ï¼ˆæ— çº¿ç”µï¼‰', speakerEn:'Shen (radio)',
      text:'æ¸¡é¸¦å°é˜Ÿï¼Œç¡®è®¤ä½ç½®ã€‚',
      textEn:'Raven Team, confirm position.',
      next:'s1_3'
    },
    s1_3: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'base',slot:'left'},{char:'guchen',pose:'base',slot:'right'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'ä¸¤ç™¾ç±³ã€‚æ²¡æœ‰å¤–éƒ¨å®ˆå«ã€‚',
      textEn:'Two hundred meters. No external guards.',
      next:'s1_4'
    },
    s1_4: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'guchen',pose:'base',slot:'right'},{char:'shen',pose:'base',slot:'center'}],
      speaker:'æ²ˆå±€é•¿ï¼ˆæ— çº¿ç”µï¼‰', speakerEn:'Shen (radio)',
      text:'å–å›žç¡¬ç›˜ã€‚æ¶ˆç­æ•Œå¯¹äººå‘˜ã€‚ä¸ç•™è¯æ®ã€‚',
      textEn:'Retrieve the drive. Eliminate hostile personnel. Leave no evidence.',
      next:'s1_5'
    },
    s1_5: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'æœ€åŽä¸€éƒ¨åˆ†ä¸åœ¨ç®€æŠ¥é‡Œã€‚',
      textEn:'That last part wasn\'t in the briefing.',
      next:'s1_6'
    },
    s1_6: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'shen',pose:'base',slot:'center'}],
      speaker:'æ²ˆå±€é•¿ï¼ˆæ— çº¿ç”µï¼‰', speakerEn:'Shen (radio)',
      text:'çŽ°åœ¨åœ¨äº†ã€‚',
      textEn:'It is now.',
      next:'s1_7'
    },
    s1_7: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'å»ºç­‘å†…éƒ¨ï¼Œä¸€åå—ä¼¤çš„ç ”ç©¶äººå‘˜ä¼¸æ‰‹å‘æž—éªâ€”â€”ä¸æ˜¯åŽ»æ‹¿æ­¦å™¨ã€‚',
      textEn:'Inside, a wounded researcher reaches for Lin Xiao rather than a weapon.',
      next:'s1_8'
    },
    s1_8: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'ç ”ç©¶äººå‘˜', speakerEn:'Researcher',
      text:'åˆ«è®©ä»–å¾—åˆ°"é•œ"â€¦â€¦',
      textEn:'Don\'t let him have Mirrorâ€¦',
      next:'s1_9'
    },
    s1_9: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'è°ï¼Ÿ',
      textEn:'Who?',
      next:'s1_10'
    },
    s1_10: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'ç ”ç©¶äººå‘˜', speakerEn:'Researcher',
      text:'æ²ˆâ€”â€”',
      textEn:'Shenâ€”',
      next:'s1_11'
    },
    s1_11: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'guchen',pose:'fierce',slot:'right'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æžªå£°æ‰“æ–­äº†ä»–ã€‚çƒŸé›¾ä¸­ï¼Œæž—éªçœ‹åˆ°ä¸€ä¸ªç†Ÿæ‚‰çš„å¥³äººâ€”â€”æ¢…ã€‚ä¸Žæ­¤åŒæ—¶ï¼Œé¡¾æ™¨æ”¶åˆ°äº†ä¸€æ¡ç§äººå‘½ä»¤ã€‚',
      textEn:'Gunfire cuts him off. Through smoke, Lin Xiao sees a familiar woman: Mei. At the same moment, Gu Chen receives a private order.',
      next:'s1_12'
    },
    s1_12: {
      bg:'bunker',
      sprites:[{char:'guchen',pose:'fierce',slot:'right'},{char:'shen',pose:'base',slot:'center'}],
      speaker:'æ²ˆå±€é•¿ï¼ˆæ— çº¿ç”µï¼‰', speakerEn:'Shen (radio)',
      text:'ä¸ƒå·åè®®ã€‚æ‰§è¡Œã€‚',
      textEn:'Protocol Seven. Execute.',
      next:'s1_13'
    },
    s1_13: {
      bg:'bunker',
      sprites:[{char:'guchen',pose:'fierce',slot:'right'}],
      speaker:'é¡¾æ™¨', speakerEn:'Gu Chen',
      text:'é‡Œé¢æœ‰å¹³æ°‘ã€‚',
      textEn:'There are civilians inside.',
      next:'s1_14'
    },
    s1_14: {
      bg:'bunker',
      sprites:[{char:'guchen',pose:'fierce',slot:'right'},{char:'shen',pose:'base',slot:'center'}],
      speaker:'æ²ˆå±€é•¿ï¼ˆæ— çº¿ç”µï¼‰', speakerEn:'Shen (radio)',
      text:'è¿™æ˜¯å‘½ä»¤ã€‚',
      textEn:'That is an order.',
      next:'s1_15'
    },
    s1_15: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'base',slot:'left'},{char:'guchen',pose:'base',slot:'right'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æž—éªå¯ä»¥åœä¸‹æ¥å¸®åŠ©å—ä¼¤çš„ç ”ç©¶äººå‘˜ï¼Œæˆ–è€…è¿½å‘æ¢…ã€‚è¿™ä¸ªé€‰æ‹©å°†è¢«é“­è®°ï¼Œå½±å“ç§˜å¯†ç»“å±€ã€‚',
      textEn:'Lin Xiao can stop to help a wounded researcher or chase Mei. This choice is remembered for the secret ending.',
      choices:[
        { label:'å¸®åŠ©å—ä¼¤çš„ç ”ç©¶äººå‘˜', labelEn:'Help the wounded researcher', flag:{homecoming:'help'}, stats:{trust:+15, evidence:+10}, next:'s1_16' },
        { label:'è¿½å‘æ¢…', labelEn:'Chase Mei', flag:{homecoming:'chase'}, stats:{revenge:+5, exposure:+5}, next:'s1_16' }
      ]
    },
    s1_16: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'çˆ†ç‚¸åžå™¬äº†æ•´ä¸ªç ”ç©¶ç«™ã€‚æž—éªç‹¬è‡ªé†’æ¥ï¼Œçœ‹åˆ°ç›‘è§†å™¨ä¸Šç ´ç¢Žçš„é»‘ç¾½ç¬¦å·ï¼Œå‘¼å–Šç€æ¢…çš„åå­—ã€‚',
      textEn:'An explosion consumes the station. Lin Xiao wakes alone, sees the broken-black-feather symbol on a monitor, and calls for Mei.',
      next:'s1_17'
    },
    s1_17: {
      bg:'bunker',
      sprites:[],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'ç”»é¢åˆ‡é»‘ã€‚å½’ä¹¡è¡ŒåŠ¨ â€”â€” 17äººæ­»äº¡ â€”â€” 1äººå¤±è¸ªã€‚',
      textEn:'Cut to black: OPERATION HOMECOMING â€” 17 DEAD â€” 1 MISSING.',
      next:'s2_1'
    },

    /* ---------- åœºæ™¯2ï¼šçƒ§ç„¦çš„æ—©é¤ ---------- */
    s2_1: {
      bg:'home', cg:'cg_family',
      sprites:[{char:'linxiao',pose:'happy',slot:'left'},{char:'linyu',pose:'base',slot:'right'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'çŽ°åœ¨ã€‚æž—éªæŠŠæ—©é¤çƒ¤ç„¦äº†ã€‚æž—é›¨æ‹äº†ç…§ä½œä¸º"è¯æ®"ã€‚ä»–ä»¬çš„è°ƒä¾ƒç†Ÿç»ƒè€Œæ¸©é¦¨ã€‚',
      textEn:'Present day. Lin Xiao burns breakfast. Lin Yu photographs the result as "evidence." Their teasing feels practiced and comfortable.',
      next:'s2_2'
    },
    s2_2: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'happy',slot:'left'},{char:'linyu',pose:'base',slot:'right'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'æ˜¨å¤©æ˜¯æ¥¼æ¢¯ï¼Œä»Šå¤©æ˜¯ä½“è‚²è¯¾ã€‚æ˜Žå¤©å‘¢ï¼Ÿ',
      textEn:'Yesterday it was the stairs. Today it\'s PE. What happens tomorrow?',
      next:'s2_3'
    },
    s2_3: {
      bg:'home',
      sprites:[{char:'linyu',pose:'base',slot:'right'}],
      speaker:'æž—é›¨', speakerEn:'Lin Yu',
      text:'ä¹Ÿè®¸æˆ‘ä¼šæ’žåˆ°é—¨ã€‚ç•™ç‚¹ä½™åœ°å˜›ã€‚',
      textEn:'Maybe I walk into a door. Keep your options open.',
      next:'s2_4'
    },
    s2_4: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'base',slot:'left'},{char:'linyu',pose:'base',slot:'right'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'é›¨é›¨ã€‚',
      textEn:'Yu Yu.',
      next:'s2_5'
    },
    s2_5: {
      bg:'home',
      sprites:[{char:'linyu',pose:'base',slot:'right'}],
      speaker:'æž—é›¨', speakerEn:'Lin Yu',
      text:'æˆ‘èƒ½åº”ä»˜å­¦æ ¡ã€‚',
      textEn:'I can handle school.',
      next:'s2_6'
    },
    s2_6: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'base',slot:'left'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'æˆ‘é—®çš„ä¸æ˜¯è¿™ä¸ªã€‚',
      textEn:'That wasn\'t my question.',
      next:'s2_7'
    },
    s2_7: {
      bg:'home',
      sprites:[{char:'linyu',pose:'sad',slot:'right'}],
      speaker:'æž—é›¨', speakerEn:'Lin Yu',
      text:'æ‰€ä»¥æˆ‘è¦åœ¨ä½ æŠŠæ—©é¤å˜æˆå®¡è®¯ä¹‹å‰ç¦»å¼€ã€‚',
      textEn:'And that\'s why I\'m leaving before you turn breakfast into an interrogation.',
      next:'s3_1'
    },

    /* ---------- åœºæ™¯3ï¼šæ ¡é—¨å£ ---------- */
    s3_1: {
      bg:'school', cg:'cg_school',
      sprites:[{char:'linyu',pose:'sad',slot:'left'},{char:'linxiao',pose:'base',slot:'right'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æ ¡é—¨å£ã€‚æž—éªçœ‹åˆ°æž—é›¨æ’•ç ´çš„è¢–å­ï¼Œä»¥åŠèµµå‡¯å¾—æ„çš„å‘Šåˆ«ã€‚',
      textEn:'At the school gate. Lin Xiao sees Lin Yu\'s torn sleeve and Zhao Kai\'s smug farewell.',
      next:'s3_2'
    },
    s3_2: {
      bg:'school',
      sprites:[{char:'linyu',pose:'sad',slot:'left'},{char:'zhaokai',pose:'base',slot:'right'}],
      speaker:'èµµå‡¯', speakerEn:'Zhao Kai',
      text:'æ˜Žå¤©è§ï¼Œæž—é›¨ã€‚',
      textEn:'See you tomorrow, Lin Yu.',
      next:'s3_3'
    },
    s3_3: {
      bg:'school',
      sprites:[{char:'linxiao',pose:'angry',slot:'right'},{char:'linyu',pose:'sad',slot:'left'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'ä»–æ˜¯è°ï¼Ÿ',
      textEn:'Who is he?',
      next:'s3_4'
    },
    s3_4: {
      bg:'school',
      sprites:[{char:'linyu',pose:'sad',slot:'left'}],
      speaker:'æž—é›¨', speakerEn:'Lin Yu',
      text:'æ²¡äººã€‚',
      textEn:'Nobody.',
      next:'s3_5'
    },
    s3_5: {
      bg:'school',
      sprites:[{char:'linxiao',pose:'angry',slot:'right'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'"æ²¡äºº"ç»™ä½ å¼„äº†è¿™ä¸ªä¼¤å£ï¼Ÿ',
      textEn:'Nobody gave you that cut?',
      next:'s3_6'
    },
    s3_6: {
      bg:'school',
      sprites:[{char:'linyu',pose:'sad',slot:'left'}],
      speaker:'æž—é›¨', speakerEn:'Lin Yu',
      text:'æ±‚ä½ åˆ«å˜æˆå¥‡æ€ªè€çˆ¸ã€‚',
      textEn:'Please don\'t become weird Dad.',
      next:'s3_7'
    },
    s3_7: {
      bg:'school',
      sprites:[{char:'linxiao',pose:'base',slot:'right'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'å®šä¹‰ä¸€ä¸‹"å¥‡æ€ª"ã€‚',
      textEn:'Define weird.',
      next:'s3_8'
    },
    s3_8: {
      bg:'school',
      sprites:[{char:'linyu',pose:'sad',slot:'left'}],
      speaker:'æž—é›¨', speakerEn:'Lin Yu',
      text:'å°±æ˜¯ä½ ç›¯ç€ä¸€ä¸ªåå…­å²å­©å­ï¼Œåƒåœ¨ç­–åˆ’ä»–è‘¬ç¤¼çš„é‚£ç§ç‰ˆæœ¬ã€‚',
      textEn:'The version where you stare at a sixteen-year-old like you\'re planning his funeral.',
      next:'s3_9'
    },
    s3_9: {
      bg:'school',
      sprites:[{char:'linxiao',pose:'angry',slot:'right'},{char:'linyu',pose:'sad',slot:'left'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æž—éªå¿…é¡»å†³å®šå¦‚ä½•å¤„ç†èµµå‡¯ã€‚',
      textEn:'Lin Xiao must decide how to handle Zhao Kai.',
      choices:[
        { label:'é€šè¿‡å­¦æ ¡ä¸¾æŠ¥èµµå‡¯ï¼ˆåˆæ³•ï¼‰', labelEn:'Report Zhao Kai through the school (lawful)', stats:{trust:+10, evidence:+5}, flag:{zhao:'report'}, next:'s4_1' },
        { label:'æ‚„æ‚„å¨èƒä»–', labelEn:'Quietly threaten him', stats:{revenge:+15, exposure:+10}, flag:{zhao:'threaten'}, next:'s4_1' },
        { label:'è®©æž—é›¨è‡ªå·±å¤„ç†', labelEn:'Let Lin Yu handle it', stats:{trust:+5}, flag:{zhao:'letgo'}, next:'s4_1' }
      ]
    },

    /* ---------- åœºæ™¯4ï¼šUç›˜ ---------- */
    s4_1: {
      bg:'home', cg:'cg_usb',
      sprites:[{char:'linyu',pose:'base',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'å½“æ™šï¼Œä»¥æž—é›¨çš„è§†è§’æ¸¸çŽ©ã€‚ä¸€ä¸ªæœªçŸ¥æ¥æºå°†Uç›˜æ‚„æ‚„å¡žè¿›äº†å¥¹çš„ä¹¦åŒ…ã€‚',
      textEn:'That evening, play as Lin Yu. An unknown source slipped a USB drive into her bag.',
      next:'s4_2'
    },
    s4_2: {
      bg:'home',
      sprites:[{char:'linyu',pose:'base',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æ–‡ä»¶åŒ…æ‹¬ï¼šå½’ä¹¡è¡ŒåŠ¨åå‘¨å¹´ã€é•œç³»ç»Ÿã€017å·å®žéªŒä½“ï¼Œä»¥åŠä¸€ä¸ªæŸåçš„"æ¢…æ™¨"ç›®å½•ã€‚',
      textEn:'Files include: HOMECOMING_10Y, MIRROR, SUBJECT_017, and a damaged MEI_CHEN directory.',
      next:'s4_3'
    },
    s4_3: {
      bg:'home',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'æž—é›¨', speakerEn:'Lin Yu',
      text:'çˆ¸â€¦â€¦ä½ åˆ°åº•åšäº†ä»€ä¹ˆï¼Ÿ',
      textEn:'Dadâ€¦ what did you do?',
      next:'s4_4'
    },
    s4_4: {
      bg:'home',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'017å·å®žéªŒä½“æ¡£æ¡ˆæ˜¾ç¤ºäº†èº«ç€æˆ˜æœ¯è£…å¤‡çš„æž—éªï¼Œä»£å·ï¼šæ¸¡é¸¦ã€‚æž—é›¨è¯•å›¾æ‰“å¼€æ¯äº²çš„æ–‡ä»¶ã€‚',
      textEn:'SUBJECT_017 displays Lin Xiao in tactical gear with CODENAME: RAVEN. Lin Yu tries to open her mother\'s file.',
      next:'s4_5'
    },
    s4_5: {
      bg:'home',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'ç³»ç»Ÿ', speakerEn:'System',
      text:'æ£€æµ‹åˆ°è¿œç¨‹è¿žæŽ¥ã€‚æ‘„åƒå¤´å·²æ¿€æ´»ã€‚',
      textEn:'REMOTE CONNECTION DETECTED. Webcam activated.',
      next:'s4_6'
    },
    s4_6: {
      bg:'home',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'å¤–é¢ï¼Œä¸€è¾†é»‘è‰²é¢åŒ…è½¦é©¶ç¦»ã€‚æž—é›¨çš„æ‰‹æœºæ”¶åˆ°ä¸€æ¡æœªçŸ¥å‘ä»¶äººçš„æ¶ˆæ¯ã€‚',
      textEn:'Outside, a black van pulls away. A message appears on Lin Yu\'s phone from an unknown sender.',
      next:'s4_7'
    },
    s4_7: {
      bg:'home',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'æœªçŸ¥å‘ä»¶äººï¼ˆHï¼‰', speakerEn:'Unknown (H)',
      text:'å¦‚æžœä½ æƒ³çŸ¥é“å…³äºŽä½ æ¯äº²çš„çœŸç›¸ï¼Œæ˜Žå¤©ä¸€ä¸ªäººæ¥ã€‚â€”â€”H',
      textEn:'IF YOU WANT THE TRUTH ABOUT YOUR MOTHER, COME ALONE TOMORROW. â€” H',
      next:'s5_1'
    },

    /* ---------- åœºæ™¯5ï¼šæœ€åŽçš„æ­£å¸¸å¤œæ™š ---------- */
    s5_1: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'base',slot:'left'},{char:'linyu',pose:'base',slot:'right'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'ä¸€ä¸ªå®‰é™çš„æ™šé¤åœºæ™¯ï¼Œåœ¨ä¸€åˆ‡æ¶ˆå¤±ä¹‹å‰ã€‚',
      textEn:'A quiet dinner scene before the disappearance.',
      next:'s5_2'
    },
    s5_2: {
      bg:'home',
      sprites:[{char:'linyu',pose:'base',slot:'right'}],
      speaker:'æž—é›¨', speakerEn:'Lin Yu',
      text:'çˆ¸ï¼Œå¦ˆå¦ˆåœ¨æˆ‘å‡ºç”Ÿå‰æ˜¯åšä»€ä¹ˆçš„ï¼Ÿ',
      textEn:'Dad, what did Mom do before I was born?',
      next:'s5_3'
    },
    s5_3: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'base',slot:'left'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'ä¸ºä»€ä¹ˆé—®è¿™ä¸ªï¼Ÿ',
      textEn:'Why?',
      next:'s5_4'
    },
    s5_4: {
      bg:'home',
      sprites:[{char:'linyu',pose:'base',slot:'right'}],
      speaker:'æž—é›¨', speakerEn:'Lin Yu',
      text:'ä½œä¸šã€‚',
      textEn:'Homework.',
      next:'s5_5'
    },
    s5_5: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'ä½ çš„ä½œä¸šé—®æˆ‘æ­»åŽ»çš„å¦»å­ï¼Ÿ',
      textEn:'Your homework asks about my dead wife?',
      next:'s5_6'
    },
    s5_6: {
      bg:'home',
      sprites:[{char:'linyu',pose:'base',slot:'right'}],
      speaker:'æž—é›¨', speakerEn:'Lin Yu',
      text:'å®¶æ—å²ã€‚',
      textEn:'Family history.',
      next:'s5_7'
    },
    s5_7: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'å¥¹åšç”µè„‘ç›¸å…³çš„å·¥ä½œï¼Œè®¨åŽŒè¢«æ‹ç…§ã€‚',
      textEn:'She worked with computers and hated being photographed.',
      next:'s5_8'
    },
    s5_8: {
      bg:'home',
      sprites:[{char:'linyu',pose:'sad',slot:'right'}],
      speaker:'æž—é›¨', speakerEn:'Lin Yu',
      text:'å¥¹æœ‰æ²¡æœ‰éª—è¿‡ä½ ï¼Ÿ',
      textEn:'Did she ever lie to you?',
      next:'s5_9'
    },
    s5_9: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'æ¯ä¸ªäººéƒ½ä¼šæ’’è°Žã€‚',
      textEn:'Everyone lies.',
      next:'s5_10'
    },
    s5_10: {
      bg:'home',
      sprites:[{char:'linyu',pose:'sad',slot:'right'}],
      speaker:'æž—é›¨', speakerEn:'Lin Yu',
      text:'çœŸè®©äººå®‰å¿ƒã€‚',
      textEn:'That\'s comforting.',
      next:'s5_11'
    },
    s5_11: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'é‡è¦çš„é—®é¢˜æ˜¯ä¸ºä»€ä¹ˆã€‚',
      textEn:'The important question is why.',
      next:'s5_12'
    },
    s5_12: {
      bg:'home',
      sprites:[{char:'linyu',pose:'sad',slot:'right'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æž—é›¨å‡è§†ç€ä»–ï¼ŒçŸ¥é“ä»–ä¹Ÿåœ¨æ’’è°Žã€‚',
      textEn:'Lin Yu studies him, knowing he is lying too.',
      next:'s6_1'
    },

    /* ---------- åœºæ™¯6ï¼šå¤±è¸ª ---------- */
    s6_1: {
      bg:'school',
      sprites:[{char:'linxiao',pose:'sad',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'ç¬¬äºŒå¤©ä¸‹åˆï¼Œæž—éªæ”¶åˆ°ä¸€æ¡æ¶ˆæ¯ï¼š"çˆ¸ï¼Œæˆ‘åœ¨å­¦æ ¡ç•™æ™šä¸€ç‚¹ï¼Œåˆ«ç­‰æˆ‘ã€‚"',
      textEn:'The next afternoon, Lin Xiao receives: "Dad, staying late at school. Don\'t wait."',
      next:'s6_2'
    },
    s6_2: {
      bg:'school',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'ä¸å¯¹ã€‚å¥¹å¹³æ—¶å«æˆ‘"è€æž—"ã€‚',
      textEn:'Something\'s wrong. She normally calls me "Old Lin."',
      next:'s6_3'
    },
    s6_3: {
      bg:'school',
      sprites:[{char:'linxiao',pose:'sad',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'åœ¨å­¦æ ¡ï¼Œä»–æ‰¾åˆ°äº†å¥¹è¢«ç ¸ç¢Žçš„æ‰‹æœºã€èƒŒåŒ…ï¼Œä»¥åŠç ´ç¢Žçš„é»‘ç¾½æ ‡è®°ã€‚',
      textEn:'At school he finds her smashed phone, backpack, and the broken-black-feather mark.',
      next:'s6_4'
    },
    s6_4: {
      bg:'school',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'æ‰­æ›²çš„å£°éŸ³', speakerEn:'Distorted Voice',
      text:'ä½ å¥½ï¼Œæ¸¡é¸¦ã€‚',
      textEn:'Hello, Raven.',
      next:'s6_5'
    },
    s6_5: {
      bg:'school',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'æˆ‘å¥³å„¿åœ¨å“ªï¼Ÿ',
      textEn:'Where is my daughter?',
      next:'s6_6'
    },
    s6_6: {
      bg:'school',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'æ‰­æ›²çš„å£°éŸ³', speakerEn:'Distorted Voice',
      text:'æ´»ç€ã€‚æˆ‘ä»¬éœ€è¦å¥¹æºå¸¦çš„ä¸œè¥¿ã€‚',
      textEn:'Alive. We need what she carries.',
      next:'s6_7'
    },
    s6_7: {
      bg:'school',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'å¥¹åªæ˜¯ä¸ªå­©å­ã€‚',
      textEn:'She\'s a child.',
      next:'s6_8'
    },
    s6_8: {
      bg:'school',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'æ‰­æ›²çš„å£°éŸ³', speakerEn:'Distorted Voice',
      text:'ä¸ã€‚å¥¹æ˜¯ä¸€æŠŠé’¥åŒ™ã€‚',
      textEn:'No. She\'s a key.',
      next:'s7_1'
    },

    /* ================================================================
       ACT II â€” RAVEN RETURNS
       ================================================================ */

    /* ---------- åœºæ™¯7ï¼šCCTVç›‘æŽ§ï¼ˆå°æ¸¸æˆ1ï¼‰ ---------- */
    s7_1: {
      bg:'server',
      sprites:[{char:'sulan',pose:'focused',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'è‹å²šæŽ¥å…¥äº†å­¦æ ¡å‘¨è¾¹çš„ç›‘æŽ§æœåŠ¡å™¨ã€‚å¥¹å¿…é¡»ç»•è¿‡é˜²ç«å¢™ï¼Œä¸Šä¼ å…¥ä¾µåºåˆ—ï¼Œæ‰èƒ½è°ƒå–å…­ä¸ªæ‘„åƒå¤´çš„å®Œæ•´å½•åƒã€‚',
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
      speaker:'è‹å²š', speakerEn:'Su Lan',
      text:'å…¥ä¾µæˆåŠŸã€‚å®Œæ•´å½•åƒæ‹¿åˆ°äº†â€”â€”æž—é›¨ç‹¬è‡ªç¦»å¼€å­¦æ ¡ï¼Œè‡ªæ„¿ä¸Žå®˜æ–¹è®°å½•å·²æ­»äº¡å…«å¹´çš„ä½•äº®åšå£«è§é¢ã€‚ä»–ç»™å¥¹çœ‹äº†ä¸€å¼ æ¢…çš„ç…§ç‰‡ã€‚ç¬¬äºŒè¾†è½¦åˆ°è¾¾ï¼Œè’™é¢äººè¢­å‡»äº†ä½•åšå£«å¹¶å¸¦èµ°äº†æž—é›¨ã€‚è½¦ç‰ŒLH-0719ï¼Œæ´›ä¼¦ç‰©æµè´´çº¸ã€‚',
      textEn:'Breach successful. Got the full footage â€” Lin Yu leaves school alone, voluntarily meets Dr. He Liang (officially dead eight years). He shows her a photo of Mei. A second vehicle arrives; masked men attack Dr. He and seize Lin Yu. Plate LH-0719, a Loren logistics sticker.',
      stats:{evidence:+20},
      next:'s8_1'
    },
    s7_fail: {
      bg:'server',
      sprites:[{char:'sulan',pose:'base',slot:'center'}],
      speaker:'è‹å²š', speakerEn:'Su Lan',
      text:'é˜²ç«å¢™æŠŠæˆ‘è¸¢å‡ºæ¥äº†ã€‚åªæ‹¿åˆ°ä¸€æ®µä¸å®Œæ•´çš„ç”»é¢â€”â€”æž—é›¨ä¸Šäº†ä¸€è¾†é»‘è‰²åŽ¢å¼è½¦ï¼Œä½†æœ‰ä¸‰ä¸ªå¯èƒ½çš„ä»“åº“ä½ç½®ã€‚',
      textEn:'The firewall kicked me out. Only got partial footage â€” Lin Yu entered a black van, but there are three possible warehouse locations.',
      stats:{exposure:+10},
      next:'s8_1'
    },

    /* ---------- åœºæ™¯8ï¼šæ­£å¸¸æ‰‹æ®µå¤±æ•ˆ ---------- */
    s8_1: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'base',slot:'left'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æž—éªé¦–å…ˆå°è¯•ä½¿ç”¨æ­£è§„æ¸ é“ã€‚ä¸€åè­¦æŽ¢è¯´å­¦æ ¡ç›‘æŽ§å·²æŸåï¼Œè®©ä»–å›žå®¶ç­‰ã€‚',
      textEn:'Lin Xiao first tries official channels. A detective says the school footage is corrupted and tells him to go home and wait.',
      next:'s8_2'
    },
    s8_2: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'è­¦æŽ¢', speakerEn:'Detective',
      text:'æž—å…ˆç”Ÿï¼Œå›žå®¶å§ã€‚æˆ‘ä»¬ä¼šæ‰“ç”µè¯ç»™ä½ ã€‚',
      textEn:'Mr. Lin, go home. We\'ll call you.',
      next:'s8_3'
    },
    s8_3: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'ä½ å·²ç»çŸ¥é“æˆ‘æ˜¯è°äº†ã€‚',
      textEn:'You already know who I am.',
      next:'s8_4'
    },
    s8_4: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'è­¦æŽ¢', speakerEn:'Detective',
      text:'æˆ‘çŸ¥é“ä½ æ˜¯ä¸ªç„¦æ€¥çš„çˆ¶äº²ã€‚',
      textEn:'I know you\'re a worried father.',
      next:'s8_5'
    },
    s8_5: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'æˆ‘é—®çš„ä¸æ˜¯è¿™ä¸ªã€‚',
      textEn:'That isn\'t what I asked.',
      next:'s8_6'
    },
    s8_6: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æž—éªæ³¨æ„åˆ°è­¦æŽ¢æ”¶åˆ°ä¸€æ¡å¸¦æœ‰é»‘ç¾½å›¾æ ‡çš„æ¶ˆæ¯ï¼Œç„¶åŽæ‚„æ‚„åˆ é™¤äº†å®ƒã€‚åœ¨åœè½¦åœºï¼Œä»–çœ‹åˆ°è­¦æŽ¢åœ¨æ‹ä»–çš„è½¦ã€‚',
      textEn:'Lin Xiao notices the detective receive a message with the black-feather icon, then quietly delete it. In the parking lot, he sees the detective photographing his car.',
      next:'s9_1'
    },

    /* ---------- åœºæ™¯9ï¼šæ‰“å¼€ç›’å­ ---------- */
    s9_1: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'sad',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'åªæœ‰çŽ°åœ¨ï¼Œæž—éªæ‰ç¡®å®šæ­£å¸¸æ‰‹æ®µå·²ç»è¢«æ¸—é€ã€‚ä»–æ‰“å¼€ä¹¦æž¶åŽé¢çš„éšè—æš—æ ¼ã€‚',
      textEn:'Only now does Lin Xiao decide normal methods are compromised. He opens the hidden cache behind his bookshelf.',
      next:'s9_2'
    },
    s9_2: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'sad',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'å¾½ç« ã€åŠ å¯†æ— çº¿ç”µã€æ—§é…æžªã€æˆ˜æœ¯åˆ€ã€å½’ä¹¡è¡ŒåŠ¨çš„ç…§ç‰‡ã€‚',
      textEn:'Badge, encrypted radio, old sidearm, field knife, the Homecoming photograph.',
      next:'s9_3'
    },
    s9_3: {
      bg:'home',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'æœ€åŽä¸€æ¬¡ã€‚',
      textEn:'One last time.',
      next:'s10_1'
    },

    /* ---------- åœºæ™¯10ï¼šä»“åº“æœå¯» ---------- */
    s10_1: {
      bg:'bunker', cg:'cg_warehouse',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æž—éªæ½œå…¥ä»“åº“ã€‚å±‹é¡¶è¿›å…¥ã€è£…å¸åŒºæ–­ç”µã€æˆ–ç›´æŽ¥çªå…¥ã€‚é¿å…ä¸å¿…è¦çš„ä¼¤äº¡å¯ä»¥é™ä½Žå¤ä»‡å€¼ã€‚',
      textEn:'Lin Xiao infiltrates the warehouse using roof access, loading bay blackout, or direct entry. Avoiding unnecessary casualties lowers Revenge.',
      next:'s10_2'
    },
    s10_2: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'ä»–æ‰¾åˆ°äº†ç›‘æŽ§ç”»é¢ä¸­å—ä¼¤çš„ä½•åšå£«ï¼Œä»–å‡ ä¹Žå¤±åŽ»æ„è¯†ã€‚',
      textEn:'He finds an injured Dr. He from the CCTV footage, barely conscious.',
      next:'s10_3'
    },
    s10_3: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'},{char:'drhe',pose:'base',slot:'right'}],
      speaker:'ä½•äº®åšå£«', speakerEn:'Dr. He',
      text:'æ¸¡é¸¦â€¦â€¦ä½ å¥³å„¿é—®çš„é—®é¢˜æ¯”ä½ æ›¾ç»é—®çš„éƒ½å¥½ã€‚',
      textEn:'Ravenâ€¦ your daughter asked better questions than you ever did.',
      next:'s10_4'
    },
    s10_4: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'å¥¹åœ¨å“ªï¼Ÿ',
      textEn:'Where is she?',
      next:'s10_5'
    },
    s10_5: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'},{char:'drhe',pose:'base',slot:'right'}],
      speaker:'ä½•äº®åšå£«', speakerEn:'Dr. He',
      text:'è¢«è½¬ç§»äº†ã€‚ä»–ä»¬çŸ¥é“ä½ ä¼šæ‰¾åˆ°è¿™ä¸ªåœ°æ–¹ã€‚',
      textEn:'Moved. They knew you\'d find this place.',
      next:'s10_6'
    },
    s10_6: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'ä¸€åå®ˆå«æåˆ°"071å·å®žéªŒä½“"å’Œ"ç¬¬äºŒæŠŠé’¥åŒ™"ã€‚æž—éªåˆ°è¾¾ä¸€é—´å…³æŠ¼å®¤â€”â€”åªæ‰¾åˆ°æž—é›¨çš„å¤–å¥—ï¼Œä»¥åŠå¥¹åœ¨å¦ä¸€ä¸ªè®¾æ–½çš„å®žæ—¶è§†é¢‘ç”»é¢ã€‚',
      textEn:'A guard mentions "Subject 071" and "the second key." Lin Xiao reaches a holding roomâ€”only to find Lin Yu\'s jacket and a live video feed of her in another facility.',
      next:'s10_7'
    },
    s10_7: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'center'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'é›¨é›¨ï¼',
      textEn:'Yu Yu!',
      next:'s10_8'
    },
    s10_8: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æž—é›¨ä¼¼ä¹Žå¬åˆ°äº†ä»–ï¼Œçœ‹å‘æ‘„åƒå¤´ã€‚ç”»é¢ä¸­æ–­ã€‚è¿™æ˜¯è™šå‡çš„æ•‘æ´ï¼šçŽ©å®¶è¶³å¤ŸæŽ¥è¿‘ä»¥ä¸ºå¥¹åœ¨è¿™é‡Œï¼Œå´å‘çŽ°ä»“åº“åªæ˜¯è¯±é¥µã€‚',
      textEn:'Lin Yu looks toward the camera as if she hears him. The feed cuts. This is the false rescue: the player gets close enough to believe she is here, then learns the warehouse was bait.',
      stats:{exposure:+10},
      next:'s11_1'
    },

    /* ---------- åœºæ™¯11ï¼šå®¡è®¯ ---------- */
    s11_1: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'kidnapper',pose:'base',slot:'right'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æž—éªå®¡è®¯ä¸€åè¢«ä¿˜çš„ç‰©æµå®˜å‘˜ï¼Œä½¿ç”¨è¯æ®å¡ç‰‡è€Œéžç®€å•çš„å¨èƒè®¡é‡ã€‚',
      textEn:'Lin Xiao interrogates a captured logistics officer using evidence cards instead of a simple threat meter.',
      next:'s11_mg'
    },
    s11_mg: {
      type:'minigame3',
      nextSuccess:'s11_2',
      nextFail:'s11_2'
    },
    s11_2: {
      bg:'bunker',
      sprites:[{char:'kidnapper',pose:'base',slot:'right'}],
      speaker:'ç‰©æµå®˜å‘˜', speakerEn:'Logistics Officer',
      text:'æˆ‘ä»¬æ²¡æœ‰é€‰æ‹©é‚£ä¸ªå¥³å­©ã€‚æˆ‘ä»¬è¢«å‘ŠçŸ¥è¦æ´»æ‰071å·å®žéªŒä½“ã€‚',
      textEn:'We didn\'t choose the girl. We were told to retrieve Subject 071 alive.',
      next:'s11_3'
    },
    s11_3: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'æ˜¯èµµç»´å…‹å¤šä¸‹çš„ä»¤ï¼Ÿ',
      textEn:'By Victor Zhao?',
      next:'s11_4'
    },
    s11_4: {
      bg:'bunker',
      sprites:[{char:'kidnapper',pose:'base',slot:'right'}],
      speaker:'ç‰©æµå®˜å‘˜', speakerEn:'Logistics Officer',
      text:'æˆ‘ä»Žæ²¡å¬è¿‡è¿™ä¸ªåå­—ã€‚æŽˆæƒæ¯”æ´›ä¼¦æ›´å¤è€ã€‚',
      textEn:'I never heard that name. The authorization was older than Loren.',
      stats:{evidence:+15},
      next:'s12_1'
    },

    /* ---------- åœºæ™¯12ï¼šæ­»åŽ»çš„æ­æ¡£ ---------- */
    s12_1: {
      bg:'safehouse', cg:'cg_guchen',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'guchen',pose:'base',slot:'right'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'ä¸€æ®µåŠ å¯†æ— çº¿ç”µä¿¡å·å°†æž—éªå¼•åˆ°ä¸€é—´åºŸå¼ƒæ‹³å‡»é¦†ï¼Œé¡¾æ™¨æ­£åœ¨é‚£é‡Œç­‰ä»–ã€‚',
      textEn:'A coded radio signal leads Lin Xiao to an abandoned boxing gym, where Gu Chen is waiting.',
      next:'s12_2'
    },
    s12_2: {
      bg:'safehouse',
      sprites:[{char:'guchen',pose:'base',slot:'right'}],
      speaker:'é¡¾æ™¨', speakerEn:'Gu Chen',
      text:'ä½ è¿Ÿåˆ°äº†ã€‚',
      textEn:'You\'re late.',
      next:'s12_3'
    },
    s12_3: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'ä½ æ­»äº†ã€‚',
      textEn:'You\'re dead.',
      next:'s12_4'
    },
    s12_4: {
      bg:'safehouse',
      sprites:[{char:'guchen',pose:'base',slot:'right'}],
      speaker:'é¡¾æ™¨', speakerEn:'Gu Chen',
      text:'é‚£ä¸ªä¹Ÿæ˜¯ã€‚',
      textEn:'That too.',
      next:'s12_5'
    },
    s12_5: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'guchen',pose:'fierce',slot:'right'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'æˆ‘å¦»å­æ­»äº†ã€‚ä½ æ¶ˆå¤±äº†ã€‚çŽ°åœ¨æˆ‘å¥³å„¿ä¹Ÿä¸è§äº†ã€‚',
      textEn:'My wife died. You disappeared. Now my daughter is gone.',
      next:'s12_6'
    },
    s12_6: {
      bg:'safehouse',
      sprites:[{char:'guchen',pose:'fierce',slot:'right'}],
      speaker:'é¡¾æ™¨', speakerEn:'Gu Chen',
      text:'é‚£æ²ˆç»ˆäºŽæ‰¾åˆ°äº†ç¬¬äºŒæŠŠé’¥åŒ™ã€‚',
      textEn:'Then Shen finally found the second key.',
      next:'s12_7'
    },
    s12_7: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'æ²ˆå·²ç»é€€ä¼‘äº†ã€‚',
      textEn:'Shen is retired.',
      next:'s12_8'
    },
    s12_8: {
      bg:'safehouse',
      sprites:[{char:'guchen',pose:'fierce',slot:'right'}],
      speaker:'é¡¾æ™¨', speakerEn:'Gu Chen',
      text:'é‚£æ˜¯ä»–æƒ³è®©ä½ ç›¸ä¿¡çš„ã€‚å½’ä¹¡è¡ŒåŠ¨çš„ç›®æ ‡æ˜¯ç ”ç©¶äººå‘˜ï¼Œä¸æ˜¯ææ€–åˆ†å­ã€‚é‚£ä¸ªé¡¹ç›®å«"é•œ"ã€‚',
      textEn:'That\'s what he wanted you to believe. Homecoming targeted researchers, not terrorists. The project was called Mirror.',
      stats:{evidence:+15, trust:+10},
      next:'s13_1'
    },

    /* ---------- åœºæ™¯13ï¼šè‹å²š ---------- */
    s13_1: {
      bg:'safehouse',
      sprites:[{char:'sulan',pose:'focused',slot:'left'},{char:'linxiao',pose:'base',slot:'center'},{char:'guchen',pose:'base',slot:'right'}],
      speaker:'è‹å²š', speakerEn:'Su Lan',
      text:'ä¸ã€‚',
      textEn:'No.',
      next:'s13_2'
    },
    s13_2: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'base',slot:'center'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'æˆ‘è¿˜æ²¡é—®å‘¢ã€‚',
      textEn:'I haven\'t asked yet.',
      next:'s13_3'
    },
    s13_3: {
      bg:'safehouse',
      sprites:[{char:'sulan',pose:'focused',slot:'left'}],
      speaker:'è‹å²š', speakerEn:'Su Lan',
      text:'ä½ æŠŠé¡¾æ™¨ä»Žæ­»äººå †é‡Œå¸¦å›žæ¥ï¼Œè¿˜å¸¦äº†æŠŠæžªè¿›æˆ‘å…¬å¯“ã€‚æˆ‘çŒœå¾—å¾ˆæœ‰æŠŠæ¡ã€‚',
      textEn:'You brought Gu Chen back from the dead and a gun into my apartment. I\'m comfortable guessing.',
      next:'s13_4'
    },
    s13_4: {
      bg:'safehouse',
      sprites:[{char:'guchen',pose:'base',slot:'right'}],
      speaker:'é¡¾æ™¨', speakerEn:'Gu Chen',
      text:'è§åˆ°ä½ ä¹Ÿå¾ˆé«˜å…´ã€‚',
      textEn:'Nice to see you too.',
      next:'s13_5'
    },
    s13_5: {
      bg:'safehouse',
      sprites:[{char:'sulan',pose:'focused',slot:'left'}],
      speaker:'è‹å²š', speakerEn:'Su Lan',
      text:'ä½ åªèƒ½è®²ä¸€ä¸ªå¤æ´»ç¬‘è¯ã€‚åˆšæ‰é‚£ä¸ªå°±æ˜¯äº†ã€‚',
      textEn:'You get one resurrection joke. That was it.',
      stats:{trust:+10},
      next:'s14_1'
    },

    /* ---------- åœºæ™¯14ï¼šå…¥ä¾µé•œç³»ç»Ÿï¼ˆå°æ¸¸æˆ2ï¼‰ ---------- */
    s14_1: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'base',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æž—éªéœ€è¦æ’¬å¼€é•œç»„ç»‡æ®ç‚¹çš„ä¿é™©ç®±ï¼ŒèŽ·å–æ ¸å¿ƒè®¿é—®å‡­è¯ã€‚æ’¬é’ˆã€æ‰­åŠ›æ‰³æ‰‹â€”â€”æ¯ä¸€æ¬¡è½¬åŠ¨éƒ½è€ƒéªŒè€å¿ƒä¸Žç²¾å‡†ã€‚',
      textEn:'Lin Xiao must pick the safe in the Mirror safehouse to retrieve core access credentials. Lockpick, tension wrench â€” every turn tests patience and precision.',
      next:'s14_mg'
    },
    s14_mg: {
      type:'minigame2',
      nextSuccess:'s14_ok',
      nextFail:'s14_fail'
    },
    s14_ok: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'base',slot:'center'},{char:'sulan',pose:'base',slot:'left'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'ä¿é™©ç®±å’”å“’ä¸€å£°æ‰“å¼€ã€‚æ ¸å¿ƒå‘çŽ°ä¸å¯é¿å…ï¼š017å·å®žéªŒä½“â€”â€”æž—éªâ€”â€”è®¿é—®ç»„ä»¶ä¸€ã€‚071å·å®žéªŒä½“â€”â€”æž—é›¨â€”â€”è®¿é—®ç»„ä»¶äºŒã€‚001å·å®žéªŒä½“â€”â€”æ¢…æ™¨â€”â€”çŠ¶æ€ï¼šæ´»è·ƒã€‚',
      textEn:'The safe clicks open. The core discovery is unavoidable: SUBJECT 017 â€” LIN XIAO â€” ACCESS COMPONENT ONE. SUBJECT 071 â€” LIN YU â€” ACCESS COMPONENT TWO. SUBJECT 001 â€” MEI CHEN â€” STATUS: ACTIVE.',
      stats:{evidence:+25},
      next:'s14_3'
    },
    s14_fail: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'sad',slot:'center'},{char:'sulan',pose:'base',slot:'left'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æ’¬é’ˆæ–­äº†ä¸‰æ ¹ï¼Œä¿é™©ç®±åªå¼€äº†ä¸€æ¡ç¼ã€‚017å·å’Œ071å·å®žéªŒä½“çš„ä¿¡æ¯è¢«å–å‡ºï¼Œä½†001å·å®žéªŒä½“çš„æ¡£æ¡ˆè¢«è¿œç¨‹æ“¦é™¤ã€‚',
      textEn:'Three picks snapped, the safe only cracked open. Subjects 017 and 071 were retrieved, but Subject 001\'s file was remotely wiped.',
      stats:{evidence:+10, exposure:+15},
      next:'s14_3'
    },
    s14_3: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'å¥¹æ­»äº†ã€‚',
      textEn:'She died.',
      next:'s14_4'
    },
    s14_4: {
      bg:'server',
      sprites:[{char:'sulan',pose:'focused',slot:'center'}],
      speaker:'è‹å²š', speakerEn:'Su Lan',
      text:'æ”¿åºœè®°å½•ä¸Šï¼Œæ˜¯çš„ã€‚ä½†æ ¹æ®é•œç³»ç»Ÿâ€¦â€¦å¥¹å››åå…«å°æ—¶å‰åˆšç™»å½•è¿‡ã€‚',
      textEn:'According to the government, yes. According to Mirror? She logged in forty-eight hours ago.',
      next:'s15_1'
    },

    /* ================================================================
       ACT III â€” THE PEOPLE BEHIND THE MIRROR
       ================================================================ */

    /* ---------- åœºæ™¯15ï¼š071å·å®žéªŒä½“ ---------- */
    s15_1: {
      bg:'server', cg:'cg_linyu',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'è§†è§’åˆ‡æ¢åˆ°æž—é›¨ï¼Œåœ¨ä¸€é—´ç ”ç©¶è®¾æ–½å†…ã€‚',
      textEn:'Switch to Lin Yu inside a research facility.',
      next:'s15_2'
    },
    s15_2: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'å®ˆå«1', speakerEn:'Guard 1',
      text:'071å·å®žéªŒä½“é†’äº†ã€‚',
      textEn:'Subject 071 is awake.',
      next:'s15_3'
    },
    s15_3: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'å®ˆå«2', speakerEn:'Guard 2',
      text:'æ²ˆè¯´ä¸è¦ç”¨é•‡é™å‰‚ã€‚æ¸¡é¸¦ä¼šæ¥çš„ã€‚',
      textEn:'Shen said no sedation. He\'ll come. Raven, I mean.',
      next:'s15_4'
    },
    s15_4: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'å®ˆå«1', speakerEn:'Guard 1',
      text:'é•œç³»ç»Ÿçš„é¢„æµ‹å‘¢ï¼Ÿ',
      textEn:'Mirror prediction?',
      next:'s15_5'
    },
    s15_5: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'å®ˆå«2', speakerEn:'Guard 2',
      text:'æ²¡æœ‰ã€‚ä»–æ˜¯å¥¹çˆ¶äº²ã€‚',
      textEn:'No. He\'s her father.',
      next:'s15_6'
    },
    s15_6: {
      bg:'server',
      sprites:[{char:'linyu',pose:'base',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æž—é›¨æ— æ³•åˆ¶æœå®ˆå«ã€‚å¥¹çˆ¬è¿‡ç»´ä¿®ç®¡é“ï¼Œåˆ¶é€ å¹²æ‰°ï¼Œå·å–é’¥åŒ™å¡å¹¶æ‹æ‘„æ–‡ä»¶ã€‚ç»ˆç«¯æ˜¾ç¤ºå¥¹æ˜¯"é•œç³»ç»Ÿè®¿é—®ç»„ä»¶â€”â€”æ´»è·ƒ"ã€‚è¿™ä¸€åˆ»ï¼Œæž—é›¨æ˜Žç™½å¥¹ä¸åªæ˜¯äººè´¨ã€‚',
      textEn:'Lin Yu cannot overpower guards. She crawls through maintenance shafts, creates distractions, steals a keycard and photographs files. A terminal identifies her as MIRROR ACCESS COMPONENT â€” ACTIVE. This is the moment Lin Yu understands she is not merely leverage.',
      next:'s16_1'
    },

    /* ---------- åœºæ™¯16ï¼šM ---------- */
    s16_1: {
      bg:'server',
      sprites:[{char:'linyu',pose:'base',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'é—¨å¼€å§‹è¿œç¨‹æ‰“å¼€ã€‚é™„è¿‘çš„ç›‘è§†å™¨ä¸Šå‡ºçŽ°æ¶ˆæ¯ã€‚',
      textEn:'Doors begin opening remotely. Messages appear on nearby monitors.',
      next:'s16_2'
    },
    s16_2: {
      bg:'server',
      sprites:[{char:'linyu',pose:'base',slot:'center'}],
      speaker:'M', speakerEn:'M',
      text:'ç»§ç»­èµ°ã€‚',
      textEn:'KEEP MOVING.',
      next:'s16_3'
    },
    s16_3: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'æž—é›¨', speakerEn:'Lin Yu',
      text:'ä½ æ˜¯è°ï¼Ÿ',
      textEn:'WHO ARE YOU?',
      next:'s16_4'
    },
    s16_4: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'M', speakerEn:'M',
      text:'ä¸€ä¸ªæ¬ ä½ çœŸç›¸çš„äººã€‚',
      textEn:'SOMEONE WHO OWES YOU THE TRUTH.',
      next:'s16_5'
    },
    s16_5: {
      bg:'server',
      sprites:[{char:'linyu',pose:'base',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æž—é›¨å¯ä»¥ä¿¡ä»»Mçš„æŒ‡å¼•ï¼Œæˆ–å¿½ç•¥æ–¹å‘èµ°æ›´è‰°éš¾çš„è·¯ã€‚ä¿¡ä»»å½±å“æ¢…ä¹‹åŽçš„å…³ç³»å€¼ã€‚',
      textEn:'Lin Yu may trust M or ignore directions and take a harder route. Trust affects Mei\'s later relationship score.',
      choices:[
        { label:'ä¿¡ä»»Mï¼Œè·ŸéšæŒ‡å¼•', labelEn:'Trust M, follow directions', stats:{trust:+15}, flag:{trustM:true}, next:'s16_6' },
        { label:'å¿½ç•¥Mï¼Œè‡ªå·±æ‰¾è·¯', labelEn:'Ignore M, find your own way', stats:{revenge:+5, exposure:+5}, flag:{trustM:false}, next:'s16_6' }
      ]
    },
    s16_6: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æž—é›¨å‘çŽ°ä¸€æ®µæŸåçš„å½•éŸ³ï¼Œæ˜¯åå¹´å‰æ¢…ä¸Žæ²ˆçš„äº‰è®ºã€‚',
      textEn:'Lin Yu finds a damaged recording of Mei arguing with Shen ten years ago.',
      next:'s16_7'
    },
    s16_7: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'æ¢…ï¼ˆå½•éŸ³ï¼‰', speakerEn:'Mei (recording)',
      text:'é¢„æµ‹ä¸æ˜¯æœ‰ç½ªã€‚',
      textEn:'Prediction is not guilt.',
      next:'s16_8'
    },
    s16_8: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'left'},{char:'shen',pose:'base',slot:'right'}],
      speaker:'æ²ˆï¼ˆå½•éŸ³ï¼‰', speakerEn:'Shen (recording)',
      text:'ä¸ã€‚é¢„æµ‹æ˜¯é¢„é˜²ã€‚',
      textEn:'No. Prediction is prevention.',
      next:'s16_9'
    },
    s16_9: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'æ¢…ï¼ˆå½•éŸ³ï¼‰', speakerEn:'Mei (recording)',
      text:'é‚£ä¹ˆæ€»æœ‰ä¸€å¤©ï¼Œä½ çš„ç³»ç»Ÿä¼šå› ä¸ºä¸€ä¸ªäººä»Žæœªåšå‡ºçš„é€‰æ‹©è€Œæƒ©ç½šä»–ã€‚',
      textEn:'Then one day your system will punish someone for a choice they never made.',
      next:'s17_1'
    },

    /* ---------- åœºæ™¯17ï¼šè¯æ®æ¿ I ---------- */
    s17_1: {
      bg:'safehouse',
      sprites:[{char:'sulan',pose:'focused',slot:'left'},{char:'linxiao',pose:'base',slot:'center'},{char:'guchen',pose:'base',slot:'right'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'å›žåˆ°è‹å²šçš„å®‰å…¨å±‹ï¼Œè¿žæŽ¥äººç‰©ã€å…¬å¸å’Œäº‹ä»¶ã€‚ä¸€ä¸ªçœ‹ä¼¼åˆç†ä½†ä¸å®Œæ•´çš„æŽ¨è®ºæŒ‡å‘èµµç»´å…‹å¤šå’Œæ´›ä¼¦é›†å›¢ã€‚',
      textEn:'Back at Su Lan\'s safehouse, connect people, companies and events. A plausible but incomplete theory points to Victor Zhao and Loren Group.',
      next:'s17_mg'
    },
    s17_mg: {
      type:'minigame4',
      nextSuccess:'s17_2',
      nextFail:'s17_2'
    },
    s17_2: {
      bg:'safehouse',
      sprites:[{char:'sulan',pose:'focused',slot:'left'}],
      speaker:'è‹å²š', speakerEn:'Su Lan',
      text:'å®Œç¾Žçš„è¯æ®æ¿è¿˜èƒ½è¯†åˆ«ä½•åšå£«æ˜¯å‰é•œç³»ç»Ÿå·¥ç¨‹å¸ˆï¼Œå¹¶æ­ç¤ºæœ‰äººä½¿ç”¨å±€é•¿çº§å‡­è¯åœ¨è¦†å†™æ´›ä¼¦çš„å‘½ä»¤ã€‚',
      textEn:'A perfect board also identifies Dr. He as a former Mirror engineer and reveals that someone with Director-level credentials has been overwriting Loren\'s commands.',
      stats:{evidence:+15},
      next:'s17_3'
    },
    s17_3: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'base',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æž—éªå¯ä»¥ç«‹å³è¿½æŸ¥ç»´å…‹å¤šï¼Œæˆ–å…ˆè°ƒæŸ¥å±€é•¿çº§å‡­è¯ã€‚ä¸¤æ¡è·¯çº¿æœ€ç»ˆæ±‡åˆï¼Œä½†ç¬¬ä¸€æ¡ä¼šåˆ¶é€ æ›´æˆå‰§æ€§çš„å‡åæ´¾å¯¹å³™ã€‚',
      textEn:'Lin Xiao can pursue Victor immediately or investigate the Director credential first. Both routes converge, but the first creates a more dramatic false-villain confrontation.',
      choices:[
        { label:'ç«‹å³è¿½æŸ¥èµµç»´å…‹å¤š', labelEn:'Pursue Victor Zhao immediately', stats:{exposure:+10}, flag:{route:'victor'}, next:'s18_1' },
        { label:'å…ˆè°ƒæŸ¥å±€é•¿çº§å‡­è¯', labelEn:'Investigate the Director credential first', stats:{evidence:+10}, flag:{route:'director'}, next:'s18_1' }
      ]
    },

    /* ---------- åœºæ™¯18ï¼šæ´›ä¼¦æ…ˆå–„æ™šå®´ ---------- */
    s18_1: {
      bg:'hq', cg:'cg_gala',
      sprites:[{char:'linxiao',pose:'base',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æ½œå…¥æ´›ä¼¦æ…ˆå–„æ™šå®´ã€‚ä¸‰æ¡è·¯çº¿ï¼šä¼ªé€ é‚€è¯·å‡½/ç¤¾äº¤å¯¹è¯ã€ä¿å®‰ä¼ªè£…ã€æˆ–ç»´ä¿®é€šé“ã€‚',
      textEn:'Infiltrate a Loren charity gala. Three routes: forged invitation/social dialogue, security disguise, or maintenance route.',
      next:'s18_2'
    },
    s18_2: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'base',slot:'left'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'å¯é€‰å¯¹è¯è®©èµµå‡¯æ›´äººæ€§åŒ–ã€‚ä»–æ‰¿è®¤æ¬ºè´Ÿæž—é›¨éƒ¨åˆ†æ˜¯å› ä¸ºå¥¹æ‹åˆ°äº†ä¸Žçˆ¶äº²æœ‰å…³çš„å—é™è´§ç‰©ã€‚å¦‚æžœæž—éªä¹‹å‰åˆæ³•å¤„ç†äº†æ ¡å›­äº‹ä»¶ï¼Œèµµå‡¯å¯ä»¥äº¤å‡ºä¸€å¼ é’¥åŒ™å¡ã€‚',
      textEn:'Optional conversations humanize Zhao Kai. He admits he bullied Lin Yu partly because she photographed restricted deliveries linked to his father. If Lin Xiao handled the school incident lawfully, Zhao Kai can hand over a keycard.',
      next:'s18_3'
    },
    s18_3: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'base',slot:'left'},{char:'zhaokai',pose:'base',slot:'right'}],
      speaker:'èµµå‡¯', speakerEn:'Zhao Kai',
      text:'ä½ ä»¥ä¸ºæˆ‘çˆ¸ä¼šå‘Šè¯‰æˆ‘ä»€ä¹ˆï¼Ÿä»–å‡ ä¹Žä¸çœ‹æˆ‘ï¼Œé™¤éžæˆ‘è®©ä»–ä¸¢è„¸ã€‚',
      textEn:'You think my father tells me anything? He barely looks at me unless I embarrass him.',
      next:'s18_4'
    },
    s18_4: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'zhaokai',pose:'base',slot:'right'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'ä½ è®©æˆ‘å¥³å„¿ä¸¢è„¸äº†ã€‚',
      textEn:'You embarrassed my daughter.',
      next:'s18_5'
    },
    s18_5: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'},{char:'zhaokai',pose:'base',slot:'right'}],
      speaker:'èµµå‡¯', speakerEn:'Zhao Kai',
      text:'æˆ‘çŸ¥é“ã€‚',
      textEn:'I know.',
      next:'s18_6'
    },
    s18_6: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'base',slot:'left'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æž—éªå¯ä»¥å¸®åŠ©èµµå‡¯é€ƒç¦»ä»–çˆ¶äº²çš„ä¿å®‰ã€æ— è§†ä»–ã€æˆ–åˆ©ç”¨ä»–ä½œä¸ºè¯±é¥µã€‚è¿™å½±å“è¯æ®ã€ä¿¡ä»»å’Œå¤ä»‡å€¼ã€‚',
      textEn:'Lin Xiao can help Zhao Kai escape his father\'s security detail, ignore him, or use him as bait. This affects Evidence, Trust and Revenge.',
      choices:[
        { label:'å¸®åŠ©èµµå‡¯é€ƒç¦»', labelEn:'Help Zhao Kai escape', stats:{trust:+15, evidence:+10}, flag:{zhaokai:'help'}, next:'s19_1' },
        { label:'æ— è§†èµµå‡¯', labelEn:'Ignore Zhao Kai', stats:{}, flag:{zhaokai:'ignore'}, next:'s19_1' },
        { label:'åˆ©ç”¨èµµå‡¯ä½œä¸ºè¯±é¥µ', labelEn:'Use Zhao Kai as bait', stats:{revenge:+15, evidence:+5}, flag:{zhaokai:'bait'}, next:'s19_1' }
      ]
    },

    /* ---------- åœºæ™¯19ï¼šé”™è¯¯çš„åæ´¾ ---------- */
    s19_1: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'victor',pose:'base',slot:'right'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æž—éªåœ¨ç§äººåŠžå…¬å®¤å µä½äº†èµµç»´å…‹å¤šã€‚',
      textEn:'Lin Xiao corners Victor Zhao in his private office.',
      next:'s19_2'
    },
    s19_2: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'victor',pose:'base',slot:'right'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'æž—é›¨åœ¨å“ªï¼Ÿ',
      textEn:'Where is Lin Yu?',
      next:'s19_3'
    },
    s19_3: {
      bg:'hq',
      sprites:[{char:'victor',pose:'base',slot:'right'}],
      speaker:'èµµç»´å…‹å¤š', speakerEn:'Victor Zhao',
      text:'ä¸åœ¨æˆ‘è¿™é‡Œã€‚',
      textEn:'Not with me.',
      next:'s19_4'
    },
    s19_4: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'victor',pose:'base',slot:'right'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'ä½ çš„å¡è½¦ã€‚ä½ çš„å®ˆå«ã€‚ä½ çš„é’±ã€‚',
      textEn:'Your trucks. Your guards. Your money.',
      next:'s19_5'
    },
    s19_5: {
      bg:'hq',
      sprites:[{char:'victor',pose:'base',slot:'right'}],
      speaker:'èµµç»´å…‹å¤š', speakerEn:'Victor Zhao',
      text:'æˆ‘çš„ç¬¼å­ã€‚ä¸æ˜¯æˆ‘çš„é‡Žå…½ã€‚',
      textEn:'My cage. Not my animal.',
      next:'s19_6'
    },
    s19_6: {
      bg:'hq',
      sprites:[{char:'victor',pose:'base',slot:'right'}],
      speaker:'èµµç»´å…‹å¤š', speakerEn:'Victor Zhao',
      text:'æ´›ä¼¦å¸®åŠ©å·¥ä¸šåŒ–äº†é•œç³»ç»Ÿï¼Œä»¥ä¸ºå®ƒä¼šä½œä¸ºå›½å®¶å®‰å…¨ç³»ç»Ÿè¢«å‡ºå”®ã€‚æ²ˆé€æ¸å¤ºå–äº†é¢„æµ‹å¼•æ“Žå’Œå®žéªŒä½“æ•°æ®åº“çš„æŽ§åˆ¶æƒã€‚',
      textEn:'Loren helped industrialize Mirror, believing it would be sold as a national-security system. Shen gradually took control of its prediction engine and subject database.',
      next:'s19_7'
    },
    s19_7: {
      bg:'hq',
      sprites:[{char:'victor',pose:'base',slot:'right'}],
      speaker:'èµµç»´å…‹å¤š', speakerEn:'Victor Zhao',
      text:'æˆ‘å»ºäº†å¢™ã€‚æ²ˆå†³å®šäº†è°è¯¥åœ¨å¢™é‡Œã€‚',
      textEn:'I built the walls. Shen decided who belonged inside them.',
      next:'s19_8'
    },
    s19_8: {
      bg:'hq',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'victor',pose:'base',slot:'right'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'ä¸ºä»€ä¹ˆæŠ“æˆ‘å¥³å„¿ï¼Ÿ',
      textEn:'Why take my daughter?',
      next:'s19_9'
    },
    s19_9: {
      bg:'hq',
      sprites:[{char:'victor',pose:'base',slot:'right'}],
      speaker:'èµµç»´å…‹å¤š', speakerEn:'Victor Zhao',
      text:'å› ä¸ºæ¢…ç¡®ä¿æ²¡æœ‰ä»»ä½•äººå¯ä»¥å•ç‹¬æ¿€æ´»åŽŸå§‹æ ¸å¿ƒã€‚å¥¹æ‹†åˆ†äº†æŽˆæƒã€‚åœ¨ä½ å’Œæž—é›¨ä¹‹é—´ã€‚',
      textEn:'Because Mei made sure no single person could activate the original core. She split the authorization. Between you and Lin Yu.',
      stats:{evidence:+20},
      next:'s19_10'
    },
    s19_10: {
      bg:'hq',
      sprites:[{char:'victor',pose:'base',slot:'right'}],
      speaker:'èµµç»´å…‹å¤š', speakerEn:'Victor Zhao',
      text:'æˆ‘ç»™ä½ ä¸€ä¸ªè®¾æ–½ä½ç½®â€”â€”ä¸æ˜¯å‡ºäºŽå–„æ„ï¼Œè€Œæ˜¯å› ä¸ºæ²ˆå·²ç»å¼€å§‹é¢„æµ‹å¹¶æ¸…é™¤æ´›ä¼¦çš„é«˜ç®¡äº†ã€‚',
      textEn:'I\'ll give you a facility locationâ€”not from kindness, but because Shen has begun predicting and eliminating Loren executives too.',
      next:'s20_1'
    },

    /* ---------- åœºæ™¯20ï¼šMçš„çœŸé¢ç›® ---------- */
    s20_1: {
      bg:'server', cg:'cg_mei',
      sprites:[{char:'linyu',pose:'sad',slot:'left'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æž—é›¨åˆ°è¾¾ç¬¬å››å±‚ï¼Œè¿›å…¥ä¸€é—´éšè—å®žéªŒå®¤ã€‚',
      textEn:'Lin Yu reaches Level 4 and enters a hidden laboratory.',
      next:'s20_2'
    },
    s20_2: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'æž—é›¨', speakerEn:'Lin Yu',
      text:'å¦ˆï¼Ÿ',
      textEn:'Mom?',
      next:'s20_3'
    },
    s20_3: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'æ¢…æ™¨', speakerEn:'Mei',
      text:'é›¨é›¨ã€‚',
      textEn:'Yu Yu.',
      next:'s20_4'
    },
    s20_4: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'æž—é›¨', speakerEn:'Lin Yu',
      text:'åˆ«è¿™ä¹ˆå«æˆ‘ã€‚',
      textEn:'Don\'t call me that.',
      next:'s20_5'
    },
    s20_5: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'æž—é›¨', speakerEn:'Lin Yu',
      text:'åä¸ªç”Ÿæ—¥ã€‚åå¹´æ¥çˆ¸çˆ¸å‡è£…æ²¡äº‹ã€‚æ¯æ¬¡æˆ‘é—®èµ·ä½ ï¼Œä½ éƒ½æ´»ç€ï¼Ÿ',
      textEn:'Ten birthdays. Ten years of Dad pretending he was okay. Every time I asked about you, you were alive?',
      next:'s20_6'
    },
    s20_6: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'æ¢…æ™¨', speakerEn:'Mei',
      text:'å¦‚æžœæˆ‘è”ç³»ä½ ï¼Œæ²ˆä¼šæ‰¾åˆ°ä½ çš„ã€‚',
      textEn:'If I contacted you, Shen would have found you.',
      next:'s20_7'
    },
    s20_7: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'æž—é›¨', speakerEn:'Lin Yu',
      text:'ä»–è¿˜æ˜¯æ‰¾åˆ°æˆ‘äº†ã€‚',
      textEn:'He found me anyway.',
      next:'s20_8'
    },
    s20_8: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'æ¢…æ™¨', speakerEn:'Mei',
      text:'æˆ‘çŸ¥é“ã€‚',
      textEn:'I know.',
      next:'s20_9'
    },
    s20_9: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'æž—é›¨', speakerEn:'Lin Yu',
      text:'ä¸ã€‚ä½ æ˜¯çŽ°åœ¨æ‰çŸ¥é“ã€‚',
      textEn:'No. You know now.',
      next:'s20_10'
    },
    s20_10: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'æ¢…æ™¨', speakerEn:'Mei',
      text:'æˆ‘ä»¥"M"çš„èº«ä»½ç•™åœ¨ç½‘ç»œé‡Œï¼Œç ´åé•œç³»ç»Ÿï¼Œä»Žè¿œå¤„å®ˆæŠ¤å®¶äººã€‚',
      textEn:'I stayed inside the network as "M" to sabotage Mirror and watch over the family from a distance.',
      next:'s20_11'
    },
    s20_11: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'left'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æž—é›¨æ‹’ç»ç«‹å³åŽŸè°…ã€‚',
      textEn:'Lin Yu refuses immediate forgiveness.',
      stats:{trust:+5},
      next:'s21_1'
    },

    /* ---------- åœºæ™¯21ï¼šç»™å®¶é‡Œçš„æ¶ˆæ¯ ---------- */
    s21_1: {
      bg:'server',
      sprites:[{char:'linyu',pose:'base',slot:'left'},{char:'sulan',pose:'focused',slot:'right'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æ¢…å¯ä»¥æ‰“å¼€ä¸€æ¡çŸ­æš‚çš„åŠ å¯†é€šé“ã€‚æž—é›¨å¿…é¡»å†³å®šç»™æž—éªå‘ä»€ä¹ˆï¼š"æˆ‘è¿˜æ´»ç€"ã€è®¾æ–½åæ ‡ã€æˆ–"å¦ˆå¦ˆè¿˜æ´»ç€"ã€‚',
      textEn:'Mei can open one short encrypted channel. Lin Yu must decide what to send Lin Xiao: "I\'m alive", the facility coordinates, or "Mom is alive."',
      choices:[
        { label:'å‘é€"æˆ‘è¿˜æ´»ç€"', labelEn:'Send "I\'m alive"', stats:{exposure:-5}, flag:{message:'alive'}, next:'s22_1' },
        { label:'å‘é€è®¾æ–½åæ ‡', labelEn:'Send the facility coordinates', stats:{evidence:+10}, flag:{message:'coords'}, next:'s22_1' },
        { label:'å‘é€"å¦ˆå¦ˆè¿˜æ´»ç€"', labelEn:'Send "Mom is alive"', stats:{trust:+15}, flag:{message:'mei'}, next:'s22_1' }
      ]
    },

    /* ---------- åœºæ™¯22ï¼šé¡¾æ™¨çš„å«Œç–‘ ---------- */
    s22_1: {
      bg:'safehouse',
      sprites:[{char:'sulan',pose:'focused',slot:'left'},{char:'linxiao',pose:'angry',slot:'center'},{char:'guchen',pose:'base',slot:'right'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'è‹å²šå‘çŽ°å½’ä¹¡è¡ŒåŠ¨çš„çˆ†ç ´æŽˆæƒä¸Šæœ‰é¡¾æ™¨çš„ç”Ÿç‰©ç‰¹å¾ç¡®è®¤ã€‚',
      textEn:'Su Lan discovers the Homecoming demolition authorization bears Gu Chen\'s biometric confirmation.',
      next:'s22_2'
    },
    s22_2: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'å‘Šè¯‰æˆ‘è¿™æ˜¯å‡çš„ã€‚',
      textEn:'Tell me it\'s fake.',
      next:'s22_3'
    },
    s22_3: {
      bg:'safehouse',
      sprites:[{char:'guchen',pose:'base',slot:'right'}],
      speaker:'é¡¾æ™¨', speakerEn:'Gu Chen',
      text:'ä¸æ˜¯ã€‚',
      textEn:'It isn\'t.',
      next:'s22_4'
    },
    s22_4: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'æ˜¯ä½ è§¦å‘çš„çˆ†ç‚¸ã€‚',
      textEn:'You triggered the explosion.',
      next:'s22_5'
    },
    s22_5: {
      bg:'safehouse',
      sprites:[{char:'guchen',pose:'base',slot:'right'}],
      speaker:'é¡¾æ™¨', speakerEn:'Gu Chen',
      text:'æ˜¯çš„ã€‚ä½ æ‹’ç»äº†å‘½ä»¤ã€‚æˆ‘æ²¡æœ‰ã€‚æˆ‘èŠ±äº†åå¹´æ‰æ˜Žç™½å…¶ä¸­çš„åŒºåˆ«ã€‚',
      textEn:'Yes. You refused the order. I didn\'t. I have spent ten years learning the difference.',
      next:'s22_6'
    },
    s22_6: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'æ¢…å½“æ—¶åœ¨é‡Œé¢ã€‚',
      textEn:'Mei was inside.',
      next:'s22_7'
    },
    s22_7: {
      bg:'safehouse',
      sprites:[{char:'guchen',pose:'base',slot:'right'}],
      speaker:'é¡¾æ™¨', speakerEn:'Gu Chen',
      text:'æˆ‘çŸ¥é“ã€‚',
      textEn:'I know.',
      next:'s22_8'
    },
    s22_8: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'é‚£ä½ ä¸ºä»€ä¹ˆè¿˜åœ¨è¿™é‡Œï¼Ÿ',
      textEn:'Then why are you still here?',
      next:'s22_9'
    },
    s22_9: {
      bg:'safehouse',
      sprites:[{char:'guchen',pose:'base',slot:'right'}],
      speaker:'é¡¾æ™¨', speakerEn:'Gu Chen',
      text:'å› ä¸ºä½ å¥³å„¿ä¸åº”è¯¥ä¸ºæˆ‘åšçš„äº‹ä»˜å‡ºä»£ä»·ã€‚',
      textEn:'Because your daughter shouldn\'t pay for what I did.',
      next:'s22_10'
    },
    s22_10: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'},{char:'guchen',pose:'base',slot:'right'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æž—éªå¿…é¡»å†³å®šå¦‚ä½•å¯¹å¾…é¡¾æ™¨ã€‚',
      textEn:'Lin Xiao must decide how to treat Gu Chen.',
      choices:[
        { label:'æœ‰æ¡ä»¶åœ°åŽŸè°…ä»–', labelEn:'Forgive him conditionally', stats:{trust:+20, evidence:+5}, flag:{guchen:'forgive'}, next:'s23_1' },
        { label:'æ‹’ç»ä»–', labelEn:'Reject him', stats:{}, flag:{guchen:'reject'}, next:'s23_1' },
        { label:'æ”»å‡»å¹¶æŠ›å¼ƒä»–', labelEn:'Attack and abandon him', stats:{revenge:+25, trust:-15}, flag:{guchen:'attack'}, next:'s23_1' }
      ]
    },

    /* ================================================================
       ACT IV â€” BREAK THE PREDICTION
       ================================================================ */

    /* ---------- åœºæ™¯23ï¼šå›žåˆ°å½’ä¹¡è¡ŒåŠ¨ ---------- */
    s23_1: {
      bg:'bunker',
      sprites:[{char:'sulan',pose:'focused',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'è‹å²šæ ¹æ®å­˜æ¡£ä¼ æ„Ÿå™¨æ•°æ®é‡å»ºäº†ç ”ç©¶ç«™ã€‚çŽ©å®¶æŽ§åˆ¶å¹´è½»çš„æž—éªç©¿è¿‡ä¸€æ®µç¢Žç‰‡åŒ–çš„è®°å¿†ã€‚',
      textEn:'Su Lan reconstructs the station from archived sensor data. Player controls young Lin Xiao through a fragmented memory.',
      next:'s23_mg'
    },
    s23_mg: {
      type:'minigame5',
      nextSuccess:'s23_2',
      nextFail:'s23_2'
    },
    s23_2: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'è¿™ä¸€æ¬¡ï¼ŒçŽ©å®¶çœ‹åˆ°äº†æž—éªé”™è¿‡çš„ä¸œè¥¿ï¼šæ¢…ç»™äº†ä½•åšå£«ä¸€ä»½é•œç³»ç»Ÿçš„ä¼¦ç†é”ï¼›æ²ˆçš„ç‰¹å·¥åœ¨æ¸¡é¸¦å°é˜Ÿä¹‹å‰è¿›å…¥ï¼›é¡¾æ™¨åœ¨æœä»Žä¸ƒå·åè®®å‰çŠ¹è±«äº†å¥½å‡ ç§’ã€‚',
      textEn:'This time the player sees what Lin Xiao missed: Mei gives Dr. He a copy of Mirror\'s ethical lock; Shen\'s agents enter before Raven Team; Gu Chen hesitates for several seconds before obeying Protocol Seven.',
      next:'s23_3'
    },
    s23_3: {
      bg:'bunker',
      sprites:[{char:'sulan',pose:'focused',slot:'center'}],
      speaker:'è‹å²š', speakerEn:'Su Lan',
      text:'ä»–ä¸åªæ˜¯æŽ©ç›–äº†è¡ŒåŠ¨ã€‚ä»–è®¾è®¡äº†ä½ çš„æ‚²ä¼¤ã€‚',
      textEn:'He didn\'t just cover up the operation. He designed your grief.',
      stats:{evidence:+20},
      next:'s23_4'
    },
    s23_4: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æž—éªæ— è¨€ä»¥å¯¹ã€‚',
      textEn:'Lin Xiao has no response.',
      next:'s24_1'
    },

    /* ---------- åœºæ™¯24ï¼šæ•‘æ´ä¹‹å‰ ---------- */
    s24_1: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'sad',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æž—éªä¸ºæž—é›¨å½•äº†ä¸€æ®µè¯ï¼Œä»¥é˜²è‡ªå·±æ— æ³•ç”Ÿè¿˜ã€‚',
      textEn:'Lin Xiao records a message for Lin Yu in case he does not survive.',
      next:'s24_2'
    },
    s24_2: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'sad',slot:'center'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'é›¨é›¨ã€‚æœ‰äº›äº‹æˆ‘æ—©è¯¥å‘Šè¯‰ä½ ã€‚æˆ‘ä»¥ä¸ºæ²‰é»˜èƒ½ä¿æŠ¤ä½ ã€‚ä¹Ÿè®¸å®ƒåªæ˜¯è®©ä½ å­¤ç‹¬ã€‚',
      textEn:'Yu Yu. There are things I should have told you. I thought silence kept you safe. Maybe it only kept you alone.',
      next:'s24_3'
    },
    s24_3: {
      bg:'safehouse',
      sprites:[{char:'linxiao',pose:'sad',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'çŽ©å®¶é€‰æ‹©å½•éŸ³çš„ç»“å°¾ã€‚',
      textEn:'The player chooses how he ends the recording.',
      choices:[
        { label:'"å¯¹ä¸èµ·ã€‚"', labelEn:'"I\'m sorry."', stats:{trust:+10}, flag:{recording:'sorry'}, next:'s25_1' },
        { label:'"æˆ‘ä¸ºä½ éª„å‚²ã€‚"', labelEn:'"I\'m proud of you."', stats:{trust:+15}, flag:{recording:'proud'}, next:'s25_1' },
        { label:'"ä¸è¦å˜æˆæˆ‘ã€‚"', labelEn:'"Don\'t become me."', stats:{revenge:-10, trust:+5}, flag:{recording:'dont'}, next:'s25_1' }
      ]
    },

    /* ---------- åœºæ™¯25ï¼šé•œç³»ç»Ÿè®¾æ–½ ---------- */
    s25_1: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æœ€ç»ˆæ½œå…¥ã€‚è·¯çº¿å—åˆ°æ•´ä¸ªæ¸¸æˆé€‰æ‹©çš„å½±å“ï¼šé«˜è¯æ®æ­ç¤ºç»´ä¿®åœ°å›¾å¹¶ç»•è¿‡ä¸€ä¸ªå®‰å…¨åŒºï¼›é«˜æš´éœ²å¢žåŠ æ‘„åƒå¤´å’Œæ­¦è£…å®ˆå«ï¼›é«˜ä¿¡ä»»è®©é¡¾æ™¨æˆ–è‹å²šè¿œç¨‹ååŠ©ï¼›é«˜å¤ä»‡å¯¼è‡´å®ˆå«æ›´å°‘æŠ•é™ï¼Œå› ä¸ºæ¸¡é¸¦çš„æš´åŠ›åå£°å·²ç»ä¼ å¼€ã€‚',
      textEn:'Final infiltration with route consequences from the entire game. High Evidence reveals maintenance maps; High Exposure adds cameras and armored guards; High Trust lets Gu Chen or Su Lan assist remotely; High Revenge causes guards to surrender less often because Raven\'s violent reputation has spread.',
      next:'s25_2'
    },
    s25_2: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'shen',pose:'base',slot:'right'}],
      speaker:'æ²ˆå±€é•¿ï¼ˆå¹¿æ’­ï¼‰', speakerEn:'Shen (PA)',
      text:'ä»“åº“é‡Œçš„ä¸‰ä¸ªå®ˆå«ã€‚æœ‰ä¸€ä¸ªæ±‚é¥¶äº†ã€‚ä½ è¿˜è®°å¾—è‡ªå·±é€‰äº†ä»€ä¹ˆã€‚',
      textEn:'Three guards in the warehouse. One begged. You remember what you chose.',
      next:'s25_3'
    },
    s25_3: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æ²ˆé€šè¿‡å¹¿æ’­æåŠçŽ©å®¶è¿‡åŽ»çš„å…·ä½“è¡Œä¸ºï¼Œè®©ç»ˆå±€æ„Ÿè§‰æ˜¯å¯¹çŽ©å®¶çš„å›žåº”è€Œéžé€šç”¨è„šæœ¬ã€‚',
      textEn:'Shen addresses specific past actions over the PA, making the finale feel reactive rather than generic.',
      next:'s26_1'
    },

    /* ---------- åœºæ™¯26ï¼šå®¶äºº ---------- */
    s26_1: {
      bg:'server', cg:'cg_family2',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'},{char:'linyu',pose:'base',slot:'right'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æž—éªæ‰¾åˆ°äº†æž—é›¨ï¼Œç„¶åŽçœ‹åˆ°æ¢…è¿˜æ´»ç€ã€‚',
      textEn:'Lin Xiao reaches Lin Yu and sees Mei alive.',
      next:'s26_2'
    },
    s26_2: {
      bg:'server',
      sprites:[{char:'linyu',pose:'base',slot:'right'}],
      speaker:'æž—é›¨', speakerEn:'Lin Yu',
      text:'çˆ¸ï¼',
      textEn:'Dad!',
      next:'s26_3'
    },
    s26_3: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'ä½ å—ä¼¤äº†å—ï¼Ÿ',
      textEn:'Are you hurt?',
      next:'s26_4'
    },
    s26_4: {
      bg:'server',
      sprites:[{char:'linyu',pose:'base',slot:'right'}],
      speaker:'æž—é›¨', speakerEn:'Lin Yu',
      text:'æˆ‘æ²¡äº‹ã€‚',
      textEn:'I\'m okay.',
      next:'s26_5'
    },
    s26_5: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'æˆ‘çœ‹ç€ä»–ä»¬åŸ‹è‘¬äº†ä½ ã€‚',
      textEn:'I watched them bury you.',
      next:'s26_6'
    },
    s26_6: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'æ¢…æ™¨', speakerEn:'Mei',
      text:'æˆ‘çŸ¥é“ã€‚',
      textEn:'I know.',
      next:'s26_7'
    },
    s26_7: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'æˆ‘å‘Šè¯‰æˆ‘ä»¬çš„å¥³å„¿ä½ æ­»äº†åå¹´ã€‚',
      textEn:'I told our daughter you were dead for ten years.',
      next:'s26_8'
    },
    s26_8: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'mei',pose:'base',slot:'right'}],
      speaker:'æ¢…æ™¨', speakerEn:'Mei',
      text:'å¦‚æžœæˆ‘å›žå®¶ï¼Œæ²ˆä¼šæ‰¾åˆ°ä½ ä»¬æ‰€æœ‰äººã€‚',
      textEn:'If I came home, Shen would have found all of you.',
      next:'s26_9'
    },
    s26_9: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'æ‰€ä»¥ä½ æ›¿æˆ‘ä»¬å†³å®šäº†ã€‚',
      textEn:'So you decided for us.',
      next:'s26_10'
    },
    s26_10: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'right'}],
      speaker:'æž—é›¨', speakerEn:'Lin Yu',
      text:'ä½æ‰‹ã€‚',
      textEn:'Stop.',
      next:'s26_11'
    },
    s26_11: {
      bg:'server',
      sprites:[{char:'linyu',pose:'sad',slot:'right'}],
      speaker:'æž—é›¨', speakerEn:'Lin Yu',
      text:'ä½ ä»¬ä¸¤ä¸ªä¸€ç›´åœ¨å†³å®šæˆ‘èƒ½çŸ¥é“ä»€ä¹ˆã€‚æˆ‘ä¸æ˜¯ä»»åŠ¡ã€‚ä¸æ˜¯è¯æ®ã€‚ä¸æ˜¯é•œç³»ç»Ÿçš„å®žéªŒä½“ã€‚æˆ‘æ˜¯ä½ ä»¬çš„å¥³å„¿ã€‚',
      textEn:'Both of you keep deciding what I\'m allowed to know. I\'m not a mission. I\'m not evidence. I\'m not one of Mirror\'s subjects. I\'m your daughter.',
      next:'s26_12'
    },
    s26_12: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'ä½ è¯´å¾—å¯¹ã€‚',
      textEn:'You\'re right.',
      next:'s26_13'
    },
    s26_13: {
      bg:'server',
      sprites:[{char:'linyu',pose:'base',slot:'right'}],
      speaker:'æž—é›¨', speakerEn:'Lin Yu',
      text:'æˆ‘çŸ¥é“ã€‚',
      textEn:'I know.',
      next:'s26_14'
    },
    s26_14: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'happy',slot:'left'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'çŸ­æš‚çš„ä¸€åˆ»ï¼Œæž—éªç¬‘äº†ã€‚ç„¶åŽè­¦æŠ¥å“èµ·ã€‚',
      textEn:'For one brief moment, Lin Xiao laughs. Then alarms begin.',
      next:'s27_1'
    },

    /* ---------- åœºæ™¯27ï¼šé•œç³»ç»Ÿæ¿€æ´» ---------- */
    s27_1: {
      bg:'server',
      sprites:[{char:'shen',pose:'base',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'è®¾æ–½ä¸­çš„æ¯ä¸ªå±å¹•éƒ½æ¿€æ´»äº†ã€‚æ²ˆå‡ºçŽ°äº†ã€‚',
      textEn:'Every screen in the facility activates. Shen appears.',
      next:'s27_2'
    },
    s27_2: {
      bg:'server',
      sprites:[{char:'shen',pose:'base',slot:'center'}],
      speaker:'æ²ˆå±€é•¿', speakerEn:'Shen',
      text:'ä»–æ¥äº†ã€‚æ¸¡é¸¦ã€‚',
      textEn:'There he is. Raven.',
      next:'s27_3'
    },
    s27_3: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'shen',pose:'base',slot:'right'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'é‚£ä¸ªäººåå¹´å‰å°±æ­»äº†ã€‚',
      textEn:'That man died ten years ago.',
      next:'s27_4'
    },
    s27_4: {
      bg:'server',
      sprites:[{char:'shen',pose:'base',slot:'right'}],
      speaker:'æ²ˆå±€é•¿', speakerEn:'Shen',
      text:'æ˜¯å—ï¼Ÿ',
      textEn:'Did he?',
      next:'s27_5'
    },
    s27_5: {
      bg:'server',
      sprites:[{char:'shen',pose:'base',slot:'center'}],
      speaker:'æ²ˆå±€é•¿', speakerEn:'Shen',
      text:'å±å¹•å›žæ”¾ç€çŽ©å®¶çš„çœŸå®žè¡Œä¸ºï¼šä»æ…ˆã€å¨èƒã€æ½œè¡Œã€å¤„å†³ã€æ•‘æ´ã€èƒŒå›ã€‚',
      textEn:'The screens replay actual player behavior: mercy, threats, stealth, executions, rescues, betrayals.',
      next:'s27_6'
    },
    s27_6: {
      bg:'server',
      sprites:[{char:'shen',pose:'base',slot:'right'}],
      speaker:'æ²ˆå±€é•¿', speakerEn:'Shen',
      text:'ä½ èŠ±äº†åå¹´å‡è£…æ™®é€šäººã€‚ç„¶åŽæˆ‘ç¢°äº†ä¸€ä¸ªä½ çˆ±çš„äººï¼Œé¢å…·å°±æ¶ˆå¤±äº†ã€‚',
      textEn:'You spent ten years pretending to be ordinary. Then I touched one person you loved and the mask disappeared.',
      next:'s27_7'
    },
    s27_7: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'shen',pose:'base',slot:'right'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'é•œç³»ç»Ÿæ²¡æœ‰é¢„æµ‹åˆ°è¿™ä¸ªã€‚ä»»ä½•çˆ¶äº²éƒ½ä¼šæ¥ã€‚',
      textEn:'Mirror didn\'t predict that. Any father would come.',
      next:'s27_8'
    },
    s27_8: {
      bg:'server',
      sprites:[{char:'shen',pose:'base',slot:'right'}],
      speaker:'æ²ˆå±€é•¿', speakerEn:'Shen',
      text:'ä¸æ˜¯åƒä½ è¿™æ ·ã€‚',
      textEn:'Not like you.',
      next:'s27_9'
    },
    s27_9: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'shen',pose:'base',slot:'right'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'é‚£ä½ ä¸ºä»€ä¹ˆè¿˜åœ¨è¯´è¯ï¼Ÿ',
      textEn:'Then why are you still talking?',
      next:'s27_10'
    },
    s27_10: {
      bg:'server',
      sprites:[{char:'shen',pose:'base',slot:'right'}],
      speaker:'æ²ˆå±€é•¿', speakerEn:'Shen',
      text:'ä»€ä¹ˆï¼Ÿ',
      textEn:'What?',
      next:'s27_11'
    },
    s27_11: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'shen',pose:'base',slot:'right'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'å¦‚æžœä½ å·²ç»çŸ¥é“æˆ‘è¦åšä»€ä¹ˆï¼Œä¸ºä»€ä¹ˆè¿˜æ²¡é˜»æ­¢æˆ‘ï¼Ÿ',
      textEn:'If you already know what I\'m going to do, why haven\'t you stopped me?',
      next:'s27_12'
    },
    s27_12: {
      bg:'server',
      sprites:[{char:'linyu',pose:'base',slot:'right'}],
      speaker:'æž—é›¨', speakerEn:'Lin Yu',
      text:'ä»–å®³æ€•äº†ã€‚',
      textEn:'He\'s afraid.',
      next:'s27_13'
    },
    s27_13: {
      bg:'server',
      sprites:[{char:'shen',pose:'base',slot:'right'}],
      speaker:'æ²ˆå±€é•¿', speakerEn:'Shen',
      text:'æ€•ä»€ä¹ˆï¼Ÿ',
      textEn:'Of what?',
      next:'s27_14'
    },
    s27_14: {
      bg:'server',
      sprites:[{char:'linyu',pose:'base',slot:'right'}],
      speaker:'æž—é›¨', speakerEn:'Lin Yu',
      text:'æ€•çŠ¯é”™ã€‚',
      textEn:'Being wrong.',
      next:'s28_1'
    },

    /* ---------- åœºæ™¯28ï¼šé•œç³»ç»Ÿé¢„æµ‹ ---------- */
    s28_1: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'angry',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'é•œç³»ç»Ÿé€‚åº”çŽ©å®¶çš„ä¸»å¯¼ä¹ æƒ¯ã€‚æ½œè¡Œåž‹çŽ©å®¶å‘çŽ°å¸¸ç”¨è—èº«å¤„è¢«æ‰«æï¼›æˆ˜æ–—åž‹çŽ©å®¶é¢å¯¹ç›¾ç‰Œå’Œäº¤å‰ç«åŠ›ï¼›é»‘å®¢åž‹çŽ©å®¶é‡åˆ°å‡ç»ˆç«¯å’Œæœ‰æ¯’æ·å¾„ã€‚çŽ©å®¶å¿…é¡»åˆ»æ„äº¤æ›¿ç§»åŠ¨ã€å¹²æ‰°ã€æˆ˜æ–—ã€é»‘å®¢å’Œæ’¤é€€ã€‚',
      textEn:'Mirror adapts to the player\'s dominant habits. Stealth-heavy players find favorite hiding spaces scanned; combat-heavy players face shields and crossfire; hacking-heavy players encounter fake terminals. Players must deliberately alternate movement, distraction, combat, hacking and retreat.',
      next:'s28_2'
    },
    s28_2: {
      bg:'server',
      sprites:[{char:'linyu',pose:'base',slot:'right'}],
      speaker:'æž—é›¨ï¼ˆæ— çº¿ç”µï¼‰', speakerEn:'Lin Yu (radio)',
      text:'åˆ«å†åšä½ å¹³æ—¶åšçš„äº‹ã€‚',
      textEn:'Stop doing what you normally do.',
      next:'s28_3'
    },
    s28_3: {
      bg:'server',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'ä½ åœ¨å«æˆ‘åšé”™è¯¯çš„å†³å®šï¼Ÿ',
      textEn:'You\'re telling me to make bad decisions?',
      next:'s28_4'
    },
    s28_4: {
      bg:'server',
      sprites:[{char:'linyu',pose:'base',slot:'right'}],
      speaker:'æž—é›¨ï¼ˆæ— çº¿ç”µï¼‰', speakerEn:'Lin Yu (radio)',
      text:'è¿™è¾ˆå­å°±è¿™ä¸€æ¬¡ï¼Œæ˜¯çš„ã€‚',
      textEn:'For once in your life, yes.',
      stats:{evidence:+10},
      next:'s28_mg'
    },
    s28_mg: {
      type:'minigame6',
      nextSuccess:'s29_1',
      nextFail:'s29_1'
    },

    /* ---------- åœºæ™¯29ï¼šå®ŒæˆçœŸç›¸ ---------- */
    s29_1: {
      bg:'safehouse',
      sprites:[{char:'sulan',pose:'focused',slot:'left'},{char:'linxiao',pose:'base',slot:'center'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'è¿›å…¥æ ¸å¿ƒä¹‹å‰ï¼Œé‡å»ºæ•´ä¸ªé˜´è°‹ã€‚',
      textEn:'Reconstruct the entire conspiracy before entering the core.',
      next:'s29_mg'
    },
    s29_mg: {
      type:'minigame7',
      nextSuccess:'s29_2',
      nextFail:'s29_2'
    },
    s29_2: {
      bg:'safehouse',
      sprites:[{char:'sulan',pose:'focused',slot:'left'}],
      speaker:'è‹å²š', speakerEn:'Su Lan',
      text:'æ¢… â†’ ä¸ºé•œç³»ç»Ÿåˆ›å»ºä¼¦ç†é”ã€‚æ²ˆ â†’ ç§˜å¯†å¤ºå–é¢„æµ‹å¼•æ“Žã€‚å½’ä¹¡è¡ŒåŠ¨ â†’ æ¶ˆç­ç ”ç©¶äººå‘˜çš„æŽ©ç›–ã€‚é¡¾æ™¨ â†’ æœä»Žçˆ†ç ´å‘½ä»¤ã€‚æž—éª â†’ ä¸çŸ¥æƒ…åœ°æºå¸¦å¯†é’¥ä¸€ã€‚æž—é›¨ â†’ ç»§æ‰¿å¯†é’¥äºŒã€‚ä½•åšå£« â†’ è”ç³»æž—é›¨æ­éœ²çœŸç›¸ã€‚æ´›ä¼¦ â†’ å»ºé€ åŸºç¡€è®¾æ–½ä½†å¤±åŽ»æŽ§åˆ¶æƒã€‚æ²ˆ â†’ ç­–åˆ’ç»‘æž¶ä»¥é‡èšä¸¤æŠŠé’¥åŒ™ã€‚',
      textEn:'Mei â†’ created the ethical lock. Shen â†’ secretly seized the prediction engine. Homecoming â†’ the cover-up to eliminate researchers. Gu Chen â†’ obeyed the demolition order. Lin Xiao â†’ unknowingly carried Key One. Lin Yu â†’ inherited Key Two. Dr. He â†’ contacted Lin Yu to expose the truth. Loren â†’ built infrastructure but lost control. Shen â†’ engineered the kidnapping to reunite both keys.',
      stats:{evidence:+15},
      next:'s30_1'
    },

    /* ---------- åœºæ™¯30ï¼šæœ€åŽçš„å‘½ä»¤ ---------- */
    s30_1: {
      bg:'bunker', cg:'cg_final',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'shen',pose:'base',slot:'right'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æž—éªè¿›å…¥é•œç³»ç»Ÿæ ¸å¿ƒã€‚æ²ˆæ²¡æœ‰å¸¦å†›é˜Ÿï¼Œç‹¬è‡ªç­‰å¾…ã€‚',
      textEn:'Lin Xiao enters the Mirror Core. Shen waits without an army.',
      next:'s30_2'
    },
    s30_2: {
      bg:'bunker',
      sprites:[{char:'shen',pose:'base',slot:'right'}],
      speaker:'æ²ˆå±€é•¿', speakerEn:'Shen',
      text:'ä½ è¿˜è®°å¾—ç¬¬ä¸€æ¬¡ä»»åŠ¡å—ï¼Ÿ',
      textEn:'Do you remember your first mission?',
      next:'s30_3'
    },
    s30_3: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'sad',slot:'left'},{char:'shen',pose:'base',slot:'right'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'æˆ‘åä¹å²ã€‚',
      textEn:'I was nineteen.',
      next:'s30_4'
    },
    s30_4: {
      bg:'bunker',
      sprites:[{char:'shen',pose:'base',slot:'right'}],
      speaker:'æ²ˆå±€é•¿', speakerEn:'Shen',
      text:'ä½ æ‰£ä¸ä¸‹æ‰³æœºã€‚æˆ‘æ•™äº†ä½ ã€‚',
      textEn:'You couldn\'t pull the trigger. I taught you how.',
      next:'s30_5'
    },
    s30_5: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'shen',pose:'base',slot:'right'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'ä½ æ•™æˆ‘æœä»Žã€‚',
      textEn:'You taught me to obey.',
      next:'s30_6'
    },
    s30_6: {
      bg:'bunker',
      sprites:[{char:'shen',pose:'base',slot:'right'}],
      speaker:'æ²ˆå±€é•¿', speakerEn:'Shen',
      text:'è€Œä½ å˜å¾—éžå‡¡ã€‚',
      textEn:'And you became extraordinary.',
      next:'s30_7'
    },
    s30_7: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'shen',pose:'base',slot:'right'}],
      speaker:'æž—éª', speakerEn:'Lin Xiao',
      text:'ä¸ã€‚ä½ è®©æœä»Žæ„Ÿè§‰åƒå‹‡æ°”ã€‚æˆ‘èŠ±äº†å¥½å‡ å¹´æ‰æ˜Žç™½åŒºåˆ«ã€‚',
      textEn:'No. You made obedience feel like courage. It took me years to learn the difference.',
      next:'s30_8'
    },
    s30_8: {
      bg:'bunker',
      sprites:[{char:'shen',pose:'base',slot:'right'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æ²ˆæŠŠæ­¦å™¨æ”¾åœ¨æ¡Œä¸Šã€‚',
      textEn:'Shen places his weapon on the table.',
      next:'s30_9'
    },
    s30_9: {
      bg:'bunker',
      sprites:[{char:'shen',pose:'base',slot:'right'}],
      speaker:'æ²ˆå±€é•¿', speakerEn:'Shen',
      text:'é‚£å°±è¯æ˜Žä½ å˜äº†ã€‚',
      textEn:'Then prove you\'ve changed.',
      next:'s30_final'
    },
    s30_final: {
      bg:'bunker',
      sprites:[{char:'linxiao',pose:'angry',slot:'left'},{char:'shen',pose:'base',slot:'right'}],
      speaker:'æ—ç™½', speakerEn:'Narrator',
      text:'æœ€ç»ˆå†³å®šã€‚ä½ çš„é€‰æ‹©å°†ç»“åˆç´¯ç§¯çš„è¯æ®ã€ä¿¡ä»»ã€æš´éœ²å’Œå¤ä»‡å€¼ï¼Œå†³å®šç»“å±€ã€‚',
      textEn:'Final decision. Your choice, filtered through accumulated Evidence, Trust, Exposure and Revenge, determines the ending.',
      choices:[
        { label:'é€®æ•æ²ˆå±€é•¿', labelEn:'Arrest Shen', flag:{final:'arrest'}, stats:{evidence:+10}, next:'ending_check' },
        { label:'æ€æ­»æ²ˆå±€é•¿', labelEn:'Kill Shen', flag:{final:'kill'}, stats:{revenge:+20}, next:'ending_check' },
        { label:'æ‘§æ¯é•œç³»ç»Ÿ', labelEn:'Destroy Mirror', flag:{final:'destroy'}, stats:{}, next:'ending_check' },
        { label:'å…¬å¼€é•œç³»ç»Ÿæ•°æ®åº“', labelEn:'Release Mirror database', flag:{final:'release'}, stats:{exposure:+20}, next:'ending_check' },
        { label:'æŽ¥ç®¡é•œç³»ç»Ÿ', labelEn:'Take control of Mirror', flag:{final:'control'}, stats:{revenge:+10, trust:-15}, next:'ending_check' },
        { label:'æ”¹å†™é•œç³»ç»Ÿï¼ˆç§˜å¯†ï¼‰', labelEn:'Rewrite Mirror (secret)', flag:{final:'rewrite'}, stats:{trust:+10}, next:'ending_check' }
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
      title:'çœŸå®žæ­£ä¹‰', titleEn:'TRUE JUSTICE', titleTag:'ENDING 1',
      achievements:['ach_truth'],
      text:'æ²ˆå±€é•¿è¢«é€®æ•ã€‚é¡¾æ™¨è‡ªæ„¿è®¤ç½ªå¹¶ä½œè¯ã€‚æ¢…çš„æ–‡ä»¶è¯æ˜Žå½’ä¹¡è¡ŒåŠ¨æ˜¯ä¸€åœºæŽ©ç›–ã€‚æ•°æœˆåŽï¼Œæž—éªåœ¨æž—é›¨çš„å­¦æ ¡å¤–ç­‰å¥¹ã€‚\n\n"ä½ æ¥å¾—æ—©ã€‚"\n"ä½ è¿Ÿåˆ°äº†ã€‚"\n"ä¸‰åç§’ã€‚"\n"æˆ‘æ³¨æ„åˆ°äº†ã€‚"',
      textEn:'Shen is arrested. Gu Chen voluntarily confesses and testifies. Mei\'s files prove Homecoming was a cover-up. Months later, Lin Xiao waits outside Lin Yu\'s school.\n\n"You\'re early."\n"You\'re late."\n"Thirty seconds."\n"I noticed."'
    },
    end_vengeance: {
      type:'ending', bg:'bunker', cg:'cg_vengeance',
      title:'å¤ä»‡', titleEn:'VENGEANCE', titleTag:'ENDING 2',
      achievements:['ach_vengeance'],
      text:'æž—éªåœ¨å¨èƒå·²ç»ç»“æŸåŽå°„æ€äº†æ²ˆã€‚æž—é›¨åŠæ—¶èµ¶åˆ°ï¼Œçœ‹åˆ°äº†åŽæžœã€‚è­¦ç¬›å£°æŽ¥è¿‘ã€‚\n\n"ç»“æŸäº†ã€‚"\n"æ˜¯å—ï¼Ÿ"\n"æˆ‘ä¸ºä½ åšçš„ã€‚"\n"ä¸ã€‚ä½ æ˜¯å› ä¸ºæƒ³åšæ‰åšçš„ã€‚"',
      textEn:'Lin Xiao shoots Shen after the threat is already over. Lin Yu arrives in time to see the aftermath. Police sirens approach.\n\n"It\'s over."\n"Is it?"\n"I did it for you."\n"No. You did it because you wanted to."'
    },
    end_watcher: {
      type:'ending', bg:'server',
      title:'å®ˆæœ›è€…', titleEn:'THE WATCHER', titleTag:'ENDING 3',
      text:'æ•°æœˆåŽï¼Œæž—éªç§˜å¯†å®¡æŸ¥æœªæ¥å¨èƒé¢„æµ‹ã€‚æž—é›¨èµ°è¿›æ¥ï¼Œä»–è—èµ·äº†å±å¹•ã€‚\n\n"ä½ æ‘§æ¯äº†å®ƒï¼Œå¯¹å—ï¼Ÿ"\n"æ˜¯çš„ã€‚"',
      textEn:'Months later, Lin Xiao secretly reviews future-threat predictions. Lin Yu enters; he hides the screen.\n\n"You destroyed it, right?"\n"Yes."'
    },
    end_ghost: {
      type:'ending', bg:'bunker',
      title:'å¹½çµä¹‹å®¶', titleEn:'GHOST FAMILY', titleTag:'ENDING 4',
      text:'é•œç³»ç»Ÿè¢«æ‘§æ¯ï¼Œå®¶åº­ä¿¡ä»»åº¦é«˜ï¼Œä½†æš´éœ²å€¼è¿‡é«˜æˆ–è¯æ®ä¸è¶³ã€‚æž—éªã€æ¢…å’Œæž—é›¨ä»¥æ–°èº«ä»½ç¦»å¼€ä¸´æµ·ã€‚åœ¨ç«è½¦ç«™ï¼Œä»–ä»¬ç­‰å¾…å¼€å¾€æ–°åŸŽå¸‚çš„åˆ—è½¦ã€‚\n\n"æ–°åŸŽå¸‚ã€‚"\n"æ–°åå­—ã€‚"\n"æ–°ç”Ÿæ´»ã€‚"\n"è¿˜æ˜¯é‚£ä¸ªä¸æ­£å¸¸çš„å®¶åº­ï¼Ÿ"\n"å¾ˆé—æ†¾ï¼Œæ˜¯çš„ã€‚"',
      textEn:'Mirror destroyed, family trust high, but Exposure too high or evidence insufficient. Lin Xiao, Mei and Lin Yu leave Linhai under new identities. At a railway station they wait for a train to a new city.\n\n"New city."\n"New names."\n"New life."\n"Same dysfunctional family?"\n"Unfortunately."'
    },
    end_alone: {
      type:'ending', bg:'home',
      title:'å­¤ç‹¬', titleEn:'ALONE', titleTag:'ENDING 5',
      text:'æž—é›¨æ´»äº†ä¸‹æ¥ï¼Œä½†å¤ä»‡å€¼æžç«¯ä¸”å®¶åº­ä¿¡ä»»åº¦ä½Žã€‚æž—éªå‘Šè¯‰æž—é›¨ä»–ä»¬ç»ˆäºŽå¯ä»¥å›žå®¶äº†ã€‚å¥¹æ²¡æœ‰åŠ¨ã€‚\n\n"ä½ æ•‘äº†æˆ‘çš„å‘½ã€‚ä½†æˆ‘å·²ç»ä¸è®¤è¯†ä½ äº†ã€‚"\n"æˆ‘æ˜¯ä½ çˆ¶äº²ã€‚"\n"é‚£æˆ‘å¸Œæœ›ä½ èƒ½é‡æ–°æ‰¾åˆ°ä»–ã€‚"',
      textEn:'Lin Yu survives, but Revenge is extreme and family Trust is low. Lin Xiao tells Lin Yu they can finally go home. She does not move.\n\n"You saved my life. But I don\'t know who you are anymore."\n"I\'m your father."\n"Then I hope you find him again."'
    },
    end_chaos: {
      type:'ending', bg:'hq',
      title:'æ··æ²Œ', titleEn:'CHAOS', titleTag:'ENDING 6',
      text:'é•œç³»ç»Ÿçš„åŽŸå§‹æ•°æ®åº“è¢«å…¬å¼€ã€‚æ²ˆçš„ç½ªè¡Œç«‹å³å…¬ä¹‹äºŽä¼—ã€‚æ•°ç™¾ä¸‡æ¡ç§äººè®°å½•ã€é¢„æµ‹å’Œç§˜å¯†ä¹ŸåŒæ ·å…¬å¼€ã€‚çœŸç›¸èµ¢äº†ï¼Œä½†éšç§å´©æºƒï¼ŒåŠ¨è¡è”“å»¶ã€‚\n\n"æˆ‘ä»¬æ›å…‰äº†ä»–ã€‚"\n"æˆ‘ä»¬æ›å…‰äº†æ‰€æœ‰äººã€‚"',
      textEn:'The entire raw Mirror database is released. Shen\'s crimes become public immediately. So do millions of private records, predictions and secrets. The truth wins, but privacy collapses and unrest spreads.\n\n"We exposed him."\n"We exposed everyone."'
    },
    end_hidden: {
      type:'ending', bg:'bunker',
      title:'éšç§˜ä¹‹åˆƒ', titleEn:'THE HIDDEN BLADE', titleTag:'ENDING 7',
      text:'é•œç³»ç»Ÿè¢«æ‘§æ¯ï¼Œä½†å…¬å¼€è¯æ®ä¸è¶³ã€‚æ²ˆè¢«å‡»è´¥ï¼Œæž—é›¨å®‰å…¨ï¼Œä½†æž—éªè¢«æŒ‡è´£ä¸ºè¢­å‡»è€…ã€‚æ•°æœˆåŽï¼Œä¸€åå¹¸å­˜çš„è…è´¥é•œç³»ç»Ÿå®˜å‘˜è¿›å…¥ä»–çš„å…¬å¯“ã€‚ç¯ç­äº†ã€‚\n\n"æ²ˆèµ°äº†ã€‚ä½†ä½ è¿˜åœ¨ã€‚"',
      textEn:'Mirror destroyed with insufficient public evidence. Shen is defeated, Lin Yu is safe, but Lin Xiao is blamed for the attack. Months later a surviving corrupt Mirror official enters his apartment. The lights go out.\n\n"Shen is gone. But you\'re still here."'
    },
    end_secret: {
      type:'ending', bg:'home', cg:'cg_secret',
      title:'æ‰“ç ´é•œå­', titleEn:'BREAK THE MIRROR', titleTag:'SECRET ENDING',
      achievements:['ach_secret'],
      text:'è‹å²šå’Œæ¢…æ”¹å†™äº†æ ¸å¿ƒï¼šå¹³æ°‘ç›‘æŽ§è¢«åˆ é™¤ï¼Œç»æ ¸å®žçš„çŠ¯ç½ªè¯æ®è¢«ä¿ç•™ã€‚æ²ˆè¢«é€®æ•ã€‚é¡¾æ™¨ä½œè¯ã€‚æž—éªè¢«æ´—æ¸…ã€‚æ¢…å›žåˆ°äº†å®¶åº­ã€‚\n\næ•°æœˆåŽï¼Œæž—éªåˆæŠŠæ—©é¤çƒ¤ç„¦äº†ã€‚\n\n"ç»åŽ†äº†è¿™ä¸€åˆ‡ï¼Œä½ åšé¥­è¿˜æ˜¯è¿™ä¸ªæ°´å¹³ï¼Ÿ"\n"é‚£æ˜¯ä»€ä¹ˆï¼Ÿ"\n"æ—©é¤ã€‚"\n"ä»–æ€»æ˜¯è¿™ä¹ˆè¯´ã€‚"',
      textEn:'Su Lan and Mei rewrite the core: civilian surveillance is deleted while verified criminal evidence is preserved. Shen is arrested. Gu Chen testifies. Lin Xiao is cleared. Mei returns to the family.\n\nMonths later, Lin Xiao burns breakfast again.\n\n"After everything we survived, this is still how you cook?"\n"What is that?"\n"Breakfast."\n"That\'s what he always says."'
    }
  }
};

