## Restart policies

| Policy | On crash | On reboot | Use |
|---|---|---|---|
| `no` | Stays down | Stays down | Default. Never in production |
| `on-failure` | Restarts if exit code is non-zero | No | Batch jobs |
| `always` | Restarts | Restarts, **even if stopped by hand** | Rarely what is wanted |
| `unless-stopped` | Restarts | Restarts, unless stopped by hand | **The right default** |

```yaml
restart: unless-stopped
```

### The difference that matters

- With `always`, a container stopped deliberately during an incident comes back on the next daemon restart
- With `unless-stopped`, Docker records the manual stop and leaves it down. A deliberate action stays deliberate

### The restart loop

- A container that crashes on startup restarts forever, with a backoff Docker increases up to a minute

```bash
docker compose ps
# app-orders-1   Restarting (1) 4 seconds ago

docker compose logs --tail 50 orders
```

- The logs of a restarting container are the only place the cause appears. Page 17-05 covers reading them
