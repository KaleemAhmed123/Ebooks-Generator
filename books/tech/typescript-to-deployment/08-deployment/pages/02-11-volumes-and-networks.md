## Volumes and networks

### Volumes

- A container's filesystem is destroyed with the container. A **volume** is storage that outlives it

```bash
docker volume create pgdata
docker run -d -v pgdata:/var/lib/postgresql/data postgres:18-alpine

docker run -v "$PWD/src:/app/src" myapp        # bind mount, for development
docker run --tmpfs /tmp:size=64m myapp          # memory only, never on disk
```

| Kind | Lives | Fits |
|---|---|---|
| **named volume** | managed by Docker | databases, anything persistent |
| **bind mount** | a host path you choose | live-reloading source in development |
| **tmpfs** | RAM only | scratch files, secrets that must not touch disk |

- **Application state does not belong in a volume in production.** It belongs in RDS, S3 or ElastiCache. A volume ties the container to one machine

### Networks

```bash
docker network create app-net
docker run -d --name db --network app-net postgres:18-alpine
docker run -d --name api --network app-net -e DATABASE_URL=postgres://db:5432/app myapp
```

- **On a user-defined network, containers reach each other by name.** `db` resolves to that container's address, with no ports published to the host
- The default `bridge` network has no name resolution, which is why a user-defined network is always the right choice
- `--network host` shares the host's network stack. Faster, no isolation, and Linux only

### The rule

- **Publish only what the outside world needs.** A database in a compose stack should have no `ports:` entry at all, and be reachable only by the application container
