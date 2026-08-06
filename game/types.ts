'use strict';
/**
 * game/types.ts
 * Central type definitions for the WTK-Games server codebase.
 * All server-side modules import from this file for shared type safety.
 */

// ─── Card Types ────────────────────────────────────────────────────────────────
export type Suit = 'SPADE' | 'HEART' | 'DIAMOND' | 'CLUB';
export type CardType = 'BASIC' | 'KIT' | 'DELAYED' | 'EQUIPMENT';

export interface Card {
  id: string;
  name: string;
  suit: Suit;
  rank: number;
  type: CardType;
  range?: number;
  cardType?: string;        // alias used in some client data
  [key: string]: any;       // allow extra fields (e.g. weapon range data)
}

// ─── Equipment ─────────────────────────────────────────────────────────────────
export interface Equipment {
  weapon: Card | null;
  armor: Card | null;
  offensiveHorse: Card | string | null;
  defensiveHorse: Card | string | null;
  treasure: Card | null;
  [key: string]: Card | string | null | undefined;
}

// ─── Player & Role Types ───────────────────────────────────────────────────────
export type Role = 'LORD' | 'LOYALIST' | 'REBEL' | 'RENEGADE' | 'UNKNOWN';
export type GameStatus = 'LOBBY' | 'DRAFTING' | 'PLAYING' | 'ENDED';
export type Phase = 'START' | 'JUDGEMENT' | 'PREPARATION' | 'DRAW' | 'PLAY' | 'DISCARD';
export type DamageType = 'NORMAL' | 'FIRE' | 'THUNDER';

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

// ─── Pending Action Types ──────────────────────────────────────────────────────
export interface PendingAction {
  type: string;
  sourcePlayerId?: string;
  targetPlayerId?: string;
  cardUsedId?: string | null;
  timeoutAt?: number;
  [key: string]: any;
}

// ─── Chat Message ──────────────────────────────────────────────────────────────
export interface ChatMessage {
  sender: string;
  text: string;
  time: string;
}

// ─── Action Data (used in Negate Chain) ────────────────────────────────────────
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

// ─── Room State (Game Logic) ───────────────────────────────────────────────────
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

// ─── Socket-like interface (works for both Socket.IO and Colyseus client) ─────
export interface SocketLike {
  id: string;
  emit?: (event: string, data: any) => void;
  send?: (event: string, data: any) => void;
  [key: string]: any;
}
