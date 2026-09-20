## Naturally idempotent operations

- The easiest way to build an idempotent system is to design operations that are naturally idempotent:

### 1. Set, do not increment
- **Bad:** `UPDATE accounts SET balance = balance - 10`
- **Good:** `UPDATE accounts SET balance = 90 WHERE balance = 100` (Optimistic locking)

### 2. Upsert on a natural key
- **Bad:** `INSERT INTO users (email) VALUES ('bob@a.com')` (fails on retry if email is unique)
- **Good:** `INSERT INTO users ... ON CONFLICT (email) DO UPDATE SET ...`

### 3. Tolerate "already done"
- When a `DELETE` runs, and the row is already gone, a naturally idempotent API returns a `200 OK` or `204 No Content` on the retry, not a `404 Not Found`
- To the client, "delete this" means "ensure it is not there". If it is already gone, the goal is achieved

### The failure

- A client sends a `PATCH` to add a tag to a document. The reply is lost. The client retries. The server returns a `400 Bad Request: Tag already exists`. The client treats the 400 as a terminal error and fails the whole workflow, even though the desired state was achieved
