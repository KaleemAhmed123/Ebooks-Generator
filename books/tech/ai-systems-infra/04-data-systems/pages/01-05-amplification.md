## Write, read, and space amplification

- The B-tree vs LSM choice comes down to three **amplification** factors — how much *extra* work each byte of logical data costs. Naming them turns a vague "which is faster?" into a precise match against your workload:
  - **Write amplification** — bytes physically written per byte of data. B-trees rewrite whole pages in place plus the WAL; LSMs rewrite data repeatedly during **compaction**. Both amplify writes, differently.
  - **Read amplification** — storage reads per lookup. A B-tree reads one path (~3–4 pages). An LSM may probe the memtable plus several SSTables (Bloom filters cut this, but not to one).
  - **Space amplification** — disk used per byte of data. B-trees leave partially-empty pages (fragmentation); LSMs hold **superseded versions and tombstones** until compaction reclaims them.

:::mint
```text
                 WRITE path        READ path         SPACE
  B-tree         random, in-place  1 path, fast      fragmentation
                 + WAL (higher     + predictable     (half-full pages)
                 write-amp)
  LSM-tree       sequential append several SSTables  old versions +
                 + compaction      (read-amp; Bloom  tombstones until
                 (high throughput) filters help)     compaction
```
:::

- The decision rule, stated once: **write-heavy / append-mostly / high-ingest** (events, metrics, logs, time-series, heavy KV writes) → **LSM**. **Read-heavy / range-scan / transactional** (joins, reports, "give me a sorted page of rows") → **B-tree**. Compaction also means LSM performance is **bursty** — a big compaction can briefly steal I/O and spike latency, something B-trees don't do but write-amp does to them steadily.

### Module 1 — checkpoint
- **Key concepts:** storage engine beneath the query layer · B-tree (sorted pages, in-place, read/range-friendly, write-amp) · LSM (memtable→SSTable→compaction, sequential writes, read/space-amp, Bloom filters, tombstones) · WAL + `fsync` + group commit · the three amplifications.
- **Task + questions:** classify these for engine choice — a metrics ingest pipeline, an orders table with reporting; then say which amplification compaction attacks and which it worsens.
- **Next:** Module 2 — relational databases done right.
