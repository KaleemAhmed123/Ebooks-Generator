## Bulkhead

- A **bulkhead** is a wall between compartments: a ship with them floods one section and floats. In a service it is a separate pool per dependency, threads, connections, queue slots, so that a dependency that stops answering can exhaust its own pool and no other. The pool size is the most of the caller that dependency may ever hold

<svg viewBox="0 0 460 126" role="img" aria-label="Bulkheads. A service with 100 worker slots calls three dependencies: billing, catalog and a slow recommendations service. Left, one shared pool: recommendations takes 10 seconds per call, its calls occupy slot after slot, and within a minute all 100 slots are waiting on it; requests that need only billing or catalog queue behind them and time out; the caller is down. Right, partitioned pools: recommendations gets 20 slots, billing 40, catalog 40; recommendations fills its 20 and further calls to it fail fast, while billing and catalog calls proceed in their own pools. An orange cross marks the shared pool." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="6" y="12" font-size="7.5" fill="#bf4c28">✕ one shared pool of 100</text>
  <rect x="6" y="18" width="200" height="40" rx="3" fill="#fbe9e2" stroke="#bf4c28"/>
  <g fill="#bf4c28" stroke="#bf4c28"><rect x="12" y="24" width="8" height="8"/><rect x="24" y="24" width="8" height="8"/><rect x="36" y="24" width="8" height="8"/><rect x="48" y="24" width="8" height="8"/><rect x="60" y="24" width="8" height="8"/><rect x="72" y="24" width="8" height="8"/><rect x="84" y="24" width="8" height="8"/><rect x="96" y="24" width="8" height="8"/><rect x="108" y="24" width="8" height="8"/><rect x="120" y="24" width="8" height="8"/><rect x="132" y="24" width="8" height="8"/><rect x="144" y="24" width="8" height="8"/><rect x="156" y="24" width="8" height="8"/><rect x="168" y="24" width="8" height="8"/><rect x="180" y="24" width="8" height="8"/></g>
  <text x="106" y="50" text-anchor="middle" font-size="7" fill="#bf4c28">all 100 slots waiting on recommendations (10 s each)</text>
  <text x="106" y="72" text-anchor="middle" font-size="7">a request needing only billing queues behind them and times out;</text><text x="106" y="82" text-anchor="middle" font-size="7">one slow dependency has taken the whole caller down</text>
  <text x="254" y="12" font-size="7.5" fill="#1d4e89">partitioned pools</text>
  <rect x="254" y="18" width="60" height="40" rx="3" fill="#fbe9e2" stroke="#bf4c28"/><text x="284" y="32" text-anchor="middle" font-size="7">recs: 20</text><text x="284" y="43" text-anchor="middle" font-size="7" fill="#bf4c28">full; fail fast</text><text x="284" y="53" text-anchor="middle" font-size="7">20 lost, no more</text>
  <rect x="324" y="18" width="60" height="40" rx="3" fill="#fff" stroke="#1d4e89"/><text x="354" y="32" text-anchor="middle" font-size="7">billing: 40</text><text x="354" y="43" text-anchor="middle" font-size="7">3 in use</text><text x="354" y="53" text-anchor="middle" font-size="7">unaffected</text>
  <rect x="394" y="18" width="60" height="40" rx="3" fill="#fff" stroke="#1d4e89"/><text x="424" y="32" text-anchor="middle" font-size="7">catalog: 40</text><text x="424" y="43" text-anchor="middle" font-size="7">5 in use</text><text x="424" y="53" text-anchor="middle" font-size="7">unaffected</text>
  <text x="354" y="72" text-anchor="middle" font-size="7">the recommendations panel degrades (page 7);</text><text x="354" y="82" text-anchor="middle" font-size="7">checkout, which needs billing, works</text>
  <text x="6" y="104" font-size="7">the pool size is a design number: 20 slots × 10 s = 2 calls/s of recommendations at worst, and that is the most of the caller it can ever hold</text>
  <text x="6" y="118" font-size="7">the breaker (page 3) stops calling a dependency that fails; the bulkhead bounds one that is merely slow, which no breaker sees until its window fills</text>
</svg>

- Pools are bounded by what the caller can afford to lose, not by what the dependency needs: 20 slots for a dependency whose absence is a hidden panel, 40 for one whose absence is a failed checkout. A pool that is full fails fast, and that failure is a fallback decision (pages 7 and 8), taken with the rest of the caller still serving
- Bulkheads apply at every level where something waits: HTTP connection pools per upstream, worker threads per queue, database connections per tenant, a separate deployment for the endpoint that is expensive. The mesh (Module 3, page 9) and proxies (Module 7) expose the connection-level ones as configuration

### The failure

- One slow downstream exhausts the HTTP connection pool for everyone. Nothing errored; recommendations simply took ten seconds, each call held a connection, and within a minute every connection was waiting on it. Billing was healthy and unreachable, because the caller had no slots left to reach it with. Slowness spreads through shared pools; the bulkhead is the wall it cannot cross
