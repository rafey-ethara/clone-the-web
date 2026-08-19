# Project instructions

## What this repo is

A single workflow that turns a URL into a **zero-asset, buildable PRD**. It produces
documents, not software.

The entire engine is [`.claude/skills/website-prd/SKILL.md`](.claude/skills/website-prd/SKILL.md).
Read it before doing any PRD work — it holds the phase order, the extraction steps, and
the traps that have actually cost time on real runs.

## The rule that defines this repo

**Never write application code here.** No components, no pages, no stylesheets, no
scaffolding, no build config. If a request seems to call for building the site, the
answer is a better specification instead.

There is no `package.json`, no framework and no build. That is deliberate — this repo
generates Markdown.

## Working style

- **Measure, never recall.** Every colour, size, duration and easing in a PRD must come
  from `getComputedStyle()` or the site's own stylesheet. If it was not measured, write
  "not captured" rather than a plausible value.
- **Check the token list before writing any size.** Assuming framework defaults when the
  site overrides them is the single most expensive mistake available.
- **Describe pixels, not files.** "The hero image" is a failure. Describe how to draw it.
- **Verify de-branding mechanically.** Grep the finished document for every deny token
  and inspect each hit — `lower` contains `Lowe`. Do not eyeball it.
- **Report gate results honestly**, including anything that did not pass.

## Structure

```
.claude/skills/website-prd/   the workflow
scripts/source-recovery/      optional offline tooling, no dependencies
examples/                     reference output — the quality bar
output/<project>/             generated PRDs, one folder per target
```

`<project>` is derived from the host (`https://example.com/` → `example`). Never
overwrite an existing project folder — ask first.

## Requirements

Browser automation via MCP (Chrome MCP preferred). Nothing else is needed to run the
workflow; Node is only required for the optional source-recovery scripts.
