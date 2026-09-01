## Container networking

- Every container gets its own network namespace: its own interfaces, its own routing table, its own view of localhost
- **`localhost` inside a container is that container**, which is the single most common networking surprise

| Driver | Means |
|---|---|
| `bridge` | the default. A private network, with NAT to the outside |
| **user-defined bridge** | the same, **plus name resolution between containers** |
| `host` | shares the host's stack. No isolation, no port mapping, Linux only |
| `none` | no network at all. The sandbox flag from Booklet 7 |
| `macvlan` | the container gets a real address on your LAN |

```bash
docker network create app-net
docker run -d --name db    --network app-net postgres:18-alpine
docker run -d --name api   --network app-net -e DATABASE_URL=postgres://db:5432/app myapp

docker network inspect app-net
docker network connect app-net some-other-container
docker network ls
```

- **On a user-defined network, `db` resolves to that container.** On the default bridge it does not, which is why every compose file gets its own network automatically

### Reaching the host from inside

```bash
host.docker.internal            # Docker Desktop, and Linux with the flag below
docker run --add-host=host.docker.internal:host-gateway myapp
```
