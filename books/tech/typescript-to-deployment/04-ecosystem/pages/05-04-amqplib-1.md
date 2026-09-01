## RabbitMQ with amqplib

- A queue like BullMQ works when one producer knows exactly which worker should do the job
- That breaks down when an order being paid needs to reach the email service, the inventory service and the analytics service, and nobody wants the payment code to know all three exist
- A **message broker** takes that knowledge out of the producer. It publishes one event and the broker decides who receives it
- **RabbitMQ** is the broker most Node backends reach for, and it splits the job into three pieces
- An **exchange** receives messages, a **queue** holds them, and a **binding** joins the two with a routing key
- The publisher names only the exchange, so a fourth consumer can be added later by creating a binding, changing no publisher code
- That indirection is the whole point, and it is what makes this different from a queue library
- The cost is a broker to run, three durability settings that must all agree, and consumers that must be idempotent
- RabbitMQ was released in 2007 and implements AMQP, the Advanced Message Queuing Protocol
- `amqplib` is the Node client, version 2.0.1, a rewrite with TypeScript types built in

```bash
npm i amqplib
```

```ts
import amqp from "amqplib"

const conn = await amqp.connect(process.env.RABBIT_URL)
const channel = await conn.createChannel()

await channel.assertExchange("orders", "topic", { durable: true })
await channel.assertQueue("email-service", { durable: true })
await channel.bindQueue("email-service", "orders", "order.paid")
