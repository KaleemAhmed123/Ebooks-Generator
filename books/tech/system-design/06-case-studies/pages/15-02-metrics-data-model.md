## Data model

- A time series is identified by a **Metric Name** and a set of **Labels** (Key-Value pairs)
  - `cpu_usage{host="server-1", region="us-east", env="prod"}`
- A single data point (Sample) is just two values: `(timestamp, value)`
- **Cardinality:** This is the most dangerous concept in metrics. Cardinality is the number of unique label combinations. If a metric has 3 regions and 100 hosts, its cardinality is 300
- If you add `user_id` as a label, and you have 10 million users, you just created 10 million unique time series for a single metric. The system will collapse

### The failure

- Using unbound, high-cardinality values (like User IDs, Session IDs, or exact URLs) as metric labels. Time series databases index labels heavily. High cardinality causes Out-Of-Memory (OOM) crashes.

:::interview
A junior engineer wants to track API latency. They create a metric: `api_latency{endpoint="/v1/users", user_id="12345"}`. Why is this a disaster?

Because `user_id` has unbounded cardinality. If 10 million users hit the API, the system creates 10 million individual time series in memory, crashing the metrics database. User IDs belong in Logs, not Metrics.
:::\n