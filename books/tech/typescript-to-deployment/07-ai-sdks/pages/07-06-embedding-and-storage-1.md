## Embedding and storing

- Indexing is a batch job: embed the chunks, write the vectors with their metadata, and record what version produced them

```ts
import { embedMany } from "ai"

const { embeddings } = await embedMany({
  model: openai.textEmbeddingModel("text-embedding-3-small"),
  values: chunks.map((c) => `${c.title} > ${c.heading}\n\n${c.text}`),
  maxParallelCalls: 4,
})

await db.chunk.createMany({
  data: chunks.map((c, i) => ({
    documentId: c.documentId,
    text: c.text,
    page: c.page,
    tenantId: c.tenantId,
    embedding: embeddings[i],
    embeddingModel: "text-embedding-3-small",
  })),
})
```
