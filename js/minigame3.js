/* ===== 小游戏 3：审讯 (Interrogation) — 证据矛盾拼图 =====
   在 Scene 11 触发。用证据卡找出嫌疑人供述中的矛盾。
   架构与 MiniGame1/2 一致：start() → 渲染 → complete()/fail() → 清理。 */
window.MGCommon = (function(){
  /* 供其他小游戏复用的轻量 UI 助手 */
  function t(key){ return (window.I18N && I18N.t) ? I18N.t(key) : key; }

  /* 结果浮层 */
  function showResult(titleKey, msg, buttons){
    killResult();
    const ov = document.createElement('div');
    ov.id = 'mg-result-overlay';
    ov.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,.82);z-index:70;display:flex;align-items:center;justify-content:center;';
    const box = document.createElement('div');
    box.style.cssText = 'background:var(--panel);border:1px solid var(--gold);border-radius:10px;padding:34px 46px;max-width:520px;text-align:center;box-shadow:0 0 60px rgba(0,0,0,.9);';
    const title = document.createElement('h2');
    title.style.cssText = 'font-size:26px;letter-spacing:5px;color:var(--gold);margin-bottom:16px;text-shadow:0 0 14px rgba(212,175,55,.5);';
    title.textContent = t(titleKey);
    const msgEl = document.createElement('p');
    msgEl.style.cssText = 'font-size:15px;line-height:1.9;color:var(--cream);margin-bottom:26px;';
    msgEl.textContent = msg;
    const btns = document.createElement('div');
    btns.style.cssText = 'display:flex;gap:14px;justify-content:center;';
    (buttons || []).forEach(b=>{
      const el = document.createElement('button');
      el.style.cssText = 'padding:11px 30px;font-size:14px;letter-spacing:2px;border-radius:4px;cursor:pointer;transition:all .18s;';
      if(b.primary){
        el.style.cssText += 'background:linear-gradient(180deg,#9a2222,#6d1414);color:var(--cream);border:1px solid var(--gold-dim);';
        el.onmouseenter = ()=>{ el.style.background = 'linear-gradient(180deg,#b52a2a,#7d1818)'; };
        el.onmouseleave = ()=>{ el.style.background = 'linear-gradient(180deg,#9a2222,#6d1414)'; };
      } else {
        el.style.cssText += 'background:rgba(240,230,210,.08);color:var(--cream);border:1px solid rgba(212,175,55,.4);';
        el.onmouseenter = ()=>{ el.style.background = 'rgba(240,230,210,.16)'; };
        el.onmouseleave = ()=>{ el.style.background = 'rgba(240,230,210,.08)'; };
      }
      el.textContent = t(b.labelKey);
      el.addEventListener('click', ()=>{ if(window.AudioSys) AudioSys.sfx.click(); b.onClick && b.onClick(); });
      btns.appendChild(el);
    });
    box.appendChild(title); box.appendChild(msgEl); box.appendChild(btns);
    ov.appendChild(box);
    document.getElementById('stage').appendChild(ov);
    return ov;
  }
  function killResult(){
    const ov = document.getElementById('mg-result-overlay');
    if(ov) ov.remove();
  }

  /* 反馈提示闪烁 */
  function flash(el, className, ms){
    if(!el) return;
    el.classList.add(className);
    clearTimeout(el._flash);
    el._flash = setTimeout(()=> el.classList.remove(className), ms || 600);
  }

  return { t, showResult, killResult, flash };
})();

window.MiniGame3 = (function(){
  const TOTAL_TURNS = 14;
  const PRESSURE_MAX = 100;
  const t = (k)=> MGCommon.t(k);

  const CARDS = [
    { id:'cctv',      strength:3, type:'mg3.card.cctv.type' },
    { id:'vehicle',   strength:3, type:'mg3.card.vehicle.type' },
    { id:'warehouse', strength:1, type:'mg3.card.warehouse.type' },
    { id:'phone',     strength:3, type:'mg3.card.phone.type' },
    { id:'logistics', strength:2, type:'mg3.card.logistics.type' },
    { id:'witness',   strength:2, type:'mg3.card.witness.type' }
  ];

  const STATEMENTS = [
    { textKey:'mg3.statement1', contradiction:'vehicle', hintKey:'mg3.askHint' },
    { textKey:'mg3.statement2', contradiction:'logistics', hintKey:'mg3.askHint2' },
    { textKey:'mg3.statement3', contradiction:'phone', hintKey:'mg3.askHint3' }
  ];

  let pressure = 20;
  let turnsLeft = TOTAL_TURNS;
  let statementIdx = 0;
  let resolved = [];          // 每句是否已解决
  let resolvedByEvidence = [];// 每句是否通过正确证据解决
  let forcedBreaks = 0;
  let aggressiveCount = 0;
  let maxPressureReached = 20;
  let evidenceSelection = false;
  let hinted = [false, false, false];
  let revengeDelta = 0, trustDelta = 0, evidenceDelta = 0;
  let feedbackText = '';
  let feedbackClass = '';
  let onSuccess = null, onFail = null;
  let _active = false;

  /* ---------- 启动 ---------- */
  function start(success, fail){
    cleanup();
    onSuccess = success; onFail = fail;
    pressure = 20; turnsLeft = TOTAL_TURNS; statementIdx = 0;
    resolved = [false, false, false];
    resolvedByEvidence = [false, false, false];
    forcedBreaks = 0; aggressiveCount = 0; maxPressureReached = 20;
    evidenceSelection = false;
    hinted = [false, false, false];
    revengeDelta = 0; trustDelta = 0; evidenceDelta = 0;
    feedbackText = ''; feedbackClass = '';
    _active = true;
    Engine.showScreen('minigame3');
    bindInput();
    renderAll();
  }

  /* ---------- 渲染 ---------- */
  function renderAll(){
    const pressFill = document.getElementById('mg3-pressure-fill');
    const pressVal = document.getElementById('mg3-pressure-val');
    const turnsEl = document.getElementById('mg3-turns-val');
    if(pressFill){
      pressFill.style.width = pressure + '%';
      pressFill.className = 'mg3-pressure-fill' + (pressure >= 85 ? ' crit' : (pressure >= 60 ? ' high' : ''));
    }
    if(pressVal) pressVal.textContent = pressure + '%';
    if(turnsEl) turnsEl.textContent = turnsLeft;

    renderStatement();
    renderEvidence();
    renderActions();
    renderFeedback();
  }

  function renderStatement(){
    const numEl = document.getElementById('mg3-statement-num');
    const textEl = document.getElementById('mg3-statement-text');
    if(!numEl || !textEl) return;
    if(statementIdx >= STATEMENTS.length){
      numEl.textContent = '—';
      textEl.textContent = '';
      return;
    }
    const st = STATEMENTS[statementIdx];
    numEl.textContent = (statementIdx + 1) + ' / ' + STATEMENTS.length;
    textEl.textContent = t(st.textKey);
    // 压力过高时嫌疑人紧张抖动
    const img = document.getElementById('mg3-suspect-img');
    if(img){
      if(pressure >= 70) img.classList.add('nervous');
      else img.classList.remove('nervous');
    }
  }

  function renderEvidence(){
    const list = document.getElementById('mg3-evidence-list');
    if(!list) return;
    list.innerHTML = '';
    CARDS.forEach(c=>{
      const el = document.createElement('div');
      el.className = 'mg3-card' + (evidenceSelection ? ' selectable' : '');
      el.dataset.card = c.id;
      const strengthStr = '●'.repeat(c.strength) + '○'.repeat(3 - c.strength);
      el.innerHTML = `
        <div class="mg3-card-title"><span>${t('mg3.card.'+c.id+'.title')}</span><span class="str">${t('mg3.strength')} ${strengthStr}</span></div>
        <div class="mg3-card-desc">${t('mg3.card.'+c.id+'.desc')}</div>
        <div class="mg3-card-type">${t(c.type)}</div>`;
      el.addEventListener('click', ()=>{
        if(!_active) return;
        if(evidenceSelection) onEvidencePick(c.id);
        else {
          AudioSys.sfx.click();
          const insp = document.getElementById('mg3-evidence-list');
          // 无选中时点击卡片 = 查看详情（不消耗回合）
          setFeedback(t('mg3.card.'+c.id+'.desc'), '');
        }
      });
      list.appendChild(el);
    });
  }

  function renderActions(){
    const confront = document.getElementById('mg3-confront');
    if(confront) confront.disabled = pressure < 60 || statementIdx >= STATEMENTS.length;
    const show = document.getElementById('mg3-show');
    if(show) show.disabled = statementIdx >= STATEMENTS.length;
    const press = document.getElementById('mg3-press');
    if(press) press.disabled = statementIdx >= STATEMENTS.length;
  }

  function renderFeedback(){
    const fb = document.getElementById('mg3-feedback');
    if(!fb) return;
    fb.textContent = feedbackText;
    fb.className = feedbackClass;
  }

  function setFeedback(msg, cls){
    feedbackText = msg; feedbackClass = cls || '';
    renderFeedback();
  }

  /* ---------- 压力 ---------- */
  function changePressure(delta){
    pressure = Math.max(0, Math.min(PRESSURE_MAX, pressure + delta));
    if(pressure > maxPressureReached) maxPressureReached = pressure;
    renderAll();
    if(pressure >= 85 && delta > 0) setFeedback(t('mg3.pressureHigh'), 'bad');
    if(pressure >= PRESSURE_MAX){ endInterrogation(); }
  }

  function spendTurn(){
    turnsLeft--;
    renderAll();
    if(turnsLeft <= 0){ endInterrogation(); }
  }

  /* ---------- 行动 ---------- */
  function doAsk(){
    if(!_active) return;
    AudioSys.sfx.click();
    if(statementIdx >= STATEMENTS.length) return;
    const st = STATEMENTS[statementIdx];
    if(!hinted[statementIdx]){
      hinted[statementIdx] = true;
      setFeedback(t(st.hintKey), '');
    } else {
      changePressure(-8);
      setFeedback(t('mg3.waitUsed'), '');
    }
    spendTurn();
  }

  function doPress(){
    if(!_active) return;
    AudioSys.sfx.alert();
    aggressiveCount++;
    revengeDelta += 4; trustDelta -= 3;
    changePressure(30);
    if(pressure >= PRESSURE_MAX) return; // 已触发结束
    if(statementIdx < STATEMENTS.length && !resolved[statementIdx]){
      // 50% 概率强行撬开（证据不足，口供单薄）
      if(Math.random() < 0.5){
        resolveStatement(false);
        setFeedback(t('mg3.forced'), 'bad');
      } else {
        setFeedback(t('mg3.pressUsed'), 'bad');
      }
    } else if(statementIdx < STATEMENTS.length){
      setFeedback(t('mg3.pressUsed'), 'bad');
    }
    spendTurn();
  }

  function onEvidencePick(cardId){
    if(!_active) return;
    evidenceSelection = false;
    renderEvidence();
    if(statementIdx >= STATEMENTS.length) return;
    const st = STATEMENTS[statementIdx];
    if(cardId === st.contradiction){
      AudioSys.sfx.success();
      evidenceDelta += 8;
      changePressure(-15);
      resolveStatement(true);
      setFeedback(t('mg3.contradiction') + ' ' + t('mg3.contradictionMsg'), 'good');
    } else {
      AudioSys.sfx.fail();
      changePressure(12);
      setFeedback(t('mg3.wrong'), 'bad');
    }
    spendTurn();
  }

  function doShow(){
    if(!_active) return;
    AudioSys.sfx.click();
    evidenceSelection = !evidenceSelection;
    renderEvidence();
    if(evidenceSelection) setFeedback(t('mg3.clue'), '');
  }

  function doConfront(){
    if(!_active) return;
    if(pressure < 60 || statementIdx >= STATEMENTS.length){
      setFeedback(t('mg3.confrontLocked'), 'bad');
      return;
    }
    AudioSys.sfx.alert();
    aggressiveCount += 2;
    revengeDelta += 6; trustDelta -= 5;
    evidenceDelta += 5;
    resolveStatement(false);
    changePressure(15);
    setFeedback(t('mg3.forced'), 'bad');
    spendTurn();
  }

  function doWait(){
    if(!_active) return;
    AudioSys.sfx.click();
    trustDelta += 2;
    changePressure(-12);
    setFeedback(t('mg3.waitUsed'), '');
    spendTurn();
  }

  function resolveStatement(byEvidence){
    if(statementIdx >= STATEMENTS.length) return;
    resolved[statementIdx] = true;
    resolvedByEvidence[statementIdx] = byEvidence;
    if(!byEvidence) forcedBreaks++;
    // 推进到下一句
    statementIdx++;
    evidenceSelection = false;
    renderAll();
    if(statementIdx >= STATEMENTS.length) endInterrogation();
  }

  /* ---------- 结束 ---------- */
  function endInterrogation(){
    if(!_active) return;
    const contradictions = resolvedByEvidence.filter(Boolean).length;
    const resolvedCount = resolved.filter(Boolean).length;
    const perfect = contradictions === STATEMENTS.length && pressure < 70;
    const unreliable = aggressiveCount >= 4 || maxPressureReached >= 85;
    let resultMsg = '';
    let resultKey = 'mg3.resultPoor';
    if(perfect){
      evidenceDelta += 20; trustDelta += 5;
      resultKey = 'mg3.resultExcellent'; resultMsg = t('mg3.resultExcellentMsg');
    } else if(contradictions >= 2){
      evidenceDelta += 12; trustDelta += 2;
      resultKey = 'mg3.resultAverage'; resultMsg = t('mg3.resultAverageMsg');
    } else {
      evidenceDelta += 5;
      resultMsg = t('mg3.resultPoorMsg');
    }
    if(resolvedCount < STATEMENTS.length){
      resultMsg = (contradictions === 0 ? t('mg3.noContradictions') + ' ' : '') + t('mg3.objContinue');
    }

    const flags = {
      interrogationScore: contradictions,
      interrogationContradictions: contradictions,
      interrogationPressure: pressure,
      interrogationPerfect: !!perfect,
      interrogationReliableLocation: !unreliable,
      falseInterrogationLocation: !!unreliable
    };
    const stats = {
      evidence: evidenceDelta,
      trust: trustDelta,
      revenge: revengeDelta
    };

    AudioSys.sfx.success();
    MGCommon.showResult(resultKey, resultMsg, [
      { labelKey:'mg.common.continue', primary:true, onClick:()=>{ MGCommon.killResult(); finish(contradictions > 0, flags, stats); } }
    ]);
  }

  function finish(ok, flags, stats){
    cleanup();
    if(ok) onSuccess && onSuccess({ flags, stats, perfect: flags.interrogationPerfect });
    else onFail && onFail({ flags, stats });
  }

  /* ---------- 输入 ---------- */
  function onKeyDown(e){
    if(!_active) return;
    if(e.key === 'Escape'){
      if(evidenceSelection){
        evidenceSelection = false;
        renderEvidence();
        e.preventDefault();
      }
      return;
    }
    const map = { '1':'ask', '2':'press', '3':'show', '4':'confront', '5':'wait' };
    const key = map[e.key];
    if(key && !e.ctrlKey && !e.metaKey && !e.altKey){
      e.preventDefault();
      const fn = { ask:doAsk, press:doPress, show:doShow, confront:doConfront, wait:doWait }[key];
      fn && fn();
    }
  }

  function bindInput(){
    document.getElementById('mg3-ask').addEventListener('click', doAsk);
    document.getElementById('mg3-press').addEventListener('click', doPress);
    document.getElementById('mg3-show').addEventListener('click', doShow);
    document.getElementById('mg3-confront').addEventListener('click', doConfront);
    document.getElementById('mg3-wait').addEventListener('click', doWait);
    document.addEventListener('keydown', onKeyDown);
  }

  function unbindInput(){
    document.removeEventListener('keydown', onKeyDown);
    ['mg3-ask','mg3-press','mg3-show','mg3-confront','mg3-wait'].forEach(id=>{
      const el = document.getElementById(id);
      if(el) el.replaceWith(el.cloneNode(true));
    });
  }

  function cleanup(){
    _active = false;
    evidenceSelection = false;
    MGCommon.killResult();
    unbindInput();
  }

  function refreshLabels(){
    if(_active) renderAll();
  }

  return { start, bind(){}, cleanup, refreshLabels, get _active(){ return _active; } };
})();
