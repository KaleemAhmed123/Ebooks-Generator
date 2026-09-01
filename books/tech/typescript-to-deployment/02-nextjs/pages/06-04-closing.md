## The seven things worth remembering

### 1. Route handlers are dynamic by default now

- That changed in version 15. Add `revalidate` or `use cache` if you want caching

### 2. Everything request-shaped is async

- `params`, `searchParams`, `cookies()`, `headers()`, `draftMode()`. Await all of them

### 3. A Server Action is a public endpoint

- Authenticate, validate, authorize on the row. Every time. Being imported once protects nothing

### 4. There are four caches

- Request memoization, Data Cache, Full Route Cache, Router Cache
- A stale page usually means you cleared the wrong one

### 5. `proxy.ts` is not a security boundary

- It runs on every matched request and only sees a cookie. Check permissions where the data is

### 6. Connection pooling is the production surprise

- Many instances, many pools. Use a pooler, or `connection_limit=1`, or an HTTP driver

### 7. Know where the framework stops

- Long jobs, cron, WebSockets and public APIs belong outside it

### Next booklet

- **Node.js Core.** The event loop, streams and backpressure, worker threads, graceful shutdown, plus a JavaScript foundations module

<p class="verified">Verified against next 16.3.3, react 19.2.8, node 24 LTS, on 2026-08-30</p>
