### Finding it

```bash
# logs, last 30 minutes, errors only
ssh prod 'docker compose logs --since 30m api | grep -i error | tail -50'
logcli query '{service="orders-api", level="error"}' --since=30m
aws logs tail /ecs/orders-api --since 30m --filter-pattern '{ $.level = "error" }'

# database
docker compose exec db psql -U app -c \
  "SELECT pid, now()-query_start AS dur, state, left(query,60) FROM pg_stat_activity
   WHERE state<>'idle' ORDER BY dur DESC LIMIT 10;"

# redis
docker compose exec redis redis-cli -a "$PW" info clients | head
docker compose exec redis redis-cli -a "$PW" info memory | grep -E 'used_memory_human|maxmemory_human'

# the box
dmesg -T | grep -i 'killed process'
docker stats --no-stream
ss -tn state established | wc -l
```

### Silencing while you work

```bash
amtool silence add alertname=HighErrorRate --duration=30m --comment='incident, investigating'
amtool silence query
amtool silence expire <id>                  # do not forget this
```

### Afterwards

```bash
docker compose logs --since 2h api > /tmp/incident-$(date +%F).log   # keep the evidence
git log --oneline --since='2 hours ago' --all
```
