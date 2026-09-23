## Metrics

- A metric is a number sampled over time, and there are only three shapes worth knowing. What separates them is what the monitoring system is allowed to do with the value when it aggregates across instances

| Type | What it holds | Aggregates by | Example |
|---|---|---|---|
| Counter | a total that only rises | summing, then taking a rate | `http_requests_total` |
| Gauge | a level that moves both ways | summing or averaging, per meaning | `db_connections_active` |
| Histogram | counts per bucket of a distribution | summing the buckets | `http_request_duration_seconds` |

- Per service, RED covers the outside view: **rate** (requests per second), **errors** (the share that fail), **duration** (the distribution, not the mean — page 5). Google's four golden signals add **saturation**, how full the service is, which is the one that predicts the other three
- The SRE book adds a rule that costs nothing and is skipped anyway: "distinguish between the latency of successful requests and the latency of failed requests". A flood of fast `500`s pulls the duration graph down, so latency improves on the dashboard at the exact moment the service starts failing

### The failure

- Cardinality. Each distinct combination of label values is a separate stored series, so the cost is the product of every label's range, not the sum. Adding `status` (5 values) and `endpoint` (40) to one counter is 200 series
- Adding `user_id` to the same counter makes it 200 series per user. At a million users that is not a slow dashboard, it is the metrics store running out of memory and taking the monitoring down during the incident that needed it
- The test is a question about the label, not about the metric: how many values can this take, at the worst moment. Unbounded — ids, emails, URLs with parameters, error strings from a third party — belongs in logs or traces, where the cost is per event rather than per series forever
