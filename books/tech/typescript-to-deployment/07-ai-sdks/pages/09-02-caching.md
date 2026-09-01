## Caching

- The same question gets asked repeatedly. A support bot answers `how do I reset my password` a hundred times a day and pays each time
- There are three caches available here and they solve different problems

| Cache | Keyed on | Saves |
|---|---|---|
| **exact response** | a hash of the full request | everything, on a repeat |
| **prompt cache** | the shared prefix, provider side | most of the input cost |
| **semantic** | a similar question, by embedding | everything, on a near repeat |

```ts
const key = `llm:${createHash("sha256")
  .update(JSON.stringify({ model, instructions, messages, temperature }))
  .digest("hex")}`

const hit = await redis.get(key)
if (hit) return JSON.parse(hit)

const result = await generateText({ model, instructions, messages, temperature: 0 })
await redis.setex(key, 3600, JSON.stringify(result))
```

- **Only cache at `temperature: 0`.** Caching a sampled answer freezes one random draw as the permanent answer

### Semantic caching, and why it is risky

- Embed the question, and serve the cached answer if an earlier question is close enough
- **Close is not the same.** `Can I cancel my order?` and `Can I cancel my subscription?` are near neighbours with different answers
- Use a high threshold, around 0.95, restrict it to questions with no personal context, and log every hit so wrong ones can be found

### The rule that prevents a data leak

- **Put the tenant id in every cache key.** A shared cache across tenants serves one customer's answer, built from their documents, to another
