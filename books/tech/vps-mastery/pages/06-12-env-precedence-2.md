### Defaults and required values

```yaml
image: postgres:${PG_VERSION:-18-alpine}   # default if unset
environment:
  JWT_SECRET: ${JWT_SECRET:?JWT_SECRET is required}
```

- The `:?` form refuses to start with a clear message rather than starting with an empty secret

### Check what a container actually got

```bash
docker compose config | grep -A5 environment
docker compose exec orders env | sort
```

- `docker compose config` shows substitution results. `exec env` shows the truth
