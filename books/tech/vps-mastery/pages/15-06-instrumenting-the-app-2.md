### Buckets decide what can be asked later

- A histogram can only answer questions its buckets cover. With buckets stopping at 1 second, a 95th percentile of 4 seconds is unmeasurable
- **Choose buckets around the values that matter**, and include one above the timeout

### Business metrics are the ones worth having

```ts
const ordersPlaced = new client.Counter({
  name: "orders_placed_total",
  help: "orders successfully placed",
  labelNames: ["payment_method"],
  registers: [registry],
});
```

- CPU graphs say the machine is fine. **A flat line on `orders_placed_total` says the business is not**, and it catches failures no infrastructure metric sees

### Do not expose /metrics publicly

- It reveals route names, error rates and traffic volume. Keep it off the Nginx routing table entirely
