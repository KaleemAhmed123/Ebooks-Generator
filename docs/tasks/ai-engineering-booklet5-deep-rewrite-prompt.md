# Booklet 5 (Agents) — DEEP-REWRITE prompt (paste into a fresh chat)

> This is a self-contained brief to **deep-rewrite Booklet 5** of the "AI Engineering: From Scratch" series. A thin first version (130 PDF pages, one page per topic) was written and **rejected as too shallow**. Your job is to rewrite it so every topic is a rich multi-page cluster. Read the repo files named below FIRST.

---

## 0. Read these before writing anything
1. `CLAUDE.md` (repo root) — house rules. Non-negotiable.
2. `books/tech/ai-engineering/CLAUDE.md` — book-factory rules (one `.md` = one printed A5 page, `:::mint/:::note/:::warn/:::interview` blocks, inline `<svg>` only — NO mermaid, research-before-drafting, glossary).
3. `docs/tasks/ai-engineering-ebook.md` — series plan, the LOCKED applied-coverage table, and the dated Updates (esp. the "thin v1 REJECTED; deep-rewrite mandated" entry).
4. Auto-memories (loaded automatically): **depth-bar-clusters** (this mandate), **no-size-cap**, **applied-coverage-locked**, **verification-debt**.
5. **Voice exemplars** — match exactly: `books/tech/ai-engineering/03-language/pages/07-19-mixture-of-experts.md`, `05-24-subword-tokenization-bpe.md`, `07-17-the-kv-cache.md`. Also read a few of the surviving thin Booklet-5 pages (`05-agents/pages/14-*.md`) to see the voice you are DEEPENING (not the depth you are matching).

## 1. The one rule that was violated last time
**A skeleton/page-list is a FLOOR, never a ceiling.** Thin v1 wrote one page per topic and was rejected. **Every topic is now a multi-page cluster.** One printed page per `.md` file is a hard build rule; **pages-per-topic is unlimited.**
- **Memory** → a separate page for EACH memory type/approach (short/long/working, virtual-context/MemGPT, memory-blocks, sleep-time, hybrid/mem0, skill-libraries/Voyager, episodic vs semantic, summarisation, entity memory…), plus worked examples.
- **LangGraph** → **15–20 dense pages** (state, nodes, edges, conditional edges, the graph API, checkpointers, persistence, human-in-the-loop/interrupts, subgraphs, streaming, time-travel, memory, multi-agent-in-LangGraph, deployment, a full worked build, failure modes, when-not-to-use). A reader must be able to **build with it and defend it in an interview.**
- Same treatment for every concept, library, framework, and protocol.

## 2. Depth recipe — the arc of every cluster
For each topic cluster, in order (size each part to the topic):
1. **Intro page** — what it is, why it exists, the problem it solves (the on-ramp).
2. **One page per variant/feature/sub-type** — do not fold three ideas into one page.
3. **Worked step-by-step example page(s)** — trace one concrete case with real values (a full ReAct trace, an MCP message exchange field-by-field, a numeric cost/latency calc, a debugging walkthrough).
4. **Real code/config** where it earns its place — runnable, real library names, real APIs (never invented SDKs). Multi-page walkthroughs are fine (build a real MCP server; a real LangGraph agent; a real multi-agent system).
5. **Failure war-stories + tradeoffs** — what breaks in production, why, how to detect/fix, and the real decision tradeoffs (this is what interviewers probe).
6. **When-to-use / decision page** — how to choose vs alternatives.
7. **Interview-defense angle** — sprinkle the `:::interview` block (declared for the Tech domain) on pages where a specific interview question or trap lives.

**Depth flavour (user-confirmed):** practical mastery — worked examples, war-stories, tradeoffs, broad coverage of every sub-feature — **NOT** low-level math/internals for their own sake. Reader outcome per cluster: **can build it AND answer on it in an interview.**

## 3. House style (unchanged)
- `#` = module title (first page of module only) · `##` = page topic (the TOC entry, every page) · `###` = sub-points (off TOC).
- Blocks: `:::mint` code/config/formula · `:::note` key insight · `:::warn` failure mode · `:::interview` (declared in `books/tech/meta.json`) for interview-question callouts.
- **Inline `<svg>` only, NO mermaid.** Keep every SVG `viewBox` height **≲ 132** so pages fit A5 (tall pages overflow and force ugly auto-splits). Georgia serif, accent navy `#24405e`, marker arrows — copy the exemplars' SVG idiom.
- A diagram REPLACES prose, does not decorate it. Ban list: never "delve, foster, robust, demystify, embark, powerful, efficient"; no throat-clearing ("in this section", "in conclusion", "it is important to note").
- Every new term defined in one line on first use → logged in `pages/backmatter/glossary.md` (alphabetical, one line, non-circular). Grow the glossary as you go (thin-v1 has ~200 terms; expect 400+).
- Version-sensitive claims stamped "as of September 2026".

## 4. Current disk state (start from here)
- `books/tech/ai-engineering/05-agents/meta.json` — DONE (title "Agents", subtitle "Tools, Autonomy, and Multi-Agent Systems", accent `#24405e`, cover per original brief). Keep.
- `05-agents/pages/00-cover.md` — DONE. Keep.
- `05-agents/pages/12-*.md` — **DELETED.** Module 12 must be written fresh & deep.
- `05-agents/pages/13-*.md … 16-*.md` — **present in THIN v1 form.** Deep-rewrite each module: renumber cleanly per module as clusters (delete the thin files for a module before writing its deep set, or overwrite + add). ai-engineering books use **no `pageIds`**, so renumbering is safe and lexical filename order controls page order (`12-01`, `12-02`, … `12-49`).
- `05-agents/pages/backmatter/glossary.md` — thin-v1 (~200 terms). Grow it.

## 5. Module scope + rough page floors (grow past these)
Source lessons live under `books/tech/ai-engineering/ai-engineering-from-scratch/phases/<NN>/<lesson>/docs/en.md` — read the matching lesson to ground each cluster, then teach it in our voice and add what it misses.

- **Module 12 — Multimodal AI & VLMs** (source phase 12, prefix `12-`) — floor ~50 pp. Clusters: why-multimodal / perception stack · ViT+CLIP foundation (deep enough to ground fusion) · fusion taxonomy · BLIP-2/Q-Former · Flamingo/gated-cross-attn/Perceiver-resampler · **LLaVA family (deep: arch, 2-stage training, instruction-data generation, 1.5/NeXT/OneVision)** · resolution (fixed→AnyRes tiling→patch-n-pack/NaViT + token-budget math) · VLM landscape (Qwen-VL, InternVL, Pixtral/Molmo, Llama/Gemma-vision — each with edge/use) · early fusion (VQ tokens, Chameleon, Emu) · unified understand+generate (Transfusion, Show-o, Janus-Pro) · omni/any-to-any (thinker-talker, streaming, latency) · video + long-video (sampling, pooling, memory tokens, temporal grounding) · audio-LMs · VLAs (action tokenization, OpenVLA/π0/GR00T, sim2real) · document/diagram understanding · ColPali/vision-native RAG · multimodal/cross-modal RAG · computer-use perception · **multimodal evaluation (MMMU/DocVQA/hallucination)** · choosing+deploying a VLM · capstone.
- **Module 13 — Tools & Protocols** (phase 13, prefix `13-`) — floor ~65 pp; **MCP alone 20+**. Clusters: tools/why · the tool interface · **function-calling deep (multi-page: the round trip, tool_use blocks, forced/auto tool choice, parallel, streaming, errors, retries)** · **tool-schema design (multi-page: naming, descriptions, enums, JSON-Schema depth, tool count, worked good/bad)** · **MCP (deep: architecture host/client/server, JSON-RPC, initialize/capabilities, tools/resources/prompts each, build-a-server walkthrough, build-a-client walkthrough, transports stdio+Streamable-HTTP, sampling, elicitation, roots, async tasks, apps, security ×3+ tool-poisoning/rug-pull/shadowing/OAuth-2.1/scopes/confused-deputy, gateways, registries, supply-chain, conformance, versioning)** · A2A (Agent Card, tasks, artifacts, discovery, vs MCP) · OpenTelemetry-GenAI (spans/traces/conventions, worked trace) · LLM routing layer · **skills+agent-SDKs (discovery, progressive-disclosure, permissions, sandboxes, evals, portability)** · capstone tool-ecosystem. [VERIFY] every MCP spec-date detail (spec revises fast) and framework/tool name.
- **Module 14 — Agent Engineering** (phase 14, prefix `14-`) — floor ~110 pp. Clusters: what-an-agent-is · **the agent loop (deep + worked)** · **reasoning patterns each deep** (ReAct, plan-and-execute, ReWOO, Reflexion, Tree-of-Thoughts, LATS, self-refine/critic, HTN, evolutionary — worked example each) · **memory (deep: a page per type + worked)** · Anthropic workflow patterns (each pattern its own page) · orchestration topologies · **frameworks each deep** — LangGraph 15–20 pp, AutoGen 8–12, CrewAI 8–12, OpenAI Agents SDK 8–12, Claude Agent SDK 8–12, LlamaIndex 8–12, DSPy 8–12 (arch, core API, worked build, features, failure modes, when-to-use) · choosing-a-framework · computer-use agents · voice agents (Pipecat/LiveKit, VAD/turn-taking/barge-in) · observability (LangSmith, Langfuse — deep) · eval-driven dev (outcome/trajectory/component, LLM-as-judge) · benchmarks (SWE-bench/GAIA/WebArena/OSWorld each) · agentic failure modes (each a page) · prompt-injection defense (lethal trifecta, layered defenses, each a page) · **agent-workbench craft** (why-models-fail, executable-constraints, scope-contracts, verification-gates, reviewer-agents, multi-session-handoff, smallest-testable-slice, judgment-preserving-specs — keep + expand) · capstone.
- **Module 15 — Autonomous Systems** (phase 15, prefix `15-`) — floor ~50 pp. Clusters: autonomy ladder · long-horizon/error-compounding · **self-improvement (STaR, AlphaEvolve, Darwin-Gödel Machine, AI Scientist — each deep + tradeoffs)** · recursive-vs-bounded · coding-agent landscape (terminal/IDE/cloud, each) · permission modes (deep) · browser agents (DOM vs vision, deep) · durable execution (checkpointing, idempotency, Temporal) · cost governors · kill-switches/canaries · propose-then-commit · checkpoints/rollback · Constitutional AI for agents · Llama-Guard/safety-classifiers · responsible-scaling (RSP/ASL, Preparedness, FSF — each) · METR/external-eval/task-horizon · societal risk (bridge to Booklet 6). [VERIFY] all frontier claims.
- **Module 16 — Multi-Agent & Swarms** (phase 16, prefix `16-`) — floor ~60 pp. Clusters: why-multi-agent · FIPA/ACL heritage · communication protocols (contract net, deep) · supervisor/orchestrator · hierarchies · Society-of-Mind/debate · role specialization · parallel swarms/map-reduce · group chat/speaker-selection · handoffs/routines · A2A across orgs · blackboard/shared-memory · consensus/BFT (3f+1, deep) · voting/debate/Mixture-of-Agents · negotiation/bargaining (ZOPA) · generative agents/simulation · theory-of-mind · swarm optimization (PSO/ACO) · MARL (MADDPG/QMIX/MAPPO, CTDE) · agent economies · production scaling (queues/checkpoints/backpressure) · failure modes (MAST/groupthink/deadlock/cascade) · multi-agent evaluation · 2026 case studies [VERIFY] · capstone multi-agent system.

**Total floor ≈ 335; expect 400–550+.** Do NOT compress to hit a number — depth wins.

## 6. Workflow (user-confirmed, do NOT deviate)
- **Write ALL pages first.** Do NOT build after each page.
- **Do NOT spawn subagents** — everything inline (user stops subagents; they burn tokens).
- **Cadence:** blast all 5 modules deep across turns; NO sample-sign-off gate. Update `docs/tasks/ai-engineering-ebook.md` with a dated entry as you finish each module, so a context reset never loses the trail.
- **Verification is DEFERRED DEBT** — draft from the source repo + your knowledge, flag `[VERIFY]` liberally on anything version-sensitive (2024+), and add Booklet 5's frontier pages to the debt note. No heavy live web-search unless a claim is cheap to confirm and load-bearing. (You MAY use context7 for current library APIs — LangGraph/LlamaIndex/DSPy/AutoGen/CrewAI/OpenAI-Agents-SDK/Claude-Agent-SDK/MCP SDKs — since those change fast and the reader must be able to actually use them.)
- **Cross-reference Booklet 4 by concept, not page number.** Within Booklet 5, reference clusters by topic name (numbers shift on rewrite).
- **ONE build at the very end:** `node tools/build.mjs ai-engineering` (detects overflow non-destructively and prints `overflow … — run --split`). Fix any overflowing ORIGINAL page (usually a too-tall SVG — shrink viewBox height ≤132) and rebuild until **0 overflow / 0 cuts**. Use `--split` only as a last resort; if it creates `-1/-2` files, fix the original and delete the splits. `--html` is a fast preview.
- When done: full dated entry + final page list in the task file; send the built PDF to the user.

## 7. Build commands
```
node tools/build.mjs --list                 # every book + resolved settings
node tools/build.mjs ai-engineering          # build all 5 (now 6) booklets to PDF (detects overflow)
node tools/build.mjs 05-agents               # just this booklet
node tools/build.mjs 05-agents --html        # fast HTML preview, no Chrome PDF pass
node tools/build.mjs ai-engineering --split  # LAST RESORT: re-pack overflowing pages
```

## 8. Done criteria
- Every topic is a multi-page cluster following the §2 arc; big frameworks/concepts have 8–20+ pages.
- Booklet 5 builds with **0 overflow / 0 cuts**; Booklets 1–4 still clean.
- Glossary covers every new term (alphabetical, one line, non-circular).
- Task file has a final dated entry with the full page list; `[VERIFY]` debt recorded.
- A reader with zero AI background can, after each cluster, **use the thing and defend it in an interview.**

Start by reading §0, then write **Module 12** fresh and deep, cluster by cluster.
