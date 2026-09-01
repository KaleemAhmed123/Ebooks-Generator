### Alerting rules

```yaml
# monitoring/rules/alerts.yml
groups:
  - name: api
    rules:
      - alert: HighErrorRate
        expr: job:http_errors:ratio5m > 0.01
        for: 3m
        labels: { severity: page }
        annotations:
          summary: '{{ $labels.service }} error rate {{ $value | humanizePercentage }}'
          runbook: https://wiki.example.com/runbooks/high-error-rate

      - alert: DiskWillFill
        expr: predict_linear(node_filesystem_avail_bytes{mountpoint="/"}[6h], 4*3600) < 0
        for: 10m
        labels: { severity: page }

      - alert: TargetDown
        expr: up == 0
        for: 2m
        labels: { severity: page }

      - alert: DeadMansSwitch
        expr: vector(1)
        labels: { severity: none }
```

- **`for:` is what stops a single scrape paging someone.** Without it, one bad sample is an alert
- **`runbook` in the annotations** is the link Module 14's runbook page depends on
- **The dead man's switch always fires.** Something external watches for it, and **silence means the monitoring itself is down**
