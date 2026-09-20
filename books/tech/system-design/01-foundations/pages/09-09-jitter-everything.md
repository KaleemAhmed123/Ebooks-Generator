## Jitter everything

- The principle of jitter — adding randomness to prevent synchronisation — applies to much more than HTTP retries
- Any periodic action taken by many clients will eventually align and cause a spike, unless jitter is applied

| Scenario | The storm | The jitter |
|---|---|---|
| **Cache TTLs** | 10,000 rows expire at exactly midnight. The database is crushed by cache-miss queries | `ttl = base + random(0, 10)` minutes |
| **Cron jobs** | 50 microservices all run their cleanup job at `0 * * * *` (top of the hour) | `sleep(random(0, 300))` before starting |
| **Reconnects** | A load balancer reboots. 5,000 WebSockets reconnect instantly | Reconnect delay with full jitter |
| **Token refresh** | A batch of JWTs expires after exactly 1 hour | Refresh between 45 and 55 minutes randomly |

### The failure

- An engineer deploys a new service with 100 instances. They all boot at once. They all fetch a 5-minute auth token. Five minutes later, they all renew it in the same millisecond. The auth service sees zero traffic, then a massive spike, then zero traffic. Adding a 30-second jitter to the refresh interval flattens the curve entirely
