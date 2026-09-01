### The form that does wait

```yaml
services:
  orders:
    depends_on:
      postgres:
        condition: service_healthy

  postgres:
    image: postgres:18-alpine
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d marketplace"]
      interval: 5s
      timeout: 3s
      retries: 10
      start_period: 10s
```

| Condition | Waits until |
|---|---|
| `service_started` | The container started. The old default |
| `service_healthy` | Its health check passes |
| `service_completed_successfully` | It ran and exited 0. For migration jobs |

- `condition: service_healthy` requires the dependency to define a `healthcheck`. Without one, Compose refuses to start
