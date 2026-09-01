## Talking to a database

- A long-running server opens a pool of database connections once at boot and reuses them for its whole life
- Serverless breaks that assumption completely, because there is no single long-running process
- Each concurrent request can land on its own instance, and every instance opens its own pool
- The database has a fixed connection limit, and it is far smaller than the number of instances a traffic spike creates
- So the failure is not gradual. Everything works, then every query fails at once with a connection error
- This is a serverless problem rather than a Next.js one, and it appears the first day real traffic arrives

### Why it bites

- Each serverless function instance is its own process
- Each process opens its own connection pool
- Traffic scales, instances multiply, and every one of them takes connections

```
100 concurrent requests
  -> 100 function instances
  -> 100 pools x 10 connections
  -> 1000 connections

Postgres default max_connections: 100
```

- The database refuses new connections and everything fails at once
