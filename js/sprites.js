/* ===== The Hidden Blade · 精灵图库 (SpriteLib) =====
   加载角色立绘精灵，供小游戏使用（已预抠底的 shen_base_t 直接加载）。 */
window.SpriteLib = (function(){
  const cache = {};
  const names = ['linxiao_base', 'linxiao_angry', 'shen_base_t', 'guchen_base', 'kidnapper_base',
                 'ninja_run', 'ninja_idle', 'guard_walk', 'guard_heavy', 'raven_fight', 'shen_fight'];
  let ready = false;
  const waiters = [];

  function load(name){
    return new Promise((resolve, reject) => {
      if(cache[name]) return resolve(cache[name]);
      const img = new Image();
      img.onload = () => { cache[name] = img; resolve(img); };
      img.onerror = () => reject(new Error('sprite load failed: ' + name));
      img.src = 'assets/sprites/' + name + '.png';
    });
  }

  function loadAll(){
    return Promise.all(names.map(load)).then(() => {
      ready = true;
      waiters.splice(0).forEach(fn => fn());
    }).catch(err => console.warn(err.message));
  }

  function whenReady(cb){ if(ready) cb(); else waiters.push(cb); }
  function get(name){ return cache[name] || null; }
  function isReady(){ return ready; }

  loadAll();
  return { load, loadAll, whenReady, get, isReady };
})();
