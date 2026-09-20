## What it caches by default

- Because caching the wrong thing causes massive security breaches, CDNs are extremely conservative about what they cache by default
- By default (e.g., on Cloudflare), a CDN will **only** cache requests where the URL ends in a known static file extension (like `.jpg`, `.css`, `.js`, or `.pdf`). It will completely ignore your API endpoints (`/api/users`) and your HTML pages, passing them straight through to your origin

| Response Code | Default Cloudflare TTL |
|---|---|
| **200 OK** | 120 minutes |
| **301 Moved Permanently** | 120 minutes |
| **302 Found** | 20 minutes |
| **404 Not Found** | 3 minutes |

### The failure

- The failure is expecting an API response to be cached just because it is a GET request. If you build a heavy `/api/products/trending` endpoint that takes 2 seconds to generate, and you put a CDN in front of it, the CDN will not cache it by default because it doesn't end in `.json` or `.html`
- Your origin server will still receive 10,000 requests per second. To make a CDN cache an API response or an HTML page, your origin server must explicitly emit a `Cache-Control` header telling the CDN it is safe to do so
