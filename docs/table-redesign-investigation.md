# Physical table redesign investigation

Date: 2026-10-15 (Asia/Bangkok). Status: evidence collected; product implementation awaits the user's confirmed design. No client or server product files changed during this investigation.

## Reproduction and reusable evidence

- Run `TABLE_AUDIT_URL=http://localhost:3002 node scratch/table-layout-audit.cjs` (PowerShell: set `$env:TABLE_AUDIT_URL` before the command).
- The helper creates isolated passive BOT sandbox rooms, chooses a draft hero, measures 4/6/10-player layouts at 1440x900, 390x844, and 844x390, takes screenshots, and leaves each room.
- All nine runs had zero browser exceptions and zero HTTP failures. The problem is visual composition and incomplete presentation, rather than failure to boot.
- Full numeric evidence: `artifacts/table-redesign-investigation/metrics.json`; nine corresponding PNGs are in that directory. The prior screenshots in `artifacts/pixel-migration/` corroborate the same composition.
- Owned server: `node dist/colyseus_server.js`, `PORT=3002`, listening PID **34056**. It remains available for the follow-up implementation and browser QA. The original shell tool returned a session whose ID was not retained; verify the process via `Get-NetTCPConnection -LocalPort 3002 -State Listen` before stopping it. Do not stop unrelated Node processes.
- Strategic improvement: retain the geometry audit and compare screenshot/rectangle results during implementation. The existing smoke script verifies asset availability, horizontal overflow, four initial cards, and the hand's bottom edge; it cannot detect a cropped table, overlapping seats, absent played-card information, or insufficient touch controls (`scratch/pixel-browser-smoke.cjs:19`).

## Observed layout metrics

| Total players | Viewport | Stage height | WebGL host height | Opponent seat overlaps | Initial hand cards | Center play zone / opponent backs |
| --- | --- | ---: | ---: | ---: | --- | --- |
| 4 | 1440x900 | 482 px | 612 px | 0 | 105x145 px | absent / 0 |
| 6 | 1440x900 | 482 px | 612 px | 0 | 105x145 px | absent / 0 |
| 10 | 1440x900 | 482 px | 612 px | **4 pairs** | 105x145 px | absent / 0 |
| 4 | 390x844 | 463 px | 368 px | 0 | 85x122 px | absent / 0 |
| 6 | 390x844 | 463 px | 368 px | 0 | 85x122 px | absent / 0 |
| 10 | 390x844 | 463 px | 368 px | 0 | 85x122 px | absent / 0 |
| 4 | 844x390 | 111.7 px | 271.7 px | 0 | 67x94 px | absent / 0 |
| 6 | 844x390 | 111.7 px | 271.7 px | 0 | 67x94 px | absent / 0 |
| 10 | 844x390 | 111.7 px | 271.7 px | 0 | 67x94 px | absent / 0 |

The 10-player desktop seat intersections cover 894–1123 square pixels each. Portrait uses three grid columns and landscape five; lack of intersections in those grids does not mean the requested physical table composition exists.

All initial cards are within viewport bounds, and all nine cases have no document horizontal overflow. The cards are not individually oversized by a measurable universal criterion: the stronger evidence is an unnecessarily separate hand shelf/action shelf, linear hand arrangement, and a large decorative courtyard compared with the information-bearing table.

## Evidence-ranked causes

### 1. Scene fit and HTML layout have independent geometry (high confidence)

`client/src/scene.ts:91` fits only a fixed horizontal orthographic span (28.4 world units). It does not fit world bounds to available stage height, reserve space for seats or played cards, or project scene anchors into the HUD. The camera position remains `(18,22,18)` (`scene.ts:29`).

The board host deliberately exceeds its stage: desktop `.board-scene{inset:-60px 0 -70px}` in `client/src/style.css:4`; short landscape `.board-scene{inset:-80px 100px -80px}` in `style.css:10`. `.board-page` clips overflow. These offsets place geometry behind the header and action region, explaining the cut-off pavilion, trees, and table. In landscape the stage occupies y=87–198.7 while the host spans y=7–278.7. The projected table bounding box is 186.3 px tall in a 111.7 px stage.

The root-level scene and HUD seats use unrelated placement equations. Scene tokens use an ellipse of radii 6.2/4.9, with angle `index/count*2π+π/4` (`scene.ts:67`); the HUD uses a partial 200–340 degree arc with fixed radii 39%/53% (`main.ts:88`). As a result player tags do not reliably associate with their voxel figure. Responsive CSS turns the seat ring into a grid instead of a ring (`style.css:9`, `:10`).

Seat nodes stay 153 px wide at desktop regardless of player count. The arc does not adjust card width or radius for 9 opponents, producing the four reproduced overlaps. The scene does not reposition existing token groups when turn order/count changes (`scene.ts:77`), which can also leave a post-admin add/remove layout stale.

### 2. Physical card zones are not implemented (high confidence)

`main.ts:59` contains scene, caption, seats, self summary, and hand dock, but no public played-card tray or opponent card backs. `main.ts:91` renders opponent portraits, HP and a numerical hand count only. `main.ts:99` renders the hand as a standard flex row. `.hand{display:flex;...gap:9px}` (`style.css:4`) has no fan angles, overlapping spacing, or curved baseline.

`scene.ts:84` always creates a temporary card with the **back** texture, sends it to the center, then removes it after approximately 0.7 seconds. It does not use `data.cardName` to select face art, persist the latest card, label the caster/target, or let the user inspect a central card. No equivalent HTML event ledger is updated by `main.ts:222`: events go directly to `scene.event`. The existing history dialog reads `state.chat`, which does not replace a visible center play area.

### 3. Event payload cannot reconstruct public card details reliably (high confidence)

Current `card_played` packets carry `{playerId,cardName,targetId?}` (`game/cardLogic.ts:83`, `:428`; `rooms/WTKRoom.ts:388`, `:558`). They omit the actual card's ID, suit, rank and artwork identity after conversions. `shared/protocol.ts` has snapshot/player/card definitions but no typed presentation event contract. Once an opponent plays a card, the frontend cannot infer the actual suit/rank from a sanitized hand. It must not invent values or reveal hidden hands.

`startAttackSequence` emits `card_played` once **per target** (`game/cardLogic.ts:83`), which means an attack with three targets looks like three independently played cards to a naive effect/history consumer. Hero actions sometimes put free-form skill text in `cardName` (`rooms/WTKRoom.ts:593`, `:626`; `game/botAI.ts:47`). These need a distinct action identity and kind, or conservative client deduplication until the server event seam is explicitly assigned.

`damage_log` includes `damageType` (`game/combatEngine.ts:42`), but `scene.ts:83` only bounces a token. It does not distinguish fire/thunder, display damage magnitude, draw a source-target trajectory, or handle `judgement_result`. Reaction completion has no public outcome event to differentiate a dodge from a declined response. Required spectral effects should be driven by authoritative events, with snapshot updates remaining authoritative for state.

### 4. Sound is currently disconnected (high confidence)

There is no audio engine, mute control, user-gesture unlock, or sound call in `client/src/`. The built-in sound plugin broadcasts only through legacy `global.io` (`plugins/plugin_manager.ts:97`, `:104`), while the running server uses Colyseus. The current gameplay modules do not call the plugin's `onCardPlayed`/`onDamageDealt` hooks. Its registered startup log does not establish working SFX. Sound should consume the same presentation events as effects, with a local opt-in/unlock and independent mute state.

### 5. Secondary discoverability and text issues (confirmed by source)

- `main.ts:111` renders the equipment button as literal `???????`; `main.ts:197` contains similarly corrupted equipment dialog copy.
- Landscape hides `.self-summary .equipment-row` (`style.css:15`) and uses 38px action buttons (`style.css:10`). The equipment dialog helps access but does not restore legible equipment status on the table; 38px buttons miss a proposed 44px touch target.
- The full-screen scene remains the main visual feature while turn, response, card choice, and actor-target relation are small overlays. A compact table plus explicit center/current action can make that relation clearer without changing gameplay.

## Proposed acceptance metrics for implementation

These are proposed measurable gates, not confirmation of final visual direction. Apply to 4/6/10 seats at 1440x900, 390x844, and 844x390, including own turn, waiting, dying/negate/duel response, ended match, and 12-card hands.

1. **Fit:** no document horizontal/vertical overflow or clipping of meaningful content; no visible WebGL geometry over header/action controls. The tabletop, central play zone, active player, self status, and hand remain inside the board. Measure core table bounds separately from intentionally faded peripheral scenery.
2. **Seats:** exactly N−1 opponents displayed; zero overlapping opponent hit rectangles; stable relative turn-order seating with the viewer at bottom. All seat target controls at least 44x44 px. No duplicate/self opponent entries. 4/6-player layouts show all details; 10-player layouts may use compact tags but show HP, hand count, active turn and legal-target indication.
3. **Physical composition:** hand anchored at bottom with a curved fan; opaque card backs for each opponent's hand zone, with accurate visible count and no private card identity; a persistent center play tray showing newest authoritative action and up to three recent actions. The tabletop should occupy approximately 65–80% of desktop board width and 72–92% of mobile board width, with its entire interactive center visible. Final dimensions depend on the chosen reference fidelity.
4. **Hand:** all four initial card ranks/suits/names readable; selected card rises into free space instead of clipping; 12 cards fit as overlapping fan or dedicated horizontal scroll with each exposed strip selectable. Touch selection followed by separate play/confirm; inspecting a card should not inadvertently play it. Every action hit target at least 44x44 px even when card exposure is narrow.
5. **Center/action hierarchy:** current phase/turn, newest played card, actor→target, and response deadline visible at once. Real suit/rank shown only when present in the authoritative public event; otherwise show card type/name only. Played cards remain inspectable until displaced by subsequent public actions. Do not add duplicate central cards for a single multi-target action.
6. **Feedback:** source-target trail and distinct slash/fire/thunder/dodge/heal/judgement effects; damage number tied to the correct seat; no permanent stale objects after effects end. Reduced-motion mode uses static highlights and readable labels without flashes/shake. Effects cannot intercept clicks or delay legal response controls.
7. **Audio:** user gesture unlock; visible mute toggle with persistent preference; distinct local SFX keyed to action/damage/outcome events; no audio playback before unlock, no sound during reconnect history replay, and no duplicate sound per target unless intentionally representing each hit. Existing gameplay protocol/state remains functional if audio is muted/unavailable.
8. **Verification:** zero uncaught browser/HTTP errors; meaningful screenshot inspection of all nine layout combinations; geometry assertion for seat overlaps and meaningful content bounds; gameplay smoke for play/target/response and accessible keyboard/touch control; frontend type check/build plus focused existing server suites after any protocol seam change.

## Implementation boundaries

Once design is confirmed, the layout owner can change `client/src/main.ts`, `style.css`, and `ui.ts` together: semantic center ledger, responsive physical seating, opponent card backs, fanned hand, compact action controls, repaired Thai copy. The scene/effects owner must align geometry/camera/anchors and consume events without game-state mutation. A server/protocol owner must enrich public presentation events where real card details and deduplication are required. Do not solve missing event fields by exposing opponent hands or guessing suit/rank.
