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
  const panelReconnect = document.getElementById('panel-reconnect');
  const btnReconnectGame = document.getElementById('btn-reconnect-game');

  // GSAP Entrance Animations
  if (typeof gsap !== 'undefined') {
    gsap.from('.lobby-container', { duration: 0.8, y: 40, opacity: 0, scale: 0.93, ease: 'back.out(1.7)' });
    gsap.from('.lobby-icon', { duration: 1, scale: 0, rotation: -180, delay: 0.2, ease: 'elastic.out(1, 0.5)' });
    gsap.from('.lobby-title', { duration: 0.7, opacity: 0, y: -20, delay: 0.35, ease: 'power2.out' });
    gsap.from('.form-group', { duration: 0.6, opacity: 0, y: 15, stagger: 0.1, delay: 0.45, ease: 'power2.out' });
    gsap.from('.btn-menu, .btn-join', { duration: 0.6, opacity: 0, y: 10, stagger: 0.1, delay: 0.55, ease: 'power2.out' });
  }

  // Check for active game to reconnect
  const activeRoomId = localStorage.getItem('activeRoomId');
  const activePlayerId = localStorage.getItem('activePlayerId');
  if (activeRoomId && activePlayerId) {
    panelReconnect.classList.remove('hidden');
  }

  btnReconnectGame.addEventListener('click', () => {
    sessionStorage.setItem('roomAction', 'reconnect');
    sessionStorage.setItem('reconnectRoomId', activeRoomId);
    sessionStorage.setItem('reconnectPlayerId', activePlayerId);
    window.location.href = `/app/${activeRoomId}`;
  });

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
