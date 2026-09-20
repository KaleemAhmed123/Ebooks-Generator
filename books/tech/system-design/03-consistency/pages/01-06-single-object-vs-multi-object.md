## Single-object vs multi-object

- Nearly every store makes one write to one key atomic: increment, compare-and-set, replace a document. That is a **single-object** operation, and it needs no coordination beyond one row lock
- A **multi-object transaction** makes writes to several rows or tables commit or abort together. It needs a log and locks that span the objects, and stores built for throughput leave it out or fence it in

| Store | Single-object | Multi-object |
|---|---|---|
| Postgres | any row | any rows, any tables, one transaction |
| Redis | every command | `MULTI`/`EXEC` runs a block with no other client served in between; a failed command inside it does not roll back the rest |
| DynamoDB | conditional writes (`ConditionExpression`) | `TransactWriteItems`: up to 100 items, 4 MB, one Region; two underlying writes per item, prepare then commit |
| Cassandra | lightweight transactions (`IF`), one partition | logged `BATCH`: all operations eventually complete or none do, but isolated only within one partition |

- Every row's marketing page says "transactions". Ask which column it means before the data model depends on it

### The failure

- `BatchWriteItem` treated as a transaction. It is a batch: some puts succeed, some come back unprocessed, and the caller retries those. Two items that must agree go through `TransactWriteItems`, or become one item
