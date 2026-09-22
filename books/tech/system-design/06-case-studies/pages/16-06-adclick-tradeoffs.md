## What the interviewer probes

| Probe | The answer that holds |
| :--- | :--- |
| a hot ad | one ad at 50 000 clicks/s is one partition and one consumer (page 2). Salt the key for that ad, `ad_id:0` … `ad_id:9`, so its clicks spread over ten partitions with a partial count each, and sum the partials per minute in a second stage. Booklet 02 owns hot partitions; the batch (page 5) has no such problem, because it reads everything |
| the store for the counts | a columnar, time-partitioned store: rows are (ad, minute, count), queries are ranges by ad and time and top-N by minute, and the table is written once per closed window and once more by the batch, never incremented. Not the row store the raw log would want, not Redis |
| where the fraud filter runs | between the raw log and the aggregator, as its own consumer that marks a click fraudulent by id. The aggregator skips marked clicks; the raw log keeps them, so a filter improved next month can be rerun over last month's clicks by the batch. Never a delete |
| the query API | count for one ad over a range of minutes; counts for many ads at one minute; the top-N ads in a minute, which is precomputed per closed window by Module 17's method, not sorted at query time |
| the late click that arrives a day later | it is in the log with its event time; the batch for that day is rerun or a correction row is written; the invoice for that day carries the correction. Late is a business rule, "clicks count for up to 3 days", not a stream setting |
| the raw log's retention | long enough to replay a bug and to answer a billing dispute, 90 days here (page 1); after that the final table is the record |

- The metric: the reconciler's daily difference (page 5) and the end-to-end latency from click to provisional count, which Photon reports under 10 seconds on average for its join
- Cross-references the design leans on: partitioning, event time, watermarks, checkpoints and batch versus stream (booklet 04); hot partitions and salting (booklet 02); idempotency keys (booklet 01); top-N per window (Module 17); the payment ledger the invoices settle into (Module 11)

### The failure

- One ad id owns one partition. It is the right key for every ordinary ad and the wrong one for the one ad the whole design will be judged on, the campaign that goes viral during the game. Salting is a per-key decision made when a partition's lag climbs, and the sum of partials is the price of never splitting a window across machines for the other 999 999 ads
