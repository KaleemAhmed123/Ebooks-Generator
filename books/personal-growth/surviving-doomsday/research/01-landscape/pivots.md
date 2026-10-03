# Pivots and scenarios — 01 Landscape
> As of 2026-10-03 · Status: draft · Citations refer to `sources.md`

## How to read the scores

Each axis is scored 1–5, and higher is always better for you.

- **Demand:** evidence that buyers pay for this now. 5 means A/B data showing
  growth; 1 means no data.
- **Defensibility:** resistance to further automation, judged against the
  mechanism in the report (verifiable + well-specified = exposed; costly
  outcome + owned by a person = defended).
- **Fit:** match with `profile.md`: proof, skills, gaps (no network, no sales
  record, dislike of posting).
- **Speed:** time to first USD/INR income. 5 means under 2 months; 1 means
  over 12.
- **Downside:** how mild failure is. 5 means you keep your job and the work
  still compounds into proof; 1 means you lose runway and get nothing reusable.

Demand scores rest on cited data. **Fit, Speed, and Downside are my inference
from the profile**, not measured.

| # | Pivot | Demand | Defens. | Fit | Speed | Downside | **Total /25** |
|---|---|---|---|---|---|---|---|
| 1 | Productized LLM document-automation service for foreign SMBs | 3 | 4 | 5 | 4 | 5 | **21** |
| 2 | India GCC AI/LLM engineer (salaried, switch jobs) | 4 | 3 | 4 | 3 | 5 | **19** |
| 3 | Evals / AI-quality engineering (service or role) | 2 | 4 | 5 | 3 | 5 | **19** |
| 4 | Enterprise-integration + AI agents (SAP/Salesforce/ERP) consulting | 3 | 4 | 4 | 3 | 4 | **18** |
| 5 | Generalist freelance AI/full-stack dev on platforms | 3 | 2 | 4 | 4 | 4 | **17** |
| 6 | Remote full-time AI engineer paid in USD | 4 | 3 | 4 | 2 | 4 | **17** |
| 7 | Forward-deployed engineer (remote, AI startup) | 4 | 4 | 3 | 2 | 4 | **17** |
| 8 | Arabic/RTL-first software for MENA buyers | 1 | 4 | 4 | 2 | 4 | **15** |
| 9 | AI infra / inference / MLOps specialist | 3 | 4 | 2 | 1 | 4 | **14** |
| 10 | Technical content and education (ebooks, courses) | 2 | 2 | 3 | 2 | 5 | **14** |
| 11 | Own SaaS product (e.g. Eudoro) as primary income | 2 | 3 | 3 | 1 | 3 | **12** |

## Reasoning per pivot

**1. Productized document-automation service (21).** *Demand 3:* the
freelance jobs that survived ChatGPT are the more complex, better-paid ones
[S38, A], and AI-skill demand is spreading outside IT [S34, B]. There is no
direct data on this exact offer, so it isn't higher. *Defensibility 4:* the
value is "the forms are filled correctly, and blank beats wrong", which means
owning error cost in a regulated domain. The Google migration case shows that
the *extraction* part automates once a harness exists [S28], so the defence
is the harness plus accountability, not the code. *Fit 5:* Primble is exactly
this, with a measured 80% result. *Speed 4:* one fixed-scope deal can close in
weeks if the case study is visible. *Downside 5:* runs on side hours, and
every proposal sharpens the case study.

**2. India GCC AI engineer (19).** *Demand 4:* AI/ML postings +45% in FY26
[S17, B]; GCCs pay over IT services [S44, C]. *Defensibility 3:* it is a
salaried role, exposed to whatever the parent company automates. *Fit 4:* the
résumé matches the AI/LLM job language. *Speed 3:* a normal job switch. **But**
a mid-level band (₹25–40 LPA ≈ $2.2–3.5k/month [S44, C]) does not reach $5k on
its own. It is the floor-raiser, not the target. *Downside 5:* a strictly
better version of your current position.

**3. Evals / AI quality (19).** *Demand 2:* I found no primary posting data
that isolates eval roles. The score would rise if track 07 finds paying
buyers. *Defensibility 4:* deciding what "correct" means for a domain is the
expert task that removing inexpert tasks leaves behind [S31]. Instability
rising with AI adoption [S22, B] is a demand signal for exactly this.
*Fit 5:* LLM-as-judge release gates already shipped. *Speed 3:* this sells
better as an add-on to pivot 1 than alone.

**4. Enterprise integration + AI (18).** *Demand 3:* integration with legacy
systems is where the spec lives in people's heads (report Q3), but I have no
posting data specific to it. *Defensibility 4:* errors are costly and
cross-system, and the work needs access and trust. *Fit 4:* the 14-object
idempotent reconciliation is a strong proof. *Speed 3:* enterprise buyers are
slow and need references, which you don't have (profile §2).

**5. Generalist platform freelancing (17).** *Demand 3:* volume exists, but
coding posts fell 21% relative to manual work [S38], and India supplies a
large share of the competition [S39]. *Defensibility 2:* "build me an app"
is the most automatable segment [S38][S27]. *Fit 4.* *Speed 4:* the fastest
route to a first dollar. **Use it as a price-discovery channel, not a
destination.** Median posted ML budgets of ~$30/hr [S41, C] make $5k on side
hours unlikely.

**6. Remote USD full-time AI engineer (17).** *Demand 4:* AI engineer is the
fastest-growing title [S35, B★], but the rebound is 71% senior [S11]. *Fit 4.*
*Speed 2:* remote hiring of India-based engineers by foreign firms has no
primary data I could find, and the funnel is long. *Downside 4:* interviewing
costs time, not money. One role at ~$60k/yr hits the target outright, which is
why this stays in the top group despite the slow speed.

**7. Forward-deployed engineer (17).** *Demand 4:* steep posting growth from a
small base [S36, C★]. It is held to 4 rather than 5 because the source is a
recruiter. *Defensibility 4:* the job *is* customer-facing ownership.
*Fit 3:* the technical side is a strong match, but the role needs the very
skills the profile flags as gaps (sales, connection-making). *Speed 2:* most
FDE roles are US/onsite-skewed (I infer from the disclosed salaries [S36]).
This pivot is also the forcing function for your 3-year "able to sell" goal.

**8. Arabic/RTL MENA (15).** *Demand 1:* untested, and that is track 05's
job. *Defensibility 4* and *Fit 4:* the language plus Gaza40+ RTL production
experience is rare (profile §3). It stays a hypothesis until a buyer is found.

**9. AI infra / MLOps (14).** *Demand 3:* the pay premium is highest in
specialised senior AI work [S37], but there is no clean India-specific posting
data for infra. *Fit 2:* the profile is application-layer, not GPU/inference.
*Speed 1:* a long retrain.

**10. Content and education (14).** *Demand 2:* no primary data on income.
*Defensibility 2:* explanatory content is cheap to generate. *Downside 5:*
it's the distribution engine for pivots 1–7 even if it never earns directly.
**Treat it as marketing, not a revenue line.**

**11. Own SaaS as primary income (12).** *Demand 2:* no evidence of buyers
for Eudoro or Onlycouplez yet (profile "biggest unknowns"). *Speed 1.*
*Downside 3:* burns side hours with uncertain return. It is best kept as proof
for pivots 1, 3 and 4 until track 11 says otherwise.

**The combination the scores point to (I infer):** pivot 1 (with 3 as its
add-on) on side hours, using pivot 5 platforms only to discover price, while
running pivot 2 or 6 as the salaried floor-raiser. Pivot 7 is the 3-year
stretch that also trains selling.

## Three scenarios to 2029

The capability anchor is METR's 50%-success horizon, which has doubled every
~131 days since 2023 [S24, A★]. The labour anchor is the Stanford/ADP junior
gap, 19% as of Aug 2026 [S3, A].

### Slow — capability growth stalls (doubling slows past ~7 months)

- **Software work:** agents stay strong on verifiable, well-specified tasks
  [S28] and unreliable on ambiguous ones. Productivity gains look like the
  Danish null [S9] and DORA instability [S22]. The junior gap stabilises as
  openings recover [S7].
- **Pivots that win:** 2 and 6 (salaried AI roles keep their premium), and 5
  stays viable. 1 and 4 still work, but face more competition from
  generalists.
- **Indicators:** METR doubling time lengthens; the junior gap stops widening
  or narrows; entry and mid software postings recover alongside senior ones
  [S11]; the AI pay premium keeps flattening [S37].

### Medium — the current trend holds (~4–5 month doubling)

- **Software work:** the CAD pattern [S33]. Senior and domain engineers absorb
  what mid-level implementers did; the junior gap widens past 20%; posting
  growth stays senior-heavy [S11]; Indian IT services keep flat headcount while
  AI/ML hiring grows [S16][S17].
- **Pivots that win:** 1, 3, 4 and 7, where the buyer pays for an owned
  outcome. 5 shrinks to complex jobs only [S38].
- **Indicators:** this is roughly today's path. Watch for mid-level postings
  falling in step with entry-level ones, and for agents hitting 80%
  reliability on day-long tasks.

### Fast — 80%-reliable horizons reach multi-day tasks by ~2028

- **Software work:** most implementation inside an existing, well-tested
  system becomes agent work. Demand shifts to specifying, verifying, and
  carrying liability. The automate-vs-augment split [S3][S27] reaches
  mid-level roles. The "moat" steelman (report Q6) starts to bite: judgement
  in codified domains gets automated too.
- **Pivots that win:** 7 (forward-deployed engineering, because someone has
  to translate the customer into agent specs and own the result), 3 (evals
  become the bottleneck), and 1 *if* repositioned as accountability plus
  harness rather than labour. 5 and 10 lose most.
- **Indicators:** METR or a successor shows 80%-success horizons beyond a
  working week; the Stanford/ADP gap spreads to ages 26–30; senior postings
  stop growing [S11]; Indian IT services report revenue growth with falling
  headcount for several quarters [S16].

**Robust move across all three (I infer):** pivots 1 and 3 are the only ones
that combine defensibility ≥4 with the mildest downside (5). They run on side
hours, so in the slow scenario they cost little, and in the medium and fast
scenarios they are among the winners.
