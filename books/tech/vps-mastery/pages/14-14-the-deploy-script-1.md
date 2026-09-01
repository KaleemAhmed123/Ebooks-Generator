## The whole deploy script

```bash
#!/usr/bin/env bash
set -euo pipefail

cd /srv/app
: "${IMAGE_TAG:?IMAGE_TAG is required}"

exec 9>/var/lock/deploy.lock
flock -n 9 || { echo "another deploy is running"; exit 1; }

CURRENT=$(cat .active-color 2>/dev/null || echo blue)
NEXT=$([ "$CURRENT" = "blue" ] && echo green || echo blue)
COMPOSE="docker compose -p app-$NEXT -f app/docker-compose.yml"
EDGE="docker compose -p app-edge -f edge/docker-compose.yml"

echo "current=$CURRENT next=$NEXT tag=$IMAGE_TAG"

# 1. pull, while the old stack keeps serving
export COLOR="$NEXT" IMAGE_TAG
$COMPOSE pull

# 2. back up, then migrate. Additive changes only
docker compose -p app-data exec -T postgres \
  pg_dump -U app -d marketplace --format=custom \
  > "backups/pre-deploy-$(date +%F-%H%M).dump"
$COMPOSE run --rm migrate

# 3. start the new color. No traffic reaches it yet
$COMPOSE up -d --remove-orphans

# 4. gate
wait_healthy "app-$NEXT" || { echo "unhealthy"; $COMPOSE down; exit 1; }
smoke "$NEXT"            || { echo "smoke failed"; $COMPOSE down; exit 1; }
```
