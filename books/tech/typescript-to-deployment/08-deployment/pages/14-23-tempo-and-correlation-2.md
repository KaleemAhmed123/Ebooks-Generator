### The path through an incident

```text
1. an alert fires on error rate            (Prometheus)
2. the dashboard shows which route         (Grafana)
3. click the panel to its logs             (Loki, filtered to the same service)
4. click traceId in a log line             (Tempo, the whole request)
5. the trace shows which span was slow     (a database call, 4.2 seconds)
6. back to the log for that span           (the query, and the parameters)
```

- **Each arrow is one click if the derived field from the Grafana page is configured.** Without it, each step is a manual search and the incident takes an hour longer

### Exemplars, the last connection

- **An exemplar attaches a trace id to a specific histogram sample**, so clicking the spike in a p99 graph opens the exact slow request that caused it
- It needs `--enable-feature=exemplar-storage` on Prometheus and exemplar support in the client. **It is the fastest path from a graph to a cause there is**

### Sampling

- **Tracing every request is expensive.** Ten percent, plus every error and every request over one second, is the shape that works
