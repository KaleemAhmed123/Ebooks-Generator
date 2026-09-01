### Content negotiation

```js
if (req.accepts("json")) return res.json(orders)
if (req.accepts("csv")) return res.send(toCsv(orders))
res.sendStatus(406)
```

- `req.is("application/json")` checks what the client **sent**, `req.accepts` checks what it will **take**

### Attaching your own data

```js
req.user = await loadUser(token)
```

- Middleware communicates with later handlers by hanging values off `req`
- In TypeScript this needs module augmentation, which Booklet 1 covers under `declare global`
