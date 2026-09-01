## Graceful shutdown in code

```js
let shuttingDown = false

app.get("/ready", (req, res) => {
  if (shuttingDown) return res.sendStatus(503)
  res.sendStatus(200)
})

const server = app.listen(3000)

async function shutdown(signal) {
  if (shuttingDown) return
  shuttingDown = true
  logger.info({ signal }, "shutting down")

  const hard = setTimeout(() => {
    logger.error("forced exit")
    process.exit(1)
  }, 10_000)
  hard.unref()

  server.close(async () => {
    await Promise.allSettled([
      db.$disconnect(),
      redis.quit(),
      rabbit.close(),
    ])
    clearTimeout(hard)
    process.exit(0)
  })
}

process.on("SIGTERM", () => shutdown("SIGTERM"))
process.on("SIGINT", () => shutdown("SIGINT"))
```

- The `shuttingDown` flag makes readiness fail first, so traffic drains away
- `hard.unref()` stops the timer itself keeping the process alive
- `allSettled` so one stuck connection does not block the others
- The guard at the top handles a second `SIGTERM` arriving while you are already shutting down
