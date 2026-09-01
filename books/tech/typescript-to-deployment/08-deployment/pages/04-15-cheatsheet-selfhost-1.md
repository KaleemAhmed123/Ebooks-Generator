## Cheatsheet: the self-hosted stack

### PostgreSQL

```bash
docker compose exec db psql -U app
docker compose exec -T db pg_dump -U app -Fc app > app.dump
docker compose exec -T db pg_restore -U app -d app --clean --if-exists < app.dump
docker compose exec db psql -U app -c "SELECT count(*), state FROM pg_stat_activity GROUP BY state;"
docker compose exec db psql -U app -c "SELECT pg_size_pretty(pg_database_size('app'));"
docker compose exec db psql -U app -c "SELECT * FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 5;"
```

### MongoDB

```bash
docker compose exec mongo mongosh -u root -p --authenticationDatabase admin
docker compose exec -T mongo mongodump --archive --gzip -u root -p "$PW" > m.gz
docker compose exec -T mongo mongorestore --archive --gzip --drop -u root -p "$PW" < m.gz
# in mongosh:  rs.status()   db.stats()   db.coll.getIndexes()   db.currentOp()
```

### Redis

```bash
docker compose exec redis redis-cli -a "$PW" --no-auth-warning
# info memory | info persistence | info clients
# dbsize | keys pattern* (never on production) | scan 0 match 'bull:*' count 100
# --bigkeys | --latency | monitor (never leave running)
docker compose exec redis redis-cli -a "$PW" bgsave
```
