## The file, top to bottom - continued

```yaml
postgres:
    image: postgres:18-alpine
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      retries: 5
    restart: unless-stopped

volumes:
  pgdata:
```

- Three top-level keys are used in practice: `services`, `volumes`, `networks`
- The pages that follow take one key each
