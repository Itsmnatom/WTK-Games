# Chinese ink-brush VFX

User-confirmed direction: dramatic feedback for every card, matte black/vermilion/gold with small elemental accents, 0.6–1 second overall gestures, one large cast for group cards and individual server-confirmed impacts. Keep the immersive UI, sound, fixed view, adaptive detail and presentation-only boundary.

## Style and routing

- `client/src/vfx.ts` replaces luminous particles with dry-brush strokes, uneven ink washes, droplets, broken enso-style circles, jagged brushed lightning and vermilion seals. The seal is a stylized command motif constructed in the shader. Edges use fixed local grain rather than animated screen noise. There is no new image, texture download, font or postprocessing dependency.
- All particle output uses premultiplied normal blending. It no longer brightens ink into white additive glare. Black and gold carry most gestures; subdued amber, blue-green and jade identify fire, thunder and healing. Particles retain their existing draw position before standing-character sprites; damage labels remain above them.
- Each card owns a side seal, stroke and spatter flourish. Attack/duel have crescents; theft has a hook; sabotage has crossing fractures; chains have linked rough circles; draw effects have paired impressions; delayed tactics have a crossed hourglass gesture; equipment has a gold circle. Existing small card-family symbols remain as readable ink-colored markers.
- `INK_STYLE_BY_CARD` in `scene.ts` maps all 41 catalog entries to families, including all 21 equipment types. Converted cards route by the publicly announced effective card name. SFX validation and playback code are unchanged.
- Arrow Barrage, Barbarian Invasion, Peach Garden and Bumper Harvest each own exactly one central cast, irrespective of target count. Arrows/invasion add radial brush marks; garden/harvest use their elemental/gold accents. Target impacts and damage numbers are created only by accepted damage events. Cast animation does not predict hits, reveal hidden cards or introduce an action queue/delay.
- Individual fire/thunder damage now gives a short colored ink impact, rather than replaying a whole casting sequence per victim. Skills use the larger seal motif; death/dying/victory keep their own restrained black/red/gold recipes. Ordinary Wine empowerment remains distinct from response-time recovery.

## Lifetime and resource budget

Primary seal/spatter gestures last about 0.65–0.92 seconds. The particle writer clamps delay plus life to at most 0.98 seconds, so no recipe leaves a long tail running. The original card flight, hurt/death pose and damage-label durations remain below one second. None pauses the authoritative game, blocks pointer input or modifies the reaction deadline.

The fixed particle buffers remain 1,536 desktop / 768 mobile slots with quality density 1 / 0.62 / 0.36. Motion remains GPU-driven; no per-particle mesh, material, GSAP tween or CPU simulation loop is added. Shared glyph geometry and priority-aware labels/poses remain. Reduced effects use the concise existing rings/labels. Hidden and disposed scenes clear their particles; rendering stops when settled.

## Evidence

Command: `node scripts/feedback-perf-profile.cjs ink-final --inspect --ink`.

The isolated fixture uses actual scene/feedback classes with synthetic public-shaped packets. It starts no room, game server, bot, WebSocket or match. No game/Jest suite was run. The script was extended to inspect ink routing and capture cast plus impact views, with shader console errors included in the error record.

[Final ink capture](../artifacts/performance/feedback/ink-final.json) records:

- All 41 card styles have valid families and all 41 announce one cast.
- The four group casts are invasion, arrows, garden and harvest, with one call per card.
- Simultaneous damage retains six labels in the six-seat fixture and ten in the ten-seat fixture.
- All ten expanded/strategy skill probes remain accepted.
- No page/shader errors; reduced effects settle; active effects, voices and cached cues clear on disposal.
- Settled and hidden phases record zero rendered frames. Hidden audio remains suspended. After the ink coverage burst, no particle is still live at the 1.2-second observation.
- Source hashes confirm `main.ts`, `immersive.css` and `feedback.ts` match the pre-ink hybrid manifest: UI and SFX were not changed for this style update.

Screenshots of cast/impact fire, lightning, healing, Slash, sabotage and Arrow Barrage were visually inspected in the isolated scene. Local screenshots stay ignored under `artifacts/performance/feedback/ink-final-*.png`. This is presentation evidence, not played-match or full-game UI verification.

## Timing observations

Same viewport/event sequence/browser/observed GTX 1660 SUPER renderer as the [previous hybrid capture](../artifacts/performance/feedback/hybrid.json). Portrait is desktop touch emulation, not a physical phone. Both versions accept all 22 workload events.

| Metric | Hybrid / ink desktop | Hybrid / ink portrait |
| --- | ---: | ---: |
| Draw submissions/frame | 89.13 / 84.64 | 112.24 / 108.64 |
| Audio nodes created | 28 / 28 | 28 / 28 |
| Render submissions/s over active window | 54.65 / 54.06 | 54.80 / 54.12 |
| Render interval p95, ms | 20.40 / 25.50 | 20.30 / 20.30 |
| Renderer main-thread busy | 11.75% / 18.94% | 15.22% / 7.84% |

Fewer submissions do not establish lower GPU cost. Desktop CPU timing and p95 worsened in this capture, while portrait timing improved; host load, GC and random recipes vary between single runs. This is a style change, not proof of a general performance improvement or a 60 FPS guarantee. The six-second render-rate window includes gaps/settling, and the fixture omits the full game DOM and rules. Audio source is unchanged; small cached PCM trim differences between browser runs are not a sound-design change.

The earlier `ink.json` is an exploratory capture before the final family-specific brush gestures. Use `ink-final.json` for this implementation. Production client build and client type checking are the final source checks.
