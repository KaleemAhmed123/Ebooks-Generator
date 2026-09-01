## Error handling end to end

- Express funnels every failure into one place, and that is the point of the error middleware
- Anything thrown in a handler, sync or async on version 5, arrives there

```js
// errors.js
export class AppError extends Error {
  constructor(code, status, message, options) {
    super(message, options)
    this.code = code
    this.status = status
  }
}

export const notFound = (what) => new AppError("not_found", 404, `${what} not found`)
export const forbidden = () => new AppError("forbidden", 403, "not allowed")
```

```js
// handler
app.get("/orders/:id", async (req, res) => {
  const order = await db.orders.findUnique({ where: { id: req.params.id } })
  if (!order) throw notFound("order")
  if (order.sellerId !== req.user.sellerId) throw forbidden()
  res.json(order)
})
```

```js
// the only place that formats an error response
app.use((err, req, res, next) => {
  const status = err.status ?? 500
  const code = err.code ?? "internal"
