### Dead letter queues

```ts
await channel.assertQueue("email-service", {
  durable: true,
  deadLetterExchange: "orders.dlx",
  deadLetterRoutingKey: "email.failed",
})
```

- A rejected message goes to the dead letter exchange instead of vanishing or looping
- Alert on DLQ depth. A growing DLQ is a bug nobody has looked at

### Delivery is at least once

- Every consumer must be idempotent. Key the work on `messageId` or your own event id
- Booklet 5 covers idempotency keys and the outbox pattern properly

:::note
**amqplib 2.0** is a rewrite with real TypeScript types built in. Older tutorials show `require('amqplib/callback_api')` and version 0.10 shapes. Check which major you are reading about.
:::
