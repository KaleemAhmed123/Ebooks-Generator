### Querying

```text
rate(http_requests_total{status=~"5.."}[5m])
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, route))
nodejs_eventloop_lag_p99_seconds > 0.1
```

### Running it

- **Amazon Managed Prometheus and Managed Grafana** remove the storage and upgrade problem, which is most of the operational cost
- **Label cardinality is the failure mode.** A label carrying a user id or an order id will take a Prometheus server down, exactly as Booklet 4 warns
