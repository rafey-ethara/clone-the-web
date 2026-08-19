# Behaviour sweep

Interaction model determined per section before any of it was described. The result
is unusually simple, and that simplicity is itself the finding.

## Interaction model by section

| Section | Model |
|---|---|
| Announcement bar | Static link, hover background change |
| Header / nav | Hover-driven dropdown panels |
| Hero | **Time-driven** — word rotator and orb both run on load |
| Logo wall | Static |
| Products | Time-driven (connector draws, blobs drift) + hover on cards |
| Unified platform | Time-driven (fan-in draws, icon orbits) |
| Industry / use cases | Hover-driven (card lift + image zoom) |
| Customers | Click-driven (video play) + hover on cards |
| Developer platform | Static, with one looping cursor blink |
| Insights | Hover-driven (card lift) |
| Closing CTA | Time-driven (SMIL gradient morph) |
| Footer | Static, hover on links |

There are **no tabs, no accordions, no carousels and no scroll-driven reveals**
anywhere on this page. Everything either sits still, animates on a clock from page
load, or responds to hover.

## Scroll

Probed directly:

| Probe | Result |
|---|---|
| `window.Lenis` | absent |
| `.lenis` class on any element | absent |
| `window.LocomotiveScroll` | absent |
| `window.gsap` | absent |
| `getComputedStyle(html).scrollBehavior` | `auto` |
| `getComputedStyle(body).overflow` | `visible` |
| Scroll container | none — the document scrolls |

**Native scrolling.** No smoothing library, no scroll hijacking, no custom easing.
This matters: a rebuild that adds Lenis will feel materially different from the
original, and reviewers notice smoothing far more readily than they notice a wrong
hex value.

## The header does not stick

This was measured at five scroll positions rather than assumed:

| `scrollY` | `nav` computed `position` | `nav` rect top |
|---|---|---|
| 0 | `relative` | 38 |
| 100 | `relative` | −62 |
| 400 | `relative` | −362 |
| 1200 | `relative` | −1162 |
| 4000 | `relative` | −3962 |

The nav's `getBoundingClientRect().top` tracks `−scrollY + 38` exactly at every
position. Background stays `rgba(0,0,0,0)`, box-shadow stays `none`, border-radius
stays `0px`, and the class list never changes. The header scrolls off the top of the
viewport with the rest of the page and never comes back.

There is no scroll listener changing it, no shrink, no blur, no shadow-on-scroll.
Once past the hero there is no persistent navigation at all — the only way back to
the top is the browser or the footer.

The announcement bar behaves the same way: its rect top is exactly `−scrollY`.

## Hover states — measured before and after

| Element | Property | Rest | Hover | Timing |
|---|---|---|---|---|
| Product card | `translateY` | `0` | `-8px` | 300ms |
| Product card | `box-shadow` | `none` | `0 18px 0 -8px rgba(226,224,214,0.5)` | 300ms |
| Product card arrow | `opacity` | `0` | `1` | 200ms `ease-in-out` |
| Product card arrow | `translateX` | `-8px` | `0` | 200ms `ease-in-out` |
| Product card art rings | `translate` | `0,0` | `+16px, −16px` | 700ms `ease-in-out` |
| Money/acquiring art rings | `translate` | `0,0` | `+12px, −12px` | 700ms `ease-in-out` |
| Use-case card | `translateY` | `0` | `-8px` | 300ms |
| Use-case card image | `scale` | `1` | `1.08` | 400ms `cubic-bezier(.25,.46,.45,.94)` |
| Insight card | `translateY` | `0` | `-8px` | 300ms |
| Announcement bar | `background` | `rgba(0,0,0,0.05)` | `rgba(0,0,0,0.10)` | 200ms |
| Announcement arrow | `margin-left` | `4px` | `8px` | 200ms |
| Nav dropdown row | `background` | transparent | `#f5f3eb` | default |
| Nav pill link | `background` | transparent | `rgba(255,255,255,0.9)` | default |
| Log In button | `background` | `rgba(255,255,255,0.9)` | `#ffffff` | 200ms |
| Contact Sales button | `background` | `#000000` | `rgba(0,0,0,0.9)` | 100ms |
| Video play surface | `scale` | `1` | `1.10` | 200ms |
| Text link arrow | `translateX` | `0` | `+4px` | 200ms `ease-in-out` |
| `.button` arrow tail | `opacity` | `0` | `1`, then `dash` loops | 10s linear |

The use-case card image zoom is guarded by
`@media (hover: hover) and (pointer: fine)` — it does not fire on touch devices.

The `.button` arrow is a two-line SVG where the second line is hidden at rest; on
hover it becomes visible with `stroke-dasharray: 2 4` and runs the `dash` keyframe
indefinitely, so the arrow's tail reads as a moving dotted trail.

## Click-driven content

The only click-driven state on the page is the two customer video cards. Each is a
`<div class="group/video relative aspect-video w-full">` containing a `<video>` with
`loop`, `muted`, `playsInline`, `preload="none"` and **`autoplay` false**, plus a
full-bleed overlay holding a 40 × 40 circular play control positioned bottom-left
with 24px padding (32px at `md`).

`preload="none"` with no `poster` attribute means the first frame is not fetched
until the visitor interacts. In the rebuild the card must therefore look complete
without any video frame at all.

## Nav dropdowns

Three of the six nav items open panels on hover: Products (4 rows), Use Cases
(10 rows) and Company (4 rows). Customers, Docs and Pricing are plain links.
Dropdown rows use `hover:bg-bone flex items-center rounded-lg px-2 py-1.5`;
product rows add `space-x-2` for a leading icon.

The panel container carries `--drop-shadow-nav` = `0 10px 20px rgba(0,0,0,0.08)`
and the `--radius-nav` = `28px` corner.

## Below 1024px

The desktop nav cluster (`hidden items-center justify-end text-xs lg:flex`) computes
to `display: none` at both 768 and 390, and a `p-3` icon button takes its place. The
same breakpoint hides both connector graphics (`hidden py-1 lg:block` → `display: none`)
and swaps in the mobile connector variants.
