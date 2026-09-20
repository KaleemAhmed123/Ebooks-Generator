## Preventing lost updates

- Three fixes, in order of preference. Each removes the gap between the read and the write in a different way

| Fix | How | When |
|---|---|---|
| **atomic write** | `UPDATE posts SET likes = likes + 1 WHERE id = $1`; Redis `INCR`; DynamoDB `ADD` in an `UpdateExpression` | the new value is a function the database can compute |
| **lock the read** | `SELECT … FOR UPDATE`, then compute, then write; the second reader waits at the `SELECT` | the computation needs application code, and the transaction stays short |
| **compare-and-set** | carry a `version` column; write `WHERE version = $seen`; zero rows updated means someone else won | the gap spans a user's think-time, or the store has no transactions |

```typescript
const r = await db.query(
  "UPDATE docs SET body = $1, version = version + 1 WHERE id = $2 AND version = $3",
  [body, id, seenVersion],
);
if (r.rowCount === 0) throw new ConflictError();   // re-read, merge or ask the user
```

- Postgres Repeatable Read and Serializable also stop lost updates, by aborting the loser with `40001`. InnoDB Repeatable Read does not (page 5), so the three fixes above are the portable answer

### The failure

- Compare-and-set with the result ignored. The `UPDATE` matched zero rows, the code did not check `rowCount`, and the caller was told "saved". A conditional write that nobody conditions on is the lost update with extra steps
