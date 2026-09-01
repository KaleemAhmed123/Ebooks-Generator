## Embeddings and reranking

- Same operation as Module 2, with one signature across providers, which matters because embedding models are switched more often than chat models

```ts
import { embed, embedMany, cosineSimilarity } from "ai"
import { openai } from "@ai-sdk/openai"

const { embeddings } = await embedMany({
  model: openai.textEmbeddingModel("text-embedding-3-small"),
  values: chunks.map((c) => c.text),
})

const { embedding: query } = await embed({
  model: openai.textEmbeddingModel("text-embedding-3-small"),
  value: "how do refunds work",
})

cosineSimilarity(query, embeddings[0])   // 0.83
```

- `embedMany` batches and parallelises internally, so a thousand chunks is one call site rather than a hand-written concurrency limiter
- `maxParallelCalls` caps how many requests run at once, which is what keeps an indexing job under the provider rate limit
