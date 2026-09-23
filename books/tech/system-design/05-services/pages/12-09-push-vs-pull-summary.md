## Push, pull, or queue

- The closing decision for the booklet. Three ways for work or data to move between two services, and the choice follows from who knows when something is ready and what happens if the receiver is absent

| | Pull | Push | Queue |
|---|---|---|---|
| Who initiates | the receiver, on its own schedule | the sender, when something changes | the sender writes; the receiver takes |
| Receiver offline | nothing is lost — it asks later | the message is lost unless retried | it waits in the queue |
| Backpressure | natural — it asks at its own rate | none; the sender sets the pace | the depth is the signal (booklet 04) |
| Latency | half the poll interval, on average | as low as it gets | the queue's own delay |
| Cost when idle | every empty poll | nothing | nothing |
| Hardest part | picking the interval | the receiver's availability | the operational weight of a broker |

- **Pull** when the receiver can tolerate the interval and you want the simplest thing that works. It fails gracefully by construction: a receiver that was down simply asks for what it missed, and no component had to remember anything on its behalf
- **Push** when latency is the product — a notification, a price, a cursor — and losing an occasional message is acceptable. Push at scale is the socket tier of page 8, with everything that implies
- **Queue** when the message must not be lost and the receiver's availability is its own business. That is booklet 04's subject, and the cost is a broker to run, monitor and reason about

### The failure

- Choosing push because pull felt inelegant. Polling every thirty seconds is dismissed as wasteful, replaced with a socket tier, and the system now needs a backplane, reconnect logic with jitter, presence tracking, and a deploy procedure that does not drop every connection simultaneously
- All of that is warranted when the latency matters. When it does not, the wasteful design was a cached endpoint and a `setInterval`, and the elegant one is a distributed system with its own on-call rotation. The honest question is what the latency is worth, asked before the architecture is chosen rather than after
