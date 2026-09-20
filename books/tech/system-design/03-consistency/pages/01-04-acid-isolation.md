## Isolation is the expensive letter

- **Isolation** decides what a transaction may see of others running at the same time. The strongest level, **serializable**, promises the result equals some one-at-a-time order of the transactions
- Every level below serializable lets named interleavings through. The level is a contract; the anomalies it permits are the small print, and Module 2 reads it line by line
- Serializable costs coordination: locks, or tracking who read what and aborting on conflict (Module 3). So vendors default lower. Postgres defaults to Read Committed, InnoDB to Repeatable Read, and the two Repeatable Reads are not the same thing (Module 2, page 5)

:::interview
"We wrap it in a transaction, so it is safe. Is it?" — Against crashes, yes. Against concurrent transactions, only as safe as the isolation level. At Postgres's default, Read Committed, two transactions can both read a balance of 100, both compute 40, and both commit; the balance ends at 40 instead of below zero. Safety needs an atomic update, a lock, or a higher level, and each is a page in Module 2.
:::

### The failure

- Trusting the level's name instead of its anomaly list. Repeatable Read sounds complete; in Postgres it still permits write skew (Module 2, page 9), the on-call roster bug. Check the table on Module 2, page 1 before trusting any name
