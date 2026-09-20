## Lost update

- The **lost update** is a read-modify-write race: two transactions read the same value, each computes a new one, each writes it back. The second write erases the first, and both commit without error

```typescript
// racy under Read Committed and under InnoDB Repeatable Read
async function like(db: Client, postId: string) {
  await db.query("BEGIN");
  const { rows } = await db.query("SELECT likes FROM posts WHERE id = $1", [postId]);
  const next = rows[0].likes + 1;      // both callers compute 6 from 5
  await db.query("UPDATE posts SET likes = $1 WHERE id = $2", [next, postId]);
  await db.query("COMMIT");            // both commit 6
}
```

- It differs from a dirty write in one word: the overwritten value was **committed**. The row lock that stops dirty writes was released at the first commit, so the second writer waits for nothing
- It is the most common concurrency bug in web code because ORMs hide it: `load`, change a field, `save`

### The failure

- `user.save()` on an ORM that writes every column. Between the load and the save, a background job set `billing_status`; the save writes the whole stale object back, and the job's change is gone. Nothing failed, nothing logged. The fixes are on the next page
