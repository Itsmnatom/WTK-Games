# Compact hand UI and ink rendering

Implemented 2026-10-16. Client presentation only; rules, server protocol, sound and fixed camera are unchanged.

- Desktop hand dock: 210 → 176 CSS px, giving the table 34 px more height. Cards are 84 × 112 px with a shallow ±4° fan. Selection lifts 8 px inside the scroll viewport.
- Portrait hand viewport: 145 → 132 px. Waiting panels size to their text; actionable reaction panels retain their controls and scrolling.
- Large-card inspection remains available through the eye button after selecting a card. Large hands scroll horizontally.
- Skill controls reuse unchanged markup rather than replacing their DOM nodes on each state update. Hand removal checks use a Set instead of repeated array searches.
- GPU particles restart their ring-buffer high-water mark after an expired batch, hide the particle mesh after expiry, and clear without rewriting all particle lifetimes. This reduces stale instance submissions between separated bursts; it does not reduce fixed buffer capacity.
- Ink grain uses an arithmetic hash; empty dry-brush margins discard before grain/glyph calculations. Existing adaptive particle density and idle/hidden rendering suspension remain enabled.

## Verification

`npm run check:client`, `npm run build:client` and `git diff --check` passed. Build retains the existing asset-path and bundle-size warnings.

The isolated layout fixture uses stubbed public state, with no room connection or gameplay commands. At 1440×900, 390×844 and 844×390, hands of 4, 8 and 14 cards have no vertical clipping or document overflow. Selected cards fit; the large-card inspector opens; unchanged skill buttons retain node identity. Waiting and reaction layouts were also captured. Raw bounds: `artifacts/immersive/layout.json`; previous bounds: `layout-before.json` in that directory.

The warmed VFX/SFX fixture uses the same dimensions and synthetic event schedule before and after. Results are a single capture per configuration on a desktop GTX 1660 SUPER, including desktop touch emulation, not measurements on a physical phone. CDP busy time measures the renderer main thread, not total CPU or GPU utilization. Other host work and garbage collection can affect timings.

| Synthetic scene | P95 render interval before → after | Renderer busy before → after |
| --- | --- | --- |
| Desktop, 6 seats | 21.4 → 24.6 ms | 14.18 → 16.16% |
| Portrait emulation, 10 seats | 21.0 → 20.4 ms | 13.78 → 11.23% |

Both configurations render about 54.3–54.6 frames/second over the active capture window. Draw calls remain essentially unchanged. Idle, settled and hidden phases submit zero frames before and after. All 41 presentation routes and 10 skill announcements remain accepted; no shader/runtime errors were recorded. This capture does **not** establish an overall FPS improvement: the desktop timing regressed while portrait emulation improved.

Raw captures: `artifacts/performance/feedback/hand-before.json` and `hand-after.json`. No matches, bots or game test suites were run.

## Dynamic skill workspace

Actionable reactions with embedded choices now expand the bottom shelf and widen the action panel. Guanxing shows a numbered top/bottom pile badge on each card, with 44 px controls and a persistent confirmation header. The first card in each pile disables its unavailable move-left action. Waiting observers keep the compact panel; completing the prompt restores the normal shelf. No prompt deadlines or server commands changed.

The layout fixture additionally covers a five-card Guanxing prompt with one card on hand on all three viewports. Cards and confirmation fit vertically; moving a card to the bottom pile updates its badge, and the next waiting snapshot restores the compact layout. This verifies presentation with a stubbed connection, not server-side skill resolution.
