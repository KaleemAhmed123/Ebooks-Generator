## Payments

- Taking money is the one operation you cannot retry blindly and cannot quietly get wrong
- No provider lets card details reach your server, because holding them puts you inside PCI compliance
- Instead the browser talks to the provider directly, and your backend only ever sees identifiers
- That means your server never observes the payment happening, and the browser reporting success is not evidence, since the user can close the tab first
- The provider therefore calls you afterwards, on a **webhook**, and that call is the only trustworthy record of what happened
- A webhook arrives with no session, so its signature is the entire authentication, and it is retried until you acknowledge it
- Every rule that follows comes out of those two facts

### razorpay 2.9.8

```ts
const order = await razorpay.orders.create({
  amount: 50000,          // paise, an integer
  currency: "INR",
  receipt: internalOrderId,
})
```

```ts
const expected = crypto
  .createHmac("sha256", env.RAZORPAY_SECRET)
  .update(rawBody)
  .digest("hex")

if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
  return res.status(400).send("bad signature")
}
```

### stripe 22.6.0

```ts
const event = stripe.webhooks.constructEvent(rawBody, signature, env.STRIPE_WEBHOOK_SECRET)
```

- Stripe verifies for you, and it also needs the untouched raw body
