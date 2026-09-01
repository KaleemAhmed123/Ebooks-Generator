## Alertmanager - continued

receivers:
  - name: slack
    slack_configs:
      - api_url: ${SLACK_WEBHOOK}
        title: '{{ .CommonLabels.alertname }} on {{ .CommonLabels.service }}'
        text: '{{ range .Alerts }}{{ .Annotations.summary }}\n{{ .Annotations.runbook }}\n{{ end }}'
  - name: pager
    webhook_configs: [{ url: 'https://events.pagerduty.com/integration/xxx/enqueue' }]
  - name: blackhole
```

### The two features that make alerting bearable
