## Cheatsheet: PromQL

### Traffic and errors

```promql
sum(rate(http_requests_total[5m]))
sum by (route) (rate(http_requests_total[5m]))
sum by (status) (rate(http_requests_total[5m]))

100 * sum(rate(http_requests_total{status=~"5.."}[5m]))
      / sum(rate(http_requests_total[5m]))

topk(10, sum by (route) (rate(http_requests_total{status=~"5.."}[5m])))
increase(http_requests_total{status="429"}[1h])
```

### Latency

```promql
histogram_quantile(0.95, sum by (le, route) (rate(http_request_duration_seconds_bucket[5m])))
histogram_quantile(0.99, sum by (le) (rate(http_request_duration_seconds_bucket[5m])))

rate(http_request_duration_seconds_sum[5m])
  / rate(http_request_duration_seconds_count[5m])          # the average, for comparison
```

### Host

```promql
100 - avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100
node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes
node_filesystem_avail_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"}
predict_linear(node_filesystem_avail_bytes{mountpoint="/"}[6h], 4*3600) < 0
node_load5 / count without (cpu, mode) (node_cpu_seconds_total{mode="idle"})
rate(node_network_receive_bytes_total[5m]) * 8 / 1e6        # megabits per second
```
