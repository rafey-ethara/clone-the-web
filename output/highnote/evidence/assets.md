# Asset inventory and text recipes

Counted on the loaded page at 1440 × 900: **69 `<img>`**, **2 `<video>`**,
**49 inline `<svg>`**, **4 CSS background gradients**. Every one is classified
below and every one has a text recipe in PRD §5. Nothing is referenced as a file.

## Inventory

### Raster and external-file images (69)

| Group | Count | Rendered | Intrinsic | `srcset`? | `loading` |
|---|---|---|---|---|---|
| Wordmark, header | 1 | 153×39 | 388×100 | no | auto |
| Wordmark, footer (circular) | 1 | 48×48 | 142×142 | no | auto |
| Arrow glyph, dark | 2 | 16×16, 20×20 | 20×20 | no | auto / lazy |
| Arrow glyph, light | 20 | 20×20 | 20×20 | no | auto / lazy |
| Customer logos, wall | 12 | 159×64 or 179×72 | 224×90 | no | 6 eager, 6 lazy |
| Customer logos, video cards | 2 | 172×32, 130×32 | — | 1 of 2 | lazy |
| Customer logos, quote cards | 4 | 80–100 × 24–40 | — | 1 of 4 | lazy |
| Feature icons, developer | 4 | 24×24 | — | no | lazy |
| Checkout illustration | 1 | 305×267 | 420×367 | no | lazy |
| Use-case photographs | 8 | 265×265 | 359×359 | **yes** | lazy |
| Article thumbnails | 3 | 405×270 | — | **yes** | lazy |
| Total | 69 | | | | |

> **The `srcset` trap.** The split above is not cosmetic. The photographs and
> article thumbnails ship a `srcset`; **every logo, icon and arrow does not.** An
> image with no `srcset` renders at its intrinsic size and is unaffected by device
> pixel ratio. If a rebuild adds a 1x/2x `srcset` to the logo marks, a DPR > 1
> browser picks the 2x candidate and **halves the rendered layout size** — the logo
> wall silently collapses to half scale on every retina screen. The rebuild
> specifies all marks as inline SVG at fixed dimensions, which sidesteps this
> entirely, but the original's behaviour is recorded here because it is the reason
> the marks must not be given a density descriptor.

Note also that the logo wall renders 224×90 source art into a 159×64 box —
a 0.71 downscale — and two of the twelve (positions 6 and 8) into 179×72 instead,
which is why those two marks read slightly larger than their neighbours.

### Videos (2)

| Attribute | Value |
|---|---|
| `autoplay` | **false** |
| `loop` | true |
| `muted` | true |
| `playsinline` | true |
| `preload` | `none` |
| `controls` | false |
| `poster` | *(absent)* |
| Rendered | 628 × 353 (16:9) |
| Classes | `h-full w-full rounded-xl bg-black object-cover` |

`bg-black` on the element is what the visitor actually sees before interaction,
since `preload="none"` and no poster means no frame is fetched. The card is
designed to read as complete while empty.

### Inline SVG (49)

| Purpose | viewBox | Rendered | Notes |
|---|---|---|---|
| Hero orb | `0 0 1440 700` | 1440×800 | 9 ring groups, 18 gradients, alpha mask |
| Issuing card art | `0 0 215 350` | 397×454 | rotated card rect, blurred blob, 6 rings, chip + wave glyphs |
| Acquiring backdrop | `0 0 280 400` | 427×524 | blurred blob, 5 rings |
| Credit card art | `0 0 350 350` | 336×384 | card rect, blurred blob, 6 rings, chip + wave glyphs |
| Money-movement backdrop | `0 0 280 400` | 427×524 | blurred blob, 5 rings |
| Rail pill icons | `76 14 40 40` | 30×30 | 8 distinct icons, duplicated for the loop |
| Products connector | `0 0 1280 80` | 1280×80 | 4 stems + rail + 8 caps + 12 flow paths |
| Products connector, mobile | `0 0 2 72` | — | two vertical strokes |
| Unified connector | `0 0 1280 240` | 1280×240 | 8 curves + 8 flow pulses + arrowhead marker |
| Unified connector, mobile | `0 0 320 120` | — | two curves |
| Unity icon | `0 0 40 40` | 100×100 | clipped disc, 5 blurred blobs, 3-part glyph |
| Benefit icons ×3 | `0 0 28 28`, `0 0 32 32` | 28–32 sq | stopwatch, two figures, star |
| Card arrows | `0 0 20 20` | 20×20 | single path, appears on hover |
| Text-link arrows | `0 0 20 20` | 20×20 | 3 instances |
| Play triangles | `0 0 24 24` | 24×24 | 2 instances |
| Burger icon | `0 0 16 14` | — | below 1024 only |
| CTA gradient band | `0 0 4509 1029` | 1600×280 | SMIL path morph + 60px blur |

### CSS background gradients (4)

| Selector role | Value | Size |
|---|---|---|
| Hero orb fade-out | `linear-gradient(rgba(0,0,0,0), rgb(245,243,235))` | 1440×240 |
| Rail pill fade-top | `linear-gradient(rgb(255,255,255) 10%, rgba(0,0,0,0))` | 305×140 |
| CTA band, mobile | `linear-gradient(to right, rgba(225,255,37,0.45), rgba(85,245,163,0.55), rgba(63,247,236,0.45))` | full width |
| CTA top scrim | `linear-gradient(rgb(245,243,235), rgba(0,0,0,0))` | 1600×154 |

Two further scrim pairs are drawn with `::before` / `::after` rather than on the
element itself, on both connector containers:

| Container | `::before` | `::after` |
|---|---|---|
| Unified connector | `linear-gradient(#f5f3eb, transparent)`, 60px | `linear-gradient(transparent, #f5f3eb)`, 20px |
| Products connector | `linear-gradient(#f5f3eb, transparent)`, 30px | `linear-gradient(transparent, #f5f3eb)`, 30px |
| Products connector, mobile | same, 16px | same, 12px |
| Unified connector, mobile | same, 40px | same, 16px |

These scrims are what make the connector lines appear to fade in and out of the
page surface rather than terminating abruptly. Getting them wrong is very visible.

## Recipe classification

| Kind | Count | Recipe strategy |
|---|---|---|
| Inline SVG already in the DOM | 49 | serialise viewBox + primitives verbatim (PRD §5.3–5.10) |
| Wordmark and logo marks | 20 | styled text + SVG ornament, invented brand (PRD §5.1–5.2) |
| Arrow and UI glyphs | 22 | 3–6 path commands each, given inline (PRD §5.11) |
| Photographs | 8 | CSS gradient with named stops + line motif (PRD §5.12) |
| Article thumbnails | 3 | gradient panel + composed wordmark row (PRD §5.13) |
| Videos | 2 | animated CSS panel with sheen + play control (PRD §5.14) |
| Fonts | 3 | system stacks, substitution recorded in `../notes.md` |
| Favicon | 1 | inline SVG data URI (PRD §5.1) |

Every row above resolves to a numbered PRD section. No asset is left as
"the hero image" or similar.
