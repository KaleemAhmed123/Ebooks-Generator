## Webhooks

- A webhook is a third party calling your server when something happened
- A payment provider confirming a charge is the common one
- The rule: **read the raw body, verify the signature, then parse**

```ts
import crypto from "node:crypto"

export async function POST(request: Request) {
  const raw = await request.text()
  const signature = request.headers.get("x-signature") ?? ""

  const expected = crypto
    .createHmac("sha256", process.env.WEBHOOK_SECRET!)
    .update(raw)
    .digest("hex")

  const ok = crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  )

  if (!ok) return new Response("bad signature", { status: 400 })

  const event = JSON.parse(raw)
  return new Response("ok", { status: 200 })
}
```

- `request.json()` would reformat the bytes and the signature would never match
- `timingSafeEqual` compares in constant time so the comparison itself leaks nothing
- Unlike the Pages Router, there is no `bodyParser` config to disable. `route.ts` never parses for you
