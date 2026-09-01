## Glossary: A to B

| Term | Means | # |
|---|---|---|
| **`as const`** | freezes a literal so its type is the exact value rather than the widened one | 1 |
| **assertion function** | a function whose return type is `asserts x is T`, narrowing the caller's variable | 1 |
| **AsyncLocalStorage** | Node's way of carrying request context through async calls without passing it down | 3 |
| **at-least-once** | delivery that may repeat a message, so the consumer must be **idempotent** | 5 |
| **at-most-once** | delivery that may lose a message but never repeats it | 5 |
| **ASG** | Auto Scaling Group. Keeps a target number of EC2 instances alive across zones | 8 |
| **autovacuum** | the Postgres process that reclaims space from dead rows. Falling behind causes **bloat** | 5 |
| **AWS CLI** | the command line client for AWS. What this book uses rather than the console | 8 |
| **backfill** | filling a new column or table with data for rows that already existed | 5 |
| **backoff** | waiting longer between each retry rather than hammering a failing service | 6 |
| **backpressure** | the signal that a consumer cannot keep up, so the producer must slow down | 3 |
| **bearer token** | a credential where holding it is enough. Anyone who copies it can use it | 6 |
