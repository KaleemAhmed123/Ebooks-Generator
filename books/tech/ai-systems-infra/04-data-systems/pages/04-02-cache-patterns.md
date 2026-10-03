## Cache patterns

- A cache trades **staleness for speed**: keep a fast copy of data whose source of truth lives elsewhere (a database, an API). The patterns differ in **who writes the cache and when**, and the choice decides your consistency and failure behaviour.
- **Cache-aside (lazy loading)** — the default. The application checks the cache; on a **miss** it loads from the database, puts the value in the cache (with a TTL), and returns it. Simple, and the cache only ever holds data someone actually asked for. Downsides: the **first** request for each key is slow (the miss), and the cache can serve stale data until the TTL expires or you invalidate it.

<svg viewBox="0 0 360 80" role="img" aria-label="Cache-aside: the app reads the cache; on a hit it returns; on a miss it reads the database, populates the cache, then returns" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="30" width="60" height="20" rx="3" fill="#ece4f3" stroke="#6a4c93"/><text x="40" y="43" text-anchor="middle" font-size="6">app</text>
  <rect x="140" y="30" width="60" height="20" rx="3" fill="#f1ecf6" stroke="#6a4c93"/><text x="170" y="43" text-anchor="middle" font-size="6">cache</text>
  <rect x="280" y="30" width="70" height="20" rx="3" fill="#f7f4fa" stroke="#6a4c93"/><text x="315" y="43" text-anchor="middle" font-size="6">database</text>
  <path d="M70 37 L140 37" stroke="#1a1a1a" marker-end="url(#ca)"/><text x="105" y="33" text-anchor="middle" font-size="5">1. get</text>
  <path d="M140 46 L70 46" stroke="#2f7d4f" marker-end="url(#ca)"/><text x="105" y="56" text-anchor="middle" font-size="5" fill="#2f7d4f">hit → return</text>
  <path d="M200 40 L280 40" stroke="#1a1a1a" marker-end="url(#ca)"/><text x="240" y="36" text-anchor="middle" font-size="5">2. miss → load</text>
  <path d="M280 48 L200 48" stroke="#999" marker-end="url(#ca)"/><text x="240" y="58" text-anchor="middle" font-size="5" fill="#777">3. populate + TTL</text>
  <defs><marker id="ca" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- The write-side patterns:
  - **Write-through** — write to cache **and** database together, so the cache is always fresh. Reads never miss on hot data; writes pay both latencies.
  - **Write-back (write-behind)** — write the cache now, flush to the database asynchronously. Fastest writes, but a cache crash **loses** unflushed data — only for data you can afford to lose or reconstruct.
  - **Read-through** — the cache library itself loads from the DB on a miss (cache-aside hidden behind the cache client).
- Two settings govern a cache's health regardless of pattern: a **TTL** (bounds how stale any entry can get) and an **eviction policy** when `maxmemory` is hit — typically **LRU** or **LFU** (evict least-recently/least-frequently used). Set `maxmemory` and a policy explicitly; a cache with no eviction policy that fills up starts **rejecting writes** or evicting unpredictably.
