import { CARD_BY_ID } from '../shared/catalog';
import type { Card, GameRoom } from './types';
import { observePublicPlay } from './experimental';
import { queueTacticDraw } from './expandedHeroes';

export type PublicPlayKind = 'PLAY' | 'RESPONSE' | 'SKILL';
export interface PlayOptions { cardName?: string; targetId?: string; targetIds?: string[]; skillId?: string; kind?: PublicPlayKind; playId?: string }
export function nextPlayId(room: GameRoom): string {
  room._presentationPlaySequence = (room._presentationPlaySequence || 0) + 1;
  return `${room.roomId}:play:${room._presentationPlaySequence}`;
}
/** Only public scalar card fields cross this presentation boundary. */
export function publicPlayedCard(card?: Card | null): Record<string, string | number> | undefined {
  if (!card || !Object.prototype.hasOwnProperty.call(CARD_BY_ID, card.name) || !['SPADE','HEART','CLUB','DIAMOND'].includes(card.suit) || !Number.isInteger(card.rank) || card.rank < 1 || card.rank > 13) return;
  return { id: card.id, name: card.name, suit: card.suit, rank: card.rank, type: card.type };
}
export function emitCardPlay(room: GameRoom, playerId: string, card?: Card | null, options: PlayOptions = {}): void {
  const targetIds = [...new Set(options.targetIds || (options.targetId ? [options.targetId] : []))];
  const visibleCard = publicPlayedCard(card?.presentationCard || card);
  const playId=options.playId || nextPlayId(room),name=options.cardName || card?.effectName || card?.name || 'SKILL';
  observePublicPlay(room,playerId,name,targetIds,options.kind||'PLAY',options.skillId,playId);
  if(((options.kind||'PLAY')==='PLAY'||name==='NEGATE')&&['KIT','DELAYED'].includes(CARD_BY_ID[name]?.kind)&&!(name==='IRON_CHAIN'&&!targetIds.length))queueTacticDraw(room,playerId);
  room._emitAll?.('card_played', {
    playerId, cardName: name,
    ...(visibleCard ? { card: visibleCard } : {}),
    ...(options.targetId ? { targetId: options.targetId } : {}), targetIds,
    ...(options.skillId ? { skillId: options.skillId } : {}),
    kind: options.kind || 'PLAY', playId,
  });
}
export function emitHeroSkill(room: GameRoom, playerId: string, skillId: string, targetIds: string[] = []): void {
  // Skill announcements never include costs, private deck inspection or roles.
  emitCardPlay(room, playerId, null, { skillId, targetIds, targetId: targetIds[0], kind: 'SKILL' });
}
export function withPresentationIdentity(room: GameRoom, payload: Record<string, unknown>): Record<string, unknown> {
  room._presentationEventSequence = (room._presentationEventSequence || 0) + 1;
  const copied = { ...payload };
  if (Array.isArray(payload.targetIds)) copied.targetIds = [...payload.targetIds];
  if (payload.card) copied.card = publicPlayedCard(payload.card as Card);
  return { ...copied, eventId: `${room.roomId}:event:${room._presentationEventSequence}`, serverTime: Date.now() };
}
