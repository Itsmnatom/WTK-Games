/**
 * game/types.ts
 * Central type definitions for the WTK-Games server codebase.
 * All server-side modules import from this file for shared type safety.
 */
export type Suit = 'SPADE' | 'HEART' | 'DIAMOND' | 'CLUB';
export type CardType = 'BASIC' | 'KIT' | 'DELAYED' | 'EQUIPMENT';
export interface Card {
    id: string;
    name: string;
    suit: Suit;
    rank: number;
    type: CardType;
    range?: number;
    cardType?: string;
    [key: string]: any;
}
export interface Equipment {
    weapon: Card | null;
    armor: Card | null;
    offensiveHorse: Card | string | null;
    defensiveHorse: Card | string | null;
    treasure: Card | null;
    [key: string]: Card | string | null | undefined;
}
export type Role = 'LORD' | 'LOYALIST' | 'REBEL' | 'RENEGADE' | 'UNKNOWN';
export type GameStatus = 'LOBBY' | 'DRAFTING' | 'STRATEGY' | 'PLAYING' | 'ENDED';
export type Phase = 'START' | 'JUDGEMENT' | 'PREPARATION' | 'DRAW' | 'PLAY' | 'DISCARD';
export type DamageType = 'NORMAL' | 'FIRE' | 'THUNDER';
/** Effective virtual attack; physical payments remain ordinary owned/discarded cards. */
export interface AttackDescriptor {
    readonly name: 'SLASH' | 'THUNDER_ATTACK';
    readonly color: 'RED' | 'BLACK' | 'COLORLESS';
    readonly materialCardIds: readonly string[];
}
export interface HeroChoice {
    id: string;
    name: string;
    title?: string;
    hp?: number;
    skills?: any[];
    pic?: string;
    kingdom?: string;
    sub?: string;
    [key: string]: any;
}
export interface Player {
    id: string;
    name: string;
    socketId: string;
    role: Role;
    character: string;
    hp: number;
    maxHp: number;
    isAlive: boolean;
    isBot: boolean;
    isDisconnected: boolean;
    isHost: boolean;
    wineActive: boolean;
    slashedThisTurn: boolean;
    skillResignationUsed: boolean;
    skillDiaoChanUsed: boolean;
    skillZhouYuUsed: boolean;
    isChained: boolean;
    hand: Card[];
    equipment: Equipment;
    delayedKitZone: Card[];
    characterChoices?: HeroChoice[];
    [key: string]: any;
}
export interface PendingAction {
    type: string;
    sourcePlayerId?: string;
    targetPlayerId?: string;
    cardUsedId?: string | null;
    timeoutAt?: number;
    attack?: AttackDescriptor;
    [key: string]: any;
}
export interface ChatMessage {
    sender: string;
    text: string;
    time: string;
}
export interface ActionData {
    type?: string;
    sourceId: string;
    targetId?: string;
    targetZone?: string;
    cardUsed?: Card | null;
    targets?: string[];
    victimId?: string;
    [key: string]: any;
}
export interface GameRoom {
    roomId: string;
    status: GameStatus;
    mode: 'ONLINE' | 'BOT';
    hostSocketId: string | null;
    turnOrder: string[];
    currentTurnIndex: number;
    currentPhase: Phase;
    deck: Card[];
    discardPile: Card[];
    players: Record<string, Player>;
    pendingAction: PendingAction | null;
    attacksPlayedInTurn: number;
    isBotPassive: boolean;
    chat: ChatMessage[];
    bumperHarvestCards: Card[];
    actionChain: ActionData[];
    negatePassedPlayers: string[];
    winnerRole: string | null;
    winnerText: string | null;
    _broadcastFn?: () => void;
    _emitAll?: (event: string, data: any) => void;
    [key: string]: any;
}
export interface SocketLike {
    id: string;
    emit?: (event: string, data: any) => void;
    send?: (event: string, data: any) => void;
    [key: string]: any;
}
//# sourceMappingURL=types.d.ts.map