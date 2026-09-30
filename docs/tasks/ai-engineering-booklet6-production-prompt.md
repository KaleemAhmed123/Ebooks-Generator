# Booklet 6 (Production) — DEEP-WRITE prompt (paste into a fresh chat)

> Self-contained brief to **write Booklet 6 fresh and deep** — the final booklet of the "AI Engineering: From Scratch" series. Booklets 1–5 are done and built (B5 deep-rewrite: 339 pp, 0 cuts). Booklet 6 does **not exist on disk yet**. Same depth bar as Booklet 5: every topic is a rich multi-page cluster, floors not ceilings. Read the repo files named in §0 FIRST, then write **Module 17** cluster by cluster.

---

## 0. Read these before writing anything
1. `CLAUDE.md` (repo root) — house rules. Non-negotiable.
2. `books/tech/ai-engineering/CLAUDE.md` — book-factory rules (one `.md` = one printed A5 page, `:::mint/:::note/:::warn/:::interview` blocks, inline `<svg>` only — NO mermaid, research-before-drafting, glossary).
3. `docs/tasks/ai-engineering-ebook.md` — series plan, the LOCKED applied-coverage table, and the dated Updates (esp. the 2026-09-30 "Booklet 5 COMPLETE" entry and the standing **[VERIFY] verification debt** for Booklets 1–5).
4. `docs/tasks/ai-engineering-booklet5-deep-rewrite-prompt.md` — the prompt that produced Booklet 5. Match its depth recipe and workflow exactly; Booklet 6 is the same job on new phases.
5. Auto-memories (loaded automatically): **depth-bar-clusters**, **no-size-cap**, **applied-coverage-locked**, **verification-debt**.
6. **Voice exemplars** — match exactly: `03-language/pages/07-19-mixture-of-experts.md`, `05-24-subword-tokenization-bpe.md`, `07-17-the-kv-cache.md`; and any Booklet-5 page in `05-agents/pages/` (the depth you are now matching, e.g. `13-25-build-mcp-server-1.md`, `14-45`…LangGraph pages, `15-17`…durable-execution pages).
7. **Existing artefacts to model, not rewrite:** `05-agents/meta.json` and `05-agents/pages/00-cover.md` — copy their shape for Booklet 6's `meta.json` + cover. `books/tech/meta.json` (domain) already declares the `:::interview` block — reuse it, no change needed.

## 1. The one rule (same as Booklet 5)
**A skeleton/page-list is a FLOOR, never a ceiling.** Every topic is a multi-page cluster. One printed page per `.md` file is a hard build rule; **pages-per-topic is unlimited.** Big serving engines, the safety-alignment failures, and each flagship capstone get their own deep cluster. A reader must be able to **build the thing AND defend it in an interview** — and for this booklet specifically, **clear an AI system design interview.**

## 2. Depth recipe — the arc of every cluster (unchanged from Booklet 5)
1. **Intro page** — what it is, why it exists, the problem it solves.
2. **One page per variant/feature/sub-type** — never fold three ideas into one page.
3. **Worked step-by-step example page(s)** — real numbers (a goodput calc, a cost-per-1M-tokens breakdown, a latency budget, a jailbreak trace, a full mock system-design walkthrough).
4. **Real code/config** where it earns its place — runnable, real library/tool names, real APIs (never invented SDKs). Multi-page walkthroughs are fine.
5. **Failure war-stories + tradeoffs** — what breaks in production, why, how to detect/fix — this is what interviewers probe.
6. **When-to-use / decision page** — how to choose vs alternatives.
7. **Interview-defense angle** — `:::interview` blocks where a specific question or trap lives.

**Depth flavour:** practical mastery — worked examples, war-stories, tradeoffs, broad coverage of every sub-feature — NOT low-level math for its own sake. Reader outcome per cluster: **can build it AND answer on it in an interview.**

## 3. House style (unchanged)
- `#` = module title (first page of module only) · `##` = page topic (the TOC entry, every page) · `###` = sub-points (off TOC).
- Blocks: `:::mint` code/config/formula · `:::note` key insight · `:::warn` failure mode · `:::interview` for interview callouts.
- **Inline `<svg>` only, NO mermaid.** Keep every SVG `viewBox` height **≲ 132** so pages fit A5. Georgia serif, accent navy `#24405e`, marker arrows — copy the exemplars' SVG idiom.
- A diagram REPLACES prose. Ban list: never "delve, foster, robust, demystify, embark, powerful, efficient"; no throat-clearing.
- Every new term defined in one line on first use → logged in `06-production/pages/backmatter/glossary.md` (alphabetical, one line, non-circular). Start this booklet's glossary fresh; grow as you go.
- Version-sensitive claims stamped "as of September 2026".

## 4. Disk state (start from here — this is a FRESH booklet)
- `books/tech/ai-engineering/06-production/` — **DOES NOT EXIST.** Create it: `meta.json` (title "Production", subtitle "Infrastructure, Safety, and Capstones", accent `#24405e`, cover fields modelled on `05-agents/meta.json`), `pages/00-cover.md`, `pages/backmatter/glossary.md`, and the page files.
- Module prefixes follow the source phase numbers, same as every booklet: **`17-*` infra · `18-*` safety · `19-*` capstones.** No `pageIds` in ai-engineering books — lexical filename order controls page order, so number cleanly (`17-01`, `17-02`, …).
- Source lessons: `books/tech/ai-engineering/ai-engineering-from-scratch/phases/{17-infrastructure-and-production,18-ethics-safety-alignment,19-capstone-projects}/<lesson>/docs/en.md` — read the matching lesson to ground each cluster, then teach it in our voice and add what it misses.

## 5. Module scope + rough page floors (grow past these)

### Module 17 — Infrastructure & Production (source phase 17, 29 lessons, prefix `17-`) — floor ~100 pp
This module is the backbone of the AI-system-design interview. Cover deep:
- **Serving foundations:** managed LLM platforms vs self-host, inference platform economics (worked cost model), self-hosted serving selection.
- **Serving engines, each deep:** **vLLM internals (PagedAttention, continuous batching)**, **SGLang (RadixAttention)**, **TensorRT-LLM (Blackwell)** — arch, when-to-use, worked config, tradeoffs. Cross-reference Booklet 4's KV-cache/decoding by concept.
- **Latency + throughput:** inference metrics & **goodput** (TTFT, TPOT/ITL, throughput, worked SLO math), disaggregated prefill/decode, the vLLM production stack + **LMCache**, cold-start mitigation, multi-region KV locality, edge inference.
- **Speed/cost levers:** **speculative decoding (EAGLE-3)**, production quantization (FP8/INT4/AWQ/GPTQ in serving), prompt & semantic caching, batch APIs, model routing (cascades).
- **Ops:** LLM observability (traces/spans/cost dashboards — cross-ref Booklet 5's OTel-GenAI), AI gateways, deployment safety (**shadow / canary / progressive rollout**, A/B testing LLM features), load testing LLM APIs, **SRE for AI** (error budgets, on-call for nondeterminism), chaos engineering for LLMs.
- **Governance of infra:** security/secrets/audit, compliance frameworks, **FinOps for LLMs** (cost attribution, budgets, worked spend breakdown).
- **AI SYSTEM DESIGN INTERVIEW cluster (make this first-class — user's explicit goal: clear ALL AI system design interviews):** the interview framework (requirements → API contract → data/RAG → model/serving → scale → eval → cost → failure modes → tradeoffs); how AI system design differs from classic system design (nondeterminism, token economics, eval, hallucination, GPU scarcity); reusable building blocks (embedding store, vector DB, retriever, LLM gateway, cache, queue, eval loop). Put the **worked mock designs** in Module 19 (they double as capstones).

### Module 18 — Ethics, Safety & Alignment (source phase 18, 31 lessons, prefix `18-`) — floor ~60 pp
- **Alignment core:** instruction-following as alignment signal, reward hacking/Goodhart, DPO family (cross-ref Booklet 4 — go deeper on failure modes), sycophancy from RLHF, Constitutional AI / RLAIF.
- **Deceptive-alignment frontier, each its own page + tradeoffs:** mesa-optimization, sleeper agents, in-context scheming, alignment faking, AI control / subversion, scalable oversight (weak-to-strong).
- **Attacks, each deep:** red-teaming (PAIR/automated), many-shot jailbreaking, ASCII-art/visual jailbreaks, **indirect prompt injection** (cross-ref Booklet 5's lethal-trifecta), red-team tooling (garak, Llama Guard, PyRIT), WMDP/dual-use eval, EchoLeak-style CVEs for AI.
- **Governance & harm:** frontier safety frameworks (RSP/PF/FSF — cross-ref Booklet 5), model welfare, bias & representational harm, fairness criteria (group/individual/counterfactual), differential privacy for LLMs, watermarking (SynthID/Stable-Signature/C2PA), regulatory frameworks (EU AI Act/US/UK/Korea), model/system/dataset cards, data provenance & training governance, moderation systems (OpenAI/Perspective/Llama Guard), dual-use risk (cyber/bio/chem/nuclear), the alignment research ecosystem.
- **[VERIFY]** all frontier safety claims, framework versions, and regulatory dates — this phase moves fast.

### Module 19 — Capstones + AI System Design mastery (source phase 19, 86 lessons, prefix `19-`) — floor ~150 pp
**Structure (user-confirmed): a dedicated system-design-interview lead, then 10–15 flagship capstones taught DEEP, then a compact catalog of the rest.** Go as deep as possible — this module is where the reader proves they can design and ship real AI systems and clear the interview.

**19A — AI System Design worked mock designs (lead cluster, deep):** full end-to-end mock designs, each a multi-page walkthrough using the Module-17 framework — e.g. *design ChatGPT-scale chat serving*, *design a production RAG system*, *design a multi-tenant LLM API platform*, *design an autonomous agent platform*, *design a real-time voice agent*, *design a code-review/PR agent*, *design an LLM observability + eval pipeline*. Each: requirements, API, data flow (`<svg>`), serving/scale, eval, cost, failure modes, the tradeoffs an interviewer probes. `:::interview` on every one.

**19B — Flagship capstones (pick 10–15, each a deep multi-page build):** natural end-to-end projects the 86 source lessons collapse into —
1. **GPT from scratch** (source 30–37: BPE tokenizer → embeddings → multi-head attention → transformer block → model assembly → training loop → load pretrained weights).
2. **End-to-end fine-tuning pipeline** (38–49: SFT → instruction-tuning → DPO-from-scratch → eval → LR schedules → grad clipping/accumulation → checkpointing → FSDP/DDP).
3. **Production RAG system** (02, 08, 64–69: advanced chunking, hybrid BM25+dense, cross-encoder rerank, HyDE query rewrite, precision/recall eval, end-to-end).
4. **Terminal-native coding agent** (01, 20–29: harness/loop contract, tool registry + schema validation, JSON-RPC stdio transport, dispatcher, plan-execute, verification gates + observation budget, sandbox runner, OTel traces).
5. **Autonomous research agent** (05, 50–57: hypothesis → retrieval → experiment runner → evaluator → paper writer → critic loop).
6. **Multimodal document-QA / VLM** (04, 58–63: vision-encoder patches, ViT, projection/align, cross-attention fusion, VL pretraining, multimodal eval).
7. **Real-time voice assistant** (03).
8. **Multi-agent software team** (10).
9. **LLM observability dashboard** (11, 28).
10. **MCP server with registry** (13, 21–22).
11. **Speculative decoding server** (14).
12. **Constitutional safety harness / end-to-end safety gate** (15, 82–87: jailbreak taxonomy, prompt-injection detector, refusal eval, content classifier, constitutional rules engine).
13. **GitHub issue-to-PR agent** (16).
14. **DevOps troubleshooting agent** (06).
15. **Distributed training from scratch** (76–81: collective ops, DDP, ZeRO sharding, pipeline parallel, sharded checkpoints).

Each flagship: goal & spec → architecture (`<svg>`) → the real build (runnable code, real libs) → eval → failure modes → how to extend → `:::interview`.

**19C — Capstone catalog (compact):** every remaining source capstone not made flagship gets a short entry — goal, stack, key design decisions, what it teaches — a few per page. So nothing in the 86 is dropped, but the booklet stays readable.

**Total floor ≈ 310; expect 350–450+.** Do NOT compress to hit a number — depth wins.

## 6. Workflow (same as Booklet 5 — do NOT deviate)
- **Write ALL pages first.** Do NOT build after each page.
- **Do NOT spawn subagents** — everything inline.
- **Cadence:** blast all 3 modules deep across turns; NO sample-sign-off gate. Update `docs/tasks/ai-engineering-ebook.md` with a dated entry as you finish **each module**, so a context reset never loses the trail.
- **Verification is DEFERRED DEBT** — draft from the source repo + your knowledge, flag `[VERIFY]` liberally on anything version-sensitive (2024+), add Booklet 6's frontier pages to the debt note. You MAY use context7 for current library/serving APIs (vLLM/SGLang/TensorRT-LLM/LMCache/garak/PyRIT/Llama Guard) since the reader must actually use them.
- **Cross-reference Booklets 1–5 by concept, not page number.**
- **ONE build at the very end:** `node tools/build.mjs ai-engineering`. Fix any overflowing page (usually a too-tall SVG — shrink viewBox height ≤132) and rebuild until **0 overflow / 0 cuts**. `--split` is last resort; if it creates `-1/-2` files, fix the original and delete the splits. `--html` is a fast preview.
- When done: full dated entry + final page list in the task file; send the built PDF to the user.

## 7. Build commands
```
node tools/build.mjs --list                 # every book + resolved settings
node tools/build.mjs ai-engineering          # build all 6 booklets to PDF (detects overflow)
node tools/build.mjs 06-production           # just this booklet
node tools/build.mjs 06-production --html     # fast HTML preview, no Chrome PDF pass
node tools/build.mjs ai-engineering --split  # LAST RESORT: re-pack overflowing pages
```

## 8. Done criteria
- Every topic is a multi-page cluster following the §2 arc; serving engines, safety failures, and each flagship capstone get their own deep cluster.
- Module 17 delivers a reader who can **pass an AI system design interview**; Module 19's mock designs prove it.
- All 86 source capstones are represented (10–15 flagship deep + the rest in the catalog).
- Booklet 6 builds with **0 overflow / 0 cuts**; Booklets 1–5 still clean.
- Glossary covers every new term (alphabetical, one line, non-circular).
- Task file has a final dated entry with the full page list; `[VERIFY]` debt recorded.

## 9. Series-level debt to remember (not this booklet's job, but do not lose)
- **Glossary:** Booklet 5's glossary is 297 terms (target was 400+); a **series-wide comprehensive glossary regen** from all final pages is still owed.
- **[VERIFY] fact + consistency passes** for Booklets 1–5 are outstanding (deliberately deferred, no subagents). Booklet 6's frontier pages join this debt. Run inline in small batches before the series is called final and the bound volume is produced.
- **Bound complete volume** (all 6 booklets, like TS2D/System-Design) is the final deliverable after Booklet 6 ships and verification is done.

Start by reading §0, create the `06-production` scaffold, then write **Module 17** cluster by cluster.
