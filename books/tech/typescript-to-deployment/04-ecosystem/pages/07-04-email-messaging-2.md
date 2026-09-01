### twilio 5.x

```ts
await client.messages.create({ from: env.TWILIO_FROM, to: seller.phone, body: text })
```

- SMS, WhatsApp and voice behind one client
- WhatsApp requires pre-approved templates outside a 24 hour window, which is a product constraint before it is a code one

### The rule for all three

- Put the send behind an interface and a queue
- Providers get blocked, rate limited and swapped. Handlers should never know which one is in use
