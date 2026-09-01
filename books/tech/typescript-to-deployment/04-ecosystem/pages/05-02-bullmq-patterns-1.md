## BullMQ in practice

### Retries and backoff

```ts
await emails.add("welcome", { sellerId }, {
  attempts: 5,
  backoff: { type: "exponential", delay: 1000 },
  removeOnComplete: { age: 3600, count: 1000 },
  removeOnFail: { age: 86400 },
})
```

- Delays go 1s, 2s, 4s, 8s, 16s
- **Set `removeOnComplete` or Redis fills up with finished jobs.** This is the most common production surprise

### Concurrency and rate limiting

```ts
new Worker("emails", handler, {
  connection,
  concurrency: 10,
  limiter: { max: 100, duration: 60000 },
})
```

- `concurrency` is jobs in flight per worker
- `limiter` is shared across every worker on that queue, which is what a third party rate limit needs
