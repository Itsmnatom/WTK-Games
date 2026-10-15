export type CardKind = 'BASIC' | 'KIT' | 'DELAYED' | 'EQUIPMENT';
export type Faction = 'WEI' | 'SHU' | 'WU' | 'QUN';
export interface CardDefinition {
    id: string;
    name: string;
    description: string;
    kind: CardKind;
    count: number;
    range?: number;
    slot?: string;
    art: number;
}
export interface HeroDefinition {
    id: string;
    name: string;
    english: string;
    faction: Faction;
    hp: number;
    gender: 'MALE' | 'FEMALE';
    skills: string;
    art: number;
}
export declare const CARDS: CardDefinition[];
export declare const CARD_BY_ID: Record<string, CardDefinition>;
export declare const HEROES: HeroDefinition[];
export declare const HERO_BY_ID: Record<string, HeroDefinition>;
export declare function canonicalHero(value: unknown): string;
export declare const RULES: Readonly<{
    version: "pixel-1";
    minPlayers: 4;
    maxPlayers: 10;
    defaultPlayers: 6;
    reactionMs: 20000;
    draftMs: 90000;
    reconnectSeconds: 45;
    turnDeadline: null;
    deckSize: 176;
}>;
export declare const FACTIONS: {
    WEI: {
        name: string;
        seal: string;
        color: string;
    };
    SHU: {
        name: string;
        seal: string;
        color: string;
    };
    WU: {
        name: string;
        seal: string;
        color: string;
    };
    QUN: {
        name: string;
        seal: string;
        color: string;
    };
};
export declare const ROLES: Record<string, {
    name: string;
    seal: string;
    color: string;
    goal: string;
}>;
export declare function seededRandom(seed: number): () => number;
export declare function shuffle<T>(items: readonly T[], random?: () => number): T[];
//# sourceMappingURL=catalog.d.ts.map