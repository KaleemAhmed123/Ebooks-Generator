## The overselling nightmare

- What happens if the SQS worker fires exactly at 10 minutes, but the user is currently entering their credit card on the Stripe checkout page?

| Scenario | Reservation State | Payment State | Outcome |
|---|---|---|---|
| **Happy Path** | Active (Min 5) | Succeeds | Ticket sold to User A. |
| **User Abandons** | Expired (Min 10) | None | Ticket returns to AVAILABLE. |
| **The Nightmare** | Expired (Min 10) | Succeeds (Min 10.01) | User A's card is charged. But the ticket was returned to the pool and User B bought it. User A has no ticket, but paid $500. |

- In distributed systems, this is a classic race condition between two independent systems (Stripe and Postgres). The payment network does not know about your internal 10-minute timeout
- **Graceful Downgrade**: To fix this, you must have a reconciliation process. If the Stripe webhook fires for a successful payment, but the ticket is already owned by User B, you must immediately trigger a refund to User A, and send an apologetic email. If you have "Standing Room Only" tickets, you can automatically downgrade them to that tier and refund the difference

### The failure

- Throwing a 500 error and keeping the user's money. If your Stripe webhook handler simply throws an exception because `UPDATE tickets SET status = 'SOLD' WHERE user_id = 'A'` fails, the webhook will crash. Stripe will assume the payment succeeded. User A is out $500 and gets nothing. When dealing with third-party payment gateways, you must handle the race condition explicitly
