## Cheatsheet: compose

### Daily

```bash
docker compose up -d                  # start or update everything
docker compose up -d orders           # one service
docker compose ps                     # what is up, and health
docker compose logs -f --tail 100 orders
docker compose restart orders
docker compose down                   # stop and remove. Volumes survive
```

### Updating

```bash
docker compose pull                   # fetch newer images
docker compose up -d                  # recreate only what changed
docker compose up -d --force-recreate orders
docker compose up -d --no-deps orders # without touching its dependencies
docker compose build --no-cache orders
```

### Inspecting

```bash
docker compose config                 # fully resolved file
docker compose config --services
docker compose exec orders sh
docker compose exec orders env | sort
docker compose top                    # processes per service
docker compose events                 # live stream of what Compose is doing
```

### One-off commands

```bash
docker compose run --rm orders npm run migrate
docker compose run --rm --no-deps orders node -e "console.log(process.version)"
```

- `run` creates a **new** container. `exec` uses the running one. `--rm` stops orphan containers accumulating
