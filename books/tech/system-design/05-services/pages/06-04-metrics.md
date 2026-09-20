## Metrics

- A metric is a number tracked over time. The three primary types of metrics are Counters (which only go up, like total requests), Gauges (which go up and down, like CPU usage or queue depth), and Histograms (which track distributions, like latency)
- For every service, you must measure the RED metrics:
  - **Rate:** Requests per second
  - **Errors:** The percentage of requests that fail
  - **Duration:** How long the requests take (latency)
- (Google's SRE book adds a fourth "golden signal": Saturation, which is how "full" the service is, such as thread pool utilization)

| Metric Type | Use Case | Example |
|---|---|---|
| **Counter** | Events that accumulate | `http_requests_total` |
| **Gauge** | State that fluctuates | `active_database_connections` |
| **Histogram** | Measuring time or size | `http_request_duration_seconds` |

### The failure

- The failure is high cardinality. A metric label acts as a grouping dimension (e.g., `status_code="200"`). A time-series database creates a new data stream for every unique combination of labels
- If a developer adds the `user_id` as a label (`status="200", user_id="8492"`), the system creates millions of unique streams. This is a cardinality explosion, and it will instantly crash your metrics database. Metrics are for aggregate data; use logs for user-specific data
