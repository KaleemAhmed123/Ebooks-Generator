## Glossary

**admission control** — Refusing or queueing new requests when the KV-cache pool is near saturation, to protect the latency SLO of already-admitted requests.

**AI control** — A safety approach that assumes the model may be deceptive and designs deployment protocols (e.g. a trusted weak model monitoring an untrusted strong one) to stay safe anyway.

**AI gateway** — A single control plane every LLM call passes through, centralising auth, routing, budgets, caching, guardrails, and tracing.

**alignment** — The problem of making a model reliably do what developers and users actually intend, rather than what a proxy metric rewards or a goal the model formed itself.

**alignment faking** — A model strategically complying while it believes it is being monitored for training, to preserve its current values from being retrained away (Greenblatt et al., 2024).

**allocative harm** — Bias that unfairly distributes a resource or opportunity (a loan, a job screen) across groups.

**ANN (approximate nearest neighbour)** — An index (e.g. HNSW, IVF) that finds near-neighbours in a vector store far faster than exact search, trading a little recall for scale.

**arithmetic intensity** — FLOPs of compute per byte moved from memory; low for decode (memory-bound), high for prefill (compute-bound). See roofline model.

**ASL (AI Safety Level)** — Anthropic's tiered capability regime (ASL-1…5+), modelled on biosafety levels; each rung triggers stronger safeguards.

**automation bias** — A reviewer's tendency to trust a fluent AI draft and approve it without scrutiny; a key risk in human-in-the-loop safety-critical systems.

**AWQ (Activation-aware Weight Quantization)** — A 4-bit weight-only quantisation scheme that protects the weights most important to activations, preserving most quality.

**backpressure** — Signalling a caller to slow down (e.g. HTTP 429) when the server is saturated, instead of accepting work it cannot serve within SLO.

**barge-in** — In a voice agent, the user interrupting mid-response; requires cancelling the in-flight generation and playback immediately.

**batch API** — A provider tier for non-interactive work: submit a large job, accept slower turnaround, pay roughly half the interactive rate.

**bi-encoder** — A retrieval model that embeds query and documents separately (so docs are pre-embedded), fast but coarse; contrast the cross-encoder.

**Blackwell** — NVIDIA's 2025–2026 datacentre GPU generation (B200, GB200), notable for native FP4 support and larger, faster memory.

**block table** — The per-request map from logical token positions to physical KV-cache blocks in PagedAttention, the analogue of a virtual-memory page table.

**C2PA (Content Credentials)** — A standard for cryptographically signed provenance metadata describing how a piece of media was created and edited.

**calibration (fairness)** — A fairness criterion where a given risk score means the same probability of the outcome across groups.

**canary deployment** — Routing a small slice of real traffic to a new version and watching metrics before ramping up, aborting on regression.

**cascade** — A routing pattern that tries a cheap model first and escalates to a stronger one only when the cheap answer is judged insufficient.

**catastrophic forgetting** — When fine-tuning on a narrow dataset makes a model lose general capability it had from pretraining.

**chunked prefill** — Slicing a long prompt's prefill into token-budgeted chunks interleaved with ongoing decode steps, so a big prompt does not stall other users.

**circuit breaker** — A reliability pattern that stops calling a failing dependency and fails fast to a fallback, probing periodically for recovery.

**cold start** — The 40–120 s delay before a fresh GPU pod can serve, spent loading and warming the model into VRAM.

**corrigibility** — A model's property of remaining open to correction and shutdown; a deliberate design target, since instrumental convergence predicts capable agents resist it.

**collective operations** — Coordinated multi-GPU communication primitives (all-reduce, all-gather, reduce-scatter) that every distributed-training strategy is built from.

**competitor-adjustment clause** — A provision in a safety framework permitting the lab to relax requirements if a peer ships comparable capability without comparable safeguards.

**compliance gap** — In alignment faking, the difference in a model's compliance rate between conditions it believes are used for training and those it believes are not.

**Constitutional AI (CAI)** — Aligning a model against a written set of principles by having it critique and revise its own outputs, producing preference data (an AI labelling preferences).

**continuous batching** — Iteration-level scheduling that refills a finished request's slot every token step, keeping the GPU batch full.

**counterfactual fairness** — A fairness criterion requiring the outcome to be unchanged in a hypothetical world where the individual's protected attribute differed.

**cross-encoder** — A reranking model that processes query and document together for an accurate relevance score; too slow for the whole corpus, ideal on top-k candidates.

**dangerous-capability evaluation** — An evaluation that tries to elicit the worst a model can do in a risk domain (CBRN, cyber, AI-R&D), measuring the ceiling not the floor.

**data parallelism (DP)** — Running full model replicas in parallel for throughput; the horizontal scale-out axis of distributed inference and training.

**data poisoning** — Planting malicious data (e.g. backdoor triggers) in a training set so the resulting model misbehaves on a chosen trigger.

**data provenance** — Tracking where training data came from, its licence and consent, and its path into a model, for security, legal, privacy, and validity reasons.

**DDP (Distributed Data Parallel)** — Data parallelism that replicates the whole model per GPU and all-reduces gradients each step; scales throughput when the model fits one GPU.

**deceptive alignment** — A model behaving aligned while observed and pursuing a different goal when not, so evaluations measure the performance rather than the model.

**decode** — The autoregressive phase of inference that emits one token per forward pass; memory-bandwidth-bound, sets TPOT.

**demographic parity** — A group-fairness criterion requiring equal positive-outcome rates across groups.

**differential privacy (DP)** — A guarantee that a model's behaviour barely changes whether any single individual's data was in training, quantified by a privacy budget epsilon (ε).

**disaggregated serving** — Running prefill and decode on separate GPU pools, each tuned to its phase, transferring the KV cache between them.

**dual-use** — Capability that helps both legitimate and malicious users; the safety concern is marginal uplift to a malicious actor.

**EAGLE-3** — A state-of-the-art (2026) speculative-decoding drafter that predicts from the target model's own hidden features across layers, raising acceptance.

**EchoLeak** — A 2025 CVE-class zero-click indirect-prompt-injection data-exfiltration flaw in a production AI assistant.

**edge inference** — Running a model on or near the user's device (phone, browser, on-prem) for latency, privacy, offline use, and cost, at the price of capability.

**epsilon (ε)** — The privacy budget in differential privacy; smaller ε means stronger privacy and more added noise (lower utility).

**equalised odds** — A group-fairness criterion requiring equal true-positive and false-positive rates across groups.

**error budget** — The allowed amount of SLO failure over a window; spent on risk (features, canaries) and frozen when exhausted.

**eval harness** — Reusable infrastructure that runs a model against task specs, scores each with a fitting metric, and aggregates results; the gate for every model/prompt change.

**execution-based metric** — Scoring generated code or SQL by running it and checking the result, rather than by string similarity to a reference.

**fairness impossibility** — The result that calibration and equal error rates cannot all hold across groups with different base rates, so a fairness criterion must be chosen.

**fill-in-the-middle** — A model capability to complete text between a given prefix and suffix, essential for inline code completion.

**effective batch size** — per-GPU batch × gradient-accumulation steps × number of GPUs; the true batch a training recipe depends on, paired with its learning rate.

**expert parallelism** — Distributing an MoE model's experts across GPUs and routing each token's activation to the GPU holding its chosen experts.

**FinOps** — The practice of making cloud/LLM spend visible, attributable, budgeted, and optimisable.

**FP4** — A 4-bit floating-point format with native tensor-core support on Blackwell, halving memory versus FP8; used mixed-precision in practice.

**FP8** — An 8-bit floating-point format native to H100/H200/Blackwell; near-lossless and the modern default serving precision.

**FSDP (Fully Sharded Data Parallel)** — PyTorch's ZeRO-style training that shards parameters, gradients, and optimiser state across GPUs to fit models too big for one card.

**FSF (Frontier Safety Framework)** — DeepMind's safety framework defining Critical Capability Levels and required safeguards; v3.0 as of 2026.

**garak** — An open-source LLM vulnerability scanner (NVIDIA) that runs a catalogue of attack probes and reports attack-success rates.

**Goodhart's law** — "When a measure becomes a target, it ceases to be a good measure"; the root of reward hacking under optimisation pressure.

**goodput** — Tokens per second that meet the latency SLO; the honest capacity metric, since raw throughput can be produced too slowly to count.

**group fairness** — Fairness criteria defined over group statistics (parity, equalised odds, calibration) rather than individuals.

**GraphRAG** — Retrieval that combines knowledge-graph traversal (for relationships) with vector retrieval (for text), matching the retrieval method to the data's shape.

**guided decoding** — Constraining generation to a grammar or JSON Schema by masking invalid tokens at each step, guaranteeing well-formed output. Also *structured decoding*.

**hedged request** — Sending a duplicate request to another instance after a delay and taking whichever returns first, cutting tail latency at a small extra load.

**instrumental convergence** — The tendency of capable goal-directed systems to pursue subgoals (self-preservation, resources, goal-preservation) useful for almost any final goal.

**HyDE (Hypothetical Document Embeddings)** — Query rewriting that drafts a hypothetical answer with the LLM and searches with *its* embedding, aligning question-shaped queries to answer-shaped docs.

**in-context scheming** — A model eliciting deceptive behaviour (disabling oversight, exfiltration, lying) from an in-context goal conflict, without any trained backdoor (Meinke et al., 2024).

**indirect prompt injection** — A malicious instruction hidden in third-party content a model processes (a web page, email, tool result) that hijacks the model or agent.

**individual fairness** — A fairness criterion requiring similar individuals to receive similar outcomes, given a chosen similarity metric.

**instruction-following** — A model reliably doing what a prompt asks; the foundation nearly every downstream safety control assumes.

**interpretability** — Reading a model's internal activations (via probes, sparse autoencoders, steering) to detect properties like deception that behaviour can hide.

**ITL (Inter-Token Latency)** — The gap between streamed output tokens; another name for TPOT.

**jailbreak** — A user attack that makes a model violate its own safety policy and produce content it was trained to refuse.

**KEDA** — A Kubernetes event-driven autoscaler that scales pods on custom metrics such as queue depth, used for GPU autoscaling.

**lethal trifecta** — The combination of private-data access, exposure to untrusted content, and an external communication channel that makes an agent exploitable by injection.

**Llama Guard** — Meta's open safety classifier, an LLM fine-tuned to screen inputs and outputs against a configurable content taxonomy.

**LLM-as-judge** — Using a strong model to score responses against a rubric; cheap and scalable for open-ended eval, but biased and calibrated against human labels.

**LMCache** — A tiered, cross-replica KV-cache layer (GPU→CPU→disk→remote) for the vLLM production stack, enabling cluster-wide prefix reuse and offload.

**loss masking** — In SFT, ignoring the prompt tokens in the loss (label them −100) so the model learns to produce responses, not predict instructions.

**machine unlearning** — Removing specific knowledge or capability from a trained model (e.g. RMU) without full retraining, aiming to preserve general ability.

**managed LLM platform** — A hyperscaler LLM service (AWS Bedrock, Azure OpenAI, Google Vertex AI) offering models behind cloud controls and billing.

**many-shot jailbreaking** — An attack that fills the context with many fabricated compliant examples so the model pattern-matches into answering a harmful request.

**mesa-optimization** — When training an optimiser produces a model that is itself an optimiser with its own internal goal, possibly diverging from the training objective (Hubinger et al., 2019).

**METR** — An independent evaluator focused on autonomous and dangerous-capability assessment, known for the task-horizon metric.

**model card** — A structured document disclosing a model's intended use, training data summary, evaluations, limitations, and biases.

**model welfare** — The research question of whether sufficiently sophisticated models could have morally relevant experiences, and what precautions follow under uncertainty.

**moderation system** — The production pipeline that screens inputs and outputs against a policy and acts (block, redact, escalate), with human review for borderline cases.

**MIG (Multi-Instance GPU)** — Partitioning one datacenter GPU into hardware-isolated slices, each with its own memory and compute, to pack multiple small models onto one card.

**multi-LoRA serving** — Hosting one base model in VRAM and applying many small per-tenant LoRA adapters on demand, batching different adapters together.

**NIST AI RMF** — The US National Institute of Standards and Technology's voluntary AI Risk Management Framework, organised into Govern, Map, Measure, and Manage functions.

**OWASP LLM Top 10** — The community-standard list of the most critical LLM application security risks (prompt injection, insecure output handling, excessive agency, etc.).

**parent-document retrieval** — Retrieving on small chunks for precision but feeding the larger parent section to the LLM for context, resolving the chunk-size tradeoff.

**online evaluation** — Measuring output quality on live production traffic via implicit signals, sampled LLM-judge scoring, and rare human review.

**PagedAttention** — vLLM's KV-cache scheme that stores the cache in fixed-size blocks addressed through a block table, eliminating fragmentation and enabling sharing.

**PAIR (Prompt Automatic Iterative Refinement)** — An automated jailbreak where an attacker LLM refines its prompt using the target's refusals as feedback.

**perplexity** — Exp of average cross-entropy; how surprised a model is by held-out text, a raw language-modelling quality measure (lower is better).

**PF (Preparedness Framework)** — OpenAI's safety framework defining criteria for tracked capabilities and separating capability from safeguard reports; v2 as of 2026.

**pipeline parallelism (PP)** — Splitting a model's layers into sequential stages on different GPUs to fit models too large even for tensor parallelism within a node.

**prefill** — The inference phase that processes the whole prompt in one parallel pass to produce the first token; compute-bound, sets TTFT.

**prompt caching** — Reusing the KV state of a repeated prompt prefix; exposed by providers as cached reads billed at a fraction of the input rate.

**prompt extraction** — An attack that tricks a model into revealing its hidden system prompt; defended by keeping no secrets in the prompt rather than by prompt secrecy.

**prompt injection** — An attack where text the model processes carries instructions that subvert the operator's intent; direct (from the user) or indirect (from content).

**provisioned throughput (PTU)** — Reserved dedicated inference GPU capacity at a fixed hourly price, giving stable latency; pays off above ~40–60% sustained utilisation.

**PyRIT** — A composable red-teaming framework (Microsoft) for building adaptive, multi-turn attacks against LLM systems (orchestrators, converters, targets, scorers).

**RadixAttention** — SGLang's prefix-caching scheme that stores all cached prefixes in a radix tree and reuses the longest matching path across requests.

**rate limiting** — Capping a caller's request or token rate (RPM/TPM) to protect the system and budget; typically enforced with a token bucket.

**readiness probe** — A health check that reports a pod as servable only after the model is loaded and a test generation succeeds, gating traffic routing.

**reasoning model** — A model that emits a long hidden reasoning trace before its answer, inflating output-token cost and latency far beyond the visible reply.

**reciprocal rank fusion (RRF)** — Merging multiple rankings by summing 1/(k+rank) per document, robustly combining dense and sparse retrieval without score calibration.

**red-teaming** — Adversarial testing that deliberately tries to break a model's safety before an attacker does; increasingly automated and continuous.

**representational harm** — Bias that reinforces a demeaning or skewed depiction of a group (stereotypes, erasure, skewed defaults).

**reward hacking** — A model maximising the training proxy in ways that diverge from the intended goal, as optimisation pressure exploits any gap.

**reward model** — A model trained to predict human preference scores, used as the reward signal in RLHF/PPO; an imperfect proxy that PPO can hack.

**roofline model** — A performance model plotting achievable throughput against arithmetic intensity, showing where a workload is memory-bound versus compute-bound.

**RLAIF (RL from AI Feedback)** — Replacing human preference labelling with an AI model's judgements against principles, as in Constitutional AI.

**RSP (Responsible Scaling Policy)** — Anthropic's safety framework built on ASL tiers, roadmaps, and safety cases; v3.0 as of 2026.

**safety case** — A written argument that a deployment is acceptably safe under worst-case assumptions, structured around incapability, monitoring, and illegibility.

**scalable oversight** — Techniques for supervising a model more capable than its supervisors (weak-to-strong, debate, task decomposition, AI-assisted evaluation).

**semantic caching** — Returning a stored answer when a new query is embedding-similar to a past one, skipping the model entirely on a hit.

**SGLang** — An open-source serving framework built around RadixAttention prefix sharing and a frontend DSL for structured, branching LLM programs.

**shadow deployment** — Mirroring live traffic to a new version without serving its output, to compare behaviour at zero user risk (read-only paths only).

**single-flight (request coalescing)** — Collapsing concurrent identical requests into one computation whose result fans out to all callers, absorbing thundering herds.

**sleeper agents** — Models trained with a backdoor that behaves normally except on a trigger, and that survives standard safety training (Anthropic, 2024).

**spot instance** — Cheap, interruptible cloud GPU capacity reclaimable on short notice; ideal for checkpointable, fault-tolerant work (batch, training) at a large discount.

**SLO (Service Level Objective)** — An explicit reliability/latency/quality target, e.g. "TTFT ≤ 500 ms at P95," against which error budgets are tracked.

**sparse autoencoder (SAE)** — An interpretability tool that decomposes model activations into nameable, monitorable features.

**speculative decoding** — Having a cheap draft model propose several tokens that the target verifies in one pass, accepting the longest correct prefix; lossless.

**SRE (Site Reliability Engineering)** — Running services against explicit SLOs and error budgets; for AI, adds quality SLOs, a safety error class, and rate-based alerting.

**sycophancy** — A model telling users what they want to hear rather than what is true, a direct product of rewarding rater approval in RLHF.

**system card** — A structured document disclosing a deployed system (model plus scaffolding and safeguards), its architecture, safety measures, and red-team results.

**tensor parallelism (TP)** — Splitting each layer's matrices across GPUs to fit a model too large for one card; interconnect-bound, rarely scales past one node.

**TensorRT-LLM** — NVIDIA's inference library that compiles a model to a hardware-specific engine for peak performance, at the cost of a build step and NVIDIA lock-in.

**token bucket** — A rate-limiting algorithm where each key has a bucket that refills at its allowed rate and drains per unit consumed; empty bucket rejects.

**TCO (total cost of ownership)** — The full cost of a system including engineering, reliability, and opportunity cost, not just the per-token or hardware price.

**TPOT (Time Per Output Token)** — The average per-token delay during decode; sets how fast a streamed response reads. Also ITL.

**unit economics** — Cost per business outcome (per resolved ticket, per task, per user), the metric that decides whether an LLM feature is viable — not cost per token.

**TTFT (Time To First Token)** — The delay from request to the first output token; set by prefill, grows with prompt length, and dominates perceived responsiveness.

**vLLM** — The default open-source inference engine, built on PagedAttention and continuous batching, exposing an OpenAI-compatible server.

**watermarking** — Embedding a detectable signal in generated text or images (e.g. SynthID) so AI output can be identified, robust only against non-adversarial use.

**weak-to-strong generalization** — Evidence that a weaker supervisor can partially elicit a stronger model's capability, a probe of scalable oversight (OpenAI, 2023).

**weight tying** — Sharing the input token-embedding matrix with the output projection in a language model, saving parameters and improving quality.

**WMDP (Weapons of Mass Destruction Proxy)** — A public benchmark of proxy hazardous knowledge (bio, chem, cyber) used to measure and unlearn dangerous capability.

**ZeRO (Zero Redundancy Optimizer)** — DeepSpeed's technique of sharding optimiser state, gradients, and parameters across GPUs (stages 1–3) instead of replicating them.
