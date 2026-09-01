## The six that actually happen

### 1. Disk full

```bash
df -h && df -i                          # inodes too
du -sh /var/lib/docker/* | sort -h
docker system df
docker builder prune -af && docker image prune -af --filter 'until=168h'
journalctl --vacuum-time=3d
lsof +L1 | head                         # deleted files still held open
```

- **Then find the cause.** Almost always container logs with no `max-size`, from Module 3

### 2. Out of memory

```bash
dmesg -T | grep -i 'killed process'
docker inspect api --format '{{.State.OOMKilled}} {{.State.ExitCode}}'   # 137
docker stats --no-stream
```

- **Raise the limit to restore service. Then find the leak**, because the limit will be hit again

### 3. A crash loop

```bash
docker compose ps                       # Restarting (1) 5 seconds ago
docker compose logs --tail 100 api
docker compose config                   # is an env var missing
```

- **A container restarting every few seconds is usually a missing environment variable or an unreachable dependency at boot**

### 4. 502 from the proxy

```bash
curl -s localhost:3000/health           # is the app up at all
docker compose logs --tail 50 caddy
```

- **App up, proxy 502: a keep-alive mismatch.** Node's `keepAliveTimeout` must exceed the proxy's idle timeout, as Module 9 covers
