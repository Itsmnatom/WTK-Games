"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.experimental = void 0;
exports.beginStrategies = beginStrategies;
exports.chooseStrategy = chooseStrategy;
exports.finishStrategies = finishStrategies;
exports.useStrategy = useStrategy;
exports.observePublicPlay = observePublicPlay;
exports.balanceSummary = balanceSummary;
exports.publicFriendly = publicFriendly;
exports.publicEnemy = publicEnemy;
exports.experimentalBotTurn = experimentalBotTurn;
const experimental_1 = require("../shared/experimental");
const catalog_1 = require("../shared/catalog");
const phaseLogic_1 = require("./phaseLogic");
const presentationEvents_1 = require("./presentationEvents");
const experimental = (room) => room.ruleset === 'EXPERIMENTAL';
exports.experimental = experimental;
function beginStrategies(room) {
    if (!(0, exports.experimental)(room) || room.strategiesRevealed)
        return false;
    if (room.status !== 'STRATEGY') {
        room.status = 'STRATEGY';
        room.draftDeadline = null;
        room.strategyDeadline = Date.now() + 30000;
        for (const player of Object.values(room.players))
            if (player.isBot) {
                player.strategyChoice = player.hp <= 3 ? 'SUPPLY' : (0, catalog_1.canonicalHero)(player.character) === 'ZHANG_FEI' ? 'MUSTER' : 'OFFENSIVE';
            }
    }
    finishStrategies(room);
    room._broadcastFn?.();
    return true;
}
function chooseStrategy(room, player, id) {
    if (room.status !== 'STRATEGY' || Date.now() >= room.strategyDeadline || player.strategyChoice || !experimental_1.STRATEGIES.some(s => s.id === id))
        return false;
    player.strategyChoice = id;
    finishStrategies(room);
    room._broadcastFn?.();
    return true;
}
function finishStrategies(room) {
    if (room.status !== 'STRATEGY')
        return;
    const players = Object.values(room.players).filter(p => p.isAlive);
    if (Date.now() >= room.strategyDeadline)
        for (const p of players)
            p.strategyChoice || (p.strategyChoice = 'MUSTER');
    if (players.some(p => !p.strategyChoice))
        return;
    for (const p of players) {
        p.strategy = p.strategyChoice;
        p.strategyUsed = false;
    }
    room.strategiesRevealed = true;
    room.strategyDeadline = null;
    (0, phaseLogic_1.startPlayPhase)(room);
}
function useStrategy(room, p, cardId) {
    if (!(0, exports.experimental)(room) || room.status !== 'PLAYING' || !p.isAlive || p.strategyUsed || room.pendingAction || room.currentPhase !== 'PLAY' || room.turnOrder[room.currentTurnIndex] !== p.id || !['MUSTER', 'OFFENSIVE'].includes(p.strategy))
        return false;
    const index = p.hand.findIndex(c => c.id === cardId);
    if (index < 0)
        return false;
    room.discardPile.push(p.hand.splice(index, 1)[0]);
    p.strategyUsed = true;
    if (p.strategy === 'MUSTER')
        p.hand.push(...(0, phaseLogic_1.drawCards)(room, 2));
    else
        p.extraAttacks = (p.extraAttacks || 0) + 1;
    (0, presentationEvents_1.emitHeroSkill)(room, p.id, 'PLAN_' + p.strategy);
    room._broadcastFn?.();
    return true;
}
function observePublicPlay(room, actor, name, targets, kind, skill, playId) {
    if (!(0, exports.experimental)(room))
        return;
    const key = playId || `${room.turnNumber}-${actor}-${name}`;
    room._observedPlays || (room._observedPlays = new Set());
    if (room._observedPlays.has(key))
        return;
    room._observedPlays.add(key);
    if (room._observedPlays.size > 256)
        room._observedPlays.delete(room._observedPlays.values().next().value);
    const attack = kind === 'PLAY' && ['SLASH', 'THUNDER_ATTACK', 'DUEL', 'FIRE_ATTACK', 'BORROWED_SWORD'].includes(name) || ['FANJIAN', 'LIJIAN'].includes(skill || '');
    const chosen = name === 'BORROWED_SWORD' ? targets.slice(1) : targets;
    const lord = Object.values(room.players).find(p => p.role === 'LORD');
    if (lord && chosen.includes(lord.id) && actor !== lord.id) {
        room.publicAlignment || (room.publicAlignment = {});
        const delta = attack ? -2 : name === 'PEACH' || skill === 'QINGNANG' ? 2 : 0;
        room.publicAlignment[actor] = Math.max(-6, Math.min(6, (room.publicAlignment[actor] || 0) + delta));
    }
}
function balanceSummary(room) {
    if (!(0, exports.experimental)(room) || room.status !== 'ENDED')
        return null;
    return { version: 'experimental-1', roomId: room.roomId, seats: room.turnOrder.length, winner: room.winnerRole, turns: room.turnNumber,
        gameplaySeconds: Math.round(((room.endedAt || Date.now()) - (room.playStartedAt || room.startedAt || Date.now())) / 1000),
        players: Object.values(room.players).map(p => ({ id: p.id, hero: (0, catalog_1.canonicalHero)(p.character), role: p.role, isBot: p.isBot, alive: p.isAlive, plan: p.strategy, planUsed: !!p.strategyUsed, damageDealt: p.experimentDamageDealt || 0, damageTaken: p.experimentDamageTaken || 0, won: p.role === room.winnerRole || room.winnerRole === 'LORD' && p.role === 'LOYALIST' })),
        note: 'One observed match is not proof of balance; compare many matches by seat count, hero, role and plan.' };
}
/** In experimental mode, another living player's hidden role is never consulted. */
function publicFriendly(room, self, target) {
    if (self.id === target.id)
        return true;
    const lord = Object.values(room.players).find(p => p.role === 'LORD');
    const score = target.id === lord?.id ? 6 : (room.publicAlignment?.[target.id] || 0);
    if (self.role === 'REBEL')
        return score < 0;
    if (self.role === 'LORD' || self.role === 'LOYALIST')
        return score > 0;
    return false;
}
function publicEnemy(room, self, target) {
    if (!target?.isAlive || self.id === target.id)
        return false;
    const lord = Object.values(room.players).find(p => p.role === 'LORD');
    if (self.role === 'REBEL')
        return target.id === lord?.id || (room.publicAlignment?.[target.id] || 0) > 0;
    if (self.role === 'RENEGADE')
        return Object.values(room.players).filter(p => p.isAlive).length === 2 || target.id !== lord?.id;
    return target.id !== lord?.id && (room.publicAlignment?.[target.id] || 0) <= 0;
}
function experimentalBotTurn(room, bot) {
    if (!(0, exports.experimental)(room))
        return false;
    if (!bot.strategyUsed && bot.hand.length && ((bot.strategy === 'MUSTER' && bot.hand.length < 4) || (bot.strategy === 'OFFENSIVE' && room.attacksPlayedInTurn >= 1 && bot.hand.some(c => ['SLASH', 'THUNDER_ATTACK'].includes(c.name)))))
        return useStrategy(room, bot, bot.hand.find(c => !['SLASH', 'THUNDER_ATTACK', 'PEACH'].includes(c.name))?.id || bot.hand[0].id);
    return false;
}
//# sourceMappingURL=experimental.js.map