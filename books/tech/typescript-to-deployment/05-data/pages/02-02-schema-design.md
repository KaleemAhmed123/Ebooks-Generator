## Designing tables

- **Normalization** means storing each fact once. A seller's name lives in the sellers table, and orders reference it by id
- Storing the name on the order too is duplication, and duplication means the two copies eventually disagree
- The rule of thumb is that a fact should have exactly one authoritative home

```sql
CREATE TABLE sellers (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE orders (
  id          TEXT PRIMARY KEY,
  seller_id   TEXT NOT NULL REFERENCES sellers(id),
  total_paise INTEGER NOT NULL CHECK (total_paise > 0),
  status      TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending','paid','shipped','cancelled')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

- `REFERENCES` makes an order pointing at a missing seller impossible, not merely unlikely
- `CHECK` on status means a typo is rejected by the database, so no service can write `"payed"`
- `TIMESTAMPTZ` stores an absolute moment. `TIMESTAMP` stores a wall clock reading with no timezone, and mixing the two is a long afternoon

### Where to break the rule

- A **denormalized** copy is justified when the join is hot and the value never changes
- The price captured on an order line is the clearest case. It must be what was charged that day, not what the product costs now
- That is not duplication. It is a different fact that happens to have started as a copy
