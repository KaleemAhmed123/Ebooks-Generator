## PostgreSQL in Compose

```yaml
postgres:
  image: postgres:18-alpine
  environment:
    POSTGRES_DB: marketplace
    POSTGRES_USER: app
    POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?required}
    PGDATA: /var/lib/postgresql/data/pgdata
  volumes:
    - pgdata:/var/lib/postgresql/data
    - ./db/init:/docker-entrypoint-initdb.d:ro
  command:
    - "postgres"
    - "-c" 
    - "max_connections=100"
    - "-c"
    - "shared_buffers=512MB"
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U app -d marketplace"]
    interval: 10s
    retries: 5
    start_period: 20s
  deploy:
    resources:
      limits: { memory: 1G }
  networks: [internal]
  restart: unless-stopped
```

- **No `ports` entry.** Nothing outside the Docker network needs to reach the database

### The `PGDATA` subdirectory

- Pointing `PGDATA` at a subdirectory of the mount avoids failures when the volume root contains a `lost+found` directory, which happens on some providers

### Initialization scripts run once

- Files in `/docker-entrypoint-initdb.d` execute **only when the data directory is empty**. Adding one later does nothing
- Schema changes belong in migrations, covered on page 12-08
