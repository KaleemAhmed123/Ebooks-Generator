## The response object

- `res` wraps Node's `ServerResponse`, and its job is to build one reply and send it exactly once

```js
res.json({ id: "o1" })                    // sets content-type, serializes
res.status(201).json(order)               // chainable
res.send("plain text")                    // guesses the content type
res.sendStatus(204)                       // status plus its standard text
res.redirect(302, "/login")
res.set("x-request-id", id)               // one header
res.set({ "x-a": "1", "x-b": "2" })       // several
res.type("text/csv")
res.end()                                 // no body at all
```

### Send once, and only once

```js
if (!order) res.status(404).json({ code: "not_found" })
res.json(order)   // ERR_HTTP_HEADERS_SENT, both ran
```

- Missing `return` before a `res` call is the most common Express bug there is
- Make every response `return res.…` as a habit and the class of bug disappears

### Downloads and files

```js
res.download("/tmp/orders.csv", "orders.csv")   // sets Content-Disposition
res.sendFile(path.resolve("reports", name))     // absolute path required
res.attachment("orders.csv")                    // header only, you write the body
```

- `res.sendFile` with a user-supplied name is a path traversal hole. Resolve and verify the result stays inside the directory
