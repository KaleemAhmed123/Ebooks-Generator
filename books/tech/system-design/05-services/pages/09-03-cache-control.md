## Cache-Control for shared caches

- `Cache-Control` is how the origin states intent, and it overrides every CDN default. RFC 9111 gives shared caches a strict order for deciding freshness: `s-maxage`, then `max-age`, then `Expires`, and only if none are present, a heuristic

| Directive | What it actually means |
|---|---|
| `public` / `private` | may a *shared* cache store it — `private` means browser only |
| `max-age=60` | fresh for 60 s in any cache |
| `s-maxage=3600` | fresh for 3 600 s in a shared cache; outranks `max-age` there |
| `no-cache` | store it, but revalidate with the origin before every reuse |
| `no-store` | do not write it down at all |

- With no freshness directive at all a cache may invent one from `Last-Modified` — RFC 9111 names 10 % of the elapsed time as typical — so a file modified a year ago becomes cacheable for weeks by a rule nobody wrote

:::interview
"What's the difference between `no-cache` and `no-store`?" — `no-store` means keep no copy anywhere. `no-cache` permits storage and forbids *reuse without checking*, so the cache holds the bytes and revalidates first. That makes `no-cache` a performance choice — a `304` saves resending the body — and `no-store` the confidentiality one. Using `no-cache` to mean "don't cache this" leaves the sensitive response on disk, which is what it was meant to prevent.
:::

### The failure

- `no-cache` on a banking response, believed to prevent storage. The body is written to the browser's disk cache and to any shared cache in the path, readable by anyone with access to that machine, while the directive adds only a revalidation round trip
