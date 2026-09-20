## Exactly once is a lie

- There are three delivery guarantees a network can offer:

| Guarantee | Meaning | Cost |
|---|---|---|
| **At most once** | send and forget. The message may be lost. | cheapest |
| **At least once** | retry until acknowledged. The message may arrive multiple times. | moderate |
| **Exactly once** | the message arrives once and only once, no matter what fails. | impossible over an unreliable network (two generals) |

- The **two generals problem**: two armies must attack at the same time. They communicate by messenger across enemy territory. No finite number of messages can guarantee both generals know the other received the message — because any acknowledgment can itself be lost
- "Exactly once delivery" over an unreliable network does not exist. What *does* exist is **exactly-once processing**: at-least-once delivery plus idempotent handling at the receiver

### The practical answer

- Send at least once. Make the receiver idempotent. From the outside, the effect is the same as exactly once
- This is why Module 10 (idempotency) is required reading. The network delivers duplicates. The application must handle them

:::interview
"How do you guarantee exactly-once?" — at-least-once delivery plus idempotent consumer. Name the idempotency key, explain dedupe on the receiver side, and acknowledge that the network itself cannot guarantee it.
:::
