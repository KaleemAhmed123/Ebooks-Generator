## The twelve things worth remembering

### 1. The database is almost always the slow part

- Not the framework, not the ORM. A missing index or a query returning ten thousand rows

### 2. `EXPLAIN ANALYZE` before adding an index

- Guessing produces eleven indexes and no improvement, and every one slows writes down

### 3. Composite index order is equality, then sort, then range

- An index on `(seller_id, created_at)` cannot answer a query about `created_at` alone

### 4. Never hold a transaction open across a network call

- Locks and a connection are held for the whole wait, and a pool of ten runs out at ten such requests

### 5. Read-check-write loses money silently

- Fold the condition into the update and check the row count. Zero means refuse

### 6. Money is integers in the smallest unit

- `0.1 + 0.2` is not `0.3`, and no amount of rounding at the edges fixes an accumulated error

### 7. Exactly-once delivery does not exist

- At-least-once plus an idempotent consumer is what people mean, and it is achievable

### 8. Two writes to two systems will eventually disagree

- Use an outbox so the event commits with the data that caused it

### 9. Decide what may lag, and write it down

- Money and permissions immediate. Counts, feeds and search eventual

### 10. Expand and contract, never rename in place

- Old code and new code both run during a deploy, so no migration may leave either one broken
