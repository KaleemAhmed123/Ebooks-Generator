## Logs, metrics, and traces

- You cannot attach a debugger to a distributed system in production. You must infer the internal state of the system purely from its external outputs. This is Observability
- Observability is built on three pillars: logs, metrics, and traces. They answer different questions and have different costs

| Signal | Question it answers | Cost |
|---|---|---|
| **Metrics** | "Is the system broken right now?" (How many, how fast) | Cheap (highly aggregated numbers) |
| **Traces** | "Where did the time go in this request?" (Across services) | Medium (samples of request paths) |
| **Logs** | "Exactly what happened during this specific error?" | Expensive (high volume text) |

### The failure

- The failure is using the wrong signal for the job. Developers often use logs to count things: `logger.info("User logged in")`. To find the login rate, the monitoring system has to parse millions of text lines per second
- Logs are too expensive to be used as metrics. A metric simply increments a number in memory (`logins++`). You log to debug a specific failure; you emit metrics to measure system health
