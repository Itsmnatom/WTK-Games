/**
 * plugins/plugin_manager.ts
 * WTK-Games Plugin Manager — Event-driven hook system
 */
export interface PluginHookData {
    room?: any;
    cardName?: string;
    playerId?: string;
    targetId?: string;
    damage?: number;
    [key: string]: any;
}
type HookFunction = (data: PluginHookData) => void;
export interface Plugin {
    name: string;
    version?: string;
    onGameStart?: HookFunction;
    onCardPlayed?: HookFunction;
    onDamageDealt?: HookFunction;
    onHeroSkillTriggered?: HookFunction;
    onGameOver?: HookFunction;
    onRoomCreate?: (roomId: string) => void;
    onRoomDispose?: (roomId: string) => void;
    [key: string]: any;
}
declare class PluginManager {
    plugins: Plugin[];
    hooks: Record<string, HookFunction[]>;
    onRoomCreate?: (roomId: string) => void;
    onRoomDispose?: (roomId: string) => void;
    loadPlugins?: () => void;
    constructor();
    registerPlugin(plugin: Plugin): void;
    triggerHook(hookName: string, eventData: PluginHookData): void;
}
declare const pluginManager: PluginManager;
export default pluginManager;
//# sourceMappingURL=plugin_manager.d.ts.map