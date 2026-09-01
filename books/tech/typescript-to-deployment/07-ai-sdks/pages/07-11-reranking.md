## Reranking

- Embeddings are computed separately for the question and the document, then compared. Neither ever saw the other
- A **reranker** reads the pair together and scores how well that document answers that question, which is a fundamentally better measurement
- It is far too slow to run over a corpus, and exactly right over the top forty candidates

```ts
import { rerank } from "ai"

const { rankedDocuments } = await rerank({
  model: cohere.reranking("rerank-v3.5"),
  documents: candidates.map((c) => c.text),
  query: userQuestion,
  topN: 5,
})
```

### Where it sits

```text
question -> hybrid search (40 candidates) -> rerank -> top 5 -> prompt
```

- **This two-stage shape is what production retrieval looks like.** Cheap and wide first, expensive and narrow second
- The gain is typically large, because the top five after reranking are far more often the right five

### The costs

- One extra network call, usually 100 to 300 milliseconds, on the request path
- A per-document charge, which is why the candidate count is capped

### Query rewriting, the other cheap win

- `it broke again` retrieves nothing useful, because the meaning is in the previous turn
- A small model rewrites it into a standalone question using the recent history, before any search runs
- One fast, cheap call that fixes the most common complaint about multi-turn retrieval
