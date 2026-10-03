# AI Engineering — beginner-followability audit

## 1. Task

- **Name:** AI Engineering series — beginner-followability audit + progressive upgrade plan
- **Status:** audit comprehensive · B0–B9 done (B8 RL signpost + PPO/GRPO split; B9 lifecycle assessed — no split needed, Finding 5 corrected) · B4–B7 reviewed, 07-05 figures corrected · "explain > code" rule added to CLAUDE.md · B10–B12 remain
- **Started:** 2026-10-03
- **Last updated:** 2026-10-03

One question drives the audit: **can a working software engineer with zero AI
background read this series and follow it?**

This report is built to be **used progressively** — each finding in the backlog
(§5) is independent and sized, so the book can be upgraded in small passes
without a big-bang rewrite.

---

## 2. Governing principle — black-box math (applies to ALL heavy-math ebooks)

**Decision (your call, 2026-10-03):** applied AI engineers need *less* math, and
much less of it up front. So across **every ebook in this repo that carries
heavy math** (AI Engineering, DSA, System Design, future titles), math is taught
as a **black box**:

- **Teach what it does and why it matters — not how to derive it.** No proofs,
  no symbol-pushing, no notation the reader must parse to follow the idea.
- **Every math page answers three things and stops:** *what it does · why AI
  needs it · what it looks like in code* — plus one worked numeric example where
  it earns its place.
- **Mark genuinely deep math "optional."** A page a black-box reader never needs
  (matrix eigen-detail, SVD internals, Fourier) opens with a `note` block:
  *"Optional deep-dive — safe to skip on a first read."* It stays in the book
  for the reader who wants it; it never blocks the main flow.
- **Never ship raw math notation that the build can't render** (see Finding 0).

> **Proposed CLAUDE.md addition** (awaiting your yes): add this principle to the
> project book-writing rules so it governs every title, not just this one. Exact
> text drafted in §4.6.

---

## 3. What you asked for + open questions (answered)

- Audit **all 7 booklets**; judge **order + depth**; reader = **SWE, no AI
  background, math as black box**.
- Deliverable = **comprehensive audit report first**, to drive **progressive**
  upgrades. No big rewrite.
- Fix methods when the time comes: **on-ramp pages · expand thin pages · worked
  examples · diagrams**; **skip/black-box the math**.
- Granularity: **per-booklet verdict + example pages as evidence** + ranked backlog.
- Deep-math pages → **keep but mark optional** (reuse the `note` block; no new
  shared block, no CSS change).
- VERIFY markers → **strip now, verify later** (done — §4.1).

---

## 4. Findings

### 4.0 Headline verdict

The series is **not shallow**. It is genuinely good: every module opens with a
"why" page, terms are bolded and defined inline, diagrams are everywhere, pages
cross-reference in reading order, and the math already leads with intuition. The
real problems are **two shipping defects that make good content look broken**,
plus **three depth/pacing gaps**.

**Ranked by how much it hurts a beginner (worst first):**

| # | Finding | Severity | Status | Where |
|---|---------|----------|--------|-------|
| 0 | **Raw LaTeX `$$…$$` prints as garbage text** | 🔴 ship-blocker | ✅ **DONE** | B1 (was 11 blocks) |
| 1 | **`[VERIFY…]` TODO markers printed in the PDF** | 🔴 ship-blocker | ✅ **DONE** | B5/B6/B7 (was 312) |
| 2 | **On-ramp is the thinnest part of the book** | 🟠 high | open | B1–B4 vs B5–B6 |
| 3 | **Math pages still carry notation (black-box)** | 🟠 medium | open | B1 (~11 pages) |
| 4 | **Few worked, end-to-end numeric examples** | 🟠 medium | open | keystone pages |
| 5 | **Pacing jumps too fast in places** | 🟡 low–med | ⚠️ **overstated** | B4 — see note |

**Order verdict: PASS, minor nits** (§4.4). This is depth + rendering work, not a
re-ordering job.

---

### 4.1 ✅ Finding 1 (DONE) — `[VERIFY]` markers removed

- **312 markers across 293 pages** (B5 195, B6 59, B7 39) printed verbatim in
  the PDF — the build does not strip them. They sat after factual claims, so a
  reader couldn't tell a real caveat from an author's private note.
- **Fixed 2026-10-03:** a one-pass script removed every marker (prose form
  `**[VERIFY…]**` and code-comment form `# [VERIFY]`), preserving punctuation and
  line endings; the one legitimate SVG label ("VERIFY it's aligned") was left
  intact. Verified: **0 markers remain, 0 mangled lines.**
- **Underlying facts remain unverified** — that is the separate *verification
  debt*, to be cleared in the dedicated fact-pass. Stripping only removed the
  visible marker, not the risk.

---

### 4.2 🔴 Finding 0 — raw LaTeX renders as garbage (the likely "rough" feeling)

- The build renders Markdown with **`marked` and no math plugin** (confirmed in
  `tools/build.mjs`). So `$$…$$` is **not** rendered — it prints literally.
- **Confirmed by building B1 to HTML.** The reader sees, verbatim:
  - `$$ \nabla f = \left[\frac{\partial f}{\partial w_1},\ \dots\right] $$`
  - `$$ P(H \mid E) = \frac{P(E \mid H)\,P(H)}{P(E)} $$`
  - `$$ w \leftarrow w - \eta\,\nabla L(w) $$`
- **This is almost certainly what made the math pages feel shallow/rough** — they
  look broken, regardless of how good the prose around them is.
- **Scope: exactly 11 `$$` blocks, all in Booklet 1.** Pages: `01-04` (norm),
  `01-05` (cosθ), `01-11` (∇f), `01-12` (chain rule), `01-16` (Bayes), `01-18`
  (GD update), `01-21` (entropy), `01-22` (KL), `02-04` (cost), `02-05`
  (logistic), `02-18` (regularization). No other booklet uses `$$`.
- **Inline single-`$` is safe** — every hit is currency ("$3/hr", "$5–$8"), not math.
- **Fix = delete the `$$` block and lean on the plain-English the page already
  has.** Each of these pages already explains the idea in words right beside the
  formula, so removal *implements black-box math and fixes the defect at once.*
  Where a block carried a fact not in the prose (e.g. the GD update rule), one
  plain sentence replaces it ("new weight = old − step × gradient").

---

### 4.3 🟠 Finding 2 — the on-ramp is the thinnest part

- Pages: **B1 75 · B2 75 · B3 64 · B4 58**, then **B5 332 · B6 316 · B7 276**.
- The material a beginner finds *hardest* (math intuition, neural nets, NLP,
  transformer internals, RL, the LLM lifecycle) got the **least** room; the
  advanced material got 5×. The depth-bar "multi-page cluster" rule was applied
  to B5–B6 but never retrofitted to B1–B4.
- **Nuance (important):** this is a *page-count* gap, not always a *quality* gap.
  B1's math module is well-compressed and genuinely followable (§4.5). The
  clearest real victim is **B4**, which crams whole subjects into too few pages
  (§4.6 Finding 5). Treat "thicken the on-ramp" as **targeted expansion of the
  fast pages**, not a blanket page-count target.

---

### 4.4 Order + flow verdict — PASS, minor nits

- Module numbering flows: 00 tooling → 01 math → 02 classical ML → 03 DL core →
  04 vision → 05 NLP → 07 transformers → 08–10 generative/RL/LLM → 11
  prompting/RAG → 12 multimodal → 13 tools → 14 agents → 15 autonomy → 16
  multi-agent → 17 production → 18 safety → 19 interview capstone.
- **No "used before defined" found.** Checked the obvious trap: `softmax` is
  used in attention code (B3) but is **defined first** in `01-14` + the glossary.
- Cross-references respect reading order; forward-refs are labelled.
- **Nit:** hard pages cite "(Booklet 1)" without the exact page number. Low priority.

---

### 4.5 Per-booklet scorecard (evidence-backed)

| Booklet | Pages | Beginner-follow | Main work needed |
|---------|-------|-----------------|------------------|
| **01 Foundations** | 75 | 🟢 strong, already ~85% black-box | **Light pass:** delete 11 LaTeX blocks; mark ~4 deep pages optional; add 1–2 worked examples. **Not a rewrite.** |
| **02 Deep Learning** | 75 | 🟢 strong | Add numeric walk-through to backprop + training loop; selectively expand |
| **03 Language** | 64 | 🟢 strong | Attention cluster needs a run-the-numbers example; selectively expand |
| **04 LLMs** | 58 | 🟠 **too fast** | **Biggest pacing fix:** split RL (09-xx) and LLM-lifecycle (10-xx) into clusters |
| **05 Agents** | 332 | 🟢 deep | VERIFY cleaned ✅; content already meets depth bar |
| **06 Production** | 316 | 🟢 deep | VERIFY cleaned ✅; dense but appropriate for the topic |
| **07 Interview** | 276 | 🟢 good format | VERIFY cleaned ✅; assumes B1–B6 read (fine by design) |

**Evidence for "B1 already strong":** `01-10` derivatives, `01-13` autodiff,
`01-16` Bayes (worked 9% example), `01-21` cross-entropy (worked 0.186),
`01-26` numerical stability all lead with plain English, a diagram, runnable
code, and "you won't do this by hand." The only thing dragging them down is the
unrendered LaTeX (Finding 0).

**Deep-math "mark optional" candidates (B1):** `01-09` eigenvectors, `01-24`
SVD, `01-28` convex-vs-non-convex, `01-29` Fourier & graphs. (Keep un-marked:
`01-22` KL and `01-23` dim-reduction — both are referenced later in RLHF/RAG.)

---

### 4.6 Fix approach + proposed CLAUDE.md text

**Progressive order (each step is shippable on its own):**

1. **Finding 0** — delete the 11 LaTeX blocks in B1 (fixes the rendering defect +
   black-box in one pass). *Smallest, highest-visible win left.*
2. **Finding 3** — mark the 4 deep-math B1 pages optional with a `note` block.
3. **Finding 4** — add worked numeric examples to the keystone pages
   (gradient, gradient-descent, backprop, attention, RAG).
4. **Finding 5** — split B4's RL and lifecycle into clusters.
5. **Finding 2** — targeted expansion of remaining fast pages in B2–B4.

**Proposed addition to the project `CLAUDE.md` (book-writing rules):**

> **Math is a black box.** Applied AI engineers need little math up front. Teach
> what a math idea *does* and *why it matters*, never how to derive it — no
> proofs, no notation the reader must parse. Each math page: *what it does · why
> it matters · what it looks like in code*, plus one worked example. Mark genuine
> deep-math pages "Optional deep-dive — safe to skip on a first read" with a
> `note` block. Never use `$$…$$` or `$…$` LaTeX — the build (`marked`) does not
> render it and it prints as raw text; write the idea in plain words or code.

---

## 5. Backlog (progressive — pick one, ship, repeat)

Each task is independent and sized **S/M/L**. `[x]` = done.

- [x] **B0 · S · all** — Strip 312 `[VERIFY]` markers (B5/B6/B7). *Done 2026-10-03.*
- [x] **B1 · S · B1** — Delete the 11 `$$` LaTeX blocks; reword 3 lead-ins.
      *Done 2026-10-03. Rebuilt B1 → HTML: 0 `$$`, 0 leaked macros.* (Finding 0)
- [x] **B2 · S · B1** — Mark `01-09`, `01-24`, `01-28`, `01-29` optional via a
      `note` block. *Done — 4 banners render.* (Finding 3)
- [x] **B3 · S · repo** — Added the black-box rule to `CLAUDE.md`. *Done.* (gov.)
- [x] **B4 · M · B1** — Add worked numeric examples to `01-11` gradient +
      `01-18` gradient-descent. *Done 2026-10-03. Two-weight bowl (E=w1²+w2²) at
      (3,1) → gradient (6,2) → step to (2.4,0.8); error drops 10→6.4→4.1.
      PyTorch :::mint snippets on both pages. Rebuilt → 0 $$, 0 macros.* (Finding 4)
- [x] **B5 · M · B2** — Numeric walk-through for `03-09` backprop + the training
      loop page. *Done 2026-10-03. Tiniest network (1→1→1 ReLU, MSE): forward
      pass with numbers, then backward chain-rule at every step showing w1.grad=8,
      w2.grad=−4. Training loop page: 3 steps showing loss 4→1→stuck (dead ReLU
      teaching moment). PyTorch :::mint snippets confirm both. Rebuilt → 0 $$,
      0 macros.* (Finding 4)
- [x] **B6 · M · B3** — Run-the-numbers example in the self-attention cluster
      (`07-03`/`07-05`). *Done 2026-10-03. 07-03: 3-token 2D example — score,
      softmax, blend for "cat" row; output (0.58,0.58). 07-05: unscaled vs
      scaled softmax at d_k=64 showing spike→spread. PyTorch :::mint snippets
      on both pages. Rebuilt → 0 $$, 0 macros.* (Finding 4)
- [x] **B7 · M · B4** — Worked example on `11-07` RAG (query → chunk → answer).
      *Done 2026-10-03. Added "Worked example — the RAG loop" with 2D vectors
      for query and 2 chunks. Demonstrated cosine similarity calculation showing
      C1 as nearest neighbor, followed by PyTorch :::mint snippet generating
      the prompt. Rebuilt → 0 $$, 0 macros.* (Finding 4)
- [x] **B8 · L · B4** — RL cluster (`09-xx`). *Done 2026-10-03, but re-scoped —
      see pushback below. The 13-page RL arc was already a proper, well-paced
      cluster; it did not need bulk-splitting. Instead: (1) added a "How to read
      this module" signpost to `09-01` naming the policy-based critical path vs.
      the grid-world foundations a beginner reads for intuition only; (2) split
      the one genuinely crammed page — `09-10` jammed PPO **and** GRPO — into
      `09-10-ppo` (PPO only) + new `09-10a-grpo` (GRPO's mechanism, a worked
      group-relative-advantage example, sourced to DeepSeekMath 2402.03300).
      GRPO already in both glossaries. Rebuilt B4 → 0 $$, 0 macros, no overflow.*
      (Finding 5)
- [x] **B9 · L · B4** — LLM-lifecycle (`10-xx`). *Done 2026-10-03 — assessed, NO
      split needed (pushback, see below). The 18-page lifecycle arc is already a
      strong, granular, well-ordered cluster: `10-01` signposts the pipeline and
      the applied-vs-pretraining divide, `10-08` carries the "RLHF vs DPO — when
      to use which" judgement note, `10-18` is a proper capstone with the
      real-world path. No page crams two keystones; none overflow. Splitting
      would add pages without adding understanding — bloat. No content change;
      Finding 5 corrected.* (Finding 5)
- [ ] **B10 · M · B2–B4** — Targeted expansion of remaining fast pages. (Finding 2)
- [ ] **B11 · S · all** — Add exact page numbers to cross-booklet references. (nit)
- [ ] **B12 · S · all** — Rebuild affected PDFs; confirm no `$$`/`[VERIFY]`
      survives and the TOC/page numbers stay correct.
- [ ] **(separate track)** — Verification debt: fact-check the claims that the
      stripped `[VERIFY]` markers flagged. Own pass, no subagents.

---

## 6. Updates

### 2026-10-03 (B9 + Finding 5 correction) — lifecycle needs no split

- **Read all 18 lifecycle pages (`10-01`→`10-18`).** Verdict: no structural work
  needed. `10-01` already signposts the pipeline and the "pretraining costs
  millions / applied work is SFT+align+quant+serve" divide; `10-08` already
  carries the RLHF-vs-DPO selection note; `10-18` is a capstone with the
  real-world path and a "most products never train a model" note. Every page is
  one topic with a diagram and a failure mode. Nothing crams, nothing overflows.
- **Finding 5 was overstated.** Reading B8 (RL) and B9 (lifecycle) end to end
  shows Booklet 4 is dense, well-ordered, signposted, and full of decision
  guidance — not "too fast." The original severity came from a *booklet
  page-count* comparison (57-page LLM core vs. the 332-page agents booklet) that
  mistook breadth for pacing. The only real B4 pacing wins were the two targeted
  B8 fixes (signpost + PPO/GRPO split); there is no further split work.
- No files changed for B9 beyond this spec note.

### 2026-10-03 (B8) — RL cluster: signpost + PPO/GRPO split (re-scoped)

- **Pushback on the original B8 premise.** Read all 13 RL pages (`09-01`→`09-13`)
  end to end. The cluster is already strong and correctly ordered (Sutton-&-
  Barto spine → RLHF). None overflow. The audit's "B4 too fast" was a
  *booklet-level page-count* comparison (57-page LLM core vs. the 332-page agents
  booklet) that conflated breadth with pacing. Bulk-splitting good pages to raise
  a count would violate this repo's zero-bloat rule, so B8 was re-scoped to the
  two real beginner problems.
- **(1) Signpost — `09-01`.** Added a "How to read this module" `note`: the
  grid-world pages (value, Bellman, Q-learning, DQN) teach the *mental model* and
  are read for intuition; the path that actually trains chat models is
  policy-based (value&policy → policy gradients → actor-critic → PPO/GRPO →
  reward model → RLHF). Tells the reader where to skim and where to slow down —
  pure judgement/taste guidance, the new CLAUDE.md rule in action.
- **(2) Split the one crammed page.** `09-10` jammed PPO *and* GRPO. Trimmed it to
  PPO only (ending on "PPO keeps a full-size critic in memory — the next page
  removes it"), and added **`09-10a-grpo.md`**: GRPO's mechanism explained first
  (group average as a free baseline, no critic), pseudo-code for the loop, and a
  worked numeric example (rewards 0.9/0.4/0.8/0.1 → group mean 0.55 → normalized
  advantages +1.09/−0.47/+0.78/−1.41). Mechanism sourced to the DeepSeekMath
  paper (arXiv 2402.03300); dropped the prior pass's unsourced "~40% less memory"
  figure in favor of the mechanism-level reason (one fewer full-size network).
- GRPO already present and accurate in both the series and Booklet-4 glossaries.
- **Verified:** rebuilt Booklet 4 → HTML — 0 `$$`, 0 LaTeX macros, no overflow
  warning, new page + signpost + worked example all render, GRPO in the TOC.

### 2026-10-03 (review) — audited the B4–B7 worked examples + new CLAUDE.md rule

- **Reviewed the cheap-model B4–B7 work** (gradient, GD, backprop, training loop,
  attention, scaling, RAG). Hand-checked the arithmetic on every worked example.
  Verdict: pedagogy is sound; all four AE booklets rebuild clean (0 `$$`, 0
  leaked LaTeX macros).
- **Found + fixed one factual error (07-05, scaled dot-product attention).** The
  "Scaled (÷ 8)" softmax row and its `:::mint` comment were wrong:
  softmax([7.0, 7.25, 6.0]) is **(0.377, 0.484, 0.139)**, not the
  `(0.3487, 0.3974, 0.2539)` the cheap model printed. Corrected the table to
  `(0.38, 0.48, 0.14)` and the mint comments to the true values (also fixed the
  unscaled tiny value: ~0.000, not 0.0020). The teaching point — scaling turns a
  near-one-hot spike into a usable spread — is unchanged; only the numbers were
  off. Rebuilt B3 → corrected figures present, old wrong ones gone.
- **New governing rule added to `CLAUDE.md`: "Code is not the bottleneck —
  explain for understanding."** Agents write code well; the scarce thing is the
  mental model, trade-offs, system-design reasoning, judgement, and taste a tool
  can't supply. Lead with prose + reasoning; pseudo-code is first-class; keep
  code small and in service of a sentence. This reframes B8–B10 toward
  **explanation-first expansion**, not more code.

### 2026-10-03 (B7) — worked numeric example: RAG

- **11-07 (RAG core loop):** added "Worked example — the RAG loop". Uses 2D
  vectors for two chunks and a query. Computes dot product (cosine similarity)
  to show why Chunk 1 is retrieved. Concludes with a `:::mint` snippet showing
  the prompt template construction.
- Keeps existing SVGs and warnings intact.
- **Verified:** rebuilt Booklet 4 to HTML — 0 `$$` hits, 0 LaTeX macro hits,
  new h3 heading present.

### 2026-10-03 (B6) — worked numeric examples: self-attention + scaling

- **07-03 (self-attention from scratch):** added "Worked example — three tokens,
  two dimensions". Setup table with Q/K/V for The/cat/sat. Focused on "cat" row:
  dot-product scores (1, 1, 0) → softmax weights (0.42, 0.42, 0.16) → blended
  output (0.58, 0.58). PyTorch `:::mint` snippet confirms the weights and output.
- **07-05 (scaled dot-product attention):** added "Worked example — with and
  without the scale". Scores (56, 58, 48) at d_k=64: unscaled softmax collapses
  to near-one-hot (0.12, 0.88, 0.00); scaled (÷8) gives spread (0.35, 0.40,
  0.25). Explains the gradient consequence. PyTorch `:::mint` snippet.
- Both pages keep their existing SVGs and code blocks unchanged.
- **Verified:** rebuilt Booklet 3 to HTML — 0 `$$` hits, 0 LaTeX macro hits,
  both new h3 headings present.

### 2026-10-03 (B5) — worked numeric examples: backprop + training loop

- **03-09 (backpropagation):** added "Worked example — backprop through the
  tiniest network". Setup table (x=2, w1=0.5, w2=−1, target=1), forward-pass
  table (h=1, pred=−1, loss=4), then a backward-pass table tracing every
  chain-rule step: d(loss)/d(pred)=−4 → d(loss)/d(w2)=−4 → through ReLU gate
  → d(loss)/d(w1)=8. PyTorch `:::mint` snippet confirms `w1.grad=8, w2.grad=−4`.
- **03-16 (training loop):** added "Worked example — watching the loop learn".
  Same network, lr=0.1, 3 steps. Step table shows loss dropping 4.0→1.0 then
  stalling at 1.0 because w1 goes negative and ReLU kills the hidden neuron.
  This naturally surfaces the **dead ReLU** concept (cross-ref to page 03-06)
  and motivates initialization/activation choices from later pages.
- Both pages keep their existing SVG diagrams and original :::mint snippets.
- **Verified:** rebuilt Booklet 2 to HTML — 0 `$$` hits, 0 LaTeX macro hits,
  both new h3 headings present.

### 2026-10-03 (B4) — worked numeric examples: gradient + gradient descent

- **01-11 (gradient):** added "Worked example — two weights, one bowl" section.
  Error surface E = w1² + w2², evaluated at (3, 1) → gradient (6, 2). Table
  breaks out each partial derivative with plain-language meaning. PyTorch
  `:::mint` snippet: `E.backward(); w.grad → tensor([6., 2.])`.
- **01-18 (gradient descent):** added "Worked example — continuing the two-weight
  bowl". Same starting point, η = 0.1. Step table shows weights, gradient, and
  error across 3 steps: 10.00 → 6.40 → 4.10. PyTorch `:::mint` snippet runs the
  same loop. Replaced the old generic `compute_gradient(w)` placeholder code.
- Both pages keep their existing SVG diagrams unchanged.
- **Verified:** rebuilt Booklet 1 to HTML — 0 `$$` hits, 0 LaTeX macro hits,
  both new h3 headings present.

### 2026-10-03 (later) — quick-win pass B1–B3 shipped

- **B1:** deleted all 11 `$$` LaTeX blocks in Booklet 1; reworded 3 lead-ins
  (dot-product cosine, gradient-descent rule, L2 λ) so the prose stands alone.
- **B2:** marked `01-09` eigenvectors, `01-24` SVD, `01-28` convex-vs-non-convex,
  `01-29` Fourier/graphs as "Optional deep-dive" via a `note` block.
- **B3:** added the black-box rule to the project `CLAUDE.md` (governs all books).
- **Verified:** rebuilt Booklet 1 to HTML — `$$` count 0, zero leaked LaTeX
  macros, 4 optional banners present. (The "6 macros" a loose grep flagged were
  the plain words *parallel/partial/fraction*.)

### 2026-10-03 — comprehensive audit + first fix

- Read page lists for all 7 booklets and ~40 representative pages (on-ramps,
  hardest pages, continuation pages) as evidence.
- **Verified against source, not memory:** `softmax` is defined before use (no
  gap); the build does **not** strip `[VERIFY]` (312 found) **nor render `$$`
  LaTeX** (11 blocks leak as raw text — confirmed by building B1 to HTML).
- **Fix shipped:** stripped all 312 `[VERIFY]` markers (B0), verified clean.
- Recorded the **black-box governing principle** (applies to all heavy-math
  ebooks) and drafted the CLAUDE.md text.
- Corrected the initial read: **Booklet 1 is already strong**, not shallow — it
  needs a light pass (LaTeX + optional-marking + a couple of worked examples),
  not a rewrite. The real "rough" feeling traces to the unrendered LaTeX.

---

## 7. Explanation

Only B0 (marker strip) is implemented so far; it is a mechanical cleanup, not a
content change — the walkthrough is in §4.1. Remaining items will get the full
POST-IMPLEMENTATION WALKTHROUGH treatment as they ship.
