## Cheatsheet: debugging a container

### Get a shell inside

```bash
docker exec -it orders sh          # alpine
docker exec -it orders bash        # debian or slim
docker exec orders env             # what variables it actually received
docker exec orders ls -la /app
```

### The container will not start, so exec is not available

```bash
docker logs orders                          # the crash is usually here
docker run --rm -it --entrypoint sh marketplace/orders:7f3a91c
```

- The second command starts the image with a shell instead of the application, which is the only way to look inside a container that exits immediately

### Networking from inside

```bash
docker exec orders getent hosts postgres    # does the name resolve
docker exec orders nc -zv postgres 5432     # is the port open
docker exec orders wget -qO- http://catalog:8080/healthz
docker network inspect app_default          # who is on this network
```

### What changed in the filesystem

```bash
docker diff orders
# C /app
# A /app/tmp/upload-8812.part
```

### Copy a file out

```bash
docker cp orders:/app/dist/main.js ./main.js
docker cp ./fix.json orders:/app/config/fix.json     # temporary only
```
