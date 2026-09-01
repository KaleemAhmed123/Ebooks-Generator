## Overrides and profiles

### Override files

- Compose merges `docker-compose.yml` with `docker-compose.override.yml` automatically when both exist
- Keep the shared definition in the base file and the differences in overrides

```bash
docker compose \
  -f docker-compose.yml \
  -f docker-compose.prod.yml up -d
```

```yaml
# docker-compose.prod.yml
services:
  orders:
    build: !reset null          # do not build. Use the pulled image
    image: ghcr.io/kaleem/orders:7f3a91c
    ports: []                   # nothing published. Nginx reaches it internally
```

- Later files win for scalars. **Lists are appended, not replaced**, which surprises people with `ports` and `volumes`. `!reset` clears a key outright
