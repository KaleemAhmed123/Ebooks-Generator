## Where the downtime actually comes from

- `docker compose up -d` stops the old container before starting the new one. Between those two events, Nginx has nowhere to send traffic

```text
t=0    docker compose up -d
t=0.2  old container stopped              502 begins
t=1.0  new container started
t=1.0  process boots
t=6.0  database pool connected
t=6.5  first successful request           502 ends
```

- **Roughly six seconds of 502 per service.** With fifteen services restarted in sequence, the site is degraded for over a minute

### The four separate causes

| Cause | Duration | Fixed by |
|---|---|---|
| The build, when it runs on the box | 8 to 20 min | Module 13 |
| Image pull | 10 to 60 s | Pull before stopping anything |
| The stop-then-start gap | 1 to 10 s per service | Blue-green |
| Application warm-up | 3 to 30 s | Health gating before traffic |

- Module 13 removed the first. This module removes the rest

### Measure it before fixing it

```bash
while true; do
  curl -s -o /dev/null -w "%{http_code} %{time_total}\n" https://example.com/api/healthz
  sleep 0.2
done
```

- Run this from a second machine during a deploy. The count of non-200 lines is the real number
- **Do not skip this step.** Blue-green adds real complexity, and a stack that loses two seconds may not need it
