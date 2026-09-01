## Compose beyond the basics

### Overrides

- `docker-compose.yml` is the base. **`docker-compose.override.yml` is applied on top automatically**, and it is where development-only settings belong

```yaml
# docker-compose.override.yml, not committed to production use
services:
  api:
    build:
      target: build
    volumes:
      - ./src:/app/src
    command: npm run dev
    ports: ["9229:9229"]        # the Node inspector
```

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Profiles

```yaml
services:
  mailhog:
    image: mailhog/mailhog
    profiles: ["dev"]
  grafana:
    image: grafana/grafana
    profiles: ["observability"]
```

```bash
docker compose up -d                          # only the unprofiled services
docker compose --profile observability up -d  # plus Grafana
```

- **Profiles are how one compose file serves several purposes** without everyone running the full stack
