## Prisma - continued

```prisma
// prisma/schema.prisma
model Order {
  id        String   @id @default(cuid())
  sellerId  String
  total     Int
  status    Status   @default(PENDING)
  items     Item[]
  createdAt DateTime @default(now())

  @@index([sellerId, status])
}

enum Status { PENDING PAID SHIPPED }
```

```bash
npx prisma migrate dev --name init    # create and apply a migration
npx prisma generate                   # regenerate the client
npx prisma studio                     # browse the data in a browser
```

```ts
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const order = await prisma.order.findUnique({
  where: { id: "o1" },
  include: { items: true },
})
```

- `order` is fully typed, including `items`, with no manual type written
