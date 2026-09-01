## Service names are hostnames

- Compose puts every service on a shared network and runs an embedded DNS server
- A service reaches another by its **service name**, on the port the container listens on

```text
DATABASE_URL=postgresql://app:secret@postgres:5432/marketplace
REDIS_URL=redis://redis:6379
CATALOG_URL=http://catalog:8080
```

### The port is the container port, not the published one

- `ports: - "127.0.0.1:8080:8080"` publishes to the host. It has nothing to do with service-to-service calls
- Even with no `ports` entry at all, `http://catalog:8080` works from inside the network

### `localhost` inside a container means the container

- The most common Compose error is a service configured with `postgresql://localhost:5432`
- Inside the orders container, `localhost` is the orders container. Nothing is listening on 5432 there

```text
Error: connect ECONNREFUSED 127.0.0.1:5432
```

- The `127.0.0.1` in that message is the giveaway. A real cross-container failure shows a `172.x` address

### Confirming resolution

```bash
docker compose exec orders getent hosts postgres
# 172.19.0.3       postgres
```
