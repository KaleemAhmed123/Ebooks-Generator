## What the interviewer probes

| Probe | The answer that holds |
| :--- | :--- |
| logs, metrics, traces: which for what | a **metric** is a number sampled over time, cheap per point and cheap to query, and it carries no ids (page 2). A **log** is one event with all its fields, including the ids, expensive to keep and to search. A **trace** is the set of spans one request produced across services, joined by a trace id, and it is the only one that answers "where did this request spend its time". Each is a pipeline; they meet on the trace id, carried in the log line and as an exemplar on the metric |
| the log index bill | index a few labels, service, host, level, and store the line compressed; search filters by label to a small slice and then scans the text. Indexing every field of every JSON line costs more than storing the lines, and most fields are never queried |
| sampling | traces at 100 % are a second copy of the traffic; keep every trace with an error or over a latency threshold and a fixed fraction of the rest, decided after the request finishes, tail-based, so the interesting ones are never the ones dropped |
| retention tiers | hot for days on fast disk, warm for weeks, cold in object storage for the year, with the query engine reading all three; logs and traces follow the same tiering as the samples on page 5 (booklet 05 owns the observability stack) |
| high cardinality, again | a request id, user id or raw URL never goes on a metric; it goes in the log line and the trace, which are per event and do not create a series (page 2) |
| the pipeline itself is down | the log agent buffers on the host's disk and pushes when Kafka is back (page 3); a scrape gap is visible as a gap, which is the correct thing for it to be; the alert on "no data" is the alert for the pipeline |

- The metric: series count against the budget, and the log bytes ingested per day against the bytes queried, which says whether the index is earning its cost
- Cross-references the design leans on: Kafka for the log path (booklet 04); the observability stack, object storage and its tiers (booklet 05); Module 5 for alert delivery; Module 16 for counting that must be exact

### The failure

- Indexing every log field. Every JSON key becomes an index, every line a hundred index writes, the index outgrows the data, and the cluster is sized for a search nobody runs. Index what queries filter on; scan the rest, because a scan over a label-narrowed slice is fast and an index over everything is not
