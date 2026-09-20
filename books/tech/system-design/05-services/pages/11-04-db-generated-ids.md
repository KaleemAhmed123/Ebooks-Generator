## Database-generated sharded IDs

- What if you want the benefits of a Snowflake ID (64-bit, time-ordered), but you don't want the complexity of managing Worker IDs in your application code?
- Instagram solved this by moving the generation logic directly into the database using PL/pgSQL. Instead of a Worker ID, they embedded the Logical Shard ID

````sql
-- Simplified version of Instagram's ID generator
CREATE OR REPLACE FUNCTION insta5_id(OUT result bigint) AS $$
DECLARE
    our_epoch bigint := 1314220021721;
    seq_id bigint;
    now_millis bigint;
    -- For example, shard 5
    shard_id int := 5;
BEGIN
    SELECT nextval('table_id_seq') % 1024 INTO seq_id;
    SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_millis;
    
    result := (now_millis - our_epoch) << 23;
    result := result | (shard_id << 10);
    result := result | (seq_id);
END;
$$ LANGUAGE PLPGSQL;
````

- Because the Shard ID is embedded inside the user's ID, the application can look at a user ID, perform a bitwise shift, and instantly know which database shard holds that user's data, without needing a lookup table

### The failure

- The failure is the sequence wrapping around. The Postgres sequence in this example wraps using modulo 1,024. If your database receives more than 1,024 inserts in a single millisecond, the sequence loops back to 0, and you generate a duplicate ID
- You must size the sequence bits to comfortably exceed your maximum possible throughput per millisecond per shard
