## Prometheus

- **Prometheus pulls.** It scrapes a `/metrics` endpoint on each target every few seconds and stores the samples locally
- That model is why a target only has to expose text over HTTP, and why a dead target is itself a signal

```yaml
  prometheus:
    image: prom/prometheus:v3
    restart: unless-stopped
    command:
      - --config.file=/etc/prometheus/prometheus.yml
      - --storage.tsdb.path=/prometheus
      - --storage.tsdb.retention.time=30d
      - --storage.tsdb.retention.size=8GB
      - --web.enable-lifecycle              # reload config without a restart
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - ./monitoring/rules:/etc/prometheus/rules:ro
      - ./data/prometheus:/prometheus
    ports: ["127.0.0.1:9090:9090"]
    deploy: { resources: { limits: { memory: 2G } } }
```
