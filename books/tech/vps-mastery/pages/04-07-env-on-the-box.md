## Where configuration lives on the box

- Code comes from Git. Configuration does not. It never enters the repository

```bash
cd /srv/app
cp .env.example .env
nano .env
chmod 600 .env
```

- `.env.example` is committed with every key and no values. It is the checklist for a rebuild
- `.env` is `600` and owned by the deploy user. Group-readable configuration means every account on the box can read the database password

### A minimal file

```text
NODE_ENV=production
PORT=8080
DATABASE_URL=postgresql://app:REDACTED@postgres:5432/marketplace
REDIS_URL=redis://redis:6379
JWT_SECRET=REDACTED
PUBLIC_BASE_URL=https://example.com
```

- Hostnames are **service names**, not `localhost`. Inside the Docker network, `postgres` resolves to the database container. Page 06-04 explains why

### Confirm it is not tracked

```bash
git check-ignore -v .env
# .gitignore:12:.env    .env
```

- No output means the file is tracked and one careless `git add -A` publishes every secret

### What happens when it is lost

- The box burns, `.env` goes with it, and nothing starts. Module 11 covers keeping an encrypted copy somewhere else, and Module 16 makes restoring it step three of the rebuild
