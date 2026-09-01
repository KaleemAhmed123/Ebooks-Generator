### Alloy and Grafana

```bash
curl -s localhost:12345/-/ready                     # Alloy healthy
docker compose logs -f alloy | grep -i error

curl -s -u admin:$PW localhost:3000/api/health | jq
curl -s -u admin:$PW localhost:3000/api/datasources | jq '.[]|{name,type}'
curl -s -u admin:$PW localhost:3000/api/search?type=dash-db | jq '.[].title'
```

### The application's own metrics

```bash
curl -s localhost:3000/metrics | grep -E '^http_requests_total' | head
curl -s localhost:3000/metrics | wc -l              # how many series you are exposing
```
