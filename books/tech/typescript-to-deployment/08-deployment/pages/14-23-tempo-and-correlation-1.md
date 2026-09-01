## Joining the three signals

- Metrics, logs and traces are only worth the effort if you can move between them. **The join key is the trace id**

```yaml
# tempo.yml
server: { http_listen_port: 3200 }
distributor:
  receivers:
    otlp: { protocols: { http: {}, grpc: {} } }
storage:
  trace:
    backend: local
    local: { path: /var/tempo/blocks }
    wal: { path: /var/tempo/wal }
compactor:
  compaction: { block_retention: 168h }
```

### Putting the trace id on every log line

```ts
import { trace } from "@opentelemetry/api"

app.use((req, res, next) => {
  const span = trace.getActiveSpan()
  req.log = logger.child({
    requestId: req.id,
    traceId: span?.spanContext().traceId,
  })
  next()
})
```

- **That one field is what makes the whole stack work together.** Without it there are three systems and no way to cross between them
