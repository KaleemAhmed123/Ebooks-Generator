### Server-sent events

```js
app.get("/orders/:id/events", async (req, res) => {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  })
  res.flushHeaders()

  const timer = setInterval(() => {
    res.write(`data: ${JSON.stringify({ at: Date.now() })}\n\n`)
  }, 5000)

  req.on("close", () => clearInterval(timer))
})
```

- One-way live updates without the weight of WebSockets
- `req.on("close")` is required. Without it the interval runs forever after the client leaves
