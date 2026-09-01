## The flip

- Two commands. Neither restarts anything

```bash
write_color_conf "$NEXT"

docker compose -p app-edge exec -T nginx nginx -t
docker compose -p app-edge exec -T nginx nginx -s reload

echo "$NEXT" > /srv/app/.active-color
```

### What happens during the reload

- Nginx starts new worker processes reading the new upstream file
- Old workers stop accepting new connections and finish the requests they are already serving
- **A request that started against blue completes against blue.** A request arriving after the reload goes to green

```text
t=0.00  reload issued
t=0.01  new workers accepting, pointing at green
t=0.01  old workers draining, still finishing blue requests
t=2.30  last old worker exits
```

- No connection is dropped. No request fails
