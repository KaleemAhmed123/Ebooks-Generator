## Little's Law and why p99 explodes

- **Little's Law** is the one formula to carry everywhere: **L = λ × W** — the average number of requests *in the system* (L) equals the arrival rate (λ) times the average time each spends in the system (W). It needs no assumptions about distributions, and it sizes things instantly: at 2,000 req/s averaging 50 ms each, you have `2000 × 0.05 = 100` requests in flight on average — so a connection/thread pool (Booklet 2) below ~100 will queue. It's how you turn a latency target and a rate into a capacity number.
- The second, scarier fact is why **p99 blows up long before utilisation hits 100%**. Queueing theory says waiting time scales with **ρ/(1−ρ)**, where ρ is utilisation. That denominator is a cliff:

<svg viewBox="0 0 360 92" role="img" aria-label="Latency stays flat as utilisation rises, then shoots up vertically as utilisation approaches 100 percent — a hockey-stick curve" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="30" y1="78" x2="340" y2="78" stroke="#999"/><line x1="30" y1="78" x2="30" y2="10" stroke="#999"/>
  <text x="185" y="90" text-anchor="middle" font-size="6">utilisation ρ →</text>
  <text x="14" y="44" text-anchor="middle" font-size="6" transform="rotate(-90 14 44)">latency</text>
  <path d="M30 74 C150 72, 250 66, 300 50 C325 40, 335 20, 338 12" fill="none" stroke="#c0392b" stroke-width="1.6"/>
  <line x1="300" y1="78" x2="300" y2="12" stroke="#bbb" stroke-dasharray="3 3"/><text x="300" y="88" text-anchor="middle" font-size="5.6">~80%</text>
  <text x="250" y="30" font-size="5.6" fill="#c0392b">ρ/(1−ρ): small Δρ → huge Δlatency</text>
</svg>

- At 50% utilisation, waiting is small; at 90% it's ~9× the service time; at 99% it's ~99×. So a service humming at 80% is one traffic bump away from a latency explosion — the **knee** of the hockey stick. This is why you **run with headroom** (target ~60–70% utilisation), why load shedding (previous page) must trigger **before** the knee, and why "we have spare CPU on average" is no comfort — the tail is set by the peaks.
- **Tail-at-scale** makes it worse under fan-out. A request that calls **100** services and waits for the slowest will hit *someone's* p99 almost every time: if each service's p99 is 10 ms, the probability all 100 stay under it is `0.99¹⁰⁰ ≈ 37%` — so **~63% of these requests** exceed 10 ms. The tail of the parts becomes the median of the whole. Mitigations: fewer dependencies per request, **hedged requests** (send a duplicate to a second replica after a short delay, take the first reply), and keeping each service's tail tight.

:::note
**Coordinated omission** (Booklet 1) will hide all of this. A load generator that waits for each response before sending the next **stops sending during a stall**, so it never measures the requests that would have arrived *during* the slow period — and reports a p99 far rosier than reality. Use a tool that sends at a fixed rate (open-model) and records intended-vs-actual send time, or your "p99 = 20 ms" is fiction.
:::
