## Knowing how the API is used

- Deciding to retire a version, change a default or fix a slow endpoint all need the same thing: numbers about who calls what
- Without them, deprecation becomes an argument and every change carries unknown risk

### What to record on every request

```ts
logger.info({
  route: req.route?.path,        // /orders/:id, never /orders/o_842
  method: req.method,
  status: res.statusCode,
  durationMs,
  apiVersion: "v1",
  clientId: req.auth?.clientId,
  requestId: req.id,
}, "request")
```

- **The route pattern, not the URL.** A label carrying an id creates one metric series per order, which Booklet 4 covers as the way to take a metrics backend down
- **The client id** is what turns usage into a per-consumer view, and it is what makes a deprecation email possible

### The four numbers worth a dashboard

| Metric | Answers |
|---|---|
| requests per route per version | which endpoints matter, and who is still on v1 |
| p50, p95 and p99 latency per route | which endpoint is actually slow |
| error rate split 4xx against 5xx | whether callers are wrong or you are |
| requests per client | who to warn, and who is abusing a limit |

### Retiring a version with evidence

- Announce it, send `Deprecation` and `Sunset` headers, then watch the v1 traffic per client
- Contact the clients still on it, by name, using the numbers
- **Brown-outs before the shutdown.** Return `410 Gone` for an hour on an announced date, twice, before the permanent switch off
- A client that only discovers the deprecation from a brown-out still has time to react
