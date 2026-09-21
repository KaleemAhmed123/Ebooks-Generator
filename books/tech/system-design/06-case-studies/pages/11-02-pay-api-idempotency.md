## API with idempotency keys

- Every `POST` carries an `Idempotency-Key` chosen by the client; the server stores the key with the response it produced and replays it on a repeat (booklet 01)
- Stripe's API docs set the reference: keys up to 255 characters; the first request's status code and body are saved, even a 500, and replayed; a repeat with different parameters is an error; keys are pruned after at least 24 hours; `POST` only

```typescript
async function pay(acct: string, key: string, body: PayBody) {
  return db.transaction(async (tx) => {
    const prior = await tx.maybeOne(SELECT_KEY_FOR_UPDATE, [acct, key]);  // twin waits
    if (prior && prior.params_hash !== hash(body)) return err(400);
    if (prior) return { status: prior.status, body: prior.response };   // replay
    await tx.run(INSERT_KEY, [acct, key, hash(body)]);
    const r = await createPayment(tx, acct, body);                      // the real work
    await tx.run(SAVE_RESPONSE, [acct, key, r.status, r.body]);
    return r;
  });
}
// SELECT_KEY_FOR_UPDATE ends "WHERE account_id=$1 AND key=$2 FOR UPDATE"
```

:::interview
"A customer taps Pay, the request times out, the app retries. How do you avoid charging twice?" — The app minted an idempotency key when the Pay screen opened and sends it on both attempts. The server locks that key's row, finds the first attempt's stored result, and returns it without touching the card. Then: the key is scoped to the account, the stored response includes failures, and the key outlives the retry window, 24 hours or more at Stripe.
:::

### The failure

- A key scoped per endpoint but not per account. Two merchants' clients both send `key = 1` for their first payment; the second gets the first one's stored response, a 200 with someone else's payment id. Uniqueness is `(account, key)`, checked inside the transaction
