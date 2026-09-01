## Prometheus - continued

- Listing both colors means a target is always down, which is correct. `up == 0` for the inactive color is expected, and the alert on page 15-09 must exclude it

### Cardinality is the failure mode

- Every distinct label combination is a separate series. A label carrying a user ID or a full URL path produces millions
- **Never label a metric with anything unbounded.** It is the fastest way to make Prometheus consume all available memory

```ts
// wrong
httpDuration.labels(req.path).observe(ms);        // /orders/8812 is a new series
// right
httpDuration.labels(req.route?.path ?? "unknown").observe(ms);   // /orders/:id
```
