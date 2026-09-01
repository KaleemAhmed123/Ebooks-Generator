## Cheatsheet: PromQL

### The four metric types

| Type | Is | Query with |
|---|---|---|
| Counter | Only goes up | `rate()`, `increase()` |
| Gauge | Goes up and down | Directly |
| Histogram | Bucketed observations | `histogram_quantile()` |
| Summary | Precomputed quantiles | Directly |

### Rates

```promql
rate(http_requests_total[5m])                      # per second, over 5 minutes
increase(orders_placed_total[1h])                  # total in the last hour
sum by (service) (rate(http_requests_total[5m]))   # grouped
```

- **Never use `rate()` on a gauge.** It produces numbers that look plausible and mean nothing

### Percentiles

```promql
histogram_quantile(0.95,
  sum by (le, route) (rate(http_request_duration_seconds_bucket[5m])))
```

- `le` must be in the grouping or the result is wrong

### Error rate

```promql
sum(rate(http_request_duration_seconds_count{status=~"5.."}[5m]))
/
sum(rate(http_request_duration_seconds_count[5m]))
```
