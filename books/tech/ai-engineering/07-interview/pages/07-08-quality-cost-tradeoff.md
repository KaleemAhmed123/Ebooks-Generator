## "Describe a tradeoff you made between model quality and cost/latency."

- **What they're screening for:** that you make deliberate, measured engineering tradeoffs tied to requirements, not reflexively reach for the biggest model.
- **A strong answer shows:**
  - **The constraint** — the latency or cost ceiling the product needed, and the quality bar it had to clear.
  - **The options you weighed** — e.g. frontier model (best quality, too slow/expensive) vs smaller/quantized vs routing.
  - **The decision and *why*** — e.g. "routed 80% of easy traffic to a small model, escalated the hard 20% to the frontier one; held quality within 2% at 60% lower cost."
  - **How you validated it** — evals proving quality stayed acceptable, and monitoring the escalation/quality after launch.
- The point is a *measured* choice justified by the requirement, with a number on both sides of the trade.

:::warn
Weak: "I used GPT-4 because it's the best." Strong: a cascade/quantization/caching decision with the quality-vs-cost numbers and the eval that confirmed the quality held.
:::

:::interview
What's really being tested: deliberate tradeoff-making — matching model/approach to a cost/latency constraint and proving quality held, rather than defaulting to the largest model.
:::
