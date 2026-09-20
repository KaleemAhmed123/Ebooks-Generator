## The whole flow in TypeScript

- Bringing together the atomic reserve, the 409 conflict, and the 422 mismatch:

```typescript
async function handleRequest(req, res) {
  const key = req.headers['idempotency-key'];
  const payloadHash = hash(req.body);

  try {
    // 1. Atomic reserve (fails if key exists)
    await db.query(`INSERT INTO idempotency_keys (key, payload_hash, status) VALUES (?, ?, 'IN_FLIGHT')`, [key, payloadHash]);
  } catch (err) {
    if (err.code !== 'UNIQUE_VIOLATION') throw err;
    
    // Key exists. Fetch it.
    const stored = await db.query('SELECT * FROM idempotency_keys WHERE key=?', key);
    
    // 2. Mismatch (Stripe standard)
    if (stored.payload_hash !== payloadHash) return res.status(422).send('Mismatch');
    
    // 3. Concurrent duplicate (Stripe standard)
    if (stored.status === 'IN_FLIGHT') return res.status(409).send('In flight');
    
    // 4. Return stored result
    return res.status(stored.http_status).send(stored.response_body);
  }

  // 5. Do the work (only reached if we secured the lock)
  const result = await processPayment(req.body);

  // 6. Store the result
  await db.query(`UPDATE idempotency_keys SET status='DONE', http_status=?, response_body=? WHERE key=?`, [result.status, result.body, key]);

  return res.status(result.status).send(result.body);
}
```
