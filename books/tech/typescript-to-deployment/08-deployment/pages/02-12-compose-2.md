## Docker Compose - continued

db:
    image: postgres:18-alpine
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: app
    volumes: ["pgdata:/var/lib/postgresql/data"]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 5s
      retries: 10

  cache:
    image: redis:8-alpine

volumes:
  pgdata:
```

- **`depends_on` with `condition: service_healthy` waits for the health check**, not merely for the container to exist. Without it the application starts before Postgres accepts connections
- No `ports:` on `db` or `cache`, so they are reachable from `api` and from nothing else
- The `version:` key at the top is obsolete and Compose warns about it
