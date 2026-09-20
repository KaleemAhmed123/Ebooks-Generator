## Health checks from the balancer

- A load balancer must know which instances are alive so it can stop routing traffic to dead ones. It does this using health checks
- **Active health checks (Probes):** The balancer explicitly sends an HTTP `GET /health` to the instance every 10 seconds. If the instance returns 200 OK, it stays in the pool. If it returns 500, or times out, it is ejected
- **Passive health checks (Observation):** The balancer does not send special requests. Instead, it observes normal user traffic. If an instance returns three 500 errors to real users in a row, the balancer marks it dead and ejects it

| Type | Pros | Cons |
|---|---|---|
| **Active** | Detects dead instances before they serve user traffic | Wastes CPU/bandwidth; can pass even if the app is deadlocked |
| **Passive** | Reacts to actual user-facing failures | A user has to experience an error before the instance is ejected |

### The failure

- The failure is configuring the health check to eject instances too quickly. If a brief network blip causes a single active ping to fail, the balancer might eject the instance
- Ejecting an instance increases the load on the remaining instances. If the remaining instances slow down under the new load, their health checks might also time out. The balancer ejects them too. This causes a cascading failure where the balancer ejects the entire healthy fleet because it mistook a minor slowdown for a total failure. Always configure multiple consecutive failures (e.g., 3 fails) before ejection
