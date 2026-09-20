## Tunable consistency per request

- Cassandra exposes W and R as a **consistency level** chosen per query, not per cluster. The same table can take fire-and-forget metrics writes and quorum reads of the account row

| Level | Waits for | Use when |
|---|---|---|
| `ONE` / `TWO` / `THREE` | That many replicas, any data centre | Fastest; a stale read is acceptable |
| `LOCAL_ONE` | One replica in the coordinator's data centre | Latency-bound, region-local |
| `QUORUM` | ⌊N/2⌋ + 1 replicas across all data centres | Overlap with a `QUORUM` write |
| `LOCAL_QUORUM` | A quorum inside the coordinator's data centre | Multi-region with region-local latency; the common production choice |
| `EACH_QUORUM` | A quorum in every data centre (writes) | A write must be durable in every region before the ack |
| `ALL` | Every replica | Strongest; one dead replica fails the request |
| `ANY` | Any node, including a hint holder (writes only) | Never for data you need to read back |

- The overlap rule is per pair: a `QUORUM` write and a `QUORUM` read overlap when the replication factor is the N. `ONE` writes with `ALL` reads overlap too, and cost the read everything
- The level is a latency knob as much as a consistency knob: each step up waits for one more, slower, reply

### The failure

- `LOCAL_QUORUM` writes in one data centre and `LOCAL_QUORUM` reads in another. Each quorum is local; the two sets need not share a replica, so `W + R > N` holds inside each region and fails across them. A read in Frankfurt can miss a write that a quorum in Virginia acknowledged
- `ANY` for a write that matters. It succeeds once a hint exists. If the hint holder dies before delivering, the write is gone, and it was acknowledged
