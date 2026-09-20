## Fetch and parse

- **DNS:** DNS lookups are slow. The crawler must maintain a massive distributed DNS cache
- **Timeouts:** You are interacting with broken servers. You must enforce strict timeouts on connection and download times
- **Robots.txt:** Before fetching any page, you MUST fetch the host's `robots.txt`. 
  - According to RFC 9309, you should cache it for 24 hours
  - If the server returns a 5xx error for `robots.txt`, you must assume a full disallow and drop all URLs for that host
- **Link extraction:** Extract `href` tags. Convert relative paths (`/about`) into absolute paths (`https://example.com/about`)

### The failure

- Fetching `robots.txt` before every single page request. It will halve your crawler's throughput. The rules must be cached in memory.

:::interview
Your crawler requests `robots.txt` from a host, but the host's server crashes and returns an HTTP 500 Internal Server Error. What should your crawler do?

According to the RFC, a 5xx error on `robots.txt` must be treated as a complete disallow. You must drop all queued URLs for that host and wait for the server to recover.
:::\n