## Alertmanager

- Prometheus decides **what** is wrong. **Alertmanager decides who is told, how often, and what gets grouped together**

```yaml
  alertmanager:
    image: prom/alertmanager:v0.34
    restart: unless-stopped
    volumes: ['./monitoring/alertmanager.yml:/etc/alertmanager/alertmanager.yml:ro']
    ports: ["127.0.0.1:9093:9093"]
```

```yaml
# monitoring/alertmanager.yml
route:
  receiver: slack
  group_by: ['alertname', 'service']
  group_wait: 30s          # collect related alerts before the first message
  group_interval: 5m       # then at most one update every 5 minutes
  repeat_interval: 4h      # re-notify about something still firing
  routes:
    - matchers: ['severity="page"']
      receiver: pager
      continue: true
    - matchers: ['severity="none"']
      receiver: blackhole

inhibit_rules:
  - source_matchers: ['alertname="TargetDown"']
    target_matchers: ['severity="page"']
    equal: ['service']
