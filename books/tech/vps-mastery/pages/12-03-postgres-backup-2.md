### Restoring into a fresh database instead

```bash
docker compose exec -T postgres createdb -U app marketplace_restore
docker compose exec -T postgres pg_restore -U app -d marketplace_restore < backup.dump
```

- **Restore into a new database first, verify, then swap.** Restoring over the live database with `--clean` and discovering the dump was bad leaves nothing

### Version matters

- `pg_restore` from a newer server reads older dumps. The reverse fails. Keep the dump tool version at or above the source
