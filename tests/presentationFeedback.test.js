const fs = require('node:fs');
const vm = require('node:vm');
const { stripTypeScriptTypes } = require('node:module');
const { handleUseCard, handleResolvePending } = require('../dist/game/cardLogic');
const { startFanjian, prepareHeroTurn } = require('../dist/game/heroLogic');
const { rescueDying } = require('../dist/game/combatLogic');
const { withPresentationIdentity } = require('../dist/game/presentationEvents');

const card = (id, name = 'SLASH', suit = 'HEART', type = 'BASIC') => ({ id, name, suit, type, rank: 7 });
function roomFixture() {
  const events = [];
  const roles = ['LORD','REBEL','LOYALIST','RENEGADE'];
  const players = Object.fromEntries(roles.map((role, i) => {
    const id = `p${i + 1}`;
    return [id, { id, name: id, socketId: id, role, character: 'ZHANG_FEI', hp: 4, maxHp: 4, isAlive: true, isBot: false,
      hand: [], delayedKitZone: [], equipment: { weapon: null, armor: null, offensiveHorse: null, defensiveHorse: null, treasure: null } }];
  }));
  const room = { roomId: 'presentation-test', status: 'PLAYING', currentPhase: 'PLAY', currentTurnIndex: 0,
    turnOrder: Object.keys(players), players, deck: [card('deck1'),card('deck2')], discardPile: [], chat: [],
    pendingAction: null, actionChain: [], negatePassedPlayers: [], attacksPlayedInTurn: 0, _schedule: () => {},
    _emitAll: (type, data) => events.push({ type, data: withPresentationIdentity(room, data) }) };
  return { room, events };
}

function loadFeedback(extra = {}) {
  const store = new Map();
  const exports = {};
  const source = stripTypeScriptTypes(fs.readFileSync('client/src/feedback.ts', 'utf8'), { mode: 'transform' })
    .replace(/import\s*\{([^}]+)\}\s*from\s*['"]\.\.\/\.\.\/shared\/catalog['"];?/, 'const {$1} = require("catalog");')
    .replace('export class TableFeedback', 'class TableFeedback') + '\nexports.TableFeedback = TableFeedback;';
  vm.runInNewContext(source, { exports, require: () => require('../dist/shared/catalog'),
    localStorage: { getItem: key => store.get(key) || null, setItem: (key, value) => store.set(key, value) },
    document: { hidden: false, addEventListener() {}, removeEventListener() {} }, ...extra });
  return { TableFeedback: exports.TableFeedback, store };
}
function snapshot(room) {
  return { roomId: room.roomId, status: room.status, players: structuredClone(room.players), turnOrder: [...room.turnOrder],
    currentTurnPlayerId: room.turnOrder[room.currentTurnIndex], currentPhase: room.currentPhase,
    pendingAction: room.pendingAction ? { ...room.pendingAction } : null };
}

describe('authoritative table presentation', () => {
  test('one Halberd play has one presentation; drawing and replaying that physical card remains a new play', () => {
    const { room, events } = roomFixture();
    const slash = { ...card('recycled'), internalOwnerRole: 'REBEL', secretHand: ['private'] };
    room.players.p1.hand = [slash];
    room.players.p1.equipment.weapon = { ...card('halberd','SKY_PIERCING_HALBERD','SPADE','EQUIPMENT'), range: 4 };
    handleUseCard(room, null, { playerId: 'p1', cardId: slash.id, targetPlayerIds: ['p2','p3','p4'] });
    for (const playerId of ['p2','p3','p4']) handleResolvePending(room, null, { playerId, response: 'PASS' });
    const plays = events.filter(e => e.type === 'card_played');
    expect(plays).toHaveLength(3);
    expect(new Set(plays.map(e => e.data.playId)).size).toBe(1);
    expect(new Set(plays.map(e => e.data.eventId)).size).toBe(3);
    expect(plays[0].data.targetIds).toEqual(['p2','p3','p4']);
    expect(plays[0].data.card).toEqual(card('recycled'));
    slash.rank = 13;
    expect(plays[0].data.card.rank).toBe(7);
    const { TableFeedback } = loadFeedback(); const accepted = [];
    const feedback = new TableFeedback({ onPlay: play => accepted.push(play) });
    expect(plays.map(e => feedback.event(e.type, e.data))).toEqual([true,false,false]);
    expect(feedback.event(plays[0].type, plays[0].data)).toBe(false);
    room.players.p1.hand.push(room.discardPile.splice(room.discardPile.indexOf(slash), 1)[0]);
    handleUseCard(room, null, { playerId: 'p1', cardId: slash.id, targetPlayerId: 'p2' });
    const again = events.filter(e => e.type === 'card_played').at(-1);
    expect(again.data.playId).not.toBe(plays[0].data.playId);
    expect(feedback.event(again.type, again.data)).toBe(true);
    expect(accepted).toHaveLength(2);
    feedback.dispose();
  });

  test('skill announcements do not expose Fanjian selection, Guanxing inspection or hidden roles', () => {
    const { room, events } = roomFixture();
    room.players.p1.character = 'ZHOU_YU';
    room.players.p1.hand = [card('secret-selected','NEGATE','CLUB','KIT')];
    expect(startFanjian(room, room.players.p1, { cardId: 'secret-selected', targetPlayerId: 'p2' })).toBe(true);
    expect(events[0].data).toMatchObject({ kind: 'SKILL', skillId: 'FANJIAN', playerId: 'p1' });
    expect(JSON.stringify(events)).not.toMatch(/secret-selected|CLUB|REBEL|RENEGADE/);
    room.pendingAction = null; room.players.p1.character = 'ZHUGE_LIANG'; events.length = 0;
    prepareHeroTurn(room, room.players.p1, () => {});
    expect(events[0].data.skillId).toBe('GUANXING');
    expect(JSON.stringify(events)).not.toMatch(/deck1|deck2/);
  });

  test('a response broadcasts its public card only after a valid card is spent', () => {
    const { room, events } = roomFixture();
    room.pendingAction = { type: 'WAITING_FOR_DODGE', sourcePlayerId: 'p1', targetPlayerId: 'p2', damage: 1, dodgeNeeded: 1, timeoutAt: Date.now() + 20000 };
    room.players.p2.hand = [card('real-dodge','DODGE')];
    handleResolvePending(room, null, { playerId: 'p2', cardId: 'forged', response: 'USE_CARD' });
    expect(events).toHaveLength(0);
    handleResolvePending(room, null, { playerId: 'p2', cardId: 'real-dodge', response: 'USE_CARD' });
    expect(events[0].data).toMatchObject({ kind: 'RESPONSE', cardName: 'DODGE', playerId: 'p2', card: card('real-dodge','DODGE') });
    expect(room.players.p2.hand).toHaveLength(0);
  });

  test('AOE announces public living recipients while actual impacts remain resolution events', () => {
    const { room, events } = roomFixture();
    room.players.p4.isAlive = false;
    room.players.p1.hand = [card('aoe','ARROW_BARRAGE','SPADE','KIT')];
    handleUseCard(room, null, { playerId: 'p1', cardId: 'aoe' });
    expect(events[0].data.targetIds).toEqual(['p2','p3']);
    expect(events.some(e => e.type === 'damage_log')).toBe(false);
    expect(room.players.p2.hp).toBe(4);
    room.actionChain[0].targets.shift();
    expect(events[0].data.targetIds).toEqual(['p2','p3']);
  });

  test('spent self-rescue Wine is public and cues healing rather than ordinary Wine play', () => {
    const { room, events } = roomFixture();
    room.players.p1.hp = 0; room.players.p1.hand = [card('rescue-wine','WINE','CLUB')];
    room.pendingAction = { type:'DYING',targetPlayerId:'p1',currentAskerIdx:0,peachNeeded:1,timeoutAt:Date.now()+20000 };
    expect(rescueDying(room,'p1','rescue-wine')).toBe(true);
    expect(events[0].data).toMatchObject({ kind:'RESPONSE',targetId:'p1',card:card('rescue-wine','WINE','CLUB') });
    const { TableFeedback } = loadFeedback(); const cues = [];
    const feedback = new TableFeedback({ onCue: cue => cues.push(cue) });
    feedback.event(events[0].type,events[0].data); expect(cues).toEqual(['heal']); feedback.dispose();
  });
});

describe('one-shot client feedback', () => {
  test('first/rebound/repeated snapshots are silent; acquisition and dying episodes cue once', () => {
    const { room } = roomFixture(); const { TableFeedback } = loadFeedback(); const cues = [];
    const feedback = new TableFeedback({ onCue: cue => cues.push(cue) });
    feedback.observeSnapshot(snapshot(room), 'p1'); feedback.observeSnapshot(snapshot(room), 'p1');
    expect(cues).toEqual([]);
    room.players.p1.hand.push(card('acquired')); feedback.observeSnapshot(snapshot(room), 'p1');
    feedback.observeSnapshot(snapshot(room), 'p1'); expect(cues).toEqual(['acquire']);
    room.players.p2.hp = 0; room.pendingAction = { type: 'DYING', targetPlayerId: 'p2', currentAskerIdx: 1, timeoutAt: 1 };
    feedback.observeSnapshot(snapshot(room), 'p1'); room.pendingAction.timeoutAt = 2;
    feedback.observeSnapshot(snapshot(room), 'p1'); expect(cues.filter(c => c === 'dying')).toHaveLength(1);
    feedback.resetBaseline(); room.players.p1.hand.push(card('during-disconnect'));
    feedback.observeSnapshot(snapshot(room), 'p1'); expect(cues.filter(c => c === 'acquire')).toHaveLength(1);
    room.status = 'ENDED'; feedback.observeSnapshot(snapshot(room), 'p1'); feedback.observeSnapshot(snapshot(room), 'p1');
    expect(cues.filter(c => c === 'victory')).toHaveLength(1); feedback.dispose();
  });

  test('gesture unlock gates sound; mute/zero persist and dispose closes audio resources', async () => {
    const sources = [], contexts = [];
    const param = () => ({ value: 0, setValueAtTime() {}, cancelScheduledValues() {}, linearRampToValueAtTime() {}, exponentialRampToValueAtTime() {} });
    const node = () => ({ connect() {}, disconnect: jest.fn() });
    class AudioContext {
      constructor() { this.state = 'suspended'; this.currentTime = 0; this.sampleRate = 8000; this.destination = node(); contexts.push(this); }
      createGain() { return { ...node(), gain: param() }; }
      createDynamicsCompressor() { return { ...node(), threshold: param(), knee: param(), ratio: param(), attack: param(), release: param() }; }
      createBuffer(_channels, length) { return { getChannelData: () => new Float32Array(length) }; }
      source() { const source = { ...node(), frequency: param(), start: jest.fn(), stop: jest.fn(), onended: null }; sources.push(source); return source; }
      createOscillator() { return this.source(); }
      createBufferSource() { return this.source(); }
      createBiquadFilter() { return { ...node(), frequency: param(), Q: param() }; }
      createStereoPanner() { return { ...node(), pan: param() }; }
      resume() { this.state = 'running'; return Promise.resolve(); }
      close() { this.state = 'closed'; return Promise.resolve(); }
    }
    const { TableFeedback, store } = loadFeedback({ window: { AudioContext } });
    const feedback = new TableFeedback(); feedback.preview(); expect(sources).toHaveLength(0);
    await feedback.unlock(); feedback.preview(); expect(sources.length).toBeGreaterThan(1);
    const started = sources.length; feedback.toggleMute(); feedback.preview(); expect(sources).toHaveLength(started);
    expect(sources.every(source => source.stop.mock.calls.length > 1 && source.disconnect.mock.calls.length)).toBe(true);
    feedback.toggleMute(); feedback.setVolume(0); feedback.preview(); expect(sources).toHaveLength(started);
    expect(JSON.parse(store.get('wtk.feedback')).volume).toBe(0);
    feedback.dispose(); expect(contexts[0].state).toBe('closed');
  });
});
