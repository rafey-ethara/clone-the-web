# Motion — every keyframe and every resolved animation

57 `@keyframes` blocks were recovered verbatim from the stylesheets and saved,
de-branded, to `keyframes-debranded.css` in this folder. Resolved timings below
come from `document.getAnimations()` sampled at t ≈ 3 s after load, cross-checked
against the `animation` shorthand in the stylesheet.

> **Reading note on easing.** `getAnimations().getTiming().easing` reports `linear`
> for every CSS animation on this page, because the real easing lives on the
> keyframe effect rather than the timing object. The easings in the table below are
> the ones written in the `animation` shorthand and are the correct values to build
> against.

## The single most important behavioural fact

**Every animation on this page starts at page load.** There is no
`IntersectionObserver`-driven reveal, no scroll-linked timeline and no
scroll-driven animation. The play-once entrance animations — the connector line
draws, the digit reveals — have finished long before a visitor scrolls far enough
to see them. A rebuild that gates these on scroll will *look* better but will not
match the original.

## Play-once entrances

| Keyframe | Target | Duration | Delay | Easing | Fill | What changes |
|---|---|---|---|---|---|---|
| `orb-riseIn` | hero orb rings 1–9 | 2600ms | 0, 100, 200, 300, 400, 500, 560, 660, 760ms | `cubic-bezier(.16,1,.3,1)` | forwards | `opacity 0→1`, `translateY(var(--y))→0` |
| `pconn-drawLine` | product stems ×4 | 800ms | 0, 80, 160, 240ms | `cubic-bezier(.22,1,.36,1)` | forwards | `stroke-dashoffset 60→0` |
| `pconn-drawLine` | horizontal rail | 1200ms | 200ms | `cubic-bezier(.22,1,.36,1)` | forwards | `stroke-dashoffset 1106→0` |
| `pconn-drawLine` | capability caps ×8 | 800ms | 700–1050ms, +50ms each | `cubic-bezier(.22,1,.36,1)` | forwards | `stroke-dashoffset 60→0` |
| `uconn-drawLine` | fan-in curves ×8 | 1500ms | 0–560ms, +80ms each | `cubic-bezier(.22,1,.36,1)` | forwards | `stroke-dashoffset 600→0` |
| `uconn-drawLine` | centre stem | 600ms | 1400ms | `cubic-bezier(.22,1,.36,1)` | forwards | `stroke-dashoffset 80→0` |
| `acq-revealDigit` | card digit groups ×4 | 400ms | 800, 1600, 2400, 3200ms | `ease-out` | forwards | `opacity 0→1` |
| `acq-revealDigit` | expiry text | 400ms | 4000ms | `ease-out` | forwards | `opacity 0→1` |
| `acq-revealDigit` | CVC text | 400ms | 4500ms | `ease-out` | forwards | `opacity 0→1` |
| `acq-slideNetwork` | primary network mark | 500ms | 1200ms | `ease-in-out` | forwards | `translateX 0→87px` |
| `acq-fadeOutLogos` | secondary network marks | 400ms | 1200ms | `ease-out` | forwards | `opacity 1→0` |
| `pconn-m-drawLine` | mobile stems ×2 | 750ms | 0, 80ms | `cubic-bezier(.22,1,.36,1)` | forwards | `stroke-dashoffset 72→0` |
| `uconn-m-drawLine` | mobile fan-in ×2 | 1350ms | 0, 120ms | `cubic-bezier(.22,1,.36,1)` | forwards | `stroke-dashoffset 320→0` |

The acquiring card reads as a checkout form filling itself in: four digit groups
appear 800 ms apart, the primary network mark slides 87 px to the right while the
other marks fade out, then expiry and CVC land at 4.0 s and 4.5 s. The whole
sequence runs 4.9 s and never repeats.

## Continuous loops

| Keyframe | Target | Duration | Delay | Easing | Direction | What changes |
|---|---|---|---|---|---|---|
| `orb-drift` | hero rings 1–9 | 28, 24, 32, 22, 26, 30, 24, 28, 22 s | 2600–3360ms | `ease-in-out` | normal | `translate` by per-ring `--dx`/`--dy` |
| `head-rotateWord` | headline words 1–5 | 15000ms | 0, 2500, 5000, 7500, 10000ms | `cubic-bezier(.16,1,.3,1)` | normal | in at 2%, hold to 15%, out by 17.5% |
| `head-rotateWordLast` | headline word 6 | 15000ms | 12500ms | `cubic-bezier(.16,1,.3,1)` | normal | identical but exits at 16.67% |
| `iss-ambientDrift` | issuing blob | 12000ms | 0 | `ease-in-out` | alternate | translate + scale 0.82–1.3 + rotate ±12° |
| `acq-ambientDrift` | acquiring blob | 14000ms | 0 | `ease-in-out` | alternate | translate + scale 0.85–1.25 + rotate ±10° |
| `cred-ambientDrift` | credit blob | 14000ms | 0 | `ease-in-out` | alternate | translate + scale 0.82–1.3 + rotate ±12° |
| `move-ambientDrift` | money-movement blob | 16000ms | 0 | `ease-in-out` | alternate | translate + scale 0.85–1.25 + rotate ±10° |
| `move-scrollPills` | rail pill track | 45000ms | 0 | `linear` | normal | `translateY 0→-50%` |
| `pconn-flowPath` | flow dots ×12 | 3500ms | 0–8800ms, +800ms each | `linear` | normal | `stroke-dashoffset 100→0` |
| `uconn-flowCurve` | fan-in pulses ×8 | 2400ms | 0–2100ms, +300ms each | `linear` | normal | `stroke-dashoffset 600→0` |
| `uconn-flowStem` | centre stem pulse | 1000ms | 1500ms | `linear` | normal | `stroke-dashoffset 80→0` |
| `uconn-m-flowCurve` | mobile pulses ×2 | 2400ms | 0, 450ms | `linear` | normal | `stroke-dashoffset 320→0` |
| `pconn-m-flowPath` | mobile flow ×2 | 3200ms | 0, 1100ms | `linear` | normal | `stroke-dashoffset 100→0` |
| `uni-bgPulse` | unity icon disc | 12000ms | 0 | `ease-in-out` | normal | `fill` cycles green → cyan → yellow → green |
| `uni-orbit1`…`uni-orbit5` | icon blobs 1–5 | 7, 9, 11, 8, 13 s | 0 | `ease-in-out` | normal | translate ±7px + rotate ±360° + scale 0.8–1.3 |
| `uni-pulse1`…`uni-pulse5` | icon blobs 1–5 | 4, 5, 6, 3.5, 7 s | 0 | `ease-in-out` | alternate | SVG `r` 10→14, 12→16, 8→13, 9→12, 14→18 |
| `launch-sweep` | stopwatch hand | 2000ms | 0 | `cubic-bezier(.4,0,.2,1)` | normal | rotate 0→360° by 80%, then holds |
| `diff-stepOut` | right figure | 2500ms | 0 | `ease-in-out` | normal | `translateX 0→3px→3px→0` |
| `innov-spin` | star | 5000ms | 0 | `linear` | normal | rotate 0→360° |
| `code-blink` | code cursor | 800ms | 0 | `step-end` | normal | `opacity` 0 at 50% |
| `dash` | button arrow tail | 10000ms | 0 | `linear` | normal | `stroke-dashoffset → 80px`, only while hovered |

## SMIL — the one animation that is not a keyframe

The closing CTA band animates its own path geometry with an SVG `<animate>`
element, not CSS. It is easy to miss because it does not sit alongside the CSS
animations in the stylesheet.

- `attributeName="d"`, `dur="8s"`, `repeatCount="indefinite"`
- `calcMode="spline"`, `keySplines="0.45 0 0.55 1"` repeated for all three segments
- four `values` states, the first and last identical so the loop closes seamlessly
- the path is a five-point polyline across a 4509 × 1029 viewBox, filled with a
  three-stop gradient and pushed through `feGaussianBlur stdDeviation="60"`

## Keyframes defined but unused on this page

`spin`, `pulse`, `marquee`, `marqueereverse`, `loader`, `entrance`, `enter`, `exit`,
`accordion-down`, `accordion-up`, `fadeup`, and the nine `tl-*` timeline keyframes
(`tl-card-in`, `tl-text-in`, `tl-rule-wipe`, `tl-dot-in`, `tl-check-draw`,
`tl-rail-draw`, `tl-rail-head`, `tl-body-in`, `tl-dot-pulse`) are all defined in the
shipped stylesheet, but no element on the home page resolves to any of them. They
belong to other routes. A rebuild of this page alone does not need them; they are
listed here so that every recovered keyframe is accounted for.

Four animation tokens wrap some of these: `--animate-spin` = `spin 1s linear infinite`,
`--animate-pulse` = `pulse 2s cubic-bezier(.4,0,.6,1) infinite`,
`--animate-marquee` = `marquee 40s linear infinite`,
`--animate-loader` = `loader 2s ease-in-out infinite`.

## Reduced motion

No `@media (prefers-reduced-motion)` block appears in any of the 12 stylesheets.
The page does not honour the preference. The PRD specifies adding one — that is a
deliberate, flagged improvement on the original, not a transcription of it.

## Motion suppressed below 1024px

A `@media (max-width: 1023px)` block disables the expensive work:

- all four product-card ambient blobs → `animation: none`
- every `g[filter]` inside the four product cards → `filter: none`
- the issuing card's drop-shadow filter → `filter: none`
- the unity icon's five orbiting blobs → `display: none`; the disc swaps from the
  animated fill to a static `linearGradient` and its blur filter is removed
- the hero orb rings keep `orb-riseIn` but lose `orb-drift` entirely
- the rail pill track drops `will-change` and `backface-visibility`
- the pill `backdrop-filter` and the video play surface's `backdrop-filter` are removed
