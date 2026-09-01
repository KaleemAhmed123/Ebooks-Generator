### When something is wrong

```bash
df -h                                       # always first
docker ps -a                                # exit codes
docker inspect api --format '{{.State.ExitCode}} {{.State.OOMKilled}}'
dmesg -T | grep -i 'killed process'         # the OOM killer
docker compose logs --since 30m api | grep -i error
curl -sS -o /dev/null -w '%{http_code} %{time_total}s\n' localhost:3000/health
fail2ban-client status sshd
last -n 20 && lastb -n 20
```

### Recovering space

```bash
docker system df
docker builder prune -af
docker image prune -af --filter 'until=336h'
journalctl --vacuum-time=7d
du -sh /srv/app/data/* | sort -h
lsof +L1 | head                             # deleted files still held open
```
