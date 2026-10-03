# Clients toolkit
> As of 2026-10-03 · Companion to `report.md`. Source tags refer to `sources.md`.

## 1. Discovery-call question list

Order follows the problem → implication → payoff pattern from the Huthwaite
research [S17]. Ask, then listen. Do not pitch until section E.
Target: they talk for 70% of the call.

**A. Situation (keep short; do your homework before the call)**
1. What does the process look like today, end to end? Who touches it?
2. What systems are involved (ERP, CRM, document stores, models already in use)?
3. What data exists, in what format, and who owns it?

**B. Problem**
4. Where does it break, slow down, or need manual rework?
5. How often? Can you show me a real example, such as a document, ticket or record?
6. What have you tried already, including AI tools? What happened?

**C. Implication (the questions that size the deal)**
7. What does one failure cost: hours, errors, refunds, compliance exposure?
8. Who feels it most, and what does it block them from doing?
9. What happens if this is still unsolved in six months?

**D. Need-payoff and success criteria**
10. If this worked, what number moves? From what to what?
11. How will you decide it "works"? Can we agree on a test set of real examples
    and a target accuracy before I build?
12. What error is worse here: a blank or a wrong answer? (The Primble rule.)

**E. Constraints and buying process**
13. Deadline, and what is driving it?
14. Budget range you've set aside, or the cost of the status quo per month?
15. Who else signs off? Legal, security, data residency requirements?
16. Who maintains it after launch? Is there an in-house engineer?

**F. Close the call**
17. "Here's what I heard: [problem, cost, success metric]. Did I miss anything?"
18. "Next step: I'll send a one-page proposal by [date]. If scope is unclear, I'll
    propose a short paid discovery first."

## 2. One-page proposal skeleton

```
PROPOSAL — <client> — <one-line outcome>                       <date>

1. The problem (their words)
   <2–3 sentences: the process, where it breaks, what it costs per month>

2. The outcome
   <the number that moves, from X to Y, measured on an agreed test set of N
    real examples, target accuracy Z%>

3. Scope
   In:  <3–6 deliverables, each testable>
   Out: <explicit list: e.g. UI redesign, data cleanup beyond N docs,
         ongoing model costs, support after handover>

4. Approach and milestones
   M1 <date> — <deliverable + acceptance test>
   M2 <date> — <deliverable + acceptance test>
   M3 <date> — handover: code, docs, eval set, runbook

5. Price — choose one structure (see decision tree)
   Option A: fixed <amount, currency>, 30–50% deposit, balance per milestone
   Option B: paid discovery <amount>, then fixed build quoted from findings
   Optional: monthly care plan <amount>: monitoring, eval re-runs,
             model/API updates, N hours of changes

6. Terms (full contract attached: Common Paper PSA base [S18])
   - IP in deliverables assigns to client on full payment, in writing [S20][S21]
   - My pre-existing tools and code stay mine, licensed to you
   - Liability capped at fees paid in the prior 12 months [S18]
   - Changes: written change order with price and date impact before work
   - Invoices in <USD/EUR>, due in <N> days

7. Why me
   <one case study with a measured result, e.g. "LLM form-filling from policy
    PDFs: 80%+ less manual entry">

Accept by <date> → reply "approved" and I'll send the contract and deposit invoice.
```

## 3. Pricing decision tree

Mechanism behind it: fixed price rewards speed but makes changes costly to
renegotiate. Time-based billing protects you when the design is incomplete
[S11]. Your AI speed-up is only bankable once you've measured it [S12][S13].

```
START: a scoped request
│
├─ Can you write testable acceptance criteria NOW?
│   │
│   ├─ NO ──► Sell PAID DISCOVERY (fixed small fee or capped hourly, 1–2 weeks).
│   │         Output: spec + test set + fixed quote for the build.
│   │         Then restart the tree with the spec.
│   │
│   └─ YES
│       │
│       ├─ Have you timed this task type yourself, AI included,
│       │  with review and debug time?
│       │   │
│       │   ├─ NO ──► FIXED price only with a buffer (≥1.5× your estimate)
│       │   │         and a tight Out-of-scope list; or capped hourly.
│       │   │         Log hours to calibrate the next quote.
│       │   │
│       │   └─ YES
│       │       │
│       │       ├─ Is the client's value from the outcome large and
│       │       │  measurable (saved hours, errors, revenue)?
│       │       │   │
│       │       │   ├─ YES ──► FIXED, priced against value. Anchor on the
│       │       │   │          monthly cost of the status quo, not on your hours.
│       │       │   │
│       │       │   └─ NO ───► FIXED, priced from your timed hours × target rate.
│       │       │
│       │       └─ (either way) Deposit 30–50%; milestones; change orders.
│
├─ Is it open-ended (staff augmentation, "help us with AI")?
│   └─► HOURLY or weekly rate, with a monthly cap and a weekly report.
│       Hourly is correct here: scope is unknowable [S11].
│
└─ After delivery: is there ongoing drift (models, APIs, data)?
    └─► RETAINER: fixed monthly fee for monitoring, eval re-runs and updates,
        with N included hours; extra work billed by change order.

Floor check before sending any quote:
  monthly target ($5,000) ÷ realistic billable hours/month (not all 65–87)
  = minimum effective hourly rate. Quotes below this pay for a review or a
  referral [S6], so say so to yourself, explicitly.
```
