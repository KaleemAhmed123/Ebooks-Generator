### Watch

```yaml
services:
  api:
    develop:
      watch:
        - action: sync
          path: ./src
          target: /app/src
        - action: rebuild
          path: package.json
```

```bash
docker compose watch
```

- Syncs changed files into the running container and **rebuilds only when a dependency changes**. It replaces a bind mount plus a manual rebuild

### Variables

```yaml
environment:
  DATABASE_URL: ${DATABASE_URL:?DATABASE_URL is required}
  LOG_LEVEL: ${LOG_LEVEL:-info}
```

- **`:?` fails the command with a clear message.** `:-` supplies a default. Both beat a container that starts and misbehaves
