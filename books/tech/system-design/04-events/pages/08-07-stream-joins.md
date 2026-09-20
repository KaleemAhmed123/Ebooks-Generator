## Stream joins

- The hardest problem in streaming is **Joining Streams**. 
- If you have a stream of `AdClicks` and a stream of `Purchases`, how do you calculate the Conversion Rate? In a batch database, you just run a SQL `JOIN` across the two tables. But in a stream, the tables are infinite and moving. 

```sql
-- Flink SQL Interval Join
SELECT 
  c.ad_id, 
  p.purchase_id
FROM Clicks c
JOIN Purchases p ON c.user_id = p.user_id
-- The Purchase must occur between 0 and 1 hour AFTER the Click
AND p.event_time BETWEEN c.event_time AND c.event_time + INTERVAL '1' HOUR;
```

- To join two streams, the stream processor must hold the `Click` event in its local RocksDB memory for exactly 1 hour. If a matching `Purchase` event arrives within that hour, it outputs a joined record. If 1 hour passes, the `Click` event is deleted from memory to free up RAM.

### The failure

- A purchase arrives 3 hours after the click, but the join window was only 1 hour. A user clicks an ad on their phone at 9:00 AM. They go to a meeting. They make the purchase on their laptop at 12:30 PM. Because the stream processor was configured with a 1-hour Interval Join, it deleted the `Click` event from memory at 10:00 AM. When the `Purchase` event arrives, there is no `Click` to join it to. The conversion is lost. If you increase the join window to 24 hours, the stream processor must hold 24 hours of click data in RAM, requiring massive infrastructure scale. Stream joins are always a brutal trade-off between accuracy and memory costs
