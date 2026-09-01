## Restart loops

```bash
docker compose ps
# app-blue-orders-1   Restarting (1) 4 seconds ago
```

- The container starts, exits, and the restart policy brings it back. Docker backs off up to a minute between attempts

### The logs are the answer, and they scroll away

```bash
docker compose logs --tail 100 orders
docker compose logs --since 10m orders
docker logs app-blue-orders-1 2>&1 | head -40
```

- Read from the **top**. The first error causes the rest, and `--tail` shows the last, which is usually a cascade

### Exit codes

| Code | Means |
|---|---|
| `0` | Exited cleanly. The command finished rather than serving |
| `1` | Application error. The reason is in the logs |
| `127` | Command not found. Usually a wrong path in `CMD` |
| `137` | SIGKILL. Out of memory. Page 17-03 |
| `139` | Segmentation fault. Native module built for the wrong platform |
| `143` | SIGTERM. A normal stop |

### Stop the loop to investigate

```bash
docker update --restart=no app-blue-orders-1
docker start app-blue-orders-1
docker logs -f app-blue-orders-1
```
