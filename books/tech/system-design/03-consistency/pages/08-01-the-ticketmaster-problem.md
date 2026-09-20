## The Ticketmaster problem

- Designing a system for Ticketmaster (or any high-demand ticketing platform) is one of the hardest challenges in distributed systems. It is completely different from a standard e-commerce platform like Amazon

| | Amazon Checkout | Ticketmaster (Taylor Swift Drop) |
|---|---|---|
| **Traffic Pattern** | Smooth and predictable. | **Extreme Burst**. Zero traffic at 9:59 AM. Ten million users exactly at 10:00:00 AM. |
| **Inventory** | Plentiful. Millions of identical cables in warehouses. | **Strictly Scarce**. Exactly 50,000 seats. |
| **Fungibility** | Fungible. Any HDMI cable is fine. | **Non-fungible**. Seat 12A is not Seat 12B. |
| **Contention** | Low. Users buy different items. | **Extreme**. 100,000 users competing for Seat 12A simultaneously. |

- This combination of extreme burst traffic and extreme contention means that every standard database consistency pattern we have learned so far will spectacularly fail

### The failure

- Treating a ticket drop like a normal e-commerce checkout. If you build your database using standard row locks or optimistic versioning, and you market a massive concert drop, your servers will melt down exactly 5 seconds after the sale opens. You cannot simply auto-scale your way out of a Ticketmaster problem, because auto-scaling takes minutes, and the traffic spikes in milliseconds
