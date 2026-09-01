### What you give up

| Node | Edge |
|---|---|
| The full standard library | Web APIs only: `fetch`, `Request`, `Response`, `URL`, `crypto` |
| `fs`, `net`, `child_process` | none of them |
| Native modules, `sharp`, `bcrypt` | none |
| Long-running requests | typically 10 to 30 seconds |
| Hundreds of megabytes of memory | around 128MB |
| Any TCP connection | HTTP, and increasingly raw TCP on some platforms |
| Bundle size barely matters | usually a few megabytes, compressed |

The consequences that bite in practice:

- **A traditional database driver does not work**, because it opens a TCP
  connection and holds a pool. The answers are an HTTP-based database proxy, or
  a driver written for the edge.
- **`bcrypt` does not work.** Use Web Crypto.
- **No file system.** Read from object storage over HTTP.

### What it is genuinely good at

The pattern is: **decide something quickly, using only the request, before the
real work starts.**

- **Auth redirects.** Read the session cookie, bounce to `/login` if it is
  missing. The user in Sydney gets the redirect from Sydney.
- **Localization and geo routing.** The request carries the country. Rewrite
  before the origin sees it.
- **A/B bucketing.** Assign a bucket, set a cookie, rewrite to a variant. Zero
  client-side flicker because the decision happened before the HTML existed.
- **Bot filtering and rate limiting.** Reject before it costs you an origin
  request.
- **Personalizing a cached page.** Serve one cached HTML document worldwide and
  inject the per-user parts at the edge.

That last one is the real prize: static-file speed with per-user content.
