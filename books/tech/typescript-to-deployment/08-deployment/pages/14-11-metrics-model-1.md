## The metric types, and the one that ends careers

- A metric is a number with labels, sampled over time. **There are four types and picking the wrong one makes a question unanswerable later**

| Type | Is | Use for |
|---|---|---|
| **counter** | only goes up, resets on restart | requests, errors, jobs processed, bytes sent |
| **gauge** | goes up and down | queue depth, connections, memory, temperature |
| **histogram** | buckets, plus a sum and a count | **latency, payload size.** The one that gives percentiles |
| summary | quantiles computed in the process | rarely. It cannot be aggregated across instances |

### Why a counter, not a gauge, for requests

- A counter is always queried with `rate()`, which handles the restart-to-zero correctly. **A gauge of "requests in the last minute" loses information and cannot be re-aggregated**

### Why a histogram, not an average

```text
100 requests: 99 at 10ms, 1 at 5000ms
average       = 59ms      "looks fine"
p99           = 5000ms    "one user waited five seconds"
```

- **An average hides every problem a user actually experiences.** Only a histogram gives percentiles, and percentiles are what people feel
- **Choose the buckets deliberately.** They must bracket your service objective, or the percentile is interpolated nonsense

```ts
buckets: [0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10]
```
