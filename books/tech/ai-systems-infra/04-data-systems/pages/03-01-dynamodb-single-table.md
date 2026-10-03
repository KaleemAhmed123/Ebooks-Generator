# The NoSQL Family

## DynamoDB and single-table design

- **DynamoDB** is a fully-managed key-value / wide-column store that trades SQL's flexibility for **predictable single-digit-millisecond latency at any scale**. The deal is strict: every access is by **key**. You choose a **partition key** (hashed to place the item on a node — Booklet 3's hash partitioning) and an optional **sort key** (orders items within a partition for range queries). Lookups by those keys are O(1)-ish and flat no matter how big the table gets; **anything else is not supported** — no joins, no ad-hoc `WHERE` on arbitrary columns, no "just add a query later."
- That constraint forces a mindset flip: **model your access patterns first, then design the keys to serve them** — the opposite of relational modelling (normalize entities, query freely afterward). This leads to **single-table design**: put many entity types in **one** table, using composite keys (`USER#123 / ORDER#456`) and **Global Secondary Indexes (GSIs)** so that each of your known queries is a single key lookup. It looks strange — orders, users, and line-items in one table — but it means every query is one fast partition read with no joins.

:::warn
DynamoDB inherits Booklet 3's **hot-partition** failure directly. Throughput is spread across partitions by the partition key, so a **low-cardinality or skewed key** (everything under `status=PENDING`, or one celebrity user) concentrates load on one partition, which throttles with `ProvisionedThroughputExceeded` **while the table's overall capacity sits mostly idle**. Scaling the table's capacity doesn't fix a single hot key. Fixes are Booklet 3's: a high-cardinality partition key, write-sharding a hot key with a suffix, or caching it (DAX / Module 4). Choose the partition key for **even access**, not for what's convenient to model.
:::

- Capacity comes in two modes: **on-demand** (pay per request, scales automatically — good for spiky/unknown load) and **provisioned** (you set capacity units, cheaper for steady predictable load). And per read you choose **eventually consistent** (cheaper, may miss the very latest write) or **strongly consistent** (Booklet 3's trade, priced in) — consistency as a per-query knob, exactly as PACELC predicts.
