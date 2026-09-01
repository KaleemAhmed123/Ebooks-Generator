## Laying out the application - continued

redis:
    image: redis:8-alpine
    restart: unless-stopped
    command: ["redis-server", "--appendonly", "yes", "--maxmemory-policy", "noeviction"]
    volumes: ["./data/redis:/data"]
```

### The decisions in that file

- **No `ports:` on `db` or `redis`.** They are reachable from `api` by name and from nowhere else
- **Bind mounts under `./data`, not named volumes.** One directory to back up, and you can see what is there
- **`noeviction` on Redis**, because it holds queues here. `allkeys-lru` would silently drop jobs, as Part Four explains
- **`${TAG:?}` fails loudly** rather than starting whatever was last pulled
