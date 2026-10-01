## What is goodput, and why track it instead of raw throughput?

- **Throughput** counts all tokens/sec the system produces. **Goodput** counts only tokens from requests that **met their latency SLO** — useful work, not wasted work.
- Why the distinction matters: you can inflate raw throughput by cramming huge batches, but that pushes many requests past their TTFT/TPOT targets. Those responses are technically produced but **violate the SLO** — they're junk from the user's view.
- Goodput captures the real objective: **maximise served requests that are actually fast enough.** Optimising raw throughput alone can make the product worse while the dashboard looks better.
- Practically: set SLO targets (e.g. TTFT < 500 ms, TPOT < 50 ms), then tune batch size / scheduling to maximise goodput — the point where you serve the most requests *within* budget, not the most tokens regardless of latency.

:::interview
What's really being tested: that goodput = SLO-meeting throughput, and that optimising raw throughput can silently violate latency targets — a senior serving insight.
:::
