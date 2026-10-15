'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const net = require('net');
const { spawn } = require('child_process');
const { Client } = require('colyseus.js');
const { HEROES } = require('../dist/shared/catalog');

jest.setTimeout(30000);

const PORT = 3101;
const ENDPOINT = `ws://127.0.0.1:${PORT}`;
const ownedRooms = [];
let server, temporaryDirectory, serverOutput = '';

function ensurePortIsFree() {
  return new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.once('error', reject);
    probe.listen(PORT, '127.0.0.1', () => probe.close(resolve));
  });
}

function waitForBoot() {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => finish(new Error(`Isolated server did not boot:\n${serverOutput}`)), 10000);
    const append = data => {
      serverOutput += String(data);
      if (serverOutput.includes(`http://localhost:${PORT}`)) finish();
    };
    const exit = code => finish(new Error(`Isolated server exited with ${code}:\n${serverOutput}`));
    const finish = error => {
      clearTimeout(timeout);
      server.stdout.off('data', append);
      server.stderr.off('data', append);
      server.off('exit', exit);
      server.off('error', finish);
      if (error) reject(error); else resolve();
    };
    server.stdout.on('data', append);
    server.stderr.on('data', append);
    server.once('exit', exit);
    server.once('error', finish);
  });
}

function observe(room) {
  ownedRooms.push(room);
  const events = [], waiters = new Set();
  room.onMessage('*', (type, data) => {
    events.push({ type, data });
    for (const waiter of [...waiters]) waiter();
  });
  const wait = (type, predicate = () => true, after = 0, timeoutMs = 4000) => new Promise((resolve, reject) => {
    let timer;
    const check = () => {
      const event = events.slice(after).find(event => event.type === type && predicate(event.data));
      if (!event) return;
      clearTimeout(timer);
      waiters.delete(check);
      resolve(event.data);
    };
    timer = setTimeout(() => {
      waiters.delete(check);
      reject(new Error(`Timed out waiting for ${type}; received ${events.map(e => e.type).join(', ')}\n${serverOutput}`));
    }, timeoutMs);
    waiters.add(check);
    check();
  });
  const command = (name, data, type, predicate) => {
    const response = wait(type, predicate, events.length);
    room.send(name, data);
    return response;
  };
  const snapshot = predicate => command('request_state', {}, 'room_state_update', predicate);
  return { room, events, wait, command, snapshot };
}

async function connectRoom(promise) {
  const connection = observe(await promise);
  const identity = await connection.command('request_state', {}, 'room_joined');
  connection.playerId = identity.playerId;
  await connection.wait('room_state_update', state => state.players[identity.playerId]);
  return connection;
}

beforeAll(async () => {
  await ensurePortIsFree();
  temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'wtk-pixel-integration-'));
  fs.mkdirSync(path.join(temporaryDirectory, 'db'));
  server = spawn(process.execPath, [path.resolve(__dirname, '../dist/colyseus_server.js')], {
    cwd: temporaryDirectory,
    env: { ...process.env, PORT: String(PORT), NODE_ENV: 'test', NO_COLOR: '1' },
    stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
  });
  await waitForBoot();
  // Drain subsequent output so the child cannot block on a full pipe.
  server.stdout.on('data', data => { serverOutput = (serverOutput + String(data)).slice(-15000); });
  server.stderr.on('data', data => { serverOutput = (serverOutput + String(data)).slice(-15000); });
});

afterAll(async () => {
  await Promise.all(ownedRooms.map(async room => {
    if (room.connection?.isOpen) {
      await new Promise(resolve => {
        const timeout = setTimeout(resolve, 1000);
        room.onLeave.once(() => { clearTimeout(timeout); resolve(); });
        room.connection.close(1000, 'integration cleanup');
      });
    }
    room.removeAllListeners();
  }));
  if (server && server.exitCode === null && server.signalCode === null) {
    const exited = new Promise(resolve => server.once('exit', resolve));
    server.kill('SIGKILL');
    await exited;
  }
  if (temporaryDirectory) {
    const absolute = path.resolve(temporaryDirectory);
    if (path.dirname(absolute) !== path.resolve(os.tmpdir()) || !path.basename(absolute).startsWith('wtk-pixel-integration-')) {
      throw new Error('Refusing to remove an unexpected integration workspace');
    }
    fs.rmSync(absolute, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
  }
});

test('real Colyseus sessions enforce room identity, drafting, privacy and same-player reconnection', async () => {
  const client = new Client(ENDPOINT);
  const host = await connectRoom(client.create('wtk_room', { playerName: 'Integration Host', mode: 'ONLINE', sandbox: true }));
  const decoy = await connectRoom(new Client(ENDPOINT).create('wtk_room', { playerName: 'Other Room', mode: 'ONLINE', sandbox: true }));
  const guest = await connectRoom(new Client(ENDPOINT).joinById(host.room.id, { playerName: 'Integration Guest' }));

  expect(host.room.id).not.toBe(decoy.room.id);
  expect(guest.room.id).toBe(host.room.id);
  expect(guest.playerId).not.toBe(host.playerId);
  let state = await host.snapshot();
  expect(Object.keys(state.players)).toHaveLength(2);
  expect(state.players[host.playerId].isHost).toBe(true);
  expect(state.players[guest.playerId].isHost).toBe(false);
  expect(Object.keys((await decoy.snapshot()).players)).toHaveLength(1);
  expect(fs.existsSync(path.join(temporaryDirectory, 'db', 'wtk_game.sqlite'))).toBe(true);

  for (const command of ['start_game', 'add_bot']) {
    const error = await guest.command(command, {}, 'game_error');
    expect(error.message).toEqual(expect.any(String));
    state = await host.snapshot();
    expect(state.status).toBe('LOBBY');
    expect(Object.keys(state.players)).toHaveLength(2);
  }

  await host.command('add_bot', {}, 'room_state_update', state => state.turnOrder.length === 3);
  await host.command('add_bot', {}, 'room_state_update', state => state.turnOrder.length === 4);
  state = await host.command('start_game', {}, 'room_state_update', state => state.status === 'DRAFTING');
  expect(state.turnOrder).toHaveLength(4);
  expect(Object.values(state.players).filter(p => p.isBot)).toHaveLength(2);
  expect(state.players[host.playerId].characterChoices.length).toBeGreaterThan(0);
  expect(state.players[guest.playerId].characterChoices).toBeNull();
  expect(state.draftDeadline - Date.now()).toBeGreaterThan(85000);

  const hostOffered = state.players[host.playerId].characterChoices.map(h => h.id);
  const unavailable = HEROES.find(h => !hostOffered.includes(h.id)).id;
  await host.command('choose_character', { characterId: { id: hostOffered[0] } }, 'game_error');
  await host.command('choose_character', { characterId: unavailable }, 'game_error');
  state = await host.snapshot();
  expect(state.players[host.playerId].character).toBe('');
  expect(state.status).toBe('DRAFTING');

  const safeChoice = choices => choices.find(h => !['ZHUGE_LIANG', 'ZHEN_JI'].includes(h.id)).id;
  const guestDraft = await guest.snapshot(state => state.status === 'DRAFTING');
  const guestChoice = safeChoice(guestDraft.players[guest.playerId].characterChoices);
  const hostChoice = safeChoice(state.players[host.playerId].characterChoices);
  await host.command('choose_character', { characterId: hostChoice }, 'room_state_update', state => state.players[host.playerId].character === hostChoice);
  await guest.command('choose_character', { characterId: guestChoice }, 'room_state_update', state => state.status === 'PLAYING');

  const hostPlaying = await host.snapshot(state => state.status === 'PLAYING');
  const guestPlaying = await guest.snapshot(state => state.status === 'PLAYING');
  expect(hostPlaying.rulesVersion).toBe('pixel-1');
  expect(hostPlaying.draftDeadline).toBeNull();
  expect(hostPlaying.players[host.playerId].hand.length).toBeGreaterThanOrEqual(4);
  expect(guestPlaying.players[guest.playerId].hand.length).toBeGreaterThanOrEqual(4);
  for (const [id, p] of Object.entries(hostPlaying.players)) {
    if (id !== host.playerId) expect(p.hand).toBeNull();
    if (id !== host.playerId && p.role !== 'LORD') expect(p.role).toBe('UNKNOWN');
  }
  expect(hostPlaying.deckCount + hostPlaying.discardCount + Object.values(hostPlaying.players).reduce((sum, p) => sum + p.handCount, 0)).toBe(176);

  const token = guest.room.reconnectionToken;
  const identityBefore = guest.playerId;
  const cardsBefore = guestPlaying.players[identityBefore].hand.map(c => c.id);
  const leave = new Promise(resolve => guest.room.onLeave.once(resolve));
  guest.room.connection.close(4000, 'simulate network loss');
  await leave;
  state = await host.snapshot(state => state.players[identityBefore].isDisconnected);
  expect(state.players[identityBefore].isAlive).toBe(true);
  const reconnected = await connectRoom(new Client(ENDPOINT).reconnect(token));
  expect(reconnected.room.id).toBe(host.room.id);
  expect(reconnected.playerId).toBe(identityBefore);
  state = await reconnected.snapshot(state => !state.players[identityBefore].isDisconnected);
  expect(state.players[identityBefore].isAlive).toBe(true);
  expect(state.players[identityBefore].hand.map(c => c.id)).toEqual(cardsBefore);
  expect(state.turnOrder).toHaveLength(4);

  await expect(new Client(ENDPOINT).joinById('nonexistent-pixel-integration-room', { playerName: 'Invalid Join' })).rejects.toThrow();
  expect(Object.keys((await decoy.snapshot()).players)).toHaveLength(1);
});
