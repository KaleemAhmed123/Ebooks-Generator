### Where it earns its place on a backend

- Database rows almost always carry shared columns. Timestamps, soft-delete flags, tenant ids
- Write those once and intersect them in

```ts
type WithId<T> = T & { id: string }
type WithTimestamps<T> = T & Timestamps

type OrderRow = WithTimestamps<WithId<{ total: number }>>
```

### Union vs intersection, in one line

- Union `|` = **either**, and you get the properties they share
- Intersection `&` = **both**, and you get everything
