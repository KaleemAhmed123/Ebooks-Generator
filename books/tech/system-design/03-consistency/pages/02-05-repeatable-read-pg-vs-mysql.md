## Repeatable Read: Postgres vs InnoDB

- The SQL standard names a level; it does not say how to build it. Postgres and InnoDB both call their snapshot level Repeatable Read and diverge on the one thing that matters: what an `UPDATE` sees

| | Postgres Repeatable Read | InnoDB Repeatable Read (the default) |
|---|---|---|
| snapshot taken | first statement | first consistent read |
| plain `SELECT` | snapshot | snapshot |
| `UPDATE`, `DELETE`, `SELECT … FOR UPDATE` | snapshot; if the row changed since, **abort with `40001`** | **the latest committed row**, plus a next-key lock on the index range |
| phantoms | cannot happen | plain reads: no; locking reads and `UPDATE` see rows the snapshot did not |
| lost update | prevented by the abort | **allowed**: the read-modify-write's `UPDATE` lands on the newer row |

- The InnoDB rule is not a bug: an `UPDATE` that ignored newer rows would overwrite committed data, so it reads the newest version and locks it. The cost is that the transaction's reads and writes no longer see the same world
- Postgres chooses the other side: keep one snapshot, and if a row you want to write has moved on, abort you. Hence the retry loop on Module 1, page 8

### The failure

- Code tested on Postgres, deployed on MySQL. On Postgres the racing update aborts and retries; on InnoDB it succeeds and one update is gone, silently. Portable code uses page 7's methods, which work on both
