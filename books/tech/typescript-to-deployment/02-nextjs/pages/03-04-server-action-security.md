## Server Action security

- This is the page people skip and then get wrong
- **A Server Action is a public HTTP endpoint.** It has a URL. Anyone can call it

### It is not protected by being imported in one place

- The button that calls it may be hidden behind a permissions check
- The endpoint is not
- Someone can call it with any argument they like, from anywhere

### So every action does its own work

```ts
"use server"

import { z } from "zod"

const Input = z.object({ orderId: z.string() })

export async function cancelOrder(raw: unknown) {
  const session = await getSession()
  if (!session) throw new Error("unauthorized")

  const { orderId } = Input.parse(raw)

  const order = await db.orders.findUnique({ where: { id: orderId } })
  if (order?.sellerId !== session.sellerId) throw new Error("forbidden")

  await db.orders.update({ where: { id: orderId }, data: { status: "cancelled" } })
}
```

- Authenticate. Validate. Authorize on the actual row. Then act
- The same four steps you would write in an Express handler, because it is the same exposure
