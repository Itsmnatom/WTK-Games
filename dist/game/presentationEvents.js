"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextPlayId = nextPlayId;
exports.publicPlayedCard = publicPlayedCard;
exports.emitCardPlay = emitCardPlay;
exports.emitHeroSkill = emitHeroSkill;
exports.withPresentationIdentity = withPresentationIdentity;
const catalog_1 = require("../shared/catalog");
const experimental_1 = require("./experimental");
const expandedHeroes_1 = require("./expandedHeroes");
function nextPlayId(room) {
    room._presentationPlaySequence = (room._presentationPlaySequence || 0) + 1;
    return `${room.roomId}:play:${room._presentationPlaySequence}`;
}
/** Only public scalar card fields cross this presentation boundary. */
function publicPlayedCard(card) {
    if (!card || !Object.prototype.hasOwnProperty.call(catalog_1.CARD_BY_ID, card.name) || !['SPADE', 'HEART', 'CLUB', 'DIAMOND'].includes(card.suit) || !Number.isInteger(card.rank) || card.rank < 1 || card.rank > 13)
        return;
    return { id: card.id, name: card.name, suit: card.suit, rank: card.rank, type: card.type };
}
function emitCardPlay(room, playerId, card, options = {}) {
    const targetIds = [...new Set(options.targetIds || (options.targetId ? [options.targetId] : []))];
    const visibleCard = publicPlayedCard(card?.presentationCard || card);
    const playId = options.playId || nextPlayId(room), name = options.cardName || card?.effectName || card?.name || 'SKILL';
    (0, experimental_1.observePublicPlay)(room, playerId, name, targetIds, options.kind || 'PLAY', options.skillId, playId);
    if (((options.kind || 'PLAY') === 'PLAY' || name === 'NEGATE') && ['KIT', 'DELAYED'].includes(catalog_1.CARD_BY_ID[name]?.kind) && !(name === 'IRON_CHAIN' && !targetIds.length))
        (0, expandedHeroes_1.queueTacticDraw)(room, playerId);
    room._emitAll?.('card_played', {
        playerId, cardName: name,
        ...(visibleCard ? { card: visibleCard } : {}),
        ...(options.targetId ? { targetId: options.targetId } : {}), targetIds,
        ...(options.skillId ? { skillId: options.skillId } : {}),
        kind: options.kind || 'PLAY', playId,
    });
}
function emitHeroSkill(room, playerId, skillId, targetIds = []) {
    // Skill announcements never include costs, private deck inspection or roles.
    emitCardPlay(room, playerId, null, { skillId, targetIds, targetId: targetIds[0], kind: 'SKILL' });
}
function withPresentationIdentity(room, payload) {
    room._presentationEventSequence = (room._presentationEventSequence || 0) + 1;
    const copied = { ...payload };
    if (Array.isArray(payload.targetIds))
        copied.targetIds = [...payload.targetIds];
    if (payload.card)
        copied.card = publicPlayedCard(payload.card);
    return { ...copied, eventId: `${room.roomId}:event:${room._presentationEventSequence}`, serverTime: Date.now() };
}
//# sourceMappingURL=presentationEvents.js.map