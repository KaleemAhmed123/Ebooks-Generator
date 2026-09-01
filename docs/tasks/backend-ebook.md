# Backend Ebook — "TypeScript to Deployment"

## 1. Task

- **Name:** Backend ebook modelled on *HTML to REACT: The Ultimate Guide* (NgNinja Academy)
- **Status:** DRAFT COMPLETE - 9 booklets, 1,223 pages, audited. Cover set done. A 10th `react-ai` booklet exists but is out of scope and ignored.
- **Started:** 2026-08-30
- **Last updated:** 2026-08-31

## 2. What you asked for

- Read `@ HTML-to-REACT.pdf` and learn its pattern, teaching style, theme, examples, and crispness.
- It is a favourite ebook because it can be skimmed fast — before an interview, or as a refresher before switching projects.
- Build a similar ebook for **backend development**, roughly "TypeScript to Deployment".
- Pick the backend skills from the resume (`Kaleem_Ahmed_August_20_UPDATED.pdf`), then **discuss and finalise**.
- Hard requirement: **cover the Node.js ecosystem — the libraries actually used to build bigger projects — including AI SDKs.**
- Make **no assumptions**. Ask about every single thing.
- **Added mid-discussion:** cover all the skills on the resume; add the AWS services a **medium-traffic** deployment actually needs; **skip React**; add a **quick, to-the-point Next.js section right after TypeScript**.
- **Standing rule:** get correct and latest information for every skill — verify, do not write from memory.

## 3. Source book — reverse-engineered spec

### 3.1 Physical facts
- PDF is 2-up landscape: 200 sheets = ~400 book pages. Text is outlined vector (no text layer), so it was read visually.
- It is **not one book**. It is **9 separate booklets** bound together, each with its own cover, own Table of Content, and its own page numbering (`n / total`).

| # | Booklet | Pages | Covers |
|---|---|---|---|
| 1 | HTML and CSS | 85 | 6 modules: getting started, styling, display/position, semantic HTML5, flexbox/grid/media queries, quirks & tips |
| 2 | JavaScript | 92 | 5 modules: basics, conditionals/collections, objects & functions, prototypes & prototypal inheritance, advanced (hoisting, closures, IIFE) |
| 3 | TypeScript | 34 | flat list: install/config/compile, types, interfaces, enums, generics, union/intersection, utility types, type guards |
| 4 | ReactJS | 71 | 5 modules: getting started/SPA/deploy, basics, styling, advanced (HOC, render props, lifecycle), hooks, Suspense |
| 5 | Web Development | 70 | tooling (git, webpack), HTTP & API (REST, GraphQL, Apollo), performance, security |
| 6 | Web Developer Roadmap [Beginner] | 12 | 12-week study plan |
| 7 | (second roadmap) | 13 | same format, more detail |
| 8 | Project ideas | 14 | ~30 app ideas with feature bullets |
| 9 | Tools For Developers (2) + Make Money Hustles (3) | 5 | dev tools, free APIs, hosting, side income |

### 3.2 Page anatomy (the visual theme)
- **One page = one idea.** Never a wall of text. A page ending half-empty is normal and intentional.
- **Running header** on every page: `NgNinja Academy | All Rights Reserved`. **Footer:** `n / total`, centered.
- **Three heading levels:**
  1. *Module title* — large pink/red bold display font with a yellow offset shadow, alone on a module-opener page above a full-width rule. Also used for booklet cover titles.
  2. *Section title* — serif, centered, **underlined**.
  3. *Sub-heading* — serif, centered, bold, not underlined.
- **Body is nested bullets only** (•, ◦, ▪). Prose paragraphs are essentially absent.
- **Inline code** is monospace and coloured orange/tan, used mid-sentence for identifiers.
- **Code blocks:** dark navy rounded box, light monospace text, generous padding, output shown as a trailing comment (`console.log(sum) // 3`).
- **Illustrations:** hand-drawn sketch on a pastel mint background — only where a mental model is needed (hoisting arrows, prototype chain).
- **TOC:** fully hyperlinked, blue, 3–4 levels deep. The TOC alone is the cheat sheet.
- **Callouts:** light grey box with a blue left bar, for author asides.
- **Cover:** yellow full-bleed, cartoon mascot, huge title, subtitle "The Ultimate Guide", logo bottom-left.

### 3.3 Teaching pattern (repeats almost every page)
1. **State it** in 2–5 bullets. No motivation essay.
2. **Smallest possible example** in a code block.
3. **Explain the example by naming its identifiers** — "`addMe` is the name of the function", "`a and b` are two arguments".
4. **Show the output inline as a comment.**
5. **Mutate the same example** for the next idea. Examples are reused, not reinvented.
6. **Named comparison sections:** "Advantages / Disadvantages", "Pros / Cons", "WITHOUT new operator / WITH new operator".
7. **Explicit interview callouts:** "Interview Question: What is the difference between the `new` operator and `Object.create`".
8. **Repeat deliberately** — same concept restated at increasing depth ("Another example", "Advanced example").

### 3.4 Why it is crisp
- Every bullet is one short sentence, one idea.
- Zero throat-clearing. The first line of a section is already the fact.
- Concepts are named the way an interviewer names them, so the TOC doubles as a question bank.
- A page takes 30–90 seconds. A booklet is a 40-minute skim.

## 4. Open questions

### Answered — round 1

| Question | Your answer |
|---|---|
| Output format | **Markdown → PDF pipeline.** Regenerable, diffable. |
| Book size | **Drop the Interview Prep and Project Ideas booklets** — the concept pages do that job, as in the source. |
| Depth | **Same page recipe, senior-level content.** |
| Examples | **Generic toy examples**, reused and mutated. |

### Answered — round 2

| Question | Your answer |
|---|---|
| HTTP framework | **Express is the spine**; one comparison chapter on Fastify and NestJS. |
| Database spine | **Both split evenly** — MongoDB+Mongoose and PostgreSQL+Prisma, plus "when to pick which". |
| AI SDKs | **Vercel AI SDK** + **LangChain.js / LlamaIndex.ts**, and teach chat, streaming, tool calling, prompt caching, **memory (all types)**, cost control — everything needed for **production agents**. |
| Deployment | **Your stack deep** — Docker + Nginx + EC2 + GitHub Actions end to end, then Lambda / ECS / PaaS compared. |

### Answered — round 3

| Question | Your answer |
|---|---|
| Official OpenAI / Anthropic SDKs | **In, taught underneath the abstractions.** Raw SDKs first, then Vercel AI SDK as the shipping layer, then LangChain / LlamaIndex. |
| Booklet depth for the ecosystem | **Tiered.** ~15 libraries deep, the rest as one-page "what it is / when to reach for it / the gotcha". |
| Diagrams | **Clean SVG/Mermaid diagrams on the source's pastel mint block.** |
| Build order | **TypeScript booklet first.** |

### Answered — round 4 (your mid-turn message)

| Question | Your answer |
|---|---|
| React | **Skipped entirely.** |
| Next.js | **In, as a short to-the-point booklet placed right after TypeScript.** Backend half only — route handlers, server actions, caching, runtimes, deployment. |
| AWS | **Expanded** to the services a medium-traffic production deployment actually needs. See Booklet 8. |
| Resume coverage | Full audit done — see 4c. |

### Standing constraint — never skip the basics

> "Make sure we don't skip basics of every tech and lib"

The source book does this without exception, and it is a large part of why it works as a refresher. **Every technology and every library — including the one-page entries — opens with the basics before anything advanced:**

1. **Who created it / where it came from** (one bullet)
2. **What it is** in 2–4 bullets
3. **Why it exists / what problem it removes**
4. **Install and first run** — the smallest working snippet
5. *Then* the deeper material

No chapter starts in the middle. A reader who has never touched the library must be able to follow page one of its section. This applies to the ~30 one-page library entries in Booklet 4 as much as to the deep chapters.

### Standing constraint — accuracy

> "make sure you get correct and latest info and same applies on all skills"

**How this is honoured:** before writing any booklet, library versions and APIs are verified against current documentation (Context7 / official docs), not written from memory. Every booklet carries a dated **"verified against"** line naming the versions its code was checked at. Anything that cannot be verified is marked in the text rather than guessed.

### Defaults taken (named, not assumed silently)

- **Runtime:** Node.js LTS is the spine. Bun and Deno get called out only where they genuinely differ.
- **Tone:** written as if it will be published — no client names, no internal details.
- **GraphQL / gRPC:** GraphQL in as one short chapter; **gRPC out** — it rarely appears in Node interviews.
- **Running header:** `Kaleem Ahmed | All Rights Reserved`, held as one string in `book.config.json` so it re-renders everywhere from a single edit.

### Answered — round 5

| Question | Your answer |
|---|---|
| JavaScript fundamentals | **~12-page module inside Booklet 3 (Node.js Core).** Closures, `this`, prototypes, hoisting, `call/apply/bind`, IIFE — the classic interview set, compressed, sitting next to the event-loop chapter it depends on. |
| Python / FastAPI | **Out.** The book stays "TypeScript to Deployment". |
| WebRTC | **Full treatment, ~15 pages** in Booklet 6 — signalling, offer/answer/ICE, SDP, STUN vs TURN and its cost, SFU vs mesh vs P2P, recording, call glare and reconnect. |
| Spec-Driven Development | **A closing booklet at the very end** — spec-driven development in short, plus the other AI-assisted coding practices the industry is actually running. |

### Nothing open

All scope questions are answered. Remaining gates are approvals, not questions:
1. Approve the Booklet 1 contents (section 5b).
2. Confirm the running header string.

## 4b. Frozen scope

**Title:** *TypeScript to Deployment: The Ultimate Guide*
**9 booklets, ~620 pages** (Booklet 1 came in at 121 rather than 48 — you asked for complete coverage). Interview-prep and project-idea booklets deliberately dropped — the concept pages do that job, as they do in the source.

| # | Booklet | Pages | Spine decisions |
|---|---|---|---|
| 1 | TypeScript for Backend | **121 (done)** | Node LTS, ESM-first with CJS interop covered |
| 2 | Next.js — the backend half | ~18 | Route handlers, server actions, caching, runtimes. No React UI. |
| 3 | Node.js Core | ~72 | JS foundations module (~12), event loop, streams, backpressure, workers, graceful shutdown |
| 4 | The Node Ecosystem | ~90 | ~15 deep + ~30 one-pagers |
| 5 | Data & Messaging | ~70 | MongoDB and PostgreSQL equal depth, Redis, RabbitMQ, patterns |
| 6 | API & Service Design | ~77 | REST spine, GraphQL one chapter, real-time, **WebRTC in full (~15)**, gRPC out |
| 7 | AI SDKs for Backend | ~72 | raw SDKs → Vercel AI SDK → LangChain/LlamaIndex, production agents |
| 8 | Deployment & Ops on AWS | ~85 | Docker + Nginx + EC2 + Actions deep; full medium-traffic AWS surface |
| 9 | AI-Assisted Engineering Practices | ~12 | Closing booklet — spec-driven development and how teams actually work with AI |

## 4c. Resume coverage audit

| Resume skill | Where it lands |
|---|---|
| Node.js | Booklet 3 |
| Express.js | Booklet 4 (deep), Booklet 6 (design) |
| TypeScript | Booklet 1 |
| JavaScript | **Open item 1** — proposed as a module in Booklet 3 |
| React / Next | React **skipped** by your instruction; Next.js = Booklet 2 |
| Python | **Open item 2** — proposed out |
| REST API Design | Booklet 6 |
| MongoDB, PostgreSQL, Prisma, SQL | Booklet 5 |
| Redis | Booklet 5 |
| RabbitMQ, Message Queues | Booklet 5 |
| LLM-Powered Applications | Booklet 7 |
| RAG, Vector Search | Booklet 7 |
| Prompt & Context Engineering | Booklet 7 |
| Agentic Workflows | Booklet 7 |
| OCR | Booklet 7 |
| Human-in-the-Loop Guardrails | Booklet 7 |
| Spec-Driven Development | **Open item 4** — proposed as a module in Booklet 7 |
| Socket.IO, WebSockets | Booklet 4 (library), Booklet 6 (patterns) |
| WebRTC | **Open item 3** — proposed as a backend-only chapter in Booklet 6 |
| Tailwind CSS | Out — frontend, and React is skipped |
| Docker | Booklet 8 |
| AWS (IAM, EC2, Lambda, S3, VPC) | Booklet 8, expanded |
| Nginx | Booklet 8 |
| Prometheus, Grafana | Booklet 8 |
| Winston | Booklet 4 (with pino) |
| Razorpay, Stripe, Shiprocket, Twilio, WhatsApp API | Booklet 4 one-pagers, Booklet 6 webhook chapter |

## 5. Plan

### 5.1 Approach

Write the book as **plain Markdown, one file per page**, and render it with a small build script into a PDF matching the source book's look. Markdown is the source of truth so a typo is a one-line diff, not a re-export.

### 5.2 Files

```
docs/ebook/
  book.config.json          # header string, title, per-booklet metadata
  theme.css                 # the whole visual theme, one file
  build.mjs                 # markdown -> single HTML -> PDF
  01-typescript/
    00-cover.md
    01-01-what-is-typescript.md
    ...
  02-nextjs/
  ...
out/
  01-typescript.pdf
  typescript-to-deployment.pdf   # all booklets concatenated
```

**One Markdown file = one printed page.** That is what forces the source book's discipline: if a page will not fit, the idea has to be split — which is exactly what makes it skimmable.

### 5.3 Rendering

`marked` turns Markdown into HTML, `theme.css` styles it, and headless Chrome (via `puppeteer-core` against the already-installed Chrome) prints it to PDF. Puppeteer is used only for its `footerTemplate`, the one clean way to get `n / total` on every page.

**Rejected alternatives:**
- *Pandoc → LaTeX* — Pandoc is already installed, but LaTeX fights the typography this book needs (display headings with offset shadow, dark code blocks, mint illustration blocks).
- *Chrome CLI `--print-to-pdf`* — zero dependencies, but no usable footer template, so page numbers would have to be faked.
- *Writing HTML directly* — kills the diffability that made Markdown the choice.

### 5.4 Style rules the build enforces

- Running header on every page; footer `n / total`.
- Three heading levels only.
- Body is nested bullets; prose paragraphs are the exception.
- Inline code orange monospace; code blocks in the dark navy box.
- Output shown as a trailing comment inside the code block.
- Diagrams in a pastel mint block, same role and placement as the source's sketches.
- Every booklet carries a dated **"verified against"** line.

### 5.5 Order of work

1. Freeze Booklet 1 contents (below) — **needs approval**.
2. Build `theme.css` + `build.mjs` + `book.config.json`, render **one sample page** for sign-off.
3. Write Booklet 1 in full.
4. Then Booklets 2 → 8, verifying library docs before each.

## 5b. Booklet 1 — TypeScript for Backend — full contents (~48 pages)

**Module 1 — Getting started on the server**
- Who created TypeScript / What TypeScript is
- What TypeScript is **not** — it disappears at runtime
- Install and run: `tsc`, `tsx`, `tsup`
- The `tsconfig.json` fields that actually matter
  - `target`, `lib`, `module`, `moduleResolution`
  - `strict`, and what each strict flag buys you
  - `esModuleInterop`, `allowSyntheticDefaultImports`
  - `paths`, and why they break at runtime
- ESM vs CommonJS in Node
  - `"type": "module"`
  - why imports need the `.js` extension
  - `__dirname` in ESM
  - interop gotchas
- Compile vs transpile — `tsc` vs `esbuild` vs `swc`, and who actually type-checks
- Source maps and readable stack traces in production

**Module 2 — The type system you actually use**
- Primitives and inference
- `any` vs `unknown` vs `never`
- `interface` vs `type` — when each
- Optional, `readonly`, index signatures
- Arrays vs tuples
- Enums, and why a `const` object often beats one
- Literal types and `as const`
- `satisfies`
- Functions: overloads, typing `this`, generic functions
- Structural typing and excess property checks

**Module 3 — Unions, narrowing and guards**
- Union types
- **Discriminated unions**
- Narrowing: `typeof`, `instanceof`, `in`, truthiness
- User-defined type guards — `x is Foo`
- Assertion functions — `asserts x is Foo`
- Exhaustiveness checking with `never`
- *Interview Question:* `unknown` vs `any` vs `never`

**Module 4 — Generics and utility types**
- Generics basics
- Constraints with `extends`
- Default type parameters
- `keyof`, `typeof`, indexed access types
- Mapped types
- Conditional types and `infer`
- Utility types: `Partial` `Required` `Readonly` `Pick` `Omit` `Record` `Exclude` `Extract` `NonNullable` `ReturnType` `Awaited` `Parameters`
- Building a typed `Result<T, E>`

**Module 5 — TypeScript at the service boundary** *(the senior half)*
- Types are compile-time only — the trust-boundary problem
- Runtime validation with `zod`, and inferring the type from the schema
- Typed environment config that fails fast at boot
- Typing Express — module augmentation for `req.user`
- Typing async — `Promise`, `Awaited`, typing what can be thrown
- Typed errors: discriminated error unions vs `throw`
- DTOs vs domain models vs database rows
- **Branded types** so a `userId` cannot be passed where an `orderId` belongs
- Declaration files, `@types`, and writing your own `.d.ts`
- *Interview Question:* why does `as` not make code safe?

**Module 6 — Quirks, tips and tricks**
- The `tsconfig` mistakes that bite in production
- Why `strictNullChecks: false` undoes the whole point
- `import type`, and why bundlers care
- Circular imports
- Why your type-check got slow
- Migrating a JavaScript codebase one file at a time
- Testing your types

## 5c. Booklet 2 — Next.js, the backend half (~18 pages, to the point)

- What Next.js is, and which part of it is actually a backend
- App Router vs Pages Router — what changed and what it means for APIs
- **Route Handlers** (`app/api/.../route.ts`) — request, response, streaming
- Server Components vs Client Components — only the data-fetching consequence
- **Server Actions** — what they are, when they replace an API route, and the security rules
- Middleware and its Edge-runtime limits
- **Caching**: request memoization, Data Cache, Full Route Cache, `revalidate`, `revalidateTag`, `no-store`
- Node runtime vs Edge runtime — what breaks on Edge
- Environment variables: server-only vs `NEXT_PUBLIC_`
- Auth patterns: cookies, sessions, middleware guards
- Talking to a database from Next.js — the connection-pooling problem
- Streaming an LLM response from a Route Handler
- Deploying: Vercel vs self-hosted Docker (`output: "standalone"`)
- **When NOT to use Next.js as your backend**

## 5d. Booklet 8 — AWS surface for medium traffic (expanded per your instruction)

**Compute & containers:** EC2, Auto Scaling Groups, Launch Templates, ECR, **ECS Fargate**, Lambda
**Networking:** VPC, public/private subnets, NAT Gateway, Security Groups, NACLs, **ALB** with target groups and health checks, **Route 53**, **CloudFront**, **ACM** for TLS
**Data:** **RDS PostgreSQL** (Multi-AZ, read replicas, parameter groups, connection limits), **ElastiCache for Redis**, **DocumentDB or MongoDB Atlas**, S3 (lifecycle rules, presigned URLs, CloudFront OAC)
**Messaging:** **SQS**, **SNS**, **Amazon MQ** (managed RabbitMQ), **EventBridge** for schedules and event buses
**Config & secrets:** SSM **Parameter Store**, **Secrets Manager**, **Session Manager** so you can stop using SSH keys
**Observability:** CloudWatch Logs / Metrics / Alarms / Log Insights, **X-Ray** tracing, alongside self-hosted Prometheus + Grafana + Loki
**Security:** IAM roles vs users, least privilege, instance profiles, **WAF**, Shield basics
**Delivery:** GitHub Actions → ECR → ECS/EC2, blue-green vs rolling, migrations in the pipeline
**Reliability & cost:** backups and snapshots, RTO/RPO, health and readiness probes, load testing with k6, Budgets, Cost Explorer, right-sizing

## 5e. Booklet 9 — AI-Assisted Engineering Practices (~12 pages, closing booklet)

Short, practical, and last in the book. What teams are actually doing, not opinion pieces.

- **Spec-Driven Development** — write the spec first, make it the contract the model builds against
  - what belongs in the spec, and what does not
  - why a spec beats a longer prompt
- **Context engineering for a codebase** — what the model needs loaded, and what poisons the context
- **Rules files** — `CLAUDE.md`, `AGENTS.md`, `.cursorrules`: what teams put in them
- **Human-in-the-loop gates** — where a human must sign off, and where review is theatre
- **Reviewing AI-generated code** — the failure modes to look for first
- **Security of generated code** — injected dependencies, leaked secrets, silently wrong auth checks
- **Tests as the guardrail** — why AI-assisted work raises the value of a failing test
- **Evals for code tasks** — how teams measure whether the assistant is helping
- **Agents in the dev loop** — what to hand off, what to keep
- **Team conventions** — commit hygiene, attribution, and what goes in the PR description
- **When to override the model** — the judgement that stays human

## 6. Updates

- **2026-08-30** — Read the source PDF (200 sheets / 9 booklets), reverse-engineered the style spec above. Read the resume for candidate skills.
- **2026-08-30** — Four rounds of scope discussion. React dropped, Next.js backend booklet added, AWS surface expanded for medium traffic, full resume coverage audited.
- **2026-08-30** — Round 5 closed the last four gaps. **Scope frozen at 9 booklets / ~544 pages.** JavaScript foundations folded into Booklet 3, Python out, WebRTC gets full treatment, and a closing Booklet 9 on AI-assisted engineering practices. Plan, Booklet 1 contents, Booklet 2 contents, Booklet 9 contents and the AWS surface all written. Booklet 1 contents approved, header set to `Kaleem Ahmed | All Rights Reserved`.

- **2026-08-30** — Added the standing rule to never skip the basics of any technology or library. Built the Markdown->PDF pipeline (`docs/ebook/`) and rendered 9 sample pages of Booklet 1 to `out/01-typescript.pdf`. Verified TypeScript 7.0.2, zod 4.5.4 and the Node type-stripping timeline against current sources rather than memory. Awaiting sign-off on the look before writing Booklet 1 in full.

## 7. Explanation — the build pipeline and sample pages

### 7.1 What changed

A working Markdown → PDF pipeline now exists at `docs/ebook/`, plus **9 real sample pages** of Booklet 1 rendered into `out/01-typescript.pdf` (11 printed pages including cover and contents).

### 7.2 Why it was needed

The whole book depends on one rule: **one idea per page**. That rule cannot be enforced by good intentions across 544 pages. It needs a build that fails loudly when a page grows too long, and a theme that makes the right thing look right by default.

### 7.3 How it works, step by step

1. `build.mjs` reads `book.config.json` for the page size, margins and running-header string.
2. It lists the `.md` files in a booklet directory and sorts them. **One file becomes one printed page.**
3. Each file passes through three transforms before Markdown parsing:
   - `containers()` turns `:::mint` / `:::note` / `:::interview` blocks into styled `<div>`s.
   - `protectSvg()` lifts every raw `<svg>` block out and leaves a comment placeholder. This is necessary because Markdown splits on blank lines, and a readably-formatted SVG is full of them — without this the diagram is torn into fragments. The SVGs are pasted back after parsing.
   - `marked` converts the rest to HTML.
4. Every `h1` / `h2` / `h3` gets a stable anchor id and is recorded, so the **Table Of Content page is generated automatically** — hyperlinked, three levels, matching the source book.
5. The pages are wrapped in `<section class="page">`, which carries `break-after: page`.
6. `theme.css` is inlined and headless Chrome (via `puppeteer-core` against the installed Chrome) loads the document.
7. **Before printing**, the build measures every `.page` section against the printable height and warns for each one that spills, naming the source file and by how much.
8. Chrome prints to PDF with the running header top-left and `n / total` centered in the footer.

### 7.4 Files

| File | What it does |
|---|---|
| `docs/ebook/book.config.json` | Page size (A5, matching the source), margins, running-header string, booklet list |
| `docs/ebook/theme.css` | The entire visual theme — three heading levels, code block, mint block, callout, cover, TOC, verified stamp |
| `docs/ebook/build.mjs` | Markdown → HTML → PDF, TOC generation, SVG protection, overflow warnings |
| `docs/ebook/package.json` | Two dependencies: `marked`, `puppeteer-core` |
| `docs/ebook/01-typescript/*.md` | 9 sample pages: cover, Module 1 (5 pages), Module 5 (3 pages) |

### 7.5 Important decisions

- **Page size is A5 portrait (148 × 210 mm)** — measured from the source PDF, whose individual book pages are 421 × 595 pt. This is *why* the source feels so skimmable: a small page physically cannot hold two ideas.
- **Colours were sampled from the source PDF**, not guessed: code block `#13213d`, module title `#ef476e` with a `#ffd166` offset shadow, mint block `#e2fcf3`, inline code `#c8ae75`, links `#2020ee`.
- **Overflow warns instead of failing the build** — a warning names the file to split, which is the useful signal; a hard failure would just block a preview.
- **Diagrams are hand-written inline SVG**, not a diagram library. No runtime dependency, no render wait, sharp at any zoom, and editable as text.
- **Rejected** Pandoc→LaTeX (fights this typography), Chrome CLI `--print-to-pdf` (no footer template), and hand-written HTML (loses diffability).

### 7.6 Verification

- `node build.mjs 01-typescript` → `out/01-typescript.pdf`, 11 pages, **zero overflow warnings**.
- Rendered every output page back to PNG and inspected: heading hierarchy, running header, footer numbering, dark code blocks, mint diagram block, `:::note` callout and the auto-generated hyperlinked TOC all match the source book.
- The overflow check was proven to work: the first draft reported four pages over (185 mm, 269 mm, 242 mm, 270 mm against a 180 mm limit); splitting them cleared all four.
- **Content accuracy was verified, not recalled.** `npm view` and current documentation established TypeScript **7.0.2** (not 5.x), zod **4.5.4**, and the exact Node type-stripping timeline. TypeScript 7 removed `target: es5`, `moduleResolution: node10` and `classic`, the `amd`/`umd`/`systemjs` module modes, and `baseUrl` as an alias mechanism — all of which would have been written wrong from memory.

### 7.7 Edge cases and limitations

- **Only 9 sample pages exist.** Booklet 1 is not written; these pages prove the pipeline and the look.
- **Fonts are system fonts** (Georgia, Century Gothic, Consolas). On a machine without them the PDF shifts. Embedding webfonts is a later fix if the book is ever distributed as a source repo.
- **The overflow limit is a height estimate**, not Chrome's exact pagination. A page a millimetre or two under the limit can still break awkwardly.
- **No syntax highlighting in code blocks** — the source book has none either, so this matches deliberately. Adding it later is one `marked` option plus a stylesheet.
- **Booklets 2–9 have no directories yet.** `--all` skips missing ones rather than failing.


## 8. Update — Booklet 1 shipped, 2026-08-30

### What changed

- **Booklet 1 (TypeScript for Backend) is written in full**: 121 content pages + cover + 6 contents pages = **128 printed pages**, at `out/01-typescript.pdf`.
- Your two follow-up instructions were applied: **cover everything a developer needs**, and **make the skill bolder**.
- Confirmed for you: **changing the palette later is a single edit.** Every colour is a CSS variable at the top of `theme.css`; change the six values and every page re-renders.

### Bolder skill identity

- Cover title raised to 46pt with a heavier offset shadow.
- The **skill name now appears in bold on the right of every page header**, opposite `Kaleem Ahmed | All Rights Reserved`.
- Cover carries a small book line above the title: `TYPESCRIPT TO DEPLOYMENT · THE ULTIMATE GUIDE`.
- *Interpretation taken:* "bolder about the skill we are in" was read as visual prominence, not a bolder writing voice. Cheap to change either way.

### The six modules, as shipped

1. **Getting started on the server** — what TypeScript is and is not, install, three ways to run it, `tsconfig` field by field, `strict` flag by flag, ESM vs CommonJS, the three ESM gotchas, `paths` at runtime, `tsc` vs `esbuild` vs `swc`, source maps
2. **The type system you actually use** — primitives and inference, arrays/tuples/objects, `any`/`unknown`/`never`, `interface` vs `type`, optional/`readonly`/index signatures, enums and why `const` objects win, literal types and `as const`, `satisfies`, functions, overloads, typing `this`, structural typing, excess property checks
3. **Unions, narrowing and guards** — unions, intersections, discriminated unions, all four narrowing forms, user-defined guards, assertion functions, exhaustiveness with `never`, interview recap
4. **Generics and utility types** — generics, constraints, defaults, `keyof`/`typeof`/indexed access, mapped types, conditional types and `infer`, all thirteen utility types, building a typed `Result<T, E>`
5. **TypeScript at the service boundary** — the trust boundary, `zod` schemas, validating at the edge, typed env config, typing Express via module augmentation, typing async, typing what can be thrown, typed errors, DTO vs domain vs row, branded types, declaration files, interview recap on `as`
6. **Quirks, tips and tricks** — the `tsconfig` mistakes that bite, `strictNullChecks`, `import type` and `verbatimModuleSyntax`, circular imports, slow type-checks, incremental migration, testing your types, closing recap

### Two real bugs found and fixed in the build

1. **Pages were measured at screen width, not the printed 120 mm column.** Text wrapped differently, so every height was wrong, and one page ended up orphaning a code block on its own. Fixed by emulating print media and setting the viewport to the true printable width before measuring.
2. **The splitter skipped any page whose first section was shorter than half the page.** The greedy chunker never reached its target and returned a single chunk. Fixed with a balancer that also cuts when the remaining sections exactly match the chunks still needed.

### New capability: `--split`

```bash
node build.mjs 01-typescript --split
```

- Merges any previous split back to the original pages, then re-splits from scratch at heading boundaries until every page fits.
- Parts are named `<base>-1.md`, `<base>-2.md`, so they sort in order and can always be merged back.
- Targets 85% of the page height, leaving slack for code blocks, which cannot be broken across pages.
- This is what turned 63 over-long drafts into 121 pages that each fit, without hand-editing.

### Verification

- `node build.mjs 01-typescript` → **zero overflow warnings**.
- Scanned all 128 output pages for near-empty ones: **none** (previously there was one orphaned code block).
- Contents page tightened to 6 pages, three levels deep, module titles bold, every entry hyperlinked.
- Spot-checked cover, contents, a code page, a generics page and a `zod` page against the source book's layout.

### Known limitations

- Page count is 121, not the estimated 48. That is a direct consequence of "cover everything" plus one-idea-per-page. The remaining booklets will scale similarly, so the book will land nearer 620 pages than 544.
- The auto-splitter cuts at heading boundaries, so a few pages are lighter than others. It never produces an orphan, but it does not balance perfectly.
- Booklet 1's diagram count is low — one SVG so far. More diagrams are worth adding on the narrowing and prototype-style pages.

## 9. Update — density pass, 2026-08-30

### What you asked for

> "the setup part could be more dense ... I don't want to cut a single word just we could have make it more compacted ... if it is new topic it make sense to start on a new page but for same concern we can utilize"

Plus: use **Kaleem** in examples, and **Rabiya** where a second name is needed.

### The rule, as implemented

- **A new topic (a `##` section, which is one markdown file) always starts a fresh page.** Unchanged — you were right that this makes sense.
- **Its sub-sections (`###`) now flow on until the page is genuinely full**, then continue on the next page.
- Previously the splitter *balanced* a long page into equal halves. That is what stranded "The rule of thumb" alone on a near-empty page.

### Result

| | Before | After |
|---|---|---|
| Printed pages | 128 | **93** |
| Pages under 320 characters | 15 | **5** (excluding the cover) |
| Words cut | — | **none** |

Your screenshot example — the Module 2 opener, "You usually should not write those annotations" and "The rule of thumb" — was three pages. It is now **one full page**.

### How the 27% reduction was achieved, without cutting anything

1. **Greedy fill instead of balancing.** The splitter now measures where every heading sits on the printed page and cuts before the first one that did not fit, rather than halving the content.
2. **Tighter typography.** Body 9.2pt to 8.8pt, line-height 1.55 to 1.45, module title 26pt to 22pt, section title 15pt to 13.5pt, sub-heading 11.5pt to 10.5pt, code 8.2pt to 7.8pt, and smaller margins on headings, lists, code blocks and callouts.
3. **Two guard rails**, because pure greed produced its own ugliness:
   - *Never strand a module title alone.* If a cut would leave under 35% of a page, the splitter cuts inside the section instead. This was stranding "Module 4 — Generics and utility types" on a page by itself.
   - *Never leave a sliver.* If the remainder would be under a fifth of a page, the cut moves back one heading.

### Bugs found and fixed during this pass

1. **Synthetic "— continued" headings survived a merge** and reappeared mid-page, out of order — one page showed a sub-heading *above* the section heading it belonged to. `mergeParts` now strips them wherever they appear, so the markdown self-heals on the next `--split`.
2. **The contents page spilled a single entry onto a seventh page.** Tightened to 7.8pt / 1.28 line-height; it now fits in six.

### Names

- `greet("world")` is now `greet("rabiya")`.
- `Array<string> = ["kaleem", "rabiya"]`.
- `greet("rabiya", "hi", true)` in the default-parameter example.
- Kaleem remains the default single-person name throughout.

### Still open

- Six pages remain lighter than the rest. They are the natural tail of a topic that does not divide evenly into pages, and the source book has the same thing. Cutting them further would mean cutting words.

## 10. Update - human voice and portfolio scrape, 2026-08-30

### Standing constraint: it must read as human-written

> "I want user's to give highly view that I wrote it personally a human wrote it so no ai kinda dashes and phrases etc"
> "I said unnecessary AI types dashed etc not where needed it should not look like AI written should have human touch"

Not a ban on dashes. The rule is that no page should feel machine-generated.

- **Unnecessary em dashes removed.** Booklet 1 had 122. Now zero.
  - Headings and definition bullets use a plain hyphen, which is what the source book itself does (`Module 1 - Getting Started`, `Selectors - Id, Class, Element-tag`).
  - Mid-sentence dashes became short separate sentences, which also matches Kaleem's own portfolio voice.
- **AI vocabulary audit: clean.** Scanned for delve, leverage, robust, seamless, cutting-edge, utilize, myriad, plethora, realm, landscape, elevate, unlock, harness, embark, and phrases like "it is worth noting", "in today's world", "when it comes to", "not just X but Y". Zero hits in Booklet 1.
- Four fragments the conversion created were repaired by hand.
- `build.mjs` now writes ` - continued` rather than an em dash.

### Personal traces

`portfolio.txt` in the project root holds a full scrape of kaleemahmed.in, including all five project case studies. It is the source for:

- **Names.** Kaleem is the default, Rabiya is the second person, Hamza if a third is needed.
- **Domain nouns.** Orders, sellers, wallets, payouts, shipments, offers, students, suppliers, catalogue items. Never foo and bar.
- **Real war stories** to draw examples from: the wallet TOCTOU race, the cart identity key-order bug, the circuit breaker that manufactured fake success, the stream parser chunk-boundary bug, the four-second embedding timeout.
- **Voice samples.** Twenty verbatim lines from his case studies, kept so the ebook can sound like the same person wrote it.

### Voice rules taken from the portfolio

- Short declarative sentences.
- Name the failure concretely. "a sales order that exists in Salesforce and does not exist in SAP", not "data inconsistency".
- Admit gaps openly instead of hiding them.
- Close a section with a rule of thumb, not a summary of what was just said.
- No marketing adjectives.

Also saved to persistent memory as `ebook-human-voice-rule` and `ebook-project-scope`, so it survives across sessions.

### Correction, same day

I over-read the "personal traces" instruction and proposed first person, named projects, and real war stories. That was wrong and was rejected.

**What was actually meant:** traces are the **example values only**. Names inside code samples and realistic domain nouns instead of foo and bar. Nothing more.

**Ruled out explicitly:** first person, "I" anywhere, personal stories, real project names, real bugs as teaching examples. The book stays a teaching reference in the same register as the source ebook.

**Spelling decided:** American, -ize and -or. Booklet 1 converted (behaviour, colour, initialised) and rebuilt.

`portfolio.txt` is still useful, but only as a pool of names and domain nouns. The voice-sample and war-story sections in it are reference material for tone, not content to lift.

### Standing constraint: teach the latest version, and its lesser-known wins

> "make sure we teach the latest version and pick the latest versions useful things tips and trick just to give example in express 5 we don't need async await in every funtion we have global error middleware so things like these"

Two parts.

1. **Always teach the current version**, not the version most tutorials are still on. Verify with `npm view <pkg> version` and the official docs before writing.
2. **Every booklet gets a section on what is new and underused.** The recent-version features that quietly remove boilerplate or a whole dependency, which most developers have not picked up yet.

Examples of the kind of thing that belongs there:

| Tech | The win |
|---|---|
| Express 5 | async errors reach the error middleware on their own. `express-async-handler` and try/catch in every route are no longer needed |
| TypeScript 7 | Go-native compiler, `--checkers` and `--singleThreaded` for CI, `erasableSyntaxOnly` |
| Node 24 | runs `.ts` files with no build step, native `fetch`, `AsyncLocalStorage` for request context |
| Next.js 16 | `next typegen` route-literal types, `updateTag` for read-your-writes, `proxy.ts`, Turbopack by default, concurrent `dev` and `build` |
| Zod 4 | top-level string formats, faster parsing |
| Prisma 6 | typed SQL, driver adapters |

Rule for the section: if it is on the framework's front page it does not qualify. It has to be something a working developer would say "I did not know that" to.

## 11. Update - Booklet 2 shipped, 2026-08-30

**Next.js, the backend half.** 55 printed pages at `out/02-nextjs.pdf`. Estimated at 18, came in at 55, same reason as Booklet 1: complete coverage plus one idea per page.

### Six modules

1. **Getting started** - what Next.js is, which half is the backend, what this booklet leaves out, install and run, App Router vs Pages Router, the file conventions that matter
2. **Route Handlers** - first handler, all seven methods, a request lifecycle diagram, reading body/formData/query, async params, `RouteContext` typing, cookies and headers, responses and status codes, webhooks with HMAC verification, the three webhook rules, CORS, streaming, streaming an LLM response, route segment config
3. **Server Components and Server Actions** - the data-fetching consequence only, when a route handler is still needed, Server Actions, Server Action security, `updateTag` vs `revalidateTag` vs `refresh`
4. **Caching** - a diagram of all four layers, request memoization, the Data Cache, `use cache` with `cacheLife` and `cacheTag`, Full Route Cache and Router Cache, `cacheComponents`
5. **Runtime, config and deployment** - Node vs Edge, `proxy.ts`, what proxy is not for, environment variables, the connection pooling problem, the dev-mode client leak, self-hosting with Docker standalone, Vercel vs self-hosted, when not to use Next.js as a backend
6. **Version 16 wins most people missed** - the new section required by your latest-version rule

### Diagrams

Two inline SVGs, both on the mint block: the request lifecycle from browser through `proxy.ts` to route handler, page or Server Action, and the four caching layers stacked with the request path through them.

### Everything verified against live docs, not memory

Facts checked against nextjs.org for 16.3.3 before writing. Several would have been wrong from memory:

- `middleware.ts` is now `proxy.ts`, and **proxy runs on the Node runtime only**. Edge is not supported there.
- `revalidateTag` requires a second `cacheLife` argument. The one-argument form is a TypeScript error.
- `updateTag` and `refresh` are new and Server Action only.
- `params`, `searchParams`, `cookies()`, `headers()`, `draftMode()` are async with no sync fallback left.
- Turbopack is the default for `dev` **and** `build`.
- `serverRuntimeConfig` and `publicRuntimeConfig` are removed.
- `next lint` is removed and `next build` no longer lints.
- `cacheComponents` replaces `experimental.ppr`, `dynamicIO` and `useCache`, all removed.
- Image defaults changed: `minimumCacheTTL` 60s to 4h, `qualities` restricted to `[75]`, `maximumRedirects` capped at 3.
- Parallel route slots now require `default.tsx` or the build fails.

### Style audit

Zero em dashes. Zero AI-tell vocabulary. Zero British spellings. Two sparse pages, one of which is the cover.

One slip caught and fixed: a page referenced a real project by name, against the instruction. Removed, and the whole booklet was grepped to confirm no others.

## 12. Update - Booklet 3 shipped, 2026-08-30

**Node.js Core.** 98 printed pages at `out/03-node-core.pdf`, 59 markdown source pages, seven modules.

### Modules

1. **JavaScript foundations** (15 pages) - who created JavaScript, `var`/`let`/`const`, hoisting, the temporal dead zone, closures, the closure loop trap, IIFE, the four `this` rules, arrow functions and `this`, `call`/`apply`/`bind`, prototypes, prototypal inheritance, classes as syntax over prototypes, equality and truthiness, value versus reference
2. **Node basics** - who created Node and why, the V8 plus libuv architecture, install and run, the core modules, `process`, signals, Buffers
3. **The event loop** - what it is, the six phases, microtasks versus macrotasks, `setTimeout` versus `setImmediate` versus `nextTick`, the libuv thread pool, blocking the loop, four ways to get work off it
4. **Streams and backpressure** - what a stream is, the four types, backpressure, why `write()` returning false matters, `pipe` versus `pipeline`, writing a Transform, object mode, Node streams versus Web streams
5. **Async patterns and errors** - callbacks, promises and the four combinators, `async`/`await` and the sequential-await bug, EventEmitter, AsyncLocalStorage, `uncaughtException` and `unhandledRejection`, custom errors with `cause`, AbortController and timeouts
6. **Processes, workers and scaling** - one thread and what it means, `child_process`, `worker_threads`, `cluster`, graceful shutdown, memory and garbage collection, profiling
7. **Recent Node wins most people missed** - the four dependencies you can delete, `node:test`, the new globals, the permission model, Node 26 and the release schedule change

### Diagrams

Eight inline SVGs on the mint block, all hand-written:

- hoisting, what you wrote next to what the engine runs
- the prototype chain with lookup arrows
- Node's architecture, V8 and libuv under the standard library
- the six event loop phases with the loop-back arrow
- the libuv thread pool, showing that network IO does not use it
- backpressure, the unbounded buffer above the capped one
- AsyncLocalStorage, one store spanning a whole call chain
- graceful shutdown, the four steps with the hard timer alongside

### Facts verified rather than recalled

- Node 26.8.1 is Current, released May 2026, enters LTS October 2026. Node 24 is Active LTS.
- Temporal is enabled by default in Node 26.
- The permission model is no longer experimental.
- From Node 27 the project moves to one major per year, year-based version numbers, and every release is LTS.
- CLI flags checked against the installed binary, not from memory: `--watch`, `--env-file`, `--env-file-if-exists`, `--run`, `--permission`, `--allow-fs-read`, `--allow-fs-write`, `--allow-child-process`, `--allow-worker`, `--allow-addons`, and the `--test-*` family including `--test-shard`.
- `fetch`, `structuredClone`, `AbortSignal.timeout` and `navigator` confirmed present as globals.

### Style audit

Zero em dashes. Zero AI-tell vocabulary. Zero British spellings. Zero first person. Five sparse pages, one of which is the cover.

## 13. Update - Booklet 4 shipped, 2026-08-30

**The Node Ecosystem.** 181 printed pages at `out/04-ecosystem.pdf`, 89 markdown source pages, twelve modules. The largest booklet in the book.

### Research done first

Scanned every `package.json` across the ten projects on the Desktop, excluding `node_modules`. That produced 172 runtime dependencies and 77 dev dependencies actually in use, which set the floor for what the booklet had to cover. Every version quoted was then checked with `npm view` on the day of writing.

### Mid-course correction on Express

Express was first written as five pages. That was called out as not doing it justice, since Express is a complete API framework. It was expanded to **24 pages**, and the theory of what each piece is for was woven into the bullets rather than sitting under headings named "what" and "why".

Express now covers: the framework itself, async error handling in version 5, the rest of the version 5 breaking changes, routing, route organization and `Router`, the request object, the response object, the five kinds of middleware, body parsing including raw bodies for webhook signatures, error handling end to end, the 404 handler, the security middleware stack, rate limiting, trust proxy, cookies and sessions, static files and cache headers, streaming and server-sent events, uploads, auth and authorization middleware, health and readiness endpoints, graceful shutdown including the keep-alive timeout behind a load balancer, versioning and API shape, testing with supertest, and performance.

### The twelve modules

1. **Choosing dependencies** - the real cost, judging a package, npm vs pnpm vs yarn vs bun, `package.json`, semver and lockfiles
2. **HTTP servers** - Express in depth, then Fastify, NestJS, Hono and how to choose
3. **Validation** - Zod, what changed in Zod 4, patterns, one validation middleware, Valibot, ArkType, TypeBox, class-validator, OpenAPI generation
4. **Databases** - Prisma, Mongoose, raw `pg` and `mysql2`, Knex, Drizzle, ioredis and Redis patterns
5. **Background work** - BullMQ, RabbitMQ with amqplib, node-cron, Croner, Bree
6. **Auth and security** - jose, JWT practice, argon2 and bcryptjs, helmet, cors, sanitizers, passport, otplib
7. **Clients, files and integrations** - fetch, undici, axios, ky, p-retry, p-limit, opossum, sharp, S3 presigned URLs, email, payments, small utilities
8. **Realtime** - Socket.IO, scaling with the Redis adapter, ws, WebRTC signalling
9. **Observability** - pino, pino-http, prom-client, OpenTelemetry, Sentry
10. **Testing** - Vitest, Testcontainers, mongodb-memory-server, msw
11. **Tooling** - tsx, tsup, tsc, ESLint flat config, Biome, monorepos, config validation, dependency hygiene, pm2 and systemd
12. **Worth knowing about** - execa, zx, tinybench, autocannon, faker, ts-reset, undici MockAgent, Bruno, dotenvx, pkgroll, nypm

### Style audit

Zero em dashes, zero AI vocabulary, zero British spellings, zero first person, zero project names. Six sparse pages out of 181.

## 14. Correction and re-spec, 2026-08-30

### What went wrong

Feedback after Booklet 4: "not at all impressed". Two concrete failures plus one general one.

1. **Missing theory.** Sections opened with a version number and one thin line, then went straight to install and code. A reader who has never used an ORM, a queue or a structured logger learns nothing from those pages. This directly violated the "never skip the basics" rule recorded in section 4 of this file.
2. **A personal reference in a book that will be sold.** `redirect("https://kaleemahmed.in")` in Booklet 2. Fixed, replaced with `https://example.com/orders`. A grep across all four booklets confirms it was the only one.
3. **Drift.** Instructions were set and then not followed. That is the root cause of the first two.

### The re-spec, agreed through a full interview

**Theory format.** Every technology and library section opens with plain concept bullets before any code:

- **The problem the reader recognizes comes first.** Name the pain, then the category, then this specific tool, then the tradeoff and when not to use it
- **No sub-headings named "why", "problem" or "before".** Pointers only, exactly as the source book does it
- **Bullet count varies by concept.** Three for `nanoid`, ten for an ORM
- **Version numbers move to the end** of the section, just before the install
- Important libraries currently listed inside tables get promoted to full entries. Pure lookup rows stay as tables

**Reader assumed.** Knows HTML, CSS, JavaScript and React at the level of the source book. New to backend. Every backend concept explained from zero, no JavaScript basics.

**Scope.** All four written booklets are retrofitted. Booklets 5 to 9 are written to this standard from the start.

### New standing constraint: compress space, not content

> "try to compress the space not the content too much and add important pointers I don't want too long 700+ pages"

**Measured, not estimated.** A layout compression pass was applied and all four booklets rebuilt:

| Booklet | Before | After | Saved |
|---|---|---|---|
| TypeScript | 92 | 74 | 18 |
| Next.js | 55 | 48 | 7 |
| Node.js Core | 98 | 74 | 24 |
| The Node Ecosystem | 181 | 146 | 35 |
| **Total** | **426** | **342** | **84 (20%)** |

Not one word was removed. The savings came from margins 16/14mm to 13/11mm, body 8.8pt to 8.5pt, line height 1.45 to 1.38, and tighter heading, list, code block, callout and table spacing. Readability was checked on a rendered dense page and is unchanged.

### Page budget for the rest of the book

Target is under 700 printed pages for all nine booklets.

| Booklet | Budget |
|---|---|
| 1 to 4, after the theory retrofit | ~372 |
| 5 Data & Messaging | 78 |
| 6 API & Service Design | 72 |
| 7 AI SDKs for Backend | 82 |
| 8 Deployment & Ops on AWS | 80 |
| 9 AI-Assisted Engineering | 16 |
| **Total** | **~700** |

These are budgets, not estimates. If a booklet runs over, content gets tightened rather than the budget moved.

### Page budget withdrawn, 2026-08-30

> "for the content don't compromise forget what I said ... just focus and the all the points and expand the content"

The under-700 target is dropped. **Content is never traded for page count.** The layout compression stays, since it removed 84 pages without touching a word, but no section gets thinned to hit a number. The book ends up as long as the material requires.

## 15. Theory retrofit shipped, 2026-08-30

Every technology and library entry across the four written booklets now opens with concept bullets before any code.

### Format applied

Problem the reader recognizes first, then the category and what it means, then this specific tool, then the tradeoff and when it is the wrong choice, then the version, then the install. **No headings named "why", "problem" or "before".** Bullet count follows the concept, from three to twelve.

### Sections rewritten: 54

| Booklet | Sections |
|---|---|
| 4 The Node Ecosystem | 34 |
| 3 Node.js Core | 7 |
| 2 Next.js | 6 |
| 1 TypeScript | 7 |

Booklet 4 covers Express, Fastify, NestJS, Hono, Zod, OpenAPI, Prisma, Mongoose, Drizzle, raw drivers, Redis, BullMQ, RabbitMQ, schedulers, jose, password hashing, helmet and cors, sanitizing, auth libraries, HTTP clients, resilience, files and media, payments, Socket.IO, ws and WebRTC, pino, metrics, tracing, Vitest, integration testing, build tools, linting, config and process managers.

Booklet 3 adds theory to stream types, EventEmitter, child processes, worker threads, cluster, the test runner and the permission model. Booklet 2 covers route handlers, Node vs Edge, proxy, connection pooling, the caching layers and Server Actions. Booklet 1 covers generics, mapped types, conditional types, branded types, `satisfies`, enums and declaration files.

### Page count

| Stage | Pages |
|---|---|
| Before compression | 426 |
| After compression, no content lost | 342 |
| After the theory retrofit | **372** |

The book carries substantially more explanation than it did and is still 54 pages shorter than before, because the space came from layout rather than from content.

### Audit

Zero em dashes. Zero AI vocabulary. Zero British spellings. Zero personal references. Zero first person.

**One open item.** 32 `###` sub-headings mid-page begin with "Why", such as "Why it bites" and "Why this matters". These are not the opening theory block, and the source book uses the same pattern, so they were left alone. Several are generic and could be tightened if wanted.

### Theory depth approved, 2026-08-30

> "Yes depth looks good follow this pattern for all booklets"

The retrofit format is now the standard for every remaining booklet, applied while writing rather than afterwards.

## 16. Booklet 4 completed and Booklet 5 shipped, 2026-08-30

### Booklet 4 finishing touches

The last outstanding item is done. Four groups of libraries that were only table rows are now full entries with their own theory:

- **Generating ids** - why sequential ids leak information, why UUIDv4 hurts index performance, what UUIDv7 fixes, when nanoid is the better choice
- **Dates and time** - why `Date` is broken, mutability, zero-indexed months, time zones, and Temporal replacing all of it
- **Producing files** - CSV, xlsx, zip and PDF, with streaming as the common thread
- **Results and pattern matching** - why a thrown error is invisible to the type system, and what exhaustive matching prevents

The remaining table is now genuinely lookup-only, with a "check Node first" and a "do not install" section.

### Booklet 5 - Data & Messaging

43 printed pages, 9 modules, written to the approved theory pattern from the first page rather than retrofitted.

1. **Choosing a data store** - what this booklet covers and what Booklet 4 already did, relational against document, and the question that actually decides it
2. **PostgreSQL** - what a relational database guarantees, schema design, normalization and where to break it, column types, and why money is never a float
3. **Indexes and query plans** - what an index is with a B-tree diagram, index types, composite column order, `EXPLAIN ANALYZE`, and the five reasons an index is ignored
4. **Transactions, isolation and locking** - ACID, why a transaction must never wrap a network call, isolation levels and the anomalies they permit, the read-check-write race with a diagram, and four ways to close it
5. **MongoDB** - documents and BSON, embed against reference, querying, indexes and the ESR rule, the aggregation pipeline, transactions and change streams
6. **Redis in practice** - cache-aside, why invalidation is the hard half, stampede, penetration and avalanche, and using the right data structure
7. **Messaging** - why services stop calling each other directly, queues against brokers, a message flow diagram, delivery guarantees and why exactly-once does not exist, retries and dead letters
8. **Correctness patterns** - idempotency, the dual write problem, the outbox pattern with a diagram, the relay using `FOR UPDATE SKIP LOCKED`, sagas and compensation, and living with eventual consistency
9. **Recent wins** - PostgreSQL 18 and MongoDB 9, then a nine-point recap

**Four diagrams**: the B-tree lookup, the TOCTOU race as two interleaved timelines, the message flow through an exchange to three queues with a dead letter path, and the outbox with the transaction boundary drawn around both writes.

**Verified rather than recalled**: PostgreSQL 18.6 is the current patch release, `uuidv7()` is now built in, virtual generated columns are the default, temporal constraints exist, and the async I/O subsystem is the headline change. MongoDB 9 added `autoEmbed`, near-instant resharding and faster bulk writes.

### Running total

| Booklet | Pages |
|---|---|
| 1 TypeScript | 79 |
| 2 Next.js | 51 |
| 3 Node.js Core | 77 |
| 4 The Node Ecosystem | 168 |
| 5 Data & Messaging | 43 |
| **Total** | **418** |

Style audit clean across all five: zero em dashes, zero AI vocabulary, zero British spellings, zero first person, zero personal references.

## 17. Booklet 6 shipped, 2026-08-30

### Diagram fix first

The TOCTOU diagram in Booklet 5 was reported as unclear. The red callout was small bold monospace and the two requests were not visually separated. Redrawn as two labelled lanes with time running left to right, a balance row underneath, and the outcome in readable serif rather than bold monospace.

### Booklet 6 - API & Service Design

60 printed pages, 11 modules. Scope was deliberately widened past the frozen plan on the instruction to cover everything an industry project uses, which added gRPC, tRPC, multi-tenancy, HTTP versions, contract testing and API lifecycle.

1. **HTTP, properly** - the protocol underneath every framework, methods and their safe and idempotent promises, status codes, the headers that matter, conditional requests, and HTTP/1.1 against 2 against 3
2. **Designing a REST API** - what REST actually constrains, resource naming, actions that are not CRUD, offset against cursor pagination, filtering and response envelopes, RFC 9457 error shapes, idempotency keys, versioning and the `Sunset` header
3. **Authentication** - the five ways to carry proof, the password login flow and its quiet mistakes, JWT structure and the five errors, access and refresh token rotation with reuse detection, OAuth 2.0 with a flow diagram, which grant to use, PKCE, OIDC, API keys and mTLS
4. **Authorization** - RBAC against ABAC against ReBAC, broken object level authorization, the single enforcement point, row level security, policy engines, and multi-tenancy isolation
5. **API security** - the OWASP API Top 10 as a table, mass assignment, SSRF, rate limits and quotas, CORS in depth, and a checklist ending with the two tests worth automating
6. **Webhooks and async APIs** - designing an outgoing webhook, HMAC signing with the timestamp inside the signature, replay protection, long-running work over `202` plus a job resource, and SSE against WebSockets
7. **GraphQL, gRPC and tRPC** - what each solves, the N+1 problem and DataLoader, GraphQL's four other costs, protobuf and streaming, tRPC in a TypeScript monorepo, and a comparison table
8. **Service boundaries** - monolith against modular monolith against microservices, the distributed monolith failure, splitting by domain rather than layer, gateways and BFFs
9. **Resilience** - timeouts and timeout budgets, retry storms and jitter, circuit breakers with a state diagram, bulkheads, load shedding, graceful degradation, and correlation ids
10. **WebRTC in full** - why media avoids your server, the signalling flow, SDP, ICE, STUN and TURN with its real cost, mesh against SFU against MCU, glare and reconnection
11. **Lifecycle and contracts** - contract first against code first, consumer-driven contract testing, generated SDKs, then a ten-point recap

**Four diagrams**: the OAuth authorization code flow as a sequence, the gateway and BFF topology, the circuit breaker state machine, and the WebRTC signalling path with media drawn going directly peer to peer.

**Verified**: RFC 9457 replaced RFC 7807 in July 2023 and is the current problem-details standard. RFC 8594 defines `Sunset`. OAuth 2.1 is a draft consolidating existing practice rather than adding anything, and it is described that way rather than as a shipped standard.

### Running total

| Booklet | Pages |
|---|---|
| 1 TypeScript | 79 |
| 2 Next.js | 51 |
| 3 Node.js Core | 77 |
| 4 The Node Ecosystem | 168 |
| 5 Data & Messaging | 43 |
| 6 API & Service Design | 60 |
| **Total** | **478** |

Audit clean across all six: zero em dashes, zero AI vocabulary, zero British spellings, zero first person, zero personal references.

## 18. Coverage gaps filled, 2026-08-30

A coverage audit found real gaps in both recent booklets. Both are now closed.

### Booklet 5 - new Module 9, "Running a database in production"

Booklet 5 was the thinnest in the book at 43 pages and was missing most of the operational half of its own scope. Ten new pages:

- **Schema migrations** - what a migration is, the rules, and which statements lock a table
- **Zero-downtime changes** - expand and contract as a five-step table, `CREATE INDEX CONCURRENTLY`, adding `NOT NULL` safely
- **Backfills** - batched, resumable, throttled, run as a job rather than a migration
- **Connection pooling** - the sizing formula, why bigger is not faster, PgBouncer modes and why transaction mode breaks prepared statements
- **Replication** - replication lag, read-your-own-writes, MongoDB read preferences, write concern
- **Partitioning and sharding** - the difference, partition pruning, shard keys, and doing the cheap things first
- **Redis persistence and eviction** - RDB against AOF, and that `noeviction` is the default so a cache silently stops accepting writes
- **Finding the slow query** - `pg_stat_statements` sorted by total time rather than mean, the MongoDB profiler, and the four numbers worth a dashboard
- **Bulk operations** - `createMany`, `bulkWrite` with `ordered: false`, and `COPY` for very large loads
- **Soft deletes and audit trails** - the costs nobody mentions, partial unique indexes, and append-only audit tables

Recap extended from nine points to twelve. **43 to 54 pages.**

### Booklet 6 - four missing topics

- **Bulk and batch endpoints** - atomic against partial success, `207 Multi-Status`, batch size caps, one idempotency key per batch
- **Long polling** - why it still exists, where it beats SSE and WebSockets, and the load balancer timeout constraint
- **gRPC in Node end to end** - the `.proto`, `@grpc/grpc-js`, a unary and a streaming handler, status codes rather than exceptions, and the `int64` string problem
- **Feature flags** - the four kinds and their different lifetimes, evaluate once at the edge, default to off, never flag a migration
- **API analytics** - what to record per request, the route pattern rather than the URL, the four dashboard numbers, and retiring a version with evidence including brown-outs

**60 to 67 pages.**

### Running total

| Booklet | Pages |
|---|---|
| 1 TypeScript | 79 |
| 2 Next.js | 51 |
| 3 Node.js Core | 77 |
| 4 The Node Ecosystem | 168 |
| 5 Data & Messaging | 54 |
| 6 API & Service Design | 67 |
| **Total** | **496** |

Style audit clean on both. Note for future audits: `grep -E` treats `\|` as a literal pipe, which produced false zeros on the first coverage check.

## 19. Coverage gaps filled in Booklets 1 to 4, 2026-08-30

Booklets 1 to 4 had received the theory retrofit but never a coverage audit. One was run, using corrected grep syntax, and 21 new pages were written.

### Booklet 3, Node.js Core - the worst gap

**The `crypto` module had zero coverage**, despite Booklets 4, 5 and 6 all using HMAC for webhook signing without ever explaining it. Seven new pages:

- **Hashing** - what a one-way function is, collisions, why MD5 and SHA-1 are out, streaming a file checksum, and what hashing is not for
- **HMAC and random values** - why a hash proves content but not authorship, `timingSafeEqual` and the byte-at-a-time timing attack it prevents, and why `Math.random()` must never generate a token
- **Encryption and key derivation** - symmetric against asymmetric, AES-GCM, the three rules (GCM not CBC, fresh IV, store the auth tag), and stretching a passphrase with `scrypt`
- **Module customization hooks** - `module.register`, how tsx and OpenTelemetry actually work, and why stack traces need source maps afterwards
- **Below HTTP** - `node:net`, and that TCP has no message boundaries, which is the classic framing bug
- **Pooling workers** - `piscina`, sizing against `availableParallelism()`, and the structured-clone cost that decides whether it is worth it
- **`diagnostics_channel`** - publish and subscribe instrumentation without monkey-patching, including listening to Node's own channels

Every API was verified by running it against the installed Node binary before writing.

### Booklet 2, Next.js

- **Testing route handlers** - constructing a real `Request`, the promise-shaped `params`, mocking `next/headers`
- **`after()`** - work after the response, and why it is not a queue
- **`generateStaticParams` and ISR** - prerendering dynamic routes, `dynamicParams`, and not prerendering ten thousand pages when fifty are visited
- **`instrumentation.ts`** - the only place tracing can be registered in Next.js, plus `onRequestError`
- **`server-only`** - turning an accidental server import into a build error, and the taint API

### Booklet 4, The Node Ecosystem

- **Search engines** - inverted indexes, Postgres full text against Meilisearch, Typesense and Elasticsearch
- **Kafka** - the log model against RabbitMQ's delivery model, partitions, consumer groups, offsets and replay
- **Headless browsers** - Playwright against Puppeteer, and the production rules (queue it, reuse the browser, close in `finally`)
- **Email templates and i18n** - why email HTML is two decades old, react-email, and that `Intl` is built into Node

### Booklet 1, TypeScript

- **Classes** - access modifiers, parameter properties, `private` against `#private`, abstract classes
- **Decorators** - what they are for, the two incompatible versions, and why they are not erasable
- **Template literal types** - generated string unions, key renaming in mapped types
- **Recursive types** - `Json`, `DeepPartial`, the depth limit and the compile cost
- **Shipping types with a package** - `declaration`, `declarationMap`, project references, and `attw`

### Running total

| Booklet | Before | After |
|---|---|---|
| 1 TypeScript | 79 | 88 |
| 2 Next.js | 51 | 57 |
| 3 Node.js Core | 77 | 87 |
| 4 The Node Ecosystem | 168 | 175 |
| 5 Data & Messaging | 43 | 54 |
| 6 API & Service Design | 60 | 67 |
| **Total** | **478** | **528** |

All six booklets audited clean: zero em dashes, zero AI vocabulary, zero British spellings, zero first person, zero personal references.

---

## 20. Update - 2026-08-31 - Booklet 7 written, AI SDKs for Backend

### What was built

**87 markdown source pages, 124 printed pages** in `docs/ebook/07-ai-sdks/`, rendered to `out/07-ai-sdks.pdf`.

Nine modules:

| # | Module | Pages | Covers |
|---|---|---|---|
| 1 | What you are actually calling | 8 | the model as a stateless HTTP call, tokens, the context window, messages and roles, sampling parameters, the four things a model cannot do, choosing a model, cost, keys |
| 2 | The OpenAI SDK | 8 | Responses API, Responses against Chat Completions, streaming, tool calling, structured output with `zodTextFormat`, conversation state, failures and rate limits, embeddings |
| 3 | The Anthropic SDK | 13 | `messages.create`, content blocks and `stop_reason`, streaming, tool use round trip, tool design, `toolRunner`, structured output with `output_config`, extended thinking, prompt caching (with diagram), context editing and compaction, the memory tool, batches and PDFs |
| 4 | The Vercel AI SDK | 9 | why a layer, `generateText`, `streamText`, tools with `isStepCount`, `generateObject`, `ToolLoopAgent`, provider registry and middleware, embeddings and reranking, telemetry, the version 7 rename table |
| 5 | Streaming in production | 4 | SSE from Express, the four headers, aborts and the tokens you pay for anyway, heartbeats and resumable streams, `streamObject` and partial JSON |
| 6 | Prompt and context engineering | 7 | a prompt is program input, the system prompt, few-shot examples, context engineering and the window budget, prompts as code, prompt injection, defending against it |
| 7 | Retrieval | 14 | why retrieval exists (with diagram), the pipeline and where it fails, loading and parsing, OCR, chunking, embedding and storing, pgvector, HNSW and IVFFlat, choosing a store, hybrid search with RRF, reranking, grounding and citations, measuring retrieval, when retrieval is the wrong answer |
| 8 | Agents | 13 | what an agent actually is, agent against workflow, budgets and loops, the four kinds of memory, building the memory, MCP, building an MCP server, human in the loop, multi-agent, durable agents, LangChain, LangGraph, LlamaIndex |
| 9 | Running it in production | 10 | cost control, caching, rate limits and queues, observability, guardrails, privacy, evaluations, testing around the model, failure modes, the twelve things worth remembering |

### Versions verified on 2026-08-31

Checked with `npm view` and against live provider documentation, not written from memory.

| Package | Version |
|---|---|
| `openai` | 7.8.0 |
| `@anthropic-ai/sdk` | 0.122.0 |
| `ai` | 7.0.85 |
| `@ai-sdk/openai` | 4.0.52 |
| `@ai-sdk/anthropic` | 4.0.46 |
| `langchain` | 1.5.10 |
| `@langchain/langgraph` | 1.4.13 |
| `llamaindex` | 0.12.1 |
| `@modelcontextprotocol/server` / `client` | 2.0.0 |
| `@qdrant/js-client-rest` | 1.19.0 |

### The current details most sources still get wrong

These were verified against live documentation and are the reason the booklet is worth reading over a blog post.

- **AI SDK 7 renamed almost everything.** `system` is `instructions`, `stepCountIs` is `isStepCount`, `onFinish` is `onEnd`, `onStepFinish` is `onStepEnd`, `fullStream` is `stream`, `parameters` is `inputSchema`. Node 22 minimum, ESM only, no CommonJS build. Top-level `usage` now aggregates every step rather than describing the final one. Module 4 carries the full table.
- **The `Agent` class is now `ToolLoopAgent`.**
- **MCP split at version 2** into `@modelcontextprotocol/server` and `@modelcontextprotocol/client`. Older examples import a single `@modelcontextprotocol/sdk`.
- **Anthropic structured output uses `output_config.format`**, not the deprecated `output_format`, and needs no beta header any more.
- **Context editing** (`clear_tool_uses_20250919`, `clear_thinking_20251015`) and **compaction** are covered with the real parameter names.
- **The memory tool** is `memory_20250818` with the `betaMemoryTool` helper, and the path-traversal warning is stated as the security requirement it is.
- **Prompt caching minimums** are 512 tokens on the newest models, up to 4,096 on older ones, with the real `usage` field names.
- **LangChain 1 is `createAgent` with middleware.** The chain abstractions are gone.
- **LangGraph uses `StateSchema` with Zod, `interrupt`, and `new Command({ resume })`.**

### Style audit

- em dashes: **0**
- AI vocabulary: **0**
- British spellings: **0** (19 fixed after the first pass: behaviour, summarise, normalise, optimise, apologise and their forms)
- author first person: **0** (11 hits are all quoted example data, such as `"How do I cancel an order?"` inside a user message, which is correct)
- personal references: **0** (6 hits were the verb "resume")

### Diagrams

Two new mint-block SVGs: the prompt caching prefix (Module 3) and the two-phase retrieval pipeline, indexing against asking (Module 7).

### Running total

| Booklet | Pages |
|---|---|
| 1 TypeScript | 88 |
| 2 Next.js | 57 |
| 3 Node.js Core | 87 |
| 4 The Node Ecosystem | 175 |
| 5 Data & Messaging | 54 |
| 6 API & Service Design | 67 |
| **7 AI SDKs for Backend** | **124** |
| **Total so far** | **652** |

Booklet 7 came in at 124 rather than the ~72 estimated, because the module list grew to cover raw SDKs, the abstraction layer, streaming, prompting, retrieval, agents and production operations at the depth agreed in "for the content don't compromise". Two booklets remain: 8 (Deployment and Ops on AWS, ~85) and 9 (AI-Assisted Engineering, ~12), putting the finished book near 750.

### Explanation

**What changed.** A new booklet directory `docs/ebook/07-ai-sdks/` with 87 hand-written markdown pages, split by the build into 118 files and printed as a 124-page A5 PDF. Nothing else in the repository changed.

**Why it was needed.** Booklet 7 was the next unwritten booklet in the frozen scope, and it carries six resume skills that land nowhere else: LLM-powered applications, RAG and vector search, prompt and context engineering, agentic workflows, OCR, and human-in-the-loop guardrails.

**How it works, step by step.** Content was written as JSON batches into the scratchpad, emitted to markdown by a small node script (heredocs mangle apostrophes, which cost several turns on earlier booklets), then rendered by the existing `build.mjs --split` pipeline. That pipeline merges any previously split pages, measures each page against the A5 printable height in headless Chrome, and greedily packs sections until one overflows. The run converged at 31 cuts across two passes.

**Files changed.** `docs/ebook/07-ai-sdks/*.md` created. `out/07-ai-sdks.pdf` produced. `docs/tasks/backend-ebook.md` appended. `docs/ebook/book.config.json` already listed the booklet, so it needed no edit.

**Important decisions.** Raw provider SDKs are taught before the AI SDK, as agreed in decision round 3, so the abstraction is readable rather than magic. Retrieval got 14 pages rather than a chapter because the pipeline fails in six distinct places and each needs its own fix. Memory is split into four named kinds, because conflating them is the usual reason the topic reads as confusing. MCP is presented with the judgement that a single agent calling three local functions does not need it.

**Verification.** Every API in the booklet was checked against live documentation or `npm view` on 2026-08-31. The style audit above was run over the source markdown after the split. The PDF renders at 124 pages with no overflow warnings. No code in the booklet was executed against a paid API.

**Edge cases and limitations.** Model identifiers and prices move faster than anything else in the book, which is why the booklet tells the reader to read the model list from the API and keep the id in configuration. The AI SDK 7 rename table will need revisiting at version 8. Pricing multiples are given as ratios rather than currency, so they age more slowly.

---

## 21. Update - 2026-08-31 - Booklet 7 expanded, Booklet 8 written

### Your instruction that drove this

> "don't compress and dont worry about pages just follow what I said"
> "since ai sdk is a booklet to make ai powered apps and some agents etc so it should have all the topics if missed do expand more"
> "not to make but to know the stuff"
> "make sure we have proper diagrams where needed and all possible command used by devs"

Page count is explicitly no longer a constraint. Booklet 7 is a **reference to know the material**, not a build-along tutorial, so coverage breadth wins over worked projects.

### Booklet 7 expansion, 118 to 166 pages

28 pages added after a gap audit.

**Missing topics filled**

| Added | Module |
|---|---|
| Context windows, 1M models, context rot, the token counting API, overflow behavior | 1 |
| Fine-tuning against RAG against prompting, and distillation | 1 |
| Gateways and hosting: Bedrock, Vertex, OpenRouter, Ollama, vLLM, OpenAI-compatible endpoints | 1 |
| OpenAI built-in server tools and automatic prompt caching | 2 |
| Anthropic server tools, client tools with Anthropic schemas, the tool search tool | 3 |
| The Claude Agent SDK, `query()`, `canUseTool`, `maxBudgetUsd`, custom MCP tools | 3 |
| Speech: `transcribe`, streaming transcription, `generateSpeech` | 4 |
| Images in and out: vision input, `generateImage` | 4 |
| Realtime and voice agents, pipeline against realtime, session tokens | 4 |
| The chat endpoint contract: message parts, persistence, `onEnd` against `onAbort` | 5 |
| Improving a prompt without guessing, and meta-prompting | 6 |
| Query understanding: rewrite, decompose, multi-query, HyDE | 7 |
| Permissions in retrieval, ACL filtering, the four leak paths | 7 |
| Keeping the index current, upserts, deletes, embedding model migration | 7 |
| Retrieval that is not vectors: text to SQL, graph, routing | 7 |
| Too many tools: merging, `activeTools` per phase, deferring definitions | 8 |
| Evaluating an agent: trajectory scoring, the four failure modes | 8 |
| Sandboxing code an agent wrote, and why `vm` is not a boundary | 8 |
| Choosing between the six frameworks, plus the OpenAI Agents SDK | 8 |
| Capturing feedback, explicit and implicit signals | 9 |
| Evaluation tooling: Vitest, Evalite, LangSmith, Braintrust | 9 |
| Multi-tenant AI features: isolation checklist, quotas, bring your own key | 9 |
| The launch checklist | 9 |

**Diagrams added**: the tool call round trip (Module 2), the path a token takes through Nginx and the ALB (Module 5), the retrieval funnel 2M to 5 (Module 7), the agent loop with its two pink boxes (Module 8), where each kind of memory lives (Module 8).

**New versions verified**: `@anthropic-ai/claude-agent-sdk` 0.3.251, `@openai/agents` 0.17.0, `@ai-sdk/elevenlabs` 3.0.35, `@ai-sdk/deepgram` 3.1.5.

### Booklet 8 - Deployment & Ops on AWS

**104 markdown source pages, 192 printed pages** in `docs/ebook/08-deployment/`.

| # | Module | Pages | Covers |
|---|---|---|---|
| 1 | What deploying means | 7 | the five questions, twelve-factor, environments and config validation, the shape of a deployed service (diagram), Linux, systemd, the server command reference |
| 2 | Docker | 14 | containers against VMs (diagram), layers and the build cache, the Dockerfile, multi-stage, base images, `.dockerignore`, run flags, PID 1 and signals, hardening, health checks, volumes and networks, Compose, size and scanning, the Docker command reference |
| 3 | Nginx | 10 | what a reverse proxy is for (diagram), config layout, the server block, proxy headers and `trust proxy`, TLS and certbot, static and compression, rate limiting, WebSockets and SSE, upstreams, the Nginx command reference |
| 4 | CI/CD with GitHub Actions | 10 | the pipeline (diagram), workflow anatomy, a real Node pipeline with service containers, caching and matrices, OIDC, build and push to ECR, deploy to EC2 via SSM, deploy to ECS, environments and rollback, the `gh` command reference |
| 5 | AWS foundations | 8 | regions and zones, shared responsibility, IAM, writing a policy, roles in practice, the VPC (diagram), subnets and NAT, security groups, the AWS CLI reference |
| 6 | Compute | 11 | EC2 families and the burstable trap, user data, Session Manager, Auto Scaling Groups, the ALB (diagram), target groups and draining, ECR, ECS Fargate, the ECS service, Lambda, choosing between them |
| 7 | Data and state | 9 | RDS, multi-AZ and replicas, connection pooling and RDS Proxy, ElastiCache, DocumentDB against Atlas, S3, presigned uploads, backups and restore drills, migrations in a pipeline |
| 8 | Networking and delivery | 6 | Route 53 and alias records, ACM, CloudFront, WAF and Shield, the whole request path (diagram), finding the broken layer |
| 9 | Messaging on AWS | 5 | SQS, SNS fanout, EventBridge, Amazon MQ and MSK, choosing |
| 10 | Configuration and secrets | 4 | Parameter Store, Secrets Manager and rotation, injecting into ECS and EC2, what to do when one leaks |
| 11 | Observability | 8 | the three signals, CloudWatch Logs and Insights, structured logging with pino, metrics and alarms, tracing with OpenTelemetry, Prometheus and Grafana, dashboards and alerts, on-call and runbooks |
| 12 | Cost, security and the release | 11 | budgets, saving money, infrastructure as code, Terraform, CDK, the security checklist, zero-downtime deploys (diagram), blue green and canary, disaster recovery, the launch checklist, the closing twelve |

**Command references**, as requested, are dedicated pages: Linux and systemd, Docker, Nginx, GitHub Actions and `gh`, the AWS CLI, and network debugging. Every other page carries the commands for its own topic inline.

**Diagrams**: the shape of a deployed service, containers against virtual machines, the reverse proxy, the CI/CD pipeline, the VPC across two zones, the ALB with listener rules, the whole request path from Route 53 to Node, and the five steps of a zero-downtime deploy.

### Versions verified on 2026-08-31

| Thing | Version |
|---|---|
| `actions/checkout` | v7 |
| `actions/setup-node` | v7 |
| `actions/cache` | v6 |
| `aws-actions/configure-aws-credentials` | v6 |
| `aws-actions/amazon-ecr-login` | v2 |
| `aws-actions/amazon-ecs-deploy-task-definition` | v2 |
| `docker/build-push-action` | v7 |
| `docker/setup-buildx-action` | v4 |
| Nginx stable | 1.30.4 |
| Node images | 24 LTS, 26 current, alpine 3.24 |

### Style audit, both booklets

- em dashes: **0**
- AI vocabulary: **0**
- British spellings: **0** after fixes (artefact, organisation, centre, initialisation, behaviour, serialises, prioritise, utilisation, summarise)
- author first person: **0**. The 8 remaining matches in Booklet 8 are `us-east-1`, `I/O`, and quoted idioms such as "Works on my machine"
- personal references: **0**

### Running total

| Booklet | Pages |
|---|---|
| 1 TypeScript | 88 |
| 2 Next.js | 57 |
| 3 Node.js Core | 87 |
| 4 The Node Ecosystem | 175 |
| 5 Data & Messaging | 54 |
| 6 API & Service Design | 67 |
| 7 AI SDKs for Backend | **166** |
| 8 Deployment & Ops on AWS | **192** |
| **Total** | **886** |

One booklet remains: 9, AI-Assisted Engineering Practices.

### Explanation

**What changed.** 28 pages added to `docs/ebook/07-ai-sdks/` and a new booklet of 104 source pages in `docs/ebook/08-deployment/`. Both rendered to PDFs in `out/`.

**Why it was needed.** Booklet 7 was written to a page estimate; you removed that constraint and asked for full topic coverage of building AI-powered applications and agents. Booklet 8 was the last large unwritten booklet and carries Docker, AWS, Nginx, CI/CD, Prometheus and Grafana from the resume audit.

**How it works.** Same pipeline as every earlier booklet: JSON batches written to the scratchpad, emitted to markdown by a node script, then `build.mjs <dir> --split` measures each page against the A5 printable height in headless Chrome and greedily repacks. Booklet 8 converged at 80 cuts over two passes.

**Files changed.** `docs/ebook/07-ai-sdks/` gained 28 files. `docs/ebook/08-deployment/` created with 104 files, split to 184. `out/07-ai-sdks.pdf` and `out/08-deployment.pdf` produced. `book.config.json` already listed both directories.

**Important decisions.** Kubernetes is deliberately excluded from Booklet 8 with the reason stated in the opening page and again in the compute comparison: ECS does the same job for one to twenty services with a fraction of the surface. Infrastructure as code is placed at the end of Module 12 rather than the start of the booklet, because the CLI commands are what teach the resources, and Terraform only makes sense once you know what it is describing. Session Manager replaces SSH throughout, and OIDC replaces access keys throughout, because both are strictly better and teaching the old way first would be teaching a habit to unlearn.

**Verification.** GitHub Action versions were read from the GitHub releases API; Docker image tags from Docker Hub. AI SDK, Anthropic, OpenAI, LangChain, LangGraph, MCP and agent SDK APIs were read from live documentation. The style audit above was run over the source markdown after splitting. Both PDFs render with no overflow warnings. No AWS resources were created and no commands in the booklet were executed against a live account.

**Edge cases and limitations.** AWS console layouts and default quotas change faster than the CLI, which is why the booklet teaches the CLI. Action major versions will move; the version table above dates them. Instance family names and pricing ratios age, so prices are given as relative comparisons rather than figures.

---

## 22. Update - 2026-08-31 - Booklet 9 written. All nine booklets complete

### What was built

**72 markdown source pages, 108 printed pages** in `docs/ebook/09-ai-practices/`, rendered to `out/09-ai-practices.pdf`.

Originally scoped at ~12 pages as a short closing booklet. You asked for full range and current industry practice, so it became a full booklet at the same depth as the rest.

| # | Module | Pages | Covers |
|---|---|---|---|
| 1 | The shift | 6 | what changed, the three modes, what it is good and bad at, **the verification tax** (diagram), what your job becomes, skill atrophy |
| 2 | Teaching it your codebase | 9 | why it does not know your repo, **`AGENTS.md`**, what goes in, what stays out, repo shape, MCP in the dev loop, skills and progressive disclosure, session context and compaction, keeping context honest |
| 3 | Spec-driven development | 8 | the problem it solves (diagram), the loop, writing a spec, plan mode, decomposition, the tooling, living specs, when to skip it |
| 4 | Asking for a change | 7 | the shape of a good request, the patterns that work, the failing test first, blast radius, iterating, anti-patterns, when to write it yourself |
| 5 | Reviewing code you did not write | 8 | why review is different, the six failure signatures, the checklist, reading a diff efficiently, scope creep, over-abstraction, tests that cannot fail, **you own every line you merge** |
| 6 | Security | 7 | the vulnerability surge, **slopsquatting with the real numbers**, secrets both directions, prompt injection in the dev loop, licensing and provenance, agent permission tiers, the checks that must be automatic |
| 7 | Verification | 7 | the loop is the product (diagram), making checks fast, TDD with agents, who writes the test, types and lint as guardrails, hooks and gates, evaluating your own setup |
| 8 | Agents in the workflow | 8 | beyond the editor, **parallel worktrees** (diagram), background agents, subagents, issue to pull request, review agents, git discipline, cost and limits |
| 9 | Making it work for a team | 8 | adopting it, **the review bottleneck with the reported numbers**, what to standardize, attribution, ownership and understanding, junior engineers, measuring it, when to say no |
| 10 | Closing | 3 | the adoption checklist, the twelve things, **the end of the book** |

### Grounded in current published research, not written from memory

Four web searches ran before writing. The specific figures and current conventions in the booklet:

| Fact | Source area |
|---|---|
| `AGENTS.md` read by 30+ agents, stewarded by the **Agentic AI Foundation at the Linux Foundation** | AGENTS.md ecosystem |
| SDD shipped by **Spec Kit, Kiro, Claude Code, Cursor, OpenSpec, BMAD, Tessl, Antigravity** | SDD tooling survey |
| **Living specs** as the answer to staleness | SDD practice |
| Hallucinated package rate: **21.7% open models, 5.2% commercial** | slopsquatting research |
| A hallucinated name repeated across 10 queries **43%** of the time, more than once **58%** | slopsquatting research |
| The `unused-imports` npm case, still live and being downloaded | documented incident |
| **The verification tax** as a named cost | DORA |
| **98% more PRs merged, 21% more tasks, 91% longer review time** | delivery research |
| **4 to 8 concurrent worktrees per developer** before review becomes the bottleneck | reported team practice |
| DORA alone insufficient once a large share of code is generated | measurement frameworks |

### Diagrams

Four: the verification tax as two time bars, the spec-plan-tasks-code loop with the feedback arrow, the edit-check-fix loop with the 3-second against 4-minute note, and the worktree layout.

### Style audit

- em dashes: **0**
- AI vocabulary: **0** (4 uses of "leverage" as a noun rephrased for consistency with the other eight booklets)
- British spellings: **0** after fixes (licence, organisational, practise, prioritising, recognisable, summarised)
- author first person: **0**. The 8 matches are all inside quoted example prompts and deliberately-bad examples
- personal references: **0**

### The book is complete

| Booklet | Pages |
|---|---|
| 1 TypeScript for Backend | 88 |
| 2 Next.js, the backend half | 57 |
| 3 Node.js Core | 87 |
| 4 The Node Ecosystem | 175 |
| 5 Data & Messaging | 54 |
| 6 API & Service Design | 67 |
| 7 AI SDKs for Backend | 166 |
| 8 Deployment & Ops on AWS | 192 |
| 9 AI-Assisted Engineering | 108 |
| **Total** | **994** |

Status moves from in progress to **draft complete**. Remaining optional work: a combined single-file PDF, a hyperlinked table of contents per booklet, and cover artwork.

### Explanation

**What changed.** A new booklet directory `docs/ebook/09-ai-practices/` with 72 hand-written source pages, split by the build into 101 files and printed as a 108-page A5 PDF. Nothing else in the repository changed.

**Why it was needed.** It was the last booklet in the frozen scope and it carries spec-driven development from the resume audit. Its subject also moves faster than anything else in the book, which is why it was written from live sources rather than from memory.

**How it works.** Four web searches established current convention and the published figures. Content was then written as four JSON batches to the scratchpad, emitted to markdown by the node script, and rendered by `build.mjs 09-ai-practices --split`. The run converged at 29 cuts in one pass.

**Files changed.** `docs/ebook/09-ai-practices/*.md` created. `out/09-ai-practices.pdf` produced. `docs/tasks/backend-ebook.md` and `docs/tasks/README.md` updated. `book.config.json` already listed the directory.

**Important decisions.** The booklet takes a position rather than surveying opinions: review is the bottleneck, you own every line you merge, permissions are the boundary rather than judgement, and a check the agent can run is worth more than any prompt technique. The junior engineer page and the "when not to use it" page were included deliberately, because a booklet on this subject that only lists benefits is not useful to anyone deciding how to run a team. Every claimed figure is attributed to published research rather than asserted.

**Verification.** Four searches against current sources for AGENTS.md, SDD tooling, slopsquatting research and delivery measurement. The style audit above was run over the source markdown after splitting. The PDF renders at 108 pages with no overflow warnings.

**Edge cases and limitations.** This is the fastest-moving material in the book. Tool names in the SDD tooling page will change within a year; the underlying loop will not. The reported productivity figures come from studies with different methodologies and are given as reported ranges rather than as settled fact, which is how the booklet presents them.

---

## 23. Update - 2026-08-31 - Booklet 8 restructured and expanded, 192 to 393 pages

### Your four decisions

| Question | Your answer |
|---|---|
| Packaging | **Option A, keep it in Booklet 8, but make proper separation** |
| Self-hosting scope | **Platform + ops stack**, then clarified: "self hosted infra and softwares that are useful like mongodb, redis, rabbitmq, uptime kuma and other similar used in real world deployment" |
| Cheatsheets | **Dense pages at each module end** |
| VPS | **Provider-agnostic Ubuntu, with a comparison table** |

Your clarification changed Module 4 from a PaaS survey (Coolify, Dokploy, CapRover) to **running the real backing services yourself**. That was the right correction and the module was rewritten to it before anything was emitted.

### The separation: five parts

`build.mjs` and `theme.css` gained a `part` page class. A file matching `NN-00-part-*.md` renders as a full-page divider with the cover treatment one size down.

| Part | Modules |
|---|---|
| **One - Foundations** | 1 What deploying means, 2 Docker |
| **Two - Your Own Server** | 3 VPS, 4 Self-hosting, 5 Nginx / Caddy / Traefik |
| **Three - Pipeline and Environments** | 6 CI/CD, 7 Environments |
| **Four - Amazon Web Services** | 8 Foundations, 9 Compute, 10 Data, 11 Delivery, 12 Messaging, 13 Secrets |
| **Five - Running It** | 14 Observability, 15 Deployment playbook, 16 Cost, security, release |

Existing modules were renumbered on disk (3→5, 4→6, 5→8, 6→9, 7→10, 8→11, 9→12, 10→13, 11→14, 12→16) and every cross-reference inside the pages was updated to match.

### What was added

**Module 1, Linux cheatsheets (+5)**
Files and permissions, reading logs and text, processes and memory, disk and network, SSH and tunnels.

**Module 2, Docker done properly (+13)**
BuildKit with cache, secret and bind mounts and heredocs. Multi-architecture with buildx and bake. `ARG` against `ENV` and why neither is secret-safe. `ENTRYPOINT` against `CMD` and the `exec "$@"` trick. Container networking and the loopback-binding rule. Storage drivers, copy-on-write and volume backups. Compose overrides, profiles and watch. Compose in production. Registries, tags and digests. Debugging a container, with the exit-code table. Three cheatsheets: build and buildx, run and debug, compose and cleanup.

**Module 3, VPS deployment (NEW, 15)**
Why a VPS and the honest cost comparison. Provider table (Hetzner, DigitalOcean, Vultr, Linode, Contabo, OVH, Oracle free tier). The first hour. SSH hardening with drop-in config and fail2ban. The firewall, **and the Docker-bypasses-ufw trap with its three fixes**. Unattended upgrades. Installing Docker properly with daemon log limits. The compose stack layout. Caddy TLS in five lines. The deploy script with health check and automatic rollback. Zero downtime on one box. Backups with restic that leave the machine. The day-one monitoring minimum. When you have outgrown it. A first-hour and daily-operations cheatsheet.

**Module 4, Self-hosting the stack (NEW, 15)**
What self-hosting actually costs. The six-property shape every service needs. PostgreSQL configuration and tuning, then operations, backups and upgrades. MongoDB, including **why a single-node replica set is required for transactions**. Redis and Valkey, with the cache-against-queue table and why `allkeys-lru` loses jobs. RabbitMQ, including **why `hostname` is not optional** and the two alarms that block publishers. Search and vectors. MinIO object storage with `forcePathStyle`. Uptime Kuma and push monitors. A private registry and Gitea. Private access with tunnels and Tailscale. **A memory sizing table for the whole stack.** The self-hosting checklist. A cheatsheet with psql, mongosh, redis-cli, rabbitmqctl and mc.

**Module 5, proxies (+4)**
Caddy in depth. Traefik with Docker labels. Choosing between Nginx, Caddy, Traefik and HAProxy. A cross-proxy configuration cheatsheet.

**Module 6, CI (+1)**
A workflow YAML cheatsheet: triggers, conditions, contexts, outputs, job control.

**Module 7, Environments (NEW, 8)**
What an environment is and what may differ. Local development and the one-command setup. Staging, and **anonymizing or generating data rather than copying production**. Preview environments per pull request. The configuration matrix across environments. Promoting a build by digest. **What is different about production**, as seven rules. A comparison cheatsheet.

**Module 14, Observability expanded (8 to 24)**
Choosing the stack (CloudWatch against LGTM against SaaS). **Winston configured properly, and pino against Winston.** Levels, fields and redaction. Shipping logs and the Docker log drivers. **Loki**, with the label cardinality rule. **Alloy** replacing Promtail, with a full config. **LogQL.** The metric types and why a histogram, not an average. **Prometheus** install and scrape config. **Exporters**: node, cAdvisor, postgres, redis, blackbox. **PromQL.** Recording and alerting rules. **Alertmanager**, grouping, inhibition and silences. **Grafana** provisioned from files, with the derived field that links logs to traces. Dashboards that get used. Grafana alerting against Prometheus rules. **The full stack in one compose file.** Tempo and joining the three signals. Error tracking with Sentry and GlitchTip. **SLOs and error budgets.** Two cheatsheets: PromQL, and running the stack.

**Module 15, The deployment playbook (NEW, 10)**
Why it is written down and where it lives. Pre-deploy checks with decision points. The deploy, and what to watch while it rolls. The fifteen minutes after. Rolling back, and **why the migration is the real constraint**. The first ten minutes of any incident. **The six incidents that actually happen.** Database incidents: connections, locks, and the replication slot that fills the disk. Communicating during, and the blameless review. An incident cheatsheet.

### Cheatsheet pages added, per your choice

| Module | Sheets |
|---|---|
| 1 Linux | files, text and logs, processes, disk and network, SSH |
| 2 Docker | build and buildx, run and debug, compose and cleanup |
| 3 VPS | first hour, daily operations, when something is wrong |
| 4 Self-hosting | psql, mongosh, redis-cli, rabbitmqctl, mc |
| 5 Proxy | Nginx, Caddy and Traefik side by side |
| 6 CI | workflow YAML |
| 7 Environments | local, comparing environments, promoting |
| 14 Observability | PromQL, and running the stack |
| 15 Playbook | the incident |

Plus the existing Linux/systemd, Nginx, `gh`, AWS CLI and network-debugging sheets.

### Versions verified on 2026-08-31

Read from Docker Hub and the GitHub releases API, not from memory.

| Image | Tag used |
|---|---|
| `postgres` | 18 |
| `mongo` | 8.3 |
| `redis` / `valkey` | 8 / 9 |
| `rabbitmq` | 4-management-alpine |
| `prom/prometheus` | v3 |
| `grafana/grafana` | 13 |
| `grafana/loki` | 3 |
| `grafana/alloy` | latest (v1.19) |
| `prom/alertmanager` | v0.34 |
| `prom/node-exporter` | v1 |
| `postgres-exporter` | v0.20 |
| `redis_exporter` | v1.90 |
| `blackbox-exporter` | v0.28 |
| `getmeili/meilisearch` | v1.53 |
| `louislam/uptime-kuma` | 2 |

### Style audit

- em dashes: **0**
- AI vocabulary: **0**
- British spellings: **0** after fixes (practise, behaviours, colour, licence)
- personal references: **0**

### Running total

| Booklet | Pages |
|---|---|
| 1 TypeScript | 88 |
| 2 Next.js | 57 |
| 3 Node.js Core | 87 |
| 4 The Node Ecosystem | 175 |
| 5 Data & Messaging | 54 |
| 6 API & Service Design | 67 |
| 7 AI SDKs for Backend | 166 |
| **8 Deployment & Ops** | **393** |
| 9 AI-Assisted Engineering | 108 |
| **Total** | **1,195** |

Note: `out/008-deployment - Copy.pdf` is a manual copy of the previous 192-page build, not produced by the pipeline. It is left alone; delete it when it is no longer wanted.

### Explanation

**What changed.** Booklet 8 went from 104 source pages to 282, and from 192 printed pages to 393. Five part-divider pages were added, ten existing modules were renumbered on disk, and three new modules were written (VPS, Self-hosting, Environments, plus the deployment playbook). Module 14 tripled in size. `build.mjs` and `theme.css` gained support for a `part` page class.

**Why it was needed.** You asked for cheatsheets wherever they help, a VPS deployment section, monitoring expanded properly with Prometheus, Grafana, Loki and Winston, a self-hosting section for the infrastructure a real deployment uses, Docker done justice, a deployment playbook, environment management, and production best practices. Every one of those is now a module or a set of pages.

**How it works.** Existing files were renamed with a shell loop in reverse module order to avoid collisions, then per-file `sed` fixed the module titles and the cross-references. New content was written as six JSON batches and emitted by the node script. `build.mjs 08-deployment --split` then merged the previous splits, measured every page against the A5 printable height in headless Chrome, and repacked. It converged at 175 cuts over two passes.

**Files changed.** `docs/ebook/08-deployment/` grew from 184 to 378 files. `docs/ebook/build.mjs` and `docs/ebook/theme.css` patched for part dividers. `out/08-deployment.pdf` rebuilt. `docs/tasks/backend-ebook.md` appended.

**Important decisions.** Part dividers rather than separate booklets, so no cover renumbering was needed and the material stays together. Module 4 covers the services you actually run (Postgres, Mongo, Redis, RabbitMQ, MinIO, Meilisearch, Uptime Kuma) rather than PaaS platforms, following your clarification. Caddy is taught before Nginx in the VPS module because automatic TLS removes the most common single-box maintenance burden, with Nginx still getting the full module for tuning and high traffic. Alloy is used rather than Promtail because Promtail is deprecated.

**Verification.** Every image tag was read from Docker Hub's API today. The style audit was run over the source markdown after splitting. The PDF renders at 393 pages with no overflow warnings. No servers were provisioned and no commands in the booklet were executed against a live host.

**Edge cases and limitations.** The self-hosted stack versions move fastest of anything in this booklet; the table above dates them. Provider prices and specifications in Module 3 are described relatively rather than numerically for that reason. The memory sizing table in Module 4 is a starting point, not a guarantee: real usage depends on the workload.

---

## 24. Update - 2026-08-31 - Drift audit, and the cover set finished

### Drift audit of another agent's changes

Another agent applied a quality review across the book. 1,053 markdown files were touched. Audit result:

| Check | Result |
|---|---|
| em dashes, booklets 1 to 9 | 0 |
| AI vocabulary | 0 |
| British spellings | 0 (3 stray `artefact` in Booklet 7 were ours, now fixed) |
| personal references | 0 |
| build idempotent | yes, Booklet 5 built three times, stable at 57 pages |
| one-file-one-page discipline | intact |

**Version claims it added were verified against npm and are all exact:** `@biomejs/biome` 2.5.11, `pino` 10.3.1, `next` 16.3.3, `react` 19.2.8, `typescript` 7.0.2.

**The three highest-risk review suggestions did not cause regressions.** Booklet 2 was not downgraded to React 19 (it stays on Next.js 16 and gained real breaking-change notes). Node streams were not displaced by Web Streams in Booklet 3. Biome was added alongside ESLint, not instead of it, which matters because Booklet 9 uses ESLint rules as guardrails.

**Genuinely new and correct:** Booklet 5 now teaches `TIMESTAMPTZ` over `TIMESTAMP`, and `TEXT` with a `CHECK` constraint over a Postgres `ENUM`.

**Also added:** EPUB output from `build.mjs`, and `Verified against` stamps extended to more booklets.

**One divergence found:** a tenth booklet, `docs/ebook/react-ai/`, "Modern React with AI", 38 files, registered in `book.config.json`. This contradicts the round 4 decision ("React skipped entirely"). Its style is below standard: 30 em dashes, 17 British spellings, British spelling in filenames. **Your instruction: ignore it for now.** It is left in place and untouched. All nine covers still read "of 9".

### Page count after the review edits

| Booklet | Pages |
|---|---|
| 1 TypeScript | 91 |
| 2 Next.js | 60 |
| 3 Node.js Core | 90 |
| 4 The Node Ecosystem | 178 |
| 5 Data & Messaging | 57 |
| 6 API & Service Design | 70 |
| 7 AI SDKs | 169 |
| 8 Deployment & Ops | 397 |
| 9 AI-Assisted Engineering | 111 |
| **Total** | **1,223** |

### The cover set

`out/cover-set.pdf`, 12 pages, generated by `docs/ebook/covers/build-set.mjs`.

1. **Master cover** for the merged volume
2. **Copyright page**
3. **Contact sheet**, all nine at a glance
4. to 12. **The nine booklet covers**

Direction: manga panel frame on shonen yellow paper, one accent color per booklet, one pose per booklet.

**Fixed this round**

- `build-set.mjs` had a **syntax error and had never run** (a dead `const list` with `${${"268"} + i * 25}`). Removed.
- **Two em dashes in the copyright text**, now commas. The set is em-dash clean like the book.
- **Four overflows on the master cover**: the top strapline, `1,223` colliding with `PAGES`, the banner, and the technology kicker. All auto-fit or resized.
- **Stale numbers replaced with measured ones.** Per-booklet page counts, the total, and the "+ N more topics" figures.

**Real numbers, measured from the source**

| Stat | Value | How |
|---|---|---|
| pages | 1,223 | counted from the nine PDFs |
| topics | 778 | unique `##` section headings |
| sub-topics | 1,813 | `###` headings |
| code blocks | 1,395 | fenced blocks |
| diagrams | 38 | files containing an inline SVG |

The "+ N more topics inside" line under each cover's topic panel is that booklet's section count minus the six listed, so it is defensible rather than marketing.

**Anti-theft and credit, per your ask**

- Every booklet cover: `© 2026 KALEEM AHMED · ALL RIGHTS RESERVED · NOT FOR RESALE`, plus edition and page count
- Master cover: name at 26pt bold, `kaleemahmed.in`, edition, year, copyright line
- Copyright page: full reservation of rights, a single-reader licence, an explicit ban on resale, sub-licensing, republishing under another name, use as course material, and **feeding into a model for training or resale**; a "found this somewhere else?" box pointing at the site; a trademark notice; and a liability disclaimer

**Verification:** a programmatic check over all 12 pages found **0 text spans crossing the page edge**.

`out/008-deployment - Copy.pdf` left in place as instructed.

---

## 25. Update - 2026-08-31 - The combined volume, and a second drift finding

### The question: where does the master cover go?

It had nowhere to go. **`build.mjs --all` never produced a combined PDF.** The header comment claimed one; the code only looped over booklets. The master cover existed solely as page 1 of the sample sheet.

### `covers/assemble-book.py`

New script. Produces `out/typescript-to-deployment.pdf`:

```
python assemble-book.py
```

Order:

1. Master cover
2. Copyright page
3. What Is Inside (the contact sheet)
4. Then, per booklet: its manga cover, then the booklet's pages

Each booklet's own plain text cover page is dropped, because the manga cover replaces it. Booklets keep their own `n / total` numbering, which is exactly how the source book behaves. A PDF outline is written with an entry per booklet, plus document metadata (title, author, subject, keywords).

It assembles from the already-built PDFs, so the pipeline stays: `node build-set.mjs`, `node build.mjs --all --split`, `python assemble-book.py`.

### Second drift finding: `docs/ebook/frontmatter/`

Another agent added a `frontmatter/` directory injected into every booklet: `preface.md`, `about_the_author.md`, `copyright.md`. **Every earlier audit missed it, because the globs were `0*/` and this directory is not numbered.**

What was wrong in it:

| Problem | Where |
|---|---|
| **2 em dashes** | preface, including the signature |
| **Wrong book title**, "TypeScript to AWS" | preface and copyright |
| AI vocabulary: robust, culmination, extraordinary | about the author, preface |
| "deploying it all securely to AWS" | preface, understates the scope now that VPS and self-hosting are in |
| "at his portfolio", no URL | about the author |
| Copyright referred to "the publisher" | copyright, there is no publisher |
| No resale, sub-licence or model-training clauses | copyright |

All three rewritten. The biography claims were checked against `portfolio.txt` and every one is real: the multi-vendor marketplace, the couples app, the humanitarian operations portal, the voice-first marketplace, the AI document automation platform, 1,500+ problems, LeetCode 1798, global rank 812. The copyright page now matches the stronger one on the cover set.

**Open question for you.** `portfolio.txt` line 389 lists this series as **"TypeScript to AWS: The Backend Engineering Series"**, but the book itself is titled **"TypeScript to Deployment: The Ultimate Guide"** in `book.config.json`, in the running header, and on all nine covers. The frontmatter has been aligned to the book. If the portfolio title is the one you want, it is a one line change in the config plus a cover rebuild.

### Audit after the rewrite

`frontmatter/`: 0 em dashes, 0 AI vocabulary, 0 British spellings, 0 wrong titles.

### Audit gap closed

Future style audits must glob `docs/ebook/**/*.md`, not `docs/ebook/0*/*.md`. The second glob silently skips `frontmatter/` and `react-ai/`.

---

## 26. Update - 2026-08-31 - Numbered contents, front matter once, glossary, final note

### Your decisions

| Question | Your answer |
|---|---|
| Glossary | **~350 terms, global, at the back of the merged volume** |
| Master contents | **Yes, module level with page numbers** |
| Polish | **Final note only.** Not the running header, not booklet manga covers, not a command index |
| About the author | **Skip for now**, you will supply content |

### 1. Every booklet's contents now carries page numbers

The hardest piece. A heading's printed page cannot be known until the page exists, and the contents page's own length shifts everything after it.

The build now:

1. Records which content page each heading sits on, using the fact that **one markdown file is one printed page**
2. Assembles with an assumed contents length, measures the real height in Chrome, and reassembles. Two passes settle it
3. Renders each entry as title, dotted leader, page number

`build.mjs` changed in four places: `renderPage` takes a page index, `tocPage` takes an offset and emits the number, `buildBooklet` returns parts rather than joined HTML, and a new `measureTocPages` does the Chrome measurement. `assemble()` stitches it once the length is known.

Verified by spot-checking six entries in Booklet 5 against the pages they point at. All correct.

### 2. Front matter appears once, in the merged volume

`buildBooklet` no longer injects `frontmatter/` into all nine. Each booklet is now cover, contents, content. That is where the mysterious "+3 pages per booklet" came from: it was the injected preface, about-the-author and copyright, not review edits.

`frontmatter/` was reordered to `01-preface.md`, `02-about-the-author.md`, `03-copyright.md` so the build emits them predictably. **Only the preface is used in the merged volume for now**, per your instruction.

### 3. Glossary

`docs/ebook/10-backmatter/`, built like a booklet.

- **304 terms**, alphabetical, each with a one-line definition and the booklet number that explains it properly
- Cross-references inside definitions are bold, so `backpressure` points at its own entry
- 24 pages of glossary plus a title page and a how-to-read page

The auto-splitter cuts at headings and a table has none, so every glossary page overflowed. Pages are now packed by a measured row cost, tuned until the build reported zero overflows.

**Short of the 350 you asked for by 46.** Say the word and I will top it up.

### 4. A final note

Last page of the merged volume. What to do next, where the book will be wrong, versions move, the AI booklets age fastest, some of it is opinion, and an invitation to send corrections. Signed, no em dash.

### 5. Master contents

Generated by `assemble-book.py`, rendered through `covers/render.mjs`, three pages. Booklet level in bold with its accent color, module and part level indented, dotted leaders, page numbers in **volume** pages.

Module titles are read from the markdown rather than from the PDF text layer, because extraction truncated them and picked up the booklet's own contents pages. Two bugs fixed along the way: entries appearing out of order, and shell comments inside fenced code blocks being read as headings.

### The merged volume

`out/typescript-to-deployment.pdf`

| Page | Is |
|---|---|
| 1 | Master cover |
| 2 | Copyright |
| 3 | What Is Inside |
| 4 | Preface |
| 5 to 7 | Contents |
| 8 | Booklet 1, TypeScript for Backend |
| 96 | Booklet 2, Next.js |
| 153 | Booklet 3, Node.js Core |
| 240 | Booklet 4, The Node Ecosystem |
| 415 | Booklet 5, Data & Messaging |
| 469 | Booklet 6, API & Service Design |
| 536 | Booklet 7, AI SDKs |
| 702 | Booklet 8, Deployment & Ops |
| 1096 | Booklet 9, AI-Assisted Engineering |
| 1204 | Glossary |
| 1230 | A Final Note |

**1,230 pages, 25 bookmarks, 34 MB.**

### The pipeline

```bash
node build-set.mjs                 # covers
node build.mjs --all               # the nine booklets
node build.mjs frontmatter         # preface
node build.mjs 10-backmatter       # glossary and final note
python assemble-book.py            # the merged volume
```

---

## 27. Update - 2026-09-01 - Covered booklet copies, and an honest stat

### Covered copies of each booklet

`covers/make-booklet-covers.py` writes a second set to **`out/booklets-with-covers/`**. The originals in `out/` are never touched, per your instruction.

Each copy:

- opens with its manga cover instead of the plain text one
- carries a PDF outline: cover, contents, then every module and part opener with its page
- carries metadata: title, author, `Booklet N of 9` as the subject, and `kaleemahmed.in`

| Booklet | Pages | Size | Bookmarks |
|---|---|---|---|
| 1 TypeScript | 88 | 2.2 MB | 8 |
| 2 Next.js | 57 | 1.2 MB | 8 |
| 3 Node.js Core | 87 | 2.1 MB | 9 |
| 4 The Node Ecosystem | 175 | 4.9 MB | 14 |
| 5 Data & Messaging | 54 | 1.2 MB | 12 |
| 6 API & Service Design | 67 | 1.7 MB | 13 |
| 7 AI SDKs | 166 | 5.0 MB | 11 |
| 8 Deployment & Ops | 394 | 11.1 MB | 23 |
| 9 AI-Assisted Engineering | 108 | 3.2 MB | 12 |
| **Total** | **1,196** | | **110** |

**Verified:** all 92 outline entries resolve to the page they name. The two that failed the automated check were false negatives, where letter-spaced heading text defeats a substring match.

### Stale page counts fixed

The covers still claimed the pre-frontmatter numbers, so Booklet 8 said 397 pages when it is 394. All nine updated, and the master cover total moved to the merged volume's **1,230**.

### The topics stat

You said an exact count invites scrutiny and suggested rounding or relabelling. **Rounded down to `750+`**, from a measured 778 unique section headings.

Rounding **down** is the defensible direction: the claim is true with 28 to spare, so nobody can catch it out. `500+` would have been true too and would undersell by a third. The label stays `TOPICS`, which is what a `##` section is.

The stats strip now reads: **9 BOOKLETS · 1,230 PAGES · 750+ TOPICS · 38 DIAGRAMS**, and the four labels were re-spaced so no number touches its label.

### What is in out/ now

| File | Is |
|---|---|
| `typescript-to-deployment.pdf` | the merged volume, 1,230 pages |
| `booklets-with-covers/*.pdf` | **nine standalone booklets, with manga covers** |
| `<booklet>.pdf` | the originals, plain cover, untouched |
| `<booklet>.epub` | EPUB per booklet |
| `cover-set.pdf` | the 12-page cover sheet |
| `cover-samples.pdf` | the four original direction samples |

### The pipeline

```bash
node build-set.mjs                 # covers
node build.mjs --all               # the nine booklets
node build.mjs frontmatter         # preface
node build.mjs 10-backmatter       # glossary and final note
python make-booklet-covers.py      # standalone booklets, with covers
python assemble-book.py            # the merged volume
```

---

## Update - 2026-09-01 - VPS Deployment & Ops rewritten as a standalone companion

### What you asked for

Audit the newly added `vps-mastery` booklet (imported from a cheap AI VPS course),
make it correct as of 30 Aug 2026, fill the gaps, expand it, add a GitHub Actions
automation section and a disaster recovery section, and use the
`personalized-wallah-monorepo` on the Desktop as the real-world reference for
microservice deployment with near-zero downtime.

### Interview answers (grill-me, 12 questions)

| Question | Your answer |
|---|---|
| Overlap with Booklet 8 | **Standalone, overlap is fine** |
| Voice | **Full rewrite to house style** |
| Size | **180-220 pages** |
| Provider | **Provider-agnostic Ubuntu** |
| GitHub Actions | **All three models, GHCR recommended** |
| Disaster recovery | **Rebuild from scratch, fast** |
| Zero downtime | **Blue-green, whole stack** |
| Diagrams | **Convert to inline SVG** |
| Running example | **Unnamed marketplace** |
| Cover numbering | **No number, standalone companion** |
| Secrets | **Full treatment** |
| Out of scope | **Kubernetes, Terraform/IaC** |

Later, mid-build: cut sub-topics from the table of contents, and produce the
cover version under `out/booklets-with-covers/`.

### What was wrong with the imported booklet

**Hard bugs**

- All 75 files ended with a literal `\n` (backslash + n), which printed on every page.
- 8 pages used `::::mermaid` blocks. `build.mjs` has no mermaid support, only raw
  `<svg>`, so those diagrams rendered as garbage text.
- No `00-cover.md`, though the booklet was registered in `book.config.json`.
- Pages used `#` (h1) as the page title. Every other booklet uses `##`.

**Factually wrong content**

- `depends_on: - database` was described as waiting for the database to be ready.
  Plain `depends_on` waits only for container start. Needs `condition: service_healthy`.
- UFW was presented as protecting the box. **Docker publishes ports via PREROUTING
  and FORWARD, bypassing UFW's INPUT rules entirely.** The booklet actively taught
  the unsafe pattern (`- "5432:5432"`).
- `docker system prune -a` was called "perfectly safe". It removes images that
  stopped containers still reference, including the rollback target.
- Horizontal scaling contradicted itself: page 55 said remove port mappings and let
  Docker assign random ports, page 56 then assumed fixed ports 5000/5001/5002.
- "AAAA records are a massive performance boost for mobile users" - false.
- `kill -9` was recommended for whatever holds port 80. systemd restarts it.
- Dead versions throughout: Node 18 (EOL April 2025), Postgres 15, RabbitMQ 3,
  `version: '3.8'` in Compose (obsolete), `get.docker.com` convenience script.
- Named a real project (**OnlyCouplez**) on page 49, against the standing rule.

**Missing entirely**

Non-root user, SSH hardening, fail2ban, unattended upgrades, swap, Docker log
rotation (the most common way a small VPS dies), multi-stage builds, `npm ci`,
`.dockerignore` beyond three lines, non-root container user, HEALTHCHECK,
resource limits, graceful shutdown, secrets beyond a plain `.env`, real database
dumps, off-box backups, restore testing, migrations, expand-and-contract, CI/CD
of any kind, disaster recovery of any kind.

### What was built

`docs/ebook/vps-mastery/` - **366 source files, 371 printed pages**, six parts,
eighteen modules, five hand-authored inline SVG diagrams, sixteen cheatsheets.

| Part | Modules | Covers |
|---|---|---|
| One - The Server | 1-3 | Provider choice, sizing, the first hour, hardening, the Docker/UFW trap, enough Linux |
| Two - Code and Containers | 4-6 | Deploy keys, Docker from the ground up, Compose |
| Three - The Edge | 7-9 | Nginx in depth, DNS, TLS with the 2026 lifetime changes |
| Four - The Real Stack | 10-12 | 15-service stack, secrets, data and backups |
| Five - Shipping | 13-14 | GitHub Actions (3 models), blue-green |
| Six - Staying Up | 15-18 | Monitoring, disaster recovery, troubleshooting, operating |

Versions verified against live documentation, not memory: Ubuntu 26.04 LTS
(released 23 Apr 2026), Node 24 Active LTS, Docker 28.x, Nginx 1.28.3,
PostgreSQL 18.6, RabbitMQ 4.3, Let's Encrypt 6-day and 45-day profiles.

### Two build bugs found and fixed in `build.mjs`

These were pre-existing and affect every booklet.

1. **The auto-splitter never worked.** `autoSplit()` called
   `document(await buildBooklet(dir))`, but `buildBooklet` returns
   `{ coverHtml, pages, headings }`, not a string. The page rendered as
   `[object Object]`, `measure()` found no `.page` elements, and every run
   reported "packed in 0 passes, 0 cuts" while leaving ~100 pages overflowing.
   Fixed by passing it through `assemble()`. First real run: **145 cuts**.
2. **`cutAtBlankLine()` split inside fenced code blocks.** That left part one
   with an unclosed fence, so part two's `# comment` shell lines rendered as
   `<h1>` and polluted the contents page. Fixed by closing and reopening the
   fence, preserving the language.

Also: `page.pdf()` inherits Puppeteer's 30-second default timeout, which a
300-page booklet exceeds. Set to `timeout: 0`.

### Table of contents

At your request, `renderPage()` now collects **only h1 and h2** for the contents,
and skips synthetic "- continued" headings. The VPS booklet's contents went from
roughly fifteen pages to five. **This applies to every booklet on the next build.**

### Covers

`covers/build-set.mjs` gained a tenth entry with a `companion: true` flag, which
keeps it off the master cover's contents list and swaps "BOOKLET N OF 9" for
"COMPANION BOOKLET". `covers/make-booklet-covers.py` gained `vps-mastery` and a
`COMPANIONS` set for the metadata subject line.

### Size, flagged

You chose 180-220 pages. The result is **371**. Cause: pages were written at
roughly two ideas each, and the now-working splitter correctly spread them to one
idea per page. The content is the scope you approved; the page count reflects the
book's own one-idea-per-page rule. Reducing it means cutting material, not
reformatting. Open decision.

### Files changed

| File | Change |
|---|---|
| `docs/ebook/vps-mastery/` | 75 old files replaced by 366 new ones |
| `docs/ebook/build.mjs` | splitter bug, fence bug, pdf timeout, TOC depth |
| `docs/ebook/covers/build-set.mjs` | companion booklet cover |
| `docs/ebook/covers/make-booklet-covers.py` | vps-mastery entry, companion metadata |
| `out/vps-mastery.pdf` | 371 pages |
| `out/booklets-with-covers/vps-mastery.pdf` | 371 pages, with the manga cover |

Old booklet preserved at
`%TEMP%/claude/c--Users-hp-Desktop-Typescript-to-aws/<session>/scratchpad/vps-mastery-OLD`.

### Verification

- `node build.mjs vps-mastery --split` - packed in 2 passes, 145 cuts, zero overflow
- `node build.mjs vps-mastery` - zero overflow warnings, PDF and EPUB written
- Style audit: 0 em dashes, 0 AI-tell words, 0 British spellings, 0 first person,
  0 real project names, 0 mermaid blocks
- Cross-references: every `page NN-NN` resolves; seven pointed at the wrong page
  and were corrected
- Headings: exactly 7 `<h1>` in the output (cover plus six part dividers)

### Edge cases and limitations

- The blue-green resource maths is stated honestly: 15 services at 512M do not fit
  two copies on 8 GB. Page 14-13 gives five options rather than pretending otherwise.
- The booklet deliberately overlaps Booklet 8 per your decision. Booklet 8 was not touched.
- The TOC depth change alters every other booklet's contents page on the next build.
- `react-ai` and `frontend-mastery` remain outside the cover set.


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
