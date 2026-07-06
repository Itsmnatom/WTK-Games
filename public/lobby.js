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

  btnModeOnlineMenu.addEventListener('click', () => {
    panelMenu.classList.add('hidden');
    panelOnlineSetup.classList.remove('hidden');
  });

  btnBackToMenu.addEventListener('click', () => {
    panelOnlineSetup.classList.add('hidden');
    panelMenu.classList.remove('hidden');
  });

  btnModeBot.addEventListener('click', () => {
    const name = inputNickname.value.trim() || 'Player';
    const rId = 'BOT_' + Math.random().toString(36).substr(2, 4).toUpperCase();
    const count = document.getElementById('select-bot-count').value;
    sessionStorage.setItem('playerName', name);
    sessionStorage.setItem('gameMode', 'BOT');
    sessionStorage.setItem('botCount', count);
    sessionStorage.setItem('roomAction', 'create');
    window.location.href = `/app/${rId}`;
  });

  btnCreateOnline.addEventListener('click', () => {
    const name = inputNickname.value.trim() || 'Player';
    const rId = 'ROOM_' + Math.random().toString(36).substr(2, 4).toUpperCase();
    sessionStorage.setItem('playerName', name);
    sessionStorage.setItem('gameMode', 'ONLINE');
    sessionStorage.setItem('roomAction', 'create');
    window.location.href = `/app/${rId}`;
  });

  btnJoinOnline.addEventListener('click', () => {
    const name = inputNickname.value.trim() || 'Player';
    const rId = inputOnlineRoomId.value.trim().toUpperCase();
    if (!rId) return alert('กรุณาระบุรหัสห้อง!');
    sessionStorage.setItem('playerName', name);
    sessionStorage.setItem('gameMode', 'ONLINE');
    sessionStorage.setItem('roomAction', 'join');
    window.location.href = `/app/${rId}`;
  });
});
