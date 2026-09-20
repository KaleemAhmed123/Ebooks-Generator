## What the interviewer probes

- **Logs vs Metrics vs Traces:** Know the difference. 
  - *Metrics:* Aggregated numbers (CPU 90%). Cheap.
  - *Logs:* Unstructured text of an event. Expensive to index.
  - *Traces:* The lifecycle of a single request across microservices.
- **Log Indexing Cost:** Indexing every single field in a log file (ElasticSearch) is ruinously expensive. Modern architectures (Loki) only index a few labels (app, region), and brute-force grep the raw text when a human actually searches for it
- **Sampling:** For high-volume traces or logs, you cannot store 100%. You must sample. Head-based sampling randomly keeps 10%. Tail-based sampling keeps 100% of *errors* and 1% of successes

### The failure

- Trying to put a 2 KB JSON payload of user details into a metric label. Metrics are numbers. Payloads go in logs.

:::interview
Your ElasticSearch cluster is costing $100,000 a month to index terabytes of logs. 99% of those logs are never searched. How do you reduce costs?

Stop indexing every field in the JSON logs. Switch to a system like Grafana Loki, which only indexes the metadata labels (app name, region) and compresses the actual log text into cheap object storage.
:::\n