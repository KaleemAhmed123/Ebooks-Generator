## Cheatsheet: backup and restore

### Postgres

```bash
docker compose exec -T postgres pg_dump -U app -d marketplace \
  --format=custom --compress=9 > db.dump
docker compose exec -T postgres pg_dumpall -U postgres --globals-only > globals.sql
docker compose exec -T postgres pg_restore -U app -d marketplace --clean --if-exists < db.dump
docker compose exec -T postgres psql -U app -d marketplace -c "\dt"
```

### MongoDB

```bash
docker compose exec -T mongo mongodump --archive --gzip --uri="$MONGO_URI" > mongo.gz
docker compose exec -T mongo mongorestore --archive --gzip --drop --uri="$MONGO_URI" < mongo.gz
```

### A volume, with the container stopped

```bash
docker compose stop minio
docker run --rm -v app_miniodata:/data:ro -v $(pwd):/backup alpine \
  tar -czf /backup/minio-$(date +%F).tar.gz -C /data .
docker compose start minio
```

### Restoring a volume

```bash
docker run --rm -v app_miniodata:/data -v $(pwd):/backup alpine \
  sh -c "rm -rf /data/* && tar -xzf /backup/minio-2026-08-30.tar.gz -C /data"
```
