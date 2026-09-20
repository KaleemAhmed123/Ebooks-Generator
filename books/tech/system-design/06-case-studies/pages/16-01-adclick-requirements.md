# Ad-Click Aggregation

### Requirements and numbers

- Ad-click aggregation calculates how many times an ad was clicked, and how much money is owed
- **In scope:** Ingesting clicks, windowed aggregation, exactly-once guarantees, reconciliation
- **Out of scope:** The ad-targeting engine (which ad to show)

| Metric | Requirement |
|---|---|
| **Volume** | 1 Billion clicks/day (12,000/s avg, 50,000/s peak) |
| **Correctness** | Absolute. This system calculates money |
| **Latency** | End-to-end processing in under 1 minute |

- **The core constraint:** 12,000 events a second is not massive scale. A single Redis node can handle it. The difficulty is entirely about *correctness*. You cannot drop clicks, you cannot double-count clicks, and you must handle late-arriving events

### The failure

- Treating this like a metrics pipeline and saying "it's approximately right". If you under-count clicks by 1%, a company with $1B in revenue loses $10,000,000. 

:::interview
You design an Ad-Click aggregator using UDP for ingestion and a best-effort NoSQL counter. Why does the product manager reject your design?

Because ad clicks directly determine billing and revenue. UDP drops packets, and best-effort counters drift. The system requires exactly-once processing guarantees and strict reconciliation.
:::\n