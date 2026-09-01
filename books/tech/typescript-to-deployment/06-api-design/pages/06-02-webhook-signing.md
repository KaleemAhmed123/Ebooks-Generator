## Signing and replay protection

- A webhook arrives with no session and no login, so the signature is the entire authentication

```ts
const timestamp = Math.floor(Date.now() / 1000)
const signed = `${timestamp}.${rawBody}`

const signature = crypto
  .createHmac("sha256", endpoint.secret)
  .update(signed)
  .digest("hex")

headers["X-Signature"] = `t=${timestamp},v1=${signature}`
```

### Why the timestamp is inside the signature

- Signing the body alone means a captured request stays valid forever, and can be replayed by anyone who saw it
- Including the timestamp lets the receiver reject anything older than a few minutes
- It has to be **inside** the signed string. A timestamp sent alongside can simply be edited

### Verifying, on the receiving side

```ts
const [t, v1] = parseSignature(req.get("x-signature"))
if (Math.abs(Date.now() / 1000 - Number(t)) > 300) return res.sendStatus(400)

const expected = crypto.createHmac("sha256", secret)
  .update(`${t}.${req.rawBody}`).digest("hex")

if (!crypto.timingSafeEqual(Buffer.from(v1), Buffer.from(expected))) {
  return res.sendStatus(400)
}
```

- **Use the raw body.** Parsing to an object and re-serializing changes key order and whitespace, and the signature will never match
- **`timingSafeEqual`**, because a normal comparison returns faster on an early mismatch and leaks the signature one byte at a time
- **Support two secrets at once** so a customer can rotate without dropping events
