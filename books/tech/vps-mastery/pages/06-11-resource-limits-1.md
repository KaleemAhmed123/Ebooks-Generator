## Resource limits

- Without limits, one service with a memory leak takes the whole box down. With limits, the kernel kills that one container and the rest keep serving

```yaml
services:
  orders:
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: "0.50"
        reservations:
          memory: 256M
```

| Key | Effect |
|---|---|
| `limits.memory` | Hard cap. Exceeding it means the container is killed with exit 137 |
| `limits.cpus` | Fraction of one core. `"0.50"` is half a core |
| `reservations.memory` | A scheduling hint. On a single box it does little |

- The `deploy` key was once Swarm-only. Compose v2 honors `deploy.resources` on a plain `docker compose up`
