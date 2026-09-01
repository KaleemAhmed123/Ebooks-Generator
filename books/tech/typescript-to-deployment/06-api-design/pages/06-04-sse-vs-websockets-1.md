## Streaming to a client

- Two ways to push data to a browser, and they are not interchangeable

| | Server-sent events | WebSocket |
|---|---|---|
| Direction | server to client only | both ways |
| Protocol | plain HTTP | its own protocol after an upgrade |
| Reconnects | automatic, built in | you write it |
| Proxies and firewalls | usually fine, it is HTTP | sometimes blocked |
| Message format | text only | text or binary |
| Connection cost | one per client | one per client |

```ts
res.set({
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
  "X-Accel-Buffering": "no",
})
res.flushHeaders()

res.write(`id: 42\ndata: ${JSON.stringify({ status: "shipped" })}\n\n`)

req.on("close", () => clearInterval(timer))
```
