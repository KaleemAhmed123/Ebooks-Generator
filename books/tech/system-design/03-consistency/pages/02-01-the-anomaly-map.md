## The anomaly map

- In 1992, the SQL standard defined four isolation levels based on three concurrency bugs (anomalies). Unfortunately, that standard was flawed. It missed the two anomalies that cause the most damage in modern web applications: lost updates and write skew
- Today, we map databases against six distinct anomalies. The isolation level you choose determines which of these bugs your database will silently permit

| Anomaly | What it means | Prevented in Read Committed? | Prevented in Repeatable Read? | Prevented in Serializable? |
|---|---|---|---|---|
| **Dirty Write** | You overwrite an uncommitted write. | Yes | Yes | Yes |
| **Dirty Read** | You read an uncommitted write. | Yes | Yes | Yes |
| **Non-repeatable Read** | You read the same row twice and get two different values. | No | Yes | Yes |
| **Phantom** | You query a range, and a row suddenly appears. | No | Varies by vendor | Yes |
| **Lost Update** | Two users increment a counter; one is lost. | No | Varies by vendor | Yes |
| **Write Skew** | Two users write to different rows, breaking a shared rule. | No | No | Yes |

- Because vendors implemented the SQL standard differently, the exact same isolation level behaves completely differently depending on whether you are using Postgres or MySQL (InnoDB)

### The failure

- Quoting the SQL-92 standard without understanding the database engine. If you assume Repeatable Read prevents lost updates, you are correct in Postgres, but completely wrong in MySQL
