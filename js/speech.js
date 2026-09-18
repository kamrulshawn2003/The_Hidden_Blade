/* ===== The Hidden Blade · 角色语音系统 (Web Speech API) =====
 * 每个角色按剧本自动朗读台词：
 *  - 中文用 zh 语音、英文用 en 语音（跟随当前界面语言）
 *  - 每个角色有独立声线档案（音高 pitch + 语速 rate），男女声自动挑选系统语音
 *  - 长句自动按句子切分排队朗读，避免浏览器截断
 *  - 音量跟随设置里的“语音音量”，可在 音频设置 里整体开关
 */
window.VoiceSys = (function(){
  let voices = [];
  let token = 0;        // 每次 speak/stop 递增，用于作废旧朗读
  let queue = [];
  let speaking = false;
  let enabled = true;

  /* 角色声线档案：pitch <1 更低沉（男声），>1 更明亮（女声/机械感）；rate 语速 */
  const PROFILES = {
    narrator:   { pitch: 1.00, rate: 1.00 },  // 旁白：中性
    linxiao:    { pitch: 0.78, rate: 1.07 },  // 林骁：年轻男性，语速略快
    linyu:      { pitch: 1.32, rate: 1.02 },  // 林雨：年轻女性
    guchen:     { pitch: 0.88, rate: 1.00 },  // 顾晨：成年男性
    sulan:      { pitch: 1.26, rate: 1.00 },  // 苏岚：女性
    shen:       { pitch: 0.55, rate: 0.90 },  // 沈局长：老年男性，低沉缓慢
    mei:        { pitch: 1.20, rate: 1.03 },  // 梅晨：女性
    stranger:   { pitch: 0.65, rate: 1.05 },  // 匿名来电：神秘男声
    researcher: { pitch: 0.90, rate: 1.05 },  // 研究员：男性，语速稍快
    system:     { pitch: 1.18, rate: 0.92 },  // 系统：机械感
    detective:  { pitch: 0.82, rate: 1.05 },  // 警探：成年男性
    default:    { pitch: 1.00, rate: 1.00 }
  };

  /* 常见系统语音里的男女声名称提示 */
  const MALE_HINTS   = ['male','kangkang','yunxi','yunyang','mark','david','guy','daniel','ping','liam'];
  const FEMALE_HINTS = ['female','yaoyao','huihui','xiaoxiao','xiaoyi','zira','aria','jenny','susan','ting','meijia'];

  function resolveProfile(speaker){
    if(!speaker) return PROFILES.default;
    const s = String(speaker).toLowerCase();
    if(/旁白|narrator/.test(s)) return PROFILES.narrator;
    if(/林骁|lin ?xiao|raven/.test(s)) return PROFILES.linxiao;
    if(/林雨|lin ?yu/.test(s)) return PROFILES.linyu;
    if(/顾晨|gu ?chen/.test(s)) return PROFILES.guchen;
    if(/苏岚|su ?lan/.test(s)) return PROFILES.sulan;
    if(/沈局长|shen/.test(s)) return PROFILES.shen;
    if(/梅晨|mei/.test(s)) return PROFILES.mei;
    if(/匿名|来电|anonymous/.test(s)) return PROFILES.stranger;
    if(/研究员|researcher/.test(s)) return PROFILES.researcher;
    if(/系统|system/.test(s)) return PROFILES.system;
    if(/警探|detective/.test(s)) return PROFILES.detective;
    return PROFILES.default;
  }

  function loadVoices(){
    try{ voices = window.speechSynthesis ? speechSynthesis.getVoices() : []; }
    catch(e){ voices = []; }
  }

  function pickVoice(lang, gender){
    const isEn = lang === 'en';
    const prefix = isEn ? 'en' : 'zh';
    let cand = voices.filter(v => v && v.lang && v.lang.toLowerCase().indexOf(prefix) === 0);
    if(!cand.length){
      // 系统里没有对应语言的语音（例如缺中文语音包）：退回任意可用语音，保证能发声
      if(voices.length){
        return voices.find(v => /natural|online|desktop|google/i.test(v.name)) || voices[0];
      }
      return null;
    }
    // 优先常见口音：英文用 en-US、中文用 zh-CN
    const region = isEn ? 'en-us' : 'zh-cn';
    const regional = cand.filter(v => v.lang.toLowerCase().indexOf(region) === 0);
    if(regional.length) cand = regional;
    const hints = gender === 'female' ? FEMALE_HINTS : gender === 'male' ? MALE_HINTS : [];
    for(const h of hints){
      const v = cand.find(v => v.name.toLowerCase().indexOf(h) !== -1);
      if(v) return v;
    }
    return cand.find(v => /desktop|natural|online/i.test(v.name)) || cand[0];
  }

  /* 按句末标点切分，避免长句被浏览器静默截断 */
  function chunkText(text){
    const parts = String(text).split(/(?<=[。！？!?\n])/);
    const out = [];
    let buf = '';
    for(const p of parts){
      if(!p) continue;
      if(p.length > 120){
        if(buf){ out.push(buf); buf = ''; }
        out.push(p);
      } else if(buf.length + p.length > 120){
        out.push(buf); buf = p;
      } else {
        buf += p;
      }
    }
    if(buf) out.push(buf);
    return out.length ? out : [String(text)];
  }

  function speakOne(text, profile, lang, vol, id){
    if(id !== token) return;
    const u = new SpeechSynthesisUtterance(text);
    const gender = profile.pitch < 0.95 ? 'male' : (profile.pitch > 1.1 ? 'female' : null);
    const voice = pickVoice(lang, gender);
    if(voice) u.voice = voice;
    u.lang = voice ? voice.lang : (lang === 'en' ? 'en-US' : 'zh-CN');
    u.pitch = Math.max(0.1, Math.min(2, profile.pitch));
    u.rate  = Math.max(0.5, Math.min(2, profile.rate));
    u.volume = Math.max(0, Math.min(1, vol));
    u.onend = u.onerror = ()=>{ if(id === token) nextChunk(id); };
    try{ speechSynthesis.speak(u); }catch(e){ nextChunk(id); }
  }

  function nextChunk(id){
    if(id !== token) return;
    speaking = false;
    if(queue.length){
      const item = queue.shift();
      speaking = true;
      speakOne(item.text, item.profile, item.lang, item.vol, id);
    }
  }

  function speak(speaker, text){
    if(!enabled) return;
    if(!window.speechSynthesis || !text) return;
    // 每次朗读前刷新语音列表（系统语音可能加载较慢/延迟就绪）
    try{ voices = speechSynthesis.getVoices(); }catch(e){}
    const s = window.AudioSys ? AudioSys.getSettings() : { voice:100 };
    const vol = (s.voice !== undefined ? s.voice : 100) / 100;
    if(vol <= 0) return;
    token++;
    const lang = (window.I18N && I18N.getLang) ? I18N.getLang() : 'zh';
    const profile = resolveProfile(speaker);
    queue = chunkText(text).map(t => ({ text:t, profile, lang, vol }));
    const id = token;
    try{ speechSynthesis.cancel(); }catch(e){}
    try{ speechSynthesis.resume(); }catch(e){}
    // 等 cancel 生效后再开始新朗读（Chrome 已知问题）
    setTimeout(()=> nextChunk(id), 60);
  }

  function stop(){
    token++;
    queue = [];
    speaking = false;
    if(window.speechSynthesis){
      try{ speechSynthesis.cancel(); }catch(e){}
    }
  }

  function setEnabled(on){
    enabled = !!on;
    if(!enabled) stop();
  }

  function init(){
    if(!window.speechSynthesis) return;
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    // 部分系统在 cancel 后需要 resume 才能继续发声，定时兜底
    setInterval(()=>{
      try{
        if(enabled && !speechSynthesis.speaking && !speechSynthesis.pending){
          speechSynthesis.resume();
        }
      }catch(e){}
    }, 3000);
  }

  return { init, speak, stop, setEnabled, isEnabled:()=>enabled, isActive:()=>speaking, getVoices:()=>voices };
})();
