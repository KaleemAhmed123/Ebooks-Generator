## Consistent prefix reads

- The third replication anomaly occurs when data is physically split (sharded). If two related events happen in a causal sequence, they must be read in that same sequence. 
- **Consistent Prefix Reads** guarantees that if a sequence of writes happens in a specific order, anyone reading those writes will see them appear in the correct order

```text
-- A causal dependency: The answer relies on the question
User A (Partition 1): "Who won the World Cup?"
User B (Partition 2): "Argentina did!"

-- Observer reading from replicas with different lag
Observer: "Argentina did!"
Observer: (Confused)
Observer: "Who won the World Cup?"
```

- If User A's question is routed to Shard 1, and User B's answer is routed to Shard 2, they will be processed by different servers. If Shard 1's read replica is heavily lagged, an observer will see the answer from Shard 2 *before* they see the question from Shard 1. Causality is broken
- **The fix**: Data that is causally related must be forced into the same database shard. If the entire chat room is bound to a single shard, the WAL will guarantee that the question is always replicated before the answer

### The failure

- Sharding related data independently. If you shard messages by `message_id` instead of `chat_room_id`, messages in the same conversation will be scattered across different database nodes. Because there is no global clock enforcing order across different nodes, the conversation will arrive at replicas out of order, and the timeline will scramble
