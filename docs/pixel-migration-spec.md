# WTK Pixel Kingdoms migration

Status: confirmed by the user on 2026-10-14; implementation in progress on feat/pixel-kingdoms.

## Product decisions

The user selected a complete frontend, server and rules redesign; an isometric table with voxel scenery and pixel-art cards; desktop and touch mobile support; hidden-role Three Kingdoms strategy; and a 30–45 minute match target.

Keep the four factions, four hidden roles, hero identities and tactical card interactions. Redesign presentation, room/session orchestration, interaction flow and balance together. Match duration is a balancing target, not a forced outcome or a claim proven by unit tests.

## Proposed rules and flow

- Support 4–10 seats, default 6; bot games fill the chosen seats. Label bots and total seats separately.
- Keep Lord/Loyalist/Rebel/Renegade win conditions, distance, equipment, delayed judgments, elemental chains, rescue queues and counter-negation.
- Use an explicit shared rules profile: no play-turn deadline; 20 seconds for response windows, including ordinary reactions, rescue, negation and optional skills; 90 seconds for drafting. On draft expiry, choose the first valid offered hero. Bots draft immediately. Server response deadlines drive the UI; timeouts resolve safely and never rely on the browser. The user explicitly chose unrestricted thinking time; do not add an implicit forced turn end.
- Preserve a full 41-type tactical deck and reduce its 271-card size to an initial 176-card profile defined below. Rebalance attacks, defenses, healing and control using playtest results; define counts in the shared catalog rather than scattered UI/server dictionaries.
- Provide 13 playable heroes: the existing 12 plus Huang Gai. Give heroes canonical IDs, explicit HP and complete skill descriptions. Implement the agreed hero skill sets consistently in server, UI and bots, including abilities currently advertised but missing from server handlers.
- Provide a phase rail, current-player marker and a single contextual action dock. Card selection shows legal targets and the required response. Multi-step actions expose progress and cancel before sending.
- Show public equipment, distance, health and chained state; keep opponent hand contents and unrevealed roles private. Reveal roles after death or match end.
- Preserve 45-second reconnection to the same room/player. After that grace expires, mark the disconnected player dead, clamp HP to zero, resolve turn ownership with endPlayerTurn and evaluate normal victory conditions. A disconnected Lord can therefore end the match; there is no automatic bot takeover. Failed joins show a useful error instead of silently creating another room.
- Support online create/join, bot play, drafting, reactions, exact-count discard, card/hero inspection, event history, leaderboard, replaying a new match and the existing development sandbox.

## Architecture

- Client: Vite + TypeScript modules, Three.js orthographic voxel scene and GSAP animation. Use an accessible DOM HUD for Thai text, hand selection, dialogs and touch controls.
- A single Colyseus 0.15 connection owns create/joinById/reconnect/send/onMessage. A typed state store owns snapshots; rendering consumes state and sends intents.
- Server: authoritative Colyseus room, explicit validated command boundary, room lifecycle and deadline ownership, shared catalog/rules profile, existing tested combat primitives migrated behind the new orchestration.
- Share public card/hero metadata and protocol types between client and server. Individualized snapshots remain the privacy boundary.
- Retain Express/SQLite and existing history. No destructive database migration is needed. Keep the baseline Git commit and legacy frontend available during verification; switch the default routes only when the new client builds and gameplay smoke checks pass.
- The voxel renderer releases GPU resources/listeners, pauses when hidden and scales resolution/effects for mobile. A readable playable HUD remains available if WebGL initialization fails.

## Visual direction and assets

The user selected an imperial courtyard at dusk: ink-blue sky, warm stone, jade table accents, timber, block-shaped trees and lanterns. Preserve faction/role colors. Pixel artwork stays sharp, with legible Thai body typography and a restrained Latin display face. No emoji-based new UI controls.

Generate project-local bitmap artwork with the built-in image-generation capability. Include a courtyard key image, card back, all previously missing basic-card/hero art, and a complete local pixel-art catalog for the active deck/roster. Save generation prompts/provenance and inspect the output before integrating it. Scene geometry and interface icons are code-native; generated pictures supply artwork/textures.

Desktop: scene and seat information above a stable hand/action region. Mobile portrait and landscape have equal priority and distinct layouts: compact opponents, swipeable hand, tap-to-preview/select, a large action dock, bottom-sheet reactions and safe-area padding. Rotation preserves selection and in-progress actions. Controls are keyboard reachable, have visible focus and accessible labels; decorative motion honors reduced-motion preferences.

## Acceptance

1. Build both client and server, run existing game tests plus meaningful regressions for the new authoritative boundaries.
2. Verify correct-room join, same-player reconnection, bot counts, hidden information and server-controlled deadlines.
3. Exercise an actual bot match through drafting, card play, targeting, reactions and end turn; exercise two-client online create/join.
4. Check response coverage: Borrowed Sword, self-Wine rescue, counter-Negate and all migrated active skills.
5. Audit that every active card/hero references an existing local image; distinguish generated artwork from legacy images and record any remaining external dependency.
6. Inspect rendered lobby, draft and board at desktop and mobile widths; verify touch controls, horizontal overflow, readable labels and runtime console errors.
7. Document exact checks/results, remaining limits and the rollback path. Long-match balance needs observed playtests; do not promise a measured 30–45 minute duration without evidence.

## Decisions confirmed in the refinement round

- 4–10 players, default 6.
- Unlimited play-turn thinking time; 20-second ordinary reactions.
- Smaller deck preserving all 41 card types, with revised balance.
- The 30–45 minute target is aspirational because unrestricted turns and larger tables can take longer.
- 13 heroes including Huang Gai; complete server/UI/bot skill coverage.
- Mobile portrait and landscape are equally important; use responsive layouts for both.
- Death after the 45-second disconnection grace, with normal victory evaluation.
- Response expiry means pass; do not spend a player's cards automatically.
- 90-second drafting, then select the first offered valid hero.
- Dusk palace courtyard with ink/jade/gold colors and lantern lighting.

## Response defaults

| Window | Server action after 20 seconds |
| --- | --- |
| Dodge/Slash/duel/AOE defense | Pass, resolve the resulting damage and continue the action queue. |
| Dying rescue | Pass to the next eligible rescuer; finish death if the rescue round fails. |
| Negate/counter-Negate | Record pass; resolve only when all eligible responders have passed or the window expires. |
| Optional hero/weapon activation | Decline the activation and resume the suspended action. |
| Borrowed Sword | Decline Slash; transfer the weapon to the caster. |
| Yin-Yang choice | Decline discarding; let the attacker draw. |
| Fire Attack reveal | Reveal the first available hand card; this does not spend it. If no card exists, finish without fire damage. |
| Fire Attack matching discard | Decline discarding; deal no fire damage. |
| Bumper Harvest mandatory selection | Award the first available revealed card and move to the next player. |
| Guanxing ordering | Retain original order on top of the deck. |
| Guicai replacement / allied Lord-skill response | Pass without consuming a card. |

Every continuation must be resumable, scoped to its pending action and idempotent. Expired callbacks must not resolve a newer prompt. Player names and chat are rendered as text, never as executable HTML.

## Initial 176-card profile

| Group | Counts |
| --- | --- |
| Basic (86) | SLASH 36; DODGE 24; PEACH 12; WINE 6; THUNDER_ATTACK 8. |
| Kit (47) | STEAL 6; SABOTAGE 6; EX_NIHILO 4; DUEL 4; BARBARIAN_INVASION 3; ARROW_BARRAGE 3; PEACH_GARDEN 2; IRON_CHAIN 4; FIRE_ATTACK 3; NEGATE 8; BUMPER_HARVEST 2; BORROWED_SWORD 2. |
| Delayed (8) | LIGHTNING 2; ACEDIA 3; STARVATION 3. |
| Weapons (18) | ZHUGE_CROSSBOW 2; BLUE_STEEL_SWORD 2; SIX_SWORDS_WU 1; KIRIN_BOW 1; FEATHERED_FAN 2; SERPENT_SPEAR 2; FROST_SWORD 1; TWO_BLADED_TRIDENT 1; ROCK_CLEAVING_AXE 1; GREEN_DRAGON_BLADE 2; SKY_PIERCING_HALBERD 1; YIN_YANG_SWORDS 2. |
| Armor (8) | NIO_SHIELD 2; EIGHT_TRIGRAMS_FORMATION 2; SILVER_LION_HELMET 2; RATTAN_ARMOR 2. |
| Horses (8) | LIGHTNING_HOOF 2; RED_HARE 2; FERGANA_STEED 2; SHADOWRUNNER 2. |
| Treasure (1) | WOODEN_CART 1. |

This is an explicit starting balance proposal, not a measured optimal balance. Use deterministic seeded simulations and observed playtests to record its behavior.

## Proposed complete hero skill contract

| Hero | HP | Skills |
| --- | --- | --- |
| Cao Cao | 4 | Jianxiong: optional acquisition of available damage-causing cards. Hujia, when Lord: request Dodge from other Wei heroes in seat order. |
| Liu Bei | 4 | Rende: give hand cards, heal once after giving at least two that turn. Jijiang, when Lord: request Slash from other Shu heroes for attack or response. |
| Sun Quan | 4 | Zhiheng: once per turn, discard chosen hand/equipment and draw the same count. Jiuyuan, when Lord: a Peach from another Wu hero restores one extra HP. |
| Guan Yu | 4 | Wusheng: use red hand/equipment as Slash, applying equipment-removal effects. |
| Zhang Fei | 4 | Paoxiao: unrestricted Slash count during the play turn. |
| Zhao Yun | 4 | Longdan: exchange Slash/Dodge usage from hand, including responses. |
| Zhen Ji | 3 | Luoshen: optional preparation judgments, gain black cards and stop on red. Qingguo: black hand cards act as Dodge. |
| Lu Bu | 5 | Wushuang: require two Dodges for Slash and two Slashes per opposing Duel exchange; retain this project's 5-HP identity. |
| Diao Chan | 3 | Lijian: once per turn, discard a hand card to initiate a Duel between two other male heroes. Biyue: draw one at turn end. |
| Sima Yi | 3 | Fankui: optionally take one card from the damage source's hand/equipment after damage. Guicai: optionally replace a judgment with a hand card before it resolves. |
| Zhuge Liang | 3 | Guanxing: inspect up to min(5, living players) deck-top cards, distribute/order them on top/bottom in preparation. Kongcheng: handless protection against Slash and Duel targeting. |
| Zhou Yu | 3 | Yingzi: draw one extra in draw phase. Fanjian: once per turn, select a hand card, target guesses its suit, receives it and takes one damage if wrong. This replaces the old color-guess/discard variant. |
| Huang Gai | 4 | Kurou: lose one HP to draw two repeatedly during play; finish the dying/rescue sequence before continuing. |

Lord receives the project's existing +1 maximum HP bonus with at least six players. Hero powers never reveal allied players' hidden roles. The skill table defines the intended migrated behavior, including deliberate additions and correction of incomplete old handlers.

Reference checks for preparation/judgment abilities: [official Zhuge Liang](https://www.sanguosha.com/hero/4), [official Sima Yi judgment replacement](https://guozhan.sanguosha.com/a/kapaiyilan/wujiangpai/wei/2013/0126/34.html). This is a WTK project rules profile; those references do not imply every published edition has identical rules.

## Source evidence

Baseline: commit 7af3e21; TypeScript build and 39 game tests pass. The current server boots on port 3001 and the lobby renders without page errors.

Current migration defects: join-by-code uses joinOrCreate instead of a specific room; reconnect may create another room; Borrowed Sword is omitted from the reaction predicate; self-rescue exposes only Peach; counter-negation state is omitted from individualized snapshots; bot count is treated as total seats; hero identities derive from display strings; Phaser hand rendering is inactive; repeated DOM replacement remains.

Local assets: 16 images. Missing source references: /pdf_images/{slash,dodge,peach,wine,steal,zhuge_crossbow,zhen_ji,zhang_fei}.png. The old handoff's DOM-caching claims do not match the current source.
