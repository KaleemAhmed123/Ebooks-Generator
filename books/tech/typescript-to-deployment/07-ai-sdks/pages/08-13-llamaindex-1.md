## LlamaIndex

- LangChain and the AI SDK are general. **LlamaIndex is built around one job: answering questions over your documents**
- Everything in Module 7, loading, chunking, embedding, storing, retrieving, is assembled for you
- Reach for it when retrieval is the product. Reach past it when retrieval is one feature among many

```bash
npm i llamaindex @llamaindex/anthropic
```

```ts
import { VectorStoreIndex, Document, Settings } from "llamaindex"
import { anthropic } from "@llamaindex/anthropic"

Settings.llm = anthropic({ model: "claude-opus-5" })

const index = await VectorStoreIndex.fromDocuments(
  docs.map((d) => new Document({ text: d.text, metadata: { source: d.id } })),
)

const engine = index.asQueryEngine({ similarityTopK: 5 })
const answer = await engine.query({ query: "How long does a refund take?" })

console.log(answer.message.content)
console.log(answer.sourceNodes.map((n) => n.node.metadata.source))
```

- Those ten lines are the whole pipeline from Module 7, with sensible defaults at every step
- `sourceNodes` gives the citations back, which is what makes the answer checkable
