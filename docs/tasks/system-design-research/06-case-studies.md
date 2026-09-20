# 06 — Case Studies: research output

Booklet: `06-case-studies`. Rough-file coverage: §1 (mental model), §49–53. The
rough file has the 9-step structure and one notification sketch; everything
else here is new research. Date of truth: 2026-09-19/20.

Page count landed: **110** (Part 1 method: 9 pages; Part 2 designs: 101 pages
across 17 designs — 16 named in the brief plus proximity search folded as a
variant module, see "kept and cut").

Cross-reference convention: `→01` `→02` `→03` `→04` `→05` name the fundamentals
booklet a page leans on. A design page states the mechanism in one line and
points to the fundamentals page; it never re-teaches it.

## Which designs were kept and which were cut, and why

### How "actually asked" was checked

- Hello Interview problem-breakdown list (Easy / Medium / Hard tiers) — the
  most current public bank, maintained by ex-FAANG interviewers.
- Hello Interview's Meta write-up: Meta System Design round asks *Ad Click
  Aggregator, Top K, FB Live Comments*; Meta Product Architecture round asks
  *Ticketmaster, Uber, Newsfeed, Leetcode*.
- Blind, Meta E6 thread (Jun–Jul 2024): ad click aggregator, news feed,
  leaderboard, Uber, Twitter search, Leetcode with leaderboard, Ticketmaster,
  Top K, YouTube, Yelp, Messenger, proximity service, web crawler.
- Blind, Meta 2025 thread: DoorDash, video storage and delivery.
- Exponent question bank (SWE, system design, sorted by activity, fetched
  2026-09-19): Instagram, TikTok, TinyURL, Distributed LRU cache (Google,
  Walmart, Stripe), log-ordering system, S3 (JPM, Amazon), webhook delivery.
- Alex Xu vol 1 (ch 4–15) and vol 2 (ch 1–13) tables of contents.
- Google's careers site publishes no system-design-specific guidance; Glassdoor
  pages are login-gated and were not usable. Both noted under "could not verify".

### Kept (17 modules)

| # | Design | Why it earns its place | Unique mechanisms it teaches |
|---|---|---|---|
| 1 | URL shortener | Universal warm-up; Exponent top-3; Xu v1 ch8 | base-62 ID vs hash, 301 vs 302, read-heavy cache |
| 2 | Rate limiter | Xu v1 ch4; HI medium; asked at Amazon, Stripe, Uber, Atlassian (Blind) | token bucket vs sliding window, distributed counters, fail-open |
| 3 | Distributed cache | HI medium; Exponent "Distributed LRU cache" (Google, Stripe) | consistent hashing in a client, eviction, thundering herd, leases |
| 4 | Notification system | Xu v1 ch10; HI medium; the rough file's own example | fan-out to providers, retries, DLQ, dedupe, provider fallback |
| 5 | Chat (WhatsApp / Messenger / Discord) | Xu v1 ch12; HI medium; Meta E6 | stateful WebSocket gateways, per-channel ordering, wide-column bucketing |
| 6 | News feed (FB / Twitter / Instagram) | Xu v1 ch11; HI medium; Exponent #1 (Instagram); Meta both rounds | fan-out on write vs read, celebrity hybrid, ranking stage |
| 7 | Ride matching (Uber) + proximity (Yelp) | HI hard (Uber) + easy (Yelp); Meta E6; Xu v2 ch1–2 | geo indexing (geohash / quadtree / H3), moving-object writes, matching lock |
| 8 | Video upload and streaming (YouTube) | Xu v1 ch14; HI medium; Meta 2025 | chunked upload, transcoding DAG, adaptive bitrate, CDN pre-positioning |
| 9 | File sync (Dropbox / Drive) | Xu v1 ch15; HI easy | content-addressed blocks, metadata vs blob split, sync conflicts |
| 10 | Payment system (Stripe) | Xu v2 ch11–12; HI hard | idempotency keys end to end, double-entry ledger, PSP webhooks, reconciliation |
| 11 | Ticket booking (Ticketmaster) + hotel | HI medium; Meta E6; Xu v2 ch7 | inventory locking, reservation TTL, virtual waiting room, overselling |
| 12 | Search autocomplete | Xu v1 ch13 | trie / FST, precomputed top-k per prefix, prefix sharding |
| 13 | Web crawler | Xu v1 ch9; HI hard; Meta E6 | URL frontier, politeness, dedupe with Bloom filter, robots.txt rules |
| 14 | Metrics and logging pipeline | Xu v2 ch5; HI hard | push vs pull, time-series compression, cardinality, downsampling |
| 15 | Ad-click aggregation | Xu v2 ch6; HI hard; Meta SD round | idempotent events, windowed aggregation, exactly-once vs reconcile |
| 16 | Top-K / leaderboard | HI hard (YouTube Top K); Xu v2 ch10; Meta SD round, E6 | count-min sketch, per-window heaps, sorted sets, merge of partials |
| 17 | Collaborative editing (Google Docs) | HI hard; asked at Google | OT vs CRDT, one authority per doc, offline replay |

### Cut

- **Key-value store (Xu v1 ch6)** — every mechanism (consistent hashing,
  quorum, hinted handoff, vector clocks, Merkle anti-entropy) is booklet 02/03
  material. A KV-store module would repeat them. The distributed-cache module
  points to →02/→03 for the replication and quorum pages.
- **Unique ID generator (Xu v1 ch7)** — one page inside URL shortener
  (`02-03`) plus →05 ID-generation pages. Not a 5-page design.
- **Distributed message queue (Xu v2 ch4)** — is booklet 04. Cut.
- **S3-like object store (Xu v2 ch9)** — reported (JPM, Amazon) but its
  mechanisms (chunking, erasure coding, metadata/blob split) are covered by
  file sync + →05 blob storage. One page in file sync notes the difference.
- **Hotel reservation (Xu v2 ch7)** — same problem as Ticketmaster (finite
  inventory, double-booking). Folded as the "date-range inventory" variant
  page inside ticket booking.
- **Proximity search (Yelp)** — kept, but as two pages inside the Uber module,
  because the only new mechanism is static-vs-moving geo indexing.
- **Stock exchange (Xu v2 ch13)** — specialised (matching engine, sequencer,
  microsecond latency). Rarely reported outside fintech. Cut; named in the
  method module as an example of "when the interviewer wants a single-node
  deterministic core".
- **Email service (Xu v2 ch8)** — rarely reported; no distinct mechanism
  beyond notification + blob storage. Cut.
- **Google Maps (Xu v2 ch3)** — routing/tiling is a niche; cut.
- **Nearby friends (Xu v2 ch2)** — folded into the Uber module's
  moving-object page as the pub/sub variant.
- **Job scheduler, flash sale, live comments, online auction, LeetCode,
  Tinder, Strava, price tracker (HI list)** — real questions, but each is a
  recombination: job scheduler = delayed queue + leader election (→04, →05);
  flash sale = ticket booking; live comments = chat fan-out; auction =
  ticket-booking locking + leaderboard. The method module has one page
  ("Every question is a recombination") mapping these onto the 17.
- **ChatGPT / LLM inference serving (HI hard, 2025–26 trend)** — real and
  rising, but the mechanisms (GPU batching, KV-cache, streaming tokens) are
  outside this series' fundamentals. Cut, noted under "belongs elsewhere".

## 1. Modules and pages

### Module 01 — The method (9 pages)

- `01-01-what-is-graded` — What the interviewer grades — four things: navigate the problem, design a working system, technical depth, communicate; level changes the depth expected, not the list — failure: a perfect memorised design with no requirements pass scores "junior" — table
- `01-02-the-45-minutes` — The 45 minutes — requirements 5, entities+API 5, high-level 15, deep dive 15, wrap 5; the rough file's 9 steps map onto these — failure: still asking questions at minute 10 — svg (timeline)
- `01-03-requirements` — Clarify requirements — 3 functional in, everything else explicitly out; non-functional as numbers (p99, availability, consistency) — failure: "it should be scalable" is not a requirement — table
- `01-04-numbers-fast` — Do the numbers in two minutes — DAU × actions/day ÷ 86 400 ≈ QPS; peak ×3–5; storage = writes × size × retention; →01 latency table — failure: computing to three significant figures — code (TS calculator)
- `01-05-api-and-entities` — API and entities before boxes — name the nouns, then one endpoint per requirement; idempotency and pagination decided here — failure: designing storage before knowing the write shape — table
- `01-06-high-level-first` — High-level design and buy-in — one path per requirement through client → edge → service → store; get agreement before deep dive — failure: fifteen boxes and no request traced end to end — svg
- `01-07-pick-the-deep-dive` — Pick the deep dive — the non-functional requirement that is hardest to meet is the deep dive; say why out loud — failure: deep-diving the part you know, not the part that is hard — table
- `01-08-failure-and-tradeoffs` — Failure handling and trade-offs — for every arrow: timeout, retry, idempotency, fallback; every choice named with what it costs (→01, §49 five questions) — failure: "we'd add a queue" without saying what happens to the message when the consumer dies — svg (§51 failure map)
- `01-09-recombination` — Every question is a recombination — job scheduler, flash sale, live comments, auction, DoorDash mapped onto the 17 designs — failure: treating an unseen prompt as a new problem — table

### Module 02 — URL shortener (5 pages)

- `02-01-shortener-requirements` — Requirements and numbers — 100:1 read:write, 7 chars base-62 = 3.5 × 10^12 keys, storage per row — failure: sizing for writes when reads dominate — table
- `02-02-shortener-api-data` — API and data model — `POST /urls`, `GET /:code`; row = code, long URL, owner, expiry; index on code only — failure: storing the long URL as the primary key — code
- `02-03-shortener-keys` — Key generation — counter + base-62 (→05 ID gen; Snowflake layout 41+10+12) vs hash + collision check vs pre-generated key table — failure: MD5 truncation collides at scale; counter leaks volume — table
- `02-04-shortener-redirect` — The redirect and the cache — 301 vs 302 vs 308 (RFC 9110: 301/308 heuristically cacheable, 302 not); cache-aside on code (→05) — failure: 301 means you never see the click again — code
- `02-05-shortener-tradeoffs` — What the interviewer probes — custom aliases, expiry sweep, abuse, analytics without slowing redirect (→04 async) — failure: synchronous analytics write on the redirect path — none

### Module 03 — Rate limiter (6 pages)

- `03-01-limiter-requirements` — Requirements and numbers — per-user/per-IP/per-key; ~10 µs decision budget; where it sits (gateway →05) — failure: limiting after the expensive work — svg
- `03-02-limiter-algorithms` — Token bucket, leaky bucket, fixed window — burst behaviour of each in one table — failure: fixed window allows 2× at the boundary — table + code (TS token bucket)
- `03-03-limiter-sliding-window` — Sliding window approximation — Cloudflare formula `prev × (T − elapsed)/T + cur`; measured 0.003 % wrong decisions — failure: exact sliding log costs O(requests) memory — code
- `03-04-limiter-distributed` — Distributed counters — Redis INCR + EXPIRE in one Lua script; counters per PoP, not global (Cloudflare) — failure: race between INCR and EXPIRE without atomicity — code
- `03-05-limiter-failure` — When the limiter store is down — fail-open vs fail-closed, local fallback bucket — failure: limiter outage becomes a full outage — svg
- `03-06-limiter-tradeoffs` — What the interviewer probes — 429 + `Retry-After`, client-side hints, per-tenant fairness, hot keys (→02) — failure: one key on one shard takes the cluster down — table

### Module 04 — Distributed cache (6 pages)

- `04-01-cache-requirements` — Requirements and numbers — hit ratio target, memory per node, p99 sub-ms; what is cached and for how long — failure: caching without a hit-ratio number to defend — table
- `04-02-cache-placement` — Client-side sharding by consistent hashing — the client, not a router, picks the node (→02 consistent hashing); virtual nodes — failure: naive modulo re-homes every key on resize — svg
- `04-03-cache-eviction` — Eviction — Redis policies (allkeys-lru, lfu, volatile-ttl, noeviction); approximate LRU with 5 samples — failure: `noeviction` returns errors at the memory line — table
- `04-04-cache-thundering-herd` — Thundering herd and leases — FB memcache lease token on miss; request coalescing (Discord data service) — failure: hot key expires, thousands of misses hit the DB at once — svg
- `04-05-cache-consistency` — Keeping cache and DB in step — write DB then delete key (look-aside); stale-set race; TTL as backstop (→05 invalidation) — failure: delete-before-write reorders and pins a stale value — svg
- `04-06-cache-tradeoffs` — What the interviewer probes — replication of cache nodes, cold start, hot keys copied to N nodes, LRU vs LFU — failure: a cache restart that takes the DB down with it — table

### Module 05 — Notification system (6 pages)

- `05-01-notify-requirements` — Requirements and numbers — channels (push, SMS, email, in-app), 10M/day, at-least-once, soft-realtime — failure: promising exactly-once delivery to a phone — table
- `05-02-notify-api-data` — API and data model — `POST /notifications` with idempotency key; templates, preferences, per-device tokens — failure: no opt-out table means legal trouble, not a bug — code
- `05-03-notify-high-level` — High-level design — API → queue per channel → workers → provider; the rough file's sketch, drawn properly (→04) — failure: one queue for all channels lets SMS backlog delay push — svg
- `05-04-notify-deep-dive` — Deep dive: retries and dedupe — per-provider timeout, backoff with jitter, DLQ, dedupe on notification id at the worker (→01, →04) — failure: retry storm doubles every message — svg
- `05-05-notify-failure` — Provider is down — circuit breaker per provider (→05), fallback provider, rate cap per provider — failure: fallback provider gets the whole burst and also falls — svg
- `05-06-notify-tradeoffs` — What the interviewer probes — priority lanes, batching digests, tracking delivery state, APNs/FCM do not guarantee delivery — failure: counting "sent to provider" as "delivered" — table

### Module 06 — Chat (6 pages)

- `06-01-chat-requirements` — Requirements and numbers — 1:1 and groups, online presence, message history; write per message ≈ recipients; Discord: trillions of messages — failure: sizing groups as 1:1 — table
- `06-02-chat-connections` — Stateful connections — WebSocket per client on a gateway; connection registry (user → gateway) in Redis; gateway is stateful, service is not — failure: a load balancer that round-robins WebSocket reconnects — svg
- `06-03-chat-storage` — Message storage — wide-column key `((channel_id, bucket), message_id)`; Snowflake ids sort by time; Discord buckets ≈ 10 days / < 100 MB — failure: unbounded partition for a busy channel (hot partition) — code
- `06-04-chat-ordering-delivery` — Ordering and delivery receipts — per-channel order from id; sent / delivered / read as separate events; at-least-once + client dedupe (→04) — failure: global ordering across channels is neither needed nor possible — svg
- `06-05-chat-groups-fanout` — Group fan-out and presence — fan-out on write to online members' gateways; heartbeat-based presence with TTL — failure: presence heartbeats out-number messages — svg
- `06-06-chat-tradeoffs` — What the interviewer probes — end-to-end encryption vs server search, offline queue per device, large groups (Discord request coalescing, ScyllaDB p99 15 ms) — failure: read-before-write tombstones (Discord's 12 per message) — table

### Module 07 — News feed (6 pages)

- `07-01-feed-requirements` — Requirements and numbers — post, follow, read feed; read ≫ write; feed page = 20 posts; Twitter 2012: 300K timeline QPS, 800-entry cache cap — failure: designing for the write path first — table
- `07-02-feed-api-data` — API and data model — `POST /posts`, `GET /feed?cursor=`; posts, follows (both directions), feed cache list per user (→02 partitioning) — failure: offset pagination on a feed that shifts — code
- `07-03-feed-fanout-write` — Fan-out on write — post → follower list → push id into each follower's cached list; bounded list — failure: a user with 10M followers = 10M cache writes per post — svg
- `07-04-feed-fanout-read` — Fan-out on read and the hybrid — pull at read time for celebrities, merge at the edge; threshold by follower count — failure: pulling for everyone makes every read O(followees) — svg
- `07-05-feed-ranking` — Ranking stage — candidate sources (in-network ≈ 50 % at X), light ranker, heavy ranker, filters; ranking is a stage after retrieval, not instead of it — failure: ranking every candidate with the heavy model — svg
- `07-06-feed-tradeoffs` — What the interviewer probes — inactive users (skip fan-out), deletes and edits in cached lists, media in posts (→05 CDN), consistency of "I posted but do not see it" — failure: fan-out queue lag shows as a "lost" post — table

### Module 08 — Ride matching and proximity (7 pages)

- `08-01-uber-requirements` — Requirements and numbers — riders request, drivers stream location every ~4 s, match in < 10 s; Uber: billions of trips/month, 10 000+ cities — failure: treating location updates as ordinary writes — table
- `08-02-geo-indexing` — Geo indexing choices — geohash (prefix = neighbourhood, edge effects), quadtree (adaptive density), H3 (16 resolutions, hexes have one neighbour distance) — failure: bounding box query on lat/lng columns with no spatial index — table + svg
- `08-03-proximity-static` — Proximity for static places (Yelp variant) — geohash prefix in a B-tree or PostGIS; precomputed cells; read-heavy so cache by cell — failure: querying only the user's cell and missing the neighbour across the boundary — svg
- `08-04-moving-drivers` — Moving objects — location updates go to memory (Redis GEO or in-process index by cell), not the DB; nearby-friends variant = pub/sub per cell — failure: writing 1M drivers × 15 updates/min to Postgres — svg
- `08-05-matching-lock` — Matching — offer to one driver at a time with a TTL lock; state machine per trip; Uber moved the trip state to Spanner for cross-entity transactions — failure: two riders matched to the same driver under an AP store (Uber's own reason to leave Ringpop) — code
- `08-06-uber-failure` — Failure — driver app disconnects mid-offer, region outage, duplicate request from rider retry (→01 idempotency) — failure: offer timeout shorter than the mobile network's tail — svg
- `08-07-uber-tradeoffs` — What the interviewer probes — surge by cell (H3), ETA service, hotspot cells (→02), consistency vs availability for the match — failure: 20 online drivers per core because sharding lived in the app (Uber's number) — table

### Module 09 — Video upload and streaming (6 pages)

- `09-01-video-requirements` — Requirements and numbers — upload, transcode, stream; 1 hour of 1080p ≈ several GB in, many renditions out; view ≫ upload — failure: estimating storage from source size only — table
- `09-02-video-upload` — Resumable chunked upload — presigned URLs straight to blob storage (→05), chunk manifest, resume by chunk — failure: uploading through the API servers — svg
- `09-03-video-transcode` — Transcoding as a DAG — split → per-segment encode in parallel → per-rendition → package; idempotent tasks on a queue (→04) — failure: one 4-hour job on one worker — svg
- `09-04-video-streaming` — Adaptive bitrate streaming — HLS/DASH manifests, segments of a few seconds, the client picks the rendition; per-title ladders — failure: one bitrate ladder for cartoons and sport alike — svg
- `09-05-video-cdn` — Delivery — CDN edge; Netflix Open Connect puts appliances inside ISPs and fills them nightly off-peak — failure: origin serves the long tail and the first viewers of a viral upload — svg
- `09-06-video-tradeoffs` — What the interviewer probes — metadata store sharding (YouTube uses Vitess over MySQL), view counts (→ top-K module), DRM, copyright fingerprint step in the DAG — failure: view-count write per view on the metadata row — table

### Module 10 — File sync (6 pages)

- `10-01-sync-requirements` — Requirements and numbers — upload/download, sync across devices, share; most edits touch a small part of a file — failure: re-uploading the whole file on every save — table
- `10-02-sync-blocks` — Content-addressed blocks — 4 MB blocks, SHA-256 per block, file = blocklist (Dropbox); dedupe falls out for free — failure: block boundary at fixed offsets shifts every block after an insert — code
- `10-03-sync-metadata-vs-blob` — Metadata store vs block store — metadata (namespace, path, blocklist, version) in a relational store; blocks in object storage (→05 blob) — failure: putting file bytes in the database — svg
- `10-04-sync-protocol` — The sync protocol — client hashes, asks which blocks the server lacks, uploads only those, then commits metadata; streaming sync lets downloaders prefetch before commit — failure: commit before blocks are durable — svg
- `10-05-sync-conflicts` — Conflicts — version vector or server sequence per file; conflicting edit makes a "conflicted copy", never a silent merge (→03) — failure: last-writer-wins deleting a colleague's afternoon — svg
- `10-06-sync-tradeoffs` — What the interviewer probes — notifications via long-poll vs WebSocket, sharing and permissions, S3-like store as the underlying block store, encryption at rest — failure: polling 100M clients every second — table

### Module 11 — Payment system (7 pages)

- `11-01-pay-requirements` — Requirements and numbers — pay-in, pay-out, refunds; correctness over latency; every cent reconciles — failure: designing for throughput when the requirement is "never lose or double a cent" — table
- `11-02-pay-api-idempotency` — API with idempotency keys — `Idempotency-Key` on every POST; server stores status + body per key; Stripe prunes after ≥ 24 h and rejects reuse with different params (→01) — failure: key scoped per endpoint but not per account — code
- `11-03-pay-ledger` — Double-entry ledger — every movement is two rows that sum to zero; append-only; balances are derived — failure: an updatable `balance` column — code
- `11-04-pay-psp-flow` — The PSP flow — create intent → redirect/collect → PSP callback (webhook) → mark paid; webhooks are at-least-once, so the handler is idempotent (→04) — failure: trusting the client's "payment succeeded" — svg
- `11-05-pay-state-machine` — Payment state machine — created → authorised → captured → settled / failed / refunded; transitions are the only writes — failure: a retry that re-runs "capture" on a captured payment — svg
- `11-06-pay-reconciliation` — Reconciliation — nightly compare of ledger vs PSP settlement file; discrepancies to a queue for humans — failure: assuming exactly-once so no reconciliation exists — svg
- `11-07-pay-tradeoffs` — What the interviewer probes — retries with backoff + jitter (Stripe), outbox for "payment succeeded" events (→04), PCI scope (never store PAN), multi-currency — failure: publishing the event before the commit — table

### Module 12 — Ticket booking (6 pages)

- `12-01-tickets-requirements` — Requirements and numbers — browse, hold, buy; 100 000 users at on-sale minute for 10 000 seats; no double-sell — failure: sizing for average traffic — table
- `12-02-tickets-data-model` — Data model — event, seat, seat_status, booking; one row per seat, status is the invariant — failure: a `seats_remaining` counter with no per-seat row — code
- `12-03-tickets-hold` — Holding a seat — `SELECT … FOR UPDATE` on the seat row (Postgres, →03), or `SET NX EX` in Redis with TTL; hold expires — failure: hold in the app's memory that dies with the pod — code
- `12-04-tickets-waiting-room` — Virtual waiting room — admit N users/minute with a token; queue position is a number, not a connection — failure: letting 100 000 users hit the seat map at once — svg
- `12-05-tickets-hotel-variant` — Date-range inventory (hotel variant) — inventory per room-type per night; overbooking as a deliberate percentage; optimistic version column — failure: locking the room type instead of the night — table
- `12-06-tickets-tradeoffs` — What the interviewer probes — seat map cache with short TTL, payment timeout vs hold TTL, bots, `SKIP LOCKED` for worker queues (Postgres docs: queue-like tables only) — failure: hold TTL shorter than the payment page — table

### Module 13 — Search autocomplete (5 pages)

- `13-01-suggest-requirements` — Requirements and numbers — top 5 suggestions per keystroke in < 100 ms; queries ≫ updates; suggestions refreshed hourly not per query — failure: querying the search index on every keystroke — table
- `13-02-suggest-trie` — Trie with precomputed top-k per node — each node stores its top-k; lookup = walk prefix, read list — failure: recomputing top-k by walking the subtree per request — svg + code
- `13-03-suggest-build` — Building the trie offline — aggregate query logs (→04 stream/batch), build, snapshot, swap; Elasticsearch's completion suggester does the same with an in-memory FST — failure: updating the live trie per query — svg
- `13-04-suggest-sharding` — Sharding by prefix — first one or two characters, weighted by letter frequency; replicas for reads — failure: "s" and "x" on equal shards — table
- `13-05-suggest-tradeoffs` — What the interviewer probes — personalisation, trending in minutes, filtering, client debounce and browser cache — failure: no debounce, 10 requests per word — table

### Module 14 — Web crawler (6 pages)

- `14-01-crawler-requirements` — Requirements and numbers — 1B pages/month ≈ 400 pages/s; average page size; storage of HTML only; politeness — failure: designing a scraper for one site — table
- `14-02-crawler-frontier` — URL frontier — priority queues (front) and per-host queues (back) so one host is never hit in parallel; the Mercator split — failure: BFS with one queue hammers one host — svg
- `14-03-crawler-fetch-parse` — Fetch and parse — DNS cache, timeouts, content-type checks, link extraction; robots.txt per host, cached ≤ 24 h, 5xx = disallow everything (RFC 9309) — failure: treating a 5xx on robots.txt as "allowed" — code
- `14-04-crawler-dedupe` — Dedupe — seen-URL set with a Bloom filter (→05), content fingerprint for duplicate pages — failure: `?utm=` variants crawled as new pages — svg
- `14-05-crawler-failure` — Traps and failure — spider traps (depth limit), crawler restart (frontier checkpoint), worker death (lease on URL) — failure: a calendar page that generates infinite next-month links — table
- `14-06-crawler-tradeoffs` — What the interviewer probes — freshness re-crawl policy, JS rendering, distribution by host hash, being blocked — failure: recrawling everything at one rate — table

### Module 15 — Metrics and logging pipeline (6 pages)

- `15-01-metrics-requirements` — Requirements and numbers — 10M time series, 10 s scrape, 1-year retention; write-heavy, query-recent-heavy — failure: sizing storage without downsampling — table
- `15-02-metrics-data-model` — Data model — series = name + label set; sample = (t, value); cardinality is the cost — failure: user id as a label — table
- `15-03-metrics-push-vs-pull` — Push vs pull — Prometheus pulls over HTTP, node is autonomous, no distributed storage; push via agents + Kafka for logs (→04) — failure: pull for short-lived jobs — svg
- `15-04-metrics-storage` — Time-series storage — in-memory recent window, delta-of-delta timestamps and XOR values (Gorilla idea), blocks on disk, cold in object storage — failure: a row per sample in Postgres — svg
- `15-05-metrics-downsample-alert` — Downsampling and alerting — rollups (10 s → 1 min → 1 h); alert rules evaluated on the hot window; Prometheus is not for billing-grade accuracy — failure: alert evaluation reading cold storage — svg
- `15-06-metrics-tradeoffs` — What the interviewer probes — logs vs metrics vs traces, log indexing cost, sampling, retention tiers (→05 observability) — failure: indexing every log field — table

### Module 16 — Ad-click aggregation (6 pages)

- `16-01-adclick-requirements` — Requirements and numbers — count clicks per ad per minute, top-N ads per minute; 1B clicks/day ≈ 12 000/s avg; correctness matters (billing) — failure: "approximately right" for money — table
- `16-02-adclick-ingest` — Ingestion — click event with a unique id, appended to a log partitioned by ad id (→04); raw log kept — failure: aggregating without keeping the raw events — svg
- `16-03-adclick-windowing` — Windowed aggregation — tumbling 1-minute windows on event time, watermark for late clicks (→04 event time) — failure: processing time windows shift counts between minutes — svg
- `16-04-adclick-exactly-once` — Exactly-once, really — dedupe on click id inside the window; Google Photon joins query and click logs with eventual exactly-once, < 10 s latency, millions of events/min — failure: consumer restart double-counts a partition — svg
- `16-05-adclick-reconcile` — Reconciliation — nightly batch over the raw log recomputes; stream result is provisional, batch is final (the lambda idea) — failure: no batch path, so drift is never caught — svg
- `16-06-adclick-tradeoffs` — What the interviewer probes — hot ads (→02 hot partitions), OLAP store choice for queries, fraud filter position, query API — failure: one ad id owns one partition — table

### Module 17 — Top-K and leaderboard (5 pages)

- `17-01-topk-requirements` — Requirements and numbers — top 100 videos by views in the last 1 min / 1 h / 1 day; exact for small K, approximate for the stream — failure: one requirement covering both exact and approximate — table
- `17-02-topk-exact-sorted-set` — Exact leaderboard — Redis sorted set, `ZADD` O(log N), `ZREVRANGE` for the top; one key per board — failure: a global sorted set of 1B members on one node — code
- `17-03-topk-count-min` — Approximate heavy hitters — count-min sketch (fixed memory, over-estimates only) + min-heap of K — failure: a hash map of every id in memory — svg
- `17-04-topk-windows-merge` — Windows and merging — per-partition top-K per minute, merged upstream; hourly = merge of 60 minute results (approximate) — failure: merging partial top-Ks is not exact and must be said — svg
- `17-05-topk-tradeoffs` — What the interviewer probes — ties, decay, sharding by id and merging, when to fall back to batch for the exact daily answer — failure: promising exact top-K over a sharded stream — table

### Module 18 — Collaborative editing (6 pages)

- `18-01-docs-requirements` — Requirements and numbers — many editors, sub-second propagation, offline edits merge, history; one doc = hundreds of writers, not millions — failure: designing for scale across docs when the hard part is inside one doc — table
- `18-02-docs-ot` — Operational transformation — ops (insert/delete at index) transformed against concurrent ops; needs a central sequencer; Google Docs model — failure: transformation cases explode without a single authority — svg
- `18-03-docs-crdt` — CRDTs — ops commute by construction (unique ids per character); no sequencer; Figma uses last-writer-wins per property with the server as authority — failure: CRDT metadata grows with every character ever typed — svg
- `18-04-docs-server` — One authority per document — doc pinned to one server (Figma), WebSocket to clients, ops journaled then broadcast (→03 consistency) — failure: two servers accepting ops for the same doc — svg
- `18-05-docs-offline-history` — Offline and history — client replays its op log on reconnect; snapshots every N ops; undo must not overwrite others' edits (Figma) — failure: undo that reverts a colleague's change — svg
- `18-06-docs-tradeoffs` — What the interviewer probes — cursor presence, permissions, large docs, OT vs CRDT choice defended by "do you have a server or not" — failure: picking CRDT for a centralised product and paying the metadata cost for nothing — table

Page total: 9 + 5 + 6 + 6 + 6 + 6 + 6 + 7 + 6 + 6 + 7 + 6 + 5 + 6 + 6 + 6 + 5 + 6 = **110**.

## 2. What the rough file missed

- **What is actually graded** — the rough file says "scale + data + failures + consistency + trade-offs"; interviewers publish four competencies (problem navigation, solution design, technical excellence, communication) and grade depth by level. https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction
- **Time budget** — a 45-minute round has a fixed shape (Meta: 45 min, no code, whiteboard). Xu: 3–10 / 10–15 / 10–25 / 3–5 min. Hello Interview: 5 / 2 / 5 / 10–15 / 10. https://www.metacareers.com/blog/preparing-for-your-software-engineering-interview-at-meta/
- **Amazon's own six words** — "Practicality, Accuracy, Efficiency, Reliability, Optimization, Scalability"; expect at least one design question; ask questions to validate the design. https://amazon.jobs/content/en/how-we-hire/sde-iii-interview-prep
- **Meta splits the round** — System Design (infra: ad click aggregator, top-K, live comments) vs Product Architecture (Ticketmaster, Uber, newsfeed). https://www.hellointerview.com/blog/meta-system-vs-product-design
- **All 17 designs** — absent from the rough file. Sources per design are in §4 and §6.
- **Idempotency keys as a full mechanism** (store status + body per key, prune, reject mismatched params) — the rough file has the word, not the design. https://docs.stripe.com/api/idempotent_requests
- **Sliding-window rate limiting with a measured error** — the rough file lists "rate limiting" as a row in a table. https://blog.cloudflare.com/counting-things-a-lot-of-different-things/
- **Leases against thundering herd** — the cache failure that every "add a cache" answer must handle. https://www.usenix.org/system/files/conference/nsdi13/nsdi13-final170_update.pdf
- **Hot partitions in a real chat store** — Discord's bucket-by-time key and request coalescing. https://discord.com/blog/how-discord-stores-trillions-of-messages
- **Why an AP in-memory design was replaced by a transactional store** — Uber's fulfillment rewrite is the best public "consistency vs availability, decided by the workload" case. https://www.uber.com/en-US/blog/building-ubers-fulfillment-platform/
- **Content-addressed sync** — 4 MB blocks, SHA-256, blocklist. https://dropbox.tech/infrastructure/streaming-file-synchronization
- **robots.txt rules that change a crawler's design** — 5xx = full disallow, 24 h cache, 500 KiB parse limit. https://www.rfc-editor.org/rfc/rfc9309.html
- **OT vs CRDT decided by "is there a server"** — Figma's reasoning. https://www.figma.com/blog/how-figmas-multiplayer-technology-works/
- **Exactly-once for money at stream scale is join + dedupe + eventual** — Photon. https://research.google/pubs/photon-fault-tolerant-and-scalable-joining-of-continuous-data-streams/
- **Redirect status codes in the shortener** — 301/308 cacheable by heuristic, 302 not, 307/308 keep the method. https://www.rfc-editor.org/rfc/rfc9110.html
- **Redis eviction is sampled, not exact LRU** — 5 samples by default; `noeviction` errors; LFU since 4.0, LRM since 8.6. https://redis.io/docs/latest/develop/reference/eviction/

## 3. What the rough file has that should be cut or moved

- **§1 mental-model diagram** — keep the idea, redraw as `01-06`. The DB/messaging/cache split is fine; the original draws no request path.
- **§49 five questions** — good; fold into `01-08` as the failure checklist. Not a page of its own.
- **§50 CAP/consistency ladder** — belongs in booklet 03. The rough file itself calls it "not a perfect mathematical ordering"; do not print a wrong ladder.
- **§51 failure map** — `01-08` diagram. Keep.
- **§52 9-step structure** — keep, but map onto the 45-minute budget (`01-02`); nine equal steps in 45 minutes is not how the round runs.
- **§52 notification sketch** — becomes Module 05. The sketch's "SMS provider is down → timeout, retry, backoff, DLQ, fallback, idempotency" is exactly `05-04` and `05-05`.
- **§53 topics table** — every row is booklet 05 (LB, gateway, caching, CDN, rate limiting, ID gen, observability), 02 (sharding, replication, consistent hashing), 03 (locks, leader election), 04 (queues, streams, outbox, saga). Nothing in it is a case-study page.
- **§54–55 LLD list** — out of the series by decision. The LLD list names rate limiter, cache, URL shortener, notification system, pub/sub; those are HLD questions here and the LLD (class-diagram) treatment is not.
- **§56–62 study order / cheat sheets** — not book content.

## 4. Facts to get right

Each verified 2026-09-19/20 against the linked page.

**Method**
- Meta design interview: 45 minutes, "almost never involve coding", whiteboard. https://www.metacareers.com/blog/preparing-for-your-software-engineering-interview-at-meta/
- Amazon SDE III: six objectives "Practicality, Accuracy, Efficiency, Reliability, Optimization, Scalability"; "Expect at least one question on software systems design." https://amazon.jobs/content/en/how-we-hire/sde-iii-interview-prep
- Amazon SDE II online assessment: 20 minutes of system design scenarios after two coding questions. https://amazon.jobs/content/en/how-we-hire/sde-ii-interview-prep
- Hello Interview framework: Requirements ~5 min, Core Entities ~2, API ~5, Data Flow (optional) ~5, High Level 10–15, Deep Dives ~10; four competencies; "mid-level: cover the basics well but not into great depth; senior: quickly work through the basics leaving time for deep dives". https://www.hellointerview.com/learn/system-design/in-a-hurry/delivery and /introduction
- Alex Xu framework (vol 1 ch 3): Step 1 understand problem and scope 3–10 min; Step 2 high-level design and buy-in 10–15; Step 3 deep dive 10–25; Step 4 wrap up 3–5. (Verified via a chapter summary that quotes the book, not the book itself — see §5.) https://levendlee.com/2023/12/20/chapter-3-a-framework-for-system-design-interviews/
- Xu vol 1 chapters 4–15 and vol 2 chapters 1–13 as listed under "kept and cut". https://blog.bytebytego.com/p/system-design-interview-books-volume

**URL shortener**
- RFC 9110: 301 and 308 — "A cache MAY use a heuristic to determine freshness"; 302 and 307 not cacheable by default; 307/308 preserve method and body, 301/302 may change POST to GET. https://www.rfc-editor.org/rfc/rfc9110.html
- Snowflake (2010): 64-bit id; 41 bits ms timestamp with custom epoch (69 years); 10 bits machine (1024); 12 bits sequence (4096/ms); "k-sorted within a reasonable bound (promising 1 s, shooting for 10s of ms)". https://github.com/twitter-archive/snowflake/tree/snowflake-2010

**Rate limiter**
- Cloudflare (2017-06-07): `rate = prev × ((T − elapsed)/T) + cur`; over 400M requests from 270K sources, 0.003 % wrongly allowed or limited, average 6 % rate error, zero false positives; counters in memcached per PoP via Twemproxy consistent hashing. https://blog.cloudflare.com/counting-things-a-lot-of-different-things/

**Distributed cache**
- Redis eviction policies: noeviction, allkeys-lru, allkeys-lrm, allkeys-lfu, allkeys-random, volatile-lru, volatile-lrm, volatile-lfu, volatile-random, volatile-ttl; LRU/LFU are sampled (`maxmemory-samples 5`); LFU since 4.0 (Morris counter, decay 1 min default); LRM since 8.6; 64-bit default `maxmemory` 0 = unlimited. https://redis.io/docs/latest/develop/reference/eviction/
- Facebook memcache (NSDI 2013): look-aside (miss → DB → set; write → DB → delete key); leases handle thundering herd and stale sets. https://www.usenix.org/system/files/conference/nsdi13/nsdi13-final170_update.pdf

**Chat**
- Discord 2017: key `((channel_id, bucket), message_id)`, bucket ≈ 10 days, partition < 100 MB; Snowflake ids sort by time; ~12 unnecessary tombstones per message before writing only non-null columns. https://discord.com/blog/how-discord-stores-billions-of-messages
- Discord 2023-03-06: 177 Cassandra nodes → 72 ScyllaDB nodes; historical fetch p99 40–125 ms → 15 ms; insert p99 5–70 ms → 5 ms; Rust data services with request coalescing routed by channel-id consistent hash; migrator 3.2M messages/s, 9 days. https://discord.com/blog/how-discord-stores-trillions-of-messages

**News feed**
- Twitter "Timelines at Scale" (QCon SF 2012, InfoQ 2013): the talk is the source for hybrid push/pull, Redis timeline cache with an 800-entry cap, ~300K timeline QPS, 150M active users. The InfoQ page confirms the talk and date; the numbers come from the slides/recording, which I could not text-extract — see §5. https://www.infoq.com/presentations/Twitter-Timeline-Scalability/
- X "the-algorithm" README: home-mixer builds the timeline; Earlybird supplies in-network posts, "~50% of posts come from this candidate source"; light-ranker in Earlybird, heavy-ranker neural net after candidate sourcing. https://github.com/twitter/the-algorithm

**Ride matching**
- H3 (2018-06-27): 16 resolutions (0–15), each finer cell 1/7 the area; 122 base cells, 12 pentagons over water; hexagon has one centre-to-neighbour distance; used for surge by cell. https://www.uber.com/blog/h3/
- Uber fulfillment (2021-09-29): Ringpop/Redis app-level sharding had hotspots, "only 20 online drivers/couriers per core", and an AP model whose saga compensations left inconsistent entities; moved to Spanner for external consistency and multi-row transactions; billions of transactions/day, billions of trips/month, 10 000+ cities; post-commit events via at-least-once LATE. https://www.uber.com/en-US/blog/building-ubers-fulfillment-platform/

**Video**
- Netflix Open Connect: appliances embedded in ISP networks at no cost; pre-filled for the region (1–2 weeks); nightly fills over settlement-free peering. https://openconnect.netflix.com/en/

**File sync**
- Dropbox (2014-07-10): 4 MB blocks, SHA-256 per block, file identified by blocklist; streaming sync prefetches blocks before the metadata commit; up to 2× theoretical, ~25 % measured on 1.2/5 Mbps. https://dropbox.tech/infrastructure/streaming-file-synchronization

**Payments**
- Stripe API docs: `Idempotency-Key` header; saves status code and body of the first request, including 500s; keys ≤ 255 chars; pruned after at least 24 h; reuse with different parameters errors; only POST accepts keys. https://docs.stripe.com/api/idempotent_requests
- Stripe blog (2017-02-22, Brandur Leach): exponential backoff 2^n with jitter to avoid thundering herd on recovery. https://stripe.com/blog/idempotency

**Ticket booking**
- PostgreSQL `SELECT … FOR UPDATE`: `NOWAIT` errors instead of waiting; `SKIP LOCKED` skips locked rows and "provides an inconsistent view of the data, so this is not suitable for general purpose work, but can be used to avoid lock contention with multiple consumers accessing a queue-like table." https://www.postgresql.org/docs/current/sql-select.html

**Web crawler**
- RFC 9309 (Sep 2022): parse limit MUST be ≥ 500 KiB; 4xx on robots.txt → may access any resource; 5xx → MUST assume complete disallow; SHOULD NOT cache > 24 h unless unreachable. https://www.rfc-editor.org/rfc/rfc9309.html

**Metrics**
- Prometheus: pull over HTTP; series identified by metric name + label pairs; single nodes autonomous, no distributed storage; "If you need 100% accuracy, such as for per-request billing, Prometheus is not a good choice." https://prometheus.io/docs/introduction/overview/

**Ad click**
- Photon (SIGMOD 2013): joins search queries with ad clicks; no duplicates in joined output, exactly-once eventually; millions of events/min at peak; average end-to-end latency < 10 s. https://research.google/pubs/photon-fault-tolerant-and-scalable-joining-of-continuous-data-streams/

**Top-K**
- Redis `ZADD`: O(log N) per item; scores are doubles, exact integers to ±2^53; equal scores order lexicographically. https://redis.io/docs/latest/commands/zadd/

**Collaborative editing**
- Figma (2019-10-16): rejected OT as "unnecessarily complex for our problem space"; last-writer-wins per object property with the server as authority; one server process per document; WebSocket; offline edits reapplied on reconnect; redo must not change the document after undo-copy-redo. https://www.figma.com/blog/how-figmas-multiplayer-technology-works/

## 5. Could not verify

- **Google's official system-design guidance.** Google's careers "how we hire" pages did not return interview-round content to a fetch; job posts only list topic areas (distributed computing, large-scale system design). Everything about Google rounds in this file comes from third-party prep sites and is not cited as fact.
- **Glassdoor question reports** — login-gated; not used.
- **Hello Interview's "real interview questions" database** — the page renders client-side; only the count (13 249 reports) and the company filter list (Meta, Amazon, Google, OpenAI, Anthropic) were visible. The problem-breakdown tiers were used instead.
- **Alex Xu's per-step minutes** — verified only through a summary that quotes the book. The book itself is not online. Treat the minutes as "from the book via a summary".
- **Twitter timeline numbers (300K QPS, 800 entries, 150M users, ~5 s fan-out)** — the InfoQ talk exists and is dated, but the numbers are in the video/slides; text extraction failed. Use with "from Twitter's 2012 QCon talk" attribution or cut the exact numbers.
- **Gorilla paper numbers (1.37 bytes/point, 12× compression, 26-hour window)** — PDF fetched but text not extractable in this session. The `15-04` page should cite the paper for the delta-of-delta/XOR idea and only use numbers after a fresh read: https://www.vldb.org/pvldb/vol8/p1816-teller.pdf
- **Netflix per-title encoding** — techblog returned 403. The `09-04` claim "one ladder for all content is wrong" needs the post fetched at draft time: https://netflixtechblog.com/per-title-encode-optimization-7e99442b62a2
- **WhatsApp / Slack connection counts per server** — not fetched; not cited.
- **Ticketmaster's own architecture** — Ticketmaster publishes no engineering account; the waiting-room mechanism is drawn from general practice and Cloudflare's Waiting Room product docs would be the primary source to cite at draft time.
- **Count-min sketch error bounds (ε, δ)** — paper not fetched; `17-03` should cite Cormode & Muthukrishnan 2005 after reading it.
- **YouTube on Vitess** — widely stated on vitess.io; not fetched here. Verify at draft time or drop the name.
- **Discord "hot partition" p99 numbers before/after** — verified; but the 2017 "12 nodes" cluster size came from the 2023 post's summary of history, not the 2017 post.

## 6. Sources

- https://www.hellointerview.com/learn/system-design/problem-breakdowns/overview — question tiers
- https://www.hellointerview.com/learn/system-design/in-a-hurry/delivery — step timings
- https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction — grading competencies
- https://www.hellointerview.com/blog/meta-system-vs-product-design — Meta round split
- https://www.hellointerview.com/community/questions?type=SYSTEM_DESIGN&sort=popular — report count only
- https://blog.bytebytego.com/p/system-design-interview-books-volume — Xu chapter lists
- https://levendlee.com/2023/12/20/chapter-3-a-framework-for-system-design-interviews/ — Xu step minutes
- https://www.metacareers.com/blog/preparing-for-your-software-engineering-interview-at-meta/ — Meta format
- https://amazon.jobs/content/en/how-we-hire/sde-iii-interview-prep — Amazon criteria
- https://amazon.jobs/content/en/how-we-hire/sde-ii-interview-prep — Amazon OA format
- https://www.teamblind.com/post/meta-e6-system-design-interview-questions-qquump5y — reported questions
- https://www.teamblind.com/post/Meta-System-design-questions-2025-ANodVgHq — reported questions
- https://www.tryexponent.com/questions?role=swe&type=system-design — question frequency
- https://discord.com/blog/how-discord-stores-billions-of-messages — chat schema
- https://discord.com/blog/how-discord-stores-trillions-of-messages — hot partitions
- https://www.uber.com/blog/h3/ — geo indexing
- https://www.uber.com/en-US/blog/building-ubers-fulfillment-platform/ — AP to Spanner
- https://www.infoq.com/presentations/Twitter-Timeline-Scalability/ — fan-out talk
- https://github.com/twitter/the-algorithm — feed ranking
- https://github.com/twitter-archive/snowflake/tree/snowflake-2010 — ID layout
- https://stripe.com/blog/idempotency — retries, jitter
- https://docs.stripe.com/api/idempotent_requests — key semantics
- https://blog.cloudflare.com/counting-things-a-lot-of-different-things/ — sliding window
- https://dropbox.tech/infrastructure/streaming-file-synchronization — block sync
- https://www.usenix.org/system/files/conference/nsdi13/nsdi13-final170_update.pdf — memcache leases
- https://www.figma.com/blog/how-figmas-multiplayer-technology-works/ — OT vs CRDT
- https://www.rfc-editor.org/rfc/rfc9309.html — robots.txt rules
- https://www.rfc-editor.org/rfc/rfc9110.html — redirect codes
- https://redis.io/docs/latest/develop/reference/eviction/ — eviction policies
- https://redis.io/docs/latest/commands/zadd/ — sorted set cost
- https://research.google/pubs/photon-fault-tolerant-and-scalable-joining-of-continuous-data-streams/ — exactly-once join
- https://openconnect.netflix.com/en/ — CDN appliances
- https://prometheus.io/docs/introduction/overview/ — pull model
- https://www.postgresql.org/docs/current/sql-select.html — FOR UPDATE, SKIP LOCKED
- https://www.vldb.org/pvldb/vol8/p1816-teller.pdf — Gorilla (fetched, unread)
- https://netflixtechblog.com/per-title-encode-optimization-7e99442b62a2 — per-title (403)

## Belongs elsewhere

- LLM inference serving / "design ChatGPT" — outside the series' fundamentals; own booklet or skip.
- Distributed message queue design — booklet 04.
- Key-value store internals (quorum, hinted handoff, anti-entropy) — booklets 02 and 03.
- Unique ID generation — booklet 05.
- CAP/consistency ladder (§50) — booklet 03.
