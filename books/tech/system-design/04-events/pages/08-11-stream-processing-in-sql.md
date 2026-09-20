## Stream processing in SQL

- You don't need to write complex Java or Scala code to process streams. Modern tools like **ksqlDB** or **Flink SQL** allow you to write standard `SELECT` statements over infinite data.

```sql
-- Creating a stream from a Kafka topic in ksqlDB
CREATE STREAM user_clicks (
    user_id VARCHAR,
    page VARCHAR,
    click_time TIMESTAMP
) WITH (
    KAFKA_TOPIC = 'clicks-topic',
    VALUE_FORMAT = 'JSON'
);

-- A continuous, real-time Materialized View
CREATE TABLE clicks_per_minute AS
SELECT 
    page,
    COUNT(*) as total_clicks
FROM user_clicks
WINDOW TUMBLING (SIZE 1 MINUTE)
GROUP BY page;
```

- When you submit this SQL query, it doesn't run once and return. It runs forever. As new events arrive in the `user_clicks` Kafka topic, the `clicks_per_minute` table is updated in real-time.

### The failure

- Joining a stream to a massive Postgres table in real-time without caching. A data engineer writes a Flink SQL query that joins a high-volume Kafka stream (10k events/sec) to a `Users` table in Postgres. For every single event, Flink fires a `SELECT` query to Postgres to fetch the user's name. Postgres is hit with 10,000 queries per second and instantly dies. When joining a fast stream to slow static data (a "lookup join"), you must configure the stream processor to aggressively cache the static data in its local memory
