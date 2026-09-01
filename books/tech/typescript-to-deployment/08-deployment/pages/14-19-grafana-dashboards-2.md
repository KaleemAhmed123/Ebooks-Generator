### The four things that make it usable

- **Deploy annotations.** A vertical line at every deploy. **Most incidents correlate with a change, and the graph should say so**

```bash
curl -sX POST http://grafana:3000/api/annotations \
  -H "Authorization: Bearer $GRAFANA_TOKEN" -H 'Content-Type: application/json' \
  -d "{\"text\":\"deploy $SHA\",\"tags\":[\"deploy\",\"orders-api\"]}"
```

- **Template variables**, so one dashboard serves every service and environment rather than eight near-copies

```text
$service   label_values(http_requests_total, service)
$route     label_values(http_requests_total{service="$service"}, route)
```

- **Thresholds on the panels**, so red means past the objective rather than past whatever looks bad
- **A logs panel at the bottom**, filtered to the same service, so metrics and logs are on one page

### The rules

- **One dashboard per service, one overview for everything.** Not thirty
- **Delete any panel nobody has looked at in three months.** A crowded dashboard is a dashboard nobody reads
- **Link every alert to the dashboard panel that shows it**, so the first click during an incident is already correct
