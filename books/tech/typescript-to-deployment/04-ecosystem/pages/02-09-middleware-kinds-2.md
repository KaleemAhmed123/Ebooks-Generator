### Writing one

```js
export function requestId(req, res, next) {
  req.id = req.get("x-request-id") ?? randomUUID()
  res.set("x-request-id", req.id)
  next()
}
```

- Call `next()` to continue, `next(err)` to jump to the error handler, or send a response to stop
- Doing none of the three hangs the request until the client gives up
