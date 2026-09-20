## Watching your dependencies

- A microservice is only as healthy as the things it depends on. Measuring your own internal latency is not enough. You must explicitly monitor the health of every external API and database you call
- For every dependency, you should track:
  1. The call latency (p50, p95, p99)
  2. The error rate (split by HTTP 4xx vs 5xx)
  3. The number of timeouts
  4. The state of the circuit breaker (Closed/Open)

| Metric | What it tells you |
|---|---|
| **High latency, low errors** | The dependency is struggling but surviving. Check your bulkheads |
| **High timeouts, low 500s** | The dependency is deadlocked or dropping traffic at the load balancer |
| **Circuit breaker OPEN** | The dependency is dead; you are currently saving it from a retry storm |

### The failure

- The failure mode is looking at your own service's dashboard and seeing 100% success rate, while your users are complaining that the app is broken
- If your service gracefully degrades when the Recommendation API is down, your service's SLI might look perfect (returning 200 OK with default data). If you do not have a dedicated dashboard showing the health of the Recommendation API from *your* perspective, you are flying blind
