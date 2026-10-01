## At what point does self-hosting beat paying per token?

- Reduce both options to **cost per request at your real utilisation**, then compare:
  - **Per-token API:** cost = tokens × price. No idle cost, but a markup baked in.
  - **Self-host:** cost = GPU-hour rate ÷ requests served per hour. Cheap per request **only if the GPU stays busy**; at low utilisation you pay for idle silicon.

:::mint
```text
self-host cost/req = (GPU $/hour) / (requests/hour at your utilisation)

e.g. H100 @ ~$2.5/hr, serving ~5 req/s (18,000/hr):
  ≈ $0.00014 / request  — only if genuinely ~sustained
At 10% utilisation, effective cost is ~10× → self-host loses.
```
:::

- The crossover: self-hosting wins once **sustained utilisation** is high enough (often tens of percent). Below that, per-token APIs win because you don't pay for idle.
- Other costs to include: ops/engineering time, reliability/redundancy (you need headroom, so you can't run at 100%), and the opportunity cost of not using a better managed model.
- Answer shape: "plot cost vs utilisation; it's a crossover curve, and the break-even depends on how busy you can keep the hardware" — never a flat "self-host is cheaper."

:::interview
What's really being tested: that you model cost/request at real utilisation (including idle and ops), and express the answer as a utilisation-dependent crossover, not a slogan.
:::
