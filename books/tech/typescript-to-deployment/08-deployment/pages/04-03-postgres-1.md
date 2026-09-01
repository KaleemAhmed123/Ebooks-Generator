## PostgreSQL

```yaml
  db:
    image: postgres:18-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?}
      POSTGRES_DB: app
      POSTGRES_INITDB_ARGS: '--data-checksums'
    command:
      - postgres
      - -c=shared_buffers=1GB
      - -c=effective_cache_size=3GB
      - -c=maintenance_work_mem=256MB
      - -c=work_mem=16MB
      - -c=max_connections=100
      - -c=random_page_cost=1.1
      - -c=log_min_duration_statement=1000
      - -c=shared_preload_libraries=pg_stat_statements
    volumes:
      - ./data/postgres:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 5s
      start_period: 30s
    deploy: { resources: { limits: { memory: 4G } } }
```
