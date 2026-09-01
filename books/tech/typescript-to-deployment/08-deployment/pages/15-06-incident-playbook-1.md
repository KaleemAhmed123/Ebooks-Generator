## The first ten minutes

- **The goal is to stop the bleeding, not to understand it.** Understanding comes afterwards, in the review

### Minute 0 to 2: establish

```bash
curl -sS -o /dev/null -w '%{http_code} %{time_total}s\n' https://api.example.com/ready
gh run list --workflow deploy.yml --limit 3          # was there a deploy
```

- **Say it out loud in the channel.** "Investigating elevated 5xx on the orders API, started 14:02". One person coordinates and does not debug

### Minute 2 to 5: the four questions, in order

| Question | Command |
|---|---|
| **Was there a deploy?** | `gh run list`, or the dashboard annotation |
| **Is it everyone or one customer?** | error rate grouped by `tenantId` |
| **Is it the app or a dependency?** | database, Redis and provider metrics |
| **Is it the machine?** | `df -h`, `free -h`, `docker stats` |

- **A deploy in the last hour is the cause most of the time.** Roll back and see. That is a two minute test of the most likely hypothesis
