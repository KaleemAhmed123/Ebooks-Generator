## Prometheus - continued

```yaml
# monitoring/prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s
  external_labels: { env: production, cluster: vps-1 }

rule_files: ['/etc/prometheus/rules/*.yml']

alerting:
  alertmanagers:
    - static_configs: [{ targets: ['alertmanager:9093'] }]

scrape_configs:
  - job_name: prometheus
    static_configs: [{ targets: ['localhost:9090'] }]

  - job_name: api
    metrics_path: /metrics
    static_configs: [{ targets: ['api:3000'], labels: { service: orders-api } }]

  - job_name: node
    static_configs: [{ targets: ['node-exporter:9100'] }]
