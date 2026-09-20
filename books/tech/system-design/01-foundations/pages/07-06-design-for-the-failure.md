## Design for the failure, not around it

- The network will fail. The question is what the system does when it does
- Three strategies, in order of preference:

### 1. Detect and retry (cheapest)

- Set a timeout. Retry with backoff. Make the retry idempotent. Most request-response calls are handled here
- The cost is one extra request on the rare failure. The caller cannot tell a crashed server from a slow one, so the retry must be safe to run twice

### 2. Degrade gracefully

- When a dependency is down, serve a reduced version instead of an error: a fraud score that did not arrive becomes a manual-review flag, a full-text search falls back to a prefix match
- The cost is a product decision: which features can be soft dependencies (Module 2, page 4)

### 3. Reroute around the failure

- DNS failover, load balancer health checks, multi-region active-active. The traffic flows to healthy nodes
- The cost is running redundant infrastructure and keeping data in sync across it (booklets 02 and 03)

### The failure

- Strategy 3 bought without strategy 1. A second region, DNS failover, health checks, and a client with no timeout that hangs on the dead region for two minutes before the failover can matter
