## Rate limiting vs load shedding

- Rate limiting and load shedding both reject traffic, but for completely different reasons
- **Rate limiting** is a business policy applied per-client. "User A paid for the Basic tier, so User A is only allowed 10 requests per second." It protects fairness
- **Load shedding** is an emergency survival mechanism applied per-server. "The server's CPU is at 99%, so I am rejecting 20% of all incoming requests." It protects the server from crashing

| Feature | Rate Limiting | Load Shedding |
|---|---|---|
| **Why we reject** | The user exceeded their quota | The server is out of capacity |
| **Who we reject** | The specific user | Anyone (except high priority requests) |
| **Where it runs** | API Gateway or Application code | At the admission layer (TCP/HTTP queue) |

### The failure

- The failure is thinking a rate limiter protects your server from crashing. If your server can handle 1,000 requests per second, and you set a rate limit of 10 requests per second per user, what happens when 10,000 well-behaved users log in at the same time?
- 10,000 users × 10 requests/sec = 100,000 requests/sec. No user violated their rate limit, so the rate limiter lets all the traffic through, and your server crashes. You must have load shedding to survive aggregate overload, regardless of individual limits
