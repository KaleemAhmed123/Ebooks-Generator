## Running BullMQ properly

### Always handle worker events

```ts
const worker = new Worker("emails", handler, { connection })

worker.on("failed", (job, err) => {
  logger.error({ jobId: job?.id, attempts: job?.attemptsMade, err }, "job failed")
})

worker.on("error", (err) => logger.error({ err }, "worker error"))
```

- Without a `failed` listener, jobs die silently and nobody notices for a week

### Shutting down cleanly

```ts
process.on("SIGTERM", async () => {
  await worker.close()   // finishes the current job, stops taking new ones
  await connection.quit()
  process.exit(0)
})
```

- Skipping `worker.close()` means an in-flight job is abandoned mid-write
