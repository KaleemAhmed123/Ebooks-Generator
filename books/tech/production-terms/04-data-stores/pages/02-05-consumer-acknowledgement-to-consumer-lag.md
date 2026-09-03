## Consumer Acknowledgement

*ack / nack*

Telling the broker you have finished with a message. Acknowledge too early and a
crash loses work; too late and you risk redelivery.

| Order | Guarantee | On a crash mid-work |
|---|---|---|
| deliver → process → **ack** | at-least-once | redelivered, so the consumer must be idempotent |
| deliver → **ack** → process | at-most-once | the job is gone, silently |

The second row is what auto-acknowledge gives you. Turning it on is not a
performance setting, it is a decision to accept data loss, and it rarely reads
that way in a config file.

`nack` with requeue disabled is the deliberate route to a dead letter queue.

## Consumer Lag

How far behind the consumer is — either the queue depth, or the age of the
oldest unprocessed message. **Age is the better alert.**

A depth of 50,000 is unremarkable for a fast consumer and catastrophic for a
slow one. Depth alone cannot tell you which you have.

"The oldest message is fourteen minutes old" states the actual user impact.
Depth 50,000 with an age of twenty seconds is a healthy firehose; depth 200 with
an age of forty minutes means something is stuck and nobody has noticed.
