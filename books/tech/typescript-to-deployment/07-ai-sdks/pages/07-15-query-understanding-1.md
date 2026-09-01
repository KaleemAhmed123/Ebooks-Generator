## Understanding the question first

- The question a user types is often a poor search query. It is short, it refers to earlier turns, and it may contain two questions at once
- **A cheap model call before the search fixes more retrieval problems than tuning the search does**

### The four techniques

| Technique | Does | Fixes |
|---|---|---|
| **rewrite** | make the question standalone | `it broke again` after two turns |
| **decompose** | split into sub-questions, search each | `compare refunds and cancellations` |
| **multi-query** | generate three phrasings, search all, fuse | vocabulary mismatch |
| **HyDE** | write a fake answer, embed **that** | short questions against long documents |

```ts
const { object } = await generateObject({
  model: registry.languageModel("anthropic:fast"),
  schema: z.object({
    standalone: z.string(),
    subQuestions: z.array(z.string()).max(3),
    filters: z.object({ docType: z.string().nullable(), after: z.string().nullable() }),
  }),
  prompt: `Recent turns:\n${recent}\n\nQuestion: ${question}`,
})
```

- Extracting **filters** in the same call is the underrated part. `refunds in the last quarter` becomes a date range the database applies, not a phrase the embedding has to represent
