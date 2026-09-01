## Networks

- Compose creates one network named `<project>_default` and attaches every service to it
- That is enough for most stacks. Splitting networks becomes useful when some services must not reach others

```yaml
services:
  nginx:
    networks: [edge]
  api-gateway:
    networks: [edge, internal]
  orders:
    networks: [internal]
  postgres:
    networks: [internal]

networks:
  edge:
  internal:
    internal: true
```

| Setting | Effect |
|---|---|
| Two networks | Nginx cannot reach `postgres` at all |
| `internal: true` | Containers on it have **no outbound internet access** |

- `internal: true` is a real control. A compromised database container cannot call out to fetch a second stage

### The cost

- Every service needs its network list maintained. A missing entry produces a DNS failure that looks like a typo

```bash
docker compose exec nginx getent hosts orders
# no output. orders is not on a network nginx can see
```
