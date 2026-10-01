## Your LLM provider has an outage. How do you keep the product up?

- A single managed provider is a **single point of failure** — and you don't control its uptime. Design for its absence.
- Resilience patterns:
  - **Multi-provider fallback** — on error/timeout/429, retry on a second provider (or a self-hosted model). Keep a prompt/output abstraction so you can swap models without rewriting.
  - **Timeouts + retries with backoff** — fail fast and retry transient errors; don't hang the user.
  - **Circuit breaker** — stop hammering a failing provider; route around it until it recovers.
  - **Graceful degradation** — serve a cached answer, a smaller/self-hosted model, or a reduced feature rather than a hard error.
  - **Queue non-urgent work** to retry when the provider returns.
- Caveats: fallback models differ in quality/format/prompt behaviour, so test prompts across providers; and an **AI gateway** centralises this (routing, fallback, retries, budgets) so every call benefits.

:::interview
What's really being tested: that you treat the provider as unreliable and build multi-provider fallback + timeouts/circuit breakers + graceful degradation (often via a gateway), with prompt-portability caveats.
:::
