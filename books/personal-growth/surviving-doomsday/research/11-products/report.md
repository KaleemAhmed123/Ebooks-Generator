# Products: personal projects, micro SaaS, internal tools
> As of 2026-10-03 · Status: draft

Every source was checked through search summaries, not full texts (fetches
were blocked; see `sources.md`). ★ numbers need a first-hand re-read before
`reviewed`. Rupee figures use ₹95.74/$ from track 01.

## Bottom line

- **Micro SaaS is the wrong primary path for the 12-month $5k goal.** The
  median Stripe-verified indie product earns $169/month [S2], 80.9% of
  solo-founder products earn under $500 MRR and 6.4% clear $5,000 [S1]. The
  median bootstrapped SaaS takes 3+ years to reach $1M ARR, even among
  companies that already bill [S4]. Planning on $5k/month in 12 months from a
  product means planning on a top-6% outcome. (confidence: medium; the samples
  are self-selected B data, but every source points the same way)
- **Internal tools sold as a build fee plus a maintenance retainer fit you
  best.** This is the productized-service path tracks 01, 05 and 07 already
  point to. Buyers are building more custom tools [S24, C]. Vendor-built AI
  projects reportedly succeed more often than in-house ones [S25, C]. And
  your proof (Primble, reconciliation) is exactly this shape. It still needs
  a human sales conversation for deal one; nothing found removes that.
  (confidence: medium; the demand evidence is vendor-grade)
- **Eudoro: don't sell it, don't productize it. Keep it as proof and pivot
  its parts into a service.** A pre-revenue marketplace can't be listed on
  the main small-SaaS exchange [S9]. As a product it competes with a free MIT
  stack (Medusa + Mercur) [S43] and with hosted builders from ~$39/month
  [S42][S44]. Its value is the evidence it holds: exactly-once webhooks, a
  seller ledger, gated payouts. That sells as "payments and integration
  reliability" work. (confidence: medium-high)
- **Onlycouplez: don't sell it. Strip it for parts and keep it out of B2B
  pitches unless the brainstorm clears it.** AI-companion revenue is
  concentrated (top 10% of apps take 89%) [S41]. The category now carries
  regulator attention [S38], a law with a private right of action [S39], a
  €5M GDPR precedent [S40], and payment-processor restrictions if content
  turns intimate [S36]. Its eval gates and injection isolation become a
  fixed-scope "LLM release-gate" service offer and an open harness.
  (confidence: medium; I don't know the product's exact audience, see
  Questions)
- **On your no-manual-sales rule, the only product distribution that fits is
  an app marketplace, and it's crowded. SEO is decaying.** Shopify keeps 0%
  of a developer's first $1M a year [S6], but 54.5% of its developers
  earned under $1k/month in 2021 [S5, C]. AI summaries roughly halve organic
  clicks [S21][S22]. For services, an inbound platform (Upwork, per track 07)
  is the least-manual path. **No path to a first B2B internal-tool deal fits
  the refusal fully.** (confidence: medium)

## What the evidence says

### Q1. Base rates: how small software products actually fare

| Measure | Number | Source, grade, reliability |
|---|---|---|
| Median monthly revenue, 5,079 Stripe-verified indie products | $169 | [S2, B★] self-listed; includes failures that bothered to connect Stripe |
| Share with *any* revenue, 998 Stripe-connected products | 51.3% | [S3, B★] |
| Solo founders: <$500 MRR / >$5,000 MRR | 80.9% / 6.4% | [S1, B★] |
| Shopify app developers under $1k/month (2021) | 54.5% | [S5, C★] estimates from installs × price |
| Median bootstrapped SaaS to $1M ARR | 3+ years (top quartile ~2) | [S4, B] conditioned on already billing, so it overstates the typical case |
| Stripe Atlas startups charging a first customer within 30 days | 20% (2025), 8% (2020) | [S10, B] incorporated companies, so selected for intent |
| US establishments alive after 5 / 10 years (all industries) | ~50% / ~35% | [S11, A] "exit" includes sales, not only failure |
| Post-mortems citing "no market need" | ~35–42% | [S12, C] self-reported |

**How to read it.** No dataset covers the whole population of side-project
products. The ones nobody shows are the many that never charged. Every sample
above is conditioned on *something* (connecting Stripe, listing, billing
through a vendor), which pushes the real median *below* these numbers (I
infer). Time to first dollar: even among incorporated startups, 80% take
longer than 30 days [S10]. The best available summary is that most small
products earn approximately nothing, and the median that earns, earns pocket
money.

**Exit value is no rescue.** Acquire.com SaaS listings ask a median ~2.3×
trailing revenue [S8, C]. Pre-revenue listings are accepted only for SaaS
priced under $25k with active users, and pre-revenue *marketplaces* not at
all [S9, A]. A product with no revenue has close to no sale value.

### Q2. Platform risk: what happens when the model provider ships your feature

| Case | What happened | Source |
|---|---|---|
| Jasper (AI copywriting) | ChatGPT launched six weeks after a $1.5B round. SMB users moved to free/$20 ChatGPT; internal valuation cut ~20%, 2023 projections cut ≥30%, layoffs | [S13, B] |
| "Chat with PDF" tools | ChatGPT added native file analysis (late 2023); the category's core feature became free | [S15, C] — no count of shutdowns exists |
| Tome (AI decks) | 20M users, $3.5M ARR, <2% paid; prompt-to-deck became a default feature in Microsoft, Google, Canva; product shut Apr 2025 | [S16, B/C] |
| Chegg (homework answers) | Subscribers −31% YoY to 3.2M in Q1 2025, revenue −30%, 22% staff cut; blames AI Overviews and free student AI plans; sued Google | [S14, B] |
| GPT Store builders | Revenue share stayed a closed US pilot | [S18, B] |

**Counter-case:** Cursor runs on third-party models and passed $1B ARR in
2025 [S17, B]. Model dependence alone doesn't kill a product.

**Mechanism (I infer from the cases).** Products died when their value was
*a capability the lab ships horizontally*: generate text, read a PDF, make
slides, answer a question. They survived when the value sat where a general
assistant can't reach. That means being inside a specific workflow (Cursor
lives in the editor), holding integrations into a system of record, or owning
accountability for an outcome. Track 05 reached the same conclusion for
vertical AI (Harvey's moat moved to workflow and integrations).

**Defensibility for a solo product, ranked by how much each protects (I
infer, from the cases above and track 05):**

1. **Integration into a system of record** (ERP, policy admin, Shopify
   orders). Costly to rip out, invisible to a chat UI.
2. **Domain depth encoded as rules and evals.** Primble's "blank over wrong"
   and field rules are things a horizontal model doesn't ship.
3. **Distribution you own** (a marketplace listing with reviews, a client
   base). Plausibly the strongest, but you have none yet.
4. **Workflow lock-in.** Real only once users run daily work through it.
5. **Proprietary data.** Rarely real for a solo product at the start.

### Q3. Finding and validating problems worth paying for

- **Hypothesis-testing beats intuition, with RCT evidence.** Startups trained
  to state falsifiable hypotheses and test them with customers earned more and
  dropped false-positive ideas faster than controls given the same feedback
  training [S19, A]. In 152 NSF I-Corps teams, customer interviews drove
  convergence on an idea; more engagement related to better 18-month results
  [S20, A, observational].
- **Pre-sales, landing-page tests, concierge MVPs:** I found no controlled
  study comparing these specific tactics. Their support is practitioner (C).
  The *principle* they share, getting a costly signal (money, a signed pilot,
  repeated use) before building, is what [S19] tested.
- **The cheapest problem source is the one you already have.** Your three
  production projects (Primble, reconciliation, ECOU) are *validated* pains:
  someone paid Astrea to solve them. I infer that client patterns beat new
  ideation for you, because the validation already happened at someone
  else's expense.
- **The sales refusal collides here.** Both A-grade studies [S19][S20] make
  customer conversation the active ingredient. A no-conversation validation
  path (landing page + ads) exists, but it measures clicks, not willingness
  to pay. It is the weakest signal (I infer).

### Q4. Distribution beats building

| Channel | Fit with "no manual sales" | Evidence |
|---|---|---|
| App marketplace (Shopify, etc.) | **Best fit**: buyers search the store; zero rev-share on first $1M [S6] | Crowded: ~12–18k apps, most developers list one app [S7, C]; most earn <$1k/month [S5, C] |
| SEO / content | Fits, but slow and decaying | AI summaries: 8% vs 15% click rate [S21, A★]; top result CTR −58% with AI Overviews [S22, B★] |
| AI answer engines ("GEO") | Unknown | ~1% of web traffic [S23, B]; too small to plan on |
| Lab-run stores (GPT Store) | Fits, but doesn't pay | Revenue share closed [S18] |
| Communities, partnerships | Partly manual | No usable data found |
| Freelance platforms (for services) | Good fit: inbound, no posting | Track 07: one public review roughly tripled novice earnings |

**AI search changes the economics of SEO-led micro SaaS.** The traffic a
ranking page earns is falling where AI summaries appear [S21][S22], and
AI referrals don't yet replace it [S23]. Chegg is the extreme public case
[S14]. I infer that a new micro SaaS should not count on informational SEO as
its main channel. Integration listings and marketplace search hold up
better, because the buyer is already inside the platform with intent.

### Q5. The internal-tools path

- **Demand signal.** 35% of surveyed Retool users have replaced a SaaS tool
  with a custom build, and 78% expect to build more [S24, C; vendor survey of
  its own users]. Buying from specialised vendors reportedly succeeds ~67% of
  the time vs about a third as often for internal builds [S25, C; contested
  method, S26]. Gartner expects over 40% of agentic projects to be cancelled
  by 2027 on cost and unclear value [S27, B]. **Read together (I infer):**
  companies want custom tools, mostly fail to get value from them alone, and
  will pay someone who can show measured value. That describes your Primble
  record, and it argues for scoping on one measurable workflow, not "an
  agent".
- **How it differs from consulting (track 07).** Consulting sells hours or a
  deliverable. Internal tools sell a *running system*. That means (a) a
  reusable core you keep and license (track 07's pre-existing-code clause),
  so build two is cheaper than build one; (b) recurring maintenance revenue,
  because models, APIs and source documents drift; (c) operational liability
  you must cap in the contract.
- **Pricing shape (I infer; no market data for solo builders found).** Paid
  discovery, then a fixed build fee, then a monthly retainer for monitoring,
  eval re-runs and model/API updates. Enterprise buyers already accept
  maintenance priced as an annual % of the build: SAP charges 22% of licence
  value per year [S28, B]. That is a familiar anchor, not a rate you can
  charge.
- **Code ownership.** Assignment on full payment, in writing; keep your
  pre-existing core and license it (the US/India law and the Common Paper
  template are cited in track 07's Q3). Hosting decides the support load. Prefer client-hosted with a
  retainer, so their outage isn't your 3 a.m. (inference).

### Q6. Personal projects: proof of work vs tutorials with extra steps

Employers trust work traces more than résumés because they are hard to fake,
but only look at what is quick to verify. Sustained history and visible
contributions weigh most [S29, A, qualitative]. **Test (I infer from
[S29]):** a project counts as proof when a stranger can verify, in under
five minutes, a *hard decision* you made and its *consequence*. Examples:
"exactly-once order creation from at-least-once webhooks; here's the test
that replays duplicates" or "judge gate blocked release N; here's the eval
set". It is a tutorial with extra steps when the hard parts are the
framework's and the README lists features, not decisions.

| Project | Proof or tutorial? | What makes it verifiable |
|---|---|---|
| Eudoro | **Proof**, if documented | Idempotency tests, ledger invariants, payout gating, as a written case study + runnable test |
| Onlycouplez | **Proof in parts** (eval gates, injection isolation); the product itself is a liability for B2B (track 08) | Extract the harness; publish eval set, judge–human agreement (track 09 asked for this) |
| Gaza40+ | **Proof** (authz model, RTL) | Needs co-builder consent to publish |

You already have more proof than distribution. **Another personal project is
the wrong next build** (I infer, consistent with profile §2 and track 08).

### Q7. Operations reality from Noida (all needs CA sign-off; see track 07)

- **Collecting product revenue.** Stripe India is invite-only and needs a
  registered business (track 07). A merchant of record (MoR) becomes the legal
  seller and handles global VAT/sales tax. Options: Paddle (5% + 50¢; 10% under
  $10; FX margin) [S31, C], which says Indian sellers need no foreign entity,
  with monthly payouts via bank, PayPal or Payoneer, $100 minimum [S32, B★].
  Dodo Payments, India-founded, quotes 4% + 40¢ [S33, C]. Lemon Squeezy is
  now Stripe-owned [S34, B]. Paddle does not take businesses whose primary
  offering is human services [S37, A★]. **Services can't run through a
  software MoR, so you need two rails: a PA-CB/Wise Business for services
  (track 07) and an MoR for any product.**
- **Tax.** Product income stacks on service income toward the ₹20 lakh GST
  line (~$1,741/month) and the s.58 limits (track 07). One vendor claims an MoR
  breaks the FIRA chain for GST zero-rating [S35, C, competing vendor].
  **Unverified; a CA question.**
- **Support load and maintenance:** I found no credible data for solo
  products. I infer three costs: model/API deprecations force re-evaluation,
  webhooks and integrations break on upstream changes, and every paying user
  adds a support channel. A 12-service architecture like Eudoro's multiplies
  hosting and on-call cost against zero revenue.
- **Category restrictions.** Stripe prohibits adult content including
  AI-generated, and restricts dating [S36, A]. Relevant to Onlycouplez.

### Q8. Kill criteria

Define them before starting. Pair a measurable *state* with a *date or
budget* [S30, B], because judgement in the moment errs toward continuing.
Hypothesis-driven founders in [S19] dropped false positives faster, so the
evidence supports quitting on data, not mood. Proposed criteria (thresholds
are mine; no study sets them):

| Path | Kill if (state) | By (date/budget) |
|---|---|---|
| Any new product | <10 people pay *or* sign a paid pilot | 6 weeks / 60 hours of build |
| Micro SaaS live | <$500 MRR or churn >10%/month | 6 months after launch |
| Eudoro/Onlycouplez hosting | No paying user, no active demo use | Now (freeze to repo + recorded demo) |
| Internal-tools offer | 0 paid discovery calls from 40 proposals/inbound | 8 weeks |
| Retainer client | Maintenance hours >1.5× priced for 2 months | Re-price or exit at next renewal |

## Product verdicts

| Product | Sell? | Pivot into service/tool offer? | Keep as proof? | Evidence |
|---|---|---|---|---|
| **Eudoro** | **No.** Pre-revenue marketplaces aren't listable on Acquire [S9]; no revenue means little sale value [S8] | **Yes, by its parts:** "webhook/payment reliability and reconciliation" for commerce and ERP integrations, alongside the SAP↔Salesforce work (track 05's fallback domain). Not as a marketplace platform: free MIT alternatives [S43] and cheap hosted builders [S42][S44] | **Yes.** Freeze infra, publish a decision-level case study + replay tests | A/B on market; offer fit inferred |
| **Onlycouplez** | **No.** Concentrated category [S41], rising compliance cost [S38][S39][S40], processor risk [S36] | **Yes, by its parts:** a fixed-scope "LLM release gates + prompt-injection review" offer (track 01 suggested packaging eval gates) | **In parts only:** publish the harness and eval method under a neutral name; decide in brainstorm whether the product appears anywhere | B on category; offer fit inferred |

## Where sources disagree

- **Do buyers build or buy?** Retool says custom builds are replacing SaaS
  [S24]. MIT NANDA says buying from vendors succeeds twice as often [S25].
  These aren't opposed: the buyer wants a custom tool and does better when an
  outside specialist builds it. Both are C-grade with incentives (Retool
  sells build tools; NANDA's method is contested [S26]). What settles it:
  your own close rate on "we'll build it for you" vs "here's a product".
- **Are wrappers doomed?** Jasper, Tome and Chegg say horizontal capabilities
  get absorbed [S13][S14][S16]. Cursor says a model-dependent product can win
  big [S17]. The disagreement goes away if you condition on whether the value
  is a capability (absorbed) or a workflow position (kept). That is
  inference, not a tested result.
- **Indie revenue distribution.** IH figures differ between analyses: median
  $169 [S2] vs 51% with no revenue at all [S3]. Different samples and dates.
  All of them sit far below the founder-story picture. What settles it: a
  payment provider publishing a full distribution. None does.
- **NANDA's sample size** is reported inconsistently: 150 interviews in one
  summary, 52 organisations in another [S25][S26]. Treat its numbers as
  directional.

## Myths and hype to ignore

- **"$10k MRR in 30 days" stories.** 6.4% of Stripe-verified solo products
  reach $5k MRR at all [S1]. Stories are the survivors writing.
- **"Ship it and SEO will bring users."** AI summaries cut clicks roughly in
  half [S21][S22].
- **"The GPT Store / agent marketplaces are a new App Store gold rush."**
  The builder payouts never opened beyond a pilot [S18].
- **"95% of AI pilots fail, so AI services are a bad business."** The
  statistic is contested [S26]. The same report says vendor-led projects do
  better [S25].
- **"I can sell my side project on Acquire."** Not as a pre-revenue
  marketplace [S9]. Revenue is what buyers price [S8].
- **"Paired makes $300M/yr"-style directory figures** (seen while researching
  couples apps). They are scraped estimates with no method; excluded.

## What to do

| Practice | How to do it | Cadence | How to measure it | Evidence grade |
|---|---|---|---|---|
| Freeze both products' infrastructure | Shut paid hosting; keep repos, seed data, a 3-min recorded demo, and a one-command local run | Once, this week | Monthly hosting cost → ~₹0 | Inference; kill criteria [S30] |
| Publish Eudoro as a decision-level case study | "Exactly-once orders from webhooks; seller ledger invariants; delivery-gated payouts" with the replay test linked | Once, ≤2 weekends | A stranger verifies one decision in <5 min (ask 2 people) | A [S29] |
| Extract Onlycouplez's eval harness | Neutral-name repo: judge prompts, eval set, judge–human agreement, injection test cases | Once, ≤2 weekends | Repo public; agreement number published | A [S29]; track 09 |
| Sell internal tools, not products, first | One offer from Primble's pattern: discovery → fixed build → monthly retainer; list on a freelance platform (track 07) | Until first paid engagement | Paid discovery calls; first retainer | C [S24][S25]; track 05/07 |
| Price the retainer from day one | Quote maintenance as a monthly line in every proposal, scoped: monitoring, eval re-runs, model/API updates | Every proposal | Retainer attach rate | B anchor [S28]; inference |
| Run one product experiment only after first service revenue | Pick from `idea-scorecard.md` ≥ threshold; test willingness to pay before building | After client #1 | Kill table above | A [S19] |
| Write kill criteria before any build | One line per project in `decisions/`: state + date/budget | At project start | Criteria existed before line 1 of code | B [S30] |
| Set up an MoR only when a product exists | Compare Paddle vs Dodo on the day; ask CA the FIRA question first | Once, later | CA sign-off | C [S31]–[S35] |

## Leading indicators

- **A frontier lab shipping vertical document intake** (insurance or ERP).
  It would move the internal-tools value further toward integration and
  accountability (track 05 flagged the same).
- **Pew/Ahrefs-style CTR updates** [S21][S22]: if AI-summary click loss keeps
  widening, write off SEO for products entirely.
- **AI referral share** [S23] passing a few % of traffic would make
  answer-engine visibility a real channel.
- **Shopify (or similar) app-store economics:** rev-share terms [S6] and
  category saturation [S7] decide whether the one no-sales channel stays
  viable.
- **Companion-chatbot regulation spreading** beyond California/New York [S39]
  and the FTC 6(b) outcome [S38].
- **Your own funnel:** proposals → paid discovery → build → retainer. That
  ratio decides whether internal tools beat a salaried USD role.

## Questions for me

1. Who is Onlycouplez for: couples, singles, or adults seeking intimacy? The
   name echoes an adult brand. Would you show it to an insurance buyer or an
   Islamic-sciences teacher? Your answer decides whether it appears anywhere.
2. Eudoro has twelve microservices and no users. What does it cost you per
   month to keep running, and what would you lose by freezing it today?
3. Which of Eudoro's hard problems (exactly-once webhooks, the ledger, gated
   payouts) have you seen a *paying client* need at Astrea? Name one.
4. Would you accept one 30-minute paid discovery call per prospect as your
   only sales step? Internal tools can't be sold with zero conversations.
5. If a product idea scores well, will you write its kill criteria *before*
   coding, and let a friend hold you to them?
6. Are you hoping a product will spare you from selling? Base rates say a
   product needs distribution work too, often more.
7. Does your Astrea contract let you build a product that overlaps Astrea's
   verticals (insurance docs, ERP integration)? The best ideas below do.
8. Would you rather the first $1,000 come from one client or 50 strangers?
   The answer picks the path.
