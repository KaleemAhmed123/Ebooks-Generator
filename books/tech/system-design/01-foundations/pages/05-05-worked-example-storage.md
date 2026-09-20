## Writes × size × years

- Storage estimation is the one candidates forget. It is also the one that determines whether the data fits on one machine or needs partitioning

```
500 M events/day  ×  1 KB  =  500 GB/day

Per year:     500 GB × 365 ≈ 180 TB
× 3 replicas:                 540 TB
× ~2 for indexes and logs:   ~1 PB
Five-year retention:          ~5 PB
```

- Five petabytes does not fit one database. That number alone puts **sharding**, splitting the data across machines, on the whiteboard from day one. Booklet 02, Module 6

### The numbers that get forgotten

- **Replication factor.** Three copies is the usual production setting. Storage triples
- **Indexes.** Each index stores the columns it covers plus pointers, in the same order of size as the data. Count every secondary index
- **WAL / redo log.** Transaction logs consume disk proportional to write rate. They are recycled, but the working set is real
- **Compression.** Text compresses; images and video are already compressed and do not. State which your payload is

### The failure

- Sizing one disk for 180 TB/year of raw data. After replication, indexes, and five years, the answer was closer to 5 PB. The team discovered this when the disk alert fired at 18 months, not five years
