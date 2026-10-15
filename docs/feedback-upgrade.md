# HD-2D VFX and synthesized SFX upgrade

This describes the first feedback upgrade. For the subsequent GPU hybrid and immersive playing screen, see [immersive hybrid](immersive-hybrid.md). The capture files cited below remain historical evidence for that first version.

Scope: client presentation only. No game rules, server protocol, card sizes, camera motion or music changes.

## Visual feedback

- Tactics use small cached pixel silhouettes: chain links, theft hook, sabotage fracture, crossed swords, arrows, invasion banner, harvest, card draw, delayed-action hourglass, negate and equipment shield. They supplement the existing flight/path cues rather than replacing legal-target controls.
- Fire uses stepped, camera-facing flame silhouettes. Lightning uses a short angular branching ribbon with a brief double pulse. Healing combines a jade ground ring, small cross and restrained rising sparks. Normal Wine empowerment uses an amber banner instead of implying recovery.
- Hero signatures retain faction colors and family differences. Scholar and warrior accents use pooled particle batches instead of one animated mesh/material per accent. Camera and hand layout stay unchanged.
- Expanded-hero and strategy announcements are accepted by the Client allowlist, including Tuxi, Yiji, Tiandu, Jizhi, Qingnang, Liuli and the three plans. These public events carry no private card or role data.
- Effect admission evicts the lowest-priority eligible effect first. Damage labels have priority 3, death poses 2, hero poses/signatures and card flights 1, decorative flourishes 0. Under pressure, decoration cannot evict labels or poses. Capacity remains bounded (10/14/22 groups by detail tier and viewport); when all capacity is occupied by equally important effects, the oldest eligible effect can still be replaced.
- Spark bursts use one `Points` draw and one progress tween per burst. Reused position buffers/materials are pooled, with at most 12 inactive clouds retained. Trail heads write into their existing vector instead of allocating one every frame. Pixel glyph geometry is cached per shape. Pool resources are released at scene disposal.
- Fixed explicit tween positions repair the hurt-pose return and lightning pulse sequence; appending after the effect's scheduled cleanup would otherwise cut those steps off.

## Sound

All audio remains synthesized locally. No recordings, music, download assets or sound service were added.

- Metal, impacts, fire, thunder, healing and skills have distinct transient/body/tail layers. Chain, theft, destruction, volley and duel have separate cues. Low bass stays centered; selected high-frequency layers have restrained stereo width.
- After the first audio gesture, 26 cues are rendered sequentially with `OfflineAudioContext` at 24 kHz stereo, trimmed and cached. Normal playback uses one buffer source and gain per cue instead of rebuilding oscillators and filters. The final capture retained 1,921,048 bytes of PCM (about 1.83 MiB), plus the existing noise buffer and browser bookkeeping. This trades bounded memory and preparation work for lower recurring node creation.
- First-use or unsupported offline audio falls back to live synthesis. Offline preparation pauses between cues while hidden. Minor playback-rate variation applies to effects, while turn/prompt/judgment cues retain their pitch.
- Cached playback has a 12-voice cap. Important feedback can replace a lower-priority or oldest voice; secondary cues are attenuated when busy. Existing impact throttling, compressor, volume, mute and gesture unlock remain.
- Hiding the page stops voices and suspends the live AudioContext. Returning resumes a previously running context. Leaving disposes voices, buffers, nodes and context.

## Evidence and limits

See [before/after capture comparison](../artifacts/performance/feedback/comparison.md). The fixture imports the actual scene and feedback classes through Vite, supplies public-shaped synthetic events and never creates a room, bot, WebSocket or match. Audio is enabled after a gesture. The event sequence is replayed once to warm materials/geometry/audio before measurement.

The baseline sources come from commit `5b3224bc448a5589e314781d2fa6bd21e41841e5`. Both runs use the same event list, viewport dimensions, browser and observed renderer. The fixed Tuxi event is now accepted, so the upgraded run intentionally does more presentation work (22 accepted events versus 21).

`drawsPerFrame` is counted WebGL draw submission, not GPU utilization. CDP `TaskDuration` measures renderer main-thread busy time, not OS CPU or audio-thread usage. The six-second active window includes gaps and effect settling; its renders/second is not a sustained FPS guarantee. Portrait is touch emulation on the desktop GPU, not a physical phone. Single captures cannot establish small timing differences or a whole-game performance claim.

Raw `before.json`/`after.json` are initial exploratory captures without visual workload warmup. `after-warm.json` is an intermediate implementation. Use `before-warm.json` and `final.json` for the documented comparison. The initial CPU regression prompted the warmup check and further batching rather than being discarded as a successful optimization.

Reproduce from the repository root:

```bash
node scripts/feedback-perf-profile.cjs before-warm --baseline
node scripts/feedback-perf-profile.cjs final --inspect
node scripts/feedback-perf-compare.cjs
```

The script starts and closes its own local Vite process/browser. Baseline source copies go under ignored `scratch/feedback-baseline/`; screenshots stay local under ignored `artifacts/**/*.png`. `--inspect` additionally captures isolated fire/thunder/heal views, checks public skill acceptance and records settled/reduced/disposed resource counts. This is presentation profiling, not game correctness testing.

Validation: client type checking, production build, source whitespace checks and the isolated presentation captures. No game suite, bot match, multiplayer smoke game or full-game browser QA was run. Audio graph and buffer behavior were measured; the captures do not constitute human listening tests across speakers/headphones.
