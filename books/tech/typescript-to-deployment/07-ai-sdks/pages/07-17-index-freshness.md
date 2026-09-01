## Keeping the index current

- A vector store is a **derived copy**. The moment a document is edited, the index is wrong, and nothing raises an error
- Answers quietly become stale, and the report arrives as "the bot is wrong" weeks later

### The three operations that must exist

| Operation | Trigger | Does |
|---|---|---|
| **upsert** | a document is created or edited | re-chunk, re-embed, replace its chunks |
| **delete** | a document is removed | remove every chunk **and** every cached answer |
| **rebuild** | model change, chunking change | re-embed the whole corpus |

```ts
await db.$transaction([
  db.chunk.deleteMany({ where: { documentId } }),
  db.chunk.createMany({ data: newChunks }),
])
```

- **Delete then insert, in one transaction.** Updating in place leaves orphans when the new version has fewer chunks
- Hash the source text and skip the work when it has not changed. Most re-index runs touch almost nothing

### Migrating to a new embedding model

- Vectors from two models are not comparable, so there is no gradual switch
- **Write the new vectors into a second column or index**, backfill in the background, verify with the retrieval evaluation set, then switch reads in one change
- **Store the model name on every row** so a half-finished migration is visible rather than silently wrong

### Operating it

- **Indexing is a queue, not a request.** A bulk import must not compete with live search
- **Alert on lag**: the age of the oldest document not yet indexed. It is the single number that says whether answers are current
- Keep the extracted text, so re-chunking never means re-parsing every PDF again
