## Choosing a partition count

- The count is chosen once, cannot go down, and re-maps keys on the way up. So it is chosen from the ceiling, not from today's load

| Ask | Because |
|---|---|
| the most consumers this group will ever run in parallel | a partition goes to one member at a time (Module 3, page 3); the count is the parallelism ceiling |
| the throughput one partition can carry on this hardware | measured, not quoted: it is one disk's sequential write and one consumer's processing rate |
| the peak rate divided by that, with headroom | the count that keeps every partition below its own limit at peak |
| the number of brokers | a count divisible by the broker count spreads leaders evenly |

- Take the largest answer and round up. A topic with more partitions than it needs costs some broker memory and a longer failover; one with fewer costs a migration
- The count is per topic, and topics add up. A cluster's partition total is what the controller must track and re-elect leaders for when a broker dies

### The failure

- Tens of thousands of partitions across the cluster "to be safe". When a broker dies, the controller elects a new leader for every partition that broker led, one at a time; the more there are, the longer those partitions are unavailable for writes. Over-provision the topic that needs it, not every topic by reflex
