### Doing an archive safely

```bash
docker compose stop postgres
docker run --rm \
  -v app_pgdata:/data:ro \
  -v /srv/app/backups:/backup \
  alpine tar -czf /backup/pgdata-$(date +%F).tar.gz -C /data .
docker compose start postgres
```

- The helper container reads the named volume directly, so nothing needs to know where Docker stores it
