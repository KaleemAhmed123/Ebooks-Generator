### The script on the server

```bash
#!/usr/bin/env bash
set -euo pipefail
cd /srv/app

: "${IMAGE_TAG:?IMAGE_TAG is required}"
echo "IMAGE_TAG=$IMAGE_TAG" > .env.tag

echo "$GHCR_TOKEN" | docker login ghcr.io -u kaleem --password-stdin
docker compose --env-file .env --env-file .env.tag pull
docker compose --env-file .env --env-file .env.tag up -d --remove-orphans

for i in $(seq 1 30); do
  if curl -fsS http://127.0.0.1:8080/healthz > /dev/null; then
    echo "healthy after ${i}s"
    docker image prune -f
    exit 0
  fi
  sleep 1
done

echo "health check failed, rolling back"
docker compose --env-file .env --env-file .env.tag.prev up -d
exit 1
```

### The health loop is the important part

- Without it the script reports success the moment containers start, which is before the application has connected to anything
- **A deploy that does not verify is a deploy that reports success while the site returns 502**

- This version still has a gap between `up -d` and healthy. Module 14 closes it
