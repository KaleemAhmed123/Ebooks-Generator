## Idempotency keys

- A client sends `POST /orders`, the connection drops, and it has no idea whether the order was created
- Retrying might duplicate. Not retrying might lose the order. Neither is acceptable when money is involved
- An **idempotency key** lets the client say this is a retry of that request, not a new one

```http
POST /api/v1/orders
Idempotency-Key: 8f14e45f-1a2b-4c3d
```

```ts
const existing = await db.idempotencyKey.findUnique({ where: { key } })
if (existing) return res.status(existing.status).json(existing.response)

const result = await db.$transaction(async (tx) => {
  const order = await tx.order.create({ data })
  await tx.idempotencyKey.create({
    data: { key, status: 201, response: order, endpoint: req.path },
  })
  return order
})
```

### The details that make it correct

- **The client generates the key**, once, and reuses it on every retry. Generating it server-side defeats the purpose
- **Store the response, not just the fact.** A retry must get the same body, not a 409
- **Store it in the same transaction as the work**, or two concurrent retries both find nothing and both create
- **Scope the key to the endpoint** so the same key on a different route is not silently matched
- **Expire them**, usually after 24 hours, or the table grows forever
