## Cheatsheet: running the stack

### Prometheus

```bash
promtool check config monitoring/prometheus.yml
promtool check rules monitoring/rules/*.yml
promtool query instant http://localhost:9090 'up'
curl -X POST http://localhost:9090/-/reload

curl -s localhost:9090/api/v1/targets | jq '.data.activeTargets[]|{job:.labels.job,health,lastError}'
curl -s localhost:9090/api/v1/rules   | jq '.data.groups[].rules[]|select(.state=="firing")|.name'
curl -s localhost:9090/api/v1/status/tsdb | jq '.data.seriesCountByMetricName[:10]'   # cardinality
```

- **The last one is how you find the metric that is about to take Prometheus down**

### Alertmanager

```bash
amtool --alertmanager.url=http://localhost:9093 alert query
amtool --alertmanager.url=http://localhost:9093 silence add alertname=HighErrorRate \
  --duration=15m --comment='deploy'
amtool silence query && amtool silence expire <id>
amtool check-config monitoring/alertmanager.yml
```

### Loki

```bash
curl -s 'http://localhost:3100/ready'
curl -s 'http://localhost:3100/loki/api/v1/labels' | jq
curl -s 'http://localhost:3100/loki/api/v1/label/service/values' | jq
curl -sG 'http://localhost:3100/loki/api/v1/query_range' \
  --data-urlencode 'query={service="orders-api",level="error"}' \
  --data-urlencode 'limit=20' | jq -r '.data.result[].values[][1]'

logcli query '{service="orders-api"} |= "ECONNREFUSED"' --since=1h
logcli labels service
```
