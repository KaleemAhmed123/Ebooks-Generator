## The balancer is a client too

- A load balancer has its own connect timeout, idle timeout, response timeout, and health checks. It is not transparent — it is a proxy with opinions
- A health check is a different code path from a real request. `/ping` returns 200 while `/orders` is stuck on a database lock. The LB marks the backend as healthy; the user sees a timeout

### Gray failure at the balancer

- The backend process is alive. The health endpoint returns 200. But the request handler is deadlocked, or the event loop is blocked, or the connection pool is exhausted
- The LB does not know. It routes traffic to a node that accepts connections and never responds. This is **gray failure** — the system is unhealthy from the user's perspective but healthy from the monitor's
- The fix is a health check that exercises the real path: a query against the database, a check on the event loop delay, a response with the actual processing latency. Booklet 05 covers this in depth

### The failure

- Restarting a node the monitor thinks is healthy, again and again. The restart clears the deadlock for a few minutes. Then it returns. Nobody investigates because the health check has never failed
- When the LB, the health check, and the user disagree, the user is right
