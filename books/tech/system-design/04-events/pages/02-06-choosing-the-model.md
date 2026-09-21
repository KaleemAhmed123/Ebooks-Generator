## Choosing the model

| | Queue | Pub/sub | Partitioned log |
|---|---|---|---|
| built for | work distribution | notifying many readers | replay, ordering, many independent readers |
| ordering | none with more than one consumer | none | per partition (Module 4) |
| parallelism | add consumers, no ceiling | per subscription, as a queue | capped at the partition count |
| replay | no; delivered means deleted | no | rewind the offset |
| a new reader | competes for the same messages | needs its own subscription | a new group from any offset |
| delete on read | yes, on ack | yes, per subscription | never; by retention |

- Pick by the question the system asks. "Do this once, whoever is free": queue. "Tell everyone this happened": pub/sub. "Keep this, in order, for anyone who asks later": log. SQS, SNS, Pub/Sub and Kinesis map onto the same rows
- Kafka 4.2's **share groups** blur the line: queue semantics on a topic (Module 3, page 8)

:::interview
"Kafka or RabbitMQ?" — Ask what the messages are. Independent jobs with no order between them and a worker count that must scale with load: a queue. Facts about entities that several teams read, that must apply in order per entity, or that anyone may need to replay: a log. Then the cost: a queue gives no replay and no order; a log caps parallelism at the partition count.
:::

### The failure

- Kafka as a job queue. Five partitions, a traffic spike, fifty pods. Five pods work; forty-five sit idle, because a partition goes to one consumer at a time. Adding partitions later re-maps keys (Module 4, page 4). Jobs with no ordering need a queue, or a share group
