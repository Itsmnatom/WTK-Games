// ==========================================
// WTK-GAMES PLUGIN MANAGER
// ==========================================
class PluginManager {
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

  registerPlugin(plugin) {
    if (!plugin || !plugin.name) {
      console.error('❌ Plugin error: plugin must have a name');
      return;
    }
    this.plugins.push(plugin);
    console.log(`🔌 Plugin System: Registered plugin [${plugin.name} v${plugin.version || '1.0.0'}]`);

    // Register hooks
    for (const hookName of Object.keys(this.hooks)) {
      if (typeof plugin[hookName] === 'function') {
        this.hooks[hookName].push(plugin[hookName].bind(plugin));
      }
    }
  }

  triggerHook(hookName, eventData) {
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
const soundEffectsPlugin = {
  name: 'SoundEffectsPlugin',
  version: '1.2.0',
  onCardPlayed(data) {
    const { room, cardName, playerId } = data;
    if (!room || !room.roomId) return;
    let sfx = 'card_play.mp3';
    if (cardName === 'SLASH') sfx = 'slash.mp3';
    else if (cardName === 'DODGE') sfx = 'dodge.mp3';
    else if (cardName === 'PEACH') sfx = 'peach.mp3';
    else if (cardName === 'WINE') sfx = 'wine.mp3';
    else if (cardName === 'FIRE_ATTACK') sfx = 'fire.mp3';
    else if (cardName === 'LIGHTNING') sfx = 'thunder.mp3';
    
    // Broadcast sfx trigger to clients
    if (global.io) {
      global.io.to(room.roomId).emit('play_sfx', { sfx, cardName });
    }
  },
  onDamageDealt(data) {
    const { room, targetId, damage } = data;
    if (global.io && room) {
      global.io.to(room.roomId).emit('play_sfx', { sfx: 'damage.mp3', targetId, damage });
    }
  }
};

pluginManager.registerPlugin(soundEffectsPlugin);

module.exports = pluginManager;
