## Lessons from Ticketmaster

- Ticketmaster proves that standard web architecture is fundamentally broken under extreme burst contention.
- **The Core Lessons:**
  1. **Push contention to the edge**: You cannot process 10 million concurrent users in a relational database. You must use stateless edge computing and CDN waiting rooms to throttle traffic before it reaches your VPC.
  2. **Pre-compute everything**: Never run expensive operations like `INSERT` or complex validation during the burst. Pre-allocate your inventory and make the live transaction a simple state flip.
  3. **Use Redis as a shield**: Use fast, atomic in-memory locks to shed load (drop the 99,999 losers) before they reach the primary database.
  4. **Embrace pessimism**: Optimistic concurrency is a death sentence under extreme contention. You must use strict queuing and pessimistic state machines (Reservations) to prevent cascading failures.

### The failure

- Assuming standard web scale patterns work for extreme bursts. Standard auto-scaling (adding more servers based on CPU load) takes 3 to 5 minutes to spin up new EC2 instances. A ticket drop spikes from 0 to 10 million users in 5 seconds. If you rely on auto-scaling and optimistic concurrency, your system will be dead long before the first new server finishes booting
