---
name: website-prd
description: Reverse-engineer any website into a zero-asset, buildable PRD — a specification document complete enough that another model can rebuild the site from the text alone, with every graphic described as inline SVG, CSS gradients or styled text rather than referenced as a file. Produces documents, never code. Use whenever the user wants a PRD, spec, or written description of a website. Triggers on "make a PRD of this site", "spec out this website", "describe this site so an LLM can rebuild it". Provide one target URL as an argument.
---

# Website → PRD

You are producing a **specification document** for **$ARGUMENTS**.

## The one rule

**You do not write application code.** No components, no pages, no CSS files, no
scaffolding, no build config. The deliverable is Markdown. If you catch yourself
creating a `.tsx`, a `package.json`, or anything under a `src/`, stop — that is out of
scope for this repository, which has no framework and no build by design.

Research the site as deeply as if you were about to rebuild it pixel for pixel. Then
write it down instead of building it.

## What "buildable PRD" means

A different model, with no browser access and no files from you, reads the PRD and
rebuilds the site. That sets three hard constraints:

1. **Zero asset dependencies.** Every image, icon, video, font and illustration is
   described *as text* — inline SVG geometry, CSS gradient recipes, styled-text
   wordmarks, system font stacks. No file paths, no URLs, no "download the logo".
2. **Every literal is measured, never recalled.** Colours, sizes, durations and
   easings come from `getComputedStyle()` or the site's own stylesheet. If you did
   not measure it, write "not captured" rather than a plausible value.
3. **No brand leakage.** The reader must not learn which site this is. See Phase 5.

## Output layout

Derive `<project>` from the host: strip `www.` and the public suffix, then slugify.
`https://example.com/` → `example`. `https://shop.acme.co.uk/` → `shop-acme`.
If that name is already taken by a different origin, append a distinguishing token
rather than overwriting.

```
output/<project>/
  PRD.md                  the deliverable
  TaskOrder.yaml          classification, if the user asked for it
  notes.md                decisions, substitutions, anything unresolved
  deny.txt                the brand-scrub list used in Phase 5
  evidence/
    tokens.md             EVERY custom property, ungrouped and untruncated
    typography.md         families, the full scale, and what it overrides
    animations.md         every @keyframes + every resolved animation
    topology.md           section map with measured y/height
    behaviors.md          scroll / click / hover / timeline findings
    assets.md             asset inventory + the text recipe for each
    source/               recovered component source, when recoverable
  screenshots/
```

**Never overwrite an existing project folder.** If `output/<project>/` exists, stop and
ask whether to refresh it, use a different name, or leave it alone.

---

## Phase 0 — Pre-flight

1. **Browser automation is required.** Check for a browser MCP tool (Chrome MCP
   preferred, else Playwright/Puppeteer/Browserbase). If none, ask the user how to
   connect one. This skill cannot work without it.
2. Normalize the URL and confirm it loads.
3. Note the **real CSS viewport width**. On a constrained screen the browser may cap
   below your target — read `window.innerWidth` rather than trusting the window size,
   and record the actual width next to every measurement you take.

---

## Phase 1 — Recon

Screenshot at ~1440 (or the widest real width available), 768, and 390. Save to
`screenshots/`.

Then map the page top to bottom. For each top-level section record: a working name,
`y`, `height`, background colour, and whether it is flow content or a fixed overlay.
Write `evidence/topology.md`.

Also capture, once: `document.title`, meta description, Open Graph tags, favicon
markup, `<html>`/`<body>` classes, and total `scrollHeight`. The scroll height is
your single best end-to-end acceptance number — put it in the PRD.

---

## Phase 2 — Deep extraction

This phase is what separates a real spec from an essay. Run all seven. Each one
below corresponds to a mistake that has actually shipped.

### 2.1 Design tokens — all of them

```js
// every custom property resolved on :root, from the stylesheets not the element
```
Walk `document.styleSheets`, collect every `--*` declared on `:root`, plus the
computed value of each. **Do not truncate this list and do not sample it.**

> **Trap.** Sites routinely override their framework's scale. A page whose `text-6xl`
> is 70px, not the framework's 60px, will be wrong in *every heading* if you assume
> the default. The override is only visible in the token list — the computed value on
> one element looks like an ordinary number. Dump the tokens, then explicitly state in
> the PRD which families are custom.

### 2.2 Typography

Families from `@font-face` and computed `font-family`; the full size/line-height
scale from the tokens; which weights are actually used.

Licensed webfonts (Helvetica Now, Söhne, GT-*, Founders, etc.) **cannot be a
dependency**. Specify the closest zero-dependency substitute — a system stack or a
Google Fonts family — and record the substitution in `notes.md`.

### 2.3 Motion

Collect every `@keyframes` block verbatim from the stylesheets, and every element's
resolved `animation` / `transition` shorthand. Where available,
`document.getAnimations()` gives real `getTiming()` and `getKeyframes()`.

Write `evidence/animations.md` as a table: name, trigger, duration, delay, easing,
iteration, and what visibly changes.

### 2.4 CSS-module class maps

If the site ships hashed CSS-module classes, recover the map. A key whose value holds
**two** class names is a `composes` relationship.

> **Trap.** `ring1: "ring1 ring"` means the element carries a base class too. Miss it
> and the base rule — usually the one holding `position`, `opacity` and the animation
> — silently vanishes. Symptom: elements that should be stacked and animating all
> render at once, visible and static.

### 2.5 DOM attribute facts

Per image: `srcset` presence, `sizes`, `loading`, `width`/`height` attributes,
`naturalWidth` vs rendered width. Per video: `autoplay`, `loop`, `muted`, `preload`.

> **Trap.** An image with no `srcset` renders at its intrinsic size. Add a 1x/2x
> `srcset` and a DPR>1 browser picks 2x and **halves** the layout size. If the
> original has no `srcset`, say so in the PRD.

### 2.6 Timeline sampling

Reload, then sample computed styles at **t=0, 300ms, 1s, 3s**. Diff the frames.

> **Trap.** Play-once entrance animations are invisible in any single screenshot —
> connectors drawing themselves, digits typing in, elements rising into place. These
> are often the most characterful motion on the page. Only a timeline diff finds them.

### 2.7 Source recovery — when the bundler allows it

If the site is a bundled SPA (Turbopack/webpack module registry, `_next/static`,
etc.), the served JavaScript contains the original component tree. Recovering it
gives exact class strings, real keyframe names, verbatim SVG geometry and the actual
timing constants — everything else in this phase is downstream of it.

Tooling lives in `scripts/source-recovery/` (see its README). It evaluates the
minified `jsx()` calls in a sandbox and serialises them back to readable JSX.

**This is a bonus, not a requirement.** It only works on some stacks. If it fails,
fall back to 2.1–2.6, which cover most of the value. Never block on it.

> **Trap.** Recovered JSX captures a component's *initial* state. A typewriter reveal
> appears as every line at `opacity: 0`. When you see baked-in zero/hidden state, go
> find the effect that changes it and specify the timings, not the frozen frame.

---

## Phase 3 — Behaviour sweep

Determine the **interaction model** of every section before describing it: static,
hover-driven, click-driven, scroll-driven, or time-driven.

- **Scroll first, don't click first.** Scroll slowly and watch what changes on its
  own. Building a click-tabbed UI when the original is scroll-driven is a rewrite,
  not a tweak.
- **Header:** is it sticky? Does it change on scroll? Record the exact trigger, or
  record plainly that it does not stick.
- **Smooth scroll:** check for Lenis / Locomotive / a scroll container. Native
  scrolling feels different and readers notice.
- **Hover:** every card, button, link, nav item. Record before → after and the
  transition timing.
- **Stateful content:** click every tab/pill and capture the content of each state.

Write `evidence/behaviors.md`.

---

## Phase 4 — Asset transcription

Every binary becomes a text recipe. This is the requirement the whole document rests
on, so give it its own pass rather than improvising while writing.

Inventory every `<img>`, `<video>`, background-image, inline `<svg>` and font. Then
classify and transcribe:

| Kind | Recipe |
|---|---|
| Inline SVG icon | Already text. Serialise `viewBox` + primitives verbatim. |
| Logo / wordmark | Styled text: family, size, weight, letter-spacing, case, plus any ornament described as SVG primitives. |
| Photograph | A CSS gradient with named stops, plus a simple line motif in inline SVG that signals the subject. |
| Illustration / UI mockup | Construct from primitives: rects, circles, gradients, blur filters. Give exact geometry. |
| Video | An animated CSS panel — gradient, sheen keyframes, play control. |
| Font | A system or Google stack, with the substitution noted. |
| Favicon | Inline SVG data URI. |

Write `evidence/assets.md`, then fold the recipes into the PRD as their own numbered
section. Every inventoried asset must have a recipe — that is a gate in Phase 7.

---

## Phase 5 — De-branding

The reader must not learn the site's identity.

1. **Invent a placeholder brand.** State plainly in the PRD that it is fictional and
   may be swapped. Do the same for every customer, partner, testimonial and article
   name — replace them all with invented equivalents of similar length.
2. **Build a deny list** and save it as `deny.txt`: the brand, its stem, every real
   company named on the page,
   the domain, the CMS/asset host, licensed font families, and any regulator or legal
   entity in the footer.
3. **Scan for derived identifiers.** The expensive leaks are not the name itself but
   names *inside* identifiers.

> **Trap.** A design token called `rounded-<brand>` reads as an ordinary utility
> until you notice the brand inside it. Grep the *finished document* for the brand
> stem, not just the brand word.

4. **Verify mechanically.** Grep the finished PRD for every deny token and report the
   counts. Do not eyeball this. Watch for false positives (`lower` contains `Lowe`) —
   inspect each hit rather than trusting the count.

---

## Phase 6 — Author the PRD

Write `PRD.md`. Number every section; cross-references must resolve.

Recommended spine, adapt as the site demands:

```
0   How to read this document (zero-dependency contract, placeholder-brand note)
1   Product overview: what it is, design intent, non-goals
2   Technical requirements: stack, client/server split, quality gates
3   Design system: colour tokens, type scale, spacing, radius, shadows, breakpoints
4   Global page structure: section order with measured y/height, total scroll height
5   Asset strategy: the text recipe for every graphic
6…  One section per page section, in visual order
N-4 Animation index: every animation, trigger, duration, loop
N-3 Responsive specification: a table of what changes at each breakpoint
N-2 Accessibility
N-1 Acceptance criteria: numeric, checkable
N   Copy deck: every user-visible string
```

House style that makes a PRD buildable:

- **Exact class strings beat prose.** If the site uses a utility framework, give the
  literal class list — it is the fastest unambiguous path to the same result.
- **State values, not adjectives.** "40px" not "generous". "`cubic-bezier(.16,1,.3,1)`"
  not "a smooth ease".
- **Call out the traps inline.** If a detail broke you during extraction, warn the
  reader at that spot. The `composes` note and the type-scale note earn their space.
- **Explain what the reader cannot measure.** A line on *why* a section feels the way
  it does is worth more than another table.
- **Acceptance criteria must be checkable.** Total scroll height, heading sizes,
  column counts per breakpoint.

---

## Phase 7 — Self-gate

Do not report done until every check passes. Report the results honestly.

| Gate | Check |
|---|---|
| G1 | Section numbering complete, no gaps or duplicates |
| G2 | Every cross-reference resolves |
| G3 | No TBD / TODO / FIXME / lorem |
| G4 | No external URL, no file path, no reference to a binary asset |
| G5 | Zero deny-list hits (grep the finished file; inspect each hit) |
| G6 | Every colour, duration and easing traces to something measured |
| G7 | Every inventoried asset has a text recipe |
| G8 | Every `@keyframes` found appears in the animation index |
| G9 | Every custom-property family that overrides a framework default is declared |
| G10 | No application code was written |

Then offer to publish the PRD as an artifact for sharing.

---

## TaskOrder (only if asked)

```yaml
category:  <individual | solo-founder | enterprise>
domain:    <one of 36, each belonging to exactly one category>
pattern:   <one of 15>
archetype: <lowercase kebab, exactly 3 tokens, globally unique>
idea:      "10-80 words: who it is for, what it contains, what a visitor does,
            ending on the action that touches state"
```

**The closed enums are required to fill this correctly.** If the user has not
supplied the enum file, say so and mark the values provisional rather than inventing
members that will fail validation later.

---

## What NOT to do

- **Don't write code.** Not a component, not a config file, not "just a quick scaffold".
- **Don't recall values.** Never write a hex, duration or easing you did not measure.
- **Don't assume framework defaults.** Check the token list first, every time.
- **Don't describe assets as files.** "the hero image" is a failure; describe the pixels.
- **Don't extract only the default state.** Tabs, scroll positions and hover states
  each need their own capture.
- **Don't skip the timeline pass.** Static screenshots cannot see entrance animations.
- **Don't trust a single grep for de-branding.** Inspect the hits.
- **Don't leave the brand in identifiers.** Token and class names leak.
