# Re-verification log — findings I checked myself

Agents report optimistically, and one confident wrong correction costs more than
the ten real findings it hides. The production-terms pass proved that: its
GitHub CI pricing "fix" was itself wrong, caught only by re-checking the live
billing page.

So no agent finding gets applied to a content file until it appears here with an
independent verdict. **This file is what the fix pass works from, not the agent
reports.**

Verdicts:

- **UPHELD** — I re-checked and the agent is right.
- **UPHELD (independent source)** — I re-checked against a *different* source
  than the agent used, and it still holds.
- **REVISED** — the finding is real but the agent's correction was off.
- **REJECTED** — the finding does not survive re-checking.
- **PENDING** — not yet re-checked. Do not apply.

---

## Part Five — The Network And The Framework

### W1 — `params.id` read synchronously — **UPHELD**

Verified from the book alone; no external source needed, because the book
contradicts itself.

The rule, taught twice:

- `13-01-app-router-vs-pages-router-2-2.md:3` — "In Next.js 16 the route props
  are promises. `params` and `searchParams` must be awaited, and so must
  `cookies()`, `headers()`, and `draftMode()`."
- `13-03-caching-and-cache-components-2-2-2-2.md:3` — "Next 16 removed the
  synchronous versions of the request APIs... forgetting the `await` is the most
  common upgrade error."

The violation, in the chapter's flagship sample —
`13-03-caching-and-cache-components-2-2-1.md:52`:

```tsx
export default function ProductPage({ params }) {   // not async
      <ProductDetails id={params.id} />             // params is a Promise
      <LivePrice id={params.id} />
```

A reader who copies this gets `undefined` for both. **Highest-priority fix in
the part** — it is the one error where the book actively teaches the correct
rule and then breaks it in the sample the reader will copy.

Fix: make the function `async`, `const { id } = await params;`, use `id`.

### W8 — Remix is no longer a React framework — **UPHELD (independent source)**

The agent cited remix.run and two blog posts. I re-fetched independently:

- **https://remix.run/** — front page tagline is now *"The fully-stacked web
  framework"*. It describes "a server runtime, routing, authentication,
  sessions, database integrations, a UI framework, asset compilation, dynamic
  styling, and accessible components in a cohesive stack built on Web APIs."
  **React, React Router and Preact are not mentioned anywhere on the page.**
- **https://remix.run/blog/wake-up-remix** — states it outright: *"We're
  starting with a fork of Preact, a mature virtual DOM library already used
  heavily at Shopify, Google, and countless others."* The post positions Remix
  v3 as independent of React Router, now that React Router v7 has matured.

The book, at `13-06-choosing-a-framework-1.md:16`, says Remix is "now built on
React Router v7 and later" — that describes the *merge* that happened, but the
merge produced **React Router v7**; Remix then moved on. And
`13-06-choosing-a-framework-2-1.md:7` recommends Remix for "A full-stack
**React** application and you want fewer abstractions."

**As written the book routes a React team to a framework that does not run
React.** Second-highest-priority fix in the part.

Fix: the table row should name **React Router v7 (framework mode)**. Remix
belongs either as a separate non-React entry or cut from a React decision table.
The "backed by Shopify" half is correct (remix.run footer: `©2026 Shopify, Inc.`).

### W9 — Sydney latency "160ms each way" — **UPHELD, with the agent's own caveat standing**

The agent correctly flagged this as its arithmetic rather than a fetched source.
I redid it independently and reached the same place.

Sydney (−33.87, 151.21) to Ashburn VA (39.04, −77.49) is ≈ 15,700 km
great-circle. Light in fibre travels at ≈ 200,000 km/s (about two-thirds of `c`).
15,700 ÷ 200,000 ≈ **78 ms one way**, ≈ **157 ms round trip**. So 160 ms is the
round-trip figure wearing a one-way label.

Confirmed in the book at two places:

- `12-04-edge-runtimes-1.md:5` — "light alone costs about 160ms each way"
- `12-04-edge-runtimes-2-2-2-2.md:52` — SVG label `160ms each way`

**The diagram contradicts itself.** Line 52 says "160ms each way"; line 53, in
the same SVG, says "the round trip happened anyway".

Caveat worth keeping in the fix: real Sydney↔US-East RTT is higher than the
theoretical 157 ms, because fibre does not run great-circle. So "about 160ms
round trip" is defensible as a *floor*, not as the measured number. Safest
wording keeps it as the physical minimum.

Fix: "each way" → "round trip", in the prose and in the SVG label.

---

## Part Three — React

### JSX compiles to `React.createElement` — **UPHELD, and wider than the agent said**

The book, `06-02-jsx-under-the-hood-1.md:11`:

> "a transpiler (like Babel or SWC) scans your files and converts **every single
> piece of JSX** into a standard JavaScript function call: `React.createElement()`."

Re-verified against the primary source — React's own JSX-transform announcement,
https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
— which gives the compiled output verbatim:

```js
// Inserted by a compiler (don't import it yourself!)
import {jsx as _jsx} from 'react/jsx-runtime';

function App() {
  return _jsx('h1', { children: 'Hello world' });
}
```

and states: *"Note how our original code did not need to import React to use JSX
anymore!"*

**A second error the agent did not separate out.** `06-02-jsx-under-the-hood-2.md:19`
says: "you are just passing `user.name` as the **third argument** to the
`createElement` function." Under the automatic runtime children is a **prop
inside the props object** (`{ children: ... }`), not a third positional
argument. So the chapter is wrong twice: about which function is called, and
about the shape of the call.

**Scope of the fix — larger than one line.** `06-02-jsx-under-the-hood-2.md` is
titled "The `React.createElement` API" and its three numbered explanations all
hang off the claim. Two of them survive a rewrite unchanged, because they hold
under either transform:

- "why you need one parent element" — still true; both transforms produce a
  single call.
- "why you use curly braces" — still true; it is still an argument/prop either way.

**What must not be over-corrected.** `React.createElement` is not gone. It still
exists, and the classic transform still works when a toolchain is configured for
it. The precise correction is that **automatic is the default** in modern
toolchains (Vite, Next, CRA-era Babel with `runtime: 'automatic'`), so a book
pinned to React 19 should teach `react/jsx-runtime` and mention `createElement`
as what the classic transform emitted. Do not write "createElement is deprecated"
— react.dev does not say that.

### `forwardRef` is deprecated — **REVISED**

The finding is real but the book's error is one of tense, and the agent's
framing is the right one.

The book, `07-05-effect-events-and-activity-2-2.md:3`:

> "**`ref` is now an ordinary prop.** `forwardRef` is deprecated."

https://react.dev/reference/react/forwardRef says, verbatim:

> "In React 19, `forwardRef` is no longer necessary. Pass `ref` as a prop instead.
> `forwardRef` **will be deprecated in a future release**."

So: not deprecated *now*. Announced for future deprecation. The first half of the
book's sentence ("`ref` is now an ordinary prop") is correct.

Fix — a few words, not a rewrite: "`forwardRef` is no longer necessary, and will
be deprecated in a future release."

Low severity on its own. Worth doing because the book states it as settled fact,
and a reader maintaining a library will make a migration decision on it.

### Everything else from Part Three — **PENDING**

Not yet re-checked, do not apply: the RSC-boundary SVG claim, the Edge/RSC
section, `onuserSelect` on custom elements, the `startTransition` sample, the
Shoelace citation, `useMemoCache`, custom-element SSR, and the broken SVG at
`09-05-web-components-2-1.md:54`.

Two Part Three items are **not fact findings and need your decision**, so they
sit outside this file's verdict system:

- **`06-06-the-rest-of-the-hooks.md`** — the agent recommends deleting or
  rewriting it: it re-teaches `useState`/`useEffect`/`useRef`, each of which has
  its own full chapter, and teaches none of the hooks its title promises.
  `useMemo`, `useCallback`, `useReducer`, `useContext`, `useId` and
  `useLayoutEffect` are then **used** by chapters `08-02` and `09-03` without
  ever being taught. That is a content gap, not an error.
- **`"use server"` / Server Functions appear nowhere in Part Three** (grep: zero
  hits across 54 files) even though chapter `07-04` teaches `<form action={fn}>`.
  Also a gap, not an error.

---

## Part Four — State And Style

### W-1 — the npm download figures — **UPHELD, and the section's argument does not survive it**

This is the highest-risk finding in the audit so far: a numbers claim, the exact
shape that produced the wrong correction in the production-terms pass. So I did
not take the agent's figures. I re-fetched both from **npm's own registry API**,
which is the authoritative source rather than a dashboard that mirrors it.

The book, `11-07-zero-runtime-css-in-js-1.md:8-11`, under a heading literally
called "The numbers":

> "Between 2023 and 2026, **styled-components fell from roughly 8.5 million to
> 6.8 million weekly downloads**, about a 20% decline, while **Tailwind doubled
> from 6 million to 12 million**."

Live, `https://api.npmjs.org/downloads/point/last-week/<pkg>`, both for the week
**2026-08-23 → 2026-08-29**:

| Package | Book says now | npm API says | Off by |
|---|---|---|---|
| `styled-components` | 6.8 M | **11,459,678** | +68%, and **wrong in direction** |
| `tailwindcss` | 12 M | **125,634,238** | **~10×** |

**styled-components is higher today than the book's own "before" figure of 8.5
million.** So the sentence does not merely carry a stale number — the decline it
describes is not visible in the measure it cites.

**Do not just swap the numbers in.** Two reasons, and they matter for how this
gets fixed:

1. **125 M does not prove the book's point.** `tailwindcss` is pulled as a
   transitive dependency by a large number of templates and toolchains; npm
   weekly downloads count CI runs, mirrors and Docker builds, not adoption
   decisions. Putting "125 million" in the book replaces a wrong number with a
   misleading one.
2. **The section's thesis needs different evidence.** The chapter's claim —
   "**Runtime** CSS-in-JS declined" — may well be true, but the styled-components
   download trend is now evidence *against* it, not for it. The honest fix is to
   cut "The numbers" section and let the mechanism argument in "Why the runtime
   kind lost" carry the chapter, which it does on its own.

**Recommended fix: delete the numbers, keep the chapter.** Per CLAUDE.md —
"Cannot verify a claim? Cut it. A missing point beats a wrong one."

### shadcn/ui "crossed 75,000 GitHub stars" — **UPHELD**

`11-04-building-a-design-system-2-2-2.md:18` — "**shadcn/ui**, which crossed
75,000 GitHub stars".

Re-fetched from the GitHub API myself (`https://api.github.com/repos/shadcn-ui/ui`):
`stargazers_count` = **123,059**.

"Crossed 75,000" is technically still true — 123,059 did cross 75,000 — but it
reads as a current figure and understates by 64%.

**Recommended fix: cut the star count rather than update it.** A star count in a
printed book is stale the week it prints, and it is doing no work in the
sentence — the point being made is that shadcn supports both Radix and Base UI.
This is the same class of claim as W-1: a number that decorates rather than
proves.

### Everything else from Part Four — **PENDING**

Not yet re-checked: the Apollo `@apollo/client/react` import move (W-2), the
"same size" CSS claim (W-3), the `@utility --value()` syntax error (W-4), the
"Oxide" naming and Rust-rewrite scope (W-5), the `bg-blue-500` GOOD/BAD
contradiction (W-6), the four-vs-five escape hatches miscount (W-7), and the
`11-06`/`11-07` duplication.

Worth noting the agent cleared three things that a sibling finding made me
expect to be broken, so these need no fix: **React Router** is already on the
correct post-v7 `react-router` package name and mentions no Remix;
**vanilla-extract, Panda CSS and StyleX are all actively maintained** (no
Shoelace-style sunset); and **20 of 25 Tailwind 4 API claims** check out
verbatim, including the exact browser floor.

---

## Part Seven — Ship It

### The pricing brief could not be executed — **a useful negative result**

Part Seven was briefed hardest of all eight, because it was expected to hold
every price and quota in the book, and because that is where the sibling
production-terms audit produced its one wrong finding.

**It holds none.** The agent grepped all 66 files for currency symbols, GB/MB,
minutes, "free tier", "/month" and "quota" and found nothing.
`20-04-vercel-vs-aws-amplify-*` is two pages of qualitative platform comparison
with no numbers at all; `20-03-ci-cd-github-actions-*` is a concept page plus
one YAML file.

The trap could not fire because there was nothing to trip it.

**Consequence for the fix pass, and it is a real one:** nobody should "helpfully
add current pricing" to `20-04`. The chapter's numberless comparison is why the
production-terms failure mode is absent here. Leave it numberless.

### The pinned SHA is mislabelled — **UPHELD (verified against GitHub's ref API)**

The best finding in the audit, because of where it sits. Both chapters exist to
teach that **you pin to a SHA precisely because the human-readable comment can
lie** — and their sample carries a lying comment.

The book, identically in two files:

- `19-05-releasing-from-a-monorepo-2-1.md:20`
- `21-02-defending-the-dependency-tree-2-2-2.md:16`

```yaml
- uses: actions/checkout@08c6903cd8c0fde910a37f88322edcfb5dd907a8  # v7.0.0
```

Verified myself against GitHub's git-ref API, both directions:

| Query | Result |
|---|---|
| `api.github.com/repos/actions/checkout/git/ref/tags/v5.0.0` | `08c6903cd8c0fde910a37f88322edcfb5dd907a8` |
| `api.github.com/repos/actions/checkout/git/ref/tags/v7.0.0` | `9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0` |

So the SHA in the book **is** `v5.0.0`, labelled `# v7.0.0`. The agent's figures
were correct in both directions.

**Severity: highest in Part Seven**, above anything with a bigger blast radius,
for three reasons. It is in a **security** chapter. It is the **one sample a
reader copies verbatim** into a real workflow. And a reader who notices the
mismatch loses confidence in the chapter's entire argument.

Fix: either correct the comment to `# v5.0.0`, or move the pin to
`9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0  # v7.0.0`. **Both files, same
change** — they carry the identical line.

### Everything else from Part Seven — **PENDING**

Not yet re-checked, do not apply: `minimumReleaseAgeStrict` defaulting to true
(reported as documented backwards in both halves of the sentence), the `.npmrc`
`minimum-release-age` key existing in neither npm nor pnpm, `turbo.json`
`pipeline` removed in Turborepo 2.0, `report-to` needing a `Reporting-Endpoints`
header, the in-memory-JWT/XSS claim, the OTel install line omitting
`@opentelemetry/instrumentation`, and the Vitest coverage-threshold nesting.

The `minimumReleaseAge` items deserve the closest re-check of the group: npm and
pnpm use **different key names in different files with different units** (npm
documents days, pnpm minutes), so a fix applied from memory will produce a
silent no-op — the same failure the book is currently making.

Flagged NOT CHECKED by the agent and still open: the "1,300 versions / 2 billion
monthly downloads" incident-table rows, the Shai-Hulud 12-hour figure, nginx
image sizes, the German text-expansion 30% figure, and Turbopack speed
multipliers. The axios/CISA row **did** verify (advisory 2026-04-20).

---

## PENDING re-verification — do not apply yet

**Part Five:** W2 (middleware Node runtime stable in 15.5), W3 (`runtime = 'edge'`
deprecated), W4 (HTTP/1.1 persistent connections), W5 (htmx 2.x extensions),
W6 (Cloudflare has no compressed-size limit), W7 (the 10–30s row), and all six
UNVERIFIABLE items.

W6 and W7 are the ones to re-check hardest — they are vendor limit numbers, the
exact shape of claim that went wrong in the production-terms pass.

**Parts Three and Seven:** agents still running.

**Parts One, Two, Four, Six, Eight:** not yet audited.
