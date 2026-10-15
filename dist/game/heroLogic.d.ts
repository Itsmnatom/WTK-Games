import type { GameRoom, Player, Card, AttackDescriptor } from './types';
export declare const heroId: (p: Player) => string;
export declare const isRed: (c: Card) => boolean;
export declare function canRespond(player: Player, card: Card, required: string): boolean;
export declare function removeOwnedCard(room: GameRoom, player: Player, id: string, equipment?: boolean): Card | null;
export declare function prompt(room: GameRoom, data: any, onResponse: (data: any) => void): void;
export declare function resolveHeroResponse(room: GameRoom, playerId: string, data: any): boolean;
export declare function expireHeroResponse(room: GameRoom): boolean;
export declare function prepareHeroTurn(room: GameRoom, player: Player, done: () => void): void;
export declare function judgeWithHeroes(room: GameRoom, target: Player, drawn: Card, reason: Card, done: (card: Card) => void): void;
export declare function queueDamageSkills(room: GameRoom, target: Player, sourceId: string | null, card: Card | null, attack?: AttackDescriptor, damage?: number): void;
export declare function healAmount(target: Player, rescuer: Player, card: Card): number;
export declare function startFanjian(room: GameRoom, player: Player, data: any): boolean;
export declare function startLijian(room: GameRoom, player: Player, data: any): boolean;
export declare function useKurou(room: GameRoom, player: Player): boolean;
export declare function startLordSkill(room: GameRoom, lord: Player, data: any): boolean;
export declare function botHeroAction(room: GameRoom, bot: Player): boolean;
//# sourceMappingURL=heroLogic.d.ts.map