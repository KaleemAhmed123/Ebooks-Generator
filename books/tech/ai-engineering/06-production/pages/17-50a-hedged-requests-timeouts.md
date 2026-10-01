## Hedged requests and timeouts

- The tail (17-31a) has two blunt but powerful mitigations that every reliable LLM client needs: **timeouts** (give up on a straggler) and **hedging** (race a backup so one slow instance doesn't decide your latency).
- **Timeouts** bound the worst case. Set a deadline per call; when it passes, cancel and fall back — a cached answer, a smaller/faster model, or a graceful "try again." Without a timeout, one hung backend or one pathological generation holds a request (and its resources) indefinitely.

<svg viewBox="0 0 360 78" role="img" aria-label="Hedging: send the request, and if no response by the hedge delay, send a second copy and take whichever returns first" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <line x1="30" y1="24" x2="330" y2="24" stroke="#888"/><text x="20" y="27" font-size="5.5">A</text>
  <rect x="40" y="19" width="180" height="10" fill="#a03050"/><text x="130" y="27" text-anchor="middle" font-size="5" fill="#fff">slow instance…</text>
  <line x1="30" y1="52" x2="330" y2="52" stroke="#888"/><text x="20" y="55" font-size="5.5">B</text>
  <rect x="120" y="47" width="70" height="10" fill="#1a3a2a"/><text x="155" y="55" text-anchor="middle" font-size="5" fill="#fff">hedge ✓ first</text>
  <line x1="120" y1="14" x2="120" y2="62" stroke="#24405e" stroke-dasharray="2 2"/><text x="120" y="12" text-anchor="middle" font-size="5" fill="#24405e">hedge delay (P95)</text>
  <defs></defs>
</svg>

- **Hedging races a duplicate.** Send the request; if no response by a *hedge delay* (typically around the P95 latency), send a *second* copy to another instance and take whichever finishes first, cancelling the loser. The slow instance no longer sets your latency — the fast of two does, which sharply cuts the P99.
- **The cost is extra load**, so hedge carefully: only after the P95 delay (so most requests never hedge), cap the hedge rate (a few percent), and **cancel the loser** to reclaim GPU (17-60a). Hedging every request doubles load; hedging only the slow tail is nearly free and kills the P99.

:::warn
Hedging plus retries can amplify an incident into a storm (17-47a). If a backend is slow *because it's overloaded*, hedging sends it *more* requests — precisely what it can't handle — and a naive retry-on-timeout piles on further. Guard both with: hedge only after a delay and only a small fraction, cap retries with exponential backoff + jitter, and combine with a **circuit breaker** (next page) that stops sending to a failing backend entirely. Tail mitigations must *shed* load under stress, not add it, or they turn a slowdown into an outage.
:::
