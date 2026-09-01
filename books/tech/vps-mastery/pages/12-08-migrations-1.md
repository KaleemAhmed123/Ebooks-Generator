## Migrations in a deploy

- A schema change has to run exactly once, before the code that needs it, and must not run twice if the deploy is retried

### Not on application startup

```ts
// wrong with more than one replica
await prisma.$executeRaw`ALTER TABLE orders ADD COLUMN ...`;
app.listen(8080);
```

- Twelve services starting at once run twelve migrations concurrently. Most migration tools take a lock, and the ones that do not corrupt the schema

### As a separate one-shot service

```yaml
migrate:
  image: ghcr.io/kaleem/orders:7f3a91c
  command: ["npx", "prisma", "migrate", "deploy"]
  env_file: [.env]
  depends_on:
    postgres: { condition: service_healthy }
  networks: [internal]
  restart: "no"

orders:
  depends_on:
    migrate: { condition: service_completed_successfully }
```

- `service_completed_successfully` waits for the migration container to exit 0. A failed migration stops the deploy before any application container starts
