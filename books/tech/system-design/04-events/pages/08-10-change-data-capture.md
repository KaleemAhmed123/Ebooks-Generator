## Change Data Capture (CDC)

- How do you get data into a stream in the first place? You can write code to manually emit events, but that leads to the Dual Write problem. 
- The ultimate solution is **Change Data Capture (CDC)**. CDC tools (like Debezium) turn your database into a stream. They sit quietly and read the database's internal transaction log (the WAL in Postgres, the binlog in MySQL)

```json
// A Debezium CDC payload for an UPDATE in Postgres
{
  "op": "u", // 'c' for create, 'u' for update, 'd' for delete
  "ts_ms": 1614234567890,
  "before": {
    "id": 123,
    "status": "PENDING"
  },
  "after": {
    "id": 123,
    "status": "SHIPPED"
  }
}
```

- When your application executes an `UPDATE` statement in Postgres, Debezium detects the change in the WAL and emits an event to Kafka containing exactly what changed. 

### The failure

- Dual-writes instead of CDC. An engineering team needs to sync their Postgres database to an Elasticsearch cluster for full-text search. They decide to modify their application code: every time the app saves to Postgres, it also makes an API call to Elasticsearch. A week later, there is a network blip between the app and Elasticsearch. The Postgres write succeeds, but the Elasticsearch write fails. Over the next year, the two databases drift further and further out of sync. To sync databases, never dual-write from the application layer. Use CDC to stream the changes reliably
