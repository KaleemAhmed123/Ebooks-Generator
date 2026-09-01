## HMAC and random values

- A hash proves the content has not changed. It proves nothing about **who** produced it, because anyone can hash anything
- An **HMAC** mixes a shared secret into the hash, so only someone holding that secret can produce a valid one
- That is what makes it the standard way to sign a webhook, a download link or a session cookie

```js
import { createHmac, timingSafeEqual } from "node:crypto"

const signature = createHmac("sha256", process.env.WEBHOOK_SECRET)
  .update(rawBody)
  .digest("hex")
```

### Comparing it safely

```js
const a = Buffer.from(received)
const b = Buffer.from(expected)
const ok = a.length === b.length && timingSafeEqual(a, b)
```

- `===` stops at the first mismatched byte, so a wrong signature fails faster than a nearly-right one
- An attacker measures that difference and recovers the signature one byte at a time. It is slow and it works
- **`timingSafeEqual` always takes the same time**, which removes the signal. It throws on different lengths, so check that first

### Random values

```js
import { randomBytes, randomUUID, randomInt } from "node:crypto"

randomBytes(32).toString("hex")   // a token or an API key
randomUUID()                       // "a307f7be-..."
randomInt(1, 1_000_000)            // an OTP, unbiased
```

- **`Math.random()` is not cryptographically random.** It is predictable from previous outputs and must never generate a token, a session id, a reset link or an OTP
- 32 bytes is the usual size for a secret. 16 is the practical floor
