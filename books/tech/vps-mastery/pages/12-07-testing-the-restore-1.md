## Testing the restore

- Backups fail quietly. The dump is empty because a password changed, the timer stopped after an upgrade, the repository filled up
- **None of these are visible until a restore is attempted.** So attempt one on a schedule

### The monthly drill

```bash
# 1. what exists
restic snapshots --tag nightly | tail -5

# 2. pull the most recent one
restic restore latest --target /tmp/restore-test

# 3. is the dump a real dump
ls -lh /tmp/restore-test/srv/app/backups/
pg_restore --list /tmp/restore-test/srv/app/backups/marketplace-*.dump | head

# 4. restore it beside the live database
docker compose exec -T postgres createdb -U app drill
docker compose exec -T postgres pg_restore -U app -d drill \
  < /tmp/restore-test/srv/app/backups/marketplace-2026-08-30-0300.dump

# 5. does the data look right
docker compose exec -T postgres psql -U app -d drill -c \
  "SELECT count(*) FROM orders; SELECT max(created_at) FROM orders;"

# 6. clean up
docker compose exec -T postgres dropdb -U app drill
rm -rf /tmp/restore-test
```

- Step 5 is the real test. A restore that completes with an empty table is a passing command and a failed backup
