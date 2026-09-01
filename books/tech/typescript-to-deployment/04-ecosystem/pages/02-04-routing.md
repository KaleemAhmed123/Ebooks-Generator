## Routing

- A route is the pairing of an HTTP method with a path, and it is how Express decides which code answers a request
- Routes are matched **top to bottom, first match wins**, so order is behavior and not style

```js
app.get("/orders", listOrders)
app.post("/orders", createOrder)
app.get("/orders/:id", getOrder)
app.patch("/orders/:id", updateOrder)
app.delete("/orders/:id", deleteOrder)
```

- Every HTTP method has a matching function, plus `app.all` for all of them

### Path parameters

```js
app.get("/sellers/:sellerId/orders/:orderId", (req, res) => {
  const { sellerId, orderId } = req.params
})
```

- `req.params` values are always strings, because a URL has no types
- Coerce and validate them the moment they arrive, or a `NaN` reaches the database

### Ordering that bites

```js
app.get("/orders/:id", getOrder)      // this matches "/orders/export"
app.get("/orders/export", exportAll)  // so this never runs
```

- A literal path must be registered **before** a parameter path that could swallow it
