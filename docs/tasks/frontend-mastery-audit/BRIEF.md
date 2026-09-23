# Audit brief — Frontend Mastery

You are a technical editor checking a book before it prints. Not an author
re-reading their own draft.

Book: `books/tech/frontend-mastery/pages/` — 381 markdown files, one printed
page each, 169 chapters across 8 parts. Today's date is **2026-09-04**. The
book claims React 19, Next 16, Tailwind 4, Vite 8.

You have been assigned ONE part. Read only the files in your part. Do not read
or report on files outside it — another agent owns those.

Filename shape: `NN-MM-chapter-slug-<split>.md`. `NN` is the chapter group,
`MM` the chapter. A chapter that overflowed one page was split, so
`13-03-caching-...-1.md` and `13-03-caching-...-2-2-1.md` are consecutive pages
of the same chapter. Read a chapter's split files together, in sorted order.

---

## Run four passes over every chapter

### 1. FACT PASS

Check every claim, version number, API signature, config key, CLI flag, default
value and benchmark figure against a **live primary source** — official docs,
the spec, the project's own repo or changelog. Not blog posts, not summaries,
not memory. Use WebFetch / WebSearch / context7. Actually fetch the page.

Closest attention to version-pinned material, because it rots first:

- React 19 — hooks, the compiler, Actions, `use`, Activity, Effect Events
- Next 16 — App Router, cache components, server actions, proxy/middleware
- Tailwind 4 — the CSS-first theme, `@theme`, the Oxide engine
- Vite 8 / Rolldown / Turbopack — which is default, which is opt-in
- TypeScript — `infer`, mapped and conditional types, narrowing rules
- Vitest, Playwright, MSW, Storybook — current API surface
- WCAG levels, ARIA roles, CSP directives, Trusted Types, passkeys
- any pricing or quota (Vercel, AWS Amplify, CI minutes)

For every claim you check, report: `file:line`, the claim as written, the source
URL, and a verdict — **CORRECT**, **WRONG** (with the right value), or
**UNVERIFIABLE**.

Report what you could NOT verify as loudly as what was wrong. A claim no primary
source backs gets cut, not softened.

### 2. CONSISTENCY PASS

You have the whole part. Read it as one document.

- Does any chapter contradict another? Same concept, different number, different
  recommendation, different default.
- Does any chapter repeat another? Name both, say which should keep it.
- Is any term used two different ways, or introduced twice as if new?
- Does a chapter reference something it has not defined yet, or something that
  appears only in a later part?
- Do the code samples agree with each other — same imports, same style, same
  version of the API?

### 3. VOICE PASS

The book's rules, from CLAUDE.md:

- No AI tropes: delve, foster, robust, demystify, embark, seamless, leverage,
  landscape, realm, tapestry.
- No throat-clearing: "In this section", "It is important to note", "Let's dive
  in", "In conclusion", "As we saw earlier".
- Show, don't tell. Never call a thing powerful, efficient, elegant or
  game-changing — show the mechanism and let the reader decide.
- Every term gets a one-line meaning the first time it appears.
- Short sentences, one idea each. Delete any sentence carrying no information —
  if a paragraph survives deletion it should have been deleted.

Quote the offending line with its `file:line`. Do not rewrite it yet.

### 4. STRUCTURE PASS

- One markdown file = one printed page. Flag any file that will overflow.
  Rough gauge: run `node tools/build.mjs frontend-mastery --html` is NOT yours
  to run (shared build). Instead judge by word count and code-block length
  against the other files in your part, and say which look heavy.
- Do all chapters have the same shape, or do some carry scaffolding headings the
  others do not? Report any `###` subheading pattern that appears in some
  chapters and not others.
- Is there a diagram where three or more sentences describe a relationship or a
  flow? Prose that should have been an SVG is a finding.
- Is there a diagram that only decorates — where the prose still says the same
  thing? That is also a finding.

---

## REPORTING

Write ONE markdown file to `docs/tasks/frontend-mastery-audit/<your-part-slug>.md`.
That is the only file you may write. Do not create any other file.

Group findings by pass. Order by severity: wrong facts first, then
contradictions, then repeats, then voice, then structure.

Every finding must carry `file:line` and a quote. A finding the reader cannot
locate in ten seconds is not a finding.

Start the report with a short header: part name, files covered (count), how many
claims you checked, and a one-paragraph verdict.

**Do NOT edit any content file.** This pass reports; a later pass fixes.
**Do NOT run the build.** It is shared.
**Do NOT touch** `CLAUDE.md`, `meta.json`, `theme.css`, `tools/`, or any other
agent's report file.

## WHAT NOT TO DO

Do not report a finding you have not verified against a source you actually
fetched. Reasoning from a model you remember — a pricing multiplier, an API that
used to exist, a default that changed — produces confident wrong findings, and
one of those costs more than the ten real ones it hides. If you are reasoning
from memory, say so and mark it UNVERIFIABLE.

Do not pad the report. A short report with twelve real findings beats a long one
with twelve real findings buried in ninety guesses.
