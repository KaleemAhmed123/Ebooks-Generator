### Tuning on a small box

| Setting | Rule of thumb |
|---|---|
| `shared_buffers` | 25% of the memory limit given to the container |
| `max_connections` | Total pool sizes across every service, plus 10 |

- Each connection costs several megabytes. Twelve services with a pool of 20 each is 240 connections, which is a memory problem before it is a database problem. Use a smaller pool per service, or a connection pooler

### Connecting from a laptop

```bash
ssh -L 5433:localhost:5432 kaleem@203.0.113.10
```

- An SSH tunnel, never a published port
