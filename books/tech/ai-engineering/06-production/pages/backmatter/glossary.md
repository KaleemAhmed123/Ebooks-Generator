## Glossary

**admission control** — Refusing or queueing new requests when the KV-cache pool is near saturation, to protect the latency SLO of already-admitted requests.

**AI gateway** — A single control plane every LLM call passes through, centralising auth, routing, budgets, caching, guardrails, and tracing.

**AWQ (Activation-aware Weight Quantization)** — A 4-bit weight-only quantisation scheme that protects the weights most important to activations, preserving most quality.

**backpressure** — Signalling a caller to slow down (e.g. HTTP 429) when the server is saturated, instead of accepting work it cannot serve within SLO.

**batch API** — A provider tier for non-interactive work: submit a large job, accept slower turnaround, pay roughly half the interactive rate.

**Blackwell** — NVIDIA's 2025–2026 datacentre GPU generation (B200, GB200), notable for native FP4 support and larger, faster memory.

**block table** — The per-request map from logical token positions to physical KV-cache blocks in PagedAttention, the analogue of a virtual-memory page table.

**canary deployment** — Routing a small slice of real traffic to a new version and watching metrics before ramping up, aborting on regression.

**cascade** — A routing pattern that tries a cheap model first and escalates to a stronger one only when the cheap answer is judged insufficient.

**chunked prefill** — Slicing a long prompt's prefill into token-budgeted chunks interleaved with ongoing decode steps, so a big prompt does not stall other users.

**cold start** — The 40–120 s delay before a fresh GPU pod can serve, spent loading and warming the model into VRAM.

**continuous batching** — Iteration-level scheduling that refills a finished request's slot every token step, keeping the GPU batch full.

**data parallelism (DP)** — Running full model replicas in parallel for throughput; the horizontal scale-out axis of distributed inference.

**decode** — The autoregressive phase of inference that emits one token per forward pass; memory-bandwidth-bound, sets TPOT.

**disaggregated serving** — Running prefill and decode on separate GPU pools, each tuned to its phase, transferring the KV cache between them.

**EAGLE-3** — A state-of-the-art (2026) speculative-decoding drafter that predicts from the target model's own hidden features across layers, raising acceptance.

**edge inference** — Running a model on or near the user's device (phone, browser, on-prem) for latency, privacy, offline use, and cost, at the price of capability.

**error budget** — The allowed amount of SLO failure over a window; spent on risk (features, canaries) and frozen when exhausted.

**FinOps** — The practice of making cloud/LLM spend visible, attributable, budgeted, and optimisable.

**FP4** — A 4-bit floating-point format with native tensor-core support on Blackwell, halving memory versus FP8; used mixed-precision in practice.

**FP8** — An 8-bit floating-point format native to H100/H200/Blackwell; near-lossless and the modern default serving precision.

**goodput** — Tokens per second that meet the latency SLO; the honest capacity metric, since raw throughput can be produced too slowly to count.

**guided decoding** — Constraining generation to a grammar or JSON Schema by masking invalid tokens at each step, guaranteeing well-formed output. Also *structured decoding*.

**ITL (Inter-Token Latency)** — The gap between streamed output tokens; another name for TPOT.

**KEDA** — A Kubernetes event-driven autoscaler that scales pods on custom metrics such as queue depth, used for GPU autoscaling.

**LMCache** — A tiered, cross-replica KV-cache layer (GPU→CPU→disk→remote) for the vLLM production stack, enabling cluster-wide prefix reuse and offload.

**managed LLM platform** — A hyperscaler LLM service (AWS Bedrock, Azure OpenAI, Google Vertex AI) offering models behind cloud controls and billing.

**multi-LoRA serving** — Hosting one base model in VRAM and applying many small per-tenant LoRA adapters on demand, batching different adapters together.

**online evaluation** — Measuring output quality on live production traffic via implicit signals, sampled LLM-judge scoring, and rare human review.

**PagedAttention** — vLLM's KV-cache scheme that stores the cache in fixed-size blocks addressed through a block table, eliminating fragmentation and enabling sharing.

**pipeline parallelism (PP)** — Splitting a model's layers into sequential stages on different GPUs to fit models too large even for tensor parallelism within a node.

**prefill** — The inference phase that processes the whole prompt in one parallel pass to produce the first token; compute-bound, sets TTFT.

**prompt caching** — Reusing the KV state of a repeated prompt prefix; exposed by providers as cached reads billed at a fraction of the input rate.

**provisioned throughput (PTU)** — Reserved dedicated inference GPU capacity at a fixed hourly price, giving stable latency; pays off above ~40–60% sustained utilisation.

**RadixAttention** — SGLang's prefix-caching scheme that stores all cached prefixes in a radix tree and reuses the longest matching path across requests.

**rate limiting** — Capping a caller's request or token rate (RPM/TPM) to protect the system and budget; typically enforced with a token bucket.

**readiness probe** — A health check that reports a pod as servable only after the model is loaded and a test generation succeeds, gating traffic routing.

**reasoning model** — A model that emits a long hidden reasoning trace before its answer, inflating output-token cost and latency far beyond the visible reply.

**semantic caching** — Returning a stored answer when a new query is embedding-similar to a past one, skipping the model entirely on a hit.

**SGLang** — An open-source serving framework built around RadixAttention prefix sharing and a frontend DSL for structured, branching LLM programs.

**shadow deployment** — Mirroring live traffic to a new version without serving its output, to compare behaviour at zero user risk (read-only paths only).

**SLO (Service Level Objective)** — An explicit reliability/latency/quality target, e.g. "TTFT ≤ 500 ms at P95," against which error budgets are tracked.

**speculative decoding** — Having a cheap draft model propose several tokens that the target verifies in one pass, accepting the longest correct prefix; lossless.

**SRE (Site Reliability Engineering)** — Running services against explicit SLOs and error budgets; for AI, adds quality SLOs, a safety error class, and rate-based alerting.

**tensor parallelism (TP)** — Splitting each layer's matrices across GPUs to fit a model too large for one card; interconnect-bound, rarely scales past one node.

**TensorRT-LLM** — NVIDIA's inference library that compiles a model to a hardware-specific engine for peak performance, at the cost of a build step and NVIDIA lock-in.

**token bucket** — A rate-limiting algorithm where each key has a bucket that refills at its allowed rate and drains per unit consumed; empty bucket rejects.

**TPOT (Time Per Output Token)** — The average per-token delay during decode; sets how fast a streamed response reads. Also ITL.

**TTFT (Time To First Token)** — The delay from request to the first output token; set by prefill, grows with prompt length, and dominates perceived responsiveness.

**vLLM** — The default open-source inference engine, built on PagedAttention and continuous batching, exposing an OpenAI-compatible server.
