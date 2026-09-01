## Laying out the application

- One directory, one compose file, one environment file. **Everything about the running system is visible in one place**

```text
/srv/app/
  compose.yml            # committed to the repo, deployed here
  .env                   # secrets, 600, never in git
  caddy/Caddyfile
  data/                  # bind-mounted volumes, so backups are one path
    postgres/
    redis/
```

```yaml
# /srv/app/compose.yml
services:
  api:
    image: ghcr.io/acme/orders-api:${TAG:?TAG is required}
    restart: unless-stopped
    env_file: [.env]
    ports: ["127.0.0.1:3000:3000"]
    depends_on:
      db: { condition: service_healthy }
    healthcheck:
      test: ["CMD", "node", "-e", "fetch('http://127.0.0.1:3000/health').then(r=>process.exit(r.ok?0:1))"]
      interval: 20s
      start_period: 20s
    stop_grace_period: 45s
    logging: { driver: json-file, options: { max-size: '20m', max-file: '5' } }

  db:
    image: postgres:18-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?}
      POSTGRES_DB: app
    volumes: ["./data/postgres:/var/lib/postgresql/data"]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 5s
