## Chains compound latency and failure

- When Service A calls Service B, which calls Service C, which calls Service D, you have created a synchronous chain. The physics of this chain are brutal
- **Latencies add.** If each hop takes 50ms, the total request takes 150ms. If Service C hits a 2-second garbage collection pause, the entire chain waits 2 seconds
- **Availabilities multiply.** If every service is highly available (99.9% uptime), the math works against you

| Chain Length | Uptime per service | Total Availability (A × B × C...) | Resulting SLA |
|---|---|---|---|
| 1 service | 99.9% | `0.999` | 99.9% (8h 45m downtime/year) |
| 2 services | 99.9% | `0.999 × 0.999` | 99.8% |
| 5 services | 99.9% | `0.999^5` | 99.5% (43h downtime/year) |
| 10 services | 99.9% | `0.999^10` | 99.0% (3 days downtime/year) |

### The failure

- The failure is ignoring the math and building a deep call graph. A chain of 5 services, each performing excellently at 99.9%, results in a system that is down for almost two full days a year
- This is why you must avoid deep synchronous chains. You break the chain by using asynchronous events, background jobs, or materialized read models (duplicating the data so Service A does not need to call Service B at all)
