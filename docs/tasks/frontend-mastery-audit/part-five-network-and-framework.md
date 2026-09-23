# Part Five — The Network And The Framework

**Files covered:** 32 (`12-00-part-five.md` … `13-06-choosing-a-framework-2-2.md`), ~6,400 words.
**Passes run:** 1 (fact) and 2 (consistency) only, per `BRIEF-FACT.md`. Voice and structure skipped.
**Date of audit:** 2026-09-05.

## Budget line

- **Web fetches spent: 16** (14 `WebFetch`, 2 `WebSearch`) of the ~25 allowed.
- **Claims verified against a fetched primary source: 34.**
- **Findings: 9 WRONG, 6 UNVERIFIABLE, 7 contradictions/repeats.**
- **NOT CHECKED** (listed in full at the end): Vercel Edge memory limit, htmx bundle size (docs do not state one), Astro `client:visible` semantics, TanStack Start's current status, Qwik resumability, Apollo Client's cache claims, market-share claims in `13-06`, the SSE six-connection limit, `layout.tsx` re-render semantics, and the Server Actions progressive-enhancement claim.

## Verdict

The Next.js 16 material is in better shape than expected — Cache Components, `use cache`, `cacheLife`, `cacheTag`, `updateTag`, `refresh`, the two-argument `revalidateTag`, the PPR-flag removals, the async request APIs, the `proxy.ts` rename and Turbopack-as-default all check out against the live 16.3.4 docs. Two things spoil it. First, a **code sample in the caching chapter uses `params.id` synchronously**, which the book itself declares broken two pages earlier and two pages later — it is the single most visible error in the part. Second, the material outside Next.js has rotted: **`middleware` was not edge-only before 16** (stated twice), **`runtime = 'edge'` is now marked deprecated** in the very table the book teaches from, **Remix is no longer "React Router v7"**, **htmx moved WebSockets and SSE out of core**, **HTTP/1.1 does not close the connection after each response**, and the **edge-limits table contradicts Cloudflare's own live numbers**. The Sydney latency figure is out by a factor of two and appears in both prose and a diagram.

---

# Pass 1 — FACT

## WRONG

### W1. `params.id` read synchronously — the book contradicts itself and the code does not work
`13-03-caching-and-cache-components-2-2-1.md:53-63`

```tsx
export default function ProductPage({ params }) {
      <ProductDetails id={params.id} />       {/* cached, instant */}
      <LivePrice id={params.id} />            {/* per request, streams in */}
```

`params` is a Promise in Next 16, so `params.id` is `undefined` and both components receive nothing. The Next 16 release notes list under **Removals**: "**Sync `params`, `searchParams` props** access | Must use async: `await params`, `await searchParams`". The book states this itself at `13-01-app-router-vs-pages-router-2-2.md:3` and again at `13-03-caching-and-cache-components-2-2-2-2.md:3-8`.
Source: https://nextjs.org/blog/next-16 (Removals table)
**Fix:** `export default async function ProductPage({ params }) { const { id } = await params; … }`.

### W2. `middleware` was not edge-only before Next 16 — stated twice
`12-04-edge-runtimes-2-2-1.md:3-4` — "Next.js 16's `proxy.ts` runs on the **Node runtime**, which is the change from earlier versions where middleware was edge-only."
`13-05-proxy-and-the-request-boundary-1.md:11` — "It also runs on the **Node runtime**, which the old edge-only version did not, so ordinary Node libraries work."

The proxy reference's own version history:
`v15.5.0 | Middleware can now use the Node.js runtime (stable)`
`v15.2.0 | Middleware can now use the Node.js runtime (experimental)`
`v16.0.0 | Middleware is deprecated and renamed to Proxy. Proxy defaults to the Node.js runtime`

Node runtime for middleware went **stable in 15.5**, ten months before 16. What 16 changed is that Node became the **default** and the per-file `runtime` option was removed ("The `runtime` config option is not available in Proxy files. Setting the `runtime` config option in Proxy will throw an error").
Source: https://nextjs.org/docs/app/api-reference/file-conventions/proxy
**Fix:** "which is now the default — middleware could opt into Node from 15.5, but had to be told to."

### W3. `export const runtime = 'edge'` is taught as current; the docs mark it deprecated
`12-04-edge-runtimes-2-2-1.md:8-18` — "Route handlers can still opt in per route:" followed by `export const runtime = 'edge';`

The Route Segment Config table in the 16.3.4 docs reads:
`runtime | 'nodejs' \| 'edge' (deprecated) | 'nodejs'`

The previous-caching-model guide reinforces it: "The revalidate value is not available when using the **deprecated** `runtime = 'edge'`."
Sources: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config and https://nextjs.org/docs/app/guides/caching-without-cache-components
**Fix:** keep the sample but say the export is deprecated in 16, so a book claiming Next 16 should not present it as the way forward. Note `preferredRegion` is marked deprecated in the same table.

### W4. HTTP/1.1 does not close the connection after each response
`12-02-websockets-and-sse-1.md:3-4` — "The server answers, and **the connection closes immediately.**"

MDN: "In HTTP/1.1, persistence is the default, and the header is no longer needed." Short-lived connections are "the default model used in HTTP/1.0 … In HTTP/1.1, this model is only used when the `Connection` header is sent with a value of `close`."
Source: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Connection_management_in_HTTP_1.x
**Fix:** the connection is reused; what ends is the *request/response exchange*. The real point the page wants — the server cannot initiate — survives without the false claim. ("HTTP is a uni-directional protocol" on the same line is also loose; request/response is the accurate word.)

### W5. htmx moved WebSockets and SSE out of core
`12-03-islands-architecture-and-htmx-2-1.md:21` — "HTMX allows you to access AJAX, CSS Transitions, WebSockets, and Server Sent Events directly in HTML, using attributes."

That is the htmx **1.x** tagline. The htmx 2.x docs (current version 2.0.10) state: "Web Sockets and Server Sent Events (SSE) are supported via **extensions**. Please see the SSE extension and WebSocket extension pages to learn more."
Source: https://htmx.org/docs/
**Fix:** name them as extensions. It matters because the book's own `12-02` chapter is about exactly these two protocols, so a reader will try the attributes.

### W6. The edge bundle-size limit contradicts Cloudflare's live docs
`12-04-edge-runtimes-2-1.md:11` — "| Bundle size barely matters | **usually a few megabytes, compressed** |"

Cloudflare Workers limits: "**There is no compressed size limit. Only the uncompressed bundle size counts.**" The uncompressed limit is 64 MiB on both Free and Paid.
Source: https://developers.cloudflare.com/workers/platform/limits/
**Fix:** either give the vendor number with its URL, or cut the row. The "compressed" framing is a Workers limit that no longer exists.

### W7. "Long-running requests: typically 10 to 30 seconds" matches no platform
`12-04-edge-runtimes-2-1.md:8` — "| Long-running requests | typically 10 to 30 seconds |"

- Cloudflare Workers: CPU time is **10 ms** on Free and **30 s default / 5 min max** on Paid. Wall clock for HTTP requests has **no enforced limit** while the client stays connected. (https://developers.cloudflare.com/workers/platform/limits/)
- Vercel Edge runtime: "must begin sending a response within **25 seconds** … and can continue streaming data for up to **300 seconds**." (https://vercel.com/docs/functions/limitations)

Neither gives "10 to 30 seconds", and the row conflates CPU time with wall-clock duration — the distinction that actually bites.
**Fix:** split CPU time from duration, cite one vendor with the URL, or cut.

### W8. Remix is no longer "built on React Router v7"
`13-06-choosing-a-framework-1.md:16-20` — "**Remix**, now built on React Router v7 and later, is **backed by Shopify**."
`13-06-choosing-a-framework-2-1.md:7` — "| A full-stack React application and you want fewer abstractions | **Remix** |"

remix.run today describes Remix as "The fully-stacked web framework" that "brings together a server runtime, routing, authentication, sessions, database integrations, a UI framework, asset compilation, dynamic styling, and accessible components in a cohesive stack built on Web APIs" — no mention of React Router. Remix's own posts state that what was planned as Remix v3 shipped instead as **React Router v7**, and that the *new* Remix v3 starts from **a fork of Preact**, not React. The Shopify half is right (`©2026 Shopify, Inc.`).
Sources: https://remix.run/ , https://remix.run/blog/merging-remix-and-react-router , https://remix.run/blog/wake-up-remix
**Fix:** the row recommending a "full-stack **React** application" should name **React Router v7 (framework mode)**. Remix is now a separate, non-React framework — mention it as that or drop it. As written the book sends a React team to a Preact framework.

### W9. Sydney–Virginia latency is out by roughly 2×, in prose and in the diagram
`12-04-edge-runtimes-1.md:4-5` — "the speed of light alone costs about **160ms each way**"
`12-04-edge-runtimes-2-2-2-2.md:52` (SVG label) — `160ms each way`

Sydney to Ashburn is roughly 15,700 km great-circle. Light in fibre travels at about 200,000 km/s, giving **≈ 78 ms one way, ≈ 157 ms round trip**. 160 ms is the *round-trip* number, not the one-way number.
**Verdict caveat:** this is arithmetic I did, not a figure I fetched from a source, so treat it as a computation the editor should redo rather than a cited correction. The conclusion the page draws is unaffected — it is the same order of magnitude — but the words "each way" should become "round trip", in both places.

---

## UNVERIFIABLE

### U1. Edge memory "around 128MB" — right for Cloudflare, unsourced as a general claim
`12-04-edge-runtimes-2-1.md:9` — "| Hundreds of megabytes of memory | around 128MB |"
Cloudflare confirms 128 MB per isolate on both plans (https://developers.cloudflare.com/workers/platform/limits/). Vercel's functions-limits page gives 2 GB / 4 GB for Node functions and states **no memory figure for the Edge runtime**. The book presents 128MB as a property of "Edge" generally. Correct for Workers; unsourced elsewhere.

### U2. htmx "a single ~14kb library"
`12-03-islands-architecture-and-htmx-2-2.md:6` — "**Tiny Footprint:** HTMX is a single ~14kb library."
The htmx docs page (v2.0.10) states no gzipped size. No primary source fetched supports 14kb. Either cite htmx.org's own figure with a URL and say min+gzip, or cut the number and keep "one file, no build step".

### U3. "the largest share of production React applications"
`13-06-choosing-a-framework-1.md:10-11` — "**Next.js** holds the enterprise default position, with the largest share of production React applications."
No source. Not checked. Either cite a survey (State of JS, npm downloads) with the year, or soften to something the book can stand behind.

### U4. "Multiple comparisons put it as the lower-risk full-stack React choice"
`13-06-choosing-a-framework-1.md:18-20`
An appeal to unnamed sources. The book's own rules ban unverifiable claims; "multiple comparisons" names none. Compounded by W8 — the claim is about a framework that has changed identity.

### U5. WebSocket scaling claim
`12-02-websockets-and-sse-2.md:10` — "WebSockets are powerful but very difficult to scale on the backend (maintaining thousands of open TCP connections requires specialized architecture like Redis Pub/Sub)."
Not checked against a source. Plausible but stated as fact, and "thousands" is a suspiciously low threshold to call specialised. Note also that Vercel now lists **WebSocket support in Public Beta** for Functions, which cuts against the framing; not fetched in detail.

### U6. Cloudflare storage line-up
`12-04-edge-runtimes-2-2-2-1.md:24-27` — "**KV** for read-heavy key-value data, **R2** for object storage, **D1** for SQLite, and **Durable Objects** for state that must be consistent in one place."
Not fetched. Almost certainly right, but it is a product list on a vendor that ships constantly, and the book's rule is to check vendor claims against vendor docs.

---

## Checked and CORRECT

Verified against live primary sources, no change needed — **34 claims**:

- **Cache Components / `use cache`** — `cacheComponents: true` is a **top-level** `next.config.ts` key, not under `experimental` (`13-03-…-2-1.md:6-10`); `use cache` works at file, component and function level (`:25`); the compiler derives the cache key from arguments so separate arguments get separate entries (`:23`); `cacheLife` and `cacheTag` both import from `next/cache` (`:32`); built-in profiles do run from `'seconds'` to `'max'` — the full set is `default, seconds, minutes, hours, days, weeks, max` (`:29`). Sources: https://nextjs.org/docs/app/api-reference/directives/use-cache , https://nextjs.org/docs/app/api-reference/functions/cacheLife
- **The caching timeline** — Next 15 and 16 both do not cache `fetch` by default: "By default, `fetch` requests are not cached." (`13-03-…-1.md:10-11`). Source: https://nextjs.org/docs/app/guides/caching-without-cache-components
- **PPR flag removal** — both `experimental.ppr` and `export const experimental_ppr` are removed in 16, and PPR "is the default behavior with Cache Components" (`13-03-…-2-2-1.md:71`). Sources: https://nextjs.org/blog/next-16 , https://nextjs.org/docs/app/getting-started/caching
- **`revalidateTag(tag, profile)`** — the second argument is in the signature and the single-argument form is deprecated; `'max'` is the recommended default; the `{ expire: 3600 }` object form is valid; all three of the book's example calls are verbatim-valid (`13-03-…-2-2-2-1.md:8-14`). Source: https://nextjs.org/docs/app/api-reference/functions/revalidateTag
- **`updateTag` and `refresh`** — both exist in `next/cache`, both are **Server Actions only**, `updateTag` gives read-your-writes in the same request, `refresh` touches uncached data only (`13-03-…-2-2-2-1.md:16-25`). Sources: https://nextjs.org/blog/next-16 , https://nextjs.org/docs/app/guides/server-actions
- **Async request APIs** — sync `params`, `searchParams`, `cookies()`, `headers()`, `draftMode()` are all removed in 16 (`13-01-…-2-2.md:3`, `13-03-…-2-2-2-2.md:3`), and the upgrade codemod is exactly `npx @next/codemod@canary upgrade latest` (`13-01-…-2-2.md:21`). Source: https://nextjs.org/blog/next-16
- **`proxy.ts`** — the rename is real, the exported function is `proxy`, migration is a rename with the body unchanged, `middleware.ts` "is still available for Edge runtime use cases, but it is deprecated and will be removed in a future version", and without a `matcher` it runs on every request including static assets and images (`13-05-…-1.md:5,17,32`, `13-05-…-2.md:3`, `12-04-…-2-2-1.md:5`). Sources: https://nextjs.org/blog/next-16 , https://nextjs.org/docs/app/api-reference/file-conventions/proxy
- **Server Actions security** — "the route is reachable to anyone who can send the same POST. Treat every action as an untrusted entry point", and the docs' own `deletePost` example is line-for-line the shape the book teaches, session check then permission check then delete (`13-04-…-2-2-2.md:3-12`). Source: https://nextjs.org/docs/app/guides/server-actions
- **Sequential dispatch** — "Next.js dispatches Server Actions one at a time per client", and the docs recommend "use a Route Handler for non-mutation requests" (`13-04-…-2-2-2.md:15`). Same source.
- **Turbopack** — default bundler for both `next dev` and `next build` in 16, opt out with `--webpack` (`13-06-…-1.md:11`). Source: https://nextjs.org/blog/next-16
- **Cloudflare / Astro** — the acquisition is real, announced **16 January 2026**, with a commitment to keep Astro open source (`12-04-…-2-2-2-1.md:29`, `13-06-…-1.md:29`). Sources: https://blog.cloudflare.com/astro-joins-cloudflare/ , https://www.cloudflare.com/press/press-releases/2026/cloudflare-acquires-astro-to-accelerate-the-future-of-high-performance-web-development/
- **Cloudflare 128 MB memory per isolate**, both plans (`12-04-…-2-1.md:9`). Source: https://developers.cloudflare.com/workers/platform/limits/
- **Vercel Edge runtime still exists** as a distinct runtime, so `12-04`'s premise is not stale even though the Next.js route export is (https://vercel.com/docs/functions/limitations).

---

# Pass 2 — CONSISTENCY

## Contradictions

### C1. The book breaks its own async-params rule
Already W1 above, but it is also the sharpest contradiction in the part: `13-01-…-2-2.md:3` says "`params` and `searchParams` **must** be awaited", `13-03-…-2-2-2-2.md:3` repeats "forgetting the `await` is the most common upgrade error" — and the sample sitting between them at `13-03-…-2-2-1.md:53` forgets the `await`. Fixing W1 fixes this.

### C2. `updateUser` is defined twice with incompatible signatures
- `13-04-server-actions-1.md:25` — `export async function updateUser(formData: FormData)`
- `13-04-server-actions-2-2-1.md:25` — `export async function updateUser(_prev: string | null, formData: FormData)`

Both are presented as living in the same file and imported the same way (`13-04-…-2-1.md:6` and `13-04-…-2-2-1.md:8` both do `import { updateUser } from '@/actions/userActions'`). The form at `13-04-…-2-1.md:11` passes it straight to `<form action={updateUser}>`, which only works with the first signature — with the second, `FormData` arrives as `_prev`. A reader working through the chapter linearly ends up with a broken form.
**Fix:** rename the second one (`updateUserWithState`), or state plainly that the signature changes when you adopt `useActionState`.

### C3. Two conflicting descriptions of what a "cached" component needs
`13-03-…-2-2-1.md:56-57` annotates `<Header />` and `<ProductDetails id={…} />` as `{/* cached, instant */}`, but neither carries a `'use cache'` directive. Under Cache Components an uncached async read outside `<Suspense>` is a validation error surfaced as the "blocking-route" insight, not a cache hit — which is exactly what `13-03-…-2-1.md:3` says ("Nothing is cached unless you say so"). The sample contradicts its own chapter's rule two pages earlier.
Source: https://nextjs.org/docs/app/getting-started/caching

### C4. Cache Components presented as the Next 16 default when it is opt-in
`13-03-caching-and-cache-components-1.md:11` — the timeline table row "| 16 | not cached, and caching is a directive rather than a fetch option |"
`13-03-…-2-1.md:3` — "Every piece of dynamic code in a page, layout, or route handler runs **at request time**. Nothing is cached unless you say so."

Two problems. (a) That behaviour requires `cacheComponents: true`; Next 16 ships a whole parallel guide, "Caching and Revalidating (Previous Model)", for apps that do not set it. The config appears *after* the claim, so the claim reads as the framework default. (b) "a directive rather than a fetch option" is wrong as an either/or — `fetch(url, { next: { tags: ['posts'] } })` and `{ next: { revalidate: 3600 } }` are both still documented and still work in 16; the `revalidateTag` reference itself shows the `next.tags` form as one of the two supported ways to tag data.
Sources: https://nextjs.org/docs/app/guides/caching-without-cache-components , https://nextjs.org/docs/app/api-reference/functions/revalidateTag
**Fix:** "caching is a directive **as well as** a fetch option, and the directive is the one to reach for" — and move the config snippet above the claim it enables.

### C5. The same wrong middleware/runtime claim appears in two modules
W2 above is in both `12-04-edge-runtimes-2-2-1.md:3-4` and `13-05-proxy-and-the-request-boundary-1.md:11`. Flagging so the fix pass does not correct one and leave the other. The two pages are in different modules and will likely be edited by different people.

## Repeats

### R1. "Which cache function to call" is taught twice, near-verbatim
- `13-03-…-2-2-2-1.md:27-34` — "### Choosing between them" table: `revalidateTag(tag,'max')` / `updateTag(tag)` / `refresh()` / `revalidatePath('/blog')`
- `13-04-…-2-2-1.md:36-40` — "### Which cache function to call at the end" list: the same three recommendations, plus `revalidatePath('/blog')`, same example path.

**Keep it in `13-03`**, where the three functions are actually introduced and explained. `13-04` should be one line pointing back, not a restatement — it currently teaches the reader the same table twice within two chapters.

### R2. The Cloudflare/Astro acquisition is stated twice, and the weaker version comes first
- `12-04-edge-runtimes-2-2-2-1.md:29` — "**Cloudflare acquired Astro** in January 2026, which makes the content-site and edge-runtime story a single first-party stack."
- `13-06-choosing-a-framework-1.md:29` — "**Cloudflare acquired the Astro team in January 2026** and committed to keeping it open source, which pairs the framework with an edge platform as a first-party stack."

Same fact, same month, near-identical closing clause. `13-06`'s wording is the accurate one — Cloudflare acquired **The Astro Technology Company**, and the open-source commitment is the part a reader deciding on a framework needs. `12-04`'s "acquired Astro" reads as acquiring the framework itself. **Keep `13-06`'s**, cut `12-04`'s to a cross-reference.

### R3. Edge personalization and Partial Prerendering are the same idea under two names
- `12-04-edge-runtimes-2-1.md:34-37` — "**Personalizing a cached page.** Serve one cached HTML document worldwide and inject the per-user parts at the edge. … That last one is the real prize: static-file speed with per-user content."
- `13-03-…-2-2-1.md:1-5` + diagram — "The static shell is prerendered and served from the edge instantly. The dynamic holes, wrapped in `<Suspense>`, stream in behind it."

Not a contradiction, and both earn their place, but `12-04` promises "the real prize" and never names it, while `13-03` delivers the mechanism without acknowledging it was promised. One sentence in `12-04` pointing at Module 13 would close the loop.

## Code-sample drift

Small, but a book that shows this many snippets should be consistent:

- **Missing `key` prop.** `12-02-websockets-and-sse-2.md:4` — `messages.map(m => <p>{m.text}</p>)`. React will warn in the console. In a React book, in the one line of rendering code on the page.
- **`updateTag` used without an import.** `13-04-…-2-2-1.md:29` calls `updateTag('current-user')`; the snippet's only import line is `'use server'`. Every other snippet in the part imports what it calls.
- **Four different fictional database shapes, two of them for the same entity.** `13-01-…-2-1.md:14` `db.getUser()`; `13-03-…-2-2-2-1.md:20` `db.users.update(...)`; `13-04-…-1.md:29` and `13-04-…-2-2-1.md:28` `db.user.update(...)`. `db.user` vs `db.users` differ across two pages of the same module.
- **`ProductPage` sample has no imports at all** (`13-03-…-2-2-1.md:52`) despite using `Suspense`. Every other tsx sample in the part shows its imports.

## Terminology note

`12-01-network-layer-2.md:11` — "It solves the N+1 request problem because you can ask for the user, their posts, and comments all in a single query."

"N+1" conventionally names a **server-side data-access** problem — one query for the list, then one per row — and GraphQL is well known for *causing* it in resolvers, which is why DataLoader exists. The book uses it for **client round-trips**, a different thing. Defensible if defined, but it is not defined here, and I can only see Part Five: **if any other part of the book uses "N+1" in the database sense, these two usages collide.** Flag for whoever holds the glossary.

---

## NOT CHECKED — declared gaps

Ran out of priority before these. None is asserted correct or incorrect:

1. Vercel **Edge runtime memory limit** — the functions-limits page gives memory only for Node/Bun/Python functions.
2. **Deno Deploy** limits — the brief named it, but no page in Part Five mentions Deno Deploy, so there was nothing to check.
3. **htmx bundle size** — the docs page states no gzipped figure; not pursued further (see U2).
4. **Astro `client:visible`** semantics (`12-03-…-2-1.md:4-6`) — not fetched against astro.build.
5. **TanStack Start**'s current status and its end-to-end type-safety claim (`13-06-…-1.md:22-26`).
6. **Qwik** resumability and "startup cost stays roughly constant" (`13-06-…-1.md:37-42`).
7. **Apollo Client** normalized-cache claims (`12-01-…-2.md:28-32`), including "industry standard".
8. **SSE's six-connections-per-domain limit** over HTTP/1.1 — the classic failure mode `12-02` does not mention; not verified, so not reported as an omission finding.
9. **`layout.tsx` does not re-render on navigation** (`13-02-…-1.md:6`) and the `template.tsx` contrast — not fetched.
10. **Server Actions progressive enhancement** "work even before JavaScript has finished loading" (`13-04-…-2-1.md:20`) — not fetched. Worth checking, because it holds for a form action passed from a Server Component and is narrower once `useActionState` is involved.
11. **`13-04-…-2-2-2.md:3` "Anyone can call it with any arguments"** — true in spirit, but the docs list framework protections the book does not mention (Origin/Host CSRF check, 1 MB body limit, **encrypted action IDs**, closure encryption). Not wrong; incomplete in a way that could read as alarmist. Left unreported as a finding, noted here.
