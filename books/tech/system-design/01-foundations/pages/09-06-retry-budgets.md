## Retry budgets

- Backoff and jitter slow down the retries, but they do not bound the total volume. If a service goes completely down, clients with 3 retries will multiply the traffic by 300%
- A **retry budget** caps the ratio of retries to normal traffic across the whole client instance

| Framework | Implementation |
|---|---|
| **Google SRE** | Max 3 attempts, but only retry if retries are < 10% of total requests |
| **AWS SDK** | Token bucket (500 tokens). Transient retry costs 14; throttling costs 5; success adds 1 |
| **gRPC** | `maxTokens` and `tokenRatio` configuration |

- If the budget is exhausted, the client fails the request immediately without retrying, even if it is attempt 1. This bounds the total retry load on the dependency

### The failure

- A major system outage occurs. The clients do exponential backoff, but there are so many failing requests that the total retry volume still overwhelms the network layer. The 300% load multiplier is too much for the recovering dependency
- With a 10% retry budget, the clients shed the excess load. The dependency only ever sees 110% of normal traffic, which it can survive
