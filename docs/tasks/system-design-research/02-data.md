# 02 — Data: Storage, Replication, Partitioning — research

Booklet 02 of *System Design — Distributed Systems · Events · Microservices*.
Rough-file sections §2–13. Researched 2026-09-19/20 against primary sources only.
Page grain = one A5 page, same as `typescript-to-deployment/06-api-design`.

Line format: `- \`NN-MM-slug\` — title — the one idea — the failure mode — diagram`.

## 1. Modules and pages

**81 pages** in 9 modules. Order is dependency order: a page uses only what came
before it.

### Module 01 — The workload decides the model (9 pages)

- `01-01-questions-before-the-model` — Questions before the model — pick the data model from access patterns, read/write ratio, relationships, dataset size; never from taste (DynamoDB's own guidance: "you shouldn't start designing your schema until you know the questions it will need to answer") — failure: choosing the database first, then discovering the one query it cannot do — table
- `01-02-relational` — Relational: normalize, then join — one fact in one place; joins reassemble at read time; many-to-many is free — failure: N+1 and join fan-out when the graph of tables is deep and the table is large — svg
- `01-03-document` — Document: locality over normalization — one document = one read; schema lives in the code that reads it (schema-on-read) — failure: unbounded embedded arrays; MongoDB caps a document at 16 MiB and 100 nesting levels — svg
- `01-04-wide-column` — Wide-column: partition key + clustering columns — Cassandra rows with the same partition key sit on the same replicas, sorted by clustering columns; design table per query — failure: "wide-column" is not "column-oriented"; and a partition that grows without bound becomes a hotspot ("not too big nor too small") — svg
- `01-05-key-value` — Key-value: the value is opaque — get/put by key only, everything else is a scan; Redis and DynamoDB base tables — failure: the second access pattern arrives and there is no index for it — code
- `01-06-graph` — Graph: relationships are the data — property graph = nodes, relationships, properties, labels; traversal instead of JOIN — failure: using a graph store for data that is really a tree or a table; multi-hop queries over hot nodes — svg
- `01-07-row-vs-column-storage` — Row store vs column store — OLTP reads whole rows; OLAP reads a few columns across all rows; Parquet stores column chunks inside row groups so a reader fetches only the columns it needs — failure: running analytics scans on the OLTP primary or its replica — svg
- `01-08-denormalization` — Denormalize on purpose — duplicate to make one read cheap; DynamoDB "keep related data together", "use sort order" — failure: two copies, two writers, one drifts; no single owner of the duplicate — svg
- `01-09-time-series-shape` — Time-series is its own shape — append-only, recent-hot, old-cold; one table per period (DynamoDB pattern), time-window compaction (Cassandra TWCS "TTL'ed, mostly immutable time-series data") — failure: today's key is one partition (see 08-10) — svg

### Module 02 — Storage engines (11 pages)

- `02-01-append-only-log-plus-hash-index` — The simplest database — append every write to a file, keep an in-memory hash `key → (file, offset)`; Bitcask; one seek per read; merge old files — failure: every key must fit in RAM; no range queries — svg
- `02-02-write-ahead-log` — The write-ahead log — write the change to a sequential log and fsync before touching the data structure; recovery replays the log; Postgres WAL, Cassandra commit log, RocksDB WAL — failure: `fsync = off` is "unrecoverable data corruption" on power loss; `synchronous_commit = off` reports success before the log is safe — svg
- `02-03-b-tree` — The B-tree — fixed-size pages (Postgres 8 kB, InnoDB 16 kB), sorted keys, a few levels deep; range scans and equality both cheap — failure: random writes touch random pages; page splits; one logical update rewrites a whole page — svg
- `02-04-update-is-not-in-place-mvcc` — Update is delete + insert (MVCC) — Postgres keeps old row versions for concurrent readers; VACUUM reclaims them; HOT skips index updates when no indexed column changed and the page has room — failure: bloat when VACUUM cannot keep up, and transaction-ID wraparound (32-bit XIDs, must vacuum every 2 billion transactions); Notion sharded because VACUUM stalled — svg
- `02-05-clustered-vs-heap` — Clustered index vs heap — InnoDB stores the row inside the primary-key B-tree and every secondary index carries the PK; Postgres stores rows in a heap and indexes point at them — failure: a long or random primary key (UUIDv4) bloats every secondary index and scatters inserts — svg
- `02-06-lsm-tree` — The LSM tree — writes go to a sorted memtable, flushed to immutable SSTables, merged in the background; sequential I/O for writes — failure: a read may consult the memtable and several SSTables (read amplification) — svg
- `02-07-sstables-and-bloom-filters` — SSTables and Bloom filters — sorted, immutable, sparse index in memory; a Bloom filter answers "definitely not here" so a missing key skips files (Cassandra default fp chance 0.00075) — failure: reading a key that does not exist without a Bloom filter touches every level — svg
- `02-08-compaction-strategies` — Compaction strategies — size-tiered (write-cheap, space-hungry), leveled (read- and space-cheap, write-heavy; RocksDB level multiplier 10), time-window (immutable time series), Cassandra's unified strategy for new workloads — failure: compaction debt; RocksDB stalls then stops writes when L0 files or pending compaction bytes pile up — table
- `02-09-tombstones` — Deletes are writes — LSM deletes write a tombstone that must outlive every stale copy; Cassandra `gc_grace_seconds` default 864000 s (10 days) — failure: a node down longer than gc_grace brings deleted data back ("repaired back to the other nodes and reappear") unless repair runs inside the window — svg
- `02-10-b-tree-vs-lsm` — B-tree vs LSM: three amplifications — write, read, space; you get two cheap, one expensive; B-tree = read-optimized, LSM = write-optimized — failure: choosing by fashion instead of by measured read/write ratio — table
- `02-11-in-memory-still-needs-a-log` — In-memory stores still need a log — Redis RDB snapshots (lose minutes) vs AOF (`appendfsync everysec` default, "you may lose 1 second"); replay on restart — failure: master with persistence off + auto-restart wipes every replica (documented Redis failure mode) — svg

### Module 03 — Indexes (6 pages)

- `03-01-every-index-is-a-write` — Every index is another write — each insert/update/delete touches every affected index; DynamoDB bills index writes separately; MySQL secondary indexes copy the PK — failure: ten indexes on a hot table; write throughput drops and nobody can say which index is unused — svg
- `03-02-secondary-index-lookup` — What a secondary index lookup costs — index → row pointer → heap fetch, one random read per match; the planner switches to a sequential scan when selectivity is low — failure: an index on a low-cardinality column (status) that the planner never uses — svg
- `03-03-composite-index-leftmost-rule` — Composite index and the leftmost rule — `(a, b)` serves `a=`, `a= AND b>`, not `b=` alone; "equality constraints on leading columns, plus any inequality constraints on the first column that does not have an equality constraint" (Postgres) — failure: an index in the wrong column order; a second index built to compensate — code
- `03-04-covering-index` — Covering index and index-only scan — `INCLUDE` payload columns; Postgres answers from the index only when the visibility map says the heap page is all-visible — failure: a table that changes fast never gets index-only scans; VACUUM lag turns them back into heap fetches — svg
- `03-05-beyond-b-tree` — Beyond B-tree: hash, GIN, BRIN — hash for `=` only; GIN inverted index for arrays/JSON/full-text; BRIN block-range summaries for physically ordered columns — failure: a hash index asked for a range; a BRIN on a column with no physical correlation — table
- `03-06-table-partitioning-is-not-sharding` — Table partitioning on one node — Postgres range/list/hash partitions, partition pruning, `DETACH PARTITION` instead of bulk `DELETE` — failure: calling it sharding; it is still one machine's CPU, RAM and disk — svg

### Module 04 — Encoding and schema evolution (8 pages)

- `04-01-data-outlives-code` — Data outlives code — encoding matters in three places: rows on disk, request/response, messages in a queue; rolling deploys mean old and new code read the same bytes at once — failure: assuming everyone upgrades at the same instant — svg
- `04-02-json` — JSON: readable, schemaless, lossy — no binary, no integer type; RFC 8259 promises interoperability only for integers in `[-(2^53)+1, (2^53)-1]` — failure: a 64-bit ID rounds silently in JavaScript; the fix is `id` as a string — code
- `04-03-protobuf-wire-format` — Protobuf: numbers on the wire, not names — tag = `(field_number << 3) | wire_type`; varints; field names never leave the `.proto`, so renaming is free — failure: believing the schema is self-describing; without the `.proto` the bytes are opaque — svg
- `04-04-protobuf-evolution-rules` — Protobuf evolution rules — add fields freely; delete only with `reserved`; never renumber; unknown fields are preserved on re-serialize (proto3 ≥ 3.5); editions 2023/2024 replace proto2/proto3 syntax — failure: reusing a field number, and implicit presence cannot tell `0` from "unset" — code
- `04-05-avro-writer-and-reader-schema` — Avro: writer's schema meets reader's schema — the reader resolves field by name; writer-only fields are ignored; reader-only fields take their default "or an error is signalled" — failure: adding a field with no default breaks every reader of old data — svg
- `04-06-backward-forward-full` — Backward, forward, full compatibility — backward: new reader reads old data (upgrade consumers first, Schema Registry default); forward: old reader reads new data (upgrade producers first); full: both — failure: deploying the producer first under BACKWARD mode — table
- `04-07-schema-registry` — The schema registry pattern — messages carry a schema ID / fingerprint, not the schema; the registry rejects incompatible versions at publish time; transitive modes check all past versions — failure: `NONE` compatibility "requires simultaneous producer/consumer upgrades or topic migration" — svg
- `04-08-expand-migrate-contract` — Expand, migrate, contract — database schema change as evolution: add the new column, dual-write, backfill, switch reads, drop the old column last — failure: dropping the column while a replica or old pod still reads it; the contract step run too early — svg

### Module 05 — Leader-based replication (10 pages)

- `05-01-why-replicate` — Why replicate — availability, read scale, locality; replicas are copies of the same partition — failure: replication is not backup; a bad `DELETE` replicates in milliseconds — svg
- `05-02-leader-and-followers` — Leader and followers — all writes to one node; followers apply the same change stream in the same order; reads may go anywhere — failure: writing to a follower (Redis writable replicas "can result in inconsistency"; MongoDB/Postgres refuse) — svg
- `05-03-what-travels-in-the-log` — What travels in the replication log — statement, row/logical, physical (WAL bytes); MySQL binlog default `ROW`; Postgres physical = "exact block addresses and byte-by-byte", logical = row changes by primary key — failure: statement-based with `NOW()`/`UUID()`; physical replication locked to one major version — table
- `05-04-sync-vs-async` — Synchronous vs asynchronous — does the commit wait for the follower? Postgres `synchronous_commit`: `off` / `local` / `remote_write` / `on` / `remote_apply` — failure: async loses acknowledged writes on failover; Redis Cluster documents exactly this ("B acknowledges the write, but crashes before being able to send the write to its replicas") — svg
- `05-05-semi-sync-and-quorum-commit` — Semi-synchronous and quorum commit — wait for one/any-k followers, not all; MySQL semisync waits for receipt into the relay log, not apply; Postgres `ANY 2 (s1, s2, s3)` — failure: MySQL falls back to async after `rpl_semi_sync_source_timeout` (10 s) and keeps accepting writes; "semi-sync" silently became "async" — svg
- `05-06-adding-a-follower` — Adding or rebuilding a follower — snapshot + replay from the log position (Postgres base backup, Redis `PSYNC` full sync then stream) — failure: replication backlog too small → partial resync fails → full resync storms the leader — svg
- `05-07-failover` — Failover — detect the dead leader, promote a follower, repoint clients and other followers; Postgres "does not provide the system software required to identify a failure" and names STONITH — failure: the old leader wakes up and takes writes (split brain); writes the new leader never received are gone — svg
- `05-08-replication-lag` — Replication lag — the follower is a snapshot from the past; measure it (bytes or seconds behind); Postgres cancels conflicting standby queries after `max_standby_streaming_delay` (30 s) or bloats the primary with `hot_standby_feedback` — failure: lag grows unbounded under a long-running transaction and nobody alerts on it — svg
- `05-09-read-your-own-writes` — Read-your-own-writes — after a write, this user's reads must see it: read own data from the leader, or remember the write position/timestamp and route to a caught-up replica; MongoDB causal sessions need majority read + majority write — failure: same user on two devices; the position lives in one browser — svg
- `05-10-monotonic-reads-and-consistent-prefix` — Monotonic reads and consistent prefix — monotonic: the same client never goes back in time (pin the client to one replica); consistent prefix: writes appear in order, "the reader sees a version of the data store that existed at the master at some time in the past" — failure: answer visible before the question; refresh shows an older page than the last one — svg

### Module 06 — Multi-leader replication (7 pages)

- `06-01-when-multi-leader` — When you want more than one leader — multi-region writes, offline clients, collaborative editing; each region's leader is a follower of the others — failure: the same record edited in two regions in the same second; conflicts are now a fact of life, not an edge case — svg
- `06-02-topologies` — Replication topologies — all-to-all, circular, star; causal order is not guaranteed across paths — failure: a circular ring with one dead node stops replicating; an update arrives before the insert it depends on — svg
- `06-03-conflict-avoidance` — Avoid the conflict — route each record to one home leader (user → home region); conflicts vanish while the home does not move — failure: the home region fails or the user moves; the moment of migration is a conflict window — svg
- `06-04-last-write-wins` — Last write wins — pick the highest timestamp, drop the rest; DynamoDB global tables (MREC) "latest internal timestamp on a per-item basis"; Cassandra client timestamps — failure: clock skew decides which write survives, and a write that was acknowledged disappears — svg
- `06-05-merge-or-abort` — Merge, or abort the loser — application merge (union, max, custom); MySQL Group Replication multi-primary runs "optimistically" and rolls the loser back later; DynamoDB MRSC rejects with `ReplicatedWriteConflictException` — failure: a rollback the user already saw as success — table
- `06-06-crdts` — CRDTs at a high level — data types whose merges commute: counters, registers, sets (grow-only, observed-remove); "when any two replicas have received the same set of updates, they reach the same state, deterministically" — failure: a bank balance is not a CRDT; invariants like "never below zero" need coordination; metadata (tombstones) grows — svg
- `06-07-version-vectors` — Detecting concurrent writes — a vector clock / version vector per value, `[(node, counter)]`; ancestor → overwrite, else siblings for the app to merge (Dynamo's shopping cart) — failure: siblings pile up if the app never merges; Dynamo truncates clocks at ~10 entries — svg

### Module 07 — Leaderless replication and quorums (7 pages)

- `07-01-leaderless` — No leader at all — the client (or a coordinator) sends the write to N replicas in parallel; Dynamo, Cassandra, Riak; any node can coordinate — failure: there is no single "latest"; every read is a vote — svg
- `07-02-quorums-n-w-r` — Quorums: N, W, R — a write is done at W acks, a read waits for R; `W + R > N` makes the sets overlap; Dynamo's production setting was (3, 2, 2); latency is "the slowest of the R (or W) replicas" — failure: overlap is not linearizability: concurrent writes, partial writes, and a read that races a write still return stale data — svg
- `07-03-tunable-consistency` — Tunable consistency per request — Cassandra `ONE`, `QUORUM`, `LOCAL_QUORUM`, `EACH_QUORUM`, `ALL`, `ANY`; pick per query — failure: `LOCAL_QUORUM` writes in one DC and `LOCAL_QUORUM` reads in another do not overlap — table
- `07-04-sloppy-quorum-hinted-handoff` — Sloppy quorum and hinted handoff — if a home replica is down, write to the next healthy node with a hint; deliver later; Cassandra keeps hints `max_hint_window` 3 h — failure: W + R > N no longer guarantees overlap; a read can miss the write sitting on a hinted node — svg
- `07-05-read-repair` — Read repair — the coordinator compares versions from R replicas and writes the newest back to the stale ones — failure: keys nobody reads never get repaired — svg
- `07-06-anti-entropy-merkle-trees` — Anti-entropy with Merkle trees — hash tree per key range; compare roots, descend only where they differ; Cassandra `nodetool repair` — failure: skipping repair inside `gc_grace_seconds` resurrects deletes (page 02-09) — svg
- `07-07-replication-styles-side-by-side` — Three styles, one table — leader-based / multi-leader / leaderless: where writes go, what conflicts look like, what lag means, who uses it (Postgres, MySQL, Redis / DynamoDB global tables, MySQL Group Replication / Cassandra, Dynamo) — failure: mixing styles in one design without saying which guarantees you kept — table

### Module 08 — Partitioning (18 pages)

- `08-01-why-partition` — Why partition — one node's disk, RAM and write throughput end; split the keyspace so each node owns a subset; partitioning and replication compose: each partition has its own replica set — failure: partitioning without replication, or a partition whose replicas share a rack — svg
- `08-02-range-partitioning` — Partition by key range — sorted keys, cheap range scans, adjacent keys on one node; Bigtable tablets, HBase regions, CockroachDB ranges — failure: time-ordered keys put every new write on the last range — svg
- `08-03-hash-partitioning` — Partition by hash — `hash(key)` spreads keys evenly; Cassandra Murmur3, DynamoDB's internal hash; range scans on the key are gone — failure: `hash(key) mod N` moves almost everything when N changes — svg
- `08-04-compound-keys` — Hash the partition key, sort inside it — Cassandra (partition key, clustering columns), DynamoDB (partition key, sort key): even spread across partitions, ordered range queries within one — failure: an item collection that grows forever; DynamoDB tables with an LSI cap one partition-key value at 10 GB — svg
- `08-05-consistent-hashing` — Consistent hashing — nodes and keys on the same ring; a key belongs to the next node clockwise; adding or removing a node moves only its neighbours' keys (Karger 1997: "changes minimally as the range of the function changes") — failure: one token per node gives uneven arcs and a hot successor on failure — svg
- `08-06-virtual-nodes` — Virtual nodes — each physical node owns many tokens; balance improves and a failed node's load spreads to everyone; Dynamo's "tokens", Cassandra `num_tokens` default 16; capacity-weighted — failure: the first N ring positions may land on the same physical node; Dynamo skips positions to keep replicas distinct — svg
- `08-07-fixed-number-of-partitions` — Fixed number of partitions — create far more partitions than nodes and move whole partitions; Redis Cluster's 16384 hash slots (CRC16 mod 16384) "does not use consistent hashing"; Elasticsearch primary shard count "fixed at index creation" — failure: too few partitions chosen on day one; the ceiling is permanent without a reindex — svg
- `08-08-dynamic-partitioning` — Dynamic partitioning — split a partition when it grows (Bigtable ~100–200 MB, MongoDB chunks 128 MB, CockroachDB ranges), merge when it shrinks — failure: an empty table starts as one partition, so early load hits one node; a single-key chunk cannot split (MongoDB "jumbo chunk") — svg
- `08-09-rebalancing` — Rebalancing without an outage — move the minimum; throttle the transfer; keep serving during the move; Dynamo's first scheme took "almost a day" per node join under load — failure: automatic rebalancing triggered by a slow node makes the slow node slower (a cascade) — svg
- `08-10-hot-partitions` — Hot partitions — the celebrity key, today's date, one tenant; DynamoDB caps any one partition at 3,000 RCU / 1,000 WCU regardless of table capacity; Discord's large channels stalled quorum reads — failure: throttling on one key while the table shows spare capacity — svg
- `08-11-key-salting-write-sharding` — Key salting and write sharding — append a random or calculated suffix (`2026-09-19.1` … `.200`) to spread one hot key; DynamoDB's documented pattern — failure: every read for that key now fans out ×N and merges; a random suffix makes point reads impossible (use a calculated one) — svg
- `08-12-secondary-indexes-local` — Local (document-partitioned) secondary indexes — each partition indexes its own rows; a query by index value hits every partition (scatter/gather); DynamoDB LSI shares the partition key and is strongly consistent — failure: latency = the slowest partition, every time — svg
- `08-13-secondary-indexes-global` — Global (term-partitioned) secondary indexes — the index itself is partitioned by the indexed value; one partition answers the query; updates are asynchronous; DynamoDB GSI is eventually consistent and has its own capacity — failure: an under-provisioned GSI throttles writes to the base table — svg
- `08-14-request-routing` — Request routing — three answers: any node forwards (Cassandra coordinator + gossip), a routing tier (mongos, Figma's DBProxy), or the client knows the map; metadata lives in a hierarchy (Bigtable Chubby → root → METADATA; CockroachDB meta1 → meta2) — failure: a stale routing cache after a move; the client must retry through the hierarchy — svg
- `08-15-choosing-a-shard-key` — Choosing a shard key — cardinality (how many partitions are possible), frequency (how skewed), monotonicity (does it grow); tenant or user IDs usually win (Notion: workspace ID) — failure: MongoDB "if the shard key value is always increasing, all new inserts are routed to the chunk with `maxKey`" — table
- `08-16-scatter-gather` — Cross-shard queries and transactions — a query without the shard key fans out to all shards and merges — failure: Figma: each scatter-gather "contributes the same amount of load as it would if the database was unsharded"; the shard key is missing from the query nobody thought about — svg
- `08-17-logical-vs-physical-shards` — Logical shards before physical shards — many logical shards (Notion: 480 over 32 databases) so physical moves are just remapping; Figma tested logical sharding with feature flags before touching hardware — failure: logical = physical from day one; the next split is a migration — svg
- `08-18-resharding-a-live-system` — Resharding a live system — dual-write, backfill, verify by comparing (written by a different person than the migration), dark reads, cut over; Figma's first physical shard cut over with "ten seconds of partial availability" — failure: dual-write drifts under failures; trusting the migration's own verification — svg

### Module 09 — End to end (5 pages)

- `09-01-one-write-end-to-end` — One write, end to end — client → leader → WAL fsync → memtable/B-tree page → replication log → follower ack (sync or not) → client; every stage is a place to lose the write — failure: reading "OK" as "durable everywhere" — svg
- `09-02-one-read-end-to-end` — One read, end to end — router → partition → replica (lag?) → index → page/SSTables → result; every stage is a place to read the past — failure: assuming the fastest path is also the freshest — svg
- `09-03-data-model-decision-table` — Picking the data model — relational / document / wide-column / key-value / graph / columnar against access pattern, joins, write volume, schema churn — failure: the table has no "it depends on the query" row; it does now — table
- `09-04-replication-decision-table` — Picking replication — sync / async / semi-sync / multi-leader / leaderless against RPO, latency, regions, conflict tolerance — failure: promising zero data loss on an async setup — table
- `09-05-partitioning-decision-table` — Picking partitioning — range / hash / compound / fixed / dynamic / vnodes against scans, hotspots, rebalancing, routing — failure: designing the partition scheme before the shard key — table

## 2. What the rough file missed

- **Storage engine internals as mechanism, not names.** §4 lists "hash index, B-tree, LSM" as three bullets with no WAL, no compaction, no SSTable, no Bloom filter, no tombstone, no MVCC. Interviewers ask "why is Cassandra write-fast" and "why does Postgres need VACUUM"; the rough file cannot answer either. Sources: https://cassandra.apache.org/doc/latest/cassandra/architecture/storage-engine.html, https://www.postgresql.org/docs/current/routine-vacuuming.html, https://github.com/facebook/rocksdb/wiki/RocksDB-Overview
- **Indexes entirely.** Nothing on secondary, composite, covering, or the cost of an index on writes. https://www.postgresql.org/docs/current/indexes-multicolumn.html, https://www.postgresql.org/docs/current/indexes-index-only-scans.html
- **Clustered vs heap storage and the primary-key choice.** UUID-as-PK is a standard interview probe. https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html
- **Encoding formats.** §5 says "JSON" and "additive changes are safer" and stops. No Protobuf field numbers, no Avro reader/writer schemas, no definitions of backward vs forward, no schema registry. https://protobuf.dev/programming-guides/encoding/, https://avro.apache.org/docs/1.12.0/specification/, https://docs.confluent.io/platform/current/schema-registry/fundamentals/schema-evolution.html
- **JSON number precision** (2^53) — a real production bug class. https://www.rfc-editor.org/rfc/rfc8259.html
- **Semi-synchronous replication and its silent fallback.** §8 has only sync vs async. https://dev.mysql.com/doc/refman/8.4/en/replication-semisync.html, https://www.postgresql.org/docs/current/runtime-config-replication.html
- **Failover and split brain** from the replication side (STONITH). https://www.postgresql.org/docs/current/warm-standby-failover.html
- **Monotonic reads and consistent prefix.** §7 only names read-after-write. https://www.microsoft.com/en-us/research/wp-content/uploads/2011/10/ConsistencyAndBaseballReport.pdf
- **What the replication log carries** (statement / row / physical / logical). https://dev.mysql.com/doc/refman/8.4/en/replication-formats.html, https://www.postgresql.org/docs/current/logical-replication.html
- **Leaderless replication in full.** No quorums, no N/W/R, no sloppy quorum, no hinted handoff, no read repair, no anti-entropy, no version vectors. https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf, https://cassandra.apache.org/doc/latest/cassandra/architecture/dynamo.html
- **Multi-leader detail.** §9 names LWW and CRDTs; no topologies, no conflict avoidance, no version vectors, no real system. https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/V2globaltables_HowItWorks.html, https://arxiv.org/abs/1805.06358
- **Virtual nodes.** §12 draws a ring with one token per node and never mentions vnodes. https://cassandra.apache.org/doc/latest/cassandra/managing/configuration/cass_yaml_file.html (`num_tokens` 16)
- **Rebalancing strategies** (fixed partitions, dynamic splitting, vnodes) and request routing — absent. https://redis.io/docs/latest/operate/oss_and_stack/management/scaling/, https://www.mongodb.com/docs/manual/core/sharding-data-partitioning/, https://static.googleusercontent.com/media/research.google.com/en//archive/bigtable-osdi06.pdf
- **Secondary indexes under partitioning** (local vs global). https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/LSI.html, https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html
- **Hot partition numbers and the salting trade-off.** §13 lists "key salting" with no mechanism and no read cost. https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-sharding.html, https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html
- **Shard key selection criteria** and **resharding a live system**. https://www.mongodb.com/docs/manual/core/sharding-choose-a-shard-key/, https://www.notion.com/blog/sharding-postgres-at-notion, https://www.figma.com/blog/how-figmas-databases-team-lived-to-tell-the-scale/
- **Wide-column and key-value models.** §3 covers relational/document/graph only; wide-column ≠ column-oriented is a common confusion. https://cassandra.apache.org/doc/latest/cassandra/developing/cql/ddl.html, https://parquet.apache.org/docs/file-format/
- **Table partitioning on one node is not sharding.** https://www.postgresql.org/docs/current/ddl-partitioning.html

## 3. What the rough file has that should be cut or moved

- §2 "Chapter 1 — reliability, availability nines, vertical vs horizontal scaling" — belongs in booklet 01 (Foundations). Not in this booklet.
- §3 "Interview lesson: don't answer SQL is better" — keep the idea (page 01-01) but cut the interview framing; the brief says mechanism, not tricks.
- §5 "This becomes crucial in RabbitMQ / Kafka / REST" list — cut; the list adds no mechanism. Kafka/RabbitMQ encoding lives in booklet 04 as an application of 04-06/04-07.
- §6 geographic-locality example ("India → India replica") — keep as one line in 05-01; not a page.
- §7 "Interviewers love this problem" — cut the commentary.
- §8 arrows "Consistency ↑ Latency ↑" — replace with the concrete `synchronous_commit` ladder (05-04); the arrows are too vague to be true.
- §9 "CRDT-style structures" as a strategy bullet — keep, but it needs a page with a definition (06-06); as written it is a name-drop.
- §11 "hash(userId) % N" presented as the hash strategy — wrong as advice; it is the anti-pattern (08-03 failure mode). Keep only as the thing consistent hashing fixes.
- §12 "used in distributed caches, key-value stores, routing" — cut the list; replace with the real examples (Dynamo, Cassandra) and the counter-example (Redis Cluster does not use it).
- §13 "request caching" and "replication" as hotspot fixes — move to booklet 05 (caching) and 05-01; here they are one line each, not solutions.
- Anything about transactions, isolation, CAP, consensus (§14–33) — booklet 03.

## 4. Facts to get right

All verified 2026-09-19/20 against the linked page.

| Fact | Value | Source | True for |
|---|---|---|---|
| Postgres default page size | 8 kB ("usually 8 kB, although a different page size can be selected when compiling") | https://www.postgresql.org/docs/current/storage-page-layout.html | PG 18 docs |
| Postgres default index type | B-tree; others via `USING` (Hash, GiST, SP-GiST, GIN, BRIN) | https://www.postgresql.org/docs/current/indexes-types.html | PG 18 |
| Hash index scope | "can only handle simple equality comparisons" | same | PG 18 |
| Multicolumn index rule | "equality constraints on leading columns, plus any inequality constraints on the first column that does not have an equality constraint, will always be used to limit the portion of the index that is scanned"; max 32 columns incl. INCLUDE | https://www.postgresql.org/docs/current/indexes-multicolumn.html | PG 18 |
| Index-only scan condition | visibility map bit set for the heap page, else heap visit; `INCLUDE (y)` for payload columns | https://www.postgresql.org/docs/current/indexes-index-only-scans.html | PG 18 |
| HOT update condition | update touches no indexed column (summarizing indexes excepted) and the page has room; lower `fillfactor` to help | https://www.postgresql.org/docs/current/storage-hot.html | PG 18 |
| VACUUM and wraparound | UPDATE/DELETE keep old versions; 32-bit XIDs; "vacuum every table in every database at least once every two billion transactions" | https://www.postgresql.org/docs/current/routine-vacuuming.html | PG 18 |
| `synchronous_commit` values | `off`, `local`, `remote_write`, `on` (default), `remote_apply` | https://www.postgresql.org/docs/current/runtime-config-wal.html | PG 18 |
| `wal_level` default | `replica` | same | PG 18 |
| `fsync` off warning | "can result in unrecoverable data corruption in the event of a power failure or system crash" | same | PG 18 |
| Postgres quorum sync | `FIRST num_sync (…)` priority; `ANY num_sync (…)` quorum | https://www.postgresql.org/docs/current/runtime-config-replication.html | PG 18 |
| `max_standby_streaming_delay` default | 30 s | same | PG 18 |
| `hot_standby_feedback` cost | "can cause database bloat on the primary" | same | PG 18 |
| Postgres failover | no built-in failure detection; STONITH warning; `pg_ctl promote` / `pg_promote()` | https://www.postgresql.org/docs/current/warm-standby-failover.html | PG 18 |
| Logical vs physical replication | physical = "exact block addresses and byte-by-byte"; logical = by replication identity (usually PK), publish/subscribe, cross-major-version | https://www.postgresql.org/docs/current/logical-replication.html | PG 18 |
| Postgres current versions | 18.6 / 17.11 / 16.15 / 15.19 / 14.24 (2026-08-13); 19 Beta 3 | https://www.postgresql.org/ | 2026-09-19 |
| Postgres table partitioning forms | range, list, hash; partition pruning; `DETACH PARTITION` avoids VACUUM cost of bulk DELETE | https://www.postgresql.org/docs/current/ddl-partitioning.html | PG 18 |
| InnoDB page size | default 16384; valid 4096–65536 | https://dev.mysql.com/doc/refman/8.4/en/innodb-parameters.html | MySQL 8.4 |
| InnoDB secondary index | "each record in a secondary index contains the primary key columns"; "If the primary key is long, the secondary indexes use more space" | https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html | MySQL 8.4 |
| MySQL binlog format | row-based is default; statement-based has issues with routines/triggers; `binlog_format` deprecated | https://dev.mysql.com/doc/refman/8.4/en/replication-formats.html | MySQL 8.4 |
| MySQL semisync | source waits for ≥1 replica to write events to relay log and flush (not apply); `rpl_semi_sync_source_timeout` 10000 ms then reverts to async; `AFTER_SYNC` default | https://dev.mysql.com/doc/refman/8.4/en/replication-semisync.html | MySQL 8.4 |
| MySQL Group Replication multi-primary | optimistic execution, roll back later; "eventual consistency system"; SERIALIZABLE and FK cascades fail | https://dev.mysql.com/doc/refman/8.4/en/group-replication-multi-primary-mode.html | MySQL 8.4 |
| RocksDB `write_buffer_size` | 64 MB; `level0_file_num_compaction_trigger` 4; `max_bytes_for_level_base` 256 MB | https://raw.githubusercontent.com/facebook/rocksdb/main/include/rocksdb/options.h | main, 2026-09-19 |
| RocksDB level multiplier | 10 (`max_bytes_for_level_multiplier`) | https://github.com/facebook/rocksdb/wiki/Leveled-Compaction | wiki, 2026-09-19 |
| RocksDB write stalls | causes: too many memtables, too many L0 files, pending compaction bytes; stalls apply DB-wide | https://github.com/facebook/rocksdb/wiki/Write-Stalls | wiki |
| RocksDB compaction styles | level (space-optimized), universal (write-optimized), FIFO | https://github.com/facebook/rocksdb/wiki/RocksDB-Overview | wiki |
| Bitcask keydir | in-memory hash → (file, offset, size); one seek per read; keydir "must fit entirely in RAM"; merge + hint files | https://riak.com/assets/bitcask-intro.pdf | paper |
| Cassandra write path | commit log → memtable → flush → immutable SSTables; Bloom filters | https://cassandra.apache.org/doc/latest/cassandra/architecture/storage-engine.html | 5.0 docs |
| Cassandra `num_tokens` | 16; `max_hint_window` 3h; `hinted_handoff_enabled` true; partitioner Murmur3Partitioner | https://cassandra.apache.org/doc/latest/cassandra/managing/configuration/cass_yaml_file.html | 5.0 |
| Cassandra consistency levels | ONE, TWO, THREE, QUORUM (n/2+1), ALL, LOCAL_QUORUM, EACH_QUORUM, LOCAL_ONE, ANY (writes); overlap when W + R > RF | https://cassandra.apache.org/doc/latest/cassandra/architecture/dynamo.html | 5.0 |
| Cassandra repair | read repair, hinted handoff, Merkle-tree anti-entropy (full / sub-range / incremental) | same | 5.0 |
| Cassandra gossip | every second, each node exchanges state with a random peer | same | 5.0 |
| Cassandra compaction | UCS "recommended for new workloads"; STCS default; LCS read-heavy; TWCS "TTL'ed, mostly immutable time-series data" | https://cassandra.apache.org/doc/latest/cassandra/managing/operating/compaction/overview.html | 5.0 |
| `gc_grace_seconds` | 864000 (10 days); node down longer → "deleted data will be repaired back to the other nodes and reappear" | same + https://cassandra.apache.org/doc/latest/cassandra/developing/cql/ddl.html | 5.0 |
| `bloom_filter_fp_chance` default | 0.00075 | https://cassandra.apache.org/doc/latest/cassandra/developing/cql/ddl.html | 5.0 |
| Cassandra partition guidance | rows with the same partition key on the same replicas; "not too big nor too small" | same | 5.0 |
| Cassandra data model | "partitioned wide-column storage model with eventually consistent semantics" | https://cassandra.apache.org/doc/latest/cassandra/architecture/overview.html | 5.0 |
| Cassandra release | 5.0 line, latest release 2026-08-07 | https://cassandra.apache.org/_/download.html | 2026-09-19 |
| Dynamo (N,R,W) | production (3,2,2); latency "dictated by the slowest of the R (or W) replicas" | https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf | 2007 paper |
| Dynamo sloppy quorum | "all read and write operations are performed on the first N healthy nodes from the preference list, which may not always be the first N nodes" | same | 2007 |
| Dynamo hinted handoff | replica sent to D with hint "A"; delivered when A recovers | same | 2007 |
| Dynamo vnodes | "each node gets assigned to multiple points in the ring"; preference list skips positions so N distinct physical nodes | same | 2007 |
| Dynamo vector clocks | list of (node, counter); ancestor → overwrite, else conflict; truncated at threshold "(say 10)" | same | 2007 |
| Dynamo Merkle trees | one per key range; compare roots, descend on mismatch | same | 2007 |
| Dynamo bootstrapping cost | early scheme: node join "has taken almost a day to complete" under load | same | 2007 |
| Consistent hashing origin | Karger et al. 1997: "a consistent hash function is one which changes minimally as the range of the function changes"; each bucket replicated ~log(C) times (origin of vnodes) | https://www.cs.princeton.edu/courses/archive/fall09/cos518/papers/chash.pdf | 1997 |
| Jump consistent hash | no storage, faster, but "buckets must be numbered sequentially" | https://arxiv.org/abs/1406.2294 | 2014 |
| DynamoDB per-partition cap | 3,000 read units / 1,000 write units per second; 1 RU = 1 strongly consistent read ≤4 KB (or 2 eventual); 1 WU = 1 write ≤1 KB | https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html | 2026-09-19 |
| DynamoDB item size | 400 KB; partition key ≤2048 bytes; sort key ≤1024 bytes; nesting ≤32 levels | https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html | 2026-09-19 |
| DynamoDB table quotas | 40,000 RCU/WCU per table default; 80,000 per account (provisioned); 2,500 tables per region | https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ServiceQuotas.html | 2026-09-19 |
| DynamoDB indexes | ≤5 LSIs; 20 GSIs default; LSI item collection ≤10 GB; LSI strongly consistent allowed; GSI eventual only, own capacity, under-provisioned GSI throttles base-table writes | https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/LSI.html, https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html | 2026-09-19 |
| DynamoDB read consistency | eventual is default; strongly consistent costs 2×; GSIs and streams eventual only | https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadConsistency.html | 2026-09-19 |
| DynamoDB global tables | MREC default, async "typically within a second", LWW "latest internal timestamp on a per-item basis"; MRSC sync to ≥1 other region, exactly 3 regions, `ReplicatedWriteConflictException`, RPO 0 | https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/V2globaltables_HowItWorks.html | 2026-09-19 |
| DynamoDB write sharding | random suffix 1–200 or calculated suffix (hash of OrderId mod 200 + 1); reads must query all suffixes | https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-sharding.html | 2026-09-19 |
| DynamoDB partition key examples | good: user ID, device ID; bad: status code, creation date rounded to period, one dominant device | https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-uniform-load.html | 2026-09-19 |
| DynamoDB design principle | "you shouldn't start designing your schema for DynamoDB until you know the questions it will need to answer"; as few tables as possible | https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-general-nosql-design.html | 2026-09-19 |
| DynamoDB time series | one table per period; drop old tables' WCU to 1 | https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-time-series.html | 2026-09-19 |
| Redis Cluster slots | 16384; `CRC16(key) mod 16384`; hash tags `{…}`; "does not use consistent hashing" | https://redis.io/docs/latest/operate/oss_and_stack/management/scaling/ | 2026-09-19 |
| Redis Cluster write loss | async replication: master acks, crashes before propagating, replica promoted → write lost | same | 2026-09-19 |
| Redis replication | async by default; `WAIT` gives acknowledged copies but "does not turn a set of Redis instances into a CP system"; `min-replicas-to-write` / `min-replicas-max-lag`; writable replicas "can result in inconsistency"; persistence-off + auto-restart wipes replicas | https://redis.io/docs/latest/operate/oss_and_stack/management/replication/ | 2026-09-19 |
| Redis persistence | RDB snapshots (lose "the latest minutes"); AOF `appendfsync` always / everysec (default, "may lose 1 second") / no | https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/ | 2026-09-19 |
| MongoDB write concern | implicit default `w: "majority"`; `j`; `wtimeout` does not undo | https://www.mongodb.com/docs/manual/reference/write-concern/ | current docs |
| MongoDB causal consistency | all four session guarantees only with majority read + majority write | https://www.mongodb.com/docs/manual/core/causal-consistency-read-write-concerns/ | current |
| MongoDB chunk size | 128 MB default; jumbo chunks cannot split (single shard key value); `reshardCollection` (5.0+) | https://www.mongodb.com/docs/manual/core/sharding-data-partitioning/ | current |
| MongoDB shard key criteria | cardinality, frequency, monotonic change; increasing key → all inserts to the `maxKey` chunk; use hashed sharding | https://www.mongodb.com/docs/manual/core/sharding-choose-a-shard-key/ | current |
| MongoDB shard key change | refine (add fields) or reshard entirely | https://www.mongodb.com/docs/manual/core/sharding-shard-key/ | current |
| MongoDB document limits | 16 MiB BSON; 100 nesting levels | https://www.mongodb.com/docs/manual/reference/limits/ | current |
| Bigtable tablets | row ranges; split at "approximately 100-200 MB"; three-level location: Chubby file → root tablet → METADATA; client caches locations, up to 6 round trips when stale | https://static.googleusercontent.com/media/research.google.com/en//archive/bigtable-osdi06.pdf | 2006 paper |
| CockroachDB routing | meta1 → meta2 two-level index at the start of the keyspace; ranges split at "the default range size" | https://docs.cockroachlabs.com/docs/stable/architecture/distribution-layer | stable docs |
| Elasticsearch shards | "The number of primary shards is fixed at index creation" | https://www.elastic.co/docs/manage-data/data-store/index-basics | current |
| Protobuf wire format | tag `(field_number << 3) \| wire_type`; varints 1–10 bytes; wire types 0/1/2/3/4/5; names not on the wire | https://protobuf.dev/programming-guides/encoding/ | current |
| Protobuf field numbers | 1 … 536,870,911; 19,000–19,999 reserved; 1–15 one byte; "Field numbers should never be reused"; unknown fields preserved in proto3 | https://protobuf.dev/programming-guides/proto3/ | current |
| Protobuf editions | edition 2023 / 2024 replace proto2/proto3 syntax; `field_presence` IMPLICIT vs explicit; no explicit defaults on IMPLICIT | https://protobuf.dev/programming-guides/editions/ | current |
| Avro schema resolution | writer-only field ignored; reader-only field uses default "or an error is signalled"; writer schema in container header; 64/128/256-bit fingerprints | https://avro.apache.org/docs/1.12.0/specification/ | Avro 1.12.0 |
| Schema Registry modes | BACKWARD (default; consumers first), FORWARD (producers first), FULL, NONE, plus `_TRANSITIVE`; Kafka Streams only BACKWARD | https://docs.confluent.io/platform/current/schema-registry/fundamentals/schema-evolution.html | current |
| JSON integer interoperability | exact only in `[-(2^53)+1, (2^53)-1]` | https://www.rfc-editor.org/rfc/rfc8259.html | RFC 8259 |
| Session guarantees | strong, eventual, consistent prefix, bounded staleness, monotonic reads, read-my-writes — definitions | https://www.microsoft.com/en-us/research/wp-content/uploads/2011/10/ConsistencyAndBaseballReport.pdf | Terry 2011 |
| CRDT definition | "when any two replicas have received the same set of updates, they reach the same state, deterministically"; no coordination to modify | https://arxiv.org/abs/1805.06358 | 2018 |
| Property graph | nodes (labels, properties), relationships (type, properties, source→target) | https://neo4j.com/docs/getting-started/graph-database/ | current |
| Parquet layout | row groups → column chunks → pages; reader "first read the file metadata to find all the column chunks they are interested in" | https://parquet.apache.org/docs/file-format/ | current |
| Discord hot partitions | 177 Cassandra nodes, trillions of messages (2022); hot channel partitions hurt quorum reads cluster-wide; request coalescing; ScyllaDB 72 nodes, p99 15 ms | https://discord.com/blog/how-discord-stores-trillions-of-messages | 2023 post |
| Notion sharding | VACUUM stall / XID wraparound risk; shard by workspace ID; 480 logical shards over 32 physical DBs; double-write + backfill + verification "implemented by different people" | https://www.notion.com/blog/sharding-postgres-at-notion | 2021 post |
| Figma sharding | DBProxy (parser → logical planner → physical planner); colos; logical before physical; scatter-gather "same amount of load as if unsharded"; first physical shard Sept 2023, "ten seconds of partial availability" | https://www.figma.com/blog/how-figmas-databases-team-lived-to-tell-the-scale/ | 2024 post |

## 5. Could not verify

- **B-tree fanout and depth numbers** (e.g. "a 4-level B-tree with 8 kB pages holds ~256 TB"). Derived arithmetic, not stated in any primary doc I found. Present as worked arithmetic on the page, not as a quoted fact.
- **LSM write-amplification factors** (the often-quoted "10–30× for leveled"). RocksDB wiki describes the trade-off qualitatively only. Keep the page qualitative.
- **Cassandra secondary-index scatter-gather** across all nodes — the current indexing page (`developing/cql/indexes.html`) only documents syntax; the SAI page was not fetched. Use DynamoDB LSI/GSI as the verified example for local vs global; mention Cassandra 2i only as "consult the SAI docs".
- **Cassandra `num_tokens` history** (256 → 16 in 4.0). Only the current default (16) is verified.
- **Cassandra LWW tie-break** when timestamps are equal. Not fetched.
- **CRDT state-based vs operation-based split, G-Set/2P-Set/OR-Set names.** The Shapiro 2011 INRIA report was blocked (HAL anti-bot, lip6 unreachable). The arXiv 2018 abstract verifies the definition and convergence property only. Names of the set types should be checked against the full paper before print.
- **Riak `ring_size` default 64** as a fixed-partition example. Not fetched; use Redis (16384 slots) and Elasticsearch instead.
- **HBase `hbase.hregion.max.filesize` default (10 GB)** and its row-key salting section. The single-page HBase book was too large for the fetcher. Use Bigtable/MongoDB/CockroachDB for dynamic splitting.
- **CockroachDB default range size (512 MiB)**. The distribution-layer page says "the default range size" without a number; the number lives in the zone-config page, which I did not fetch.
- **Postgres TOAST threshold (~2 kB)**. Not fetched; not needed for any page.
- **Postgres 11+ "ADD COLUMN … DEFAULT without table rewrite"**. Not fetched; do not claim it on 04-08.
- **MongoDB embedded-vs-referenced guidance page** (rate-limited). Only the 16 MiB / 100-level limits are verified for 01-03.

## 6. Sources

- https://www.postgresql.org/docs/current/storage-page-layout.html — 8 kB pages
- https://www.postgresql.org/docs/current/indexes-types.html — index types, default
- https://www.postgresql.org/docs/current/indexes-multicolumn.html — leftmost rule
- https://www.postgresql.org/docs/current/indexes-index-only-scans.html — INCLUDE, visibility map
- https://www.postgresql.org/docs/current/storage-hot.html — HOT conditions
- https://www.postgresql.org/docs/current/routine-vacuuming.html — dead tuples, wraparound
- https://www.postgresql.org/docs/current/runtime-config-wal.html — synchronous_commit, fsync
- https://www.postgresql.org/docs/current/runtime-config-replication.html — FIRST/ANY, standby delay
- https://www.postgresql.org/docs/current/warm-standby-failover.html — failover, STONITH
- https://www.postgresql.org/docs/current/logical-replication.html — logical vs physical
- https://www.postgresql.org/docs/current/ddl-partitioning.html — single-node partitioning
- https://www.postgresql.org/ — current versions
- https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html — clustered, PK copy
- https://dev.mysql.com/doc/refman/8.4/en/innodb-parameters.html — innodb_page_size
- https://dev.mysql.com/doc/refman/8.4/en/replication-formats.html — binlog formats
- https://dev.mysql.com/doc/refman/8.4/en/replication-semisync.html — semisync timeout
- https://dev.mysql.com/doc/refman/8.4/en/group-replication-multi-primary-mode.html — multi-primary conflicts
- https://github.com/facebook/rocksdb/wiki/RocksDB-Overview — LSM overview
- https://github.com/facebook/rocksdb/wiki/Leveled-Compaction — level multiplier
- https://github.com/facebook/rocksdb/wiki/Write-Stalls — stall causes
- https://github.com/facebook/rocksdb/wiki/Basic-Operations — sync writes, WAL
- https://raw.githubusercontent.com/facebook/rocksdb/main/include/rocksdb/options.h — option defaults
- https://riak.com/assets/bitcask-intro.pdf — hash index engine
- https://cassandra.apache.org/doc/latest/cassandra/architecture/storage-engine.html — write path
- https://cassandra.apache.org/doc/latest/cassandra/architecture/dynamo.html — consistency levels
- https://cassandra.apache.org/doc/latest/cassandra/architecture/overview.html — data model
- https://cassandra.apache.org/doc/latest/cassandra/managing/configuration/cass_yaml_file.html — num_tokens, hints
- https://cassandra.apache.org/doc/latest/cassandra/managing/operating/compaction/overview.html — strategies, tombstones
- https://cassandra.apache.org/doc/latest/cassandra/developing/cql/ddl.html — table options
- https://cassandra.apache.org/doc/latest/cassandra/developing/cql/indexes.html — index syntax only
- https://cassandra.apache.org/_/download.html — release date
- https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf — Dynamo paper
- https://www.cs.princeton.edu/courses/archive/fall09/cos518/papers/chash.pdf — Karger 1997
- https://arxiv.org/abs/1406.2294 — jump hash
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ServiceQuotas.html — table quotas
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.Partitions.html — hashing, item collections
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html — per-partition caps
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-uniform-load.html — key examples
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-sharding.html — write sharding
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-time-series.html — table per period
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-general-nosql-design.html — access patterns first
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/LSI.html — local index
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html — global index
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadConsistency.html — read consistency
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html — item limits
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/V2globaltables_HowItWorks.html — MREC/MRSC, LWW
- https://redis.io/docs/latest/operate/oss_and_stack/management/scaling/ — hash slots
- https://redis.io/docs/latest/operate/oss_and_stack/management/replication/ — async, WAIT
- https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/ — RDB, AOF
- https://www.mongodb.com/docs/manual/reference/write-concern/ — majority default
- https://www.mongodb.com/docs/manual/core/causal-consistency-read-write-concerns/ — session guarantees
- https://www.mongodb.com/docs/manual/core/sharding-data-partitioning/ — chunks
- https://www.mongodb.com/docs/manual/core/sharding-choose-a-shard-key/ — shard key criteria
- https://www.mongodb.com/docs/manual/core/sharding-shard-key/ — resharding
- https://www.mongodb.com/docs/manual/reference/limits/ — 16 MiB
- https://static.googleusercontent.com/media/research.google.com/en//archive/bigtable-osdi06.pdf — tablets, location
- https://docs.cockroachlabs.com/docs/stable/architecture/distribution-layer — meta ranges
- https://www.elastic.co/docs/manage-data/data-store/index-basics — fixed shards
- https://protobuf.dev/programming-guides/encoding/ — wire format
- https://protobuf.dev/programming-guides/proto3/ — field rules
- https://protobuf.dev/programming-guides/editions/ — editions
- https://avro.apache.org/docs/1.12.0/specification/ — schema resolution
- https://docs.confluent.io/platform/current/schema-registry/fundamentals/schema-evolution.html — compatibility modes
- https://www.rfc-editor.org/rfc/rfc8259.html — JSON numbers
- https://www.microsoft.com/en-us/research/wp-content/uploads/2011/10/ConsistencyAndBaseballReport.pdf — consistency definitions
- https://arxiv.org/abs/1805.06358 — CRDT definition
- https://neo4j.com/docs/getting-started/graph-database/ — property graph
- https://parquet.apache.org/docs/file-format/ — columnar layout
- https://discord.com/blog/how-discord-stores-trillions-of-messages — hot partitions
- https://www.notion.com/blog/sharding-postgres-at-notion — logical shards
- https://www.figma.com/blog/how-figmas-databases-team-lived-to-tell-the-scale/ — routing, scatter-gather

### Belongs elsewhere

- Availability nines, scaling dimensions, back-of-envelope — booklet 01.
- Transactions, isolation, linearizability, CAP, consensus, leader election mechanics, distributed locks — booklet 03 (05-07 here stops at "promote and fence").
- Kafka partitions/consumer groups, CDC, outbox, event sourcing — booklet 04 (04-06/04-07 here give the encoding rules those pages rely on).
- Caching, CDN, ID generation, search indexes, blob storage — booklet 05.
- Worked designs (Twitter timeline, URL shortener, chat) — booklet 06.
