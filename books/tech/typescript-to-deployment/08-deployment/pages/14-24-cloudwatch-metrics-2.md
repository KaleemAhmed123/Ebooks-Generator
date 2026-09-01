### Sending your own metrics

```ts
logger.info({
  _aws: {
    Timestamp: Date.now(),
    CloudWatchMetrics: [{
      Namespace: "Orders",
      Dimensions: [["Service"]],
      Metrics: [{ Name: "OrderValuePaise", Unit: "None" }],
    }],
  },
  Service: "orders-api",
  OrderValuePaise: 50000,
}, "order created")
```

- That is the **embedded metric format**: a log line that CloudWatch also reads as a metric. **No extra API call, no added latency**
- The alternative, `PutMetricData`, is a network call on the request path and is billed per call

### Cardinality, the trap

- **A dimension with an unbounded value creates one metric per value.** A `userId` dimension with a million users is a million metrics and a very large bill
- Dimensions are for things with tens of values: service, route pattern, environment, status class
