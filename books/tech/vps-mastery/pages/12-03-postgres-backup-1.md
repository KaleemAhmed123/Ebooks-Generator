## PostgreSQL dump and restore

### Dump

```bash
docker compose exec -T postgres \
  pg_dump -U app -d marketplace --format=custom --compress=9 \
  > /srv/app/backups/marketplace-$(date +%F-%H%M).dump
```

- `-T` disables the pseudo-terminal. Without it the output stream is corrupted by control characters, and the file is unusable
- `--format=custom` produces a compressed archive that `pg_restore` can restore selectively. Plain SQL cannot

### Everything, including roles

```bash
docker compose exec -T postgres pg_dumpall -U postgres --globals-only \
  > /srv/app/backups/globals-$(date +%F).sql
```

- `pg_dump` does not include roles or passwords. A restore onto a fresh server fails on missing users without this

### Restore

```bash
docker compose exec -T postgres \
  pg_restore -U app -d marketplace --clean --if-exists \
  < /srv/app/backups/marketplace-2026-08-30-0300.dump
```

| Flag | Effect |
|---|---|
| `--clean` | Drop objects before recreating them |
| `--if-exists` | Do not error when they are already absent |
| `-j 4` | Restore with four parallel jobs. Much faster on large data |
| `-t orders` | One table only |
