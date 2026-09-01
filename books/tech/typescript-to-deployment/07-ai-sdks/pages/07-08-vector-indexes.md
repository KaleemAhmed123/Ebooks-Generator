## Indexing vectors

- Without an index, the query on the last page reads every row and computes every distance. That is fine at ten thousand rows and hopeless at ten million
- A vector index is **approximate**. It trades a small amount of recall for an enormous amount of speed, which is a trade a B-tree never makes

```sql
CREATE INDEX ON chunks USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);
```

| | HNSW | IVFFlat |
|---|---|---|
| Recall | higher | lower |
| Query speed | faster | slower |
| Build time | slow | fast |
| Memory | high | low |
| Needs data first | no | yes, must be populated |

- **HNSW is the default choice.** IVFFlat is for a corpus too large to hold an HNSW graph in memory

### The knob that matters at query time

```sql
SET hnsw.ef_search = 100;   -- default 40
```

- Higher searches more of the graph: better recall, slower query. It is the accuracy dial, and it is set per session

### The trap with filters

- A filtered query can walk the index and find fewer than `LIMIT` rows matching the filter, returning too few results
- **`SET hnsw.iterative_scan = relaxed_order`** makes it keep scanning until enough rows pass the filter
- The alternative is a **partial index per tenant**, which is faster still when tenants are few and large
- The operator class must match the operator. An index built with `vector_l2_ops` is not used by a `<=>` query, and the plan silently falls back to a sequential scan
