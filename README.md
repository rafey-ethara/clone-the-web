# Website → PRD

Turn any URL into a **zero-asset, buildable PRD**: a specification document complete
enough that another model can rebuild the site from the text alone.

No code is produced. The deliverable is Markdown.

---

## Usage

### 1. Connect a browser

The workflow measures a live page, so it needs browser automation over MCP —
[Chrome MCP](https://claude.ai/chrome) is preferred; Playwright, Puppeteer and
Browserbase also work. Nothing else is required.

### 2. Ask for a PRD

In Claude Code, from this repo:

```
/website-prd https://example.com
```

Plain language works too — "make me a PRD of https://example.com", "spec out this site
so an LLM can rebuild it". Add anything you want honoured, for example:

```
/website-prd https://example.com   also emit TaskOrder.yaml
/website-prd https://example.com   call the placeholder brand "Northwind"
```

### 3. Read the output

```
output/example/
  PRD.md                the build spec
  PRD_description.md    the same site in plain language
  TaskOrder.yaml        classification, when requested
  notes.md              decisions, substitutions, anything unresolved
  deny.txt              the brand-scrub list
  evidence/             tokens, typography, animations, topology, behaviors, assets
  screenshots/
```

**Two documents, two readers.** `PRD.md` tells a model how to build the site — exact
values, class strings, keyframes. `PRD_description.md` tells a person what the site is
— no hex codes, no pixels, no jargon — plus a table describing every effect in physical
terms and a glossary that translates each technical term in the spec.

The project name comes from the host. An existing folder is never overwritten — you
will be asked first.

### 4. Use it

Hand `PRD.md` to any model with no other context and ask it to build the site. That is
the whole point: the document carries everything, so nothing else needs to travel with
it.

Read `PRD_description.md` yourself, or send it to anyone who needs to understand the
page without reading a specification. It answers what the spec deliberately does not:
what this actually is, and how it behaves.

**A run takes a while.** The workflow visits the page at three widths, sweeps scroll,
hover and click states, samples a timeline after reload, and transcribes every graphic
by hand. Depth is the product.

---

## What "zero-asset" means

The output has **no file dependencies at all**. Every graphic is described as text:

| Original | Becomes |
|---|---|
| Logos and wordmarks | Styled text — family, size, weight, tracking, plus ornaments as SVG primitives |
| Photographs | A CSS gradient with named stops and a line motif in inline SVG |
| Illustrations and UI mockups | Inline SVG built from primitives, with exact geometry |
| Icons | Inline SVG, serialised verbatim |
| Video | An animated CSS panel — gradient, sheen keyframes, play control |
| Webfonts | A system or Google stack, substitution recorded |
| Favicon | An inline SVG data URI |

The PRD is also **de-branded**. The target's name, its customers, its domain and its
vendors are replaced with invented equivalents, so the model reading the document never
learns which site it is describing. `deny.txt` records what was scrubbed, and the scrub
is verified by grep rather than by eye.

## Why the output is worth building from

Most site-to-spec tools screenshot a page and narrate it. The expensive details are not
in a screenshot, so this workflow measures instead:

- **Every custom property, untruncated.** Sites routinely override their framework's
  type scale. A page whose `text-6xl` is 70px rather than the framework's 60px will be
  wrong in every heading if the spec assumes defaults — and that override is invisible
  in any single element's computed style.
- **Every `@keyframes` block, verbatim**, plus each element's resolved `animation`.
- **A timeline pass** at t=0 / 300ms / 1s / 3s. Entrance animations — connectors drawing
  themselves, digits typing in — appear in no static capture.
- **Source recovery** where the bundler allows it, which yields the author's actual
  class strings and timing constants rather than values inferred from the DOM.
- **DOM attribute facts** such as `srcset` presence, because adding a `srcset` the
  original did not have halves an image's rendered size on a high-DPR display.

Every literal in the PRD traces to something measured. Nothing is recalled.

## Example

A full run against a payments platform marketing page, in both registers:

- [`examples/example-PRD.md`](examples/example-PRD.md) — the build spec. 24 sections,
  every graphic transcribed to text, all 30 animations with exact keyframes, and
  numeric acceptance criteria.
- [`examples/example-PRD_description.md`](examples/example-PRD_description.md) — the
  same site explained to someone non-technical: a walkthrough, a table describing every
  effect in physical terms, a note on the parts that are easy to get wrong, and a
  glossary.

Together they set the quality bar for what a run should produce.

## Layout

```
.claude/skills/website-prd/   the workflow — the whole engine lives here
scripts/source-recovery/      optional: recover component source from bundled JS
examples/                     reference output
output/                       generated PRDs land here
```

Tuning the workflow means editing
[`.claude/skills/website-prd/SKILL.md`](.claude/skills/website-prd/SKILL.md). There is
no build step and no configuration.
