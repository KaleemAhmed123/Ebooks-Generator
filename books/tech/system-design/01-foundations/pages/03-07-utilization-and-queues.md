## Wait time explodes near full

- For a single server with random arrivals (M/M/1 queue), the ratio of waiting time to service time is:

```
wait / service  ≈  ρ / (1 − ρ)

ρ = utilization (fraction of capacity in use)
```

<svg viewBox="0 0 460 100" role="img" aria-label="Hockey-stick curve: wait time is negligible at 50% utilization, equals service time at 50%, is 10x at 90%, and 100x at 99%" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <line x1="50" y1="10" x2="50" y2="88" stroke="#e0e0e4"/>
  <line x1="50" y1="88" x2="440" y2="88" stroke="#1a1a1a"/>
  <text x="46" y="96" text-anchor="end" font-size="8" fill="#6b6b6b">0%</text>
  <text x="440" y="96" text-anchor="end" font-size="8" fill="#6b6b6b">100%</text>
  <text x="245" y="100" text-anchor="middle" font-size="8" fill="#6b6b6b">utilization →</text>
  <text x="46" y="14" text-anchor="end" font-size="8" fill="#6b6b6b">wait</text>
  <!-- hockey-stick curve -->
  <path d="M50 88 C200 86 350 82 400 60 C420 40 430 24 438 12" stroke="#1d4e89" fill="none" stroke-width="1.5"/>
  <!-- annotations -->
  <line x1="245" y1="88" x2="245" y2="84" stroke="#6b6b6b"/>
  <text x="245" y="80" text-anchor="middle" font-size="8" fill="#6b6b6b">50% → 1×</text>
  <line x1="400" y1="88" x2="400" y2="60" stroke="#6b6b6b" stroke-dasharray="2 2"/>
  <text x="400" y="56" text-anchor="middle" font-size="8" fill="#6b6b6b">90% → 10×</text>
  <text x="438" y="26" text-anchor="end" font-size="8" fill="#6b6b6b">99% → 100×</text>
</svg>

| Utilization | Wait as a multiple of service time |
|---|---|
| 50% | 1× |
| 80% | 4× |
| 90% | 10× |
| 95% | 20× |
| 99% | 100× |

- At 90% utilization, a 5 ms query becomes a 50 ms query to the user. At 99%, it becomes 500 ms. The system is not overloaded — it has 1% headroom

### The failure

- Capacity planned for the average. Average is 70% — looks fine. Peak hits 92%, latency jumps 12×, the SLO breaks, and the post-mortem says "we had headroom"
- Plan for the peak, not the average. Leave enough idle that the curve is still flat where your peak lands

:::interview
"How much headroom would you leave?" is a queuing question. Name the target utilization (typically 60–80%), then say what happens past it: the hockey stick.
:::
