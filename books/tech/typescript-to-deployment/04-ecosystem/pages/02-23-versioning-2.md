### Cursor over offset

```js
const orders = await db.orders.findMany({
  where: { sellerId },
  cursor: cursor ? { id: cursor } : undefined,
  skip: cursor ? 1 : 0,
  take: 20,
  orderBy: { id: "desc" },
})
```

- `OFFSET 10000` makes the database count and discard ten thousand rows every time
- A cursor seeks straight to a position, and rows inserted during paging cannot shift the window
