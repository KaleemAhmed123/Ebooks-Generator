## The most common API vulnerability

- **BOLA**, broken object level authorization, also called IDOR
- It sits at the top of the OWASP API list because it is easy to write and invisible in review

```ts
// authenticated, and completely broken
router.get("/orders/:id", requireAuth, async (req, res) => {
  const order = await db.order.findUnique({ where: { id: req.params.id } })
  res.json(order)
})
```

- Every seller is authenticated. Every seller can now read every other seller's orders by changing a number in the URL
- No error appears in any log, because nothing failed

```ts
router.get("/orders/:id", requireAuth, async (req, res) => {
  const order = await db.order.findFirst({
    where: { id: req.params.id, sellerId: req.user.sellerId },
  })
  if (!order) throw new AppError("not_found", 404, "order not found")
  res.json(order)
})
```

### Why the scope goes in the query

- Fetching then comparing works, and it is one forgotten `if` away from the bug
- Putting the owner in the `where` clause means the wrong row is never loaded at all
- Returning `404` rather than `403` also avoids confirming that the id exists

### Where to check it

- Every endpoint taking an id from the caller. Reads included, not only writes
- Nested routes too. `/sellers/s1/orders` must verify the caller may act as `s1`, not just that they are signed in
