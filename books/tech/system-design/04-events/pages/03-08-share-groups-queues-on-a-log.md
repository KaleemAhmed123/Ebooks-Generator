## Share groups: queues on a log

- "Kafka is not a queue" was true for a decade: one partition per consumer, one offset per partition, no per-record acks. Kafka 4.2 (February 2026) made **share groups** production-ready, and the answer changed

| | Consumer group | Share group |
|---|---|---|
| partition to consumer | exactly one member per partition | a partition may be shared by several members |
| members beyond the partition count | idle | do work; the count may exceed the partitions |
| acknowledgement | one offset per partition | per record: acknowledge, release, or reject |
| in-flight protection | the partition assignment itself | a lock per record, 30 s by default (`share.record.lock.duration.ms`) |
| a record that keeps failing | blocks the partition | delivery attempts are counted; it can be rejected |
| ordering | per partition | none |

- A share group is the queue model of Module 2 running on the log's storage: same topic, same retention, same replication, a different way of reading. Work with no order between items, that needs more workers than partitions, fits it
- The record lock is the visibility timeout of page 7 by another name. A member that holds a record past the lock loses it to another member, and the same duplicate arises

### The failure

- Using a share group for events that must apply in order. `UserCreated` and `UserDeleted` for one user go to two members at once; the delete finishes first; the create lands on an account that should no longer exist. A share group gives up the one guarantee that made the log worth having for that data
