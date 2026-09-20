## Pessimistic: Lock first

- MVCC is optimistic for readers, but what about writers? When two transactions want to modify the exact same row at the exact same time, the database must enforce order. The traditional method is **pessimistic locking**: acquire a lock *before* doing the work
- If you run a plain `UPDATE`, the database automatically acquires an exclusive lock on the row, modifies the data, and holds the lock until `COMMIT`. If another transaction tries to update the same row, it is shoved into a queue and forced to wait

| Postgres Row-Lock Mode | Acquired by | Blocks |
|---|---|---|
| `FOR UPDATE` | `SELECT FOR UPDATE` or plain `UPDATE` | `UPDATE`, `DELETE`, `SELECT FOR UPDATE`, `FOR SHARE` |
| `FOR NO KEY UPDATE` | `UPDATE` (not changing primary key) | `UPDATE`, `DELETE`, `SELECT FOR UPDATE` |
| `FOR SHARE` | `SELECT FOR SHARE` | `UPDATE`, `DELETE`, `SELECT FOR UPDATE` |
| `FOR KEY SHARE` | Validating Foreign Keys | `DELETE`, `SELECT FOR UPDATE` |

- A row lock never blocks a plain `SELECT`. Thanks to MVCC, readers can always read the old version of the row while writers fight over the lock

### The failure

- Acquiring a lock and then waiting for a human. If you build an admin dashboard that runs `SELECT FOR UPDATE` when an admin opens a support ticket, and only runs `COMMIT` when they click "Save", you have created a disaster. A row lock is a queue. If the admin goes to lunch, every other admin trying to view or update that ticket is frozen until the lock drops
