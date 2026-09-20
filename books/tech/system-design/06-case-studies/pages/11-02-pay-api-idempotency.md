## API with idempotency keys

- The network is flaky. The client sends a payment. It succeeds. The response drops. The client retries. How do we avoid charging them twice?
- **Idempotency-Key:** Every POST request must include a unique UUID header (→01)
- The API Gateway checks the `idempotency_keys` database table:
  - If the key does not exist, insert it, and process the payment
  - If the key exists, return the previously saved HTTP response (e.g., 200 OK) without doing any work
- Keys are typically pruned after 24 hours. Stripe returns a 400 error if you reuse a key with a different payload

```http
POST /v1/charges
Headers:
  Idempotency-Key: "uuid-1234"
Body:
  amount: 5000
  currency: "usd"
```

### The failure

- Scoping the idempotency key globally across the whole platform instead of per-account. A UUID collision across two different merchants would cause a catastrophic silent failure

:::interview
A user taps "Pay" twice. The server receives two identical requests one millisecond apart. How does the database prevent a double charge?

The database uses a unique constraint on the `Idempotency-Key` column. The first request inserts the row. The second request hits a unique constraint violation, stopping the double charge.
:::\n