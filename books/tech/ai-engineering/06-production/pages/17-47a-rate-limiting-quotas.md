## Rate limiting and quotas

- Rate limiting protects the system and the budget from any single caller — a buggy client in a retry loop, a scraper, or a viral spike. For LLMs the twist is that the meaningful unit is **tokens**, not requests: one request can be 200 tokens or 100k, so a request-per-second limit alone is useless.

| Limit on | Catches | Where |
|---|---|---|
| **requests/min (RPM)** | request floods | gateway, per key |
| **tokens/min (TPM)** | the real cost/load | gateway, per key |
| **concurrent requests** | one tenant hogging slots | gateway |
| **spend/day ($)** | budget blowout | FinOps guard (17-55) |

- **TPM is the load-bearing limit** because tokens map to GPU-seconds and dollars. Providers rate-limit on both RPM and TPM for exactly this reason, and your gateway should too — a caller under the RPM limit can still melt the budget with giant prompts.
- **The algorithm is a token bucket** (the classic one, not LLM tokens): each key has a bucket that refills at its rate and drains per unit consumed; empty bucket → `429 Too Many Requests` with a `Retry-After`. Return the limit and remaining budget in response headers so well-behaved clients back off on their own.

:::warn
Rate limits and *retries* form a feedback loop that can amplify an incident. A client that retries aggressively on a `429` turns one rejection into a storm, and naive retries during a provider slowdown pile load onto an already-struggling backend — the "retry storm" that turns a blip into an outage. Always pair limits with **exponential backoff + jitter** on the client, and cap total retries. Backpressure only works if the caller actually backs off.
:::
