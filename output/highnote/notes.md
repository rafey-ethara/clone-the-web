# Run notes — decisions, substitutions, unresolved items

## Tooling

No browser MCP server was connected in this environment. Chrome 151 and Node 24
were both present, so extraction ran against a headless Chrome instance driven
directly over the DevTools Protocol from a small zero-dependency Node harness
(Node 24 ships a global `WebSocket`, so no packages were installed). This is
functionally equivalent to a browser MCP for the purposes of this workflow:
`Runtime.evaluate` gives the same `getComputedStyle`, `document.styleSheets`,
`document.getAnimations` and DOM access, and `Page.captureScreenshot` gives clipped
and full-page captures.

The harness lives in the session scratchpad, not in this repository. No application
code was written.

`window.innerWidth` was read on every run and matched the requested width exactly at
1440, 768 and 390 — the browser did not cap the viewport, so all measurements are at
their nominal widths.

## Placeholder brand

The real brand is replaced throughout by **Overtone**, which is fictional and chosen
only because it matches the original's length (8 characters) and its
single-word-compound shape. It carries no meaning and should be swapped for the real
product name on use. The legal entities become "Overtone Platform, Inc." and its
subsidiary "Overtone Payments, Inc."

## Invented names for third parties

Every customer, partner, competitor and card network named on the page has been
replaced with an invented equivalent of similar length, so that column widths and
line-wrap behaviour still hold. The mapping is deliberately not recorded here — the
point of the exercise is that the reader cannot recover the originals.

Twelve logo-wall names, four quote-card attributions, two video-card attributions,
two competitor names in an article title and four card-network marks were replaced.
Wherever a real mark had a distinctive shape that carried layout weight (a shield, a
chevron, a wide lozenge), the invented replacement was given a comparable silhouette
so the wall still reads as visually varied rather than as twelve identical wordmarks.

## Font substitution

The site ships two weights of a licensed display sans and three weights of a licensed
text sans, plus one open-licence monospace. The two licensed families cannot be a
dependency of a zero-asset rebuild.

Substitution specified in the PRD:

| Original role | Substitute |
|---|---|
| Display sans, weights 400/500 | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` |
| Text sans, weights 400/500/700 | the same stack |
| Monospace, weight 400 | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` |

The original pairs a slightly tighter, more geometric display face against a warmer
text face; a single system stack loses that pairing. This is the largest single
fidelity loss in the document and it is called out at PRD §3.2 rather than hidden.
Anyone with a licence for a neo-grotesque display family should substitute it back
at the two `--font-display` / `--font-body` tokens and change nothing else.

The monospace family is open-licence and could legitimately be pulled from a web font
service, but the PRD keeps it as a system stack so the page has no network dependency
at all.

## Design-system namespace rename

The site carries two layers of tokens: a raw design-system layer under a vendor
prefix, and a semantic layer that aliases it. The vendor prefix is an internal
product name and therefore a brand leak, so it is renamed to `--ds-*` throughout the
PRD. The two-layer structure itself is preserved because it is load-bearing — the
semantic tokens are what components reference.

The `mint` *colour family* (`--color-mint-10` … `--color-mint-100`) is retained under
that name, because there it denotes the colour mint and not the design system. Both
uses of the word appear in the deny list precisely so that each hit gets inspected
rather than blanket-replaced.

## Brand inside identifiers

Two tokens embedded the brand name in what otherwise looked like ordinary utilities:

- a border-radius token named after the brand, value `1.25rem`, applied to almost
  every card and nav pill on the page
- a keyframe-name prefix on a nine-keyframe timeline group

Both are renamed in the PRD (`--radius-card`, `tl-*`). This is exactly the leak that
survives a careless review, because `rounded-<brand>` reads as framework vocabulary
until you look at it twice.

## Typo carried by the original

The nav pill links carry a class spelled `whitespce-nowrap` — a misspelling of
`whitespace-nowrap`. It matches no rule and does nothing. The PRD specifies the
correctly spelled utility and notes the discrepancy at §6.2 so that anyone diffing
against the original is not confused by it.

## Not captured

- **Nav dropdown panel dimensions.** The three dropdown panels were enumerated by
  reading their DOM (row counts, row classes, link targets, shadow and radius
  tokens), but their open-state box dimensions and entry transition were not measured
  frame-by-frame. The PRD specifies the row structure and the container tokens and
  says plainly that the panel's open animation is not captured, rather than inventing
  a duration.
- **Video content.** Both customer videos are `preload="none"` with no poster, so no
  frame was ever fetched. The PRD replaces them with an animated panel and does not
  claim to describe their content beyond what the two on-page captions state.
- **Article thumbnail source art.** The three insight thumbnails are CMS-hosted
  composites. Their layout (gradient field, centred wordmark row) was measured from
  the rendered page; the underlying source files were not inspected.
- **Credit-card approval panel internals.** The "approved" panel inside the credit
  card illustration is drawn as SVG primitives inside a 40 KB inline SVG rather than
  as DOM text, so its labels were read from the rendered pixels and its geometry
  described structurally rather than transcribed path-by-path.

## Source recovery

The site is a bundled React application and its component tree is in principle
recoverable from the served JavaScript. Recovery was **not** attempted, because the
hashed CSS-module stylesheets turned out to carry everything that mattered — exact
class strings, verbatim keyframes, real timing constants and full SVG geometry were
all obtainable from the DOM and the stylesheets directly. Per the workflow, source
recovery is a bonus and was not worth blocking on once the cheaper passes had
covered the same ground.

## Deliberate improvements on the original

Two, both flagged in place rather than smuggled in:

1. **`prefers-reduced-motion`.** The original ships no reduced-motion block despite
   running roughly 90 concurrent animations. PRD §12.4 specifies one.
2. **Announcement-bar contrast.** The bar's text sits on a 5%-black tint over the
   page surface; the PRD keeps the visual but specifies the text colour explicitly
   so the result is not left to inheritance.

Everything else in the PRD is transcription, not opinion.
