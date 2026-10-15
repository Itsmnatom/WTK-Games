# Immersive table and hybrid GPU feedback

For the later matte Chinese ink-brush style, see [ink VFX](ink-vfx.md). The hybrid recipe descriptions and measurements below describe the previous luminous style.

This follows the user's request to combine the supplied GPU effect system with the existing feedback safeguards, then redesign the playing screen as an immersive interface. Rules, server messages and secret-information filtering are unchanged.

## Playing screen

- Desktop uses the scene as the main surface, with a small floating navigation group, compact phase/deck strip, strategy controls and a hand fan paired with a right-side command panel. Opponent controls retain HP, hand count, range, chain/disconnect indicators and legal-target selection. The top opponent's panel sits below its standing character on desktop.
- Portrait stacks strategy and context-sensitive actions above a horizontally scrollable hand fan. Short landscape keeps commands beside the hand and moves personal status/strategy into the top rail to avoid covering lower players. Normal card/target selection and reaction commands use the existing handlers.
- A room/roster drawer exposes room code, catalog, public player/plan state and the local player's equipment. Selecting equipment as an eligible skill cost closes the drawer and returns to the board. Hidden roles remain whatever the server snapshot permits; no inferred role data is added.
- Hand card dimensions remain bounded (92×126 desktop, 76×105 portrait, 64×88 short landscape). Fan layout reads the CSS width instead of relying on an outdated fixed size. Extra vertical space keeps card labels and selection lift inside the hand scroll viewport. Center played cards keep their previous compact sizes.
- Outfit 700 is self-hosted for Latin brand/numeral accents, with its OFL license under `public/fonts/`; Thai keeps Noto Sans Thai. Navigation and turn reveals are finite GSAP fades. There is no animated marquee, pinned marketing section, background breathing loop, world shake or combat camera movement.

The invoked visual skill's editorial split, typography, hierarchy and restrained finite motion were adapted to an interactive game. Marketing AIDA sections, large footers, scroll pinning and continuous marquees would conflict with the approved fixed tabletop and idle rendering budget, so they were not added to the playing screen.

## Hybrid feedback

`client/src/vfx.ts` starts from the user-supplied particle module: one instanced particle layer, GPU age/drag/gravity evaluation, fixed buffers and recipe-based effects. The shader's reversed smoothstep interval was rewritten into an explicit inverted interval. Particle alpha is reduced; depth testing is enabled and the particle draw precedes the standing-character sprites, retaining character visibility. Damage labels render above the particle layer.

The existing `scene.ts` retains event acceptance boundaries, priority-aware GSAP effects, small per-tactic glyphs, correct Wine empowerment versus recovery cues, expanded-hero/plan effects and corrected pose timing. GPU particles replace spark clouds and the moving trail/slash/fire/lightning internals. They wake the demand-driven renderer while alive, get a final clearing frame, then stop. Hidden/reduced/disposed scenes clear their particle layer.

SFX retain all 26 cached synthesized cues, priority voice limits, volume/mute and hidden-page AudioContext suspension. Selected ZIP-inspired filter sweeps, metallic partials and short room reflections are synthesized into the offline cue buffers. No live ConvolverNode, sound download or music is added. Cached PCM increased from 1,921,048 to 2,035,136 bytes (about 1.94 MiB) in the captured browser; that is a bounded memory tradeoff, not a memory-reduction claim.

## Isolated measurement

Sources: [pre-hybrid capture](../artifacts/performance/feedback/final.json), [hybrid capture](../artifacts/performance/feedback/hybrid.json). Same six-second synthetic event sequence, scene dimensions, warmed browser classes and observed GTX 1660 SUPER renderer. Both accept all 22 public presentation events, including Tuxi. No room, bot, match or WebSocket is created.

| Metric | Previous desktop / hybrid | Previous portrait / hybrid |
| --- | ---: | ---: |
| Draw calls/frame | 103.06 / 89.13 | 115.88 / 112.24 |
| Audio nodes created | 28 / 28 | 28 / 28 |
| Renders/s over active window | 54.54 / 54.65 | 54.20 / 54.80 |
| Render interval p95, ms | 20.60 / 20.40 | 20.40 / 20.30 |
| Renderer main-thread busy | 11.25% / 11.75% | 9.10% / 15.22% |

Draw submissions decreased by about 14% desktop and 3% portrait while retaining the cached audio cost. Both versions render zero frames during idle, settled and hidden samples. All ten expanded/plan skill probes pass acceptance; reduced effects settle; disposal clears voices, active effects and cached cues. Hidden audio is suspended.

The hybrid capture **does not demonstrate lower CPU cost**: the portrait main-thread timing is higher in this sample. Timing is host-load/GC/random-recipe sensitive, and draw count is not GPU utilization. There is no 60 FPS guarantee or measured physical-phone claim. The fixture omits the full DOM HUD and game rules; the active-window rate includes event gaps and settling. Raw results remain available rather than presenting only favorable metrics.

Reproduce presentation profiling with `node scripts/feedback-perf-profile.cjs hybrid --inspect`. This does not run game tests.

## UI layout evidence

`node scripts/immersive-layout-preview.cjs` imports the real UI with a request-intercepted connection module that only supplies static public-shaped snapshots. It starts no game server, sends no commands and opens no WebSocket. Captures cover desktop 1440×900 (6 seats), portrait 390×844 (10 seats) and short landscape 844×390 (10 seats), each in play/reaction presentation states.

[Layout bounds](../artifacts/immersive/layout.json) record no page errors or document horizontal overflow. Screenshots were visually inspected for hand clipping, character/label placement and response controls. Screenshots remain local and ignored under `artifacts/immersive/`. This is static layout evidence, not a played match, full-game browser QA or proof of every reaction/skill workflow.

Client type checking and the production client build are the final source checks. No Jest/game suite or multiplayer gameplay smoke test is run.
