import { CARD_BY_ID } from '../../shared/catalog';
import type { GameCard, RoomSnapshot } from '../../shared/protocol';

export type SoundCue = 'card' | 'slash' | 'fire-cast' | 'thunder-cast' | 'spell' | 'equipment'
  | 'defend' | 'negate' | 'heal' | 'impact' | 'fire-hit' | 'thunder-hit' | 'acquire'
  | 'skill' | 'judgment-good' | 'judgment-bad' | 'dying' | 'death' | 'victory' | 'prompt' | 'turn'
  | 'chain' | 'break' | 'steal' | 'volley' | 'duel';
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
const SKILLS = new Set(['ZHIHENG','RENDE','KUROU','LIJIAN','FANJIAN','HUJIA','JIJIANG','JIANXIONG','FANKUI','GUICAI','GUANXING','LUOSHEN','BIYUE','YINGZI','WUSHENG','LONGDAN','QINGGUO','TUXI','YIJI','TIANDU','JIZHI','QINGNANG','LIULI','JIJIU','PLAN_MUSTER','PLAN_OFFENSIVE','PLAN_SUPPLY']);
const SOUND_CUES: SoundCue[] = ['card','slash','fire-cast','thunder-cast','spell','equipment','defend','negate','heal','impact','fire-hit','thunder-hit','acquire','skill','judgment-good','judgment-bad','dying','death','victory','prompt','turn','chain','break','steal','volley','duel'];
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
  private buffers = new Map<SoundCue,AudioBuffer>();
  private baking: OfflineAudioContext | null = null;
  private bakingBus: GainNode | null = null;
  private warming = false;
  private soundSequence = 0;
  private resumeOnVisible = false;
  private onVisibility = () => {
    if(document.hidden){this.resumeOnVisible=this.context?.state==='running';this.stopVoices();void this.context?.suspend().catch(()=>{});}
    else if(this.context&&this.resumeOnVisible){this.resumeOnVisible=false;void this.context.resume().then(()=>this.warmSounds()).catch(()=>{});}
  };

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
        void this.warmSounds();
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
        : cardName==='IRON_CHAIN'?'chain':cardName==='SABOTAGE'?'break':['STEAL','BORROWED_SWORD'].includes(cardName)?'steal':['ARROW_BARRAGE','BARBARIAN_INVASION'].includes(cardName)?'volley':cardName==='DUEL'?'duel'
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
    try {
      const buffer=this.buffers.get(cue);
      if(buffer)this.playBuffer(buffer,cue);else this.sound(cue);
    } catch {
      // Audio device/lifecycle failures must not interrupt accepted visual feedback.
      this.stopVoices(); this.settings.unlocked = false; this.notifySettings();
    }
  }
  /** Bake one cue at a time; playback reuses PCM rather than rebuilding filters. */
  private async warmSounds():Promise<void> {
    if(this.warming||this.buffers.size===SOUND_CUES.length||typeof OfflineAudioContext==='undefined')return;
    this.warming=true;
    try{
      for(const cue of SOUND_CUES){
        if(this.disposed||!this.context||document.hidden)return;
        if(this.buffers.has(cue))continue;
        const context=new OfflineAudioContext(2,Math.ceil(24000*1.2),24000);
        const bus=context.createGain();bus.connect(context.destination);
        // Short room reflections are baked, with no live convolution graph.
        if(['slash','equipment','chain','duel','heal','skill','spell','victory'].includes(cue))for(const [time,level] of [[.075,.13],[.14,.065]]){
          const delay=context.createDelay(.2),wet=context.createGain();delay.delayTime.value=time;wet.gain.value=level;bus.connect(delay);delay.connect(wet);wet.connect(context.destination);
        }
        this.baking=context;
        this.bakingBus=bus;
        try{this.sound(cue);}finally{this.baking=null;this.bakingBus=null;}
        const rendered=await context.startRendering();
        if(this.disposed)return;
        let end=rendered.length-1;
        const channels=[rendered.getChannelData(0),rendered.getChannelData(1)];
        while(end>0&&Math.abs(channels[0][end])<.00002&&Math.abs(channels[1][end])<.00002)end--;
        const buffer=this.context!.createBuffer(2,Math.min(rendered.length,end+120),24000);
        channels.forEach((channel,index)=>buffer.copyToChannel(channel.subarray(0,buffer.length),index));
        this.buffers.set(cue,buffer);
      }
    }catch{ /* Live synthesis remains available if offline audio is unsupported. */ }
    finally{this.baking=null;this.bakingBus=null;this.warming=false;}
  }
  private playBuffer(buffer:AudioBuffer,cue:SoundCue):void {
    const context=this.context,output=this.compressor;if(!context||!output)return;
    // A cue is one voice after baking. Reserve capacity for prompts and impacts.
    const important=this.importantLayer||cue==='prompt'||cue==='turn';
    if(this.voices.size>=12){
      const victim=[...this.voices].find(voice=>!voice.important)||(important?this.voices.values().next().value:undefined);
      if(!important||!victim)return;
      try{victim.source.stop();}catch{}this.releaseVoice(victim);
    }
    const source=context.createBufferSource(),gain=context.createGain();source.buffer=buffer;
    source.playbackRate.value=['turn','prompt','judgment-good','judgment-bad'].includes(cue)?1:[.985,1,1.015][this.soundSequence++%3];
    gain.gain.value=!important&&this.voices.size>4?.65:1;
    source.connect(gain);gain.connect(output);
    const voice:Voice={source,nodes:[gain],important};this.voices.add(voice);
    source.onended=()=>this.releaseVoice(voice);source.start();
  }
  private sound(cue: SoundCue): void {
    const n = (frequency: number, duration: number, gain: number, delay = 0, pan = 0, end?:number) => this.layer('noise', frequency, duration, gain, delay, pan,end);
    const t = (frequency: number, end: number, duration: number, gain: number, delay = 0, waveform: OscillatorType = 'sine') => this.layer(waveform, frequency, duration, gain, delay, 0, end);
    const body = (weight = 1) => { t(132, 72, 0.26, 0.16 * weight, 0.012, 'triangle'); t(66, 42, 0.34, 0.12 * weight, 0.03); };
    switch (cue) {
      case 'card': case 'acquire': n(3100, 0.085, cue === 'acquire' ? 0.028 : 0.05); n(1300, 0.14, 0.025, 0.028); break;
      case 'slash': n(950, 0.09, 0.025);n(900, 0.18, 0.065,.025,-.3,5200); t(1100, 510, 0.18, 0.03, 0.045, 'triangle'); n(6200, 0.028, 0.04, 0.12,.3);t(2340,2300,.24,.014,.08);t(3510,3480,.18,.008,.08); break;
      case 'equipment': n(3700, 0.045, 0.045); t(310, 300, 0.23, 0.075, 0, 'triangle'); t(810, 790, 0.25, 0.032, 0.015); t(1420, 1380, 0.18, 0.017, 0.022); break;
      case 'chain': for(let i=0;i<3;i++){n(3200,.035,.032,i*.065,i%2?.2:-.2);t(720+i*90,690+i*90,.16,.025,i*.065,'triangle');}break;
      case 'break': n(2800,.025,.07);t(220,80,.2,.055,.015,'triangle');n(5100,.08,.035,.06,-.25);n(3700,.12,.022,.12,.25);break;
      case 'steal': n(1700,.17,.045,0,-.25);n(3900,.06,.025,.13,.25);t(530,340,.2,.023,.035,'triangle');break;
      case 'volley': for(let i=0;i<3;i++)n(2800+i*450,.13,.03,i*.04,(i-1)*.3);t(120,65,.25,.04,.06,'triangle');break;
      case 'duel': n(4300,.035,.045);t(920,820,.2,.027,0,'triangle');n(3100,.035,.05,.12);t(640,510,.24,.03,.13,'triangle');break;
      case 'impact': n(2800, 0.025, 0.075); body();t(185,95,.15,.04,.008,'triangle'); n(430, 0.22, 0.04, 0.065);n(5200,.08,.018,.10,.25); break;
      case 'fire-cast': n(680, 0.36, 0.065,0,0,2400); n(3200, 0.15, 0.04, 0.05, -0.25); t(150, 90, 0.27, 0.035, 0.04, 'triangle');n(5300,.018,.025,.12,.3);n(4100,.022,.019,.23,-.2); break;
      case 'fire-hit': n(2600, 0.032, 0.065); body(0.85); n(480, 0.45, 0.07, 0.035); n(4200, 0.12, 0.025, 0.20, 0.25);n(5800,.07,.018,.31,-.3); break;
      case 'thunder-cast': n(4500, 0.065, 0.065); t(220, 74, 0.28, 0.07, 0.035, 'triangle'); n(1500, 0.18, 0.04, 0.09); break;
      case 'thunder-hit': n(5100, 0.026, 0.085); body(1.1); n(330, 0.60, 0.058, 0.055); n(2200, 0.10, 0.027, 0.17, -0.3); n(1600, 0.18, 0.018, 0.30, 0.3);t(48,34,.5,.045,.07); break;
      case 'negate': n(620, 0.18, 0.045); n(3400, 0.055, 0.07, 0.21); t(140, 54, 0.27, 0.09, 0.23, 'triangle'); break;
      case 'defend': n(2500, 0.115, 0.048); t(640, 530, 0.17, 0.03, 0.027, 'triangle'); break;
      case 'heal': n(5100, 0.20, 0.014); t(660, 658, 0.45, 0.025); t(1320, 1315, 0.36, 0.022,.045);t(1980,1975,.3,.012,.09); break;
      case 'judgment-good': n(1900, 0.045, 0.045); t(930, 905, 0.20, 0.023, 0.035); break;
      case 'judgment-bad': n(1400, 0.045, 0.055); t(190, 110, 0.22, 0.065, 0.025, 'triangle'); break;
      case 'dying': t(110, 46, 0.60, 0.14, 0, 'triangle'); n(450, 0.48, 0.035, 0.035); break;
      case 'death': n(780, 0.065, 0.055); t(96, 40, 0.62, 0.16, 0.016, 'triangle'); n(240, 0.40, 0.035, 0.06); break;
      case 'victory': n(2500, 0.06, 0.055); t(170, 90, 0.72, 0.13, 0.018, 'triangle'); t(530, 515, 0.9, 0.042, 0.05); t(1230, 1180, 0.67, 0.026, 0.075); n(3200, 0.48, 0.023, 0.20, 0.25); break;
      case 'turn': case 'prompt': n(1800, 0.055, 0.026); t(460, 410, 0.11, 0.019, 0.015); break;
      case 'skill': n(900,.12,.035);t(180,65,.42,.075,.04,'triangle');n(3700,.07,.035,.1,-.25);t(740,700,.55,.022,.14);n(1600,.3,.018,.2,.25);break;
      case 'spell': n(1100, 0.23, 0.044); t(230, 120, 0.25, 0.06, 0.028, 'triangle'); n(4700, 0.12, 0.02, 0.10, -0.2); break;
    }
  }
  private layer(kind: OscillatorType | 'noise', frequency: number, duration: number, amplitude: number, delay: number, pan: number, endFrequency?: number): void {
    const context = this.baking||this.context, output = this.bakingBus||this.baking?.destination||this.compressor;
    if (!context || !output || !this.baking&&this.voices.size >= 32) return;
    const when = context.currentTime + delay, gain = context.createGain(), nodes: AudioNode[] = [gain];
    const source = kind === 'noise' ? context.createBufferSource() : context.createOscillator();
    if (kind === 'noise') {
      (source as AudioBufferSourceNode).buffer = this.noise;
      const filter = context.createBiquadFilter(); filter.type = 'bandpass'; filter.frequency.value = frequency; filter.Q.value = 0.7;
      if(endFrequency){filter.frequency.setValueAtTime(frequency,when);filter.frequency.exponentialRampToValueAtTime(Math.max(20,endFrequency),when+duration);}
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
    if(!this.baking){
      const voice: Voice = { source, nodes, important: this.importantLayer }; this.voices.add(voice);
      source.onended = () => this.releaseVoice(voice);
    }
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
    this.context = null; this.master = null; this.compressor = null; this.noise = null;this.buffers.clear();
    this.settings.unlocked = false;
  }
}
