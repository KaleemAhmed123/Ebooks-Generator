## RabbitMQ with amqplib - continued

channel.publish(
  "orders",
  "order.paid",
  Buffer.from(JSON.stringify({ orderId: "o1" })),
  { persistent: true, messageId: "o1" }
)
```

### The three pieces

- An **exchange** receives messages. A **queue** holds them. A **binding** joins the two with a routing key
- A publisher never names a queue. It publishes to an exchange, and bindings decide who hears it
- That is the difference from BullMQ, where the producer names the queue directly

### Durability is three separate flags

- `assertExchange(..., { durable: true })` survives a broker restart
- `assertQueue(..., { durable: true })` survives a broker restart
- `{ persistent: true }` on publish writes the message to disk

- Missing any one of the three loses messages on restart, and it will look random
