## Naturally idempotent operations

- Some operations are idempotent by shape. Prefer them; they need no key

### 1. Set, do not increment
- **Bad:** `UPDATE accounts SET balance = balance - 10`
- **Good:** `UPDATE accounts SET balance = 90 WHERE balance = 100` (**optimistic locking**: the write carries the value it expects to find, and fails if it is gone)

### 2. Upsert on a natural key
- **Bad:** `INSERT INTO users (email) VALUES ('bob@a.com')` (fails on retry if email is unique)
- **Good:** `INSERT INTO users ... ON CONFLICT (email) DO UPDATE SET ...`

### 3. Tolerate "already done"
- When a `DELETE` retry finds the row already gone, the RFC allows a `404`; the effect is the same either way. A friendlier design returns `204 No Content`, so a client that treats any 4xx as terminal does not fail a workflow whose goal was achieved. Pick one and document it

### The failure

- A client sends a `PATCH` to add a tag to a document. The reply is lost. The client retries. The server returns a `400 Bad Request: Tag already exists`. The client treats the 400 as a terminal error and fails the whole workflow, even though the desired state was achieved
