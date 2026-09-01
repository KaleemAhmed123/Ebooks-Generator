### Resources

```promql
node_filesystem_avail_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"}
node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes
rate(node_cpu_seconds_total{mode="idle"}[5m])
container_memory_usage_bytes{name=~"app-blue-.*"}
```

### Prediction and change

```promql
predict_linear(node_filesystem_avail_bytes[2h], 4*3600) < 0
changes(kube_pod_container_status_restarts_total[1h]) > 3
delta(node_network_receive_bytes_total[10m])
```

### Availability

```promql
up{job="services"}                    # 1 or 0 per target
avg_over_time(up{job="services"}[24h])   # uptime fraction
absent(up{job="services"})            # fires when the target vanished entirely
```

- `absent()` catches the case a plain `== 0` misses: a target that is no longer being scraped produces no series at all
