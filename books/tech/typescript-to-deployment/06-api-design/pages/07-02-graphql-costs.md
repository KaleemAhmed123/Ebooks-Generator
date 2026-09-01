## What GraphQL costs

### The N+1 problem

- A resolver runs per field per object. Asking for 50 orders and each order's seller runs the seller resolver 50 times
- One query for the orders, then fifty for the sellers. The client sees one request. The database sees fifty-one

```ts
const sellerLoader = new DataLoader(async (ids: readonly string[]) => {
  const sellers = await db.seller.findMany({ where: { id: { in: [...ids] } } })
  return ids.map((id) => sellers.find((s) => s.id === id))
})

const resolvers = {
  Order: { seller: (order) => sellerLoader.load(order.sellerId) },
}
```

- **DataLoader** collects the ids requested within one tick and issues a single query
- It is not optional on any real GraphQL server. Without it the N+1 is guaranteed rather than possible

### The other four

- **HTTP caching is gone.** Everything is a `POST` to one URL, so CDNs and browser caches cannot help. You cache inside the server instead
- **Query cost is unbounded.** A deeply nested query can be enormously expensive. Production servers need depth limits, complexity scoring and persisted queries
- **Authorization moves into every resolver.** Any field can be reached from any path, so a check on the top-level query is not enough
- **Errors arrive as `200`.** Failures live in an `errors` array, so monitoring built on status codes sees nothing wrong

### When it earns its place

- Many different clients with different shapes, especially mobile alongside web
- A graph-shaped domain where callers genuinely traverse relationships
- **Not** for a single first-party client. There REST plus an `expand` parameter is less machinery for the same result
