## Hybrid search

- Vector search understands meaning and is bad at exact strings. Ask for order `o_842` or error code `ERR_5521` and it returns things that feel similar
- Keyword search is the reverse: exact on identifiers, useless when the question and the document share no words
- **Hybrid search runs both and merges the results.** It is usually the largest quality gain in a retrieval pipeline after chunking

```sql
WITH semantic AS (
  SELECT id, row_number() OVER (ORDER BY embedding <=> $1) AS rank
  FROM chunks WHERE tenant_id = $3 ORDER BY embedding <=> $1 LIMIT 40
),
keyword AS (
  SELECT id, row_number() OVER (
    ORDER BY ts_rank(search, websearch_to_tsquery('english', $2)) DESC
  ) AS rank
  FROM chunks
  WHERE tenant_id = $3 AND search @@ websearch_to_tsquery('english', $2)
  LIMIT 40
)
SELECT COALESCE(s.id, k.id) AS id,
       COALESCE(1.0 / (60 + s.rank), 0) + COALESCE(1.0 / (60 + k.rank), 0) AS score
FROM semantic s FULL OUTER JOIN keyword k USING (id)
ORDER BY score DESC LIMIT 10;
```

### Reciprocal rank fusion

- The merge above is **RRF**: each result scores `1 / (k + rank)` in each list, and the scores add
- It combines **positions, not scores**, which is the point. Cosine similarity and text rank are on incomparable scales and cannot be added directly
- `k = 60` is the conventional constant and rarely needs tuning

### Worth knowing

- The full text column here is the generated `tsvector` from Booklet 4, so this is one table and one query
- **Retrieve wide, return narrow.** Forty candidates from each side, ten after fusion, five after the reranking on the next page
