## The deploy script

- A deploy is: pull the new image, start it, check it is healthy, remove the old one. **Written down once, it is repeatable and it is reviewable**

```bash
#!/usr/bin/env bash
# /srv/app/deploy.sh
set -euo pipefail

TAG="${1:?usage: deploy.sh <git-sha>}"
cd /srv/app

echo "==> deploying $TAG"
PREVIOUS=$(grep '^TAG=' .env | cut -d= -f2 || echo none)

export TAG
docker compose pull api

# migrations as their own step, before the new code serves traffic
docker compose run --rm api npx prisma migrate deploy

docker compose up -d --no-deps --wait --wait-timeout 90 api

# verify from outside the container
for i in $(seq 1 10); do
  if curl -fsS http://127.0.0.1:3000/health >/dev/null; then
    echo "==> healthy"
    sed -i "s/^TAG=.*/TAG=$TAG/" .env
    docker image prune -f
    exit 0
  fi
  sleep 3
done

echo "==> unhealthy, rolling back to $PREVIOUS" >&2
TAG="$PREVIOUS" docker compose up -d --no-deps --wait api
exit 1
```
