# Module 7 - Messaging

## Why services stop calling each other directly

- The obvious way for the order service to tell the email service about a payment is to call it
- That works, and it quietly couples the two together in three ways
- The order service now needs to know the email service exists, where it lives, and how to talk to it
- If the email service is down, the order request fails, even though the order itself was fine
- If the email service is slow, the order request is slow, and its latency is now your latency
- Adding a fourth consumer means editing the order service, which had nothing to do with the new feature
- **Asynchronous messaging** breaks all three. The producer writes down that something happened and moves on
- Consumers read that record whenever they are able, and a consumer being down delays work rather than failing it
- The producer never learns who is listening, so a new consumer is added by subscribing, not by changing the producer

### What it costs

- The caller no longer knows whether the work succeeded, so failures surface somewhere else entirely
- The system becomes **eventually consistent**. The order is paid and the email has not been sent yet, and for a moment both are true
- Delivery is **at least once**, so every consumer must tolerate seeing the same message twice
- Debugging spans processes, which is why correlation ids and tracing stop being optional
