## What the interviewer probes

- **Telling the client:** Do not just drop the request silently. Return HTTP 429 (Too Many Requests) and include headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and critically, `Retry-After`. The client needs to know when it is safe to try again without guessing
- **Client-side hints:** Can the client know it is near the limit *before* it gets a 429? Returning the remaining quota in the headers of successful requests (e.g. `200 OK`) allows well-behaved clients to slow themselves down gracefully
- **Hot keys and shards:** If one customer launches a massive product and sends 10,000 requests per second, their specific limit key will hit a single Redis shard. That shard will melt (a hot partition). The solution is either local in-memory caching of the limit status for that specific key, or sharding the customer's limits across multiple nodes (as covered in Booklet 02)
- **Per-tenant fairness:** In a B2B system, a single customer sending a burst of traffic should not degrade the system for other customers. Rate limiting is not just about protecting the database; it is about enforcing fair multi-tenancy

### The failure

- The failure mode is missing the human element. An API is consumed by developers. If you rate-limit them without providing headers that explain why and when they can retry, they will file support tickets and write angry blogs
- A complete design always considers the client's experience of a failure state

:::interview
**The developer experience test**
Naming the specific HTTP status code (429) and the standard headers proves you have actually built and consumed public APIs in production.
:::
