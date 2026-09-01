### 5. Everything is slow, nothing is erroring

```bash
# almost always the database
docker compose exec db psql -U app -c \
  "SELECT pid, now()-query_start AS dur, state, left(query,60) FROM pg_stat_activity
   WHERE state <> 'idle' ORDER BY dur DESC LIMIT 10;"
```

### 6. A queue is backing up

```bash
docker compose exec redis redis-cli -a "$PW" llen bull:orders:wait
docker compose logs --since 10m worker | grep -i error
```

- **Workers dead, or every job failing and retrying.** The logs say which within seconds
