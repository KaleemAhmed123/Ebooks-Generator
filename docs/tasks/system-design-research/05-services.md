# 05 — Services & Building Blocks — research

Booklet 05 of *System Design — Distributed Systems · Events · Microservices*.
Researched 2026-09-19/20. Every fact in §4 was checked against the primary
source on that date. Rough-file coverage: §43–47 and one table row each in §53.
Almost everything below is new.

Cross-booklet rule used throughout: retries/backoff/jitter/idempotency
mechanics are booklet 01; consistent hashing and sharding are 02; locks and
leader election are 03; outbox, saga, CDC, queues are 04. This booklet points
at those pages and does not re-teach them.

Overlap note: `books/tech/typescript-to-deployment/06-api-design` already has
pages on service boundaries (08-01/02), gateway and BFF (08-03), timeouts,
retries, circuit breaker, bulkhead, correlation (09-01..05), SSE vs WebSocket
(06-04), long-polling (06-05), rate limiting (05-03), feature flags (11-02).
Those pages are written from the *API author's* seat. The pages here are from
the *system designer's* seat (which pattern, where in the topology, what breaks
at scale). The drafting agent must read the TS2D page before writing the
sibling here so the two do not contradict or duplicate. One concrete
inconsistency to fix: TS2D 05-03 shows `RateLimit: limit=100, remaining=0,
reset=42`; the current IETF draft (-11, May 2026) uses
`RateLimit: "default";r=50;t=30` and a separate `RateLimit-Policy` field.

---

## 1. Modules and pages

Format: `NN-MM-slug` — title — the one idea — the failure mode — diagram.

### Module 01 — The shape of the system (7 pages)

- `01-01-monolith` — The monolith — one deployable, one database, one transaction boundary; this is the default, not the embarrassment — the failure mode is the build/deploy queue and the "everyone touches everything" schema, not performance — svg (one box, one DB)
- `01-02-modular-monolith` — The modular monolith — module boundaries enforced in code (packages, import rules, per-module schema) without a network hop — failure: boundaries that exist in a diagram but not in the compiler; a `tsconfig` `paths`/ESLint `no-restricted-imports` example proves it — code
- `01-03-microservices-definition` — What "microservice" actually means — independently deployable, owns its data, talks over a network; the network hop is the cost you pay for independent deploys — failure: a "distributed monolith" (services that must deploy together) — svg (deploy-together vs deploy-alone)
- `01-04-when-each-is-right` — The workload decides — team count, deploy frequency, differing scaling profiles, differing data stores; a decision table, not a preference — failure: splitting before the domain is understood (Fowler's MonolithFirst argument) — table
- `01-05-cost-of-a-network-hop` — What one hop costs — latency, partial failure, serialization, versioning, observability; the eight fallacies compressed to the four that bite — failure: 3 hops in series at p99 each; the multiplication — table (latency/availability multiply)
- `01-06-conways-law` — Conway's law as a design input — service boundaries follow team boundaries whether you plan it or not; the "inverse Conway manoeuvre" — failure: one service, three owning teams — none
- `01-07-shared-database-antipattern` — The shared database — the rough file's "bad architecture" made precise: coupling through schema, hidden write paths, no owner for a migration — failure: service B's index rebuild takes down service A — svg (three services, one DB, the hidden edges)

### Module 02 — Boundaries and data ownership (8 pages)

- `02-01-bounded-context` — Bounded context — one model, one vocabulary, one owner; "customer" means a different thing in billing and in support, and that is correct — failure: the one canonical "Customer" object every service imports — svg (two contexts, same word, different shape)
- `02-02-finding-the-seams` — Finding the seams — split along things that change together and along data that is written by one actor; event storming at a glance — failure: splitting by noun ("UserService", "OrderService") instead of by capability — table (noun-split vs capability-split)
- `02-03-database-per-service` — Database per service — the service is the only writer; readers go through its API or its events — failure: the reporting team's read-only credentials to every database — svg
- `02-04-data-ownership-rules` — Who may write what — single-writer principle; reference data by ID across contexts, never by join — failure: cross-service foreign keys enforced by nothing — code (TS types showing `customerId: string` not `customer: Customer`)
- `02-05-reads-across-services` — Reading data you do not own — API composition vs materialized read model built from events (pointer to booklet 04 CQRS) — failure: N+1 across the network on a list page — svg (composition fan-out vs local read model)
- `02-06-duplication-is-fine` — Replicated reference data — copying the fields you need is cheaper than a call; version them, refresh them by event — failure: the copy is treated as the source of truth and edited — table
- `02-07-transactions-across-services` — There is no cross-service transaction — what you actually get: outbox (04), saga (04), or a wider boundary; the decision — failure: 2PC across HTTP services (pointer to booklet 03) — svg (one box grown wider vs saga)
- `02-08-sizing-a-service` — How big is a service — as big as its consistency boundary, as small as one team can own; the "two-pizza" number is about ownership, not lines of code — failure: nano-services, 40 deploys for one feature — none

### Module 03 — Talking between services (10 pages)

- `03-01-sync-vs-async` — Sync vs async — sync when the caller cannot proceed without the answer; async when it can; the rough file's §47 made into a rule — failure: "async is better" as an answer; async for a login check — table
- `03-02-rest-vs-grpc` — REST vs gRPC between services — JSON over HTTP/1.1 vs protobuf over HTTP/2 with streaming; schema-first vs resource-first — failure: gRPC from the browser without a proxy; REST between 40 internal services with no schema — table
- `03-03-latency-compounds` — Chains compound latency and failure — A→B→C→D: latencies add, availabilities multiply; the rough file's example with real numbers — failure: a chain of 5 services each at 99.9% is 99.5% — table
- `03-04-fan-out` — Fan-out and the tail — one request to N backends waits for the slowest; Dean & Barroso's 63% — failure: p99 at the root is the p99.99 of a leaf — svg (root, 100 leaves, one slow)
- `03-05-api-gateway` — API gateway — one edge: TLS, auth, rate limit, routing; what belongs there and what does not — failure: business logic in the gateway; the gateway as a second monolith — svg (edge box with the four responsibilities)
- `03-06-bff` — Backend for frontend — one BFF per user experience, owned by the frontend team; Newman's rule — failure: a "general" BFF that is a gateway with extra steps; duplicated logic across BFFs — svg (web BFF, mobile BFF, shared services)
- `03-07-service-discovery` — Service discovery — instances come and go; a registry (Consul/etcd) or DNS (Kubernetes `svc.cluster.local`) answers "where is X" — failure: stale registry entries routed to for 30 s after a crash — svg (client → registry → instances)
- `03-08-client-vs-server-side-discovery` — Client-side vs server-side discovery — the client picks an instance vs a proxy/VIP picks; Kubernetes ClusterIP is server-side, headless service is client-side — failure: client-side balancing across 12 languages with 12 bugs — table
- `03-09-service-mesh-at-a-glance` — Service mesh at a glance — a sidecar/proxy per service does mTLS, retries, metrics; you buy uniformity with a hop — failure: the mesh retries on top of your retries — svg (sidecar pair)
- `03-10-async-request-reply` — Async request/reply — when you need a reply but not now: correlation ID, reply queue or callback URL (pointer to 04 for the queue mechanics) — failure: the reply arrives and nobody is waiting — svg

### Module 04 — Surviving a dependency (10 pages)

- `04-01-deadline-propagation` — Deadline propagation — the caller's remaining budget travels with the request (gRPC deadline, a header); each hop subtracts — failure: a 30 s inner timeout inside a 5 s outer one; work done for a caller that already gave up — svg (budget shrinking down the chain) — code (TS: pass `AbortSignal.timeout(remaining)`)
- `04-02-retry-storms` — Retry amplification — three layers each retrying 3× is 27× load on a struggling dependency; retry budgets (a % of requests, not a count) — failure: the retry that turns a brownout into an outage — svg (layered retries multiplying) — pointer to 01 for backoff/jitter
- `04-03-circuit-breaker` — Circuit breaker — closed/open/half-open; fail fast so the caller and the callee both recover; Resilience4j defaults as the worked example — failure: one breaker for a whole host when one endpoint is sick; trip threshold with no minimum call count — svg (state machine) — code
- `04-04-bulkhead` — Bulkhead — isolate pools (threads, connections, queues) per dependency so one slow dependency cannot use every worker — failure: one slow downstream exhausts the HTTP connection pool for everyone — svg (partitioned pool)
- `04-05-load-shedding` — Load shedding — drop low-priority work at admission when saturated; priorities, not a single limit; Stripe's four limiters — failure: queueing everything until every request times out (the "goodput goes to zero" curve) — svg (throughput vs offered load)
- `04-06-hedged-requests` — Hedged and tied requests — send a second copy after the p95 delay, cancel the loser; Google's 1,800 ms → 74 ms for 2% extra requests — failure: hedging non-idempotent calls; hedging with no cancel doubles load — svg (timeline)
- `04-07-graceful-degradation` — Graceful degradation — a stale answer, a default, a hidden panel; decide per feature what "worse but up" means — failure: the recommendations service is down and the home page 500s — table (feature → fallback)
- `04-08-fallback-rules` — Fallbacks that are safe — cache-as-fallback, static default, skip; when a fallback is worse than an error (money, permissions) — failure: fallback "allow" on the authorization service — table
- `04-09-health-checks` — Liveness vs readiness — alive is "restart me", ready is "route to me"; deep checks that call dependencies turn one outage into a fleet restart — failure: readiness that checks the database; the whole tier flaps together — table — code (two endpoints)
- `04-10-backpressure-at-the-edge` — Backpressure at the service level — bounded queues, 429/503 with `Retry-After`, admission control; pointer to 04 for stream backpressure — failure: unbounded in-memory queue, OOM at 03:00 — svg

### Module 05 — Contracts, change, and deploy safety (9 pages)

- `05-01-contracts` — The contract is the API plus its behaviour — schema (OpenAPI/protobuf) plus the semantics the schema cannot say — failure: same schema, changed meaning of a field — none
- `05-02-compatible-changes` — Compatible vs breaking — add optional field, never remove/rename/retype; tolerant reader (ignore unknown fields) — failure: a strict deserializer that rejects a new field (pointer to 02 encoding pages) — table
- `05-03-versioning-between-services` — Versioning between services — expand/contract (parallel change): add new, migrate callers, remove old; URL versioning is the last resort — failure: v1 and v2 living forever; nobody knows who calls v1 — svg (expand → migrate → contract)
- `05-04-consumer-driven-contracts` — Consumer-driven contract tests — each consumer records what it uses; the provider runs those in CI — failure: the provider's own tests pass and production breaks — svg
- `05-05-strangler-fig` — The strangler fig — route a slice through a façade to the new system, move slices one at a time, retire the old — failure: the façade becomes permanent; two systems forever — svg (façade routing shrinking legacy)
- `05-06-strangler-data` — Strangling the data — dual-write is not a strategy; migrate reads first, then writes, with CDC (04) to keep the old store warm for rollback — failure: dual-write diverges silently — svg (phases)
- `05-07-blue-green` — Blue-green — two full environments, switch the router, keep the old for instant rollback — failure: database migrations that only work forward; sessions on blue — svg
- `05-08-canary-and-rolling` — Canary and rolling — small slice takes real traffic, compare against a control, widen; Kubernetes rolling defaults 25%/25% — failure: comparing the canary to the whole fleet instead of a same-sized control; canary too small to see a 0.1% error — svg (traffic split)
- `05-09-feature-flags` — Feature flags — decouple deploy from release; kill switch; flags are config with a lifetime — failure: 400 flags nobody removes; flag evaluation calling a remote service on the hot path — code (TS flag check with default)

### Module 06 — Observability for distributed systems (8 pages)

- `06-01-three-signals` — Logs, metrics, traces — what each answers: what happened, how much/how fast, where the time went — failure: logging what a metric should count (cardinality, cost) — table
- `06-02-structured-logs` — Structured logs — one JSON object per event with fixed keys; log the ID, not the object — failure: PII in logs; free-text that no query can group — code (TS logger call)
- `06-03-correlation-id` — Correlation and trace IDs — generate at the edge, propagate on every hop, log it everywhere; W3C `traceparent` format — failure: an ID regenerated at each service; async work (queues) drops it — svg (ID flowing through hops and a queue) — code
- `06-04-metrics` — Metrics — counter, gauge, histogram; RED (rate, errors, duration) per service; Google's four golden signals — failure: averaging latency; user ID as a label (cardinality explosion) — table
- `06-05-percentiles` — Percentiles, not averages — p50/p95/p99 and why p99 matters at fan-out; histograms aggregate, percentiles do not — failure: averaging p99s across instances — svg (distribution with a tail)
- `06-06-distributed-tracing` — Distributed tracing — spans, parent IDs, one trace across services; sampling (head vs tail) — failure: 100% tracing at 50k rps; head sampling that never keeps the slow request — svg (trace waterfall)
- `06-07-slo-and-alerting` — SLIs, SLOs, error budgets — alert on symptoms (user-facing SLI burn), page on budget burn rate, not on CPU — failure: 200 alerts nobody reads — table
- `06-08-health-of-a-dependency` — Watching your dependencies — per-dependency latency/error metrics, breaker state as a metric, timeouts counted separately — failure: "our service is fine" while its dependency is at p99 4 s — table

### Module 07 — Load balancing and proxies (9 pages)

- `07-01-what-a-load-balancer-does` — The load balancer — one address, many instances; health, distribution, and failover in one box — failure: the balancer as a single point of failure; no floating IP/anycast in front — svg
- `07-02-l4-vs-l7` — L4 vs L7 — L4 forwards TCP/UDP by 5-tuple and never reads HTTP; L7 terminates TLS, reads paths/headers, can route per request — failure: sticky sessions on L4 by IP behind a NAT (one IP = thousands of users) — table
- `07-03-algorithms` — Algorithms — round robin (weighted), least connections, least request with power-of-two-choices, random, hash/consistent hash; Envoy and NGINX as the examples — failure: round robin over heterogeneous instances; hash without consistent hashing (pointer to 02) — table
- `07-04-power-of-two-choices` — Power of two choices — pick two at random, send to the less loaded; avoids the herd of "everyone picks the least loaded" — failure: global least-loaded with stale load data — svg
- `07-05-health-checks-lb` — Health checks from the balancer — active (probe) vs passive (observe failures); NGINX `max_fails=1 fail_timeout=10s`; slow start — failure: eject too fast under a transient blip, or a check that passes while the app is deadlocked — table
- `07-06-sticky-sessions` — Sticky sessions — cookie or hash affinity; why you want to avoid needing them (state in a store, not in the instance) — failure: one hot instance; a deploy that drains every session at once — svg
- `07-07-connection-draining` — Draining and graceful shutdown — stop accepting, finish in-flight, then exit; SIGTERM handling in Node — failure: the balancer keeps sending for 5 s after the pod is gone — code (TS `server.close()` on SIGTERM) — svg (timeline)
- `07-08-reverse-proxy` — Reverse proxy — TLS termination, compression, buffering, static files, the one place to add a header; NGINX/Envoy as the examples — failure: request buffering that breaks streaming (`X-Accel-Buffering`) — svg
- `07-09-global-vs-local-lb` — Global vs local balancing — DNS/anycast picks a region; the regional balancer picks an instance; two layers, two failure domains — failure: DNS TTL 300 s and a dead region — svg

### Module 08 — Caching (14 pages)

- `08-01-why-cache` — Why and where to cache — browser, CDN, gateway, application, database; each layer has a different TTL and a different invalidation path — failure: five caches, five stale answers — svg (layers)
- `08-02-cache-aside` — Cache-aside (look-aside) — app reads cache, on miss reads DB and fills; the pattern memcache at Facebook uses — failure: the read-fill race that stores a stale value after a concurrent write — code (TS get/set) — svg
- `08-03-read-through-write-through` — Read-through and write-through — the cache does the fetching/writing; simpler app, cache in the write path — failure: write-through latency on every write for data nobody reads — table
- `08-04-write-behind` — Write-behind (write-back) — ack from cache, flush to DB later; fast writes, durability risk — failure: cache node dies with unflushed writes — svg
- `08-05-ttl` — TTL — the simplest invalidation: bounded staleness; pick it from "how stale can this be", not from habit — failure: TTL as the only invalidation for data that must be right — table (data → acceptable staleness)
- `08-06-invalidation` — Invalidation — delete on write (not update: deletes are idempotent), event-driven invalidation from the commit log (mcsqueal at Facebook) — failure: update-on-write reordered so the older value lands last — svg (write → delete → next read fills)
- `08-07-stampede` — Cache stampede / thundering herd — a hot key expires, thousands of requests hit the DB at once; the fixes are one-flight (lock/lease), early probabilistic refresh, stale-while-revalidate — failure: warm-up after a cache restart (cold start) — svg (spike at expiry)
- `08-08-stampede-fixes` — The fixes, precisely — request coalescing (single-flight), memcache leases (one token per key per 10 s), XFetch (`now - Δ·β·ln(rand) ≥ expiry`), serve-stale — failure: a lock with no TTL; the lock holder crashes — code (TS single-flight map) — table
- `08-09-hot-keys` — Hot keys — one key gets 30% of traffic; local (in-process) cache in front, key replication/suffixing, Redis 8.6 `HOTKEYS` to find them — failure: a Redis Cluster shard pinned at 100% CPU by one key — svg
- `08-10-redis-model` — Redis as the example — single-threaded command execution; I/O threads (off by default) parse and write sockets only; why one slow command (`KEYS`, big `SMEMBERS`) blocks everyone — failure: `KEYS *` in production — svg (I/O threads feeding one command thread)
- `08-11-redis-eviction` — Eviction — `maxmemory` + policy: `noeviction` default, `allkeys-lru`/`lfu`/`lrm`/`random`, `volatile-*`, `volatile-ttl`; approximated LRU with `maxmemory-samples 5` — failure: `noeviction` on a cache → writes fail; `volatile-lru` when no key has a TTL → behaves as `noeviction` — table
- `08-12-cache-consistency` — What "consistent" means for a cache — read-your-writes after a write, bounded staleness otherwise; version/etag in the value — failure: the user edits, refreshes, sees the old value — svg
- `08-13-local-vs-distributed` — In-process vs distributed cache — a `Map` with TTL beats Redis for tiny hot sets; Redis when instances must agree — failure: 40 instances each warming their own copy of the same 2 GB — table
- `08-14-negative-caching` — Negative caching — cache the "not found" too, briefly; protects against enumeration and repeated misses — failure: a negative entry outliving the create — code

### Module 09 — CDN and the edge (6 pages)

- `09-01-what-a-cdn-is` — CDN — a shared cache at the network edge keyed by URL; it caches what your headers let it — failure: the CDN caches a personalised page (`Set-Cookie`/`Vary` ignored) — svg (origin, PoPs, user)
- `09-02-what-it-caches-by-default` — What it caches by default — static extensions, not HTML/JSON (Cloudflare's default list); status-code TTLs — failure: expecting API responses to be cached with no `Cache-Control` — table
- `09-03-cache-control` — `Cache-Control` for shared caches — `s-maxage`, `public`/`private`, `no-store` vs `no-cache`, `immutable` with hashed filenames; RFC 9111 freshness order — failure: `no-cache` meaning "don't cache" (it means "revalidate") — table
- `09-04-stale-while-revalidate` — `stale-while-revalidate` and `stale-if-error` — serve stale, refresh in the background; survive an origin outage — failure: swr on data that must be current — code (header) — svg (timeline)
- `09-05-invalidation-purge` — Purging and cache keys — purge by URL/tag vs versioned URLs (never purge); `Vary` and the cache key — failure: purge propagation lag; a purge storm on deploy — table
- `09-06-edge-compute` — Edge compute at a glance — run a small function at the PoP: auth, A/B, geo-routing; cold-start and state limits — failure: talking to a single-region database from 300 PoPs — svg

### Module 10 — Rate limiting (7 pages)

- `10-01-why-limit` — Why rate limit — protect capacity, fairness, cost; limit vs quota; who is the key (user, token, IP, tenant) — failure: keying on IP behind carrier NAT — table
- `10-02-token-bucket` — Token bucket — refill at r/s, capacity b allows bursts; the algorithm most APIs actually run (Stripe) — failure: bucket capacity so large the burst is the outage — code (TS bucket) — svg
- `10-03-leaky-bucket` — Leaky bucket — drain at a fixed rate, smooth output; queue vs meter forms — failure: added latency for everyone during a burst — svg
- `10-04-windows` — Fixed vs sliding window — fixed allows 2× at the boundary; sliding log is exact but expensive; Cloudflare's weighted sliding window approximation — failure: fixed-window double-burst at :00 — svg (boundary burst) — table
- `10-05-distributed-limiting` — Distributed rate limiting — the counter must be shared (Redis `INCR`+`EXPIRE`, atomic via Lua) or per-node limits divided by N — failure: three replicas, triple the limit; a Redis round-trip on every request at the edge — code (Lua/TS)
- `10-06-telling-the-client` — Telling the client — 429, `Retry-After`, IETF `RateLimit`/`RateLimit-Policy` (draft-11) — failure: no header, clients retry immediately (pointer to 01 backoff) — code (headers)
- `10-07-limit-vs-shed` — Rate limiting vs load shedding — a limit is per-client policy; shedding is per-server survival; you need both — failure: a limiter that lets 10k well-behaved clients overload the server together — table

### Module 11 — IDs, blobs, search (10 pages)

- `11-01-why-not-autoincrement` — Why not `AUTO_INCREMENT` — one DB is the ID authority; sharding breaks it; predictable IDs leak counts — failure: two shards, same ID — table
- `11-02-uuid-v4-vs-v7` — UUIDv4 vs UUIDv7 — v4 is random and scatters B-tree inserts; v7 is time-ordered (48-bit ms timestamp); RFC 9562 (May 2024) — failure: random primary keys and index page splits — svg (bit layout) — code (`crypto.randomUUIDv7()` in Node 24.16+/26.1+; Postgres 18 `uuidv7()`)
- `11-03-snowflake` — Snowflake IDs — 41-bit time, 10-bit worker, 12-bit sequence, custom epoch; k-sorted, 64-bit — failure: clock moves backwards; two workers with the same ID — svg (bit layout)
- `11-04-db-generated-ids` — Database-generated sharded IDs — Instagram's PL/pgSQL: 41-bit time, 13-bit shard, 10-bit sequence; the shard is readable from the ID — failure: sequence per table wraps at 1024/ms — code (SQL)
- `11-05-choosing-an-id` — Choosing — sortable? guessable? size? generated where? a decision table — failure: exposing a Snowflake and leaking your worker count and throughput — table
- `11-06-object-storage` — Object storage — flat key → bytes, HTTP API, 11 nines durability class; S3 as the example: strong read-after-write, last-writer-wins on concurrent PUT, no rename — failure: treating it as a filesystem (listing 10M keys, "rename" = copy+delete) — table
- `11-07-presigned-uploads` — Presigned uploads — the API signs a URL, the client uploads straight to storage; the API never carries the bytes — failure: no size/type limit on the signed URL; a URL valid for 7 days leaked — svg (three-party flow) — code (TS presign)
- `11-08-multipart-and-large-files` — Large files — multipart: 5 MiB–5 GiB parts, 10,000 parts, resume per part — failure: abandoned multipart uploads billed forever (lifecycle rule) — svg
- `11-09-inverted-index` — Search: the inverted index — term → posting list; tokenise, normalise, score; why `LIKE '%x%'` cannot be indexed — failure: the "search" that is a table scan at 10M rows — svg (docs → terms → postings)
- `11-10-search-as-a-service` — Search as a separate system — Elasticsearch/OpenSearch fed by events/CDC; near-real-time (refresh 1 s default); the DB stays the source of truth — failure: reading your own write from search immediately; re-indexing without a second index and alias swap — svg (DB → CDC → index)

### Module 12 — Geography and real-time (9 pages)

- `12-01-why-multi-region` — Why multi-region — latency (speed of light: ~80 ms round trip across an ocean), regional failure, residency law; each doubles the design cost — failure: multi-region "for availability" with a single-region database — table
- `12-02-active-passive` — Active-passive — one region serves, one warm/cold standby; RPO/RTO define it — failure: the failover that was never rehearsed; DNS TTL on the day — svg
- `12-03-active-active` — Active-active — every region writes; needs conflict resolution or region-pinned data; DynamoDB global tables (last-writer-wins by default; strong-consistency mode exists) — failure: two regions accept the same username — svg (pointer to 02 multi-leader)
- `12-04-data-residency` — Data residency — data must stay in a jurisdiction; shard by home region, route users home, keep the global index metadata-only — failure: a backup or a log ships the data out — svg (home-region routing)
- `12-05-dns-at-a-glance` — DNS as a control plane — TTL bounds how fast you can move traffic; resolvers ignore TTLs; health-checked DNS is slow failover — failure: TTL 86400 on the record you need to move — table
- `12-06-anycast` — Anycast — one IP announced from many places; BGP routes to the nearest; ideal for DNS/UDP and CDN edges — failure: a long TCP session when the route flips mid-connection (RFC 4786's caveat) — svg
- `12-07-realtime-options` — Long-polling, SSE, WebSocket — hold the request, stream one-way over HTTP, or full-duplex; pick by direction and proxy friendliness — failure: WebSockets through a load balancer with a 60 s idle timeout — table
- `12-08-scaling-connections` — Scaling persistent connections — a connection is state: sticky routing or a pub/sub fan-out (Redis Pub/Sub, Kafka) behind the socket tier; presence and reconnect — failure: a deploy that reconnects 2M clients at once (reconnect storm; jitter the reconnect) — svg
- `12-09-push-vs-pull-summary` — Push vs pull, decided — a closing decision table across the booklet: when to poll, when to stream, when to queue — none — table

**Page count: 107** (7+8+10+10+9+8+9+14+6+7+10+9).

Two-page candidates if a draft overflows: `04-03-circuit-breaker` (state machine + code), `08-08-stampede-fixes` (three fixes), `11-07-presigned-uploads` (flow + code). Do not pre-split.

---

## 2. What the rough file missed

Everything in modules 05–12 is absent from the rough file except one-line table rows in §53 ("Load balancing — Traffic distribution", "Caching — Latency/load", etc.). The biggest three, then the rest.

- **Caching as a mechanism** (14 pages here; rough file: one table row). Every product-company design round asks about it; the stampede, invalidation and hot-key questions are the ones that separate mid from senior. Source: Nishtala et al., *Scaling Memcache at Facebook*, NSDI 2013 — https://www.usenix.org/system/files/conference/nsdi13/nsdi13-final170_update.pdf
- **Resilience at the service level beyond "circuit breaker"** — deadline propagation, retry budgets/storms, bulkhead, load shedding, hedging. Rough file has "circuit breaker" as a table row and "timeout/retry/backoff/DLQ" as a list in §52. Source: Dean & Barroso, *The Tail at Scale*, CACM 2013 — https://www.barroso.org/publications/TheTailAtScale.pdf
- **Observability as a designed thing** — correlation IDs that survive a queue, cardinality, percentiles, sampling. Rough file: "Observability — Operating the system". Source: W3C Trace Context — https://www.w3.org/TR/trace-context/ ; Google SRE book ch. 6 — https://sre.google/sre-book/monitoring-distributed-systems/
- Monolith vs modular monolith vs microservices as a *decision* — the rough file starts at "10 services + Docker is not enough" and never asks whether to split. Source: Fowler, MonolithFirst — https://martinfowler.com/bliki/MonolithFirst.html (not fetched this session; well-known, see §5)
- Bounded context and service sizing — rough file has "who owns the data" as a question with no method. Source: Fowler, BoundedContext — https://martinfowler.com/bliki/BoundedContext.html (not fetched this session)
- API gateway vs BFF — §53 row only. Source: Newman, BFF pattern — https://samnewman.io/patterns/architectural/bff/
- Service discovery, client- vs server-side — absent. Source: Kubernetes Service docs — https://kubernetes.io/docs/concepts/services-networking/service/
- Contracts, compatible change, expand/contract, consumer-driven contracts — absent (encoding evolution is in §5 of the rough file, i.e. booklet 02, but the *service* side of versioning is not). Source: Fowler, ParallelChange — https://martinfowler.com/bliki/ParallelChange.html (not fetched)
- Strangler fig — absent. Source: https://martinfowler.com/bliki/StranglerFigApplication.html
- Deploy safety (blue-green, canary, rolling, flags) — absent. Sources: https://kubernetes.io/docs/concepts/workloads/controllers/deployment/ ; https://sre.google/workbook/canarying-releases/
- Load balancing L4/L7, algorithms, P2C, health checks, draining — absent. Sources: https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/load_balancers ; https://nginx.org/en/docs/http/ngx_http_upstream_module.html
- CDN semantics (`Cache-Control`, swr, purge, what is cached by default) — absent. Sources: RFC 9111 https://www.rfc-editor.org/rfc/rfc9111.html ; RFC 5861 https://www.rfc-editor.org/rfc/rfc5861.html ; https://developers.cloudflare.com/cache/concepts/default-cache-behavior/
- Rate limiting algorithms and distributed counters — absent. Sources: https://stripe.com/blog/rate-limiters ; https://blog.cloudflare.com/counting-things-a-lot-of-different-things/ ; https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/
- Unique ID generation — absent. Sources: RFC 9562 https://www.rfc-editor.org/rfc/rfc9562.html ; Snowflake README https://github.com/twitter-archive/snowflake/tree/snowflake-2010 ; Instagram https://instagram-engineering.tumblr.com/post/10853187575/sharding-ids-at-instagram/amp
- Object storage and presigned uploads — absent. Source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html
- Search / inverted index — absent. Source: https://www.elastic.co/docs/manage-data/data-store/near-real-time-search
- Multi-region, residency, DNS, anycast — absent. Sources: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html ; RFC 4786 https://www.rfc-editor.org/rfc/rfc4786.html
- WebSocket/SSE/long-poll at scale (connection state, reconnect storms) — absent. Source: the TS2D pages 06-04/06-05 already cover the protocol; the *scaling* page here needs a fan-out source — Redis Pub/Sub docs https://redis.io/docs/latest/develop/pubsub/

---

## 3. What the rough file has that should be cut or moved

- §43 "the real questions" list — keep as the *spine* of module 02, not as a page. It is a list of questions, not an idea.
- §44 shared DB vs DB-per-service — keep (pages 01-07, 02-03). Thin; needs the "who reads" and "reporting" failure modes added.
- §45 event-driven microservices + outbox — **belongs in booklet 04** (outbox, broker, consumers). This booklet only points at it from 02-07 and 03-10.
- §46 outbox + idempotent consumer — **booklet 04** (outbox) and **booklet 01** (idempotency).
- §47 sync vs async — keep as 03-01, but the rough file's "latency compounds" example needs real numbers and the availability-multiplies half it omits (03-03).
- §52 "notification system: timeout, retry, backoff, DLQ, provider fallback, idempotency" — the *method* is **booklet 06**; the mechanics are **01** (timeout/retry/backoff/idempotency) and **04** (DLQ). Only "provider fallback" lives here (04-07/04-08).
- §53 table rows: consistent hashing → **02**; message queues, event streams → **04**; database sharding, replication → **02**; distributed locks, leader election → **03**; idempotency → **01**; outbox, saga → **04**. Load balancing, API gateway, caching, CDN, rate limiting, circuit breaker, observability → **here**.
- Nothing in the assigned sections is wrong; it is all too thin to be a page.

**Belongs elsewhere (found during research, not in the rough file):**
- gRPC deadlines vs HTTP timeouts as a *protocol* topic — TS2D 07-03/07-05 already; here only the propagation idea (04-01).
- OAuth/auth at the gateway — TS2D module 03; one line on 03-05 only.
- Service mesh internals (Envoy xDS, mTLS) — rare in interviews; one "at a glance" page (03-09) is enough.

---

## 4. Facts to get right

All verified 2026-09-19/20 against the linked page.

**Redis**
- Latest Redis Open Source is **8.6.6 (August 2026)**; 8.6.0 GA was February 2026; 8.0.0 GA May 2025. — https://redis.io/docs/latest/operate/oss_and_stack/stack-with-enterprise/release-notes/redisce/redisos-8.6-release-notes/
- Threading: "Redis is mostly single threaded"; I/O threads handle socket reads/writes and protocol parsing only; command execution stays on the main thread. `io-threads` is **disabled by default** ("By default threading is disabled"; "Setting io-threads to 1 will just use the main thread as usual"). Advice: enable only with 4+ cores and a measured CPU problem. — `redis.conf` THREADED I/O block, https://raw.githubusercontent.com/redis/redis/unstable/redis.conf ; 8.0 release notes: "A new I/O threading implementation, which enables throughput increase on multi-core environments".
- Eviction: default `maxmemory-policy noeviction`; policies `noeviction`, `allkeys-lru`, `allkeys-lfu`, `allkeys-lrm` (new in 8.6), `allkeys-random`, `volatile-lru`, `volatile-lfu`, `volatile-lrm`, `volatile-random`, `volatile-ttl`. `volatile-*` "behave like `noeviction` if no keys have an associated expiration". LRU/LFU are **approximated by sampling**; `maxmemory-samples` default **5**; LFU uses a Morris counter, `lfu-log-factor 10`, `lfu-decay-time 1`. Docs recommend `allkeys-lru` as the default choice for a cache. 64-bit default `maxmemory 0` (no limit). — https://redis.io/docs/latest/develop/reference/eviction/
- `HOTKEYS` command (hot-key detection) added in **8.6**. New in 8.6 also: `XADD` idempotency (`IDMP`/`IDMPAUTO`), LRM eviction, TLS cert auto-auth. — 8.6 release notes (above).
- Redis 8 license: RSALv2 / SSPLv1 / **AGPLv3** (tri-license, since 8.0). — 8.0 release notes.
- Lazy-free defaults are all `no` (`lazyfree-lazy-eviction no`, etc.) — `redis.conf`.

**UUIDs / IDs**
- **RFC 9562**, "Universally Unique IDentifiers (UUIDs)", **May 2024**, Standards Track, **obsoletes RFC 4122**. UUIDv7 layout: 48-bit `unix_ts_ms`, 4-bit `ver` (0b0111), 12-bit `rand_a`, 2-bit `var` (0b10), 62-bit `rand_b`. Three optional monotonicity methods: fixed-length counter, monotonic random, sub-ms precision (up to 12 bits). Spec's reason: non-time-ordered UUIDs "have poor database-index locality". — https://www.rfc-editor.org/rfc/rfc9562.html
- Postgres **18** has `uuidv7([shift interval])` (ms timestamp + sub-ms + random), `uuidv4()`, `gen_random_uuid()` (v4). 48-bit timestamp covers 1970 to ~year 10889. — https://www.postgresql.org/docs/18/functions-uuid.html
- Node: `crypto.randomUUIDv7([options])` added in **Node 26.1.0** and backported to **24.16.0 LTS (21 May 2026)**; release note says it "uses a non-monotonic clock". `crypto.randomUUID()` is v4. — https://nodejs.org/en/blog/release/v24.16.0 ; https://nodejs.org/api/crypto.html (v26.9.0)
- Snowflake (Twitter, 2010): 41-bit ms timestamp with custom epoch ("gives us 69 years"), 10-bit machine id (1024 machines), 12-bit sequence; "(Roughly) Time Ordered", k-sorted "within a reasonable bound (we're promising 1s, but shooting for 10's of ms)"; target ≥10k ids/s per process; "Snowflake protects from non-monotonic clocks" and refuses to generate while the clock is behind. — https://github.com/twitter-archive/snowflake/tree/snowflake-2010
- Instagram (2011): 41 bits time (ms, custom epoch **1314220021721** = 9 Sep 2011), 13 bits logical shard, 10 bits sequence "modulus 1024"; generated in PL/pgSQL, each logical shard is a Postgres schema; rejected UUIDs (128 bits, "no natural sort"), Snowflake ("additional complexity required to run an ID service"), Flickr ticket servers ("write bottleneck"). — https://instagram-engineering.tumblr.com/post/10853187575/sharding-ids-at-instagram/amp

**Caching**
- Facebook memcache: "demand-filled look-aside cache"; on write "sends a delete request to memcache … We choose to delete cached data instead of updating it because deletes are idempotent." Leases: 64-bit token per key on miss; server returns a token "only once every 10 seconds per key"; leases cut peak DB query rate on stampede-prone keys from **17K/s to 1.3K/s**. Invalidation daemon `mcsqueal` tails the DB commit log; "only 4% of all deletes issued result in the actual invalidation of cached data". Cold-cluster deletes carry a **2-second hold-off**. — NSDI 2013 PDF above.
- XFetch (Vattani, Chierichetti, Lowenstein, VLDB 2015): recompute early when `Time() − Δ·β·ln(rand()) ≥ expiry`, Δ = last recompute duration stored with the value, **β = 1 default**; exponential is shown optimal, uniform (Perl CHI) is not; β "needs not to depend on the rate of requests". — https://www.vldb.org/pvldb/vol8/p886-vattani.pdf
- **RFC 9111** (HTTP Caching, June 2022, obsoletes 7234): freshness order `s-maxage` (shared) → `max-age` → `Expires` → heuristic; heuristic "no more than some fraction of the interval since [Last-Modified] … typical setting … 10%"; `no-cache` = must revalidate before reuse, `no-store` = do not store; `immutable` is **RFC 8246**, not 9111. — https://www.rfc-editor.org/rfc/rfc9111.html
- **RFC 5861** (Informational, May 2010): `stale-while-revalidate=N`, `stale-if-error=N`. — https://www.rfc-editor.org/rfc/rfc5861.html
- Cloudflare defaults: "does not cache HTML or JSON by default" — caches by extension list; default edge TTL **120 min** for 200/206/301, **20 min** for 302/303, **3 min** for 404/410, other codes not cached; `max-age` wins over `Expires`; `private`, `no-store`, `no-cache`, `max-age=0` → not cached. — https://developers.cloudflare.com/cache/concepts/default-cache-behavior/

**Tail latency / hedging**
- Dean & Barroso, CACM Feb 2013: with 1-in-100 slow servers and a 100-server fan-out, **63%** of user requests exceed 1 s; at 1-in-10,000 and 2,000 servers, "almost one in five". Hedge after the **95th-percentile expected latency** → ~5% extra load. BigTable benchmark (1,000 keys, 100 servers): hedge after 10 ms cut 99.9th percentile **1,800 ms → 74 ms** with **2% more requests**. Tied requests: enqueue at two servers, each cancels the other on start; delay the second by 2× network RTT ("1ms or less"); overhead in disk utilisation <1%. — https://www.barroso.org/publications/TheTailAtScale.pdf

**Circuit breaker**
- Resilience4j defaults: `failureRateThreshold` 50%, `slowCallRateThreshold` 100%, `slowCallDurationThreshold` 60 000 ms, `permittedNumberOfCallsInHalfOpenState` 10, `slidingWindowType` COUNT_BASED, `slidingWindowSize` 100, `minimumNumberOfCalls` 100, `waitDurationInOpenState` 60 000 ms, `automaticTransitionFromOpenToHalfOpenEnabled` false. OPEN rejects with `CallNotPermittedException`. States CLOSED/OPEN/HALF_OPEN plus DISABLED/METRICS_ONLY/FORCED_OPEN. — https://resilience4j.readme.io/docs/circuitbreaker

**Load balancing**
- Envoy: weighted round robin; weighted least request = **P2C, `choice_count` 2 default** ("resistance to herding behavior"), full scan when weights differ; ring hash; Maglev (table size **65537** default); random ("performs better than round robin when no health checking" configured). — https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/load_balancers
- NGINX open source: default weighted round-robin; `least_conn`; `ip_hash` (first three IPv4 octets); `hash key [consistent]` (ketama); `random [two [least_conn]]`; passive checks `max_fails` default **1**, `fail_timeout` default **10s**; `backup`, `down`. `sticky` open-source since 1.29.6, `least_time` since 1.31.0; active `health_check`, `slow_start`, dynamic `zone` are commercial. — https://nginx.org/en/docs/http/ngx_http_upstream_module.html
- Kubernetes Service: DNS `<svc>.<ns>.svc.cluster.local`; ClusterIP is a virtual IP programmed by kube-proxy (iptables/IPVS/nftables) from EndpointSlices; `clusterIP: None` (headless) returns pod A/AAAA records; `sessionAffinity: ClientIP` with `timeoutSeconds` default **10800**. — https://kubernetes.io/docs/concepts/services-networking/service/
- Kubernetes Deployment RollingUpdate defaults `maxUnavailable` **25%**, `maxSurge` **25%**; `progressDeadlineSeconds` **600**; `minReadySeconds` 0; `revisionHistoryLimit` 10; `kubectl rollout undo`. — https://kubernetes.io/docs/concepts/workloads/controllers/deployment/

**Rate limiting**
- IETF `draft-ietf-httpapi-ratelimit-headers-11` (23 May 2026), still an active Internet-Draft, not an RFC. Fields: `RateLimit-Policy: "burst";q=100;w=60` and `RateLimit: "default";r=50;t=30` (`q` quota, `w` window s, `r` remaining, `t` seconds until reset, `pk` partition key). — https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/
- Cloudflare sliding window: `rate = prev_count × overlap_fraction + curr_count`; example 42×0.75+18 = 49.5 against a 50/min limit; on 400M requests **0.003%** wrongly allowed/blocked, no false positives; two counters per key in memcached via Twemproxy. — https://blog.cloudflare.com/counting-things-a-lot-of-different-things/
- Stripe (Tarjan, 30 Mar 2017): request rate limiter and concurrent-request limiter (token bucket in Redis); fleet usage load shedder (reserve a fraction, example 20%, for critical); worker utilisation load shedder with four priority classes (critical, POST, GET, test-mode). — https://stripe.com/blog/rate-limiters

**Object storage**
- S3: **strong read-after-write** for PUT/DELETE in all regions; single-key updates atomic; concurrent PUTs → "the request with the latest timestamp wins", "does not support object locking for concurrent writers"; bucket configuration is eventually consistent. — https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html
- Multipart: max object **48.8 TiB** (no longer 5 TB — verify at draft time, this is recent); parts 1–10,000; part size 5 MiB–5 GiB (last part unbounded below); recommend multipart at ≥100 MB. — https://docs.aws.amazon.com/AmazonS3/latest/userguide/qfacts.html
- Presigned URLs: bearer tokens, inherit the signer's permissions; max **7 days** with IAM user + SigV4, console 1 min–12 h, temp credentials expire with the credential (EC2 instance profile ~6 h; STS AssumeRole default 1 h); can be used multiple times until expiry; limit with `s3:signatureAge` bucket-policy condition; a download in progress at expiry continues. — https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html

**Search**
- Elasticsearch refresh interval default **1 s**, "but only on indices that have received one search request or more in the last 30 seconds"; refresh opens a new segment (search-visible), commit/flush is the durable step; hence "near real-time". — https://www.elastic.co/docs/manage-data/data-store/near-real-time-search

**Multi-region / DNS**
- DynamoDB global tables: multi-active; two modes, multi-Region eventual consistency (**MREC, default**, last-writer-wins) and multi-Region strong consistency (**MRSC**, same-account only); mode fixed at creation. — https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html
- Anycast: RFC 4786 / **BCP 126** (Dec 2006); routing "ought to be stable for substantially longer than the expected transaction time"; long-running flows have "more complex" failure modes; DNS over UDP is the model use. — https://www.rfc-editor.org/rfc/rfc4786.html

**Observability**
- W3C Trace Context, **Recommendation 23 Nov 2021**; `traceparent` = `version(1B)-trace-id(16B)-parent-id(8B)-trace-flags(1B)`, e.g. `00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01`; `tracestate` for vendor data. — https://www.w3.org/TR/trace-context/
- Four golden signals: latency, traffic, errors, saturation; "distinguish between the latency of successful requests and the latency of failed requests". — https://sre.google/sre-book/monitoring-distributed-systems/

**Deploy safety**
- SRE Workbook: "We define canarying as a partial and time-limited deployment of a change in a service and its evaluation"; evaluate per-version ("When we look at per-version breakdown, we can plainly see the errors the new version introduces"), i.e. canary vs control, not canary vs fleet; "we do not need a terribly large canary population in order to detect key critical conditions"; "Stack-rank the metrics … based on how well they indicate actual user-perceivable problems" and keep only the top few, tied to existing SLIs. No hard population-size number is given — do not invent one. — https://sre.google/workbook/canarying-releases/

**Real-time fan-out**
- Redis Pub/Sub is **at-most-once**: "If the subscriber is unable to handle the message (for example, due to an error or a network disconnect) the message is forever lost"; no persistence; use Streams for at-least-once. Sharded Pub/Sub (`SSUBSCRIBE`/`SPUBLISH`) since **Redis 7.0**, scoped to one shard so the cluster bus is not flooded. Subscribers receive messages in publish order. — https://redis.io/docs/latest/develop/pubsub/

**Patterns**
- BFF: "one experience, one BFF"; owned by the frontend team; term coined by Phil Calçado (SoundCloud); risk "lots of duplication between the BFFs", but "shared libraries are a prime source of coupling". — https://samnewman.io/patterns/architectural/bff/
- Strangler fig: Fowler, from a 2001 Queensland trip; renamed from "Strangler Application" to "Strangler Fig Application"; "begins with small additions … built on top of, yet separate to the legacy code base". — https://martinfowler.com/bliki/StranglerFigApplication.html

---

## 5. Could not verify

- **Fowler MonolithFirst, BoundedContext, ParallelChange, CircuitBreaker, BlueGreenDeployment; Hodgson "Feature Toggles"** — not fetched this session (time). All are stable martinfowler.com pages; cite, but re-read before quoting.
- **"~80 ms round trip across an ocean"** (12-01) — a folk number. Use a measured source (e.g. a cloud provider's inter-region latency table) or cut the number and say "tens of milliseconds".
- **S3 durability "11 nines"** and **S3 conditional writes (`If-None-Match`)** — not fetched; the 48.8 TiB max object size is new enough that the drafter should re-check the quotas page on build day.
- **Consul / etcd discovery specifics** — not fetched; page 03-07 uses Kubernetes DNS as the verified example and names Consul only.
- **Envoy retry budgets and hedging (`hedge_policy`)** — not fetched; page 04-02 states the retry-budget idea generically; if the drafter wants a concrete knob, verify Envoy's `retry_budget` in the cluster circuit-breaker docs.
- **Instagram engineering blog** — instagram-engineering.com refused the connection; verified from Instagram's own tumblr mirror (same author, same post), which is acceptable but note it.
- **Tail at Scale on research.google** — the abstract-page fetch returned numbers I could not trust; all numbers in §4 come from the full PDF at barroso.org instead.
- **Session-affinity failure "one IP = thousands of users behind carrier NAT"** — true by construction, but no single primary source; state it as reasoning, not as a cited fact.

---

## 6. Sources

- https://redis.io/docs/latest/develop/reference/eviction/ — eviction policies, sampling
- https://raw.githubusercontent.com/redis/redis/unstable/redis.conf — threading, defaults
- https://redis.io/docs/latest/operate/oss_and_stack/stack-with-enterprise/release-notes/redisce/redisos-8.0-release-notes/ — 8.0 changes, license
- https://redis.io/docs/latest/operate/oss_and_stack/stack-with-enterprise/release-notes/redisce/redisos-8.6-release-notes/ — 8.6, HOTKEYS, LRM
- https://www.rfc-editor.org/rfc/rfc9562.html — UUIDv7 spec
- https://www.postgresql.org/docs/18/functions-uuid.html — Postgres uuidv7()
- https://nodejs.org/api/crypto.html — Node randomUUIDv7
- https://nodejs.org/en/blog/release/v24.16.0 — v7 backport date
- https://github.com/twitter-archive/snowflake/tree/snowflake-2010 — Snowflake layout
- https://instagram-engineering.tumblr.com/post/10853187575/sharding-ids-at-instagram/amp — Instagram IDs
- https://www.usenix.org/system/files/conference/nsdi13/nsdi13-final170_update.pdf — memcache leases, invalidation
- https://www.vldb.org/pvldb/vol8/p886-vattani.pdf — XFetch formula
- https://www.rfc-editor.org/rfc/rfc9111.html — HTTP caching
- https://www.rfc-editor.org/rfc/rfc5861.html — stale-while-revalidate
- https://developers.cloudflare.com/cache/concepts/default-cache-behavior/ — CDN defaults
- https://nginx.org/en/docs/http/ngx_http_upstream_module.html — LB methods, checks
- https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/load_balancers — P2C, Maglev
- https://www.barroso.org/publications/TheTailAtScale.pdf — hedging numbers
- https://resilience4j.readme.io/docs/circuitbreaker — breaker defaults
- https://martinfowler.com/bliki/StranglerFigApplication.html — strangler fig
- https://samnewman.io/patterns/architectural/bff/ — BFF rule
- https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/ — RateLimit headers
- https://blog.cloudflare.com/counting-things-a-lot-of-different-things/ — sliding window
- https://stripe.com/blog/rate-limiters — four limiters
- https://kubernetes.io/docs/concepts/services-networking/service/ — discovery, DNS
- https://kubernetes.io/docs/concepts/workloads/controllers/deployment/ — rolling defaults
- https://www.rfc-editor.org/rfc/rfc4786.html — anycast caveats
- https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html — MREC/MRSC
- https://www.elastic.co/docs/manage-data/data-store/near-real-time-search — refresh interval
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html — presign expiry
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/qfacts.html — multipart limits
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html — S3 consistency
- https://www.w3.org/TR/trace-context/ — traceparent format
- https://sre.google/sre-book/monitoring-distributed-systems/ — golden signals
- https://sre.google/workbook/canarying-releases/ — canary definition, metrics
- https://redis.io/docs/latest/develop/pubsub/ — at-most-once, sharded
- https://research.google/pubs/the-tail-at-scale/ — citation only (abstract)
