### RabbitMQ

```yaml
healthcheck:
  test: ["CMD", "rabbitmq-diagnostics", "-q", "check_running"]
  interval: 15s
  timeout: 10s
  retries: 5
  start_period: 40s
```

- RabbitMQ is slow to start. A `start_period` under 30 seconds produces a restart loop on a small box

### CMD against CMD-SHELL

- `CMD` runs the command directly. Use it when there are no shell features
- `CMD-SHELL` runs through `/bin/sh`, so pipes, `&&` and variables work

```bash
docker compose ps
# NAME             STATUS
# app-postgres-1   Up 2 minutes (healthy)
# app-rabbitmq-1   Up 40 seconds (health: starting)
```
