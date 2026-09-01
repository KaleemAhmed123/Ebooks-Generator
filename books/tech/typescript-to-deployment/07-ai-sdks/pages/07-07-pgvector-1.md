## pgvector

- A vector is a column type, and searching is an `ORDER BY`. That is the whole idea
- **pgvector** adds that type to PostgreSQL, which means vectors live in the database you already run, back up and join against
- For most products that is the correct answer, and a separate vector database is a service to operate for no gain

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE chunks (
  id          bigserial PRIMARY KEY,
  document_id text NOT NULL,
  tenant_id   text NOT NULL,
  page        int,
  content     text NOT NULL,
  embedding   vector(1536) NOT NULL
);
```

```sql
SELECT id, content, page,
       1 - (embedding <=> $1) AS similarity
FROM chunks
WHERE tenant_id = $2
ORDER BY embedding <=> $1
LIMIT 5;
```

| Operator | Distance | Use when |
|---|---|---|
| `<=>` | cosine | the usual choice for text embeddings |
| `<->` | euclidean | vectors that are not normalized |
| `<#>` | inner product | normalized vectors, marginally faster |

- The distance is **smaller when closer**, so `ORDER BY` is ascending. `1 - distance` converts cosine distance to a similarity anyone can read
