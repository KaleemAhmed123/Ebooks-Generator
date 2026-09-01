### Cloudflare Workers

The other major platform, and the one where the edge is the whole product rather
than a deployment mode.

```js
export default {
  async fetch(request, env, ctx) {
    const cache = caches.default;
    const hit = await cache.match(request);
    if (hit) return hit;

    const response = await fetch(request);
    ctx.waitUntil(cache.put(request, response.clone()));
    return response;
  },
};
```

`ctx.waitUntil` is worth noting: it lets work continue after the response has
been sent, which is how you log or write to a cache without making the user wait
for it.

Workers come with storage designed for the same model: **KV** for
read-heavy key-value data, **R2** for object storage, **D1** for SQLite, and
**Durable Objects** for state that must be consistent in one place, which is
what you use for a collaborative document or a chat room.

**Cloudflare acquired Astro** in January 2026, which makes the content-site and
edge-runtime story a single first-party stack.
