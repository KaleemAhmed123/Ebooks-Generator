# Module 11 - The five questions and the trade-off map

## The five questions

- Boxes and arrows are a drawing. A design is the drawing plus an answer to five questions, asked of every box

| Question | What it exposes | The answer this booklet gives |
|---|---|---|
| **1. Where is the state?** | what a crash destroys | "stateless" only moves state. Memory, local disk, cache, replicated database: four durability levels; every datum is placed on one |
| **2. Who owns the state?** | race conditions, boundaries | one writer per datum; everyone else reads via its API or a subscribed copy. Two services writing one table is no owner |
| **3. What if a node dies?** | the availability strategy | stateless: a replica behind the balancer. Stateful: failover, quorum, or replay. "Down until restarted" is valid for a monthly report, if said out loud |
| **4. What if a message is duplicated?** | the idempotency strategy | it will be (Module 7). Every consumer dedups, and the dedup store keeps keys longer than the sender retries (Module 10, page 4) |
| **5. What if communication fails?** | timeout, retry, fallback | timeout, classified retry with backoff and budget, then a named fallback or a compensation (Modules 8, 9, next page) |

- Ask them in a design review. Ask them in an interview, about your own design, before the interviewer does

### The failure

- Three weeks on REST versus GraphQL, zero minutes on what happens when the payment service times out. The protocol was never the risk. Question 5 was
- "We have a read replica, so the database is highly available." A replica with no failover procedure protects reads only. When the primary dies, writes stop until a human acts. Question 3 was answered for half the traffic
