## Knowing the box is alive

- Module 14 builds the full monitoring stack. **This page is the minimum that must exist on day one**, because a box with no monitoring fails silently

### The three things to watch, in order of what actually breaks

| Watch | Because |
|---|---|
| **disk free** | a full disk is the most common single-box outage, and Docker logs cause it |
| **the service responds** | the process can die in ways `docker ps` does not show |
| **memory** | the kernel kills your database, quietly |

### External uptime checking, which costs nothing

- **Something outside the box must check it**, or you learn about the outage from a user
- Uptime Kuma self-hosted elsewhere, or a free tier of any hosted checker. Module 4 covers running your own
- **Check a real endpoint, not the front page.** `/ready` from Module 2, which touches the database

### A dead-man switch for anything scheduled

```bash
# at the end of backup.sh
curl -fsS -m 10 --retry 3 "$HEALTHCHECK_URL" >/dev/null
```

- **Silence is the failure signal.** A backup that stops running sends nothing, and a dead-man switch is what notices
