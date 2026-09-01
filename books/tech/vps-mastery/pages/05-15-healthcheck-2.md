### What the endpoint should check

- **Liveness**: the process can serve a request. Return 200 unconditionally
- **Readiness**: dependencies are reachable. Check the database with a one-millisecond query, and the cache with a ping

```ts
app.get("/healthz", (_req, res) => res.status(200).send("ok"));

app.get("/readyz", async (_req, res) => {
  try {
    await db.query("SELECT 1");
    res.status(200).json({ db: "up" });
  } catch {
    res.status(503).json({ db: "down" });
  }
});
```

- Do not call other services from a health check. One slow dependency then marks the whole stack unhealthy at once

### Seeing the result

```bash
docker inspect --format '{{.State.Health.Status}}' orders   # healthy
```
