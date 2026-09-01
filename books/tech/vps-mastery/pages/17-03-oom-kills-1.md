## OOM kills

- A container that vanishes with no error in its own logs was almost certainly killed by the kernel

```bash
docker inspect app-blue-orders-1 --format '{{.State.ExitCode}} {{.State.OOMKilled}}'
# 137 true
```

- Exit code **137** is SIGKILL. `OOMKilled: true` confirms the reason

### The kernel side

```bash
dmesg -T | grep -i "killed process"
# [Sun Aug 30 03:14:22 2026] Out of memory: Killed process 2841 (node)
#   total-vm:2841028kB, anon-rss:1904212kB

journalctl -k --since "1 hour ago" | grep -i oom
```

### Two different kills

| Kind | Cause | Fix |
|---|---|---|
| Container limit exceeded | `limits.memory` too low for this workload | Raise the limit, or fix the leak |
| Host out of memory | Everything together exceeds the box | Page 14-13, or a bigger box |

- The second is the dangerous one. **The kernel picks the largest process, which is usually the database**, so a memory problem in a small service appears as a database crash
