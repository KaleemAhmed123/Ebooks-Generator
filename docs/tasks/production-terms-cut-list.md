# Production Terms — the cut

My call, not yours. Every dropped term below carries the rule it failed.
Argue with any of it — the reasons are there so you can.

| | Terms |
|---|---|
| Started with | 607 |
| Whole categories dropped | −33 (DSA 20, Git & GitHub 13) |
| Individual terms cut | −171 |
| **Kept** | **403** |
| New terms to write | +~57 |
| **Final** | **~460** |

## The rules I applied

| Rule | Meaning | Cut |
|---|---|---|
| `niche` | too rare to come up in a working year | 58 |
| `basic` | the reader already knows it cold | 57 |
| `dup` | another term already covers it | 30 |
| `thin` | nothing to say beyond the name | 10 |
| `toy` | a design-interview exercise, not production vocabulary | 4 |
| `dated` | the industry moved on | 4 |
| `vendor` | locked to one product, ages fast | 4 |
| `dated jargon` | nobody says this any more | 2 |
| `trivia` | quiz material, not working knowledge | 1 |
| `coined term, not in common use` | one author's coinage | 1 |

---

## What survived, by category

| Category | Kept | Cut | Already deep |
|---|---|---|---|
| System Design | 49 | 36 | 0 |
| AI Engineering | 49 | 22 | 49 |
| Reliability & Production | 35 | 13 | 0 |
| Distributed Systems | 26 | 6 | 0 |
| PostgreSQL & Prisma | 20 | 7 | 0 |
| LLMs & Inference | 20 | 8 | 20 |
| React & Next.js | 17 | 6 | 0 |
| Frontend & Browser | 15 | 6 | 0 |
| JavaScript & TypeScript | 14 | 8 | 0 |
| Observability | 14 | 6 | 0 |
| RAG & Vector Search | 14 | 4 | 14 |
| RabbitMQ & Messaging | 13 | 5 | 0 |
| Salesforce | 12 | 2 | 0 |
| Redis & Caching | 11 | 3 | 0 |
| Realtime, Sockets & WebRTC | 11 | 7 | 0 |
| Docker & Containers | 10 | 2 | 0 |
| AWS & Cloud | 10 | 2 | 0 |
| Security & Auth | 10 | 5 | 0 |
| Node.js & Express | 9 | 5 | 0 |
| Prompting & Agents | 9 | 3 | 9 |
| OCR & Document AI | 9 | 3 | 9 |
| MongoDB | 8 | 2 | 0 |
| Nginx & Networking | 8 | 5 | 0 |
| Python & FastAPI | 6 | 5 | 0 |
| Cost & FinOps | 3 | 0 | 0 |
| Testing & Quality | 1 | 0 | 0 |

---

## Every cut, with the reason

### System Design — 36 cut

- **Anycast & GeoDNS** — `niche`
- **Autocomplete Design** — `toy`
- **Chat System Design** — `toy`
- **Compaction** — `dup — LSM Tree vs B-Tree`
- **Design for Failure** — `thin`
- **Downsampling & Rollups** — `niche`
- **Encryption at Rest vs In Transit** — `basic`
- **Functional vs Non-Functional Requirements** — `thin`
- **Geospatial Indexing** — `niche`
- **Idempotency at the API Layer** — `dup — Idempotency, Idempotency Key`
- **Inventory Reservation** — `niche`
- **Load Balancer** — `basic`
- **News Feed Design** — `toy`
- **Normalisation** — `basic`
- **Object Storage vs Block vs File** — `basic`
- **OLTP vs OLAP** — `basic`
- **Peak-to-Average Ratio** — `dup — Back-of-the-Envelope Estimation`
- **Polyglot Persistence** — `dated jargon`
- **Push vs Pull Architecture** — `dup — Fan-Out on Write vs Read`
- **QPS Estimation** — `dup — Back-of-the-Envelope Estimation`
- **Rate Limiter Design** — `dup — Token Bucket, Leaky Bucket, Sliding Window Counter`
- **Read Amplification** — `niche`
- **Read:Write Ratio** — `dup — Back-of-the-Envelope Estimation`
- **Redundancy** — `thin`
- **Shared-Nothing Architecture** — `dated jargon`
- **Single Point of Failure** — `basic`
- **Star Schema** — `niche`
- **Stateless Service Design** — `basic`
- **Storage Estimation** — `dup — Back-of-the-Envelope Estimation`
- **Synchronous vs Asynchronous Communication** — `basic`
- **Time-Series Data Modelling** — `niche`
- **Traffic Replay** — `dup — Shadow Traffic`
- **URL Shortener Design** — `toy`
- **Vertical vs Horizontal Scaling** — `basic`
- **Workflow Engine** — `dup — DAG Orchestration`
- **Write Amplification** — `niche`

### AI Engineering — 22 cut

- **Active Learning** — `niche`
- **Benchmark Overfitting** — `niche`
- **Catastrophic Forgetting** — `niche — training-side`
- **Champion-Challenger** — `dup — Shadow Deployment for Models`
- **Conversation Summarisation Buffer** — `dup — Context Compression`
- **Data Contamination** — `niche`
- **DPO** — `niche — training-side, not API-side`
- **Feature Store** — `niche — classical ML, not LLM work`
- **Full Fine-Tune vs Adapter** — `niche — training-side`
- **GPU Utilisation & MFU** — `niche — self-hosting only`
- **Index Freshness** — `dup — Vector Index Rebuild`
- **Instruction Tuning** — `niche — training-side`
- **Inter-Annotator Agreement** — `niche`
- **Knowledge Distillation** — `niche — training-side`
- **Labelling Pipeline** — `niche`
- **Memory Compaction** — `dup — Context Compression`
- **Model Serving Framework** — `niche — self-hosting only`
- **Near-Duplicate Deduplication** — `niche`
- **Pairwise Preference Evaluation** — `niche`
- **Retrieval Cache Warming** — `dup — Prompt Caching, Semantic Caching`
- **RLHF** — `niche — training-side`
- **VRAM Budgeting** — `niche — self-hosting only`

### Reliability & Production — 13 cut

- **Fail Fast vs Fail Safe** — `thin`
- **Goodput** — `niche`
- **Latency** — `basic`
- **Little's Law** — `niche`
- **P99** — `dup — P50 / P95 / P99.9`
- **Queueing** — `basic`
- **Response Time** — `basic`
- **Rollback** — `basic`
- **Runbook** — `thin`
- **SLA** — `basic`
- **Throughput** — `basic`
- **Toil** — `thin`
- **Warm Start** — `dup — Cold Start`

### JavaScript & TypeScript — 8 cut

- **Closure** — `basic`
- **Declaration Merging** — `niche`
- **Prototype Chain** — `basic`
- **Structured Clone** — `niche`
- **Temporal Dead Zone** — `trivia`
- **Type Erasure** — `niche`
- **Type vs Interface** — `basic`
- **unknown vs any** — `basic`

### LLMs & Inference — 8 cut

- **Context Rot** — `coined term, not in common use`
- **Embedding** — `basic`
- **Prefill vs Decode** — `niche — inference-server internals`
- **Quantisation** — `niche — self-hosting only`
- **Speculative Decoding** — `niche — inference-server internals`
- **Streaming** — `basic`
- **Token** — `basic`
- **Token Throughput** — `dup — TTFT, Cost per Request`

### PostgreSQL & Prisma — 7 cut

- **ACID** — `basic`
- **CTE** — `basic`
- **Index** — `basic`
- **Prisma Accelerate / Data Proxy** — `vendor`
- **Sequential Scan vs Index Scan** — `dup — EXPLAIN ANALYZE`
- **Transaction Wraparound** — `niche`
- **Window Function** — `basic`

### Realtime, Sockets & WebRTC — 7 cut

- **ICE** — `niche — WebRTC internals`
- **Jitter Buffer** — `niche — video only`
- **Long Polling** — `dated`
- **SDP Offer/Answer** — `niche — WebRTC internals`
- **Simulcast** — `niche — video only`
- **STUN** — `niche — WebRTC internals`
- **WebSocket** — `basic`

### Distributed Systems — 6 cut

- **Cell-Based Architecture** — `niche`
- **Consensus** — `dup — Quorum, Leader Election`
- **Gossip Protocol** — `niche`
- **PACELC** — `niche — CAP Theorem covers it`
- **Two-Phase Commit** — `dated — Saga Pattern replaced it in practice`
- **Vector Clock** — `niche — academic`

### React & Next.js — 6 cut

- **Batching** — `niche — React internals`
- **Code Splitting** — `basic`
- **Controlled vs Uncontrolled** — `basic`
- **Key Prop** — `basic`
- **Middleware** — `thin`
- **Suspense** — `dup — Streaming SSR`

### Frontend & Browser — 6 cut

- **Box Model** — `basic`
- **Flexbox vs Grid** — `basic`
- **Lazy Loading Images** — `basic`
- **Progressive Enhancement** — `dated`
- **Specificity** — `basic`
- **Tailwind JIT & Purge** — `vendor — version-specific`

### Observability — 6 cut

- **Cardinality Explosion in Logs** — `dup — Cardinality`
- **Exemplars** — `niche`
- **Log Level Discipline** — `thin`
- **Observability** — `thin — names the category`
- **Structured Logging** — `basic`
- **Three Pillars** — `dated — contested model`

### Node.js & Express — 5 cut

- **Body Parser Limit** — `niche`
- **CORS** — `basic`
- **dotenv / 12-Factor Config** — `basic`
- **Helmet / Security Headers** — `vendor`
- **Keep-Alive** — `dup — HTTP Keep-Alive to Upstream`

### Python & FastAPI — 5 cut

- **Context Manager** — `basic`
- **Dependency Injection** — `basic`
- **Generator** — `basic`
- **Pydantic Model** — `basic`
- **Virtual Environment** — `basic`

### RabbitMQ & Messaging — 5 cut

- **Fanout Amplification** — `niche`
- **Lazy Queue** — `vendor — removed in RabbitMQ 4`
- **Priority Queue** — `niche`
- **Pub/Sub vs Queue** — `basic`
- **Transactional Outbox vs Dual Write** — `dup — Outbox Pattern`

### Nginx & Networking — 5 cut

- **Gzip / Brotli** — `basic`
- **Head-of-Line Blocking in HTTP** — `dup — Head-of-Line Blocking`
- **Rate Limiting in Nginx** — `dup — the rate limiting family`
- **Reverse Proxy** — `basic`
- **TLS Termination** — `basic`

### Security & Auth — 5 cut

- **Authentication vs Authorization** — `basic`
- **Password Hashing** — `basic`
- **Principle of Least Privilege** — `dup — Least Privilege`
- **Rate Limiting as Security** — `dup — the rate limiting family`
- **SQL Injection** — `basic`

### RAG & Vector Search — 4 cut

- **Chunk Overlap** — `dup — Chunking Strategy`
- **Cosine Similarity vs Dot Product** — `basic`
- **IVF / Product Quantisation** — `niche — index internals`
- **Multi-Tenancy in Vector DBs** — `dup — Multi-Tenancy Models`

### Redis & Caching — 3 cut

- **Cache Hit Ratio** — `basic`
- **Redis Keyspace Notifications** — `niche`
- **Redis Streams** — `niche — real brokers do this better`

### Prompting & Agents — 3 cut

- **Chain of Thought** — `basic`
- **Few-Shot Prompting** — `basic`
- **System Prompt** — `basic`

### OCR & Document AI — 3 cut

- **Binarisation** — `niche — image preprocessing internals`
- **Handwriting Recognition** — `niche`
- **Skew & Deskew** — `niche — image preprocessing internals`

### MongoDB — 2 cut

- **Document Model** — `basic`
- **Replica Set** — `basic`

### Docker & Containers — 2 cut

- **Container vs VM** — `basic`
- **Init Container / Entrypoint Ordering** — `niche — Kubernetes-flavoured`

### AWS & Cloud — 2 cut

- **Idempotent Infrastructure** — `thin`
- **Load Balancer Target Group Health** — `niche`

### Salesforce — 2 cut

- **Big Objects vs Standard Objects** — `niche`
- **Selective Query & Skinny Index** — `niche`

---

## Everything kept

### System Design — 49

API Versioning · Active-Active vs Active-Passive · Anti-Corruption Layer · Async Request-Reply · Audit Log Design · Availability Math · Back-of-the-Envelope Estimation · Backfill Strategy · Backward vs Forward Compatibility · Bounded Context · Capacity Headroom · Choreography vs Orchestration · Chunked & Resumable Upload · Coupling vs Cohesion · Cursor vs Offset Pagination · DAG Orchestration · Data Residency · Data Retention & Right to Erasure · Data Warehouse vs Data Lake vs Lakehouse · DataLoader Batching · Database per Service · Denormalisation · Distributed ID Generation · ETL vs ELT · Envelope Encryption · Hot / Warm / Cold Tiering · Inverted Index · Job Scheduling & Cron Reliability · LSM Tree vs B-Tree · Media Processing Pipeline · Modular Monolith · Monolith vs Microservices · Multi-Region Architecture · Multi-Tenancy Models · Noisy Neighbour · Notification System Design · Payment Ledger Design · Quota & Metering · RBAC vs ABAC · REST vs GraphQL vs gRPC · RPO vs RTO · Read Replica Routing · Schema Registry · Search Architecture · Shadow Traffic · Soft Delete vs Hard Delete · Tokenisation · Webhook Design · Zero-Downtime Migration

### AI Engineering — 49

Abstention Policy · Agent Budget Cap · Batch vs Online Inference · Confidence Calibration · Context Compression · Cost per Successful Task · Data Flywheel · Deterministic Replay · Document Parsing Pipeline · Embedding Drift · Evaluation Harness · Human Feedback Loop · Ingestion Pipeline · Jailbreak Testing · LLMOps · Latency Budget for AI Features · LoRA & PEFT · Model Deprecation Migration · Model Gateway · Model Registry · Model Version Pinning · Model Warmup · Multi-Provider Fallback · Multimodal Input Handling · Offline vs Online Evaluation · Output Schema Repair · PII Redaction Pipeline · Prompt Compression · Prompt Registry · Prompt Versioning · Provider Rate Limit Handling · Quality Monitoring in Production · Red Teaming · Refusal Rate · Regression Suite for Prompts · Retry with Reformulation · Rubric-Based Scoring · Safety Classifier · Seed & Reproducibility · Self-Consistency · Semantic Router · Shadow Deployment for Models · Spend Circuit Breaker · Synthetic Data Generation · Task Decomposition · Token Accounting · Tool Sandboxing · Train-Serve Skew · Vector Index Rebuild

### Reliability & Production — 35

Backpressure · Blameless Postmortem · Blast Radius · Blue-Green Deployment · Bulkhead · Burn Rate · Cache Stampede · Canary Deployment · Chaos Engineering · Circuit Breaker · Cold Start · Error Budget · Exactly-Once Delivery · Exponential Backoff with Jitter · Feature Flag · Forward-Only Migration · Graceful Degradation · Head-of-Line Blocking · Hedged Request · Idempotency · Idempotency Key · Leaky Bucket · Load Shedding · MTTR / MTBF · P50 / P95 / P99.9 · Rate Limiting · Retry Storm · Rolling Deployment · SLI · SLO · Sliding Window Counter · Tail Latency Amplification · Thundering Herd · Timeout Budget · Token Bucket

### Distributed Systems — 26

API Gateway · Backend for Frontend · CAP Theorem · CQRS · Change Data Capture · Clock Skew · Consistent Hashing · Distributed Lock · Event Sourcing · Eventual Consistency · Fan-Out on Write vs Read · Fencing Token · Hot Partition · Leader Election · Outbox Pattern · Quorum · Read-Your-Writes Consistency · Replication Lag · Saga Pattern · Service Discovery · Service Mesh · Sharding · Sidecar Pattern · Split Brain · Strangler Fig Pattern · Strong Consistency

### PostgreSQL & Prisma — 20

Composite Index Order · Connection Pooling · Covering Index · Deadlock · EXPLAIN ANALYZE · Isolation Level · JSONB · MVCC · Materialized View · N+1 Query · Optimistic Locking · Partial Index · Point-in-Time Recovery · Prisma $transaction · Prisma Migrate · Prisma include vs select · SELECT ... FOR UPDATE · Table Partitioning · VACUUM / Autovacuum · Write-Ahead Log

### LLMs & Inference — 20

Batching & Continuous Batching · Context Window · Cost per Request · Eval / Golden Set · Eval Drift · Fine-Tuning vs RAG vs Prompting · Function Calling / Tool Use · Grounding · Guardrails · Hallucination · Indirect Prompt Injection · KV Cache · LLM-as-Judge · Model Routing · Prompt Caching · Prompt Injection · Semantic Caching · Structured Output · TTFT · Temperature / Top-p

### React & Next.js — 17

Client Boundary · Error Boundary · Hydration · Hydration Mismatch · ISR · Optimistic Update · Reconciliation · Referential Equality · Route Handler vs Server Action · Server Actions · Server Components · Stale Closure · Static vs Dynamic Rendering · Streaming SSR · Virtualisation · Waterfall Fetching · useMemo vs useCallback

### Frontend & Browser — 15

Accessibility Tree · CSRF · Content Security Policy · Cookie Attributes · Core Web Vitals · Critical Rendering Path · Cumulative Layout Shift · Debounced Input vs Controlled Re-render · Design Tokens · Layout Thrashing · Preload / Prefetch / Preconnect · Reflow vs Repaint · Same-Origin Policy · Stacking Context · XSS

### JavaScript & TypeScript — 14

Debounce vs Throttle · Discriminated Union · Event Loop · Exhaustiveness Check · Generic Constraint · Memory Leak · Microtask vs Macrotask · Structural Typing · Tree Shaking · Type Narrowing · Utility Types · WeakMap / WeakRef · Zod / Runtime Schema Validation · satisfies

### Observability — 14

Alert Fatigue · Cardinality · Correlation ID · Counter vs Gauge vs Histogram · Distributed Tracing · Golden Signals · Grafana Dashboard Discipline · Histogram Quantiles Don't Average · RED Method · Sampling · Span & Trace Context · Symptom-Based Alerting · USE Method · rate() vs increase()

### RAG & Vector Search — 14

ANN vs Exact Search · Chunking Strategy · Contextual Retrieval · Embedding Model Migration · Groundedness / Faithfulness Score · HNSW · Hybrid Search · Metadata Filtering · Parent-Child / Small-to-Big Retrieval · Query Rewriting / HyDE · Recall@k vs Precision@k · Reciprocal Rank Fusion · Reranking · Retrieval Evaluation Set

### RabbitMQ & Messaging — 13

Competing Consumers · Consumer Acknowledgement · Consumer Lag · Dead Letter Queue · Exchange / Binding / Routing Key · Idempotent Consumer · Message Ordering · Message Schema Evolution · Poison Message · Prefetch / QoS · Publisher Confirms · Quorum Queue · Retry with Delay Queue

### Salesforce — 12

Asynchronous Apex · Bulkification · Field-Level Security & CRUD Checks · Governor Limits · Governor-Safe Integration Pattern · Mixed DML Exception · One Trigger Per Object · Platform Events · SOQL vs SOSL · Sharing Model · Test Coverage Requirement · Trigger Context Variables

### Redis & Caching — 11

Bloom Filter · Cache Invalidation · Cache-Aside · Hot Key · Multi-Level Cache · Negative Caching · Redis Persistence · Redis Pipelining · Redis Transactions vs Lua · TTL & Eviction Policy · Write-Through vs Write-Behind

### Realtime, Sockets & WebRTC — 11

Fan-Out Broadcast Cost · Heartbeat / Ping-Pong · Message Buffering & Replay · Presence · Reconnection with Backoff · Rooms & Namespaces · SFU vs Mesh · Server-Sent Events · Socket.io Adapter · Sticky Sessions · TURN

### Docker & Containers — 10

CPU Throttling · Distroless / Slim Base · Docker Compose vs Orchestrator · Ephemeral Filesystem · Health Check vs Readiness · Image Layer & Cache · Image Tag Immutability · Layer Bloat & .dockerignore · Multi-Stage Build · Resource Limits & OOMKill

### AWS & Cloud — 10

Auto Scaling Group · CloudFront / CDN · IAM Role vs User · Lambda Cold Start & Provisioned Concurrency · Least Privilege · Presigned URL · Region vs Availability Zone · S3 Consistency & Versioning · Secrets Manager vs Env Vars · VPC / Subnet / Security Group

### Security & Auth — 10

Access Token vs Refresh Token · IDOR · JWT · OAuth 2.0 Authorization Code + PKCE · SSRF · Secret Rotation · Session vs Token Auth · Supply Chain Attack · Timing Attack & Constant-Time Compare · mTLS

### Node.js & Express — 9

Blocking the Event Loop · Cluster / PM2 · Connection Pool Exhaustion · Error-Handling Middleware · Graceful Shutdown · Middleware Chain · Streams / Backpressure in Node · Unhandled Rejection · Worker Threads

### Prompting & Agents — 9

Agent Loop · Agent Observability · Context Engineering · Human in the Loop · Idempotent Tool Design · Memory · Multi-Agent Orchestration · ReAct Pattern · Tool Schema Design

### OCR & Document AI — 9

Bounding Box & Spatial Extraction · Document Classification · Ground Truth Set · Human-in-the-Loop Review Queue · Key-Value Extraction · Layout Analysis · OCR Confidence Score · Page-Level Parallelism · Table Extraction

### MongoDB — 8

Aggregation Pipeline · Change Streams · Compound Index & ESR Rule · Embed vs Reference · Read Concern · Sharded Cluster · Working Set · Write Concern

### Nginx & Networking — 8

DNS TTL & Propagation · HTTP Keep-Alive to Upstream · Idle Timeout Mismatch · TCP Handshake & TLS Handshake · X-Forwarded-For / Real IP · proxy_pass & Trailing Slash · upstream & Load Balancing Method · worker_processes & worker_connections

### Python & FastAPI — 6

ASGI vs WSGI · BackgroundTasks vs Celery · GIL · Type Hints Are Not Enforced · Uvicorn Workers · async def vs def in FastAPI

### Cost & FinOps — 3

Egress Cost · NAT Gateway Cost · Spot vs On-Demand vs Reserved

### Testing & Quality — 1

Contract Testing

