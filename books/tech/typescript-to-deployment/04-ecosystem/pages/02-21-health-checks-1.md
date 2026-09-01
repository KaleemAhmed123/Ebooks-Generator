## Health and readiness endpoints

- Two endpoints answering two different questions, which is why one is not enough

```js
let ready = false

app.get("/healthz", (req, res) => res.json({ status: "ok", uptime: process.uptime() }))

app.get("/readyz", async (req, res) => {
  if (!ready) return res.status(503).json({ status: "starting" })

  try {
    await Promise.all([
      db.$queryRaw`SELECT 1`,
      redis.ping(),
    ])
    res.json({ status: "ready" })
  } catch (err) {
    res.status(503).json({ status: "degraded", error: err.message })
  }
})
```

| Endpoint | Question | Failing means |
|---|---|---|
| `/healthz` | is the process alive | restart it |
| `/readyz` | can it serve traffic | stop sending traffic, do not restart |
