## Cheatsheet: deploy and rollback

### What is live right now

```bash
cat /srv/app/.active-color                    # blue
cat /srv/app/.active-color.prev               # green
grep server /srv/app/edge/conf.d/active-color.conf
docker ps --format "table {{.Names}}\t{{.Status}}" | sort
curl -sI https://example.com/api/version | grep -i x-app-version
```

### Deploy

```bash
IMAGE_TAG=7f3a91c /srv/app/scripts/deploy.sh
```

### Roll back, old color still running

```bash
PREV=$(cat /srv/app/.active-color.prev)
/srv/app/scripts/write-color.sh "$PREV"
docker compose -p app-edge exec -T nginx nginx -t
docker compose -p app-edge exec -T nginx nginx -s reload
echo "$PREV" > /srv/app/.active-color
```

### Roll back, old color already removed

```bash
IMAGE_TAG=6b2d40e ROLLBACK=1 /srv/app/scripts/deploy.sh
```

### Watching a deploy from another machine

```bash
while true; do
  curl -s -o /dev/null -w "%{http_code} %{time_total}\n" https://example.com/api/healthz
  sleep 0.2
done
```
