## Cheatsheet: docker

### Looking

```bash
docker ps                       # running
docker ps -a                    # including stopped and crashed
docker ps --filter "health=unhealthy"
docker image ls
docker stats --no-stream
docker system df                # where the disk went
docker inspect orders | less
```

### Lifecycle

```bash
docker start orders
docker stop orders              # SIGTERM, then SIGKILL after 10s
docker stop -t 30 orders        # allow 30s to shut down cleanly
docker restart orders
docker rm -f orders
```

### Logs

```bash
docker logs orders
docker logs -f --tail 100 orders
docker logs --since 10m orders
docker logs orders 2>&1 | grep -i error
```

### Building

```bash
docker build -t marketplace/orders:7f3a91c .
docker build --platform linux/amd64 -t marketplace/orders:7f3a91c .
docker build --no-cache -t marketplace/orders:7f3a91c .
docker build --target build -t marketplace/orders:debug .
```
