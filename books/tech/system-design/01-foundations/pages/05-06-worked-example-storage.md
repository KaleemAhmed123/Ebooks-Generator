## Writes × size × years

- Storage estimation is the one candidates forget. It is also the one that determines whether the data fits on one machine or needs partitioning

```
500 M events/day  ×  1 KB  =  500 GB/day

Per year:     500 GB × 365 ≈ 180 TB
× 3 replicas:                 540 TB
× 2 for indexes/overhead:    ~1 PB
Five-year retention:          ~5 PB
```

- That is the number that decides: does this fit in one database? No. It needs sharding from day one. Booklet 02, Module 8

### The numbers that get forgotten

- **Replication factor.** Most production databases keep 3 copies. Storage triples
- **Indexes.** A primary key index roughly doubles the row data. Each secondary index adds more
- **WAL / redo log.** Transaction logs consume disk proportional to write rate. They are recycled, but the working set is real
- **Compression.** Text data compresses 2–4× (Module 4, page 9). Images and video do not compress further. State whether your payload compresses

### The failure

- Sizing one disk for 180 TB/year of raw data. After replication, indexes, and five years, the answer was closer to 5 PB. The team discovered this when the disk alert fired at 18 months, not five years
