## What the interviewer probes

| Probe | The answer that holds |
| :--- | :--- |
| a 5 M-message campaign and a password reset at the same minute | two queues per channel, `transactional` and `bulk`, with their own worker pools; the bulk pool is also the one that is throttled to the provider's rate, so a campaign is spread over hours by design and never competes |
| "we sent it to Apple, the user got nothing" | "sent" means the provider accepted it; APNs and FCM are best-effort and say so; a device that was offline is not promised everything sent while it was away. The dashboard reports `accepted by provider`, `delivered` (from provider receipts where they exist) and `opened` (from the app's callback) as three different numbers |
| fifteen "liked your post" pushes in a minute | a delayed queue per user and event type: hold for 60 s, then one worker sends a digest of everything that arrived. Booklet 04 owns the delayed-delivery mechanics |
| tracking opens | push: the OS callback when tapped; email: a tracking pixel and link rewriting. These arrive as events into an analytics log, not as updates on the `deliveries` row, which is operational state |
| stale device tokens | the provider's response says the token is gone; the worker deletes the `devices` row and does not retry. A retry loop that ignores this sends the same invalid token forever |
| quiet hours and time zones | a `not_before` on the message, computed from `preferences` at enqueue time; the queue holds it, the worker never has to know |
| what if the queue itself is lost | the `notifications` row was written before the enqueue, so a sweeper can re-enqueue anything with no `deliveries` row after N minutes; the outbox pattern (booklet 04) is the same idea done atomically |

- The metric that matters is end to end: the fraction of transactional messages `opened` or `delivered` within a minute of the request. Everything the design does, separate lanes, breakers, backoff, is in service of that number, and it is the one the interviewer wants defended

### The failure

- Counting "accepted by the provider" as delivered. The dashboard shows 10 M sent and zero errors for a day on which Android users received nothing, because a bad payload or an expired certificate is accepted with a 200 and fails on the device. The design measures what the user sees, or it measures nothing
