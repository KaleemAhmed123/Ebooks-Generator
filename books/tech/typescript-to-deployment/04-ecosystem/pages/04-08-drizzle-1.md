## Drizzle

- Prisma generates a client, which means a build step, a large engine, and a query language that is not SQL
- On serverless and edge that engine is a real cost, and for anyone who already knows SQL the translation layer is friction
- Drizzle keeps the type safety and drops the generation. The schema is written in TypeScript, and the types are inferred from it
- Its query builder is shaped like SQL on purpose. `select().from().where()` reads the way the query will run
- Nothing is hidden, so what you write is what the database receives, which makes performance work far easier to reason about
- The trade is that it does less for you. There is no Studio, and less hand-holding on migrations
- It also means you have to know SQL. Drizzle will not protect a developer who does not
- Created by Andrew Sherman and Alex Blokh, first released in 2022
- Version 0.45.2

```bash
npm i drizzle-orm pg && npm i -D drizzle-kit
```

```ts
import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core"

export const orders = pgTable("orders", {
  id: text("id").primaryKey(),
  sellerId: text("seller_id").notNull(),
  total: integer("total").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})
```

```ts
import { eq, and, desc } from "drizzle-orm"

const rows = await db
  .select({ id: orders.id, total: orders.total })
  .from(orders)
  .where(and(eq(orders.sellerId, sellerId), eq(orders.status, "paid")))
  .orderBy(desc(orders.createdAt))
  .limit(20)
```
