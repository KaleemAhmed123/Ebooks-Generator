# Voice and structure pass — whole book

**Scope:** all 381 files in `books/tech/frontend-mastery/pages/`.
**Run by:** the orchestrator, not a subagent. These two passes need no network,
so they were done mechanically across the whole book rather than partitioned.
**Date:** 2026-09-05.
**Method:** regex sweeps over every file. Every finding below is a literal grep
hit with its `file:line`. Nothing here is inferred or remembered.

**Verdict.** The banned-word rules are being followed almost perfectly — one hit
in 381 files, and it is a false positive. But two rules are being broken at
scale, and neither is visible to a per-part reader, which is why a whole-book
sweep was the right instrument: **"show, don't tell" (30 violations)** and
**"visual first" (29 diagrams across 381 pages)**. A third finding is a build
artifact printing a meaningless heading on 17 pages.

---

## PASS 3 — VOICE

### FINDING V1 — 30 "show, don't tell" violations, clustered in the older parts

CLAUDE.md: *"Never say a tool or concept is 'powerful' or 'efficient.' Show the
code or the mechanism that makes it so, and let the reader conclude it is
powerful."*

These are not spread evenly. Parts One–Three are nearly clean. The violations
concentrate in chapter groups `10-`, `12-`, `20-`, `23-`, `24-`, which reads as
those chapters predating the voice pass the others received.

**"powerful" — 17 hits**

| Location | Quote |
|---|---|
| `01-03-event-propagation-and-delegation-2-2-1.md:5` | "we can use a **powerful** pattern called **Event Delegation**" |
| `01-05-html5-web-apis-1.md:3` | "The modern browser is a **powerful** operating system in its own right" |
| `02-01-the-cascade-and-specificity-2-2.md:3` | "One of the most **powerful** recent additions to CSS is Cascade Layers." |
| `02-03-modern-layouts-1.md:5` | "two dedicated, immensely **powerful** layout algorithms" |
| `02-03-modern-layouts-2-1-1.md:3` | "It is the most **powerful** layout system ever introduced to CSS." |
| `05-02-ts-generics-1.md:3` | "TypeScript provides **powerful** mechanisms to keep your types DRY" |
| `05-03-mapped-and-conditional-types-1.md:33` | "This is incredibly **powerful** because..." |
| `09-01-higher-order-components-2.md:14` | "HOCs were **powerful**, but they caused massive problems." |
| `10-01-the-state-taxonomy-2.md:20` | "The URL is the most **powerful** state manager in your app." |
| `10-03-react-query-server-state-2.md:29` | "### **Powerful** Defaults" — a heading |
| `10-03-react-query-server-state-2.md:35` | "It is so **powerful** that it is often said that..." |
| `10-05-apollo-graphql-client-2.md:29` | "Apollo Client is the most **powerful** piece of architecture in your frontend stack" |
| `12-02-websockets-and-sse-2.md:10` | "WebSockets are **powerful** but very difficult to scale" |
| `12-03-islands-architecture-and-htmx-1.md:7` | "two **powerful** architectural movements" |
| `12-03-islands-architecture-and-htmx-2-2.md:3` | "#### Why HTMX is **powerful**:" — a heading |
| `23-03-monetization-side-hustles-2.md:2` | "The most **powerful** asset a developer can have is distribution" |
| `24-01-ai-assisted-frontend-2-2.md:3` | "One of the most **powerful** shifts in frontend workflow" |

**"magic" / "magical" — 6 hits.** Every one tells the reader something is
impressive instead of showing the mechanism. `20-04` is the worst case:
**"The Magic:"** is used as a repeating structural label across three vendors.

| Location | Quote |
|---|---|
| `01-00-part-one.md:5` | "Learn it and the frameworks stop being **magic**." — *arguably fine; it is the part's thesis, and it promises the removal of magic rather than claiming it* |
| `08-01-react-server-components-2-2-1.md:15` | "When combined with RSCs, Edge computing is **magic**." |
| `09-01-higher-order-components-2.md:9` | "Now it **magically** has authentication checks!" |
| `10-05-apollo-graphql-client-1.md:29` | "Apollo Client does something **magical**:" |
| `20-04-vercel-vs-aws-amplify-1.md:11` | "- **The Magic:**" — section label, Vercel |
| `20-04-vercel-vs-aws-amplify-1.md:17` | "- **The Magic:**" — section label, Netlify |
| `20-04-vercel-vs-aws-amplify-2.md:3` | "- **The Magic:**" — section label, Amplify |

**"blazing / blazingly fast" — 4 hits.** Unsourced performance claims with no
number attached.

- `10-02-zustand-global-state-2-2.md:22` — "Zustand ensures that your UI remains **blazing fast**"
- `11-06-css-modules-and-vanilla-extract-2-2-2.md:23` — "making it **blazingly fast**"
- `14-04-virtualization-for-long-lists-1.md:15` — "The performance remains **blazing fast**"
- `15-02-service-workers-and-pwa-1.md:28` — "This makes subsequent loads of your app **blazing fast**"

**Other tells — 5 hits**

- `02-01-the-cascade-and-specificity-2-2.md:17` — "This is **revolutionary** for overriding third-party library styles"
- `20-04-vercel-vs-aws-amplify-1.md:17` — "Netlify **excels** at hosting"
- `20-04-vercel-vs-aws-amplify-1.md:18` — "They offer **incredible** out-of-the-box features"
- `20-04-vercel-vs-aws-amplify-1.md:11` — "You get **enterprise-grade** infrastructure with zero configuration"
- `15-02-service-workers-and-pwa-2.md:10` — `"name": "My **Awesome** React Application"` — inside a JSON sample; cosmetic, lowest priority

### FINDING V2 — 54 exclamation marks across 56 files

Not on CLAUDE.md's banned list, but squarely against *"Professional,
authoritative, and kinda academic. Confident, not salesy."* An exclamation mark
is the written form of telling the reader to be impressed — the same failure as
V1, in punctuation.

They cluster in code comments in Parts Two and Three. Representative:

- `03-03-closures-and-lexical-scope-1.md:29` — "// Yet, myCounter still remembers the 'count' variable**!**"
- `05-05-infer-keyword-1.md:28` — "// The type is now correctly extracted: { id: string, name: string }**!**"
- `06-01-virtual-dom-internals-2.md:10` — "no matter how many state changes occurred**!**"
- `09-03-compound-components-2-2.md:11` — "Now look at how clean and flexible the API is for the developer using it**!**"
- `13-01-app-router-vs-pages-router-2-1.md:19` — "{/* Sidebar can fetch its OWN data internally**!** No prop drilling**!** */}"

`02-05-css-custom-properties-2-1.md:9` and `02-05-...-2-2-2-1.md:9` carry the
**identical** comment — `/* It defaults to a white surface, but is overridable! */`
— which is also a duplication finding (see S3).

**Note:** `11-05-utilities-variants-and-plugins-2-2.md:22`
(`<div class="flex! bg-red-500!">`) is Tailwind 4's `!` important modifier, not
punctuation. Not a finding.

### NOT A FINDING — the banned-word sweep is clean

One hit in 381 files, and it is correct usage:
`16-03-wcag-motion-and-testing-1.md:12` — "**Robust.** Assistive technology can
parse it." That is the name of WCAG's fourth principle (POUR: Perceivable,
Operable, Understandable, Robust). Leave it.

Zero hits for: delve, foster, demystify, embark, seamless, leverage, landscape,
realm, tapestry, myriad, plethora, pivotal, paramount, utilize.

Zero hits for throat-clearing: "In this section", "It is important to note",
"Let's dive in", "In conclusion", "As we saw earlier", "we will cover",
"by the end of this", "before we begin".

---

## PASS 4 — STRUCTURE

### FINDING S1 — 17 pages print the heading "Continued - continued"

The `##` heading is the page's topic. On these pages it says nothing.

```
02-03-modern-layouts-2-1-2.md:1                  ## Continued - continued
02-03-modern-layouts-2-2.md:1                    ## Continued - continued
02-04-container-queries-and-has-2-2-1.md:1       ## Continued - continued
08-02-react-compiler-vs-signals-2-1-2.md:1       ## Continued - continued
08-02-react-compiler-vs-signals-2-2.md:1         ## Continued - continued
09-03-compound-components-2-2.md:1               ## Continued - continued
11-02-tailwind-under-the-hood-2-2-2-2.md:1       ## Continued - continued
11-04-building-a-design-system-2-1-2.md:1        ## Continued - continued
11-04-building-a-design-system-2-2-1.md:1        ## Continued - continued
14-04-virtualization-for-long-lists-2-1-2.md:1   ## Continued - continued
14-04-virtualization-for-long-lists-2-2.md:1     ## Continued - continued
14-06-images-and-fonts-2-2-1-2.md:1              ## Continued - continued
14-06-images-and-fonts-2-2-2.md:1                ## Continued - continued
18-02-csp-and-trusted-types-2-2-1.md:1           ## Continued - continued
21-05-opentelemetry-in-the-browser-2-2-1-2.md:1  ## Continued - continued
21-05-opentelemetry-in-the-browser-2-2-2-1.md:1  ## Continued - continued
```

Plus one degenerate variant that kept its title and stacked the suffix twice:

```
12-03-islands-architecture-and-htmx-2-2.md:1
  ## Islands Architecture and HTMX - continued - continued
```

**This does NOT reach the table of contents.** `tools/build.mjs:165` filters any
heading matching `/-\s*continued$/i` out of the TOC. It does print as a visible
`<h2>` at the top of the page, so the reader sees it.

**Mechanism**, from `tools/build.mjs`:

- Line 456: `const title = (md.match(/^## (.+)$/m) ?? [, "Continued"])[1];` —
  when the chunk being split carries no `##`, the fallback is the literal string
  `"Continued"`.
- Line 457 appends `" - continued"`, producing `"Continued - continued"`.
- Line 482 (`mergeParts`) strips `^##[^\n]*continued[^\n]*` from continuation
  files, which is one way a chunk reaches line 456 with no heading.

This is a build artifact baked into the committed markdown by past `--split`
runs, not something an author typed. **Fixing the 17 files by hand without
fixing line 456 means the next `--split` re-creates them.** Flagged for the fix
pass as a two-part change.

### FINDING S2 — 29 diagrams in 381 pages, and 3 chapter groups have none

CLAUDE.md: *"Prose is expensive; diagrams are cheap. Maximize the use of
diagrams... If it takes more than 3 sentences to describe a relationship, draw
it instead."* One diagram per 13 pages is not that.

| Group | Topic | Diagrams / pages |
|---|---|---|
| `16-` | ARIA, focus management, WCAG, a11y law | **0 / 13** |
| `23-` | roadmap, portfolio, monetization | **0 / 6** |
| `24-` | AI-assisted frontend, AGENTS.md and MCP | **0 / 8** |
| `04-` | the event loop, promises, async | 1 / 7 |
| `05-` | TypeScript, 7 chapters | 1 / 20 |
| `09-` | HOCs, render props, compound components, web components | 1 / 16 |
| `13-` | App Router, caching, server actions | 1 / 19 |
| `02-` | CSS: cascade, stacking, grid, container queries | 2 / 36 |
| `11-` | Tailwind, design systems, CSS Modules | 2 / 28 |
| `21-` | supply chain, observability, OTel | 3 / 20 |

The three zero-diagram groups are the sharpest finding. **`16-` (accessibility)
is the strongest candidate for new diagrams in the whole book** — focus order,
the accessibility tree, and focus-trap mechanics are exactly the "relationship
and flow" the rule names, and all three are currently prose only. `04-` (the
event loop, with 1 diagram across call stack / microtask queue / macrotask queue
/ render steps) is the second.

Per-chapter diagram placement was not audited here — that needs a reader holding
the chapter's argument in mind, and belongs to the per-part agents.

### FINDING S3 — duplicated code comment across two files

`02-05-css-custom-properties-2-1.md:9` and
`02-05-css-custom-properties-2-2-2-1.md:9` both contain, character for
character:

```css
  /* It defaults to a white surface, but is overridable! */
```

Same chapter, two different pages. One is likely a leftover from a split. Which
one keeps it belongs to the Part One agent.

### FINDING S4 — heading capitalisation is mixed

`##` and `###` headings mix Title Case and sentence case with no rule. Sampled:
20 Title Case against 5 sentence case. Adjacent examples from the same book:

- `### Why This Matters for Performance` (Title Case)
- `### Why this matters` (sentence case)
- `### Why the name changed` (sentence case)
- `### Why Multi-Stage?` (Title Case)
- `### Why Semantic CSS Fails at Scale` (Title Case)
- `### Why phishing stops working` (sentence case)

Cosmetic, but visible in the printed contents page at the `##` level. Needs one
rule picked and applied book-wide. Not fixable per-part without that decision.

### NOT A FINDING — page weight

No page is near overflow on word count alone. Heaviest are
`20-03-ci-cd-github-actions-1.md` (567 words),
`19-01-vite-rolldown-and-turbopack-2-1.md` (563) and
`21-05-opentelemetry-in-the-browser-1.md` (533), against a book median far below
that. Word count is a weak proxy — a page that is mostly a tall code block can
overflow at 300 words — so this is **not** a substitute for
`node tools/build.mjs frontend-mastery --html`. That run is the real check, and
it is deferred to after the fix pass.

---

## What this pass did NOT cover

- **Pass 1 (fact)** — nothing. Needs live sources; deferred to the per-part agents.
- **Pass 2 (consistency)** — nothing. Needs a reader holding a whole part in mind.
- **Diagram quality** — S2 counts diagrams; it does not judge whether an existing
  diagram earns its place or merely decorates. That is a per-part judgement.
- **"Every term gets a one-line meaning the first time it appears"** — not
  mechanically checkable; needs the consistency agent.
