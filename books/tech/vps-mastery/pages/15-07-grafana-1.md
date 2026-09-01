## Grafana

```yaml
grafana:
  image: grafana/grafana:12.1.0
  environment:
    GF_SECURITY_ADMIN_PASSWORD: ${GRAFANA_PASSWORD:?required}
    GF_USERS_ALLOW_SIGN_UP: "false"
    GF_SERVER_ROOT_URL: https://monitor.example.com/grafana
    GF_ANALYTICS_REPORTING_ENABLED: "false"
  volumes:
    - grafanadata:/var/lib/grafana
    - ./monitoring/grafana/provisioning:/etc/grafana/provisioning:ro
  networks: [edge]
  restart: unless-stopped
```

- **Change the admin password through the environment.** The default is `admin` / `admin`, and a Grafana reachable from the internet with defaults is an open door to the metrics and to any data source credentials it holds

### Provision the data sources rather than clicking

```yaml
# monitoring/grafana/provisioning/datasources/all.yml
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    url: http://prometheus:9090
    isDefault: true
  - name: Loki
    type: loki
    url: http://loki:3100
```

- Provisioned configuration is in Git, which means the rebuild in Module 16 restores the dashboards too. Clicking through the interface does not survive the box
