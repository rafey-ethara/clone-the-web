# Product Requirements Document — “Ledgra” Marketing Home Page

**Document type:** Complete build specification
**Audience:** An engineer or code-generating model building the page from scratch
**Status:** Implementation-ready

---

## 0. How to read this document

This PRD is **self-contained and text-only**. It has **zero external dependencies**:

- **No image files.** Every graphic — logos, product illustrations, industry “photos”,
  case-study media, article cards, icons, the hero background — is specified as inline SVG
  drawn from primitives, or as CSS gradients. Exact geometry, colours and stops are given.
- **No font files.** Typography uses a system font stack. Exact families listed in §3.2.
- **No video files.** The two case-study tiles are specified as animated CSS panels.
- **No third-party UI libraries** beyond the framework and Tailwind CSS.

Every measurement in this document is a **required exact value**, not a suggestion. Where a
Tailwind utility string is given, use that exact string — the class list is the specification.

“Ledgra” is a **fictional placeholder brand** invented for this document. It exists only so the
copy reads naturally. You may substitute any other name; if you do, replace it consistently in
every string listed in §23 (Copy Deck).

**Every company name in this document is fictional** — the product (“Ledgra”), the twelve
customer wordmarks, the two case-study partners, and the names quoted in testimonials and
article titles were all invented for this specification. They are placeholder content whose
only purpose is to give each slot a realistic length and shape. Substitute freely. Do not
replace them with the names of real companies.

---

## 1. Product overview

### 1.1 What this is

A single long-scroll marketing home page for a fictional **payments infrastructure platform**
called **Ledgra**. The company sells four financial products (card issuing, payment acquiring,
credit programs, and money movement) that sit on one shared ledger. The page’s job is to
convince a technical buyer — a fintech founder, a payments lead, a platform CTO — that the
platform is unified rather than assembled from acquisitions, and to drive them to either
“Explore the Platform” (sign-up) or “Talk to an Expert” (sales contact).

### 1.2 Design intent

The visual identity is **“calm document, loud hero.”**

- The entire page sits on a warm off-white “bone” paper colour, not pure white. Cards are the
  only pure-white surfaces, so they read as objects resting on paper.
- One enormous saturated moment — an animated cyan→green→yellow orb — occupies the hero and
  then never returns until the closing CTA, where a soft echo of the same gradient appears.
- Typography is large, tight, and neutral (a Helvetica-class grotesque). Headings run up to
  100px. There is no decorative type, no italics, no colour in headings.
- Motion is **ambient and continuous**, never scroll-triggered. Things breathe, drift, draw
  themselves in on load, and loop forever. Nothing waits for the user to scroll to it.
- Every interactive card lifts 8px on hover and reveals an arrow.

### 1.3 Non-goals

- No backend, database, authentication, or form submission.
- No CMS. All content is hard-coded.
- No analytics, tag managers, error reporting, or cookie banners.
- No dark mode. The page has exactly one appearance.
- No internationalisation. English only.

---

## 2. Technical requirements

### 2.1 Stack

| Concern | Requirement |
|---|---|
| Framework | React with a file-based router and server components (e.g. Next.js App Router) |
| Language | TypeScript, `strict: true`, no `any` |
| Styling | Tailwind CSS v4 (CSS-first `@theme` configuration) + CSS Modules for keyframe-heavy components |
| Components | Named exports, PascalCase files, one component per file |
| Indentation | 2 spaces |
| Route | The page is served at `/` |

### 2.2 Client vs. server components

Almost everything is a **server component**. Only these need client-side JavaScript:

1. **The navigation bar** — holds `useState` for the mobile menu toggle.
2. **The case-study media tile** — holds `useState` for the modal and refs for playback.
3. **The API demo panel** — holds `useState` + `useEffect` for its typewriter reveal.

Everything else — including all animation — is pure CSS and must render on the server.

### 2.3 Quality gates

The build must pass, with zero errors and zero warnings:

1. Type check (`tsc --noEmit`)
2. Lint (ESLint with the framework’s recommended + TypeScript configs)
3. Production build

Notes that prevent common failures:

- Apostrophes and double quotes inside JSX **text nodes** must be escaped (`&apos;`, `&quot;`)
  or the `react/no-unescaped-entities` rule will fail the lint gate.
- The non-standard CSS property `mask-type` used in the hero orb must be cast when set inline:
  `style={{ maskType: "alpha" } as React.CSSProperties}`.

---

## 3. Design system

### 3.1 Colour tokens

Define these as CSS custom properties inside Tailwind’s `@theme` block so utilities such as
`bg-bone`, `text-ash`, `border-ash` are generated.

| Token | Hex | Role |
|---|---|---|
| `--color-bone` | `#f5f3eb` | **Page background.** Every section uses it. Warm off-white. |
| `--color-bone-50` | `#faf9f5` | Lighter paper, subtle raised surfaces |
| `--color-blackBG` | `#111111` | Footer background, API panel shell |
| `--color-black` | `#000000` | Headings, primary button fill |
| `--color-white` | `#ffffff` | Card surfaces, secondary button fill |
| `--color-ash` | `#e2e0d6` | Section divider rules, pill fills, connector strokes |
| `--color-ash-50` | `#f1efeb` | Faint fills |
| `--color-clay` | `#b9b6a9` | Muted foreground |
| `--color-clay-50` | `#787365` | Deeper muted foreground |
| `--color-green` | `#55f5a3` | Brand green — focus rings, accent marks |

**Brand gradient triad.** These three colours are the entire accent system and appear in the
hero orb, all four product illustrations, the platform icon, the article cards, and the
closing CTA glow:

```
cyan   #3FF7EC   (a deeper variant #00FFF0 is used as the orb ring base)
green  #55F5A3
yellow #E1FF25
```

Canonical gradient:

```css
--gradient-brand: linear-gradient(135deg, #55f5a3 25%, #98fa66 68.27%, #e1ff25 100%);
```

Transparency conventions used throughout (Tailwind slash syntax):
`text-black/70` body copy, `text-black/60` secondary copy, `bg-black/5` announcement bar,
`bg-white/90` secondary button, `border-black/10` media card borders.

### 3.2 Typography

**Font strategy — no font files.** Use a system grotesque stack. The design was drawn for a
Helvetica-class neo-grotesque; the stack below resolves to exactly that on macOS/iOS
(Helvetica Neue), Windows (Arial), and Android/Linux (Roboto / Liberation Sans).

```css
--font-display: Helvetica, "Helvetica Neue", Arial, "Liberation Sans", system-ui, sans-serif;
--font-sans:    Helvetica, "Helvetica Neue", Arial, "Liberation Sans", system-ui, sans-serif;
--font-mono:    ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
```

- `--font-display` is applied via a `.font-display` utility and is used on **every `<h1>` and
  `<h2>`**, and nowhere else.
- `--font-sans` is the document default, set on the page wrapper.
- `--font-mono` is used only inside the API demo panel.
- Only weights **400 (regular)** and **500 (medium)** are used. Never bold headings.
- The whole page sets `-webkit-font-smoothing: antialiased`.

**Custom type scale — this is NOT the Tailwind default.** You must override every one of these
tokens or the page will be visibly wrong (headings ~15% too small, body copy too small):

| Utility | `font-size` | `line-height` |
|---|---|---|
| `text-xxs` | 12px | 16px |
| `text-xs` | **14px** | 18px |
| `text-sm` | **16px** | 24px |
| `text-base` | **18px** | 28px |
| `text-lg` | 22px | 33px |
| `text-xl` | 26px | 36px |
| `text-2xl` | **40px** | 50px |
| `text-3xl` | 45px | 55px |
| `text-4xl` | 50px | 60px |
| `text-5xl` | 62px | 72px |
| `text-6xl` | **70px** | 80px |
| `text-7xl` | **100px** | 106px |

`text-xxs` is a **custom utility** you must add — it does not exist in Tailwind.

### 3.3 Spacing, radius, shadows

- Spacing scale is the Tailwind default (`--spacing: 0.25rem`). Do not change it.
- **`--radius-card: 1.25rem` (20px)** — expose as a `.rounded-card` utility. This is
  *the* card radius, used by every card, media tile, and article thumbnail on the page.
- Other radii in use: `rounded-xl` (12px) on nav dropdown panels, `rounded-lg` (8px) on
  dropdown rows, `rounded-full` on buttons and the play control, `rounded-[12px]` on the
  money-movement pills, `rounded-[8px]` on their icon chips.
- **Card hover shadow (exact):** `0 18px 0 -8px rgba(226,224,214,0.5)`. Note this is a *hard,
  offset, spread-negative* shadow in the ash colour — it reads as a paper shadow, not a blur.
- Nav dropdown shadow: `0 10px 30px -5px rgba(0,0,0,0.05)`.
- Money-movement pill shadow: none; it uses a `1px solid #e2e0d699` border instead.

### 3.4 Breakpoints

Tailwind v4 defaults. Confirm these values:

| Name | Min width |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

**Content width.** Every section constrains content to **1280px** and pads it with `px-5`
(20px). Tailwind v4 **removed** the `max-w-screen-*` utilities, so you must re-declare:

```css
.max-w-screen-xl { max-width: 80rem; } /* 1280px */
```

Without this the page has no content width and everything spans the viewport.

### 3.5 Custom utility classes to author

```css
.button {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  padding-inline: 1rem;
  padding-block: 0.5rem;
  border-radius: 9999px;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.button-black-arrow {           /* primary */
  position: relative;
  background-color: #000;
  color: #fff;
  padding-inline: 1.5rem;
  padding-block: 0.5rem;
}
.button-white-arrow {           /* secondary */
  position: relative;
  background-color: rgb(255 255 255 / 0.9);
  padding-inline: 1.5rem;
  padding-block: 0.5rem;
}
.button:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px var(--color-green);
}
```

Buttons are **fully pill-shaped**, use `text-xs` (14px), and sit at 40px tall.

---

## 4. Global page structure

The page is a flat stack of siblings on the page background. **There is no scroll container,
no scroll-snap, and no smooth-scroll library.** Native browser scrolling only.

Root wrapper: a single `<div>` carrying the site-scoped class (background, default font,
antialiasing). Inside it, in this exact order:

| # | Block | Height @1280px | Cumulative top |
|---|---|---|---|
| 1 | Announcement bar | 38px | 0 |
| 2 | Navigation bar | 71px | 38 |
| 3 | Hero (contains 1+2 visually) | 700px (`md:` 800px) | 0 |
| 4 | Trust / logo wall | 172px | 800 |
| 5 | Products intro + 4 product cards | 982px | 972 |
| 6 | Connector diagram + capability pills | — | (inside 5) |
| 7 | Unified-platform statement | 742px | 1954 |
| 8 | Industry grid (8 cards) | 1266px | 2696 |
| 9 | Customers (2 media + 4 quotes) | 1142px | 3962 |
| 10 | Developer platform + API panel | 993px | 5104 |
| 11 | Insights (3 article cards) | 797px | 6097 |
| 12 | Closing CTA + gradient glow | 589px | 6894 |
| 13 | Footer | 678px | 7483 |

**Total document height at a 1280px-wide viewport: 8233px.** Use this as an acceptance check.

### 4.1 Section rhythm

Most mid-page sections open with a hairline rule and generous top padding. The repeated
container pattern is:

```
border-ash relative mx-auto max-w-screen-xl border-t pt-16 sm:pt-28
```

The hairline is a 1px top border in `#e2e0d6`, full content width. Sections 8, 9, 10, 11 and
12 all begin this way. Sections 5 and 7 do not (they follow directly from the block above).

---

## 5. Asset strategy — building every graphic from text

This section is the contract that removes all file dependencies. **Nothing below requires a
binary asset.**

| Original graphic | Text-only replacement | Spec |
|---|---|---|
| Brand logo lockup | Inline SVG mark + `<span>` wordmark | §5.1 |
| 12 customer logos | Styled text wordmarks | §5.2 |
| 8 industry photographs | CSS gradient tiles + line motif | §5.3 |
| 2 case-study videos | Animated CSS gradient panels | §5.4 |
| 3 article thumbnails | Radial-gradient panels with text lockups | §5.5 |
| All icons | Inline stroke SVG on a 24/30/32px grid | §5.6 |
| Hero background orb | Inline SVG, exact geometry | §9 |
| 4 product illustrations | Inline SVG, exact construction | §11 |
| Favicon | Inline SVG data URI | §5.7 |

### 5.1 Brand mark

A 40×40 rounded mark plus a wordmark, used in the nav (40px tall) and footer (48px, white).

Draw as inline SVG on a `0 0 40 40` viewBox:

1. A filled circle, `cx=20 cy=20 r=20`, fill `#0a0a0a` (nav) or `#ffffff` (footer).
2. Three dots of `r=3.2` in the brand green `#55f5a3` (nav) / `#111111` (footer), placed on a
   descending diagonal at `(13,25)`, `(20,20)`, `(27,15)`.
3. Two connecting strokes of `width 3.4`, same colour, round caps, joining dot 1→2 and 2→3.

This reads as three nodes linked on a rising line — a “ledger entry” glyph.

The wordmark is plain text next to it: `Ledgra`, `--font-display`, weight 500, `letter-spacing:
-0.01em`, font-size 30px in the nav, colour `#000`. Wrap mark + wordmark in a flex row with
`gap: 10px; align-items: center`.

### 5.2 Customer logos (12)

**Do not draw logos.** Render each as a text wordmark in a flex-centred cell. This is both the
zero-asset solution and visually appropriate — a wall of neutral wordmarks.

Base style for every wordmark:

```
color: #0a0a0a; font-family: var(--font-display); white-space: nowrap;
display: flex; align-items: center; justify-content: center;
```

| # | Name | Size | Weight | Letter-spacing | Extra treatment |
|---|---|---|---|---|---|
| 1 | NORTHGATE | 20px | 500 | 0.06em | Uppercase, 2px solid `#0a0a0a` box, `padding: 3px 8px` |
| 2 | ARDENT | 24px | 500 | -0.02em | Prefix a `➤`-like triangle: a 10px CSS triangle via borders |
| 3 | Paceline | 24px | 500 | -0.03em | Lowercase-styled, tight |
| 4 | NOVEXA | 22px | 400 | 0.14em | Uppercase, wide tracking |
| 5 | Wayfare | 22px | 500 | -0.01em | — |
| 6 | kudos | 30px | 700 | -0.04em | **`large` variant** (see sizing note) |
| 7 | Brightside | 22px | 500 | -0.02em | Prefix a filled 14px circle with a 5px white inner dot |
| 8 | HAULMARK | 22px | 700 | 0.02em | **`large` variant**, uppercase, prefix a 12px rotated square (45°) |
| 9 | VANTARA | 24px | 500 | 0.10em | Uppercase |
| 10 | Coinlake | 22px | 400 | -0.01em | Prefix a 16px “C” drawn as a 2px-stroke open circle arc |
| 11 | fathom | 28px | 700 | -0.05em | Lowercase |
| 12 | GiftLoop | 22px | 400 | 0 | Serif fallback: `Georgia, "Times New Roman", serif` |

**Sizing.** Wrap each wordmark so the cell behaves like the original image slots:

- Standard: `max-h-12 w-auto sm:max-h-16` (48px → 64px cap)
- `large` (#6 Kudos, #8 Haulmark): `max-h-14 w-auto sm:max-h-18` (56px → 72px cap)

### 5.3 Industry tiles (8)

Each industry card carries a 3:2 image. Replace with a **gradient tile plus a line motif**.

Tile container:

```
rounded-[0.75rem] relative overflow-hidden aspect-[3/2] w-full
```

Inside, two layers:

1. **Background** — a `linear-gradient(140deg, …)` using the palette below.
2. **Motif** — a centred inline SVG, `stroke="rgba(255,255,255,0.55)"`, `stroke-width="1.5"`,
   `fill="none"`, sized to 46% of the tile width, describing the industry in simple geometry.

| # | Card | Gradient stops | Motif geometry |
|---|---|---|---|
| 1 | AP & Bill Pay | `#d8c9b4 → #b9a086 → #8f7660` | Three stacked rounded rectangles, offset 6px each, with a small tag circle top-right |
| 2 | Spend Management | `#c9b7a4 → #a48a72 → #6f5847` | A table line: one long horizontal rule, three vertical stems, a small circle on the centre stem |
| 3 | Fleet | `#c3cbd2 → #9aa7b2 → #6c7a86` | A rounded van silhouette: one large rounded rect + two 5px-radius circles beneath + a fuel nozzle L-shape |
| 4 | Travel and OTAs | `#d5c3ae → #b39a80 → #7d6550` | A suitcase: rounded rect with a handle arc on top and two wheel circles |
| 5 | Platforms and Marketplaces | `#bcc7bd → #93a394 → #63735f` | A 3×3 dot grid with two connecting lines crossing the centre |
| 6 | Embedded Finance | `#cdbfb2 → #a8968a → #74655c` | A card terminal: tall rounded rect, a screen rect inside the top, three dots at the base |
| 7 | Branded Credit | `#c2b3ad → #97847e → #5f504c` | A storefront: trapezoid awning over a rectangle with a centred door arch |
| 8 | Vertical SaaS | `#c8c2b3 → #a09983 → #6b6455` | A desk scene: one horizontal rule, an open laptop chevron, a small circle (lamp) top-left |

All eight gradients are deliberately desaturated earth tones so the tiles read as photography
without competing with the brand accent colours.

### 5.4 Case-study media tiles (2)

Replace video with an animated panel that reads as a paused film.

Container: `aspect-video w-full rounded-xl bg-black relative overflow-hidden`.

Inside:

1. A full-bleed layer with
   `background: radial-gradient(120% 90% at 30% 25%, #1d3a34 0%, #0d1a18 55%, #000 100%);`
2. A drifting sheen: an absolutely-positioned `200% × 200%` layer with
   `background: linear-gradient(115deg, transparent 40%, rgba(85,245,163,0.16) 50%, transparent 60%);`
   animated by `sheen 9s linear infinite` (§17.10).
3. The partner wordmark, absolutely positioned `top-6 left-6 md:top-8 md:left-8`, white,
   `--font-display`, 500, 22px (`h-6 md:h-8` box).
4. The play control (§5.6.9), bottom-left, `p-6 md:p-8`.

### 5.5 Article thumbnails (3)

These are **text lockups on gradients** in the original design, so they translate perfectly.

Container: `rounded-card relative aspect-[3/2] w-full overflow-hidden`, background
`#ffffff`, with a soft coloured halo behind centred text.

| # | Halo | Centred lockup |
|---|---|---|
| 1 | `radial-gradient(80% 70% at 50% 120%, #55f5a3 0%, rgba(85,245,163,0) 70%)` | Brand mark + `Ledgra` (26px, 500) · a light-grey `×` (20px) · `NORTHGATE` in the boxed style from §5.2 |
| 2 | `radial-gradient(90% 80% at 50% 50%, #3ff7ec 0%, #ffffff 62%)` | Line 1: brand mark + `Ledgra` (22px, 500). Line 2: `Built for Travel Payments` (30px, 400, `--font-display`) |
| 3 | `radial-gradient(90% 80% at 50% 40%, #3ff7ec 0%, #ffffff 60%)` | Line 1: `Capability Comparison` (30px, 400). Line 2: `Ledgra` · grey `vs` · `Paceline` · grey `vs` · `VANTARA`, all 14px |

### 5.6 Icon set

All icons are inline SVG. Unless stated: `fill="none"`, `stroke="black"`, `stroke-width="1.5"`,
`stroke-linecap="round"`, `stroke-linejoin="round"`, `aria-hidden="true"`.

**5.6.1 Arrow (right)** — the single most-used icon. 20×20, viewBox `0 0 20 20`:

```
<path d="M4 10H16M11 5L16 10L11 15" />
```

Accepts a `color` prop for the stroke (`black` or `white`).

**5.6.2 Money-movement pill icons** (8, drawn on a 30×30 box, viewBox `76 14 40 40`, `fill`
based rather than stroke, colour `black`) — describe each with simple primitives:

| Label | Glyph |
|---|---|
| Check | A landscape rounded rect (a cheque) with a horizontal band across the top third and a small `+` at the lower right |
| Wire | Two facing arcs (like parentheses) with a vertical “$” stem centred between them |
| ACH | A bank: a triangular pediment over four vertical columns on a base rule |
| RTP / FedNow | A lightning bolt: a single closed zig-zag polygon |
| OCT | The cheque rect with an arrow exiting to the right |
| Stablecoin | A circle with a vertical “$” stem, flanked by two arcs |
| AFT | The cheque rect with an arrow entering from the right |
| Payouts | A banknote rect with a centred circle and two corner notches |

**5.6.3–5.6.6 Developer feature icons** (32×32, `stroke-width="2"`):

| Feature | Glyph |
|---|---|
| Graph API | A hexagon outline with a smaller inverted triangle inside it |
| Real-Time Webhooks | Two solid right-pointing triangles side by side (a “fast forward”) |
| Robust Sandbox Environment | Two overlapping rounded rects offset 4px, the rear one showing only its edge |
| Enterprise-Ready Security | A padlock: a rounded rect body with a semicircular shackle above it |

Each sits in a **48×48 chip**: `bg-ash-50 rounded-[10px] flex items-center justify-center`, and
the glyph renders at 28px inside it.

**5.6.7–5.6.9 Platform trio + play control:**

| Icon | Glyph |
|---|---|
| Launch Faster | A stopwatch: a circle with a short stem and cap on top and a single hand pointing up-right |
| Differentiate Easily | Two people: a circle head + shoulder arc, repeated smaller and offset right |
| Keep Innovating | A four-point sparkle star with two smaller sparkles at upper-right and lower-left |
| Play | A right-pointing solid triangle, `fill="white"`, on a 24×24 box: `<path d="M8 5v14l11-7z" />` |

**5.6.10 Hamburger** — 16×14, three `16×2` black rects at `y = 0, 6, 12`.

**5.6.11 Card chip + contactless waves** (used inside the product illustrations): a `36×47`
rounded rect (`rx=6`) filled `#606060` with a lighter `#F0F0F0` internal contact pattern, and
four nested arcs of increasing radius to its right, `fill="white"`, forming the contactless
symbol.

### 5.7 Favicon

Inline SVG data URI — a 100×100 black rounded square with the three-node green glyph from §5.1
centred. No `.ico` file.

---
## 6. Link policy

There is no backend and only one route. Every link’s `href` is a **placeholder path** written
exactly as listed in the copy deck (e.g. `/products/issuing`, `/contact`, `/blog`). They do not
resolve; that is expected and acceptable. Do not replace them with `#` — the paths carry
semantic meaning and appear in the DOM. External-looking destinations (docs, status, support,
social) use the literal strings given in §23.

---

## 7. Announcement bar

The first thing on the page. A full-width, one-line promotional strip above the nav.

**Element:** an `<a>`.

**Classes:**
```
group relative z-20 block w-full bg-black/5 px-3 py-2.5 text-center text-xs font-medium
duration-200 hover:bg-black/10
```

**Inner:** `relative mx-auto flex max-w-screen-xl items-center justify-center px-5`

**Contents:**
1. `<p>` with the text: `The Instant Settlement Playbook Is Here for Fintechs, PayFacs, ISOs and Vertical SaaS. Get It Now`
2. Immediately after, the arrow icon (§5.6.1) at `class="ml-1 h-4 duration-200 group-hover:ml-2"`.

**Behaviour:** on hover the background deepens from `black/5` to `black/10` over 200ms **and**
the arrow slides right by increasing its left margin from `4px` to `8px`. Both transitions run
simultaneously.

**Height:** 38px. `href="/playbooks/instant-settlement"`.

---

## 8. Navigation bar

### 8.1 Shell

**Critical behaviour: the nav is `position: relative`, NOT sticky or fixed.** It scrolls away
with the hero and never returns. There is no shrink-on-scroll, no background change, no
floating pill state. Do not add one.

```
<nav class="z-20 relative w-full bg-transparent">
  <div class="px-5">
    <div class="relative mx-auto max-w-screen-xl">
      <div class="flex items-center justify-between py-4">
        …left cluster… …right cluster… …hamburger…
      </div>
    </div>
  </div>
  …mobile panel when open…
</nav>
```

Height: 71px. Background is transparent, so the hero orb shows through it.

### 8.2 Left cluster

`<div class="text-reset mr-6 flex items-center">` containing:

1. `<div class="mr-5">` → a link to `/` holding a visually hidden `<span class="sr-only">Ledgra</span>`
   and the brand lockup from §5.1, rendered at 40px tall / 153px wide.
2. The desktop nav list (§8.3).

### 8.3 Desktop nav list

`<nav class="nav hidden items-center lg:flex">` — **hidden below 1024px.**

The `.nav` class itself is a custom utility that horizontally centres the list within the bar:

```css
.nav { position: absolute; left: 50%; translate: -50%; }
```

Six top-level items in this order: **Products, Use Cases, Customers, Company, Docs, Pricing.**

Three of them (Products, Use Cases, Company) are hover dropdowns; the other three are plain
links. Every top-level item — dropdown trigger or link — uses this exact class string:

```
whitespce-nowrap rounded-card group relative mx-0.5 block cursor-pointer px-3 py-2.5 text-xs
hover:bg-white/90
```

> `whitespce-nowrap` is a typo carried from the source design. It resolves to nothing. Either
> keep it verbatim (recommended for fidelity) and declare it as `white-space: nowrap`, or drop
> it. Do not silently “fix” it to `whitespace-nowrap` without declaring the rule.

### 8.4 Dropdown panels — hover-driven, pure CSS

Each dropdown trigger is a `group` wrapper containing three children:

1. `<div>` with the label text.
2. **A transparent hover bridge:** `<div class="transparent absolute h-5 w-full">`. This 20px
   invisible strip spans the gap between the trigger and the panel so the pointer can travel
   into the panel without the hover state breaking. It is essential.
3. The panel:

```
invisible absolute mt-4 -ml-1 {WIDTH} -translate-x-2 -translate-y-2 rounded-xl bg-white px-1 py-1
opacity-0 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] duration-100
group-hover:visible group-hover:translate-y-0 group-hover:opacity-100
```

Panel widths: **Products `w-64`**, **Use Cases `w-56`**, **Company `w-48`**.

The transition is 100ms and animates three things together: `visibility`, `opacity` 0→1, and a
translate of `(-8px, -8px)` → `(-8px, 0)`. So the panel fades in while rising 8px.

**Panel row styles.**

- Single-line rows (Use Cases, Company):
  `hover:bg-bone flex items-center rounded-lg px-2 py-1.5 font-medium`
- Two-line rows (Products only):
  `hover:bg-bone flex items-center space-x-2 rounded-lg px-2 py-1.5`
  with an inner `<div>` holding
  `<div class="pb-0.5 font-medium">{label}</div>` and
  `<div class="text-xxs opacity-70">{description}</div>`

### 8.5 Right cluster

`<div class="hidden items-center justify-end text-xs lg:flex">` with two pill buttons:

**Log In** (secondary):
```
whitespce-nowrap rounded-card group relative mr-1.5 ml-0.5 block cursor-pointer bg-white/90
px-4 py-2.5 text-xs duration-200 hover:bg-white
```

**Contact Sales** (primary):
```
whitespce-nowrap rounded-card group relative mr-1.5 ml-0.5 block cursor-pointer bg-black
px-4 py-2.5 text-xs text-white duration-100 hover:bg-black/90
```

Note both use `rounded-card` (20px), **not** fully round — they are softer rectangles, in
contrast to the fully-pill hero buttons.

### 8.6 Mobile menu

Below `lg` the desktop list and right cluster are hidden and a hamburger button appears:

```
<button class="flex h-10 w-10 items-center justify-center lg:hidden"
        aria-label="Toggle menu" aria-expanded={open}>
```

containing the 16×14 three-bar glyph (§5.6.10).

Clicking toggles a stacked panel rendered **after** the nav bar row, inside the `<nav>`:

- Wrapper: `flex flex-col px-5 pb-6 lg:hidden`
- Each group: `border-ash border-b py-3`, with a `pb-2 text-xs font-medium` label and its
  children stacked in `flex flex-col gap-1`, each child
  `text-xs opacity-70 duration-200 hover:opacity-100`
- Plain items render as `border-ash border-b py-3 text-xs font-medium`
- Footer of the panel: `flex flex-col gap-2 pt-5` holding full-width **Log In** and
  **Contact Sales** buttons, each `rounded-card block cursor-pointer px-4 py-2.5 text-center
  text-xs` with the same fills as their desktop counterparts.
- Selecting any link closes the panel.

This is the **only** stateful behaviour in the navigation.

---

## 9. Hero

### 9.1 Container

```
<div class="bg-bone relative flex h-[700px] flex-col overflow-hidden antialiased md:h-[800px]">
```

- **700px tall on mobile, 800px from `md` (768px) up.**
- `overflow-hidden` clips the orb.
- It contains, in DOM order: the announcement bar + nav, then the orb, then the centred content.

### 9.2 Content block

The hero copy is **absolutely positioned over the whole hero** and centred:

```
<main class="absolute inset-0 flex items-center justify-center px-5 lg:px-10">
  <div class="relative mx-auto -mt-5 w-full max-w-screen-xl text-center">
```

The `-mt-5` nudges the block 20px above true centre to optically balance the orb.

### 9.3 Headline — the rotating word

The `<h1>`:

```
{headlineClass} font-display mx-auto max-w-screen-xl text-[11vw] leading-[1.05] md:text-6xl lg:text-[100px]
```

Font sizes: `11vw` on mobile → **70px** at `md` → **100px** at `lg`. Line-height 1.05.

Structure — two lines. The first line cycles through six words; the second is static.

```
<span class="sr-only">The only payments platform built for you.</span>
<span aria-hidden="true">
  <span class="{rotatingLine}">
    <span class="{word1}">Issuing</span>
    <span class="{word2}">Acquiring</span>
    <span class="{word3}">Credit</span>
    <span class="{word4}">Money Movement</span>
    <span class="{word5} hidden md:inline">Real-Time Ledgering</span>
    <span class="{word5} inline md:hidden">Ledgering</span>
    <span class="{word6}">Ledgra</span>
  </span>
  <span class="{staticLine}">Built for You.</span>
</span>
```

Accessibility: the animated block is `aria-hidden`; a screen-reader-only span carries the real
sentence. Do not omit this.

Note the fifth word has **two variants** — the long form `Real-Time Ledgering` shows at `md`
and above, the short form `Ledgering` below it, so the word never wraps on small screens.

**CSS module for the headline:**

```css
.headline      { text-align: center; position: relative; }
.rotatingLine  { height: 1.15em; display: block; position: relative; overflow: hidden; }
.word          { opacity: 0; width: 100%; position: absolute; left: 0;
                 animation: rotateWord 15s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
.word1 { composes: word; animation-delay: 0s;    }
.word2 { composes: word; animation-delay: 2.5s;  }
.word3 { composes: word; animation-delay: 5s;    }
.word4 { composes: word; animation-delay: 7.5s;  }
.word5 { composes: word; animation-delay: 10s;   }
.word6 { composes: word; animation-name: rotateWordLast; animation-delay: 12.5s; }
.staticLine    { display: block; }

@keyframes rotateWord {
  0%     { opacity: 0; transform: translateY(80%);  }
  2%     { opacity: 1; transform: translateY(0);    }
  15%    { opacity: 1; transform: translateY(0);    }
  17.5%  { opacity: 0; transform: translateY(-40%); }
  100%   { opacity: 0; transform: translateY(-40%); }
}
@keyframes rotateWordLast {
  0%     { opacity: 0; transform: translateY(80%);  }
  2%     { opacity: 1; transform: translateY(0);    }
  15%    { opacity: 1; transform: translateY(0);    }
  16.67% { opacity: 0; transform: translateY(-40%); }
  100%   { opacity: 0; transform: translateY(-40%); }
}
```

**The `composes` relationship is mandatory.** Each `.wordN` must carry *both* its own class and
the base `.word` class. If you are not using CSS Modules, apply both class names in the markup
(`class="word word1"`). Getting this wrong makes all six words render stacked and visible at
once — the single most likely implementation failure on this page.

**How it reads:** a 15-second loop. Each word rises from 80% below, snaps to place in 0.3s,
holds for ~2 seconds, then exits upward by 40% while fading. Words start 2.5s apart, so exactly
one word is visible at any moment. The line box is `overflow: hidden` at `1.15em`, so words are
clipped as they enter and leave.

### 9.4 Sub-headline

```
<p class="mx-auto max-w-xl px-2 pt-10 text-sm leading-[26px] text-black/70
          sm:max-w-3xl md:text-base md:leading-[30px]">
```

Text: `Launch and scale financial products on one platform for issuing, acquiring, credit, money movement, and real-time ledgering. Start where you want, expand as you grow.`

16px/26px on mobile → 18px/30px from `md`.

### 9.5 Buttons

```
<div class="mt-12 flex flex-col items-center justify-center space-y-5
            sm:flex-row sm:space-y-0 sm:space-x-2">
```

Stacked with 20px gaps on mobile; side by side with 8px gaps from `sm`.

Two buttons, both `group`:

| Button | Classes | Arrow |
|---|---|---|
| `Explore the Platform` | `button button-black-arrow group` | white arrow |
| `Talk to an Expert` | `button button-white-arrow group` | black arrow |

Each contains its label plus a hidden arrow that slides in on hover:

```
absolute right-4 inline-block translate-x-1 opacity-0 duration-200 ease-in-out
group-hover:translate-x-2 group-hover:opacity-100
```

So on hover the arrow fades 0→1 while sliding from `+4px` to `+8px` over 200ms.

### 9.6 The hero orb — exact specification

The signature visual: nine enormous concentric circles rising from below the fold, each tinted
cyan with a green wash from the upper right and a yellow wash from the lower left, drifting
slowly and forever.

**Container** (`.container`):
```css
pointer-events: none; width: 100%; height: 100%;
position: absolute; top: 0; left: 0; overflow: hidden;
```

**SVG** (`.svg`):
```css
width: 100%; min-width: 1440px; height: 100%;
position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
```
Attributes: `viewBox="0 0 1440 700"`, `fill="none"`, `preserveAspectRatio="xMidYMax slice"`.

`min-width: 1440px` plus `xMidYMax slice` means the orb never shrinks below its design size —
on narrow viewports it is cropped, not scaled down. This keeps the arc curvature constant.

**Mask.** Wrap all rings in a mask so nothing paints above the hero:

```
<mask id="orbMask" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse"
      x="0" y="-100" width="1440" height="800">
  <rect y="-100" width="1440" height="800" fill="#D9D9D9" />
</mask>
<g mask="url(#orbMask)"> …nine ring groups… </g>
```

**Ring groups.** Nine `<g>` elements, each containing **three identical circles** at
`cx="720" cy="700"` with the same radius. The first is a flat cyan base; the second and third
overlay the green and yellow gradients.

```
<g class="ring1" opacity="0.6">
  <circle cx="720" cy="700" r="1000" fill="#00FFF0" />
  <circle cx="720" cy="700" r="1000" fill="url(#g0)" />
  <circle cx="720" cy="700" r="1000" fill="url(#g1)" />
</g>
```

| Ring | Radius | Group opacity | Green gradient | Yellow gradient |
|---|---|---|---|---|
| 1 | 1000 | 0.6 | `g0` | `g1` |
| 2 | 900 | 0.6 | `g2` | `g3` |
| 3 | 800 | 0.6 | `g4` | `g5` |
| 4 | 700 | 0.7 | `g6` | `g7` |
| 5 | 600 | 0.8 | `g8` | `g9` |
| 6 | 480 | *(none — 1.0)* | `g10` | `g11` |
| 7 | 500 | 0.9 | `g12` | `g13` |
| 8 | 400 | *(none — 1.0)* | `g14` | `g15` |
| 9 | 300 | *(none — 1.0)* | `g16` | `g17` |

**Note the deliberate ordering anomaly:** ring 6 (r=480) is painted *before* ring 7 (r=500), so
the slightly larger ring 7 sits on top of ring 6. Reproduce this exactly — it produces a subtle
banding artefact that is part of the look.

**Gradient definitions.** All are `<linearGradient gradientUnits="userSpaceOnUse">`.

- **Even ids (`g0, g2, … g16`) are green:**
  `<stop stop-color="#55F5A3" stop-opacity="0" /><stop offset="1" stop-color="#55F5A3" />`
- **Odd ids (`g1, g3, … g17`) are yellow:**
  `<stop stop-color="#E1FF25" stop-opacity="0" /><stop offset="{OFF}" stop-color="#E1FF25" />`

| id | x1 | y1 | x2 | y2 | yellow offset |
|---|---|---|---|---|---|
| g0 | 1377.68 | 253.275 | 1528.71 | 87.727 | — |
| g1 | 539.502 | 558.921 | 169.55 | −260.423 | 0.929 |
| g2 | 1311.91 | 297.948 | 1447.84 | 148.954 | — |
| g3 | 557.552 | 573.029 | 224.595 | −164.381 | 0.929 |
| g4 | 1246.15 | 342.62 | 1366.97 | 210.182 | — |
| g5 | 575.602 | 587.137 | 279.64 | −68.339 | 0.929 |
| g6 | 1180.38 | 387.293 | 1286.1 | 271.409 | — |
| g7 | 593.652 | 601.245 | 334.685 | 27.704 | 0.929 |
| g8 | 1114.61 | 431.965 | 1205.23 | 332.636 | — |
| g9 | 611.701 | 615.353 | 389.73 | 123.746 | 0.929 |
| g10 | 1046.24 | 463.363 | 1096.25 | 397.492 | — |
| g11 | 633.28 | 631.984 | 465.171 | 274.078 | 1 |
| g12 | 1048.84 | 476.638 | 1124.35 | 393.864 | — |
| g13 | 629.751 | 629.461 | 444.775 | 219.788 | 0.929 |
| g14 | 927.987 | 498.316 | 1029.64 | 421.06 | — |
| g15 | 647.662 | 643.43 | 528.794 | 329.147 | 1 |
| g16 | 802.781 | 684.44 | 946.214 | 481.88 | — |
| g17 | 665.851 | 657.676 | 566.521 | 427.843 | 1 |

Green gradients run outward toward the upper right; yellow gradients run from lower right
toward the far upper left, well outside the canvas — which is why the yellow reads as a broad
wash rather than a visible band.

**Bottom fade.** A sibling of the SVG, inside the container:

```css
.fadeOut {
  pointer-events: none;
  background: linear-gradient(rgba(0,0,0,0), #f5f3eb);
  width: 100%; height: 240px;
  position: absolute; bottom: 0; left: 0;
}
```

This dissolves the orb into the page background over the last 240px.

**Ring animation.** Every ring runs two animations at once — a one-shot entrance and an
infinite drift:

```css
.ring {
  opacity: 0;
  animation: riseIn 2.6s cubic-bezier(0.16, 1, 0.3, 1) forwards,
             drift var(--dur, 20s) ease-in-out 2.6s infinite;
}
@keyframes riseIn {
  0%   { opacity: 0; transform: translateY(var(--y, 60px)); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes drift {
  0%   { translate: 0; }
  25%  { translate: var(--dx, 10px) var(--dy, -8px); }
  50%  { translate: calc(var(--dx, 10px) * -0.6) calc(var(--dy, -8px) * -0.8); }
  75%  { translate: calc(var(--dx, 10px) *  0.8) calc(var(--dy, -8px) *  0.5); }
  100% { translate: 0; }
}
```

Per-ring variables (`animation-delay` lists the entrance delay, then the drift delay):

| Ring | `--y` | `--dx` | `--dy` | `--dur` | `animation-delay` |
|---|---|---|---|---|---|
| 1 | 100px | 50px | −30px | 28s | `0s, 2.6s` |
| 2 | 90px | −40px | 40px | 24s | `0.1s, 2.7s` |
| 3 | 80px | 35px | 50px | 32s | `0.2s, 2.8s` |
| 4 | 68px | −55px | −25px | 22s | `0.3s, 2.9s` |
| 5 | 56px | 45px | −40px | 26s | `0.4s, 3s` |
| 6 | 44px | −35px | 35px | 30s | `0.5s, 3.1s` |
| 7 | 36px | 50px | 25px | 24s | `0.56s, 3.16s` |
| 8 | 26px | −25px | −50px | 28s | `0.66s, 3.26s` |
| 9 | 16px | 35px | 40px | 22s | `0.76s, 3.36s` |

**Responsive:** below 1024px the perpetual drift is dropped entirely — only the entrance runs:

```css
@media (max-width: 1023px) {
  .ring { animation: riseIn 2.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
}
```

**How it reads on load:** the rings rise in a staggered cascade from the bottom over ~2.6s with
a strong ease-out, the outermost first. From 2.6s onward each ring drifts independently on its
own 22–32s cycle, so the orb never repeats a configuration for minutes at a time.

---

## 10. Trust / logo wall

A short band directly beneath the hero.

```
<section class="bg-bone flex w-full flex-col pt-2 pb-10 antialiased">
```

**Caption:**
```
<p class="mx-auto mb-6 max-w-xs px-5 text-center text-xs opacity-60 md:max-w-lg md:text-sm">
  Trusted by the companies building what&apos;s next in payments
</p>
```
14px at 60% opacity on mobile → 16px from `md`.

**Grid:**
```
mx-auto grid w-full max-w-screen-xl grid-cols-3 gap-x-3 gap-y-5 px-5
sm:grid-cols-6 sm:gap-x-4 sm:gap-y-1
```

- **3 columns on mobile, 6 from `sm`** → 4 rows becomes 2 rows.
- Note the row gap *shrinks* from 20px to 4px at `sm` while the column gap grows 12px→16px.

Each cell: `<div class="flex items-center justify-center">` wrapping the wordmark from §5.2.

Section height: 172px. First wordmark row sits at y≈860 with a 64px cap height.

---
## 11. Products section

The tallest and most detailed block on the page: an intro, four illustrated product cards, a
hand-drawn-looking connector diagram, and a row of eight capability pills.

### 11.1 Shell

```
<section class="bg-bone px-5 pt-16 pb-0 antialiased">
  <div class="relative mx-auto max-w-screen-xl">
```

**Heading:** `<h2 class="font-display max-w-7xl text-2xl lg:text-6xl">`
Text: `Everything you need to launch fast, differentiate, and keep innovating`
(40px on mobile → 70px at `lg`.)

**Sub-copy:** `<p class="max-w-lg pt-6 text-[18px] opacity-60">` containing two lines separated
by a `<br />`:
```
Each product is powerful on its own.
Together, they unlock what legacy systems can&apos;t.
```

**Card grid:** `<div class="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">`
→ 1 column → 2 at `sm` → 4 at `lg`, 20px gaps throughout.

### 11.2 Product card — shared anatomy

All four cards are `<a>` elements with identical chrome:

```
group rounded-card flex aspect-[2/3] flex-col bg-white p-6 duration-300
hover:-translate-y-2 hover:shadow-[0_18px_0_-8px_rgba(226,224,214,0.5)]
```

- **Aspect ratio 2:3** (tall portrait), white fill, 20px radius, 24px padding.
- On hover: lifts **8px** and gains the hard ash shadow, over 300ms.

Contents in order:

1. **Title row** — `<div class="flex items-center justify-between">` with
   `<h3 class="text-sm">{title}</h3>` and the arrow icon carrying
   `-translate-x-2 opacity-0 duration-200 ease-in-out group-hover:translate-x-0 group-hover:opacity-100`
   (arrow slides in 8px from the left while fading in, 200ms).
2. **Description** — `<p class="pt-3 text-sm opacity-60">{description}</p>`
3. **Illustration container** — fills the remaining height and **bleeds to the card edges**:

```css
.container {
  border-radius: 0 0 20px 20px;
  flex: 1;
  display: flex;
  margin: 0 -24px -24px;      /* cancels the card's 24px padding on 3 sides */
  position: relative;
  overflow: hidden;
}
```
Alignment inside varies per card (given below).

| Card | Title | Description | href |
|---|---|---|---|
| 1 | Issuing | Launch and manage card programs with full control | `/products/issuing` |
| 2 | Acquiring | Accept and process payments with flexibility and at scale | `/products/acquiring` |
| 3 | Credit | Create branded credit programs with underwriting and rewards | `/products/credit` |
| 4 | Money Movement | Move funds across rails with speed and full visibility | `/solutions/money-movement` |

### 11.3 Shared illustration ingredient — the “ambient blob”

Three of the four cards contain a large, heavily blurred, gradient-filled organic shape that
drifts forever. It is what gives the white cards their colour.

- A `<path>` describing a soft irregular blob roughly 400×450 units, filled with a linear
  gradient whose stops are `#E1FF25` at 0.25, `#55F5A3` at 0.5, `#3FF7EC` at 0.644.
- Wrapped in `<g filter="url(#blur)">` where the filter is
  `<feGaussianBlur stdDeviation="50" />` over a generous filter region
  (`x="-175" y="-171" width="638" height="612"`, `filterUnits="userSpaceOnUse"`).
- The `<g>` carries the `blob` class and animates:

```css
.blob { transform-origin: {ORIGIN}; animation: {DUR} ease-in-out infinite alternate ambientDrift; }
```

**Per-card blob settings and keyframes** (all `alternate`, so they play forward then backward):

| Card | `transform-origin` | duration |
|---|---|---|
| Issuing | `120px 180px` | 12s |
| Acquiring | `140px 240px` | 14s |
| Credit | `175px 300px` | 14s |
| Money Movement | `140px 240px` | 16s |

```css
/* Issuing + Credit share this curve */
@keyframes ambientDrift {
  0%   { transform: translate(0)          scale(1)    rotate(0deg);   }
  16%  { transform: translate(55px,-40px) scale(1.3)  rotate(12deg);  }
  33%  { transform: translate(-30px,30px) scale(0.82) rotate(-9deg);  }
  50%  { transform: translate(40px,20px)  scale(1.22) rotate(6deg);   }
  66%  { transform: translate(-45px,-20px) scale(0.88) rotate(-11deg); }
  83%  { transform: translate(20px,45px)  scale(1.25) rotate(5deg);   }
  100% { transform: translate(-15px,-30px) scale(1.1) rotate(-4deg);  }
}
/* Acquiring + Money Movement share this curve */
@keyframes ambientDrift {
  0%   { transform: translate(0)           scale(1)    rotate(0deg);   }
  16%  { transform: translate(40px,-50px)  scale(1.25) rotate(10deg);  }
  33%  { transform: translate(-35px,25px)  scale(0.85) rotate(-8deg);  }
  50%  { transform: translate(30px,30px)   scale(1.2)  rotate(5deg);   }
  66%  { transform: translate(-40px,-15px) scale(0.9)  rotate(-10deg); }
  83%  { transform: translate(25px,40px)   scale(1.15) rotate(7deg);   }
  100% { transform: translate(-20px,-25px) scale(1.05) rotate(-3deg);  }
}
```

**Performance guard — applies to all four cards:**

```css
@media (max-width: 1023px) {
  .blob { animation: none; }
  .container g[filter]:not([class]) { filter: none; }
}
```
Below 1024px the blob freezes and all un-classed SVG filters are disabled. Large Gaussian
blurs are expensive on mobile GPUs; this is a required optimisation, not optional.

### 11.4 Card 1 — Issuing

**Concept:** a tall payment card in deep green, seen close-up and cropped, with soft concentric
light rings behind it.

Container alignment: `justify-content: flex-start; align-items: flex-end;`

SVG: `viewBox="0 0 215 350"`, and:
```css
.svg {
  filter: drop-shadow(12px 12px 24px rgba(0,0,0,0.1));
  width: 130%; height: 130%; padding-top: 2.5rem;
  position: absolute; bottom: -30%; left: -25%; display: block;
}
```
Oversized and pushed down-left so only the card’s upper-right corner region is visible.

Construction, in paint order:

1. **Mask** — a `350×215` rounded rect (`rx=14`) rotated 90° about `(215,0)`, i.e. a portrait
   card. Everything below is clipped to it.
2. **Base fill** — the same rect in white.
3. **The ambient blob** (§11.3).
4. **Concentric rings group** — six `<circle>`s at `cx≈9.5 cy=340.5` with radii
   **150, 200, 250, 300, 350, 400**, each `fill="#D9D9D9" fill-opacity="0.01"` and each wrapped
   in its own filter that produces a soft double shadow:
   - an outer drop shadow: offset `dx=5 dy=-5`, `stdDeviation=10`, alpha `0.02`
   - an inner shadow: offset `dy=10`, `stdDeviation=25`, white at alpha `0.15`

   The whole group carries
   `transition-transform duration-700 ease-in-out group-hover:translate-x-4 group-hover:-translate-y-4`
   — **on card hover the rings drift 16px right and 16px up over 700ms**, a slow parallax
   behind the static card. This is the only nested hover animation on the page.
5. **Contactless waves** — four nested white arcs of increasing radius near the top right.
6. **Chip** — the 36×47 `rx=6` chip from §5.6.11 with an inner shadow filter
   (`dy=1`, `stdDeviation=1.5`, white `0.5`) and a `0.5px` white stroke at 50% opacity.

Card face gradient (the mask fill): `#00724A → #005A3A` along `(214.8,1.2) → (565.4,212.2)`.

### 11.5 Card 2 — Acquiring

**Concept:** a floating checkout form, cropped at the right edge of the card, over a warm blob.

Container alignment: `justify-content: flex-end; align-items: center;`

Two layers:

**(a) Background** — `.bg { width:140%; height:150%; position:absolute; top:20%; left:-20%; }`
with a mask that fades the top third away:
```css
mask-image: linear-gradient(rgba(0,0,0,0) 0%, #000 30% 100%);
```
It holds `.bgSvg { width:100%; height:100% }` containing the ambient blob — here the gradient
skews warm (pink→amber→lime) by shifting the stops toward `#f0a8b4 / #ffd27a / #e1ff25`.

**(b) Checkout panel** — build with real markup, not an image:

```css
.checkoutWrap {
  position: absolute; top: 50%; right: -8%;
  width: 100%; border-radius: 11px; overflow: hidden;
  transform: translateY(-50%);
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
}
```

Panel interior — white, 14px padding, `--font-sans`:

| Row | Content |
|---|---|
| 1 | `$1000` at 26px/500 followed by ` / month` at 12px, `opacity: .5` |
| 2 | Label `Card Number` — 10px, `opacity: .6`, `margin-bottom: 4px` |
| 3 | A field: 1px `#e5e5e5` border, `rx=6`, 34px tall, text `1234 1234 1234 1234` at 12px `#9a9a9a`, and four 22×14 network chips right-aligned inside it |
| 4 | Two half-width columns: `Expiration` → field `MM/YY`; `CVC` → field `CVC` |
| 5 | A full-width `Pay` button: `#f5f3eb` fill, `rx=8`, 34px tall, centred 13px text |

**Network chips (no logos).** Draw four 22×14 `rx=3` rectangles with these fills and 7px
uppercase white/dark letterforms: `#1434CB` “VISA”, `#EB001B` with an overlapping `#F79E1B`
circle pair (Mastercard), `#006FCF` “AMEX”, `#FF6000` “DISC”.

**Card-entry animation** (this is what makes the tile feel alive):

```css
.digitGroup { opacity: 0; }
.digit1 { animation: revealDigit 0.4s ease-out 0.8s forwards; }
.digit2 { animation: revealDigit 0.4s ease-out 1.6s forwards; }
.digit3 { animation: revealDigit 0.4s ease-out 2.4s forwards; }
.digit4 { animation: revealDigit 0.4s ease-out 3.2s forwards; }
.expiryText { opacity: 0; animation: revealDigit 0.4s ease-out 4.0s forwards; }
.cvvText    { opacity: 0; animation: revealDigit 0.4s ease-out 4.5s forwards; }
.visaLogo   { animation: slideVisa 0.5s ease-in-out 1.2s forwards; }
.otherLogos { animation: fadeOutLogos 0.4s ease-out 1.2s forwards; }

@keyframes revealDigit  { from { opacity: 0 } to { opacity: 1 } }
@keyframes fadeOutLogos { from { opacity: 1 } to { opacity: 0 } }
@keyframes slideVisa    { from { transform: translate(0) } to { transform: translate(87px) } }
```

**How it reads:** the card number types itself in four groups of four, one group every 0.8s.
At 1.2s the three non-Visa network chips fade out and the Visa chip slides 87px to the right to
take the space they vacated — as though the form detected the card brand. Expiry appears at 4s,
CVC at 4.5s. It runs once on load and does not repeat.

Card-number text style: `.cardText { fill:#000; letter-spacing:1.5px; font-family: var(--font-display); font-size:14px; }`

### 11.6 Card 3 — Credit

**Concept:** an approval receipt floating above a warm orange credit card.

Container alignment: `justify-content: flex-start; align-items: flex-end;`
```css
.svg { width: 110%; height: 110%; position: absolute; top: 0; left: 1.5rem; overflow: visible; }
```

Stack:

1. The ambient blob (Issuing/Credit curve, origin `175px 300px`, 14s).
2. **Approval card** — white, `rx=12`, ~200×110, `box-shadow: 0 8px 24px rgba(0,0,0,0.08)`:
   - A 26px green circle (`#22C55E`) with a white check-mark polyline.
   - `You&apos;re Approved!` — 13px, weight 500, black.
   - `Credit` — 12px, `opacity: .5`, directly beneath.
   - A 1px `#ededed` divider, then a three-column stat row:

   | Label (10px, `opacity:.5`) | Value (15px, weight 500) |
   |---|---|
   | Credit Limit | `$10,000` |
   | APR | `20.99%` |
   | Rewards | `3x pts` |
3. **Credit card** — below and overlapping, a `rx=14` rounded rect filled with
   `linear-gradient(100deg, #F5A15A 0%, #E8C170 45%, #A8E063 100%)`, carrying the chip and
   contactless waves from §5.6.11 in white at 85% opacity.

### 11.7 Card 4 — Money Movement

**Concept:** an endlessly scrolling column of payment-rail chips.

Container alignment: `justify-content: flex-start; align-items: flex-end;`
Background layer identical in structure to Acquiring’s `.bg` / `.bgSvg` (blob, 16s, origin
`140px 240px`), but with the standard green gradient.

**The pill track:**

```css
.pillTrack {
  position: absolute; top: 0; left: 0; right: 0;
  display: flex; flex-direction: column; gap: 8px; padding-top: 8px;
  animation: scrollPills 45s linear infinite;
  will-change: transform; backface-visibility: hidden; transform: translateZ(0);
}
@keyframes scrollPills { 0% { transform: translateY(0) } 100% { transform: translateY(-50%) } }
```

**Render the eight pills twice, in the same order.** The track scrolls up by exactly 50% of its
own height over 45 seconds, so when the first copy has fully exited the second copy is in
precisely the position the first started from — a seamless loop. Omitting the duplicate breaks
it visibly.

Order (both copies): **Check · Wire · ACH · RTP / FedNow · OCT · Stablecoin · AFT · Payouts**

```css
.pill {
  display: flex; align-items: center; gap: 10px;
  margin: 0 20px; padding: 10px; flex-shrink: 0;
  background: #fff; border: 1px solid rgba(226,224,214,0.6); border-radius: 12px;
  backdrop-filter: blur(6px);
}
.pillIcon  { width: 36px; height: 36px; border-radius: 8px; background: #f5f3eb;
             display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.pillLabel { color: #000; font-size: 13px; font-weight: 500; white-space: nowrap; }
```

Each pill: icon chip (glyphs in §5.6.2) + label.

**Top fade** — a sibling that hides pills as they enter:
```css
.fadeTop { position: absolute; top: 0; left: 0; right: 0; height: 40%; z-index: 2;
           pointer-events: none; background: linear-gradient(#fff 10%, rgba(0,0,0,0)); }
```

Mobile guard adds `.pillTrack { will-change: auto; backface-visibility: visible; }` and
`.pill { backdrop-filter: none; }` below 1024px.

### 11.8 The connector diagram

Below the four cards, hairlines fan out from each card, merge onto a horizontal rail, and drop
into the eight capability pills — with light pulses travelling along the paths.

**Placement:**
```
<div class="py-1 sm:hidden">     …mobile connector…  </div>
<div class="hidden py-1 lg:block"> …desktop connector… </div>
```
Note the gap: **between 640px and 1024px neither connector renders.** That is intentional.

#### Desktop connector

```css
.container { width: 100%; position: relative; }
.container::before { content:""; position:absolute; top:0; left:0; right:0; height:30px;
                     z-index:1; pointer-events:none;
                     background: linear-gradient(#f5f3eb, rgba(0,0,0,0)); }
.container::after  { content:""; position:absolute; bottom:0; left:0; right:0; height:30px;
                     z-index:1; pointer-events:none;
                     background: linear-gradient(rgba(0,0,0,0), #f5f3eb); }
.svg { width: 100%; height: auto; display: block; }
```

SVG: `viewBox="0 0 1280 80"`, `preserveAspectRatio="xMidYMid meet"`, `fill="none"`.

**Four drop lines** from the card centres, each curving onto the rail:

```
prod1  M153,0 L153,28 Q153,40 165,40
prod2  M478,0 L478,28 Q478,40 490,40
prod3  M803,0 L803,28 Q803,40 791,40
prod4  M1128,0 L1128,28 Q1128,40 1116,40
```

**The rail:** `M87,40 L1193,40`

**Eight cap lines** dropping to the pills:

```
cap1 M87,40   Q75,40   75,52   L75,80
cap2 M248,40  Q236,40  236,52  L236,80
cap3 M410,40  Q398,40  398,52  L398,80
cap4 M571,40  Q559,40  559,52  L559,80
cap5 M709,40  Q721,40  721,52  L721,80
cap6 M870,40  Q882,40  882,52  L882,80
cap7 M1032,40 Q1044,40 1044,52 L1044,80
cap8 M1193,40 Q1205,40 1205,52 L1205,80
```

**Stroke + draw-on animation:**

```css
.prodLine, .capLine {
  fill: none; stroke: #e2e0d6; stroke-width: 1.5px; stroke-linecap: round;
  stroke-dasharray: 60; stroke-dashoffset: 60px;
  animation: drawLine 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.rail {
  fill: none; stroke: #e2e0d6; stroke-width: 1.5px; stroke-linecap: round;
  stroke-dasharray: 1106; stroke-dashoffset: 1106px;
  animation: drawLine 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
}
@keyframes drawLine { to { stroke-dashoffset: 0 } }
```

Delays — drop lines `0s, 80ms, 0.16s, 0.24s`; rail `0.2s`; caps
`0.7s, 0.75s, 0.8s, 0.85s, 0.9s, 0.95s, 1.0s, 1.05s`.

The whole diagram therefore draws itself over ~1.9s on load: the four stems drop, the rail
sweeps across, then the eight caps drop in a quick ripple.

**Twelve flow pulses.** Each is a *second* copy of a full route — card → rail → pill — painted
in a lighter stroke as a short travelling dash:

```css
.flowBase {
  fill: none; stroke: #c8c5bc; stroke-width: 2px; stroke-linecap: round;
  stroke-dasharray: 5 95;
  animation: flowPath 3.5s linear infinite;
}
@keyframes flowPath { 0% { stroke-dashoffset: 100px } 100% { stroke-dashoffset: 0 } }
```

Every flow path carries `pathLength={100}`, which normalises the dash maths across routes of
different real lengths — so all twelve pulses move at the same apparent speed.

Delays: `0s, 0.8s, 1.6s, 2.4s, 3.2s, 4.0s, 4.8s, 5.6s, 6.4s, 7.2s, 8.0s, 8.8s`.

Routes (each is a card stem, a run along the rail, and a cap):

```
flow1  M153,0  L153,28  Q153,40  165,40  L709,40  Q721,40  721,52  L721,80
flow2  M478,0  L478,28  Q478,40  466,40  L87,40   Q75,40   75,52   L75,80
flow3  M803,0  L803,28  Q803,40  815,40  L1193,40 Q1205,40 1205,52 L1205,80
flow4  M1128,0 L1128,28 Q1128,40 1116,40 L410,40  Q398,40  398,52  L398,80
flow5  M153,0  L153,28  Q153,40  165,40  L1032,40 Q1044,40 1044,52 L1044,80
flow6  M478,0  L478,28  Q478,40  490,40  L870,40  Q882,40  882,52  L882,80
flow7  M803,0  L803,28  Q803,40  791,40  L248,40  Q236,40  236,52  L236,80
flow8  M1128,0 L1128,28 Q1128,40 1116,40 L571,40  Q559,40  559,52  L559,80
flow9  M153,0  L153,28  Q153,40  165,40  L386,40  Q398,40  398,52  L398,80
flow10 M478,0  L478,28  Q478,40  490,40  L1193,40 Q1205,40 1205,52 L1205,80
flow11 M803,0  L803,28  Q803,40  791,40  L733,40  Q721,40  721,52  L721,80
flow12 M1128,0 L1128,28 Q1128,40 1116,40 L1056,40 Q1044,40 1044,52 L1044,80
```

The routes deliberately cross — each product feeds several capabilities and each capability is
fed by several products. That crossing is the whole point of the graphic.

#### Mobile connector

Two vertical hairlines, one per column of the 2-up pill grid.

```
<div class="{wrap}"><div class="{grid}">
  <ConnectorLine strokeClass={strokeCol1} flowClass={flowCol1} />
  <ConnectorLine strokeClass={strokeCol2} flowClass={flowCol2} />
</div></div>
```

Each `ConnectorLine` is:
```
<div class="{lineCol}">
  <svg class="{lineSvg}" viewBox="0 0 2 72" preserveAspectRatio="none" fill="none" aria-hidden>
    <path class={strokeClass} d="M1,0 L1,72" />
    <path class={flowClass}   d="M1,0 L1,72" pathLength={100} />
  </svg>
</div>
```

```css
.wrap { width: 100%; position: relative; }
.wrap::before { content:""; position:absolute; top:0;    left:0; right:0; height:16px; z-index:1;
                pointer-events:none; background: linear-gradient(#f5f3eb, rgba(0,0,0,0)); }
.wrap::after  { content:""; position:absolute; bottom:0; left:0; right:0; height:12px; z-index:1;
                pointer-events:none; background: linear-gradient(rgba(0,0,0,0), #f5f3eb); }
.grid    { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 0.75rem; }
.lineCol { display: flex; justify-content: center; }
.lineSvg { width: 2px; height: 3.25rem; display: block; flex-shrink: 0; }

.strokeCol1, .strokeCol2 {
  fill: none; stroke: #e2e0d6; stroke-width: 1.5px; stroke-linecap: round;
  stroke-dasharray: 72; stroke-dashoffset: 72px;
  animation: drawLine 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.strokeCol1 { animation-delay: 0s;    }
.strokeCol2 { animation-delay: 80ms;  }

.flowCol1, .flowCol2 {
  fill: none; stroke: #c8c5bc; stroke-width: 2px; stroke-linecap: round;
  stroke-dasharray: 5 95;
  animation: flowPath 3.2s linear infinite;
}
.flowCol1 { animation-delay: 0s;   }
.flowCol2 { animation-delay: 1.1s; }

@keyframes drawLine { to { stroke-dashoffset: 0 } }
@keyframes flowPath { 0% { stroke-dashoffset: 100px } 100% { stroke-dashoffset: 0 } }
```

### 11.9 Capability pills

```
<div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:mt-0 lg:grid-cols-8">
```
2 columns → 4 at `sm` → 8 at `lg`. The top margin collapses to 0 at `lg` because the connector
above already provides the spacing.

Each pill:
```
<div class="rounded-card bg-ash flex aspect-[3/2] flex-col items-center justify-center p-4">
  <span class="text-center text-xs text-black">{label}</span>
</div>
```

Eight labels, in order:
**Unified Ledger · Stablecoin · Instant Payments · Virtual Card Express · Capital Connect ·
Datashare · Spend Controls · Fraud Tools**

Note these are flat `#e2e0d6` tiles with **no** hover state and **no** link — they are labels,
not controls.

---

## 12. Unified-platform statement

A centred manifesto block anchored by an animated icon.

```
<section class="bg-bone px-5 pb-10 antialiased md:pb-16">
  <div class="hidden lg:block">  …unified connector (desktop)… </div>
  <div class="lg:hidden">        …unified connector (mobile)…  </div>
  <div class="relative mx-auto max-w-screen-xl text-center">
```

### 12.1 The connector into the icon

Eight hairlines sweep down from the pill row above and converge on a single point — the icon.

**Desktop:** `viewBox="0 0 1280 240"`, `preserveAspectRatio="xMidYMid meet"`.

```css
.container { width: 100%; max-width: 1280px; margin: 0 auto; position: relative; }
.container::before { content:""; position:absolute; top:0; left:0; right:0; height:60px; z-index:1;
                     pointer-events:none; background: linear-gradient(#f5f3eb, rgba(0,0,0,0)); }
.container::after  { content:""; position:absolute; bottom:0; left:0; right:0; height:20px; z-index:1;
                     pointer-events:none; background: linear-gradient(rgba(0,0,0,0), #f5f3eb); }
.svg { width: 100%; height: auto; display: block; }
```

Eight cubic curves, all ending at `640,240` (dead centre, bottom):

```
line1 / flow1  M75,0    C75,140   640,120 640,240
line2 / flow2  M236,0   C236,120  640,100 640,240
line3 / flow3  M398,0   C398,100  640,80  640,240
line4 / flow4  M559,0   C559,80   640,60  640,240
line5 / flow5  M721,0   C721,80   640,60  640,240
line6 / flow6  M882,0   C882,100  640,80  640,240
line7 / flow7  M1044,0  C1044,120 640,100 640,240
line8 / flow8  M1205,0  C1205,140 640,120 640,240
```

Each route is drawn twice — a static hairline and a travelling pulse. All carry
`pathLength={600}`.

```css
.line { fill:none; stroke:#e2e0d6; stroke-width:1.5px;
        stroke-dasharray:600; stroke-dashoffset:600px;
        animation: drawLine 1.5s cubic-bezier(0.22,1,0.36,1) forwards; }
.line1…8 { animation-delay: 0s, 80ms, 0.16s, 0.24s, 0.32s, 0.4s, 0.48s, 0.56s; }

.flow { fill:none; stroke:#c8c5bc; stroke-width:2px; stroke-linecap:round;
        stroke-dasharray:30 570;
        animation: flowCurve 2.4s linear infinite; }
.flow1…8 { animation-delay: 0s, 0.3s, 0.6s, 0.9s, 1.2s, 1.5s, 1.8s, 2.1s; }

@keyframes drawLine  { to { stroke-dashoffset: 0 } }
@keyframes flowCurve { 0% { stroke-dashoffset: 600px } 100% { stroke-dashoffset: 0 } }
```

Also define an arrowhead marker (declared and available, subtle in use):
```
<marker id="arrowhead" markerWidth="18" markerHeight="14" refX="9" refY="7" orient="auto">
  <path d="M0,0 L9,7 L0,14" fill="none" stroke="#e2e0d6" stroke-width="1.5" />
</marker>
```

**Mobile:** `viewBox="0 0 320 120"`, `aria-hidden`, two curves converging at `160,108`:
```
lineLeft  / flowLeft   M48,0  C48,58  112,72 160,108
lineRight / flowRight  M272,0 C272,58 208,72 160,108
```
with `pathLength={320}` on the flows and the same stroke/animation treatment.

### 12.2 The platform icon

A 100×100 green disc with blurred colour blobs orbiting inside it — the visual thesis of the
section (many things, one surface).

```css
.container { width: 100px; height: 100px; margin-bottom: 24px;
             display: inline-block; position: relative; }
.circle    { width: 100%; height: 100%; }
```

SVG `viewBox="0 0 40 40"`. Defs:

```
<clipPath id="circleClip">
  <circle cx="20" cy="20" r="19.799" transform="rotate(45 20 20)" />
</clipPath>
<filter id="blobBlur"><feGaussianBlur stdDeviation="6" /></filter>
<linearGradient id="mobileGradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
  <stop offset="0%"   stop-color="#3FF7EC" />
  <stop offset="50%"  stop-color="#55F5A3" />
  <stop offset="100%" stop-color="#E1FF25" />
</linearGradient>
```

Body:
1. `<circle class="bg" cx="20" cy="20" r="19.799" transform="rotate(45 20 20)" />` — the disc.
2. `<g clip-path="url(#circleClip)" filter="url(#blobBlur)">` containing five circles:

| Class | cx | cy | r | fill | opacity | blend |
|---|---|---|---|---|---|---|
| `blob1` | 14 | 12 | 12 | `#3FF7EC` | .55 | multiply |
| `blob2` | 28 | 24 | 14 | `#E1FF25` | .50 | multiply |
| `blob3` | 10 | 28 | 10 | `#55F5A3` | .50 | multiply |
| `blob4` | 26 | 10 | 9 | `#3FF7EC` | .45 | multiply |
| `blob5` | 20 | 20 | 16 | `rgba(255,255,255,0.1)` | .30 | soft-light |

3. On top, the three-node brand glyph from §5.1 in black, scaled to the disc.

**Animation** — every blob runs *two* independent loops (an orbit and a pulse), all with
`transform-origin: 20px 20px`:

| Blob | orbit | pulse |
|---|---|---|
| 1 | `orbit1 7s ease-in-out infinite` | `pulse1 4s ease-in-out infinite alternate` |
| 2 | `orbit2 9s ease-in-out infinite` | `pulse2 5s ease-in-out infinite alternate` |
| 3 | `orbit3 11s ease-in-out infinite` | `pulse3 6s ease-in-out infinite alternate` |
| 4 | `orbit4 8s ease-in-out infinite` | `pulse4 3.5s ease-in-out infinite alternate` |
| 5 | `orbit5 13s ease-in-out infinite` | `pulse5 7s ease-in-out infinite alternate` |

The disc itself: `.bg { animation: bgPulse 12s ease-in-out infinite; }` — a slow brightness/
scale breath.

```css
@keyframes orbit1 {
  0%   { transform: translate(0)        rotate(0deg)    scale(1);    }
  25%  { transform: translate(6px,-4px) rotate(90deg)   scale(1.2);  }
  50%  { transform: translate(-2px,-7px) rotate(180deg) scale(0.9);  }
  75%  { transform: translate(-6px,3px) rotate(270deg)  scale(1.15); }
  100% { transform: translate(0)        rotate(360deg)  scale(1);    }
}
@keyframes orbit2 {
  0%   { transform: translate(0)        rotate(0deg)     scale(1.1);  }
  25%  { transform: translate(-5px,5px) rotate(-90deg)   scale(0.85); }
  50%  { transform: translate(4px,6px)  rotate(-180deg)  scale(1.25); }
  75%  { transform: translate(6px,-4px) rotate(-270deg)  scale(0.95); }
  100% { transform: translate(0)        rotate(-360deg)  scale(1.1);  }
}
@keyframes orbit5 {
  0%   { transform: translate(0)         rotate(0deg)    scale(1.2);  }
  25%  { transform: translate(4px,6px)   rotate(-60deg)  scale(0.85); }
  50%  { transform: translate(-6px,2px)  rotate(-120deg) scale(1.3);  }
  75%  { transform: translate(3px,-5px)  rotate(-180deg) scale(1);    }
  100% { transform: translate(0)         rotate(-240deg) scale(1.2);  }
}
```
`orbit3` and `orbit4` follow the same shape with different signs and magnitudes — author them
as variations (e.g. `orbit3` rotating +120°/+240°/+360° with 1.2 / 1.05 / 0.9 scales, `orbit4`
mirroring `orbit2` at smaller amplitude). `pulse1…pulse5` are simple two-stop scale/opacity
breaths, e.g. `from { transform: scale(1); opacity: .5 } to { transform: scale(1.15); opacity: .65 }`.

**Mobile fallback** (below 1024px) — the entire orbit system is replaced by a flat gradient:

```css
@media (max-width: 1023px) {
  .bg { fill: url(#mobileGradient); animation: none; }
  .blob1, .blob2, .blob3, .blob4, .blob5 { display: none; }
  .container #blobBlur { display: none; }
}
```

### 12.3 Copy and feature trio

**Heading:** `<h2 class="font-display mx-auto pb-5 text-2xl lg:text-6xl">Built on a Unified Platform</h2>`

**Sub-copy:** `<p class="mx-auto max-w-lg text-sm opacity-60 md:text-base">Most platforms were assembled. Ledgra was built as one.</p>`

**Trio:** `<div class="mx-auto mt-12 grid max-w-xs grid-cols-1 gap-8 sm:grid-cols-3 md:max-w-3xl">`
— 1 column (capped at 320px) → 3 columns at `sm`, container widening to 768px at `md`.

Each item: `<div class="flex flex-col items-center">` containing
`<div class="mb-4 flex h-8 w-8 items-center justify-center">{icon}</div>`,
`<h3 class="text-xs font-medium">{title}</h3>`,
`<p class="mt-2 max-w-xs text-xs leading-relaxed opacity-60">{body}</p>`

| Icon (§5.6.7–9) | Title | Body |
|---|---|---|
| Stopwatch | Launch Faster | Go live without coordinating multiple providers or waiting on fragmented systems. |
| Two people | Differentiate Easily | Design experiences around your customers, not platform constraints. |
| Sparkle | Keep Innovating | Add new capabilities and expand into new products without rebuilding your foundation. |

The sparkle icon spins continuously: `animation: spin 12s linear infinite` with
`@keyframes spin { to { transform: rotate(360deg) } }`.

---
## 13. Industry grid

Eight solution cards, each a title, a one-line description, and a square tile.

```
<section class="bg-bone px-5 pt-10 pb-10 antialiased md:pb-20">
  <div class="border-ash relative mx-auto max-w-screen-xl border-t pt-16 sm:pt-24">
    <h2 class="font-display max-w-3xl text-2xl lg:text-6xl">Built for your industry</h2>
    <div class="items-end justify-between space-y-5 pt-6 md:flex md:space-y-0">
      <p class="max-w-lg text-[18px] opacity-60">
        Explore solutions designed for how your business operates.
      </p>
    </div>
    <div class="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
```

**Card** — an `<a>`:
```
group rounded-card bg-white p-5 duration-300 hover:-translate-y-2
```
Note: industry cards lift on hover but do **not** take the ash shadow the product cards get.

Card body:
```
<div class="mb-5 flex flex-col justify-start text-black">
  <div class="flex items-start justify-between">
    <h3 class="text-sm">{title}</h3>
    <ArrowIcon class="ml-2 shrink-0 -translate-x-2 opacity-0 duration-200 ease-in-out
                      group-hover:translate-x-0 group-hover:opacity-100" />
  </div>
  <p class="mt-2.5 text-sm opacity-60">{description}</p>
</div>
<div class="relative aspect-square {cardTile}">
  …gradient tile from §5.3…
</div>
```

**Tile styles + the image zoom:**
```css
.cardTile { border-radius: 0.75rem; position: relative; overflow: hidden; }
.cardTile > * { transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); transform: scale(1); }

@media (hover: hover) and (pointer: fine) {
  .group:hover .cardTile > * { transform: scale(1.08); }
}
```

So on hover the card lifts 8px **and** the tile content scales to 108% inside its clipped
corner — a slow 400ms push-in. The `(hover: hover) and (pointer: fine)` guard means touch
devices never get a stuck zoom.

**The eight cards** (order matters — it is the grid reading order):

| # | Title | Description | href |
|---|---|---|---|
| 1 | AP & Bill Pay | Increase virtual card adoption, unlock revenue, and streamline supplier payments. | `/solutions/ap-automation` |
| 2 | Spend Management | Deliver modern spend controls, real-time visibility, and scalable program design. | `/solutions/spend-management` |
| 3 | Fleet | Power fleet payments with granular controls, real-time data, and operational flexibility. | `/solutions/fleet` |
| 4 | Travel and OTAs | Better economics, acceptance, and reconciliation for travel payouts. | `/solutions/travel` |
| 5 | Platforms and Marketplaces | Embed financial products that drive engagement, retention, and new revenue streams. | `/solutions/embedded-finance` |
| 6 | Embedded Finance | Launch and scale financial experiences without legacy infrastructure constraints. | `/solutions/embedded-finance` |
| 7 | Branded Credit | Build branded credit programs that deepen loyalty and unlock new revenue. | `/solutions/branded-credit` |
| 8 | Vertical SaaS | Embed and monetize payments inside your platform for seamless financial workflows. | `/solutions/saas` |

---

## 14. Customers

Two large media tiles above four square quote cards.

```
<section class="bg-bone px-5 pt-16 pb-10 antialiased sm:pt-10 md:pb-20">
  <div class="border-ash relative mx-auto max-w-screen-xl border-t pt-16 sm:pt-24">
    <h2 class="font-display max-w-3xl text-2xl lg:text-6xl">
      Built with the companies leading what&apos;s next
    </h2>
    <div class="items-end justify-between space-y-5 pt-6 md:flex md:space-y-0">
      <p class="max-w-lg text-[18px] opacity-60">Real products. Real scale. Real outcomes.</p>
      <a href="/customers" class="group flex shrink-0 items-center gap-2 text-[18px] opacity-60
                                  duration-200 hover:opacity-100">
        View Customer Stories
        <ArrowIcon class="inline-block duration-200 ease-in-out group-hover:translate-x-1" />
      </a>
    </div>
    <div class="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-4">
```

This “heading, then sub-copy left / link right” pattern with `md:flex` is reused verbatim in
§15 and §16. The trailing link’s arrow nudges right 4px on hover.

### 14.1 Media tiles (2)

Each occupies **half the row on desktop** (`lg:col-span-2`), full width below:

```
<div class="rounded-card relative col-span-1 overflow-hidden border border-black/10
            bg-white lg:col-span-2">
  <span class="{partner wordmark} absolute top-6 left-6 z-10 h-6 w-auto md:top-8 md:left-8 md:h-8" />
  <MediaTile className="aspect-video w-full" … />
</div>
```

Partners: **Shiftwell** (tile 1) and **Coinlake** (tile 2), rendered as white wordmarks per §5.4.

**Tile behaviour** (the only other client-side component):

- The panel is muted, loops, and has `preload="none"`.
- **On pointer enter** the ambient sheen accelerates and the panel begins its subtle motion;
  on pointer leave it settles. (If you implement with a real `<video>` element instead of the
  CSS panel, this maps to `play()` / `pause()`.)
- A **play control** sits bottom-left inside a full-bleed `<button>`:
  ```
  <button class="absolute inset-0 flex cursor-pointer items-end justify-start p-6 md:p-8"
          aria-label="Play full video">
    <div class="{playSurface} flex h-10 w-10 items-center justify-center rounded-full
                transition-transform duration-200 group-hover/video:scale-110">
      …play triangle…
    </div>
  </button>
  ```
  `.playSurface { background: rgba(255,255,255,0.18); backdrop-filter: blur(6px); }`
  The group name is `group/video` on the tile wrapper, so the control scales to 110% when the
  **tile** is hovered, not just the button.
- **On click**, open a modal:
  ```
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/80" role="button" tabindex="0" aria-label="Close video" />
    <div class="relative z-10 flex w-full max-w-[90vw] flex-col px-5">
      <button class="mb-3 self-end text-sm text-white opacity-70 hover:opacity-100">Close</button>
      <div class="rounded-card w-full">…enlarged panel…</div>
    </div>
  </div>
  ```
  Clicking the scrim or the Close button, or pressing `Escape`, dismisses it.

### 14.2 Quote cards (4)

```
<div class="rounded-card col-span-1 flex aspect-[3/2] flex-col justify-between bg-white
            p-6 md:aspect-square md:p-8">
  <p class="text-base">{quote}</p>
  <span class="{wordmark} h-10 w-auto self-start" />
</div>
```

`justify-between` pins the quote to the top and the wordmark to the bottom. The card is 3:2 on
mobile and becomes a **square** at `md`.

| # | Quote (include the straight double quotes as written) | Wordmark |
|---|---|---|
| 1 | `"Ledgra helped us work on some of our unique business solutions."` | NORTHGATE, `#0b4f9e` |
| 2 | `"Ledgra is a partner that accelerates our growth."` | NOVEXA, `#0a0a0a` with a `#3ab0a0` underscore accent |
| 3 | `"Ledgra's platform offers the flexibility, scalability, and security we needed."` | Paceline, `#17a89a` |
| 4 | `"With Ledgra, we are able to reliably expand our payment offerings."` | ARDENT, `#0d1b3e` with a `#4aa3df` leading triangle |

Escape the quotes in JSX (`&quot;`) to satisfy lint.

---

## 15. Developer platform

A two-column block: copy and feature grid on the left, a live-looking API console on the right.

```
<section class="bg-bone px-5 pt-10 pb-10 antialiased md:pb-20">
  <div class="border-ash relative mx-auto max-w-screen-xl border-t pt-16 sm:pt-28">
    <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
```

### 15.1 Left column

`<div class="flex flex-col justify-between">` containing:

- `<h2 class="font-display max-w-xl text-2xl lg:text-5xl">A developer platform built for the future</h2>`
  — note this heading is `text-5xl` (**62px**) at `lg`, smaller than the other section headings.
- `<p class="mt-6 max-w-lg text-[18px] leading-relaxed opacity-60">Build and ship financial products without the infrastructure overhead. Focus on your product experience while Ledgra handles the rest.</p>`
- A docs link:
  ```
  <a href="https://docs.example-ledgra.dev" target="_blank" rel="noopener noreferrer"
     class="group mt-5 inline-flex items-center gap-2 text-base opacity-60 duration-200 hover:opacity-100">
    View the docs
    <ArrowIcon class="inline-block duration-200 ease-in-out group-hover:translate-x-1" />
  </a>
  ```
- Feature grid: `<div class="mt-12 grid max-w-lg grid-cols-2 gap-5 md:gap-10">` — **always two
  columns**, at every width.

Each feature:
```
<div class="max-w-sm">
  <div class="bg-ash mb-3 flex h-10 w-10 items-center justify-center rounded-lg md:h-12 md:w-12">
    <Icon class="h-5 w-5 md:h-6 md:w-6" />
  </div>
  <h3 class="text-xs font-medium">{title}</h3>
  <p class="mt-2 text-xs leading-relaxed opacity-60">{body}</p>
</div>
```

| Icon (§5.6.3–6) | Title | Body |
|---|---|---|
| Hexagon | Graph API | Unified GraphQL for cards, ledgers, payments, and more. |
| Fast-forward | Real-Time Webhooks | Real-time events for transactions, authorizations, and state changes. |
| Stacked cards | Robust Sandbox Environment | Production-mirroring sandbox for safer builds and faster iteration. |
| Padlock | Enterprise-Ready Security | Built-in security and compliance that scales with your programs. |

### 15.2 The API console

```
<div class="rounded-card hidden min-h-[760px] overflow-hidden bg-[#111] lg:flex">
```

**Hidden entirely below 1024px** — the section is single-column on smaller screens.

```css
.container { display: flex; flex-direction: column; gap: 20px;
             width: 100%; height: 100%; padding: 24px;
             font-family: var(--font-mono); font-size: 12px; line-height: 1.7; }
.block  { flex: 1; min-height: 0; padding: 20px; overflow: hidden;
          background: rgba(255,255,255,0.05); border-radius: 12px; }
.label  { margin-bottom: 12px; color: rgba(255,255,255,0.30);
          font-family: var(--font-display); font-size: 12px; font-weight: 500;
          letter-spacing: 0.02em; }
.line   { white-space: pre; transition: opacity 0.2s ease-out; }

.keyword { color: #c084fc; }   /* purple  */
.type    { color: #7dd3fc; }   /* sky     */
.field   { color: rgba(255,255,255,0.70); }
.string  { color: #86efac; }   /* green   */
.brace, .punct { color: rgba(255,255,255,0.25); }

.cursor { display: inline-block; width: 1px; height: 14px; margin-left: 2px;
          vertical-align: text-bottom; background: rgba(255,255,255,0.5);
          animation: blink 0.8s step-end infinite; }
@keyframes blink { 50% { opacity: 0 } }
```

Two stacked blocks labelled **Query** and **Response**.

**This is the one component whose animation cannot be pure CSS.** It needs state.

**Typewriter behaviour — exact timings:**

1. Reset: both blocks hidden.
2. After 120ms, reveal query line 1; then one further query line **every 120ms**.
3. When the last query line lands, mark the query complete (this hides the cursor).
4. Wait **600ms**.
5. Reveal response line 1, then one further response line **every 50ms**.
6. When the last response line lands, wait **5000ms**, then return to step 1 and loop forever.

Reveal is done by setting each line’s inline `opacity` to `0` or `1`; the `.line` class’s
`transition: opacity 0.2s ease-out` does the fading. A cursor element renders on the
**last currently-revealed query line only**, and only while the query is still typing.

**Query content** (13 lines; leading spaces are significant — `white-space: pre`):

| # | Tokens (`text` → class) |
|---|---|
| 1 | `mutation`→keyword, ` {`→brace |
| 2 | `  createPaymentCard`→field, `(`→punct |
| 3 | `    input`→field, `: {`→brace |
| 4 | `      cardProductId`→field, `: `→punct, `"cprod_1a2b3c"`→string |
| 5 | `      financialAccountId`→field, `: `→punct, `"fa_9x8y7z"`→string |
| 6 | `    }`→brace |
| 7 | `  )`→punct, ` {`→brace |
| 8 | `    id`→field |
| 9 | `    last4`→field |
| 10 | `    status`→field |
| 11 | `    network`→field |
| 12 | `  }`→brace |
| 13 | `}`→brace |

**Response content** (10 lines):

| # | Tokens |
|---|---|
| 1 | `{`→brace |
| 2 | `  "data"`→field, `: {`→brace |
| 3 | `    "createPaymentCard"`→field, `: {`→brace |
| 4 | `      "id"`→field, `: `→punct, `"card_4f8a2e1b"`→string |
| 5 | `      "last4"`→field, `: `→punct, `"4289"`→string |
| 6 | `      "status"`→field, `: `→punct, `"ACTIVE"`→string |
| 7 | `      "network"`→field, `: `→punct, `"VISA"`→string |
| 8 | `    }`→brace |
| 9 | `  }`→brace |
| 10 | `}`→brace |

Clear the timeout on unmount.

---

## 16. Insights

Three article cards.

```
<section class="bg-bone px-5 pt-16 pb-20 antialiased sm:pt-10">
  <div class="border-ash relative mx-auto max-w-screen-xl border-t pt-16 sm:pt-24">
    <h2 class="font-display max-w-3xl text-2xl lg:text-6xl">Insights for builders</h2>
    <div class="flex flex-col gap-4 pt-6 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <p class="max-w-xl text-[18px] opacity-60">
        Learn how modern companies are designing, launching, and scaling financial products.
      </p>
      <a href="/blog" class="group flex shrink-0 items-center gap-2 text-[18px] opacity-60
                             duration-200 hover:opacity-100 sm:ml-4">
        Explore Resources
        <ArrowIcon class="duration-200 ease-in-out group-hover:translate-x-1" />
      </a>
    </div>
    <div class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
```

**Card:**
```
<a href={href} class="group">
  <div class="rounded-card relative aspect-[3/2] w-full overflow-hidden duration-300
              group-hover:-translate-y-2">
    …lockup panel from §5.5…
  </div>
  <p class="mt-4 max-w-xs text-base text-black">{title}</p>
</a>
```

Only the thumbnail lifts on hover; the title stays put.

| # | Title | href |
|---|---|---|
| 1 | When Enterprise Meets Fintech: Ledgra and Northgate on Payments as a Competitive Advantage | `/blog/enterprise-meets-fintech` |
| 2 | Ledgra Powers a New Era of Commercial Card Issuing for Online Travel | `/blog/commercial-card-issuing-travel` |
| 3 | Ledgra vs. Paceline vs. Vantara: Unified Platform or Payout API | `/blog/unified-platform-or-payout-api` |

---

## 17. Closing CTA

```
<section class="bg-bone relative overflow-hidden px-5 pt-10 pb-40 antialiased sm:pt-10">
  <div class="absolute -right-20 -bottom-20 -left-20 z-0"> …glow… </div>
  <div class="border-ash relative mx-auto max-w-screen-xl border-t pt-16 text-center sm:pt-28">
    <h2 class="font-display mx-auto max-w-3xl text-4xl lg:text-7xl">Build what&apos;s next</h2>
    <p class="mx-auto mt-6 max-w-lg text-[18px] leading-relaxed text-black/60">
      Ledgra gives you the foundation to launch faster, differentiate, and keep moving.
    </p>
    <div class="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
      …two buttons, identical to the hero pair (§9.5)…
    </div>
  </div>
</section>
```

Heading is **50px** on mobile → **100px** at `lg`. Note `pb-40` (160px) — the section leaves a
deep well below the buttons for the glow to occupy.

### 17.1 The gradient glow

A soft aurora bleeding off all three sides (`-left-20 -right-20 -bottom-20`), echoing the hero.

```
<div aria-hidden="true" class="pointer-events-none relative w-full" style={{ height: 280 }}>
```

Three layers:

1. **Mobile blur** — shown below `lg` only:
   ```
   <div class="absolute inset-x-0 bottom-0 lg:hidden"
        style={{ height: "70%",
                 background: "linear-gradient(to right, rgba(225,255,37,0.45), rgba(85,245,163,0.55), rgba(63,247,236,0.45))",
                 filter: "blur(24px)" }} />
   ```

2. **Desktop morphing wave** — `hidden lg:block`, an SVG at
   `viewBox="0 0 4509 1029"`, `preserveAspectRatio="none"`, `class="absolute inset-0 h-full w-full"`:

   ```
   <defs>
     <filter id="glowBlur" x="0" y="0" width="4508.86" height="1028.1"
             filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
       <feFlood flood-opacity="0" result="BackgroundImageFix" />
       <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
       <feGaussianBlur stdDeviation="60" result="effect1_foregroundBlur" />
     </filter>
     <linearGradient id="glowGrad" x1="120" y1="546.886" x2="4388.86" y2="546.886"
                     gradientUnits="userSpaceOnUse">
       <stop offset="0.338752" stop-color="#E1FF25" stop-opacity="0.8" />
       <stop offset="0.5"      stop-color="#55F5A3" />
       <stop offset="0.612937" stop-color="#3FF7EC" stop-opacity="0.8" />
     </linearGradient>
   </defs>
   <g filter="url(#glowBlur)">
     <path fill="url(#glowGrad)">
       <animate attributeName="d" dur="8s" repeatCount="indefinite" calcMode="spline"
                keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
                values="
                  M120 349.862L1187.22 120L2254.43 382.699L3321.65 218.512L4388.86 448.374V908.097H120Z;
                  M120 180L1187.22 420L2254.43 150L3321.65 480L4388.86 250V908.097H120Z;
                  M120 480L1187.22 100L2254.43 500L3321.65 120L4388.86 520V908.097H120Z;
                  M120 349.862L1187.22 120L2254.43 382.699L3321.65 218.512L4388.86 448.374V908.097H120Z" />
     </path>
   </g>
   ```

   This is a **SMIL `<animate>`** morphing a five-peak polyline through four keyframes on an
   8-second loop with eased splines, then blurred by 60 units. The result is a slow, liquid
   aurora. No JavaScript.

3. **Top fade** — hides the wave’s hard upper edge:
   ```
   <div class="pointer-events-none absolute inset-x-0 top-0"
        style={{ height: "55%", background: "linear-gradient(to bottom, #f5f3eb, transparent)" }} />
   ```

---

## 18. Footer

```
<footer aria-labelledby="footerHeading" class="bg-blackBG px-5 pt-16 pb-16 text-white antialiased">
  <h2 class="sr-only" id="footerHeading">Footer</h2>
  <div class="mx-auto max-w-screen-xl">
    <div class="grid grid-cols-2 gap-5 md:grid-cols-6">
```

**Column 1 — the mark:**
```
<div class="relative col-span-2 pb-4 md:col-span-1 md:pb-0">
  …48×48 white brand mark (§5.1)…
</div>
```
It spans both columns on mobile, one of six at `md`.

**Columns 2–6 — link lists:**
```
<div class="col-span-1 pt-5 md:pt-0">
  <p class="mb-4 text-xs font-medium">{title}</p>
  <ul class="space-y-4">
    <li>
      <a class="group text-xs text-white flex items-center opacity-80 duration-200 hover:opacity-100"
         href={href}>
        {label}
        <span class="inline-block">
          <ArrowIcon color="white"
            class="-translate-x-1 opacity-0 duration-100 ease-in-out
                   group-hover:translate-x-1 group-hover:opacity-100" />
        </span>
      </a>
    </li>
  </ul>
</div>
```

Every footer link hides an arrow that slides from `-4px` to `+4px` while fading in over 100ms —
the fastest transition on the page.

| Products | Use Cases | Resources | Developers | Company |
|---|---|---|---|---|
| Issuing | AP & Bill Pay | Product Updates | Documentation | About |
| Acquiring | Spend Management | Executive Playbooks | API Reference | Press |
| Credit | Fleet | Support | API Changelog | Careers |
| Money Movement | Travel and OTAs | LinkedIn | Status | Brand |
| Unified Payments | Platforms | Privacy | | Blog |
| | Embedded Finance | Terms | | |
| | Branded Credit | | | |
| | Vertical SaaS | | | |

hrefs follow the same path conventions as elsewhere (`/products/issuing`,
`/solutions/ap-automation`, `/agreements/privacy`, …).

**Legal block:**
```
<div class="mt-10 pt-32 opacity-50">
  <div class="text-xxs space-y-4 leading-5">
    <p>©2026 Ledgra Technologies, Inc.</p>
    <p>
      Ledgra Technologies Inc.&apos;s subsidiary, Ledgra Payments, Inc., is a registered money
      services business and is actively pursuing money transmitter licenses
      <a href="/agreements/state-licenses" class="underline">across individual U.S. states</a>.
      Prior to securing licenses in particular jurisdictions, Ledgra will be providing services
      pursuant to a bank sponsorship model.
    </p>
  </div>
</div>
```

The `pt-32` (128px) creates the large deliberate void between the link columns and the legal
text. Footer height: 678px.

---

## 19. Animation index

Every animation on the page, in one table. **None are scroll-triggered.**

| # | Animation | Trigger | Duration | Loops |
|---|---|---|---|---|
| 1 | Orb ring entrance (`riseIn`) | Load | 2.6s, staggered 0→0.76s | Once |
| 2 | Orb ring drift (`drift`) | Load + 2.6s | 22–32s per ring | Forever (≥1024px only) |
| 3 | Headline word rotation | Load | 15s cycle, 6 words 2.5s apart | Forever |
| 4 | Announcement bar hover | Hover | 200ms | — |
| 5 | Button arrow slide-in | Hover | 200ms | — |
| 6 | Product card lift + shadow | Hover | 300ms | — |
| 7 | Card arrow reveal | Hover | 200ms | — |
| 8 | Issuing ring parallax | Card hover | 700ms | — |
| 9 | Ambient blobs (4 cards) | Load | 12s / 14s / 14s / 16s, `alternate` | Forever (≥1024px only) |
| 10 | Checkout digit reveal | Load | 0.4s each at 0.8/1.6/2.4/3.2/4.0/4.5s | Once |
| 11 | Network chip swap | Load + 1.2s | 0.5s slide + 0.4s fade | Once |
| 12 | Pill track scroll | Load | 45s linear | Forever |
| 13 | Products connector draw | Load | 0.8s / 1.2s, staggered to 1.05s | Once |
| 14 | Products flow pulses (12) | Load | 3.5s, staggered 0→8.8s | Forever |
| 15 | Mobile connector draw + flow | Load | 0.75s / 3.2s | Once / Forever |
| 16 | Unified connector draw (8) | Load | 1.5s, staggered to 0.56s | Once |
| 17 | Unified flow pulses (8) | Load | 2.4s, staggered to 2.1s | Forever |
| 18 | Platform icon orbits (5) | Load | 7/9/11/8/13s | Forever (≥1024px only) |
| 19 | Platform icon pulses (5) | Load | 4/5/6/3.5/7s, `alternate` | Forever |
| 20 | Disc breath (`bgPulse`) | Load | 12s | Forever |
| 21 | Sparkle spin | Load | 12s linear | Forever |
| 22 | Industry tile zoom | Hover | 400ms | — (fine pointers only) |
| 23 | Media tile sheen | Load / hover | 9s linear | Forever |
| 24 | Play control scale | Tile hover | 200ms | — |
| 25 | API typewriter | Load | ~7.7s cycle | Forever |
| 26 | API cursor blink | While typing | 0.8s step-end | Forever |
| 27 | Insight thumbnail lift | Hover | 300ms | — |
| 28 | CTA aurora morph | Load | 8s SMIL | Forever |
| 29 | Footer link arrow | Hover | 100ms | — |
| 30 | Nav dropdown reveal | Hover | 100ms | — |

Sheen keyframes (§5.4):
```css
@keyframes sheen { from { transform: translateX(-50%) } to { transform: translateX(0) } }
```

**Reduced motion.** Wrap all infinite animations so they respect user preference:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 20. Responsive specification

| Element | <640 | ≥640 (`sm`) | ≥768 (`md`) | ≥1024 (`lg`) |
|---|---|---|---|---|
| Hero height | 700px | — | 800px | — |
| Hero `<h1>` | 11vw | — | 70px | 100px |
| Hero 5th word | “Ledgering” | — | “Real-Time Ledgering” | — |
| Hero buttons | stacked, 20px gap | row, 8px gap | — | — |
| Hero sub-copy | 16px/26px | — | 18px/30px | — |
| Logo wall | 3 cols | 6 cols | — | — |
| Trust caption | 14px | — | 16px | — |
| Product cards | 1 col | 2 cols | — | 4 cols |
| Capability pills | 2 cols | 4 cols | — | 8 cols |
| Products connector | mobile variant | **none** | **none** | desktop variant |
| Orb drift | off | off | off | on |
| Card blobs | off | off | off | on |
| Platform icon | flat gradient | flat | flat | animated blobs |
| Platform trio | 1 col (max 320px) | 3 cols | max 768px | — |
| Industry cards | 1 col | 2 cols | — | 4 cols |
| Media tiles | full width | — | — | half width each |
| Quote cards | 3:2 | — | square | — |
| Developer layout | 1 col | — | — | 2 cols, 80px gap |
| API console | hidden | hidden | hidden | shown |
| Developer features | 2 cols | — | 40px gap | — |
| Insights cards | 1 col | 3 cols | — | — |
| CTA heading | 50px | — | — | 100px |
| CTA glow | blurred bar | — | — | morphing SVG |
| Footer columns | 2 | — | 6 | — |
| Desktop nav | hidden | hidden | hidden | flex |

---

## 21. Accessibility

- One `<h1>` (hero) and one `<h2>` per section. The footer’s `<h2>` is `sr-only`.
- The animated headline is `aria-hidden="true"`; a `.sr-only` span carries
  “The only payments platform built for you.”
- Decorative SVG (orb, illustrations, connectors, glow) is `aria-hidden="true"` with no title.
- Every icon-only control has an `aria-label` (`Toggle menu`, `Play full video`, `Close video`).
- The hamburger exposes `aria-expanded`.
- Buttons keep a visible focus ring: `box-shadow: 0 0 0 2px var(--color-green)`.
- Wordmarks that replace logos are real text, so they are announced correctly — an advantage
  over the images they replace. Decorative wordmark ornaments are `aria-hidden`.
- The video modal is dismissible by scrim click, Close button, and `Escape`.
- Body copy at `opacity-60` over `#f5f3eb` yields ≈4.6:1 — acceptable. Do not go below 60%.

---

## 22. Acceptance criteria

**Build**
1. Type check, lint, and production build all pass with zero errors and zero warnings.
2. Only the nav, media tile, and API console ship client JavaScript.

**Layout (measure at a 1280px-wide viewport, all lazy content loaded)**
3. Total document height ≈ **8233px** (±20px).
4. Hero container exactly **800px** tall; `<h1>` computed **100px / 105px**.
5. Sub-headline computed **18px / 30px**.
6. Trust caption computed **16px / 24px**.
7. Section headings 2, 4, 5, 6, 8 computed **70px / 80px**; developer heading **62px / 72px**;
   CTA heading **100px / 106px**.
8. Content column exactly **1280px** wide, gutters 20px.
9. Footer exactly **678px** tall on `#111111`.

**Visual**
10. Page background is `#f5f3eb` everywhere except the footer and API console.
11. Exactly one word visible in the rotating headline at any instant.
12. Nine orb rings present; drift active at ≥1024px, absent below.
13. All four product cards show a moving blob at ≥1024px and a static one below.
14. Pill track loops with no visible seam or jump.
15. API console shows syntax-coloured text with a blinking cursor while typing.
16. CTA aurora morphs continuously.

**Interaction**
17. Nav does not stick — it scrolls out of view and does not return.
18. Hovering Products/Use Cases/Company opens the panel; moving the pointer diagonally into the
    panel keeps it open (the bridge works).
19. Product and industry cards lift 8px and reveal their arrow on hover.
20. Hamburger toggles the mobile panel; selecting a link closes it.
21. Play control opens the modal; scrim, Close, and `Escape` all dismiss it.

**Responsive**
22. At 390px: hero 700px, `<h1>` ≈43px, logo wall 3 columns, product cards 1 column, desktop
    nav and API console hidden, mobile connector visible.
23. At 768px: hero 800px, `<h1>` 70px, logo wall 6 columns, product cards 2 columns, **neither**
    connector visible.
24. At 1440px: `<h1>` 100px, product cards 4 columns, desktop nav and connector visible.
25. No horizontal scrollbar at any width from 320px to 2560px.

---

## 23. Copy deck

Every user-visible string, for review and translation. Replace “Ledgra” consistently if you
rename the product.

**Metadata**
- Title: `Ledgra | Built for You`
- Description: `Launch and scale modern financial products on one platform for issuing, acquiring, credit, money movement, and real-time ledgering. Built around your business, your customers, and your roadmap.`

**Announcement:** `The Instant Settlement Playbook Is Here for Fintechs, PayFacs, ISOs and Vertical SaaS. Get It Now`

**Nav:** Products · Use Cases · Customers · Company · Docs · Pricing · Log In · Contact Sales
- Products menu: Issuing / *Issue Cards*; Acquiring / *Accept Payments*; Unified Payments / *Issue cards and accept payments*; Credit / *Run a Credit Program*
- Use Cases menu: Agentic Commerce · AP & Bill Pay · Fleet · Money Movement · Spend Management · Embedded Finance · Branded Credit · Travel · Vertical SaaS · Ecommerce · Corporate Disbursements
- Company menu: About · Careers · Blog · Press

**Hero:** rotating Issuing / Acquiring / Credit / Money Movement / Real-Time Ledgering / Ledgra;
static `Built for You.`; sub-copy as §9.4; buttons `Explore the Platform`, `Talk to an Expert`.

**Trust:** `Trusted by the companies building what's next in payments`

**Products:** heading, sub-copy, four cards, eight pills — all as §11.

**Unified:** `Built on a Unified Platform` · `Most platforms were assembled. Ledgra was built as one.` · trio as §12.3.

**Industry:** `Built for your industry` · `Explore solutions designed for how your business operates.` · eight cards as §13.

**Customers:** `Built with the companies leading what's next` · `Real products. Real scale. Real outcomes.` · `View Customer Stories` · four quotes as §14.2.

**Developer:** as §15.

**Insights:** `Insights for builders` · `Learn how modern companies are designing, launching, and scaling financial products.` · `Explore Resources` · three titles as §16.

**CTA:** `Build what's next` · `Ledgra gives you the foundation to launch faster, differentiate, and keep moving.`

**Footer:** five columns as §18 plus the legal paragraph.

---

*End of specification.*
