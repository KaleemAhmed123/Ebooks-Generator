## What travels in the replication log

- The leader ships a stream of changes. Three things can be in it, and the choice decides what a follower can be

| Format | What is sent | Follower can be | Breaks when |
|---|---|---|---|
| **Statement** | The SQL text | Anything that can run the SQL | `NOW()`, `RAND()`, `UUID()`: each replica evaluates them itself, and gets a different answer |
| **Row** (logical) | Each changed row, identified by its primary key or replica identity | A different major version; a subset of tables; a different database | A table with no primary key: the follower cannot find the row |
| **Physical** (WAL bytes) | The exact block changes: "exact block addresses and byte-by-byte" | An identical copy, same major version, same platform | The follower is not byte-identical: it cannot apply the blocks |

- MySQL's binary log defaults to row format; the manual lists the statements that are unsafe under statement format. Postgres streaming replication is physical; **logical replication** (publish/subscribe of row changes) is the row-based alternative and works across major versions
- Physical replication ships a whole cluster. Logical ships what you subscribe to, and can feed something that is not the same database: a search index, a warehouse, Kafka (booklet 04, change data capture)

### The failure

- Statement-based replication of `UPDATE sessions SET seen = NOW()`. Every replica stores its own clock's reading. The rows agree in structure and disagree in content, forever
- A physical standby used to test the next major version. It cannot be: physical replication ties the standby to the primary's exact version. The upgrade path is logical replication into the new version, then cut over
