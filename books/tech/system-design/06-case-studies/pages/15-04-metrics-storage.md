## Time-series storage

- We are storing a continuous stream of `(timestamp, value)` pairs. e.g. `(1620000000, 45.2), (1620000010, 45.3), (1620000020, 45.2)`
- **Compression (The Gorilla Paper):** Storing raw 64-bit timestamps and 64-bit floats is too expensive (16 bytes per point). 
  - Timestamps increase steadily by 10s. We store the "Delta of Deltas" (which is usually 0)
  - Values change slowly. We XOR the current float against the previous float, which yields mostly zeros
  - This compresses 16 bytes down to ~1.37 bytes per point (12x compression)
- **Tiering:** Recent data (last 2 hours) is kept entirely in RAM. Older data is flushed to immutable blocks on disk. Very old data is pushed to cold Object Storage (S3)

### The failure

- Storing time-series data in a standard relational database with a row per sample `(id, metric_name, timestamp, value)`. The B-Tree indexes will thrash the disk to death on inserts.

:::interview
You are tasked with storing 10 million metrics per second. You propose writing them to PostgreSQL. Why will this fail?

Standard B-Tree indexes degrade exponentially under massive, continuous insert load. You must use an optimized Time-Series Database (TSDB) that keeps recent data in memory and flushes to disk in compressed, append-only blocks.
:::\n