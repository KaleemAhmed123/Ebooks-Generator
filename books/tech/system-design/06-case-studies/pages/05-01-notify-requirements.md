# Notification System

### Requirements and numbers

- A notification system fans out messages to external providers (Apple Push, Firebase, Twilio, SendGrid). The core challenge is dealing with their unreliability
- **In scope:** Send iOS/Android push, SMS, and Email. Respect user opt-outs. Retries and failure handling
- **Out of scope:** Composing the message text (templates are fine, but not an email builder UI)

| Metric | Requirement |
|---|---|
| **Volume** | 10 million notifications per day |
| **Delivery** | At-least-once (exactly-once is impossible) |
| **Latency** | Soft real-time (minutes are okay for bulk) |

- **Exactly-once is impossible:** We send an SMS request to Twilio. Twilio's server processes it but their response times out over the network. We don't know if they sent it. We must retry. The user might get two texts. Tell the interviewer this explicitly

### The failure

- Promising exactly-once delivery to a mobile phone. You do not control the external network or the provider. You can only guarantee at-least-once

:::interview
You promise the interviewer exactly-once delivery for SMS. They ask: Twilio receives the request, charges you, sends the text, but the HTTP response drops due to a network blip. Your system times out. What do you do?

You must retry the request to guarantee delivery. But since Twilio already sent the text, the retry will cause a duplicate. Because you do not control the network between you and Twilio, you can only guarantee at-least-once delivery, not exactly-once.
:::
