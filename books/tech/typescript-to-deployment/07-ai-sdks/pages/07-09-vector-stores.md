## Choosing a vector store

- The choice is mostly about operations, not accuracy. Every option below finds nearest neighbours competently

| Store | Fits | Cost |
|---|---|---|
| **pgvector** | you already run Postgres, under ~10M vectors | index build and memory on your primary |
| **Qdrant** | filtering-heavy work, self-hosted or cloud | another service to run |
| **Pinecone** | want none of the operations | per-vector pricing, a hard dependency |
| **OpenSearch / Elasticsearch** | already there for logs, want hybrid in one place | heavy to tune |
| **Chroma, LanceDB** | prototypes, local development | not where production belongs |
| **Redis** | vectors beside a cache you already run | memory-bound |

```ts
import { QdrantClient } from "@qdrant/js-client-rest"

const qdrant = new QdrantClient({ url: process.env.QDRANT_URL })

await qdrant.search("chunks", {
  vector: queryEmbedding,
  limit: 5,
  filter: { must: [{ key: "tenantId", match: { value: tenantId } }] },
})
```

### The rule

- **Start with pgvector.** It removes a service, a backup story, a consistency problem and a bill
- Move when you have a measured reason: index builds hurting the primary, sustained high query volume, or a filtering pattern Postgres plans badly
- **Keep the store behind one interface of your own.** `search(query, filters)` is the only shape the application should know, which makes a later move a rewrite of one file
- Whatever you pick, the source documents stay somewhere else. The vector store is rebuildable, and one day it will need rebuilding
