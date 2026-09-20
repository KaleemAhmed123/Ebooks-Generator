## Every hop is a floor

- A request rarely talks to one thing. It talks to a balancer, then a service, then a cache, then a database, then a blob store. Each hop has a latency floor

| Operation | Typical latency |
|---|---|
| Proxy hop | ~50 µs |
| Redis / Memcached query | ~500 µs |
| Blob GET (S3-class) | ~80 ms |
| Blob PUT | ~200 ms |
| Blob LIST | ~100 ms |

- Twenty sequential 500 µs calls: **10 ms**. The same twenty in parallel: **~500 µs** plus the slowest, which is the next page

<svg viewBox="0 0 460 78" role="img" aria-label="Serial: twenty 500-microsecond calls stacked end-to-end take 10 ms. Parallel: all twenty fire at once and finish in roughly 500 microseconds plus tail variance" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <text x="8" y="18" font-size="8.5" fill="#6b6b6b">serial</text>
  <g fill="#e2fcf3" stroke="#1d4e89">
    <rect x="54" y="8" width="18" height="14" rx="2"/><rect x="72" y="8" width="18" height="14" rx="2"/><rect x="90" y="8" width="18" height="14" rx="2"/><rect x="108" y="8" width="18" height="14" rx="2"/><rect x="126" y="8" width="18" height="14" rx="2"/>
    <rect x="144" y="8" width="18" height="14" rx="2"/><rect x="162" y="8" width="18" height="14" rx="2"/><rect x="180" y="8" width="18" height="14" rx="2"/><rect x="198" y="8" width="18" height="14" rx="2"/><rect x="216" y="8" width="18" height="14" rx="2"/>
    <rect x="234" y="8" width="18" height="14" rx="2"/><rect x="252" y="8" width="18" height="14" rx="2"/><rect x="270" y="8" width="18" height="14" rx="2"/><rect x="288" y="8" width="18" height="14" rx="2"/><rect x="306" y="8" width="18" height="14" rx="2"/>
    <rect x="324" y="8" width="18" height="14" rx="2"/><rect x="342" y="8" width="18" height="14" rx="2"/><rect x="360" y="8" width="18" height="14" rx="2"/><rect x="378" y="8" width="18" height="14" rx="2"/><rect x="396" y="8" width="18" height="14" rx="2"/>
  </g>
  <text x="424" y="18" font-size="8.5" fill="#6b6b6b">10 ms</text>

  <text x="8" y="52" font-size="8.5" fill="#6b6b6b">parallel</text>
  <g fill="#e2fcf3" stroke="#1d4e89">
    <rect x="54" y="34" width="18" height="14" rx="2"/><rect x="54" y="50" width="18" height="14" rx="2"/><rect x="54" y="34" width="18" height="14" rx="2"/>
  </g>
  <text x="54" y="76" font-size="8" fill="#6b6b6b">all 20</text>
  <text x="82" y="52" font-size="8.5" fill="#6b6b6b">~0.5 ms + tail</text>
</svg>

### The failure

- A request handler that does five `await` calls in sequence: auth, profile, permissions, balance, audit log. Each is 1 ms. Total: 5 ms of mandatory serial latency on a path that could run in 1 ms if the calls were parallel
- `Promise.all` is the fix when the calls are independent. But not every call is independent — auth must come before permissions. Map the dependencies first, then parallelise the rest
