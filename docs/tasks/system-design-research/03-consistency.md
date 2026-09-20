# 03 — Transactions, Consistency, Consensus

Research output for booklet 03 (`03-consistency`). Rough-file sections
§14–20, §27–33, §50. Written 2026-09-20. Everything below was checked against
the sources in §6 on that date unless it sits under "Could not verify".

Landed on **94 pages** across 9 modules.

---

## 1. Modules and pages

Format: `- NN-MM-slug — title — the one idea — the failure mode — diagram`

### Module 1 — What a transaction promises (8 pages)

- `01-01-why-transactions` — Why transactions exist — a transaction turns many partial-failure cases into two outcomes: all or nothing — without one, a crash between debit and credit leaves money missing and nobody knows which half ran — svg (crash points on a two-write timeline)
- `01-02-acid-atomicity` — Atomicity is abortability — atomicity means "if it fails, undo it", not "it happens at once" (that is isolation) — a client that retries a non-atomic operation after a timeout doubles it — code (TS: try/COMMIT/ROLLBACK)
- `01-03-acid-consistency` — Consistency is your invariant, not the database's — the C in ACID is an application property; the DB only enforces what you declare (constraints, FKs) — teams "rely on ACID" for an invariant nothing checks — table (invariant vs who enforces)
- `01-04-acid-isolation` — Isolation is the expensive letter — every level below serializable lets some interleaving through; the level is a contract you are signing without reading — "we use transactions so it's safe" while running at Read Committed — none
- `01-05-acid-durability` — Durability ends at fsync — committed means written to the WAL and fsynced, not "on every replica" — async replication loses committed writes on failover (points to booklet 02) — svg (client → WAL fsync → replica lag)
- `01-06-single-object-vs-multi-object` — Single-object vs multi-object — most stores give atomic single-key ops (CAS, increment) but not multi-key; "transactions" in a KV store often means the former — assuming DynamoDB `PutItem` across two items is atomic — table (Postgres / Redis / DynamoDB / Cassandra: single vs multi)
- `01-07-what-a-transaction-costs` — What a transaction costs — a long transaction holds locks, pins a snapshot, blocks vacuum; short and narrow is the whole art — an open transaction across a network call or user think-time — svg (lock/snapshot held across an HTTP call)
- `01-08-retrying-aborted-transactions` — Retry on abort, but only whole transactions — serialization failures (`40001`) are expected under RR/Serializable; the app must re-run the whole transaction, not the last statement — retrying a statement, or retrying a transaction that also sent an email — code (TS retry loop on SQLSTATE 40001)

### Module 2 — Isolation levels and their anomalies (12 pages)

- `02-01-the-anomaly-map` — The anomaly map — five named anomalies plus dirty write; every isolation level is defined by which it lets through — people quote SQL-92's three and miss the two that actually bite (lost update, write skew) — table (anomaly × level, PG and MySQL columns)
- `02-02-dirty-read` — Dirty read — seeing another transaction's uncommitted write — a report that counts a transfer that later rolled back — svg (two timelines, uncommitted read)
- `02-03-dirty-write` — Dirty write — overwriting another transaction's uncommitted write — two transactions updating a listing and its invoice interleave so the winner of one is the loser of the other — svg
- `02-04-read-committed` — Read Committed, the default in Postgres — no dirty reads, no dirty writes; each *statement* sees a fresh snapshot — two selects in one transaction disagree (non-repeatable read) — code (SQL, two sessions)
- `02-05-non-repeatable-read` — Non-repeatable read (read skew) — same row, two values inside one transaction — a backup or a long analytic query reads half the state before a transfer and half after — svg
- `02-06-snapshot-isolation` — Snapshot isolation — the transaction sees the database as of its start; readers never block writers, writers never block readers — the snapshot is taken at the *first statement*, not at `BEGIN` (Postgres) / first read (InnoDB) — svg (versions with xmin/xmax)
- `02-07-repeatable-read-pg-vs-mysql` — Repeatable Read means two different things — Postgres RR is snapshot isolation and aborts on concurrent update; InnoDB RR is snapshot for plain reads but *locking reads see the latest row* and use next-key locks — assuming one vendor's RR semantics on the other — table (PG vs InnoDB: snapshot point, phantom, lost update, how conflicts surface)
- `02-08-lost-update` — Lost update — read-modify-write where the second write clobbers the first — a counter incremented in application code under Read Committed — code (TS: naive vs atomic `UPDATE ... SET n = n + 1`)
- `02-09-preventing-lost-updates` — Preventing lost updates — atomic write ops, `SELECT ... FOR UPDATE`, compare-and-set with a version column, or RR/Serializable in Postgres — CAS with a `WHERE version = ?` that ignores the "0 rows updated" result — code (TS CAS with row-count check)
- `02-10-phantom-read` — Phantom — a query's result set changes because rows were inserted; locks on rows cannot lock rows that do not exist yet — "check then insert" for uniqueness (booking a free slot) — svg
- `02-11-write-skew` — Write skew — two transactions each read a set, each write a different row, together break an invariant the reads checked — on-call doctors both go off duty; snapshot isolation does not catch it — svg (two doctors) + code
- `02-12-materializing-conflicts` — Materializing conflicts and predicate locks — make the phantom a row (a slot row per time window) so a lock can attach to it; or let SSI / index-range locks do it — inventing lock rows at scale, or forgetting the row for the "not booked yet" case — code (SQL slot table)

### Module 3 — Concurrency control: how the database keeps the promise (10 pages)

- `03-01-mvcc` — MVCC: versions instead of blocking — every write creates a version tagged with a transaction id; readers pick the version visible to their snapshot — old versions pile up (Postgres bloat/vacuum; InnoDB undo log growth) when a transaction stays open — svg (row versions with xmin/xmax and a snapshot)
- `03-02-pessimistic-locking` — Pessimistic: lock first — `SELECT ... FOR UPDATE` / `FOR SHARE`, and Postgres's four row-lock modes; a lock is a queue — lock held across a user prompt; lock-ordering deadlocks — table (PG row-lock modes and what they block)
- `03-03-deadlocks` — Deadlocks are detected, not prevented — the DB aborts one victim after `deadlock_timeout` (1 s in Postgres); the app must retry — acquiring rows in different orders per code path — svg (wait-for cycle)
- `03-04-skip-locked-and-nowait` — `SKIP LOCKED` and `NOWAIT` — job queues in SQL: take the first unlocked row instead of waiting — polling workers stampede on the same row without it — code (SQL `FOR UPDATE SKIP LOCKED LIMIT 1`)
- `03-05-optimistic-concurrency` — Optimistic: validate at commit — read a version, write with `WHERE version = v`; no lock held, conflicts surface as 0 rows — high-contention rows (a single hot counter) retry forever — code (TS optimistic update)
- `03-06-choosing-optimistic-vs-pessimistic` — Choosing — contention rate decides: low contention → optimistic (no lock wait), high contention → pessimistic (no wasted work) — measuring neither and picking by taste — table
- `03-07-two-phase-locking` — Two-phase locking (2PL) — acquire locks in a growing phase, release only in a shrinking phase; serializable but readers block writers — throughput collapse under skew; not the same thing as two-phase *commit* — svg (growing/shrinking)
- `03-08-serializable-snapshot-isolation` — SSI: serializable without blocking — Postgres's Serializable = snapshot isolation + tracking read/write dependencies, abort on a dangerous cycle — false positives abort innocent transactions; any transaction can be aborted, so every one needs a retry loop — svg (rw-dependency cycle)
- `03-09-serializable-in-practice` — Serializable in practice — Postgres SSI, CockroachDB default, DynamoDB transactional ops; InnoDB Serializable turns reads into shared locks (2PL) — turning on Serializable without a retry path — table (Postgres / InnoDB / CockroachDB / DynamoDB: mechanism, default)
- `03-10-advisory-locks` — Advisory locks — app-defined locks inside the database (`pg_advisory_xact_lock`) for things MVCC handles badly (one job per tenant) — a session-level advisory lock leaking past a pooled connection — code (SQL)

### Module 4 — Transactions across services: 2PC and sagas (11 pages)

- `04-01-the-problem` — Why one transaction cannot span services — each service owns its database; the network sits between the writes; a crash between them leaves both worlds inconsistent — "we'll just call both services in a try/catch" — svg (order → payment → inventory with a crash between)
- `04-02-two-phase-commit` — 2PC: prepare, then commit — coordinator asks every participant to *prepare* (durably promise); once all say yes, the decision is logged and commit is sent — the promise is the expensive part: a prepared participant must hold locks until told — svg (coordinator/participants, two phases)
- `04-03-2pc-failure-cases` — Where 2PC breaks — participant crash before prepare: abort; coordinator crash after all prepared: participants block, locks held, "in doubt" — an in-doubt transaction holding row locks for hours until an operator resolves it — table (who crashes when → outcome)
- `04-04-2pc-in-real-systems` — 2PC you already use — XA transaction managers, Postgres `PREPARE TRANSACTION` (off by default: `max_prepared_transactions = 0`), DynamoDB transactions do two writes per item (prepare + commit) — treating `PREPARE TRANSACTION` as an application feature — code (SQL prepare / commit prepared)
- `04-05-three-phase-commit` — 3PC and why it is rarely used — adds a pre-commit phase so no participant blocks on a coordinator crash, but assumes bounded delay; a partition makes it choose wrong — network partitions are exactly the failure it does not survive; consensus-based commit replaced it in practice — svg
- `04-06-sagas` — Sagas: a sequence of local transactions — T1..Tn each commit locally; on failure run compensations Cn..C1 (backward recovery) or push forward (forward recovery) — a compensation can itself fail; sagas are not isolated, other work sees intermediate states — svg (T1 T2 T3 ✗ C2 C1)
- `04-07-compensation-design` — Designing compensations — semantic undo (refund, release hold), not rollback; every step must be idempotent because the saga runner retries — "cancel shipment" after the truck left: some steps are pivots with no undo — table (step / compensation / is it a pivot)
- `04-08-saga-isolation-anomalies` — What sagas let others see — a second saga reads a partial state (dirty read at the workflow level), or two sagas race on stock (lost update) — countermeasures: semantic locks (a `PENDING` state), commutative updates, re-read before pivot — table (anomaly → countermeasure)
- `04-09-orchestration-vs-choreography` — Orchestration vs choreography, the transactional view — orchestrator = one place holds the state machine and knows what to compensate; choreography = the state lives in the event trail (event plumbing is booklet 04's) — choreography with no owner: nobody can answer "what state is order 42 in" — svg (two shapes)
- `04-10-the-saga-state-must-be-durable` — The saga's own state is a transaction problem — the orchestrator's "step 3 done" must be committed atomically with step 3's effect, or a crash replays or skips a step — orchestrator state in memory or in a different store than the step — svg (crash between effect and state write)
- `04-11-when-not-to-distribute` — The cheapest distributed transaction is none — put the two rows in one database, or make one service own both; distribution is a cost you justify — splitting "order" and "order line" into two services then building sagas to reunite them — none

### Module 5 — Consistency models: what a read may return (12 pages)

- `05-01-what-a-consistency-model-is` — A consistency model is a contract about reads — it names which histories the system may show a client; stronger = fewer allowed histories = more coordination — using "consistent" to mean three different things in one design review (ACID C, CAP C, replica consistency) — svg (ladder of models, Jepsen shape)
- `05-02-linearizability` — Linearizability — every operation appears to take effect atomically at one instant between its call and return, and later operations see it — "read after write from a replica" is not linearizable even if replication is fast — svg (call/return bars with a linearization point)
- `05-03-linearizability-is-single-object` — Linearizability is per object; serializability is per transaction — linearizable ≠ serializable; strict serializability is both — calling a serializable database "linearizable" and assuming a fresh read of one row — table (linearizable / serializable / strict serializable)
- `05-04-where-you-need-linearizability` — Where you actually need it — locks, leader election, uniqueness (usernames), account balances; anything that decides "who was first" — building uniqueness on an eventually consistent index — table
- `05-05-what-linearizability-costs` — What it costs — a linearizable read must reach a majority or a confirmed leader; cross-region round-trips are the floor; under partition, a side must refuse — treating "strongly consistent read" as a free flag (DynamoDB `ConsistentRead`, etcd linearizable read both cost more) — svg (client → leader → quorum ack)
- `05-06-sequential-consistency` — Sequential consistency — one total order that respects each client's own order, but not real time — ZooKeeper reads can be stale (its guarantee list + `sync()` to get fresh) — svg (two clients, one order, no clock)
- `05-07-causal-consistency` — Causal consistency — if A could have caused B, everyone sees A before B; concurrent writes may appear in different orders — comment appears before the post it replies to — svg (chat example)
- `05-08-session-guarantees` — Read-your-writes and the session guarantees — read-your-writes, monotonic reads, monotonic writes, writes-follow-reads: promises per *session*, cheap because they only need stickiness — a load balancer sends the next read to a lagging replica after a write — table (four guarantees, the bug each stops)
- `05-09-implementing-read-your-writes` — Implementing read-your-writes — route the writer's reads to the leader for N seconds, or carry the write's LSN/revision and wait for the replica to catch up — timestamps from client clocks used to decide "recent" — code (TS: read after write with a token)
- `05-10-eventual-consistency` — Eventual consistency is a liveness promise, not a model — "if writes stop, replicas converge"; it says nothing about what you read meanwhile — stating "eventually consistent" as the design and not saying *how* or *how long* — svg (divergence then convergence)
- `05-11-stale-reads-in-practice` — Where stale reads come from — replica lag, caches, secondary indexes (DynamoDB GSIs are eventually consistent), CQRS read models (booklet 04) — "the write succeeded, why doesn't the list show it" — table (source of staleness → fix)
- `05-12-picking-a-model-per-operation` — Pick the model per operation, not per system — the checkout needs linearizable stock; the recommendations feed does not — one global "consistency setting" — table (operation → model → mechanism)

### Module 6 — CAP, stated correctly, and PACELC (6 pages)

- `06-01-cap-as-proved` — CAP as Gilbert and Lynch proved it — C = linearizability, A = every request to a non-failing node gets a non-error response, P = messages may be lost; you cannot have all three in an asynchronous network — "pick two of three" — svg (partition, one side must refuse or diverge)
- `06-02-partitions-are-not-optional` — P is not a choice — a distributed system will be partitioned; CAP asks what you do *when* it happens — designing a "CA" system — none
- `06-03-cap-is-narrow` — What CAP does not cover — nothing about latency, nothing about non-partition failures, nothing about weaker models between C and A; most real systems are neither CP nor AP under the strict definitions (a single-leader DB is neither) — labelling databases CP or AP in a design doc — table (CAP says / CAP does not say)
- `06-04-partition-mode` — Brewer's practical CAP: detect, degrade, recover — decide per operation what to refuse during a partition; log what happened; reconcile after — a system that has no partition mode and silently diverges — svg (detect → partition mode → recovery)
- `06-05-pacelc` — PACELC — if Partitioned: A or C; Else: Latency or Consistency; the second trade-off runs all the time — copying a PA/EL design (Dynamo-style) for a ledger — table (PA/EL, PC/EC, PA/EC, PC/EL with Abadi's examples)
- `06-06-the-consistency-map` — The map (replaces rough §50) — strict serializable → linearizable → sequential → causal → session guarantees → eventual; what each costs and which are "sticky available" — treating the ladder as a strict total order (serializable and linearizable are different axes) — svg (the ladder, two axes)

### Module 7 — Consensus (14 pages)

- `07-01-why-consensus` — Why consensus exists — several nodes must agree on one value (who leads, what the next log entry is) despite crashes and lost messages; replication alone cannot do it — hand-rolled "the node with the lowest id is leader" — svg (three nodes, a partition, two candidates)
- `07-02-the-problem-statement` — Agreement, validity, termination — safety = never two decisions; liveness = eventually one; FLP says you cannot guarantee both in a fully asynchronous system, so real protocols use timeouts and accept occasional stalls — expecting a consensus system to make progress during a full partition — table (property → what breaks if lost)
- `07-03-replicated-state-machine` — Replicated state machine — agree on a log; apply it in order; every replica reaches the same state — applying an entry before it is committed — svg (log → state machine ×3)
- `07-04-raft-terms` — Raft: terms — a term is a logical clock; every message carries one; a stale term is rejected — a paused old leader wakes and keeps writing (the term stops it) — svg (timeline of terms)
- `07-05-raft-leader-election` — Raft: leader election — follower hears nothing for a randomized timeout, becomes candidate, asks for votes; majority wins; randomization avoids split votes — timeouts too close to network RTT cause election storms — svg (state diagram follower/candidate/leader)
- `07-06-raft-log-replication` — Raft: log replication — leader appends, sends `AppendEntries`, entry is committed when a majority has it; followers' conflicting entries are overwritten — thinking "written to leader" means committed — svg (leader/follower logs with commit index)
- `07-07-raft-safety` — Raft: why the new leader has everything — voters refuse a candidate whose log is behind; leader only commits current-term entries by counting — the Figure-8 case: an old-term entry on a majority is not yet safe — svg (Figure 8 simplified)
- `07-08-raft-reads` — Reading from Raft — a read served by the leader must confirm it is still leader (ReadIndex or lease) or it can be stale; etcd offers linearizable (default) and serializable reads — "read from the leader is safe" without the check — svg
- `07-09-raft-tuning` — Timeouts in numbers — paper 150–300 ms; etcd defaults 100 ms heartbeat, 1000 ms election, election ≥ 10× RTT — same defaults across a cross-region cluster — table (parameter, default, rule)
- `07-10-paxos-in-one-page` — Paxos in one page — proposers, acceptors, ballot numbers; phase 1 promise, phase 2 accept; a majority of acceptors remembers; Multi-Paxos adds a stable leader to skip phase 1 — reading Paxos as "Raft without a leader" and building it — svg (two phases)
- `07-11-majority-quorums` — Majority quorums, revisited — any two majorities intersect, so a decision survives; N=3 tolerates 1, N=5 tolerates 2; even counts buy nothing — five nodes in two data centres (3+2): losing the 3 stops the cluster — table (N → tolerated failures)
- `07-12-membership-and-snapshots` — Membership changes and snapshots — add/remove nodes one at a time (joint consensus otherwise); compact the log with snapshots or it grows forever — swapping two nodes at once creates two disjoint majorities — svg
- `07-13-where-consensus-runs` — Where consensus runs in your stack — etcd (Raft, Kubernetes state), ZooKeeper (Zab), Kafka KRaft (ZooKeeper-free since 4.0), CockroachDB/Spanner per-range — putting the *data path* through consensus when only metadata needs it — table (system / protocol / what it decides)
- `07-14-what-consensus-costs` — What consensus costs — one round-trip to a majority per decision, a leader bottleneck, unavailability during elections — running consensus across regions and expecting single-region latency — table (cost / mitigation)

### Module 8 — Leader election, split brain, locks (10 pages)

- `08-01-leader-election-is-consensus` — Leader election is a consensus problem — "one leader" is a uniqueness decision; you either use a consensus service or you get two — heartbeats-through-the-database as an election — svg
- `08-02-split-brain` — Split brain — two nodes both believe they lead; both accept writes; the data diverges — the "old" leader is still reachable by some clients — svg (partition with two leaders)
- `08-03-leases` — Leases — a lease is a lock with an expiry, so a dead holder does not block forever; it relies on bounded clock drift — a holder paused past its lease still thinks it holds it — svg (lease timeline with a GC pause)
- `08-04-fencing-tokens` — Fencing tokens — the lock service hands out a monotonic number; the *resource* rejects any write with a smaller number than it has seen — the resource does not check tokens (an S3 bucket, a plain HTTP API) — svg (client 33 delayed, client 34 writes, 33 rejected)
- `08-05-fencing-in-real-systems` — Fencing tokens you can get today — ZooKeeper `zxid` / znode version, etcd revision / lease id, Chubby sequencers; Kafka epochs (producer epoch, leader epoch) — a Redis TTL key hands out no token — table (system → token)
- `08-06-distributed-locks-purpose` — Efficiency vs correctness locks — Kleppmann's split: efficiency (avoid doing work twice) tolerates rare double-holding; correctness (never two writers) does not — building a correctness lock on a tool built for efficiency — table
- `08-07-single-redis-lock` — The single-instance Redis lock — `SET key rand NX PX ttl`, release only if the value matches (`DELEX`, Redis 8.4+, or the Lua script) — `DEL` without the check releases someone else's lock; failover to an async replica loses the lock — code (TS acquire/release)
- `08-08-redlock-and-the-dispute` — Redlock and why it is contested — five independent masters, majority within the TTL; Kleppmann: no fencing token, and timing assumptions (clock jumps, pauses) break it; antirez: random token + check-and-set suffices, drift is bounded; the Redis docs now say "implement fencing tokens" and "Redis is not using monotonic clock for TTL" — using Redlock for correctness because it has five nodes — table (claim / Kleppmann / antirez)
- `08-09-locks-on-consensus` — Locks on a consensus store — etcd lock + lease + revision; ZooKeeper ephemeral sequential znodes; both give a token and die with the session — the client never uses the token on the resource — code (TS etcd-style sketch)
- `08-10-lock-free-alternatives` — Often you do not need a lock — idempotent operations, conditional writes (CAS), unique constraints, single-writer partitions do the same job with no coordinator — a global lock around a per-key operation — table (need → lock-free alternative)

### Module 9 — Clocks (11 pages)

- `09-01-two-kinds-of-clock` — Time-of-day vs monotonic — wall clock answers "when"; monotonic answers "how long"; only the second never goes backwards — measuring a timeout with `Date.now()` — code (TS `performance.now()` / `process.hrtime.bigint()`)
- `09-02-ntp-and-drift` — NTP and drift — quartz drifts (Spanner budgets 200 µs/s); NTP steps or slews the clock, so time jumps; accuracy depends on the network path — sub-second ordering across machines by wall-clock — svg (drift + step)
- `09-03-leap-seconds` — Leap seconds — 23:59:60 exists; kernels repeat a second or smear it; the Cloudflare 2017 outage was a negative duration from `time.Now()` — a timer that assumes `now - before >= 0` — none
- `09-04-timestamps-cannot-order-writes` — Last-write-wins loses writes — ordering writes by wall-clock timestamps drops the later write when clocks disagree (Cassandra-style LWW; details in booklet 02) — trusting node timestamps for conflict resolution — svg (two nodes, skewed clocks, wrong winner)
- `09-05-lamport-clocks` — Lamport timestamps — a counter that captures "happened-before" without a clock; total order consistent with causality, nothing about real time — reading a Lamport order as a time order — svg
- `09-06-hybrid-logical-clocks` — Hybrid logical clocks — wall time plus a counter, stays within bounded distance of physical time, fits in 64 bits; used by CockroachDB — a node whose clock exceeds the cluster's max offset (CockroachDB kills it; 500 ms default) — svg (l, c pair updates)
- `09-07-truetime` — TrueTime at a glance — `TT.now()` returns an interval; Spanner waits out the uncertainty (commit wait) before making a write visible; ε ≈ 1–7 ms with GPS + atomic clocks — copying the idea on NTP-grade clocks (ε becomes hundreds of ms) — svg (interval, commit wait)
- `09-08-process-pauses` — The process pause — GC, VM migration, page faults, `SIGSTOP`: a thread can stop for seconds between two lines; any "I checked the lease then wrote" has a gap — a lease check followed by a write with no fencing — code (TS: the two lines with a pause annotation)
- `09-09-timeouts-are-not-proof` — A timeout proves nothing about the other side — no reply means dead, slow, or partitioned; you cannot tell (booklet 01 owns timeouts; here only the consensus consequence — that is why terms/epochs exist) — declaring a node dead and reassigning its work while it still runs — svg
- `09-10-the-clock-lesson` — The rule — never use a clock to decide *ordering* or *ownership*; use it only for measuring durations and for human-readable stamps; ownership comes from a token, ordering from a log — every clock-based lock, TTL-based ownership and timestamp-ordered merge in your system — table (use → safe / unsafe)
- `09-11-interview-checkpoint` — Interview checkpoint: the questions behind this booklet — "how do you prevent double booking", "what happens if the leader dies mid-write", "why not Redis for the lock" — answering with a tool name instead of the mechanism — none

Page count: 8 + 12 + 10 + 11 + 12 + 6 + 14 + 10 + 11 = **94**.

Two-page topics are already split into named pages (Raft has 6, 2PC 3,
sagas 5). No `-1` / `-2` suffixes needed.

---

## 2. What the rough file missed

Each: topic, why it matters, primary source.

- **Snapshot isolation / MVCC as the mechanism.** The rough file lists anomalies but never says how Postgres and InnoDB actually avoid them; every "why does RR differ between vendors" question turns on this. https://www.postgresql.org/docs/current/transaction-iso.html
- **Vendor defaults.** Postgres defaults to Read Committed; InnoDB defaults to Repeatable Read. The rough file names neither. https://www.postgresql.org/docs/current/transaction-iso.html and https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html
- **Repeatable Read is two different things.** Postgres RR = snapshot isolation, aborts on concurrent update; InnoDB RR = snapshot for plain reads, but locking reads and UPDATE see the latest committed row and use next-key locks. Sources above.
- **Dirty write.** Missing from the rough table; it is the anomaly even Read Committed must prevent and the reason "read uncommitted" is not a real level in Postgres. https://www.postgresql.org/docs/current/transaction-iso.html
- **How serializable is implemented: 2PL vs SSI.** The rough file says serializable "costs performance" with no mechanism. Postgres SSI abort-and-retry vs InnoDB's lock-based Serializable is the concrete difference. https://www.postgresql.org/docs/current/transaction-iso.html
- **Optimistic vs pessimistic locking, `FOR UPDATE`, `SKIP LOCKED`, advisory locks, deadlock detection.** Absent entirely. https://www.postgresql.org/docs/current/explicit-locking.html ; https://www.postgresql.org/docs/current/runtime-config-locks.html
- **Retry loops for serialization failures (SQLSTATE 40001).** Any RR/Serializable deployment needs one; the rough file never says so. https://www.postgresql.org/docs/current/transaction-iso.html
- **2PC failure cases and "in doubt" transactions.** The rough file says "blocking scenarios" and stops. The coordinator-crash-after-prepare case is the whole reason 2PC is avoided. https://www.postgresql.org/docs/current/sql-prepare-transaction.html
- **3PC and why it is not used.** Not mentioned. Skeen 1981 (see "Could not verify" for a fetchable primary).
- **Saga isolation anomalies and countermeasures; compensation design; pivot steps; durable saga state.** Rough §20 is a diagram and one sentence. Garcia-Molina & Salem 1987 define backward vs forward recovery. https://www.cs.cornell.edu/andru/cs711/2002fa/reading/sagas.pdf
- **DynamoDB transactions as a worked "2PC inside one system" example.** 100 items, 4 MB, two writes per item (prepare, commit), `ClientRequestToken` idempotency for 10 minutes. https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/transaction-apis.html
- **Linearizability vs serializability vs strict serializability.** The rough file's linearizability line ("once a write completes, every subsequent read sees it") is fine as intuition, but it never separates the single-object model from the transaction model. https://jepsen.io/consistency/models/linearizable
- **Causal consistency and session guarantees (read-your-writes, monotonic reads, monotonic writes, writes-follow-reads).** Not mentioned. These are the cheap, "sticky available" models most product features actually need. https://jepsen.io/consistency/models/causal ; https://jepsen.io/consistency/models/read-your-writes
- **CAP as Gilbert & Lynch define it (C = atomic/linearizable, A = non-failing node must respond), and that it is a safety/liveness trade-off.** The rough file gets the "not 2 of 3" point right but never gives the real definitions. https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer2.pdf
- **Brewer's "CAP Twelve Years Later": partition mode, per-operation choice, CAP C ≠ ACID C.** https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/
- **Kleppmann's "stop calling databases CP or AP".** Single-leader databases are neither; CAP ignores latency. https://martin.kleppmann.com/2015/05/11/please-stop-calling-databases-cp-or-ap.html
- **PACELC examples.** Abadi's classification (Dynamo/Cassandra/Riak PA/EL; VoltDB, Megastore, BigTable/HBase PC/EC; MongoDB PA/EC; PNUTS PC/EL). https://www.cs.umd.edu/~abadi/papers/abadi-pacelc.pdf
- **FLP and why consensus protocols use timeouts.** Not mentioned; it is the one-line answer to "why can't consensus be always available". Stated in Gilbert & Lynch 2012 (above).
- **Raft at mechanism depth: terms, election restriction, commit rule, Figure 8, ReadIndex/lease reads, membership change, snapshots.** The rough file has a three-node picture. https://raft.github.io/raft.pdf
- **Raft numbers.** Paper 150–300 ms; etcd 100 ms heartbeat / 1000 ms election / ≥10× RTT / 50 s cap. https://etcd.io/docs/v3.6/tuning/
- **Paxos.** Named, never explained. Lamport, "Paxos Made Simple" (2001) — see "Could not verify" for URL status.
- **Where consensus runs: etcd (Raft), ZooKeeper (Zab, not Raft), Kafka KRaft (ZooKeeper removed in 4.0, March 2025).** https://etcd.io/docs/v3.6/learning/why/ ; https://kafka.apache.org/blog/2025/03/18/apache-kafka-4.0.0-release-announcement/
- **ZooKeeper's actual guarantees: reads can be stale, `sync()`, zxid = epoch<<32 | counter, ephemeral nodes.** https://zookeeper.apache.org/doc/current/zookeeperProgrammers.html ; https://zookeeper.apache.org/doc/current/zookeeperInternals.html
- **etcd's guarantees: linearizable reads by default, serializable reads may be stale, monotonic revision.** https://etcd.io/docs/v3.6/learning/api_guarantees/
- **Split brain, leases, fencing tokens.** Entirely missing, and the most-asked follow-up to "use a distributed lock". https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html
- **Redlock and the Kleppmann/antirez dispute, with the Redis docs' own current caveats** ("implement fencing tokens"; "Redis is not using monotonic clock for TTL"; `DELEX` in 8.4). https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/ ; http://antirez.com/news/101
- **Clocks: the entire module.** Monotonic vs time-of-day, NTP drift, leap seconds, Lamport clocks, HLC, TrueTime, process pauses. Nothing in the rough file. Spanner: https://storage.googleapis.com/gweb-research2023-media/pubtools/1974.pdf ; HLC: https://cse.buffalo.edu/tech-reports/2014-04.pdf ; CockroachDB: https://docs.cockroachlabs.com/docs/stable/architecture/transaction-layer ; Cloudflare 2017: https://blog.cloudflare.com/how-and-why-the-leap-second-affected-cloudflare-dns/ ; Node: https://nodejs.org/api/process.html
- **The "which anomaly is this bug" framing.** The rough file admits "interview answer quality jumps with concrete examples" but supplies none. Every anomaly page above carries one.

## 3. What the rough file has that should be cut or moved

- **§14 debit/credit atomicity example** — keep, but it conflates atomicity with isolation ("either A+B or nothing" is atomicity; the §15 example is a lost update, an isolation problem). Split cleanly (pages 01-02, 01-04, 02-08).
- **§16 anomaly table** — keep the names, replace the one-word "meanings" (e.g. "Non-repeatable read: same query gives different value" also describes a phantom). Missing dirty write.
- **§17 "correctness ↑ concurrency ↓"** — wrong as a general rule since SSI; serializable in Postgres does not block readers. Cut the slogan, keep the trade-off with mechanism (03-08).
- **§18 order → payment → inventory chain** — keep as the running example for module 4.
- **§19 "microservices often avoid 2PC"** — keep, but the reason given (expensive / blocking / coordinator problems) needs the concrete in-doubt case.
- **§20 sagas** — keep the diagram; the "very important for interviews" line is filler.
- **§27 "sequential consistency: know the distinction conceptually"** — keep, one page (05-06); ZooKeeper is the concrete example.
- **§29 eventual consistency diagram** — keep, but reframe as a liveness promise, not a model (05-10).
- **§30 CAP** — keep the correction ("not 2 of 3"); add the real definitions.
- **§31 PACELC "interview bonus"** — keep; drop the "bonus" framing, it is how real systems are classified.
- **§32 "you don't need to implement Raft"** — true; cut the sentence. The reader does need terms / election / replication / commit at mental-model depth, which the rough file skips.
- **§33 quorum N/R/W** — **moves to booklet 02** (leaderless replication, Dynamo-style quorums). This booklet keeps only *majority* quorums for consensus (07-11) and the one-line "W+R>N is not linearizable" cross-reference (Abadi says the same: "cannot achieve full consistency as defined by Gilbert and Lynch, even if R+W>N").
- **§50 "CAP/consistency mental map"** — the ladder puts *Serializable* between *Linearizability* and *Quorum models*; those are different axes (transaction isolation vs single-object recency). Replace with the two-axis map (06-06). The rough file itself admits "not a perfect mathematical ordering".
- **Rough §23 idempotency, §24 timeouts, §25 retries** — referenced by 01-08, 04-07, 09-09 but **owned by booklet 01**. This booklet only draws the consensus-side consequence.
- **Outbox, exactly-once, event ordering** — sagas' event plumbing, choreography mechanics and outbox are **booklet 04**. Page 04-09 states the transactional view only and points across.
- **Vector clocks / version vectors, LWW conflict resolution** — **booklet 02** (multi-leader / leaderless). Page 09-04 names the failure and points across; 09-05 keeps Lamport clocks because they are the bridge to HLC.
- **Belongs elsewhere, deliberately not covered:** Byzantine fault tolerance (rare in product-company interviews; one line in 07-02 at most); Postgres vacuum tuning (booklet 02, storage); MongoDB causal sessions (a product detail; concept page 05-07 covers it).

## 4. Facts to get right

All verified 2026-09-20 against the linked source.

**Isolation levels**

- Postgres default isolation level is **Read Committed**. Read Uncommitted is accepted but behaves as Read Committed ("internally only three distinct isolation levels are implemented"). — https://www.postgresql.org/docs/current/transaction-iso.html (docs "current" = 18)
- Postgres Repeatable Read "is implemented using a technique known ... as Snapshot Isolation"; the snapshot is "as of the start of the first non-transaction-control statement in the transaction", not `BEGIN`. Phantom reads at RR: "allowed, but not in PG". — same
- Postgres Serializable "is implemented using ... Serializable Snapshot Isolation". Failures always return SQLSTATE **40001**; messages: "could not serialize access due to concurrent update" (RR and Serializable) and "could not serialize access due to read/write dependencies among transactions" (Serializable). — same
- `SERIALIZABLE READ ONLY DEFERRABLE` is "the only case where Serializable transactions block but Repeatable Read transactions don't". — same
- InnoDB default is **REPEATABLE READ**; server option `--transaction-isolation`. Consistent reads "read the snapshot established by the first read". Locking reads use gap / next-key locks to prevent phantoms; at READ COMMITTED "each consistent read ... sets and reads its own fresh snapshot" and "gap locking is disabled, phantom row problems may occur". SERIALIZABLE "implicitly converts all plain SELECT statements to SELECT ... FOR SHARE if autocommit is disabled". — https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html (MySQL 8.4 LTS docs)
- Postgres row-lock modes: `FOR UPDATE`, `FOR NO KEY UPDATE`, `FOR SHARE`, `FOR KEY SHARE`; plain `UPDATE` takes `FOR NO KEY UPDATE` unless it changes a key column; "row-level locks do not affect data querying; they block only writers and lockers". Deadlocks are detected and one transaction aborted. Advisory locks: `pg_advisory_lock` (session), `pg_advisory_xact_lock` (transaction). — https://www.postgresql.org/docs/current/explicit-locking.html
- Postgres `deadlock_timeout` default **1 s**. — https://www.postgresql.org/docs/current/runtime-config-locks.html
- Postgres 18 is the current major (released 2025-09-25, current minor 18.6). Postgres 19 is in beta (beta 4 due 2026-09-24, GA targeted end of October 2026) — do **not** cite 19 features. — https://www.postgresql.org/support/versioning/

**Distributed transactions**

- Postgres `PREPARE TRANSACTION`: "not intended for use in applications ... Its purpose is to allow an external transaction manager". A prepared transaction "continues to hold whatever locks it held". `max_prepared_transactions` default **0** (feature disabled). — https://www.postgresql.org/docs/current/sql-prepare-transaction.html ; https://www.postgresql.org/docs/current/runtime-config-resource.html
- DynamoDB `TransactWriteItems` / `TransactGetItems`: up to **100** actions / 100 distinct items, aggregate ≤ **4 MB**, same account and Region; "DynamoDB performs two underlying reads or writes of every item in the transaction: one to prepare the transaction and one to commit"; `ClientRequestToken` valid **10 minutes**; no cross-Region transactions in global tables. — https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/transaction-apis.html
- Sagas (Garcia-Molina & Salem, SIGMOD 1987): a saga is a sequence of transactions that "can be interleaved with other transactions"; the system guarantees "either all the transactions in a saga are successfully completed or compensating transactions are run"; recovery is **backward** (compensate) or **forward** (save-points, re-run). — https://www.cs.cornell.edu/andru/cs711/2002fa/reading/sagas.pdf

**Consistency models**

- Linearizability: "Every operation appears to take place atomically, in some order, consistent with the real-time ordering"; not totally or sticky available under partition; "a single-object model" — strict serializability for multi-object. Herlihy & Wing 1990. — https://jepsen.io/consistency/models/linearizable
- Sequential consistency: total order "consistent with the order of operations on each individual process"; not available under partition; Lamport 1979. — https://jepsen.io/consistency/models/sequential
- Causal consistency: "sticky available ... clients must stick to the same server"; concurrent ops may be seen in different orders. — https://jepsen.io/consistency/models/causal
- Read-your-writes: sticky available. — https://jepsen.io/consistency/models/read-your-writes
- ZooKeeper guarantees: sequential consistency, atomicity, single system image, reliability, timeliness ("within a certain time bound (on the order of tens of seconds)"); "does not guarantee that at every instance in time, two different clients will have identical views" — call `sync()` first. Session timeout 2–20 ticks. — https://zookeeper.apache.org/doc/current/zookeeperProgrammers.html
- etcd: reads are linearizable by default; "serializable" reads skip consensus and may return stale data; every modification gets a monotonically increasing revision. — https://etcd.io/docs/v3.6/learning/api_guarantees/

**CAP / PACELC**

- Gilbert & Lynch (2012 "Perspectives"): consistency = atomic (one instant between request and response at which the op appears to occur); availability = eventually every request receives a response; consistency is a safety property, availability a liveness property; FLP (1985) shows fault-tolerant agreement is impossible in an asynchronous system. — https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer2.pdf . Original proof: SIGACT News 33(2), 2002, https://dl.acm.org/doi/10.1145/564585.564601
- Brewer 2012: "The 'two of three' formulation was always misleading"; "Because partitions are rare, there is little reason to forfeit C or A when the system is not partitioned"; the choice "can occur many times within the same system at very fine granularity"; CAP C is single-copy consistency, not ACID C. — https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/
- Kleppmann 2015: CAP availability = "every request received by a non-failing node ... must result in a non-error response"; CAP consistency = linearizability; a single-leader replicated DB is neither CP nor AP; CAP ignores latency. — https://martin.kleppmann.com/2015/05/11/please-stop-calling-databases-cp-or-ap.html
- PACELC (Abadi, IEEE Computer, Feb 2012): "Dynamo, Cassandra, and Riak are PA/EL"; "VoltDB/H-Store and Megastore are PC/EC ... BigTable and ... HBase are also PC/EC"; "MongoDB can be classified as a PA/EC system"; "PNUTS is a PC/EL system"; R+W>N "cannot achieve full consistency as defined by Gilbert and Lynch". — https://www.cs.umd.edu/~abadi/papers/abadi-pacelc.pdf

**Consensus**

- Raft paper: election timeout "randomized to be between 150ms and 300ms"; requirement "broadcastTime ≪ electionTimeout ≪ MTBF"; "a leader never overwrites or deletes entries in its log"; a voter "denies its vote if its own log is more up-to-date than that of the candidate"; only current-term entries are committed by counting replicas (Figure 8); "Raft typically uses five servers, which allows the system to tolerate two failures"; RPCs: RequestVote, AppendEntries, InstallSnapshot. — https://raft.github.io/raft.pdf
- etcd defaults: heartbeat **100 ms**, election timeout **1000 ms**; heartbeat "around 0.5–1.5× the round-trip time"; "election timeouts must be at least 10 times the round-trip time"; upper limit **50000 ms**. — https://etcd.io/docs/v3.6/tuning/
- etcd uses Raft; ZooKeeper uses **Zab**; Kubernetes API server persists state in etcd; etcd advertises linearizable reads and dynamic membership. — https://etcd.io/docs/v3.6/learning/why/
- ZooKeeper zxid: 64-bit, "high order 32-bits for the epoch and the low order 32-bits for the counter"; proposals committed "when a quorum of them acknowledge". — https://zookeeper.apache.org/doc/current/zookeeperInternals.html
- Kafka 4.0.0 (2025-03-18) is the "first major release to operate entirely without Apache ZooKeeper", "running in KRaft mode by default". Latest Kafka as of 2026-06-25 is 4.3.1. — https://kafka.apache.org/blog/2025/03/18/apache-kafka-4.0.0-release-announcement/ ; https://kafka.apache.org/blog

**Locks**

- Kleppmann (2016-02-08): efficiency vs correctness locks; fencing token = "a number that increases ... every time a client acquires the lock"; use ZooKeeper "zxid or the znode version number as fencing token"; Redlock "does not have any facility for generating fencing tokens"; "please don't use Redlock ... use a proper consensus system such as ZooKeeper". — https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html
- antirez, "Is Redlock safe?" (Feb 2016): a random token plus check-and-set on the resource is enough; clocks need only "count 5 seconds with a maximum of 10% error"; after acquiring a majority "we check again that we are not out of time"; the post-acquire pause problem applies to every lease-based lock. — http://antirez.com/news/101
- Redis docs, current: single-instance lock `SET resource_name my_random_value NX PX 30000`; release with `DELEX key IFEQ my_random_value` (**Redis 8.4+**) or the compare-and-`DEL` Lua script; master + replica failover is unsafe because "Redis replication is asynchronous"; Redlock N=5, majority = N/2+1, validity = TTL − elapsed − drift; the docs' own disclaimer: "You should implement fencing tokens" and "Redis is not using monotonic clock for TTL expiration mechanism". — https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/

**Clocks**

- Spanner (OSDI 2012): `TT.now()` returns `[earliest, latest]`; ε "typically a sawtooth function of time, varying from about 1 to 7 ms over each poll interval ... therefore 4 ms most of the time"; poll interval 30 s; "applied drift rate is set at 200 microseconds/second"; commit wait: clients cannot see Ti's data "until TT.after(si) is true"; GPS and atomic clocks; "bad CPUs are 6 times more likely than bad clocks". — https://storage.googleapis.com/gweb-research2023-media/pubtools/1974.pdf
- HLC (Kulkarni et al., 2014): l = max physical time seen, c = counter; `l.j := max(l.j+1, l.m+1, pt.j)` on receive (naive form); "HLC fits in to 64 bits NTP timestamp format"; NTP errors "of 100 ms or more" possible; POSIX time can go backwards. — https://cse.buffalo.edu/tech-reports/2014-04.pdf
- CockroachDB: uses HLC; default max offset **500 ms**; a node whose clock is off from half its peers by 80% of max offset "crashes immediately"; default isolation SERIALIZABLE, READ COMMITTED optional; write intents. — https://docs.cockroachlabs.com/docs/stable/architecture/transaction-layer
- Cloudflare, 2017-01-01: Go `time.Now()` went backwards at the leap second, RRDNS computed a negative duration, `rand.Int63n()` "panics if its argument is negative"; fix was to check for negative differences; resolved 06:45 UTC. — https://blog.cloudflare.com/how-and-why-the-leap-second-affected-cloudflare-dns/
- Node.js (docs v26.9.0): `process.hrtime.bigint()` — "not related to wall-clock time and not subject to clock drift, suitable for measuring intervals". — https://nodejs.org/api/process.html

## 5. Could not verify

- **Google leap smear page** (developers.google.com/time/smear) — fetch was cut off by a rate limit. The 24-hour noon-to-noon smear claim is from memory; cite only after fetching.
- **Skeen 1981 (3PC)** — no fetchable primary found this pass; the "3PC assumes bounded delay and fails under partition" claim is standard (also in Gray & Lamport, "Consensus on Transaction Commit", 2004) but not re-read from source today.
- **Lamport, "Paxos Made Simple" (2001)** and **Lamport 1978 "Time, Clocks..."** — not re-fetched; pages 07-10 and 09-05 are textbook-level and should be checked against the PDFs at draft time (lamport.azurewebsites.net hosts both).
- **Berenson et al. 1995, "A Critique of ANSI SQL Isolation Levels"** — the origin of "write skew" and the snapshot-isolation anomaly table; not fetched. Microsoft Research hosts the PDF.
- **Ports & Grittner 2012 SSI paper** — not fetched; the Postgres docs page confirms SSI is the mechanism, which is enough for the page.
- **Herlihy & Wing 1990** and **Terry et al. 1994 (session guarantees)** — cited via Jepsen's pages, not read directly.
- **Chubby paper (Burrows 2006) "sequencer"** — the fencing-token precedent; not fetched this pass.
- **Kafka KRaft internals** (that the metadata quorum is a Raft variant, KIP-500 / KIP-595) — the 4.0 announcement confirms ZooKeeper removal and KRaft default but does not describe the protocol; fetch KIP-595 before writing "Raft" on page 07-13.
- **Node `process.hrtime()` legacy status** — the fetched summary did not confirm a "Legacy" marker; use `process.hrtime.bigint()` / `performance.now()` in samples regardless.
- **NTP typical accuracy numbers** ("milliseconds on a LAN, tens of ms on the internet") — the HLC paper gives only "100 ms or more" for bad cases; no primary for a typical figure. Say "depends on the path" rather than a number.
- **MySQL latest version** — only the 8.4 LTS manual was checked; not verified whether 9.x innovation releases change any isolation behaviour (unlikely, but unchecked).
- **DynamoDB GSIs are eventually consistent** (used on 05-11) — from memory; the transactions page fetched only says stream/GSI propagation is gradual. Check the GSI docs page before drafting.

## 6. Sources

- https://www.postgresql.org/docs/current/transaction-iso.html — PG isolation, SSI, 40001
- https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html — InnoDB RR default, gap locks
- https://www.postgresql.org/docs/current/explicit-locking.html — row locks, advisory, deadlocks
- https://www.postgresql.org/docs/current/runtime-config-locks.html — deadlock_timeout default
- https://www.postgresql.org/docs/current/sql-prepare-transaction.html — 2PC in Postgres
- https://www.postgresql.org/docs/current/runtime-config-resource.html — max_prepared_transactions 0
- https://www.postgresql.org/support/versioning/ — PG 18 current
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/transaction-apis.html — DynamoDB transaction limits
- https://www.cs.cornell.edu/andru/cs711/2002fa/reading/sagas.pdf — sagas paper, recovery
- https://jepsen.io/consistency/models/linearizable — linearizability definition, availability
- https://jepsen.io/consistency/models/sequential — sequential consistency
- https://jepsen.io/consistency/models/causal — causal, sticky available
- https://jepsen.io/consistency/models/read-your-writes — session guarantee
- https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer2.pdf — CAP definitions, safety/liveness
- https://dl.acm.org/doi/10.1145/564585.564601 — CAP proof citation
- https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/ — Brewer 2012
- https://martin.kleppmann.com/2015/05/11/please-stop-calling-databases-cp-or-ap.html — CAP critique
- https://www.cs.umd.edu/~abadi/papers/abadi-pacelc.pdf — PACELC classifications
- https://raft.github.io/raft.pdf — Raft mechanics, timeouts
- https://etcd.io/docs/v3.6/tuning/ — etcd timeout defaults
- https://etcd.io/docs/v3.6/learning/api_guarantees/ — etcd read guarantees
- https://etcd.io/docs/v3.6/learning/why/ — Raft vs Zab, Kubernetes
- https://zookeeper.apache.org/doc/current/zookeeperInternals.html — zxid layout, quorum
- https://zookeeper.apache.org/doc/current/zookeeperProgrammers.html — ZK guarantees, sync()
- https://kafka.apache.org/blog/2025/03/18/apache-kafka-4.0.0-release-announcement/ — ZooKeeper removed
- https://kafka.apache.org/blog — latest Kafka version
- https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html — fencing tokens, Redlock
- http://antirez.com/news/101 — Redlock defence
- https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/ — Redlock, DELEX, disclaimer
- https://storage.googleapis.com/gweb-research2023-media/pubtools/1974.pdf — Spanner TrueTime numbers
- https://research.google/pubs/spanner-googles-globally-distributed-database-2/ — Spanner abstract, PDF link
- https://cse.buffalo.edu/tech-reports/2014-04.pdf — HLC paper
- https://docs.cockroachlabs.com/docs/stable/architecture/transaction-layer — HLC, max offset
- https://blog.cloudflare.com/how-and-why-the-leap-second-affected-cloudflare-dns/ — leap second outage
- https://nodejs.org/api/process.html — monotonic clock API
