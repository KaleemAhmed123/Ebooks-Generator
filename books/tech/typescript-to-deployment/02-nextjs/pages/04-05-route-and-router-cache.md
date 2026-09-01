## The Full Route Cache and the Router Cache

### Full Route Cache

- The rendered HTML of a route, stored on the server at build time
- A route is stored here only if it is **static**, meaning nothing in it read the request

- A route becomes dynamic the moment it touches any of these

```ts
await cookies()
await headers()
await searchParams
fetch(url, { cache: "no-store" })
export const dynamic = "force-dynamic"
```

- One `await cookies()` in a shared layout makes every page under it dynamic. This is the usual cause of "why is nothing cached"

### Router Cache

- Lives in the browser tab, in memory
- Holds pieces of routes you have already visited so back and forward feel instant
- Cleared by a full page reload, or by `router.refresh()`
- Not configurable in the way the server caches are

### Where a stale page usually comes from

- Data changed, tag invalidated, and the Full Route Cache still holds the old HTML
- Or the browser never asked, because its Router Cache answered
