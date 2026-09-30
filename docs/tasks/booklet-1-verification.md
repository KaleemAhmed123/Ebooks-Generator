# Task: Booklet 1 — Verification Pass

**Status:** Debt (deferred)
**Started:** 2026-09-28
**Deferred:** 2026-09-29
**Owner:** AI Engineering Ebook series

---

## What you asked for

After all pages of Booklet 1 (Foundations) were written, perform a full verification pass before final publish:
1. **Fact-check** — every claim marked "as of September 2026" must be verified against the live primary source (official docs, papers, specs)
2. **Consistency check** — terminology, variable names, and notation must be consistent across all 33 pages

---

## Open questions

| Question | Recommendation | Your answer |
|---|---|---|
| Which facts to prioritise? | GPU cloud pricing, HF Hub stats, PyTorch API signatures, XGBoost vs LightGBM claims | TBD |
| Block on publish or fast-follow? | Fast-follow (build now, verify before Booklet 2 goes to print) | Deferred to post-Booklet 2 |

---

## Plan

### Files to verify (priority order)

1. `00-03-gpu-setup-and-cloud.md` — cloud GPU prices (Lambda, RunPod, Vast.ai), VRAM sizing table
2. `00-04-apis-and-keys.md` — Anthropic SDK: `claude-opus-4-5` model name, API call signature
3. `00-07-data-management.md` — HuggingFace Hub stats ("800k models, 200k datasets" as of Sep 2026)
4. `01-09-information-theory.md` — "single-digit perplexity" claim for SOTA LLMs
5. `01-13-numerical-stability.md` — bfloat16 preferred over float16 on Ampere+: verify current PyTorch docs
6. `02-08-ensemble-methods.md` — XGBoost/LightGBM/CatBoost as Sep 2026 tabular dominance claim

### Consistency checks

- Notation: `η` for learning rate everywhere (not `lr` or `alpha`)
- `:::mint` blocks: all 2–5 lines, no prose inside
- SVG `role="img"` + `aria-label` on every diagram
- `:::warn` vs `:::note` — warn = dangerous trap, note = helpful context

---

## Tasks

- [ ] Run fact-check for items 1–6 above
- [ ] Fix any stale claims
- [ ] Run consistency scan across all pages
- [ ] Sign off on Booklet 1 for final print

---

## Updates

**2026-09-29 — Deferred**
Verification pass logged as debt after user instructed to proceed to Booklet 2 first.
All 31 pages + cover + glossary are written and the PDF build has been triggered.
No fact errors are known; deferral is a scheduling decision, not a known-bug deferral.
