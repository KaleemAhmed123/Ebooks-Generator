# Task — Frontend Mastery audit pass

**Status:** planned
**Started:** 2026-09-04
**Last updated:** 2026-09-04

The same fact + consistency + voice pass that was run over *The Vocabulary of
Production*, aimed at `books/tech/frontend-mastery/`.

**The book:** 381 pages, ~74,800 words, 169 chapters across 8 parts — The
Browser Platform, The Language, React, State And Style, The Network And The
Framework, Fast Tested Accessible, Ship It, The Career.

**Why it needs a different prompt from the glossary:** this is a teaching book,
not a reference. A glossary entry is checked in isolation. A chapter is checked
against the chapters around it, because chapter 13 can contradict chapter 8 and
neither is wrong on its own. It also carries far more version-pinned claims —
React 19, Next 16, Tailwind 4, Vite 8 — and those are the first thing to rot.

---

## The prompt — paste this

```
Audit books/tech/frontend-mastery/ — a 381-page teaching book on frontend
engineering, 169 chapters in 8 parts. I want it checked the way a technical
editor checks a book before it prints, not the way an author re-reads their own
draft.

Split the work across parallel subagents, partitioned by part, so no two agents
read the same file. Each agent gets one part and reports on that part only.

Run four passes over every chapter.

1. FACT PASS
   Check every claim, version number, API signature, config key, CLI flag,
   default value and benchmark figure against a live primary source — the
   official docs, the spec, the project's own repo or changelog. Not blog
   posts, not summaries, not memory.

   Pay closest attention to the version-pinned material, because it is what
   rots first:
     - React 19 — hooks, the compiler, Actions, `use`, Activity, Effect Events
     - Next 16 — App Router, cache components, server actions, proxy/middleware
     - Tailwind 4 — the CSS-first theme, `@theme`, the Oxide engine
     - Vite 8 / Rolldown / Turbopack — which is default, which is opt-in
     - TypeScript — `infer`, mapped and conditional types, narrowing rules
     - Vitest, Playwright, MSW, Storybook — current API surface
     - WCAG levels, ARIA roles, CSP directives, Trusted Types, passkeys
     - any pricing or quota (Vercel, AWS Amplify, CI minutes)

   For every claim you check, report: file:line, the claim as written, the
   source URL, and a verdict — CORRECT, WRONG (with the right value), or
   UNVERIFIABLE.

   Report what you could NOT verify as loudly as what was wrong. A claim no
   primary source backs gets cut, not softened.

2. CONSISTENCY PASS
   You have the whole part, so read it as one document.
     - Does any chapter contradict another? Same concept, different number,
       different recommendation, different default.
     - Does any chapter repeat another? If chapter 14 re-teaches what chapter 6
       already taught, name both and say which should keep it.
     - Is any term used two different ways, or introduced twice as if new?
     - Does a chapter reference something it has not defined yet, or something
       that appears only in a later part?
     - Do the code samples agree with each other — same imports, same style,
       same version of the API?

3. VOICE PASS
   The book's rules, from CLAUDE.md:
     - No AI tropes: delve, foster, robust, demystify, embark, seamless,
       leverage, landscape, realm, tapestry.
     - No throat-clearing: "In this section", "It is important to note",
       "Let's dive in", "In conclusion", "As we saw earlier".
     - Show, don't tell. Never call a thing powerful, efficient, elegant or
       game-changing — show the mechanism and let the reader decide.
     - Every term gets a one-line meaning the first time it appears.
     - Short sentences, one idea each. Delete any sentence carrying no
       information — if a paragraph survives deletion it should have been
       deleted.
   Quote the offending line with its file:line. Do not rewrite it yet.

4. STRUCTURE PASS
     - One markdown file = one printed page. Flag any file that will overflow.
     - Do all chapters have the same shape, or do some carry scaffolding
       headings the others do not? Report any `###` subheading pattern that
       appears in some chapters and not others.
     - Is there a diagram where three or more sentences describe a relationship
       or a flow? Prose that should have been an SVG is a finding.
     - Is there a diagram that only decorates — where the prose still says the
       same thing? That is also a finding.

REPORTING
  One markdown file per agent, written to
  docs/tasks/frontend-mastery-audit/<part-slug>.md.
  Group findings by pass. Order them by severity: wrong facts first, then
  contradictions, then repeats, then voice, then structure.
  Every finding must carry file:line and a quote. A finding I cannot locate in
  ten seconds is not a finding.

  Do NOT edit any content file. This pass reports; a later pass fixes.

WHAT NOT TO DO
  Do not report a finding you have not verified against a source you actually
  fetched. Reasoning from a model you remember — a pricing multiplier, an API
  that used to exist, a default that changed — produces confident wrong
  findings, and one of those costs more than the ten real ones it hides.
  If you are reasoning from memory, say so and mark it UNVERIFIABLE.
```

---

## After the agents report

Do not apply the findings straight from the report. The production-terms pass
produced one finding — GitHub's CI per-minute prices — that was itself wrong:
the reviewer reasoned from a Windows multiplier GitHub no longer publishes. It
was caught only because the numbers were re-checked against the live billing
page before being changed.

So: re-verify anything that changes a number, then fix, then rebuild.

```
node tools/build.mjs frontend-mastery --html    # fast, warns on overflow
node tools/build.mjs frontend-mastery           # the PDF
```
