## Design an internal LLM gateway (proxy) for a company.

- **Why:** many teams calling many providers directly is chaos — no cost control, no central safety, duplicated code, no observability. A **gateway** is one control plane every LLM call passes through.
- **Responsibilities:**
  - **Routing** — pick provider/model by policy (cost, capability, region); **fallback** on outage/429; load-balance.
  - **Auth & quotas** — per-team API keys, **budgets/rate limits**, so one team can't blow the bill.
  - **Caching** — prompt/semantic/exact caches shared across callers.
  - **Guardrails** — central input/output filtering, PII redaction, injection checks.
  - **Observability** — trace/log every call (tokens, cost, latency), attribute by team — the single source of cost truth.
  - **Abstraction** — one unified API so teams swap models without code changes.
- **Design:** a stateless horizontally-scaled service in front of providers/self-hosted engines, with a config/policy store, a cache (Redis + vector), and a metrics/trace pipeline. Must be **low-overhead** (it's in the hot path) and **highly available** (its outage = everyone's outage) — so keep it thin and fail-open/closed deliberately per policy.
- **Tradeoffs:** centralisation gives control/observability but adds a hop and a critical dependency; keep the gateway logic minimal.

:::interview
What's really being tested: that you see the gateway as centralised routing/quota/guardrail/observability/caching, and weigh its benefit against being a latency hop and a single critical dependency.
:::
