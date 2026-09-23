## What it caches by default

- A CDN's defaults are deliberately timid, because the cost of caching the wrong thing is a data leak rather than a slow page. Cloudflare's rule is the representative one: cache by **file extension**, and do not cache HTML or JSON at all

| Response | Default edge lifetime |
|---|---|
| `200`, `206`, `301` | 120 minutes |
| `302`, `303` | 20 minutes |
| `404`, `410` | 3 minutes |
| everything else | not cached |

- Caching a `404` for three minutes is the detail worth noticing. It is negative caching (Module 8, page 14) applied at the edge, and it means a URL that was briefly broken stays broken at the edge for minutes after the fix
- The origin overrides all of this with `Cache-Control` (page 3), and that is the only reliable way to state intent. Four values stop Cloudflare caching outright: `private`, `no-store`, `no-cache` and `max-age=0`

### The failure

- Expecting an API response to be cached because it is a `GET`. A `/api/products/trending` endpoint that takes two seconds to build is not cached by default — the path has no static extension and the body is JSON — so every request reaches the origin and the CDN contributes nothing
- The mirror image is worse and comes from the same mechanism. A route that happens to end in something the extension list recognises gets cached whether or not anyone intended it: an endpoint serving a user's generated report at `/reports/2026-q3.pdf` matches on `.pdf`, and the default 120 minutes applies to a document that belongs to one person
- Neither case is visible from the application. Both are decided by a list the CDN maintains and the origin never sees, which is why the header has to be set explicitly rather than inferred from how the URL happens to be spelled
