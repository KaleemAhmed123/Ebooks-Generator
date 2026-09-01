## PromQL

- Four ideas cover most real queries: **selector, `rate`, aggregation, and `histogram_quantile`**

### Selecting

```promql
http_requests_total                                        # every series
http_requests_total{service="orders-api", status=~"5.."}   # filtered
http_requests_total offset 1h                              # an hour ago
```

### `rate`, which is how counters are read

```promql
rate(http_requests_total[5m])                    # per second, averaged over 5 minutes
increase(http_requests_total[1h])                # how many in the last hour
irate(http_requests_total[1m])                   # instantaneous. Spiky, for graphs only
```

- **Never graph a counter directly.** It is a line going up forever. `rate` is what makes it meaningful
- **The window must be at least four scrape intervals.** `[5m]` with a 15 second scrape is fine; `[20s]` is not

### Aggregating

```promql
sum(rate(http_requests_total[5m]))                          # total per second
sum by (route) (rate(http_requests_total[5m]))              # per route
sum without (instance) (rate(http_requests_total[5m]))      # collapse instances
topk(5, sum by (route) (rate(http_requests_total[5m])))
```
