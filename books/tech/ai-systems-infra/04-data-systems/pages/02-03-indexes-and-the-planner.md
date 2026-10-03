## Indexes and the query planner

- An **index** is a separate sorted structure (usually a B-tree, Module 1) that maps a column's values to the rows holding them, so the database can **jump** to matching rows instead of scanning the whole table. Without one, a `WHERE email = ?` is a **sequential scan** — read every row — which is fine for 1,000 rows and catastrophic for 100 million.
- But you don't *tell* the database to use an index; the **query planner** decides. It estimates the cost of each possible plan — sequential scan, index scan, which join algorithm, which order — using **table statistics** (row counts, value distributions) gathered by `ANALYZE`, and picks the cheapest. This is why the *same* query can be fast today and slow next month: the data changed, the statistics went stale, and the planner's estimate flipped to a worse plan.

:::lab
Learn to read the one tool that ends guessing: **`EXPLAIN ANALYZE <query>`**. It prints the plan the planner chose **and** what actually happened when run. Look for: **`Seq Scan`** on a big table (usually a missing index), a huge gap between **estimated** and **actual** rows (stale statistics → run `ANALYZE`), and expensive join nodes. Add an index on the filtered/joined column, re-run, and watch `Seq Scan` become `Index Scan` with the time dropping orders of magnitude. Do this before adding hardware — most "slow database" tickets are one missing index.
:::

- Indexes are not free, which is the trap of "just index everything." **Every index must be updated on every write** to that table, so each one slows `INSERT`/`UPDATE`/`DELETE` and consumes disk and cache. The discipline: index the columns you actually filter, join, and sort on; use **composite** indexes matching your query's shape (and column order matters); and drop indexes nothing uses. Over-indexing turns a write-fast table into a write-slow one — the B-tree write amplification of Module 1, multiplied per index.
