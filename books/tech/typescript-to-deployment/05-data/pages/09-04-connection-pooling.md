## Connection pooling

- A database connection is expensive. PostgreSQL forks a process per connection, each taking several megabytes
- Opening one per request would spend more time connecting than querying, so clients keep a **pool** of open connections and lend them out
- The pool is also a limit, and that is the part that matters. It caps how much work can hit the database at once

### Sizing it

```
pool size per instance  x  number of instances  <  database max_connections
```

- PostgreSQL defaults to `max_connections = 100`, and each one costs memory whether it is busy or idle
- Ten instances with a pool of 20 is 200 connections, and the database refuses half of them
- **Bigger is not faster.** Past the number of CPU cores, more connections means more context switching and less throughput
- A pool of 10 to 20 per instance is right for most services. Measure before raising it

### PgBouncer

- A proxy holding one small pool to the database and accepting many connections from applications
- Essential with serverless, where instance count is unbounded

| Mode | Reuses a connection | Breaks |
|---|---|---|
| session | per client session | nothing |
| **transaction** | per transaction | `SET`, advisory locks, prepared statements |
| statement | per statement | multi-statement transactions |

- **Transaction mode** is what almost everyone runs, and it is why prepared statements must be disabled in the client
- Prisma needs `?pgbouncer=true` on the URL. Without it you get random `prepared statement already exists` errors under load
