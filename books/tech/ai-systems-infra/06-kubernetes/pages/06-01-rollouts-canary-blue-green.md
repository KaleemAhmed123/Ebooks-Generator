# Running It and Debugging

## Rollout strategies

- A Deployment's default **rolling update** (Module 2.2) is safe but blunt — it shifts all traffic to the new version as pods replace, and a bug that only shows under real traffic hits everyone before you can react. Three strategies trade cost and blast radius differently.
- **Rolling** — replace pods gradually, one batch at a time; old and new run together briefly. Cheap (no extra fleet), but every request may hit the new version immediately, and rollback means another full roll.
- **Blue-green** — run **two complete environments**; "blue" serves all traffic while "green" (the new version) is deployed and tested, then you **flip** traffic in one switch. Instant rollback (flip back), but you pay for **double capacity** during the cutover.
- **Canary** — send a **small slice** (1–5%) of live traffic to the new version, watch its error rate and latency (Booklet 8), then **ramp** (5 → 25 → 50 → 100%) if healthy or abort if not. Smallest blast radius; needs traffic-splitting and good metrics.

<svg viewBox="0 0 360 84" role="img" aria-label="Rolling replaces pods in place; blue-green flips all traffic from the old to a parallel new environment at once; canary shifts a small percentage to the new version then ramps up" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="12" width="108" height="62" rx="4" fill="#f3f7fc" stroke="#2a5db0"/><text x="62" y="25" text-anchor="middle" font-size="6.2" fill="#2a5db0">rolling</text><text x="62" y="42" text-anchor="middle" font-size="5.6">replace in place</text><text x="62" y="54" text-anchor="middle" font-size="5.6">batch by batch</text><text x="62" y="66" text-anchor="middle" font-size="5.2" fill="#777">cheap, blunt</text>
  <rect x="126" y="12" width="108" height="62" rx="4" fill="#eaf1fb" stroke="#2a5db0"/><text x="180" y="25" text-anchor="middle" font-size="6.2" fill="#2a5db0">blue-green</text><text x="180" y="42" text-anchor="middle" font-size="5.6">two full envs, flip</text><text x="180" y="54" text-anchor="middle" font-size="5.6">instant rollback</text><text x="180" y="66" text-anchor="middle" font-size="5.2" fill="#777">2× capacity</text>
  <rect x="244" y="12" width="108" height="62" rx="4" fill="#e7efe9" stroke="#2f7d4f"/><text x="298" y="25" text-anchor="middle" font-size="6.2" fill="#2f7d4f">canary</text><text x="298" y="42" text-anchor="middle" font-size="5.6">5% → 25% → 100%</text><text x="298" y="54" text-anchor="middle" font-size="5.6">watch metrics, abort</text><text x="298" y="66" text-anchor="middle" font-size="5.2" fill="#777">smallest blast radius</text>
</svg>

- **Gateway API makes canary and blue-green native** (Module 4.3): an HTTPRoute splits traffic across two Services by **weight** (`v1: 95, v2: 5`), so shifting the percentage *is* the rollout — no annotations, no second ingress. Flipping blue-green is setting the weight to `0/100`.
- **Progressive delivery** tools — **Argo Rollouts**, **Flagger** — automate the canary loop: they ramp the weight, query Prometheus for the new version's error/latency SLOs at each step, and **auto-rollback** if a metric breaches. The deploy becomes a metric-gated state machine rather than a human watching a dashboard.

:::note
The strategy should match the **cost of being wrong**. A stateless API with good metrics: canary. A change you can't easily partial-test, where you want an instant escape hatch and can afford double capacity: blue-green. A low-risk internal service: rolling is fine. **Database schema changes** break all of these — a new pod version and an old one often run *simultaneously* during any rollout, so migrations must be **backward-compatible** (expand-then-contract), independent of which strategy you pick.
:::
