### Health of one color

```bash
docker compose -p app-green ps
docker compose -p app-green ps --filter "health=unhealthy"
docker compose -p app-green logs --tail 50 orders
docker compose -p app-edge exec nginx curl -fsS http://orders-green:8083/readyz
```

### Emergency

```bash
# stop a runaway color without touching the live one
docker compose -p app-green -f app/docker-compose.yml down

# maintenance page
touch /srv/app/edge/conf.d/MAINTENANCE
docker compose -p app-edge exec -T nginx nginx -s reload
```
