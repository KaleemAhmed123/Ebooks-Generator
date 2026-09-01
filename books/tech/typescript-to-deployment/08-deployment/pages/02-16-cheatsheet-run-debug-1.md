## Cheatsheet: running and debugging

### Run

```bash
docker run -d --name api --restart unless-stopped \
  -p 127.0.0.1:3000:3000 --env-file /etc/app.env \
  --memory 512m --cpus 1 --init app:1.4.2

docker run --rm -it app:1.4.2 sh          # throwaway shell
docker run --rm -v "$PWD":/w -w /w node:24-alpine npm ci   # a tool, no install
docker run --rm --network app-net alpine ping -c2 db
```

### Look inside

```bash
docker ps
docker ps -a --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
docker logs -f --tail 100 api
docker logs --since 15m --timestamps api
docker exec -it api sh
docker exec api env | sort
docker inspect api | jq '.[0].State'
docker inspect api --format '{{.NetworkSettings.IPAddress}}'
docker top api
docker stats --no-stream
docker port api
docker diff api
docker events --since 30m --filter container=api
```

### Move things in and out

```bash
docker cp api:/app/dump.json ./
docker cp ./fix.js api:/app/dist/fix.js
docker export api | tar tv | head          # the whole filesystem, listed
```
