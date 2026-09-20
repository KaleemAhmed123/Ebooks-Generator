## Serializable in practice

- "Serializable" is the strongest isolation level, but as we have seen, the way it behaves under the hood varies wildly depending on the database engine. If you decide to use Serializable in production, you must know what you are actually turning on

| Database | Implementation | Consequence |
|---|---|---|
| **Postgres** | Serializable Snapshot Isolation (SSI). | Optimistic. Does not block readers. **High abort rate**, requiring a strong retry loop in the app. |
| **CockroachDB** | SSI is the only isolation level it supports. | Same as Postgres. You have no choice but to handle aborts. |
| **MySQL (InnoDB)** | Two-Phase Locking (2PL). | Pessimistic. **Silently converts every `SELECT` into a `SELECT FOR SHARE` lock**. Readers block writers, throughput collapses under skew. |
| **DynamoDB** | `TransactWriteItems`. | A specialized 2PC protocol. Strictly limited to 100 items and 4 MB. |

### The failure

- Turning on Serializable without a retry path. Developers often read a blog post about write skew and decide to blindly set their connection pool to `ISOLATION LEVEL SERIALIZABLE`. If they are using Postgres, their application will immediately begin throwing `40001` exceptions during peak hours, and users will see 500 errors because the code has no retry loop
- If they are using MySQL, the application won't throw exceptions, but the entire database will suddenly slow to a crawl as thousands of read queries grab shared locks and block the writers
