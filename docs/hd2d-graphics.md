# HD-2D courtyard graphics

User-confirmed visual direction: pixel characters standing on bases, a wood war table with bronze fittings and a cloth campaign map, warm lantern light against cool moonlight, compact effects for ordinary cards and larger effects for hero skills and match-ending moments. Camera stays fixed during play.

## Implementation

- `client/src/scene.ts` renders 19 standing character cutouts as camera-facing planes on three-dimensional miniature bases. The full-body atlas is distinct from the existing HUD portrait atlases. Four columns and five rows hold 19 heroes in shared-catalog order plus an unused final cell. Nearest filtering, no mipmaps, alpha testing and inset UVs keep the sprite boundary crisp.
- Ready, attack, hurt and fall states animate the sprite's pose group with short GSAP transforms. These are transform animations of one illustrated standing pose per hero, not separately hand-drawn animation frames. Bases remain stationary. Dead figures remain fallen and muted; initial/reconnected dead snapshots use the final fallen pose without replaying the death sequence.
- Miniatures sit on the table surface with their own physical layout; the accessible DOM seat/HP controls retain their existing responsive anchors. Effects originate from the corresponding miniature. All three layout cases keep the same authoritative seat order and card targeting rules.
- `client/src/scene-textures.ts` creates deterministic wood-grain, cloth-map, contact-shadow and lantern-glow textures once per scene. Terrain symbols, routes, river and camp markers are decorative and do not add game mechanics. Bronze corner brackets, scroll edges and tiny supply standards are static geometry, with repeated blocks still instanced.
- Warm floor light pools and contact shadows are static transparent texture planes, requiring no animated lights or ambient particles. Existing optional static shadow maps and automatic detail tiers remain. No bloom/composer/full-screen postprocessing dependency was added.
- Ordinary cards keep concise flight/trail/defense/heal cues; flying cards now have a landing shadow. Sword hits add a second arc; fire/thunder add brief tinted glows. Skills use a faction-colored seal, with scholar stars, warrior crescents, support rings or Wu sparks according to hero family. Low-HP impacts have an accent without claiming an unrescued player is already dead; actual victory has a separate gold burst.
- Pose and VFX timelines share the bounded effect lifetime. Replacing a pose, reducing effects, hiding the tab or disposing the scene releases the timeline and restores the appropriate resting/fallen state. Shared geometries and textures are cached and released at scene disposal. Materials belonging to a removed player are released immediately.
- Rendering still wakes on changes/active effects and stops when settled. There is no permanent breathing animation, camera movement, lantern flicker or particles keeping the renderer awake. Camera fitting changes only for viewport/layout fitting, not combat events. Reduced effects retain concise rings and damage labels while omitting pose movement and large skill effects.

## Assets

Runtime: `public/art/heroes-standing-atlas.png`. Built-in ImageGen generated the first atlas and a targeted revision to improve tile separation. The runtime image has real alpha; the final file is copied into the repository, while generation intermediates stay outside runtime assets. Exact prompts and file hash are recorded in `hd2d-art-provenance.json`.

## Validation limits

Build and client type-check results are recorded after implementation. Per the user's standing instruction, no game regression suite, bot match or browser gameplay QA is run for this graphics change. The atlas was visually inspected and its dimensions/alpha were read from the PNG; this does not prove the in-game layout at every viewport. The earlier before/after FPS report belongs to a previous renderer build. Sixty FPS remains a target; no FPS, GPU cost or memory-saving percentage is claimed for this build without a new measurement.

Completed: `npm run build`, `npm run check:client` and the changed scene source's whitespace check passed. The compiled server started on localhost:3001. An HTTP read confirmed that the served bundle references the standing atlas and the atlas route returns HTTP 200 with PNG content. No room was created for this verification. Vite's existing static-asset notices and large-chunk warning remain.
