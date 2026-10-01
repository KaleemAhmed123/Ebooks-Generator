## How do you keep AI spend under control (FinOps for LLMs)?

- LLM cost is unusually **variable and usage-driven** — a single feature or a loop bug can 10× the bill overnight — so you instrument and govern it, not just review it monthly.
- Practices:
  - **Attribute cost** — tag every call with feature, user/tenant, model, and environment so you know *where* the money goes. You can't optimise what you can't attribute.
  - **Budgets + alerts** — per-feature/tenant spend caps and anomaly alerts; hard limits on runaway loops (max tokens/steps).
  - **Unit economics** — track **cost per request / per user / per resolved task**, and check it against the revenue/value per unit. A feature can be popular and unprofitable.
  - **Optimise the expensive endpoints** — apply routing, caching, token trimming, and batch APIs where the spend concentrates (usually a few endpoints).
  - **Right-size continuously** — revisit model choice and self-host-vs-API as volume grows.
- Interview framing: treat tokens like a metered utility — attribute, budget, and measure unit cost against value.

:::interview
What's really being tested: that you attribute cost per feature/tenant, set budgets/alerts, track unit economics against value, and optimise where spend concentrates — engineering cost, not just watching it.
:::
