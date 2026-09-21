# Module 5 - Notification system

## Requirements and numbers

- A notification system takes "tell user 99 their order shipped" from any internal service and turns it into a push, an SMS or an email through a third-party provider. The design is about the providers: they are slow, they fail, they charge per message, and they are outside the design's control
- Functional, three in: `POST /notifications` from internal services; delivery through push (APNs, FCM), SMS and email providers; per-user preferences and opt-out. Out: composing content beyond templates, in-app inbox, marketing campaign tooling
- Non-functional: at-least-once, never silently dropped; a transactional message (password reset, OTP) leaves within seconds, a digest within minutes; one provider's outage does not stop the other channels
- Inputs, as assumptions: say 10 M notifications a day across all channels, 60 % push, 30 % email, 10 % SMS; a stored notification record of 1 KB kept for 30 days

| Quantity | Arithmetic | Result |
| :--- | :--- | :--- |
| average rate | 10 M ÷ 100 000 | ≈ 100 per second |
| peak rate | × 5, plus campaign bursts | ≈ 500/s sustained; a 5 M campaign is 500/s for nearly 3 hours or is throttled |
| SMS rate | 10 % of 100/s | ≈ 10/s: the expensive channel is the small one |
| state stored | 10 M × 1 KB × 30 d | ≈ 300 GB of delivery records |

- Exactly-once to a phone is not on offer. A provider call that times out after the provider sent the message must be retried, and the retry may send twice. The design promises at-least-once on the way out and dedupes on its own side (page 4); it says so on the board before the interviewer asks
- The cost line matters here in a way it did not in Modules 2–4: SMS is billed per message, so a retry storm is an invoice, not just a latency

### The failure

- "Exactly-once delivery." The interviewer describes the timed-out request that the provider actually sent, and the promise collapses in one sentence. At-least-once plus a dedupe key is the honest design, and it is what every provider offers too
