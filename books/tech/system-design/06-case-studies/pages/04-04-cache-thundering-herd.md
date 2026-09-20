## The thundering herd

- When a highly popular item (a "hot key") expires in the cache, thousands of concurrent requests will all experience a cache miss simultaneously. They will all query the database for the same row at the exact same millisecond. This is a **thundering herd**, and it will instantly crash the database
- To prevent this, the cache client must implement **request coalescing** (also called cache stampede protection or leases)
- When a client misses the cache, it requests a lease (a short-lived lock) from the cache node. If it gets the lease, it queries the database and updates the cache. If it does not get the lease, it knows another client is already querying the database, so it simply waits and polls the cache again

<svg viewBox="0 0 600 200" role="img" aria-label="Thundering herd vs request coalescing." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="12">
  <!-- Left Side: Thundering Herd -->
  <text x="150" y="20" text-anchor="middle" font-weight="bold" fill="#9f1239">Without Coalescing (Thundering Herd)</text>
  
  <rect x="50" y="40" width="60" height="20" fill="#e2fcf3" stroke="#10b981"/>
  <rect x="50" y="70" width="60" height="20" fill="#e2fcf3" stroke="#10b981"/>
  <rect x="50" y="100" width="60" height="20" fill="#e2fcf3" stroke="#10b981"/>
  <rect x="50" y="130" width="60" height="20" fill="#e2fcf3" stroke="#10b981"/>
  
  <rect x="200" y="70" width="60" height="50" fill="#fef3c7" stroke="#f59e0b"/>
  <text x="230" y="95" text-anchor="middle" font-size="10">Database</text>
  <text x="230" y="110" text-anchor="middle" font-size="10" fill="#9f1239">Crash</text>
  
  <path d="M 115 50 L 195 75" stroke="#f43f5e" fill="none" marker-end="url(#arrow-red)"/>
  <path d="M 115 80 L 195 85" stroke="#f43f5e" fill="none" marker-end="url(#arrow-red)"/>
  <path d="M 115 110 L 195 95" stroke="#f43f5e" fill="none" marker-end="url(#arrow-red)"/>
  <path d="M 115 140 L 195 105" stroke="#f43f5e" fill="none" marker-end="url(#arrow-red)"/>
  
  <!-- Right Side: With Coalescing -->
  <text x="450" y="20" text-anchor="middle" font-weight="bold" fill="#065f46">With Request Coalescing</text>
  
  <rect x="350" y="40" width="60" height="20" fill="#e2fcf3" stroke="#10b981"/>
  <rect x="350" y="70" width="60" height="20" fill="#e2fcf3" stroke="#10b981"/>
  <rect x="350" y="100" width="60" height="20" fill="#e2fcf3" stroke="#10b981"/>
  <rect x="350" y="130" width="60" height="20" fill="#e2fcf3" stroke="#10b981"/>
  
  <rect x="500" y="70" width="60" height="50" fill="#fef3c7" stroke="#f59e0b"/>
  <text x="530" y="100" text-anchor="middle" font-size="10">Database</text>
  
  <path d="M 415 50 L 495 75" stroke="#10b981" fill="none" marker-end="url(#arrow-green)"/>
  <text x="455" y="55" text-anchor="middle" font-size="10" fill="#065f46">1 Query</text>
  
  <path d="M 415 80 L 430 80" stroke="#6366f1" stroke-dasharray="2" fill="none"/>
  <path d="M 415 110 L 430 110" stroke="#6366f1" stroke-dasharray="2" fill="none"/>
  <path d="M 415 140 L 430 140" stroke="#6366f1" stroke-dasharray="2" fill="none"/>
  <text x="460" y="120" text-anchor="middle" font-size="10" fill="#3730a3">3 Wait on cache</text>

  <defs>
    <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e"/></marker>
    <marker id="arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981"/></marker>
  </defs>
</svg>

### The failure

- The failure mode is building a high-traffic cache without protecting the backend from expiration spikes. Setting a cache TTL is easy; surviving the exact moment the TTL expires is hard
- If you rely purely on TTLs, the thundering herd is guaranteed. The system will appear stable until the exact second a viral post's cache entry expires, at which point the database will melt

:::interview
**The expiration test**
If an interviewer asks, "what happens when a viral post expires in the cache?", the only acceptable answer is "request coalescing" or "cache leases."
:::
