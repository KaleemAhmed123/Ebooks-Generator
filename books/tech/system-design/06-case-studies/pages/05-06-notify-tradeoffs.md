## What the interviewer probes

- **Priority lanes:** "Marketing sends 5 million promo emails. How do password resets not get delayed?" — You need separate high-priority and low-priority queues. Workers drain the high queue first, or you dedicate specific workers to the high queue
- **APNs/FCM delivery guarantees:** "We sent the push to Apple, but the user didn't get it." — APNs and FCM are best-effort. They do not guarantee delivery. If the user is offline, APNs only stores the *most recent* notification per app. If you send 5, they get 1
- **Tracking state:** "How do we know it was read?" — For email, embed a 1x1 tracking pixel. For push, the mobile OS provides a callback when the notification is tapped. Send these events to an analytics queue (not the operational DB)
- **Batching:** "A user got 15 likes in one minute. They are annoyed." — Use a delayed queue. Hold the event for 60 seconds. When the worker pulls it, check for other events in that 60s window and send a digest: "Alice and 14 others liked your post."

### The failure

- Treating "sent to APNs" as "delivered to user." Counting API 200 OKs as successful deliveries will result in a dashboard that shows 100% success while users complain they receive nothing

:::interview
Your dashboard shows 10 million pushes delivered with 0 errors. Customer support says Android users haven't received alerts all day. What exactly did you measure?

You measured that you successfully handed the messages to FCM (Firebase). You did not measure if the users actually received or tapped them. A broken certificate or bad payload will return a 200 OK from the API, but fail silently on the device.
:::
