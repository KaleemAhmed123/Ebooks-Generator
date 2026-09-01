### Graceful shutdown in the application

```ts
process.on("SIGTERM", async () => {
  server.close();                     // stop accepting new connections
  await inflight();                   // let current requests finish
  await queue.close();                // stop taking new jobs
  await db.end();
  process.exit(0);
});
```

```yaml
stop_grace_period: 30s
```

- Docker sends SIGTERM, waits, then SIGKILL. The default wait is 10 seconds, which is not enough for a service finishing a job
- **Without a SIGTERM handler none of this matters.** The process is killed mid-request, the client sees a reset, and the deploy was not zero downtime after all
