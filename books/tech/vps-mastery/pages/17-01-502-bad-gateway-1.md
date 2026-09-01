## 502 Bad Gateway

- Nginx received the request, tried the upstream, and got nothing usable back. **The error is always in the Nginx error log**, not the access log

```bash
sudo tail -20 /var/log/nginx/error.log
```

| Error log says | Means |
|---|---|
| `connect() failed (111: Connection refused)` | Nothing is listening on that port |
| `no live upstreams` | Every backend is marked down after repeated failures |
| `upstream prematurely closed connection` | The backend crashed mid-response |
| `host not found in upstream` | The service name does not resolve. Config or network |

### The checklist, in order

```bash
# 1. is the container running
docker compose ps

# 2. did it crash
docker compose logs --tail 50 orders

# 3. is it healthy
docker inspect --format '{{.State.Health.Status}}' app-blue-orders-1

# 4. can Nginx reach it
docker compose -p app-edge exec nginx getent hosts orders-blue
docker compose -p app-edge exec nginx curl -sv http://orders-blue:8083/healthz

# 5. what does Nginx think the upstream is
sudo nginx -T | grep -A3 "upstream gateway"
```
