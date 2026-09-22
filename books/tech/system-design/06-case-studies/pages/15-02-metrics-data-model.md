## Data model

- A **series** is a metric name plus a set of label pairs, `http_requests_total{service="api", region="eu", status="500"}`; a **sample** is a timestamp and a value. Prometheus's model, and every pipeline's since: the name says what is measured, the labels say where, and the series is the unit that is stored, indexed and counted
- **Cardinality** is the number of distinct label combinations, which is the number of series, which is the cost: each series is an index entry, a memory buffer for its hot window (page 4) and a stream of samples forever. A label multiplies cardinality by the number of values it takes

| Labels on `http_requests_total` | Series | Where it lands |
| :--- | :--- | :--- |
| `service` (50) × `status` (10) | 500 | nothing |
| + `region` (5) × `instance` (10 000 hosts ÷ 50 services = 200 per service) | 500 000 | fine: hosts are bounded and named |
| + `path` (100 routes) | 50 M | the 10 M budget is gone; a histogram's buckets multiply it again by 10 or more |
| + `user_id` (10 M users) | 5 × 10¹³ | the failure below: a series per user per route per host, most touched once |

- Three metric types, each a cardinality choice: a **counter** only goes up and is queried as a rate; a **gauge** is a value now; a **histogram** is a counter per bucket, so a latency histogram with 12 buckets is 12 series per label set, and its buckets are the label to cut first when the budget is tight
- Anything unbounded, a user id, a request id, an email, a raw URL with ids in it, belongs in a log line or a trace (page 6), where it is one record, not a series that lives until the retention ends

### The failure

- A user id as a label. It looks like one label; it is one series per user, and a series costs memory, an index entry and a slot in every scrape whether or not that user comes back. Ten million users turn a 500-series metric into a pipeline-sized one, and the collector runs out of memory before anyone queries by user. Ids go in logs
