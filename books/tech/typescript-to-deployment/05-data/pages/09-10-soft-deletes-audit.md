## Soft deletes and audit trails

- Deleting a row destroys evidence. A cancelled order still has to appear in last quarter's numbers, and a deleted user still owns the orders they placed
- A **soft delete** marks a row as gone instead of removing it

```sql
ALTER TABLE orders ADD COLUMN deleted_at TIMESTAMPTZ;
CREATE INDEX idx_orders_live ON orders (seller_id) WHERE deleted_at IS NULL;
```

### The cost nobody mentions

- **Every query must now filter it**, and the one that forgets shows deleted data to a customer
- Unique constraints stop working, because a deleted row still occupies the value
- The table grows forever

```sql
CREATE UNIQUE INDEX idx_orders_awb ON orders (awb) WHERE deleted_at IS NULL;
```

- A partial unique index fixes the constraint problem, and a partial index on live rows keeps reads fast
- Apply the filter in one repository layer, never in individual handlers, for the same reason authorization belongs at a choke point

### Audit trails

```sql
CREATE TABLE order_audit (
  id          BIGSERIAL PRIMARY KEY,
  order_id    TEXT NOT NULL,
  actor_id    TEXT NOT NULL,
  action      TEXT NOT NULL,
  before      JSONB,
  after       JSONB,
  at          TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

- **Append only.** An audit table that can be updated is not evidence
- Written in the same transaction as the change, or a crash records an action that did not happen
- Store who, what, when, and both sides of the change. Anything touching money or permissions deserves one
