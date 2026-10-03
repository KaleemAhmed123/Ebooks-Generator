## RDS and Aurora

- **RDS** (Relational Database Service) is **managed** Postgres/MySQL/MariaDB/SQL-Server/Oracle: AWS runs the engine you already know (Booklet 4) and takes over the operational toil — **patching, backups, point-in-time recovery, monitoring, and failover**. You trade some control (no OS/superuser access, version choices on AWS's schedule) for not being paged at 3am for a disk or a failed failover.
- The two availability/scaling features map straight onto Booklet 3/4:
  - **Multi-AZ** — RDS keeps a **synchronous standby** in another AZ and **fails over automatically** (usually 1–2 minutes) if the primary dies. This is for **availability**, not read scaling — the standby doesn't serve reads; it's a hot spare. The DNS endpoint flips to the new primary (Booklet 2's DNS failover).
  - **Read replicas** — **asynchronous** copies that *do* serve reads, for read scaling — carrying the replication lag and read-your-writes caveat from Booklet 4. Use them for read-heavy workloads and analytics, not for data you must read back immediately after writing.
- **Aurora** is AWS's cloud-native reimplementation of Postgres/MySQL: it **separates storage from compute**, putting a distributed, auto-growing storage layer under the engine. The payoff is faster failover, storage that scales to 128 TB without you managing it, up to **15 low-lag read replicas**, and **Aurora Serverless** (capacity that scales with load, down toward zero). It's wire-compatible with Postgres/MySQL, so your app doesn't change.

:::note
How to choose on AWS: **RDS Postgres** is the sane default (Booklet 4's "start relational"), managed. Move to **Aurora** when you need its scaling/failover characteristics or Serverless's elasticity, accepting slightly higher cost and AWS lock-in. Reach past both to **DynamoDB** (next page) only when the access pattern is key-value at a scale or write rate a single primary can't serve (Booklet 4's selection framework) — not by default. The managed service removes the ops, but the **engine trade-offs from Booklet 4 still decide correctness and performance** — AWS runs the database; it doesn't change what the database *is*.
:::
