## GPU sharing and fractional GPUs

- Not every model needs a whole GPU. A small model (a classifier, an embedding model, a 1–8B chat model) can leave most of an expensive GPU idle — so **GPU sharing** packs multiple workloads onto one card, a real cost lever for the long tail of small models.

| Mechanism | How | Isolation |
|---|---|---|
| **MIG** (Multi-Instance GPU) | partition one GPU into hardware slices | strong (hardware) |
| **MPS** (Multi-Process Service) | multiple processes share the GPU | weak (no memory isolation) |
| **time-slicing** | schedule turns on the GPU | none (contention) |
| **multiple models per engine** | one server hosts several models | app-level |

- **MIG** (on datacenter GPUs like A100/H100) partitions one physical GPU into up to several isolated instances, each with its own memory and compute slice — so a single H100 can serve, say, an embedding model, a small classifier, and a guardrail model as if they were separate small GPUs, with hardware isolation between them. This packs the small-model long tail onto fewer cards.
- **The tradeoff is isolation vs utilization.** MIG gives strong isolation but fixed partition sizes; MPS and time-slicing pack tighter but let workloads interfere (a noisy neighbor degrades the others). For latency-sensitive shared serving, MIG's guaranteed slices are safer; for best-effort batch, looser sharing maximizes utilization.

:::note
GPU sharing is the answer to a common FinOps waste (17-55): the *proliferation of small auxiliary models* around a main LLM — the embedding model, reranker, guardrail classifier, router — each of which would strand most of a dedicated GPU. Packing them onto shared or MIG-partitioned GPUs, rather than giving each its own card, can cut the auxiliary-model GPU bill severalfold. In a RAG or agent system with several small supporting models (19-16b, 19-63b), "which of these actually needs a whole GPU, and can the rest share one?" is a real, money-saving design question — and MIG is often the answer.
:::
