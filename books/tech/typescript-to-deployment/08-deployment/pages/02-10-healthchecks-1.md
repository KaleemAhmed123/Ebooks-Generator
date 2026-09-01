## Health checks

- A process can be running and useless: the database connection is gone, the event loop is blocked, or it is still starting
- **A health check is the endpoint that answers "should traffic come here".** Every orchestrator in this booklet asks it

### Two endpoints, not one

```ts
// liveness: is the process alive at all
app.get("/health", (req, res) => res.status(200).send("ok"))

// readiness: can it serve a real request right now
app.get("/ready", async (req, res) => {
  try {
    await db.$queryRaw`SELECT 1`
    await redis.ping()
    res.status(200).json({ status: "ready" })
  } catch (err) {
    res.status(503).json({ status: "not_ready" })
  }
})
```

| Check | Failing means | Response |
|---|---|---|
| **liveness** | the process is wedged | restart it |
| **readiness** | a dependency is unavailable | stop sending traffic, do not restart |

- **Confusing the two causes restart storms.** If liveness checks the database, a database blip restarts every instance at once and turns a small outage into a large one
