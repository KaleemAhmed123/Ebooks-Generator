# Dealing with clients
> As of 2026-10-03 · Status: draft

Verification note: direct page fetches were blocked in this session (RBI,
Stripe and other sites), so every source was checked through search-engine
summaries, not full texts. Section Q6 is regulatory. **Nothing in it is advice.
A Chartered Accountant (CA) signs off before you invoice the first foreign
client.** `research/01-landscape/` did not exist when this was written, so the
rate figures here are not cross-checked against it.

## Bottom line

- **Your first job is a public track record, not a channel strategy.** The best evidence on online hiring is randomized: one job plus a public review roughly tripled novices' later earnings [S6], and buyers pay a premium for any credible signal while a newcomer has none [S7]. Treat client #1 as buying the right to charge for client #2. Take a small, fixed-scope job, priced low but not free, from a buyer who will leave a review or a named reference. (confidence: high)
- **For someone who won't post, the workable order is platform → warm referral → targeted outbound.** Content is a slow channel and you have six months. Platforms solve the trust problem for strangers [S6][S7]. Referrals are how buyers search first (71%) [S8]. Outbound is a numbers game with roughly 5–8% reply rates in vendor data [S9]. Bid on AI-integration work, not generic coding: demand is shrinking for substitutable, short, novice jobs [S2][S3] and rising for complex AI work [S3][S4]. (confidence: medium; channel quality data is mostly B/C)
- **Price on scope, not on hours, but only once scope is knowable.** If AI makes you faster, hourly billing hands the gain to the client. Fixed price keeps it, and pays for that with change-order risk [S11]. Contract theory says time-based billing wins when the design is incomplete [S11]. So run paid discovery hourly or fixed, build fixed-price, then move to a retainer. Be careful about "AI makes me 2× faster": the best RCT found experienced developers were 19% *slower* while believing they were faster [S12]. Measure your own speed before you price on it. (confidence: medium)
- **Contracts: get a signed assignment-on-payment, a liability cap, a deposit, and a change-order clause.** Under US law, most custom software from a contractor is not "work made for hire". The client needs a signed written assignment [S20]. India also requires assignment in writing [S21]. Use a lawyer-drafted standard such as Common Paper's PSA (default cap: 1× the last 12 months' fees) instead of writing your own [S18]. (confidence: high on the law; get a lawyer for anything over a small engagement)
- **$5k/month from India is reachable on paper, but it crosses tax lines you must plan for now.** That is about ₹57.4 lakh a year at ₹95.74/$ [S29]. That is above the ₹20 lakh GST registration exemption [S25], so you will need GST registration and an LUT to export at 0% [S24]. It fits under the ₹75 lakh presumptive-tax limit if receipts come by bank [S26]. Realisation is now due within 9 months of invoice, with monthly EDF filing from 1 Oct 2026 [S23]. Stripe is invite-only and closed to individuals [S30]. Wise personal accounts reportedly stopped receiving [S32]. A Wise *Business* account, Payoneer, or an RBI-authorised PA-CB like Skydo are the live options [S31][S33][S34]. (confidence: medium; new FEMA rules took effect 1 Oct 2026, CA sign-off required)

## What the evidence says

### Q1. Where do good clients come from, and what is AI doing to platforms?

**The first job is the hardest, and the evidence says why.** Pallais hired 952
randomly chosen oDesk (now Upwork) novices and gave them public evaluations.
They were later more likely to be employed, asked for higher wages, and
inexperienced workers' earnings roughly tripled [S6, A]. Employers don't hire
people with no record because the record is the product. Stanton & Thomas show
the market's workaround: agency-affiliated newcomers get hired more and paid
more. The advantage disappears once a good independent worker earns public
feedback, and it is largest for **skilled workers in developing countries** [S7, A].
That is you. *I infer* two moves: (a) your first two or three jobs exist to make
the signal, not the money; (b) in the meantime, borrow a signal. That means
subcontracting through an agency, a platform badge, or a named reference from
your current work, if your contract allows it.

**Referrals are the top channel for buyers of professional services.** In
Hinge's survey of 822 buyers, 71% first asked friends and colleagues. Most
satisfied buyers said they would refer but were never asked. Later editions
show fewer buyers asking for referrals and more using search [S8, B, vendor
survey]. With zero network, this channel only opens *after* client #1. Asking
every satisfied client for a referral, by name, is the cheapest practice in
this report.

**Outbound works at low rates and degrades fast with volume.** Belkins' 2024
data (16.5M emails, 93 domains) shows a 5.8% average reply rate, down from 6.8%.
The first email gets the most replies, and 4+ emails triple spam complaints
[S9, C, lead-gen vendor]. A reply is not a deal. *I infer* that 100
well-targeted emails yield single-digit conversations. That is useful only
with a narrow, provable offer, e.g. "LLM form-filling from policy PDFs, 80%+
less manual entry" (Primble).

**AI is reshaping platforms by job type, not wholesale.**

| Signal | Finding | Source |
|---|---|---|
| Writing jobs after ChatGPT | −2% jobs, −5.2% monthly earnings; hit hardest at the experienced, higher-priced end | [S1, A] |
| Automation-prone writing + coding posts | −21% within 8 months vs manual-intensive work | [S2, A] |
| Substitutable skills (3M+ postings) | −20% to −50% vs trend, worst in 1–3 week jobs; novice demand down | [S3, A] |
| Complementary skills | ML programming +24%; chatbot development ~3× | [S3, A] |
| Upwork's own 2026 data | AI work pays 34% more per hour; complex AI work earnings +45% YoY; low-complexity gen-AI work +90% in volume but −13% per contract | [S4, B, vendor] |

The evidence converges. Short, generic coding gigs are shrinking and
commoditising. AI-integration work done with domain judgement is growing. Your
proof (production RAG, eval gates, document automation, ERP integration) sits
on the growing side.

**Platform cost.** Since 1 May 2025, Upwork charges freelancers a variable 0–15%
per contract. It is shown before you bid and fixed for the contract [S5, A].
Fee mechanics change often; check on the day.

### Q2. Pricing when AI makes you faster

**The mechanism.** Hourly billing pays for input. If a task drops from 10 hours
to 5, hourly revenue halves while the client's value stays the same. Fixed or
value-based pricing pays for output, so the seller keeps the time saved.
Contract theory gives the condition. Fixed price gives strong cost-cutting
incentives but makes every change a renegotiation. Cost-plus (time-based)
billing is better when the project is complex or the design is incomplete
[S11, A]. So the choice between hourly and fixed depends on **how well the scope
is known**, not on ideology.

**Practitioners are already repricing.** Law, the most hourly-bound profession,
shows the pattern. Clio estimates 74% of hourly billable tasks are automatable,
and flat-fee bills rose in 2024 from 19% of all bills in 2023 [S14, B, vendor].
No comparable dataset exists for software freelancers. I found none; treat any
"X% of devs moved to fixed price" claim as unsourced.

**Counter-case: are you actually faster?** METR's RCT found experienced
developers on their own large repos took 19% *longer* with early-2025 AI. They
expected to be 24% faster and still believed afterwards they had been 20%
faster [S12, A]. METR's 2026 update moved toward a speed-up, but its
confidence intervals cross zero. METR calls the result unreliable because
developers now refuse to work without AI [S13, A]. Stack Overflow's 2025
survey: 66% are frustrated by AI output that is "almost right, but not quite",
and 46% distrust its accuracy [S15, B]. *I infer*: price fixed only on work
you have timed yourself with AI, including review and debugging time.
Otherwise you are pricing a feeling that the best evidence says is often wrong.

**What $5k/month means in hours.** At 15–20 spare hours a week (about 65–87
hours a month), $5,000 requires about $57–77 per hour if *every* hour is billed.
Sales, scoping and admin eat some of those hours, so the real effective rate
is higher. The only published rate guides are staffing-agency marketing,
quoting US freelance LLM developers at $75–125/h junior and about $210/h median
senior [S35, C]. They are an upper bound for a US-based seller, not a target
for an India-based one with no reviews. The landscape track (01) should supply
better data.

### Q3. Discovery, proposals, scope and contracts

**Discovery is where deals are won.** Huthwaite's 12-year study of 35,000
calls found that in large B2B sales, top performers asked more questions
about problems and their *implications* and pitched less. Closing techniques
that work in small sales backfired in large ones [S17, B]. Huthwaite owns the
data and it predates software sales, so treat it as a strong heuristic, not a
law. `toolkit.md` turns this into a question list.

**Scope creep is the default, not the exception.** 52% of projects had scope
creep in PMI's 2018 survey, up from 43% five years before [S16, B]. A
fixed-price freelancer pays for every unpriced change [S11]. So the proposal
needs explicit out-of-scope items and a change-order rule.

**Contract basics, from primary law.**

| Clause | Why, mechanism | Source |
|---|---|---|
| IP: assignment *on full payment*, in writing | US: contractor software is rarely "work made for hire"; ownership moves only by signed written assignment (§204(a)). India: assignment must be written, signed, and name rights, duration and territory; unexercised rights lapse after 1 year unless the deed says otherwise. Tying assignment to payment is your collection leverage. | [S20, A] [S21, A] |
| Keep your pre-existing code | Reusable libraries and prompts stay yours, licensed to the client. Without this, an assignment clause can capture your toolkit. | *inference*; standard in [S18] |
| Liability cap | Default market standard: 1× fees paid or payable in the prior 12 months, with higher caps only for named breaches such as security or confidentiality. | [S18, B] |
| Payment terms | Deposit up front, milestones, short net terms. For India: invoice in foreign currency and collect well inside the 9-month realisation window. | [S23] |
| Change requests | Written change order with price and timeline impact before work starts. | [S11] mechanism, [S16] base rate |

Use a lawyer-drafted standard (Common Paper PSA, CC BY 4.0 [S18]) as the base.
Have a lawyer review it once, then reuse it. No primary source was found for
which country's law should govern a contract with a foreign client. **Lawyer
question.**

### Q4. Managing expectations of clients who saw an AI demo

No study measures client expectations of AI-built deliverables directly. What
exists is evidence about the gap between demo and production. Developers
overrate AI speed-ups [S12]. Practitioners' main pain is output that is almost
right [S15]. *I infer* three practices from this and from your own record.
(1) Sell a measured outcome against a baseline, as Primble did with "80%+ less
manual entry", not "AI-powered". (2) Put an evaluation set and an accuracy
target in the proposal, so "works" is defined before you build. Your
LLM-as-judge release gates are the asset here. (3) Price maintenance
separately: models, APIs and data drift after delivery. This section is
inference from adjacent evidence; it needs field testing (confidence: low).

### Q5. Retention, retainers, firing clients

Evidence here is thin. The famous "acquiring a customer costs 5–25× more than
keeping one" figure comes from an HBR article that names no study for the
range. The underlying Bain work studied credit cards and insurance [S19, C].
The *mechanism* still applies to you: client #1 is your only source of a review
and a referral [S6][S8]. A retainer also turns the post-delivery maintenance
need from Q4 into recurring revenue. *I infer* the conversion point is the end
of a successful build: offer a small monthly retainer for monitoring, eval
re-runs and model/API updates. Fire or re-scope a client who repeatedly
disputes signed scope, pays late against the contract, or asks for work in
your refusal categories. No study supports specific thresholds; set yours in
the brainstorm.

### Q6. Cross-border from Noida: rails, invoicing, tax, time zones

**Everything here needs CA sign-off.** The FEMA rules changed on 1 Oct 2026.

**Payment rails (as of 2026-10-03):**

| Rail | Status for you | Source |
|---|---|---|
| Stripe India | Invite-only since 2024. International payments need a registered business (sole proprietorship or company), not an individual. | [S30, A] |
| Wise Business | Receiving details for USD, EUR, GBP and more; auto-converts to INR in 1–2 days; e-FIRC within 7 days. Personal India accounts reportedly lost receiving from 5 Apr 2026. | [S31, A] [S32, C] |
| Payoneer | Free from Payoneer users, about 1% via ACH, up to 3% by card, about 2% FX margin to INR; annual fee under $6k/yr; digital FIRA. | [S33, C until read first-hand] |
| PA-CB fintechs (Skydo, Razorpay, PayPal) | RBI's Payment Aggregator–Cross Border regime; Skydo got final authorisation 9 Jan 2026; cap ₹25 lakh per transaction. | [S28] [S34, B] |
| Upwork | Paid via platform; you withdraw to Payoneer or bank. | [S5] |

Whatever rail you use, collect the **FIRA/e-FIRC** for every payment. It is
your proof of foreign-exchange receipt for GST export treatment [S24] and for
your bank's export reporting [S23].

**FEMA (from 1 Oct 2026).** New regulations replace the 2015 ones [S22, A].
Export proceeds for services must be realised and repatriated within **9
months from the invoice date**, or 12 months if invoiced or settled in INR.
Services exporters file an **Export Declaration Form (EDF)** with their bank
within 30 days of the end of the invoice month [S23]. Whether a PA-CB or Wise
files this on your behalf was not established. **CA/bank question.**

**GST.** A service is an export only if all five conditions in IGST s.2(6)
hold, including payment in convertible foreign exchange. Exports are
zero-rated, and with an LUT (Form RFD-11) you charge 0% IGST [S24][S25].
Aggregate turnover *includes* exports. Inter-state service suppliers under ₹20
lakh are exempt from registration [S25]. ₹20 lakh is about $20,890/year, or
$1,741/month on average, at ₹95.74 [S29]. **You cross it below half your
target.** Register and file the LUT before you cross it, not after.

**Income tax.** The Income-tax Act, 2025 has applied since 1 Apr 2026. Old
s.44ADA is now **s.58**: for specified professions, income is presumed at 50%
of gross receipts. The limit is ₹75 lakh if cash receipts are ≤5% [S26].
Advance tax is due in one instalment by 15 March [S27]. $5k/month is about
₹57.4 lakh/year: over the ₹50 lakh base limit, under ₹75 lakh with all-bank
receipts. **CA question:** does software development or AI consulting count as
a "specified profession" for you? It is often treated as technical
consultancy, but this was not confirmed from the statute text.

**Time zones.** India is UTC+5:30 with no daylight saving time. A 9:00 New York
morning is 18:30 IST in US summer. London is 4.5 hours behind in UK summer, so
its afternoon is your evening. The UAE is 1.5 hours behind and Saudi Arabia
2.5 hours behind, so their working day overlaps your day job, not your
evenings. That changes the Gulf hypothesis from track 05. (Stable facts; no
citation needed beyond standard time-zone offsets.)

**Not covered by any source, and possibly the biggest risk: your current
employment contract.** Moonlighting clauses, IP-assignment clauses covering
work done outside hours, and confidentiality over Astrea client projects
(Primble, ECOU, SAP–Salesforce) may limit what you can sell and what you can
show. **Read it before taking client #1.**

## Where sources disagree

- **Follow-ups in outbound.** Belkins says the first email gets the highest
  reply rate and 4+ emails triple spam complaints [S9]. Instantly says the
  first follow-up adds 40–50% more replies [S10]. Both are vendors with opposite
  products to sell. What settles it: your own reply rates by step, over about
  100 sends.
- **Does AI make you faster?** METR's RCT says experienced developers were
  slower in early 2025 [S12]. METR's own 2026 update and Upwork's data suggest
  AI users now produce more and earn more per hour [S13][S4]. Upwork's figure
  is correlational and self-interested. METR's is causal but dated, and
  selection-biased in 2026. What settles it: time your own tasks with and
  without AI on real client-like work.
- **Are referrals still dominant?** Hinge's first study puts friends and
  colleagues first at 71%. Its later editions show fewer buyers asking for
  referrals and more using search [S8]. Both come from one vendor. What settles
  it: an independent buyer survey. None was found.
- **Hourly vs fixed.** Practitioner advice and Clio push fixed fees [S14].
  Contract theory says hourly is right when scope is uncertain [S11]. These do
  not conflict once you condition on scope certainty; they conflict only as
  slogans.

## Myths and hype to ignore

- **"Acquiring a customer costs 5–25× more than retaining one."** The source
  article names no study for the range, and the original Bain work covered
  credit cards and insurance [S19]. The retention argument stands on the
  review and referral mechanism instead [S6][S8].
- **"Just charge more / value-based pricing always wins."** No study of
  software freelancers shows this. Fixed and value pricing transfer risk to you
  and fail when scope is unknown [S11].
- **"AI makes me 2× faster, so I can do 2× the clients."** Self-estimates of
  AI speed-up were wrong in sign in the only RCT [S12].
- **Rate guides saying LLM developers make $210/hour.** These come from
  staffing-agency marketing with no method [S35]. Novice and non-US sellers
  face a no-reputation discount [S6][S7].
- **"AI is killing freelance coding."** That is true for short, substitutable
  gigs [S2][S3]. It is false for complementary AI-integration work, which grew
  [S3][S4].

## What to do

| Practice | How to do it | Cadence | How to measure it | Evidence |
|---|---|---|---|---|
| Read your employment contract | Check for moonlighting, outside-IP and confidentiality clauses; confirm which Astrea work you may describe publicly | Once, this week | Written yes/no list of what you may sell and show | inference (no source) |
| Book a CA | Agenda: GST registration timing, LUT, s.58 eligibility, EDF filing, rail choice | Once before invoice #1; then quarterly | Signed-off checklist | [S23–S27] A |
| Open a business-capable receiving rail | Wise Business or a PA-CB (Skydo); Payoneer if you use Upwork. A sole-proprietorship setup may be needed; ask the CA. | Once | Test payment received with FIRA | [S30–S34] A/B/C |
| Land client #1 for the signal | Apply to small, fixed-scope AI-integration jobs on Upwork; one productised offer from Primble ("LLM form-fill from PDFs, measured accuracy") | 10 proposals/week until first hire | Proposals → interviews → hires; first public review | [S6][S7] A, [S3] A |
| Borrow a signal | Offer to subcontract to 3–5 small AI or dev agencies, overflow work under their name | 5 agency emails/week for 4 weeks | Replies, first subcontract | [S7] A |
| Targeted outbound | 20 hand-researched emails a week to companies with the exact problem one of your case studies solved; one email + at most one follow-up | Weekly | Reply rate by step; calls booked | [S9][S10] C |
| Ask for referrals and reviews | At delivery, ask by name: "Who else has this problem?" plus a written review | Every project end | Referrals per client | [S8] B, [S6] A |
| Time yourself before fixed pricing | Log AI-assisted hours per task type, including review and debug | Every task for 4 weeks | Hours per task type; estimate error % | [S12][S13] A |
| Price by scope certainty | Use the decision tree in `toolkit.md` | Every proposal | Margin per project; change orders billed | [S11] A |
| Contract from a standard | Common Paper PSA + assignment-on-payment + deposit + change orders; lawyer review once | Once, then reuse | Disputes; days to payment | [S18] B, [S20][S21] A |
| Convert to retainer | At the end of a successful build, offer monthly monitoring, eval re-runs and model updates | Each delivery | Retainer conversion %; MRR | inference |

## Leading indicators

- **RBI or bank guidance on EDF filing for small services exporters and PA-CB
  users.** The rules are 2 days old; your bank's process will define the
  real burden.
- **Stripe India reopening, or Wise changing Business-account rules.** Either
  would change the rail choice.
- **Upwork fee changes and the next Future Workforce Index.** A falling
  per-contract price for AI-integration work would mean commoditisation has
  reached your category [S4].
- **Your own funnel numbers after 4 weeks:** proposals → interviews → hires,
  outbound reply rate. Zero interviews from 40 proposals means the offer or
  profile is wrong, not the channel.
- **A first review or referral.** If one arrives, the evidence [S6] predicts
  the next hire comes faster and at a higher rate. If it doesn't, re-check
  that prediction against your own data.
- **USD/INR.** A weaker rupee raises your INR income and moves you faster
  across the ₹20 lakh GST and ₹75 lakh tax lines [S25][S26].

## Questions for me

1. Does your Astrea contract allow paid outside work, and who owns code you
   write on your own time? Can you name Primble or ECOU in a pitch?
2. Is the ₹70,000/month figure net or gross, and would you quit Astrea at, say,
   $2,000/month freelance? The ₹20 lakh GST line arrives at about $1,741/month.
3. Which *one* offer will you sell first: insurance-document AI, ERP/CRM
   integration, or RAG with eval gates? Pick one; outbound and proposals need
   a single sentence.
4. Will you accept a job at roughly break-even pay in exchange for a public
   review [S6]? What is the floor?
5. Upwork posting needs no public posting from you. Is that the compromise
   that respects your dislike of posting? If not, what is?
6. Are you willing to email 5 agencies a week offering to subcontract under
   their name [S7]? That trades brand for speed.
7. Your evenings overlap US mornings and UK afternoons. The Gulf overlaps
   your day job. Does that kill the Gulf idea until you leave Astrea?
8. What are your hard refusals (interest-based lending, gambling, adult
   content)? Check your own products against them too. Decide before a client asks.
9. Have you ever timed a real task with and without AI? If not, how will you
   quote fixed prices in the first month?
10. Sole proprietorship now, or wait until the first invoice? Stripe and some
    rails need a registered business. Ask the CA.
