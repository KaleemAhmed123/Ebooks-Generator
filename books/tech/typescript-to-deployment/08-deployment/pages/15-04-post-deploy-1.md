## The fifteen minutes after

- A deploy is not finished when the command returns. **Most deploy-caused incidents surface within fifteen minutes**, and that window is when someone should still be watching

### Verify, in this order

```bash
# 1. the right thing is running
curl -s https://api.example.com/health | jq '{version, status}'

# 2. a real request works, end to end
curl -sS -X POST https://api.example.com/api/v1/orders \
  -H "Authorization: Bearer $SMOKE_TOKEN" -H 'Content-Type: application/json' \
  -d '{"sellerId":"s_smoke","totalPaise":100}' -w '\n%{http_code}\n'

# 3. the background side is moving
ssh prod 'docker compose logs --since 5m worker | tail -20'

# 4. nothing new is throwing
# Sentry: new issues in this release
# Loki: {service="orders-api", level="error"} | json
```
