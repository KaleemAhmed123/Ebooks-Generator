## Message storage

- The write is one small immutable row, 20 000 a second; the read is "the last N rows of this conversation" and "rows after id X". That is a **wide-column store**: rows grouped into partitions by a partition key, sorted within the partition by a clustering key, each partition living whole on a node (booklet 02). Discord's schema is the reference

```sql
CREATE TABLE messages (
  channel_id  bigint,
  bucket      int,        -- ≈ 10 days of time, derived from the message id
  message_id  bigint,     -- Snowflake: 41 bits of ms since epoch, sorts by time
  author_id   bigint,
  content     text,
  PRIMARY KEY ((channel_id, bucket), message_id)
) WITH CLUSTERING ORDER BY (message_id DESC);

-- recent history:   WHERE channel_id = ? AND bucket = ?  LIMIT 50
-- since last seen:  WHERE channel_id = ? AND bucket = ? AND message_id > ?
-- older pages walk bucket − 1, bucket − 2 …
```

- The **Snowflake id** (booklet 05) is the clustering key because its top bits are a millisecond timestamp: newest-first order and "after X" range reads come from the id alone, with no separate time column and no random UUID that scatters rows
- The **bucket** is the part a naive design omits. Partitioned by `channel_id` alone, a busy channel is one partition that grows without bound and lands on one node while the rest sit idle. Discord's 2017 design bucketed by roughly 10 days so that no partition passes about 100 MB; a channel's history is a walk across its buckets, and a hot channel's writes still hit one partition per ten days, but the partition never becomes the node's whole disk
- Writes carry only the columns that have values. Discord found that writing null columns created about 12 needless tombstones per message, deletion markers the read path had to skip; writing only non-null columns removed them
- The same schema on ScyllaDB in 2023: 177 Cassandra nodes became 72, and the p99 of a history fetch went from 40–125 ms to 15 ms. The schema was right; the engine under it was replaced, and a migration moved 3.2 M messages a second for 9 days

### The failure

- A UUID as the message id. It is unique and it is random, so the rows in a partition are in no useful order and every "since X" read is a scan of the partition. The id must sort by time, or the store needs a second column that does, indexed, on every one of 2 B rows a day
