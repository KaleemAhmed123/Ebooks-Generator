## Docker Compose

- A service needs Postgres, Redis and itself. Starting three containers by hand, in order, with the right network, is not something to do twice
- **Compose describes the whole local stack in one file** and starts it with one command
- It is a development and small-deployment tool. In production the orchestrator is ECS, and Compose is not part of it

```yaml
services:
  api:
    build:
      context: .
      target: build
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgres://app:secret@db:5432/app
      REDIS_URL: redis://cache:6379
    volumes:
      - ./src:/app/src
    depends_on:
      db: { condition: service_healthy }
      cache: { condition: service_started }
