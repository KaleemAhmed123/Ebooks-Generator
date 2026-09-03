## Publisher Confirms

The broker acknowledging that it has taken responsibility for a message.
Without confirms, a publish that vanished still looks successful to your code.

The broker restarts mid-publish. Your service has already returned 200 to the
user, and the message never existed.

**Confirms tell you the broker has it. They do not tell you your own database
does.** Those are two writes to two systems, and the gap between them is the
dual-write problem — which is what the outbox pattern exists to close.

Turn confirms on regardless. Fire-and-hope is not a performance optimisation, it
is an unlogged failure mode.

## Quorum Queue

RabbitMQ's Raft-based replicated queue. It survives node failure without the
data loss and split-brain behaviour of the classic mirrored queue.

A mirrored queue can lose messages during a partition. A quorum queue with three
replicas needs a majority to accept a write, so a minority partition refuses
rather than diverging.

| | Classic mirrored | Quorum |
|---|---|---|
| Replication | asynchronous mirrors | Raft majority commit |
| On a partition | can lose messages | minority refuses writes |
| Cost | lower latency | more latency, more disk |

**This is the default choice for a durable queue now.** The extra latency buys
the property you wanted when you chose a durable queue in the first place.
