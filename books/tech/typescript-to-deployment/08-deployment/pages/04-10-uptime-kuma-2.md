### What to actually monitor

| Monitor | Catches |
|---|---|
| `GET /ready` on the API | the app is up but the database is not |
| a **real transaction**, such as a login | everything the health check does not |
| TLS certificate expiry | the outage nobody sees coming |
| DNS record resolves to the right address | a hijack or a bad change |
| **a push monitor for every cron job** | a backup that stopped running |

- **The push monitor is the important one.** The job pings a URL on success; **silence is the alert**

```bash
curl -fsS -m 10 --retry 3 "$KUMA_PUSH_URL" >/dev/null   # at the end of backup.sh
```

### Notifications and the status page

- Kuma sends to Telegram, Slack, Discord, email, webhooks and a hundred others. **Set up two channels**, so one failing does not silence everything
- The built-in status page is public and costs nothing. **A status page removes most of the support load during an incident**
- **Gatus** is the lighter, configuration-file alternative if you would rather define monitors in git than in a UI
