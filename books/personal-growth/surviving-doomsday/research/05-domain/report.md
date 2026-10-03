# Domain knowledge
> As of 2026-10-03 · Status: draft

Numbers marked ★ in `sources.md` were checked against search extracts only;
page fetches were blocked (see the note at the top of `sources.md`).
`research/01-landscape/` did not exist when this was written, so nothing here
leans on it.

## Bottom line

- **The pay premium that is actually measured attaches to AI skills inside a
  domain, not to "domain knowledge" for software engineers as such.** AI-skill
  postings pay 28–56% more and half sit outside IT [S2][S3]. No source I found
  isolates a domain premium for engineers. The case for domain depth is the
  durability argument: fast-changing technical skill premiums lose more than
  half their value within a decade [S6], and domain knowledge changes slower
  (I infer). (confidence: medium)
- **Regulation is not a moat against the AI labs. It is a moat against vendors
  who can't carry the compliance work.** OpenAI and Anthropic both entered
  HIPAA healthcare in January 2026 [S18][S19]. Harvey's moat moved from its
  model to workflow, integrations, and trust [S16]. Compliance is something a
  specialist sells, not something that protects them. (confidence: medium)
- **Your top-scoring domain is insurance operations AI, framed as "messy
  documents → validated records in the system of record."** Insurers are
  deploying generative AI fastest in claims and underwriting intake [S10][S11],
  you have a measured production result (Primble), and the extraction step
  alone is commoditising [S12][S13][S14]. So sell accuracy guarantees and
  integration, not extraction. (confidence: medium)
- **There is a values fork you must resolve before committing.** The
  International Islamic Fiqh Academy rules conventional fixed-premium insurance
  impermissible and takaful permissible [S34]. If that binds you, the same
  skill set points to Saudi/GCC cooperative insurance (Saudi GWP ~$22.5bn in
  2025 [S33]) or to ERP/commerce reconciliation instead. (confidence: high that
  the fork exists; your answer decides it)
- **Arabic/RTL and Islamic fintech are multipliers, not standalone domains, for
  now.** The demand data is real but sits at market level [S27][S30][S31]. I
  found no evidence of demand reachable by an India-based freelancer, and
  localization quotas and data-transfer rules raise the barrier [S26][S37].
  (confidence: low; the evidence is thin, not negative)

## What the evidence says

### Q1. Do domain-plus-software profiles earn more or last longer?

- **Hybrid roles pay more, but the data mostly measures domain workers who
  add tech.** In Burning Glass's 2019 analysis, "hybrid jobs" (domain role plus
  coding or data skills) paid 20–40% more [S1, B]. In 2025, AI-skill postings
  paid 28% more [S3, B] or 56% more [S2, B], depending on method. 51% of
  AI-skill postings were outside IT occupations [S3, B]. The causation runs from
  domain worker to AI skill, not from engineer to domain. **I infer** the mirror
  case (an engineer who speaks the domain) captures part of that demand,
  because the same employers are hiring. No source tests it directly.
- **Hiring managers say they value domain knowledge, but the evidence is
  weak.** In a vendor survey of 1,000 US hiring managers, "industry knowledge"
  ranked above AI/ML [S4, C]. Treat it as directional.
- **The strongest evidence is about durability, not level.** For applied STEM
  graduates, the early pay premium falls by more than 50% in the first decade,
  because the job skills keep changing and experience goes stale [S6, A]. Domain
  knowledge (how claims are adjudicated, how a ledger reconciles) ages slower
  than framework knowledge. **I infer** that this is the real reason to hold it:
  it is the part of your experience that compounds.
- **Embedded, domain-facing engineering is the fastest-growing AI role
  type.** Forward-deployed engineer (FDE) postings rose roughly 8–12× year on
  year in 2025. Indeed listings went from 643 (Apr 2025) to 5,330 (Apr 2026),
  with a ~$174k median disclosed salary [S9, C]. An FDE embeds with the
  customer and wires AI into their actual workflow. The role is domain depth
  applied for pay. The source is a postings scrape plus press relays, so the
  multiple is approximate.
- **Freelance rates show the same gradient, with weak sources.** Rate guides
  put Upwork's web-development median near $30/hr. They put mid-level SAP/ERP
  consultants at $85–135/hr in the US [S8, C]. These are marketing pages, so
  use them for order of magnitude only.

### Q2. Where is unmet software and AI demand, and why?

| Domain | Why demand is unmet | Evidence |
|---|---|---|
| **Insurance ops** | Unstructured intake (applications, loss runs, schedules of values, claims) never fit rules engines. GenAI fits. | 44% of insurers had active GenAI deployments in May 2025 [S10, B]. 68% of Q4 2025 AI deployments were gen/agentic; 37% were in claims, 21% in underwriting [S11, B]. In India, IRDAI's Bima Sugam marketplace still waits on insurer integrations [S15, B]. |
| **ERP migration and reconciliation** | A forced legacy deadline. ECC mainstream maintenance ends 2027-12-31 [S22, B], and only 39% of ECC customers had licensed S/4HANA by Q4 2024 [S21, B]. | Demand is dated and real. Most of it flows to systems integrators, not freelancers (I infer). |
| **Healthcare** | Largest vertical AI market by spend: $1.4bn in 2025, mostly ambient scribes and coding/billing [S17, B]. | Big, but you have zero fit, and the labs now sell into it directly [S18][S19]. |
| **Legal** | Harvey reported ~$195m ARR by end-2025 [S16, B]. | No fit. Shown here only as the moat case study. |
| **Saudi compliance plumbing** | ZATCA e-invoicing Phase 2 keeps pulling in smaller firms: SAR 375k threshold by 2026-06-30, SAR 187.5k by 2027-02-01 [S24, C]. Invoices need Arabic fields [S25, C]. | SME demand is mostly met by off-the-shelf SaaS (Wafeq, Zoho) [S25]. What's left is custom ERP integration (I infer). |
| **Islamic finance / fintech** | Assets $5.98tn in 2024, +21% [S30, B]. Islamic fintech transactions ~$198bn, with KSA the largest market [S31, B]. Takaful is ~1.4% of Islamic finance assets, contributions +15.4% [S32, B]. | Market size isn't buyer demand for your services. No source sizes engineering spend. |
| **Gulf AI generally** | AI hiring outpaces supply; ~7,000 AI specialists in the UAE and ~5,000 in KSA [S27, B]. Sovereign Arabic models (HUMAIN's ALLaM) [S28, B]. LLMs still show uneven gaps on Arabic dialects [S29, A]. | Real, but it reaches you through employment and local partners more than freelance (I infer). Saudization is widening [S37, B]. |

The common driver across the top rows is **legacy systems plus unstructured
documents plus a liability-bearing buyer**. That is the overlap of Primble,
ECOU, and the SAP reconciliation work.

### Q3. Is regulation a moat?

- **For:** Harvey's defensibility now rests on workflow ownership,
  integrations, and safeguards built for EU AI Act oversight duties, not its
  model [S16, B]. Life and health insurance pricing and risk assessment are
  Annex III high-risk under the EU AI Act. Obligations now apply from
  2027-12-02 (delayed from 2026-08-02), with the substance unchanged [S20, B].
  That is guaranteed compliance work: documentation, human oversight, bias
  testing. In healthcare, buyers still prefer their EHR incumbent for most AI
  outside scribes [S17, B], so trust and distribution protect incumbents.
- **Against:** OpenAI for Healthcare launched 2026-01-08 with HIPAA support and
  named health-system customers [S18, A]. Claude for Healthcare launched the
  same week [S19, B]. Startups captured 85% of healthcare AI spend [S17, B], so
  regulation didn't keep newcomers out. And 67% of scribe users expect to
  switch vendors within three years [S17, B]: a regulated vertical product
  still commoditised.
- **Reading (I infer):** regulation filters for *accountability*, not for
  *capability*. It rewards whoever will own the audit trail, the human
  sign-off, and the liability. For a solo engineer, that cuts both ways. You
  can sell "I build it so it passes review." But you also face vendor due
  diligence that favours firms. Your Primble "blank-over-wrong" rule is
  exactly the behaviour a regulator rewards.

### Q4. How to get domain depth fast, and which certifications matter?

- **Certifications pay only when the job needs them.** In 37.7m US résumés,
  the first job-relevant industry certification carried a 4.1% wage premium.
  Irrelevant credentials carried ~1.8%, and stacking them added nothing or cost
  money [S5, A]. Vendor surveys claiming bigger effects are self-reported
  [S7, C].
- **Mapping to your shortlist:**
  - **AINS (US P&C insurance).** Four courses, no prerequisites, roughly
    $1.5–2.5k and 6–12 months part-time [S36, C]. It gives you vocabulary. It
    only signals to US carrier and MGA buyers. Optional.
  - **AAOIFI CSAA.** About $2,200 and a one-year experience requirement. It
    certifies Shari'ah auditors and advisers, not engineers [S35, B]. That is
    noise for you unless you pivot into Shari'ah audit tooling, and even then
    your Islamic-sciences study may carry more trust (I infer).
  - **SAP and Salesforce certifications.** I found no credible evidence on
    their freelance signal. Treat them as untested; don't buy on spec.
- **Fast depth comes from working inside the workflow, not from courses.** The
  FDE pattern [S9] and the funded insurance-AI startups [S12] show where depth
  comes from: sitting with underwriters and claims handlers on their real
  documents. FurtherAI's pitch is a workflow one, cutting submission clearance
  from ~32 minutes to ~1 [S12, B, company claim], not a model one. **I infer**
  the fastest loop for you is three parts. Read the domain's own artefacts
  (application forms, loss runs, regulator circulars). Interview operators.
  Ship a scored demo on their document types.

### Q5. Shortlist for this profile

Scores are 1–5; for AI-automation risk, 5 means *safest*. They are equally
weighted. The scores are my judgement over the evidence above, not data.

| Domain | Demand | Your fit | Time to credibility | AI risk (5 = safe) | Total | Why |
|---|---|---|---|---|---|---|
| **Insurance ops AI** (doc → validated record → core system) | 4 [S10][S11] | 5 (Primble: 1,135-field forms, 80%+ less entry) | 4 (proof exists today) | 3 (extraction commoditising [S14]; integration + accuracy aren't) | **16** | Best evidence and best proof. Subject to the values fork [S34]. |
| **ERP/CRM reconciliation and migration** (SAP, Salesforce) | 4 [S21][S22] | 3 (one strong project, no SAP credentials) | 3 (SAP world gates on networks and partners) | 3 (SAP's own agents move in [S23]) | 13 | Dated, forced demand to 2027 and beyond. No values conflict. |
| **GCC takaful / cooperative insurance + Arabic** | 3 [S32][S33] | 4 (insurance + Arabic + fiqh literacy) | 2 (needs local partner; data rules [S26]) | 4 (Arabic dialect gaps persist [S29]) | 13 | Unique stack but the most speculative. Test before betting. |
| **Islamic fintech / halal commerce** | 2 (market-level only [S30][S31]) | 3 (Eudoro ledger work + values fit) | 2 | 4 | 11 | Values-aligned. Demand reachable by you is unverified. |
| **Arabic/RTL product work (standalone)** | 3 [S27] | 3 (Gaza40+) | 2 | 2 (RTL/i18n is a learnable commodity; Egypt/Jordan supply natives [S38]) | 10 | Better as a feature of the above than as a niche. |
| *Healthcare (control)* | 5 [S17] | 1 | 1 | 2 [S18][S19] | 9 | Shown to prove the method doesn't just pick the biggest market. |

### Q6. Risk of specialising too early, and the hedge

- **The risk is real when the specialty is a tool.** Fast-changing skill
  premiums decay fastest [S6, A]. Harvey's proprietary legal model was beaten by
  frontier models and dropped in 2025 [S16, B], and scribe buyers already plan to switch [S17, B].
  A niche defined by "I do LangChain for X" or "I do ACORD extraction" has the
  same half-life.
- **The hedge (I infer): specialise in a problem class, and sell it into one
  vertical at a time.** Your three best projects are the same mechanism. Each
  takes untrusted, unstructured input, grounds it against a schema or catalogue,
  refuses to guess, and writes idempotently into a system of record that people
  reconcile against. That class transfers across insurance, ERP, ordering, and
  finance. Market under one vertical name so buyers can find you. Keep the
  portfolio proof cross-vertical so a pivot costs weeks, not years.
- **Reversibility check:** a 90-day immersion with 15 hrs/week (~180 hours)
  is a cheap experiment. Locking into a certification track or a single
  employer's stack before one paid engagement is not.

## Where sources disagree

- **How large is the AI-skills premium?** PwC says 56% [S2], Lightcast 28%
  [S3]. They use different samples and controls. Both measure postings, not
  realised pay. What would settle it: realised-wage data (payroll or résumé
  panels like [S5]) for AI-skill roles.
- **Will GenAI replace document-processing vendors?** Gartner frames it as an
  open question [S14]. Funded startups bet that insurance-specific workflow
  survives [S12][S13]. Harvey's history suggests the model layer loses and the
  workflow layer wins [S16]. What would settle it: whether insurers buy point
  extraction tools or general platforms in 2027 renewals.
- **Is regulation protective?** The EU AI Act and incumbent preference [S17][S20]
  say yes. Lab entry and startup share [S17][S18][S19] say not against capable
  entrants. They are compatible once you separate *capability* from
  *accountability* (Q3).
- **Can Gulf work be done from India?** Outsourcing vendors say Gulf firms buy
  from India [S38, C]. Saudization quotas and transfer rules push the other
  way [S26][S37]. No neutral source quantifies remote freelance Gulf demand.
  What would settle it: 20 conversations with GCC insurers, ERP partners, or
  agencies (see "What to do").

## Myths and hype to ignore

- **"Pick a regulated domain and AI can't touch you."** The labs sell HIPAA
  products directly [S18][S19]. Regulation selects for accountability, not
  for incumbency.
- **"Certifications prove domain depth."** Only job-relevant ones pay, and
  modestly (~4%) [S5]. Credential stacking pays nothing or worse [S5].
  Pearson-style "32% got a raise" figures are self-selected [S7].
- **"Islamic finance is a $6tn opportunity for you."** That is an asset total
  [S30], not software spend, and not demand reachable by a solo freelancer. No
  source here sizes the latter.
- **"Arabic is a moat."** Arabic-speaking engineers are plentiful in Egypt and
  Jordan [S38]. Dialect gaps in models are real [S29], but the moat is Arabic
  *plus* a domain *plus* proof, not Arabic alone (I infer).
- **"Forward-deployed engineering grew 1,000%, so everyone should become
  one."** The base was tiny, and the source is a scrape [S9]. It shows
  direction, not a guaranteed market.

## What to do

90-day immersion for the top domain, **insurance operations AI** (or, if the
values fork rules out conventional insurance, the same plan aimed at takaful
and cooperative insurers, or at ERP/order reconciliation). Budget: ~15
hrs/week.

| Practice | How to do it | Cadence | How to measure it | Evidence grade |
|---|---|---|---|---|
| **Resolve the values fork first** | Decide whether you'll build for conventional insurers, takaful only, or neither. Write it in `decisions/`. | Week 0, once | A written decision with reasons | A for the ruling [S34]; the choice is yours |
| **Publish the Primble case study** | Anonymised: problem, rules-first + LLM-for-gaps design, blank-over-wrong policy, 80%+ entry reduction. Clear it with Astrea first. | Weeks 1–2 | Published; Astrea sign-off obtained | Inference from [S12][S16]: buyers pay for workflow + accuracy |
| **Read the domain's own artefacts** | Gather public sample insurance applications, loss runs, and schedules of values. If India: IRDAI circulars on Bima Sugam integration [S15]. | Weeks 1–4, 3 hrs/wk | A glossary of 50 domain terms; can explain submission → quote → bind → claim end to end | B [S12][S15] |
| **Build a scored public demo** | An intake pipeline on public sample documents. Report field-level accuracy, the abstain rate (blank-over-wrong), and time per document. Eval harness in the repo. | Weeks 3–8, 6 hrs/wk | Accuracy and abstain rate per field type, published | Inference; mirrors the deployed pattern [S11][S12] |
| **Operator interviews** | 20 conversations with underwriters, claims handlers, MGA/broker ops, TPAs. Ask about their worst document and the system it must land in. Never pitch on the first call. | Weeks 3–10, 2/week | Count; top 3 recurring pains written up | Inference (FDE pattern [S9]) |
| **One paid pilot** | Fixed-scope, one document type to one system of record, priced on hours saved. Any size. | Weeks 8–12 | Signed and invoiced | Profile: first deal is the binding risk |
| **Parallel FDE/vertical-AI applications** | Apply to insurance-AI startups and FDE roles with the case study + demo as proof | Weeks 6–12, 5 per week | Interview rate | C [S9]; hedge toward the USD-salary path |
| **Skip certifications for now** | Revisit AINS only if 3+ buyers ask for credentials | Day 90 review | Buyer asks logged | A [S5] |
| **Day-90 review** | Score demand signals (pilots, interviews, inbound) against ERP reconciliation as the fallback domain | Day 90 | Go / pivot decision in `decisions/` | — |

## Leading indicators

- **Insurer deployment mix** in Evident's quarterly tracker [S11]. A shift from
  claims/intake toward pricing would move value away from document work.
- **A frontier lab shipping an insurance vertical** in the style of [S18][S19].
  If OpenAI or Anthropic package "insurance intake," point extraction is dead.
  Integration and accountability remain.
- **ECC→S/4 progress** in the next Gartner/ASUG numbers [S21]. A fast catch-up
  shrinks the ERP window. An extension to 2030 [S22] stretches it.
- **Bima Sugam going transactional** [S15]: an Indian insurer integration wave
  would create local, rupee-paid but reachable demand.
- **ZATCA wave 25 (2027-02-01)** [S24] and SDAIA transfer rules [S26]: whether
  Gulf compliance work stays SaaS-shaped or needs custom ERP integration.
- **Your own data:** pilot conversions and the interview-to-call rate beat every
  number above.

## Questions for me

1. Does the Fiqh Academy ruling on commercial insurance [S34] bind you? Would
   you build software *for* a conventional insurer, or only for takaful and
   cooperative insurers? This decides the top domain.
2. Can you publish Primble as a case study? What does your Astrea contract say
   about IP and client confidentiality?
3. Who is the Primble end client (carrier, MGA, broker, TPA), and in which
   country? That is your warmest first market.
4. Would you rather sell to Indian insurers (reachable, rupee-paid) or US/EU
   MGAs (USD, harder to reach)? Your $5k goal implies the latter. Is that
   decided?
5. How good is your Arabic for business: reading a policy wording, or running
   a client call? "Studies Arabic" scores very differently from "can negotiate
   in Arabic."
6. Would you take a forward-deployed, salaried role at an insurance-AI startup
   over freelancing, if it paid near $5k/month?
7. Do you know anyone at Astrea's SAP/Salesforce client who could introduce you
   to their SI or partner? That's the only cheap way into the ERP market.
8. Which of your three problem-class projects did you *enjoy* most? A 90-day
   immersion fails on boredom before it fails on demand.
9. The updated profile refuses manual sales work. The 20 operator interviews
   in the 90-day plan are research, not pitching, but someone still has to book
   them by hand. Is that tolerable? If not, the plan falls back to inbound only:
   the published case study and demo, plus FDE applications. Expect it to be
   slower.
