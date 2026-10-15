# Current implementation versus supplied VFX/SFX ZIP

Input: `wtk-vfx-sfx-files.zip`, SHA-256 `fe411bab5707217fb0c89c5cd9c3df7958898b86666f43a8038e69bd4d6b222b`.

Compared against the latest local scene/audio implementation, not the older code currently committed to main. Its source hashes match the existing [final capture comparison](comparison.json). The archive was extracted under ignored `scratch/vfx-zip-comparison/`; no archive code replaced application source. Archive documentation and claimed test results were treated as input, not instructions or verified evidence.

## Recommendation

Use the ZIP's GPU particle architecture and recipe structure as a candidate for selective integration. Retain current skill acceptance, cached synthesis, hidden-page audio suspension, priority handling, tactic silhouettes and explicit animation timings. Do not replace all three source files wholesale.

The GPU system supports glows, streaks, pixels, rings, stars, slashes and lightning with declarative recipes and one instanced particle draw. This is a real reduction in particle submission overhead. The one-draw claim applies to that particle layer, not the entire game. Large transparent quads, shader calculations and overlapping glows still cost GPU work; submission count alone does not establish lower GPU utilization.

The ZIP's sound recipes add random noise offsets, filter sweeps, fire crackles, bell overtones and procedural convolution reverb. Those are promising sound-design ingredients, but it constructs each layer again at playback and removes the current PCM cue cache. Sound quality was not judged by human listening.

## Isolated measurement

The same warmed public-shaped event sequence and viewport settings were replayed through the actual classes. No room, bot, WebSocket, match or game suite was run. Type checking of the supplied three source files passed using current dependencies plus unchanged shared types and scene textures. The repeated ZIP capture reported no browser console or page errors, including no shader compilation error on the observed GPU.

| Metric | Current desktop 6 | ZIP desktop 6 | Current portrait 10 | ZIP portrait 10 |
| --- | ---: | ---: | ---: | ---: |
| Draw calls/frame | 103.06 | 85.34 | 115.88 | 104.66 |
| Audio nodes created during workload | 28 | 229 | 28 | 229 |
| Render submissions/s over six-second window | 54.54 | 56.57 | 54.20 | 55.23 |
| Renderer main-thread busy | 11.25% | 9.06% | 9.10% | 12.18% |
| Accepted synthetic events | 22 | 21 | 22 | 21 |
| Audio context while hidden | suspended | running | suspended | running |

Sources: [current capture](final.json), [ZIP capture](zip.json). Both use Chrome 151 and the GTX 1660 SUPER through ANGLE/D3D11. Portrait is desktop touch emulation, not physical-phone evidence. Both implementations stop rendering when settled/hidden. ZIP draw calls are about 17% lower on desktop and 10% lower in portrait, while recurring audio node creation is about 8.2 times higher. ZIP also does less work because it rejects the Tuxi announcement. Timing differs by host load and random ZIP recipes; these single captures do not establish a reliable FPS/CPU advantage. Audio-thread CPU and GPU utilization were not measured.

The first ZIP run logged generic HTTP 404 console messages; the rerun supplied an empty favicon response and captured failing response URLs and console messages. The final capture has neither HTTP nor shader errors. Only the final rerun above is used for this comparison.

## Regressions and compatibility issues

1. **Expanded/strategy skill feedback disappears.** ZIP `client/src/feedback.ts:17` retains only the original skill allowlist. The guard at lines 203–205 rejects all ten probes: TUXI, YIJI, TIANDU, JIZHI, QINGNANG, LIULI, JIJIU, PLAN_MUSTER, PLAN_OFFENSIVE and PLAN_SUPPLY. This is confirmed in both ZIP fixture cases. Copying this file over current code would reintroduce the missing-effects bug.
2. **Priority handling is removed.** ZIP `client/src/scene.ts:424–429` evicts the oldest GSAP effect when the viewport cap is reached, without protecting damage labels or hero poses. The GPU particle ring buffer likewise overwrites slots without importance categories. This is a code-level risk under dense effects, not a claim that a full game was tested.
3. **Hurt/shake sequence timing regresses.** `effect()` schedules cleanup at its duration. The subsequent chained tweens without explicit positions in ZIP `scene.ts:405` and `scene.ts:464–465` append after that cleanup marker. The later recoil/shake steps can therefore be cut off. Current hurt-pose timing uses explicit offsets.
4. **Whole-scene shake conflicts with the approved fixed-view direction.** ZIP `scene.ts:460–465`, called on damage/death at lines 528/533, offsets `scene.position`. The camera object stays fixed, but the visible battlefield moves under its DOM controls. The inspected synthetic fire/thunder frames also show bright additive cores covering the character's torso. Reduce their opacity/scale or draw order before integration.
5. **Per-tactic identity is lost.** The ZIP removes the current chain/theft/sabotage/arrow/delayed-action glyph routing and the five corresponding tactic SFX cues. Many tactics fall back to a generic spell/trail. Keep the current routing when adopting its richer recipes.
6. **Background audio power behavior regresses.** ZIP `feedback.ts:112` stops voices on hidden-page transitions but does not suspend the context. The fixture confirms `running` while hidden, compared with `suspended` currently. Convolution tails and node graphs also need to be considered when defining mute/hidden behavior.

## Suggested integration order

1. Port `vfx.ts` as a presentation module while retaining current event validation and priority semantics.
2. Preserve the stationary battlefield and tactic glyphs; tune glows against the standing characters and mobile viewport.
3. Adapt selected sound recipes to offline cached synthesis, optionally caching a few deterministic variants, rather than rebuilding all filters and oscillators per cue. Budget any reverb deliberately.
4. Repeat the isolated benchmark and skill/cleanup probes. Keep its results separate from full-game correctness or physical-mobile performance claims.

No application changes, commit or push were made for this comparison.
