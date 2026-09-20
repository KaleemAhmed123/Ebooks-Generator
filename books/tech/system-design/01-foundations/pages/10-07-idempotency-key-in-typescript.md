## The whole flow in TypeScript

- The atomic reserve, the replay, the `409`, and the payload check, as an Express handler over the `pg` driver. `T` is the `idempotency_keys` table

```typescript
async function handle(req: Request, res: Response) {
  const key = req.header('Idempotency-Key')!, hash = sha256(req.rawBody)
  try {
    await db.query("INSERT INTO T (key, hash, status) VALUES ($1, $2, 'IN_FLIGHT')", [key, hash]) // 1. reserve
  } catch (err) {
    if ((err as { code?: string }).code !== '23505') throw err            // not a duplicate: real error
    const { rows: [s] } = await db.query('SELECT * FROM T WHERE key = $1', [key])
    if (s.hash !== hash)          return res.status(400).send('key reused with a different payload')
    if (s.status === 'IN_FLIGHT') return res.status(409).send('still processing')
    return res.status(s.http_status).send(s.body)                          // 2. replay the first result
  }
  try {
    const out = await processPayment(req.body)                             // 3. the work, once
    await db.query("UPDATE T SET status = 'DONE', http_status = $2, body = $3 WHERE key = $1", [key, out.status, out.body])
    return res.status(out.status).send(out.body)
  } catch (err) {
    await db.query('DELETE FROM T WHERE key = $1', [key])                  // 4. let the client retry
    throw err
  }
}
```

- Steps 1 and 4 are the pair people forget. Without 1, two concurrent duplicates both run. Without 4, a crash leaves the key `IN_FLIGHT` and every retry is a `409` until someone clears the table by hand

### The failure

- Hashing the parsed body. The retry carries the same bytes, but after parsing the key order differs, the hash differs, and a legitimate retry is rejected as a mismatch. Hash the raw bytes, as above, or a canonical serialisation
