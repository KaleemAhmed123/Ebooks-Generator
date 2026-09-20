# Ticket Booking

### Requirements and numbers

- Ticket booking (Ticketmaster) is characterized by extreme bursts. A popular concert goes on sale, and traffic spikes 10,000x for exactly 5 minutes
- **In scope:** Browse events, hold a seat, buy a ticket
- **Out of scope:** The seat allocation algorithm (best available)

| Metric | Requirement |
|---|---|
| **Traffic** | 100,000 users attempting to buy 10,000 seats instantly |
| **Consistency** | Strict CP. No double-selling a physical seat |

- **The core constraint:** Average traffic means absolutely nothing. If you design the system for average traffic, it will collapse at the exact moment it needs to work. You must design purely for the peak spike

### The failure

- Sizing for average traffic. "We sell 10,000 tickets a day, so that's 0.1 tickets per second." No. You sell 10,000 tickets in 3 seconds once a day.

:::interview
An interviewer asks you to design Ticketmaster. You calculate the daily traffic and provision 3 application servers. Why did you just fail the interview?

Because you designed for the average. Ticket booking systems experience catastrophic spikes when sales open. 100,000 users will hit your servers at the exact same millisecond. You must design for the burst.
:::\n