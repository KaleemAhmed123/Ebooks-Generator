# AI Engineering — Booklet 6 (Production) audit

## 1. Task

- **Name:** AI Engineering · Booklet 6 (Production) — audit-and-fix pass
- **Scope:** `books/tech/ai-engineering/06-production/` — 316 pages across three
  modules: **17 Infrastructure & Production** (100pp), **18 Ethics, Safety &
  Alignment** (73pp), **19 Capstones & System Design** (142pp).
- **Status:** audit complete · backlog ranked · fixes in progress
- **Started:** 2026-10-03
- **Last updated:** 2026-10-03
- **Build:** `node tools/build.mjs 06-production --html` (needs `marked`; the repo
  has no `package.json`, so `npm install marked puppeteer-core` first in a fresh
  container).

The lens: the reader is a working SWE, and this booklet is where *"it works on my
machine"* becomes *"it serves millions cheaply and safely."* One question drives
the audit — **does the booklet build that judgement in a clean arc, is it current,
and is every exact number true on the build date?**

Like the beginner audit (`ai-engineering-beginner-audit.md`), this is built to be
used **progressively**: every item in the backlog (§6) is independent and sized
S/M/L, so the booklet upgrades in small, shippable passes.

---

## 2. Headline verdict — the audit premise is mostly wrong, and that is the finding

**This booklet is not bloated, not sprawling, and not stale.** It is the strongest
booklet in the series: modern (vLLM paged attention, SGLang RadixAttention,
TensorRT-LLM, Blackwell FP4, EAGLE-3 speculative decoding, disaggregated
prefill/decode, LMCache, the lethal-trifecta framing for prompt injection), tightly
compressed (longest page = 41 source lines / ~270 words; **zero** pages are walls
of config), and — the part that matters most here — **its worked arithmetic is
meticulous.** I hand-checked the KV-cache sizing (17-11), RadixAttention prefill
cut (17-21), the latency budget (17-31), the FinOps breakdown (17-56), the
quantization table (17-40), and the moderation cascade percentages (18-44a):
**all correct.**

The task's four audit lenses, each tested against the actual pages:

| Lens | Premise | Verdict after reading |
|---|---|---|
| **1. FLOW** | 142-pp capstones + 100-pp infra "sprawl/repeat"; duplicated explanations; intimidating walls | **PASS.** Capstones reuse building blocks by **cross-reference** (`17-62`, `17-28a`, `19-33`…), never by re-explaining — the opposite of duplication. No walls exist: max 23 code lines on any page. Every module opens with a "why" page and a mental-model `:::note`. |
| **2. GAPS / MISSING** | serving (vLLM/SGLang/continuous batching/KV-cache/spec-decode), quantization, cost/latency, observability, guardrails, prompt-injection, modern deploy | **PASS.** Every named topic is present **and strong** (coverage map in §4). The genuine risk is not absence — it is **exact-number aging**, which is where the real findings live. |
| **3. EXPANSION** | heavy config pages need a mental model up front | **MOSTLY N/A.** Pages already lead with the model/trade-off/failure-mode, then show minimal code. The code-led pages (`17-16` vllm serve, `17-22` sglang launch, `17-25` trt engine, the `19-17→19-24` GPT build) are code-led *by design* — the exact flag/tensor is the lesson, which CLAUDE.md explicitly permits. |
| **4. DROP / TRIM** | cut outdated infra/vendor trivia | **NEARLY NONE JUSTIFIED.** The one real currency check is TGI's status (`17-19a`); everything else is current. No deletions are defensible against a primary source. |

**So the real work is a narrow, high-value fact-verification track** — exactly what
the task flags as "ages fastest on exact numbers." The audit found **2 confirmed
defects** and **a short verification list**, not a restructuring job.

**PUSHBACK, stated plainly:** long ≠ bloated here. The 142-page capstone module is
long because it executes 15 flagship builds + 20 rapid mocks + 7 worked
system-design interviews, each distinct. Padding or splitting it would violate the
zero-bloat rule. **Do not invent structural work for this booklet.**

---

## 3. Findings (ranked by reader harm)

| # | Finding | Severity | Status | Where |
|---|---------|----------|--------|-------|
| **0** | Shipping defects (`$$` LaTeX, `[VERIFY]` markers, leaked macros) | — | ✅ **already clean** | whole booklet |
| **1** | **Spec-decode acceptance math is internally wrong:** `α=0.9, k=6 ≈ 4.7` — the page's own formula gives **≈5.2** (4.7 is the k=5 value) | 🟠 medium | open → fixing | `17-38a` |
| **2** | **Prompt-cache discount overgeneralized:** "cached reads bill at ~10% … on the major providers — a 90% discount" is **Anthropic-only**; OpenAI ≈50% off, Google ≈75% off | 🟠 medium | open | `17-41` |
| **3** | TGI "maintenance-mode" — currency claim to verify/soften | 🟡 low | verify | `17-19a` |
| **4** | "as of 2026" currency pins (EAGLE-3 SOTA, Blackwell FP4) — verify against primary | 🟡 low | verify | `17-26`, `17-38` |
| **5** | Illustrative GPU/token prices — spot-verify within current ranges (all hedged `~`, low risk) | 🟢 info | verify | `17-04/05x/06/41` |

### 3.0 ✅ Shipping defects — already clean

- `$$` LaTeX: **0** blocks (the one hit is `$$$` = "lots of money" in
  `17-46b`, harmless — same as the prior full-series sweep noted).
- `[VERIFY]` markers: **0** (the one hit is a legitimate SVG label
  *"VERIFY it's aligned"* in `18-01a`, intentional).
- Leaked LaTeX macros (`\frac`, `\nabla`, `\partial`, …): **0**.
- `:::` blocks: only the four the Tech domain declares (`mint` 101, `note` 138,
  `interview` 139, `warn` 39). No illegal blocks.
- Build: clean to HTML, **no overflow warnings**.

Nothing to do here — recording it so the baseline is explicit.

### 3.1 🟠 Finding 1 — `17-38a` speculative-decoding acceptance math (CONFIRMED)

The page states the i.i.d. expected-accepted-tokens formula and then works three
cases:

```
expected accepted per step ≈ (1 − α^(k+1)) / (1 − α)
α=0.8, k=4: (1 − 0.8^5)/0.2 ≈ 3.36   ✓  (checked)
α=0.5, k=4: (1 − 0.5^5)/0.5 ≈ 1.94   ✓  (checked)
α=0.9, k=6: ≈ 4.7                     ✗  the formula gives 5.22
```

With the page's own convention (exponent `k+1`, i.e. `k` drafts + 1 bonus token —
the Leviathan et al. 2023 result, arXiv 2211.17192), `α=0.9, k=6` is
`(1 − 0.9^7)/(1 − 0.9) = (1 − 0.4783)/0.1 ≈ 5.2`. The printed **4.7** is the
`k=5` value `(1 − 0.9^6)/0.1 ≈ 4.69`. **Internally inconsistent regardless of
source** — the label and the number disagree. Fix: keep `k=6`, correct the result
to `≈ 5.2` (the "big win" framing holds even better). Verify the exponent
convention against the paper during the fix.

### 3.2 🟠 Finding 2 — `17-41` prompt-cache discount is Anthropic-only (CONFIRMED)

The prose says: *"As of September 2026, cached prompt reads bill at roughly **10%**
of the normal input rate on **the major providers** — a 90% discount."* The table
lists OpenAI / Anthropic / Google as "the major providers."

Verified (Anthropic docs + corroborating sources, 2026):
- **Anthropic:** cache read = **0.1×** base input (90% off). ✓ matches the page.
- **OpenAI:** cached input ≈ **0.5×** (50% off) — *not* 90%.
- **Google (Gemini):** cached tokens ≈ **0.25×** (~75% off) — *not* 90%.

So the "~10% across the major providers" generalization is **false for two of the
three named**. The worked `:::mint` example (10% → ~81% off) is fine *as an
Anthropic illustration* — the fix is to scope the headline claim to Anthropic's
explicit caching and add one line that OpenAI (~50%) and Google (~75%) differ.
Keeps the math; removes the wrong generalization. (Note: `17-56` FinOps also uses
"reads @10%" but in a single-frontier-API example — acceptable; revisit only if
Finding 2's wording suggests a cross-ref.)

### 3.3–3.5 Verification list (likely fine, confirm per item)

- **`17-19a` TGI "maintenance-mode":** the thrust (vLLM/SGLang won, TGI declined,
  HF points users to them) is right; "maintenance-mode" may be slightly strong.
  Verify HF's current stance and soften to the exact status if needed.
- **`17-26` Blackwell/FP4, `17-38` EAGLE-3 "as of 2026":** both read as current
  (Blackwell B200/GB200 shipping; EAGLE-3 = arXiv 2503.01840, current SOTA
  drafting). Confirm against primary pages; these are explicitly date-qualified,
  which is the right pattern.
- **Illustrative prices** (`17-04` PTU $21–50/hr, `17-05a/b/c` GPU $/hr, `17-06`
  token rates, `17-41` $3/1M): all hedged with `~`/`-style`/`blended` and used as
  worked examples, not price lists. Spot-verify they sit in current ranges; low
  risk, low priority.

---

## 4. Coverage map — required production topics (all present)

| Required topic | Where | Depth |
|---|---|---|
| vLLM / paged attention / continuous batching | `17-10`→`17-18` | strong, worked KV math |
| SGLang / RadixAttention | `17-19`→`17-23a` | strong, worked prefix-cut |
| TensorRT-LLM / engine build / FP4 | `17-24`→`17-28` | strong |
| KV cache in serving | `17-11`, `17-40a` | strong (the bottleneck framing) |
| Speculative decoding / EAGLE-3 | `17-37`→`17-38a` | strong (acceptance math — see Finding 1) |
| Quantization in prod (FP8/INT4/FP4/KV-quant) | `17-39`→`17-40a`, `17-26` | strong, worked economics |
| Cost / latency budgeting | `17-31`, `17-55`→`17-56`, `17-63`→`17-63b` | strong, worked |
| Goodput / inference metrics / tail latency | `17-29`→`17-31a` | strong |
| Observability & evals for LLM systems | `17-45`→`17-46b`, `19-53`→`19-54a` | strong |
| Guardrails / Llama Guard / moderation | `18-22`→`18-22a`, `18-44`→`18-44a` | strong |
| Prompt-injection defense | `18-18`→`18-21`, `18-24a` | strong (trifecta + defense-in-depth) |
| Modern deploy (canary/shadow/disagg/edge) | `17-32`, `17-34`→`17-36a`, `17-48`→`17-52b` | strong |
| AI system-design interview discipline | `17-57`→`17-65`, module 19 | strong |

No material gap found. The booklet is, if anything, more current than most 2026
production courses.

---

## 5. Per-module scorecard

| Module | Pages | Verdict | Work needed |
|---|---|---|---|
| **17 Infrastructure & Production** | 100 | 🟢 excellent, current | Finding 1 (`17-38a`), Finding 2 (`17-41`), verify Findings 3–5 |
| **18 Ethics, Safety & Alignment** | 73 | 🟢 excellent, 4% code — prose-led and sharp | none found; frontier topics (deceptive alignment, ASL ladder, METR, injection) are current and well-sourced |
| **19 Capstones & System Design** | 142 | 🟢 excellent, reuse-by-reference | none structural; 25% code is build-flagship code (the lesson). Fact-spot-check the GPT-build numbers in the verification-debt track |

---

## 6. Backlog (progressive — pick one, ship, repeat)

Each item independent and sized S/M/L. `[x]` = done, `[~]` = done/re-scoped,
`[ ]` = open.

- [ ] **P6-1 · S · `17-38a`** — Correct the spec-decode acceptance figure
      `α=0.9, k=6`: `4.7 → ≈5.2` (the page's own formula; verify exponent
      convention vs arXiv 2211.17192). *(Finding 1)*
- [ ] **P6-2 · S · `17-41`** — Scope the "~10% / 90% discount" claim to Anthropic
      explicit caching; add one line that OpenAI (~50%) and Google (~75%) differ.
      Keep the worked `:::mint` example (label it Anthropic). *(Finding 2)*
- [ ] **P6-3 · S · `17-19a`** — Verify TGI's current status against a primary HF
      source; soften "maintenance-mode" to the exact wording if overstated.
      *(Finding 3)*
- [ ] **P6-4 · S · `17-26`, `17-38`** — Confirm Blackwell FP4 + EAGLE-3 currency
      against primary pages; adjust only if a claim is stale. *(Finding 4)*
- [ ] **P6-5 · M · `17-04/05a/05b/05c/06/41`** — Spot-verify illustrative
      GPU/token prices sit in current ranges; re-hedge any outlier. Low risk.
      *(Finding 5)*
- [ ] **(separate track) · verification debt** — Fact-pass the module-19 GPT-build
      and finetune numeric claims (LR defaults, weight-decay, clip values,
      sizing) against current PyTorch/library docs. Own pass, no subagents.

**Explicitly NOT doing (pushback):**
- Splitting or "de-walling" the capstone or infra modules — no walls exist; splits
  would be bloat.
- Expanding the thin-by-word pages (`17-16`, `17-22`, `17-25`, …) — they are
  code-led worked pages where the config is the lesson; padding violates the rule.
- Pinning broad `(Booklet N)` cross-refs to exact pages — same call as B11 in the
  beginner audit: clutter + wrong-number risk for negligible gain.

---

## 7. Updates

### 2026-10-03 — audit complete

- Installed `marked`/`puppeteer-core` (no `package.json` in repo); built
  `06-production` to HTML clean, no overflow.
- Swept all 316 pages: `$$`=0 (bar `$$$` money), `[VERIFY]`=0 (bar the legit SVG
  label), leaked macros=0, only legal `:::` blocks. Baseline clean.
- Structural scan: longest page 41 lines / ~270 words; no walls; module code
  density 17=14%, 18=4%, 19=25% (build-flagship code).
- Read ~25 representative pages across all three modules (openers, serving core,
  capstone arc, safety, worked examples). Hand-checked arithmetic on 6 worked
  pages — all correct except `17-38a`.
- **Verified against primary/corroborated sources:** Anthropic cache read 0.1×,
  OpenAI ~0.5×, Google ~0.75× → Finding 2. Spec-decode formula convention
  (Leviathan 2211.17192) → Finding 1.
- Verdict: booklet is the series' strongest; audit premise (sprawl/walls/missing)
  does not hold. Real work = narrow fact-verification track (Findings 1–5 +
  verification debt).
