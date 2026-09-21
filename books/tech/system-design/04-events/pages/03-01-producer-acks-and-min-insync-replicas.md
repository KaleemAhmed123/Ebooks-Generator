# Module 3 - Producers, consumers, groups, offsets, acks

## Producer acks and `min.insync.replicas`

- The producer chooses when a write counts as done. `acks=0`: never wait. `acks=1`: the leader has written it. `acks=all` (the default): every ISR replica has written it, which is the definition of **committed**
- `acks=all` counts in-sync replicas, not assigned ones. The ISR shrinks when a follower dies or falls behind. `min.insync.replicas` is the floor: below it the leader rejects `acks=all` writes

| replication 3, `acks=all` | 3 brokers up | 2 brokers down |
|---|---|---|
| `min.insync.replicas=2` | all three | rejected; the producer errors and retries |
| `min.insync.replicas=1` (default) | all three | accepted on one machine, no error |

- Two of three is a majority (booklet 03); with one replica standing, the topic refuses writes

:::interview
"What does `acks=all` guarantee?" — That every replica currently in the in-sync set has the record on disk before the producer hears back. How many that is depends on `min.insync.replicas`; at the default of 1 it can be the leader alone. For durability across a broker loss: replication 3, `min.insync.replicas=2`, `acks=all`, and accept that the topic refuses writes when two replicas are down.
:::

### The failure

- `acks=1` on the day the leader dies. The leader writes, replies, and loses power before the followers fetch. A follower becomes leader with a log one record shorter. The producer was told "stored"; the record is gone; no error is ever raised
