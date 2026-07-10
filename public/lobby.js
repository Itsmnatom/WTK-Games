document.addEventListener('DOMContentLoaded', () => {
  const btnModeBot = document.getElementById('btn-mode-bot');
  const btnModeOnlineMenu = document.getElementById('btn-mode-online-menu');
  const btnCreateOnline = document.getElementById('btn-create-online');
  const btnJoinOnline = document.getElementById('btn-join-online');
  const btnBackToMenu = document.getElementById('btn-back-to-menu');
  
  const panelMenu = document.getElementById('panel-menu');
  const panelOnlineSetup = document.getElementById('panel-online-setup');
  const inputNickname = document.getElementById('input-nickname');
  const inputOnlineRoomId = document.getElementById('input-online-room-id');

  // Load cached name if exists
  const cachedName = localStorage.getItem('savedPlayerName');
  if (cachedName) {
    inputNickname.value = cachedName;
  }

  // Save name automatically as user types
  inputNickname.addEventListener('input', () => {
    localStorage.setItem('savedPlayerName', inputNickname.value.trim());
  });

  btnModeOnlineMenu.addEventListener('click', () => {
    panelMenu.classList.add('hidden');
    panelOnlineSetup.classList.remove('hidden');
  });

  btnBackToMenu.addEventListener('click', () => {
    panelOnlineSetup.classList.add('hidden');
    panelMenu.classList.remove('hidden');
  });

  if (btnModeBot) {
    btnModeBot.addEventListener('click', () => {
      const name = inputNickname.value.trim() || 'Player';
      localStorage.setItem('savedPlayerName', name);
      const rId = 'BOT_' + Math.random().toString(36).substr(2, 4).toUpperCase();
      const countElement = document.getElementById('select-bot-count');
      const count = countElement ? countElement.value : 4;
      sessionStorage.setItem('playerName', name);
      sessionStorage.setItem('gameMode', 'BOT');
      sessionStorage.setItem('botCount', count);
      sessionStorage.setItem('roomAction', 'create');
      window.location.href = `/app/${rId}`;
    });
  }

  btnCreateOnline.addEventListener('click', () => {
    const name = inputNickname.value.trim() || 'Player';
    localStorage.setItem('savedPlayerName', name);
    const rId = 'ROOM_' + Math.random().toString(36).substr(2, 4).toUpperCase();
    sessionStorage.setItem('playerName', name);
    sessionStorage.setItem('gameMode', 'ONLINE');
    sessionStorage.setItem('roomAction', 'create');
    window.location.href = `/app/${rId}`;
  });

  btnJoinOnline.addEventListener('click', () => {
    const name = inputNickname.value.trim() || 'Player';
    const rId = inputOnlineRoomId.value.trim().toUpperCase();
    if (!rId) return alert('กรุณาระบุรหัสห้องให้ถูกต้อง!');
    localStorage.setItem('savedPlayerName', name);
    sessionStorage.setItem('playerName', name);
    sessionStorage.setItem('gameMode', 'ONLINE');
    sessionStorage.setItem('roomAction', 'join');
    window.location.href = `/app/${rId}`;
  });
});
