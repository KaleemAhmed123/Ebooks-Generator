### Flows, for jobs that depend on jobs

```ts
import { FlowProducer } from "bullmq"

await new FlowProducer({ connection }).add({
  name: "settle-order",
  queueName: "orders",
  children: [
    { name: "charge", queueName: "payments", data: { orderId } },
    { name: "reserve", queueName: "inventory", data: { orderId } },
  ],
})
```

- The parent runs only after every child succeeds

### Seeing what is happening

- **Bull Board** or **Taskforce** give a web UI for queues, failures and retries
- Worth adding on day one. Debugging a queue from `redis-cli` is miserable
