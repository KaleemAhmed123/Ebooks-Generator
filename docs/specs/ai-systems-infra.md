# Task: AI Systems / Infrastructure + Cloud Security + Distributed Systems — the ebook series

- **Status:** in progress (plan approved; Booklets 01–08 written and building clean)
- **Started:** 2026-10-02
- **Last updated:** 2026-10-03
- **Slug:** `ai-systems-infra`
- **Proposed series title:** *The Infrastructure Engineer — AI Systems, Cloud & Distributed Platforms from the Kernel Up*
- **Author:** Kaleem Ahmed
- **Location:** `books/tech/ai-systems-infra/` (rename of the folder the user created)

---

## 1. What you asked for

Turn a pasted roadmap into a **complete, structured learning curriculum** for becoming an
**AI Systems / Infrastructure Engineer + Cloud Security + Distributed Systems Engineer**, as an
**ebook series** in this factory (the pasted "teach me" prompt is *inspiration* for page structure,
not a request to tutor live).

Hard requirements captured from the request + the grill:

- **Research first**, current to 2026; cut outdated/low-value topics; improve the roadmap, don't follow it blindly.
- **Dependency order**, not the pasted order. Start from the reader's existing backend knowledge and compress what they know.
- **Teach deeply but simply** — each topic: what / why / problem solved / mental model / internals / how it connects / production example / common mistakes / when-not / interview framing / exercise.
- **Progressive difficulty:** Foundation → Core → Intermediate → Advanced → Production → Expert.
- **Practical:** small exercises, debugging tasks, architecture problems, one realistic production project per domain, and a combined capstone.
- **Engineering judgment throughout:** trade-offs, failure modes, bottlenecks, scaling, security, reliability, cost, observability, "why this architecture over that one."
- Deliver, up front: (1) prerequisite map, (2) full phased curriculum, (3) difficulty + hours per phase, (4) resources per phase, (5) the first module. Then build the whole series.

Decisions locked in the grill:

- **Structure:** multi-booklet series + bound complete volume + unified glossary (mirrors the AI-eng series).
- **Build mode:** write the whole series, user reviews at the end (plan still approved first).
- **Depth:** max comprehensiveness, no size cap; every topic is a multi-page cluster; floors not ceilings.
- **Hands-on:** free/local-first (kind, minikube, LocalStack, Docker); real AWS/GPU labs are optional and flagged.
- **Go:** not taught as a unit; hands-on stays Python/bash/YAML; Go explained only where it matters (why K8s/operators are Go).
- **Interview bank:** yes — a final interview + system-design booklet.
- **AI-eng overlap:** fully standalone; re-teach whatever is needed; no dependency on the AI-eng series.
- **Out of scope:** ML model training + DL math, CUDA kernel programming, certification exam prep, frontend/app-dev.

---

## 2. Open questions — ALL RESOLVED (2026-10-02)

1. **Series title + slug.** → **Resolved: title _The Infrastructure Engineer_, slug `ai-systems-infra`.** (User approved.)
2. **Booklet count.** → **Resolved: keep the full 12 content booklets + interview bank + bound volume.** User: merge all 12 into the volume at the end.
3. **Timeline / hours per week.** → **Dropped.** User: that timeline was for live chat-teaching, irrelevant for an ebook. No deadline. Hours table stays only as a study-guide artifact in the frontmatter.
4. **New `:::` blocks.** → **Resolved: add `lab` + `incident`, scoped to THIS series only** (listed in the series `meta.json` `blocks`, styled in the series `theme.css`). Domain meta untouched so DSA/AI-eng are unaffected.

### Decisions locked (tiny to big) — the full record

- **Deliverable:** an ebook series in this factory. The pasted "teach me month-by-month / wait for me" framing is **inspiration only** and does NOT apply — build straight through.
- **Build mode:** write the whole series; user reviews at the end. Plan approved first (this spec).
- **Depth:** max comprehensiveness, no size cap; every topic a multi-page cluster; page counts are floors.
- **Hands-on:** free/local-first (kind, minikube, LocalStack, Docker, k6, stress-ng); real AWS/GPU labs optional + flagged; CPU fallbacks for GPU labs.
- **Go:** not taught as a unit; hands-on in Python/bash/YAML; Go explained only where it matters (operators/controllers).
- **AI-eng overlap:** fully standalone; re-teach whatever is needed; no dependency on the AI-eng series. This series owns the **infra** layer; app-layer RAG/agents stay out.
- **Out of scope:** ML training + DL math, CUDA kernel programming, cert exam prep, frontend/app-dev.
- **Interview bank:** yes — Booklet 13, `:::interview` format (bold Q, plain A).
- **Subagents:** NOT used for writing (shared glossary/terms/no-repetition → sequential keeps consistency). Revisit only if user asks to parallelise. Verification pass is main-agent only (house rule).
- **Structure:** 12 booklets + `13-interview-bank` + `frontmatter` + `backmatter` + `masterVolume: ai-systems-infra-complete`. `contents: per-topic`. A5 (148×210mm). Author Kaleem Ahmed.
- **Blocks:** `["mint","note","interview","warn","lab","incident"]` (series meta). `.warn/.lab/.incident` styled in series theme (domain leaves `.warn` unstyled).
- **Accents:** per-booklet palette fixed — see `ai-systems-infra/outline.md` table.
- **Folder:** renamed from the long name to `books/tech/ai-systems-infra/`. Done.

### Verified facts (as of 2026-10-02) — do NOT re-research these; cite at write time

- **Linux scheduler:** EEVDF replaced CFS in **Linux 6.6 (Oct 2023)**; default since.
- **cgroups v2** unified hierarchy is default on Ubuntu 21.10+, Debian 11+, Fedora 31+, RHEL/Rocky 9+, Arch (2021+). systemd dropped cgroup v1 after 2023.
- **io_uring** (since Linux 5.1) is the modern async I/O API; **epoll remains the correct default** for most network services in 2026 (often disabled by seccomp/sysctl → need fallback).
- **Kubernetes DRA** (Dynamic Resource Allocation) core APIs **GA in K8s 1.34** (`resource.k8s.io/v1`); NVIDIA donated its DRA driver to CNCF at KubeCon EU 2026. Device-plugin model is now legacy for accelerators.
- **KAI Scheduler** (NVIDIA, open-sourced from Run:ai) + **Kueue** = gang scheduling, fair-share, quota-aware admission; both CNCF.
- **Native sidecar containers** stable since **K8s 1.33**.
- **Gateway API** is the current ingress standard; core Ingress API is stable but frozen (new features go only to Gateway API). **Ingress-NGINX controller retires Mar 31 2026.**
- **Service mesh (2026):** Istio **ambient mode GA** (ztunnel L4 per node + waypoint L7); **Cilium/eBPF** sidecar-less is the de-facto direction.
- **Terraform** is **BSL-licensed** (since Aug 2023); **OpenTofu** (Linux Foundation, MPL) is the open fork; same HCL/state/providers. Pulumi = general-purpose languages.
- **OpenTelemetry** graduated CNCF (May 2026); de-facto standard. **Profiles** = 4th signal, public alpha Mar 2026 (eBPF agent from Elastic).
- **LLM serving (2026):** disaggregated prefill/decode is the production architecture. **vLLM** = workhorse (disagg maturing toward 1.0); **SGLang** = most mature disagg; **TensorRT-LLM** = NVIDIA backend; **NVIDIA Dynamo** = orchestration over TRT-LLM/SGLang (KV-aware routing, SLO→deploy); **llm-d** = K8s-native disagg, uses Gateway API Inference Extension, **CNCF Sandbox (Mar 24 2026)**. KV transfer via NCCL/NIXL/Mooncake.
- **AI security:** **OWASP LLM Top 10 (2026)** — prompt injection #1, excessive agency #3; **OWASP Agentic AI Top 10 v1.0 (Dec 2025)** for agents.
- **Job market:** AI-infra/platform roles want K8s (prod), NVIDIA/GPU stack, Terraform, Linux/Bash/Python, inference serving, sometimes Slurm; comp ~$135k–$224k.

### Resume here (for any future session)

1. Read this spec + `ai-systems-infra/outline.md` (the plan) + **`ai-systems-infra/style-guide.md` (the BINDING quality contract — every page must pass it; author-approved against Booklet 1 Module 1)**.
2. Scaffolding DONE: folder renamed; series `meta.json` + `theme.css` written.
3. **Ordering (user pref):** write the **booklets first**; `frontmatter/` + `backmatter/` (preface, glossary, about-author, copyright) come **LAST**. Module convention: the first page of each module leads with `# Module Title` then `## Page topic`; later pages use `##` only. **DONE: Booklet 01 (24pp), 02 (26pp), 03 (36pp), 04 (26pp), 05 (24pp), 06 (30pp), 07 (23pp), 08 (24pp) — all build clean.** **Current step: Booklet 09 `09-gpu-ai-infra`** per the outline.
4. Build/preview a single booklet with `node tools/build.mjs 01-linux-machine --html`. Do NOT build the master volume until all `order` children exist.
5. Verification (fact + consistency) is a separate pass, main-agent only, batched later.

---

## 3. Plan

### 3a. Starting point — what the reader already has (so we compress, not repeat)

Node/TS, Python/FastAPI, Docker, AWS (basic), Redis, RabbitMQ, MongoDB/Prisma, microservices,
distributed-system *concepts*, AI/LLM pipelines (app level), Prometheus/Grafana *basics*.

Consequence: we move fast through container basics, HTTP basics, queue basics, and Prometheus intro —
and spend the depth budget on mechanism and failure reasoning.

### 3b. Critique of the pasted roadmap (what I changed and why)

| Roadmap said | 2026 reality / gap | What the series does |
|---|---|---|
| vLLM / SGLang / Triton / TRT-LLM / Ray Serve | Misses **disaggregated prefill/decode**, **NVIDIA Dynamo**, **llm-d** (CNCF Sandbox, Mar 2026). This is the current serving architecture. | Teach vLLM as the workhorse, then disaggregation + Dynamo + llm-d + Gateway API Inference Extension. |
| "GPU scheduling", "MIG" | Device-plugin model is legacy. **DRA** went **GA in K8s 1.34**; NVIDIA donated the DRA driver to CNCF (KubeCon EU 2026). **KAI Scheduler** (Run:ai, open-sourced), **Kueue** (gang scheduling, quotas). | A dedicated "GPUs on Kubernetes" module: GPU Operator → DRA → MIG → KAI/Kueue. |
| "Ingress" | New networking goes **only into Gateway API**; Ingress-NGINX retired **Mar 31 2026**. | Gateway API is primary; Ingress taught as legacy context. |
| "service mesh" (generic) | **Istio ambient mode GA** (ztunnel + waypoint); **Cilium/eBPF** sidecar-less is the de-facto direction. | Teach the data plane: sidecar → ambient → eBPF, with the trade-offs. |
| "Terraform" | Terraform is **BSL-licensed** since Aug 2023; **OpenTofu** (Linux Foundation, MPL) is the open fork. | Teach HCL on Terraform/OpenTofu and the licensing decision as a real 2026 choice. |
| Prometheus/Grafana/OTel/Loki/Jaeger | **OpenTelemetry graduated CNCF (May 2026)**; a **4th signal — profiles** (continuous profiling, eBPF) is now in OTel. | OTel-centric pipeline + profiling + eBPF auto-instrumentation. |
| AI security as a bullet list | Needs anchoring to **OWASP LLM Top 10 (2026)** + **OWASP Agentic AI Top 10 v1.0 (Dec 2025)**; prompt injection #1, excessive agency #3. | Security booklet maps every AI risk to these frameworks. |
| Phase 1 front-loads AWS+K8s+Terraform | You can't reason about any of it without Linux + networking + distributed fundamentals first. | Reordered: Linux → Networking → Distributed → Data → Cloud → K8s → IaC → SRE → GPU → Serving → Security → Architecture. |
| Cost mentioned in passing | AI infra is a **cost game** ($/token, spot, MIG, bin-packing, autoscale-to-zero). | FinOps threaded through Cloud, K8s, GPU, and Serving booklets. |
| Symptoms listed ("why p99 4s?") | No troubleshooting **method**. | SRE booklet teaches USE/RED, flamegraphs, trace-the-request, runbooks, RCA as a first-class skill. |
| Go "highly recommended" | Per your choice, dropped as a unit. | Explained only where it matters (why controllers/operators are Go). |

### 3c. Prerequisite / build-order graph (text-first per house rules)

```
                         ┌─────────────────────────────┐
                         │  EXISTING BACKEND KNOWLEDGE  │
                         │ Node/TS · Py/FastAPI · Docker│
                         │ Redis · RabbitMQ · Mongo     │
                         │ AWS basics · µservices · obs │
                         └──────────────┬──────────────┘
                                        │
             ┌──────────────────────────┼──────────────────────────┐
             ▼                          ▼                           
   ┌───────────────────┐      (everything below needs the machine + the wire)
   │ 1 LINUX & THE      │
   │   MACHINE          │──────────────┐
   │ procs·mem·cgroups· │              │
   │ namespaces·eBPF    │              ▼
   └─────────┬──────────┘    ┌───────────────────┐
             │               │ 2 NETWORKING       │
             │               │ TCP·DNS·TLS·HTTP/3 │
             │               │ gRPC·LB·eBPF       │
             │               └─────────┬──────────┘
             └──────────────┬──────────┘
                            ▼
                 ┌───────────────────┐        ┌───────────────────┐
                 │ 3 DISTRIBUTED SYS  │───────▶│ 4 DATA SYSTEMS     │
                 │ time·replication·  │        │ LSM/B-tree·Kafka·  │
                 │ consensus·CAP·saga │        │ Postgres·Dynamo·   │
                 └─────────┬──────────┘        │ caching·streaming  │
                           │                   └─────────┬──────────┘
                           └──────────┬──────────────────┘
                                      ▼
                           ┌───────────────────┐
                           │ 5 AWS (operate it) │
                           │ IAM·VPC·EKS·data·  │
                           │ cost               │
                           └─────────┬──────────┘
                                     ▼
                           ┌───────────────────┐
                           │ 6 KUBERNETES       │
                           │ control plane·     │
                           │ Gateway API·HPA·   │
                           │ operators·GitOps   │
                           └─────────┬──────────┘
                                     ▼
                     ┌───────────────┴───────────────┐
                     ▼                               ▼
          ┌───────────────────┐           ┌───────────────────┐
          │ 7 IaC & PLATFORM   │           │ 8 OBSERVABILITY &  │
          │ Terraform/OpenTofu │           │   SRE              │
          │ modules·state·     │           │ OTel·SLO·profiling │
          │ GitOps·policy      │           │ trace·incident·RCA │
          └─────────┬──────────┘           └─────────┬──────────┘
                    └───────────────┬────────────────┘
                                    ▼
                          ┌───────────────────┐
                          │ 9 GPU & AI INFRA   │
                          │ VRAM·KV cache·     │
                          │ DRA·MIG·KAI·Kueue  │
                          └─────────┬──────────┘
                                    ▼
                          ┌───────────────────┐
                          │ 10 SERVING LLMs &  │
                          │   AI PLATFORM      │
                          │ vLLM·disagg·Dynamo·│
                          │ llm-d·AI gateway   │
                          └─────────┬──────────┘
                                    ▼
                          ┌───────────────────┐   (spine over everything)
                          │ 11 SECURITY        │
                          │ IAM·mTLS·secrets·  │
                          │ supply chain·OWASP │
                          │ LLM+Agentic        │
                          └─────────┬──────────┘
                                    ▼
                          ┌───────────────────┐
                          │ 12 ARCHITECTURE &  │
                          │   CAPSTONES        │
                          │ multi-region·DR·   │
                          │ 3 projects + 1 cap │
                          └─────────┬──────────┘
                                    ▼
                          ┌───────────────────┐
                          │ INTERVIEW & SYSTEM │
                          │ DESIGN BANK        │
                          └───────────────────┘
```

### 3d. Booklet breakdown (folders under `books/tech/ai-systems-infra/`)

| # | Folder | Booklet | Core of it |
|---|---|---|---|
| 1 | `01-linux-machine` | Linux & the Machine Underneath | processes, scheduling, virtual memory/OOM, fds/epoll, namespaces+cgroups (a container *is* a process), syscalls, perf/strace/eBPF, flamegraphs |
| 2 | `02-networking` | Networking for Infra Engineers | TCP handshake/congestion, IP/CIDR/routing/NAT, DNS deep, TLS 1.3/mTLS/PKI, HTTP/1.1→2→3 (QUIC), gRPC, L4/L7 LB, CDN/Anycast, tcpdump/ss debugging |
| 3 | `03-distributed-systems` | Distributed Systems: Reasoning About Failure | partial failure, clocks/ordering, replication, partitioning/consistent hashing, consistency models + CAP/PACELC, Raft, transactions/2PC/sagas, delivery semantics + idempotency, retries/circuit breakers/backpressure, tail latency + Little's Law, event sourcing/CQRS |
| 4 | `04-data-systems` | Data Systems: Storage Engines to Streaming | B-tree vs LSM + WAL/compaction, Postgres/MVCC, DynamoDB, Cassandra, Redis/Mongo (deepen), caching patterns + stampede, RabbitMQ vs **Kafka**, etcd, the store-selection framework |
| 5 | `05-aws` | AWS: Operating a Cloud for Real Systems | IAM deep + STS/OIDC, VPC/SG/NACL/endpoints, EC2/ECS/EKS/Lambda, ALB/NLB/Route53/CloudFront, RDS/Dynamo/ElastiCache/S3, SQS/SNS/EventBridge, KMS/Secrets/CloudWatch/ECR, cost/FinOps, LocalStack |
| 6 | `06-kubernetes` | Kubernetes: How It Actually Works | control plane + reconcile loop, pods→deployments→services, CNI + **Gateway API**, PV/PVC/CSI/StatefulSets, Jobs/CronJobs/DaemonSets/sidecars, requests/limits/QoS/probes/affinity/taints, HPA/VPA/Karpenter, Helm/Kustomize, operators/CRDs, GitOps, debugging pods |
| 7 | `07-iac-platform` | Infrastructure as Code & Platform Engineering | declarative/state/drift, **Terraform/OpenTofu** (modules, remote state+locking, workspaces) + BSL story, multi-env, build VPC→EKS→RDS→cache→LB→S3→IAM→monitoring in code, GitOps + policy-as-code, golden paths |
| 8 | `08-observability-sre` | Observability & SRE | 4 signals incl. **profiles**, **OpenTelemetry**/OTLP/collector/eBPF, Prometheus/PromQL/RED/USE, Grafana/Loki/Tempo/Alertmanager, correlation IDs, SLI/SLO/error budgets, p99 + coordinated omission, load testing (k6), chaos, incident method + RCA |
| 9 | `09-gpu-ai-infra` | GPU & AI Infrastructure | CPU vs GPU/SIMT, CUDA model (concepts), VRAM/HBM, Tensor cores, FP32→FP8/INT4 + quantization, prefill/decode + **KV cache** + PagedAttention + continuous batching, NCCL/NVLink/parallelism, **GPUs on K8s: Operator→DRA→MIG→KAI/Kueue**, GPU cost |
| 10 | `10-serving-ai-platform` | Serving LLMs & AI Platform Architecture | **vLLM**, **SGLang**, **TensorRT-LLM**, Triton, Ray Serve; **disaggregated prefill/decode**; **NVIDIA Dynamo**; **llm-d** + Gateway API Inference Extension; **AI gateway** (LiteLLM/Envoy AI GW) routing/fallback/rate-limit/token-accounting/multi-tenancy; full architecture + SLOs + cost/token |
| 11 | `11-security` | Security: Cloud, Kubernetes & AI | IAM/RBAC/ABAC/OIDC/workload identity, network sec + mTLS + zero trust, secrets/Vault/KMS/cert-manager, PSS/image scanning/**SBOM**/**cosign**/admission (OPA/Kyverno)/runtime (Falco/eBPF)/SLSA, **AI security mapped to OWASP LLM Top 10 2026 + Agentic Top 10 v1.0** |
| 12 | `12-architecture-capstones` | Architecture & The Capstones | multi-AZ/multi-region, active-active/passive, DR (RPO/RTO), failover, global routing, multi-tenancy; AI platform reference architecture; **3 projects + 1 combined capstone** + ADRs |
| — | `13-interview-bank` | Interview & System Design Bank | per-domain conceptual Q's + full system-design walkthroughs ("serve an LLM to 10M req/day", "design a GPU scheduler", "secure multi-tenant inference") + staff-level "defend the decision" drills |
| — | `backmatter` | Unified glossary | every term, one line, non-circular |
| — | `masterVolume` | Bound complete volume | all booklets in one PDF, like `ai-engineering-complete` |

### 3e. Phases, difficulty, hours (study time for the reader, not build time)

Difficulty 1–5. Hours include hands-on.

| Phase (ladder) | Booklets | Difficulty | Hours | Outcome |
|---|---|---|---|---|
| **Foundation** | 1 Linux, 2 Networking | ★★☆☆☆ → ★★★☆☆ | 60–80 | Explain OOM kills, p99 spikes, "A can't reach B" from first principles |
| **Core** | 3 Distributed, 4 Data | ★★★★☆ | 90–120 | Reason about consistency, consensus, replication, store choice |
| **Intermediate** | 5 AWS, 6 K8s, 7 IaC | ★★★☆☆ → ★★★★☆ | 120–160 | Stand up + operate a real cluster and its cloud, all in code |
| **Production** | 8 Observability/SRE | ★★★☆☆ | 40–60 | Trace a request end-to-end, set SLOs, run an incident |
| **Advanced (differentiator)** | 9 GPU, 10 Serving | ★★★★★ | 100–140 | Serve LLMs efficiently on GPUs on K8s, with cost control |
| **Advanced (moat)** | 11 Security | ★★★★☆ | 50–70 | Secure the whole stack; harden an agent against OWASP risks |
| **Expert** | 12 Architecture + capstones, 13 Interview bank | ★★★★★ | 120–200 | Design + defend staff-level systems; pass the interviews |

**Total ≈ 580–830 hrs ≈ ~12 months at 12–16 hrs/week.**

### 3f. Recommended resources (primary sources, per phase)

- **Linux/Machine:** *The Linux Programming Interface* (Kerrisk); Brendan Gregg *Systems Performance* + *BPF Performance Tools*; man7.org; Julia Evans zines.
- **Networking:** *Computer Networking: A Top-Down Approach*; Cloudflare Learning Center; relevant RFCs (TCP, QUIC, TLS 1.3); `tcpdump`/`wireshark` docs.
- **Distributed:** *Designing Data-Intensive Applications* (Kleppmann) — the backbone; MIT **6.824** labs (Raft); the **Raft** paper; *Database Internals* (Petrov); Jepsen analyses.
- **Data:** DDIA; Postgres official docs; *Kafka: The Definitive Guide*; store-specific docs.
- **AWS:** AWS **Well-Architected Framework**; AWS docs; Adrian Cantrill courses (concepts, not cert drilling).
- **Kubernetes:** official docs; *Kubernetes Up & Running*; **Kubernetes the Hard Way** (Hightower); *Programming Kubernetes* (operators); Gateway API docs.
- **IaC:** Terraform / **OpenTofu** docs; *Terraform: Up & Running* (Brikman).
- **Observability/SRE:** Google **SRE** books (free); *Observability Engineering* (Majors et al.); **OpenTelemetry** docs; Prometheus docs.
- **GPU/AI infra:** NVIDIA docs; **vLLM** / **SGLang** / **TensorRT-LLM** docs; **NVIDIA Dynamo** + **llm-d** docs; GPU MODE lectures; *Programming Massively Parallel Processors* (concepts only).
- **Security:** **OWASP** LLM Top 10 (2026) + Agentic Top 10 v1.0; CIS Benchmarks; *Container Security* (Liz Rice); Sigstore docs; NIST zero-trust.
- **Architecture/interview:** DDIA; *System Design Interview* vol 1–2 (Alex Xu); *Understanding Distributed Systems* (Vitillo); company engineering blogs.

---

## 4. Tasks

- [x] Approve plan (title, booklet count, blocks) — approved 2026-10-02
- [x] Rename folder → `books/tech/ai-systems-infra/`; add series `meta.json` (order, masterVolume, cover) + `theme.css`
- [x] Add `lab` + `incident` blocks — scoped to the series `meta.json` + styled in series `theme.css`
- [x] Full series scaffold / page-level TOC → `ai-systems-infra/outline.md`
- [ ] Frontmatter + backmatter skeleton (preface, glossary stubs, about-author, copyright)
- [x] Booklet 1 — Linux & the Machine (6 modules, 22 content pages → 24 printed; builds clean)
- [x] Booklet 2 — Networking (6 modules, 24 content pages → 26 printed; builds clean)
- [x] Booklet 3 — Distributed Systems (8 modules, 34 content pages → 36 printed; builds clean)
- [x] Booklet 4 — Data Systems (6 modules, 25 content pages → 26 printed; builds clean)
- [x] Booklet 5 — AWS (6 modules, 23 content pages → 24 printed; builds clean)
- [x] Booklet 6 — Kubernetes (6 modules, 28 content pages incl. close → builds clean, zero overflow)
- [x] Booklet 7 — IaC & Platform (4 modules, 21 content pages incl. close → builds clean, zero overflow)
- [x] Booklet 8 — Observability & SRE (5 modules, 22 content pages incl. close → builds clean, zero overflow)
- [ ] Booklet 9 — GPU & AI Infra
- [ ] Booklet 10 — Serving & AI Platform
- [ ] Booklet 11 — Security
- [ ] Booklet 12 — Architecture & Capstones
- [ ] Booklet 13 — Interview Bank
- [ ] Unified glossary (backmatter)
- [ ] Bound complete volume
- [ ] Verification pass (fact + consistency) across all pages — main agent, no subagents

---

## 5. First module (detailed outline — pages written on your go)

**Booklet 1, Module 1 — "What your program is actually standing on"** (the opening of the Linux booklet).
Page = one `.md`. This is the outline; the prose + SVG diagrams get written after approval.

1. `01-01-why-the-machine-matters` (`##`) — the layered picture: your request rides the kernel, the
   scheduler, virtual memory, the network stack. Every production mystery bottoms out here. Sets the lens.
   SVG: the stack from syscall → kernel → hardware.
2. `01-02-a-process-is-the-unit` (`##`) — what a process is (address space + threads + fds), fork/exec,
   the process tree, PID 1. Mental model: the OS lends the CPU; a process never owns it.
3. `01-03-how-the-scheduler-shares-the-cpu` (`##`) — run queue, time slices, context switch cost,
   run/sleep/zombie states, load average vs utilization (the classic misread). SVG: states + transitions.
4. `01-04-virtual-memory-and-the-oom-killer` (`##`) — virtual vs physical, pages, page cache, swap,
   RSS vs VSZ, and **why pods get OOM-killed**. Ties straight to a real failure the reader will hit. SVG: virtual→physical mapping.
5. `01-05-file-descriptors-and-epoll` (`##`) — everything is a file; fds; blocking vs non-blocking;
   `epoll` and why one Node/async process serves thousands of connections. Connects to their Node knowledge.
6. `01-06-namespaces-and-cgroups` (`##`) — **a container is a process with namespaces (what it sees) +
   cgroups (what it can use)**, not a VM. Demystifies Docker from the kernel up. SVG: namespaces vs cgroups.
7. `01-07-seeing-inside-with-perf-and-ebpf` (`##`) — `/proc`, `strace`, `perf`, flamegraphs, and a first
   look at **eBPF** (safe kernel programs for observability) — the thread pulled through the whole series.

Each page ends with the house pattern folded in where it fits: a `:::lab` (hands-on, local/free), a
common-mistake call-out, when-not-to-care, and an `:::interview` framing. Module closes with:
**Key concepts → practical task → questions → checkpoint → what's next** (Module 2: filesystems, systemd, logs).

---

## 6. Updates

- **2026-10-02** — Spec created after a 2-round grill and a 2026 research pass (serving, GPU-on-K8s,
  Gateway API, service mesh, IaC licensing, observability, OWASP).
- **2026-10-02** — Plan approved (all §2 questions resolved). Scaffolding done: folder renamed to
  `ai-systems-infra`; series `meta.json` + `theme.css` written; `lab`/`incident` blocks added and styled.
  Full page-level TOC for all 13 booklets + front/backmatter written to `ai-systems-infra/outline.md`.
  Verified-facts and resume pointer recorded in §2.
- **2026-10-03** — Style contract written (`ai-systems-infra/style-guide.md`) and approved against Booklet 1 Module 1. **Booklet 01 `01-linux-machine` fully written** (Modules 1–6: machine/process/kernel; scheduler-EEVDF/load/context-switch; virtual-memory/page-cache/OOM/swap; fds/blocking/epoll; namespaces/cgroups/container=process/capabilities; /proc/strace/perf/eBPF/systemd). 22 content pages → 24 printed, builds clean, cover drawn. A5 density rule calibrated. **Next:** Booklet 02 Networking.
- **2026-10-03** — **Booklet 02 `02-networking` fully written** (Modules 1–6: layers/IP/CIDR/routing/NAT/MTU; TCP handshake/flow+congestion/UDP/HOL; DNS/TLS1.3/mTLS; HTTP1.1/2/3+QUIC/gRPC/WS+SSE; L4-vs-L7/proxies/CDN+Anycast/pooling; toolbox/p99-breakdown/eBPF+Hubble). 24 content pages → 26 printed, builds clean. Booklet close split to its own page to fix overflow. **Next:** Booklet 03 Distributed Systems.
- **2026-10-03** — **Booklet 03 `03-distributed-systems` fully written** (8 modules, 34 content pages → 36 printed, builds clean). Modules: partial-failure/impossibility/latency; clocks/Lamport/vector; replication (leader/multi/leaderless, quorum, CRDT/gossip); partitioning (hash/range/consistent-hashing/hot-keys); consistency ladder/CAP/PACELC; consensus/Raft/quorums/split-brain/fencing; ACID/2PC/sagas/delivery/idempotency/outbox; resilience (timeouts/retries/breakers/bulkheads/backpressure/Little's-Law/tail-at-scale) + event-sourcing/CQRS. **Next:** Booklet 04 Data Systems.
- **2026-10-03** — **Booklet 04 `04-data-systems` fully written** (6 modules, 25 content pages → 26 printed, builds clean). Modules: storage engines (B-tree/LSM/WAL/amplification); Postgres (MVCC/indexes+planner/isolation/replication); NoSQL (DynamoDB single-table/Cassandra/Mongo/selection-framework); caching (Redis-as-structures/patterns/stampede); messaging (queue-vs-log/RabbitMQ/Kafka/delivery+compaction/when-each); etcd. Verified facts used: Redis 8 AGPL (2025) + Valkey BSD fork (ElastiCache default); Postgres 18 (2025, async I/O). **Next:** Booklet 05 AWS.
- **2026-10-03** — **Booklet 05 `05-aws` fully written** (6 modules, 23 content pages → 24 printed, builds clean first try). Modules: identity (shared-responsibility/IAM/roles+STS/OIDC+IRSA); network (VPC/subnets/routing+NAT/SG-vs-NACL/endpoints+PrivateLink); compute+edge (EC2+spot/ECS-EKS-Lambda/ALB-NLB/Route53+CloudFront); data+messaging (S3/RDS+Aurora/DynamoDB+ElastiCache/SQS-SNS-EventBridge); operate+secure (KMS+Secrets/CloudWatch+ECR); cost+scale (pricing model/spot+savings/design-for-10M-rpd). **Next:** Booklet 06 Kubernetes.
- **2026-10-03** — **Booklet 06 `06-kubernetes` fully written** (6 modules, 28 content pages incl. close → 30 printed, builds clean, zero overflow). Modules: the model (reconcile loop/control-plane/node-components/API+objects); workloads (pods+pause/Deployment→ReplicaSet/Services+EndpointSlice/Job-CronJob-DaemonSet/StatefulSet/init+native-sidecars); config-health-sched (ConfigMap-Secret/requests-limits-QoS/probes/affinity-taints-topology/PDB); net+storage (CNI flat network/CoreDNS+ndots/Gateway API/PV-PVC-StorageClass-CSI); scale+package (HPA-VPA+KEDA/Cluster-Autoscaler-vs-Karpenter/Helm-Kustomize/CRD+operators/GitOps); operate+debug (rollouts canary-bluegreen/debugging-pods/failure-recovery). **Verified at write time (Oct 2026):** K8s v1.36 current (1.34–1.36 maintained); Gateway API v1.6 (Jun 2026, TCPRoute/UDPRoute GA); kube-proxy nftables GA since 1.33 but iptables still default; reused spec facts (DRA GA 1.34, native sidecars stable 1.33, Ingress frozen/Ingress-NGINX retires Mar 31 2026, Karpenter donated to CNCF). **Next:** Booklet 07 IaC & Platform.
- **2026-10-03** — **Booklet 07 `07-iac-platform` fully written** (4 modules, 21 content pages incl. close → 23 printed, builds clean, zero overflow after trims). Modules: the idea (declarative-vs-imperative/state+drift/Terraform-vs-OpenTofu/plan+apply); writing it (providers+resources/variables-locals-outputs/modules/remote-state+locking/workspaces-vs-dir-per-env/secrets — split secrets across 02-06 + 02-07 continuation for fit); build the stack (VPC/EKS+IRSA/RDS-cache-ALB-S3/IAM-least-privilege/wiring-monitoring); platform eng (golden-paths/policy-as-code+lab/CI-CD-plan-on-PR/IDP-Backstage). **Verified at write time (Oct 2026):** Terraform BSL 1.1 since v1.6 (Aug 2023); OpenTofu MPL 2.0 / Linux Foundation, current **v1.12.x**, exclusive features (state encryption 1.7, provider for_each 1.9, -exclude 1.9, OCI 1.10); **Terraform 1.11 (Feb 2025) = S3-native state locking via `use_lockfile`, DynamoDB locking deprecated**; OPA graduated CNCF; Backstage CNCF **incubating** (Spotify). **Next:** Booklet 08 Observability & SRE.
- **2026-10-03** — **Booklet 08 `08-observability-sre` fully written** (5 modules, 22 content pages incl. close → 24 printed, builds clean, zero overflow after trims + 2 checkpoint continuation pages 02-05/03-05). Modules: the signals (metrics+RED/USE/logs-structured/traces-spans+propagation/profiles-continuous — 4th signal); the stack (OpenTelemetry+Collector/Prometheus+PromQL/Grafana-Loki-Tempo-Pyroscope/correlation+lab); SRE discipline (SLI-SLO-SLA/error-budgets/percentiles+coordinated-omission/MTTR-MTTD+alerting); keeping it up (capacity+Little's-Law+knee/k6-load-test+lab/chaos); when it breaks (incident-method mitigate-first/trace-the-request+incident/runbooks-RCA-postmortems). **Verified at write time (Oct 2026):** OTel graduated CNCF May 2026 (reused from spec); **Prometheus 3.0 (Nov 2024)** native histograms (stable 3.8 Nov 2025), UTF-8 names, OTLP receiver; **OTel Profiles = 4th signal, public alpha**, Elastic eBPF agent as Collector receiver. **Next:** Booklet 09 GPU & AI Infra.

## 7. Explanation

*(Filled in as booklets ship — the post-implementation walkthrough per house rules.)*
