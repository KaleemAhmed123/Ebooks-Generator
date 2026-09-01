## The dev-mode client leak

- In development, Next.js hot reloads modules on every save
- A new `PrismaClient` per reload means a new pool per reload
- After twenty saves the database is out of connections and you blame your query

### The fix everyone copies, and why it works

```ts
// lib/db.ts
import { PrismaClient } from "@prisma/client"

const globalForDb = globalThis as unknown as { db?: PrismaClient }

export const db = globalForDb.db ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForDb.db = db
}
```

- `globalThis` survives a hot reload. The module does not
- So the client is created once and reused
- The guard keeps it out of production, where there is no reload and a global is just a global

- Same pattern applies to a Redis client, a Mongo client, or anything else holding a socket
