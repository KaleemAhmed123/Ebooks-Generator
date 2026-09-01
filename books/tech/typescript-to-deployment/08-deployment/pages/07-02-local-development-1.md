## Local development

- The goal is that **a new engineer clones the repository and has a working system in one command**. Every hour past that is paid by every person who joins

```bash
git clone git@github.com:acme/orders-api.git && cd orders-api
cp .env.example .env
make dev
```

```makefile
dev:            ## start everything and seed
	docker compose up -d --wait db redis
	npm ci
	npx prisma migrate deploy
	npm run seed
	npm run dev

reset:          ## throw it all away and start again
	docker compose down -v
	$(MAKE) dev

test:
	docker compose up -d --wait db-test
	npx vitest run
```

### The parts that matter

- **Real Postgres and Redis in containers, the same major versions as production.** SQLite locally and Postgres in production is two different programs
- **`.env.example` is committed with every key and no values.** A missing variable then fails at boot with a name, as Module 1 requires
- **A `reset` target.** Being able to destroy and rebuild the local database in thirty seconds is what makes people willing to test migrations
