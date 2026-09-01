## Parsing bodies

- Express does not read the request body unless you tell it to, because the right parser depends on the content type

```js
app.use(express.json({ limit: "1mb" }))
app.use(express.urlencoded({ extended: true, limit: "1mb" }))
```

- `express.json` handles `application/json`
- `express.urlencoded` handles HTML form posts
- `extended: true` allows nested objects through `qs`, `false` keeps it flat

### The limit is a defense, not a preference

- The default is 100kb
- Without a limit a client can post a gigabyte and hold your memory while it uploads
- Raise it deliberately per route rather than globally

```js
app.post("/import", express.json({ limit: "10mb" }), importOrders)
```

### Keeping the raw body for a signature

```js
app.use(express.json({
  verify: (req, res, buf) => { req.rawBody = buf },
}))
```

- Payment webhooks sign the exact bytes sent
- Parsing to an object and re-serializing changes key order and whitespace, so the signature will never match
- `verify` hands you the untouched buffer before parsing
