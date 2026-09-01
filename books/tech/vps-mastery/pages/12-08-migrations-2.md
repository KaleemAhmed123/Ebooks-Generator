### Back up immediately before

```bash
docker compose exec -T postgres pg_dump -U app -d marketplace --format=custom \
  > /srv/app/backups/pre-migration-$(date +%F-%H%M).dump
```

- A migration is the one deploy step that can destroy data. The nightly backup may be twenty hours old

### Prisma, and the flag not to use

```bash
npx prisma migrate deploy      # production. Applies pending migrations only
npx prisma db push             # development. Can drop columns without warning
```

- `db push` compares the schema and reshapes the database to match. On production that turns a renamed field into a dropped column
