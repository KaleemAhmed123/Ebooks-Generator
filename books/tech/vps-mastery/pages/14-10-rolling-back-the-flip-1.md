## Rolling back the flip

- While the old color is still running, rollback is one config write and one reload

```bash
write_color_conf "$CURRENT"
docker compose -p app-edge exec -T nginx nginx -t
docker compose -p app-edge exec -T nginx nginx -s reload
echo "$CURRENT" > /srv/app/.active-color
```

- **Under two seconds**, because nothing starts, stops, pulls or builds

### The automatic version

```bash
if ! post_flip_check; then
  echo "post-flip check failed, reverting to $CURRENT"
  write_color_conf "$CURRENT"
  docker compose -p app-edge exec -T nginx nginx -s reload
  echo "$CURRENT" > /srv/app/.active-color
  exit 1
fi
```

```bash
post_flip_check() {
  local fails=0
  for _ in $(seq 1 20); do
    curl -fsS --max-time 3 https://example.com/api/healthz > /dev/null || fails=$((fails+1))
    sleep 1
  done
  [ "$fails" -le 2 ]
}
```

- Twenty seconds of real traffic through the public path. Tolerating two failures avoids reverting on one unlucky timeout
