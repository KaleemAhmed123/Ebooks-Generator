### The three that matter on every query

```ts
const orders = await Order
  .find({ sellerId, status: "paid" })
  .select("total status")
  .lean()
```

- `select` fetches fewer fields
- **`lean()` returns plain objects instead of Mongoose documents.** Several times faster, and the usual reason a read endpoint is slow
- Skip `lean()` only when you need `save()` or a virtual
