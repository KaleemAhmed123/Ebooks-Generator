## depends_on does not wait

- This is the most repeated wrong claim about Compose:

```yaml
services:
  orders:
    depends_on:
      - postgres        # DOES NOT wait for Postgres to be ready
```

- Plain `depends_on` controls **start order only**. Compose starts the Postgres container, then immediately starts the orders container
- Postgres takes several seconds to accept connections. The application connects during that gap and fails

```text
Error: connect ECONNREFUSED 172.19.0.3:5432
```

- The stack then appears to work on a fast machine and fail on a slow one, which is why the belief survives
