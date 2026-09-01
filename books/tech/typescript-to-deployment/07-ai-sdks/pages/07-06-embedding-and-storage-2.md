### Choosing the embedding model

| Consideration | Note |
|---|---|
| dimensions | 1536 is typical; more is not automatically better and costs storage |
| max input | usually about 8k tokens, so a chunk always fits |
| language | check it covers the languages your documents are in |
| **lock-in** | changing it means re-embedding the entire corpus |

### The three rules

- **Store the model name on every row.** Without it, a half-migrated corpus is silently comparing incomparable vectors
- **Store the tenant id on every row**, and filter on it in every query. A vector search that crosses tenants is a data breach with no error message
- **Make indexing idempotent**, keyed on a hash of the chunk text. Re-running a failed job should not double the corpus
