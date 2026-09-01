### Cleaning up

```bash
docker system df
docker image prune -a           # images no container uses
docker builder prune            # the build cache, often the largest
docker system prune -a --volumes    # everything unused. Read it twice
```

### Compose

```bash
docker compose up -d --build
docker compose logs -f api
docker compose exec db psql -U app
docker compose ps
docker compose down -v          # -v also deletes the volumes
```
