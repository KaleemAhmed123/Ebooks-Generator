### Why it exited

```bash
docker inspect orders --format '{{.State.ExitCode}} {{.State.Error}}'
# 137
```

| Exit code | Means |
|---|---|
| `0` | Clean exit. The process finished and nothing restarted it |
| `1` | Application error. Read the logs |
| `137` | SIGKILL. Usually out of memory. Page 17-03 |
| `139` | Segmentation fault. Often a native module for the wrong platform |
| `143` | SIGTERM. A normal stop |
