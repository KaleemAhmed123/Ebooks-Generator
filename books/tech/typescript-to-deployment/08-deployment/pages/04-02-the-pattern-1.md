## The shape every self-hosted service needs

- Every service in this module gets the same six things. **Miss one and it is the one that bites**

```yaml
  service-name:
    image: vendor/thing:8.3               # 1. pinned, not latest
    restart: unless-stopped
    environment:
      THING_PASSWORD: ${THING_PASSWORD:?}  # 2. from .env, never inline
    volumes:
      - ./data/thing:/var/lib/thing        # 3. persistent, in one backup path
    healthcheck:                           # 4. so depends_on and deploys work
      test: ["CMD", "thing-cli", "ping"]
      interval: 10s
      start_period: 30s
    deploy:
      resources:
        limits: { memory: 1G }             # 5. it cannot take the box down
    logging:
      driver: json-file
      options: { max-size: '20m', max-file: '5' }   # 6. it cannot fill the disk
    # note: no ports. It is reachable by name and from nowhere else
```
