### The pattern

- Frontends in the 3000 range, backends in the 8080 range, infrastructure on its own well-known port
- **Every service listens on a distinct port even though nothing collides.** Two services both on 8080 work fine inside Docker, and become an hour of confusion during a blue-green flip when both are briefly reachable

### Second projects on the same box

- Give each project a block: project A at 3000 and 8080, project B at 3100 and 8180
- Because nothing is published, these numbers never actually clash. The discipline is for humans reading logs

### Checking reality against the table

```bash
docker compose ps --format "table {{.Service}}\t{{.Ports}}"
sudo ss -tulpn | grep -v 127.0.0.1
```

- The second command should list only 22, 80 and 443
