### Cache headers on API responses

```js
res.set("Cache-Control", "public, max-age=300")        // catalog, safe to share
res.set("Cache-Control", "private, max-age=60")        // per user
res.set("Cache-Control", "no-store")                   // anything with money or auth
```

- `no-store` on authenticated responses stops a shared proxy handing one seller's orders to another

### Conditional requests

```js
const etag = `"${order.updatedAt.getTime()}"`
if (req.get("if-none-match") === etag) return res.sendStatus(304)
res.set("ETag", etag).json(order)
```

- A 304 sends no body, which is the cheapest possible successful response
