## MongoDB dump and restore

### Dump

```bash
docker compose exec -T mongo \
  mongodump --archive --gzip \
  --uri="mongodb://root:$MONGO_ROOT_PASSWORD@localhost:27017/?authSource=admin" \
  > /srv/app/backups/mongo-$(date +%F-%H%M).archive.gz
```

- `--archive` writes a single stream rather than a directory tree, which is what makes the redirect above work
- `--gzip` compresses. MongoDB dumps compress well

### Restore

```bash
docker compose exec -T mongo \
  mongorestore --archive --gzip --drop \
  --uri="mongodb://root:$MONGO_ROOT_PASSWORD@localhost:27017/?authSource=admin" \
  < /srv/app/backups/mongo-2026-08-30-0300.archive.gz
```

- `--drop` removes each collection before restoring it. **Without it, the restore merges into existing data**, producing a mixture of old and new rows that is worse than either

### Into a different database name

```bash
mongorestore --archive --gzip \
  --nsFrom="marketplace.*" --nsTo="marketplace_restore.*" \
  < backup.archive.gz
```

- The same "restore beside, verify, then swap" discipline as Postgres
