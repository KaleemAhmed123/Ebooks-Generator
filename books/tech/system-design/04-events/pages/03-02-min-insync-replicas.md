## `min.insync.replicas`

- Developers often assume that setting `acks=all` guarantees their data is safely replicated across multiple machines. This is a dangerous misconception. `acks=all` means the leader waits for all *currently in-sync* replicas to acknowledge the write
- What happens if the other machines in the cluster are offline? The "In-Sync Replica" (ISR) list shrinks. If the list shrinks to just the Leader, `acks=all` behaves exactly like `acks=1`

| Config | Scenario | Result |
|---|---|---|
| `RF=3`, `min.insync=2` | 3 brokers up | Leader waits for itself + 1 follower. Safe. |
| `RF=3`, `min.insync=2` | 2 brokers down | Leader refuses the write (throws an exception). Your app is unavailable, but data is safe. |
| `RF=3`, `min.insync=1` | 3 brokers up | Leader waits for itself + 2 followers. Safe. |
| `RF=3`, `min.insync=1` | 2 brokers down | **Silent failure mode.** Leader accepts the write alone. |

- *RF* stands for Replication Factor (the total number of copies you want to exist).

### The failure

- Writing to a single machine by accident. The default `min.insync.replicas` in Kafka is 1. If you configure a topic with a Replication Factor of 3, and set your producer to `acks=all`, you feel safe. Then, during a network partition, two brokers go offline. The ISR shrinks to 1. Your producer continues writing at thousands of messages per second. Those messages are only being saved to a single machine's disk. If that last machine crashes, you lose everything
