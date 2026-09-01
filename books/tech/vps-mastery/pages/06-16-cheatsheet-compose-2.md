### Danger

```bash
docker compose down -v                # DELETES every volume in this project
docker compose down --remove-orphans  # removes containers no longer in the file
```

### After changing daemon.json or a health check

```bash
docker compose up -d --force-recreate
```
