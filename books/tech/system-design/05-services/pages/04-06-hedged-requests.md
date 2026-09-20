## Hedged and tied requests

- If you know that 99% of requests complete in 10ms, but the 99th percentile takes 1000ms, you can use hedging to cut the tail
- Instead of waiting the full 1000ms for the slow server, you wait 15ms (just past the 95th percentile). If it hasn't replied, you fire a *second* identical request to a different server. Whichever replies first wins, and you cancel the other

<svg viewBox="0 0 460 140" role="img" aria-label="Hedged request timeline. Req 1 takes 1000ms. After 15ms, Req 2 is fired and finishes in 10ms. Total time 25ms." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M50 40 L400 40" stroke="#cccccc" stroke-width="1"/>
  <path d="M50 80 L400 80" stroke="#cccccc" stroke-width="1"/>
  
  <rect x="50" y="30" width="300" height="20" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="200" y="44" text-anchor="middle">Req 1 (Slow server - 1000ms)</text>
  
  <path d="M70 30 L70 80" stroke="#1a1a1a" stroke-dasharray="2"/>
  <text x="70" y="25" text-anchor="middle" font-size="7">Wait 15ms</text>
  
  <rect x="70" y="70" width="40" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="90" y="84" text-anchor="middle">Req 2</text>
  
  <path d="M110 80 L110 40" stroke="#cc0000" stroke-width="2"/>
  <path d="M110 40 l-3 5 h6 z" fill="#cc0000"/>
  <text x="140" y="65" text-anchor="middle" fill="#cc0000" font-weight="bold">Cancel Req 1</text>
  
  <text x="200" y="110" text-anchor="middle" font-weight="bold">User wait time: 25ms (instead of 1000ms)</text>
</svg>

- Google demonstrated this in BigTable: by hedging requests after 10ms, they cut the 99.9th percentile latency from 1,800ms to 74ms, while only sending 2% more requests. It is cheap because the hedge is only fired for the extreme tail
- **Tied requests** are an optimization: you enqueue the request on two servers simultaneously. When one server begins executing it, it sends a cancellation to the other

### The failure

- Hedging is only safe for **idempotent** reads. If you hedge a `POST /charge-card` request, you will double-charge the user
- The other failure is hedging without cancellation. If you do not cancel the losing request, the slow server eventually processes it anyway, wasting database capacity on dead work
