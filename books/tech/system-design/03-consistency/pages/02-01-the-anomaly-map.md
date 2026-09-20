# Module 2 - Isolation levels and their anomalies

## The anomaly map

- SQL-92 defined its isolation levels by three anomalies: dirty read, non-repeatable read, phantom. It missed the two that cause most production damage, **lost update** and **write skew**, and never named dirty write
- An isolation level is nothing but the list of anomalies it permits. Two vendors can share a level's name and permit different lists; the table has a column for each

| Anomaly | Read Committed | Repeatable Read, Postgres | Repeatable Read, InnoDB | Serializable |
|---|---|---|---|---|
| **Dirty write** (overwrite uncommitted) | prevented | prevented | prevented | prevented |
| **Dirty read** (read uncommitted) | prevented | prevented | prevented | prevented |
| **Non-repeatable read** (same row, two values) | allowed | prevented | prevented | prevented |
| **Phantom** (new rows appear) | allowed | prevented | reads: no; `UPDATE` sees new rows | prevented |
| **Lost update** (read-modify-write race) | allowed | prevented, `40001` abort | **allowed** | prevented |
| **Write skew** (two rows, one broken rule) | allowed | allowed | allowed | prevented |

- Postgres runs `READ UNCOMMITTED` as Read Committed: three levels, not four. InnoDB's Read Uncommitted is real and permits dirty reads. The rest of the module takes the table one row at a time

### The failure

- Quoting the standard instead of the engine. "Repeatable Read prevents lost updates" is true in Postgres and false in InnoDB. Code tested on one and deployed on the other loses data with no error
