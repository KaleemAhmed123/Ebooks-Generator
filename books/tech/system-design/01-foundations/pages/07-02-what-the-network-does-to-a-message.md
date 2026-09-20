## What the network does to a message

- Five things, each independently, and in combination:

| Behaviour | What happens | What goes wrong if you ignore it |
|---|---|---|
| **Lost** | the message never arrives | the request hangs; the user retries manually |
| **Delayed** | the message arrives, but late | the reply arrives after the caller gave up and retried — now two copies are in flight |
| **Reordered** | messages arrive in a different order than sent | a delete arrives before the create; the record reappears |
| **Duplicated** | the same message arrives twice | a payment is charged twice |
| **Partitioned** | a set of nodes cannot reach another set | the system splits into two halves, each believing it is the whole |

- Handling "lost" and forgetting "delayed" is the most common mistake. A lost message is gone. A delayed message is *still coming*, and it arrives after you have already retried, so now you have two in-flight copies of the same work

### The combination

- A message is delayed long enough that the sender retries, then both copies arrive, reordered. The system sees two different-looking requests for the same operation, in the wrong order
- So the receiver must produce the same result however many copies arrive, in whatever order. That property is **idempotency**, Module 10
