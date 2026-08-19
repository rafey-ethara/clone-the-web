# Product Requirements Document — "Overtone" marketing home page

A single long-scroll marketing home page for a payments-infrastructure platform.
This document is the complete specification. Build from it alone.

---

## 0. How to read this document

This PRD is **self-contained and text-only**, with **zero external dependencies**:

- **No image files.** Every graphic — wordmarks, product illustrations, industry
  photographs, customer media, article cards, icons, the hero background — is
  specified either as inline SVG drawn from primitives or as a CSS gradient. Exact
  geometry, colours and stops are given.
- **No font files.** Typography uses system stacks. Families are listed in §3.2.
- **No video files.** The two customer media tiles are animated CSS panels (§5.14).
- **No third-party UI, animation or scroll libraries.** All motion is CSS or SMIL.

Every measurement here is a **required exact value**, not a suggestion. Where a
utility class string is given, use that exact string — the class list *is* the
specification, and it is the shortest unambiguous route to the same pixels.

**"Overtone" is a fictional placeholder brand** invented for this document. It
exists only so the copy reads naturally. Substitute any other name, but if you do,
replace it consistently in every string in §22.

**Every company name in this document is fictional.** The product, the twelve
customer wordmarks, the two customer-media partners, the names in the testimonials,
the competitors in an article title and the card-network marks were all invented to
give each slot a realistic length and shape. Substitute freely. Do not replace them
with the names of real companies.

Three details in this document are traps that cost real time to find. They are
flagged inline where they matter, not collected at the end:

1. The type scale replaces the framework's defaults at **every** step (§3.2).
2. Component class keys compose a base class; dropping it silently kills the
   animation and the positioning (§5.0).
3. Adding a `srcset` where the original has none halves the rendered size on
   retina displays (§5.2).

---

## 1. Product overview

### 1.1 What this is

A marketing home page for a payments-infrastructure company that sells four
financial products — card issuing, payment acquiring, credit programmes, and money
movement — running on one shared real-time ledger.

The page's argument is that the platform was **built as one system rather than
assembled from acquisitions**, and its job is to move a technical buyer (a fintech
founder, a payments lead, a platform CTO) toward one of two actions: "Explore the
Platform" (self-serve sign-up) or "Talk to an Expert" (sales contact). Those two
buttons appear twice — in the hero and in the closing CTA — and nowhere else.

### 1.2 Design intent

The identity is **calm document, loud hero**.

- The whole page sits on a warm off-white paper colour, never pure white. Cards are
  the only pure-white surfaces on the page, so they read as objects resting on paper
  rather than as panels cut into it.
- One enormous saturated moment — a cyan → green → yellow orb — fills the hero and
  then does not return until the closing CTA, where a softened echo of the same
  gradient appears as a horizon band. Between them the page is almost monochrome.
- Type is large, neutral and light. Headings reach 100px and every one of them is
  weight **400**. There is no bold heading, no italic, no coloured heading anywhere.
  Hierarchy is carried entirely by size and by the horizontal rules between sections.
- Motion is **ambient and continuous, never scroll-triggered**. Things breathe,
  drift, draw themselves in on load, and loop forever. Nothing waits for the visitor.
- Every interactive card lifts 8px on hover and reveals an arrow that slides in from
  the left.

The restraint is the point. Six of the eight section headings begin with the word
"Built", every section is separated by the same 1px rule, and every card shares one
corner radius. The hero can be as loud as it is precisely because nothing after it
competes.

### 1.3 Non-goals

- No backend, database, authentication, or form submission. Buttons are links.
- No CMS. All content is hard-coded from §22.
- No analytics, tag managers, error reporting, consent banners, or third-party
  scripts of any kind.
- No dark mode. The page has exactly one appearance.
- No internationalisation. English only.
- No sticky header. This is deliberate and load-bearing — see §7.4.

---

## 2. Technical requirements

### 2.1 Stack

| Concern | Requirement |
|---|---|
| Framework | React with a file-based router and server components |
| Language | TypeScript, `strict: true`, no `any` |
| Styling | A CSS-first utility framework configured through a `@theme` block, plus CSS Modules for the keyframe-heavy components |
| Components | Named exports, PascalCase files, one component per file |
| Indentation | 2 spaces |
| Route | Served at `/` |

### 2.2 Client vs. server components

Almost everything is a **server component**. Only three pieces need client-side
JavaScript:

1. **The navigation bar** — holds state for the below-`lg` menu toggle.
2. **The customer media tile** — holds state for playback and the play control.
3. **The API demo panel** — only if the typewriter reveal is implemented in JS; the
   specification in §14.3 uses a pure-CSS cursor blink and needs no state.

Everything else, **including all animation**, is pure CSS and must render on the
server. If a section of this document tempts you toward `useEffect`, re-read it —
the original does not use one there.

### 2.3 Quality gates

The build must pass with zero errors and zero warnings:

1. Type check (`tsc --noEmit`)
2. Lint (framework recommended + TypeScript configs)
3. Production build

Two failures are near-certain if not pre-empted:

- Apostrophes and quotation marks inside JSX **text nodes** must be escaped
  (`&apos;`, `&quot;`). The copy deck in §22 is full of them — "what's next",
  "can't", and four testimonials wrapped in double quotes.
- The non-standard `mask-type` property used by the hero orb and two card
  illustrations must be cast when set inline:
  `style={{ maskType: "alpha" } as React.CSSProperties}`.

### 2.4 Document head

| Field | Value |
|---|---|
| `<html lang>` | `en-US` |
| `<title>` | `Overtone \| Built for You` |
| Meta description | See §22.1 |
| Open Graph | `og:title`, `og:description`, `og:type` = `website` |
| Twitter card | `summary_large_image` |
| Favicon | Inline SVG data URI, §5.1 |
| Viewport | `width=device-width, initial-scale=1` |

Do not emit an `og:image` or a `twitter:image`. Those would be file references, and
this build has no files.

---

## 3. Design system

### 3.1 Colour tokens

Define all of these as custom properties in the `@theme` block so that utilities
(`bg-bone`, `text-ash`, `border-ash`, …) are generated from them.

The system has **two layers**: a raw palette (`--ds-*`) and a semantic layer that
aliases it. Components reference the semantic layer. Preserve both — collapsing them
works until the first time you need to restyle a state.

#### Page and surface

| Token | Value | Role |
|---|---|---|
| `--color-bone` | `#f5f3eb` | **The page background.** Every section uses it. |
| `--color-bone-50` | `#faf9f5` | Lighter paper; subtle raised surfaces |
| `--color-ash` | `#e2e0d6` | Rules, borders, connector strokes, capability tiles |
| `--color-ash-50` | `#f1efeb` | Subtle edge |
| `--color-clay` | `#b9b6a9` | Muted mid-tone |
| `--color-clay-20` | `#dcdbd4` | Light clay |
| `--color-clay-50` | `#787365` | Interaction edge, focus ring outer |
| `--color-blackBG` | `#111111` | Footer background — note this is **not** `#000` |
| `--color-white` | `#ffffff` | Card surfaces only |

The connector "flow" strokes use `#c8c5bc`, which is not a token — it is a one-off
literal a shade darker than `--color-ash`, chosen so the moving pulse reads against
the static line it travels along. Use the literal.

#### Neutrals

| Token | Value |
|---|---|
| `--color-black-100` | `#0a0a0a` |
| `--color-black-80` | `#333333` |
| `--color-black-70` | `#4d4d4d` |
| `--color-black-50` | `#737373` |
| `--color-black-30` | `#b2b2b2` |
| `--color-black-15` | `#d9d9d9` |

Body text is pure `#000000`, not `--color-black-100`. Secondary text is achieved by
dropping opacity on black rather than by picking a grey token — the hero paragraph
computes to `oklab(0 0 0 / 0.7)`, the CTA paragraph to `oklab(0 0 0 / 0.6)`, and card
body copy uses `opacity: 0.6` on the element. Match that approach; substituting a
grey hex will not sit the same way on the warm paper.

#### Accent — the four brand colours

| Token | Value | Where it appears |
|---|---|---|
| `--color-green` | `#55f5a3` | Orb, all card art, unity icon, focus ring |
| `--color-blue` | `#00fff0` | Orb base fill |
| `--color-cyan` | `#3ff7ec` | Unity icon, CTA band, card art (slightly softer than `--color-blue`) |
| `--color-yellow` | `#e1ff25` | Orb, all card art, CTA band |
| `--color-red` | `#f0314b` | Reserved; not used on this page |

`--color-blue` (`#00fff0`) and `--color-cyan` (`#3ff7ec`) are genuinely different
values and are not interchangeable. The orb uses `#00fff0` as its flat base fill
under every gradient; the unity icon and the CTA band use `#3ff7ec`. Swapping them
shifts the whole page's cyan a step toward pure spectrum and reads as a mistake.

Two further one-off literals appear only in card art: `#ff9f46` (the warm stop in the
credit-card gradient) and the pair `#00724a` → `#005a3a` (the mask gradient on the
issuing and credit card rectangles).

#### Brand gradient

```
--gradient-brand: linear-gradient(135deg, #55f5a3 25%, #98fa66 68.27%, #e1ff25 100%);
```

Note the third colour, `#98fa66`, is a *bridging* stop that exists only inside this
gradient — it is not a token and appears nowhere else. Its odd 68.27% position is
what keeps the green-to-yellow transition from banding. Do not round it to 68%.

#### Semantic aliases

| Token | Resolves to |
|---|---|
| `--color-surface-base` | `#f5f3eb` |
| `--color-surface-subtle` | `#faf9f5` |
| `--color-surface-raised` | `#ffffff` |
| `--color-surface-strong` | `#e2e0d6` |
| `--color-surface-sunken` | `#f5f3eb` |
| `--color-surface-overlay-scrim` | `#787365b3` |
| `--color-edge-default` | `#e2e0d6` |
| `--color-edge-subtle` | `#f1efeb` |
| `--color-edge-interaction` | `#787365` |
| `--color-foreground-primary` | `#0a0a0a` |
| `--color-foreground-secondary` | `#737373` |
| `--color-foreground-disabled` | `#b2b2b2` |
| `--color-button-primary` | `#0a0a0a` |
| `--color-button-primary-active` | `#333333` |
| `--color-button-primary-foreground` | `#ffffff` |
| `--color-button-secondary-edge` | `#e2e0d6` |
| `--color-button-secondary-hover` | `#faf9f5` |
| `--color-button-secondary-foreground` | `#0a0a0a` |

#### Status families (defined, unused on this page)

Five-step families are defined for `mint`, `garnet`, `iris` and `ochre`, plus the
semantic pairs that reference them. None is used on the home page. Define them if you
are building the wider system; skip them if you are building this page only.

| Family | 10 | 30 | 50 | 70 | 100 |
|---|---|---|---|---|---|
| mint | `#c7f3ea` | `#a7e3d5` | `#489e86` | `#015a3e` | `#03402b` |
| garnet | `#ffe1d8` | `#ffc4b6` | `#ed505a` | `#a70842` | `#680025` |
| iris | `#efefff` | `#d0cfff` | `#8a7ff4` | `#6a62bb` | `#443e7a` |
| ochre | `#fff5c7` | `#ebd38f` | `#9f6400` | `#7b4c00` | `#4c2e00` |

("mint" here is the colour mint. It is not related to the design-system layer, which
this document names `--ds-*`.)

### 3.2 Typography

#### Families

The original uses two weights of a licensed display grotesque and three weights of a
licensed text grotesque. **Licensed faces cannot be a dependency of this build.**
Specify these system stacks instead:

```
--font-display: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                Helvetica, Arial, sans-serif;
--font-body:    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                Helvetica, Arial, sans-serif;
--font-mono:    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
                "Liberation Mono", "Courier New", monospace;
```

`--font-body` is the page default; `--font-display` is opt-in via a `font-display`
utility applied to every `h1` and `h2`.

**What this substitution costs.** The original pairs a tighter, more geometric
display face against a warmer text face, so headings feel a half-step more
mechanical than the paragraphs beneath them. One stack for both loses that contrast.
This is the largest single fidelity gap in the document. If you hold a licence for a
neo-grotesque display family, substitute it at `--font-display` alone and change
nothing else — every size, leading and weight in this document is already correct
for that pairing.

#### The type scale — read this before writing any size

**This scale replaces the framework's defaults at every single step.** Every value
below differs from what the framework ships. If you assume defaults, every heading
and every paragraph on the page will be wrong, and the error will look like a design
disagreement rather than a bug.

| Token | Size | Line height | Framework default (do **not** use) |
|---|---|---|---|
| `--text-xxs` | 12px | 16px | *(does not exist)* |
| `--text-xs` | **14px** | 18px | 12px |
| `--text-sm` | **16px** | 24px | 14px |
| `--text-base` | **18px** | 28px | 16px |
| `--text-lg` | **22px** | 33px | 18px |
| `--text-xl` | **26px** | 36px | 20px |
| `--text-2xl` | **40px** | 50px | 24px |
| `--text-3xl` | **45px** | 55px | 30px |
| `--text-4xl` | **50px** | 60px | 36px |
| `--text-5xl` | **62px** | 72px | 48px |
| `--text-6xl` | **70px** | 80px | 60px |
| `--text-7xl` | **100px** | 106px | 72px |
| `--text-20` | 20px | 28px | *(does not exist)* |
| `--text-reset` | 0px | 0px | *(does not exist)* |

`--text-6xl` at **70px, not 60px** is the one that matters most: it is the size of
six of the eight `h2` elements on this page. A 10px error repeated six times is the
difference between the page reading as designed and reading as approximated.

#### Weights, tracking, leading

| Token | Value |
|---|---|
| `--font-weight-regular` / `--font-weight-normal` | 400 |
| `--font-weight-medium` | 500 |
| `--font-weight-semibold` | 600 |
| `--font-weight-bold` | 700 |
| `--tracking-tight` | `-0.025em` |
| `--tracking-normal` | `0em` |
| `--tracking-wide` | `0.025em` |
| `--tracking-wider` | `0.05em` |
| `--tracking-widest` | `0.1em` |
| `--leading-snug` | `1.375` |
| `--leading-relaxed` | `1.625` |

Only 400 and 500 are used on this page. 600 and 700 are defined but never applied.

**No heading sets tracking.** Headings render at the family's natural metrics. The
only non-zero tracking measured anywhere is `1.5px` on the SVG card-number text
inside the acquiring illustration (§5.5).

### 3.3 Spacing

Base unit `--spacing: 0.25rem` (4px); all spacing utilities are multiples of it.
The design-system layer additionally names discrete steps:

| Token | Value |
|---|---|
| `--ds-space-2` | 2px |
| `--ds-space-4` | 4px |
| `--ds-space-8` | 8px |
| `--ds-space-12` | 12px |
| `--ds-space-16` | 16px |
| `--ds-space-24` | 24px |
| `--ds-space-32` | 32px |
| `--ds-space-40` | 40px |
| `--ds-space-48` | 48px |
| `--ds-space-64` | 64px |

### 3.4 Radii

| Token | Value | Applied to |
|---|---|---|
| `--radius-card` | `1.25rem` (20px) | **Almost every card and nav pill on the page** |
| `--radius-nav` | `28px` | Nav dropdown panels |
| `--radius-button` | `25px` | Buttons where a pill is not wanted |
| `--radius-rounded` | `8px` | Small chips, pill icons |
| `--radius-page` | `40px` | Page-level rounding |
| `--radius-circle` | `50%` | Circular marks |
| `--radius-xl` | `0.75rem` (12px) | Video tiles, use-case card images |
| `--radius-2xl` | `1rem` (16px) | — |
| `--radius-3xl` | `1.5rem` (24px) | — |
| `--ds-radius-full` | `999px` | Rail pills |

> **De-branding note.** In the original, `--radius-card` is named after the company.
> It reads exactly like a framework utility until you notice the brand sitting inside
> it. If you rename this token, grep for the old name afterwards — it appears on more
> than thirty elements and a partial rename produces a page where most cards have
> 20px corners and a few have none.

Buttons use `border-radius: 3.40282e38px` — the framework's compiled `rounded-full`.
Any absurdly large value works; the effect is a pill whose ends are exact semicircles.

### 3.5 Shadows

| Token | Value |
|---|---|
| `--shadow-focus-ring` | `0 0 0 2px #faf9f5, 0 0 0 4px #787365` |
| `--shadow-overlay` | `0 1px 2px 0 #0a0a0a12, 0 6px 8px -2px #0a0a0a1f` |
| `--drop-shadow-nav` | `0 10px 20px #00000014` |

One shadow is written inline rather than tokenised, and it is the most visible one on
the page — the card hover lift:

```
box-shadow: 0 18px 0 -8px rgba(226, 224, 214, 0.5);
```

Note the **zero blur radius** and the −8px spread. This is not a soft drop shadow; it
is a hard offset slab in translucent ash that reads as a second card sitting directly
behind the first. A blurred shadow here looks conventional and wrong.

### 3.6 Motion tokens

| Token | Value |
|---|---|
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--default-transition-duration` | `0.15s` |
| `--default-transition-timing-function` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--ds-duration-fast` | `0.1s` |
| `--ds-duration-default` | `0.2s` |
| `--ds-duration-slow` | `0.3s` |

Two easings used heavily in the illustrations are **not** tokens and must be written
as literals:

- `cubic-bezier(0.16, 1, 0.3, 1)` — the hero orb rise and the headline word rotator
- `cubic-bezier(0.22, 1, 0.36, 1)` — every connector line draw

Both are strong decelerations. They are what makes the orb feel like it settles and
the connectors feel like they are being drawn rather than revealed.

### 3.7 Blur and filters

| Token | Value |
|---|---|
| `--blur-md` | `12px` |
| `--blur-lg` | `16px` |
| `--blur-xl` | `24px` |

SVG `feGaussianBlur` values are per-illustration and much larger: `stdDeviation="6"`
(unity icon), `40` (money-movement and acquiring blobs), `50` (issuing and credit
blobs), `60` (CTA band).

### 3.8 Breakpoints

| Token | Value |
|---|---|
| `--breakpoint-sm` | `40rem` (640px) |
| `--breakpoint-md` | `48rem` (768px) |
| `--breakpoint-lg` | `64rem` (1024px) |
| `--breakpoint-xl` | `80rem` (1280px) |
| `--breakpoint-2xl` | `96rem` (1536px) |

**1024 (`lg`) is the structural breakpoint.** It is where the nav collapses, both
connector graphics swap to mobile variants, all ambient blob animation stops, and
the four-column grids fold. `sm` and `md` only adjust column counts and type.

### 3.9 Container

Every section centres a `max-width: 1280px` container with `padding-inline: 20px`.
At 1440 that gives a 1280px content column with 80px gutters.

---

## 4. Global page structure

### 4.1 Section order and measured geometry

Measured at 1440 × 900, DPR 1. `y` is offset from document top.

| # | Section | y | Height | Background | PRD § |
|---|---|---|---|---|---|
| 1 | Announcement bar | 0 | 38 | 5% black over bone | §6 |
| 2 | Header / navigation | 38 | 71 | transparent | §7 |
| — | *Hero wrapper (contains 1, 2 and the orb)* | 0 | 800 | bone | §8 |
| 3 | Logo wall | 800 | 244 | bone | §9 |
| 4 | Products | 1044 | 1011 | bone | §10 |
| 5 | Unified platform | 2055 | 752 | bone | §11 |
| 6 | Industry grid | 2807 | 1294 | bone | §12 |
| 7 | Customers | 4101 | 1172 | bone | §13 |
| 8 | Developer platform | 5274 | 993 | bone | §14 |
| 9 | Insights | 6267 | 809 | bone | §15 |
| 10 | Closing CTA | 7076 | 590 | bone | §16 |
| 11 | Footer | 7665 | 678 | `#111111` | §17 |

**Total document height: 8343px at 1440.** This is the single best end-to-end
acceptance number in this document — see §21.

### 4.2 The section rule

Sections 4 through 10 each open with a 1px `#e2e0d6` rule across the top of their
**inner container**, not the section (`border-t` on the `max-w-screen-xl` element).
The rule therefore stops at the 1280px content width and does not bleed to the
viewport edge. Section 3 (logo wall) has no rule.

This one detail does more for the page's rhythm than any other. Get it wrong — bleed
it full-width, or put it on the section — and the page loses its document quality.

### 4.3 Vertical padding per section

| Section | Padding |
|---|---|
| Logo wall | `pt-2 pb-10` |
| Products | `px-5 pt-16 pb-0` |
| Unified platform | `px-5 pb-10 md:pb-16` |
| Industry grid | `px-5 pt-10 pb-10 md:pb-20` |
| Customers | `px-5 pt-16 pb-10 sm:pt-10 md:pb-20` |
| Developer platform | `px-5 pt-10 pb-10 md:pb-20` |
| Insights | `px-5 pt-16 pb-20 sm:pt-10` |
| Closing CTA | `px-5 pt-10 pb-40 sm:pt-10` (also `relative overflow-hidden`) |
| Footer | `px-5 pt-16 pb-16` |

Inner containers add `pt-16 sm:pt-24` (or `sm:pt-28` for the developer section)
below the rule.

Every section also carries `antialiased`.

### 4.4 Link policy

All links are `<a>` elements. Because there is no backend and no other route,
point every link at `#` unless you are building the wider site, in which case the
targets are given per section. The two hero buttons and the two CTA buttons are
links, not `<button>` elements.
---

## 5. Asset strategy — every graphic built from text

The page loads 69 images, 2 videos and 49 inline SVGs. Every one of them is
specified below as inline SVG geometry, a CSS gradient, or styled text. Nothing is
referenced as a file.

### 5.0 The composes trap — read before building any illustrated component

The illustrated components use CSS Modules, and several of their class keys map to
**two** class names rather than one:

```
ring:  "orb-ring"                     ← base: position, opacity, animation
ring1: "orb-ring1 orb-ring"           ← variant + base
```

A key holding two names is a `composes` relationship. The **base** class is the one
carrying `position: absolute`, `opacity: 0` and the `animation` shorthand; the
variant carries only the per-instance custom properties and the `animation-delay`.

If you apply only the variant, every one of these is silently lost. The symptom is
distinctive and easy to misdiagnose: elements that should be stacked and animating
all render at once, fully visible, static, and stacked in document flow instead of
on top of each other. The hero orb becomes nine flat discs in a column. Nothing
errors.

The components with this structure are the orb rings (§5.3), the headline words
(§8.2), both connectors (§5.8, §5.9) and the unity icon blobs (§5.10). In each case
below, the base class and the variant class are listed separately so the relationship
is explicit.

### 5.1 Brand mark, wordmark and favicon

The mark is a **fundamental dot with three harmonic arcs** — a literal reading of the
name. Draw it on a 40 × 40 viewBox:

```html
<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="30" r="3" fill="currentColor"/>
  <path d="M12 23 A 7 7 0 0 1 19 30"  stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M12 17 A 13 13 0 0 1 25 30" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M12 11 A 19 19 0 0 1 31 30" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
</svg>
```

**Header lockup** — total rendered size 153 × 39:

| Part | Spec |
|---|---|
| Badge | 34 × 34 circle, `border-radius: 50%`, filled with `--gradient-brand` |
| Mark inside badge | The SVG above at 24 × 24, centred, `color: #000000` |
| Gap | 10px |
| Wordmark | `Overtone`, `--font-display`, 26px, weight 500, `letter-spacing: -0.01em`, `#000000` |

**Footer lockup** — the badge alone at 48 × 48, mark in `#000000`, badge filled with
`--gradient-brand`. No wordmark text.

**Favicon** — the badge as an inline SVG data URI:

```
data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'>
<circle cx='20' cy='20' r='20' fill='%2355f5a3'/>
<circle cx='12' cy='30' r='3' fill='%23000'/>
<path d='M12 23 A 7 7 0 0 1 19 30' stroke='%23000' stroke-width='2.5' fill='none' stroke-linecap='round'/>
<path d='M12 17 A 13 13 0 0 1 25 30' stroke='%23000' stroke-width='2.5' fill='none' stroke-linecap='round'/>
<path d='M12 11 A 19 19 0 0 1 31 30' stroke='%23000' stroke-width='2.5' fill='none' stroke-linecap='round'/>
</svg>
```

### 5.2 Customer wordmarks (twelve)

All twelve are **styled text, not images**. Each sits centred in a flex box; ten
render at 159 × 64 and two (positions 6 and 10 in the reading order below) at
179 × 72, which is why those two read slightly larger than their neighbours. Keep
that asymmetry — a perfectly uniform wall looks synthetic.

Every mark is `#000000` on the bone background.

| # | Name | Treatment |
|---|---|---|
| 1 | Harlow's | 22px, weight 700, inside a 5-sided "house" outline: `<path d="M4 22 L4 10 L28 2 L52 10 L52 22 Z" fill="none" stroke="#000" stroke-width="2"/>` scaled to fit, text centred within |
| 2 | NRT | 26px, weight 700, `letter-spacing: 0.02em`, preceded by a right-pointing chevron `<path d="M0 8 L10 8 M6 4 L11 8 L6 12" stroke="#000" stroke-width="2" fill="none"/>` |
| 3 | Tallyup | 24px, weight 500, lowercase, preceded by a 20 × 20 rotated square `<rect x="3" y="3" width="14" height="14" rx="2" transform="rotate(12 10 10)" fill="#000"/>` |
| 4 | Corvela | 24px, weight 400, uppercase, `letter-spacing: 0.04em`, with the first and last letters overset by a 1.5px diagonal stroke from baseline to cap height |
| 5 | Voyalink | 24px, weight 500, two-tone: "Voya" weight 700, "link" weight 400 |
| 6 | Zilo | **28px**, weight 700, lowercase, tightly tracked at `-0.03em` *(renders in the 179 × 72 box)* |
| 7 | Marker | 24px, weight 500, preceded by a 22px ring `<circle cx="11" cy="11" r="9" fill="none" stroke="#000" stroke-width="4"/>` |
| 8 | Haulbox | **24px**, weight 700, uppercase, preceded by a 20 × 20 diamond `<path d="M10 1 L19 10 L10 19 L1 10 Z" fill="none" stroke="#000" stroke-width="2.5"/>` *(179 × 72 box)* |
| 9 | Kestrel | 24px, weight 700, uppercase, `letter-spacing: 0.06em` |
| 10 | Tidewave | 24px, weight 400, preceded by a crescent `<path d="M16 3 A 9 9 0 1 0 16 19 A 7 7 0 1 1 16 3 Z" fill="#000"/>` |
| 11 | Stipen | 26px, weight 700, lowercase, with the dot of the "i" enlarged to a 5px filled circle |
| 12 | GiftMark | 24px, weight 400, serif-substitute: use `Georgia, "Times New Roman", serif` for this one mark only, to break the wall's uniformity |

> **Do not add a `srcset` to any of these.** In the original the logo marks ship
> without one, which is why they render at their intrinsic size regardless of device
> pixel ratio. Add a 1x/2x descriptor and a DPR > 1 browser selects the 2x candidate
> and **halves the laid-out size** — the entire logo wall silently renders at half
> scale on every retina screen while looking perfectly correct on the machine you
> built it on. Specifying these as inline SVG and text, as above, avoids the problem
> completely. It is recorded here because it is the reason not to "improve" them
> into `<img srcset>` later.

Two further marks appear on the customer media tiles (§13.2) in **white**, and four
appear on the quote cards (§13.3) in `#000000` at 80 × 24 to 100 × 40. Use the same
recipes, recoloured.

### 5.3 The hero orb

Nine concentric circles, all sharing a centre at the bottom-centre of the hero, each
filled three times over: a flat cyan base, then two overlapping linear gradients.
Together they read as a sunrise of nested arcs.

**Container** — `position: absolute; inset: 0; width: 100%; height: 100%;
overflow: hidden; pointer-events: none;`

**SVG** — `viewBox="0 0 1440 700"`, `preserveAspectRatio="xMidYMax slice"`,
`position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
width: 100%; min-width: 1440px; height: 100%`.

The `min-width: 1440px` is essential: below 1440 the orb overflows its container
rather than squashing, which is what keeps the arcs circular at every width.

**Mask** — an alpha mask that extends 100px above the viewBox so the outermost rings
are not clipped as they rise:

```html
<mask id="orbMask" maskUnits="userSpaceOnUse" x="0" y="-100"
      width="1440" height="800" style="mask-type: alpha">
  <rect y="-100" width="1440" height="800" fill="#D9D9D9"/>
</mask>
```

**Rings** — every circle is `cx="720" cy="700"`. Wrap all nine in `<g mask="url(#orbMask)">`.

| Ring | r | Group opacity | `--y` | `--dx` | `--dy` | `--dur` | riseIn delay | drift delay |
|---|---|---|---|---|---|---|---|---|
| 1 | 1000 | 0.6 | 100px | 50px | −30px | 28s | 0s | 2.6s |
| 2 | 900 | 0.6 | 90px | −40px | 40px | 24s | 0.1s | 2.7s |
| 3 | 800 | 0.6 | 80px | 35px | 50px | 32s | 0.2s | 2.8s |
| 4 | 700 | 0.7 | 68px | −55px | −25px | 22s | 0.3s | 2.9s |
| 5 | 600 | 0.8 | 56px | 45px | −40px | 26s | 0.4s | 3.0s |
| 6 | 480 | *(none)* | 44px | −35px | 35px | 30s | 0.5s | 3.1s |
| 7 | 500 | 0.9 | 36px | 50px | 25px | 24s | 0.56s | 3.16s |
| 8 | 400 | *(none)* | 26px | −25px | −50px | 28s | 0.66s | 3.26s |
| 9 | 300 | *(none)* | 16px | 35px | 40px | 22s | 0.76s | 3.36s |

Note that **ring 6 (r=480) is declared before ring 7 (r=500)**, so the smaller circle
paints beneath the larger one. That inversion is in the original and it is what
creates the single darker crescent visible on the left of the arc stack. Preserve the
declaration order exactly as listed.

Each ring group contains three circles at its radius:

```html
<g class="orb-ringN orb-ring" opacity="…">
  <circle cx="720" cy="700" r="R" fill="#00FFF0"/>
  <circle cx="720" cy="700" r="R" fill="url(#orbGa)"/>
  <circle cx="720" cy="700" r="R" fill="url(#orbGb)"/>
</g>
```

**Gradients** — eighteen `linearGradient` elements, all `gradientUnits="userSpaceOnUse"`.
The odd-indexed ones are green, the even-indexed ones yellow. Exact coordinates:

| id | x1 | y1 | x2 | y2 | Stops |
|---|---|---|---|---|---|
| orbG0 | 1377.68 | 253.275 | 1528.71 | 87.727 | `#55F5A3` @0 opacity 0 → `#55F5A3` @1 |
| orbG1 | 539.502 | 558.921 | 169.55 | −260.423 | `#E1FF25` @0 opacity 0 → `#E1FF25` @0.929 |
| orbG2 | 1311.91 | 297.948 | 1447.84 | 148.954 | `#55F5A3` @0 opacity 0 → `#55F5A3` @1 |
| orbG3 | 557.552 | 573.029 | 224.595 | −164.381 | `#E1FF25` @0 opacity 0 → `#E1FF25` @0.929 |
| orbG4 | 1246.15 | 342.62 | 1366.97 | 210.182 | `#55F5A3` @0 opacity 0 → `#55F5A3` @1 |
| orbG5 | 575.602 | 587.137 | 279.64 | −68.339 | `#E1FF25` @0 opacity 0 → `#E1FF25` @0.929 |
| orbG6 | 1180.38 | 387.293 | 1286.1 | 271.409 | `#55F5A3` @0 opacity 0 → `#55F5A3` @1 |
| orbG7 | 593.652 | 601.245 | 334.685 | 27.704 | `#E1FF25` @0 opacity 0 → `#E1FF25` @0.929 |
| orbG8 | 1114.61 | 431.965 | 1205.23 | 332.636 | `#55F5A3` @0 opacity 0 → `#55F5A3` @1 |
| orbG9 | 611.701 | 615.353 | 389.73 | 123.746 | `#E1FF25` @0 opacity 0 → `#E1FF25` @0.929 |
| orbG10 | 1046.24 | 463.363 | 1096.25 | 397.492 | `#55F5A3` @0 opacity 0 → `#55F5A3` @1 |
| orbG11 | 633.28 | 631.984 | 465.171 | 274.078 | `#E1FF25` @0 opacity 0 → `#E1FF25` @1 |
| orbG12 | 1048.84 | 476.638 | 1124.35 | 393.864 | `#55F5A3` @0 opacity 0 → `#55F5A3` @1 |
| orbG13 | 629.751 | 629.461 | 444.775 | 219.788 | `#E1FF25` @0 opacity 0 → `#E1FF25` @0.929 |
| orbG14 | 927.987 | 498.316 | 1029.64 | 421.06 | `#55F5A3` @0 opacity 0 → `#55F5A3` @1 |
| orbG15 | 647.662 | 643.43 | 528.794 | 329.147 | `#E1FF25` @0 opacity 0 → `#E1FF25` @1 |
| orbG16 | 802.781 | 684.44 | 946.214 | 481.88 | `#55F5A3` @0 opacity 0 → `#55F5A3` @1 |
| orbG17 | 665.851 | 657.676 | 566.521 | 427.843 | `#E1FF25` @0 opacity 0 → `#E1FF25` @1 |

Ring N uses `orbG(2N−2)` and `orbG(2N−1)`.

Four gradients (11, 15, 16, 17) end at offset **1**; the rest end at **0.929**. That
7% difference is why the inner rings look slightly more saturated at their edges.

**Fade-out** — a `<div>` overlaid on the orb, `position: absolute; bottom: 0; left: 0;
width: 100%; height: 240px; pointer-events: none;` with
`background: linear-gradient(rgba(0,0,0,0), #f5f3eb)`. This is what dissolves the orb
into the page rather than cutting it off.

**Base class `orb-ring`:**

```css
.orb-ring {
  opacity: 0;
  animation:
    orb-riseIn 2.6s cubic-bezier(0.16, 1, 0.3, 1) forwards,
    orb-drift var(--dur, 20s) ease-in-out 2.6s infinite;
}
```

**Variant classes `orb-ring1` … `orb-ring9`** set only `--y`, `--dx`, `--dy`, `--dur`
and a two-value `animation-delay` (one per animation) from the table above.

```css
@keyframes orb-riseIn {
  from { opacity: 0; transform: translateY(var(--y, 60px)); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes orb-drift {
  0%   { translate: 0; }
  25%  { translate: var(--dx, 10px) var(--dy, -8px); }
  50%  { translate: calc(var(--dx, 10px) * -0.6) calc(var(--dy, -8px) * -0.8); }
  75%  { translate: calc(var(--dx, 10px) * 0.8) calc(var(--dy, -8px) * 0.5); }
  100% { translate: 0; }
}
```

Below 1024px the drift is dropped entirely and only the rise remains:

```css
@media (max-width: 1023px) {
  .orb-ring { animation: orb-riseIn 2.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
}
```

### 5.4 Issuing card illustration

A payment card seen from above, standing on its short edge, with a blurred colour
blob behind it and six faint concentric rings that shift on hover.

**Container** — `border-radius: 0 0 20px 20px; flex: 1; display: flex;
justify-content: flex-start; align-items: flex-end; margin: 0 -24px -24px;
position: relative; overflow: hidden;`

The negative margin is what lets the artwork bleed to the card's edges while the card
keeps its 24px padding for the text above.

**SVG** — `viewBox="0 0 215 350"`, `preserveAspectRatio="xMidYMid meet"`,
`position: absolute; bottom: -30%; left: -25%; width: 130%; height: 130%;
padding-top: 2.5rem; filter: drop-shadow(12px 12px 24px rgba(0,0,0,0.1));`

**The card body** — a rectangle rotated 90° about its own origin, which is how it
ends up portrait inside a landscape viewBox:

```html
<mask id="issMask" maskUnits="userSpaceOnUse" x="0" y="0" width="215" height="350"
      style="mask-type: alpha">
  <rect x="215" y="0" width="350" height="215" rx="14" transform="rotate(90 215 0)"
        fill="url(#issPaint0)"/>
</mask>
<g mask="url(#issMask)">
  <rect x="215" y="0" width="350" height="215" rx="14" transform="rotate(90 215 0)" fill="white"/>
  …blob, rings…
</g>
```

`issPaint0` is `linearGradient` from (214.829, 1.188) to (565.37, 212.212),
`userSpaceOnUse`, stops `#00724A` → `#005A3A`. It is only ever used as a mask, so
its colours never appear — but the mask is opaque either way, and reproducing it
keeps the geometry identical.

**The blob** — one path under `filter: url(#issBlur)` where `issBlur` is
`<feGaussianBlur stdDeviation="50">` over a filter region of
`x="-175.435" y="-171.238" width="637.664" height="612.399"`:

```
M-63.7146 137.993L-73.1158 178.072C-76.6106 192.971 -76.1495 208.525 -71.7783 223.191
L-47.5665 304.422C-34.6594 347.726 23.8202 354.514 46.3042 315.319
C56.2932 297.905 75.5036 287.898 95.4982 289.693L146.099 294.234
C182.867 297.534 218.096 278.734 235.823 246.352C246.252 227.301 263.031 212.51 283.24 204.553
L290.227 201.802C354.815 176.371 381.68 99.4603 346.973 39.346L338.764 25.1282
C332.069 13.5323 323.568 3.07816 313.581 -5.84065L264.246 -49.8995
C218.553 -90.7051 145.947 -70.2786 128.233 -11.6346C118.502 20.5778 90.4446 43.8435 56.9877 47.4421
L36.2186 49.676C-12.4647 54.9123 -52.5327 90.3228 -63.7146 137.993Z
```

Filled with `issPaint1`: `linearGradient` from (−101.512, 266.548) to (333.233, 15.5483),
`userSpaceOnUse`, stops `#E1FF25` @0.25, `#55F5A3` @0.5, `#3FF7EC` @0.644.
Class `iss-blob`, `transform-origin: 120px 180px`,
`animation: iss-ambientDrift 12s ease-in-out infinite alternate`.

**The rings** — six circles at `cx="9.497" cy="340.5"`, radii 150, 200, 250, 300,
350, 400, each `fill="#D9D9D9" fill-opacity="0.01"` and each in its own `<g>` with a
filter that produces a 5px offset outer shadow at 2% black plus a 10px inner shadow
at 15% white. They are almost invisible individually; together they give the card
face its subtle banding.

Wrap all six in:
`<g class="transition-transform duration-700 ease-in-out group-hover:translate-x-4 group-hover:-translate-y-4">`

**Card face details** — a chip and a contactless symbol, both `fill="white"`, drawn at
roughly (150, 60) in viewBox space. The contactless symbol is four nested arcs of
increasing radius; the chip is a `36 × 47` rounded rectangle (`rx="6"`) subdivided by
a horizontal and a vertical line into six pads.

### 5.5 Acquiring card illustration

A checkout form being filled in, over a blurred blob backdrop.

**Container** — same as §5.4 but `justify-content: flex-end; align-items: center`.

**Backdrop** — `viewBox="0 0 280 400"`, `preserveAspectRatio="xMidYMid slice"`,
sized `width: 140%; height: 150%; top: 20%; left: -20%`, and masked with
`mask-image: linear-gradient(transparent 0%, #000 30% 100%)` so the blob fades in
from the top rather than starting hard.

```html
<rect width="280" height="400" fill="white"/>
<g filter="url(#acqBlur)" class="acq-blob">
  <path d="M180 340L210 330C230 324 245 314 255 302L300 260C325 235 310 190 275 188
           C260 187 248 178 243 164L230 130C220 105 197 88 170 87C155 86 140 80 128 70
           L124 66C85 30 22 38 -8 72L-15 82C-20 90 -24 99 -27 108L-38 150
           C-48 195 -12 235 32 228C55 225 78 233 90 252L98 264C117 296 155 311 190 305Z"
        fill="url(#acqPaint1)"/>
</g>
```

`acqBlur` is `feGaussianBlur stdDeviation="40"` over region
`x="-140" y="-30" width="540" height="480"`.
`acqPaint1` runs from (300, 330) to (−20, 80), stops `#3FF7EC` @0.2, `#55F5A3` @0.5,
`#E1FF25` @0.8.

`.acq-blob` — `transform-origin: 140px 240px;
animation: acq-ambientDrift 14s ease-in-out infinite alternate`.

Five rings at `cx="140" cy="380"`, radii 100–300 in steps of 50, same faint treatment
as §5.4, wrapped in
`<g class="transition-transform duration-700 ease-in-out group-hover:translate-x-3 group-hover:-translate-y-3">`.

**The checkout panel** — a white card, `border-radius: 11px`,
`box-shadow: 0 4px 24px rgba(0,0,0,0.08)`, `position: absolute; top: 50%; right: -8%;
width: 100%; transform: translateY(-50%); overflow: hidden`. Draw its contents as SVG:

| Element | Spec |
|---|---|
| Amount | `$1000` at 24px weight 500 `#000`, followed by ` / month` at 13px `#737373` |
| Field label | `Card Number` — 12px, weight 500, `#000` |
| Field box | `1px solid #e2e0d6`, `border-radius: 8px`, height 40px |
| Card number text | `1234 1234 1234 1234`, `--font-display`, 14px, `fill: #000`, `letter-spacing: 1.5px`, split into **four separate `<g>` groups** each starting at `opacity: 0` |
| Network marks | Four 26 × 16 rounded rectangles at the field's right edge |
| Second row | `Expiration` / `MM/YY` and `CVC` / `CVC` in two half-width fields |
| Button | Full-width, `#f5f3eb` fill, `border-radius: 8px`, height 40px, label `Pay` at 13px weight 500 |

The reveal sequence (this is the character of the card — see §18):

```css
.acq-digitGroup { opacity: 0; }
.acq-digit1 { animation: acq-revealDigit 0.4s ease-out 0.8s forwards; }
.acq-digit2 { animation: acq-revealDigit 0.4s ease-out 1.6s forwards; }
.acq-digit3 { animation: acq-revealDigit 0.4s ease-out 2.4s forwards; }
.acq-digit4 { animation: acq-revealDigit 0.4s ease-out 3.2s forwards; }
.acq-expiryText { opacity: 0; animation: acq-revealDigit 0.4s ease-out 4.0s forwards; }
.acq-cvvText    { opacity: 0; animation: acq-revealDigit 0.4s ease-out 4.5s forwards; }
.acq-primaryNetworkMark   { animation: acq-slideNetwork 0.5s ease-in-out 1.2s forwards; }
.acq-secondaryNetworkMarks{ animation: acq-fadeOutLogos 0.4s ease-out 1.2s forwards; }

@keyframes acq-revealDigit  { from { opacity: 0; } to { opacity: 1; } }
@keyframes acq-fadeOutLogos { from { opacity: 1; } to { opacity: 0; } }
@keyframes acq-slideNetwork { from { transform: translateX(0); } to { transform: translateX(87px); } }
```

The four network marks start clustered at the right of the field. At 1.2s the primary
one slides 87px right while the other three fade out — the effect is a card being
recognised. Give the marks invented two-letter labels; do not reproduce real network
branding.

### 5.6 Credit card illustration

Structurally identical to §5.4 with three differences:

- `viewBox="0 0 350 350"`, `width: 110%; height: 110%; top: 0; left: 1.5rem;
  overflow: visible`
- The card rect is `y="188" width="350" height="215" rx="14"` — **not rotated**, so
  the card lies landscape at the bottom of the frame
- The blob gradient `credPaint1` runs (394.952, 471.038) → (−24.0349, 194.535) with
  stops `#E1FF25` @0.25, `#55F5A3` @0.5, **`#FF9F46` @0.755** — the warm orange stop
  is unique to this card and is what makes credit read differently from the other three

Mask gradient `credPaint0`: (−0.170772, 189.188) → (350.37, 400.212), `#00724A` → `#005A3A`.
Blob: `transform-origin: 175px 300px; animation: cred-ambientDrift 14s ease-in-out infinite alternate`.
Six rings at `cx="175" cy="513"`, radii 150–400 in steps of 50, hover shift
`+16px, −16px` over 700ms.

**The approval panel** — a white rounded rectangle above the card, drawn as SVG
primitives, `border-radius: 12px`, `1px solid #e2e0d6`:

| Row | Content |
|---|---|
| Top | A 28px circle filled `#c7f3ea` containing a 14px black check path `M5 9 L8 12 L14 5`, then `You're Approved!` at 14px weight 500 `#000`, and `Credit` at 13px `#737373` beneath |
| Divider | 1px `#e2e0d6` full width |
| Bottom | Three columns — `Credit Limit` / `$10,000`, `APR` / `20.99%`, `Rewards` / `3x pts`. Labels 12px `#737373`; values 18px weight 400 `#000` |

The bottom row is deliberately wider than the card and is clipped by
`overflow: hidden` on the container, so "Rewards / 3x pts" is cut mid-column. That
clipping is intentional and reads as a UI continuing beyond the frame.

### 5.7 Money-movement illustration

A vertical rail of payment-method pills scrolling upward forever behind a blurred blob.

**Backdrop** — identical geometry, filter and mask to §5.5; the only difference is
`transform-origin: 140px 240px` with
`animation: move-ambientDrift 16s ease-in-out infinite alternate`, and the gradient
`movePaint1` from (300, 330) to (−20, 80), stops `#3FF7EC` @0.2, `#55F5A3` @0.5,
`#E1FF25` @0.8.

**The pill track:**

```css
.move-pillTrack {
  position: absolute; top: 0; left: 0; right: 0;
  display: flex; flex-direction: column; gap: 8px; padding-top: 8px;
  will-change: transform; backface-visibility: hidden; transform: translateZ(0);
  animation: move-scrollPills 45s linear infinite;
}
@keyframes move-scrollPills {
  from { transform: translateY(0); }
  to   { transform: translateY(-50%); }
}
```

The `-50%` end state requires the pill list to be rendered **exactly twice** in
document order. Render it once and the rail jumps every 45s; render it three times
and it jumps at a different, harder-to-diagnose interval.

**Each pill:**

```css
.move-pill {
  display: flex; align-items: center; gap: 10px;
  margin: 0 20px; padding: 10px; flex-shrink: 0;
  background: #ffffff; border: 1px solid rgba(226, 224, 214, 0.6);
  border-radius: 12px; backdrop-filter: blur(6px);
}
.move-pillIcon {
  width: 36px; height: 36px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: #f5f3eb; border-radius: 8px;
}
.move-pillLabel { font-size: 13px; font-weight: 500; color: #000; white-space: nowrap; }
```

The eight labels, in order: **Check, Wire, ACH, RTP / FedNow, OCT, Stablecoin, AFT,
Payouts**. Then repeat all eight.

Each icon is a 30 × 30 line glyph on `viewBox="76 14 40 40"`, `stroke="#000"`,
`stroke-width="1.5"`, `fill="none"`:

| Label | Glyph |
|---|---|
| Check | Rectangle with a wavy signature line across the lower third |
| Wire | Two circles joined by a horizontal line with an arrowhead |
| ACH | A bank pediment: triangle roof over four vertical columns |
| RTP / FedNow | A lightning bolt |
| OCT | A card rectangle with a small `+` at its right edge |
| Stablecoin | A circle containing a `$` |
| AFT | A card rectangle with a right-pointing arrow inside |
| Payouts | A rounded rectangle containing a smaller filled rectangle and a coin |

**Fade-top** — an overlay, `position: absolute; top: 0; left: 0; right: 0;
height: 40%; z-index: 2; pointer-events: none;
background: linear-gradient(#ffffff 10%, transparent)`. Without it the pills appear
to be born abruptly at the top edge.

### 5.8 Products connector

The horizontal ribbon under the four product cards that ties them to the eight
capability tiles. `viewBox="0 0 1280 80"`, `preserveAspectRatio="xMidYMid meet"`,
`width: 100%; height: auto; display: block`.

**Container scrims** — `::before` is `linear-gradient(#f5f3eb, transparent)` at 30px
tall, `::after` is `linear-gradient(transparent, #f5f3eb)` at 30px, both
`position: absolute; left: 0; right: 0; z-index: 1; pointer-events: none`.

**Four stems** (card → rail), class `pconn-prodN pconn-prodLine`:

```
prod1  M153,0  L153,28  Q153,40  165,40
prod2  M478,0  L478,28  Q478,40  490,40
prod3  M803,0  L803,28  Q803,40  791,40
prod4  M1128,0 L1128,28 Q1128,40 1116,40
```

Stems 1 and 2 turn right; stems 3 and 4 turn left. That is what makes the ribbon
converge rather than run parallel.

**The rail** — `M87,40 L1193,40`, class `pconn-rail`.

**Eight caps** (rail → capability tile), class `pconn-capN pconn-capLine`:

```
cap1  M87,40   Q75,40   75,52   L75,80
cap2  M248,40  Q236,40  236,52  L236,80
cap3  M410,40  Q398,40  398,52  L398,80
cap4  M571,40  Q559,40  559,52  L559,80
cap5  M709,40  Q721,40  721,52  L721,80
cap6  M870,40  Q882,40  882,52  L882,80
cap7  M1032,40 Q1044,40 1044,52 L1044,80
cap8  M1193,40 Q1205,40 1205,52 L1205,80
```

Caps 1–4 curve left, caps 5–8 curve right.

**Twelve flow paths**, each a full route from one stem, along the rail, to one cap,
with `pathLength="100"`:

| # | Route | Delay |
|---|---|---|
| flow1 | prod1 → cap5 | 0s |
| flow2 | prod2 → cap1 (turning **left** out of the card: `Q478,40 466,40`) | 0.8s |
| flow3 | prod3 → cap8 (turning **right**: `Q803,40 815,40`) | 1.6s |
| flow4 | prod4 → cap3 | 2.4s |
| flow5 | prod1 → cap7 | 3.2s |
| flow6 | prod2 → cap6 | 4.0s |
| flow7 | prod3 → cap2 | 4.8s |
| flow8 | prod4 → cap4 | 5.6s |
| flow9 | prod1 → cap3 (`L386,40`) | 6.4s |
| flow10 | prod2 → cap8 | 7.2s |
| flow11 | prod3 → cap5 (`L733,40`) | 8.0s |
| flow12 | prod4 → cap7 (`L1056,40`) | 8.8s |

Two flow paths (2 and 3) exit their card in the *opposite* direction from the static
stem underneath them, which is why the moving dots occasionally appear to set off the
"wrong" way. That is in the original; it makes the traffic look routed rather than
choreographed.

```css
.pconn-prodLine, .pconn-capLine {
  fill: none; stroke: #e2e0d6; stroke-width: 1.5px; stroke-linecap: round;
  stroke-dasharray: 60; stroke-dashoffset: 60px;
  animation: pconn-drawLine 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.pconn-rail {
  fill: none; stroke: #e2e0d6; stroke-width: 1.5px; stroke-linecap: round;
  stroke-dasharray: 1106; stroke-dashoffset: 1106px;
  animation: pconn-drawLine 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
}
.pconn-flowBase {
  fill: none; stroke: #c8c5bc; stroke-width: 2px; stroke-linecap: round;
  stroke-dasharray: 5 95;
  animation: pconn-flowPath 3.5s linear infinite;
}
@keyframes pconn-drawLine { to { stroke-dashoffset: 0; } }
@keyframes pconn-flowPath { from { stroke-dashoffset: 100px; } to { stroke-dashoffset: 0; } }
```

Stem delays 0 / 80 / 160 / 240ms; cap delays 700ms rising by 50ms to 1050ms.

`stroke-dasharray: 5 95` against `pathLength="100"` is what makes each flow a single
short dot travelling the whole route rather than a dashed line.

**Mobile variant** (below `lg`): a two-column grid, `gap: 0.75rem`, each column a
`2 × 72` SVG holding one vertical stroke. `stroke-dasharray: 72`,
`animation: pconn-m-drawLine 0.75s cubic-bezier(0.22,1,0.36,1) forwards` with delays
0 and 80ms; flow strokes `stroke-dasharray: 5 95`,
`animation: pconn-m-flowPath 3.2s linear infinite` with delays 0 and 1.1s. Scrims are
16px and 12px.

### 5.9 Unified connector

The fan-in above the unity icon: eight curves from the capability tiles converging on
a single point. `viewBox="0 0 1280 240"`, container `max-width: 1280px; margin: 0 auto`.

Scrims: `::before` 60px `linear-gradient(#f5f3eb, transparent)`, `::after` 20px
`linear-gradient(transparent, #f5f3eb)`.

```html
<defs>
  <marker id="arrowhead" markerWidth="18" markerHeight="14" refX="9" refY="7" orient="auto">
    <path d="M0,0 L9,7 L0,14" fill="none" stroke="#e2e0d6" stroke-width="1.5"/>
  </marker>
</defs>
```

Eight cubic curves, every one ending at (640, 240) — the convergence point:

| # | Path | x-origin | Control y |
|---|---|---|---|
| 1 | `M75,0 C75,140 640,120 640,240` | 75 | 140 / 120 |
| 2 | `M236,0 C236,120 640,100 640,240` | 236 | 120 / 100 |
| 3 | `M398,0 C398,100 640,80 640,240` | 398 | 100 / 80 |
| 4 | `M559,0 C559,80 640,60 640,240` | 559 | 80 / 60 |
| 5 | `M721,0 C721,80 640,60 640,240` | 721 | 80 / 60 |
| 6 | `M882,0 C882,100 640,80 640,240` | 882 | 100 / 80 |
| 7 | `M1044,0 C1044,120 640,100 640,240` | 1044 | 120 / 100 |
| 8 | `M1205,0 C1205,140 640,120 640,240` | 1205 | 140 / 120 |

The x-origins are exactly the cap endpoints from §5.8, so the two graphics line up
across the section boundary. The control-point heights shrink toward the centre,
which makes the outer curves sweep wide and the inner ones drop almost straight —
the fan reads as gathering rather than as a starburst.

Each path is duplicated: once as a static `uconn-line` and once as a moving
`uconn-flow`, both with `pathLength="600"`.

```css
.uconn-line {
  fill: none; stroke: #e2e0d6; stroke-width: 1.5px;
  stroke-dasharray: 600; stroke-dashoffset: 600px;
  animation: uconn-drawLine 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.uconn-flow {
  fill: none; stroke: #c8c5bc; stroke-width: 2px;
  stroke-dasharray: 30 570; stroke-linecap: round;
  animation: uconn-flowCurve 2.4s linear infinite;
}
.uconn-stem {
  fill: none; stroke: #e2e0d6; stroke-width: 1.5px;
  stroke-dasharray: 80; stroke-dashoffset: 80px;
  animation: uconn-drawLine 0.6s cubic-bezier(0.22, 1, 0.36, 1) 1.4s forwards;
}
.uconn-stemFlow {
  fill: none; stroke: #c8c5bc; stroke-width: 2px;
  stroke-dasharray: 30 50; stroke-linecap: round;
  animation: uconn-flowStem 1s linear 1.5s infinite;
}
```

Line delays 0–560ms in 80ms steps; flow delays 0–2100ms in 300ms steps.

**Mobile variant**: `viewBox="0 0 320 120"`, container `max-width: 24rem`, two curves,
`stroke-dasharray: 320`, draw 1.35s with delays 0 and 120ms, flows
`stroke-dasharray: 28 292` over 2.4s with delays 0 and 450ms. Scrims 40px and 16px.

### 5.10 Unity icon

A 100 × 100 disc whose fill cycles through the three brand colours while five blurred
blobs orbit inside it, with the brand mark in black on top.

```html
<svg class="uni-circle" viewBox="0 0 40 40" fill="none">
  <defs>
    <clipPath id="uniClip">
      <circle cx="20" cy="20" r="19.799" transform="rotate(45 20 20)"/>
    </clipPath>
    <filter id="uniBlur"><feGaussianBlur stdDeviation="6"/></filter>
    <linearGradient id="uniMobile" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
      <stop offset="0%"   stop-color="#3FF7EC"/>
      <stop offset="50%"  stop-color="#55F5A3"/>
      <stop offset="100%" stop-color="#E1FF25"/>
    </linearGradient>
  </defs>

  <circle class="uni-bg" cx="20" cy="20" r="19.799" transform="rotate(45 20 20)"/>

  <g clip-path="url(#uniClip)" filter="url(#uniBlur)">
    <circle class="uni-blob1" cx="14" cy="12" r="12" fill="#3FF7EC"/>
    <circle class="uni-blob2" cx="28" cy="24" r="14" fill="#E1FF25"/>
    <circle class="uni-blob3" cx="10" cy="28" r="10" fill="#55F5A3"/>
    <circle class="uni-blob4" cx="26" cy="10" r="9"  fill="#3FF7EC"/>
    <circle class="uni-blob5" cx="20" cy="20" r="16" fill="rgba(255,255,255,0.1)"/>
  </g>

  <!-- brand mark from §5.1, scaled to sit centred, fill #000 -->
</svg>
```

The `r="19.799"` is `20 / √2` rounded — it is a circle *inscribed in a rotated square*,
which is why the `rotate(45)` is present even though rotating a circle is a no-op. It
matters only because the same value is reused by the clip path.

Container: `width: 100px; height: 100px; margin-bottom: 24px; display: inline-block;
position: relative`.

```css
.uni-bg    { animation: uni-bgPulse 12s ease-in-out infinite; }
.uni-blob1 { transform-origin: 20px 20px; mix-blend-mode: multiply;  opacity: 0.55;
             animation: uni-orbit1 7s  ease-in-out infinite, uni-pulse1 4s   ease-in-out infinite alternate; }
.uni-blob2 { transform-origin: 20px 20px; mix-blend-mode: multiply;  opacity: 0.5;
             animation: uni-orbit2 9s  ease-in-out infinite, uni-pulse2 5s   ease-in-out infinite alternate; }
.uni-blob3 { transform-origin: 20px 20px; mix-blend-mode: multiply;  opacity: 0.5;
             animation: uni-orbit3 11s ease-in-out infinite, uni-pulse3 6s   ease-in-out infinite alternate; }
.uni-blob4 { transform-origin: 20px 20px; mix-blend-mode: multiply;  opacity: 0.45;
             animation: uni-orbit4 8s  ease-in-out infinite, uni-pulse4 3.5s ease-in-out infinite alternate; }
.uni-blob5 { transform-origin: 20px 20px; mix-blend-mode: soft-light; opacity: 0.3;
             animation: uni-orbit5 13s ease-in-out infinite, uni-pulse5 7s   ease-in-out infinite alternate; }

@keyframes uni-bgPulse {
  0%   { fill: #55F5A3; }
  33%  { fill: #3FF7EC; }
  66%  { fill: #E1FF25; }
  100% { fill: #55F5A3; }
}
@keyframes uni-pulse1 { from { r: 10; } to { r: 14; } }
@keyframes uni-pulse2 { from { r: 12; } to { r: 16; } }
@keyframes uni-pulse3 { from { r: 8;  } to { r: 13; } }
@keyframes uni-pulse4 { from { r: 9;  } to { r: 12; } }
@keyframes uni-pulse5 { from { r: 14; } to { r: 18; } }
```

The five orbit keyframes, verbatim:

```css
@keyframes uni-orbit1 {
  0%   { transform: translate(0)      rotate(0)      scale(1);    }
  25%  { transform: translate(6px,-4px)  rotate(90deg)  scale(1.2);  }
  50%  { transform: translate(-2px,-7px) rotate(180deg) scale(0.9);  }
  75%  { transform: translate(-6px,3px)  rotate(270deg) scale(1.15); }
  100% { transform: translate(0)      rotate(360deg) scale(1);    }
}
@keyframes uni-orbit2 {
  0%   { transform: translate(0)       rotate(0)       scale(1.1);  }
  25%  { transform: translate(-5px,5px)  rotate(-90deg)  scale(0.85); }
  50%  { transform: translate(4px,6px)   rotate(-180deg) scale(1.25); }
  75%  { transform: translate(6px,-4px)  rotate(-270deg) scale(0.95); }
  100% { transform: translate(0)       rotate(-360deg) scale(1.1);  }
}
@keyframes uni-orbit3 {
  0%   { transform: translate(0)       rotate(0)      scale(1);    }
  20%  { transform: translate(7px,2px)   rotate(72deg)  scale(1.3);  }
  40%  { transform: translate(3px,-6px)  rotate(144deg) scale(0.8);  }
  60%  { transform: translate(-5px,-3px) rotate(216deg) scale(1.15); }
  80%  { transform: translate(-4px,5px)  rotate(288deg) scale(0.9);  }
  100% { transform: translate(0)       rotate(360deg) scale(1);    }
}
@keyframes uni-orbit4 {
  0%   { transform: translate(2px,-2px)  rotate(0)      scale(0.9);  }
  33%  { transform: translate(-6px,-5px) rotate(120deg) scale(1.2);  }
  66%  { transform: translate(5px,4px)   rotate(240deg) scale(1.05); }
  100% { transform: translate(2px,-2px)  rotate(360deg) scale(0.9);  }
}
@keyframes uni-orbit5 {
  0%   { transform: translate(0)      rotate(0)       scale(1.2);  }
  25%  { transform: translate(4px,6px)   rotate(-60deg)  scale(0.85); }
  50%  { transform: translate(-6px,2px)  rotate(-120deg) scale(1.3);  }
  75%  { transform: translate(3px,-5px)  rotate(-180deg) scale(1);    }
  100% { transform: translate(0)      rotate(-240deg) scale(1.2);  }
}
```

`uni-orbit5` ends at `-240deg`, not `-360deg` — it does not close its own loop, so the
fifth blob visibly jumps once per 13s cycle. That is in the original. Reproduce it or
fix it, but know that you are choosing.

Below 1024px: `.uni-bg { fill: url(#uniMobile); animation: none; }`, blobs 1–5
`display: none`, and the blur filter removed.

### 5.11 Arrows, glyphs and small icons

**Card arrow** (20 × 20, appears on hover, 22 instances):

```html
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"
     class="-translate-x-2 opacity-0 duration-200 ease-in-out
            group-hover:translate-x-0 group-hover:opacity-100">
  <path d="M4 10H16M11 5L16 10L11 15" stroke="black" stroke-width="1.5"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

For light-on-dark contexts use `stroke="white"`.

**Text-link arrow** (20 × 20, 3 instances) — same path, but the class is
`inline-block duration-200 ease-in-out group-hover:translate-x-1`.

**Play triangle** (24 × 24, inside a 40 × 40 circular surface):

```html
<svg viewBox="0 0 24 24" class="ml-0.5 h-6 w-6" fill="white">
  <path d="M8 5v14l11-7z"/>
</svg>
```

**Menu icon** (below `lg` only), `viewBox="0 0 16 14"`, three 2px-round horizontal
strokes at y = 2, 7, 12 spanning x = 1 to 15, `stroke="black"`.

**Benefit icons** (three, in the unified-platform section):

| Icon | viewBox | Geometry |
|---|---|---|
| Stopwatch | `0 0 28 28` | Circle `cx=14 cy=15.1667 r=10` `stroke-width=1.5`; a 4px stem and 8px crossbar on top; a hand from centre to (14, 8) in a `<g class="launch-hand">` with `transform-origin: 14px 15.1667px` |
| Two figures | `0 0 32 32` | Two circles (r=4 at (12,10), r=3.2 at (21,11)) each over a shoulder arc; the right figure wrapped in `<g class="diff-rightFigure">` |
| Star | `0 0 32 32` | A five-point star outline centred (20.667, 9.9) plus three short motion ticks to its lower left, star wrapped in `<g class="innov-star">` with `transform-origin: 20.667px 9.9px` |

```css
.launch-hand      { animation: launch-sweep 2s cubic-bezier(0.4,0,0.2,1) infinite; }
.diff-rightFigure { animation: diff-stepOut 2.5s ease-in-out infinite; }
.innov-star       { animation: innov-spin 5s linear infinite; }

@keyframes launch-sweep { 0% { transform: rotate(0); } 80%,100% { transform: rotate(360deg); } }
@keyframes diff-stepOut { 0% { transform: translate(0); } 40%,60% { transform: translate(3px); } 100% { transform: translate(0); } }
@keyframes innov-spin   { from { transform: rotate(0); } to { transform: rotate(360deg); } }
```

**Developer feature icons** (four, 24 × 24 inside a 40 × 40 rounded-8px `#e2e0d6` tile):

| Icon | Geometry |
|---|---|
| API | A hexagon outline with three vertices dotted |
| Webhooks | A right-pointing triangle inside a rounded square, with a trailing chevron |
| Sandbox | Two overlapping rounded rectangles, the rear one offset up-left by 3px |
| Security | A padlock: 12 × 9 rounded body with a 7px semicircular shackle |

All `stroke="#000"`, `stroke-width="1.5"`, `fill="none"`.

**Button arrow** — a two-line SVG appended to `.button`:

```css
.button-arrow { margin-left: 8px; stroke: currentColor; }
.button-arrow line:last-child { opacity: 0; }
.button:hover .button-arrow line:last-child {
  opacity: 1; stroke-dasharray: 2 4; animation: dash 10s linear infinite;
}
@keyframes dash { to { stroke-dashoffset: 80px; } }
```

The first line is the arrowhead, always visible; the second is the tail, which
appears on hover as a dotted trail that keeps moving.

### 5.12 Industry photographs (eight)

Each renders at 265 × 265 in a `border-radius: 12px` frame with
`transform: scale(1)` at rest. Replace each photograph with a **CSS gradient plus a
line motif in inline SVG** that signals the subject without depicting it.

Common structure for all eight:

```
background: <gradient>;
border-radius: 12px;
position: relative;
overflow: hidden;
```

with a centred inline SVG at 45% of the frame, `stroke: rgba(0,0,0,0.28)`,
`stroke-width: 1.5`, `fill: none`, `stroke-linecap: round`.

| # | Card | Gradient | Motif |
|---|---|---|---|
| 1 | AP & Bill Pay | `linear-gradient(155deg, #d9d2c6 0%, #c4b8a6 55%, #a89b86 100%)` | Three stacked rectangles of decreasing width, tied by two vertical strap lines |
| 2 | Spend Management | `linear-gradient(150deg, #e6ddd0 0%, #c9b9a4 45%, #8f7f6b 100%)` | A long horizontal table line with three plate circles and a small vase triangle above centre |
| 3 | Fleet | `linear-gradient(160deg, #cfd6d8 0%, #aab5b8 50%, #7d8a8e 100%)` | A van silhouette in three straight segments plus two wheel circles, with a fuel-nozzle L-shape at its rear |
| 4 | Travel and OTAs | `linear-gradient(150deg, #e0d5c4 0%, #bda88c 50%, #8a7358 100%)` | A counter line, a rolling-case rectangle with a handle arc, and three pendant lamps as short verticals ending in circles |
| 5 | Platforms and Marketplaces | `linear-gradient(155deg, #d5d9cf 0%, #b0b5a6 50%, #7f8577 100%)` | A doorstep step-line with a bag trapezoid and two cup circles beside it |
| 6 | Embedded Finance | `linear-gradient(150deg, #e4dcd2 0%, #c8b9a8 50%, #93816e 100%)` | A counter line with a card-terminal rectangle at 15° and a cup circle with a saucer arc |
| 7 | Branded Credit | `linear-gradient(160deg, #d2ccc2 0%, #ada496 50%, #6f6a60 100%)` | A shopfront: a tall rectangle frame with a smaller inner rectangle and a hanging-rail line |
| 8 | Vertical SaaS | `linear-gradient(150deg, #ded6c8 0%, #bfb3a0 50%, #8d8271 100%)` | A desk line, a laptop trapezoid, a rolled-tube cylinder and a hard-hat semicircle |

All eight gradients are warm, desaturated, and mid-value so they read as photographs
at thumbnail size and never compete with the card text above them. The zoom on hover
(§12.3) applies to this element.

### 5.13 Article thumbnails (three)

405 × 270, `border-radius: 12px`. Each is a soft radial field with a composed
wordmark row centred on it.

| # | Field | Content |
|---|---|---|
| 1 | `radial-gradient(120% 90% at 50% 25%, #ffffff 0%, #ffffff 55%, rgba(225,255,37,0.55) 78%, rgba(85,245,163,0.75) 100%)` | The §5.1 lockup at 60% scale, then a 16px `×` in `#b2b2b2`, then customer wordmark 1 from §5.2 |
| 2 | `radial-gradient(110% 95% at 50% 45%, #ffffff 0%, #ffffff 52%, rgba(63,247,236,0.7) 100%)` | The lockup at 40% scale on the upper line; beneath it `Built for Travel Payments` at 26px weight 400 `#000` |
| 3 | `radial-gradient(115% 95% at 50% 40%, #ffffff 0%, #ffffff 50%, rgba(63,247,236,0.75) 100%)` | `Capability Comparison` at 26px weight 400 `#000`; beneath it a row of three marks at 14px separated by `vs` in 12px `#b2b2b2` |

The white centre must reach at least 50% before any colour appears, or the wordmarks
lose contrast.

### 5.14 Customer media panels (two)

Replace each video with an **animated CSS panel** at `aspect-ratio: 16 / 9`,
`border-radius: 12px`, `overflow: hidden`, `background: #000000`.

```css
.media-panel {
  position: relative;
  background:
    linear-gradient(115deg, #1b2a2f 0%, #24343a 45%, #16232a 100%);
}
.media-panel::after {
  content: "";
  position: absolute; inset: 0;
  background: linear-gradient(105deg,
    transparent 35%,
    rgba(255,255,255,0.10) 48%,
    rgba(255,255,255,0.16) 52%,
    transparent 65%);
  transform: translateX(-60%);
  animation: media-sheen 7s ease-in-out infinite;
}
@keyframes media-sheen {
  0%, 12%  { transform: translateX(-60%); }
  60%,100% { transform: translateX(60%);  }
}
```

Over that panel:

1. **The partner wordmark**, white, top-left, 24px from the edges — recipes in §5.2.
2. **The play control**, bottom-left, 24px inset (32px at `md`):

```css
.media-play {
  width: 40px; height: 40px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  transition: transform 200ms;
}
.group\/video:hover .media-play { transform: scale(1.1); }

@media (max-width: 1023px) {
  .media-play { backdrop-filter: none; background: rgba(0,0,0,0.45); }
}
```

3. **A caption strip**, centred on the lower third: a `rgba(0,0,0,0.72)` pill,
   `border-radius: 4px`, `padding: 4px 10px`, holding white 13px text, with a 2px
   `#3ff7ec` underline beneath it. Captions are in §22.9.

The original's videos are `preload="none"` with **no poster**, so a visitor sees a
black tile until they interact. The panel above is therefore not a downgrade — it is
strictly more finished than the original's resting state.
---

## 6. Announcement bar

The first element on the page, above the navigation, inside the hero wrapper.

**Element** — a single `<a>`, full width, 38px tall:

```
group relative z-20 block w-full bg-black/5 px-3 py-2.5 text-center text-xs
font-medium duration-200 hover:bg-black/10
```

**Inner** — `relative mx-auto flex max-w-screen-xl items-center justify-center px-5`,
holding a `<p>` with the copy from §22.2 followed by the dark arrow glyph from §5.11
at 16 × 16 with `class="ml-1 h-4 duration-200 group-hover:ml-2"`.

| Property | Value |
|---|---|
| Height | 38px |
| Background | `rgba(0, 0, 0, 0.05)` over bone |
| Background on hover | `rgba(0, 0, 0, 0.10)` |
| Text | 14px (`text-xs`), weight 500, `#000000` |
| Transition | 200ms |
| Arrow shift on hover | `margin-left` 4px → 8px |

The arrow's nudge is a margin change, not a transform, so the text does not move —
only the gap grows. Using `translate` here shifts the arrow out of the centred block
and the whole bar appears to drift.

The bar scrolls away with the page. It is not fixed.

---

## 7. Navigation

### 7.1 Structure

```html
<nav class="z-20 relative w-full bg-transparent">
  <div class="px-5">
    <!-- lockup | links | actions -->
  </div>
</nav>
```

Height 71px, background transparent, sitting directly on the hero orb.

| Zone | Content |
|---|---|
| Left | The §5.1 header lockup, wrapped in an `<a href="/">` |
| Centre | Products · Use Cases · Customers · Company · Docs · Pricing |
| Right | Log In, Contact Sales |

The centre cluster and the right cluster live in a container classed
`hidden items-center justify-end text-xs lg:flex`. Below 1024px it computes to
`display: none` and a `p-3` icon button (§5.11 menu glyph) takes its place.

### 7.2 Link and button classes

Plain nav items (Customers, Docs, Pricing):

```
whitespace-nowrap rounded-card mx-0.5 block cursor-pointer px-3 py-2.5 text-xs
hover:bg-white/90
```

> The original spells this class `whitespce-nowrap` — a typo that matches no rule and
> does nothing. Use the correct spelling shown above. This is noted only so that a
> diff against the original does not look like a transcription error.

Log In:

```
whitespace-nowrap rounded-card group relative mr-1.5 ml-0.5 block cursor-pointer
bg-white/90 px-4 py-2.5 text-xs duration-200 hover:bg-white
```

Contact Sales:

```
whitespace-nowrap rounded-card group relative mr-1.5 ml-0.5 block cursor-pointer
bg-black px-4 py-2.5 text-xs text-white duration-100 hover:bg-black/90
```

Note the asymmetric durations: Log In transitions over 200ms, Contact Sales over
100ms. The primary action responds visibly faster than the secondary one.

### 7.3 Dropdowns

Three items open a panel on hover. Panels use `--radius-nav` (28px) and
`--drop-shadow-nav` (`0 10px 20px rgba(0,0,0,0.08)`).

**Products** — 4 rows, each `hover:bg-bone flex items-center space-x-2 rounded-lg px-2 py-1.5`
with a leading 20px icon:

Issuing · Acquiring · Unified Payments · Credit

**Use Cases** — 10 rows, each `hover:bg-bone flex items-center rounded-lg px-2 py-1.5 font-medium`:

Agentic Commerce · AP Automation · Fleet · Money Movement · Spend Management ·
Embedded Finance · Branded Credit · Travel · Vertical SaaS · Disbursements

**Company** — 4 rows, same classes as Use Cases:

About · Careers · Blog · Press

The panel open/close transition was **not captured** during extraction. Use the
`--ds-duration-default` of 200ms with `--ease-out`; that is consistent with the rest
of the nav but is not a measured value from the original.

### 7.4 The header does not stick — and that is the specification

Measured at `scrollY` = 0, 100, 400, 1200 and 4000, the nav's computed `position`
stays `relative`, its background stays `rgba(0,0,0,0)`, its box-shadow stays `none`,
its class list never changes, and its `getBoundingClientRect().top` tracks
`38 − scrollY` exactly.

**Do not add `position: sticky`.** Do not add a scroll listener, a shrink-on-scroll,
a blur backdrop, or a shadow that fades in. The header scrolls off and never returns;
past the hero there is no persistent navigation at all.

This is the single easiest place to "improve" this page and thereby stop matching it.
A sticky header would also fight the hero orb, which is drawn behind the nav and
relies on the nav being transparent and going away.

---

## 8. Hero

### 8.1 Frame

```html
<div class="bg-bone relative flex h-[700px] flex-col overflow-hidden antialiased
            lg:h-[800px]">
  <!-- announcement bar (§6) -->
  <!-- nav (§7) -->
  <div class="orb-container"><!-- §5.3 --></div>
  <main class="absolute inset-0 flex items-center justify-center px-5 lg:px-10">
    <!-- headline, paragraph, buttons -->
  </main>
</div>
```

| Property | 1440 | 768 | 390 |
|---|---|---|---|
| Height | 800px | 800px | 700px |

The announcement bar and nav are in normal flow at the top; the orb and the `<main>`
are both `position: absolute; inset: 0`, so the headline is centred on the **whole**
hero including the space behind the nav. That is why the headline sits slightly below
optical centre — it is centred in 800px, not in the 691px left under the header.

### 8.2 The rotating headline

```html
<h1 class="head-headline font-display mx-auto max-w-screen-xl text-[11vw]
           leading-[1.05] md:text-6xl lg:text-[100px]">
  <span class="sr-only">The only payments platform built for you.</span>
  <span aria-hidden="true">
    <span class="head-rotatingLine">
      <span class="head-word1 head-word">Issuing</span>
      <span class="head-word2 head-word">Acquiring</span>
      <span class="head-word3 head-word">Credit</span>
      <span class="head-word4 head-word">Money Movement</span>
      <span class="head-word5 head-word hidden md:inline">Real-Time Ledgering</span>
      <span class="head-word5 head-word inline md:hidden">Ledgering</span>
      <span class="head-word6 head-word">Overtone</span>
    </span>
    <span class="head-staticLine">Built for You.</span>
  </span>
</h1>
```

Two things to notice in that markup:

1. **The accessible name is a separate sentence.** Screen readers get one clean
   sentence, `The only payments platform built for you.`, and the entire animated
   stack is `aria-hidden`. Without this, a screen reader announces seven fragments.
2. **Word 5 is duplicated** with `hidden md:inline` and `inline md:hidden`, because
   "Real-Time Ledgering" does not fit on one line below 768. Both copies carry the
   same `head-word5` variant class, so both get the same 10s delay — only one is ever
   displayed.

**Every `head-wordN` composes `head-word`.** See §5.0.

```css
.head-headline     { text-align: center; position: relative; }
.head-rotatingLine { display: block; position: relative; height: 1.15em; overflow: hidden; }
.head-staticLine   { display: block; }

.head-word {
  position: absolute; left: 0; width: 100%;
  opacity: 0;
  animation: head-rotateWord 15s cubic-bezier(0.16, 1, 0.3, 1) infinite;
}
.head-word1 { animation-delay: 0s;    }
.head-word2 { animation-delay: 2.5s;  }
.head-word3 { animation-delay: 5s;    }
.head-word4 { animation-delay: 7.5s;  }
.head-word5 { animation-delay: 10s;   }
.head-word6 { animation-name: head-rotateWordLast; animation-delay: 12.5s; }

@keyframes head-rotateWord {
  0%    { opacity: 0; transform: translateY(80%);  }
  2%    { opacity: 1; transform: translateY(0);    }
  15%   { opacity: 1; transform: translateY(0);    }
  17.5% { opacity: 0; transform: translateY(-40%); }
  100%  { opacity: 0; transform: translateY(-40%); }
}
@keyframes head-rotateWordLast {
  0%     { opacity: 0; transform: translateY(80%);  }
  2%     { opacity: 1; transform: translateY(0);    }
  15%    { opacity: 1; transform: translateY(0);    }
  16.67% { opacity: 0; transform: translateY(-40%); }
  100%   { opacity: 0; transform: translateY(-40%); }
}
```

The arithmetic: six words × 2.5s stagger = 15s, which is the cycle length, so the
loop closes. Each word is visible from 2% to 15% of 15s — 0.3s in, 1.95s held, 0.375s
out. The sixth word uses a keyframe that exits 0.83% earlier so the brand name clears
the line just before word 1 re-enters; with the standard keyframe the two would
overlap for ~125ms.

`height: 1.15em` on the rotating line with `overflow: hidden` is what clips the words
as they slide. The static line below is in normal flow.

### 8.3 Sub-paragraph

```
mx-auto max-w-2xl pt-6 text-center text-base
```

18px / 30px, colour `oklab(0 0 0 / 0.7)` — i.e. black at 70% opacity, not a grey.
Copy in §22.3.

### 8.4 Buttons

Two links, centred, 20px apart, 48px above the paragraph.

```html
<a class="button button-black-arrow group" href="…">Explore the Platform</a>
<a class="button button-white-arrow group" href="…">Talk to an Expert</a>
```

```css
.button {
  display: inline-flex; align-items: center;
  padding-inline: 16px; padding-block: 8px;
  white-space: nowrap;
  border-radius: 3.40282e38px;               /* pill */
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.button:focus {
  outline: 2px solid transparent; outline-offset: 2px;
  box-shadow: 0 0 0 2px #f5f3eb, 0 0 0 4px #55f5a3;
}
.button-black-arrow {
  background-color: #000000; color: #ffffff;
  padding-inline: 24px; padding-block: 8px; position: relative;
}
.button-white-arrow {
  background-color: color-mix(in oklab, #ffffff 90%, transparent);
  color: #000000;
  padding-inline: 24px; padding-block: 8px; position: relative;
}
```

Both carry the §5.11 button arrow. The focus ring is **green**, not black — it is the
only place on the page where an accent colour is used for a UI state.

Related variants exist in the stylesheet and are used elsewhere on the site:
`.button-transparent` (2px black border, green fill on hover), `.button-green`
(green, inverts to black on hover), `.button-ash-arrow` (`#e2e0d6` fill),
`.button-green-arrow` (`#4eed9b` fill), `.button-gradient-arrow` (yellow → green →
cyan diagonal), and `.button-large` (20px / 12px padding). None appears on this page.

---

## 9. Logo wall

| Property | Value |
|---|---|
| Section | `bg-bone flex w-full flex-col pt-2 pb-10 antialiased` |
| Height | 244px |
| Eyebrow | 16px / 24px, `#000000`, centred, copy in §22.4 |
| Grid | `mx-auto grid w-full max-w-screen-xl grid-cols-3 gap-x-3 gap-y-5 px-5 sm:grid-cols-6` |
| Cell | `flex items-center justify-center` |
| Marks | Twelve, from §5.2 |

Column counts: **6 at ≥640px, 3 below.** The wall is 6 × 2 on desktop and tablet, and
3 × 4 on mobile — it never becomes a single column.

Row gap 20px, column gap 12px at 1440; at 390 the gaps swap to 20px row / 12px column
as measured. The first six marks are `loading="eager"`, the last six `loading="lazy"`
in the original; with inline SVG marks this distinction disappears.

---

## 10. Products

The most complex section on the page: heading, four illustrated cards, an animated
connector, and eight capability tiles.

### 10.1 Frame

```
section: bg-bone px-5 pt-16 pb-0 antialiased
inner:   relative mx-auto max-w-screen-xl
```

Height 1011px. This section's rule is on the section's own inner wrapper rather than
a `border-t` — it is the first ruled section and its rule sits at y = 1108.

### 10.2 Heading

| Element | Spec |
|---|---|
| `h2` | `font-display max-w-7xl text-2xl lg:text-6xl` → 70px / 80px at ≥1024, 40px / 50px below |
| Sub-paragraph | `pt-6 text-base`, 18px / 27px, `#000000` |

Copy in §22.5. The sub-paragraph is two sentences on two hard-wrapped lines — use a
`<br>` or two block elements, not a single wrapping paragraph, or the break lands
in the wrong place at 1440.

### 10.3 The four product cards

```
grid: mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4
card: group rounded-card flex aspect-[2/3] flex-col bg-white p-6 duration-300
      hover:-translate-y-2 hover:shadow-[0_18px_0_-8px_rgba(226,224,214,0.5)]
```

Each card is 305 × 458 at 1440 (a 2:3 aspect box).

**Card interior:**

```html
<div class="flex items-center justify-between">
  <h3 class="text-sm">Issuing</h3>
  <!-- §5.11 card arrow -->
</div>
<p class="pt-3 text-sm opacity-60">Launch and manage card programs with full control</p>
<div class="iss-container"><!-- §5.4 --></div>
```

`text-sm` here is **16px / 24px**, not 14px — see §3.2.

| # | Title | Body | Illustration |
|---|---|---|---|
| 1 | Issuing | Launch and manage card programs with full control | §5.4 |
| 2 | Acquiring | Accept and process payments with flexibility and at scale | §5.5 |
| 3 | Credit | Create branded credit programs with underwriting and rewards | §5.6 |
| 4 | Money Movement | Move funds across rails with speed and full visibility | §5.7 |

Hover, all four: lift 8px over 300ms, hard slab shadow (§3.5), arrow slides in from
−8px over 200ms `ease-in-out`, and the illustration's ring stack shifts up-and-right
over 700ms (16px for cards 1 and 3, 12px for cards 2 and 4).

### 10.4 Connector

The §5.8 graphic, in a wrapper classed `hidden py-1 lg:block`. Below 1024px this is
`display: none` and the mobile variant renders instead.

### 10.5 Capability tiles

```
grid: mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:mt-0 lg:grid-cols-8
tile: rounded-card bg-ash flex aspect-[3/2] flex-col items-center justify-center p-4
```

150 × 100 each at 1440, 12px gaps, `#e2e0d6` fill, centred 14px text.

Eight labels in order: **Unified Ledger · Stablecoin · Instant Payments · Virtual
Card Express · Capital Connect · Datashare · Spend Controls · Fraud Tools**

"Virtual Card Express" wraps to two lines in a 150px tile. That is correct — the
tiles are a fixed 3:2 box and the text centres within them.

Note `lg:mt-0`: at ≥1024 the tiles sit flush under the connector with no gap, because
the connector's own bottom scrim provides the visual separation. Below 1024 they get
16px of top margin.

---

## 11. Unified platform

The page's thesis statement, and its quietest section.

### 11.1 Frame

```
section: bg-bone px-5 pb-10 antialiased md:pb-16
```

Height 752px. Two children:

1. The §5.9 connector, in a `hidden lg:block` wrapper, 240px tall, occupying the top
   of the section
2. `relative mx-auto max-w-screen-xl text-center`, 448px tall

Note this section has **no top rule** — the connector arrives from the section above
and a rule would cut it.

### 11.2 Content stack

| Element | Spec |
|---|---|
| Unity icon | §5.10, 100 × 100, centred, `margin-bottom: 24px` |
| `h2` | `font-display mx-auto pb-5 text-2xl lg:text-6xl` → 70px / 80px |
| Sub-paragraph | 18px / 28px, `#000000`, centred |
| Benefits grid | `mx-auto mt-12 grid max-w-xs grid-cols-1 gap-8 sm:grid-cols-3 md:max-w-3xl` |

Copy in §22.6.

### 11.3 The three benefits

Each: a 28–32px animated icon (§5.11), then `h3` at **14px / 18px weight 500**, then
a paragraph at 14px / 22.75px weight 400. Centred, 32px gap, max width 768px.

| # | Title | Icon |
|---|---|---|
| 1 | Launch Faster | Stopwatch, hand sweeping 360° every 2s |
| 2 | Differentiate Easily | Two figures, the right one stepping 3px aside every 2.5s |
| 3 | Keep Innovating | Star, rotating 360° every 5s |

The three icon animations are deliberately unsynchronised (2s, 2.5s, 5s) so the row
never pulses in unison. Matching their durations makes the row feel like a loading
state.

---

## 12. Industry grid

### 12.1 Frame

```
section: bg-bone px-5 pt-10 pb-10 antialiased md:pb-20
inner:   border-ash relative mx-auto max-w-screen-xl border-t pt-16 sm:pt-24
```

Height 1294px. This is the first section with the standard `border-t` rule.

### 12.2 Heading

`h2` — `font-display max-w-3xl text-2xl lg:text-6xl`. Sub-paragraph 18px / 27px.
Copy in §22.7.

### 12.3 Cards

```
grid: mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4
card: group rounded-card bg-white p-5 duration-300 hover:-translate-y-2
```

305 × 431 at 1440, arranged 4 × 2.

**Note the difference from the product cards (§10.3):** these lift on hover but get
**no shadow**. Padding is 20px (`p-5`) rather than 24px. Adding the slab shadow here
makes the two grids read as the same component, which they are not.

```html
<div class="mb-5 flex flex-col justify-start text-black">
  <div class="flex items-start justify-between">
    <h3 class="text-sm">AP &amp; Bill Pay</h3>
    <!-- §5.11 arrow, class: ml-2 shrink-0 -translate-x-2 opacity-0 duration-200
         ease-in-out group-hover:translate-x-0 group-hover:opacity-100 -->
  </div>
  <p class="mt-2.5 text-sm opacity-60">Increase virtual card adoption, …</p>
</div>
<div class="relative aspect-square uc-card"><!-- §5.12 field --></div>
```

The arrow alignment differs too: `items-start` here versus `items-center` on the
product cards, because these titles can wrap to two lines.

```css
.uc-card { border-radius: 0.75rem; position: relative; overflow: hidden; }
.uc-card > * { transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
               transform: scale(1); }

@media (hover: hover) and (pointer: fine) {
  .group:hover .uc-card > * { transform: scale(1.08); }
}
```

The hover guard matters: without it, touch devices latch the zoom on tap and never
release it.

Eight cards, copy in §22.7.

---

## 13. Customers

### 13.1 Frame

```
section: bg-bone px-5 pt-16 pb-10 antialiased sm:pt-10 md:pb-20
inner:   border-ash relative mx-auto max-w-screen-xl border-t pt-16 sm:pt-24
```

Height 1172px.

**Heading row** — the `h2` (`max-w-3xl text-2xl lg:text-6xl`) with a sub-paragraph on
the left and a right-aligned text link on the same baseline:

```html
<a class="group flex shrink-0 items-center gap-2 …">
  View Customer Stories
  <!-- §5.11 text-link arrow -->
</a>
```

Copy in §22.8.

### 13.2 Media tiles

```
grid: mt-16 grid grid-cols-1 gap-5 lg:grid-cols-4
tile: col-span-2 (each) → two tiles fill the row
```

Each tile is 628 × 353 (16:9) and is built per §5.14.

```html
<div class="group/video relative aspect-video w-full">
  <div class="media-panel h-full w-full rounded-xl">…</div>
  <div class="absolute inset-0 flex cursor-pointer items-end justify-start p-6 md:p-8">
    <div class="media-play …">…</div>
  </div>
</div>
```

Note the named group `group/video` — the play control scales on hover of the tile,
not of the control itself, and a plain `group` would collide with the card groups
elsewhere in the section.

### 13.3 Quote cards

```
card: rounded-card col-span-1 flex aspect-[3/2] flex-col justify-between bg-white
      p-6 md:aspect-square md:p-8
```

305 × 305 at 1440 — square at `md` and above, 3:2 below. Four of them, in the same
grid as the media tiles.

Each holds a quotation at **18px / 28px** at the top and a customer mark at the
bottom, 80 × 24 to 100 × 40, from §5.2. `justify-between` pins the mark to the
bottom edge regardless of quote length, which is what keeps the four marks on one
optical line.

Quotes in §22.8.
---

## 14. Developer platform

The only two-column section on the page, and the only one with a dark surface.

### 14.1 Frame

```
section: bg-bone px-5 pt-10 pb-10 antialiased md:pb-20
inner:   border-ash relative mx-auto max-w-screen-xl border-t pt-16 sm:pt-28
grid:    grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20
```

Height 993px. Two 600px columns with an 80px gap at 1440; single column with a 48px
gap below 1024.

Note `sm:pt-28` — this is the only section that uses 112px of top padding rather than
96px.

### 14.2 Left column

| Element | Spec |
|---|---|
| `h2` | `font-display max-w-xl text-2xl lg:text-5xl` → **62px / 72px**, not 70px |
| Paragraph | 18px / 29.25px, `#000000`, max width 576px |
| Link | `group mt-5 inline-flex items-center gap-2 …` — `View the docs` + §5.11 arrow |
| Feature grid | `mt-12 grid max-w-lg grid-cols-2 gap-5 md:gap-10` |

This is the only `h2` on the page at `text-5xl`. It is smaller than its neighbours
because it sits beside a tall code panel and matching the 70px would push the column
out of balance.

**Four features**, each a 40 × 40 `#e2e0d6` tile with `border-radius: 8px` holding a
24px icon (§5.11), then `h3` at 14px / 18px weight 500, then a paragraph at
14px / 22.75px:

| # | Title | Body |
|---|---|---|
| 1 | GraphQL API | Unified GraphQL for cards, ledgers, payments, and more. |
| 2 | Real-Time Webhooks | Real-time events for transactions, authorizations, and state changes. |
| 3 | Robust Sandbox Environment | Production-mirroring sandbox for safer builds and faster iteration. |
| 4 | Enterprise-Ready Security | Built-in security and compliance that scales with your programs. |

Column gap 40px at 1440, 20px below `md`.

### 14.3 Right column — the code panel

A `#111111` panel, `border-radius: 20px`, full height of the column, with two stacked
blocks inside.

```css
.code-container {
  display: flex; flex-direction: column; gap: 20px;
  width: 100%; height: 100%; padding: 24px;
  font-family: var(--font-mono);
  font-size: 12px; line-height: 1.7;
}
.code-block {
  flex: 1; min-height: 0; padding: 20px; overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}
.code-label {
  margin-bottom: 12px;
  font-family: var(--font-display);
  font-size: 12px; font-weight: 500;
  letter-spacing: 0.02em;
  color: rgba(255, 255, 255, 0.3);
}
.code-line { white-space: pre; transition: opacity 0.2s ease-out; }
```

**Syntax palette** — these are the only saturated colours on the page outside the
brand accents:

| Class | Colour | Applies to |
|---|---|---|
| `.code-keyword` | `#c084fc` | `mutation` |
| `.code-type` | `#7dd3fc` | operation and field-set names |
| `.code-field` | `rgba(255,255,255,0.7)` | field names |
| `.code-string` | `#86efac` | quoted values |
| `.code-brace`, `.code-punct` | `rgba(255,255,255,0.25)` | `{ } ( ) :` |

**Block 1**, label `Query`:

```
mutation {
  createPaymentCard(
    input: {
      cardProductId: "cprod_1a2b3c"
      financialAccountId: "fa_9x8y7z"
    }
  ) {
    id
    last4
    status
    network
  }
}
```

**Block 2**, label `Response`:

```
{
  "data": {
    "createPaymentCard": {
      "id": "card_4f8a2e1b",
      "last4": "4289",
      "status": "ACTIVE",
      "network": "NETWORK_A"
    }
  }
}
```

Use an invented network label. Do not put a real card network's name here.

**The cursor** — the only motion in this section:

```css
.code-cursor {
  display: inline-block; vertical-align: text-bottom;
  width: 1px; height: 14px; margin-left: 2px;
  background: rgba(255, 255, 255, 0.5);
  animation: code-blink 0.8s step-end infinite;
}
@keyframes code-blink { 50% { opacity: 0; } }
```

`step-end` is what makes it a hard on/off blink rather than a fade. It sits at the
end of the last line of block 1.

`.code-line` carries an opacity transition, which suggests the original once revealed
lines progressively. In the shipped page every line is at full opacity from load —
there is no typewriter. Build it static.

---

## 15. Insights

### 15.1 Frame

```
section: bg-bone px-5 pt-16 pb-20 antialiased sm:pt-10
inner:   border-ash relative mx-auto max-w-screen-xl border-t pt-16 sm:pt-24
```

Height 809px. Heading row identical in structure to §13.1 — `h2` and sub-paragraph
left, a right-aligned `Explore Resources` link with the §5.11 arrow.

### 15.2 Cards

```
grid: mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3
```

Three cards, 405px wide, 32px gaps.

Each: the §5.13 thumbnail at 405 × 270 with `border-radius: 12px`, then the title at
**18px / 28px** weight 400 `#000000` with 20px of top margin. Cards lift 8px on hover
over 300ms, no shadow.

Titles in §22.10. All three wrap to three, three and two lines respectively at
405px — that is correct and is why the grid row is 689px tall rather than the 550px
the thumbnails alone would need.

---

## 16. Closing CTA

The page's second and last saturated moment.

### 16.1 Frame

```
section: bg-bone relative overflow-hidden px-5 pt-10 pb-40 antialiased sm:pt-10
inner:   border-ash relative mx-auto max-w-screen-xl border-t pt-16 text-center
```

Height 590px. Note `pb-40` — 160px of bottom padding, the largest on the page. It
exists to give the gradient band room below the buttons.

### 16.2 Content

| Element | Spec |
|---|---|
| `h2` | `font-display mx-auto max-w-3xl text-4xl lg:text-7xl` → **100px / 106px** |
| Paragraph | 18px / 29.25px, `oklab(0 0 0 / 0.6)`, centred, max width 768px |
| Buttons | Identical to §8.4 — same two labels, same classes |

This `h2` is the same size as the hero `h1`. It is the only other 100px type on the
page, and the symmetry is deliberate: the page opens and closes at the same volume.

Copy in §22.11.

### 16.3 The gradient band

Positioned `absolute -right-20 -bottom-20 -left-20 z-0`, 280px tall, extending 80px
beyond the viewport on three sides so the blur has nothing to clip against.

Above it sits a scrim: `pointer-events-none absolute inset-x-0 top-0`, 154px tall,
`background: linear-gradient(#f5f3eb, rgba(0,0,0,0))`.

**At ≥1024px** — an SVG whose path morphs on a SMIL timeline:

```html
<svg viewBox="0 0 4509 1029" preserveAspectRatio="none"
     class="absolute inset-0 hidden h-full w-full lg:block">
  <defs>
    <filter id="ctaBlur" x="0" y="0" width="4508.86" height="1028.1"
            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feGaussianBlur stdDeviation="60" result="effect1_foregroundBlur"/>
    </filter>
    <linearGradient id="ctaGrad" x1="120" y1="546.886" x2="4388.86" y2="546.886"
                    gradientUnits="userSpaceOnUse">
      <stop offset="0.338752" stop-color="#E1FF25" stop-opacity="0.8"/>
      <stop offset="0.5"      stop-color="#55F5A3"/>
      <stop offset="0.612937" stop-color="#3FF7EC" stop-opacity="0.8"/>
    </linearGradient>
  </defs>
  <g filter="url(#ctaBlur)">
    <path fill="url(#ctaGrad)">
      <animate attributeName="d" dur="8s" repeatCount="indefinite"
               calcMode="spline"
               keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
               values="
    M120 349.862L1187.22 120L2254.43 382.699L3321.65 218.512L4388.86 448.374V908.097H120Z;
    M120 180L1187.22 420L2254.43 150L3321.65 480L4388.86 250V908.097H120Z;
    M120 480L1187.22 100L2254.43 500L3321.65 120L4388.86 520V908.097H120Z;
    M120 349.862L1187.22 120L2254.43 382.699L3321.65 218.512L4388.86 448.374V908.097H120Z"/>
    </path>
  </g>
</svg>
```

The path is a five-point polyline closed to the bottom of the viewBox — a mountain
range whose peaks rise and fall. Blurred at 60px it reads as a soft aurora rather than
as geometry. The first and last `values` states are identical so the 8s loop closes
seamlessly.

The gradient's colour stops sit between 33.9% and 61.3%, so both far ends of the
4509-wide band are effectively transparent-to-edge. That is why the band fades out at
the viewport edges without any additional mask.

**Below 1024px** — the SVG is `hidden` and a plain CSS band takes its place:

```css
background: linear-gradient(to right,
  rgba(225, 255, 37, 0.45),
  rgba(85, 245, 163, 0.55),
  rgba(63, 247, 236, 0.45));
```

on an element classed `absolute inset-x-0 bottom-0 lg:hidden`. Static, no morph.

---

## 17. Footer

### 17.1 Frame

```
footer: bg-blackBG px-5 pt-16 pb-16 text-white antialiased
inner:  mx-auto max-w-screen-xl
```

Height 678px, background `#111111` — not pure black. On a page whose every other
surface is warm off-white, `#000` reads as a hole; `#111` reads as ink.

A visually hidden `<h2 class="sr-only">Footer</h2>` opens the region.

### 17.2 Layout

```
grid: grid grid-cols-2 gap-5 md:grid-cols-6
```

Six columns at ≥768px, two below. The first column holds the §5.1 footer badge at
48 × 48 and nothing else; the remaining five hold link lists.

Column heads: 14px / 18px weight 500 `#ffffff`.
Links: 14px / 18px weight 400 `#ffffff`, 36px apart vertically.

| Column | Links |
|---|---|
| Products | Issuing · Acquiring · Credit · Money Movement · Unified Payments |
| Use Cases | AP & Bill Pay · Spend Management · Fleet · Travel and OTAs · Platforms · Embedded Finance · Branded Credit · Vertical SaaS |
| Resources | Product Updates · Executive Playbooks · Support · Professional Network · Privacy · Terms |
| Developers | Documentation · API Reference · API Changelog · Status |
| Company | About · Press · Careers · Brand · Blog |

Each link carries the §5.11 arrow glyph at 20 × 20 in white.

### 17.3 Legal

Two paragraphs at the bottom, 12px / 20px `#ffffff`, 36px below the grid:

1. The copyright line, §22.12
2. The regulatory statement, §22.12 — with `across individual U.S. states` rendered
   as an underlined inline link

The regulatory paragraph runs to two lines at 1280px width. Keep it as one paragraph;
the original does not break it.

---

## 18. Animation index

Every animation on the page. See `evidence/animations.md` for the full keyframe
source and `evidence/keyframes-debranded.css` for the verbatim blocks.

**All of these start at page load.** None is scroll-triggered, none uses
`IntersectionObserver`, and none waits for the element to enter the viewport. By the
time a visitor reaches the products section, its connector has long finished drawing.

### 18.1 Play-once

| Animation | Target | Duration | Delay | Easing | § |
|---|---|---|---|---|---|
| `orb-riseIn` | Orb rings ×9 | 2600ms | 0 → 760ms | `cubic-bezier(.16,1,.3,1)` | §5.3 |
| `pconn-drawLine` | Product stems ×4 | 800ms | 0 → 240ms | `cubic-bezier(.22,1,.36,1)` | §5.8 |
| `pconn-drawLine` | Rail | 1200ms | 200ms | `cubic-bezier(.22,1,.36,1)` | §5.8 |
| `pconn-drawLine` | Caps ×8 | 800ms | 700 → 1050ms | `cubic-bezier(.22,1,.36,1)` | §5.8 |
| `uconn-drawLine` | Fan curves ×8 | 1500ms | 0 → 560ms | `cubic-bezier(.22,1,.36,1)` | §5.9 |
| `uconn-drawLine` | Centre stem | 600ms | 1400ms | `cubic-bezier(.22,1,.36,1)` | §5.9 |
| `acq-revealDigit` | Digit groups ×4 | 400ms | 800 → 3200ms | `ease-out` | §5.5 |
| `acq-revealDigit` | Expiry | 400ms | 4000ms | `ease-out` | §5.5 |
| `acq-revealDigit` | CVC | 400ms | 4500ms | `ease-out` | §5.5 |
| `acq-slideNetwork` | Primary mark | 500ms | 1200ms | `ease-in-out` | §5.5 |
| `acq-fadeOutLogos` | Other marks | 400ms | 1200ms | `ease-out` | §5.5 |
| `pconn-m-drawLine` | Mobile stems ×2 | 750ms | 0, 80ms | `cubic-bezier(.22,1,.36,1)` | §5.8 |
| `uconn-m-drawLine` | Mobile fan ×2 | 1350ms | 0, 120ms | `cubic-bezier(.22,1,.36,1)` | §5.9 |

### 18.2 Looping

| Animation | Target | Duration | Iteration | § |
|---|---|---|---|---|
| `orb-drift` | Orb rings ×9 | 22–32s per ring | infinite | §5.3 |
| `head-rotateWord` | Headline words 1–5 | 15000ms | infinite | §8.2 |
| `head-rotateWordLast` | Headline word 6 | 15000ms | infinite | §8.2 |
| `iss-ambientDrift` | Issuing blob | 12000ms | infinite alternate | §5.4 |
| `acq-ambientDrift` | Acquiring blob | 14000ms | infinite alternate | §5.5 |
| `cred-ambientDrift` | Credit blob | 14000ms | infinite alternate | §5.6 |
| `move-ambientDrift` | Money blob | 16000ms | infinite alternate | §5.7 |
| `move-scrollPills` | Pill rail | 45000ms | infinite | §5.7 |
| `pconn-flowPath` | Flow dots ×12 | 3500ms | infinite | §5.8 |
| `uconn-flowCurve` | Fan pulses ×8 | 2400ms | infinite | §5.9 |
| `uconn-flowStem` | Stem pulse | 1000ms | infinite | §5.9 |
| `pconn-m-flowPath` | Mobile flow ×2 | 3200ms | infinite | §5.8 |
| `uconn-m-flowCurve` | Mobile pulses ×2 | 2400ms | infinite | §5.9 |
| `uni-bgPulse` | Icon disc | 12000ms | infinite | §5.10 |
| `uni-orbit1`–`5` | Icon blobs | 7, 9, 11, 8, 13s | infinite | §5.10 |
| `uni-pulse1`–`5` | Icon blobs | 4, 5, 6, 3.5, 7s | infinite alternate | §5.10 |
| `launch-sweep` | Stopwatch hand | 2000ms | infinite | §5.11 |
| `diff-stepOut` | Right figure | 2500ms | infinite | §5.11 |
| `innov-spin` | Star | 5000ms | infinite | §5.11 |
| `code-blink` | Code cursor | 800ms | infinite | §14.3 |
| `dash` | Button arrow tail | 10000ms | infinite (hover only) | §5.11 |
| `media-sheen` | Media panels ×2 | 7000ms | infinite | §5.14 |
| SMIL `d` morph | CTA band | 8000ms | infinite | §16.3 |

`media-sheen` is specified by this document rather than measured — it replaces two
video files and has no counterpart in the original.

### 18.3 Transitions

| Element | Property | Duration | Easing | § |
|---|---|---|---|---|
| Product / use-case / insight card | `transform` | 300ms | default | §10.3, §12.3, §15.2 |
| Card arrow | `transform`, `opacity` | 200ms | `ease-in-out` | §5.11 |
| Card art ring stack | `transform` | 700ms | `ease-in-out` | §5.4–§5.7 |
| Use-case image | `transform` | 400ms | `cubic-bezier(.25,.46,.45,.94)` | §12.3 |
| Announcement bar | `background`, `margin` | 200ms | default | §6 |
| Log In button | `background` | 200ms | default | §7.2 |
| Contact Sales button | `background` | 100ms | default | §7.2 |
| `.button` | all | 300ms | `cubic-bezier(.4,0,.2,1)` | §8.4 |
| Play control | `transform` | 200ms | default | §5.14 |
| Text-link arrow | `transform` | 200ms | `ease-in-out` | §5.11 |
| Code line | `opacity` | 200ms | `ease-out` | §14.3 |

Default transition: `0.15s cubic-bezier(0.4, 0, 0.2, 1)`.

### 18.4 Motion budget

Roughly **90 concurrent animations** run at 1440. That is intentional and it is why
the `@media (max-width: 1023px)` suppressions in §19.3 exist. Do not skip them —
without them the page is unusable on mid-range phones.

---

## 19. Responsive specification

Three widths were measured. All values below are observed, not inferred.

### 19.1 Page-level

| Metric | 1440 | 768 | 390 |
|---|---|---|---|
| `scrollHeight` | **8343px** | **12772px** | **15737px** |
| Hero height | 800px | 800px | 700px |
| `h1` | 100px / 105px | 70px / 73.5px | 42.9px / 45.045px |
| `h2` (standard) | 70px / 80px | 40px / 50px | 40px / 50px |
| Content column | 1280px | 728px | 350px |

The `h1` at 390 is `11vw` — 390 × 0.11 = 42.9px exactly. At 768 the `md:text-6xl`
step wins at 70px. At ≥1024 the explicit `lg:text-[100px]` wins.

### 19.2 Grid column counts

| Grid | 1440 | 768 | 390 | Classes |
|---|---|---|---|---|
| Logo wall | 6 | 6 | 3 | `grid-cols-3 sm:grid-cols-6` |
| Product cards | 4 | 2 | 1 | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` |
| Capability tiles | 8 | 4 | 2 | `grid-cols-2 sm:grid-cols-4 lg:grid-cols-8` |
| Benefits | 3 | 3 | 1 | `grid-cols-1 sm:grid-cols-3` |
| Use-case cards | 4 | 2 | 1 | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` |
| Customers | 4 | 1 | 1 | `grid-cols-1 lg:grid-cols-4` |
| Developer | 2 | 1 | 1 | `grid-cols-1 lg:grid-cols-2` |
| Developer features | 2 | 2 | 2 | `grid-cols-2` |
| Insights | 3 | 3 | 1 | `grid-cols-1 sm:grid-cols-3` |
| Footer | 6 | 6 | 2 | `grid-cols-2 md:grid-cols-6` |

Two rows deserve attention. The **customers** grid drops straight from 4 to 1 at
1024 with no intermediate step, which is why the customers section grows by more than
any other between 1440 and 768. The **developer features** grid stays at 2 columns at
every width — it never folds.

Measured gaps: developer columns 80px at 1440 → 48px below `lg`; developer features
40px at ≥768 → 20px at 390; insights 32px throughout.

### 19.3 What changes at `lg` (1024px)

This is the only structural breakpoint. Below it:

- The nav's centre and right clusters become `display: none`; the menu button appears
- Both desktop connectors (`hidden … lg:block`) become `display: none`; the mobile
  variants render
- All four product-card ambient blobs stop (`animation: none`)
- Every `g[filter]` inside the four product cards loses its filter
- The issuing card's `drop-shadow` filter is removed
- The unity icon's five blobs become `display: none`; the disc takes a static
  gradient fill and loses its blur
- The hero orb keeps `orb-riseIn` but loses `orb-drift`
- The pill rail drops `will-change` and `backface-visibility`
- Pill and play-control `backdrop-filter` are removed; the play control's background
  becomes `rgba(0,0,0,0.45)`
- The CTA gradient SVG is hidden; the flat CSS band shows
- The hero drops from 800px to 700px (at the `lg` boundary in the class, though the
  measured change appears between 768 and 390 because the height class is
  `h-[700px] lg:h-[800px]`)

### 19.4 What changes at `sm` (640px) and `md` (768px)

Column counts only, plus:

- Quote cards go from `aspect-square` + 32px padding to `aspect-[3/2]` + 24px padding
- Media tile play control inset goes from 32px to 24px
- Headline word 5 swaps its long form for its short form
- Section bottom padding drops from `md:pb-20` to `pb-10`
- Footer goes from 6 columns to 2

---

## 20. Accessibility

### 20.1 What the original does well

- **The hero headline.** The animated word stack is `aria-hidden="true"` and a
  `sr-only` span carries one clean sentence. This is the right pattern and must be
  preserved (§8.2).
- Decorative SVGs carry `aria-hidden="true"`.
- The footer opens with an `sr-only` heading.
- Buttons take a visible green focus ring at 2px offset (§8.4).

### 20.2 Requirements for the rebuild

| Requirement | Detail |
|---|---|
| Heading order | One `h1` (hero); `h2` per section; `h3` for card and feature titles. No level is skipped. |
| Landmarks | `<nav>`, `<main>`, `<footer>`. Give the hero content wrapper `role="presentation"` if it is not the page's `<main>`. |
| Alternative text | Every mark built from §5.2 must sit in an element with an accessible name matching the company name. Decorative arrows and glyphs get `aria-hidden="true"`. |
| Focus visible | Never remove the focus ring. `.button:focus` sets `outline: 2px solid transparent` and relies on the box-shadow ring — keep both halves. |
| Media controls | The play control must be a real `<button>` with an accessible name, not a styled `<div>`. The original uses a `<div>` with `cursor: pointer`; that is a defect, and this document specifies the button. |
| Contrast | Body text is `#000` on `#f5f3eb` — 18.4:1. Card body copy at 60% opacity gives ≈7.4:1. Footer white on `#111` gives 18.1:1. The lowest ratio on the page is the code panel's `.code-brace` at `rgba(255,255,255,0.25)` on `#111`, which is decorative punctuation only. |
| Announcement bar | Specify the text colour explicitly as `#000000` rather than inheriting, so the 5% black tint cannot reduce it. |

### 20.3 Reduced motion — required addition

The original ships **no** `prefers-reduced-motion` block despite running ~90
concurrent animations. Add one. This is a deliberate improvement, flagged as such:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .head-word1 { opacity: 1; }                    /* pin the first word visible */
  .head-word2, .head-word3, .head-word4,
  .head-word5, .head-word6 { display: none; }
  .orb-ring { opacity: 1; transform: none; }
}
```

Without the two rules after the reset, collapsing the animation duration leaves every
headline word at its `opacity: 0` starting state and the headline disappears entirely.
That failure mode is the reason those rules are spelled out rather than left implied.

The CTA band's SMIL animation is not covered by the CSS reset. Guard it in markup:
render the `<animate>` element only when the reduced-motion query does not match, or
give the path a static `d` equal to the first `values` state.

---

## 21. Acceptance criteria

Numeric and checkable. Every value here was measured, not estimated.

### 21.1 Geometry

| # | Criterion | Expected |
|---|---|---|
| 1 | `document.documentElement.scrollHeight` at 1440 × 900 | 8343px ±40 |
| 2 | `scrollHeight` at 768 | 12772px ±120 |
| 3 | `scrollHeight` at 390 | 15737px ±150 |
| 4 | Hero wrapper height at 1440 | 800px exactly |
| 5 | Hero wrapper height at 390 | 700px exactly |
| 6 | Footer height at 1440 | 678px ±10 |
| 7 | Content column width at 1440 | 1280px exactly |
| 8 | Section rule colour and width | `#e2e0d6`, 1px, 1280px wide (not full-bleed) |

### 21.2 Typography

| # | Criterion | Expected |
|---|---|---|
| 9 | `h1` computed size at 1440 | 100px, line-height 105px |
| 10 | `h1` computed size at 390 | 42.9px |
| 11 | Standard `h2` computed size at 1440 | **70px**, line-height 80px |
| 12 | Developer `h2` computed size at 1440 | 62px, line-height 72px |
| 13 | CTA `h2` computed size at 1440 | 100px, line-height 106px |
| 14 | Every heading's `font-weight` | 400 |
| 15 | Card `h3` and card `p` computed size | 16px / 24px |
| 16 | Benefit `h3` computed size and weight | 14px / 18px, weight 500 |
| 17 | Footer legal computed size | 12px / 20px |

Criterion 11 is the one to check first. If it reads 60px, the type scale was not
overridden — see §3.2.

### 21.3 Colour

| # | Criterion | Expected |
|---|---|---|
| 18 | Page background of every section 3–10 | `rgb(245, 243, 235)` |
| 19 | Footer background | `rgb(17, 17, 17)` |
| 20 | Card background | `rgb(255, 255, 255)` |
| 21 | Capability tile background | `rgb(226, 224, 214)` |
| 22 | Card hover shadow | `0 18px 0 -8px rgba(226,224,214,0.5)` — blur radius **0** |
| 23 | Button focus ring | `0 0 0 2px #f5f3eb, 0 0 0 4px #55f5a3` |

### 21.4 Layout

| # | Criterion | Expected |
|---|---|---|
| 24 | Product card grid columns at 1440 / 768 / 390 | 4 / 2 / 1 |
| 25 | Capability tile columns at 1440 / 768 / 390 | 8 / 4 / 2 |
| 26 | Logo wall columns at 1440 / 768 / 390 | 6 / 6 / 3 |
| 27 | Customers grid columns at 1440 / 768 | 4 / 1 |
| 28 | Footer columns at 1440 / 390 | 6 / 2 |
| 29 | Product card aspect ratio | 2:3 (305 × 458 at 1440) |
| 30 | Quote card aspect ratio at ≥768 / <768 | 1:1 / 3:2 |
| 31 | Media tile aspect ratio | 16:9 (628 × 353 at 1440) |

### 21.5 Behaviour

| # | Criterion | Expected |
|---|---|---|
| 32 | `getComputedStyle(nav).position` at any scroll offset | `relative` |
| 33 | `nav.getBoundingClientRect().top` at `scrollY = 400` | −362 |
| 34 | `getComputedStyle(html).scrollBehavior` | `auto` |
| 35 | Smooth-scroll library present | none |
| 36 | Card hover `translateY` | −8px |
| 37 | Use-case image hover scale | 1.08, and only under `(hover: hover) and (pointer: fine)` |
| 38 | Headline cycle length | 15s, six words, 2.5s apart |
| 39 | Concurrent animations at 1440, 3s after load | 80–95 |
| 40 | Concurrent animations at 390 | materially fewer — blobs and orbits suppressed |

### 21.6 Zero-dependency

| # | Criterion | Expected |
|---|---|---|
| 41 | Network requests for images | 0 |
| 42 | Network requests for fonts | 0 |
| 43 | Network requests for video | 0 |
| 44 | Third-party script tags | 0 |
| 45 | `<img>` elements in the built page | 0 |
| 46 | Page renders identically with the network disabled after first paint | yes |
---

## 22. Copy deck

Every user-visible string on the page, in document order. All company names are
fictional (§0).

### 22.1 Document head

| Field | String |
|---|---|
| `<title>` | `Overtone \| Built for You` |
| Meta description | `Launch and scale modern financial products on one platform for issuing, acquiring, credit, money movement, and real-time ledgering. Built around your business, your customers, and your roadmap.` |
| `og:title` | `Overtone \| Built for You` |
| `og:description` | *(same as meta description)* |
| `og:type` | `website` |
| `twitter:card` | `summary_large_image` |

### 22.2 Announcement bar

> The Built to Pay Fast Playbook Is Here for Fintechs, PayFacs, ISOs and Vertical SaaS. Get It Now

### 22.3 Hero

| Slot | String |
|---|---|
| Accessible headline (`sr-only`) | `The only payments platform built for you.` |
| Rotating word 1 | `Issuing` |
| Rotating word 2 | `Acquiring` |
| Rotating word 3 | `Credit` |
| Rotating word 4 | `Money Movement` |
| Rotating word 5 (≥768) | `Real-Time Ledgering` |
| Rotating word 5 (<768) | `Ledgering` |
| Rotating word 6 | `Overtone` |
| Static line | `Built for You.` |
| Paragraph | `Launch and scale financial products on one platform for issuing, acquiring, credit, money movement, and real-time ledgering. Start where you want, expand as you grow.` |
| Primary button | `Explore the Platform` |
| Secondary button | `Talk to an Expert` |

### 22.4 Logo wall

| Slot | String |
|---|---|
| Eyebrow | `Trusted by the companies building what's next in payments` |
| Marks | `Harlow's` · `NRT` · `Tallyup` · `Corvela` · `Voyalink` · `Zilo` · `Marker` · `Haulbox` · `Kestrel` · `Tidewave` · `Stipen` · `GiftMark` |

### 22.5 Products

| Slot | String |
|---|---|
| Heading | `Everything you need to launch fast, differentiate, and keep innovating` |
| Sub, line 1 | `Each product is powerful on its own.` |
| Sub, line 2 | `Together, they unlock what legacy systems can't.` |

| Card | Title | Body |
|---|---|---|
| 1 | `Issuing` | `Launch and manage card programs with full control` |
| 2 | `Acquiring` | `Accept and process payments with flexibility and at scale` |
| 3 | `Credit` | `Create branded credit programs with underwriting and rewards` |
| 4 | `Money Movement` | `Move funds across rails with speed and full visibility` |

Rail pill labels (§5.7), repeated twice:
`Check` · `Wire` · `ACH` · `RTP / FedNow` · `OCT` · `Stablecoin` · `AFT` · `Payouts`

Acquiring card art strings (§5.5):
`$1000` · `/ month` · `Card Number` · `1234 1234 1234 1234` · `Expiration` · `MM/YY` ·
`CVC` · `Pay`

Credit card art strings (§5.6):
`You're Approved!` · `Credit` · `Credit Limit` · `$10,000` · `APR` · `20.99%` ·
`Rewards` · `3x pts`

Capability tiles:
`Unified Ledger` · `Stablecoin` · `Instant Payments` · `Virtual Card Express` ·
`Capital Connect` · `Datashare` · `Spend Controls` · `Fraud Tools`

### 22.6 Unified platform

| Slot | String |
|---|---|
| Heading | `Built on a Unified Platform` |
| Sub | `Most platforms were assembled. Overtone was built as one.` |

| Benefit | Title | Body |
|---|---|---|
| 1 | `Launch Faster` | `Go live without coordinating multiple providers or waiting on fragmented systems.` |
| 2 | `Differentiate Easily` | `Design experiences around your customers, not platform constraints.` |
| 3 | `Keep Innovating` | `Add new capabilities and expand into new products without rebuilding your foundation.` |

### 22.7 Industry grid

| Slot | String |
|---|---|
| Heading | `Built for your industry` |
| Sub | `Explore solutions designed for how your business operates.` |

| Card | Title | Body |
|---|---|---|
| 1 | `AP & Bill Pay` | `Increase virtual card adoption, unlock revenue, and streamline supplier payments.` |
| 2 | `Spend Management` | `Deliver modern spend controls, real-time visibility, and scalable program design.` |
| 3 | `Fleet` | `Power fleet payments with granular controls, real-time data, and operational flexibility.` |
| 4 | `Travel and OTAs` | `Better economics, acceptance, and reconciliation for travel payouts.` |
| 5 | `Platforms and Marketplaces` | `Embed financial products that drive engagement, retention, and new revenue streams.` |
| 6 | `Embedded Finance` | `Launch and scale financial experiences without legacy infrastructure constraints.` |
| 7 | `Branded Credit` | `Build branded credit programs that deepen loyalty and unlock new revenue.` |
| 8 | `Vertical SaaS` | `Embed and monetize payments inside your platform for seamless financial workflows.` |

### 22.8 Customers

| Slot | String |
|---|---|
| Heading | `Built with the companies leading what's next` |
| Sub | `Real products. Real scale. Real outcomes.` |
| Link | `View Customer Stories` |

| Quote card | Quotation | Mark |
|---|---|---|
| 1 | `"Overtone helped us work on some of our unique business solutions."` | `Harlow's` |
| 2 | `"Overtone is a partner that accelerates our growth."` | `Corvela` |
| 3 | `"Overtone's platform offers the flexibility, scalability, and security we needed."` | `Tallyup` |
| 4 | `"With Overtone, we are able to reliably expand our payment offerings."` | `NRT` |

### 22.9 Media tiles

| Tile | Mark | Caption strip |
|---|---|---|
| 1 | `Shiftloop` | `pay your labor immediately` |
| 2 | `Tidewave` | `payment networks, card networks, bank networks` |

### 22.10 Insights

| Slot | String |
|---|---|
| Heading | `Insights for builders` |
| Sub | `Learn how modern companies are designing, launching, and scaling financial products.` |
| Link | `Explore Resources` |

| Card | Title | Thumbnail content |
|---|---|---|
| 1 | `When Enterprise Meets Fintech: Overtone and Harlow's on Payments as a Competitive Advantage` | Lockup `×` `Harlow's` |
| 2 | `Overtone Powers a New Era of Commercial Card Issuing for Online Travel` | Lockup over `Built for Travel Payments` |
| 3 | `Overtone vs. Paylane vs. Arcus: Unified Platform or Payout API?` | `Capability Comparison` over three marks separated by `vs` |

### 22.11 Closing CTA

| Slot | String |
|---|---|
| Heading | `Build what's next` |
| Sub | `Overtone gives you the foundation to launch faster, differentiate, and keep moving.` |
| Primary button | `Explore the Platform` |
| Secondary button | `Talk to an Expert` |

### 22.12 Footer

Hidden heading: `Footer`

| Column | Head | Links |
|---|---|---|
| 2 | `Products` | `Issuing` · `Acquiring` · `Credit` · `Money Movement` · `Unified Payments` |
| 3 | `Use Cases` | `AP & Bill Pay` · `Spend Management` · `Fleet` · `Travel and OTAs` · `Platforms` · `Embedded Finance` · `Branded Credit` · `Vertical SaaS` |
| 4 | `Resources` | `Product Updates` · `Executive Playbooks` · `Support` · `Professional Network` · `Privacy` · `Terms` |
| 5 | `Developers` | `Documentation` · `API Reference` · `API Changelog` · `Status` |
| 6 | `Company` | `About` · `Press` · `Careers` · `Brand` · `Blog` |

Legal, paragraph 1:

> ©2026 Overtone Platform, Inc.

Legal, paragraph 2:

> Overtone Platform Inc.'s subsidiary, Overtone Payments, Inc., is registered as a
> Money Services Business (MSB) with the national financial-crimes regulator, and is
> actively pursuing Money Transmitter Licenses (MTLs) across individual U.S. states.
> Prior to securing licenses in particular jurisdictions, Overtone will be providing
> services pursuant to a bank sponsorship model.

`across individual U.S. states` is an underlined inline link.

### 22.13 Navigation

| Zone | Strings |
|---|---|
| Top level | `Products` · `Use Cases` · `Customers` · `Company` · `Docs` · `Pricing` |
| Actions | `Log In` · `Contact Sales` |
| Products panel | `Issuing` · `Acquiring` · `Unified Payments` · `Credit` |
| Use Cases panel | `Agentic Commerce` · `AP Automation` · `Fleet` · `Money Movement` · `Spend Management` · `Embedded Finance` · `Branded Credit` · `Travel` · `Vertical SaaS` · `Disbursements` |
| Company panel | `About` · `Careers` · `Blog` · `Press` |
| Menu button label | `Open menu` |

### 22.14 Developer platform

| Slot | String |
|---|---|
| Heading | `A developer platform built for the future` |
| Paragraph | `Build and ship financial products without the infrastructure overhead. Focus on your product experience while Overtone handles the rest.` |
| Link | `View the docs` |
| Code labels | `Query` · `Response` |

Feature titles and bodies are in §14.2; code block contents are in §14.3.
