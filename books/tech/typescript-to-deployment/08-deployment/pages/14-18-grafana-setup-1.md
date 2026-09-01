## Grafana

- Grafana queries Prometheus, Loki and Tempo and draws them. **It stores nothing itself except dashboards and users**

```yaml
  grafana:
    image: grafana/grafana:13
    restart: unless-stopped
    environment:
      GF_SECURITY_ADMIN_PASSWORD: ${GRAFANA_PASSWORD:?}
      GF_USERS_ALLOW_SIGN_UP: 'false'
      GF_SERVER_ROOT_URL: https://grafana.example.com
      GF_ANALYTICS_REPORTING_ENABLED: 'false'
    volumes:
      - ./data/grafana:/var/lib/grafana
      - ./monitoring/grafana/provisioning:/etc/grafana/provisioning:ro
      - ./monitoring/grafana/dashboards:/var/lib/grafana/dashboards:ro
    ports: ["127.0.0.1:3000:3000"]
```
