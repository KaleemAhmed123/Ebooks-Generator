### Starting a color

```bash
COLOR=green IMAGE_TAG=7f3a91c \
  docker compose -p app-green -f app/docker-compose.yml up -d
```

- `-p` sets the project name, which prefixes every container, so blue and green never collide

```bash
docker ps --format "table {{.Names}}\t{{.Status}}"
# app-blue-orders-1    Up 3 days
# app-green-orders-1   Up 20 seconds (health: starting)
```

### Resolving from Nginx

```bash
docker compose -p app-edge exec nginx getent hosts orders-green
# 172.20.0.14      orders-green
```

- Both `orders-blue` and `orders-green` resolve, independently, from the same Nginx container. That is what makes the switch a config change rather than a restart
