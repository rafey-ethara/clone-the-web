# Source recovery

Recovers a bundled site's **original component source** from the JavaScript it serves,
instead of inferring it from the rendered DOM.

Why it matters: a client-rendered app ships an almost-empty HTML shell, so scraping the
DOM gives you computed values — true, but downstream of the author's intent. The served
bundle still contains the component tree. Recovering it yields the exact utility-class
strings, real `@keyframes` names, verbatim SVG geometry, and the actual timing constants
used by effects. Everything else you can measure is a shadow of this.

**Applicability.** Works on bundlers that keep a module registry — Turbopack and webpack
builds (`_next/static/chunks/*.js` and similar). It will not work on every stack. When it
fails, fall back to DOM + stylesheet extraction, which still covers most of the value.
Never block a job on this step.

## Setup

These are offline analysis tools, excluded from lint and the app build. They expect an
`SP` environment variable pointing at a scratch directory containing:

```
$SP/chunks/*.js     every /_next/static/chunks/*.js the page loads
$SP/css-*.css       the page stylesheets
```

Collect those first by listing `script[src]` and `link[rel=stylesheet]` on the live page
and fetching each one.

## Tools

| Script | Role |
|---|---|
| `jsxconv.mjs` | Core. A balanced-expression scanner plus a Proxy sandbox that evaluates minified `jsx()` calls into an element tree, then serialises that tree back to readable JSX. |
| `runmod2.mjs` | Runs one module factory in that sandbox and dumps each of its exports as JSX.<br>`node runmod2.mjs <chunk.js> <moduleId> <out.txt>` |

Recovered JSX goes into the PRD's `evidence/source/` folder. It is reference material for
the author, not something to ship — this repo produces documents, never code.

## Notes from real runs

- **Module factory parameter names vary** (`e`, `o`, …). The sandbox must not shadow the
  factory's own parameter, or module exports silently come back empty.
- **A module id may be a loader stub.** `{e.v(t => Promise.all([...]).then(() => t(N)))}`
  means the real component is module `N` in another chunk. Follow the indirection.
- **A single factory can register several ids** (`},585242,8545,17401,e=>{`). Match the id
  followed by any number of further ids before `,<param>=>{`.
- **Recovered JSX is the component's initial state.** A typewriter reveal comes back as
  every line at `opacity: 0`. Where you see baked-in zero/hidden state, find the effect
  that changes it and recover the timings too.
- **CSS-module variants usually `compose` a base class** (`ring1: "ring1 ring"`). Losing
  that relationship drops the rule carrying position, opacity and the animation.
