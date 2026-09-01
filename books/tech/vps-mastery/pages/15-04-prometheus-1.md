## Prometheus

- A time-series database that **pulls**. It visits a `/metrics` endpoint on each target and stores what it finds

```yaml
prometheus:
  image: prom/prometheus:v3.5.0
  command:
    - "--config.file=/etc/prometheus/prometheus.yml"
    - "--storage.tsdb.retention.time=15d"
    - "--storage.tsdb.retention.size=4GB"
  volumes:
    - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml:ro
    - promdata:/prometheus
  networks: [edge, data]
  restart: unless-stopped
```

- **Set both retention flags.** Without them Prometheus keeps 15 days by default and can still fill the disk if the series count grows

```yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: node
    static_configs: [{ targets: ["node-exporter:9100"] }]

  - job_name: containers
    static_configs: [{ targets: ["cadvisor:8080"] }]

  - job_name: services
    metrics_path: /metrics
    static_configs:
      - targets: ["api-gateway-blue:8080", "orders-blue:8083"]
        labels: { color: blue }
      - targets: ["api-gateway-green:8080", "orders-green:8083"]
        labels: { color: green }
```
