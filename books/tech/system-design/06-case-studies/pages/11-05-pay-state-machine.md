## Payment state machine

- A payment goes through distinct states: `CREATED` → `AUTHORISED` → `CAPTURED` → `SETTLED` (or `FAILED`)
- **Transitions:** You must use a database transaction to lock the row (→03) and validate the transition. You cannot transition from `FAILED` to `CAPTURED`
- **Outbox pattern:** When a payment hits `CAPTURED`, you need to tell the Inventory service to ship the item. If you publish to Kafka and then update the DB, Kafka might succeed but the DB fails. You must use the Outbox Pattern (→04) to write the event to the database in the exact same transaction as the state change

### The failure

- Updating the state based on a webhook, but receiving the webhooks out of order. If the PSP sends "Captured" and then mistakenly resends an older "Authorised", a naive update will downgrade the payment state

:::interview
Your service receives a webhook. It updates the payment status, and then sends an email receipt. The server crashes exactly after the database update, but before the email sends. How do you fix this?

Use the Outbox pattern. Write the payment status update and the "send_email" event into the same database transaction. A separate worker reads the outbox and guarantees at-least-once delivery of the email.
:::\n