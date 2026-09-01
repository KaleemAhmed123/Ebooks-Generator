## Recording rules and alerting rules

### Recording rules

- A dashboard panel running a heavy query every fifteen seconds is work repeated forever. **A recording rule computes it once and stores the result as a new series**

```yaml
# monitoring/rules/recording.yml
groups:
  - name: api
    interval: 30s
    rules:
      - record: job:http_requests:rate5m
        expr: sum by (service, route, status) (rate(http_requests_total[5m]))

      - record: job:http_errors:ratio5m
        expr: |
          sum by (service) (rate(http_requests_total{status=~"5.."}[5m]))
          / sum by (service) (rate(http_requests_total[5m]))

      - record: job:http_latency:p95
        expr: histogram_quantile(0.95, sum by (le, service, route) (rate(http_request_duration_seconds_bucket[5m])))
```

- **The naming convention is `level:metric:operation`.** It makes a recorded series obvious in a dashboard
- **Record anything a dashboard or an alert uses more than once.** It is the difference between a Grafana page that loads and one that times out
