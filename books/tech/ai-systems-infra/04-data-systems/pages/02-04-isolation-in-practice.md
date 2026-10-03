## Isolation in practice

- Booklet 3 defined the isolation **levels**; here's what Postgres actually hands you and how to choose per transaction. Postgres implements three (its "Read Uncommitted" behaves as Read Committed — it never shows dirty data):
  - **Read Committed** (default) — each **statement** sees a fresh snapshot of committed data. No dirty reads, but two statements in the same transaction can see different data if others commit between them. Right for the vast majority of OLTP work.
  - **Repeatable Read** — the **whole transaction** sees one snapshot taken at its start (true snapshot isolation via MVCC). Reads are stable; if a concurrent write conflicts, Postgres **aborts** your transaction with a serialization error and you retry.
  - **Serializable** — adds **SSI** (Serializable Snapshot Isolation): it tracks read/write dependencies between transactions and **aborts** any that would produce a non-serializable outcome. Full correctness, at the cost of possible retries under contention.
- The practical rule: **default Read Committed is right until you have a read-then-write invariant that a concurrent transaction can violate** — then step up.

:::warn
**Write skew** (Booklet 3) slips past Read Committed *and* Repeatable Read, and it's the isolation bug that reaches production. Two transactions read an overlapping set, each checks a rule that's still true, and each writes **different** rows so neither sees the other's write — "at least one on-call engineer" becomes zero. Snapshot isolation won't catch it because no single row was written twice. Your options: raise that transaction to **Serializable** (and handle the retry), or take an explicit lock with **`SELECT … FOR UPDATE`** on the rows the invariant depends on. Choose consciously; the default will not save you here.
:::

- Because the stricter levels **abort-and-retry** rather than block, any code using Repeatable Read or Serializable must wrap the transaction in a **retry loop** on serialization failure. That's the trade: Postgres keeps throughput high by optimistically letting transactions run and failing the rare conflicting one, instead of locking everyone up front — but the application has to be ready to retry.
