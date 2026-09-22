# Module 16 - Ad-click aggregation

## Requirements and numbers

- An ad-click aggregator counts, for every ad, how many times it was clicked in each minute, and serves those counts to advertisers and to billing. The shape: a moderate event rate, a small output, and a correctness bar that most streaming systems are not built to: the numbers are invoices
- Functional, in: record a click; the count per ad per minute over any range; the top-N ads per minute (Module 17 owns the top-N mechanism). Out: choosing which ad to show, attribution across devices, the billing system that consumes the totals
- Non-functional: no click lost, no click counted twice, a click counted in the minute it happened in, not the minute it arrived; results within a minute for the dashboard; final results that can be audited from the raw events
- Inputs, as assumptions: 1 B clicks a day; a peak of 5× the average; an event of 100 bytes; the raw log kept 90 days; 1 M ads active; queries over the last few hours dominate

| Quantity | Arithmetic | Result |
| :--- | :--- | :--- |
| click rate | 1 B ÷ 86 400 s | ≈ 11 600, call it 12 000/s average; ≈ 60 000/s at peak: a few log partitions carry it (page 2) |
| raw log | 1 B × 100 B × 90 days | ≈ 9 TB, kept, because it is what every count is recomputed from (page 5) |
| aggregate rows | 1 M ads × 1 440 minutes | ≤ 1.4 B rows a day if every ad were clicked every minute; the real count is the active pairs, far fewer, in a columnar store (page 6) |
| dedupe state | 60 000/s × a 10-minute late window | ≈ 36 M click ids held to catch a replay (page 4): a few hundred MB, checkpointed |

- The numbers say the rate is ordinary and the discipline is not: an append-only raw log (page 2), windows on event time (page 3), exactly-once by dedupe on a click id (page 4), and a batch that recomputes and wins (page 5)

### The failure

- "Approximately right." A count-min sketch (Module 17) or a metrics pipeline (Module 15) drops or over-counts by a fraction of a percent and is honest about it; at 1 B clicks a day, 0.1 % is a million clicks that were or were not billed. Money is counted exactly, from a log that is never thrown away, and the fast path is allowed to be provisional only because the slow path corrects it
