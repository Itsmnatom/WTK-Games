import type { Card, GameRoom, Player } from './types';
declare function hasCharacter(player: Player | null | undefined, charName: string): boolean;
declare function initDeck(): Card[];
declare function drawCards(room: GameRoom, count: number): Card[];
declare function assignRoles(room: GameRoom): void;
declare function setupCharacterHp(player: Player, playerCount?: number): void;
declare function startDraftPhase(room: GameRoom): void;
declare function startPlayPhase(room: GameRoom): void;
declare function calculateDistance(room: GameRoom, fromId: string, toId: string): number;
declare function startPlayerTurn(room: GameRoom): void;
declare function executeDrawPhase(room: GameRoom, player: Player, skipDrawPhase?: boolean, skipPlayPhase?: boolean): void;
declare function checkDiscardRequirement(room: GameRoom): void;
declare function endPlayerTurn(room: GameRoom): void;
declare function getSanitizedRoomState(room: GameRoom, targetPlayerId: string): any;
export { initDeck, drawCards, assignRoles, setupCharacterHp, startDraftPhase, startPlayPhase, startPlayerTurn, executeDrawPhase, checkDiscardRequirement, endPlayerTurn, calculateDistance, hasCharacter, getSanitizedRoomState, };
export declare const getAllHeroes: () => any[];
//# sourceMappingURL=phaseLogic.d.ts.map