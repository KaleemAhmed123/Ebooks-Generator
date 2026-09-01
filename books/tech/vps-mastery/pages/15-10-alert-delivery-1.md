## Getting the alert to a person

- Grafana can send alerts itself, which avoids running Alertmanager on a small box

**Alerting, Contact points, Add contact point, Webhook**

```text
https://discord.com/api/webhooks/.../slack
```

- Discord accepts Slack-formatted payloads at that suffix, which is the shortest path to a phone notification

### Route by severity

| Severity | Goes to | Expectation |
|---|---|---|
| `page` | Phone notification, any hour | Act now |
| `ticket` | A channel, working hours | Act this week |
| `info` | Nowhere. A dashboard | Never alerts |

- **If everything is a page, nothing is.** Start with two or three page-level alerts and add only after an incident that one would have caught
