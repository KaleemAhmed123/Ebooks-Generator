## The env file, done right

```bash
cd /srv/app
chmod 600 .env
chown kaleem:kaleem .env
ls -l .env
# -rw------- 1 kaleem kaleem 1204 Aug 30 09:14 .env
```

- `600` means only the owner can read it. `644`, the default, means every account on the box can

### Keep the example committed

```text
# .env.example  - committed. Values are empty on purpose
NODE_ENV=production
DATABASE_URL=
REDIS_URL=
JWT_SECRET=
STRIPE_SECRET_KEY=
```

- This is the checklist during a rebuild. Without it, restoring means guessing which variables existed

### Fail loudly on a missing value

```yaml
environment:
  JWT_SECRET: ${JWT_SECRET:?JWT_SECRET is not set}
```

```ts
const required = ["DATABASE_URL", "JWT_SECRET", "REDIS_URL"];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`missing environment: ${missing.join(", ")}`);
  process.exit(1);
}
```

- A service that starts with an empty signing key accepts every forged token. Refusing to start is the correct behavior
