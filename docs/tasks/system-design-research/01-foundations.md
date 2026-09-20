# 01 — Foundations — research output

Booklet folder: `01-foundations`. Rough-file sections read: §1, §21–26, §49–51,
§61–62. Researched 2026-09-19/20. All facts below are true on that date unless
the entry says otherwise.

Page grain matched against `books/tech/typescript-to-deployment/06-api-design/pages/01-02-methods.md`
and `02-02-resource-naming.md`: one idea, one table or small code block, one
failure mode, stop.

Scope note (assumption, flagged): DDIA chapter 8 (§21) also covers unreliable
clocks and process pauses. Neither booklet 01 nor 03 lists them in the split.
They are foundations material (nothing in 03 makes sense without them), so
they are here as Module 8, five pages. If the coordinator wants them in 03,
they lift out cleanly.

---

## 1. Modules and pages

**92 pages.** Format: `` `NN-MM-slug` — title — the one idea — the failure mode — diagram ``.

### Module 1 — What a system promises (7)

- `01-01-what-reliable-means` — Reliable means correct, not up — a fault is a component misbehaving; a failure is the system breaking its promise; reliability is tolerating faults so they never become failures — "the server is up" while returning wrong answers is a failure nobody alerts on — svg (fault → tolerated / → failure)
- `01-02-faults-come-in-families` — Hardware, software, human — hardware faults are random and independent; software faults are correlated (same bug on every node at once); human faults are the most common — designing only for independent hardware faults, then losing every replica to one bad deploy — table
- `01-03-a-first-year-of-a-cluster` — Failure is the steady state — Jeff Dean's "typical first year": ~1,000 machine failures, ~20 rack failures, ~8 network maintenances, ~12 router reloads, thousands of disk failures — the design that assumes "the rack won't die this quarter" — table
- `01-04-describe-load-before-you-scale-it` — Load has parameters — requests/s, read/write ratio, data size, fan-out, concurrent connections, regions; scaling means one of these growing — "make it scalable" with no parameter named is not a requirement — table
- `01-05-sli-slo-sla` — Three words, three jobs — SLI is the measurement, SLO is the target for it, SLA is the contract with consequences — an SLA signed with no SLI behind it; nobody can tell if it was met — table
- `01-06-latency-is-a-distribution` — Percentiles, not averages — p50 says what a typical user sees, p99 says what your best customers see (they make the most requests); the mean hides both — "average latency 50 ms" while 5% of requests take 1 s — svg (histogram with p50 / p99 marked)
- `01-07-coordinated-omission` — Your load generator lies during a stall — a closed-loop client waits for the slow response before sending the next request, so the stall is recorded once instead of for every request that should have happened — a benchmark that shows p99 = 1 ms across a 100 s pause — svg (timeline, intended vs actual sends)

### Module 2 — Availability math (7)

- `02-01-the-nines-table` — What a nine buys — 99.9% = 8.76 h/year = 43.2 min/month; 99.99% = 52.6 min/year; 99.999% = 5.26 min/year — promising four nines while the deploy pipeline alone takes 20 minutes of downtime a month — table
- `02-02-time-based-vs-request-based` — Two ways to count — uptime / total time, or successful requests / valid requests; request-based works for partial outages and global services that are never fully "down" — measuring time-based availability on a service that is 30% erroring for an hour and calling it "up" — none
- `02-03-mtbf-and-mttr` — Availability = MTBF / (MTBF + MTTR) — 150 days between failures and 1 hour to recover = 99.97%; MTTR is the lever you control — spending on fewer failures when faster recovery was ten times cheaper — none
- `02-04-hard-dependencies-multiply` — Series availability is a product — 99.99% × 99.99% × 99.99% = 99.97%; every hard dependency subtracts; a soft dependency (degrade, not fail) does not — a "four nines" service with six four-nines hard dependencies is a three-nines service — svg (chain of boxes with the product)
- `02-05-redundancy-adds-nines` — Parallel availability: 1 − Π(1 − A) — two independent 99.9% components = 99.9999%; the shortcut: nines add — the word *independent*; two replicas behind the same control plane, same deploy, same DNS are not independent — svg (two parallel boxes)
- `02-06-correlated-failure-in-practice` — The dependency graph is the availability — AWS us-east-1, 19–20 Oct 2025: a race in DynamoDB's DNS automation emptied the regional endpoint record; EC2 launches, NLB health checks, Lambda, STS all fell behind it for up to 14 hours — nobody had drawn the graph, so nobody knew DNS for one service was a hard dependency of everything — svg (dependency graph)
- `02-07-the-cost-of-a-nine` — Each nine costs more than the last — each nine is an order of magnitude closer to 100%; higher targets narrow the set of usable dependencies, force automation of every recovery, and slow releases; "a user on a 99% reliable smartphone cannot tell the difference between 99.99% and 99.999%"  — buying a nine the customer cannot observe — none

### Module 3 — Scaling dimensions (8)

- `03-01-vertical-scaling` — Buy a bigger box — no code change, no distributed-systems problems; ceiling is real (AWS `u7in-32tb.224xlarge`: 896 vCPU, 32,768 GiB, as of 2026-09) and so is the blast radius — the single box that is also the single point of failure — none
- `03-02-horizontal-scaling` — Add boxes behind a balancer — capacity grows with N, failures of one node are survivable; the new question is where the state lives — scaling out the web tier and discovering the database is still one box — svg (LB → N nodes → one DB)
- `03-03-stateless-vs-stateful` — A stateless process can be replaced without anyone noticing — session, cache, upload progress live in a backing store, not process memory; twelve-factor: sticky sessions "should never be used or relied upon" — hidden state: an in-process rate limiter, a local file upload, an in-memory cache that only one replica has — table
- `03-04-why-state-is-the-hard-part` — Compute scales for free; state does not — N copies of stateless code are trivially consistent; N copies of data need replication (agree on values) or partitioning (split values), and both cost consistency — the bridge to booklet 02 — svg (compute fan-out vs data split)
- `03-05-amdahl-and-coordination` — The serial fraction caps speedup — Amdahl 1967: speedup ≤ 1 / (s + (1 − s)/N); coordination (locks, consensus, cross-node chatter) is serial work; past a point, adding nodes adds latency — the cluster that got slower at 12 nodes than at 8 — svg (speedup curve flattening)
- `03-06-littles-law` — Concurrency = throughput × latency — L = λW (Little 1961): 1,000 req/s at 50 ms means 50 requests in flight; that is the pool size, thread count, connection count you need — latency doubles under load, in-flight doubles, the pool fills, everything queues — none
- `03-07-utilization-and-queues` — Wait time explodes near full — for a single queue, waiting time ~ 1 / (1 − ρ); at 90% utilization queueing is 10× the service time, at 99% it is 100× — capacity planned for the average, not the peak, and "we still had 10% headroom" — svg (hockey-stick curve)
- `03-08-scale-up-or-out` — The decision table — up when state is one box and you are under the ceiling; out when the load parameter is requests and the tier is stateless; both when it is data — scaling out a tier whose bottleneck was a lock, not CPU — table

### Module 4 — Latency numbers every engineer should know (9)

- `04-01-the-original-table-and-what-moved` — Jeff Dean, 2010 — L1 0.5 ns, memory 100 ns, datacenter RTT 500 µs, disk seek 10 ms, CA→NL→CA 150 ms; what moved since: SSDs (not on the 2010 list), 100 Gbps NICs, cloud regions; what did not: memory latency and the speed of light — quoting a 2010 disk number for a 2026 NVMe design — table
- `04-02-cpu-and-memory` — Nanoseconds — L1 ~1 ns, main memory ~100 ns per dependent load (flat since ~2000), sequential memory 20 GiB/s single-thread, non-crypto hash of 64 B 10 ns, crypto hash 100 ns, syscall ~300 ns, context switch ~10 µs — the "in-memory" service that is memory-latency bound because every lookup is a pointer chase — table
- `04-03-ssd-and-disk` — Microseconds to milliseconds — SSD random 8 KiB read ~100 µs, sequential write without fsync ~2 µs, with fsync ~300 µs, HDD seek ~10 ms — fsync is the number that decides durability; measuring writes without it and shipping a database that loses commits — table
- `04-04-the-datacenter-network` — Same zone is faster than disk — same-zone RTT ~100–250 µs, ~10 GiB/s inside a VPC, ~3 GiB/s outside; AWS AZs are "within 100 km" of each other; a proxy hop ~50 µs; a Redis/MySQL query ~500 µs — a network read is cheaper than a local disk read and people still cache to disk first — table
- `04-05-the-planet` — The speed of light in fiber is ~200,000 km/s — NY–London 5,585 km = 28 ms one way, 56 ms RTT before any switch; measured cloud pairs: EU-West↔NA-East ~80 ms, NA-West↔Singapore ~180 ms; last mile fiber 10–20 ms, cable 15–40 ms, DSL 30–65 ms — a "global" design with one region and a 200 ms floor for half the users — table
- `04-06-the-cost-of-a-hop` — Every hop is a floor — blob GET ~80 ms, PUT ~200 ms, LIST ~100 ms; twenty sequential 500 µs calls is 10 ms; the same twenty in parallel is 500 µs plus the slowest — sequential awaits in a request handler — svg (serial vs parallel timeline)
- `04-07-fan-out-multiplies-the-tail` — 1% slow × 100 servers = 63% slow — P(any slow) = 1 − 0.99^100; even 1-in-10,000 across 2,000 servers hits almost 1 in 5 requests — a per-server p99 that is fine and a user-facing p50 that is not — svg (fan-out with one red leaf)
- `04-08-hedged-and-tied-requests` — Send a second copy after the p95 — Google benchmark, 1,000 keys over 100 servers: hedge after 10 ms cut p99.9 from 1,800 ms to 74 ms with 2% extra requests; tied requests cancel the loser — hedging a non-idempotent call — svg (two timelines, cancel arrow)
- `04-09-serialization-and-compression` — Bytes cost CPU — fast binary serde ~1 GiB/s, JSON-class ~100 MiB/s, compression ~500 MiB/s at 2–4× for text — a 10 MB JSON response costs ~100 ms of CPU before it touches the network — table

### Module 5 — Back-of-the-envelope estimation (7)

- `05-01-the-method` — Assumption, arithmetic, sanity check — write the inputs you assumed, do the multiplication in powers of ten, compare the answer to something known — precision theatre: "12,731 QPS" from inputs you guessed — none
- `05-02-powers-of-two-and-sizes` — 2^10 ≈ 10^3 — KiB/MiB/GiB/TiB; int 4–8 B, UUID 16 B, timestamp 8 B, ASCII char 1 B, UTF-8 up to 4 B, a tweet-sized row ~1 KB, a thumbnail ~10–100 KB — forgetting the index roughly doubles the row — table
- `05-03-time-constants` — 86,400 s/day, call it 10^5 — 1 M/day ≈ 12/s; 100 M DAU × 10 requests ≈ 10^9/day ≈ 12 k/s average; peak is 2–3× average — designing for the average and meeting the peak on launch day — table
- `05-04-qps-storage-bandwidth` — The three quantities — QPS from users × actions; storage from writes × size × retention; bandwidth from QPS × payload; each has its own bottleneck — computing QPS and forgetting that the 5-year retention is 180 TB — table
- `05-05-worked-example-thirty-thumbnails` — Serial vs parallel, Dean's example — 30 seeks × 10 ms + 30 × 256 KB / 30 MB/s = 560 ms serial; 10 ms + 256 KB / 30 MB/s ≈ 18 ms parallel ("really more like 30–60 ms" with variance) — the arithmetic said 18 ms; the tail said 60 — svg (serial vs parallel bars)
- `05-06-worked-example-storage` — Writes × size × years — 500 M events/day × 1 KB = 500 GB/day ≈ 180 TB/year before replication and indexes; ×3 replicas, ×~2 for indexes — sizing one disk when the answer needed a partitioning scheme — none
- `05-07-the-cost-envelope` — Rough cloud prices — CPU ~$15/month, memory ~$2/GB/month, blob ~$0.02/GB/month, inter-zone ~$0.01/GB, internet egress ~$0.1/GB, logs ~$0.5/GB — the design whose egress bill is larger than its compute bill — table

### Module 6 — The request lifecycle, end to end (9)

- `06-01-the-map` — Where the milliseconds go — client → DNS → TCP → TLS → load balancer → app → connection pool → database → back; each layer has a latency floor and a timeout knob — the engineer who thinks a request is `await fetch()` — svg (the full path, annotated with typical times)
- `06-02-dns` — A record with a TTL — resolvers cache for the TTL; failover by changing a record takes at least one TTL; the 2025 us-east-1 outage was an empty DNS record — a 300 s TTL on the record you plan to flip in an emergency — svg (resolver chain)
- `06-03-the-tcp-handshake` — One round trip before the first byte — SYN, SYN-ACK, ACK; on Linux the kernel retries a SYN 6 times by default, ~127 s, before `connect` fails — no connect timeout means a two-minute hang per dead host — svg (three arrows)
- `06-04-the-tls-handshake` — One more round trip — TLS 1.3 is 1-RTT; resumption allows 0-RTT early data, which can be replayed, so 0-RTT data must be idempotent — sending a POST as 0-RTT — svg (1-RTT vs 0-RTT)
- `06-05-http-versions-and-head-of-line-blocking` — One connection, many requests — HTTP/1.1 serialises requests on a connection; HTTP/2 multiplexes but one lost TCP packet stalls every stream; HTTP/3 over QUIC recovers per stream and sets up in 1 RTT — six-connection-per-host limits and waterfalls on HTTP/1.1 — svg (streams over one connection)
- `06-06-keep-alive-and-the-idle-race` — Reuse the connection, agree on the idle timeout — Node's `http.globalAgent` keeps sockets alive since v19; a Node 24 server closes idle sockets after 5 s; a load balancer in front typically holds them ~60 s; the LB reuses a socket the server just closed → sporadic 502s — server idle timeout shorter than the balancer's (Node main raises the default to 65 s to close this trap; unreleased as of 2026-09) — svg (timeline of the race)
- `06-07-the-balancer-hop` — The LB is a client too — it has its own connect/idle/response timeouts and health checks; a health check is a different code path from a request, so "healthy" does not mean "serving" — health check on `/ping` passes while `/orders` is stuck (→ gray failure) — none (booklet 05 owns the LB deep dive)
- `06-08-the-database-connection` — Pools multiply — each app process holds a pool; 50 pods × 20 connections = 1,000 against Postgres's default `max_connections` of 100; size by Little's law — the autoscaler adding pods until the database refuses connections — svg (pods × pool → one DB)
- `06-09-where-timeouts-live` — One knob per layer — connect, TLS, headers, body, idle, statement, and the total; if you set only one, the others default to "forever" or to a value you did not choose — a 2 s request timeout on top of a 10 s connect timeout — table (layer × knob × default)

### Module 7 — The unreliable network (9)

- `07-01-not-a-function-call` — A → network → queue → network → B — every arrow can fail, delay, duplicate or reorder; the caller sees only silence — writing an RPC as if it were a local call with an exception — svg (the five arrows)
- `07-02-what-the-network-does-to-a-message` — Lose, delay, reorder, duplicate, partition — each one separately, and any combination — handling "lost" and forgetting "delivered late, after you retried" — table
- `07-03-how-often-it-happens` — Measured, not imagined — a datacenter study: 5.2 device failures and 40.8 link failures per day, median 59,000 packets lost per failure; top-of-rack failures caused 40 partitions in two years at Google and 70% of one Microsoft study's downtime — "our network is reliable" — table
- `07-04-partitions-in-production` — Real incidents — Twilio 2013: a Redis primary partitioned from its replicas, 1.1% of customers overbilled for ~40 minutes; GitHub 2012: split brain, private repos shown to the wrong users; AWS EBS 2011: 12+ hours — treating partitions as a whiteboard concern — none
- `07-05-partial-and-one-way-partitions` — Some nodes can see some nodes — 29% of studied partition failures needed only a partial partition; 2% a simplex (one-way) one; a node that can send heartbeats but not receive requests is "healthy" — failure detection that assumes symmetry — svg (three nodes, one broken edge)
- `07-06-what-partitions-do-to-real-systems` — 136 failures, 25 systems — 80% catastrophic, 27% data loss, 90% silent, 21% left permanent damage after the partition healed, 88% reproducible by isolating a single node — assuming replication masks the failure of one rack — table
- `07-07-gray-failure` — The failure detector disagrees with the user — differential observability: the heartbeat module is fine, the request module is stuck; the switch drops 1% of packets, neighbours see nothing, a high-fan-out app sees everything — restarting a node the monitor thinks is healthy, again and again — svg (observer vs app quadrant)
- `07-08-fail-stop-vs-byzantine` — Which faults you promise to survive — fail-stop: a node is correct or silent; Byzantine: a node may lie; tolerating f liars needs 3f + 1 nodes and is not used inside a trust boundary — reasoning about consensus with a model you never named — table
- `07-09-two-generals` — No protocol guarantees agreement over a lossy link — the last message can always be lost, so "exactly once" cannot be built from the network alone; at-least-once plus idempotency is what exists — a queue that promises exactly-once delivery (→ booklet 04 for what that really scopes) — svg (messengers between two camps)

### Module 8 — Clocks and pauses (5) — assumed in scope, see note at top

- `08-01-two-clocks` — Time-of-day vs monotonic — `Date.now()` can jump backwards after an NTP step; `performance.now()` / `process.hrtime.bigint()` only move forward — measuring a timeout with the wall clock across a clock step — code
- `08-02-ntp-drift-and-leap-seconds` — Clocks are estimates — quartz drifts, NTP slews or steps, a leap second is a 61-second minute unless smeared over 24 hours (Google Public NTP) — mixing smeared and unsmeared time sources in one fleet — none
- `08-03-timestamps-cannot-order-events` — Skew beats causality — two nodes with 10 ms skew can timestamp a later write earlier; last-write-wins then discards the newer value silently (→ booklet 03 for logical clocks) — "we order by created_at" — svg (two timelines, crossed order)
- `08-04-process-pauses` — Your code can stop for seconds — stop-the-world GC, VM steal, swap, a laptop lid; a paused leader wakes up believing it still holds the lease (→ fencing tokens, booklet 03) — a lock with a 10 s lease and a 12 s GC pause — svg (lease timeline with a pause)
- `08-05-time-in-typescript` — Rules for code — durations from monotonic, display from wall, ordering from a sequence the store assigns; TS snippet — `setTimeout` is a lower bound, not a deadline — code

### Module 9 — Timeouts (8)

- `09-01-a-timeout-is-not-a-failure` — Five things it can mean — never received; received and failed; processed, reply lost; processed slowly; still in progress — retrying a timeout as if the work did not happen — svg (five branches)
- `09-02-the-default-is-forever` — No timeout is a timeout of infinity — gRPC sets none; Node's `server.timeout` is 0; an established TCP connection retransmits for 13–30 minutes before the kernel gives up — the thread pool that fills with calls to a dead host — table
- `09-03-connect-read-and-total` — Three different knobs — connect (reach the host), read/headers/body (progress between bytes), total (deadline for the whole call); Node `fetch` (undici) defaults: connect 10 s, headers 300 s, body 300 s — a "5 s timeout" that only covered connect — table
- `09-04-choosing-the-value` — From the callee's distribution — start from the callee's p99.9 plus a margin, not from a round number; too short retries work that would have succeeded, too long ties up concurrency (Little) — a 30 s timeout on a call whose p99.9 is 80 ms — none
- `09-05-deadlines-and-propagation` — Pass the remaining time down — a deadline is absolute; each hop deducts elapsed time and forwards the rest; gRPC returns `DEADLINE_EXCEEDED` — the child that keeps working after the parent gave up and returned an error — svg (deadline shrinking across three hops)
- `09-06-abortsignal-in-typescript` — `AbortSignal.timeout(ms)` and `AbortSignal.any` — the signal cancels the fetch; the work the callee already started is not cancelled unless the callee honours the signal too — a timeout that returns an error to the user while the payment goes through — code
- `09-07-timeouts-in-a-node-server` — The server has knobs too — `headersTimeout` 60 s (408 and close), `requestTimeout` 300 s, `keepAliveTimeout` 5 s (Node 24; 65 s on main), `server.timeout` 0 — slowloris through the header timeout you turned off — table
- `09-08-idle-connections-and-half-open-sockets` — Silence is not a signal — TCP keepalive on Linux starts after 2 hours idle by default; a peer that vanished leaves a half-open socket that looks connected — the pooled connection that has been dead for an hour — none

### Module 10 — Retries, backoff, jitter (9)

- `10-01-what-to-retry` — Transient, throttled, or your fault — timeouts, 5xx, connection reset: retry soon; 429/throttling: retry later; 4xx validation/auth: never — retrying a 400 three times — table (AWS SDK classification)
- `10-02-retries-are-selfish` — Every retry is load someone else pays for — a retry helps this call by adding work to a struggling dependency; three layers each retrying 3× is 27× load at the bottom; retry at one layer only — every layer "being resilient" — svg (layers × multiplication)
- `10-03-retry-storms` — Recovery is when it hurts — a dependency comes back to N× its normal load because every client retries at once; it falls over again — the outage that lasts hours because clients keep it down — svg (load over time with the second spike)
- `10-04-exponential-backoff` — sleep = min(cap, base × 2^attempt) — AWS SDKs (2026 behaviour): base 50 ms for transient, 1,000 ms for throttling, cap 20 s — uncapped backoff that sleeps 17 minutes — code
- `10-05-jitter` — Randomise the sleep — full jitter: `random(0, min(cap, base × 2^attempt))`; with 100 contending clients it cut total calls by more than half vs plain backoff; equal and decorrelated variants exist, full is the default answer — synchronised clients all retry at t = 1 s, 2 s, 4 s — svg (retry timing with and without jitter)
- `10-06-retry-budgets` — Cap retries as a share of traffic — Google: retry only while retries are under 10% of requests, max 3 attempts; AWS SDK: token bucket of 500, a transient retry costs 14, a throttling retry 5; gRPC: `maxTokens` / `tokenRatio` — unbounded retries during an outage that turn 100% failure into 300% load — table
- `10-07-server-directed-retries` — Let the server say when — `Retry-After` on 429 and 503 (RFC 9110); the SDK clamps a server hint between the computed backoff and backoff + 5 s — ignoring the header and retrying into a rate limit — none
- `10-08-a-retry-loop-in-typescript` — The whole thing in 20 lines — attempts, classification, full jitter, cap, deadline via `AbortSignal`, budget — the loop that retries after the deadline has already passed — code
- `10-09-jitter-everything` — Not just retries — cron jobs, cache TTL expiry, health checks, token refresh, reconnects: anything periodic across many clients synchronises — 10,000 cache keys expiring in the same second — none

### Module 11 — Idempotency (7)

- `11-01-the-duplicate-payment` — The canonical failure — POST /payment, reply lost, client retries, customer charged twice — the fix is not "don't retry" — svg (request, lost reply, retry)
- `11-02-idempotent-means-same-effect` — RFC 9110's definition — the effect of N identical requests equals the effect of one; GET, HEAD, PUT, DELETE are idempotent, POST is not; a client "MAY automatically repeat" an idempotent request — an idempotent method whose handler increments a counter — table
- `11-03-naturally-idempotent-operations` — Set, not increment — `balance = 90` is idempotent, `balance -= 10` is not; PUT the full state; upsert on a natural key; make deletes tolerate "already gone" — the PATCH that adds to an array — code
- `11-04-idempotency-keys` — Client-generated, server-remembered — a UUID per logical operation, sent on every retry; the server stores the first response (status and body, even a 500 — Stripe) and replays it; keys expire (Stripe: 24 h); same key with a different payload → 422; still in flight → 409 (IETF draft) — generating the key server-side — svg (check store → execute → store)
- `11-05-the-concurrent-duplicate` — Two retries arrive together — both find no record, both execute; the fix is an atomic reserve (unique constraint on the key, in the same transaction as the work) — check-then-act across two statements — code
- `11-06-when-there-is-no-key` — Reconcile instead — after a timeout, read the resource's state before acting; AWS EC2 `ClientToken` returns the same instance, even the terminated one, for the token's lifetime — blindly retrying a non-idempotent call because "it usually works" — none
- `11-07-idempotency-key-in-typescript` — The race handled — insert the key first, catch the unique violation, return the stored response — the naive version from most tutorials (find-then-create) — code

### Module 12 — The five questions and the trade-off map (7)

- `12-01-the-five-questions` — Ask them of every design — where is the state, who owns it, what if a node dies, what if a message is duplicated, what if communication fails — a design review that never asked the fourth — table
- `12-02-where-is-the-state` — Memory, cache, database, queue, log — each has a durability and a consistency price; the answer decides what a crash loses — state in process memory on a "stateless" service — svg (five stores on a durability axis)
- `12-03-who-owns-the-state` — One writer per fact — shared ownership means two services disagreeing forever; the owner exposes an API, others cache (→ booklet 05 for boundaries) — two services writing the same table — svg (owner + readers)
- `12-04-what-if-a-node-dies` — Retry, replica, failover, replay — pick per component and say what is lost; the answer is the reliability model — "we have replicas" with no failover procedure — table
- `12-05-what-if-a-message-is-duplicated` — Because it will be — at-least-once is the only deliverable guarantee; idempotency or dedup by message id at every consumer — dedup with a TTL shorter than the retry window — none
- `12-06-what-if-communication-fails` — Timeout, retry, fallback, queue, compensate — the decision tree: timed out → idempotent? → retry with budget → still failing → degrade or queue → already partially done → compensate (→ booklet 04 for sagas) — a fallback that hides an outage for a week — svg (§51 decision tree)
- `12-07-every-mechanism-buys-and-costs` — The trade-off table — replication buys availability, costs lag; partitioning buys write scale, costs routing; async buys decoupling, costs eventual consistency; retries buy resilience, cost duplicates; caching buys latency, costs staleness — "we'll add a cache" with no invalidation plan — table (§61, with §62's data / compute / communication → failure → trade-offs as the closing svg)

---

## 2. What the rough file missed

- **SLI / SLO / SLA and error budgets.** The rough file gives the nines table and nothing about how a target is set, measured or spent. Every "how would you know it works" follow-up in an interview is this. https://sre.google/sre-book/service-level-objectives/
- **Percentiles and tail latency.** The word "p99" does not appear. The Tail at Scale fan-out math (1% × 100 = 63%) and hedged requests are asked directly. https://www.barroso.org/publications/TheTailAtScale.pdf
- **Availability arithmetic for dependencies and redundancy.** The rough file lists the nines but not that hard dependencies multiply (3 × 99.99% = 99.97%) or that redundancy adds nines only when components are independent. https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html
- **Latency numbers.** Entirely absent. Verified 2026 figures from napkin-math (measured March 2026) plus Dean's 2010 originals for the history. https://github.com/sirupsen/napkin-math
- **Back-of-the-envelope estimation.** Absent (the rough file mentions "scale estimation" as an interview step, §52, with no method). Dean's own worked example. https://static.googleusercontent.com/media/research.google.com/en//people/jeff/Stanford-DL-Nov-2010.pdf
- **The request lifecycle.** DNS, TCP, TLS, HTTP versions, keep-alive, pools: absent. RFC 9114 §1 for HOL blocking; RFC 9001 §1 for QUIC 1-RTT/0-RTT. https://www.rfc-editor.org/rfc/rfc9114.html
- **Little's law and utilization.** No way to size a pool or explain why a system falls over at 85% CPU. https://pubsonline.informs.org/doi/10.1287/opre.9.3.383
- **Stateless vs stateful as a design property.** The rough file says "horizontal scaling → how do we distribute state?" and stops. https://12factor.net/processes
- **Partial and one-way partitions, gray failure.** The rough file's network list (§26) is seven nouns. The OSDI'18 study (136 failures; 29% partial partitions; 88% by isolating one node) and the gray-failure model are what make "partial failure" concrete. https://www.usenix.org/system/files/osdi18-alquraan.pdf and https://www.microsoft.com/en-us/research/wp-content/uploads/2017/06/paper-1.pdf
- **How often the network fails, with numbers.** Bailis and Kingsbury's incident catalogue. https://aphyr.com/posts/288-the-network-is-reliable
- **Deadlines and deadline propagation.** The rough file has "timeout" only as a client-side wait. https://grpc.io/docs/guides/deadlines/
- **Connect vs read vs total timeouts, and the defaults.** Node/undici defaults (connect 10 s, headers/body 300 s), Linux TCP defaults (SYN 127 s, established 13–30 min). https://man7.org/linux/man-pages/man7/tcp.7.html
- **Retry budgets and retry classification.** "Bounded retries" in the rough file; the actual mechanisms (10% ratio, token bucket, transient vs throttling) are missing. https://sre.google/sre-book/handling-overload/ and https://docs.aws.amazon.com/sdkref/latest/guide/feature-retry-behavior.html
- **Which jitter, and why.** The rough file says "random jitter". Brooker's comparison (full vs equal vs decorrelated) is the source everyone cites. https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/
- **The concurrent-duplicate race in idempotency keys.** The rough file's flow (check store → execute → store) is exactly the buggy version. https://docs.stripe.com/api/idempotent_requests and https://www.ietf.org/archive/id/draft-ietf-httpapi-idempotency-key-header-07.txt
- **Clocks and process pauses.** DDIA chapter 8's second half is absent from the rough file entirely. Node docs for monotonic time; V8 blog for stop-the-world GC. https://v8.dev/blog/trash-talk
- **Coordinated omission.** Every latency benchmark in an interview answer is wrong without it. https://github.com/HdrHistogram/HdrHistogram (README, `recordValueWithExpectedInterval`)
- **Fault models (fail-stop vs Byzantine).** Needed before booklet 03 says "Raft tolerates f of 2f+1". Lamport, Shostak, Pease 1982, https://dl.acm.org/doi/10.1145/357172.357176
- **A real correlated-failure case.** AWS us-east-1, October 2025. https://aws.amazon.com/message/101925/

## 3. What the rough file has that should be cut or moved

- **§1 interview mental-model diagram** — keep the idea, not the diagram; it lists replication / partitioning / consensus, which are booklets 02–03. Foundations closes with the §62 map instead.
- **§1 "vertical scaling: 8 CPU → 32 CPU"** — the example is a decade stale; replaced with the current ceiling (u7in-32tb).
- **§23 idempotency flow diagram** — wrong as drawn (check-then-execute-then-store has the race). Redrawn on `11-05`.
- **§25 "1s, 2s, 4s, 8s"** — implies uncapped doubling from 1 s. Real SDK bases are 50 ms–1 s with a 20 s cap; page `10-04` uses the real numbers.
- **§50 CAP / consistency ladder** — belongs in booklet 03. Not in this booklet.
- **§51 failure mental map** — kept, as `12-06`. It is the one rough-file diagram that survives as is.
- **§52 interview format (requirements → estimation → API → ...)** — belongs in booklet 06 (the method chapter). Only the estimation step is taught here.
- **§61 cheat sheet** — kept as the closing table (`12-07`), with the rows that belong to later booklets kept as one-line forward references, not explained here.
- **§62 curriculum list (Modules 1–10)** — meta; not book content. LLD (Module 10) is out of the series per the plan.
- **Idempotent consumers / dedup by message id** — mentioned on `12-05` in one line; the mechanism belongs in booklet 04 (delivery semantics, outbox).
- **Circuit breakers, bulkheads, load shedding** — the rough file does not have them; they are the natural next page after retry storms, but they are booklet 05. `10-03` ends with a forward reference.
- **Belongs elsewhere, found while researching:** exactly-once scope (04), fencing tokens and leases (03), logical clocks (03), health checks and LB algorithms (05), rate limiting (05).

## 4. Facts to get right

Each: claim — source — version/date it is true for.

**Availability**
- 99.9% = 8.76 h/yr, 43.2 min/month, 10.1 min/week, 1.44 min/day. 99.99% = 52.6 min/yr, 4.32 min/month. 99.999% = 5.26 min/yr, 25.9 s/month. 99.95% = 4.38 h/yr. 99% = 3.65 days/yr. — https://sre.google/sre-book/availability-table/ — SRE book, 2016, arithmetic does not age.
- Time-based: availability = available-for-use time / total time. Request-based: successful responses / valid requests, typically per 1- or 5-minute window. AWS advises against excluding scheduled maintenance. — https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html — fetched 2026-09-19.
- Hard dependencies multiply: 99.99% × 99.99% × 99.99% = 99.97%. Redundant independent components: 100% − Π(1 − A); two 99.9% components = 99.9999%; "sum the nines" shortcut. — same AWS page.
- MTBF/(MTBF + MTTR): 150 days and 1 hour → 99.97%. — same AWS page.
- AWS application-category examples: 99% batch; 99.9% internal tools; 99.95% online commerce; 99.99% video delivery; 99.999% ATM/telecoms. — same AWS page.
- SLI / SLO / SLA definitions, verbatim; "keep a safety margin"; "don't overachieve"; error budget = "a rate at which the SLOs can be missed". — https://sre.google/sre-book/service-level-objectives/
- Example in the SRE book: typical request 50 ms, 5% of requests 20× slower. — same.
- "each additional nine corresponds to an order of magnitude improvement toward 100% availability"; "a user on a 99% reliable smartphone cannot tell the difference between 99.99% and 99.999% service reliability"; error budget = the gap between the SLO and 100%, "how much 'unreliability' is remaining for the quarter". Note: the "order of magnitude" is about *distance to 100%*, not a 10× cost claim; do not write "each nine costs 10×". — https://sre.google/sre-book/embracing-risk/
- DynamoDB SLA: 99.999% monthly uptime for global tables, 99.99% otherwise. — https://aws.amazon.com/dynamodb/sla/ — "Last updated May 14, 2025".
- S3 SLA: service credits start below 99.9% for S3 Standard (10% credit), below 99.0% (25%), below 95.0% (100%); the SLA is a credit schedule, not a guarantee. — https://aws.amazon.com/s3/sla/ — last updated 2023-11-28.
- AWS us-east-1 event: started 11:48 PM PDT 19 Oct 2025, ended 2:20 PM PDT 20 Oct 2025; root cause a race between two DNS Enactors producing an empty DynamoDB regional endpoint record; DynamoDB impact to 2:40 AM, EC2 launches to 1:50 PM, NLB health-check flapping 5:30 AM–2:09 PM; Lambda, ECS/EKS, Redshift, Connect, STS affected downstream. — https://aws.amazon.com/message/101925/

**Scaling**
- Largest EC2 instance: `u7in-32tb.224xlarge`, 896 vCPU, 32,768 GiB, Sapphire Rapids. — https://docs.aws.amazon.com/ec2/latest/instancetypes/mo.html — fetched 2026-09-19.
- "Twelve-factor processes are stateless and share-nothing"; "Sticky sessions are a violation of twelve-factor and should never be used or relied upon"; session state → Memcached/Redis. — https://12factor.net/processes
- Little's law L = λW. — Little, Operations Research 9(3), 1961, https://pubsonline.informs.org/doi/10.1287/opre.9.3.383
- Amdahl's law. — Amdahl, AFIPS 1967, https://dl.acm.org/doi/10.1145/1465482.1465560 (citation only; see §5).

**Latency numbers**
- Dean 2010 table: L1 0.5 ns; branch mispredict 5 ns; L2 7 ns; mutex 25 ns; main memory 100 ns; compress 1 KB 3,000 ns; send 2 KB over 1 Gbps 20,000 ns; read 1 MB from memory 250,000 ns; datacenter RTT 500,000 ns; disk seek 10,000,000 ns; read 1 MB from disk 20,000,000 ns; CA→Netherlands→CA 150,000,000 ns. **No SSD line in the original.** — https://static.googleusercontent.com/media/research.google.com/en//people/jeff/Stanford-DL-Nov-2010.pdf — Nov 2010.
- Dean's worked example: 30 seeks × 10 ms + 30 × 256 KB / 30 MB/s = 560 ms serial; parallel 10 ms + 256 KB / 30 MB/s = 18 ms, "really more like 30–60 ms". — same.
- Dean's "typical first year for a new cluster": ~1 network rewiring, ~20 rack failures (40–80 machines, 1–6 h), ~5 racks go wonky (50% packet loss), ~8 network maintenances, ~12 router reloads, ~3 router failures, ~dozens of 30 s DNS blips, ~1,000 machine failures, ~thousands of disk failures. — same.
- Colin Scott's interactive table models: memory 100 ns flat after 2000; SSD random read 16 µs flat after 2014; DC RTT 500 µs constant; WAN CA–NL 150 ms constant; NIC bandwidth doubling every 2 years. — https://github.com/colin-scott/interactive_latencies — model, not measurement.
- napkin-math measured table (GCP `c4-standard-48-lssd`, **updated 2026-03-08**): sequential memory 20 GiB/s single thread; random memory 64 B 20 ns; non-crypto hash 64 B 10 ns; crypto hash 100 ns; syscall 300 ns; context switch 10 µs; SSD seq read 8 KiB 1 µs (8 GiB/s); SSD seq write no-fsync 2 µs; SSD seq write with fsync 300 µs (30 MiB/s); SSD random read 8 KiB 100 µs; TCP echo 32 KiB 50 µs; proxy hop 50 µs; same-zone 10 GiB/s in VPC, 3 GiB/s outside; same-region RTT 250 µs; MySQL/Memcached/Redis query 500 µs; HDD read 10 ms; blob GET 80 ms, PUT 200 ms, LIST 100 ms; regions: NA Central↔East 25 ms, NA East↔West 60 ms, EU West↔NA East 80 ms, NA West↔Singapore 180 ms, EU West↔Singapore 160 ms; fast serde 1 GiB/s, slow serde 100 MiB/s; compression 500 MiB/s, decompression 1 GiB/s; ratios HTML 2–3×, text 2–4×. — https://github.com/sirupsen/napkin-math
- **Discrepancy to state on the page:** "main memory reference" is 100 ns in Dean/Scott (one dependent load) and 20 ns in napkin-math (random 64 B R/W, measured with overlapping loads). Both are right for what they measure. Teach ~100 ns for a pointer chase.
- napkin-math costs (2026-03): CPU $15/month, GPU $5,000/month, memory $2/GB/month, blob $0.02/GB/month, zonal SSD $0.2/GB/month, inter-zone $0.01/GB, inter-region $0.02/GB, internet egress $0.1/GB, CDN egress $0.05/GB, logs $0.5/GB, metrics $20 per 1,000, blob writes $5 per million, reads $0.4 per million. — same.
- Speed of light: vacuum 299,792,458 m/s; fiber ~200,000,000 m/s (index ~1.5). NY–SF 4,148 km: 21 ms fiber, 42 ms RTT. NY–London 5,585 km: 28 ms, 56 ms RTT. NY–Sydney 15,993 km: 80 ms, 160 ms RTT. Last mile: fiber 10–20 ms, cable 15–40 ms, DSL 30–65 ms (FCC). — https://hpbn.co/primer-on-latency-and-bandwidth/ — Grigorik, HPBN (book text, freely published).
- AWS AZs "physically separated by a meaningful distance, many kilometers, from any other AZ, although all are within 100 km (60 miles) of each other"; 124 AZs in 39 Regions. — https://aws.amazon.com/about-aws/global-infrastructure/regions_az/ — fetched 2026-09-19. The page does **not** give an inter-AZ latency figure (see §5).
- Tail at Scale: one server with 1-in-100 chance of >1 s, request touching 100 servers → 63% of requests >1 s; 1-in-10,000 with 2,000 servers → "almost one in five". Hedged request after the 95th percentile adds ~5% load. Benchmark: 1,000 keys in BigTable across 100 servers, hedge after 10 ms: p99.9 1,800 ms → 74 ms, 2% more requests. Tied requests after 1 ms: median −16%, p99.9 nearly −40%, disk overhead <1%. — Dean & Barroso, CACM 56(2), 2013, https://www.barroso.org/publications/TheTailAtScale.pdf

**Request lifecycle**
- TLS 1.3: 0-RTT data "does not depend on the ServerHello and therefore has weaker guarantees"; no non-replay guarantee between connections. — https://www.rfc-editor.org/rfc/rfc8446.html — RFC 8446, 2018.
- QUIC: "most new connections can be established and secured within a single round trip; on subsequent connections ... zero round-trip setup". — https://www.rfc-editor.org/rfc/rfc9001.html §1 — 2021.
- HTTP/2 HOL: "a lost or reordered packet causes all active transactions to experience a stall regardless of whether that transaction was directly impacted"; QUIC provides "reliability at the stream level". — https://www.rfc-editor.org/rfc/rfc9114.html §1 — 2022.
- Linux TCP: `tcp_syn_retries` default 6 ≈ 127 s; `tcp_retries2` default 15 ≈ 13–30 min; `tcp_keepalive_time` 7200 s; `tcp_keepalive_probes` 9; `tcp_keepalive_intvl` 75 s; `tcp_fin_timeout` 60 s. — https://man7.org/linux/man-pages/man7/tcp.7.html
- Node `http` server defaults: `requestTimeout` 300,000 ms; `headersTimeout` = min(requestTimeout, 60,000), responds 408 and closes; `server.timeout` 0 (no timeout); `keepAliveTimeout` **5,000 ms in Node 24.x**; on `main` the default becomes 65,000 ms (PR nodejs/node#62782, version still `REPLACEME` as of 2026-09-19, i.e. unreleased). `http.globalAgent` uses keep-alive with a 5 s timeout since v19. — https://github.com/nodejs/node/blob/v24.x/doc/api/http.md and `main`.
- Node `fetch` (undici) client defaults: `connectTimeout` 10,000 ms; `headersTimeout` 300,000 ms; `bodyTimeout` 300,000 ms (between chunks); 0 disables. — https://github.com/nodejs/undici/blob/main/docs/docs/api/Client.md
- Postgres `max_connections`: "The default is typically 100 connections, but might be less if your kernel settings will not support it (as determined during initdb)." — https://www.postgresql.org/docs/current/runtime-config-connection.html — current docs, fetched 2026-09-20.
- Node `AbortSignal.timeout(delay)` added v17.3.0 / v16.14.0; `AbortSignal.any(signals)` added v20.3.0 / v18.17.0, `reason` set to whichever signal fired. — https://nodejs.org/api/globals.html
- gRPC: no default deadline ("possible for a client to end up waiting for a response effectively forever"); `DEADLINE_EXCEEDED`; propagation converts the deadline to a timeout with elapsed time deducted. — https://grpc.io/docs/guides/deadlines/

**Retries**
- Brooker 2015: capped exponential `min(cap, base × 2^attempt)`; full jitter `random(0, min(cap, base × 2^attempt))`; equal jitter `cap/2 + random(0, cap/2)`; decorrelated `min(cap, random(base, sleep × 3))`; with 100 clients, jittered variants cut calls by >50%; full jitter least total work. — https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/
- Builders' Library (Brooker, 2019): choose timeouts from a high percentile (p99.9-class), retry at a single layer, retries are "selfish", jitter all timers not just retries, connect and request timeouts are separate. — https://d1.awsstatic.com/builderslibrary/pdfs/timeouts-retries-and-backoff-with-jitter.pdf
- Google SRE: per-request retry limit 3 ("If a request has already failed three times, we let the failure bubble up"); per-client retry budget: retry only while retries < 10% of requests; retry only at the layer immediately above the failure. — https://sre.google/sre-book/handling-overload/
- AWS SDK retry behaviour (**2026 update, opt-in via `AWS_NEW_RETRIES_2026=true` until it becomes default**): standard mode; max attempts 3 (DynamoDB 4); `delay = random(0,1) × min(20,000 ms, base × 2^retry)`; base 50 ms transient (DynamoDB 25 ms), 1,000 ms throttling; retry quota 500 tokens, transient retry costs 14, throttling retry 5, first-try success restores 1; quota drains above ~22% sustained transient failure; `x-amz-retry-after` clamped to [backoff, backoff + 5 s]; transient = 500/502/503/504, RequestTimeout, I/O failure; throttling = 429-class codes. — https://docs.aws.amazon.com/sdkref/latest/guide/feature-retry-behavior.html — fetched 2026-09-19.
- gRPC retry policy: `maxAttempts`, `initialBackoff`, `maxBackoff`, `backoffMultiplier`, `retryableStatusCodes`; jitter ±20%; throttling via `maxTokens` / `tokenRatio` (retries stop when tokens < maxTokens/2); "retries are enabled by default, but there is no default retry policy"; unlimited transparent retries while the RPC never left the client, one when it reached the server library but not the application. — https://grpc.io/docs/guides/retry/
- RFC 9110: `Retry-After` for 429 and 503; delay-seconds or HTTP-date. — https://www.rfc-editor.org/rfc/rfc9110.html#name-retry-after

**Idempotency**
- RFC 9110 §9.2.2: idempotent = "the intended effect on the server of multiple identical requests with that method is the same as the effect for a single such request"; PUT, DELETE and all safe methods idempotent; "A client MAY automatically repeat a request with an idempotent method if that request fails". — https://www.rfc-editor.org/rfc/rfc9110.html#name-idempotent-methods
- Stripe: stores status code and body of the first request "regardless of whether it succeeds or fails", replays them including 500s; keys up to 255 chars, V4 UUID suggested; pruned after at least 24 hours; different parameters with same key → error; results saved only once execution begins, so validation failures and concurrent conflicts are not saved and can be retried; POST only (GET/DELETE ignored). — https://docs.stripe.com/api/idempotent_requests
- IETF `draft-ietf-httpapi-idempotency-key-header-07`: header `Idempotency-Key`; UUID recommended; in-flight duplicate → 409; same key different payload → 422; missing when required → 400; "idempotency fingerprint" from the payload. **Draft expired 18 April 2026**; no RFC. — https://www.ietf.org/archive/id/draft-ietf-httpapi-idempotency-key-header-07.txt
- AWS: EC2 `ClientToken`; retry with same token and different params → validation error; token honoured for the resource lifetime plus an interval; a retry after deletion returns the terminated instance, not a new one; recording the token and creating the resource must be one atomic operation. — https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/

**Network and partial failure**
- Network partition study (Alquraan et al., OSDI 2018): 136 failures, 25 systems; 80% catastrophic; data loss 27%; 90% silent; 21% permanent damage after healing; 64% need no client access or access to one side only; 69% complete partition, 29% partial, 2% simplex; 88% manifest by isolating a single node; 62% deterministic; 83% reproducible with 3 nodes; leader election affected by 40%; ToR failures → 40 partitions in two years at Google and 70% of downtime in a Microsoft study (their citations [21], [22]). — https://www.usenix.org/system/files/osdi18-alquraan.pdf
- Gray failure (Huang et al., HotOS 2017): "a system is defined to experience gray failure when at least one app makes the observation that system is unhealthy, but observer observes that system is healthy"; heartbeat-module-alive / request-module-stuck example; core switch with random drops invisible to neighbours but visible to high-fan-out apps. — https://www.microsoft.com/en-us/research/wp-content/uploads/2017/06/paper-1.pdf
- Bailis & Kingsbury incident catalogue: 5.2 device and 40.8 link failures/day, median 5 min repair, median 59,000 packets lost per failure (Microsoft DC study); Chubby 61 outages in 700 days; EBS April 2011 >12 h; GitHub Sept 2012 split brain; Twilio July 2013, 1.1% of customers overbilled ~40 min. — https://aphyr.com/posts/288-the-network-is-reliable — 2013 (ACM Queue version returns 403; author's copy used).
- Google leap smear: "24-hour linear smear from noon to noon UTC". The page does not carry a warning about mixing smeared and unsmeared servers; page `08-02` must state that as reasoning, not as a Google quote. — https://developers.google.com/time/smear
- V8 GC: Orinoco moved work off the main thread, but major GC still has stop-the-world phases; "parallel Scavenger has reduced the main thread young generation garbage collection total time by about 20%–50%". — https://v8.dev/blog/trash-talk — 2019.

## 5. Could not verify

- **Inter-AZ latency "single-digit millisecond".** AWS's infrastructure page gives the 100 km bound and "sufficient to accomplish synchronous replication" but no ms figure on the pages fetched. Use the 100 km bound and the fiber arithmetic (≤1 ms round trip at 100 km) on the page, not a quoted AWS number.
- **The eight fallacies of distributed computing, attribution.** Deutsch / Gosling; no primary page located. Page `07-02` should list the failure modes on its own authority and not attribute a numbered list.
- **Two Generals' original attribution** (Akkoyunlu et al. 1975 vs Gray 1978). Teach the argument; cite neither unless a primary copy is found.
- **Amdahl 1967 text** — citation only; the ACM DL page was not fetched. The formula is standard.
- **Universal Scalability Law (Gunther)** — no primary fetched. `03-05` uses Amdahl only and mentions "coordination cost grows" without the USL formula.
- **Coordinated omission naming.** HdrHistogram's README describes the correction (`recordValueWithExpectedInterval`) but the fetched README text did not contain the phrase "coordinated omission". Attribute the term to Gil Tene without quoting the README.
- **Peak-to-average ratio "2–3×"** on `05-03` — folk number; no primary. Present as an assumption the reader must state, not a fact.
- **"Node 24 is the LTS the book targets"** — local `node --version` is v24.11.0; the nodejs.org docs page served v26.9.0. The book should name the version per page.

## 6. Sources

- https://sre.google/sre-book/availability-table/ — nines downtime table
- https://sre.google/sre-book/service-level-objectives/ — SLI SLO SLA
- https://sre.google/sre-book/handling-overload/ — retry budget 10%
- https://sre.google/sre-book/embracing-risk/ — nines cost, error budget
- https://developers.google.com/time/smear — leap smear window
- https://www.postgresql.org/docs/current/runtime-config-connection.html — max_connections default
- https://nodejs.org/api/globals.html — AbortSignal timeout any
- https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/availability.html — series parallel MTBF
- https://aws.amazon.com/dynamodb/sla/ — DynamoDB uptime commitment
- https://aws.amazon.com/s3/sla/ — S3 credit tiers
- https://aws.amazon.com/message/101925/ — us-east-1 Oct 2025
- https://aws.amazon.com/about-aws/global-infrastructure/regions_az/ — AZ distance bound
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html — region AZ definitions
- https://docs.aws.amazon.com/ec2/latest/instancetypes/mo.html — largest instance specs
- https://docs.aws.amazon.com/sdkref/latest/guide/feature-retry-behavior.html — SDK retry 2026
- https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/ — jitter formulas comparison
- https://d1.awsstatic.com/builderslibrary/pdfs/timeouts-retries-and-backoff-with-jitter.pdf — Brooker timeouts article
- https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/ — client tokens EC2
- https://12factor.net/processes — stateless share-nothing
- https://static.googleusercontent.com/media/research.google.com/en//people/jeff/Stanford-DL-Nov-2010.pdf — Dean numbers, envelope
- https://github.com/colin-scott/interactive_latencies — latency year model
- https://github.com/sirupsen/napkin-math — 2026 measured numbers
- https://hpbn.co/primer-on-latency-and-bandwidth/ — speed of light
- https://www.barroso.org/publications/TheTailAtScale.pdf — fan-out hedging numbers
- https://pubsonline.informs.org/doi/10.1287/opre.9.3.383 — Little's law paper
- https://dl.acm.org/doi/10.1145/1465482.1465560 — Amdahl citation only
- https://www.rfc-editor.org/rfc/rfc9110.html — idempotent methods Retry-After
- https://www.rfc-editor.org/rfc/rfc8446.html — TLS 1.3 0-RTT
- https://www.rfc-editor.org/rfc/rfc9001.html — QUIC 1-RTT handshake
- https://www.rfc-editor.org/rfc/rfc9114.html — HTTP/3 HOL blocking
- https://www.ietf.org/archive/id/draft-ietf-httpapi-idempotency-key-header-07.txt — Idempotency-Key draft
- https://docs.stripe.com/api/idempotent_requests — Stripe key semantics
- https://man7.org/linux/man-pages/man7/tcp.7.html — Linux TCP defaults
- https://github.com/nodejs/node/blob/v24.x/doc/api/http.md — Node 24 timeouts
- https://github.com/nodejs/node/blob/main/doc/api/http.md — keepAliveTimeout 65 s change
- https://github.com/nodejs/undici/blob/main/docs/docs/api/Client.md — fetch client timeouts
- https://grpc.io/docs/guides/deadlines/ — deadline propagation
- https://grpc.io/docs/guides/retry/ — gRPC retry throttling
- https://www.usenix.org/system/files/osdi18-alquraan.pdf — partition failure study
- https://www.microsoft.com/en-us/research/wp-content/uploads/2017/06/paper-1.pdf — gray failure paper
- https://aphyr.com/posts/288-the-network-is-reliable — partition incident catalogue
- https://v8.dev/blog/trash-talk — V8 GC pauses
- https://github.com/HdrHistogram/HdrHistogram — expected-interval correction
- https://dl.acm.org/doi/10.1145/357172.357176 — Byzantine Generals citation
