## Serving stale on purpose

- When an entry expires, the next request pays for the refill — the stampede of Module 8, page 7, moved to the edge. RFC 5861 adds two directives that let a cache answer from an expired copy instead of making somebody wait

```http
Cache-Control: s-maxage=60, stale-while-revalidate=300, stale-if-error=86400
```

<svg viewBox="0 0 460 88" role="img" aria-label="A stale-while-revalidate timeline. For the first sixty seconds the cached entry is fresh and served directly. From sixty to three hundred and sixty seconds it is inside the stale-while-revalidate window: the stale copy is served immediately and the refresh happens behind that request, so the user never waits. After three hundred and sixty seconds the window has closed and the next request must wait for the origin. An orange cross marks using this on a stock count: the page keeps claiming five are left for up to five more minutes, and the checkout then fails." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="4" y="14" font-size="7">s-maxage=60, stale-while-revalidate=300</text>
  <rect x="40" y="28" width="60" height="16" rx="2" fill="#e6f2ff" stroke="#1d4e89"/><text x="70" y="39" text-anchor="middle" font-size="6.5">fresh</text>
  <rect x="100" y="28" width="300" height="16" rx="2" fill="#f3f3f3" stroke="#666"/><text x="250" y="39" text-anchor="middle" font-size="6.5">stale served at once, refreshed behind that request</text>
  <rect x="400" y="28" width="40" height="16" rx="2" fill="#fbe9e2" stroke="#bf4c28"/><text x="420" y="39" text-anchor="middle" font-size="6.5" fill="#bf4c28">wait</text>
  <line x1="40" y1="48" x2="440" y2="48" stroke="#333"/>
  <text x="40" y="58" text-anchor="middle" font-size="6">0</text>
  <text x="100" y="58" text-anchor="middle" font-size="6">60 s</text>
  <text x="400" y="58" text-anchor="middle" font-size="6">360 s</text>
  <text x="4" y="72" font-size="7">nobody waits inside the window — the refresh rides on a request that was already answered from the stale copy</text>
  <text x="4" y="85" font-size="7.5" fill="#bf4c28">✕ on a stock count: the page keeps saying 5 left for another 5 minutes, and the checkout is where it fails</text>
</svg>

- `stale-if-error` is the one that changes an incident. With `stale-if-error=86400` the edge keeps answering from its expired copy for a day when the origin returns `5xx` or cannot be reached, so an origin outage becomes invisible for everything already cached
- Both directives are RFC 5861, which is **Informational** rather than a standard, and support is not universal — Cloudflare and Fastly honour them, some intermediaries ignore them. They degrade to ordinary expiry when unsupported, which is why they are safe to send

### The failure

- Serving stale where staleness is the product. Inventory counts, prices, permissions, anything a user will act on: the stale answer is not a slightly old page, it is a promise the system cannot keep. The checkout rejects the order the listing invited
- The tell is the same one from Module 8, page 5 — if the gap between the write and the next read would be an incident, the window must be zero. `stale-while-revalidate` is for content where being a few minutes behind costs nothing: articles, descriptions, marketing pages, the shell of an application
