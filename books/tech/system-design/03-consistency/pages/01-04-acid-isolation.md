## Isolation is the expensive letter

- If two clients modify the same data at exactly the same time, what happens? **Isolation** guarantees that concurrently executing transactions do not step on each other's toes
- The strongest level of isolation is **Serializable**. It guarantees that the outcome of executing multiple transactions concurrently is exactly the same as if they had executed sequentially (one after another, with no overlap)
- But Serializable isolation requires the database to carefully coordinate reads and writes, which is slow. To improve performance, databases offer weaker isolation levels (like Read Committed) that allow transactions to overlap in unsafe ways

:::interview
**The contract you didn't read**
Every isolation level below Serializable is a compromise. It explicitly permits certain concurrency bugs (anomalies) to pass through to your application in exchange for speed. The isolation level is a contract you are signing. If you don't know what anomalies it allows, you don't know what bugs are running in your production database.
:::

### The failure

- Assuming "we use transactions, so it is safe." If your database is running at Read Committed isolation (which is the default in Postgres), your transactions are absolutely overlapping. The database will happily allow two users to withdraw the last $100 from an account at the same time, unless you explicitly lock the rows or upgrade the isolation level
