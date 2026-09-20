## Choosing the value

- Do not guess. Look at the callee's latency distribution. If the 99.9th percentile (p99.9) of the downstream service is 80 ms, setting a 30-second timeout is a mistake
- The timeout should be **the callee's p99.9 + a margin for the network**

### The dual cost of a bad timeout

- **Too short:** You cancel requests that were about to succeed. This turns a slow response into an error, and triggers a retry that adds load to a server that is already slow
- **Too long:** You tie up concurrency (threads, memory, connections) on your end. Little's Law (Module 3) dictates that longer wait times mean more requests in flight. A timeout that is 100× the normal latency means your connection pool will fill 100× faster when the callee degrades

### The failure

- A 30-second timeout on a call whose p99 is 50 ms. When the callee degrades and takes 25 seconds, the caller waits the full 25 seconds instead of failing fast. The caller's connection pool fills, memory spikes, and the caller falls over
- The timeout should protect the caller's concurrency limit. If you have 50 connections and 1,000 req/s, Little's Law says your maximum average wait is 50 ms. Set the timeout to protect that math
