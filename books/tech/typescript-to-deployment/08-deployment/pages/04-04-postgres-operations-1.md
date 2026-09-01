## Operating PostgreSQL

### Backups

```bash
# logical, the default choice on one box
docker compose exec -T db pg_dump -U app --format=custom app > app.dump
docker compose exec -T db pg_dumpall -U app --globals-only > globals.sql   # roles

# restore, into a fresh database
docker compose exec -T db psql -U app -c 'CREATE DATABASE app_restore'
docker compose exec -T db pg_restore -U app -d app_restore --clean --if-exists < app.dump
```

- **`--format=custom` is compressed, selective and parallel-restorable.** Plain SQL is none of those
- Module 3 wraps this in `restic` so it leaves the box. **A dump on the same disk is not a backup**

### Point-in-time recovery, when a daily dump is not enough

- A dump loses everything since it ran. **`pgBackRest` archives the write-ahead log and restores to any second**
- It is the right answer when losing a day of orders is unacceptable, and it is more to operate
- **Decide by asking how much data you can afford to lose.** That is the RPO from Module 16

### Upgrading

```bash
# minor: 18.5 to 18.6. Safe, just pull and restart
docker compose pull db && docker compose up -d db
```

- **A major upgrade, 17 to 18, cannot be done by changing the tag.** The data directory format differs and the container will refuse to start
- **Dump, start the new major on a fresh directory, restore.** Test it on a copy first, and read the release notes for the extensions you use
