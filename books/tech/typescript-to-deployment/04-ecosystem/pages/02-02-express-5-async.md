## Express 5 handles async errors on its own

- The single best reason to upgrade, and most teams have not noticed

### Express 4

```js
app.get("/orders/:id", async (req, res, next) => {
  try {
    const order = await db.orders.findUnique({ where: { id: req.params.id } })
    res.json(order)
  } catch (err) {
    next(err)          // forget this and the request hangs forever
  }
})
```

- A rejected promise was never caught. The request hung until the client timed out
- That is why `express-async-handler` and `express-async-errors` existed

### Express 5

```js
app.get("/orders/:id", async (req, res) => {
  const order = await db.orders.findUnique({ where: { id: req.params.id } })
  res.json(order)
})
```

- A rejected promise goes to the error middleware automatically
- No `try`, no `next(err)`, no wrapper package

### What to delete after upgrading

```bash
npm uninstall express-async-handler express-async-errors
```

- Then search for `asyncHandler(` and `catch (err) { next(err) }` and remove them too
