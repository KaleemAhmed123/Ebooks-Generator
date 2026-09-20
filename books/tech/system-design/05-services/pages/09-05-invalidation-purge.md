## Purging and cache keys

- If a file is cached in the CDN with a 1-year TTL, and you discover a typo in the file, you cannot wait a year for the cache to naturally expire. You must manually clear the cache. This is called a Purge (or Invalidation)
- Most CDNs allow you to purge by exact URL (`/styles/app.css`) or by Tag (purging all files tagged `category:shoes`). Purging is slow. It takes time for the central CDN control plane to broadcast the purge command to all 300+ PoPs worldwide

| Invalidation Strategy | How it works | When to use it |
|---|---|---|
| **Versioned URLs (Never Purge)** | You name the file `app.v2.css`. When you deploy, you upload `app.v3.css` and update your HTML to point to the new URL. The old file is simply abandoned. | **Best practice for all static assets.** No purging required. |
| **Purge by URL** | You tell the CDN API: "Delete exactly `/api/products/123`." | When a database record changes. |
| **Purge by Tag** | You tell the CDN: "Delete everything tagged `tenant_456`." | When a user deletes their account. |

### The failure

- The failure is the Purge Storm on deploy. If you deploy a new version of your frontend, and you issue a command to the CDN to "Purge Everything", you instantly wipe out 100% of the CDN's cache
- The very next second, tens of thousands of users worldwide will request your HTML, JS, and CSS files. Every single one of those requests will miss the CDN and hit your origin server simultaneously, crushing it. You should never "Purge All" in production. Use Versioned URLs instead, so the new files are fetched gradually as users request the new HTML
