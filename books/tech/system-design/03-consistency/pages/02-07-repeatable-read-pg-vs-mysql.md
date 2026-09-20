## Repeatable Read: Postgres vs MySQL

- "Repeatable Read" is the official SQL standard name for the isolation level that prevents non-repeatable reads. However, the standard was written before MVCC was invented. Because of this, Postgres and MySQL (InnoDB) implemented "Repeatable Read" in completely different ways
- If you switch from one database to the other, your application code will break

| Feature | Postgres Repeatable Read | MySQL (InnoDB) Repeatable Read |
|---|---|---|
| **Mechanism** | Snapshot Isolation (MVCC). | Snapshot for reads, but **locks for writes**. |
| **When the snapshot is taken** | At the first statement. | At the first read. |
| **Phantoms (new rows)** | Prevented. | **Not prevented** (unless you use locking reads). |
| **Lost updates** | Prevented (aborts the transaction). | **Not prevented**. |
| **How conflicts surface** | Safe abort: `ERROR: 40001 serialization failure`. | Unsafe success: The second writer silently clobbers the first. |

- In InnoDB's Repeatable Read, a plain `SELECT` uses the snapshot. But if you execute `UPDATE`, InnoDB abandons the snapshot entirely! It fetches the absolute latest committed version of the row, acquires a lock, and applies your update. This silently allows lost updates

### The failure

- Assuming Repeatable Read means the same thing everywhere. If you test your code on Postgres, your lost updates will safely abort (`40001`), forcing a retry. If you deploy that exact same code against MySQL, the database will silently allow the lost update, permanently destroying user data
- Because of these extreme differences, many senior engineers ignore the SQL standard names entirely and use the academic terms (Snapshot Isolation, MVCC, 2PL) when discussing design
