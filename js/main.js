/* ===== The Hidden Blade · 主入口 ===== */
(function(){
  document.addEventListener('DOMContentLoaded', init);

  function init(){
    // 初始化语言（默认英文）
    I18N.init();

    // 初始化各模块
    Settings.bindUI();
    Settings.apply();
    SaveSys.bindUI();
    Gallery.bindUI();
    TeamPage.bindUI();
    MiniGame1.bind();
    MiniGame2.bind();
    Engine.bind();

    // 语言切换按钮（已移除 UI，保留 i18n 机制；如需恢复，添加带 data-i18n-lang 的元素即可）
    const langBtn = document.getElementById('lang-toggle');
    if(langBtn){
      langBtn.addEventListener('click', ()=>{
        AudioSys.sfx.click();
        I18N.toggle();
        document.documentElement.lang = I18N.getLang();
      });
    }

    // 绑定标题按钮
    bindTitleButtons();

    // 设置界面按钮
    document.querySelector('[data-action="reset-settings"]').addEventListener('click', ()=>{
      AudioSys.sfx.click();
      Settings.reset();
      Settings.bindUI(); // 重新绑定以刷新控件值
      SaveSys.showToast('已恢复默认设置');
    });
    document.querySelector('[data-action="save-settings"]').addEventListener('click', ()=>{
      AudioSys.sfx.click();
      Settings.save();
      SaveSys.showToast('设置已保存');
      // 返回：游戏中回游戏，否则回标题
      if(Game.isInGame()) Engine.showScreen('game');
      else Engine.showScreen('title');
    });

    // 画廊返回
    document.querySelector('[data-action="back-from-gallery"]').addEventListener('click', ()=>{
      AudioSys.sfx.click();
      if(Game.isInGame()) Engine.showScreen('game');
      else Engine.showScreen('title');
    });

    // 成就返回
    document.querySelector('[data-action="back-from-achievements"]').addEventListener('click', ()=>{
      AudioSys.sfx.click();
      Engine.showScreen('title');
    });

    // 结局按钮
    document.querySelector('[data-action="ending-title"]').addEventListener('click', ()=>{
      AudioSys.sfx.click();
      Engine.backToTitle();
    });
    document.querySelector('[data-action="ending-gallery"]').addEventListener('click', ()=>{
      AudioSys.sfx.click();
      Gallery.render();
      Engine.showScreen('gallery');
    });

    // 尝试立即启动 BGM（部分浏览器/场景允许自动播放）
    if(Settings.get('bgmOn')) AudioSys.setBGM(true);

    // 首次任意用户交互时启动 BGM（浏览器自动播放策略：点击/按键/触摸/滚轮均可）
    let bgmUnlocked = false;
    function unlockBGM(){
      if(bgmUnlocked) return;
      bgmUnlocked = true;
      AudioSys.ensureCtx();
      if(Settings.get('bgmOn')) AudioSys.setBGM(true);
    }
    ['pointerdown','keydown','touchstart','wheel','scroll'].forEach(ev=>{
      document.addEventListener(ev, unlockBGM, {once:true, capture:true});
    });

    // 应用当前语言到所有界面文本
    I18N.apply();
    document.documentElement.lang = I18N.getLang();

    // 默认显示标题
    Engine.showScreen('title');
  }

  function bindTitleButtons(){
    document.querySelector('[data-action="new-game"]').addEventListener('click', ()=>{
      AudioSys.sfx.click();
      Engine.startNewGame();
    });
    document.querySelector('[data-action="load-game"]').addEventListener('click', ()=>{
      const btn = document.getElementById('btn-saved-game');
      if(btn && btn.classList.contains('disabled')) return;
      AudioSys.sfx.click();
      SaveSys.render('load');
      Engine.showScreen('save');
    });
    document.querySelector('[data-action="open-settings"]').addEventListener('click', ()=>{
      AudioSys.sfx.click();
      Engine.showScreen('settings');
    });
    document.querySelector('[data-action="open-gallery"]').addEventListener('click', ()=>{
      AudioSys.sfx.click();
      Gallery.render();
      Engine.showScreen('gallery');
    });
    document.querySelector('[data-action="open-achievements"]').addEventListener('click', ()=>{
      AudioSys.sfx.click();
      Achievements.render();
      Engine.showScreen('achievements');
    });
    document.querySelector('[data-action="open-team"]').addEventListener('click', ()=>{
      AudioSys.sfx.click();
      TeamPage.render();
      Engine.showScreen('team');
    });
  }

  /* 检查是否存在存档，更新"存档游戏"按钮可用状态 */
  function updateSavedGameButton(){
    const btn = document.getElementById('btn-saved-game');
    if(!btn) return;
    let hasSave = false;
    try{
      for(let i=0; i<localStorage.length; i++){
        const key = localStorage.key(i);
        if(key && key.startsWith('thb_save_')){
          const raw = localStorage.getItem(key);
          if(raw && raw !== 'null' && raw !== ''){ hasSave = true; break; }
        }
      }
    }catch(e){}
    btn.classList.toggle('disabled', !hasSave);
  }

  // 暴露给其他模块在存档变化后调用
  window.updateSavedGameButton = updateSavedGameButton;
})();
