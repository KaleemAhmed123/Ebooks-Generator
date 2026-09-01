## Batches, files and other inputs

### The Batch API

- Classifying two hundred thousand old tickets does not need an answer in the next second. It needs the answers by tomorrow
- The **Batch API** takes many requests as one job, runs them asynchronously, and charges roughly half the normal price

```ts
const batch = await client.messages.batches.create({
  requests: tickets.map((t) => ({
    custom_id: t.id,
    params: {
      model: "claude-haiku-4-5",
      max_tokens: 256,
      messages: [{ role: "user", content: t.body }],
    },
  })),
})

// poll, then stream the results
for await (const result of client.messages.batches.results(batch.id)) {
  console.log(result.custom_id, result.result.type)
}
```

- Results come back out of order, which is what `custom_id` is for
- **Anything not on a user's critical path belongs here**: backfills, nightly enrichment, bulk tagging
