import type { GameRoom, Card, DamageType, AttackDescriptor } from './types';
export declare function checkGameOver(room: GameRoom): boolean;
export declare function dealDamage(room: GameRoom, targetId: string, damage: number, card: Card | null, attackerId: string | null, type?: DamageType, attack?: AttackDescriptor): void;
export declare function startDyingPhase(room: GameRoom, targetId: string, attackerId?: string | null): void;
export declare function checkDyingAskerBot(room: GameRoom): void;
export declare function rescueDying(room: GameRoom, askerId: string, cardId?: string): boolean;
export declare function killPlayer(room: GameRoom, id: string, killerId?: string | null): void;
export declare function advanceDyingAsker(room: GameRoom): void;
export declare function resumeAfterAttack(room: GameRoom): void;
export declare function getCardById(room: GameRoom, id: string | null | undefined): Card | null;
//# sourceMappingURL=combatEngine.d.ts.map