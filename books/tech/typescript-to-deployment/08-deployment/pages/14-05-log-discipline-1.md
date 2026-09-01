## Levels, fields and redaction

### Levels, and what each one means operationally

| Level | Log at it when | In production |
|---|---|---|
| `fatal` | the process cannot continue | pages someone |
| `error` | a request failed, and it is your fault | **alerts on rate** |
| `warn` | something recovered, or a limit was hit | reviewed, not alerted |
| `info` | a request completed, a job ran, state changed | **the default level** |
| `debug` | the detail you want while investigating | off, raised temporarily |
| `trace` | every step | never in production |

- **A caller sending a bad request is `warn` or `info`, not `error`.** A `400` is the system working. Logging it as an error makes the error rate meaningless

### The fields every line carries

```ts
logger.info({
  requestId,                 // one request, every line
  traceId,                   // joins the log to the trace
  tenantId, userId,          // is this one customer or everyone
  route: req.route?.path,    // the PATTERN: /orders/:id, never /orders/o_842
  method, status, durationMs,
}, "request")
```

- **The route pattern, not the URL.** An id in the field makes grouping impossible and, in metrics, takes the backend down
