# Table feedback investigation

Date: 2026-10-15 (Asia/Bangkok). Status: confirmed; feedback and focused public presentation metadata implemented. Scope: clearer played cards at the center, action effects and local synthesized SFX. No music, rules changes, external audio services or new game protocol.

## Evidence and current path

- `rooms/WTKRoom.ts:77` attaches `_emitAll` directly to `Room.broadcast`. Several handlers additionally call `this.broadcast('card_played', ...)` directly, including Negate (`:388`), Serpent Spear (`:558`), Zhiheng (`:593`) and Rende (`:626`).
- `client/src/connection.ts:25–32` registers one wildcard `onMessage` handler. Identity messages are handled separately; `room_state_update` calls `onState`; every other message calls `onEvent` once. There is no application event replay or secondary subscribed listener here.
- `client/src/main.ts:221–222` re-renders from every snapshot and forwards gameplay events to `scene.event`. It currently creates no sound engine and retains no center-play history.
- `client/src/scene.ts:80–94` recognizes `damage_log` and `card_played`. Card plays fly a generic card-back box to the center and remove it after about 0.7 seconds. Damage briefly moves a target token. Reduced motion suppresses these animations entirely. This explains why the table does not retain a recognizable face-up played card.

These line references identify the investigated working tree and may move during implementation.

## Existing trustworthy triggers

| Incoming message | Actual payload today | Suitable cue | Limits |
| --- | --- | --- | --- |
| `card_played` | `playerId`, `cardName`, optional `targetId` | Flight, center card, card/material cast SFX | Usually lacks physical card ID, suit, rank, action identity and event identity. `cardName` can be an effective card or a Thai skill label. |
| `damage_log` | `targetId`, `attackerId`, `damage`, `cardName`, `hp`, `maxHp`, `damageType` | Target impact, damage number, physical/fire/thunder hit | `game/combatEngine.ts:42` emits once per damaged victim, including separate victims of chained damage. Physical converted card name can differ from effective attack. |
| `judgement_result` | `title`, public `card`, `isSuccess`, `targetPlayerId`, `targetPlayerName` | Reveal, result seal, short judgment tone | Delayed judgments at `game/phaseLogic.ts:230`; Eight Trigrams at `game/cardLogic.ts:676`. Other preparation judgments are not consistently emitted. |
| `room_state_update` | Individualized authoritative snapshot | Detect transitions only | Never play sound for an ordinary render or for repeated identical state. Initial/reconnection snapshots must be silent. |
| `game_error`, `admin_auth_status` | Control/status metadata | Quiet UI notification, if requested | They are not gameplay casts and must never enter the center card display. |

There are **no** explicit `draw_cards`, `hero_used`, `dying_started`, `player_died`, `game_over` or Negate-resolution messages in the current server. Do not subscribe to imaginary events or present missing messages as implemented features.

Canonical card IDs come from `CARD_BY_ID`; canonical hero IDs from `canonicalHero`/`HERO_BY_ID`; damage types are `NORMAL`, `FIRE`, `THUNDER`. Canonical skill IDs for presentation include `ZHIHENG`, `RENDE`, `KUROU`, `LIJIAN`, `FANJIAN`, `HUJIA`, `JIJIANG`, `JIANXIONG`, `FANKUI`, `GUICAI`, `GUANXING`, `LUOSHEN`, `BIYUE` and `YINGZI`. Use known IDs, not arbitrary event text, to select art and audio. User/player text is rendered with `textContent` or the existing escaping helper.

## Duplicate and missing-event causes

1. `game/cardLogic.ts:70–88` creates one attack sequence but emits `card_played` inside `next()` for each target. A Halberd spending one Slash can therefore yield up to three play broadcasts. Physical play/flight/sound should happen once; target impacts should happen independently. Dedupe by an action-level `playId` allocated outside the sequence continuation. Do not dedupe by card name or by a broad time window: rapid Crossbow attacks can legitimately play several identical card types.
2. A spell's `card_played` precedes Negate resolution. Display and cast SFX belong to the announced play; `damage_log` belongs to actual resolution. Do not infer a hit just because an attack card was announced. Existing Negate card plays identify counter-negation; snapshot action-chain length is supplementary and must not replay the cast sound.
3. `game/cardLogic.ts:697–743` consumes successful Dodge/Duel/AOE response cards without a play event. Borrowed Slash (`rooms/WTKRoom.ts:452`, `game/botAI.ts:335`) and rescue Peach/Wine (`game/combatEngine.ts:83–90`) also lack response-play broadcasts. These cards become public only after being spent; a focused presentation event there is safe.
4. Bot weapon equip/Peach/Ku Rou have some events (`game/botAI.ts:47`, `:59`, `:85`); bot armor/horse equip and several hero paths have none. Human Fanjian/Lijian/Ku Rou (`game/heroLogic.ts:132–163`) currently announce prompts or mutate state without canonical hero-use messages. Do not manufacture physical card faces for skill activations. Treat skill ID + hero portrait as a separate center presentation.
5. `drawCards` only removes cards from the deck (`game/phaseLogic.ts:55`). It is also used for judgments and harvest; adding a public draw sound at this primitive would mislabel those actions and could disclose private draws. A client may detect **own hand acquisition** from added IDs after the first snapshot, but must call it acquisition, since Rende/theft/harvest also add cards. Batch each snapshot's additions into one quiet cue.
6. Snapshot `timeoutAt` changes for each rescuer and responder. Do not use the deadline as the sound key for a DYING episode: it would repeat dramatic warning sounds during every pass. Track a living player's entry into DYING; clear the episode after recovery/death. A new episode can then cue again.
7. `request_state` re-announces `room_joined` and broadcasts snapshots. Connection/reconnection and first snapshot initialization must reset observation baselines without playing historical damage, cards, draws or victory sounds.

## Focused metadata proposal

After confirmation, keep existing message names and add optional presentation metadata only. No room state/schema expansion is required.

```ts
interface PublicPlayMetadata {
  eventId?: string; // unique room-scoped monotonic broadcast identity
  playId?: string;  // one physical play, shared by per-target attack broadcasts
  playerId: string;
  cardName: string; // existing effective public name retained
  card?: { id: string; name: string; suit: string; rank: number; type: string };
  targetId?: string;
  targetIds?: string[];
  skillId?: string;
  kind?: 'PLAY' | 'RESPONSE' | 'SKILL';
  serverTime?: number;
}
```

Emit `card` only when the card is already public through playing, spending, equipping or revealing it. Never include Fanjian's selected hand card before guessing, Guanxing deck cards in a public skill event, a helper's hand, hidden roles or unplayed cost-card identities. Skills may publish only the canonical skill ID, publicly known hero/source and public target IDs. Physical payment art and effective-card art are distinct; show the effective action prominently, with the public payment card available as a smaller conversion detail when supplied.

For Halberd, allocate `playId` once in `startAttackSequence`, then share it across its existing per-target announcements. A global event sequence alone does not dedupe these announcements because they represent different emitted messages. Legacy payloads without IDs may still be accepted once per callback; do not hide legitimate plays using speculative card-name dedupe.

## Client feedback API

`main.ts` owns a persistent DOM center display, settings controls and wiring. `scene.ts` owns 3D projectiles/particles/target impacts. A new isolated `feedback.ts` owns normalization, cue dedupe, snapshot transition observation and WebAudio resources.

```ts
export type SoundCue =
  | 'card' | 'slash' | 'fire-cast' | 'thunder-cast' | 'spell' | 'equipment'
  | 'defend' | 'negate' | 'heal' | 'impact' | 'fire-hit' | 'thunder-hit'
  | 'acquire' | 'skill' | 'judgment-good' | 'judgment-bad'
  | 'dying' | 'death' | 'victory' | 'prompt';

export interface AcceptedPlay {
  key: string;
  playerId: string;
  cardName: string;
  card?: PublicPlayMetadata['card'];
  skillId?: string;
  kind: 'PLAY' | 'RESPONSE' | 'SKILL';
  targetId?: string;
  targetIds: string[];
}

export interface FeedbackCallbacks {
  onPlay?: (play: AcceptedPlay) => void;
  onCue?: (cue: SoundCue, data: Record<string, unknown>) => void;
  onSettings?: (settings: { volume: number; muted: boolean; unlocked: boolean }) => void;
}

export class TableFeedback {
  constructor(callbacks?: FeedbackCallbacks);
  unlock(): Promise<void>; // call synchronously from trusted pointer/keyboard gesture
  observeSnapshot(state: RoomSnapshot, myId: string): void;
  event(type: string, data: unknown): boolean; // true when recognized and accepted
  setVolume(volume: number): void; // normalized 0..1
  toggleMute(): boolean; // returns muted value; retains previous volume
  getSettings(): FeedbackSettings;
  resetBaseline(): void; // first reconnect snapshot remains silent
  preview(cue?: SoundCue): void; // local settings preview; creates no gameplay event
  dispose(): void;
}
```

Main wires callbacks and calls `observeSnapshot` before rendering a new authoritative snapshot. Calls to `event` arrive through the existing single connection hook. `onPlay` updates a retained face-up card/skill display only once for each `playId`; per-target damage still gets its own `onCue` callback and scene response. Keep callbacks independent of audio unlock/mute so presentation works when sound is unavailable. Do not tie sound to DOM reconstruction, `renderBoard`, every `scene.update`, deadlines, hover or each particle.

Use a bounded recent event/play-key set (for example 256 entries), clear it on explicit room change and dispose. Snapshot observation is silent on first/room-change snapshots. If connection binding changes, reset snapshot baseline explicitly or reconstruct the feedback observer without closing a reusable unlocked sound context. Ignore hidden-document audio and never replay a backlog on returning to the tab.

## Local WebAudio implementation design

Apply the Sound Engineer skill's layer architecture at card-table scale: clear attack, controlled body, texture and short tail. Perceived impact comes from contrast and timing, not high gain. Avoid background music, melodies, voices, rhythmic loops, clipping and perpetual rumble.

- Lazily construct one `AudioContext` on `unlock()` from a trusted pointer or keyboard event. `resume()` must be attempted in the same gesture call; rejected/unavailable audio degrades silently. Store master volume/mute locally and reflect them in accessible controls. Suggested initial master volume 0.35; controls range 0..1. Setting zero and mute both silence output.
- Graph: voice layers -> short envelope gain -> optional stereo panner for upper texture -> SFX bus -> conservative compressor/peak-control -> master gain -> destination. Sub/low body stay centered; effects that support stereo use a modest pan inferred from visible target position. Never pan deep sub separately to extremes.
- Sources: reusable generated noise buffers; sine/triangle oscillators for body; short high-pass/band-pass noise for paper/air; two or three damped partials for metallic strike; filtered noise + brief pitched crack for fire/thunder. No downloaded audio or runtime network request is needed.
- Every voice has a hard stop, disconnect-on-ended cleanup and no continuous oscillator. Use envelope ramps beginning above zero where exponential ramps require it. Cap simultaneous active voices/layers; prioritize actual impacts, dying and victory over routine card acquisition.
- Batch rapid chained-damage audio into one audible hit with a small capped intensity increase while retaining every target's visual cue. A roughly 80–120 ms burst gate is for audio density only, never for gameplay-event/card-display dedupe. Skip routine acquisition cue when a simultaneous explicit heal/skill cue already explains it.
- `dispose()` removes gesture/visibility listeners, stops voices, disconnects nodes, clears timers and closes the context. No RAF loop or intervals are needed for audio.

| Cue | Implementable layer stack | Duration / dynamics |
| --- | --- | --- |
| Card flight / acquisition | 15–30 ms high-pass paper/noise tick + 70–110 ms filtered air sweep; acquisition is quieter | 0.12–0.22 s, crisp and light |
| Slash cast | Fast band-pass whoosh + tiny metal partials; no damage boom before hit | 0.18–0.32 s |
| Physical hit | 0–8 ms transient; 10–35 ms triangle body around 90–140 Hz; centered sine falling toward 45–70 Hz; short textured tail | 0.25–0.45 s; fast attack, controlled decay |
| Fire cast / hit | Filtered noise rise; hit adds crack/body + brief low harmonic support; sparse upper ember ticks | 0.30–0.65 s |
| Thunder cast / hit | Short energy/noise crack; 15–40 ms delayed low body; centered sub + two spaced quiet reflections | 0.45–0.80 s; heavier than physical hit without louder peaks |
| Dodge / armor | Soft air cut + damped metal/paper click; no bass hit | 0.15–0.30 s |
| Negate | Reverse-style filtered swell, 20–40 ms micro-gap, short inward energy snap + low body | 0.30–0.50 s, restrained |
| Peach / rescue | Soft noise sparkle + short non-melodic resonant shimmer | 0.30–0.55 s; no musical arpeggio |
| Hero skill / judgment | Known skill material family; judgment uses dry reveal tick + positive shimmer or low dull knock | 0.20–0.55 s |
| Dying / death | One centered low impact + filtered descending pressure tail, never a continuous alarm | 0.45–0.80 s, once per episode |
| Victory | Layered seal/bronze strike, low body and spacious upper tail | 0.75–1.10 s, once on live transition to ENDED |

Frequency values are conservative synthesis starting points, not claimed measured reference frequencies. Small speakers need body/harmonics as well as sub. Reduced motion simplifies visuals without suppressing legible center-card metadata; audio follows the user's sound settings independently.

## Validation after confirmation

1. Unit/smoke-check normalization for all 41 canonical cards, known skills and unknown payloads. A bad payload cannot create HTML, unlimited noise layers or a bogus card.
2. One Halberd physical play produces one retained center card and cast sound; all targets produce separate hit visuals. Two legal Crossbow Slashes remain separate plays.
3. Repeated identical snapshots and `request_state` produce no historical sound. Room join/reconnect/ENDED initial snapshots are silent; a live ending cues once.
4. Actual damage causes impacts; Dodge/Negate without damage does not. Multiple chained victims preserve every visual while audio stays controlled.
5. No audio before gesture; master mute/zero remains silent; volume persists; dispose leaves no voices/listeners; WebAudio/WebGL failure leaves a playable HUD.
6. Inspect center card after flight, including public suit/rank when provided, conversions, skill presentation and mobile portrait/landscape. Keep controls readable and reactions accessible during effects.

## Implemented hooks and verification

- `client/src/feedback.ts` exports the contract above, including `FeedbackSettings`; retains 256 recent event/play identities; handles explicit card/damage/judgment events and guarded acquisition/heal/dying/death/local-turn/prompt/end transitions. Visual callbacks run independently of unlock/mute. Rebinding resets only observation baseline, preserving event dedupe.
- `game/presentationEvents.ts` owns room-scoped monotonic play identity and copies public card scalars. `rooms/WTKRoom.ts` decorates existing presentation broadcasts with monotonic event identity and server time. Source arrays/cards are copied so later state mutation cannot rewrite an already emitted payload.
- `game/cardLogic.ts` supplies public played-card details, effective conversion identity and full public recipients for AOE, Iron Chain, Borrowed Sword and global cards. Halberd keeps one shared play identity across target continuations. Successful spent defenses emit `kind: RESPONSE`; passes/invalid commands emit nothing. Serpent Spear announces the effective Slash without invented physical suit/rank.
- `game/heroLogic.ts`, `game/botAI.ts` and `game/phaseLogic.ts` announce canonical public skill activations/equipment and public judgment results. Fanjian announces only skill/source/targets before guessing; Guanxing announces no inspected cards; Fankui/Rende announce no transferred hand identities or roles. Proxy attacks preserve public physical payment metadata separately from effective action.
- `game/combatEngine.ts` emits public spent rescue cards, including self-Wine; actual damage events remain the only hit trigger. The client distinguishes rescue Wine from ordinary Wine and avoids replaying an explicit heal during the following recovery snapshot.
- Browser audio is lazy, gesture-unlocked, locally generated and short-lived. Mute/zero stop active voices. Source layers are capped at 32; important impacts/end cues can displace routine layers. Hidden documents are silent and device/lifecycle failures cannot interrupt visual acceptance. A settings preview does not invoke visual/gameplay callbacks.
- Technical verification: [Chrome autoplay guidance](https://developer.chrome.com/blog/autoplay/) documents gesture-related suspended AudioContexts; [W3C Web Audio lifecycle](https://www.w3.org/TR/webaudio/#dom-audiocontext-resume) defines resume/close and node lifecycle. The implementation calls resume before awaiting, reflects actual running state and closes/disconnects on dispose.
- Focused automated regressions in `tests/presentationFeedback.test.js` exercise a real three-target Halberd attack, legitimate reuse of a recycled physical card, Fanjian/Guanxing privacy, valid versus forged response payment, AOE recipients without premature hit inference, self-Wine rescue presentation, silent repeated/reconnect snapshots, and gesture/mute/zero/dispose gating. The client test harness uses Node 24's TypeScript stripping support to execute the actual module; it emits Node's experimental API notice.
- `npm run check:client` passes. `npm test -- --runInBand` rebuilds the server and passes **101/101 tests across 8 suites**, including 7 focused presentation regressions. Browser visual/audio validation is performed by the frontend/scene integration owners; synthetic tests establish gating/lifecycle, not human-perceived sound quality.
- Both results above completed before the user explicitly requested continuing without tests. No tests or asset audits were run afterward. Final source hardening rejects inherited catalog keys and avoids reusing stale conversion metadata for an ordinary physical play; these finishing changes are not claimed as retested.
