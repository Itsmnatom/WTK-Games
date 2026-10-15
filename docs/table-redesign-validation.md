# Physical table delivery status

Date: 2026-10-15, Asia/Bangkok.

The user confirmed the physical table redesign and later instructed the team to continue without testing. The final revision therefore has no completed browser acceptance run or final test result. Compilation for packaging may still run; it does not establish gameplay or layout acceptance.

The coordinated `npm run build` completed successfully after all nine source fixes below, compiling both server and client (client bundle `index-TA99vc4W.js`). An earlier compilation identified an ES2020 incompatibility in a late `Object.hasOwn` change; the owner replaced it with `Object.prototype.hasOwnProperty.call`. The owned preview was restarted at `http://localhost:3001`, Node PID `25520`, shell session `64763`, after confirming the previous PID `3540` matched our preview command. Startup output reports SQLite initialized and the server listening. It also reported the disposed room `Q3voY1eAf` five times after startup; no runtime investigation was performed. No HTTP request or browser action was used to check the preview. The earlier owned port 3002 preview and superseded port 3001 previews were stopped by their owners.

## Later source fixes

1. Reconnection retains the canonical room URL and the matching saved room, player and token identity. Initial bot-game creation starts once and is not repeated on refresh.
2. Passing the Fire Attack payment prompt sends explicit cancellation.
3. Frost Blade requires a valid one- or two-card selection according to available cards. Zero-card payment is disabled in the interface and falls back to damage on the server; enemy hand/equipment choices retain their legal selection limits.
4. Iron Chain offers recasting through the explicit recast action instead of treating a missing target as an implicit recast.
5. Reduced-effects Dodge and Negate highlights now use the responding player, while attack and damage cues retain their actual target.
6. A `THUNDER_ATTACK` response now reaches the offensive thunder-family trail instead of the generic defensive shield branch. Negate retains its dedicated treatment.
7. A Duel participant's death clears the pending Duel and resumes its existing continuation. Bot Lijian callbacks also check that their original action is still active.
8. Serpent Spear retains its virtual attack name, color and actual material-card IDs through defense, judgment, weapon follow-ups, damage and hero acquisition, without inventing a physical card.
9. Blue Steel suppresses Eight Trigrams only for Slash attacks; interface and bot AOE behavior follow the same boundary.

These edits are in `client/src/main.ts`, `client/src/connection.ts`, `client/src/scene.ts`, `game/types.ts`, `game/combatEngine.ts`, `game/cardLogic.ts`, `game/heroLogic.ts`, `game/roomLifecycle.ts`, `game/botAI.ts` and `rooms/WTKRoom.ts`.

The Back to Lobby fix remains in place: navigation proceeds immediately while connection cleanup completes, late messages/reconnects are ignored, and a completed match does not start or complete a reconnect death flow.

These changes were traced and edited at source level and compiled for packaging. No separate type checks, tests, browser actions, HTTP probes or QA runs were performed after the user's no-testing instruction. Compilation and startup logs do not establish gameplay acceptance; no test step is marked as passed for this revision.

## Implemented scene

`client/src/scene.ts` now renders a compact wood and jade table with a shallow oblique camera. The orthographic frustum fits both available width and height. Desktop and portrait retain peripheral nighttime courtyard scenery; short landscape gives priority to the table.

The viewer occupies the bottom seat. `update(state, myId)`, `layout()` and `onLayout` provide normalized seat, table and center anchors to the HTML interface. The same anchors position the voxel figures. Resizing changes presentation geometry without changing game state.

Accepted public plays produce card flights and card-family trails. When a physical card is public, its artwork uses the existing local atlas, including the irregular equipment row. Actual damage events produce target-specific slash, fire or thunder effects and a numeric damage label placed beside the HTML seat. Judgment, healing, equipment and Negate have separate visual treatments. The HTML interface retains the inspectable center card and actor/target labels.

Reduced effects immediately clear active transients and use static highlights and numeric labels. Repeated snapshot rendering with the same setting does not clear ongoing effects. Hidden tabs stop the render loop and clear effects. Transient counts are bounded; disposal releases geometry, materials, temporary textures, resize/visibility listeners and the renderer.

## Evidence and limits

- Client type checking passed during implementation, before the final damage-label positioning adjustment and before the instruction to stop testing.
- Early desktop, portrait and landscape previews were inspected. Those previews precede the final interface fixes and do not establish acceptance of the final revision.
- `scripts/table-redesign-smoke.cjs` was written before the stop instruction. Its JavaScript syntax check passed, but the smoke script was never executed. It is intended to launch its own compiled server with a temporary SQLite database, capture the nine seat/viewport combinations and exercise card inspection, real responses, damage effects, a 12-card hand and real WebAudio instrumentation.
- No QA child server or browser was started by that script. No final browser, audio, gameplay or automated test claim is made for this revision.
- The System Design DOCX remains undelivered because the required bundled LibreOffice renderer is absent from this Windows runtime. The retained template was not changed and no replacement dependency was installed.

## Later acceptance workflow

After a fresh application build, an explicitly requested acceptance run can use `node scripts/table-redesign-smoke.cjs`. It defaults to an isolated port 3110; `TABLE_QA_PORT` selects another free port. The script rejects an occupied port, drains its owned child output and removes only its validated temporary directory. Screenshots and metrics are written under `artifacts/table-redesign-validation`.

The existing gameplay rules, hidden-information boundary and Colyseus transport remain authoritative. Presentation cues do not replace server state or spend cards.
