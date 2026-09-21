## API and data model

- One endpoint for callers, and it names a user and an event, never a phone number or a device token. The notification system owns the routing data; the billing service that wants to say "payment failed" should not know which of the user's three phones is current
- The call carries an `Idempotency-Key` (booklet 01), because the caller will retry on a timeout and a retried "your order shipped" must not become two pushes

```ts
// POST /notifications        Idempotency-Key: <caller's uuid>
type Request = {
  userId: string;
  template: "ORDER_SHIPPED" | "PASSWORD_RESET" | "DIGEST";
  data: Record<string, string>;                 // fills the template
  channels?: ("push" | "sms" | "email")[];     // default: from preferences
  priority: "transactional" | "bulk";           // page 6: separate lanes
};
// 202 Accepted { notificationId }  — accepted for delivery, not delivered

// tables
// notifications  (id PK, user_id, template, data, priority, created_at)
// deliveries     (notification_id, channel, provider, status, attempts, last_error, updated_at)
// devices        (user_id, token, platform, last_seen)      -- APNs / FCM tokens
// preferences    (user_id, channel, opted_out, quiet_hours)
```

- The response is `202`, not `200`: the request was durably accepted and will be attempted, which is all the caller can be told at that moment. Delivery state lives in `deliveries`, one row per channel attempt, and is what the status endpoint and the dashboard read
- `devices` is a registry that decays: tokens go stale when the app is reinstalled, and the provider says so on the next send, which is a write back to this table, not an error to retry
- `preferences` is a legal table as much as a product one. An opt-out that is not honoured is a complaint to a regulator; the check runs before the message reaches a queue, so an opted-out user costs nothing downstream

### The failure

- Caller supplies the destination. `POST { phone: "+44…" }` puts routing knowledge in every service, ignores preferences because the caller never sees them, and makes the opt-out table something each caller must remember to consult. The notification system is the only place that knows how to reach a user, and the API shape enforces it
