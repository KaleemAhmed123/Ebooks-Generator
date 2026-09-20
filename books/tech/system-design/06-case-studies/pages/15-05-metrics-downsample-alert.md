## Downsampling and alerting

- **Downsampling:** A background job periodically reads the immutable blocks from disk. It takes six 10-second data points, averages them, and writes a single 1-minute data point to a new block. It then deletes the raw 10-second data
- **Alerting:** Alerting rules (e.g., `CPU > 90% for 5m`) are evaluated exclusively against the Hot In-Memory window. 
- You NEVER evaluate alerts against cold storage on disk. Alerting must be fast, real-time, and resilient to disk failures
- **Accuracy:** Systems like Prometheus drop data if overloaded. They are designed for operational insight (is the server healthy?), not for billing (how many API requests did the customer make?)

### The failure

- Running alert evaluation queries that require reading 30 days of historical data from cold storage. The query will time out, and the alert will silently fail.

:::interview
The billing department wants to use your Prometheus metrics to charge customers for API usage. Why should you stop them?

Prometheus is designed for operational observability, not 100% financial accuracy. Under extreme load, it will drop metrics or fail to scrape endpoints. Financial data requires exactly-once transactional pipelines (→11 Payments).
:::\n