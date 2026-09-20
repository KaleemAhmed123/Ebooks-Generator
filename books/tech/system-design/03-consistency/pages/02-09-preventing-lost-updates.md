## Preventing lost updates

- There are three primary ways to prevent lost updates in your application code. The best method depends entirely on the capabilities of your database engine

### 1. Atomic write operations

- If your operation is a simple increment, decrement, or JSON append, you can push the math down to the database engine. This entirely avoids the read-modify-write cycle
- **Example**: `UPDATE posts SET likes = likes + 1 WHERE id = 42;`
- In Redis, use commands like `INCR`. In DynamoDB, use `UpdateExpression: "ADD likes :val"`. The database acquires the row lock internally, applies the math, and releases the lock

### 2. Explicit locking (SELECT FOR UPDATE)

- If your logic is too complex for a single statement (e.g., you must read the row in Node.js, execute a 100-line pricing algorithm, and then write the result), you must explicitly lock the row during the read
- **Example**: `SELECT * FROM users WHERE id = 42 FOR UPDATE;`
- The `FOR UPDATE` clause tells the database: "I am going to update this row later in the transaction. Take a write lock on it right now." If a concurrent transaction tries to read the row `FOR UPDATE`, it will block and wait until your transaction commits

### 3. Compare-and-set (Optimistic concurrency)

- If you cannot use transactions (e.g., your database doesn't support them, or you are holding the state across a long-running HTTP interaction), you must use compare-and-set
- You add a `version` integer to your table. When you read the row, you memorize the version. When you write, you include the version in the `WHERE` clause. If another user updated the row while you were thinking, the version will have changed, and your `UPDATE` will affect zero rows

```sql
-- Read phase
SELECT content, version FROM wiki_pages WHERE id = 1; -- Returns version 4

-- The user edits the page in their browser for 10 minutes...

-- Write phase
UPDATE wiki_pages 
SET content = 'New content', version = 5 
WHERE id = 1 AND version = 4; -- Will fail if someone else edited it!
```
