### The push monitor is the one people miss

- Kuma gives a URL. If nothing calls it within the interval, it alerts. That is how a **failed backup** becomes visible

```bash
# last line of backup.sh
curl -fsS -m 10 "https://monitor.example.com/api/push/AbC123?status=up" || true
```

- `|| true` so a monitoring outage never fails the backup itself

### The limitation

- **Uptime Kuma runs on the box it is monitoring.** When the box dies, so does the thing meant to notice
- Either run it on a second small server, or add one external check from a free hosted service. One outside check is enough to catch total failure
