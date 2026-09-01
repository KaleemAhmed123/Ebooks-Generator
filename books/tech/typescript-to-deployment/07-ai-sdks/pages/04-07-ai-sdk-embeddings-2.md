### Reranking

```ts
import { rerank } from "ai"

const { rankedDocuments } = await rerank({
  model: cohere.reranking("rerank-v3.5"),
  documents: candidates,
  query: "how do refunds work",
  topN: 5,
})
```

- A **reranker** is a second, slower model that scores a query against each candidate directly, rather than comparing two vectors made separately
- It is far more accurate and far more expensive, which is why it runs on twenty candidates and not on the whole corpus
- Module 7 covers where it fits in a retrieval pipeline, and why it is usually the largest single quality gain available
