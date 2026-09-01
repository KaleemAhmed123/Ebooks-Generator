## The two-container starting point

- Almost every stack starts here. A frontend, an API, and a database that arrives soon after

```yaml
services:
  shop-ui:
    image: ghcr.io/kaleem/shop-ui:7f3a91c
    env_file: [.env]
    expose: ["3000"]
    restart: unless-stopped

  api:
    image: ghcr.io/kaleem/api:7f3a91c
    env_file: [.env]
    expose: ["8080"]
    depends_on:
      postgres: { condition: service_healthy }
    restart: unless-stopped

  postgres:
    image: postgres:18-alpine
    environment:
      POSTGRES_DB: marketplace
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes: [pgdata:/var/lib/postgresql/data]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d marketplace"]
      interval: 10s
      retries: 5
    restart: unless-stopped
```
