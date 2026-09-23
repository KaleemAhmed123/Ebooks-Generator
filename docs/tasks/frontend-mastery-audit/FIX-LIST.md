# Fix list — Frontend Mastery audit

**Status as of 2026-09-05.** Four of eight parts fact-audited. Voice and
structure done for the whole book.

**All ten READY fixes plus D1, D3, D4 and D6 are APPLIED.** Book rebuilds clean
at 387 pages with no overflow warnings. The PENDING section below is still
unapplied and still needs re-verification.

Work from this file, not the raw agent reports. Everything in **READY** was
re-verified by me against a primary source I fetched myself; the evidence is in
`VERIFIED.md`. Everything in **PENDING** is an agent claim I have not re-checked
— do not apply it without checking first.

---

## Coverage

| Part | Fact + consistency | Voice + structure |
|---|---|---|
| One — The Browser Platform | **not audited** (agent died twice) | done |
| Two — The Language | **not audited** | done |
| Three — React | done | done |
| Four — State And Style | done | done |
| Five — Network And Framework | done | done |
| Six — Fast, Tested, Accessible | **not audited** (agent died twice) | done |
| Seven — Ship It | done | done |
| Eight — The Career | **not audited** | done |

The four unaudited parts are 189 of 381 pages. **Part Six is the biggest gap by
risk** — it holds every Core Web Vitals threshold, every WCAG criterion number
and level, every accessibility-law deadline, and the MSW/Storybook API surface.
Those are all high-rot, and none of them has been checked.

---

## READY — verified, safe to apply

Ordered by severity. Each was re-checked against a source I fetched.

### 1. The pinned GitHub Action SHA is mislabelled — two files

`19-05-releasing-from-a-monorepo-2-1.md:20`
`21-02-defending-the-dependency-tree-2-2-2.md:16`

```yaml
- uses: actions/checkout@08c6903cd8c0fde910a37f88322edcfb5dd907a8  # v7.0.0
```

That SHA is tag **v5.0.0**. Real v7.0.0 is `9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0`.
Both verified against `api.github.com/repos/actions/checkout/git/ref/tags/*`.

**Top of the list** because both chapters exist to teach *"pin to a SHA because
the comment can lie"*, and it is the one line a reader pastes into a real
workflow.

**Fix:** update the pin to the v7.0.0 SHA, or correct the comment to `# v5.0.0`.
Same edit in both files.

### 2. The caching chapter's flagship sample does not run

`13-03-caching-and-cache-components-2-2-1.md:52`

```tsx
export default function ProductPage({ params }) {   // not async
      <ProductDetails id={params.id} />             // params is a Promise → undefined
```

The book teaches the correct rule twice — `13-01-app-router-vs-pages-router-2-2.md:3`
and `13-03-caching-and-cache-components-2-2-2-2.md:3` ("forgetting the `await`
is the most common upgrade error").

**Fix:**
```tsx
export default async function ProductPage({ params }) {
  const { id } = await params;
  // …use id
```

### 3. The book routes React teams to a non-React framework

`13-06-choosing-a-framework-1.md:16` — "**Remix**, now built on React Router v7 and later"
`13-06-choosing-a-framework-2-1.md:7` — table row: "A full-stack **React** application and you want fewer abstractions | **Remix**"

remix.run no longer mentions React or React Router. remix.run/blog/wake-up-remix:
*"We're starting with a fork of Preact."*

**Fix:** the table row should name **React Router v7 (framework mode)**. Remix
becomes a separate non-React entry, or comes out of a React decision table.
Keep "backed by Shopify" — still correct.

### 4. JSX does not compile to `React.createElement`

`06-02-jsx-under-the-hood-1.md:11` and all of `06-02-jsx-under-the-hood-2.md`.

Real output, per React's own transform announcement:
```js
import {jsx as _jsx} from 'react/jsx-runtime';
return _jsx('h1', { children: 'Hello world' });
```

Two errors: the function called, and the claim at `06-02-...-2.md:19` that
children is the "third argument" (it is a **prop**).

**Fix — a page rewrite, not a line edit.** Teach `react/jsx-runtime` as the
default; mention `createElement` as what the classic transform emitted. The
two downstream explanations ("why one parent element", "why curly braces")
survive unchanged.

**Do not over-correct:** `createElement` is not deprecated and react.dev does
not say it is.

### 5. Cut the npm download figures

`11-07-zero-runtime-css-in-js-1.md:8-11`, the section headed "The numbers".

| Package | Book | npm API, wk 2026-08-23 |
|---|---|---|
| styled-components | 6.8 M, "fell from 8.5 M" | **11,459,678** |
| tailwindcss | 12 M | **125,634,238** |

styled-components is **higher than the book's own "before" figure** — the
decline described is not visible in the measure cited.

**Fix: delete the section.** Do not swap the numbers in. 125 M is inflated by
transitive installs and CI, so it would replace a wrong number with a misleading
one. "Why the runtime kind lost" carries the chapter on mechanism alone.

### 6. Cut the shadcn/ui star count

`11-04-building-a-design-system-2-2-2.md:18` — "crossed 75,000 GitHub stars".
Actual `stargazers_count`: **123,059**.

**Fix: cut the number.** It is stale on the day it prints and does no work — the
sentence is about Radix/Base UI support.

### 7. "160ms each way" is the round-trip figure

`12-04-edge-runtimes-1.md:5` and the SVG label at `12-04-edge-runtimes-2-2-2-2.md:52`.

Sydney→Ashburn ≈ 15,700 km; fibre ≈ 200,000 km/s → **≈78 ms one way, ≈157 ms
round trip**. The same SVG says "the round trip happened anyway" one line below.

**Fix:** "each way" → "round trip", both places. Keep it framed as the physical
floor, since real RTT is higher than great-circle.

### 8. `forwardRef` is not deprecated yet

`07-05-effect-events-and-activity-2-2.md:3` — "`forwardRef` is deprecated."

react.dev: *"will be deprecated in a future release."*

**Fix:** "`forwardRef` is no longer necessary, and will be deprecated in a future
release." The first half of the book's sentence is already correct.

### 9. Voice — 30 "show, don't tell" violations

Full table in `voice-and-structure-whole-book.md`. "powerful" ×17, "magic" ×6,
"blazing fast" ×4, plus "revolutionary", "incredible", "enterprise-grade".

Concentrated in chapter groups `10-`, `12-`, `20-`, `23-`, `24-`. Parts One–Three
are nearly clean. Worst single case: `20-04-vercel-vs-aws-amplify-*` uses
"**The Magic:**" as a repeating structural label for three vendors.

### 10. Voice — 54 exclamation marks across 56 files

Against "kinda academic, confident not salesy". Mostly in code comments in Parts
Two and Three.

Exclude `11-05-utilities-variants-and-plugins-2-2.md:22` — that is Tailwind's
`!` important modifier, not punctuation.

---

## NEEDS YOUR DECISION

**D1. `Continued - continued` on 17 pages — touches the build tool.**
`tools/build.mjs:456` falls back to the literal `"Continued"`; line 457 appends
`" - continued"`. Patching the 17 markdown files alone means the next `--split`
recreates them. Fixing it properly means editing the build, which CLAUDE.md says
not to touch while writing. **Need your go-ahead.**
(It does *not* reach the contents page — `build.mjs:165` filters it — but it
prints as a visible `<h2>`.)

**D2. Heading case** — sentence case or Title Case book-wide? Currently mixed
(`### Why This Matters for Performance` beside `### Why this matters`).

**D3. `06-06-the-rest-of-the-hooks.md`** — re-teaches `useState`/`useEffect`/
`useRef`, each of which has its own chapter, and teaches none of the hooks its
title promises. `useMemo`, `useCallback`, `useReducer`, `useContext`, `useId`,
`useLayoutEffect` are never taught in Part Three, yet `08-02` and `09-03` use
them as known. Rewrite the page to cover the missing hooks, or leave it?

**D4. `"use server"` appears nowhere in Part Three** (zero grep hits, 54 files)
despite `07-04` teaching `<form action={fn}>`. Fill the gap, or out of scope?

**D5. "Cut, don't update" for unverifiable numbers** — the principle behind
fixes 5 and 6, and it governs several PENDING items. Confirm, or say you'd
rather keep numbers with an "as of September 2026" qualifier.

**D6. Diagrams.** 29 across 381 pages; `16-` (accessibility) 0/13, `23-` 0/6,
`24-` 0/8. Adding diagrams is authoring work, well beyond an audit fix pass.
Want it scoped as its own task?

---

## PENDING — agent claims I have NOT re-verified

Do not apply these without checking. Highest-risk first.

**Part Seven — check hardest:**
- `minimumReleaseAgeStrict` documented backwards; the `.npmrc` key
  `minimum-release-age` existing in neither tool. **npm and pnpm use different
  key names, in different files, with different units** (npm days, pnpm
  minutes) — a fix from memory here produces the same silent no-op the book
  already has.
- `turbo.json` `pipeline` removed in Turborepo 2.0.
- `report-to` needing a `Reporting-Endpoints` header.
- "In-memory JWT is immune to both XSS and CSRF" — reported false on XSS, and
  contradicting `18-01-...-2.md:14`.
- OTel install line omitting `@opentelemetry/instrumentation`.
- Vitest coverage thresholds nested one level too shallow.
- Agent's own NOT CHECKED list: the incident-table rows ("1,300 versions",
  "2 billion monthly downloads"), Shai-Hulud 12 hours, nginx image sizes,
  German text expansion 30%, Turbopack multipliers.

**Part Five:**
- W2 middleware Node runtime stable in 15.5; W3 `runtime = 'edge'` deprecated;
  W4 HTTP/1.1 persistent connections; W5 htmx 2.x moved WS/SSE to extensions;
  **W6/W7 the Cloudflare/Vercel edge-limit numbers** — vendor limits, same shape
  as the claim that went wrong in the production-terms pass.

**Part Four:**
- Apollo `@apollo/client/react` import move; "same size" CSS claim; the
  `@utility --value()` syntax error; "Oxide" naming and Rust-rewrite scope;
  `bg-blue-500` GOOD/BAD contradiction; four-vs-five escape hatches;
  `11-06`/`11-07` duplication.

**Part Three:**
- RSC-boundary SVG claim; the Edge/RSC section; `onuserSelect` on custom
  elements; the `startTransition` sample; the Shoelace citation; `useMemoCache`;
  custom-element SSR; broken SVG at `09-05-web-components-2-1.md:54`.

---

## Sequencing note for the fix pass

Fixes 1, 2, 3, 7, 8 are surgical — a line or two each, no surrounding rewrite.
Fix 4 is a page rewrite. Fixes 5 and 6 are deletions. Fixes 9 and 10 are
mechanical sweeps but touch ~86 files, so they should land in their own commit,
separate from the fact fixes, or the diff becomes unreviewable.

Run `node tools/build.mjs frontend-mastery --html` **after** the fixes, not
before — it is the only real overflow check, and several fixes change page
length.
