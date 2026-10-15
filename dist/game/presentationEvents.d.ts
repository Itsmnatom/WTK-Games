import type { Card, GameRoom } from './types';
export type PublicPlayKind = 'PLAY' | 'RESPONSE' | 'SKILL';
export interface PlayOptions {
    cardName?: string;
    targetId?: string;
    targetIds?: string[];
    skillId?: string;
    kind?: PublicPlayKind;
    playId?: string;
}
export declare function nextPlayId(room: GameRoom): string;
/** Only public scalar card fields cross this presentation boundary. */
export declare function publicPlayedCard(card?: Card | null): Record<string, string | number> | undefined;
export declare function emitCardPlay(room: GameRoom, playerId: string, card?: Card | null, options?: PlayOptions): void;
export declare function emitHeroSkill(room: GameRoom, playerId: string, skillId: string, targetIds?: string[]): void;
export declare function withPresentationIdentity(room: GameRoom, payload: Record<string, unknown>): Record<string, unknown>;
//# sourceMappingURL=presentationEvents.d.ts.map