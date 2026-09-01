# What the frontend market is asking for, September 2026

## 1. Task

- **Name:** Market research, then a candidate topic list for Frontend Mastery
- **Status:** shipped, every tier written
- **Started:** 2026-09-01
- **Last updated:** 2026-09-01

## 2. What you asked for

> "can you do a research on what are the things that companies are expecting as of
> sep1 (we can pick last 2-3months trends, job desc, engineering blogs etc) after
> research make a document of topic lists here and give me in chat and then maybe
> we can think of adding some more topics"

You also pasted a list from another model and asked me to do my own research
rather than take it on trust. Section 6 says where that list holds up and where
it does not.

## 3. Method and source quality

Sources are split into two tiers, because most "2026 frontend trends" results are
SEO content with no data behind them.

**Primary, cited directly:**

- `web.dev/blog/web-platform-06-2026` for what shipped and what reached Baseline
- `2026.stateofcss.com` for measured feature usage
- Cloudflare press release, 16 January 2026, for the Astro acquisition
- CISA alert 2026-04-20, Microsoft Security Blog 2026-05-29, Red Hat RHSB-2026-006,
  and the Singapore CSA advisory, for the npm compromises
- MDN and the Chrome developer docs for browser support and Speculation Rules
- npm registry for every version number
- EU Commission material and enforcement reporting for the Accessibility Act

**Secondary, treated as directional not factual:**

- aggregated job posting skill tags from Built In, Indeed, ZipRecruiter
- vendor blogs and framework comparison sites
- one Karat survey on AI policy in interviews

Where a number comes from tier two it is labelled as such below.

## 4. The findings

### 4.1 The web platform moved, and the survey shows people followed

This is the strongest, best-evidenced theme. Measured usage from State of CSS
2026:

| Feature | Usage | Note |
|---|---|---|
| `:has()` | **83.7%** | both the most used and the most loved feature in the survey |
| `aspect-ratio` | **81.3%** | |
| CSS Nesting | **70.6%** | feedback almost entirely positive |
| Anchor positioning | +15% year on year | the largest usage jump measured |
| `sibling-count()` | +23% awareness | largest awareness jump |
| Gap decorations, `if()` | lowest | browser support still limited |

Shipped or newly Baseline in mid 2026, from web.dev:

- `field-sizing`, Baseline Newly available once Firefox 152 shipped it. Form
  controls that resize to their content, with no JavaScript.
- `rect()` and `xywh()` in `shape-outside`, Baseline Newly available.
- `text-fit`, in development, Chrome 150.
- Gap decorations (`column-rule`, `row-rule`), in development, Chrome 149.
- `background-clip: border-area`, in development.
- Scroll methods returning a Promise that resolves when smooth scrolling ends.
- **`focusgroup`**, in development, Chrome 150. Declarative arrow-key navigation
  across composite controls, with no keyboard event listeners.
- WebSockets no longer disqualify a page from the back/forward cache.
- `firstInterimResponseStart` and `finalResponseHeadersStart` on
  `PerformanceResourceTiming`.

Also reaching Baseline during 2026: container **style** queries, `:open`,
`contrast-color()`, and custom highlights.

### 4.2 Accessibility became a legal exposure, not a preference

The European Accessibility Act has been enforceable since **28 June 2025**, and
2026 is the year enforcement actually started biting:

- France issued formal legal notices to major retailers in July
- Sweden opened market surveillance in October
- the first EAA lawsuits were filed in French commercial court in November
- the Dutch ACM is actively enforcing against e-commerce

Scope: any e-commerce seller with 10 or more employees and 2 million euro or more
in turnover, **including companies outside the EU that sell into it**. The standard
is EN 301 549, which incorporates WCAG 2.1 AA. Penalties reach 100,000 euro or 4%
of annual revenue.

This is why "strict accessibility" now appears in job descriptions as a
requirement rather than a value.

### 4.3 Supply chain security became a frontend problem

2026 has been a bad year for npm, and these are government and vendor advisories,
not blog speculation:

- **axios** compromised, CISA alert 20 April 2026
- **Shai-Hulud worm**, a self-replicating attack hitting `keyv`, `cacheable`,
  `flat-cache`, `file-entry-cache`
- **ChainDrop**, over 1,300 package versions across packages with a combined
  2 billion monthly downloads
- 33 malicious packages using dependency confusion to profile developer machines,
  Microsoft Security Blog, 29 May 2026
- a compromised VS Code extension used to reach a GitHub account and inject code

The pattern changed. These are not typosquats. Attackers took over **real
maintainer accounts and shipped through official releases**, which means a
lockfile alone does not save you.

### 4.4 AI moved from autocomplete to orchestration

- Roughly **29%** of code written by State of JS respondents was AI generated by
  the end of 2025, up from 20% the year before.
- Developers report using AI for around 60% of their work but being able to fully
  hand off only 0 to 20% of tasks. The gap is review and verification.
- Repository-level configuration is now expected: `AGENTS.md`, rules files,
  skills, hooks, and **MCP servers**.
- Figma shipped a native MCP server, so agents can read the design source rather
  than guess from a screenshot.

**Interviews changed too.** A Karat survey in January 2026 found 62% of
organizations still prohibit AI in technical interviews, while Meta and Google are
piloting rounds where an assistant is provided **and your use of it is graded**.
Policy is now per company, and guessing wrong costs you the round.

### 4.5 Rendering strategy stopped being a choice

The clearest signal in the survey data: teams no longer pick one rendering
strategy, they **mix them on one page**. Static shell, streamed dynamic regions,
edge personalization before the HTML is generated.

React Server Components adoption is real but uneven. The recurring complaint in
production write-ups is that teams enabled RSC expecting free performance and got
architectural constraints instead, because they treated server components as
normal components that happen to run elsewhere.

### 4.6 Performance grew a new layer: speculation

The Speculation Rules API is the biggest measurable performance lever added
recently.

- Sites using moderate eagerness see roughly **28% of navigations** already
  prefetched or prerendered.
- Ray-Ban moved mobile LCP from 4.69s to 2.66s, a 43% cut.
- Monrif improved desktop LCP 17.9% and engagement 8.9%.
- Chrome 144, January 2026, added **prerender until script**, which fetches HTML
  and subresources but pauses at the first blocking script, so you get the
  preloading without the side effects.
- From January 2026 on mobile, eager mode fires 50ms after a link enters the
  viewport.

Chromium only. Other browsers ignore the rules, so it is a pure win with no
fallback cost.

### 4.7 Frontend observability became a named job skill

"Frontend Observability" now appears as a tagged skill in senior job postings.
Grafana, Honeycomb, and Observe all launched products under that exact name.
**OpenTelemetry** is becoming the vendor-neutral standard for browser telemetry,
which matters because proprietary agents lock your instrumentation to one vendor.
Elastic's OTel RUM support is still technical preview, so this is a trend to teach
the shape of rather than a stack to commit to.

### 4.8 Design tokens crossed over

- Token adoption reached **84% of teams in 2026**, up from 56% a year earlier.
- The W3C Design Tokens Community Group shipped the first stable **Design Tokens
  Format Module (v2025.10)** on 28 October 2025, backed by Adobe, Google, Meta,
  Figma and 20 more organizations.
- shadcn/ui passed 75,000 stars and now supports both Radix and **Base UI**
  primitives. The copy-the-code model beat the install-a-library model.
- Ark UI ships headless primitives for React, Vue, Solid and Svelte from one
  codebase, so one token set can serve several frameworks.

### 4.9 WebAssembly stopped being exotic

WebAssembly executes on about **5.5% of all Chrome page loads**. The mature
browser use case is offloading work that would otherwise be a server round trip:
image and video pipelines, PDF generation, audio encoding, document parsing,
cryptography. Figma's vector engine is the canonical example. The fastest growing
new use is client-side AI inference for models in the 50MB to 500MB range, which
keeps user data off the network entirely.

### 4.10 The framework map redrew itself

- **Cloudflare acquired Astro** on 16 January 2026. Confirmed by Cloudflare's own
  press release. Astro stays open source. This makes the edge-first content story
  a first-party one.
- **Remix is backed by Shopify** and is the lower-risk full-stack React choice for
  most new projects, per multiple comparison write-ups.
- **TanStack Start** is the interesting entrant for teams that want end-to-end type
  safety on routes, search params and data. Early-adopter territory.
- Next.js still holds the enterprise default position.

### 4.11 What is on the way out

| Declining | Evidence |
|---|---|
| Runtime CSS-in-JS | styled-components fell from ~8.5M to ~6.8M weekly downloads 2023 to 2026, about 20% down, while Tailwind doubled from 6M to 12M |
| Redux in new projects | down 34% since 2021, displaced by Server Components, Zustand and TanStack Query |
| Create React App, Gatsby | already removed from the booklet in the last pass |
| Cypress as the default | Playwright is the new-project default, Cypress is what you inherit |

Note the nuance on CSS-in-JS. It did not die, it **split**. Runtime libraries are
declining, zero-runtime tools (vanilla-extract, Panda CSS, StyleX) are not.

### 4.12 What job postings actually list

Aggregated skill tags from senior frontend postings, tier two evidence:

> GraphQL, Apollo, Design Systems, **Frontend Observability**, Micro Frontends,
> React, TypeScript, **AI Tooling**, CI/CD, **Nx**, **Vite**, Next.js, REST, CSS,
> **edge deployment**

The compensation signal: TypeScript plus Next.js plus edge deployment is quoted at
180,000 to 200,000 USD total comp and above.

The stated shift in what seniority means: owning ambiguous UI work, **verifying
AI-assisted code**, preventing regressions, and reasoning about systems rather
than assembling components.

## 5. Gap analysis against the current booklet

Measured against all 288 source files.

### Already covered, no action needed

`:has()`, container queries, anchor positioning, View Transitions, Popover,
`<dialog>`, `oklch`, `color-mix`, cascade layers, Server Components, streaming,
Suspense, the React Compiler, Signals, React 19 hooks, Cache Components, `proxy.ts`,
Tailwind 4, design tokens, shadcn, Radix, CSP, Trusted Types, passkeys, WebAuthn,
WCAG 2.2, `prefers-reduced-motion`, axe testing, Core Web Vitals, INP, Sentry,
feature flags, i18n, monorepos, Nx, Turborepo, module federation, Vitest,
Playwright, MSW, Lighthouse CI, visual regression, Zod, Astro, islands, HTMX.

### Not covered, ranked by how strong the market signal is

**Tier A, strong evidence and a real gap**

| # | Topic | Why |
|---|---|---|
| A1 | **Speculation Rules and instant navigation** | measured 43% LCP cut in a real case study, Chrome 144 added prerender-until-script, and the booklet does not mention it |
| A2 | **Supply chain security for frontend** | lockfiles, `npm audit`, provenance, SBOM, Dependabot and Renovate, pinning, and why a lockfile did not stop axios or Shai-Hulud |
| A3 | **Frontend observability with OpenTelemetry** | now a literal skill tag in senior postings; the booklet has Sentry but not the tracing model |
| A4 | **The EAA and what compliance means in code** | the legal driver behind the a11y module, currently missing; deadlines, scope, penalties, EN 301 549 |
| A5 | **AI agent configuration** | `AGENTS.md`, MCP servers, Figma MCP, rules files. The booklet has `.cursorrules` and prompting, not the repo-level contract |
| A6 | **Advanced TypeScript for API boundaries** | generic constraints, `satisfies`, inferring types from a schema, tRPC style end-to-end typing. The booklet teaches the type system but not this use of it |
| A7 | **Responsive images and font loading** | `srcset`, `sizes`, AVIF vs WebP, `fetchpriority`, `preconnect`, font subsetting. This is core LCP work and it is absent |
| A8 | **Storybook and component-level testing** | Storybook is the default design-system workbench and does not appear once |

**Tier B, real but narrower**

| # | Topic | Why |
|---|---|---|
| B1 | **WebAssembly for frontend engineers** | 5.5% of Chrome page loads; worth one page on when it is the right answer, not a tutorial |
| B2 | **Web Components, shadow DOM, custom elements** | the framework-agnostic path, and how design systems ship to several frameworks at once |
| B3 | **Edge runtimes** | Cloudflare Workers, Vercel Edge, what runs there and what cannot |
| B4 | **The 2026 framework map** | Astro under Cloudflare, Remix under Shopify, TanStack Start, Qwik and resumability. A decision page, not a tour |
| B5 | **Zero-runtime CSS-in-JS** | Panda CSS and StyleX. The booklet covers vanilla-extract but frames CSS-in-JS as one thing when it has split in two |
| B6 | **Bundle budgets in CI** | size limits that fail the build, which is the enforcement half of the performance module |
| B7 | **Monorepo release engineering** | Changesets, semantic release, versioning packages. The booklet covers build caching but not shipping |
| B8 | **The 2026 interview reality** | five rounds, AI policy varying per company, Meta and Google grading AI use. Concrete and useful for the career module |

**Tier C, small additions to pages that already exist**

| # | Topic | Where it goes |
|---|---|---|
| C1 | `field-sizing`, `text-fit`, gap decorations, `:open`, `contrast-color()`, container **style** queries | the modern CSS module |
| C2 | `focusgroup` | the accessibility module, next to focus management |
| C3 | bfcache, and what disqualifies a page from it | the performance module |
| C4 | CSS Nesting at 70.6% usage | the CSS module, currently unmentioned |
| C5 | `aspect-ratio` at 81.3% usage | the layout module |
| C6 | Base UI and Ark UI | the design system page, beside Radix |
| C7 | OffscreenCanvas | the web workers page |
| C8 | Virtual list libraries by name | the virtualization page |

## 6. Where the pasted list holds up

Your other list was directionally right and light on evidence. Scoring it:

| Their claim | Verdict |
|---|---|
| Server-first and edge | **Correct**, and the survey backs the "mix strategies on one page" framing |
| Signals vs React Compiler | **Correct**, already in the booklet |
| AI-assisted engineering | **Correct but understated.** They said "context engineering" and `.cursorrules`. The actual 2026 shape is MCP servers and `AGENTS.md`, and interviews now grade AI use |
| HTMX, Web Components, Astro islands | **Half right.** HTMX and islands are in the booklet. Web Components is a genuine gap. They missed the Cloudflare acquisition, which is the biggest Astro news of the year |
| Frontend DevOps, Nx, Turborepo, CI | **Correct**, mostly covered |
| Advanced TypeScript, strict a11y | **Correct.** They named the legal pressure without naming the law, the dates, or the penalties |
| | |
| **What they missed entirely** | supply chain security, frontend observability, Speculation Rules, design tokens crossing 84%, responsive images and font loading, WebAssembly, and the decline of runtime CSS-in-JS |

## 7. Open questions

| # | Question | My recommendation | Your answer |
|---|---|---|---|
| Q1 | Which tiers do we add? | Tier A, Tier C, and B1 to B4 | **All of A, all of B, all of C** |
| Q2 | New modules or fold into existing ones? | Fold most in, one new module | **Fold most in, one new module for supply chain and observability** |
| Q3 | Do we mention specific companies and numbers? | Yes, with the date attached | **Yes, name it** |

## 8. What was built, 2026-09-01

Every tier written. The booklet went from **292 pages to 385**, from 23 modules
to **24**, and from 19 diagrams to **29**.

### The new module

**Module 21: Supply Chain And Observability**, placed in Part Seven beside
Security, Build, and Deploy. Five pages:

| Page | Covers |
|---|---|
| The Code You Did Not Write | the threat model, and the 2026 incidents by name: axios, Shai-Hulud, ChainDrop, the 33 dependency-confusion packages, the compromised editor extension |
| Defending the Dependency Tree | `npm ci`, release cooldowns, provenance and Sigstore, Renovate gating, SBOM, `ignore-scripts`, OIDC publishing, SHA-pinned actions |
| What Ships to the Browser | third-party scripts, SRI, self-hosting, CSP `connect-src` as the backstop, keeping an inventory |
| Frontend Observability | errors versus metrics versus traces, lab versus field, p75, segmenting, what to alert on, scrubbing |
| OpenTelemetry in the Browser | spans and traces, `traceparent` propagation joining the browser and server trace, sampling, bundle cost |

### Tier A, folded in

| Page | Module |
|---|---|
| Speculation Rules, plus bfcache | 14 Performance |
| Images and Fonts, Where LCP Is Won | 14 Performance |
| Accessibility and the Law | 16 Accessibility |
| Types at the API Boundary | 5 TypeScript |
| Storybook and Visual Testing | 17 Testing |
| `AGENTS.md` and MCP | 24 AI-Assisted Frontend |

### Tier B, folded in

| Page | Module |
|---|---|
| WebAssembly | 15 Browser APIs |
| Web Components | 9 Component Patterns |
| Edge Runtimes | 12 The Network Layer |
| Choosing a Framework | 13 Next.js 16 |
| Zero-Runtime CSS-in-JS | 11 Styling At Scale |
| Performance Budgets | 14 Performance |
| Releasing from a Monorepo | 19 Build Tools And Repositories |
| What the 2026 Interview Actually Looks Like | 22 The Interview |

### Tier C, appended to existing pages

`field-sizing`, `text-fit`, gap decorations, `:open`, `contrast-color()`,
container style queries, `@starting-style` and CSS Nesting became a page of
their own, **Newer CSS Worth Knowing**, in Module 2. The rest were appended
where they belong: `focusgroup` next to focus management, `aspect-ratio` in the
layout page, Base UI and Ark UI beside Radix in the design system page,
`OffscreenCanvas` in the web workers page, and the named virtualization
libraries plus `aria-rowcount` in the virtualization page.

### Numbers named, as you asked

Ray-Ban's 4.69s to 2.66s LCP cut. 28% of navigations prefetched at moderate
eagerness. Shai-Hulud detected in 12 hours, `debug` and `chalk` in 2.5 hours,
both of which a one-day cooldown would have blocked. `:has()` at 83.7% usage,
`aspect-ratio` at 81.3%, CSS Nesting at 70.6%. styled-components 8.5M to 6.8M
weekly downloads while Tailwind went 6M to 12M. 29% of code AI-generated.
62% of organizations still banning AI in interviews. EAA penalties at 100,000
euro or 4% of revenue. Wasm on 5.5% of Chrome page loads. Every one carries its
date so a future reader can tell how old it is.

### Verification

| Check | Result |
|---|---|
| Pages | 385, from 381 source files plus a 4-page contents |
| Sections spilling to a second page | 0 |
| Contents entries resolving to the right page | **161 of 161** |
| Outline entries in the standalone copy | 33 of 34, the 34th being "Cover" |
| Overflowing pages | 0 |
| Split SVG or `:::` blocks | 0 |
| Em dashes, mermaid, `[!TIP]` markers | 0 |
| AI-giveaway vocabulary | 0, other than "Robust" as a WCAG principle name |
| British spellings | 0 |
| Raw SVG source visible in the PDF | 0 |
| Cover text overflowing | 0 spans |

---

## Update 2026-09-01 — where the booklet lives now

Still accurate; nothing here is superseded. The booklet this research fed moved
from `docs/ebook/frontend-mastery/` to `books/tech/frontend-mastery/pages/`,
and builds with `node tools/build.mjs frontend-mastery`.
