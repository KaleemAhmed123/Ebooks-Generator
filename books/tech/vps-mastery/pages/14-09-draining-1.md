## Draining the old stack

- Do not stop the old color immediately. Requests are still finishing, and it is the rollback target

```bash
sleep 60
docker compose -p "app-${CURRENT}" down --remove-orphans
```

### Why sixty seconds

| Waiting for | Typical |
|---|---|
| In-flight HTTP requests | Under 5 s |
| A long upload finishing | Up to `client_max_body_size` divided by the slowest client |
| Background jobs mid-execution | Seconds to minutes |
| WebSocket clients reconnecting | As long as they are allowed to stay |

- Sixty seconds covers HTTP comfortably. Long jobs and sockets need the two sections below

### Keep the old stack while it is still the rollback

- A longer wait means a faster rollback, and a longer period of double memory use
- **Five minutes is a good default when the box has room.** Down to sixty seconds when it does not
