## At-most-once and at-least-once by construction

- Neither is a switch. Each is a combination of settings, one per crash point of page 1. Kafka's docs give the at-most-once recipe: disable producer retries and commit offsets before processing

| Crash point | At most once | At least once |
|---|---|---|
| producer, ack lost | `retries=0`, or `acks=0` and never look | `acks=all`, retries on (the default) |
| consumer, effect vs commit | commit first, then process | process, then commit (Module 3, page 4) |
| queue delivery | auto-ack: done when sent (RabbitMQ), or delete on receive (SQS) | manual ack after the effect; delete after the effect |
| what a crash costs | one lost record, no trace | one repeated record, visible |

- At-most-once has a use: metrics and logs where a missing point is cheaper than a repeated one, and anything that is overwritten by the next event anyway
- At-least-once is the default everywhere and the right choice for anything with a side effect, on one condition: the effect must survive being applied twice. Page 7 is that condition; booklet 01, Module 10 is the general form
- The mixed state is the common bug. Retries on at the producer and auto-commit on at the consumer is at-least-once on the left and at-most-once on the right: duplicates and losses in the same pipeline

### The failure

- At-most-once nobody asked for. `enable.auto.commit=true` is the consumer default, and it commits on a timer. The pipeline was designed as at-least-once, the producer retries, the handler is idempotent, and records still vanish, at a rate that depends on how often a pod restarts mid-batch
