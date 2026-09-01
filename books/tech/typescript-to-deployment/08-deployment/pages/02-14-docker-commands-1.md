## Command reference: Docker

### Build and push

```bash
docker build -t myapp:1.4.2 .
docker build -t myapp:1.4.2 --target build .          # one stage only
docker build --no-cache -t myapp:1.4.2 .
docker build --build-arg NODE_ENV=production .
docker buildx build --platform linux/amd64,linux/arm64 -t myapp:1.4.2 --push .
docker tag myapp:1.4.2 registry.example.com/myapp:1.4.2
docker push registry.example.com/myapp:1.4.2
docker pull registry.example.com/myapp:1.4.2
```

### Run and inspect

```bash
docker ps                       # running
docker ps -a                    # including exited
docker logs -f --tail 100 api
docker logs --since 10m api
docker exec -it api sh          # a shell inside a running container
docker inspect api
docker stats                    # live CPU and memory per container
docker top api                  # processes inside it
docker port api
docker cp api:/app/dump.json ./dump.json
docker diff api                 # what changed on its filesystem
```

### Lifecycle

```bash
docker stop api                 # SIGTERM, then SIGKILL after 10s
docker stop -t 30 api           # give it 30 seconds
docker restart api
docker rm -f api
docker update --memory 1g api
```
