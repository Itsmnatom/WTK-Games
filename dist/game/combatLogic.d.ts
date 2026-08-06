import type { GameRoom, Card, DamageType } from './types';
declare function checkGameOver(room: GameRoom): boolean;
declare function dealDamage(room: GameRoom, targetPlayerId: string, damage: number, cardUsed: Card | null, attackerId: string | null, damageType?: DamageType): void;
declare function startDyingPhase(room: GameRoom, dyingPlayerId: string, attackerId?: string | null): void;
declare function checkDyingAskerBot(room: GameRoom): void;
declare function advanceDyingAsker(room: GameRoom): void;
declare function resumeAfterAttack(room: GameRoom): void;
declare function getCardById(room: GameRoom, cardId: string | null | undefined): Card | null;
export { checkGameOver, dealDamage, startDyingPhase, checkDyingAskerBot, advanceDyingAsker, resumeAfterAttack, getCardById, };
//# sourceMappingURL=combatLogic.d.ts.map