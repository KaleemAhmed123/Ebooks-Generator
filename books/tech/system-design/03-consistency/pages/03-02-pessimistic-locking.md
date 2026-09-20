## Pessimistic: lock first

- **Pessimistic locking** takes the lock before the work. A plain `UPDATE` or `DELETE` does it implicitly; `SELECT … FOR UPDATE` does it for a read whose result you intend to write. The lock lives until `COMMIT` or `ROLLBACK`
- A row lock is a queue. The second transaction that wants the same row waits, in arrival order, for the first to finish. Postgres has four row-lock modes so that weaker intents queue behind fewer things

| Mode | Taken by | Blocks |
|---|---|---|
| `FOR KEY SHARE` | a foreign-key check on the referenced row | `FOR UPDATE` only: a `DELETE` or a key change |
| `FOR SHARE` | `SELECT … FOR SHARE` | any `UPDATE`, `DELETE`, `FOR UPDATE`, `FOR NO KEY UPDATE` |
| `FOR NO KEY UPDATE` | an `UPDATE` that leaves key columns alone | the same, plus `FOR SHARE`; not `FOR KEY SHARE`, so foreign-key inserts still flow |
| `FOR UPDATE` | `DELETE`, a key-changing `UPDATE`, `SELECT … FOR UPDATE` | every mode |

- No row-lock mode blocks a plain `SELECT`. MVCC hands readers the last committed version while the writers queue

### The failure

- A lock held across a human. The admin screen runs `SELECT … FOR UPDATE` when the ticket opens and `COMMIT` when someone clicks Save; the second admin's screen hangs until the first one returns from lunch, and every pooled connection behind them waits in the same queue
