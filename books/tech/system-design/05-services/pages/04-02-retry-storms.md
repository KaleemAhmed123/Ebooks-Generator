## Retry amplification

- A retry is a second request. Three layers that each retry three times send up to 27 requests to the dependency at the bottom for one user request, exactly when it is already failing. Booklet 01 owns backoff and jitter; this page is the fleet-level control, a **retry budget**: retries as a fraction of traffic, not a count per request

<svg viewBox="0 0 460 126" role="img" aria-label="Layered retries multiplying. A user request enters the gateway, which retries up to 3 times against orders; orders retries up to 3 times against billing; billing retries up to 3 times against the database. When the database is slow, one user request becomes up to 27 database requests, drawn as a widening fan. Below, the same chain with retry budgets: Envoy's retry budget defaults, concurrent retries capped at 20 percent of active requests with a floor of 3, so at 1 000 active requests at most 200 are retries whatever the per-request policy says. An orange cross marks the storm: a brownout causes timeouts, timeouts cause retries, retries triple the load, the brownout becomes an outage, and the only way out is shedding at the edge." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="20" width="60" height="26" rx="3" fill="#fff" stroke="#1d4e89"/><text x="36" y="36" text-anchor="middle">gateway</text>
  <rect x="116" y="20" width="60" height="26" rx="3" fill="#fff" stroke="#1d4e89"/><text x="146" y="36" text-anchor="middle">orders</text>
  <rect x="226" y="20" width="60" height="26" rx="3" fill="#fff" stroke="#1d4e89"/><text x="256" y="36" text-anchor="middle">billing</text>
  <rect x="336" y="14" width="70" height="38" rx="3" fill="#fbe9e2" stroke="#bf4c28"/><text x="371" y="30" text-anchor="middle">database</text><text x="371" y="43" text-anchor="middle" font-size="7" fill="#bf4c28">slow today</text>
  <line x1="66" y1="33" x2="116" y2="33" stroke="#333" marker-end="url(#d)"/><text x="91" y="28" text-anchor="middle" font-size="7">×3</text>
  <line x1="176" y1="33" x2="226" y2="33" stroke="#333" marker-end="url(#d)"/><text x="201" y="28" text-anchor="middle" font-size="7">×3 → 9</text>
  <line x1="286" y1="33" x2="336" y2="33" stroke="#333" marker-end="url(#d)"/><text x="311" y="28" text-anchor="middle" font-size="7">×3 → 27</text>
  <text x="36" y="60" text-anchor="middle" font-size="7">1 user request</text><text x="371" y="64" text-anchor="middle" font-size="7" fill="#bf4c28">up to 27 DB requests</text>
  <rect x="6" y="76" width="448" height="24" rx="3" fill="#e6f2ff" stroke="#333"/><text x="230" y="86" text-anchor="middle" font-size="7">retry budget (Envoy defaults): concurrent retries ≤ 20 % of active + pending requests, floor 3</text><text x="230" y="96" text-anchor="middle" font-size="7">at 1 000 active requests, at most 200 are retries, whatever each request's policy says; the multiplier cannot compound</text>
  <text x="6" y="120" font-size="7.5" fill="#bf4c28">✕ the storm: brownout → timeouts → retries → 3× load → worse brownout → more retries; a blip becomes an outage only edge shedding ends</text>
  <defs><marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

- A budget is a ratio, so it caps the damage: a failing dependency exhausts it at once and further failures return immediately. Envoy's cluster retry budget defaults to 20 % of active requests with a floor of 3 concurrent retries; its `max_retries` defaults to 3. One layer retries, the others pass the failure up; where a mesh retries (Module 3, page 9), the app does not. Retry only a timeout or a 503 (page 10), only an idempotent call (booklet 01), with backoff and jitter; never a 4xx

:::interview
"The database slowed down for a minute and the whole site went down for an hour. Why?" — Retries. Every layer retried its timeouts, three layers at three each is up to 27× the load on a database that was already behind, so it fell further behind, more calls timed out, more retries followed, and the brownout became an outage that fed itself until the edge shed traffic. The fix: a retry budget per service, one layer retrying and the rest failing fast, backoff with jitter, and a breaker (page 3) for a dependency that is down.
:::

### The failure

- The retry that turns a brownout into an outage. Each layer's three retries were reasonable alone; multiplied, they are the load that keeps the dependency down. Retries help a dependency that is briefly failing and harm one that is overloaded, and the caller cannot tell which; hence the budget
