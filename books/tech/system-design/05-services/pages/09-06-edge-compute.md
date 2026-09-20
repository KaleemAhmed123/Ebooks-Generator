## Edge compute

- A CDN is no longer just a dumb cache. Modern CDNs (like Cloudflare Workers or AWS Lambda@Edge) allow you to run your own JavaScript or WebAssembly code directly on the PoP server, right next to the user
- This is Edge Compute. It allows you to run logic in 5ms, rather than forcing the user to wait 150ms for a round trip to your origin server in New York

<svg viewBox="0 0 460 140" role="img" aria-label="Edge compute. Auth check runs in Tokyo PoP. If fail, 5ms response. If pass, 150ms to Origin." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="55" width="60" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="50" y="73" text-anchor="middle">User (Tokyo)</text>
  
  <rect x="140" y="55" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="180" y="73" text-anchor="middle">Tokyo PoP</text>
  
  <rect x="280" y="55" width="100" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="330" y="73" text-anchor="middle">Origin Server (NY)</text>
  
  <path d="M80 65 L140 65" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <path d="M135 62 l5 3 l-5 3 z" fill="#1a1a1a"/>
  <text x="110" y="55" text-anchor="middle" font-size="7">Request</text>
  
  <path d="M220 65 L280 65" stroke="#1a1a1a" fill="none" stroke-dasharray="2"/>
  <path d="M275 62 l5 3 l-5 3 z" fill="#1a1a1a"/>
  <text x="250" y="55" text-anchor="middle" font-size="7">Origin Fetch (150ms)</text>
  
  <path d="M180 85 L180 110 L80 110" stroke="#b8541a" fill="none" stroke-width="2"/>
  <path d="M85 107 l-5 3 l5 3 z" fill="#b8541a"/>
  <text x="180" y="125" text-anchor="middle" font-size="7" fill="#b8541a">Auth Failed: Return 401 (5ms)</text>
</svg>

- Edge Compute is perfect for:
  - **A/B Testing:** Inspect the user's cookies at the edge, and rewrite the URL to `/landing-page-a` or `/landing-page-b` before fetching from the cache
  - **Authentication:** Verify a JWT signature at the edge. If it is invalid, return a 401 immediately without ever bothering your origin
  - **Geo-routing:** Read the user's country from the CDN headers, and route them to a specific origin server that complies with local data residency laws

### The failure

- The failure is using edge compute to query a single-region database. If you deploy an Edge Worker to 300 PoPs worldwide, but that worker has to execute a `SELECT` query against a single Postgres database in New York to do its job, you have accomplished nothing
- The Tokyo worker still has to wait 150ms for the database in New York to answer. Edge compute is only fast if the data it needs is also at the edge (via a global key-value store, or stateless logic like JWT validation)
