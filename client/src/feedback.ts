import { CARD_BY_ID } from '../../shared/catalog';
import type { GameCard, RoomSnapshot } from '../../shared/protocol';

export type SoundCue = 'card' | 'slash' | 'fire-cast' | 'thunder-cast' | 'spell' | 'equipment'
  | 'defend' | 'negate' | 'heal' | 'impact' | 'fire-hit' | 'thunder-hit' | 'acquire'
  | 'skill' | 'judgment-good' | 'judgment-bad' | 'dying' | 'death' | 'victory' | 'prompt' | 'turn';
export interface FeedbackSettings { volume: number; muted: boolean; unlocked: boolean }
export interface AcceptedPlay {
  key: string; playerId: string; cardName: string; card?: GameCard; skillId?: string;
  kind: 'PLAY' | 'RESPONSE' | 'SKILL'; targetId?: string; targetIds: string[];
}
export interface FeedbackCallbacks {
  onPlay?: (play: AcceptedPlay) => void;
  onCue?: (cue: SoundCue, data: Record<string, unknown>) => void;
  onSettings?: (settings: FeedbackSettings) => void;
}
const SKILLS = new Set(['ZHIHENG','RENDE','KUROU','LIJIAN','FANJIAN','HUJIA','JIJIANG','JIANXIONG','FANKUI','GUICAI','GUANXING','LUOSHEN','BIYUE','YINGZI','WUSHENG','LONGDAN','QINGGUO']);
const LEGACY_SKILLS: Record<string, string> = {
  'สกิล Zhiheng (ผลัดการ์ด)': 'ZHIHENG', 'สกิล Rende (ปันสุข)': 'RENDE', 'สกิล Ku Rou (โบยตนเอง)': 'KUROU',
};
const SETTINGS_KEY = 'wtk.feedback';
const text = (value: unknown): string => typeof value === 'string' && value.length <= 160 ? value : '';
const record = (value: unknown): Record<string, unknown> => value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
const bounded = (value: number): number => Math.max(0, Math.min(1, value));
function publicCard(value: unknown): GameCard | undefined {
  const c = record(value), name = text(c.name), id = text(c.id), suit = text(c.suit), type = text(c.type);
  if (!Object.hasOwn(CARD_BY_ID, name) || !id || !['SPADE','HEART','CLUB','DIAMOND'].includes(suit) || !['BASIC','KIT','DELAYED','EQUIPMENT'].includes(type) || !Number.isInteger(c.rank) || Number(c.rank) < 1 || Number(c.rank) > 13) return;
  return { id, name, suit, type, rank: Number(c.rank) };
}
class RecentKeys {
  private keys = new Set<string>();
  accept(key: string): boolean {
    if (this.keys.has(key)) return false;
    this.keys.add(key);
    if (this.keys.size > 256) this.keys.delete(this.keys.values().next().value!);
    return true;
  }
  clear(): void { this.keys.clear(); }
}
interface Observation {
  roomId: string; myId: string; status: string; turn: string; hand: Set<string>;
  players: Record<string, { hp: number; alive: boolean }>;
  dying: string; prompt: string;
}
interface Voice { source: AudioScheduledSourceNode; nodes: AudioNode[]; important: boolean }

/** Presentation and sound follow authoritative events, never a render tick. */
export class TableFeedback {
  private settings: FeedbackSettings = { volume: 0.35, muted: false, unlocked: false };
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private noise: AudioBuffer | null = null;
  private voices = new Set<Voice>();
  private eventKeys = new RecentKeys();
  private playKeys = new RecentKeys();
  private observation: Observation | null = null;
  private roomId = '';
  private localSequence = 0;
  private disposed = false;
  private lastImpact = -Infinity;
  private lastExplainedAcquisition = -Infinity;
  private importantLayer = false;
  private onVisibility = () => { if (document.hidden) this.stopVoices(); };

  constructor(private callbacks: FeedbackCallbacks = {}) {
    try {
      const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || 'null');
      if (saved && typeof saved.volume === 'number' && Number.isFinite(saved.volume)) this.settings.volume = bounded(saved.volume);
      if (saved && typeof saved.muted === 'boolean') this.settings.muted = saved.muted;
    } catch { /* Optional persistence must not interrupt play. */ }
    if (typeof document !== 'undefined') document.addEventListener('visibilitychange', this.onVisibility);
  }
  getSettings(): FeedbackSettings { return { ...this.settings }; }
  /** Settings preview is local and never fabricates a game event. */
  preview(cue: SoundCue = 'impact'): void {
    if (this.disposed) return;
    const context = this.context;
    if (!context || context.state !== 'running' || !this.settings.unlocked || this.settings.muted || !this.settings.volume || typeof document !== 'undefined' && document.hidden) return;
    this.playAudio(cue);
  }
  /** Call when a connection is rebound; the first refreshed snapshot is silent. */
  resetBaseline(): void { this.observation = null; }
  unlock(): Promise<void> {
    if (this.disposed || typeof window === 'undefined') return Promise.resolve();
    if (this.context?.state === 'running' && this.settings.unlocked) return Promise.resolve();
    try {
      if (!this.context) {
        const Context = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Context) return Promise.resolve();
        this.context = new Context();
        this.master = this.context.createGain();
        this.compressor = this.context.createDynamicsCompressor();
        this.compressor.threshold.value = -12; this.compressor.knee.value = 12;
        this.compressor.ratio.value = 6; this.compressor.attack.value = 0.004; this.compressor.release.value = 0.15;
        this.compressor.connect(this.master); this.master.connect(this.context.destination);
        this.master.gain.value = this.settings.muted ? 0 : this.settings.volume;
        const length = Math.ceil(this.context.sampleRate * 1.3);
        this.noise = this.context.createBuffer(1, length, this.context.sampleRate);
        const samples = this.noise.getChannelData(0); let seed = 170513;
        for (let i = 0; i < samples.length; i++) { seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5; samples[i] = ((seed >>> 0) / 4294967296) * 2 - 1; }
        this.context.onstatechange = () => { if (!this.disposed) { this.settings.unlocked = this.context?.state === 'running'; this.notifySettings(); } };
      }
      // The resume call happens before any await, preserving the trusted gesture.
      const context = this.context;
      return context.resume().then(() => {
        if (this.disposed || this.context !== context) return;
        this.settings.unlocked = context.state === 'running'; this.notifySettings();
      }).catch(() => { if (!this.disposed) { this.settings.unlocked = false; this.notifySettings(); } });
    } catch { this.settings.unlocked = false; this.notifySettings(); return Promise.resolve(); }
  }
  setVolume(volume: number): void {
    if (this.disposed || !Number.isFinite(volume)) return;
    this.settings.volume = bounded(volume); this.applySettings();
  }
  toggleMute(): boolean {
    if (!this.disposed) { this.settings.muted = !this.settings.muted; this.applySettings(); }
    return this.settings.muted;
  }
  private applySettings(): void {
    if (this.master && this.context) {
      const now = this.context.currentTime;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.setValueAtTime(this.settings.muted ? 0 : this.settings.volume, now);
    }
    if (this.settings.muted || this.settings.volume === 0) this.stopVoices();
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify({ volume: this.settings.volume, muted: this.settings.muted })); } catch { /* Storage may be unavailable. */ }
    this.notifySettings();
  }
  private notifySettings(): void { this.callbacks.onSettings?.(this.getSettings()); }

  event(type: string, payload: unknown): boolean {
    if (this.disposed || !['card_played','damage_log','judgement_result'].includes(type)) return false;
    const data = record(payload), eventId = text(data.eventId);
    if (type === 'card_played') {
      const playerId = text(data.playerId), card = publicCard(data.card);
      const suppliedName = text(data.cardName);
      const suppliedSkill = text(data.skillId) || LEGACY_SKILLS[suppliedName];
      const skillId = SKILLS.has(suppliedSkill) ? suppliedSkill : undefined;
      const cardName = Object.hasOwn(CARD_BY_ID, suppliedName) ? suppliedName : card?.name || '';
      if (!playerId || !cardName && !skillId) return false;
      if (eventId && !this.eventKeys.accept(eventId)) return false;
      const key = text(data.playId) || eventId || `local:${++this.localSequence}`;
      if (!this.playKeys.accept(key)) return false;
      const targetId = text(data.targetId) || undefined;
      const targetIds = [...new Set((Array.isArray(data.targetIds) ? data.targetIds : targetId ? [targetId] : []).map(text).filter(Boolean))].slice(0, 10);
      const play: AcceptedPlay = { key, playerId, cardName, card, skillId,
        kind: skillId ? 'SKILL' : data.kind === 'RESPONSE' ? 'RESPONSE' : 'PLAY', targetId, targetIds };
      this.callbacks.onPlay?.(play);
      const cue = skillId ? 'skill' : cardName === 'SLASH' ? 'slash' : cardName === 'THUNDER_ATTACK' ? 'thunder-cast'
        : cardName === 'FIRE_ATTACK' ? 'fire-cast' : cardName === 'DODGE' ? 'defend' : cardName === 'NEGATE' ? 'negate'
        : ['PEACH','PEACH_GARDEN'].includes(cardName) || cardName === 'WINE' && play.kind === 'RESPONSE' ? 'heal' : CARD_BY_ID[cardName]?.kind === 'EQUIPMENT' ? 'equipment'
        : CARD_BY_ID[cardName]?.kind === 'KIT' || CARD_BY_ID[cardName]?.kind === 'DELAYED' ? 'spell' : 'card';
      if (cue === 'heal' || cue === 'skill') this.lastExplainedAcquisition = Date.now();
      this.cue(cue, { ...play }); return true;
    }
    if (type === 'damage_log') {
      const targetId = text(data.targetId), damage = Number(data.damage), damageType = text(data.damageType);
      if (!targetId || !Number.isFinite(damage) || damage <= 0 || !['NORMAL','FIRE','THUNDER'].includes(damageType)) return false;
      if (eventId && !this.eventKeys.accept(eventId)) return false;
      this.cue(damageType === 'FIRE' ? 'fire-hit' : damageType === 'THUNDER' ? 'thunder-hit' : 'impact',
        { targetId, attackerId: text(data.attackerId), damage, hp: Number(data.hp), damageType }); return true;
    }
    const card = publicCard(data.card), targetId = text(data.targetPlayerId);
    if (!card || !targetId || typeof data.isSuccess !== 'boolean') return false;
    if (eventId && !this.eventKeys.accept(eventId)) return false;
    this.cue(data.isSuccess ? 'judgment-good' : 'judgment-bad', { targetId, card, isSuccess: data.isSuccess }); return true;
  }

  observeSnapshot(state: RoomSnapshot, myId: string): void {
    if (this.disposed) return;
    const p = state.pendingAction;
    const current: Observation = { roomId: state.roomId, myId, status: state.status, turn: state.currentTurnPlayerId,
      hand: new Set(state.players[myId]?.hand?.map(c => c.id) || []),
      players: Object.fromEntries(Object.entries(state.players).map(([id, value]) => [id, { hp: value.hp, alive: value.isAlive }])),
      dying: p?.type === 'DYING' ? String(p.targetPlayerId || '') : '',
      prompt: p && (p.targetPlayerId === myId || p.currentPlayerToSlash === myId || p.currentPickerId === myId || p.type === 'DYING' && state.turnOrder[p.currentAskerIdx] === myId || p.type === 'WAITING_FOR_AOE' && p.targets?.[p.currentTargetIndex] === myId)
        ? `${p.type}:${p.targetPlayerId || p.currentPlayerToSlash || p.currentPickerId || ''}` : '' };
    const previous = this.observation; this.observation = current;
    if (!previous || previous.roomId !== current.roomId || previous.myId !== myId) {
      if (this.roomId && this.roomId !== current.roomId) { this.eventKeys.clear(); this.playKeys.clear(); }
      this.roomId = current.roomId;
      return;
    }
    if (previous.status !== 'PLAYING' && current.status === 'PLAYING') { this.cue('turn', { playerId: current.turn, local: current.turn === myId }); return; }
    if (previous.status !== 'ENDED' && current.status === 'ENDED') { this.cue('victory', { winnerRole: state.winnerRole }); return; }
    if (current.status !== 'PLAYING') return;
    for (const [id, player] of Object.entries(current.players)) {
      const old = previous.players[id];
      if (old?.alive && !player.alive) this.cue('death', { targetId: id });
      else if (old && player.alive && player.hp > old.hp && Date.now() - this.lastExplainedAcquisition > 220) this.cue('heal', { targetId: id, recovered: old.hp <= 0, amount: player.hp - old.hp });
    }
    if (current.dying && current.dying !== previous.dying) this.cue('dying', { targetId: current.dying });
    if (current.turn !== previous.turn) this.cue('turn', { playerId: current.turn, local: current.turn === myId });
    if (current.prompt && current.prompt !== previous.prompt && !current.dying) this.cue('prompt', { playerId: myId });
    const count = [...current.hand].filter(id => !previous.hand.has(id)).length;
    if (count && Date.now() - this.lastExplainedAcquisition > 220) this.cue('acquire', { playerId: myId, count });
  }
  private cue(cue: SoundCue, data: Record<string, unknown>): void {
    this.callbacks.onCue?.(cue, data);
    const context = this.context;
    if (!context || context.state !== 'running' || !this.settings.unlocked || this.settings.muted || !this.settings.volume || typeof document !== 'undefined' && document.hidden) return;
    if (cue === 'turn' && !data.local) return;
    if (['impact','fire-hit','thunder-hit'].includes(cue)) {
      if (context.currentTime - this.lastImpact < 0.095) return;
      this.lastImpact = context.currentTime;
    }
    this.playAudio(cue);
  }
  private playAudio(cue: SoundCue): void {
    this.importantLayer = ['impact','fire-hit','thunder-hit','dying','death','victory'].includes(cue);
    if (this.importantLayer) for (const voice of [...this.voices]) {
      if (this.voices.size <= 24) break;
      if (!voice.important) { try { voice.source.stop(); } catch {} this.releaseVoice(voice); }
    }
    try { this.sound(cue); } catch {
      // Audio device/lifecycle failures must not interrupt accepted visual feedback.
      this.stopVoices(); this.settings.unlocked = false; this.notifySettings();
    }
  }
  private sound(cue: SoundCue): void {
    const n = (frequency: number, duration: number, gain: number, delay = 0, pan = 0) => this.layer('noise', frequency, duration, gain, delay, pan);
    const t = (frequency: number, end: number, duration: number, gain: number, delay = 0, waveform: OscillatorType = 'sine') => this.layer(waveform, frequency, duration, gain, delay, 0, end);
    const body = (weight = 1) => { t(132, 72, 0.26, 0.16 * weight, 0.012, 'triangle'); t(66, 42, 0.34, 0.12 * weight, 0.03); };
    switch (cue) {
      case 'card': case 'acquire': n(3100, 0.085, cue === 'acquire' ? 0.028 : 0.05); n(1300, 0.14, 0.025, 0.028); break;
      case 'slash': n(1700, 0.19, 0.075); t(880, 570, 0.16, 0.026, 0.045, 'triangle'); n(4500, 0.045, 0.05, 0.11); break;
      case 'equipment': n(3700, 0.045, 0.045); t(310, 300, 0.23, 0.075, 0, 'triangle'); t(810, 790, 0.25, 0.032, 0.015); t(1420, 1380, 0.18, 0.017, 0.022); break;
      case 'impact': n(2400, 0.035, 0.085); body(); n(430, 0.18, 0.045, 0.065); break;
      case 'fire-cast': n(680, 0.36, 0.065); n(3200, 0.15, 0.04, 0.05, -0.25); t(150, 90, 0.27, 0.035, 0.04, 'triangle'); break;
      case 'fire-hit': n(2600, 0.042, 0.075); body(0.85); n(480, 0.38, 0.075, 0.035); n(4200, 0.12, 0.025, 0.20, 0.25); break;
      case 'thunder-cast': n(4500, 0.065, 0.065); t(220, 74, 0.28, 0.07, 0.035, 'triangle'); n(1500, 0.18, 0.04, 0.09); break;
      case 'thunder-hit': n(4100, 0.036, 0.10); body(1.1); n(330, 0.56, 0.058, 0.055); n(2200, 0.10, 0.027, 0.17, -0.3); n(1600, 0.15, 0.018, 0.30, 0.3); break;
      case 'negate': n(620, 0.18, 0.045); n(3400, 0.055, 0.07, 0.21); t(140, 54, 0.27, 0.09, 0.23, 'triangle'); break;
      case 'defend': n(2500, 0.115, 0.048); t(640, 530, 0.17, 0.03, 0.027, 'triangle'); break;
      case 'heal': n(5100, 0.20, 0.018); t(1330, 1300, 0.36, 0.03); t(2180, 2150, 0.26, 0.014, 0.035); break;
      case 'judgment-good': n(1900, 0.045, 0.045); t(930, 905, 0.20, 0.023, 0.035); break;
      case 'judgment-bad': n(1400, 0.045, 0.055); t(190, 110, 0.22, 0.065, 0.025, 'triangle'); break;
      case 'dying': t(110, 46, 0.60, 0.14, 0, 'triangle'); n(450, 0.48, 0.035, 0.035); break;
      case 'death': n(780, 0.065, 0.055); t(96, 40, 0.62, 0.16, 0.016, 'triangle'); n(240, 0.40, 0.035, 0.06); break;
      case 'victory': n(2500, 0.06, 0.055); t(170, 90, 0.72, 0.13, 0.018, 'triangle'); t(530, 515, 0.9, 0.042, 0.05); t(1230, 1180, 0.67, 0.026, 0.075); n(3200, 0.48, 0.023, 0.20, 0.25); break;
      case 'turn': case 'prompt': n(1800, 0.055, 0.026); t(460, 410, 0.11, 0.019, 0.015); break;
      case 'spell': case 'skill': n(1100, 0.23, 0.044); t(230, 120, 0.25, 0.06, 0.028, 'triangle'); n(4700, 0.12, 0.02, 0.10, -0.2); break;
    }
  }
  private layer(kind: OscillatorType | 'noise', frequency: number, duration: number, amplitude: number, delay: number, pan: number, endFrequency?: number): void {
    const context = this.context, output = this.compressor;
    if (!context || !output || this.voices.size >= 32) return;
    const when = context.currentTime + delay, gain = context.createGain(), nodes: AudioNode[] = [gain];
    const source = kind === 'noise' ? context.createBufferSource() : context.createOscillator();
    if (kind === 'noise') {
      (source as AudioBufferSourceNode).buffer = this.noise;
      const filter = context.createBiquadFilter(); filter.type = 'bandpass'; filter.frequency.value = frequency; filter.Q.value = 0.7;
      source.connect(filter); filter.connect(gain); nodes.push(filter);
    } else {
      const oscillator = source as OscillatorNode; oscillator.type = kind;
      oscillator.frequency.setValueAtTime(frequency, when);
      oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency || frequency), when + duration);
      source.connect(gain);
    }
    if (pan && typeof context.createStereoPanner === 'function') {
      const panner = context.createStereoPanner(); panner.pan.value = pan; gain.connect(panner); panner.connect(output); nodes.push(panner);
    } else gain.connect(output);
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.linearRampToValueAtTime(amplitude, when + Math.min(0.008, duration / 4));
    gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);
    const voice: Voice = { source, nodes, important: this.importantLayer }; this.voices.add(voice);
    source.onended = () => this.releaseVoice(voice);
    source.start(when); source.stop(when + duration + 0.015);
  }
  private releaseVoice(voice: Voice): void {
    voice.source.onended = null; voice.source.disconnect(); voice.nodes.forEach(node => node.disconnect()); this.voices.delete(voice);
  }
  private stopVoices(): void {
    for (const voice of [...this.voices]) { try { voice.source.stop(); } catch { /* It may already have ended. */ } this.releaseVoice(voice); }
  }
  dispose(): void {
    if (this.disposed) return; this.disposed = true;
    if (typeof document !== 'undefined') document.removeEventListener('visibilitychange', this.onVisibility);
    this.stopVoices(); this.eventKeys.clear(); this.playKeys.clear(); this.observation = null;
    this.master?.disconnect(); this.compressor?.disconnect();
    if (this.context) { this.context.onstatechange = null; void this.context.close().catch(() => {}); }
    this.context = null; this.master = null; this.compressor = null; this.noise = null;
    this.settings.unlocked = false;
  }
}
