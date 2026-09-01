## Long polling

- Ordinary polling asks every few seconds and is told no almost every time, which wastes both sides
- **Long polling** keeps the request open instead. The server holds it until something happens or a timeout expires, then answers
- The client immediately opens another one, so there is nearly always a request in flight waiting to be answered
- It is plain HTTP, which is the entire reason it still exists after WebSockets and SSE

```ts
app.get("/api/v1/jobs/:id/wait", async (req, res) => {
  const timeout = Math.min(Number(req.query.timeout) || 30, 60) * 1000
  const deadline = Date.now() + timeout

  while (Date.now() < deadline) {
    const job = await db.job.findUnique({ where: { id: req.params.id } })
    if (job.status !== "running") return res.json(job)
    if (req.destroyed) return
    await sleep(1000)
  }

  res.status(200).json({ status: "running", timedOut: true })
})
```

- A real implementation waits on a Redis subscription rather than sleeping in a loop, which removes the polling underneath

### Where it still wins

- Corporate proxies that block WebSocket upgrades and buffer SSE will pass this, because it is an ordinary request
- Serverless platforms with no persistent connections can serve it, within the function timeout
- Any HTTP client can consume it, including ones with no streaming support at all

### What it costs

- **One held connection per waiting client**, same as SSE, so connection limits still apply
- Keep the hold under the load balancer's idle timeout, or it kills the request and the client sees an error
- Return a normal response on timeout rather than an error, so the client simply asks again
