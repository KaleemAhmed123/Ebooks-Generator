## Chaos engineering

- Your resilience patterns — timeouts, retries, circuit breakers, replicas, failover (Booklets 3, 5, 6) — are **untested hypotheses** until something actually fails. **Chaos engineering** tests them on purpose: inject a controlled failure in a controlled way and verify the system behaves as designed, so you learn its real failure modes on *your* schedule instead of at 3am.
- It's an **experiment**, not random breakage. The loop:

<svg viewBox="0 0 360 66" role="img" aria-label="Chaos loop: state a steady-state hypothesis, inject a fault with a limited blast radius, observe whether the SLO holds, then fix the gap or widen the experiment" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="6" y="22" width="78" height="24" rx="3" fill="#fbe9ee" stroke="#a63d57"/><text x="45" y="32" text-anchor="middle" font-size="5.8">hypothesis</text><text x="45" y="41" text-anchor="middle" font-size="4.8" fill="#777">"SLO holds if…"</text>
  <rect x="98" y="22" width="78" height="24" rx="3" fill="#f6dce3" stroke="#a63d57"/><text x="137" y="32" text-anchor="middle" font-size="5.8">inject fault</text><text x="137" y="41" text-anchor="middle" font-size="4.8" fill="#777">small blast radius</text>
  <rect x="190" y="22" width="78" height="24" rx="3" fill="#fbe9ee" stroke="#a63d57"/><text x="229" y="32" text-anchor="middle" font-size="5.8">observe SLO</text><text x="229" y="41" text-anchor="middle" font-size="4.8" fill="#777">held? / broke?</text>
  <rect x="282" y="22" width="72" height="24" rx="3" fill="#e7efe9" stroke="#2f7d4f"/><text x="318" y="32" text-anchor="middle" font-size="5.8">fix / widen</text>
  <path d="M84 34 L98 34" stroke="#1a1a1a" marker-end="url(#ch)"/><path d="M176 34 L190 34" stroke="#1a1a1a" marker-end="url(#ch)"/><path d="M268 34 L282 34" stroke="#1a1a1a" marker-end="url(#ch)"/>
  <defs><marker id="ch" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- **State a steady-state hypothesis** ("if one pod dies, the SLO holds"), **inject** the matching fault — kill a pod, add latency to a dependency, drop a percentage of packets, fail an AZ (tools: Chaos Mesh/LitmusChaos on Kubernetes, or AWS FIS) — then **observe** whether the SLO held. If it did, you've *earned* confidence; if it didn't, you found a real gap (a missing timeout, a retry storm, a single point of failure) **in daylight** with a rollback ready.
- The discipline is **blast-radius control**: start in staging, then a tiny slice of prod; always have an **abort/rollback**; run during business hours with the team watching (a planned **game day**), never unattended overnight. The famous example — Netflix's Chaos Monkey randomly killing instances — only works *because* the system was built to expect it; chaos comes **after** you've designed for failure, to verify it, not instead of designing.

### Module 4 — checkpoint
- **Key concepts:** **capacity** from **Little's Law** (`concurrency = rate × latency`) sizes pools/pods/connections; the **knee (~70–80%)** is where latency bends → run **left of it** with headroom for bursts + AZ loss (autoscaling has lag) · **load test** to find the real knee/breaking point; **k6 arrival-rate** executors avoid **coordinated omission**; ramp, prod-like, in CI · **chaos** = hypothesis → inject fault → verify SLO held, with **blast-radius control** and rollback; verifies resilience you already designed.
- **Task + questions:** load-test the app to its knee, then run a chaos experiment that kills one replica and confirm the SLO holds. Why keep standing headroom if you have autoscaling? Why is chaos pointless before you've designed for failure?
- **Next:** Module 5 — when it breaks (the incident method, tracing the request, RCA).
