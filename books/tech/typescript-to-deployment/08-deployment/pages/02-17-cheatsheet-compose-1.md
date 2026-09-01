## Cheatsheet: Compose and cleanup

### Compose

```bash
docker compose up -d
docker compose up -d --build
docker compose up -d --wait               # block until healthy, fail if not
docker compose up -d --no-deps api        # only this service
docker compose --profile observability up -d
docker compose -f base.yml -f prod.yml up -d

docker compose ps
docker compose logs -f --tail 100 api
docker compose exec db psql -U app
docker compose run --rm api npx prisma migrate deploy   # one-off task
docker compose restart api
docker compose pull && docker compose up -d
docker compose config                     # the merged file, fully resolved
docker compose top

docker compose down                       # stop and remove containers
docker compose down -v                    # AND delete the volumes
docker compose down --remove-orphans
```

- **`docker compose config` is the debugging command.** It prints the file after overrides, profiles and variable substitution
