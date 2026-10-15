# Implementation tracker

Spec: [pixel-migration-spec.md](pixel-migration-spec.md). Baseline: 7af3e21.

- [x] Shared catalog, typed public protocol, 176-card rules profile. Source: shared/catalog.ts and shared/protocol.ts; covered by the completed server test run before the no-testing override.
- [x] Server command/lifecycle/deadline ownership and correct room joining/reconnection. Existing room integration regressions completed before the override; current gameplay does not introduce a play-turn deadline.
- [x] Complete 13-hero rules, response defaults, bots and private snapshots. Existing hero/rules/privacy regression suites completed before the override; long-match balance remains an observed-playtest target.
- [ ] New lobby, drafting, board, contextual reactions, equipment and sandbox UI.
- [ ] Three.js voxel courtyard, GSAP motion and mobile resource lifecycle.
- [x] Generated local card/hero atlases, card back and courtyard artwork implemented. Provenance: pixel-art-provenance.json; active card mapping includes an eight-column weapon/armor row and skips its duplicate tile. No new asset audit after the override.
- [ ] Server/client builds, regression tests and actual bot/online browser smoke.
- [ ] Desktop/portrait/landscape visual verification, asset audit and rollout notes.

## Feedback implementation evidence

- Implemented public card metadata, canonical skill announcements, actual spent-response announcements and per-play Halberd dedupe. Metadata excludes Fanjian selection, Guanxing inspection and transferred hidden-hand identities.
- Implemented client feedback normalization and local layered SFX with gesture unlock, volume/mute persistence, a local sound preview, bounded voices and cleanup. Main/scene integration owners maintain visual and browser evidence.
- Before the user instructed **continue without testing**, `npm test -- --runInBand` finished successfully: **101 tests / 8 suites**, including seven presentation regressions. `npm run check:client` also finished successfully before that instruction.
- Testing and asset auditing stopped immediately afterward. Final metadata hardening, provenance corrections and artifact cleanup are **not claimed as retested**. No new asset-audit script was created or executed.
- Cleanup: restored only tracked `node_modules/.package-lock.json`; moved only `public/art/cards-atlas-draft.png` into `artifacts/pixel-migration/cards-atlas-draft.png` as a non-runtime intermediate. Root package dependency/lock changes are retained.
- Rollback remains baseline commit `7af3e21` plus retained legacy frontend routes. No destructive SQLite migration was introduced. Actual 30–45 minute balance is not established by these checks.
