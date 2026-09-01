## Cheatsheet: triage

### The first four commands, always

```bash
uptime && free -h && df -h && docker ps --format "table {{.Names}}\t{{.Status}}"
```

- Load, memory, disk, containers. Most incidents are visible in these four lines

### Then, by symptom

| Symptom | Next command |
|---|---|
| Site returns 502 | `sudo tail -20 /var/log/nginx/error.log` |
| Site returns 504 | `curl -w "%{time_starttransfer}\n" -o /dev/null -s https://...` |
| Site is slow | `docker stats --no-stream` |
| A container is missing | `docker compose ps -a` |
| A container restarts | `docker compose logs --tail 100 <svc>` |
| Nothing works at all | `df -h`, then `dmesg -T \| tail -20` |
| Certificate warning | `curl -vI https://example.com 2>&1 \| grep expire` |
| Cannot connect at all | `ping`, provider status page, provider panel |

### The evidence to capture before changing anything

```bash
docker compose ps -a > /tmp/incident-ps.txt
docker compose logs --since 30m > /tmp/incident-logs.txt
dmesg -T | tail -100 > /tmp/incident-dmesg.txt
free -h; df -h; uptime
```

- Restarting fixes the symptom and destroys the evidence. Thirty seconds of capture makes the difference between a fix and a recurrence
