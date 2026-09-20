## Outbox implementation

- The solution to the Dual Write Problem is the **Transactional Outbox** pattern. 
- You create an `outbox` table in the exact same Postgres database. You write your domain data *and* the event payload in a single, standard SQL transaction. If the transaction commits, you are 100% guaranteed both were saved. 

```sql
BEGIN;
  -- 1. Save the actual business data
  INSERT INTO orders (id, user_id, amount) VALUES (123, 99, 50.00);
  
  -- 2. Save the event payload to the outbox table
  INSERT INTO outbox (id, aggregate_type, aggregate_id, type, payload) 
  VALUES (uuid_generate_v4(), 'Order', 123, 'OrderCreated', '{"id":123,...}');
COMMIT;
```

- A separate background worker (or a CDC tool like Debezium) constantly polls the `outbox` table. It reads the events, sends them to Kafka, and upon receiving the Kafka Ack, deletes the row from the `outbox` table.

### The failure

- The outbox worker crashes before deleting the row. The outbox pattern guarantees At-least-once delivery, not Exactly-once. The background worker will read the row, send it to Kafka, and then try to delete the row. If it crashes before the `DELETE` query succeeds, it will wake up and send the exact same event to Kafka again. This is why, as we learned earlier, every downstream consumer in an event-driven architecture *must* be idempotent
