## The version key is gone

- Older files start with a version string:

```yaml
version: '3.8'      # remove this line
services:
  ...
```

- Compose v2 ignores it and prints a warning:

```text
WARN[0000] docker-compose.yml: the attribute `version` is obsolete,
it will be ignored, please remove it to avoid potential confusion
```

- The version number never controlled anything useful. Compose v2 reads the Compose Specification, which has no version field

### Two other things that changed with v2

| v1 | v2 |
|---|---|
| `docker-compose up` | `docker compose up` |
| Container named `app_orders_1` | Container named `app-orders-1` |
| `links:` between services | Removed. Every service on a network can reach every other |

- The naming change breaks scripts that grep for the underscore form. Use `docker compose ps -q orders` instead of parsing names
