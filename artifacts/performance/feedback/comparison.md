# Isolated feedback benchmark

Values are **before / after**, from [warmed baseline](before-warm.json) and [final capture](final.json).

| Case | Draw calls/frame | Audio nodes created | Renderer main-thread busy | Renders/s over 6-second window | Render interval p95 (ms) |
| --- | ---: | ---: | ---: | ---: | ---: |
| desktop-6 | 126.86 / 103.06 | 128 / 28 | 20.70% / 11.25% | 55.36 / 54.54 | 20.60 / 20.60 |
| portrait-10 | 125.42 / 115.88 | 128 / 28 | 17.85% / 9.10% | 53.09 / 54.20 | 20.90 / 20.40 |

Both captures use Chrome/151.0.7922.47 and ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 SUPER (0x000021C4) Direct3D11 vs_5_0 ps_5_0, D3D11). Portrait uses desktop GPU touch emulation. They replay the same synthetic public-shaped events with visual/audio warmup, without a room, WebSocket or match. The baseline rejects Tuxi: 21 accepted events; the final version accepts all 22.

Both versions record **zero rendered frames** during idle, settled and hidden phases. Final audio state while hidden is suspended. All ten expanded/strategy skill probes are accepted. Final settled effects and audio voices are zero; reduced effects settle to zero. Disposal leaves zero active effects, voices, pooled spark clouds and cached cues. Cached PCM is 1,921,048 bytes (about 1.83 MiB).

The upgraded capture submits 8–19% fewer draw calls per frame and creates 78% fewer audio nodes in this workload. Renderer main-thread work was lower in the final capture; single-run timing and heap deltas are sensitive to host load and GC and do not establish stable CPU or memory percentages. The active window includes gaps and settling; renders/s is not sustained animation FPS. No 60 FPS guarantee is made. GPU utilization and audio-thread CPU were not measured.

These are presentation measurements, not game correctness tests or human listening tests. Initial exploratory and intermediate captures remain alongside these files. See [implementation and reproduction notes](../../../docs/feedback-upgrade.md).
