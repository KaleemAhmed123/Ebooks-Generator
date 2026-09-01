### 2. A real request through the new stack

```bash
smoke() {
  local color="$1"
  docker compose -p app-edge exec -T nginx \
    curl -fsS --max-time 5 "http://api-gateway-${color}:8080/readyz" > /dev/null || return 1
  docker compose -p app-edge exec -T nginx \
    curl -fsS --max-time 5 "http://shop-ui-${color}:3000/" > /dev/null || return 1
}
```

- Running the check **from inside the Nginx container** proves the path Nginx will actually use. A check from the host proves something else

### Test what would break

- One health check per service is the minimum. A smoke test that reads one row from the database and one key from the cache is what catches a bad configuration
- **If either check fails, stop. Do not flip.** The old stack is still serving and nothing has been lost
