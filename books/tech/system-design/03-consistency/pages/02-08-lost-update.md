## Lost update

- The **lost update** is the most common and destructive concurrency bug in web applications. It occurs during a read-modify-write cycle. Transaction A reads a value, modifies it in memory, and writes it back. Concurrently, Transaction B reads the same value, modifies it, and writes it back. The second write silently clobbers the first

```typescript
// BAD: A naive read-modify-write cycle.
// If two users call this function at the exact same time under Read Committed 
// (or InnoDB Repeatable Read), one of the increments will be permanently lost.
async function naiveIncrement(db: Client, postId: string) {
  await db.query('BEGIN');
  
  // 1. Read the current value
  const row = await db.query('SELECT likes FROM posts WHERE id = $1', [postId]);
  const newLikes = row.likes + 1;
  
  // 2. Write the new value
  await db.query('UPDATE posts SET likes = $1 WHERE id = $2', [newLikes, postId]);
  
  await db.query('COMMIT');
}
```

- Dirty writes (which we covered earlier) are about overwriting *uncommitted* data. Lost updates are about overwriting *committed* data. The database successfully committed A's write, and then B's write came along a millisecond later and erased it

### The failure

- Using ORMs that fetch entire objects into memory by default. If your ORM executes `user = User.find(1)`, you update `user.name`, and you call `user.save()`, the ORM often generates an `UPDATE` statement that writes *every single column* back to the database
- If a concurrent background job updated `user.billing_status` in the split second between your read and your save, your ORM will overwrite the billing status with the stale value it loaded earlier
