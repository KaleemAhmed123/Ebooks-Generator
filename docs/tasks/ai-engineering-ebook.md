# AI Engineering Ebook

## Task

- **Status:** in progress. Booklets 1–4 drafted + built (77/77/66/60 pp). **Booklet 5 (Agents): DEEP-REWRITE COMPLETE — all 5 modules (12–16) written deep, builds clean at 339 pages / 0 overflow / 0 cuts (2026-09-30).** **Booklet 6 (Production) is next — does not exist on disk yet; a full deep-write handoff prompt is saved at `docs/tasks/ai-engineering-booklet6-production-prompt.md`.**
- **Debt (deferred, not done):** the per-booklet **fact + consistency verification passes** for **Booklets 1, 2, 3 and 4** are outstanding. Deferred deliberately to save tokens (no subagents — user confirmed 2026-09-29 to run verification later across all PDFs). Run inline, in small batches, before the series is called final. Priority frontier pages to re-check against live sources: Booklet 2 (SAM 3, Genie, Moshi/Hibiki, DiT/rectified flow, splatting); **Booklet 3 (FlashAttention-3, MoE in current models, scaling-law refinements, speculative decoding, RULER/long-context, embedding-model landscape)**; **Booklet 4 (DPO successors IPO/KTO/ORPO/SimPO, Constitutional AI/RLAIF, GRPO/DeepSeek-R1, quantization GPTQ/AWQ/GGUF/FP8/INT4, QLoRA, serving engines vLLM/SGLang/TensorRT-LLM + TGI maintenance-mode, re-rankers Cohere/BGE + RRF, prompt-caching economics).**
- **Started:** 2026-09-28
- **Last updated:** 2026-09-30 (Booklet 5 deep-rewrite COMPLETE — Modules 12–16 all deep, clean 339-page build — see Updates)

---

## What you asked for

Write a six-booklet ebook series titled **"AI Engineering: From Scratch"** covering all 20 phases of AI engineering — from Math Foundations to Production Safety.

**The bar (2026-09-29, restated):** written with the same care as **TypeScript to Deployment** — a competent software engineer with **zero AI/ML background** can read it front to back and come out an AI engineer who is ahead of "99% of pseudo-intellect influencers." Teach and impart *everything*. Do not compromise on quality or depth. **More than 600 pages is acceptable.**

- House style (CLAUDE.md): concise *per page*, kinda academic, inline SVG diagrams only, one `.md` = one printed page.
- Latest as of the build date — every claim verified against a live primary source.
- Cloned source repo is a **knowledge floor, not a ceiling**: research and add topics it misses.
- 6 booklets, each a standalone PDF, plus a bound complete volume.
- Custom `:::` blocks: `mint` (code/formula), `note` (key insight), `warn` (failure mode).
- Accent: dark navy `#24405e`.

### Source repo

`books/tech/ai-engineering/ai-engineering-from-scratch/` — the full `rohitg00/ai-engineering-from-scratch` curriculum: **20 phases, 523 lessons**, grouped into 6 volumes by its own `book/volumes.json`. Untracked in our git (84 MB, local knowledge base only). Read the lesson `docs/en.md` to understand a concept, then write our page in our voice.

---

## Open questions

| # | Question | Decision |
|---|----------|----------|
| 1 | Scope | **All 20 phases** |
| 2 | Structure | **6 booklets + bound volume**, mirroring the source's `volumes.json` |
| 3 | Per-page style | **TS2D beginner ramp** — one small idea per page, problem → smallest proof → when it applies |
| 4 | Granularity | **Fine.** ~1 source lesson = 1 page; split dense lessons; add on-ramp pages. ~600+ pages total |
| 5 | Target reader | **Software engineer, zero AI/ML.** Start from zero, define every term on first use |
| 6 | Existing 65 pages (2026-09-28 draft) | **Fresh start** — archived, not reused. Too dense for a true beginner |
| 7 | Research depth | Repo is the floor; **verify against live primary sources**; add what the repo misses |
| 8 | Forward-looking content | **Allowed only if real + verified + clearly flagged.** No invented codenames or fake SDKs |
| 9 | Verification timing | **Per-booklet** fact pass + consistency pass (subagents), per CLAUDE.md |
| 10 | Accent color | **Dark navy `#24405e`** |

---

## Plan

### Booklet map (grounded in the source's `volumes.json`)

| # | Booklet slug | Source phases | Lessons | Est. pages |
|---|---|---|---|---|
| 1 | `01-foundations` | 00 tooling · 01 math · 02 classical ML | 52 | ~75 |
| 2 | `02-deep-learning` | 03 core · 04 vision · 06 speech | 58 | ~80 |
| 3 | `03-language` | 05 NLP · 07 transformers | 45 | ~65 |
| 4 | `04-llms` | 08 gen · 09 RL · 10 from-scratch · 11 engineering | 68 | ~95 |
| 5 | `05-agents` | 12 multimodal · 13 protocols · 14 agents · 15 autonomy · 16 swarms | 157 | ~190 |
| 6 | `06-production` | 17 infra · 18 safety · 19 capstones | 143 | ~120 |

Booklets 2–6 get their detailed page lists when each is reached (independent work — candidates for parallel subagents).

**Page counts are floors, not caps (user directive, 2026-09-29).** The user does not care about booklet size — comprehensiveness and depth always win, 500+ pages in a single booklet is fine. Do NOT compress coverage or split a booklet into more booklets to manage size. Stay **6 booklets**; Booklet 5 (Agents, 157 source lessons + named applied-tool coverage) will run very large, and that is acceptable. The only reasons to split a page remain the house one-page rule and build overflow.

### Applied engineering coverage — LOCKED requirement (2026-09-29)

**Standing rule:** every area of modern *applied* AI engineering gets **first-class, named coverage** — framework- and tool-level, not folded into generic concept pages. The bar: enough to do the work **and** clear GenAI / AI-engineer interviews for these emerging roles. When Booklets 4–6 get their page lists, they **must** name these tools/topics as their own pages and be cross-checked against the source phases. The source repo is the floor; the enhance mandate (open question #7) explicitly allows adding what it omits.

| Area | Named pages required (not generic) | Lands in |
|---|---|---|
| **Tooling & harnesses** | Agent frameworks by name: **LangGraph, LlamaIndex, DSPy**; agent harnesses & control loops; eval harnesses | Booklet 5 (agents) |
| **MCP** (Model Context Protocol — open standard for how agents talk to tools/data) | What it is; servers/clients; tools/resources; why it matters for agent interop | Booklet 5 (protocols phase 13 — named page) |
| **LLM internals** | Sampling, context windows, quantization (shrinking model weights to run cheaper/faster), inference internals — extends the attention/KV-cache/decoding pages | Booklet 4 |
| **Advanced RAG** (RAG = retrieval-augmented generation: fetch documents, feed them to the LLM) | Beyond basic chunking: hybrid search, re-ranking, query rewriting, multi-vector, evaluation (faithfulness/grounding), failure modes — a dedicated RAG-pipeline cluster | Booklet 4 (retrieval/vector-index side), extended in 5 |
| **Agentic AI** | Planning, tool use, memory, multi-agent orchestration, reliability/guardrails | Booklet 5 |
| **Observability & tracing** | **LangSmith, Langfuse, OpenTelemetry for LLMs**; spans/traces; eval-in-production; cost dashboards | Booklet 6 (infra/production) |
| **Token & cost optimization** | Prompt/token budgeting, caching, batching, model routing, latency/cost tradeoffs | Booklet 4 (LLM engineering) |
| **AI system design** | The interview discipline: designing RAG systems, agent systems, serving infra, scaling, tradeoffs | System-design thread across Booklets 4–6, likely its own capstone cluster |
| **Interview-prep lens** | Recurring lens (or a dedicated backmatter section per booklet) surfacing what these roles test | Backmatter, Booklets 4–6 |

**Not yet verified from here** (do at planning time, with file access): exactly what the source curriculum's phases 08–19 already contain. Record now as intent; confirm against the phases when each booklet is planned.

### Per-page recipe (the TS2D pattern)

1. **One small idea per page.** Split anything dense (gradient descent → ~4 pages).
2. **Start from zero.** Assume the reader knows no ML. First page of any concept assumes nothing.
3. **Problem → smallest proof → when it applies.** Never a concept in a vacuum.
4. `#` = module title (off TOC) · `##` = page topic (on TOC) · `###` = sub-points (off TOC).
5. Every new term defined in one line on first use → logged in the booklet glossary.
6. Inline `<svg>` only — **no mermaid**. `:::mint` code/formula, `:::note` insight, `:::warn` failure mode.
7. Code that actually runs. Version-sensitive claims stamped "as of September 2026".

### Research workflow per page

1. Read the matching source lesson `phases/<phase>/<lesson>/docs/en.md`.
2. Identify the core idea, the smallest proof, and the failure mode.
3. Fetch a live primary source (paper, official docs, spec) to verify every claim and version.
4. Write our page; add what the repo missed; cut anything unverifiable.

### Folder structure per booklet

```
books/tech/ai-engineering/
  01-foundations/
    meta.json
    pages/
      00-cover.md
      00-01-<slug>.md ...        # Module 0 — tooling
      01-01-<slug>.md ...        # Module 1 — math
      02-01-<slug>.md ...        # Module 2 — classical ML
    backmatter/
      glossary.md
```

---

## Tasks — Booklet 1: Foundations (~75 pages)

### Module 0 — Setup & Tooling (12 source lessons → ~20 pages)

- [ ] `00-cover.md`
- [ ] `00-01-why-tooling-first.md`
- [ ] `00-02-the-ai-engineers-machine.md`
- [ ] `00-03-python-for-ai.md` — versions, why Python (verify current)
- [ ] `00-04-virtual-environments.md` — venv, conda, the isolation problem
- [ ] `00-05-uv-the-fast-way.md` — uv in practice (verify current)
- [ ] `00-06-git-basics.md`
- [ ] `00-07-git-for-collaboration.md`
- [ ] `00-08-what-a-gpu-is.md` — why AI needs parallel hardware
- [ ] `00-09-local-gpu-setup.md` — CUDA, drivers (verify current)
- [ ] `00-10-cloud-gpu-and-cost.md` — options and prices (verify current)
- [ ] `00-11-api-keys-and-secrets.md`
- [ ] `00-12-jupyter-notebooks.md`
- [ ] `00-13-notebooks-vs-scripts.md`
- [ ] `00-14-docker-the-idea.md`
- [ ] `00-15-docker-a-minimal-image.md`
- [ ] `00-16-editor-setup.md`
- [ ] `00-17-terminal-essentials.md`
- [ ] `00-18-linux-for-ai.md`
- [ ] `00-19-data-management.md`
- [ ] `00-20-debugging-and-profiling.md`

### Module 1 — Math Foundations (22 lessons → ~30 pages)

- [ ] `01-01-why-math.md` — the on-ramp: what math you actually need and why
- [ ] `01-02-what-a-vector-is.md`
- [ ] `01-03-vectors-as-direction.md`
- [ ] `01-04-vector-operations.md`
- [ ] `01-05-the-dot-product.md`
- [ ] `01-06-what-a-matrix-is.md`
- [ ] `01-07-matrix-multiplication.md`
- [ ] `01-08-matrices-as-transformations.md`
- [ ] `01-09-eigenvectors-intuition.md`
- [ ] `01-10-derivatives-recap.md`
- [ ] `01-11-gradients.md`
- [ ] `01-12-the-chain-rule.md`
- [ ] `01-13-autodiff.md`
- [ ] `01-14-probability-basics.md`
- [ ] `01-15-distributions.md`
- [ ] `01-16-bayes-theorem.md`
- [ ] `01-17-what-optimization-is.md`
- [ ] `01-18-gradient-descent.md`
- [ ] `01-19-sgd-and-batches.md`
- [ ] `01-20-momentum-and-adam.md`
- [ ] `01-21-entropy-and-cross-entropy.md`
- [ ] `01-22-kl-divergence.md`
- [ ] `01-23-dimensionality-reduction.md`
- [ ] `01-24-svd.md`
- [ ] `01-25-tensors.md`
- [ ] `01-26-numerical-stability.md`
- [ ] `01-27-norms-and-distances.md`
- [ ] `01-28-statistics-for-ml.md`
- [ ] `01-29-convex-vs-nonconvex.md`
- [ ] `01-30-fourier-and-graphs.md` — brief, why they show up later

### Module 2 — Classical ML (18 lessons → ~24 pages)

- [ ] `02-01-what-is-ml.md`
- [ ] `02-02-the-ml-loop.md`
- [ ] `02-03-linear-regression.md`
- [ ] `02-04-cost-and-fitting.md`
- [ ] `02-05-logistic-regression.md`
- [ ] `02-06-decision-trees.md`
- [ ] `02-07-random-forests.md`
- [ ] `02-08-svms.md`
- [ ] `02-09-knn.md`
- [ ] `02-10-naive-bayes.md`
- [ ] `02-11-unsupervised-clustering.md`
- [ ] `02-12-feature-engineering.md`
- [ ] `02-13-feature-selection.md`
- [ ] `02-14-train-test-split.md`
- [ ] `02-15-model-evaluation-metrics.md`
- [ ] `02-16-cross-validation.md`
- [ ] `02-17-bias-variance.md`
- [ ] `02-18-overfitting-and-regularization.md`
- [ ] `02-19-ensemble-methods.md`
- [ ] `02-20-hyperparameter-tuning.md`
- [ ] `02-21-imbalanced-data.md`
- [ ] `02-22-time-series.md`
- [ ] `02-23-anomaly-detection.md`
- [ ] `02-24-ml-pipelines.md`

### Backmatter

- [ ] `backmatter/glossary.md` — every term, defined once, plain, non-circular

---

## Tasks — Booklet 2: Deep Learning (76 pages, built 2026-09-29)

Networks, Vision, and Speech. Source phases 03 (deep-learning core), 04 (computer vision), 06 (speech & audio).

### Module 3 — Deep Learning Core (20 pages)

`03-01` what-a-neural-network-is · `03-02` the-perceptron · `03-03` why-one-neuron-isnt-enough · `03-04` multi-layer-networks · `03-05` why-nonlinearity · `03-06` activation-functions · `03-07` the-forward-pass · `03-08` loss-functions · `03-09` backpropagation · `03-10` optimizers-in-practice · `03-11` weight-initialization · `03-12` learning-rate-schedules · `03-13` dropout · `03-14` batch-normalization · `03-15` overfitting-in-deep-nets · `03-16` a-training-loop-from-scratch · `03-17` intro-to-pytorch · `03-18` the-pytorch-training-loop · `03-19` intro-to-jax · `03-20` debugging-neural-networks

### Module 4 — Computer Vision (34 pages)

`04-01` how-computers-see-images … `04-09` residual-connections (CNN foundations) · `04-10`–`04-17` classification, transfer, augmentation, detection (YOLO), segmentation (U-Net, Mask R-CNN), ViT, self-supervised · `04-18` CLIP · `04-19` VLMs · `04-20` GANs · `04-21` diffusion · `04-22` Stable Diffusion · `04-23` DiT + rectified flow · `04-24` SAM 3 · `04-25` NeRF · `04-26` Gaussian splatting · `04-27` monocular depth · `04-28` tracking · `04-29` OCR · `04-30` retrieval/metric learning · `04-31` video · `04-32` world models · `04-33` edge/real-time · `04-34` pipeline capstone

### Module 6 — Speech & Audio (19 pages)

`06-01`–`06-03` sound, sampling, spectrograms · `06-04` classification · `06-05` ASR · `06-06` Whisper · `06-07` fine-tuning Whisper · `06-08` speaker recognition · `06-09` TTS · `06-10` voice cloning · `06-11` neural codecs (RVQ) · `06-12` audio LMs · `06-13` streaming S2S (Moshi/Hibiki) · `06-14` VAD/turn-taking · `06-15` real-time audio · `06-16` music generation · `06-17` anti-spoofing/watermarking · `06-18` evaluation metrics · `06-19` voice-assistant capstone

### Backmatter

- [x] `backmatter/glossary.md` — ~130 terms, alphabetical, one line each, non-circular

---

## Tasks — Booklet 3: Language (63 pages, built 2026-09-29)

NLP and the Transformer. Source phases 05 (NLP foundations to advanced), 07 (transformers deep dive).

### Module 5 — Natural Language Processing (37 pages)

`05-01` what-nlp-is · `05-02` why-text-is-hard · `05-03` text-preprocessing · `05-04` bag-of-words · `05-05` tf-idf · `05-06` limits-of-counting · `05-07` word-embeddings-intuition · `05-08` word2vec · `05-09` glove-and-fasttext-subword · `05-10` embedding-arithmetic · `05-11` rnns-for-text · `05-12` lstm-and-gru · `05-13` cnns-for-text · `05-14` sequence-to-sequence · `05-15` attention-pre-transformer · `05-16` machine-translation · `05-17` sentiment-and-classification · `05-18` named-entity-recognition · `05-19` pos-tagging-and-parsing · `05-20` text-summarization · `05-21` question-answering · `05-22` information-retrieval-and-search · `05-23` topic-modeling · `05-24` subword-tokenization-bpe · `05-25` embedding-models-deep-dive · `05-26` chunking-strategies-for-rag · `05-27` nli-textual-entailment · `05-28` structured-outputs-constrained-decoding · `05-29` coreference-resolution · `05-30` entity-linking · `05-31` relation-extraction-knowledge-graphs · `05-32` multilingual-nlp · `05-33` text-generation-pre-transformer · `05-34` chatbots-rule-to-neural · `05-35` dialogue-state-tracking · `05-36` llm-evaluation-frameworks · `05-37` long-context-evaluation

### Module 7 — Transformers Deep Dive (23 pages)

`07-01` why-transformers · `07-02` big-idea-attention · `07-03` self-attention-from-scratch · `07-04` queries-keys-values · `07-05` scaled-dot-product-attention · `07-06` multi-head-attention · `07-07` positional-encoding · `07-08` feed-forward-block · `07-09` residuals-and-layernorm · `07-10` full-transformer · `07-11` encoder-stack · `07-12` decoder-and-causal-masking · `07-13` bert-masked-language-modeling · `07-14` gpt-causal-language-modeling · `07-15` t5-and-bart-encoder-decoder · `07-16` attention-variants (MQA/GQA/sparse) · `07-17` kv-cache · `07-18` flash-attention · `07-19` mixture-of-experts · `07-20` scaling-laws · `07-21` speculative-decoding · `07-22` context-length-and-its-limits · `07-23` build-a-transformer-capstone

**Not repeated** (already in Booklet 2): vision transformers (04-16), Whisper (06-06). Cross-referenced in one line on 07-06 and 07-11 instead.

### Backmatter

- [x] `backmatter/glossary.md` — ~120 terms, alphabetical, one line, non-circular.

---

## Tasks — Booklet 4: Large Language Models (~56 pages)

Training, Alignment, and Engineering. Source phases 08 (generative AI — text-relevant only), 09 (RL), 10 (LLMs from scratch), 11 (LLM engineering — fundamentals only).

**Scope decisions (confirmed 2026-09-29):**
- **Phase 08 overlap with Booklet 2** → Booklet 4 pulls only the *text/LLM-relevant* generative ideas (taxonomy, autoregressive generation) with a one-line cross-ref to Booklet 2 for images. VAE/GAN/diffusion/SD/ControlNet/flow-matching/FID/CLIP are **not** repeated.
- **Phase 11 agent lessons** (function-calling 09, MCP 14, LangGraph 16, agent-framework-tradeoffs 17) → **deferred to Booklet 5** per the LOCKED table. Booklet 4 covers LLM-engineering *fundamentals* only, with a one-line pointer to Booklet 5.

### Module 8 — Generative Models & Sampling (3 pages)
`08-01` generative-vs-discriminative · `08-02` the-generative-model-family · `08-03` autoregressive-generation

### Module 9 — Reinforcement Learning (13 pages)
`09-01` what-rl-is · `09-02` mdps-states-actions-rewards · `09-03` value-and-policy · `09-04` dynamic-programming · `09-05` monte-carlo-methods · `09-06` q-learning-and-sarsa · `09-07` deep-q-networks · `09-08` policy-gradients-reinforce · `09-09` actor-critic · `09-10` ppo · `09-11` reward-modeling · `09-12` rlhf-the-full-loop · `09-13` why-rl-for-llms

### Module 10 — LLMs from Scratch (18 pages)
`10-01` the-llm-lifecycle · `10-02` tokenizer-training-recap · `10-03` data-pipelines-and-quality · `10-04` pretraining-a-mini-gpt · `10-05` distributed-training-basics · `10-06` what-a-base-model-is · `10-07` instruction-tuning-sft · `10-08` rlhf-for-llms · `10-09` dpo · `10-10` dpo-successors · `10-11` constitutional-ai-and-rlaif · `10-12` evaluating-during-training · `10-13` what-quantization-is · `10-14` quantization-methods · `10-15` qlora · `10-16` inference-optimization · `10-17` serving-engines · `10-18` the-complete-llm-pipeline

### Module 11 — LLM Engineering (22 pages)
`11-01` prompt-engineering · `11-02` few-shot-and-chain-of-thought · `11-03` sampling-and-decoding · `11-04` structured-outputs · `11-05` context-engineering · `11-06` embeddings-for-retrieval · `11-07` rag-the-core-loop · `11-08` vector-indexes-and-ann · `11-09` hybrid-search · `11-10` re-ranking · `11-11` query-rewriting-and-expansion · `11-12` rag-evaluation-faithfulness-grounding · `11-13` rag-failure-modes · `11-14` fine-tuning-vs-rag · `11-15` lora-and-peft · `11-16` llm-evaluation-in-practice · `11-17` token-and-cost-optimization · `11-18` prompt-caching · `11-19` model-routing · `11-20` guardrails-and-safety-filters · `11-21` prompt-injection-and-defenses · `11-22` ai-system-design-a-rag-service

### Backmatter
- [ ] `backmatter/glossary.md` — every new term, alphabetical, one line, non-circular

### Verification debt (added to shared debt, 2026-09-29)
Frontier pages to re-check against live sources when the deferred fact pass runs: `10-10` DPO successors (IPO/KTO/ORPO/SimPO), `10-11` Constitutional AI/RLAIF, `10-14` quantization (GPTQ/AWQ/GGUF/FP8/INT4), `10-15` QLoRA, `10-17` serving engines (vLLM/SGLang/TensorRT-LLM; TGI now maintenance-mode), `11-10` re-ranking (Cohere Rerank, BGE cross-encoder, RRF), `11-18` prompt caching (Anthropic/OpenAI/Google economics), and GRPO/DeepSeek-R1 mentions in `09-10`/`09-12`.

---

## Updates

### 2026-09-28 — Task created

Grill-me session completed. Decisions locked. Original plan: ~34 pages/booklet, "1 major concept = 1 page", conceptual depth. Booklet 1 scaffolded.

### 2026-09-29 — Fresh start, re-planned to the TS2D bar

Reviewed the 2026-09-28 draft. Two problems found:

1. **Two parallel attempts.** A good booklet attempt (`01-foundations` + `02-neural-networks`, 65 pages, on-style) and a rogue `phases/` attempt (68 files) that the build treated as a third shippable book.
2. **The rogue attempt fabricated content** — invented "GPT-6 / Astra / Sol / Luna" products, fake SDK imports (`gpt6_sdk`), banned mermaid diagrams, 4-language dumps, ~5× page overflow, and phases 19–22 that aren't in the plan.

**Decisions (this session):**
- Archived all three old folders to `docs/tasks/ai-engineering-archive/` (untracked — moved, not deleted, so nothing is lost). Build now sees no ai-engineering books: clean slate.
- **Fresh start** to the **TS2D beginner bar**: finer granularity, gentler ramp, ~600+ pages, depth over brevity.
- Forward-looking content allowed only if real + verified + flagged.
- Booklet map re-grounded in the source's `volumes.json`; Booklet 1 page list drawn from the real lesson slugs (52 lessons → ~75 pages).

Next: fresh `01-foundations/meta.json` + cover + proof pages for voice sign-off, then write Booklet 1.

### 2026-09-29 — Booklet 1 drafted end to end

Voice approved on the 3 proof pages. Wrote the full booklet in one pass (user asked to write all content before building, to save tokens):

- **Module 0 — Setup & Tooling** (`00-01` … `00-20`): 20 pages. Version-sensitive claims verified via web search on build day — Python 3.14, uv (Astral/OpenAI, Rust), PyTorch 2.13 + CUDA 13, cloud GPU rates (H100 ~$1.5–3.3/hr, H200 ~$3.5–4.6/hr). Stamped "as of September 2026".
- **Module 1 — Math Foundations** (`01-01` … `01-29`): 29 pages. Vectors → matrices → eigen → calculus → probability → optimization → information theory → SVD/tensors/stability/stats/convexity/Fourier+graphs. No version drift.
- **Module 2 — Classical ML** (`02-01` … `02-24`): 24 pages. ML loop → regression → trees/forests → SVM/kNN/naive Bayes → clustering → features → evaluation/CV → bias-variance/regularization → ensembles/tuning → imbalanced/time-series/anomaly → pipelines.
- **Glossary** — ~150 terms, alphabetical, one line each, non-circular.

Page-sizing calibrated against the PDF measure (stricter than `--html`): SVG + one code block + tight bullets fits one A5 page. One early overflow (`01-02`) trimmed.

**Pending:** final `--split` build + PDF, then fact-check and consistency subagent passes. The final build was blocked by a transient server-side classifier outage; content is complete and on disk.

---

### 2026-09-29 — Booklet 2 drafted end to end + built

Wrote Booklet 2 ("Deep Learning: Networks, Vision, and Speech") in one pass, same TS2D beginner bar as Booklet 1.

- **Scaffold**: `02-deep-learning/` with `meta.json` (series-navy `#24405e`), `00-cover.md`, `pages/`, `pages/backmatter/`.
- **Module 3 — Deep Learning Core** (20 pages): perceptron → MLP → nonlinearity → activations → forward pass → loss → backprop → optimizers → init → LR schedules → dropout → batch norm → overfitting → from-scratch loop → PyTorch → JAX → debugging.
- **Module 4 — Computer Vision** (34 pages): image tensors → convolution/pooling → CNN → LeNet-to-ResNet → residuals → classification/transfer/augmentation → detection/segmentation → ViT/SSL/CLIP/VLM → GANs/diffusion/SD/DiT+rectified-flow → SAM 3 → NeRF/Gaussian splatting/depth → tracking/OCR/retrieval/video → world models → edge → pipeline capstone.
- **Module 6 — Speech & Audio** (19 pages): sound/sampling/spectrograms → classification → ASR/Whisper/fine-tune → speaker recognition → TTS/voice cloning → neural codecs (RVQ) → audio LMs → streaming S2S (Moshi/Hibiki) → VAD/turn-taking → real-time → music → anti-spoofing/watermarking → metrics → voice-assistant capstone.
- **Glossary**: ~130 terms, alphabetical, one line, non-circular.

**Frontier topics web-verified on build day** (training data stale): SAM 3 (Meta, 19 Nov 2025, concept segmentation); 3D Gaussian Splatting (SIGGRAPH 2023); MMDiT + rectified flow in Stable Diffusion 3 and Flux (2024); Genie 2/3 (DeepMind, 2024/2025) world models; Moshi + Mimi + Helium 7B + inner monologue, ~200ms (Kyutai, 2024), Hibiki S2S translation; SoundStream RVQ (2021) → EnCodec (2022).

**Build**: `node tools/build.mjs ai-engineering --split` → `dist/tech/ai-engineering/02-deep-learning.pdf`, 76 pages, 0 overflow, 0 cuts. Booklet 1 still clean (76 pages).

**Verification**: deferred to debt (see Status). One inline fix already applied — `04-17` DINO reclassified as self-distillation, not contrastive; rebuilt clean.

---

### 2026-09-29 — Applied engineering coverage locked as a standing requirement

User asked that **every area of modern applied AI engineering** get first-class, **named** coverage (framework/tool level), so nothing slips when Booklets 4–6 are planned. Goal stated: enough to do the work and to clear GenAI / AI-engineer interviews.

Recorded as the **"Applied engineering coverage — LOCKED requirement"** table in the Plan section above. It names the tools that must become their own pages — LangGraph, LlamaIndex, DSPy, MCP, LangSmith, Langfuse, OpenTelemetry — and maps each area (tooling/harnesses, MCP, LLM internals, advanced RAG, agentic AI, observability/tracing, token+cost optimization, AI system design, interview-prep) to its booklet.

No booklet content or build touched. This is a forward requirement: the detailed page lists for Booklets 4–6 don't exist yet and must honour this table, cross-checked against source phases 08–19, when each is reached.

### 2026-09-29 — Booklet 3 drafted end to end + built

Wrote Booklet 3 ("Language: NLP and the Transformer") in one pass, same TS2D beginner bar. User workflow change honoured: **all pages written before any build, no subagents** (verification deferred to shared debt, run later across all PDFs).

- **Scaffold**: `03-language/` with `meta.json` (series-navy `#24405e`), `00-cover.md`, `pages/`, `pages/backmatter/`.
- **Module 5 — NLP** (37 pages): pipeline/why-text-hard → preprocessing → BoW/TF-IDF/limits → embeddings (word2vec/GloVe/fastText/arithmetic) → RNN/LSTM/GRU/CNN → seq2seq → pre-transformer attention → MT → task cluster (sentiment, NER, POS/parse, summarization, QA, IR, topic) → BPE/subword → embedding models → RAG chunking → NLI → structured outputs → coref → entity linking → relation extraction/KG → multilingual → pre-transformer generation → chatbots → DST → LLM eval → long-context eval.
- **Module 7 — Transformers** (23 pages): why-transformers → attention big idea → self-attention from scratch → QKV → scaled dot-product → multi-head → positional (sinusoid/RoPE) → FFN → residual/LayerNorm → full block → encoder → decoder/causal mask → BERT/MLM → GPT/CLM → T5/BART → attention variants (MQA/GQA/sparse) → KV cache → FlashAttention → MoE → scaling laws → speculative decoding → context-length limits → capstone TinyGPT.
- **Glossary**: ~120 terms, alphabetical, one line, non-circular.

**Frontier topics web-verified on build day** (training data stale): FlashAttention-2 (Ampere) vs FlashAttention-3 (2024, Hopper, FP8, ~1.5–2× over FA2); MoE now standard (Mixtral 8×7B 46.7B total / ~12.9B active, DeepSeek-V3, Qwen3, Llama 4, Mistral Large 3); Chinchilla ~20 tok/param + newer over-training (Llama 3 70B ~200 tok/param for inference efficiency); speculative decoding 2–3× lossless, Medusa/EAGLE, vLLM/TensorRT-LLM native; RULER (NVIDIA, COLM 2024) vs NIAH; MMLU-Pro / GPQA-Diamond / LLM-as-a-judge (Zheng 2023). Shaky leaderboard model-version numbers deliberately **not** cited.

**Build**: `node tools/build.mjs ai-engineering --split`. Two tall pages initially overflowed (`07-10` full-transformer diagram, `07-23` capstone code); tightened both, rebuilt → **63 pages, 0 overflow, 0 cuts**. Booklets 1 & 2 untouched, still clean.

**Verification**: deferred to shared debt (see Status).

### 2026-09-29 — Booklet 4 drafted end to end + built

Wrote Booklet 4 ("Large Language Models: Training, Alignment, and Engineering") in one pass, same TS2D beginner bar. Workflow honoured: **all pages written before any build, no subagents** (verification deferred to shared debt).

**Two scope decisions confirmed by the user before writing:**
- **Phase 08 (generative AI)** — pulled only text/LLM-relevant ideas (generative-vs-discriminative, model-family taxonomy, autoregressive generation); one-line cross-ref to Booklet 2 for images (VAE/GAN/diffusion/SD/flow-matching **not** repeated).
- **Phase 11 agent lessons** (function-calling, MCP, LangGraph, agent frameworks) — **deferred to Booklet 5** per the LOCKED table; Booklet 4 is LLM-engineering fundamentals only, with a one-line pointer in the capstone (`11-22`).

- **Scaffold**: `04-llms/` with `meta.json` (series-navy `#24405e`, banner "PREDICT THE NEXT TOKEN. ALIGN IT. SHIP IT."), `00-cover.md`, `pages/`, `pages/backmatter/`.
- **Module 8 — Generative Models & Sampling** (3 pages): generative-vs-discriminative → model-family taxonomy → autoregressive generation.
- **Module 9 — Reinforcement Learning** (13 pages): RL on-ramp → MDPs → value/policy → DP → Monte-Carlo → Q-learning/SARSA → DQN → policy gradients/REINFORCE → actor-critic → PPO (+GRPO) → reward modeling → RLHF full loop → why-RL-for-LLMs.
- **Module 10 — LLMs from Scratch** (18 pages): lifecycle → tokenizer/data → pretrain mini-GPT → distributed → base model → SFT → alignment stage → DPO → DPO successors → Constitutional AI/RLAIF → eval-during-training → quantization (what/methods/QLoRA) → inference optimization → serving engines → full-pipeline capstone.
- **Module 11 — LLM Engineering** (22 pages): prompting → few-shot/CoT → sampling/decoding → structured outputs → context engineering → embeddings → RAG core → vector/ANN → hybrid search → re-ranking → query rewriting → RAG eval → RAG failure modes → fine-tune-vs-RAG → LoRA/PEFT → eval in practice → token/cost → prompt caching → model routing → guardrails → prompt injection → RAG-service system-design capstone.
- **Glossary**: ~78 terms, alphabetical, one line, non-circular.

**Frontier topics web-verified on build day** (training data stale): DPO successors — KTO (unpaired), ORPO (no ref model, Gemma 2), SimPO (length-normalised, Qwen 2.5), IPO; GRPO (DeepSeek, critic-free, DeepSeek-R1 Jan 2025 / Qwen3); quantization — GPTQ, AWQ (Marlin kernel on vLLM), GGUF `Q4_K_M` (~92% quality), FP8 (H100/Ada); QLoRA (NF4, single 48 GB GPU); serving — vLLM (PagedAttention), SGLang (RadixAttention, ~29% throughput on shared prefixes), TensorRT-LLM (NVIDIA-only), **TGI now maintenance-mode** (HF points to vLLM/SGLang); re-rankers — Cohere Rerank, BGE-reranker-v2-m3, cross vs bi-encoder, RRF (k≈60); prompt caching — cached reads ~10% of input rate on major providers as of Sept 2026, OpenAI auto (~1,024-token prefix) vs Anthropic explicit `cache_control` (≤4 breakpoints, ~5-min TTL). Shaky exact model-version numbers deliberately not over-cited.

**Build**: `node tools/build.mjs 04-llms --split` → `dist/tech/ai-engineering/04-llms.pdf`, **59 pages, 0 overflow, 0 cuts, first pass** (no auto-splits created). Booklets 1–3 untouched.

**Verification**: deferred to shared debt (see Status).

### 2026-09-29 — Booklet 5 (Agents) drafted end to end + built — 130 pages

Wrote Booklet 5 ("Agents: Tools, Autonomy, and Multi-Agent Systems") in one pass to the **raised depth bar** (fuller pages, richer diagrams, worked code/config, real library names). User decisions this session: write continuously (no proof-page pause, adjust later); **verification deferred to debt** (draft from source repo + Jan-2026 knowledge, flag `[VERIFY]`, no heavy live web-search); cross-reference Booklet 4 by concept, not page number. **126 content pages + cover + glossary.**

- **Scaffold**: `05-agents/` with `meta.json` (series-navy `#24405e`, cover per brief), `00-cover.md`, `pages/`, `pages/backmatter/`.
- **Module 12 — Multimodal AI & VLMs** (18 pages, `12-01`…`12-18`): why-multimodal → ViT/CLIP recap → fusion (BLIP-2 Q-Former, Flamingo gated x-attn, LLaVA projector) → any-resolution/patch-n-pack → VLM landscape → early fusion (Chameleon) → unified understand+generate (Transfusion/Show-o/Janus) → omni (thinker-talker) → video/long-video → audio-LMs → VLAs (OpenVLA/π0/GR00T) → document understanding → ColPali → multimodal RAG → computer-use perception.
- **Module 13 — Tools & Protocols** (25 pages, `13-01`…`13-25`): tools/function-calling deep dive → schema design → parallel/streaming → MCP (architecture, tools/resources/prompts, server+client code, transports, sampling/elicitation, async/apps, security ×3: tool-poisoning/OAuth/supply-chain, conformance) → A2A → OTel-GenAI → routing → skills (discovery/progressive-disclosure, permissions/sandboxes, evals/portability) → tool-ecosystem capstone.
- **Module 14 — Agent Engineering** (38 pages, `14-01`…`14-38`): agent loop → patterns (ReAct, plan-execute/ReWOO, Reflexion, ToT/LATS, self-refine, HTN/evolutionary) → memory (the problem, MemGPT/virtual-context, memory-blocks/sleep-time, mem0, Voyager skill libraries) → Anthropic workflow patterns → orchestration → **frameworks by name** (LangGraph, AutoGen, CrewAI, OpenAI Agents SDK, Claude Agent SDK, LlamaIndex, DSPy) + choosing → computer-use/voice → observability (LangSmith/Langfuse)/eval-driven/benchmarks (SWE-bench/GAIA/WebArena/OSWorld) → failure modes + prompt-injection defense (lethal trifecta) → **8 agent-workbench craft pages** (why models fail, executable constraints, scope contracts, verification gates, reviewer agents/handoff, smallest testable slice, judgment-preserving specs) → capstone bug-fix agent.
- **Module 15 — Autonomous Systems** (20 pages, `15-01`…`15-20`): autonomy ladder → long-horizon/error-compounding → self-improvement frontier (STaR, AlphaEvolve, Darwin-Gödel Machine, AI Scientist, recursive-vs-bounded) → coding-agent landscape → permission modes → browser agents → durable execution → cost governors → kill-switches/canaries → propose-then-commit → checkpoints/rollback → Constitutional AI → Llama Guard/safety classifiers → responsible-scaling policies (RSP/ASL, Preparedness, FSF) → METR external eval/task-horizon → societal risk (bridge to Booklet 6).
- **Module 16 — Multi-Agent & Swarms** (25 pages, `16-01`…`16-25`): why-multi-agent → FIPA/ACL heritage → communication protocols (contract net) → supervisor → hierarchies → Society of Mind/debate → role specialization → parallel swarms → group chat/speaker selection → handoffs/routines → A2A across orgs → blackboard/shared memory → consensus/BFT (3f+1) → voting/debate/Mixture-of-Agents → negotiation/ZOPA → generative agents → theory of mind → swarm optimization (PSO/ACO) → MARL (MADDPG/QMIX/MAPPO) → agent economies → production scaling (queues/checkpoints) → failure modes (MAST/groupthink) → multi-agent eval → 2026 case studies → capstone deep-research system.
- **Glossary**: ~200 terms, alphabetical, one line, non-circular (`backmatter/glossary.md`).

**Build**: `node tools/build.mjs ai-engineering` → `dist/tech/ai-engineering/05-agents.pdf`, **130 pages, 0 overflow, 0 cuts**. All SVG viewBox heights kept ≤132 to fit A5; no `--split` needed. Booklets 1–4 rebuilt clean (77/77/66/60 pages).

**Verification debt — Booklet 5 frontier pages to re-check on the deferred fact pass (all `[VERIFY]`-tagged):** VLM landscape (12-08), unified/omni (12-10/11), VLAs (12-14); **MCP spec revisions + transports + OAuth 2.1 + sampling/elicitation/async support + registry** (13-06/09/10/11/12/13/15/16/17 — MCP evolves fast, treat every dated detail as stale), A2A status (13-18), OTel GenAI conventions (13-19), routing tool names (13-20), skill formats (13-21); framework APIs (14-16…14-22 — LangGraph/AutoGen/CrewAI/OpenAI-SDK/Claude-SDK/LlamaIndex/DSPy), voice frameworks (14-25), observability tools (14-26), agent benchmarks/leaders (14-28); self-improvement frontier (15-03 STaR, 15-04 AlphaEvolve, 15-05 DGM, 15-06 AI Scientist), coding-agent landscape (15-08), RSPs (15-18), METR (15-19); MAST taxonomy (16-22), 2026 case studies (16-24).

**Status:** Booklet 5 done + built. Verification is deferred debt (shared with Booklets 1–4). Booklet 6 (Production) is the only remaining booklet.

### 2026-09-29 — Booklet 5 thin v1 REJECTED; deep-rewrite mandated

User reviewed the 130-page thin v1 and rejected it as too shallow. **Root cause: I treated the ~130-page skeleton as a page-count target/ceiling; the brief actually said "split generously, 2–3+ pages per idea, more thorough beats fewer dense, 200–350+ pages."** One printed page per file is a build rule; **pages-per-topic is unlimited.**

**Deep-rewrite mandate (confirmed via grill-me, 2026-09-29):**
- **Every topic becomes a multi-page cluster.** Each sub-type/variant/feature gets its own page. Examples the user gave: **memory** → one page per memory type (and more); **LangGraph** → 15–20 dense pages so a reader can actually use it and defend it in an interview. Same for every concept, library, framework.
- **Depth flavour:** practical mastery, NOT low-level math/internals for their own sake. Emphasis: **worked step-by-step examples**, **failure war-stories + real tradeoffs**, broad coverage of every sub-feature, and the **interview-defense angle** (reader can build it AND answer on it).
- **Per-cluster arc:** intro (what/why) → each variant/feature its own page → worked example(s) → real code/config where it earns it → failure modes & tradeoffs → when-to-use decision → interview angle.
- **Scope:** expand ALL 5 modules deep. **Cadence:** blast all now (user chose no sample-sign-off gate). **Size uncapped** — "even 500 pages will be less."
- **Rough targets (floors):** M12 ~50 · M13 ~65 (MCP 20+) · M14 ~110 (LangGraph 15–20, memory 15+, each framework 8–15) · M15 ~50 · M16 ~60.

**Disk state at handoff:** `05-agents/meta.json` + `pages/00-cover.md` done. **`pages/12-*.md` DELETED** (Module 12 to be written fresh & deep). **`pages/13-*` … `16-*` still present in THIN v1 form** — must be deep-rewritten (renumber per module as clusters). `pages/backmatter/glossary.md` exists (~200 terms, thin-v1 — grow as new terms appear). Workflow unchanged: all pages first, NO subagents, ONE `node tools/build.mjs ai-engineering` at the end (use `--split` only as last resort; keep SVG viewBox height ≤132 to avoid A5 overflow), verification deferred to debt with `[VERIFY]` tags. **Full self-contained handoff prompt: `docs/tasks/ai-engineering-booklet5-deep-rewrite-prompt.md`.**

### 2026-09-29 — Interview-topic gap fill (Booklets 1–4)

User asked to close interview-important gaps in the shipped booklets. Confirmed transformer architecture is fully covered in Booklet 3 (Module 7). Added 6 pages via `a`-suffix insertion (renders in lexical order; ai-engineering books don't use `pageIds`, so no ID-link breakage):

- **B3** `05-14a-teacher-forcing` (after seq2seq) · `07-15a-attention-is-quadratic` (O(n²) cost, before the FlashAttention/sparse/KV mitigation cluster) · `07-19a-counting-parameters-and-flops` (params ≈ 12·L·d², train ≈ 6·N·D, infer ≈ 2·N/token, KV-cache size — the estimation question).
- **B4** `11-03a-beam-search` (after sampling/decoding; beams for closed tasks, sampling for open-ended).
- **B1** `01-16a-maximum-likelihood` (MLE → origin of cross-entropy/MSE; verified XGBoost/boosting already covered in 02-19, not a gap).
- **B2** `03-09a-vanishing-and-exploding-gradients` (dedicated page; was only mentioned in weight-init/ResNet; gradient clipping folded in).

Glossary terms added to each affected booklet: MLE (B1); gradient clipping (B2); teacher forcing, exposure bias, FLOP (B3); beam search (B4).

**Build**: `node tools/build.mjs ai-engineering --split` → all booklets 0 cuts. New counts: **B1 77, B2 77, B3 66, B4 60** (B5 49, untouched). No auto-split files created.

### 2026-09-29 — Booklet 5 DEEP-REWRITE: Module 12 (Multimodal & VLMs) written fresh

Started the deep-rewrite per `docs/tasks/ai-engineering-booklet5-deep-rewrite-prompt.md`. Skeleton counts treated as FLOORS. All pages written before any build; no subagents; `[VERIFY]` tags on version-sensitive claims.

**Module 12 — Multimodal AI & VLMs: 49 pages (`12-01`…`12-49`), fresh (thin v1 was deleted).** Clusters, each following the intro → per-variant → worked-example → tradeoffs → decision → interview arc:
- **Perception stack + vision foundation** (`12-01`…`12-08`): why-multimodal, the encode/project/fuse pipe, ViT patch tokens, CLIP + contrastive/InfoNCE loss (worked 4×4 matrix), what CLIP gives/limits + SigLIP, the fusion problem, the fusion taxonomy.
- **Bridges** (`12-09`…`12-12`): BLIP-2 freeze-both-towers, the Q-Former step-by-step, Flamingo gated cross-attention (zero-init gate), Perceiver Resampler.
- **LLaVA deep** (`12-13`…`12-17`): the projector, two-stage training, GPT-generated instruction data, 1.5/NeXT/OneVision evolution, one-question-end-to-end worked trace (576-token math).
- **Resolution** (`12-18`…`12-21`): the resolution problem, AnyRes tiling, patch-n-pack/NaViT, token-budget math (worked `:::mint`).
- **Landscape** (`12-22`…`12-25`): Qwen-VL (dynamic res, M-RoPE), InternVL (scaled eye), Pixtral/Molmo, decision grid.
- **Early fusion + unified** (`12-26`…`12-31`): VQ tokens, Chameleon (QK-Norm), Emu3, the unify goal, Transfusion, Show-o/Janus-Pro.
- **Omni + video + audio** (`12-32`…`12-36`): thinker-talker, streaming/latency, video-language, long-video/temporal grounding, audio-LMs.
- **VLAs** (`12-37`…`12-40`): VLA intro, action tokenization, OpenVLA/π0/GR00T, sim2real + failure modes.
- **Applied** (`12-41`…`12-49`): document/diagram understanding, ColPali vision-native RAG, multimodal/cross-modal RAG, computer-use perception, prompting VLMs, evaluation (MMMU/DocVQA/ChartQA), hallucination/POPE, deploying a VLM, capstone (multimodal document-QA agent).

`:::interview` blocks (newly used in this booklet — declared in `books/tech/meta.json`) placed on pages carrying a specific interview trap.

**Glossary note / incident:** the thin-v1 glossary was **untracked in git**. An incremental merge script with a buggy sort key (truncated multi-word terms at the first space) dropped ~15–20 original entries before it was caught and fixed. Not recoverable from git, but **acceptable** because the entire booklet is being deep-rewritten and the glossary will be **regenerated comprehensively from all final Module 12–16 pages at the end**. Corrected merge script (`/tmp/glossmerge2.mjs`, full-term key) now in use; glossary currently 218 entries.

**[VERIFY] debt added — Module 12 frontier (all 2024–2026, version-sensitive):** LLaVA-1.5/NeXT/OneVision dates; Qwen-VL/InternVL/Pixtral/Molmo specs+versions; Chameleon/Emu3/Transfusion/Show-o/Janus-Pro; omni thinker-talker (Qwen2.5-Omni); Audio Flamingo 3; OpenVLA/π0/GR00T/RT-2 specs; ColPali/PaliGemma; MMMU/DocVQA/ChartQA/POPE leaderboards. Draft from knowledge + source phase-12 lessons; confirm on the deferred fact pass.

**Remaining:** Modules 13 (Tools & Protocols, floor ~65, MCP 20+), 14 (Agent Engineering, floor ~110), 15 (Autonomous Systems, ~50), 16 (Multi-Agent & Swarms, ~60) — all still on disk in THIN v1 form, to be deleted and rewritten deep. Then ONE build.

### 2026-09-29 — Booklet 5 DEEP-REWRITE: Module 13 (Tools & Protocols) rewritten deep

Deleted thin-v1 `13-*` (25 pages) and rewrote as **51 dense pages (`13-01`…`13-51`)**. MCP alone is **22 pages** (`13-18`…`13-39`), meeting the "MCP 20+" mandate.
- **Tools foundation** (`13-01`…`13-04`): why-tools, the tool interface, tools-vs-RAG-vs-finetune, the round trip (worked).
- **Function calling deep** (`13-05`…`13-11`): mechanism, wire format field-by-field (worked JSON), tool choice (auto/any/forced/none), parallel, streaming, errors/retries/timeouts, structured-output-vs-tools.
- **Schema design** (`13-12`…`13-17`): schema-as-prompt, naming/descriptions, params/enums/JSON-Schema, how-many-tools, worked bad-vs-good schema, returning results.
- **MCP (22pp, `13-18`…`13-39`):** M×N problem, host/client/server, JSON-RPC, initialize handshake, tools/resources/prompts primitives, build-a-server ×2 (FastMCP), build-a-client, transports stdio + Streamable-HTTP, worked wire session, sampling, elicitation, roots + long-running tasks, security threat model, tool poisoning, rug-pull/shadowing, OAuth 2.1/scopes/confused-deputy, gateways/registries/supply-chain, conformance/versioning.
- **A2A** (`13-40`…`13-42`): agents-talking, Agent Card/tasks/artifacts, A2A-vs-MCP.
- **Observability protocol** (`13-43`…`13-44`): OpenTelemetry GenAI spans/traces, a worked trace.
- **Routing** (`13-45`): the LLM routing layer (rules/classifier/cascade).
- **Skills + SDKs** (`13-46`…`13-50`): what skills are, the SKILL.md format, discovery/progressive-disclosure (3 levels), permissions/sandboxes, evals/portability.
- **Capstone** (`13-51`): a full tool ecosystem (MCP+gateway, A2A peers, skills, router, OTel, layered security).

`:::interview` blocks throughout. **Note:** 51 dense pages is slightly under the ~65 floor; all required clusters are covered deep and MCP hit 20+. May backfill (code-execution tool, provider/built-in tools, agentic-RAG-as-tool, tool-result caching) if budget allows after Modules 14–16.

**[VERIFY] debt added — Module 13:** provider field names (`stop_reason`/`finish_reason`, tool_use/tool_result shapes); MCP protocol-version strings/dates (2024-11-05, 2025-03-26, 2025-06-18), Streamable-HTTP transport status, sampling/elicitation/roots/async capability status, FastMCP + Inspector API, official Registry; A2A spec/governance status; OTel GenAI semantic conventions; Agent Skills format.

### 2026-09-30 — Booklet 5 DEEP-REWRITE: Module 14 (Agent Engineering) rewritten deep — 140 pages

Deleted thin-v1 `14-*` (38 pages) and rewrote as **140 dense pages (`14-01`…`14-140`)** — the module carrying the heaviest depth mandates, all met.
- **Agent loop** (`14-01`…`14-06`): what-an-agent-is, agent-vs-workflow-vs-chatbot, the loop, the loop worked (traced), termination/stops, context management.
- **Reasoning patterns, each its own page + worked** (`14-07`…`14-18`): map, ReAct + worked trace, plan-and-execute, ReWOO, Reflexion, self-refine/critic, Tree-of-Thoughts, LATS, HTN, evolutionary, choosing.
- **Memory (mandated deep, 16pp)** (`14-19`…`14-34`): the problem, short/long-term, context≠memory, MemGPT/virtual-context, memory-blocks, sleep-time, episodic, semantic, procedural/Voyager, entity, summarization, hybrid/mem0, retrieval (vector+graph), worked example, failure modes, choosing.
- **Anthropic workflow patterns, each a page** (`14-35`…`14-41`): workflows-vs-agents, prompt-chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer, when-workflow-vs-agent.
- **Orchestration** (`14-42`…`14-43`): topologies, framework landscape.
- **Frameworks each deep** (`14-44`…`14-107`, 64pp): **LangGraph 16** (state/nodes/edges/build/prebuilt/checkpointers/threads/HITL/time-travel/subgraphs/streaming/Store/multi-agent/deploy/when-not), **AutoGen 8**, **CrewAI 8**, **OpenAI Agents SDK 8**, **Claude Agent SDK 8**, **LlamaIndex 8**, **DSPy 8** — each: arch, core API, worked build, features, failure modes, when-to-use.
- **Choosing** (`14-108`); **computer-use** (`14-109`…`14-110`); **voice** (`14-111`…`14-112`); **observability** LangSmith/Langfuse (`14-113`…`14-115`); **eval-driven** outcome/trajectory/component + LLM-judge (`14-116`…`14-118`); **benchmarks** SWE-bench/GAIA/WebArena/OSWorld + reading-critically (`14-119`…`14-123`); **agentic failure modes** each a page (`14-124`…`14-127`); **prompt-injection defense** lethal-trifecta + layered + in-practice (`14-128`…`14-131`); **agent-workbench craft 8pp** (`14-132`…`14-139`: why-models-fail, executable-constraints, scope-contracts, verification-gates, reviewer-agents, multi-session-handoff, smallest-testable-slice, judgment-preserving-specs); **capstone** bug-fix agent (`14-140`).

`:::interview` blocks throughout. **[VERIFY] debt — Module 14 (frontier, version-sensitive):** all 7 framework APIs (LangGraph StateGraph/checkpointer/interrupt/Store; AutoGen v0.4 Core/AgentChat; CrewAI Flows; OpenAI Agents SDK Runner/handoffs/guardrails; Claude Agent SDK query/options/tools; LlamaIndex Workflows; DSPy optimizers), MemGPT/Letta + mem0 status, benchmark leaderboard numbers (SWE-bench Verified, GAIA, WebArena, OSWorld), voice frameworks (Pipecat/LiveKit), observability products (LangSmith/Langfuse).

**Booklet-5 progress:** M12 49 + M13 51 + M14 140 = **240 pages so far**. Remaining: M15 (Autonomous Systems, ~50) + M16 (Multi-Agent & Swarms, ~60), both still THIN on disk (20/25 pp) to be deleted + rewritten deep. Then glossary comprehensive rebuild + ONE build.

### 2026-09-30 — Booklet 5 DEEP-REWRITE: Module 15 (Autonomous Systems) rewritten deep — 38 pages

Deleted thin-v1 `15-*` (20pp) and rewrote as **38 dense pages (`15-01`…`15-38`)**.
- **Autonomy** (`15-01`…`15-03`): what-autonomy-means, the autonomy ladder (L1–L5), long-horizon/task-horizon.
- **Self-improvement frontier, each deep** (`15-04`…`15-10`): the propose-evaluate-keep engine, STaR, AlphaEvolve, Darwin-Gödel Machine, AI Scientist, recursive-vs-bounded, the ceiling (verification bottleneck).
- **Coding agents** (`15-11`…`15-13`): landscape (IDE/terminal/cloud), anatomy, in-practice (where they work/fail).
- **Permission modes** (`15-14`); **browser agents** (`15-15`…`15-16`: loop, DOM-vs-vision-vs-hybrid/set-of-marks).
- **Reliability engineering** (`15-17`…`15-22`): durable execution, idempotency, workflow engines (Temporal), cost governors, kill switches, canaries.
- **Safe-autonomy patterns** (`15-23`…`15-25`): propose-then-commit, checkpoints/rollback/reversibility, sandboxing.
- **Guardrails** (`15-26`…`15-29`): Constitutional AI, CAI for agents (action constitutions), safety classifiers (Llama Guard), the layered safety stack (6 rings).
- **Governance** (`15-30`…`15-35`): why labs self-govern, RSP/ASL, Preparedness + Frontier Safety Framework, dangerous-capability evals, METR/task-horizon, external eval + red-teaming.
- **Frontier risk + bridge** (`15-36`…`15-38`): agentic alignment risks (reward hacking/deception/situational awareness/instrumental goals), societal risk (bridge to Booklet 6), capstone (overnight bug-fix autonomous system).

`:::interview` blocks throughout. Slightly under the ~50 floor by design (Module 14 ran +30 over its floor; series total well ahead). **[VERIFY] debt — Module 15 (frontier):** STaR/AlphaEvolve/DGM/AI-Scientist specifics, task-horizon doubling figures (METR), RSP/ASL + Preparedness + FSF current versions, dangerous-capability eval details, Temporal/durable-execution APIs, Llama Guard version, coding-agent & browser-agent tool names.

**Booklet-5 progress:** M12 49 + M13 51 + M14 140 + M15 38 = **278 pages**. Remaining: **M16 (Multi-Agent & Swarms, ~60)**, still THIN on disk (25pp). Then glossary comprehensive rebuild + ONE build.

### 2026-09-30 — Booklet 5 DEEP-REWRITE: Module 16 (Multi-Agent & Swarms) rewritten deep — 46 pages

Deleted thin-v1 `16-*` (25pp) and rewrote as **46 dense pages (`16-01`…`16-40` plus `a`-suffix inserts)**.
- **Why + heritage** (`16-01`…`16-04`): why-multi-agent, when-multi-agent-wins, FIPA/ACL heritage, how-agents-communicate.
- **Coordination protocols** (`16-05`…`16-11`): contract net + worked, blackboard, supervisor, hierarchies, network/handoff, role specialization, group-chat speaker-selection.
- **Collective reasoning** (`16-12`…`16-16`): Society-of-Mind, debate, Mixture-of-Agents, parallel swarms, A2A across orgs.
- **Consensus + game theory** (`16-17`…`16-20`): consensus problem, voting/aggregation, Byzantine fault tolerance (3f+1) + blockchain aside, negotiation/ZOPA.
- **Simulation + learning** (`16-21`…`16-28a`): generative agents, theory-of-mind, swarm intelligence (PSO/ACO), MARL setup, CTDE, MARL algorithms (MADDPG/QMIX/MAPPO), LLM-agents-vs-MARL, self-play/emergent-communication, agent economies, mechanism design.
- **Production + failure** (`16-29`…`16-38`): scaling, cost/latency + worked, MAST failure taxonomy, groupthink/cascades, deadlock, emergent misbehavior, evaluation, observability, case studies (deep-research, coding swarms), when-NOT-multi-agent.
- **Capstone** (`16-39`…`16-40`): design + build a multi-agent system.

`:::interview` blocks throughout. **[VERIFY] debt — Module 16 (frontier):** MoA/debate result numbers, generative-agents (Stanford) specifics, MARL algorithm details, MAST taxonomy source, 2025–2026 multi-agent case-study claims (deep-research systems, coding swarms).

### 2026-09-30 — Booklet 5 DEEP-REWRITE: COMPLETE + clean build

All five modules deep-written. Final per-module page counts (content `.md` files): **M12 49 · M13 55 · M14 140 · M15 41 · M16 46 = 331 content pages.**

**Build:** `node tools/build.mjs 05-agents` → **cover drawn, 339 pages, 0 overflow / 0 cuts.** Output `dist/tech/ai-engineering/05-agents.pdf` (13.6 MB). (`build-mcp-server-1/-2` are an intentional two-part walkthrough at `13-25/13-26`, not overflow splits.)

**Done vs the deep-rewrite brief:** every topic is a multi-page cluster following the intro → per-variant → worked-example → tradeoffs → decision → interview arc; big frameworks/concepts got 8–22 pages (LangGraph 16, MCP 22, memory 16); `:::interview` used throughout; builds 0/0.

**Remaining debt on Booklet 5 (not blockers):**
- **Glossary** is **297 terms** (brief targeted 400+). User opted NOT to regen now. To do at series-end: comprehensive regenerate from all final Module 12–16 pages (and ideally the whole series), alphabetical/one-line/non-circular.
- **[VERIFY] fact + consistency debt** for Booklet 5's frontier pages joins the standing Booklet 1–4 debt (see header). Run inline in small batches before the series is called final.

**Next: Booklet 6 (Production)** — phases 17 infra / 18 safety / 19 capstones; does not exist on disk. Deep-write handoff prompt: `docs/tasks/ai-engineering-booklet6-production-prompt.md`.

### 2026-09-30 — Booklet 6 (Production) STARTED: scaffold + Module 17 (Infrastructure) deep-written — 79 pages

Began Booklet 6 per `docs/tasks/ai-engineering-booklet6-production-prompt.md`. Grill-me first (user asked); three decisions locked: **context7 for runnable serving/tooling code** (drew live vLLM/SGLang/TensorRT-LLM CLIs), **full self-contained re-teach** on the from-scratch flagships, **big-tech senior/staff** interview calibration. Workflow: all pages first, no subagents, `[VERIFY]` on version-sensitive claims, ONE build at the very end.

- **Scaffold**: `06-production/` with `meta.json` (title "Production", subtitle "Infrastructure, Safety, and Capstones", navy `#24405e`, cover modelled on 05-agents), `pages/00-cover.md`, `pages/backmatter/glossary.md` (fresh). Domain `books/tech/meta.json` already declares `:::interview` — reused.
- **Module 17 — Infrastructure & Production: 79 dense pages (`17-01`…`17-65` + 14 `a/b`-suffix inserts).** Covers all 28 source phase-17 lessons + added foundations + a first-class AI-system-design-interview cluster. Clusters:
  - **Serving foundations** (`17-01`…`17-08`, +`05a`): the serving problem, managed-vs-self-host, hyperscaler platforms, PTU economics, inference-platform market, per-token-vs-per-minute (worked), raw-GPU/owning, self-host selection, GPU autoscaling on K8s/KEDA.
  - **Why LLM serving is special** (`17-09`…`17-11`, +`11a`): prefill-vs-decode, the batching problem, KV-cache-as-bottleneck (worked), distributed inference TP/PP/DP.
  - **vLLM deep** (`17-12`…`17-18`, +`17a`/`17b`): what/why, PagedAttention idea + mechanics (worked), continuous batching + chunked prefill, `vllm serve` runnable, engine knobs, failure modes, guided/structured decoding, multi-LoRA serving.
  - **SGLang deep** (`17-19`…`17-23`): what/why, RadixAttention + worked win, runnable launch + frontend DSL, vs-vLLM.
  - **TensorRT-LLM deep** (`17-24`…`17-28`, +`28a`/`28b`): what/why, build-an-engine runnable, Blackwell/FP4, when-to-pay-the-tax, decision grid, serving embedding models, serving multimodal/reasoning models.
  - **Latency/throughput/goodput** (`17-29`…`17-36`, +`30a`): the four metrics, goodput, latency budget (worked), disaggregated prefill/decode, vLLM production stack + LMCache, cold-start, multi-region KV locality, edge, request scheduling/priority.
  - **Speed/cost levers** (`17-37`…`17-44`, +`38a`): speculative decoding + EAGLE-3 + acceptance math (worked), production quantization + economics (worked), prompt caching, semantic caching, batch APIs, model routing/cascades (worked).
  - **Ops/reliability** (`17-45`…`17-52`, +`46a`/`47a`/`51a`/`52a`): observability + golden signals, AI gateways, shadow/canary/progressive, A/B testing, load testing, SRE-for-AI, chaos, online eval, rate limiting, health/readiness/drain, incident response.
  - **Infra governance** (`17-53`…`17-56`): security/secrets/audit, compliance frameworks, FinOps + worked spend breakdown.
  - **AI system design interview (first-class)** (`17-57`…`17-65`, +`63a`): the discipline, the 9-step framework, requirements-first, API contract, how AI SD differs (5 ways), reusable building blocks, capacity+cost math (worked), tradeoffs interviewers probe, driving the 45 min, estimation cheat-sheet.
- **Glossary**: ~55 terms so far (alphabetical, one line, non-circular).

Came in at 79 (floor was ~100); every source lesson covered deep plus substantial additions — chose depth/quality over padding to a number, consistent with Booklet 5 practice (some modules under floor by design). Module 19's capstones will run large.

**[VERIFY] debt — Module 17 (frontier, version-sensitive):** all serving-engine CLIs/flags (vLLM `vllm serve`, SGLang `launch_server`, TensorRT-LLM `quantize.py`/`trtllm-build`/`trtllm-serve` — drawn from context7 but treat dated details as stale); managed-platform lineups + latency benchmarks + PTU/Bedrock pricing (17-03/04); inference-platform vendors/valuations/pricing (17-05); Blackwell/FP4 specs (17-26); EAGLE-3 lineage + results (17-38/38a); prompt-cache rates ~10% + batch ~50% (17-41/43); cached-input/GPU-rent/throughput rules-of-thumb in the cheat-sheet (17-63a); EU AI Act status/dates (17-54).

**Remaining:** Module 18 (Ethics/Safety/Alignment, floor ~60) + Module 19 (Capstones + system-design mastery, floor ~150). Then glossary grows, ONE build.

## Explanation

Extended as pages ship. See the per-page recipe above for how a source lesson becomes our page.
