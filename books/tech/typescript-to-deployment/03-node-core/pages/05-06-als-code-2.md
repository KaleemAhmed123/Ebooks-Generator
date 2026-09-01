### What it is good for

- Correlation ids for logs and traces
- The current user or tenant, for audit records
- A per-request database transaction handle

### The cost

- Small but not free. It hooks into every async operation
- Store a few small values, not a request-scoped cache
