## Send a second copy after the p95

- **Hedged requests**: send the request to one server; if no reply arrives by the p95 latency, send a second copy to another server. Use whichever replies first. Cancel the other
- Google benchmarked this on 1,000 keys across 100 BigTable servers, hedging after 10 ms: p99.9 dropped from **1,800 ms to 74 ms** with only **2% extra requests**

<svg viewBox="0 0 460 76" role="img" aria-label="Two timelines: the primary request is slow; a hedged copy sent after 10 ms returns faster; the slow primary is cancelled" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <text x="8" y="18" font-size="8.5" fill="#6b6b6b">primary</text>
  <line x1="70" y1="14" x2="380" y2="14" stroke="#6b6b6b" stroke-dasharray="3 2"/>
  <text x="385" y="18" font-size="8" fill="#6b6b6b">slow…</text>
  <text x="8" y="42" font-size="8.5" fill="#6b6b6b">hedge</text>
  <rect x="120" y="32" width="100" height="14" rx="2" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="170" y="43" text-anchor="middle" font-size="8">reply</text>
  <path d="M120 26 L120 32" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="120" y="60" text-anchor="middle" font-size="8" fill="#6b6b6b">t = p95</text>
  <path d="M220 39 L250 39" stroke="#1d4e89"/><path d="M250 39 l-7 -4 v8 z" fill="#1d4e89"/>
  <text x="260" y="43" font-size="8" fill="#1d4e89">use this</text>
  <path d="M222 14 L240 14" stroke="#b8541a"/><text x="246" y="18" font-size="8" fill="#b8541a">cancel</text>
</svg>

- **Tied requests**: send to two servers immediately; the first to start processing cancels the other after 1 ms. Google measured: median latency −16%, p99.9 nearly −40%, disk overhead under 1%

### The rule

- Hedging works only for **idempotent, read-only** requests. A hedged POST that mutates state will run twice
- The cost is small — 2% extra load — because most requests come back before the hedge fires. The p95 threshold means only the slow 5% trigger a second copy

### The failure

- Hedging a write that creates a payment. Both copies arrive. Two charges. The defence is idempotency (Module 11 of this booklet), not hedging
