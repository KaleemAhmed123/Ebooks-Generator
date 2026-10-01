## Reliability patterns

- Beyond retries and hedging, a small set of classic distributed-systems patterns keep an LLM service standing when a dependency degrades. They apply unchanged from web services, plus the LLM twist of an expensive, sometimes-slow, nondeterministic backend.

| Pattern | Does | LLM use |
|---|---|---|
| **circuit breaker** | stop calling a failing dependency | provider outage → fail fast to fallback |
| **bulkhead** | isolate resource pools | one tenant/feature can't drain all GPUs |
| **fallback chain** | degrade gracefully | frontier → cheaper model → cached → "try later" |
| **backpressure** | signal "slow down" upstream | 429 before the goodput knee (17-30) |
| **idempotency** | safe to retry | don't double-charge on a retried tool call |

- **Circuit breaker** is the key one for the two-provider policy (17-03). When a provider starts failing or timing out, the breaker "trips" — stop sending to it, fail fast to the fallback provider — and periodically probes to see if it recovered. Without it, every request wastes its full timeout on the dead provider before failing, turning one provider's outage into *your* latency spike.
- **Fallback chains** encode graceful degradation: if the frontier model is down or over budget, drop to a cheaper model; if that fails, serve a cached or templated answer; only then error. The user gets a *degraded* answer, not an error page — the LLM version of "the site still loads without recommendations."

:::interview
"Your primary model provider has an outage. What does your system do?"

It degrades, it doesn't fall over — because reliability patterns are wired in. A **circuit breaker** detects the failures and trips, failing *fast* to the second provider (the two-provider minimum, 17-03) instead of wasting every request's timeout on the dead one. A **fallback chain** covers deeper failure: frontier → cheaper/self-hosted model → cached answer → graceful "try again." **Bulkheads** ensure the incident doesn't let retries from one path starve the others, and **idempotency** makes the retries safe (no double-charged tool calls). The user sees a possibly-degraded but working service. Naming the circuit breaker + fallback chain + the two-provider failover is the resilience answer; "we'd get paged" is not.
:::
