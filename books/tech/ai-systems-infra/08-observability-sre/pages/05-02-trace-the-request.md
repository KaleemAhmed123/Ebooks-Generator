## Trace the request

- The core diagnostic skill is **bisecting the request path**: a user request crosses edge → service → service → datastore → queue, and your job is to name **which hop** owns the latency or the error. The four signals, used in order, collapse the search from "the whole system" to "this one span" in minutes.

<svg viewBox="0 0 360 76" role="img" aria-label="A request path from client through gateway, service A, service B to the database and a queue; the span on service B to database is highlighted as the slow hop the method localises" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="4" y="30" width="48" height="18" rx="2" fill="#fbe9ee" stroke="#a63d57"/><text x="28" y="42" text-anchor="middle" font-size="5.6">client</text>
  <rect x="62" y="30" width="48" height="18" rx="2" fill="#fbe9ee" stroke="#a63d57"/><text x="86" y="42" text-anchor="middle" font-size="5.6">gateway</text>
  <rect x="120" y="30" width="48" height="18" rx="2" fill="#fbe9ee" stroke="#a63d57"/><text x="144" y="42" text-anchor="middle" font-size="5.6">svc A</text>
  <rect x="178" y="30" width="48" height="18" rx="2" fill="#fbe9ee" stroke="#a63d57"/><text x="202" y="42" text-anchor="middle" font-size="5.6">svc B</text>
  <rect x="236" y="30" width="52" height="18" rx="2" fill="#fdecea" stroke="#c0392b"/><text x="262" y="42" text-anchor="middle" font-size="5.6" fill="#c0392b">database</text>
  <rect x="298" y="30" width="52" height="18" rx="2" fill="#fbe9ee" stroke="#a63d57"/><text x="324" y="42" text-anchor="middle" font-size="5.6">queue</text>
  <path d="M52 39 L62 39" stroke="#999" marker-end="url(#tr)"/><path d="M110 39 L120 39" stroke="#999" marker-end="url(#tr)"/><path d="M168 39 L178 39" stroke="#999" marker-end="url(#tr)"/><path d="M226 39 L236 39" stroke="#c0392b" stroke-width="1.6" marker-end="url(#tr)"/><path d="M288 39 L298 39" stroke="#999" marker-end="url(#tr)"/>
  <text x="240" y="64" text-anchor="middle" font-size="5.4" fill="#c0392b">the B→DB span is the long bar → start here</text>
  <defs><marker id="tr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- The order: **metric** (which SLO/service is red?) → **trace** (open a slow exemplar trace; the **longest span** names the hop — the B→DB call above) → **logs** (that span's logs show the error/slow query) → **profile** (if the hop is CPU-bound, which function). For a single external request, **`curl -w`** (Booklet 2) splits it into DNS/connect/TLS/TTFB/transfer — the same bisection at the network layer. Then **USE** the suspect resource: is the DB saturated, the pool exhausted, the disk slow?

:::incident
**"Checkout p99 jumped from 200 ms to 4 s at 14:05; error rate is normal."** Normal errors rule out crashes — it's pure latency. Pull the deploy log: nothing at 14:05, but a **marketing email** went out then (traffic shift, not a change). Open a slow trace: the `checkout → inventory → DB` span is 3.8 s; the DB's **USE** shows connection-pool **saturation** at 100% and rising wait time, while CPU is modest. So the pool, sized for normal load (Module 4.1's Little's Law), can't absorb the spike — requests queue for a connection, and that queue *is* the 4 s (Booklet 3's tail). **Mitigate:** scale the app/raise the pool and add a cache for the hot query; **fix:** autoscale on queue depth and load-test the new email-spike profile (Module 4.2). The network was never the problem — the method found the real hop in three clicks.
:::
