## Dashboards that get used

- Most dashboards are built once, admired, and never opened again. **A dashboard that gets used during an incident has a specific shape**

### One service dashboard, four rows

| Row | Panels |
|---|---|
| **1. Is it up** | requests per second by status, error rate percent, healthy instance count |
| **2. Is it fast** | p50 / p95 / p99 by route, slowest routes table |
| **3. Why** | database connections and slow queries, Redis memory, queue depth and oldest message |
| **4. The box** | CPU, memory, disk free, network |

- **Everything that answers "is it broken right now" must be above the fold.** If it needs scrolling during an incident, it is in the wrong place
