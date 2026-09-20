## Design for the failure, not around it

- The network will fail. The question is what the system does when it does
- Three strategies, in order of preference:

### 1. Detect and retry (cheapest)

- Set a timeout. Retry with backoff. Make the retry idempotent. Most request-response calls are handled here
- The cost is one extra request on the rare failure

### 2. Degrade gracefully

- When a dependency is down, serve a reduced version instead of an error. Missing recommendations? Show the product without them. Search is down? Show a cached result
- The cost is a product decision: which features can be soft dependencies (Module 2, page 4)

### 3. Reroute around the failure

- DNS failover, load balancer health checks, multi-region active-active. The traffic flows to healthy nodes
- The cost is running redundant infrastructure and keeping data in sync across it (booklets 02 and 03)

### The bridge to what comes next

- This module named the problem: the network is unreliable, silence is ambiguous, and the caller's toolkit is timeout + retry + idempotency
- Modules 8, 9, and 10 are each tool's manual. Module 11 ties them together with the five questions every design must answer
