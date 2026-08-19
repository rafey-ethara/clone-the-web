# Typography — families, the full scale, and what it overrides

## Families as shipped

Six `@font-face` blocks, each declared twice (once with `font-display: swap`, once
without), for three families:

| Family | Weights shipped | Role |
|---|---|---|
| Display sans (licensed) | 400, 500 | every heading; `--font-display` |
| Text sans (licensed) | 400, 500, 700 | body, nav, labels; `--font-sans` / `--font-body` |
| Monospace | 400 | `--font-mono`; used only in the code panel |

`--default-font-family` resolves to `--font-sans`, so the text family is the page
default and the display family is opt-in via a `font-display` utility class.

**The two sans families are commercially licensed and cannot be a dependency.**
The substitution specified in the PRD is a pure system stack — see `../notes.md`.
The monospace family is an open-licence face and is available from Google Fonts,
but the PRD still specifies a system fallback stack so the page needs no network.

## The type scale — this is the trap

The site **replaces the utility framework's entire default type scale**. Every step
differs from the framework default. Building against framework defaults would make
every heading and every body paragraph on the page the wrong size.

| Token | This site | Framework default | Δ |
|---|---|---|---|
| `--text-xxs` | 12px / 16px | *(not in the default scale)* | added |
| `--text-xs` | **14px / 18px** | 12px / 16px | +2 |
| `--text-sm` | **16px / 24px** | 14px / 20px | +2 |
| `--text-base` | **18px / 28px** | 16px / 24px | +2 |
| `--text-lg` | **22px / 33px** | 18px / 28px | +4 |
| `--text-xl` | **26px / 36px** | 20px / 28px | +6 |
| `--text-2xl` | **40px / 50px** | 24px / 32px | +16 |
| `--text-3xl` | **45px / 55px** | 30px / 36px | +15 |
| `--text-4xl` | **50px / 60px** | 36px / 40px | +14 |
| `--text-5xl` | **62px / 72px** | 48px / 1 | +14 |
| `--text-6xl` | **70px / 80px** | 60px / 1 | +10 |
| `--text-7xl` | **100px / 106px** | 72px / 1 | +28 |
| `--text-20` | 20px / 28px | *(not in the default scale)* | added |
| `--text-reset` | 0px / 0px | *(not in the default scale)* | added |

`--text-6xl` at 70px is the single most consequential override: it is the size of
six of the eight `<h2>` elements on the page.

## Measured, as rendered at 1440

| Element | font-size | line-height | weight | colour |
|---|---|---|---|---|
| `h1` (hero) | 100px | 105px | 400 | `rgb(0,0,0)` |
| `h2` (most sections) | 70px | 80px | 400 | `rgb(0,0,0)` |
| `h2` (developer section) | 62px | 72px | 400 | `rgb(0,0,0)` |
| `h2` (closing CTA) | 100px | 106px | 400 | `rgb(0,0,0)` |
| Section sub-paragraph | 18px | 27px | 400 | `rgb(0,0,0)` |
| Hero sub-paragraph | 18px | 30px | 400 | `oklab(0 0 0 / 0.7)` |
| CTA sub-paragraph | 18px | 29.25px | 400 | `oklab(0 0 0 / 0.6)` |
| Card title `h3` | 16px | 24px | 400 | `rgb(0,0,0)` |
| Card body `p` | 16px | 24px | 400 | `rgb(0,0,0)` at 60% opacity |
| Benefit `h3` | 14px | 18px | 500 | `rgb(0,0,0)` |
| Benefit `p` | 14px | 22.75px | 400 | `rgb(0,0,0)` |
| Nav link | 14px | 18px | 400 | `rgb(0,0,0)` |
| Announcement bar | 14px | 18px | 500 | `rgb(0,0,0)` |
| Footer column head | 14px | 18px | 500 | `rgb(255,255,255)` |
| Footer legal | 12px | 20px | 400 | `rgb(255,255,255)` |

Heading weight is **400 everywhere**. The page never uses a bold heading; hierarchy
is carried entirely by size. Only small labels (14px `h3`, footer heads, the
announcement bar) step up to 500.

## Responsive heading sizes — measured

| Element | 1440 | 768 | 390 |
|---|---|---|---|
| `h1` | 100px / 105px | 70px / 73.5px | 42.9px / 45.045px |
| `h2` | 70px / 80px | 40px / 50px | 40px / 50px |

The `h1` at 390 is 42.9px because the base size is a viewport unit — `11vw` —
and 390 × 0.11 = 42.9. The clamp order is `text-[11vw]` → `md:text-6xl` →
`lg:text-[100px]`, with `leading-[1.05]` throughout.

`h2` uses `text-2xl lg:text-6xl` (40px → 70px), so it steps once at 1024, not twice.

## Tracking and leading tokens

| Token | Value |
|---|---|
| `--tracking-tight` | `-0.025em` |
| `--tracking-normal` | `0em` |
| `--tracking-wide` | `0.025em` |
| `--tracking-wider` | `0.05em` |
| `--tracking-widest` | `0.1em` |
| `--leading-snug` | `1.375` |
| `--leading-relaxed` | `1.625` |

No heading on the page sets tracking; headings render at the family's natural
metrics. The only measured non-zero tracking is `1.5px` on the SVG card-number
text inside the acquiring illustration.
