# Topology — measured section map

All measurements taken in headless Chrome 151 via the DevTools Protocol.
`window.innerWidth` was read on every run and matched the requested width exactly,
so no viewport capping occurred.

## Page-level facts (viewport 1440 × 900, DPR 1)

| Fact | Value |
|---|---|
| `document.documentElement.scrollHeight` | **8343 px** |
| `document.body.scrollHeight` | 8343 px |
| `<html lang>` | `en-US` |
| `<html class>` | *(empty)* |
| `<body class>` | *(empty)* |
| `getComputedStyle(body).backgroundColor` | `rgb(255, 255, 255)` |
| Page surface actually seen | `#f5f3eb` — painted per-section, not on `body` |
| Rendering stack | React SSR + hashed CSS modules + a utility-class framework |

Scroll height at the other two widths:

| Width | `scrollHeight` |
|---|---|
| 1440 | 8343 px |
| 768 | 12772 px |
| 390 | 15737 px |

## Section map at 1440 (flow order, top to bottom)

`y` is the offset from document top; `height` is the border-box height.
Every section is flow content. Nothing on this page is a fixed overlay —
including the header (see `behaviors.md`).

| # | Section | y | height | background | notes |
|---|---|---|---|---|---|
| 1 | Announcement bar | 0 | 38 | `oklab(0 0 0 / 0.05)` over `#f5f3eb` | inside the hero wrapper |
| 2 | Header / nav | 38 | 71 | transparent | `position: relative` — scrolls away |
| 3 | Hero (wrapper) | 0 | 800 | `#f5f3eb` | contains 1, 2, the orb and the centred stack |
| — | Hero orb layer | 0 | 800 | transparent | `position: absolute`, `overflow: hidden` |
| — | Hero content `<main>` | 0 | 800 | transparent | `position: absolute; inset: 0`, flex-centred |
| 4 | Logo wall | 800 | 244 | `#f5f3eb` | eyebrow + 6 × 2 logo grid |
| 5 | Products | 1044 | 1011 | `#f5f3eb` | heading, 4 cards, connector, 8 capability tiles |
| 6 | Unified platform | 2055 | 752 | `#f5f3eb` | connector fan-in, orb icon, heading, 3 benefits |
| 7 | Industry / use cases | 2807 | 1294 | `#f5f3eb` | 8 photo cards in 4 × 2 |
| 8 | Customers | 4101 | 1172 | `#f5f3eb` | 2 video cards + 4 quote cards |
| 9 | Developer platform | 5274 | 993 | `#f5f3eb` | two-column, code panel right |
| 10 | Insights | 6267 | 809 | `#f5f3eb` | 3 article cards |
| 11 | Closing CTA | 7076 | 590 | `#f5f3eb` | heading, buttons, animated gradient band |
| 12 | Footer | 7665 | 678 | `#111111` | 6-column link grid + legal |

Sections 5–11 each open with a full-width 1 px rule in `#e2e0d6` on the inner
`max-w-screen-xl` container (`border-t`), which is what produces the consistent
horizontal ruling down the page. Section 4 does not have one; section 5's rule is
its own `border-t` on the inner container rather than on the section.

## Inner container

Every section centres a `max-width: 1280px` container (`max-w-screen-xl`) with
`padding-inline: 20px` (`px-5`). At 1440 that yields a 1280 px content column with
80 px of gutter each side.
