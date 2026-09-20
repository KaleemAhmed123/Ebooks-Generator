## Single-object vs multi-object

- When a database marketing page advertises "ACID transactions", you must immediately ask: single-object or multi-object?
- A **single-object transaction** guarantees atomicity and isolation, but only for a single key or row. Almost every database in existence provides this. You can increment a counter or compare-and-set a single JSON document safely
- A **multi-object transaction** guarantees atomicity and isolation across completely unrelated rows, tables, or collections

| Database | Multi-object transactions? | Single-object transactions? |
|---|---|---|
| **Postgres** | Yes (across all tables) | Yes |
| **Redis** | No | Yes (atomic commands, Lua scripts) |
| **DynamoDB** | Yes (via `TransactWriteItems`) | Yes (via `ConditionExpression`) |
| **Cassandra** | No (Batch applies to one partition) | Yes (Lightweight Transactions) |

- **Why multi-object is hard**: To coordinate writes across different physical disk blocks (or different physical servers), the database must use memory-heavy locks and complex crash-recovery logs. Many NoSQL stores abandoned multi-object transactions entirely to achieve higher throughput

### The failure

- Assuming your NoSQL database's "batch" endpoint is atomic. Developers frequently write code assuming that inserting two users into DynamoDB using `BatchWriteItem` is a transaction. It is not. The first insert might succeed while the second fails
- If you need a true multi-object transaction in DynamoDB, you must use the `TransactWriteItems` API, which costs twice as much capacity and has strict limits on item count
