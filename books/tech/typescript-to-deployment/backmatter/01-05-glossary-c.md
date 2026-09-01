## Glossary: C

| Term | Means | # |
|---|---|---|
| **cold start** | the delay when a serverless function runs after being idle | 8 |
| **compaction** | summarizing older conversation turns on the provider side so a session can continue | 7 |
| **composite index** | an index over several columns. Column order decides which queries it serves | 5 |
| **conditional type** | a type that branches: `T extends U ? X : Y` | 1 |
| **connection pool** | a fixed set of reused database connections, so each request does not open its own | 5 |
| **context editing** | dropping old tool results from a request automatically once it grows too large | 7 |
| **context rot** | accuracy falling as a model's context window fills, even well below the limit | 7 |
| **context window** | the ceiling on tokens in one model request, input and output together | 7 |
| **correlation id** | one identifier attached to every log line and span for a single request | 6, 8 |
| **cosine similarity** | the angle between two **embeddings**. How semantic search ranks | 7 |
| **covering index** | an index holding every column a query needs, so the table is never read | 5 |
| **CORS** | the browser rule deciding which origins may call your API | 4, 6 |
| **CSRF** | tricking a logged-in browser into making a request it did not intend | 6 |
