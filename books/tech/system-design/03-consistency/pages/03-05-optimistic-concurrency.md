## Optimistic: validate at commit

- **Optimistic concurrency control** holds no lock. Read a version number with the data, do the work, write with `WHERE version = $seen`. A conflict surfaces as zero rows updated, and the application decides: re-read and retry, merge, or tell the user

```typescript
const { rows } = await db.query("SELECT bio, version FROM users WHERE id = $1", [id]);
const r = await db.query(
  "UPDATE users SET bio = $1, version = version + 1 WHERE id = $2 AND version = $3",
  [newBio, id, rows[0].version],
);
if (r.rowCount === 0) throw new ConflictError();   // someone wrote in between
```

- Contention decides between the two schools. Low contention: optimistic wins, no lock wait, and it works across stateless HTTP requests where a lock cannot be held. High contention: pessimistic wins, because waiting in a queue is cheaper than doing the work, failing, and redoing it

| | optimistic | pessimistic |
|---|---|---|
| cost when nobody conflicts | none | a lock wait, usually short |
| cost when everybody conflicts | wasted work and a retry per loser | a queue |
| spans a user's think-time | yes: the version travels with the form | no: the lock would outlive the request |
| typical use | profiles, documents, settings | inventory, balances, counters |

### The failure

- Optimistic on a hot row. Ten thousand writers hit one counter; one wins per round and the rest retry, and the database spends its time on writes that match zero rows. A counter is an atomic `UPDATE … SET n = n + 1`; the version column belongs on rows people edit, not rows machines hammer
