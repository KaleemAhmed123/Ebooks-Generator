# Frontend Mastery: accuracy and correctness pass

## 1. Task

- **Name:** Frontend Mastery ebook, review and repair
- **Status:** shipped
- **Started:** 2026-09-01
- **Last updated:** 2026-09-01

The `docs/ebook/frontend-mastery/` booklet was written by a different agent and
never went through the decision record in `docs/tasks/backend-ebook.md`. This
task audits it and brings it up to the same bar as the nine backend booklets.

## 2. What you asked for

> "now review the frontend-mastery ebook content and work on accuracy, recency
> if they are updated as of august last week 2026, correctness, simplicity and
> proper things I have been telling you"

Standing constraints that carry over from the backend book:

- No em dashes. No AI-giveaway vocabulary. US spellings.
- No author first person in teaching content. No personal references.
- Verify every version and API against a live source. Never write from memory.
- Teach the basics of every technology. Concept and problem before code.
- Never skip the theory: what it is, what problem it solved, why.
- Diagrams as inline SVG on `:::mint` blocks. The build has no mermaid support.
- Do not compress. Page count is not a constraint.

## 3. The audit

Ran against 94 markdown files, 40,158 words, 214 printed pages.

### 3.1 Defects that a buyer would see

| # | Defect | Count | Evidence |
|---|--------|-------|----------|
| D1 | `mermaid` code fences print as raw source | 10 blocks | `flowchart` appears 6 times in the PDF text layer, `graph TD` twice, `sequenceDiagram` once |
| D2 | GitHub callouts `> [!TIP]` print the literal marker | 5 | `[!TIP]` x3, `[!NOTE]`, `[!WARNING]` all present in `out/frontend-mastery.html` |
| D3 | Zero diagrams | 0 SVG, 0 `:::mint` | the nine backend booklets carry 38 |
| D4 | Zero part dividers | 0 `part-num` | every long backend booklet has them |
| D5 | Em dashes | 10 | 7 files |
| D6 | AI-giveaway vocabulary | 23 | robust, utilize, crucial, leverage, seamless, game-changer |
| D7 | Two outlines merged, module numbers collide | 8 pairs | Module 4 is both "React Foundations" and "React Core Internals"; Module 3 has two files with the same H1 |
| D8 | Same topic written twice | 4 topics | 12-week roadmap (11-01 and 14-01), monetization (11-02 and 15-01), TypeScript fundamentals (03-01 twice), security (08-01 and 10-01) |
| D9 | Pages overflow the A5 frame | avg 427 words/file vs 136 to 230 in the backend booklets | the build's `--split` was never run |

### 3.2 Accuracy against live sources, checked 2026-09-01

Live npm versions: react 19.2.8, next 16.3.4, typescript 7.0.2,
**tailwindcss 4.3.3**, **vite 8.2.2**, vitest 4.1.11, jest 30.5.0,
cypress 15.21.1, playwright 1.62.1, zustand 5.0.15, svelte 5.57.0,
solid-js 1.9.15, @angular/core 22.1.4, astro 7.2.10,
@tanstack/react-query 5.102.8, react-router 8.3.1, @apollo/client 4.2.12,
**babel-plugin-react-compiler 1.0.0**, eslint 10.9.1, msw 2.15.0,
storybook 10.5.10, nx 23.1.3, turbo 2.10.12.

| # | Claim in the booklet | Reality | Files |
|---|----------------------|---------|-------|
| A1 | Tailwind is "a PostCSS plugin", config lives in `tailwind.config.ts`, CSS starts with `@tailwind base/components/utilities` | Tailwind 4 is CSS-first. `@import "tailwindcss"`, `@theme` for tokens, `@utility` and `@custom-variant` for extension, `@tailwindcss/vite` or `@tailwindcss/postcss`, automatic content detection, no `content` array | all 6 of module 13 |
| A2 | "Next.js aggressively caches everything by default", `force-cache` is the default | `fetch` has not been cached by default since Next 15. Next 16 Cache Components make caching entirely opt-in via `"use cache"` | 20-03 |
| A3 | `revalidateTag('tag')` | Next 16 requires a `cacheLife` profile as the second argument. `updateTag()` and `refresh()` are new | 20-03, 20-02 |
| A4 | Turbopack is "the Next.js future" | Turbopack is stable and the default bundler for dev and build in Next 16 | 07-03 |
| A5 | Vite "uses Rollup for production" and esbuild for dev | Vite 8 ships Rolldown as the single bundler for both, replacing esbuild and Rollup | 07-03 |
| A6 | React Compiler described as an upcoming React 19 thing | React Compiler shipped 1.0. Next 16 exposes it as stable `reactCompiler: true` | 05-02, 22-01 |
| A7 | `middleware.ts` | Renamed to `proxy.ts` in Next 16, runs on Node. `middleware.ts` is deprecated | module 20 |
| A8 | Sync `params` / `searchParams` / `cookies()` / `headers()` | All async in Next 16 | module 20 |
| A9 | Testing module leads with Jest and Cypress | Vitest 4 and Playwright are the defaults teams reach for. Jest 30 and Cypress 15 still exist but are the fallback, not the lead | all 4 of module 15 |

### 3.3 Missing topics

React 19 is barely covered. Absent entirely:

- Hooks: `use()`, `useActionState`, `useOptimistic`, `useFormStatus`,
  `useTransition`, `useDeferredValue`, `useSyncExternalStore`,
  `useEffectEvent`, `<Activity>`.
- Error boundaries. Suspense is mentioned but never taught.
- Modern CSS: container queries, `:has()`, native `@layer`, View Transitions,
  the Popover API, anchor positioning, `color-mix()`, `oklch()`,
  `text-wrap: balance`.
- Security: Content Security Policy, Trusted Types, subresource integrity,
  passkeys and WebAuthn.
- Accessibility: WCAG 2.2, `prefers-reduced-motion`.
- Production reality: error monitoring, feature flags, internationalization.

## 4. Open questions

| # | Question | My recommendation | Your answer |
|---|----------|-------------------|-------------|
| Q1 | How far do we go? | Everything: defects, accuracy, and the missing topics | **Everything.** Plus: real diagrams wherever needed, and every mermaid block replaced with a real, understandable SVG diagram |
| Q2 | Duplicate files | Keep the stronger of each pair, fold in anything unique from the weaker one, delete the weaker | Taken |
| Q3 | Tailwind | Teach v4 as the subject. One short comparison table for teams still on v3 | Taken |
| Q4 | Testing | Lead with Vitest and Playwright. Keep Jest and Cypress as a short "you will meet these in older codebases" section | Taken |

Q3 and Q4 have obvious defaults, so they are taken unless you say otherwise.

## 5. Plan

Phases, in order. Each ends with a clean build and a fresh defect scan.

1. **Structure.** Resolve D7 and D8. One outline, unique module numbers,
   duplicates merged. Add part dividers.
2. **Defects.** D1 mermaid to inline SVG, D2 callouts to `:::note` / `:::mint`,
   D5 em dashes, D6 vocabulary, first person in prose.
3. **Accuracy.** A1 to A9, each verified against a live source before writing.
4. **Coverage.** New pages for the missing topics in 3.3.
5. **Diagrams.** Inline SVG where a picture beats a paragraph, matching the
   backend booklet style.
6. **Build.** Run `--split` so no page overflows, regenerate the PDF, add the
   booklet to the cover set as a standalone companion, like VPS Mastery.
   It stays out of the merged backend volume.

Files touched: everything under `docs/ebook/frontend-mastery/`. Possibly
`docs/ebook/book.config.json` and `docs/ebook/covers/build-set.mjs` in phase 6.

Deliberately not changing: the nine backend booklets, `vps-mastery`,
`react-ai` (you said to ignore it), the build script, the theme.

## 6. Updates

### 2026-09-01, audit complete

Numbers above are measured, not estimated. The booklet builds today at 214
pages and is readable, but it carries ten raw mermaid blocks, a stale Tailwind
module, and a Next.js module written against Next 14 or 15 behaviour.

### 2026-09-01, work complete

Scope confirmed as everything, plus your addition: real diagrams wherever
needed, and every mermaid block replaced with a readable SVG. Packaging is a
standalone companion booklet with its own manga cover, like VPS Mastery.

Result: 292 pages, 288 source files, 54,240 words, 112 topics, 19 diagrams.
One markdown file is one printed page, exactly, so all 140 contents entries
carry a page number that resolves.

A second finding surfaced while rebuilding, recorded in section 6 below.

### 2026-09-01, a second finding: the recorded page counts were stale

Rebuilding the nine backend booklets to check that the splitter fix caused no
regression showed that a fresh build no longer matches the numbers printed on
their covers. The difference is not the fix: the pre-patch script produces the
same fresh numbers.

| Booklet | Cover said | Fresh build |
|---|---|---|
| 1 TypeScript | 88 | 85 |
| 2 Next.js | 57 | 56 |
| 3 Node.js Core | 87 | 84 |
| 4 The Node Ecosystem | 175 | 170 |
| 5 Data & Messaging | 54 | 52 |
| 6 API & Service Design | 67 | 65 |
| 7 AI SDKs | 166 | 161 |
| 8 Deployment & Ops | 394 | 383 |
| 9 AI-Assisted Engineering | 108 | 103 |
| VPS Mastery | 367 | 371 |
| Merged volume | 1,230 | 1,193 |

The fresh builds were checked, not assumed. Booklet 1 at 85 pages carries all
73 contents entries, every one resolves to the correct page, and the last page
is the real closing page. The old numbers were the stale ones.

Since three booklets had already been overwritten by the regression check,
leaving the set half old and half new would have been worse than finishing.
All nine were rebuilt, every cover page count corrected, and the cover set,
the merged volume, and the eleven standalone copies regenerated from them.

`out/008-deployment - Copy.pdf` was not touched, as you asked.

## 7. Explanation

### 7.1 What changed

The booklet went from a merged pair of half-finished outlines with ten raw
mermaid blocks and a Tailwind 3 module, to one ordered book of 23 modules
across 8 parts, checked against live sources on 2026-09-01.

### 7.2 Why it was needed

It was written by another agent, outside the decision record, so none of the
standing rules had been applied and none of the version claims had been
verified. It also carried defects a buyer would see on the page.

### 7.3 How it works, step by step

1. **Structure.** Seven duplicate files deleted, 86 renamed into one numbering,
   8 part dividers added, one H1 per module and none anywhere else.
2. **Defects.** 10 mermaid fences replaced with SVG, 5 GitHub callouts
   converted to `:::mint` and `:::note`, 10 em dashes removed, 23 vocabulary
   hits rewritten, 27 emoji replaced with plain BAD and GOOD labels.
3. **Accuracy.** Every claim below was re-checked against a live source.
4. **Coverage.** 14 new pages for topics that were missing entirely.
5. **Diagrams.** 19 inline SVGs, matching the backend booklet style.
6. **Build.** `--split` until nothing overflows, then the covers.

### 7.4 Files and modules changed

New modules and pages, written from verified sources:

| File | Subject |
|---|---|
| `07-01` to `07-05` | Concurrent React: transitions, Suspense and Error Boundaries, `use`, Actions and the form hooks, Effect Events and `<Activity>` |
| `02-04` | container queries and `:has()` |
| `02-06` | `oklch`, `color-mix`, `light-dark`, text wrapping, cascade layers |
| `02-08` | `<dialog>`, the Popover API, anchor positioning, View Transitions |
| `13-05` | `proxy.ts` and the request boundary |
| `16-03` | WCAG 2.2, `prefers-reduced-motion`, testing accessibility |
| `18-02` | Content Security Policy, nonces, Trusted Types, SRI |
| `18-05` | passkeys and WebAuthn |
| `20-05` | error monitoring, real user monitoring, feature flags |
| `20-06` | internationalization |

Rewritten because they were wrong:

| File | Was | Now |
|---|---|---|
| `11-02` to `11-05` | Tailwind 3, PostCSS plugin, `tailwind.config.ts` | Tailwind 4.3, `@import "tailwindcss"`, `@theme`, `@utility`, `@custom-variant`, `@plugin`, plus a v3 to v4 table |
| `13-03` | "Next.js caches everything by default" | Next 16 Cache Components, `"use cache"`, `cacheLife`, `updateTag`, `refresh`, PPR |
| `13-01`, `13-04` | Pages Router "deprecated", sync params | both routers supported, async params, `useActionState`, Server Action security |
| `19-01` | Vite uses esbuild and Rollup | Vite 8 on Rolldown, Turbopack stable and default in Next 16 |
| `17-01`, `17-03` | Jest and Cypress first | Vitest 4 and Playwright first, Jest and Cypress as the legacy path |
| `08-02` | React Compiler as an upcoming React 19 thing | Compiler 1.0, `reactCompiler: true`, `eslint-plugin-react-hooks`, `"use no memo"` |
| `20-01` to `20-04` | `checkout@v4`, `setup-node@v4`, `pnpm/action-setup@v3`, Node 18, Create React App, Gatsby | `@v7`, `@v7`, `@v6`, Node 24, references removed |
| `10-04`, `14-02` | `react-router-dom` | `react-router`, which is the package name from v8 |

Build and packaging:

- `docs/ebook/build.mjs`: `cutAtBlankLine` now refuses to cut inside a `:::`
  block or an `<svg>`. See 7.5.
- `docs/ebook/covers/build-set.mjs`: added the Frontend Mastery cover, and
  corrected every page count. See section 6.
- `docs/ebook/covers/make-booklet-covers.py`: Frontend Mastery added as a
  companion, so it gets a standalone copy with its manga cover.

### 7.5 Important decisions

**Rewrite the Tailwind module rather than patch it.** v4 is not a version bump.
The config file, the import line, the plugin package, the custom utility
syntax, and the important modifier all changed. Patching would have produced a
page that was half true, which is worse than a page that is out of date.

**Lead testing with Vitest and Playwright.** Jest 30 and Cypress 15 are alive
and a reader will meet both. But Vitest reads the Vite config the app already
has, and Playwright is what new projects pick. They are the lead, with the
older pair kept as the thing you inherit.

**Fix the splitter rather than the five broken pages.** The page packer cut
five SVG diagrams in half, and one `:::` block in the deployment booklet had
the same injury. Trimming those pages would have fixed the symptom and left
the next diagram to break. `cutAtBlankLine` now walks the cut point outwards
until the head side has every `:::` and every `<svg>` closed, and refuses the
cut if no such point exists.

**One markdown file is one printed page, enforced.** Four sections were
running two pages, which silently shifts every contents page number after
them. Found by walking the PDF against the section list, then trimmed. Now
verified: 288 sections, 292 pages, 1 cover plus 4 contents plus 287 content.

**Kept the emoji out.** The backend booklets use box drawing and one check
mark. The frontend booklet had 27 red and green emoji, which do not match and
depend on a fallback font. Replaced with plain BAD and GOOD labels.

### 7.6 Tests and verification

Everything below is a measured result, not an estimate.

| Check | Result |
|---|---|
| Overflowing pages | 0 |
| Sections spilling to a second page | 0 |
| Contents entries resolving to the right page | 140 of 140 |
| Outline entries in the covered copy | 32 of 33, the 33rd being "Cover" |
| Mermaid source visible in the PDF | 0 |
| `[!TIP]` style markers | 0 |
| Em dashes | 0 |
| AI-giveaway vocabulary | 0, other than "Robust" as a WCAG principle name |
| British spellings | 0 |
| Author first person in teaching prose | 0 |
| Split SVG or `:::` blocks | 0, across every booklet |
| Cover text overflowing the page | 0 spans |

Live sources used, all checked 2026-09-01: npm for every version number,
`tailwindcss.com/docs/upgrade-guide` and `/docs/theme`, `nextjs.org/blog/next-16`,
`react.dev/blog/2024/12/05/react-19`, `react.dev/blog/2025/10/01/react-19-2`,
`react.dev/learn/react-compiler/installation`, `vitest.dev/guide/migration`,
`vite.dev` for the Rolldown change, and MDN for anchor positioning support.

### 7.7 Edge cases and limitations

- **The numbers date.** Every version claim is true on 2026-09-01 and no
  later. The comparison tables are written so that a future reader can see
  which era a claim belongs to, which is the best that can be done.
- **Anchor positioning is Baseline 2026.** It reached every engine only when
  Firefox 147 shipped it in early 2026, so a project supporting older Firefox
  needs the JavaScript fallback. The page says so.
- **Tailwind 4 raises the browser floor** to Safari 16.4, Chrome 111, Firefox
  128. Teams below that stay on v3, and the v3 to v4 table is there for them.
- **`react-ai/` was left alone**, per your instruction to ignore it. It is
  still registered in `book.config.json` and still carries em dashes and
  British spellings.
- **The frontend booklet is not in the merged volume.** That volume is the
  backend book. Frontend Mastery ships as a standalone companion with its own
  cover, the same as VPS Mastery.

### 2026-09-01, expanded from the market research

After the accuracy pass shipped, a separate research task looked at what
companies are actually asking for as of September 2026. See
[frontend-mastery-market-research.md](frontend-mastery-market-research.md) for
the sources and the gap analysis.

You picked every tier. The booklet grew from **292 pages to 385**, 23 modules to
**24**, and 19 diagrams to **29**.

A new **Module 21: Supply Chain And Observability** was added to Part Seven, and
the three career modules shifted from 21, 22, 23 to **22, 23, 24**. Twenty new
pages in total, plus five appended sections on existing pages.

Re-verified after the expansion: 0 overflowing pages, 0 spilling sections,
**161 of 161** contents entries resolving, 0 split diagrams, and 0 style-rule
violations. The cover now reads 385 pages and 108 more topics inside.


---

## Update 2026-09-01 — every path in this file moved

The project was restructured into a multi-domain book factory. Nothing above
has been rewritten: those paths were correct when they were written, and this
file is a history, not a snapshot. Read the table when a path here does not
resolve.

| Written as | Lives at now |
|---|---|
| `docs/ebook/01-typescript/` (and 02..09) | `books/tech/typescript-to-deployment/01-typescript/pages/` |
| `docs/ebook/frontend-mastery/` | `books/tech/frontend-mastery/pages/` |
| `docs/ebook/vps-mastery/`, `docs/ebook/react-ai/` | `books/tech/vps-mastery/pages/`, `books/tech/react-ai/pages/` |
| `docs/ebook/frontmatter/`, `docs/ebook/10-backmatter/` | `books/tech/typescript-to-deployment/frontmatter/`, `.../backmatter/` |
| `docs/ebook/theme.css` | `books/tech/theme.css` |
| `docs/ebook/book.config.json` | gone — split into one `meta.json` per book |
| `docs/ebook/build.mjs` | `tools/build.mjs` |
| `docs/ebook/covers/build-set.mjs` | per-book art in `books/tech/cover.mjs`; the set-level pages are still unported, in `tools/legacy/` |
| `docs/ebook/covers/make-booklet-covers.py` | `tools/swap-cover.py` |
| `docs/ebook/covers/assemble-book.py` | `tools/legacy/assemble-book.py`, not ported yet |
| `out/`, `out2/` | archived to `pdf-snapshots/`; new builds land in `dist/<domain>/<series>/` |
| `out/01-typescript.pdf` | `dist/tech/typescript-to-deployment/01-typescript.pdf` |
| `out/booklets-with-covers/` | gone — covers are drawn into the book PDF now |
| `@ HTML-to-REACT.pdf` | `docs/tasks/reference/HTML-to-REACT.pdf` |
| `Kaleem_Ahmed_August_20_UPDATED.pdf` | `shared/author/sources/` |

Two commands also changed:

| Then | Now |
|---|---|
| `node build.mjs --all` (from `docs/ebook/`) | `node tools/build.mjs --all` (from the project root) |
| `node build.mjs 01-typescript` | `node tools/build.mjs 01-typescript` |

The full reasoning is in [multi-domain-ebook-structure.md](multi-domain-ebook-structure.md).
