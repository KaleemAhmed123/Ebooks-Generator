## Authentication and authorization middleware

- Two separate questions, and collapsing them into one middleware is where access bugs come from
- **Authentication** is who you are. **Authorization** is what you may do

```js
export async function requireAuth(req, res, next) {
  const token = req.cookies.session ?? req.get("authorization")?.slice(7)
  if (!token) throw new AppError("unauthenticated", 401, "no token")

  const { payload } = await jwtVerify(token, key)
  req.user = { id: payload.sub, role: payload.role }
  next()
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) throw new AppError("forbidden", 403, "denied")
    next()
  }
}
```

```js
router.get("/orders", requireAuth, listOrders)
router.delete("/orders/:id", requireAuth, requireRole("admin"), deleteOrder)
```

### The check middleware cannot do

```js
router.patch("/orders/:id", requireAuth, requireRole("seller"), async (req, res) => {
  const order = await db.orders.findUnique({ where: { id: req.params.id } })
  if (order.sellerId !== req.user.sellerId) throw new AppError("forbidden", 403, "not yours")
  ...
})
```

- Middleware knows the role. It does not know whether **this seller owns this order**
- Ownership needs the row, so it belongs in the handler or the service
- A role check alone lets any seller edit any other seller's order
