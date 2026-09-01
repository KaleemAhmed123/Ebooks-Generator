## Following a request across services

- Once a request touches four services, no single log file contains the story, and the useful question becomes which hop failed
- A **correlation id** is generated once at the edge and carried by every call that request makes

```ts
app.use((req, res, next) => {
  const id = req.get("x-request-id") ?? randomUUID()
  res.set("x-request-id", id)
  context.run({ requestId: id }, next)      // AsyncLocalStorage, Booklet 3
})

await fetch(url, { headers: { "x-request-id": getRequestId() } })
```

- Log it on every line, in every service, and one search reconstructs the whole path
- **Accept an inbound id if one is present**, or the chain breaks at your service and starts again

### Tracing goes further

- A correlation id joins log lines. A **trace** adds timing and parentage, so you see which hop spent the four seconds
- OpenTelemetry propagates it through the standard `traceparent` header, and Booklet 4 covers the setup

### What to return to the caller

```json
{ "type": "...", "title": "Internal error", "status": 500, "requestId": "r_8f14e45f" }
```

- The id is safe to expose and turns a support ticket into a single log query
- The stack trace is not safe to expose, and belongs in your logs only
