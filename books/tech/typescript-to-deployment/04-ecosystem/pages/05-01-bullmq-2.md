### Why a queue at all

- The work outlives the request. Email, PDF generation, image resizing, webhooks out
- Retries become automatic instead of a `try` block that gives up
- A traffic spike queues up rather than falling over

### The connection settings BullMQ needs

```ts
new Redis(url, { maxRetriesPerRequest: null })
```

- BullMQ blocks on Redis for long periods. Without `null`, ioredis kills those calls
- This is the first error most people hit
