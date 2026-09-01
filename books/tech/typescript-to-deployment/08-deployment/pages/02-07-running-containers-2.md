### The port binding mistake

- **`-p 3000:3000` binds to every interface**, so the container is reachable from the internet on a public instance, bypassing Nginx and the firewall
- `-p 127.0.0.1:3000:3000` binds to loopback only, which is what you want when a reverse proxy sits in front

### Memory limits and Node

- Node reads the cgroup limit and sizes its heap from it, so `--memory 512m` is respected without extra flags
- **A container killed with exit code 137 ran out of memory.** It is not a crash in your code, and no stack trace will exist

```bash
docker inspect orders-api --format '{{.State.OOMKilled}} {{.State.ExitCode}}'
```
