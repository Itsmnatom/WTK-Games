'use strict';
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

const HOOK_NAMES = ['onGameStart', 'onCardPlayed', 'onDamageDealt', 'onHeroSkillTriggered', 'onGameOver'] as const;

class PluginManager {
  plugins: Plugin[];
  hooks: Record<string, HookFunction[]>;
  onRoomCreate?: (roomId: string) => void;
  onRoomDispose?: (roomId: string) => void;
  loadPlugins?: () => void;

  constructor() {
    this.plugins = [];
    this.hooks = {
      onGameStart: [],
      onCardPlayed: [],
      onDamageDealt: [],
      onHeroSkillTriggered: [],
      onGameOver: []
    };
  }

  registerPlugin(plugin: Plugin): void {
    if (!plugin || !plugin.name) {
      console.error('❌ Plugin error: plugin must have a name');
      return;
    }
    this.plugins.push(plugin);
    console.log(`🔌 Plugin System: Registered plugin [${plugin.name} v${plugin.version || '1.0.0'}]`);

    // Register hooks
    for (const hookName of HOOK_NAMES) {
      if (typeof plugin[hookName] === 'function') {
        this.hooks[hookName].push((plugin[hookName] as HookFunction).bind(plugin));
      }
    }
  }

  triggerHook(hookName: string, eventData: PluginHookData): void {
    if (!this.hooks[hookName]) return;
    for (const fn of this.hooks[hookName]) {
      try {
        fn(eventData);
      } catch (err) {
        console.error(`❌ Plugin Hook Error [${hookName}]:`, err);
      }
    }
  }
}

const pluginManager = new PluginManager();

// Built-in Sound & SFX Audio Plugin
const soundEffectsPlugin: Plugin = {
  name: 'SoundEffectsPlugin',
  version: '1.2.0',
  onCardPlayed(data: PluginHookData) {
    const { room, cardName } = data;
    if (!room || !room.roomId) return;
    let sfx = 'card_play.mp3';
    if (cardName === 'SLASH') sfx = 'slash.mp3';
    else if (cardName === 'DODGE') sfx = 'dodge.mp3';
    else if (cardName === 'PEACH') sfx = 'peach.mp3';
    else if (cardName === 'WINE') sfx = 'wine.mp3';
    else if (cardName === 'FIRE_ATTACK') sfx = 'fire.mp3';
    else if (cardName === 'LIGHTNING') sfx = 'thunder.mp3';

    // Broadcast sfx trigger to clients
    if ((global as any).io) {
      (global as any).io.to(room.roomId).emit('play_sfx', { sfx, cardName });
    }
  },
  onDamageDealt(data: PluginHookData) {
    const { room, targetId, damage } = data;
    if ((global as any).io && room) {
      (global as any).io.to(room.roomId).emit('play_sfx', { sfx: 'damage.mp3', targetId, damage });
    }
  }
};

pluginManager.registerPlugin(soundEffectsPlugin);

export default pluginManager;
