## Retrieval that is not vectors

- Semantic search is one retrieval strategy. A production assistant usually needs three, and it should choose between them

### Text to SQL

- `How many refunds did Rabiya approve last quarter` is a query, not a passage. No amount of chunking answers it
- **Give the model the schema and let it write SQL**, then run it under strict conditions

```ts
const { object } = await generateObject({
  model, schema: z.object({ sql: z.string() }),
  prompt: `Schema:\n${schemaDDL}\n\nWrite one SELECT answering: ${question}`,
})
```

- **Run it as a read-only database user**, with a statement timeout and a row limit. Never as the application user
- Reject anything that is not a single `SELECT` before execution, and log every query that runs
- **A fixed set of parameterised queries the model chooses between is safer**, and usually enough

### Graph retrieval

- Some questions are about relationships: which services depend on this one, who reported to whom, which orders share an address
- A graph, or a normal set of joins, answers those exactly, where a vector search returns things that read similar
- **Extract entities and relations at indexing time**, store them as rows, and give the model a tool that traverses them

### Routing between them

- A small model classifies the question into `search`, `query`, `traverse`, or `neither`, and dispatches
- **This is the router workflow from Module 8**, and it is the shape a serious assistant ends up with
- The honest version of retrieval is: **give the model several tools and let it pick**, rather than assuming every question is a similarity search
