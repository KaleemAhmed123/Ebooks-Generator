## Database-generated sharded IDs

- Instagram's 2011 variant swaps Snowflake's worker number for the **logical shard**, and generates the id inside the database. The shard becomes readable from the id, so any service holding a primary key knows where the row lives without a lookup table

```sql
CREATE OR REPLACE FUNCTION insta5_id(OUT result bigint) AS $$
DECLARE
  our_epoch  bigint := 1314220021721;   -- 9 September 2011, in ms
  seq_id     bigint;
  now_millis bigint;
  shard_id   int := 5;                  -- this schema's logical shard
BEGIN
  SELECT nextval('table_id_seq') % 1024 INTO seq_id;          -- 10 bits
  SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_millis;
  result := (now_millis - our_epoch) << 23;                   -- 41 bits of time
  result := result | (shard_id << 10);                        -- 13 bits of shard
  result := result | (seq_id);
END;
$$ LANGUAGE PLPGSQL;
```

- The shift of 23 is not arbitrary: it is 13 shard bits plus 10 sequence bits, so the timestamp occupies everything above them. Changing either field width means changing the shift, and getting it wrong produces ids that look plausible and overlap
- The custom epoch buys range. Counting milliseconds from 2011 rather than 1970 gives back the 41 years already spent, which is the difference between the scheme lasting decades and expiring inside its own lifetime
- Instagram considered and rejected the alternatives for stated reasons: UUIDs for being 128 bits with "no natural sort", Snowflake for the "additional complexity required to run an ID service", and ticket servers for being a write bottleneck

### The failure

- The sequence is `% 1024`, so a shard producing more than 1 024 rows in one millisecond wraps and re-issues ids it has already used inside that millisecond. That is roughly a million inserts per second on a single shard — comfortable at the time, and a ceiling rather than a warning
- The wider failure is that the shard number is now permanent. It is embedded in every id ever issued and in every foreign key referencing them, so re-sharding cannot move a row without changing its identity. Encoding a placement decision into an identifier trades a lookup table for an assumption that the placement never changes
