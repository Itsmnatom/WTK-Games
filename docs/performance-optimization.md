# Rendering optimization

The approved goal is approximately 60 scene renders per second during animation, no repeated scene rendering at idle, hidden-tab sleep, and adaptive detail while retaining the 3D pixel-art table and important effects. Game rules and the previously repaired gameplay/reconnection/lobby paths are retained. This work changes client presentation only.

## Changes

- One demand-driven scene scheduler replaces the perpetual 30 FPS loop. Active effects target 60 FPS with elapsed-time remainder; idle/hidden scenes schedule no renderer RAF.
- State and size signatures skip unchanged camera fitting, layout and canvas resizing. Shadow maps are invalidated for relevant changes rather than recalculated on every animation frame.
- Static blocks with equal materials use instancing. Card flights share the original atlas with bounded UV geometries, avoiding whole-atlas clones. Fixed FX geometry and small damage glyphs have bounded caches and explicit ownership/disposal.
- Adaptive quality uses coarse device hints and sustained render/cadence samples, with cooldown/hysteresis. It can reduce resolution, shadows and particle density while retaining effect families. First frames after idle are excluded from cadence samples.
- Visual DOM renders are coalesced; screen templates are lazy; unchanged markup is retained. Hand geometry is cached until cards or available size change. Clock text changes only at visible live deadline boundaries. An already-running audio context is not resumed for every gesture.

## Measured outcome

The final capture replays the exact saved baseline public presentation packets, with the same viewport flags, hardware renderer, phase lengths and warm-up. It uses Chrome headless on NVIDIA GTX 1660 SUPER through ANGLE/D3D11. The mobile case is portrait/touch emulation on that desktop GPU, not a physical phone. Eight synthetic casts and eight impacts exercise rendering through the shipped Colyseus callback path without changing authoritative game state.

| Case | Active scene renders/s before → after | Idle scene renders/s before → after | Active renderer main-thread busy before → after |
| --- | ---: | ---: | ---: |
| Desktop 6 seats | 31.98 → 58.22 | 24.94 → 0 | 21.30% → 14.80% |
| Portrait emulation 10 seats | 33.52 → 59.47 | 24.96 → 0 | 16.90% → 13.38% |

Idle main-thread busy fell from 6.93% to 0.62% desktop and 5.98% to 0.71% portrait emulation. Hidden tabs already rendered zero frames in the baseline and retain that behavior. These are CDP renderer task-time ratios, not OS CPU or GPU utilization.

Total draw calls/s fell 42.4% on desktop. They increased 14.4% in portrait emulation because considerably more frames are rendered; draw calls per rendered frame fell in both cases. JS heap occupancy fluctuates with garbage collection and does not establish a general memory-saving percentage. No GPU-memory or OS GPU-utilization claim is made.

This short synthetic profile does not guarantee 60 presented FPS on every device or establish game-rule correctness. Builds and client type compilation passed; no game regression suite was run. Profiling servers/databases were isolated from the live preview. The existing preview at localhost:3001 serves the updated built client without restarting its authoritative game process.

Full method, raw data, build hashes and reproduction commands: [performance artifacts](../artifacts/performance/README.md), [comparison](../artifacts/performance/comparison.md), [before](../artifacts/performance/before.json), [after](../artifacts/performance/after.json).
