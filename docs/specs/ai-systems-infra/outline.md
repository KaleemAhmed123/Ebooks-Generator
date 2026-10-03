# The Infrastructure Engineer — full series scaffold

This is the page-level plan for the whole series. A future session should be able
to read this + `../ai-systems-infra.md` (the spec) and start writing any booklet
with zero re-derivation. Page counts here are **floors, not ceilings** (per the
no-size-cap rule) — split further wherever an idea needs it.

## Conventions

- **Folder:** `books/tech/ai-systems-infra/<NN-slug>/` with `pages/` + `meta.json`.
- **Page file:** `MM-PP-slug.md` — `MM` = module number inside the booklet, `PP` = page inside the module. Files sort lexically, so keep two digits.
- **`##` is the page topic** (goes in the contents). `#` is only the module/booklet title on a module-opener page. `###` = sub-point, off contents. Continuation pages carry **no heading**.
- **Blocks available (this series):** `:::mint` (centred diagram/formula), `:::note` (aside), `:::warn` (failure mode), `:::interview` (bold Q then plain A — two paragraphs), `:::lab` (hands-on, local/free first), `:::incident` (debug-this drill).
- **Every substantial page** folds in the teaching pattern where it fits: what → why → mental model → internals → connects-to → production example → common mistake (`:::warn`) → when-not → `:::interview` → `:::lab`. Not every page needs all ten; the module as a whole must cover them.
- **Each module closes** with a page or tail: Key concepts → practical task → questions → checkpoint → what's next.
- **Diagrams:** hand-written inline `<svg>` for anything with flow/structure/>3 parts. Scoped automatically by the build.
- **Research rule:** re-verify version-specific facts against primary sources at write time; stable concepts need no version tag. See "Verified facts" in the spec.

## Accent palette (per booklet — set in each booklet's `meta.json` `cover.accent`)

| Booklet | Accent | Note |
|---|---|---|
| Volume | `#1f487e` | deep blue (series) |
| 01 Linux & Machine | `#3a3f58` | slate |
| 02 Networking | `#0f6e6e` | teal |
| 03 Distributed Systems | `#1f487e` | deep blue |
| 04 Data Systems | `#6a4c93` | purple |
| 05 AWS | `#8a5a00` | dark amber |
| 06 Kubernetes | `#2a5db0` | k8s blue |
| 07 IaC & Platform | `#5c4b8a` | indigo |
| 08 Observability & SRE | `#a63d57` | rose |
| 09 GPU & AI Infra | `#2f7d4f` | green |
| 10 Serving & AI Platform | `#0b7285` | cyan-teal |
| 11 Security | `#7a2e2e` | dark red |
| 12 Architecture & Capstones | `#333a45` | graphite |
| 13 Interview Bank | `#3d5a80` | steel blue |

---

## Booklet 01 — Linux & the Machine Underneath  (`01-linux-machine`, slate)

**Promise:** after this, "why is it OOM-killed / slow / timing out" bottoms out in something you can actually see.
**Assume/compress:** reader uses Docker daily and writes Node/Python — so compress "what is a shell", lean on their async intuition for epoll.
**Cut:** writing kernel modules, C systems programming drills, distro trivia.

**M01 · What your program stands on**
- `01-01-why-the-machine-matters` — ## Why the machine matters — the layered picture (syscall → kernel → scheduler → memory → hardware); every prod mystery lands here. SVG: the stack.
- `01-02-a-process-is-the-unit` — ## A process is the unit — address space + threads + fds; fork/exec; the process tree; PID 1.
- `01-03-user-vs-kernel-space` — ## User space vs kernel space — the privilege boundary, syscalls as the only door, mode switch cost.

**M02 · The CPU and the scheduler**
- `02-01-how-the-scheduler-shares-the-cpu` — ## How the scheduler shares the CPU — run queue, time slice, context-switch cost, run/sleep/zombie. (Verify: **EEVDF since Linux 6.6**, replaced CFS.)
- `02-02-load-average-is-not-utilisation` — ## Load average is not utilisation — the classic misread; runnable+uninterruptible vs busy.
- `02-03-threads-processes-and-the-gil-tax` — ## Threads, processes, and the context-switch tax — when more threads make it slower; ties to their Node single-thread model.

**M03 · Memory and why pods die**
- `03-01-virtual-memory` — ## Virtual memory — virtual vs physical, pages, the MMU, page tables. SVG: virtual→physical mapping.
- `03-02-the-page-cache-rss-vsz` — ## Page cache, RSS, VSZ — what "memory used" actually means; why free looks scary.
- `03-03-the-oom-killer` — ## The OOM killer — overcommit, `oom_score`, and **why a pod gets OOMKilled**; cgroup memory limits preview. `:::incident`.
- `03-04-swap-and-why-k8s-disables-it` — ## Swap, and why Kubernetes disabled it — thrashing, the latency cliff.

**M04 · I/O, files, and concurrency**
- `04-01-everything-is-a-file-descriptor` — ## Everything is a file descriptor — fds, the fd table, limits (`ulimit`), "too many open files". `:::warn`.
- `04-02-blocking-vs-nonblocking` — ## Blocking vs non-blocking I/O — the readiness problem.
- `04-03-epoll-and-the-event-loop` — ## epoll and the event loop — how one process serves thousands of sockets; connects to Node's loop. (Note: **io_uring** as the newer async API; epoll still the 2026 default for network services.)

**M05 · Containers are just processes**
- `05-01-namespaces-what-a-process-sees` — ## Namespaces — what a process can see (pid, net, mnt, uts, ipc, user). SVG.
- `05-02-cgroups-what-a-process-can-use` — ## cgroups — what a process can use (cpu, memory, io); **cgroup v2 unified hierarchy is default** on modern distros. SVG.
- `05-03-a-container-is-a-process` — ## A container is a process — namespaces + cgroups + overlayfs + capabilities; not a VM. The demystify page.
- `05-04-capabilities-and-rootless` — ## Capabilities and rootless containers — dropping root the right way; sets up container security later.

**M06 · Seeing inside**
- `06-01-proc-and-the-first-look` — ## /proc and the first look — the filesystem view of the kernel.
- `06-02-strace-and-syscalls` — ## strace — watching the syscalls a program actually makes. `:::lab`.
- `06-03-perf-and-flamegraphs` — ## perf and flame graphs — where CPU time really goes. SVG: a flame graph read.
- `06-04-ebpf-the-x-ray` — ## eBPF — safe kernel programs for observation; the thread pulled through the whole series (Cilium, Falco, OTel profiling later).
- `06-05-systemd-and-journald` — ## systemd and the journal — services, units, logs; where a box's processes actually come from.

**Production project:** instrument a misbehaving container — reproduce an OOMKill and a fd leak locally (Docker + `stress-ng`), find each with `/proc`, `strace`, and a flame graph, and write the one-paragraph root cause.
**Interview focus:** "walk me through what happens from `./server` to serving a request"; "a pod is OOMKilled — how do you confirm why"; "load average is 20 but CPU is 30% — explain".

---

## Booklet 02 — Networking for Infrastructure Engineers  (`02-networking`, teal)

**Promise:** you can answer "why can't A reach B" and "why is p99 4s across AZs" with a method, not guesses.
**Assume/compress:** reader knows HTTP requests and REST. Compress "what is a URL"; go deep on what happens under `fetch`.
**Cut:** BGP internals beyond intuition, telco/radio layers, exhaustive DNS record zoo.

**M01 · The wire and the packet**
- `01-01-the-osi-vs-real-stack` — ## The layered model, honestly — the 4 layers that matter in practice. SVG.
- `01-02-ip-and-cidr` — ## IP and CIDR — addresses, masks, why `/24` means what it means. SVG.
- `01-03-subnets-routing-nat` — ## Subnets, routing, NAT — how a packet finds the next hop; private vs public.
- `01-04-mtu-fragmentation` — ## MTU and fragmentation — the quiet cause of "works small, hangs big".

**M02 · TCP, UDP, and flow**
- `02-01-tcp-handshake-teardown` — ## The TCP handshake and teardown — SYN/ACK, TIME_WAIT, what a half-open connection costs. SVG.
- `02-02-congestion-and-flow-control` — ## Congestion and flow control — windows, slow start, bufferbloat; backpressure at the socket.
- `02-03-udp-and-when` — ## UDP and when you want it — no handshake, no order; the base for QUIC and DNS.
- `02-04-head-of-line-blocking` — ## Head-of-line blocking — the problem that shaped HTTP/2 → HTTP/3.

**M03 · Names and trust**
- `03-01-dns-deep` — ## DNS, deeply — resolvers, records, TTLs, caching; **the most common "A can't reach B"**. `:::incident`.
- `03-02-tls-13-and-pki` — ## TLS 1.3 and PKI — the handshake, certificates, chains of trust; why it's fast now. SVG.
- `03-03-mtls` — ## mTLS — both sides prove identity; the basis for zero-trust service meshes later.

**M04 · The protocols services speak**
- `04-01-http1-keepalive` — ## HTTP/1.1 and keep-alive — connections, pipelining's failure.
- `04-02-http2-multiplexing` — ## HTTP/2 — streams, multiplexing, server push's retirement.
- `04-03-http3-quic` — ## HTTP/3 and QUIC — HOL blocking killed at the transport; UDP underneath.
- `04-04-grpc` — ## gRPC — HTTP/2 + protobuf; why infra tooling speaks it.
- `04-05-websockets-sse` — ## WebSockets and SSE — long-lived, bidirectional; streaming tokens from an LLM.

**M05 · Getting traffic to the right place**
- `05-01-l4-vs-l7-load-balancing` — ## L4 vs L7 load balancing — connection vs request routing; when each. SVG.
- `05-02-proxies-forward-reverse` — ## Proxies — forward, reverse, sidecar; what Envoy/nginx actually do.
- `05-03-cdn-and-anycast` — ## CDN and Anycast — serving from the edge; one IP, many boxes.
- `05-04-connection-pooling-keepalive` — ## Connection pooling — why your service exhausts ports under load. `:::warn`.

**M06 · Debugging the network**
- `06-01-the-toolbox` — ## The toolbox — `ping`, `dig`, `ss`, `traceroute`, `curl -v`, `tcpdump`. `:::lab`.
- `06-02-why-p99-is-4s` — ## Why p99 is suddenly 4s — retransmits, DNS timeouts, pool exhaustion, cross-AZ hops. `:::incident`.
- `06-03-ebpf-for-the-network` — ## eBPF for the network — kernel-level visibility; sets up Cilium.

**Production project:** stand up two containers on separate Docker networks; reproduce a DNS failure, a TLS mismatch, and cross-"AZ" latency (tc netem); diagnose each with the toolbox and write the fix.
**Interview focus:** "trace a packet from browser to pod"; "service A times out calling B intermittently — method?"; "HTTP/2 vs HTTP/3 and why you'd care".

---

## Booklet 03 — Distributed Systems: Reasoning About Failure  (`03-distributed-systems`, deep blue)

**Promise:** move from *using* distributed systems to *reasoning* about them — the deep one.
**Assume/compress:** reader has built microservices with Redis/RabbitMQ/Mongo — so frame everything as "you've done this; here's why it works/breaks".
**Cut:** formal TLA+ proofs (mention), exhaustive consensus variants.

**M01 · Why distributed is hard**
- `01-01-partial-failure` — ## Partial failure — the one property that defines the field; the eight fallacies. SVG.
- `01-02-the-two-generals-and-impossibility` — ## What you can't do — Two Generals, FLP intuition; why "exactly-once" is subtle.
- `01-03-latency-is-a-liar` — ## Latency, bandwidth, and the speed of light — the numbers every engineer should know.

**M02 · Time and order**
- `02-01-why-clocks-lie` — ## Why clocks lie — NTP drift, skew; you cannot trust wall-clock ordering. `:::warn`.
- `02-02-logical-clocks` — ## Logical clocks — Lamport timestamps, happens-before. SVG.
- `02-03-vector-clocks` — ## Vector clocks — detecting concurrency; the cost.

**M03 · Replication**
- `03-01-why-replicate` — ## Why replicate — availability, read scale, locality; the cost is consistency.
- `03-02-leader-follower` — ## Leader–follower — sync vs async, replication lag, read-your-writes. SVG.
- `03-03-multi-leader-and-leaderless` — ## Multi-leader and leaderless — conflict resolution, quorums (R+W>N). SVG.
- `03-04-conflict-resolution` — ## Conflicts — last-write-wins' data loss, CRDTs intuition.

**M04 · Partitioning**
- `04-01-why-partition` — ## Why partition — past the single box.
- `04-02-hash-vs-range` — ## Hash vs range partitioning — the trade; hot keys.
- `04-03-consistent-hashing` — ## Consistent hashing — minimal reshuffle on resize; virtual nodes. SVG.
- `04-04-rebalancing-hot-partitions` — ## Rebalancing and hot partitions — the celebrity problem. `:::warn`.

**M05 · Consistency and CAP**
- `05-01-consistency-models` — ## The consistency ladder — linearizable → sequential → causal → eventual. SVG.
- `05-02-cap-honestly` — ## CAP, honestly — it's C-vs-A only during a partition; the common misreadings.
- `05-03-pacelc` — ## PACELC — the latency-vs-consistency trade when there's no partition.

**M06 · Consensus**
- `06-01-what-consensus-buys` — ## What consensus buys — one agreed value despite failures; where it's used (etcd, leader election).
- `06-02-raft-leader-election` — ## Raft: leader election — terms, votes, split votes. SVG.
- `06-03-raft-log-replication` — ## Raft: log replication and safety — commit rules; why it's understandable.
- `06-04-quorums-and-split-brain` — ## Quorums and split-brain — why odd numbers; fencing. `:::warn`.

**M07 · Transactions and delivery**
- `07-01-acid-and-isolation` — ## ACID and isolation levels — what "isolation" actually prevents; anomalies. SVG.
- `07-02-two-phase-commit` — ## 2PC and its blocking problem — distributed transactions' cost.
- `07-03-sagas` — ## Sagas — long-lived transactions via compensations; your microservice pattern, named.
- `07-04-delivery-semantics` — ## At-least / at-most / exactly-once — the lie, and idempotency as the truth. SVG.
- `07-05-idempotency-keys` — ## Idempotency keys and dedup — making retries safe. `:::lab`.

**M08 · Resilience and tail latency**
- `08-01-timeouts-retries-jitter` — ## Timeouts, retries, backoff, jitter — the retry storm and how to avoid it. `:::warn`.
- `08-02-circuit-breakers-bulkheads` — ## Circuit breakers and bulkheads — containing failure.
- `08-03-backpressure-load-shedding` — ## Backpressure and load shedding — saying no on purpose.
- `08-04-littles-law-tail-latency` — ## Little's Law and why p99 explodes — queueing, coordinated omission. SVG.
- `08-05-event-sourcing-cqrs` — ## Event sourcing and CQRS — the log as source of truth; read/write split.

**Production project:** build an idempotent payment-ish worker on RabbitMQ that survives duplicate delivery, consumer crash mid-process, and a retry storm — prove each property with a test.
**Interview focus:** CAP/PACELC framing, "design exactly-once", Raft walkthrough, "why did p99 blow up under 2x load".

---

## Booklet 04 — Data Systems: Storage Engines to Streaming  (`04-data-systems`, purple)

**Promise:** choose and reason about any datastore from how it's built, not a feature list.
**Assume/compress:** reader uses Mongo/Redis/Postgres/Prisma — deepen, don't re-intro CRUD.
**Cut:** SQL tutorial, ORM specifics, one-off vendor features.

**M01 · How a database stores bytes**
- `01-01-the-storage-engine` — ## The storage engine — the layer under every DB.
- `01-02-b-tree` — ## B-trees — read-optimised, in-place; what Postgres/MySQL use. SVG.
- `01-03-lsm-tree` — ## LSM-trees — write-optimised, append + compact; what Cassandra/RocksDB use. SVG.
- `01-04-wal-and-durability` — ## The WAL — how a DB survives a crash; fsync and the durability knob.
- `01-05-amplification` — ## Write/read/space amplification — the LSM-vs-B-tree trade in numbers.

**M02 · Relational done right**
- `02-01-postgres-why-default` — ## Postgres, the sane default — when boring wins.
- `02-02-mvcc` — ## MVCC — readers don't block writers; the cost (bloat, vacuum). SVG.
- `02-03-indexes-and-the-planner` — ## Indexes and the query planner — why your query is slow. `:::lab`.
- `02-04-isolation-in-practice` — ## Isolation in practice — what Postgres actually gives you.
- `02-05-replication-and-failover` — ## Replication and failover — streaming replicas, synchronous commit.

**M03 · The NoSQL family (when and why)**
- `03-01-dynamodb-single-table` — ## DynamoDB — partition keys, single-table design, the hot-partition trap.
- `03-02-cassandra` — ## Cassandra — wide-column, tunable consistency, write path.
- `03-03-mongo-document` — ## MongoDB, revisited — document model, when it fits, when it bites. `:::warn`.
- `03-04-choosing-a-store` — ## The store-selection framework — a decision tree, not a feature grid. SVG.

**M04 · Caching**
- `04-01-redis-as-more-than-cache` — ## Redis as more than a cache — data structures, persistence, as lock/queue/rate-limiter.
- `04-02-cache-patterns` — ## Cache patterns — cache-aside, write-through, TTLs.
- `04-03-invalidation-and-stampede` — ## Invalidation and the stampede — the two hard problems; dogpile locks. `:::warn`.

**M05 · Messaging and streaming**
- `05-01-queue-vs-log` — ## A queue vs a log — RabbitMQ vs Kafka, the core distinction. SVG.
- `05-02-rabbitmq-deep` — ## RabbitMQ, deepened — exchanges, acks, DLQ, prefetch.
- `05-03-kafka-model` — ## Kafka — partitions, offsets, consumer groups, retention. SVG.
- `05-04-kafka-delivery-and-compaction` — ## Kafka delivery and compaction — exactly-once semantics, log compaction.
- `05-05-when-kafka-vs-queue` — ## When Kafka, when a queue — the choice, with real cases.

**M06 · The coordination store**
- `06-01-etcd` — ## etcd — the strongly-consistent store behind Kubernetes; Raft in production.

**Production project:** model one domain three ways (Postgres, Dynamo-style, Mongo), load the same data, run the same three queries, measure, and defend the choice in a one-page ADR.
**Interview focus:** B-tree vs LSM, "design the data layer for X", cache stampede fix, Kafka vs RabbitMQ.

---

## Booklet 05 — AWS: Operating a Cloud for Real Systems  (`05-aws`, dark amber)

**Promise:** "here's a system at 10M req/day — design and operate it on AWS" becomes answerable.
**Assume/compress:** reader has basic AWS. Compress "what is EC2"; go deep on IAM, VPC, and cost.
**Cut:** cert blueprints, every service; the 20 that matter only.

**M01 · The account and identity**
- `01-01-shared-responsibility` — ## The shared responsibility model — what AWS secures, what you do.
- `01-02-iam-policies` — ## IAM policies — principals, actions, resources, conditions; deny-by-default. SVG.
- `01-03-roles-and-sts` — ## Roles and STS — assume-role, temporary creds; stop using long-lived keys. `:::warn`.
- `01-04-oidc-federation-irsa` — ## OIDC federation — GitHub Actions and EKS pods getting creds without secrets (preview of IRSA).

**M02 · The network**
- `02-01-vpc-subnets` — ## VPC and subnets — your private slice; public vs private. SVG.
- `02-02-routing-igw-nat` — ## Route tables, IGW, NAT gateway — how a private subnet reaches out (and the NAT cost trap).
- `02-03-sg-vs-nacl` — ## Security groups vs NACLs — stateful vs stateless firewalls.
- `02-04-endpoints-privatelink` — ## VPC endpoints and PrivateLink — reaching AWS services without the internet.

**M03 · Compute and edge**
- `03-01-ec2-families-spot` — ## EC2 — instance families, spot, the price/interruption trade.
- `03-02-ecs-vs-eks-vs-lambda` — ## ECS vs EKS vs Lambda — the compute choice. SVG.
- `03-03-alb-nlb` — ## ALB and NLB — L7 vs L4 on AWS; target groups, health checks.
- `03-04-route53-cloudfront` — ## Route 53 and CloudFront — DNS routing policies and the CDN.

**M04 · Data and messaging**
- `04-01-s3` — ## S3 — consistency, storage classes, the egress bill.
- `04-02-rds-aurora` — ## RDS and Aurora — managed Postgres; failover, read replicas.
- `04-03-dynamo-elasticache` — ## DynamoDB and ElastiCache — managed NoSQL and Redis.
- `04-04-sqs-sns-eventbridge` — ## SQS, SNS, EventBridge — the messaging trio; when each. SVG.

**M05 · Operate and secure**
- `05-01-kms-secrets` — ## KMS and Secrets Manager — keys and secrets, rotation.
- `05-02-cloudwatch-ecr` — ## CloudWatch and ECR — metrics/logs and the image registry.

**M06 · Cost and scale**
- `06-01-the-pricing-mental-model` — ## The pricing mental model — what actually costs money (egress, NAT, idle). `:::warn`.
- `06-02-spot-savings-plans` — ## Spot and savings plans — cutting compute cost safely.
- `06-03-design-for-10m-rpd` — ## Design for 10M req/day — a worked architecture on AWS. SVG.

**Production project:** with **LocalStack** (free), stand up VPC + S3 + DynamoDB + SQS + Lambda for a small event pipeline; then write the real-AWS cost estimate for it. (Real-AWS steps flagged optional.)
**Interview focus:** IAM policy debugging, VPC reachability, "design/operate 10M req/day", cost trade-offs.

---

## Booklet 06 — Kubernetes: How It Actually Works  (`06-kubernetes`, k8s blue)

**Promise:** you understand K8s from the control loop out — not just `kubectl` incantations.
**Assume/compress:** reader knows Docker/containers (Booklet 1). Build straight on namespaces/cgroups.
**Cut:** deprecated APIs, every controller; depth on the ones that matter.

**M01 · The model**
- `01-01-desired-vs-actual` — ## Desired vs actual state — the reconcile loop is the whole idea. SVG.
- `01-02-control-plane` — ## The control plane — API server, etcd, scheduler, controller-manager. SVG.
- `01-03-node-components` — ## On the node — kubelet, container runtime, kube-proxy.
- `01-04-the-api-and-objects` — ## The API and objects — everything is a declarative resource; `kubectl` is just HTTP.

**M02 · Running workloads**
- `02-01-pods` — ## Pods — the unit; why multi-container, the pause container.
- `02-02-replicasets-deployments` — ## ReplicaSets and Deployments — rollouts and rollbacks. SVG.
- `02-03-services` — ## Services — stable identity over changing pods; ClusterIP/NodePort/LoadBalancer.
- `02-04-jobs-cronjobs-daemonsets` — ## Jobs, CronJobs, DaemonSets — batch and per-node.
- `02-05-statefulsets` — ## StatefulSets — stable identity and storage; when you actually need them.
- `02-06-init-and-sidecars` — ## Init and sidecar containers — ordering; **native sidecars (stable since 1.33)**.

**M03 · Config, health, scheduling**
- `03-01-configmaps-secrets` — ## ConfigMaps and Secrets — config as data; secrets are only base64 (sets up security).
- `03-02-requests-limits-qos` — ## Requests, limits, QoS — how the scheduler bin-packs; **why limits cause OOMKills/throttling**. `:::warn`.
- `03-03-probes` — ## Liveness, readiness, startup probes — the difference that causes outages.
- `03-04-affinity-taints-topology` — ## Affinity, taints/tolerations, topology spread — placing pods on purpose.
- `03-05-pdb` — ## PodDisruptionBudgets — surviving voluntary disruptions.

**M04 · Networking and storage**
- `04-01-pod-network-cni` — ## The pod network and CNI — one IP per pod; how. SVG.
- `04-02-dns-and-service-discovery` — ## Cluster DNS and service discovery.
- `04-03-gateway-api` — ## Gateway API — **the current standard** for ingress (Ingress is frozen; Ingress-NGINX retired Mar 2026). SVG.
- `04-04-volumes-pv-pvc-csi` — ## Volumes, PV/PVC, StorageClass, CSI — persistent storage.

**M05 · Scaling and packaging**
- `05-01-hpa-vpa` — ## HPA and VPA — scaling on metrics; the conflict between them.
- `05-02-cluster-autoscaler-karpenter` — ## Cluster Autoscaler and Karpenter — adding nodes; the cost lever.
- `05-03-helm-kustomize` — ## Helm and Kustomize — packaging and templating.
- `05-04-operators-crds` — ## Operators and CRDs — extending K8s; the reconcile loop you write (why it's Go).
- `05-05-gitops-argo-flux` — ## GitOps — Argo CD / Flux; the cluster as a reflection of git.

**M06 · Running it and debugging**
- `06-01-rollouts-canary-blue-green` — ## Rollout strategies — rolling, blue-green, canary.
- `06-02-debugging-pods` — ## Debugging pods — CrashLoopBackOff, ImagePullBackOff, Pending, OOMKilled. `:::incident`.
- `06-03-failure-recovery` — ## Failure recovery — what happens when a node dies.

**Production project:** on **kind** (free, local), deploy a 3-service app behind Gateway API with probes, HPA, a ConfigMap/Secret, and a rolling update; break it three ways and recover.
**Interview focus:** reconcile loop, requests/limits & OOM, Service vs Gateway, "debug a CrashLoopBackOff", operator pattern.

---

## Booklet 07 — Infrastructure as Code & Platform Engineering  (`07-iac-platform`, indigo)

**Promise:** your infrastructure is a reviewed, versioned artifact — and you can build the platform others deploy on.
**Assume/compress:** reader now knows AWS + K8s. Build the stack in code.
**Cut:** every Terraform provider; the patterns, not the catalog.

**M01 · The idea**
- `01-01-declarative-vs-imperative` — ## Declarative vs imperative infra — describe the end state.
- `01-02-state-and-drift` — ## State and drift — the state file is the truth and the danger. `:::warn`.
- `01-03-terraform-vs-opentofu` — ## Terraform vs OpenTofu — **the BSL licence change (2023) and the MPL fork**; why it matters in 2026. (Mention Pulumi.)
- `01-04-idempotency-plan-apply` — ## Plan and apply — idempotency; reading a plan before you trust it.

**M02 · Writing it**
- `02-01-providers-resources` — ## Providers and resources — the building blocks.
- `02-02-variables-outputs` — ## Variables, outputs, locals — parameterising.
- `02-03-modules` — ## Modules — reuse without copy-paste; composition. SVG.
- `02-04-remote-state-locking` — ## Remote state and locking — S3 + DynamoDB lock; why teams need it.
- `02-05-workspaces-environments` — ## Workspaces and multi-environment — dev/stage/prod without duplication.
- `02-06-secrets-in-iac` — ## Secrets in IaC — the plaintext-state trap and how to avoid it. `:::warn`.

**M03 · Build the real stack**
- `03-01-vpc-in-code` — ## VPC in code.
- `03-02-eks-in-code` — ## EKS in code — the cluster, node groups.
- `03-03-rds-cache-lb-s3` — ## RDS, ElastiCache, ALB, S3 in code.
- `03-04-iam-least-privilege-in-code` — ## IAM least-privilege in code.
- `03-05-wiring-monitoring` — ## Wiring monitoring in — the stack emits telemetry from day one.

**M04 · Platform engineering**
- `04-01-golden-paths` — ## Golden paths — the paved road; why platforms exist.
- `04-02-policy-as-code` — ## Policy as code — OPA/Conftest; guardrails in CI. `:::lab`.
- `04-03-ci-cd-for-infra` — ## CI/CD for infrastructure — plan on PR, apply on merge.
- `04-04-idp-backstage` — ## Internal developer platforms — the self-service idea (Backstage-style).

**Production project:** write a reusable Terraform/OpenTofu module that stands up a kind-equivalent stack locally (via LocalStack providers where possible); gate it with one OPA policy; show plan-on-PR.
**Interview focus:** state/drift, module design, "roll out infra across 3 envs safely", Terraform vs OpenTofu, policy-as-code.

---

## Booklet 08 — Observability & SRE: Running It in Production  (`08-observability-sre`, rose)

**Promise:** trace a request edge→service→DB→queue→infra and name where it broke; set SLOs; run an incident.
**Assume/compress:** reader has Prometheus/Grafana basics — take it to OTel, tracing, profiling, SRE practice.
**Cut:** vendor dashboards, metric-by-metric catalogs.

**M01 · The signals**
- `01-01-three-pillars-plus-one` — ## Metrics, logs, traces — and the 4th, profiles. SVG.
- `01-02-metrics-red-use` — ## Metrics: RED and USE — the two method frameworks.
- `01-03-logs-structured` — ## Logs: structured and correlated — stop grepping prose.
- `01-04-traces-spans-context` — ## Traces: spans and context propagation — the request's story. SVG.
- `01-05-profiles-continuous` — ## Profiles: continuous profiling — **OTel profiling (eBPF) is the new 4th signal (2026)**.

**M02 · The stack**
- `02-01-opentelemetry` — ## OpenTelemetry — **the standard (CNCF-graduated 2026)**; OTLP, the collector, auto-instrumentation. SVG.
- `02-02-prometheus-promql` — ## Prometheus and PromQL — pull model, cardinality traps. `:::warn`.
- `02-03-grafana-loki-tempo` — ## Grafana, Loki, Tempo — dashboards, logs, traces together.
- `02-04-correlation-ids` — ## Correlation across signals — one id from edge to DB. `:::lab`.

**M03 · SRE discipline**
- `03-01-sli-slo-sla` — ## SLI, SLO, SLA — defining "good enough". SVG.
- `03-02-error-budgets` — ## Error budgets — turning reliability into a decision.
- `03-03-percentiles-coordinated-omission` — ## Percentiles done right — p50/p95/p99 and coordinated omission. `:::warn`.
- `03-04-mttr-mttd` — ## MTTR/MTTD and alert design — alert on symptoms, not causes.

**M04 · Keeping it up**
- `04-01-capacity-planning` — ## Capacity planning — headroom from Little's Law.
- `04-02-load-testing-k6` — ## Load testing with k6 — finding the knee before prod does. `:::lab`.
- `04-03-chaos-engineering` — ## Chaos engineering — breaking on purpose.

**M05 · When it breaks**
- `05-01-incident-method` — ## The incident method — USE/RED, bisect, flame graph, hypothesis. SVG.
- `05-02-trace-the-request` — ## Trace the request — the end-to-end find-where-it-broke drill. `:::incident`.
- `05-03-runbooks-rca-postmortems` — ## Runbooks, RCA, blameless postmortems.

**Production project:** instrument the Booklet 6 app with OTel (traces+metrics+logs, one correlation id), build a Grafana SLO dashboard, load-test to the knee, inject a fault, and write the postmortem.
**Interview focus:** SLO/error-budget design, "p99 regressed — method", tracing architecture, cardinality cost, alert philosophy.

---

## Booklet 09 — GPU & AI Infrastructure  (`09-gpu-ai-infra`, green) — differentiator pt.1

**Promise:** you can run GPUs on Kubernetes efficiently and reason about inference cost.
**Assume/compress:** reader knows K8s (Booklet 6). Treat GPUs as a new resource type on that cluster.
**Cut:** writing CUDA kernels, training/DL math (out of scope).

**M01 · Why GPUs**
- `01-01-cpu-vs-gpu` — ## CPU vs GPU — latency vs throughput; SIMT. SVG.
- `01-02-the-cuda-model` — ## The CUDA model (concepts only) — threads, blocks, warps; the mental model, not kernels.
- `01-03-gpu-memory-hierarchy` — ## GPU memory — VRAM/HBM, registers, bandwidth as the real limit. SVG.
- `01-04-tensor-cores-precision` — ## Tensor cores and precision — FP32/TF32/FP16/BF16/FP8/INT8/INT4.
- `01-05-quantization` — ## Quantization — trading precision for memory/speed; what breaks. `:::warn`.

**M02 · The mechanics of inference**
- `02-01-prefill-vs-decode` — ## Prefill vs decode — compute-bound vs memory-bound; the split that shapes everything. SVG.
- `02-02-kv-cache` — ## The KV cache — why memory, not FLOPs, caps concurrency. SVG.
- `02-03-paged-attention` — ## PagedAttention — killing KV fragmentation.
- `02-04-continuous-batching` — ## Continuous batching — keeping the GPU busy. SVG.
- `02-05-speculative-decoding` — ## Speculative decoding — a draft model for latency.

**M03 · Many GPUs**
- `03-01-parallelism` — ## Tensor / pipeline / data parallelism — splitting a model. SVG.
- `03-02-nccl-nvlink` — ## NCCL and interconnects — NVLink vs PCIe vs the network; why topology matters.

**M04 · GPUs on Kubernetes (the actual job)**
- `04-01-gpu-operator` — ## The NVIDIA GPU Operator — drivers, runtime, device exposure.
- `04-02-device-plugin-to-dra` — ## From device plugin to DRA — **DRA is GA in K8s 1.34; NVIDIA's DRA driver went to CNCF (2026)**; why the old model was too rigid. SVG.
- `04-03-mig` — ## MIG — slicing one GPU into isolated instances; when it pays.
- `04-04-kai-kueue-gang` — ## KAI Scheduler and Kueue — gang scheduling, fair-share, quotas; batch GPU jobs without idle burn.
- `04-05-gpu-autoscaling-spot` — ## GPU autoscaling and spot — scale-to-zero, spot GPUs, checkpointing. `:::warn`.

**M05 · Cost**
- `05-01-gpu-cost-engineering` — ## GPU cost engineering — $/token, utilisation, right-sizing, MIG vs whole-GPU. SVG.

**Production project:** on a single cheap/rentable GPU (or CPU-sim where noted), run a small model under vLLM, measure KV-cache limits and the batching effect on throughput; model the $/token. (GPU steps flagged; CPU fallback given.)
**Interview focus:** prefill/decode, KV cache math, DRA vs device plugin, MIG trade-offs, "cut our inference bill in half".

---

## Booklet 10 — Serving LLMs & AI Platform Architecture  (`10-serving-ai-platform`, cyan-teal) — differentiator pt.2

**Promise:** design and operate the machinery that serves models to millions — the portfolio centrepiece.
**Assume/compress:** reader has GPUs-on-K8s (Booklet 9) and distributed/SRE depth. Build the platform.
**Cut:** application-layer RAG/agent building (that's the AI-eng series); here it's infra.

**M01 · The serving engines**
- `01-01-the-serving-problem` — ## The serving problem — latency, throughput, cost, all at once. SVG.
- `01-02-vllm` — ## vLLM — the open-source workhorse; PagedAttention + continuous batching in practice.
- `01-03-sglang` — ## SGLang — RadixAttention; **most mature disaggregation support (2026)**.
- `01-04-tensorrt-llm` — ## TensorRT-LLM — NVIDIA-optimised backend; when the compile pays.
- `01-05-triton-ray-serve` — ## Triton and Ray Serve — multi-framework serving and orchestration.

**M02 · The 2026 architecture**
- `02-01-disaggregated-prefill-decode` — ## Disaggregated prefill/decode — separate pools, KV transfer (NCCL/NIXL/Mooncake); why it's the new default. SVG.
- `02-02-nvidia-dynamo` — ## NVIDIA Dynamo — KV-aware routing, SLO→deployment; orchestration over TRT-LLM/SGLang.
- `02-03-llm-d` — ## llm-d — **K8s-native disaggregated serving (CNCF Sandbox, Mar 2026)**; the Gateway API Inference Extension. SVG.

**M03 · The AI gateway**
- `03-01-why-an-ai-gateway` — ## Why an AI gateway — the control point in front of models. SVG.
- `03-02-litellm-envoy-ai` — ## LiteLLM / Envoy AI Gateway — routing, fallbacks, unified API.
- `03-03-rate-limiting-token-accounting` — ## Rate limiting and token accounting — fairness and billing by tokens.
- `03-04-multi-tenancy` — ## Multi-tenancy — isolation, quotas, noisy neighbours. `:::warn`.
- `03-05-caching-streaming` — ## Prompt/semantic caching and streaming — cost and latency wins.

**M04 · Operating the platform**
- `04-01-slos-for-inference` — ## SLOs for inference — TTFT, inter-token latency, throughput. SVG.
- `04-02-gpu-token-observability` — ## GPU and token observability — the metrics that matter.
- `04-03-model-registry-rollout` — ## Model registry and rollout — versioning and canary for models.
- `04-04-autoscaling-inference` — ## Autoscaling inference — scaling on queue depth, not CPU.
- `04-05-the-reference-architecture` — ## The reference architecture — User → API GW → AI GW → router → serving pool → GPU cluster, with cost/observability/security hooks. SVG (the big one).

**Production project:** deploy vLLM behind an AI gateway on kind (CPU model or tiny GPU), add token-based rate limiting, a fallback route, streaming, and inference SLOs; load-test and tune batching.
**Interview focus:** "serve an LLM to 10M req/day", disaggregation trade-offs, gateway design, autoscaling signal choice, cost/latency/throughput triangle.

---

## Booklet 11 — Security: Cloud, Kubernetes & AI  (`11-security`, dark red) — the moat

**Promise:** secure the whole stack, including the parts AI adds — mapped to real frameworks.
**Assume/compress:** reader has IAM/network/K8s basics from earlier booklets; here it's the security lens over them.
**Cut:** compliance paperwork depth, pentest tooling tutorials.

**M01 · Identity**
- `01-01-authn-vs-authz` — ## AuthN vs AuthZ — the distinction people blur.
- `01-02-iam-rbac-abac` — ## IAM, RBAC, ABAC — models of access.
- `01-03-oidc-oauth2-jwt` — ## OIDC, OAuth2, JWT — tokens and trust; common validation bugs. `:::warn`.
- `01-04-workload-identity-irsa` — ## Workload identity — IRSA/OIDC; pods getting creds without secrets.
- `01-05-least-privilege` — ## Least privilege in practice — scoping down without breaking things.

**M02 · Network security**
- `02-01-segmentation` — ## Segmentation — VPC isolation, private subnets, SG/NACL recap as defence.
- `02-02-mtls-zero-trust` — ## mTLS and zero trust — identity on every hop; service mesh (Istio ambient / Cilium eBPF). SVG.
- `02-03-networkpolicy` — ## NetworkPolicy — pod-level firewalling; default-deny.
- `02-04-waf-and-edge` — ## WAF and edge protection.

**M03 · Secrets and crypto**
- `03-01-secrets-vault-kms` — ## Secrets, Vault, KMS — storage, access, rotation.
- `03-02-cert-manager` — ## Certificate management — cert-manager, rotation, expiry outages. `:::warn`.

**M04 · Container & supply chain**
- `04-01-pod-security-standards` — ## Pod Security Standards — dropping privilege.
- `04-02-image-scanning-sbom` — ## Image scanning and SBOM — knowing what's in your image.
- `04-03-signing-cosign-slsa` — ## Signing and provenance — Sigstore/cosign, SLSA; trust what you deploy.
- `04-04-admission-opa-kyverno` — ## Admission control — OPA/Gatekeeper, Kyverno; policy at deploy time. `:::lab`.
- `04-05-runtime-falco-ebpf` — ## Runtime security — Falco/eBPF; catching the breach in motion.

**M05 · AI security (the unusual edge)**
- `05-01-owasp-llm-top-10` — ## The OWASP LLM Top 10 (2026) — the map; **prompt injection #1, excessive agency #3**. SVG.
- `05-02-prompt-injection` — ## Prompt injection — direct and **indirect**; instructions and data share one channel. `:::warn`.
- `05-03-excessive-agency-tool-calls` — ## Excessive agency and tool-call security — the agent that can *act*; OWASP Agentic Top 10 (v1.0, Dec 2025).
- `05-04-rag-vector-poisoning` — ## RAG and vector-store poisoning — trust in the retrieved context.
- `05-05-data-secret-leakage` — ## Data and secret leakage — model extraction, training-data exfil.
- `05-06-sandboxing-agents` — ## Sandboxing agents — containing what a tool can do (ties to Booklet 1 capabilities).
- `05-07-ai-supply-chain` — ## AI supply chain and model provenance — where did this model come from.
- `05-08-the-boundary-diagram` — ## The security boundary, end to end — LLM→agent→tools→DB→cloud→prod. SVG.

**Production project:** harden the Booklet 10 platform — default-deny NetworkPolicy, non-root pods, signed images + admission gate, secrets from a store, and one indirect-prompt-injection defence on the gateway; show each blocking a concrete attack.
**Interview focus:** least-privilege design, zero-trust/mTLS, supply-chain (SBOM/signing/admission), OWASP LLM risks, "secure a multi-tenant inference platform".

---

## Booklet 12 — Architecture & The Capstones  (`12-architecture-capstones`, graphite)

**Promise:** design and defend staff-level systems; combine everything into three portfolio projects.
**Assume/compress:** everything prior. This booklet is synthesis + judgement.
**Cut:** nothing new taught for its own sake; only what the designs need.

**M01 · Availability and geography**
- `01-01-multi-az` — ## Multi-AZ — surviving a datacentre.
- `01-02-multi-region` — ## Multi-region — latency, data residency, the hard part (data). SVG.
- `01-03-active-active-vs-passive` — ## Active-active vs active-passive — the trade.
- `01-04-dr-rpo-rto` — ## DR, RPO, RTO — how much data/time you can lose; failover drills. SVG.
- `01-05-global-traffic-routing` — ## Global traffic routing — geo-DNS, Anycast, failover.

**M02 · Patterns at scale**
- `02-01-multi-tenancy` — ## Multi-tenancy — isolation models; noisy neighbours.
- `02-02-rate-limiting-at-scale` — ## Rate limiting at scale — distributed token buckets.
- `02-03-distributed-caching` — ## Distributed caching — tiers, coherence.
- `02-04-the-ai-platform-reference` — ## The AI platform reference architecture — the whole stack on one page. SVG.

**M03 · The method**
- `03-01-how-to-design` — ## How to design a system — requirements → estimates → components → trade-offs. SVG.
- `03-02-adrs` — ## Architecture Decision Records — defending a choice in writing.

**M04 · Capstone projects (specs + walkthroughs)**
- `04-01-capstone-1-distributed-platform` — ## Capstone 1: a production distributed platform — K8s + data + messaging + observability + IaC.
- `04-02-capstone-2-gpu-llm-platform` — ## Capstone 2: a K8s GPU/LLM serving platform — vLLM/llm-d on EKS, DRA/MIG, AI gateway, autoscaling, cost.
- `04-03-capstone-3-secure-multi-tenant` — ## Capstone 3: a secure multi-tenant AI infrastructure — the security spine applied, zero-trust, OWASP-hardened.
- `04-04-the-combined-capstone` — ## The combined capstone — all three as one coherent platform, with ADRs and an interview defence.

**Interview focus:** the whole-system design rounds; "walk me through your platform and defend every choice".

---

## Booklet 13 — Interview & System Design Bank  (`13-interview-bank`, steel blue) — bonus

**Format:** like the AI-eng interview bank — one question per page where it earns it, `:::interview` (bold Q, plain A), grouped by domain; plus multi-page system-design walkthroughs. Scale: a large bank (floors, grows).

**M01 · Linux & networking** — process/memory/scheduler Qs; "trace a packet"; p99 debugging.
**M02 · Distributed systems** — CAP/PACELC, consensus, replication, delivery semantics, tail latency.
**M03 · Data systems** — B-tree vs LSM, store choice, Kafka vs queue, cache stampede.
**M04 · Cloud & Kubernetes** — IAM/VPC, reconcile loop, requests/limits, Gateway API, operators.
**M05 · IaC & SRE** — state/drift, SLO/error budgets, incident method, observability architecture.
**M06 · GPU & serving** — prefill/decode, KV cache, DRA/MIG, disaggregation, gateway, cost.
**M07 · Security** — least-privilege, zero-trust, supply chain, OWASP LLM/Agentic.
**M08 · System design walkthroughs** (multi-page each):
- Serve an LLM to 10M req/day on AWS.
- Design a multi-region active-active API.
- Design a GPU scheduler / fair-share platform.
- Design a secure multi-tenant inference platform.
- Design an observability pipeline for 100k rps.
**M09 · Behavioural / staff-level** — "tell me about an incident"; "a time you cut cost/complexity"; defending trade-offs.

---

## Frontmatter / Backmatter

- **`frontmatter/`** (`meta.json`: `{"title":"Preface","divider":false}`, `pages/01-preface.md`) — what this series is, who it's for, how to read it, the dependency map, the difficulty/hours table (as a study guide, not a schedule).
- **`backmatter/`** (`meta.json`: `{"title":"Reference & Appendices"}`, `pages/`):
  - `01-00-how-to-use.md`, glossary pages `01-01-glossary-a-c.md` … (unified, one line per term, non-circular),
  - reference tables (ports, complexity/latency numbers, "which store/engine/scheduler"),
  - `06-01-about-the-author.md` (from `shared/author/about-the-author.md`),
  - `07-01-copyright.md`.
  - Note: `buildBook` auto-appends `backmatter/pages/*about-author*` + `*copyright*` to every individual booklet, so those two files must exist and match that regex.

## Build notes (gotchas captured)

- **A5 density (calibrated on Booklet 1).** Printable area is **186mm tall × 126mm wide** at 8.5pt. A page holds roughly **one SVG (~50mm) + 12–15 dense bullet-lines**, or ~22 text lines with no diagram. Keep a half-page diagram's SVG `viewBox` height ≤ ~130 (it renders at width×0.35 ≈ height mm). Overflow warnings only print in the **PDF** build (`node tools/build.mjs <slug>`), not `--html` — do a PDF build to check fit. First draft of 3 pages came in at 200/215/189mm; trimming prose to the house compression rule fixed it. Write tight the first time.
- **CRLF kills blocks.** The build normalises `\r\n`, but author files as LF to be safe.
- **`blocks` replaces on cascade**, so the series `meta.json` lists all six (done).
- **`theme.css` concatenates** down the chain; series theme wins (done — `.warn/.lab/.incident`).
- **Volume divider numbering:** `buildMaster` prints "Booklet i+1 of order.length", counting frontmatter/backmatter. Set `frontmatter` `divider:false`; accept/verify backmatter divider at volume-build time. Revisit when the volume first builds.
- **Don't build the master volume** (`node tools/build.mjs ai-systems-infra`) until all booklets in `order` exist, or `buildMaster` throws on a missing child `meta.json`. Build individual booklets with `node tools/build.mjs <NN-slug> --html`.
- **`--split` bug** (from memory): crashes on shared backmatter for standalone booklets — paginate new pages manually / use `--html` to preview overflow.
