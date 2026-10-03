# The AI-era landscape
> As of 2026-10-03 · Status: draft

Numbers marked ★ in `sources.md` reached me only through a secondary report of
the primary source (direct fetches were blocked in this environment). Re-check
them before this report moves to `reviewed`. Rupee conversions use ₹95.74/$,
the 2026-09-24 close [S45].

## Bottom line

- **AI is cutting the bottom rung, not the ladder.** The best US payroll data
  shows ages 22–25 in AI-exposed jobs, software developers included, 19% below
  trend, while experienced workers in the same jobs are flat or growing
  [S3, A][S4, A]. The mechanism is fewer junior hires, not layoffs. Most of the
  2022–24 software slump is *not* AI: the postings bust, rates, Section 174,
  and remote work explain more of it [S2][S6][S7][S14]. At 2.5 years with a
  production record, you sit just above the hardest-hit band. (confidence:
  medium-high)
- **Agents now automate well-specified, verifiable code changes end to end;
  they don't reliably own ambiguous, multi-system work.** Productivity results
  range from 19% *slower* to 56% faster, and task familiarity and
  verifiability explain most of the spread [S18][S19][S20][S21]. Value moves to
  specifying, verifying, integrating, and owning outcomes. (confidence: medium)
- **Demand is shifting to senior and AI-specific roles, with a real but
  stabilising pay premium.** Senior roles made up 71% of the US software
  postings rebound, while entry and mid postings fell [S11]. AI-skill postings
  pay ~28% more [S34], and the AI premium is widest at senior levels [S37].
  India shows the same split: AI/ML postings +33–45% while general IT is flat to
  negative [S17]. (confidence: medium; mostly B-grade platform data)
- **Your $5k/month target is ~6.8× current pay (₹70k ≈ $731/month), and the
  Indian salaried market reaches it only at senior GCC/AI levels.** Senior AI
  bands in India's global capability centres (GCCs) are ₹50–80 LPA, about
  $4.4k–7.0k/month [S44, C]; I infer that band is years, not months, away at
  2.5 years' experience. Freelance on 15–20
  spare hours/week needs an effective $65–85/hr. Platforms *list* that rate
  for experienced ML work [S40, C], but the median *posted* budget is
  ~$30/hr [S41, C]. **Primary data on USD rates for India-based freelancers is
  thin. Treat every rate in this report as a hypothesis to test with real
  quotes.** (confidence: low on rates, high on the arithmetic)
- **Best-scoring pivots for you: a productized AI-document/integration
  service sold to foreign SMBs, forward-deployed/AI-engineer roles paid in
  USD, and eval/quality engineering.** All three sit where demand data is
  rising and where your proof (Primble, reconciliation, eval gates) already
  exists. See `pivots.md`. (confidence: medium; the fit scores are my
  inference)

## What the evidence says

### Q1. Hiring by seniority — and what the data can isolate

- **US entry-level collapse in exposed jobs is real and widening.** ADP payroll
  microdata (millions of workers) shows ages 22–25 in the most AI-exposed
  occupations about 16% below less-exposed peers after firm-time controls, with
  software developers among the hardest hit. Older workers in the same
  occupations kept growing [S1, A]. The gap widened from 15% (Aug 2025) to 19%
  (Aug 2026). It concentrates in occupations where AI use is *automative*, and
  is flat or rising where it is *augmentative* [S3, A]. It works through
  reduced hiring, not separations [S3].
- **Within-firm evidence agrees.** Firms that started hiring "AI integrator"
  roles cut junior headcount ~9% within six quarters relative to non-adopters,
  while senior headcount rose. Hiring slowdowns drove it, and mid-tier
  graduates were hit hardest [S4, A, working paper].
- **The postings bust is mostly pre-AI.** Indeed's US software postings index
  peaked at 2.3× pre-pandemic in Feb 2022 and fell to ~27.5% *below*
  pre-pandemic by June 2026 [S10, A★]. Most of that fall happened before coding
  agents were capable. Since Feb 2025 software postings are up ~15% while all
  postings fell 7%, and 71% of that rebound is senior roles. Versus Jan 2025,
  senior is +13.5%, mid −6.7%, entry −6.3% [S11, A★].
- **Graduate unemployment is elevated:** computer science 7.0% and computer
  engineering 7.8% for recent graduates [S5, A★].
- **Big tech is flat, not hiring.** Meta ended 2025 at 78,865, below its 2022
  peak of 86,482, and announced a ~10% cut in 2026. Microsoft's headcount is
  roughly flat, with its first voluntary buyout [S15, B★].
- **India's IT services shrank in FY26.** The top five firms' combined
  headcount fell by 7,389, against +12,718 in FY25. TCS alone fell by 23,460,
  partly from ~12,000 layoffs. Fresher intake continued (TCS ~40k/yr, Infosys
  ~20k) [S16, B]. Recruiters cite AI redeployment and low attrition [S16]. On
  Naukri, AI/ML postings rose 45% in FY26, while overall IT postings fell 3%
  YoY in June 2026 [S17, B].
- **Long-run official projections stay positive.** BLS projects software
  developers +15.8% for 2024–34 and computer programmers −6% [S12, A]. The
  split matters: the "write code to spec" occupation shrinks, while the
  "decide what to build and own it" occupation grows.

**What the data can isolate.** The firm-time-controlled ADP work [S1][S2] and
the adopter/non-adopter design [S4] separate AI from economy-wide shocks
*within* firms, and they put the AI-linked effect mainly in 2024 onward [S2].
They cannot rule out that firms which adopt AI are also the ones that would
have cut juniors anyway. Rates are a poor explanation, because exposed jobs are
*less* rate-sensitive [S2]. Remote work explains ~64% of the rise in young-grad
unemployment, mostly before AI [S6, A]. Weak openings explain more of the
18–24 jump than AI-skill demand does [S7, B★]. Section 174 raised the
after-tax cost of US developer salaries from 2022 until it was reversed in
July 2025 [S14, B]. **No dataset cleanly isolates offshoring.** I found no
primary source measuring it for 2023–26, so I make no claim.

### Q2. Controlled productivity studies, and why they disagree

| Study | Who / task | Result |
|---|---|---|
| Peng et al. [S21, A] | 95 devs, greenfield HTTP server in JS | 55.8% faster |
| Cui et al. [S20, A] | 4,867 devs at 3 firms, normal work | +26% completed tasks; bigger gains for juniors |
| METR 2025 [S18, A] | 16 expert maintainers, own 1M+ LOC repos | **19% slower**; believed 20% faster |
| METR late-2025 rerun [S19, A] | returning devs / new recruits | ~18% / ~4% faster, CIs cross zero, selection bias |
| Humlum & Vestergaard [S9, A] | 25k Danish workers, 11 occupations | ~3% time saved; no earnings/hours effect |

**Mechanism (I infer, consistent with all five).** AI speed-up scales with how
much of the task is *unknown to the human but knowable from the code or
docs*, and with how *cheaply output can be verified*. A greenfield toy task has
no hidden context and an obvious test, so the speed-up is large. An expert in
their own giant repo already holds the context, and the AI lacks it, so
reviewing near-misses costs more than it saves [S18]. 66% of developers name
"almost right" output as their top frustration [S23, A]. Juniors gain most
because the AI supplies context they lack [S20]. Team-level gains also leak
away downstream: DORA finds AI adoption now correlates with higher throughput
*and* higher instability (more change failures and rework) [S22, B]. The
perception gap is a finding in its own right: developers misjudged the
direction of their own speed-up [S18].

### Q3. Automated, augmented, untouched

- **Benchmarks are saturating and contaminated, so read them carefully.**
  OpenAI stopped reporting SWE-bench Verified after finding 59.4% of the hard
  failures it audited were flawed tasks, plus signs of memorised fixes. One
  model scored 80.9% Verified but 45.9% on the harder SWE-bench Pro
  [S25, A, incentive noted]. Top agents now solve the *same* Verified tasks,
  and scaffold choice moves scores by up to ~30 points [S26, B].
- **Task length is the cleaner trend.** METR measures the human-time length of
  tasks an agent finishes 50% of the time. Since 2023 that horizon has doubled
  roughly every ~131 days, and frontier agents in early 2026 sit around a
  working day or more [S24, A★]. 50% success is not deployment-grade: a task
  inside the horizon still fails half the time.
- **Automated end to end today (documented):** large mechanical migrations
  with strong test oracles. At Google, ~74% of migration code changes were
  LLM-generated, with an estimated ~50% time saving, but only inside a harness
  of AST discovery, build/test validation, and repair loops [S28, A]. Usage
  data shows agentic tools used mostly for automation (79% of Claude Code
  conversations) rather than collaboration [S27, A, incentive noted].
- **Augmented:** feature work in existing systems, debugging, and review. The
  gains are real but conditional on context and verification [S18–S22].
- **Barely touched (I infer from what the studies *don't* show):** deciding
  what to build, negotiating requirements with a client, owning production
  risk (money movement, authorization, compliance), and cross-organisation
  integration where the spec lives in people's heads. No study I found
  measured AI completing these end to end.

### Q4. When a task gets cheap, what gets more valuable?

- **Autor & Thompson give the general rule** [S31, A, peer-reviewed]. If
  automation removes an occupation's *inexpert* tasks, the remaining job
  becomes more expert: wages rise and employment falls. Bookkeepers lost a
  third of employment from 1980 to 2018, but real wages rose ~40%. If
  automation removes the *expert* tasks, the job opens to more people:
  employment rises and wages fall.
- **Spreadsheets:** ~400k fewer bookkeeping clerks, ~600k more accountants
  [S32, B]. Cheaper calculation raised demand for analysis.
- **ATMs:** tellers per branch fell ~20 → ~13, branches multiplied, teller
  employment held, and the job shifted to selling and problem-solving [S30, B].
- **CAD:** drafting folded into the engineer's job, and drafter employment is
  flat for 2024–34 [S33, A]. The specialist role shrank because the adjacent
  expert absorbed the tool.
- **Where the analogies break (I infer).** (1) Each of those tools automated a
  *narrow* task. Coding agents span much of the developer task list and are
  improving on a months-scale doubling [S24], so the "remaining expert tasks"
  are a moving target. (2) The ATM effect depended on cheaper branches
  expanding *demand*, and it is unproven that cheaper software expands demand
  enough to absorb the labour. The rebound in senior postings [S11] is early
  evidence for that; the junior gap [S3] is evidence against it at the entry
  level. (3) The CAD pattern is the closest fit, and it is the threatening one
  for pure coders: the domain expert plus the tool absorbs the specialist.
  **For you this cuts both ways.** "Backend coder" is the drafter. "Engineer
  who owns insurance-document automation" is the engineer who absorbed CAD.

### Q5. Rising roles and skills, from posting and pay data

- AI-skill postings advertise 28% higher pay (43% with two or more AI skills),
  and half of them sit outside IT [S34, B].
- AI engineer was the fastest-growing US title, with postings +143% YoY in
  2025; India AI-engineering roles are growing ~51%/yr [S35, B★].
- Forward-deployed engineer postings on Indeed went from 643 to 5,330 between
  Apr 2025 and Apr 2026, with a disclosed median of ~$174k [S36, C★]. The
  growth is from a tiny base, and the source is a recruiter.
- The AI/ML pay premium is ~6% at entry and over 78% at staff level, and it has
  stopped widening (L3: 1.34× → 1.29×) [S37, B★].
- India: AI/ML postings +45% in FY26 against flat IT [S17, B]. GCCs pay 12–20%
  more than IT services for cutting-edge roles [S44, C].
- **Evals, AI infra, and domain+software roles:** I found no primary
  posting-count data that separates these titles. The claim that they are
  rising rests on C-grade commentary, so I don't make it here.

### Q6. Is "judgement, taste, domain knowledge" a moat?

**For.** Seniority-biased change [S1][S4] is what you'd expect if AI
substitutes for codified knowledge and complements tacit knowledge.
Employment declines concentrate where AI *automates*, not where it
*augments* [S3]. Autor & Thompson show that removing inexpert tasks raises
the wage of whoever keeps the expert ones [S31]. The premium is highest at
senior levels [S37].

**Against (steelman).** (1) "Tacit" is a moving line. Each capability doubling
[S24] converts some judgement into something a model does. (2) The
complement-to-seniors effect may be *temporary*: if juniors aren't hired,
the pipeline that produces seniors shrinks, and firms may later restructure
around fewer, AI-heavy seniors. (3) Domain knowledge is also automatable once
written down, and the Google migration case shows that verifiable domain rules
are exactly what agents exploit [S28]. (4) The "moat" story is comforting to
the people telling it, mostly senior engineers and lab marketing.

**Verdict (I infer).** It is supported as a *2–3-year* claim and not as a
permanent one. The durable part isn't judgement in the abstract. It is
**accountability**: being the person a buyer can hold responsible for an
outcome in a domain where errors are costly. That is a market structure, not a
skill, and the analogue cases [S30][S33] show it persisting.

### Q7. Who you compete with (India-based, freelance/remote, AI full-stack)

- **The global freelance pool, mostly your own country.** India supplies about
  a third of online freelancers and the Indian subcontinent about 55% of the
  software-development category [S39, A, 2020–21 data]. On freelance platforms
  you compete first with other Indian engineers, so price is not an advantage.
- **The agents themselves, at the low end.** Writing and coding job posts fell
  21% relative to manual work within eight months of ChatGPT. The jobs that
  remained were more complex and better paid [S38, A]. Simple "build me a CRUD
  app" gigs are the shrinking segment.
- **Non-engineers with AI.** Half of AI-skill postings are outside IT [S34], so
  domain people are absorbing simple automation themselves. But 72% of
  professional developers say vibe coding is not part of their work [S23], and
  production ownership still sits with engineers.
- **AI-native juniors in India.** India is Claude's #2 market by share, and
  about half of Indian use is technical, mostly web-app build and debug
  [S29, A★]. Your tooling fluency is common here, not a differentiator.
- **Senior US/EU engineers on the same remote listings.** The pay gap is large:
  engineering-manager median pay is $200k in the US against $52k in India
  [S23, A]. That gap is your price advantage for USD work, if you can show
  equivalent outcomes.

### Q8. What differentiates people who get hired or paid well now

The hard data is thin. I found no recent large hiring-manager survey with
primary data, only vendor surveys (C). What posting and pay data show:
(1) seniority — demand is moving to senior postings [S11]; (2) AI-specific
skills on top of engineering — pay premium [S34][S37]; (3) customer-facing
engineering — the FDE growth [S36, C]; (4) for juniors, elite or low-tier
credentials suffered less than mid-tier [S4]. **I infer:** your rating as a
buyer sees it is closer to "senior" than your 2.5 years suggest, *if* the buyer
sees Primble's 80% reduction and the reconciliation work. They currently
don't (profile §2).

### India pay vs USD rates — the profile's own numbers

| Benchmark | Monthly, ≈USD | Source / grade |
|---|---|---|
| Your pay (₹70k assumed) | $731 | profile, [S45] |
| India average regular salaried worker, men (₹24,217) | $253 | [S43, A★] |
| India SWE, 1–5 yrs (₹8.8–9.7 LPA) | $766–844 | [S42, C★] |
| India GCC AI/ML mid (₹25–40 LPA) | $2,176–3,482 | [S44, C] |
| India GCC AI/ML senior (₹50–80 LPA) | $4,352–6,963 | [S44, C] |
| **Target** | **$5,000 (₹4.79 lakh; ₹57.4 LPA)** | profile |
| US software developer median ($135,980/yr) | $11,332 | [S13, A★] |

- **You are paid about at the Indian market for your band** [S42, C]. That
  makes the gap a market problem, not a negotiation problem.
- **Freelance arithmetic, before fees and taxes:** $5k/month needs 167
  billable hours at $30/hr, 100 at $50/hr, 67 at $75/hr, and 50 at $100/hr. 15–20
  spare hours a week is ~65–87 hours a month. **So on side hours alone, the
  target needs an effective ~$60–80/hr.** Upwork itself lists AI engineers at
  $35–60/hr and ML engineers at a median of ~$100/hr [S40, C]. Scraped posting
  data shows a median *advertised* ML budget of $30/hr and $200 fixed
  [S41, C].
- **Where the data is thin:** there is no primary dataset of *realised* USD
  rates for India-based freelance engineers by skill. The Online Labour Index
  measures volume, not rates [S39]. Platform rate pages are marketing [S40], and
  scraped postings show client asks, not what gets paid [S41]. Remote
  full-time USD salaries for India-based engineers likewise have no primary
  source I could find; Deel publishes only aggregate India medians across all
  roles. **The only reliable number you'll get is from your own quotes and
  closes.**

### Q9–Q10. Pivots and scenarios

The scored table of 11 pivots, the reasoning behind each score, and the three
capability scenarios (slow, medium, fast) with their leading indicators are in
`pivots.md`. In short: in every scenario, the pivots that win combine
*customer-facing ownership of a costly outcome* with AI engineering. The ones
that lose sell code volume.

## Where sources disagree

- **Is AI driving the junior slump?** Stanford/ADP and Harvard: yes, measurably
  since 2024, net of firm shocks [S1–S4]. NY Fed: remote work explains ~64%
  [S6]. St. Louis Fed: mostly weak openings [S7]. Yale: no economy-wide
  disruption [S8]. Denmark: zero earnings effect [S9]. *How to reconcile them:*
  the Stanford/Harvard effect is concentrated in a narrow cell (young × exposed
  × automative use), which economy-wide and all-occupation measures would
  dilute. These studies are not strictly contradictory; they answer different
  questions. *What would settle it:* whether the junior gap keeps widening once
  overall openings recover. The Aug 2026 widening during a software-postings
  rebound [S3][S11] leans toward AI.
- **Does AI speed up experienced developers?** METR 2025: −19% [S18]. Cui et
  al.: +26% [S20]. METR late 2025: probably positive now, but unmeasurable
  because of selection [S19]. *What would settle it:* a repeat RCT with
  agents, on unfamiliar codebases, measuring merged-and-surviving changes
  rather than completed tasks.
- **How capable are agents?** Lab-reported benchmark scores near saturation,
  against contamination audits and convergence analyses [S25][S26]. METR's
  horizon trend is the most defensible, but it is a 50%-success metric [S24].

## Myths and hype to ignore

- **"AI will write 90% of code in 3–6 months" (Mar 2025)** [S46, C]. That was a
  vendor CEO forecasting demand for his own product. Even if true inside one
  lab, the share of code written says nothing about the share of *engineering
  value*, and DORA shows instability rising with adoption [S22].
- **"Software jobs are disappearing."** US developer employment is ~1.69M with
  a positive 10-year projection [S12][S13], and postings are rebounding at the
  senior end [S11]. The *entry* rung is the one disappearing.
- **"AI is just autocomplete."** Agentic tools are used mostly for
  automation [S27], and Google landed tens of thousands of AI-authored edits
  in production [S28].
- **SWE-bench leaderboard deltas.** These are contaminated and statistically
  indistinguishable at the top [S25][S26]. Don't choose tools or fear
  timelines from them.
- **"Learn AI and get a 28% raise."** The premium is in *posted* salaries for
  roles that require AI skills [S34]. It is concentrated at senior levels
  [S37] and has stopped growing [S37]. A course certificate doesn't capture
  it.
- **Upwork "$100/hr median ML engineer."** That is a vendor marketing page
  [S40], and clients post a median of $30/hr [S41]. Your realised rate will
  sit between the two, set by proof and positioning, not by the page.

## What to do

| Practice | How to do it | Cadence | How to measure it | Evidence grade |
|---|---|---|---|---|
| Price-discover, don't assume | Send 10 real proposals/quotes at $40, $60, $80/hr equivalent for scoped AI-document/integration work; log reply and close rates per tier | 10 per week for 4 weeks | Reply %, close %, realised $/hr | Arithmetic A; rates C — this practice exists because the data is thin |
| Sell outcomes in the CAD-engineer frame | Rewrite each case study as "domain problem → measured result → how errors are bounded" (Primble 80%, reconciliation 70–75%) | Once, then one new per shipped project | Buyer replies citing a specific case study | Mechanism A [S31][S33]; application inferred |
| Stay on the verifiable, high-stakes side of the work | Prefer engagements involving money movement, authorization, document correctness, and integration with legacy systems, and avoid "build a CRUD app" gigs | Every proposal filter | Share of pipeline in high-stakes vs commodity gigs | A [S38], inferred [S28] |
| Turn your eval habit into a sellable deliverable | Package LLM-as-judge release gates + test harness as a fixed-scope offer | Build once (≤2 weekends) | Offers sent, accepted | B/C (no clean posting data for evals) |
| Use AI where the speed-up is real | Use agents for greenfield, migrations, and test scaffolding; hand-own familiar-repo deep changes; time a sample of tasks with and without AI | Monthly 5-task self-audit | Measured time vs your estimate | A [S18][S20][S28] |
| Track the five leading indicators below | One sheet; update quarterly; re-run this track | Quarterly | Indicators moved? Scenario changed? | — |

## Leading indicators

- **Stanford/ADP junior gap** [S3]: past ~25% points to the fast scenario;
  narrowing as openings recover points to the slow one.
- **Indeed software postings, senior vs entry mix** [S10][S11]: a mid-level
  decline spreading upward would threaten your band directly.
- **METR horizon at 80% success, not 50%** [S24]: when 80%-success horizons
  reach multi-day tasks, end-to-end feature automation becomes real.
- **Naukri AI/ML vs IT postings and Indian IT headcount** [S16][S17]: a
  continued divergence means India is repricing toward AI skills.
- **Your own funnel:** realised $/hr and close rate. This is the only rate
  data that is primary *for you*.

## Questions for me

1. Is ₹70k your monthly take-home or CTC/12? The 6.8× gap and every
   comparison above depend on it.
2. Would you take a senior GCC AI role in India at ₹50 LPA+ if it hit the
   target sooner than freelancing? Or is "foreign clients" a goal in itself?
3. At $60/hr you need ~85 billable hours/month from side time. Will you cut
   YouTube/Instagram from 20 hours to under 5 to make that possible, starting
   which week?
4. Which of your case studies can you publish *with numbers* without breaching
   Astrea's confidentiality? Who do you need to ask?
5. Does your employment contract allow outside paid work, IP you build on side
   time, or work for clients in Astrea's verticals?
6. Insurance-document AI or SAP/Salesforce reconciliation: which buyer could
   you name *today*, by company type and job title?
7. Would you sell a fixed-price "LLM document-extraction audit" before you
   have a single testimonial, and what price would feel wrong enough to test?
8. If agents automate most of what a mid-level backend engineer does by 2028
   (fast scenario), which part of your current week would still be yours?
