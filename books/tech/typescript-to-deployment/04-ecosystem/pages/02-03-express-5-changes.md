## The rest of Express 5

### Path patterns changed

```js
app.get("/files/*", handler)          // Express 4
app.get("/files/*splat", handler)     // Express 5, the wildcard needs a name

app.get("/orders/:id?", handler)      // Express 4
app.get(["/orders", "/orders/:id"], handler)   // Express 5
```

- `path-to-regexp` was upgraded to close a denial of service class of bug
- An unnamed `*` now throws at startup, which is the most common upgrade error

### `req.query` is a getter

- It is parsed once and cached. Assigning to it no longer works
- The default parser is `simple`, not `extended`, so `qs` nested syntax is off unless you ask

```js
app.set("query parser", "extended")
```

### `res.status` validates

```js
res.status(700)   // RangeError, instead of silently sending a broken response
```

### Removed

- `res.send(status)`, `res.json(obj, status)`, `res.sendfile`, `app.del`
- `req.param(name)`. Read `req.params`, `req.body` or `req.query` explicitly

### Node floor

- Express 5 requires Node 18 or newer
