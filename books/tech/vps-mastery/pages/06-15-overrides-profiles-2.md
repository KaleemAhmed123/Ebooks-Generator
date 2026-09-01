### Profiles

- A profile keeps optional services in the same file without starting them by default

```yaml
services:
  pgadmin:
    image: dpage/pgadmin4
    profiles: [tools]

  loki:
    image: grafana/loki:3.5
    profiles: [monitoring]
```

```bash
docker compose up -d                              # neither starts
docker compose --profile monitoring up -d         # loki starts
COMPOSE_PROFILES=monitoring,tools docker compose up -d
```

### Always check the result

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml config
```

- Merge rules are easier to verify than to remember
