## The file, top to bottom

```yaml
services:
  orders:
    image: marketplace/orders:7f3a91c
    build:
      context: .
      dockerfile: docker/Dockerfile.service
      args:
        SERVICE: orders
    env_file: [.env]
    environment:
      SERVICE_NAME: orders
    ports:
      - "127.0.0.1:8080:8080"
    depends_on:
      postgres:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "node", "-e", "fetch('http://127.0.0.1:8080/healthz').then(r=>process.exit(r.ok?0:1))"]
      interval: 30s
      timeout: 3s
      start_period: 20s
      retries: 3
    deploy:
      resources:
        limits: { memory: 512M, cpus: "0.50" }
    restart: unless-stopped
```
