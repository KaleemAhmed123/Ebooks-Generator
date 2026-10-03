# Keeping It Up

## Capacity planning

- Capacity planning answers "how much do we need, and how much headroom?" — and it's arithmetic, not guesswork, thanks to **Little's Law** (Booklet 3): in a stable system, **concurrency = arrival rate × latency** (`L = λ × W`). It sizes everything downstream.
- Worked: 1,000 req/s at 50 ms average means `1000 × 0.05 = 50` requests in flight — so you need ~50 concurrent workers/threads, and your DB connection pool and pod count must support 50 simultaneous handlers. Undersize any of them and requests **queue**, latency climbs, and Little's Law runs in reverse: higher `W` for the same `λ` means even more concurrency needed — a spiral.

<svg viewBox="0 0 360 82" role="img" aria-label="A latency-versus-utilisation curve stays flat until about seventy percent then rises sharply at the knee toward a vertical wall near one hundred percent; plan to operate left of the knee" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="24" y1="64" x2="340" y2="64" stroke="#999"/><line x1="24" y1="8" x2="24" y2="64" stroke="#999"/>
  <text x="180" y="78" text-anchor="middle" font-size="5.6" fill="#777">utilisation →</text>
  <text x="12" y="36" font-size="5.6" fill="#777" transform="rotate(-90 12 36)">latency →</text>
  <path d="M24 60 L180 56 Q250 52 280 30 Q295 16 300 10" fill="none" stroke="#a63d57" stroke-width="1.5"/>
  <line x1="250" y1="8" x2="250" y2="64" stroke="#2f7d4f" stroke-dasharray="3 2"/><text x="250" y="18" text-anchor="middle" font-size="5.6" fill="#2f7d4f">~70-80% = the knee</text>
  <text x="120" y="52" font-size="5.4" fill="#777">flat (safe)</text><text x="305" y="40" font-size="5.4" fill="#c0392b">cliff</text>
</svg>

- The **knee** is why you don't run hot. Queueing theory (and every real system) says latency stays flat as utilisation rises — until **~70–80%**, where it bends sharply and then goes near-vertical toward 100%. Past the knee, a tiny traffic increase causes a huge latency jump, because there's no spare capacity to absorb variance. **Target average utilisation comfortably left of the knee** so bursts have somewhere to go.
- So capacity = **peak** (not average) traffic, sized with Little's Law, kept **below the knee**, with headroom for failure (lose an AZ, Booklet 5, and the survivors must absorb the load). Autoscaling (Booklet 6's HPA/Karpenter) adds elasticity, but it has lag — scaling takes seconds-to-minutes — so you still need standing headroom to survive the spike *while* scaling catches up.

:::note
Capacity planning and SLOs meet here. The knee is roughly where your **latency SLO** (Module 3.1) breaks, so "stay left of the knee" and "stay within the latency SLO" are the same constraint seen two ways. Load testing (next page) finds *where* your knee actually is for this service on this hardware — you don't guess 70%, you measure it, then set autoscaling targets and headroom from the measurement.
:::
