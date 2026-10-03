## MTTR/MTTD and alert design

- Reliability isn't only *how often* you break; it's *how fast you recover*. Two numbers track that: **MTTD** (Mean Time To Detect — breakage → someone/something notices) and **MTTR** (Mean Time To Recover — notice → service restored). An outage's user impact ≈ MTTD + MTTR, and **both are reducible with observability**: good signals cut detection, good runbooks (Module 5) cut recovery.
- The highest-leverage move is usually **MTTD**: if customers tell you before your monitoring does, no amount of fast fixing saves the incident. Tight SLO burn-rate alerts (Module 3.2) detect in minutes what a dashboard nobody's watching detects in hours.

<svg viewBox="0 0 360 70" role="img" aria-label="Incident timeline: fault begins, MTTD is the gap until detection, MTTR is the gap from detection to recovery; shrinking both shrinks user impact" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="20" y1="40" x2="340" y2="40" stroke="#999"/>
  <circle cx="40" cy="40" r="3" fill="#c0392b"/><text x="40" y="32" text-anchor="middle" font-size="5.4">fault</text>
  <circle cx="150" cy="40" r="3" fill="#b8860b"/><text x="150" y="32" text-anchor="middle" font-size="5.4">detected</text>
  <circle cx="300" cy="40" r="3" fill="#2f7d4f"/><text x="300" y="32" text-anchor="middle" font-size="5.4">recovered</text>
  <path d="M40 52 L150 52" stroke="#a63d57"/><text x="95" y="62" text-anchor="middle" font-size="5.4" fill="#a63d57">MTTD (detect)</text>
  <path d="M150 52 L300 52" stroke="#a63d57"/><text x="225" y="62" text-anchor="middle" font-size="5.4" fill="#a63d57">MTTR (recover)</text>
</svg>

- **Alert on symptoms, not causes.** Page on what **users feel** — SLO burn, elevated error rate, latency past threshold — not on every internal cause (CPU at 80%, a pod restart, disk 70%). High CPU with happy users is *not an incident*; it's a capacity note. Cause-based alerts produce a flood of pages for conditions that may be fine, while a genuine user-facing outage with normal CPU slips through.
- Every page must be **actionable and urgent** — a human must do something *now*, with a runbook attached. Everything else is a ticket or a dashboard, not a 3am page.

:::warn
**Alert fatigue is a reliability risk, not an annoyance.** A team paged 40 times a night for non-actionable noise learns to **ignore the pager** — and misses the one real page in the flood (the "cry wolf" failure). The fix is ruthless: delete alerts nobody acts on, convert cause-alerts to symptom-alerts, add burn-rate windows so blips self-silence, and treat a noisy alert as a bug. Fewer, better pages catch more real incidents than many noisy ones.
:::

