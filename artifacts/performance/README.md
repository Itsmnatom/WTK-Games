# WTK table rendering profile

This is the user-authorized performance measurement, not a game regression suite. The durable profiling helper is `scripts/table-perf-profile.cjs`, copied without logic changes from the original baseline helper in `scratch/`. It does not edit product code, send game commands after room setup, or make game correctness assertions. `scripts/table-perf-compare.cjs` summarizes the saved artifacts without running a browser.

## Reproduction

After the intended client/server build is available, run from the workspace:

```powershell
node scripts/table-perf-profile.cjs before
# After the optimized build is available:
node scripts/table-perf-profile.cjs after
node scripts/table-perf-compare.cjs
```

Each run starts its own server on a free local TCP port, with an isolated SQLite database in an OS temporary directory. It serves the existing compiled client. Only the helper's own browser and server processes are closed. Raw output records the bundle path/SHA-256, browser arguments, viewport/device flags, temporary database directory, renderer, per-phase samples, CDP counters, and exact synthetic presentation packets. Temporary databases are retained for traceability.

Two cases run in the same order: six-seat desktop at 1440 × 900, then ten-seat portrait touch emulation at 390 × 844; both use device scale factor 1. Sandbox bots are passive. The first offered hero is selected to enter a real board; hero/role/deck assignment remains random. Audio is muted, full effects are selected, and no CPU/network throttling is applied. The headless Chrome browser is newly launched for each run. The idle capture starts after a 2.5-second board settling delay.

Each case measures seven seconds of idle board, seven seconds of synthetic public effects, then a two-second settling delay followed by seven seconds in a real hidden tab. A second foreground tab creates the hidden state; `document.visibilityState` is recorded. Background timer/render suppression flags normally injected by Puppeteer are omitted. No `document.hidden` override, lifecycle freezing, product instrumentation hook, duplicate snapshot replay, or fake GPU metric is used.

The active workload dispatches encoded Colyseus `ROOM_DATA` messages onto the real native socket's browser event handler. The installed SDK decodes them and the shipped feedback/scene callbacks render them. Eight casts, spaced 850 ms apart, cycle through SLASH, FIRE_ATTACK, THUNDER_ATTACK, and ARROW_BARRAGE; each has one public impact 400 ms later. Cast actors/targets cycle deterministically through the visible seat IDs. The raw JSON contains all messages. These are **synthetic presentation events** with explicit profiler IDs and illustrative public card faces; they do not change authoritative room state and do not establish gameplay correctness, game throughput, or valid in-match damage. Idle has no synthetic messages.

## Measurements and limits

- **Scene rendered frames:** external WebGL wrappers count default-framebuffer color clears on the canvas under `#board-scene`. The current Three renderer auto-clears once per scene render; this is a rendered-frame proxy, rather than an application `renderer.info` hook or monitor presentation timestamp. Multiple immediate renders in a callback are counted separately. Render interval percentiles describe those actual clear intervals.
- **Observer RAF:** a separate native RAF loop records available browser callback intervals. It is excluded from the application RAF count and does not imply scene rendering FPS. The browser supplied roughly 100 observer opportunities/second in the baseline, while the scene rendered about 25 times/second at idle.
- **Draw calls and resize writes:** wrappers count actual board-canvas WebGL draw commands, including shadow passes, and canvas width/height setter calls. Initial loading/setup is outside the captured idle phase. An unchanged-state profile cannot quantify the cost of repeated identical snapshot processing or responsive resizing.
- **CPU:** CDP `Performance.getMetrics` deltas report renderer task/script/layout/style time. `TaskDuration / phase wall time` is a renderer main-thread busy ratio; it is **not OS process CPU utilization or GPU utilization**. The same instrumentation overhead exists before and after.
- **Memory:** CDP reports JS heap occupancy without forced GC. Garbage collection timing can change end values; the readings do not establish a leak and exclude GPU/native texture memory.
- **Long tasks:** a browser `PerformanceObserver` records tasks over 50 ms, including first-use shader/texture effects in the measured workload. No warm-up replay is inserted before the active phase.
- **Hardware:** baseline Chrome 151.0.7922.47 reports WebGL 2.0 through ANGLE/D3D11 on **NVIDIA GeForce GTX 1660 SUPER**. The `--enable-unsafe-swiftshader` launch option permits fallback but the observed renderer is hardware NVIDIA, not SwiftShader. Mobile is viewport/touch emulation on this desktop GPU, not a physical phone result. No OS GPU utilization was measured. A headless result does not prove 60 presented FPS on every monitor/device.

## Baseline captured before product optimization

`before.json` uses `/pixel/assets/index-TA99vc4W.js`, SHA-256 `6c8bb57c4a73aec45febed40ffaf3f43d35ddd121be46dc8715cb3d3574de78a`.

| Case / phase | Scene renders/s | Draw calls/s | Main-thread busy | Long tasks | JS heap start → end |
| --- | ---: | ---: | ---: | ---: | ---: |
| Desktop 6 / idle | 24.94 | 7,057.56 | 6.93% | 0 | 7.79 → 8.16 MB |
| Desktop 6 / active | 31.98 | 10,147.50 | 21.30% | 1 / 217 ms | 8.16 → 12.31 MB |
| Desktop 6 / hidden | 0 | 0 | 0.031% | 0 | 9.26 → 9.26 MB |
| Portrait 10 / idle | 24.96 | 3,993.44 | 5.98% | 0 | 8.11 → 7.27 MB |
| Portrait 10 / active | 33.52 | 6,206.62 | 16.90% | 4 / 292 ms | 7.27 → 9.54 MB |
| Portrait 10 / hidden | 0 | 0 | 0.027% | 0 | 9.01 → 9.01 MB |

Both hidden phases recorded zero application RAF callbacks as well as zero renders/draws. Both idle phases recorded zero canvas dimension writes because their state and viewport were unchanged. No page errors were recorded. The compiled baseline was fully captured before the product owners were released to implement changes.

## Optimized implementation

`client/src/scene.ts` now uses one demand-driven render scheduler, targeting 60 renders/s while transient effects exist and scheduling no scene RAF when idle. It keeps elapsed-frame remainder to avoid a 50 FPS quantization on this environment's approximately 100 Hz callback cadence. Hidden tabs clear owned transient effects and stop scene work. Size/state signatures prevent redundant camera fitting and canvas resizing; static same-material blocks use instancing; shadow maps update only when relevant objects change. A bounded adaptive tier adjusts pixel ratio, shadow availability and particle density using sustained CPU submission/cadence heuristics, with cooldown and hysteresis. These are not GPU utilization measurements.

Card flights share the atlas texture and cache small UV geometries, including the generated eight-column weapon row, rather than cloning/uploading an atlas per flight. Fixed effect geometries and 1–9 damage glyphs use bounded caches with explicit shared-resource disposal; pixel textures do not generate unused mipmaps.

`client/src/main.ts` coalesces visual renders, constructs screen templates lazily, skips unchanged markup, retains hand geometry across selection-only updates, and uses resize observation to invalidate it. Countdown timers run only for visible live deadlines and change text only when seconds change. Game snapshots, commands and response deadlines remain authoritative and are processed immediately. `feedback.ts` avoids resuming an already running audio context on every gesture.

For the final `after` capture, the helper replays the **exact stored baseline public packets**, including actor/target IDs. The random initial Lord rotates DOM order, so regenerating from that order would otherwise change those IDs despite the same effect pattern. The stable room-local player IDs exist in both fixtures. Flags, viewport, warm-up, timing, effects and measurement logic are unchanged. `after-initial.json` preserves an earlier exploratory optimized capture that used regenerated actor order; use `after.json` and `comparison.md` for the final comparison.

No game regression suite was run. Build compilation and the explicitly authorized performance captures were performed. See [final comparison](comparison.md) and its raw data for measured results; no resource/FPS claim is based solely on source changes.
