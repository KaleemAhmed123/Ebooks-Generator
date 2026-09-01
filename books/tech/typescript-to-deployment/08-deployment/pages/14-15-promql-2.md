### Percentiles

```promql
histogram_quantile(0.95,
  sum by (le, route) (rate(http_request_duration_seconds_bucket[5m]))
)
```

- **`by (le, ...)` is mandatory.** `le` is the bucket boundary label, and dropping it makes the result meaningless

### The queries you will actually write

```promql
# error rate as a percentage
100 * sum(rate(http_requests_total{status=~"5.."}[5m]))
      / sum(rate(http_requests_total[5m]))

# memory used, per container
container_memory_working_set_bytes{name!=""} / 1024 / 1024

# disk will be full within 4 hours
predict_linear(node_filesystem_avail_bytes{mountpoint="/"}[6h], 4*3600) < 0

# a target has disappeared
up == 0
```

- **`predict_linear` on disk space is the most useful alert in this booklet.** It warns hours before the outage, not during it
