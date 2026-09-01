## The index types worth knowing

| Type | Good for | Not for |
|---|---|---|
| **B-tree** | equality, ranges, sorting. The default | containment, full text |
| **GIN** | arrays, `JSONB` keys, full text search | plain equality on a scalar |
| **BRIN** | huge tables physically ordered, such as append-only logs | anything unordered |
| **Hash** | equality only, slightly smaller than B-tree | ranges or sorting |
| **GiST** | geometry, ranges, nearest-neighbor | ordinary columns |

```sql
CREATE INDEX idx_orders_seller_created
  ON orders (seller_id, created_at DESC);

CREATE INDEX idx_orders_meta ON orders USING GIN (meta jsonb_path_ops);
```

### Column order in a composite index is not arbitrary

- An index on `(seller_id, created_at)` can answer a query filtering on `seller_id` alone
- It **cannot** answer one filtering on `created_at` alone, because the tree is sorted by seller first
- A phone book sorted by surname then first name cannot find everyone named Kaleem
- The rule is equality columns first, then the range or sort column

### Partial and covering indexes

```sql
CREATE INDEX idx_orders_pending ON orders (created_at)
  WHERE status = 'pending';

CREATE INDEX idx_orders_lookup ON orders (seller_id)
  INCLUDE (total_paise, status);
```

- A **partial** index covers only rows matching a condition, so it stays small when the interesting rows are rare
- A queue table where ninety-nine percent of rows are done is the textbook case
- A **covering** index carries the extra columns inside the index, so the query is answered without touching the table at all
