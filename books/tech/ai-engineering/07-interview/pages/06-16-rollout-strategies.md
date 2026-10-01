## How do you safely roll out a new model or prompt version?

- Model/prompt changes are **behaviour** changes with no compile-time guarantees — a "better" model can regress your specific tasks. Roll out progressively and measure.
- Stages:
  - **Offline eval** — run the new version against your golden set first; don't ship on a vendor benchmark.
  - **Shadow / mirror** — send real traffic to the new version **in parallel**, serve the old version's response, and compare outputs/metrics with zero user risk.
  - **Canary** — route a small % of live traffic (e.g. 5%) to the new version; watch quality, latency, cost, error/guardrail rates.
  - **Progressive rollout** — ramp 5% → 25% → 100% while metrics hold; **auto-rollback** on regression.
  - **A/B test** when you want a statistically sound quality/engagement comparison.
- Keep the old version **warm and one flag away** for instant rollback. Version prompts and model IDs so every response is traceable to a config.

:::interview
What's really being tested: that you treat model/prompt changes as risky behaviour changes — offline eval → shadow → canary → progressive with auto-rollback — not a straight swap.
:::
