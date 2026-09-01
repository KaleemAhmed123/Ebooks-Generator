## DNS inside containers

```text
Error: getaddrinfo EAI_AGAIN catalog
Error: getaddrinfo ENOTFOUND postgres
```

### Is the name resolvable at all

```bash
docker compose exec orders getent hosts catalog
docker compose exec orders nslookup catalog
docker network inspect app_data --format '{{range .Containers}}{{.Name}} {{end}}'
```

### The four causes

**1. Not on the same network**

```yaml
orders:
  networks: [data]        # catalog is only on edge. They cannot see each other
```

**2. Using the container name instead of the service name**

- The service is `catalog`. The container is `app-blue-catalog-1`. Only the service name resolves, plus any alias

**3. Resolving `localhost`**

- Inside a container, `localhost` is that container. Page 06-04

**4. The container is not running**

- A stopped container has no DNS record. The failure looks like a network problem and is a crash
