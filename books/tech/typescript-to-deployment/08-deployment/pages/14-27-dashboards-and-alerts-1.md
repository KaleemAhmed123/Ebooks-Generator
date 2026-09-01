## Dashboards and alerts worth having

### One dashboard, above the fold

| Panel | Shows |
|---|---|
| requests per second, by status class | traffic and whether errors are rising |
| p50, p95, p99 latency by route | which endpoint is slow |
| 5xx rate | your fault |
| 4xx rate | usually the caller's, sometimes a broken deploy |
| healthy target count | is capacity what you think |
| database CPU and connections | the usual cause |
| queue depth and oldest message age | is background work keeping up |
| deploy markers | **did this start with a deploy** |

- **Deploy markers are the highest-value thing on a dashboard.** Most incidents correlate with a change, and the graph should say so

### The alerts worth waking someone for

| Alert | Threshold |
|---|---|
| 5xx rate | above 1 percent for 3 minutes |
| p99 latency | above the service objective for 5 minutes |
| healthy targets | fewer than the minimum |
| database connections | above 80 percent of the limit |
| database or disk free | below 15 percent |
| queue oldest message | older than 10 minutes |
| DLQ depth | **greater than zero** |
| certificate expiry | fewer than 21 days |
| cost | daily spend above a threshold |
