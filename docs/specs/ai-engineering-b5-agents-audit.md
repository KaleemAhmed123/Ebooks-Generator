# AI Engineering — Booklet 5 (Agents) audit

## 1. Task

- **Name:** AI Engineering · Booklet 5 (Agents) — audit-and-fix pass
- **Status:** audit complete · backlog ranked · fixes not started
- **Started:** 2026-10-03
- **Last updated:** 2026-10-03
- **Scope:** `books/tech/ai-engineering/05-agents/` — 332 content pages across
  modules 12 (Multimodal, 49pp), 13 (Tools & Protocols, 55pp), 14 (Agent
  Engineering, 140pp), 15 (Autonomous Systems, 41pp), 16 (Multi-Agent, 46pp).
- **Build/preview:** `node tools/build.mjs 05-agents --html`

One question drives this audit: **can a working SWE who has read B1–B4 follow
this booklet in 2026, and is every version/API/protocol claim still true on the
build day?** Agents move faster than anything else in the series, so **recency
is the dominant axis** — more than flow, more than depth.

This report is built to be **used progressively**: every backlog item (§6) is
independent and sized S/M/L, so the booklet upgrades in small passes with no
big-bang rewrite. **Audit first, then fix one item at a time** — rebuild, sweep,
tick, commit, stop, per item.

---

## 2. Headline verdict

**Booklet 5 is the strongest booklet in the series, and it ships clean.** The
baseline HTML build has **0 `$$`, 0 leaked LaTeX macros, 0 `[VERIFY]` markers,
0 overflow warnings**, no `TODO`/`FIXME`/placeholder leftovers (the one
`placeholder` hit is a legitimate `<image>` placeholder token in `12-17`). The
writing is mechanism-first, diagram-rich, consciously anti-hype, and honours the
project's "code is not the bottleneck — explain for understanding" rule: the
140-page Agent Engineering module leads with mental models and *when-to-choose*
judgement, not API dumps.

**So most of the classic audit levers do not apply here, and I say so plainly:**

- **FLOW of module 14 is good**, not a repeat-and-backtrack mess. It reads as one
  arc: *what an agent is → the loop → reasoning patterns → memory → workflow
  patterns → the framework landscape → modalities → observability/eval → failure
  & security → engineering craft → capstone.* `14-01`→`14-07` is an excellent
  on-ramp; `14-03` (the ten-line loop) is correctly set up as the spine every
  later pattern and framework varies.
- **The framework "zoo" (≈66pp, `14-43`→`14-108`) is justified, not bloat.** The
  pushback mandate applies: long ≠ bloated. `14-43` and `14-108` bookend the
  cluster and explicitly frame its value as "for any framework, say what
  abstraction it exposes, what it makes easy, where it fails, and when you'd
  choose it" — which is exactly the transferable judgement a reader *cannot*
  offload to a coding agent. It teaches abstractions, not tutorials. **No bulk
  deletion recommended.** (LangGraph's 16pp vs 8pp each for the others is
  defensible — it is the low-level control-plane default, so it carries the
  persistence/interrupt/time-travel machinery the others inherit conceptually.)
- **The module-16 "exotic" material is already well-contained** (FIPA/ACL
  heritage, BFT/blockchain, MARL/CTDE, swarm intelligence, mechanism design).
  The DROP-lens premise — "rare swarm patterns that intimidate without paying
  their way" — is **largely wrong for this booklet**: `16-03` frames FIPA as
  lineage ("prevents reinventing solved problems"), `16-19a` sharpens "when (and
  whether) you need it", and `16-27` explicitly disambiguates MARL from LLM
  multi-agent ("most LLM multi-agent systems are *not* MARL … this booklet"). The
  content already does the "mark as adjacent" work a DROP pass would add. **No
  hard deletions recommended.**
- **GAPS #2's topic checklist is substantially covered.** MCP is deep (23 pages,
  `13-18`→`13-39`); modern tool/function calling is thorough (`13-05`→`13-09`);
  structured output is present (`13-11`); eval/observability is a full cluster
  (`14-113`→`14-123`) plus OTel GenAI (`13-43`); failure/retry/guardrail patterns
  are covered (`13-10`, `14-80`, `14-124`→`14-131`). **The gap is not a missing
  topic — it is recency *inside* MCP** (Finding 1).

**What actually needs work is recency and two small nits.** Ranked by how much it
hurts a 2026 reader:

| # | Finding | Severity | Status | Where |
|---|---------|----------|--------|-------|
| 1 | **MCP section is 2 spec revisions behind; teaches mechanics the current spec removes/deprecates** | 🟠 high | open | `13-21`,`13-29`,`13-31`,`13-32`,`13-33`,`13-39` |
| 2 | **AutoGen presented as current; Microsoft retired it into Agent Framework (GA 2026-04)** | 🟠 medium | open | `14-60`→`14-67`, `14-43`, `14-108` |
| 3 | **Eval cluster ordering inversion** (online eval before "why evaluate" + eval levels) | 🟡 low–med | open | `14-115` vs `14-116`/`14-117` |
| 4 | **Dangling empty-backtick artifact** ("hence the `` tags") | 🟢 trivial | open | `14-108` |

**Order/structure verdict: PASS**, one local inversion (Finding 3). This is a
recency-refresh job, not a re-ordering or rewrite job.

---

## 3. What was asked + how it was answered

- Audit lens = **working SWE, has read B1–B4, 2026, recency-first**. Deliverable =
  **ranked independent S/M/L backlog first**, then fix one item at a time.
- **FLOW** (module 14): assessed — good arc, one local eval inversion (Finding 3).
  No repetition or use-before-define found in the spine.
- **GAPS / recency**: assessed against **primary sources** (official MCP repo,
  Microsoft dev blogs / release notes). Two real recency findings (1, 2); no
  missing core topic.
- **EXPANSION**: not needed at scale — mechanisms are built, not merely asserted.
  Worked-example pages already exist at every keystone (`14-04`, `14-09`, `13-30`,
  `13-44`, `13-45a`, `14-32`, `16-05a`, `16-30a`, …).
- **DROP / TRIM**: disciplined review says **keep**. The two "drop candidates"
  (framework zoo, module-16 theory) both pay their way and are already framed as
  adjacent/optional where needed. The only superseded-content issues are recency
  (Findings 1–2), fixed by **signpost + correction, not deletion** — because the
  superseded revisions (MCP 2025-06-18, AutoGen) are still the *deployed* reality
  in late 2026.

---

## 4. Findings (evidence-backed)

### 4.1 🟠 Finding 1 — MCP is two spec revisions behind (the real recency gap)

**The booklet builds against MCP revision `2025-06-18`.** As of the build day the
**latest stable revision is `2026-07-28`** — confirmed against the primary
source: the official repo `modelcontextprotocol/modelcontextprotocol` ships
committed schema folders `2024-11-05 · 2025-03-26 · 2025-06-18 · 2025-11-25 ·
2026-07-28 · draft`, and `docs/specification/2026-07-28/changelog.mdx` documents
the changes. Corroborated by multiple independent write-ups ("the biggest spec
rewrite since launch").

What each revision after the book's baseline actually did (verified, so the fix
can be accurate):

- **`2025-11-25` — additive, backward-friendly.** OpenID Connect discovery, icon
  metadata, incremental-scope consent via `WWW-Authenticate`, URL-mode
  elicitation, tool-calling inside sampling, OAuth Client-ID Metadata Documents,
  **experimental `tasks`**, JSON-Schema 2020-12 as the default dialect, formal
  governance/SDK tiers. **Did not** remove the handshake or sessions.
- **`2026-07-28` — the stateless rewrite (breaking).**
  - **Removes the `initialize` / `notifications/initialized` handshake.** Protocol
    version + client capabilities now ride on every request (`_meta`); a new
    `server/discover` RPC probes capabilities.
  - **Removes `Mcp-Session-Id` from Streamable HTTP** → stateless; any instance
    behind a round-robin load balancer can answer any request.
  - **Drops SSE stream resumability** (no `Last-Event-ID`).
  - **Deprecates Roots, Sampling, and Logging** (12-month clock; earliest removal
    a revision on/after `2027-07-28`) — migrate to tool params / resource URIs /
    provider APIs / OpenTelemetry.
  - Elicitation moves to the Multi-Round-Trip-Request (MRTR) pattern;
    `tasks` graduates to an official extension.
  - A new-revision client **cannot** talk to an old-revision server and vice
    versa — dual-support is the only migration path.

**Pages this makes stale or wrong:**

| Page | Issue | Severity |
|---|---|---|
| `13-29` Streamable HTTP | States the transport "supports **resumable** connections" — **removed** in `2026-07-28`. Whole session framing is pre-stateless. | factual error |
| `13-39` Conformance & versioning | Timeline diagram + prose stop at `2025-06`; this is *the* page whose job is to track revisions. Factually stale. | factual-stale |
| `13-21` Initialize handshake | Teaches a handshake the current spec removes. Still deployed, but needs a recency signpost. | stale-but-deployed |
| `13-31` Sampling | Current primitive in `2025-06-18`; **deprecated** in `2026-07-28`. | stale-but-deployed |
| `13-33` Roots & long-running | Roots **deprecated**; "long-running" now the `tasks` extension. | stale-but-deployed |
| `13-32` Elicitation | Mechanism redesigned (MRTR; `elicitationId` removed). | stale-but-deployed |

**Disciplined fix — signpost + correct, NOT rewrite.** In late 2026 the vast
majority of deployed MCP servers/SDKs still speak `2025-06-18`/`2025-03-26`, and
Roots/Sampling/Logging remain valid until ≥`2027-07-28`. So the booklet is right
to *teach* `2025-06-18` — it must just stop implying it is the frontier. Fix the
two outright-wrong statements (`13-29` resumability, `13-39` timeline), make
`13-39` carry the full timeline + the stateless-rewrite + deprecation-clock
summary, and add one-line recency `:::note`s to `13-21`/`13-31`/`13-33`/`13-32`.
No content deletion; the handshake/sampling/roots pages stay because they
describe what is running in production today.

### 4.2 🟠 Finding 2 — AutoGen presented as current; Microsoft retired it

The AutoGen cluster (`14-60`→`14-67`, 8pp) describes the **v0.4 actor-model
rewrite (2024)** and the Core/AgentChat/Studio layers as the current state. Since
the book's cutoff the landscape moved: **Microsoft Agent Framework 1.0 reached GA
on 2026-04-02** (Python + .NET), unifying AutoGen and Semantic Kernel, and
**AutoGen is now in maintenance mode** — no new feature investment, community-
managed — with Agent Framework as its official successor (verified against
Microsoft dev-blog/release coverage; VentureBeat: "Microsoft retires AutoGen and
debuts Agent Framework"). The landscape table (`14-43`) and the decision page
(`14-108`) also list AutoGen as a live, actively-developed pick.

**Disciplined fix — signpost, NOT delete.** The actor-model / conversation-first
teaching is still pedagogically valuable and carries forward into Agent
Framework; AutoGen is still widely deployed. Add a recency `:::note` to `14-60`
(and/or the `14-67` "when to use") noting the GA'd Microsoft Agent Framework
successor + maintenance status, and update the one-line AutoGen entries in the
`14-43` table and `14-108` table so a reader choosing today is pointed correctly.

### 4.3 🟡 Finding 3 — eval cluster ordering inversion

The eval cluster currently runs: `14-113` observability → `14-114` what to track
→ **`14-115` Evaluation in production (online)** → **`14-116` Why you must
evaluate agents** → `14-117` outcome/trajectory/component levels → `14-118`
LLM-as-judge → … `14-115` opens with "Offline evals (**next cluster**) test an
agent before release" and then teaches *online* eval — but the "why evaluate at
all" motivation (`14-116`) and the eval-level taxonomy (`14-117`) come *after* it.
A reader meets "online evaluation watches it in production" before being told why
eval matters or what the three eval levels are, and the "next cluster" pointer
actually points *backwards* in concept order.

**Fix:** move `14-115` to sit after `14-117` (so the cluster reads obs → what to
track → **why** → **levels** → LLM-judge → **production/online** → benchmarks),
or, minimally, swap `14-115` and `14-116`. Because filenames encode reading
order, this is a rename + cross-ref touch-up; keep it inside the cluster and
re-sweep for any `14-115`/`14-116` references. Low-med severity (the pages are
each individually fine; only their order misleads).

### 4.4 🟢 Finding 4 — dangling empty-backtick artifact in `14-108`

`14-108` line 19: "These frameworks change fast (hence the `` tags)." The empty
backticks render as an empty inline-code span and reference a version-tag
convention that does not exist in the output. Reword to name the real signal
(e.g. "hence the explicit *as-of-2026* dating" / "hence the version callouts").
Trivial.

---

## 5. Per-module scorecard

| Module | Pages | Verdict | Notes |
|---|---|---|---|
| **12 Multimodal & VLMs** | 49 | 🟢 strong, current | CLIP→fusion→BLIP-2/Flamingo→LLaVA→resolution→model families→early-fusion/unified→omni/video/audio→VLA→doc/ColPali→CU→eval→deploy. Very current model coverage (Qwen-VL, InternVL, Pixtral/Molmo, Chameleon, Emu3, Transfusion, Show-o/Janus). No action. |
| **13 Tools & Protocols** | 55 | 🟢 strong; MCP recency (F1) | Tool/function calling, wire format, tool-choice, parallel/streaming, errors/retries, structured output, schema design, 23-page MCP block, A2A, OTel, routing, Agent Skills, capstone. Only issue = MCP revision lag (Finding 1). |
| **14 Agent Engineering** | 140 | 🟢 strong; one local inversion (F3) | Clean arc; framework zoo justified; eval cluster order inverted (F3); `14-108` nit (F4); AutoGen recency (F2). |
| **15 Autonomous Systems** | 41 | 🟢 strong | Autonomy ladder, self-improvement (STaR/AlphaEvolve/DGM/AI-Scientist), coding/browser agents, durable execution, governors/kill-switches/canaries, Constitutional AI, RSP/FSF, METR, red-teaming. Current and well-paced. No action. |
| **16 Multi-Agent & Swarms** | 46 | 🟢 strong | Heritage→comms→patterns→consensus/BFT→MARL→economies→failure taxonomy (MAST)→case studies→when-not. "Exotic" content consciously framed as adjacent/optional (pushback: DROP premise wrong). No action. |

---

## 6. Backlog (progressive — pick one, ship, repeat)

Each task is independent and sized **S/M/L**. Do them in order; each ends in a
rebuild + sweep (`$$`=0, leaked LaTeX=0, no new overflow) + commit. **Verify
every spec/version claim against the primary source again at fix time** — do not
trust this report's quotes from memory.

- [x] **A1 · S · `13-39`** — Update the versioning page: extend the timeline
      diagram + prose through `2025-11-25` and `2026-07-28`; add a compact summary
      of the `2026-07-28` stateless rewrite (handshake + `Mcp-Session-Id` removed,
      resumability dropped) and the Roots/Sampling/Logging deprecation clock
      (removal ≥ `2027-07-28`). Keep the "pin your version, read the changelog"
      advice. (Finding 1 — the single highest-value, self-contained fix.)
      *Done 2026-10-03. Timeline now 5 dots (2026-07 flagged red "stateless ·
      breaking"); added the rewrite bullet + scoped the handshake bullet and
      interview answer to "through 2025-06-18". Rebuilt → 0 $$, 0 LaTeX, 0 VERIFY,
      no overflow.*
- [ ] **A2 · S · `13-29`** — Correct the one false claim: Streamable HTTP no longer
      "supports resumable connections" as of `2026-07-28`. Add a one-line note that
      the newest spec makes the transport stateless (no `Mcp-Session-Id`). Keep the
      2025-06-18 teaching as the deployed reality. (Finding 1.)
- [ ] **A3 · M · `13-21`,`13-31`,`13-33`,`13-32`** — Add a one-line recency
      `:::note` to each: this page teaches `2025-06-18` (still the deployed
      revision), and the current `2026-07-28` spec removes the handshake
      (`13-21`) / deprecates Sampling (`13-31`) and Roots (`13-33`) / redesigns
      elicitation to MRTR (`13-32`). No content deletion. (Finding 1.)
- [ ] **B1 · M · `14-60`/`14-67`,`14-43`,`14-108`** — AutoGen recency: `:::note` on
      `14-60` (and/or `14-67`) noting Microsoft Agent Framework 1.0 GA (2026-04-02)
      as AutoGen's successor and AutoGen's maintenance-mode status; update the
      AutoGen row in the `14-43` landscape table and the `14-108` decision table.
      Keep the actor-model teaching. (Finding 2.)
- [ ] **C1 · S/M · `14-115`,`14-116`,`14-117`** — Fix the eval ordering so "why
      evaluate" + the eval levels precede online/production eval; adjust the
      "next/previous cluster" wording and re-sweep for cross-refs to the renamed
      pages. (Finding 3.)
- [ ] **D1 · S · `14-108`** — Reword the dangling "hence the `` tags" so it names a
      real signal and leaves no empty inline-code span. (Finding 4.)

---

## 7. Sources (primary first)

- MCP spec repo `modelcontextprotocol/modelcontextprotocol` — committed schema
  revisions and `docs/specification/2026-07-28/changelog.mdx`,
  `…/2025-11-25/changelog.mdx` (read via GitHub, build day 2026-10-03).
- Microsoft dev blogs (`devblogs.microsoft.com/agent-framework`,
  `…/semantic-kernel`) + release coverage on Agent Framework 1.0 GA (2026-04-02)
  and AutoGen maintenance status; VentureBeat "Microsoft retires AutoGen and
  debuts Agent Framework."
- Baseline HTML build of `05-agents` (clean sweep: `$$`=0, LaTeX macros=0,
  `[VERIFY]`=0, overflow=0).

---

## 8. Updates

### 2026-10-03 (A1) — MCP versioning page brought current

- **`13-39`:** extended the revision timeline to `2024-11` → `2025-03` →
  `2025-06` (book baseline) → `2025-11` → `2026-07` (flagged red, "stateless ·
  breaking"); the SVG grew to `viewBox 0 0 360 82`. Added a bullet summarizing the
  `2026-07-28` rewrite (drops the `initialize` handshake and `Mcp-Session-Id` →
  stateless, version + caps per request via `server/discover`; drops SSE
  resumability; Roots/Sampling/Logging on a deprecation clock, removal ≥
  `2027-07-28`; not wire-compatible with older revisions). Scoped the
  handshake-negotiation bullet and the interview answer to "through `2025-06-18`"
  and added the stateless exception, keeping the deployed-reality framing (most
  servers still speak `2025-06-18`).
- All facts re-checked against the primary repo this session (schema folders +
  `2026-07-28`/`2025-11-25` changelogs). Rebuilt `05-agents` → HTML: 0 `$$`,
  0 leaked LaTeX, 0 `[VERIFY]`, no overflow.

### 2026-10-03 — audit complete

- Read the module-14 spine (`14-01`→`14-07`, `14-43`, `14-44`, `14-108`), the
  recency-sensitive framework intros (`14-60`, `14-65`, `14-76`, `14-84`), the
  eval cluster (`14-113`→`14-117`), the MCP transport/handshake/versioning pages,
  and the module-16 "exotic" candidates (`16-03`, `16-19`, `16-19a`, `16-23`,
  `16-24`, `16-27`) as evidence.
- Verified MCP currency against the **primary repo**: latest stable is
  `2026-07-28`; `2025-11-25` was additive, `2026-07-28` is the stateless rewrite +
  Roots/Sampling/Logging deprecation. Verified AutoGen's retirement into Microsoft
  Agent Framework (GA 2026-04-02) against Microsoft blog/release coverage.
- Confirmed the booklet ships clean (0 `$$`, 0 leaked LaTeX, 0 `[VERIFY]`, 0
  overflow, no placeholder leftovers).
- Recorded four findings and a six-item ranked backlog. Explicitly pushed back on
  the framework-zoo "bloat" and module-16 "exotic" DROP premises: both pay their
  way and are already framed as adjacent where needed. No fixes applied yet.
