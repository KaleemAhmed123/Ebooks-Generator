### Backups

```bash
docker compose exec -T mongo mongodump --archive --gzip \
  -u root -p "$MONGO_ROOT_PASSWORD" --authenticationDatabase admin > mongo.gz

docker compose exec -T mongo mongorestore --archive --gzip --drop \
  -u root -p "$MONGO_ROOT_PASSWORD" --authenticationDatabase admin < mongo.gz
```

- **`--drop` replaces collections.** Without it, a restore merges into existing data and produces a mess

### The three operational facts

- **WiredTiger uses half the available RAM by default for its cache.** Set a container memory limit, or it sizes itself against the host and gets killed
- **A major version upgrade must go one version at a time**, 7 to 8 to 9. Skipping is not supported
- **Create an application user, not root.** `db.createUser` with `readWrite` on one database, and put root away
