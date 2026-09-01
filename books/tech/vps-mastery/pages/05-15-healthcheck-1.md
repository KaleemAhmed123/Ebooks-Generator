## HEALTHCHECK

- Docker knows whether a process is running. It does not know whether the application works
- A Node process that has lost its database connection is `running` and useless. A health check is what separates the two

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:8080/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
```

| Option | Meaning |
|---|---|
| `interval` | How often to check |
| `timeout` | How long a check may take before counting as a failure |
| `start-period` | Grace window at startup. Failures here do not count |
| `retries` | Consecutive failures before the container is marked unhealthy |

- `start-period` is the one people omit. Without it, a service taking 15 seconds to warm up is marked unhealthy and restarted forever
