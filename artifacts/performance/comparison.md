# WTK rendering performance comparison

Captured before 2026-10-15T08:31:41.417Z; after 2026-10-15T14:52:03.618Z. See [methodology](README.md), [before raw data](before.json), and [after raw data](after.json).

Before bundle: `/pixel/assets/index-TA99vc4W.js`, SHA-256 `6c8bb57c4a73aec45febed40ffaf3f43d35ddd121be46dc8715cb3d3574de78a`.

After bundle: `/pixel/assets/index-tcDm5Yv4.js`, SHA-256 `5a0819c2ced03107c6e3d1234e0d0b023a2f5b1d415c15c0694c5d913c047284`.

This compares an unchanged idle board, the same synthetic public-effects workload through the shipped SDK callback path, and an actually hidden tab. It does not report game regression results, real-match throughput, OS CPU percentage, GPU utilization, or physical-phone performance. Renders/s counts actual scene render calls through their default-framebuffer clear; observer RAF is recorded separately and is not used as game FPS. A headless capture is not proof of 60 presented FPS on all devices.

| Case / phase | Scene renders/s before → after | Draw calls/s before → after | Renderer main-thread busy before → after | Long tasks count / ms before → after | After JS heap start → end |
| --- | ---: | ---: | ---: | ---: | ---: |
| desktop-6 / idle | 24.94 → 0.00 | 7057.56 → 0.00 (-100.0%) | 6.93% → 0.62% | 0 / 0 → 0 / 0 | 4.37 → 4.41 MB |
| desktop-6 / active | 31.98 → 58.22 | 10147.50 → 5840.15 (-42.4%) | 21.30% → 14.80% | 1 / 217 → 1 / 82 | 4.41 → 7.93 MB |
| desktop-6 / hidden | 0.00 → 0.00 | 0.00 → 0.00 (—) | 0.03% → 0.02% | 0 / 0 → 0 / 0 | 8.49 → 8.49 MB |
| mobile-10 / idle | 24.96 → 0.00 | 3993.44 → 0.00 (-100.0%) | 5.98% → 0.71% | 0 / 0 → 0 / 0 | 7.04 → 4.44 MB |
| mobile-10 / active | 33.52 → 59.47 | 6206.62 → 7103.37 (14.4%) | 16.90% → 13.38% | 4 / 292 → 1 / 76 | 4.44 → 7.79 MB |
| mobile-10 / hidden | 0.00 → 0.00 | 0.00 → 0.00 (—) | 0.03% → 0.02% | 0 / 0 → 0 / 0 | 8.40 → 8.40 MB |

JS heap occupancy is not forced-GC retained memory; end values can fall or rise with normal GC. Browser/profiler overhead and random initial hero/role/deck assignment remain limitations. Compare actual renderer strings in the raw artifacts; mobile means desktop-browser viewport/touch emulation.

Viewport flags, public presentation event lists, and observed renderer strings match between these captures.
