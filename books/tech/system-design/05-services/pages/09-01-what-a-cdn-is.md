# Module 9 - CDN and the edge

## What a CDN is

- A **CDN** is a shared cache at the network edge, keyed by the URL. Hundreds of points of presence hold copies; a request lands at the nearest one and only reaches the origin on a miss. It caches what the response headers permit and nothing else

<svg viewBox="0 0 460 110" role="img" aria-label="A CDN in front of an origin. A user in Tokyo reaches the Tokyo point of presence, one of several hundred, and a hit is answered locally in a few milliseconds. A miss travels on to the origin in New York, a 162 millisecond round trip measured between Azure's East US and Japan East regions at the 50th percentile. Cloudflare's default edge lifetimes are 120 minutes for 200, 206 and 301 responses, 20 minutes for 302 and 303, and 3 minutes for 404 and 410, while HTML and JSON are not cached at all by default. An orange cross marks the CDN caching a logged-in page, so one user's dashboard is served to the next, because the headers never said not to." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="4" y="14" font-size="7.5">a shared cache at the edge, keyed by URL — it stores what the headers allow</text>
  <rect x="4" y="40" width="70" height="24" rx="3" fill="#fff" stroke="#1d4e89"/><text x="39" y="55" text-anchor="middle" font-size="7.5">user in Tokyo</text>
  <rect x="120" y="40" width="96" height="24" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="168" y="51" text-anchor="middle" font-size="7.5">Tokyo PoP</text><text x="168" y="61" text-anchor="middle" font-size="6">one of several hundred</text>
  <rect x="340" y="40" width="110" height="24" rx="3" fill="#fff" stroke="#1d4e89"/><text x="395" y="55" text-anchor="middle" font-size="7.5">origin · New York</text>
  <line x1="74" y1="52" x2="118" y2="52" stroke="#1d4e89" marker-end="url(#b)"/><text x="96" y="48" text-anchor="middle" font-size="6">hit</text>
  <line x1="216" y1="52" x2="338" y2="52" stroke="#1d4e89" stroke-dasharray="3 2" marker-end="url(#b)"/>
  <text x="277" y="47" text-anchor="middle" font-size="6.5">miss → 162 ms round trip</text>
  <text x="277" y="61" text-anchor="middle" font-size="6" fill="#666">measured East US ↔ Japan East, P50</text>
  <rect x="4" y="74" width="446" height="16" rx="3" fill="#f3f3f3" stroke="#666"/>
  <text x="10" y="85" font-size="6.5">Cloudflare defaults: 200/206/301 → 120 min · 302/303 → 20 min · 404/410 → 3 min · HTML and JSON not cached at all</text>
  <text x="4" y="104" font-size="7.5" fill="#bf4c28">✕ the CDN caches a logged-in page: one user's dashboard served to the next, because the headers never said not to</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

- The distance is the point. Azure measures 162 ms of median round-trip time between its East US and Japan East regions — that is the floor on every uncached request a Tokyo user makes to a New York origin, before the application does any work at all
- The word that matters is **shared**. A browser cache holds one person's copy; a CDN holds one copy answering everybody. That is what makes it effective and what makes a mistake severe, because a wrongly cached response is served to strangers rather than to its owner

### The failure

- A personalised response cached as if it were public. The origin returns a logged-in dashboard with no `Cache-Control`, the CDN applies its default for that status and extension, and the next request for that URL — from a different person — is answered from the cache
- Nothing errors, and it is invisible in the origin's logs because the origin never sees the second request. The defence is that anything user-specific must say `private` or `no-store` explicitly (page 3), and the rule has to hold for every route, because one missing header is a cross-account data leak rather than a performance bug
