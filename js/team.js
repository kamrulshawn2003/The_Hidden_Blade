/* ===== 制作团队 ===== */
window.TeamPage = (function(){

  /* ============================================================
     团队成员数据 — 在此处编辑姓名、角色和照片
     - name / nameEn: 成员姓名
     - role / roleEn: 担任工作/角色
     - img: 照片路径（放在 assets/team/ 文件夹下）；留空则显示首字母头像
     ============================================================ */
  const members = [
    {
      name: '张引弘',
      nameEn: 'Darren Teoh',
      role: '项目负责人 / 测试',
      roleEn: 'Project Lead / Testing',
      img: './assets/team/derren.jpg'
    },
    {
      name: '孙瑞浩',
      nameEn: 'Sun Ruihao',
      role: '剧本 / 编剧',
      roleEn: 'Story & Script',
      img: './assets/team/sun.jpg'
    },
    {
      name: '林芩妤',
      nameEn: 'Vianney Lim',
      role: '美术 / 设计',
      roleEn: 'Art & Design',
      img: './assets/team/vienay.jpg'
    },
    {
      name: '尚杰',
      nameEn: 'Shawn Kazi Md Kamrul Islam',
      role: '程序开发',
      roleEn: 'Programming',
      img: './assets/team/kamrul.jpg'
    },
    {
      name: '涂展瑆',
      nameEn: 'Fendrick Violetthu',
      role: '剧本 / 编剧',
      roleEn: 'Story & Script',
      img: './assets/team/fedrick.jpg'
    },
    {
      name: '李佳琳',
      nameEn: 'Jessica Patricia Lie',
      role: '首席信息官',
      roleEn: 'CIO',
      img: './assets/team/jessica.jpg'
    }
  ];

  function L(obj, field){
    const enField = field + 'En';
    return (I18N.getLang() === 'en' && obj[enField] !== undefined) ? obj[enField] : obj[field];
  }

  function getInitials(member){
    const name = L(member, 'name');
    // For Chinese names, use first character; for English, use first letters of first two words
    if(/[\u4e00-\u9fa5]/.test(name)){
      return name.charAt(0);
    }
    const parts = name.split(/\s+/);
    return (parts[0]?.charAt(0) || '') + (parts[1]?.charAt(0) || '');
  }

  function render(){
    const grid = document.getElementById('team-grid');
    if(!grid) return;
    grid.innerHTML = '';
    members.forEach(m=>{
      const card = document.createElement('div');
      card.className = 'team-card';
      const avatar = m.img
        ? `<img class="team-avatar" src="${m.img}" alt="${L(m,'name')}">`
        : `<div class="team-avatar team-avatar-initials">${getInitials(m)}</div>`;
      card.innerHTML = `
        ${avatar}
        <div class="team-name">${L(m,'name')}</div>
        <div class="team-role">${L(m,'role')}</div>`;
      grid.appendChild(card);
    });
  }

  function bindUI(){
    const backBtn = document.querySelector('[data-action="back-from-team"]');
    if(backBtn){
      backBtn.addEventListener('click', ()=>{
        AudioSys.sfx.click();
        Engine.showScreen('title');
      });
    }
  }

  return { render, bindUI };
})();
