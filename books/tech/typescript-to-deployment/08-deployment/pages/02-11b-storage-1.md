## Where the bytes live

- An image is layers. A running container adds one thin writable layer on top, and **everything it writes goes there unless a volume says otherwise**
- That layer is **copy-on-write**: changing one line of a 200 MB file copies the whole file into the container layer

```bash
docker system df -v                  # images, containers, volumes, cache
docker diff api                      # what this container changed
docker inspect api --format '{{ .GraphDriver.Name }}'   # overlay2
```

### The three ways data outlives a container

| | Managed by | Fits |
|---|---|---|
| **named volume** | Docker, under `/var/lib/docker/volumes` | databases, anything persistent |
| **bind mount** | you, a host path | source code in development |
| **tmpfs** | RAM only | scratch files, secrets that must not touch disk |

```bash
docker volume create pgdata
docker volume inspect pgdata
docker volume ls -f dangling=true      # volumes no container uses
docker volume prune
```

### Backing up a volume

```bash
docker run --rm -v pgdata:/data -v "$PWD":/backup alpine \
  tar czf /backup/pgdata-$(date +%F).tar.gz -C /data .

docker run --rm -v pgdata:/data -v "$PWD":/backup alpine \
  tar xzf /backup/pgdata-2026-08-31.tar.gz -C /data
```

- **For a database, use the database's own dump instead.** A tar of a live data directory is a copy of a file mid-write
