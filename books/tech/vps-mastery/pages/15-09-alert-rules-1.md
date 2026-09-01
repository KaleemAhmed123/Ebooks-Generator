## Alerts worth waking up for

- Every alert must name something a human can act on right now. Everything else belongs on a dashboard

```yaml
groups:
  - name: box
    rules:
      - alert: DiskAlmostFull
        expr: node_filesystem_avail_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"} < 0.15
        for: 10m
        labels: { severity: page }
        annotations:
          summary: "Disk below 15%"
          runbook: "docs/runbooks/disk-full.md"

      - alert: DiskWillFillIn4Hours
        expr: predict_linear(node_filesystem_avail_bytes{mountpoint="/"}[2h], 4*3600) < 0
        for: 15m
        labels: { severity: page }

      - alert: MemoryExhausted
        expr: node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes < 0.10
        for: 10m
        labels: { severity: page }

  - name: app
    rules:
      - alert: HighErrorRate
        expr: |
          sum(rate(http_request_duration_seconds_count{status=~"5.."}[5m]))
          / sum(rate(http_request_duration_seconds_count[5m])) > 0.05
        for: 5m
        labels: { severity: page }

      - alert: ServiceDown
        expr: up{job="services", color="blue"} == 0
        for: 3m
        labels: { severity: page }
```
