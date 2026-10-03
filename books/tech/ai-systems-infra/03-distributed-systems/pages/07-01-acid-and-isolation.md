# Transactions and Delivery

## ACID and isolation levels

- A transaction groups operations so they behave as one. **ACID** names the four promises: **Atomicity** (all of it happens or none — no half-applied state), **Consistency** (invariants/constraints hold before and after), **Isolation** (concurrent transactions don't see each other's half-done work), and **Durability** (once committed, it survives a crash). Three are easy to picture; **Isolation** is where the real subtlety — and the real bugs — live.
- Full isolation (every transaction behaves as if it ran **alone**, in some serial order) is expensive, so databases offer **weaker levels** that allow more concurrency by permitting specific **anomalies**:
  - **Read Committed** — you never read another transaction's *uncommitted* data (no dirty reads), but the same query can return different results within your transaction. **Postgres default.**
  - **Repeatable Read / Snapshot** — your transaction sees a consistent snapshot; rows you read won't change under you. **MySQL/InnoDB default** is repeatable read.
  - **Serializable** — as if transactions ran one at a time. Correct against everything, and the slowest.

:::warn
The anomaly that bites senior engineers is **write skew**, and weaker levels permit it. Two transactions each read the same data, each check a condition that's still true ("at least one doctor is on call"), and each independently update **different** rows ("I'll take myself off call") — both commit, and now **zero** doctors are on call. No row was written twice, so Snapshot isolation doesn't catch it; only **Serializable** (or an explicit lock / `SELECT … FOR UPDATE`) does. Most systems run at Read Committed or Repeatable Read, so **you don't get serializability unless you ask** — and a lot of "impossible" data states are write skew nobody designed for.
:::

- The takeaway for distributed design: these guarantees are **within one database**. The moment a transaction must span **two services or two databases**, single-node ACID no longer reaches it — and that gap is the whole rest of this module (2PC, then sagas).
