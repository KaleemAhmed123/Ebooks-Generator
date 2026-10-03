# Idea scorecard
> As of 2026-10-03 · Companion to `report.md` · Sources are `[S#]` in this folder's `sources.md`

Score an idea **before** writing code. Each criterion is 1–5 and must cite
evidence or say "unverified". An unverified criterion scores at most 2. That
rule exists because founders overrate their own ideas, and the hypothesis-
testing founders in the one RCT did better by refusing to trust intuition
[S19].

## Criteria

| Criterion | Weight | 1 means | 5 means | Evidence that counts |
|---|---|---|---|---|
| **Pain** | ×2 | "Would be nice" | Costs a named role hours or money every week | You've watched someone suffer it; a client paid to fix it |
| **Willingness to pay** | ×2 | Nobody has paid for anything like it | Buyers pay today (for a tool, a contractor, or headcount) | A competitor's pricing, an existing budget line, a signed pilot |
| **Distribution access** | ×2 | Needs cold outreach you won't do | Buyers arrive through a channel you can reach without manual sales | Marketplace search with intent [S6]; an inbound platform (track 07); a warm client |
| **Defensibility** | ×1 | A feature any assistant ships | Sits inside a system of record or encodes domain rules | Integrations, evals, accountability (report Q2) |
| **Platform risk** (5 = safe) | ×1 | The value is a horizontal model capability | The lab would need your integration and domain to copy it | Jasper/Tome/"chat with PDF" pattern [S13][S15][S16] |
| **My fit** | ×1 | New domain, no proof | Shipped proof with a measured result | `profile.md` §2 |

**Total = sum of score × weight, max 45.** Thresholds (mine, not from a
study): **≥34** run a willingness-to-pay test; **27–33** park it and revisit
after client #1; **<27** drop it. Pain, willingness to pay and distribution
are double-weighted because the base rates say most products die there
[S1][S2][S12], not on engineering.

**Values gate (before scoring):** does the idea serve an industry you've
ruled out (track 05's insurance fork, track 07's refusal list)? If yes, stop.

## Example ideas, scored from the profile and tracks 05/07

Shape matters as much as the idea. Each example names whether it's a
service-built internal tool (T) or a micro SaaS (S).

### 1. Insurance intake pipeline: policy/submission PDF → validated record (T)

Primble's pattern, sold per client as discovery → build → retainer.

| Criterion | Score | Why |
|---|---|---|
| Pain | 5 | Primble cut manual entry 80%+; insurers deploy GenAI fastest in claims/underwriting intake (track 05) |
| Willingness to pay | 4 | Funded startups sell exactly this (track 05); Astrea's client paid for it |
| Distribution | 2 | Needs conversations with ops buyers; freelance-platform listing is the least-manual route (track 07) |
| Defensibility | 4 | Field rules, "blank over wrong", system-of-record write-back |
| Platform risk | 3 | Extraction is commoditising (track 05); integration and accuracy guarantees are not |
| My fit | 5 | Shipped and measured |
| **Total** | **34** | **Test**, at the threshold, held back by distribution. Subject to the values fork. If conventional insurance is ruled out, re-aim at takaful/cooperative insurers or idea 2 |

### 2. Commerce/ERP reconciliation and webhook-reliability tool (T)

Eudoro's exactly-once and ledger work plus the SAP↔Salesforce reconciliation,
sold as a build + retainer to companies with orders spread across systems.

| Criterion | Score | Why |
|---|---|---|
| Pain | 4 | Astrea's reconciliation project cut manual work 70–75%; ECC deadline pressure (track 05) |
| Willingness to pay | 3 | Demand is real, but most flows to systems integrators (track 05) |
| Distribution | 2 | Same conversation problem as idea 1; SI subcontracting is the warm route (track 07 "borrow a signal") |
| Defensibility | 4 | Deep in systems of record |
| Platform risk | 4 | Not a horizontal model capability |
| My fit | 4 | One enterprise project + Eudoro |
| **Total** | **30** | **Park.** Promote to a test if idea 1 fails the values gate or an SI agrees to subcontract (that would lift distribution to 4 → 34) |

### 3. LLM release-gate kit: eval harness + prompt-injection review (T, with an open-source core)

Onlycouplez's parts. Open harness as proof; paid fixed-scope setup for teams
shipping LLM features.

| Criterion | Score | Why |
|---|---|---|
| Pain | 3 | Many agentic projects stall on cost and unclear value [S27]; demand for eval work specifically is unverified (track 01 found no clean posting data) |
| Willingness to pay | 2 | Unverified; capped at 2 |
| Distribution | 3 | An open repo is inbound by nature, if it gets found; no posting needed beyond the README |
| Defensibility | 2 | Eval tooling has open-source and vendor competition (I infer; not measured here) |
| Platform risk | 3 | Labs ship eval tools too (inference); the review service is less exposed |
| My fit | 4 | Built and ran it; judge–human agreement still unmeasured (track 09) |
| **Total** | **25** | **Drop as a standalone offer.** Publish the harness as proof now and sell it as an add-on to ideas 1–2 |

### 4. Shopify app: order/payout reconciliation for multi-channel merchants (S)

The one micro-SaaS shape that fits the no-manual-sales rule: buyers search
the store.

| Criterion | Score | Why |
|---|---|---|
| Pain | 2 | Unverified for Shopify merchants specifically; capped at 2 until store reviews or merchant complaints are read |
| Willingness to pay | 2 | Unverified; check competing apps' pricing and review counts first |
| Distribution | 4 | Store search with intent; 0% rev-share to $1M [S6]; crowded [S5][S7] |
| Defensibility | 3 | Integration-bound; reviews accumulate |
| Platform risk | 3 | Shopify itself can ship the feature (inference; marketplace owner risk, the same pattern as [S18]) |
| My fit | 4 | Eudoro ledger + reconciliation |
| **Total** | **26** | **Drop for now**, by one point, and on two unverified scores. After client #1, 5 hours of store research (competing apps, reviews, prices) can move pain and pay; re-score before any code |

### 5. Control: "chat with your documents" micro SaaS (S)

Included to show the scorecard rejects the obvious idea.

| Criterion | Score | Why |
|---|---|---|
| Pain | 3 | Real but generic |
| Willingness to pay | 1 | The capability is free in ChatGPT and Claude [S15] |
| Distribution | 1 | SEO-dependent; clicks falling [S21][S22] |
| Defensibility | 1 | None |
| Platform risk | 1 | Already absorbed [S15] |
| My fit | 4 | RAG experience |
| **Total** | **16** | **Drop** |

## How to run a willingness-to-pay test (for ideas ≥34)

1. Write the hypothesis as a falsifiable line: "≥3 of 20 [role] at
   [company type] will pay ≥$X for [outcome] within 6 weeks" [S19].
2. Get a costly signal: a paid discovery call, a deposit, or a signed pilot.
   Clicks and "sounds great" don't count.
3. Write the kill criterion from `report.md` Q8 into `decisions/` before
   building.
4. Re-score with the new evidence. Unverified 2s become real numbers or the
   idea drops.
