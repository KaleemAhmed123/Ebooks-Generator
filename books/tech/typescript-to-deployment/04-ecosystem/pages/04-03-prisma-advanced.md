## Prisma, the parts people miss

### Typed raw SQL

```ts
const rows = await prisma.$queryRaw<{ id: string; total: number }[]>`
  SELECT id, total FROM "Order" WHERE "sellerId" = ${sellerId}
`
```

- The tagged template parameterizes the values, so it is not string concatenation
- `$queryRawUnsafe` does not. Never pass user input to it

### Driver adapters

```ts
import { PrismaPg } from "@prisma/adapter-pg"

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) })
```

- Uses a normal `pg` pool instead of Prisma's own engine
- Required for serverless and edge, and it lets you tune the pool yourself

### Connection limits

```
postgresql://user:pass@host:5432/db?connection_limit=5&pool_timeout=20
```

- Default is `num_cpus * 2 + 1`, which is far too many across many containers

### Migrations in production

```bash
npx prisma migrate deploy    # apply pending migrations, never generate
```

- `migrate dev` is for your laptop. It can reset the database
- `migrate deploy` is the one for CI and for a release step

### Prisma 8

- In release candidate. Read the upgrade guide before pinning it in production
