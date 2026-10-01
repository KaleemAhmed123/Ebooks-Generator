## What changes when you serve an LLM app across regions, and with data-residency rules?

- Two drivers: **latency** (serve users from a nearby region) and **data residency / sovereignty** (some data must be processed/stored in a specific jurisdiction, e.g. EU data in the EU).
- What it affects:
  - **GPU placement** — you need serving capacity in each required region; GPU availability and price vary by region, complicating capacity planning.
  - **Data stores** — vector indexes, logs, and caches that hold user data must live in-region; you can't freely replicate PII across borders.
  - **Provider choice** — the managed provider must offer in-region (or zero-retention) deployment to meet the rule.
  - **KV-cache / routing locality** — pin a conversation's requests to the region holding its state to reuse cache and respect residency.
  - **Compliance** — logging and retention policies differ by jurisdiction.
- Design: route by user geography + residency policy, keep regional data planes isolated, and replicate only what's legally allowed (often just non-personal config/models).

:::interview
What's really being tested: that multi-region is about latency *and* legal data residency — driving per-region GPU capacity, in-region data stores, provider selection, and residency-aware routing.
:::
