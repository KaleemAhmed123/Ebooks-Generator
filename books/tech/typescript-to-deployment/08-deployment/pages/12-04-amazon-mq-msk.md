## When you need the real broker

- SQS, SNS and EventBridge cover most needs. Two cases they do not cover have their own managed services

### Amazon MQ

- **Managed RabbitMQ or ActiveMQ**, speaking the real protocols, so `amqplib` and every pattern from Booklet 5 work unchanged

```bash
aws mq create-broker --broker-name orders-mq \
  --engine-type RABBITMQ --engine-version 3.13 \
  --host-instance-type mq.m5.large \
  --deployment-mode CLUSTER_MULTI_AZ \
  --publicly-accessible false \
  --users Username=app,Password=<from-secrets-manager>
```

| Reach for it when you need | SQS cannot |
|---|---|
| topic exchanges and routing keys | route by pattern |
| priority queues | prioritize |
| a delayed message beyond 15 minutes | delay that long |
| an existing AMQP application moved to AWS | speak AMQP |

- **It is a broker you pay for by the hour**, running or not, unlike SQS which is per request

### MSK

- **Managed Kafka**, for the log model from Booklet 5: retained history, replay, and consumers tracking their own offsets
- **MSK Serverless** removes the capacity planning, which is what made Kafka on AWS painful
- Reach for it when **replay is a requirement**, when several teams consume the same stream independently, or when throughput is genuinely large

### The honest advice

- **Start with SQS and SNS.** They are cheaper, simpler, and have no capacity to manage
- **Move to Amazon MQ for a routing feature you actually need**, and to MSK when replay or scale demands it
- **Kafka is a large operational commitment even when managed.** Choosing it for "we might need replay" is a common and expensive mistake
