## Hedged and tied requests

- A **hedged request** is a second copy of the same request sent to another replica after the first has taken longer than expected, the p95 delay, with the first reply winning and the loser cancelled. It cuts the tail (Module 3, page 4) for a few percent more load, because only the slowest few percent of requests ever send a second copy. Dean and Barroso's BigTable measurement: hedging after 10 ms cut the 99.9th percentile from 1 800 ms to 74 ms for 2 % more requests

<svg viewBox="0 0 460 120" role="img" aria-label="Hedged request timeline. At 0 milliseconds the client sends the request to replica A. Replica A is slow. At 10 milliseconds, the 95th-percentile delay, the client sends the same request to replica B. Replica B replies at 18 milliseconds; the client returns the answer and sends a cancel to A. Replica A would have replied at 1 000 milliseconds; the user saw 18. Below, a tied request: the request is enqueued at A and B at once, each tagged with the other's identity; whichever dequeues it first sends a cancel to the other, delayed by about twice the network round trip so that both do not start together. An orange cross marks hedging a non-idempotent call, a charge sent twice, and hedging with no cancel, which doubles the work on the slow replica." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="6" y="12" font-size="7.5" fill="#1d4e89">hedged: send a second copy after the p95 delay, cancel the loser</text>
  <line x1="40" y1="30" x2="440" y2="30" stroke="#333" marker-end="url(#d)"/><text x="6" y="33" font-size="7">client</text>
  <text x="40" y="24" text-anchor="middle" font-size="7">0 ms → A</text><text x="120" y="24" text-anchor="middle" font-size="7">10 ms → B (p95)</text><text x="184" y="24" text-anchor="middle" font-size="7">18 ms: B replies</text><text x="420" y="24" text-anchor="middle" font-size="7">1 000 ms</text>
  <line x1="40" y1="34" x2="40" y2="50" stroke="#333"/><line x1="120" y1="34" x2="120" y2="66" stroke="#333"/><line x1="184" y1="66" x2="184" y2="34" stroke="#1d4e89" marker-end="url(#b)"/>
  <rect x="40" y="50" width="380" height="10" fill="#fbe9e2" stroke="#bf4c28"/><text x="230" y="58" text-anchor="middle" font-size="7" fill="#bf4c28">replica A: slow, would reply at 1 000 ms — cancelled at 18 ms</text>
  <rect x="120" y="66" width="64" height="10" fill="#e6f2ff" stroke="#1d4e89"/><text x="152" y="74" text-anchor="middle" font-size="7">replica B: 8 ms</text>
  <text x="200" y="74" font-size="7" fill="#1d4e89">answer at 18 ms; cancel → A</text>
  <text x="6" y="92" font-size="7">tied: enqueue at A and B at once, each tagged with the other; the first to start cancels the other; second send delayed ≈ 2 × RTT</text>
  <text x="6" y="104" font-size="7">Dean &amp; Barroso: hedge at the 95th percentile ≈ 5 % extra load; BigTable, hedge after 10 ms: p99.9 1 800 → 74 ms for 2 % more requests</text>
  <text x="6" y="116" font-size="7.5" fill="#bf4c28">✕ hedging POST /charge: two charges · hedging with no cancel: the slow replica finishes anyway, and the tail costs double the work</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker>
  </defs>
</svg>

- The delay is the whole trade: hedge at the p95 and about 5 % of requests are doubled; hedge at the p50 and half are. The cancel is what keeps the cost at that few percent, because without it the slow replica completes the abandoned copy and the tail costs twice the work instead of none
- **Tied requests** go further: enqueue at two replicas at once, each copy carrying the other's identity, and whichever starts first cancels the other, so the request runs on the replica that was free rather than the one that was slow. The paper delays the second enqueue by about twice the network round trip so both do not start at the same instant, and reports under 1 % extra disk utilisation
- Hedging is for reads and idempotent calls with a known latency distribution; it is a tail tool, not a capacity tool, and under overload it makes things worse, which is why it is the first thing shedding (page 5) turns off

### The failure

- Hedging a non-idempotent call, or hedging without cancel. `POST /charge` hedged is two charges, and a customer who was slow to be served is now served twice (booklet 01 owns the idempotency key that would make it safe). Hedging without cancel doubles the load exactly on the replicas that are struggling, and the tail it was meant to cut gets longer
