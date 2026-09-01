### Containers

```promql
sum by (name) (rate(container_cpu_usage_seconds_total{name!=""}[5m]))
container_memory_working_set_bytes{name!=""} / 1024 / 1024
rate(container_cpu_cfs_throttled_seconds_total[5m]) > 0     # the limit is too low
changes(container_start_time_seconds{name!=""}[1h]) > 3     # a restart loop
```

### Node.js and the stack

```promql
nodejs_eventloop_lag_p99_seconds > 0.1
nodejs_heap_size_used_bytes / nodejs_heap_size_total_bytes
pg_stat_activity_count / pg_settings_max_connections
redis_memory_used_bytes / redis_memory_max_bytes
rate(redis_evicted_keys_total[5m]) > 0                      # losing data
probe_ssl_earliest_cert_expiry - time() < 21*86400          # certificate expiry
up == 0
```
