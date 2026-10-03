# Personal brand
> As of 2026-10-03 · Status: draft

Verification note: direct page fetches were blocked in this session, so every
claim was checked against search-engine summaries of its source, not the full
text. Re-check the numbers before anything moves into `pages/`. Platform
mechanics are graded C unless the platform published them.

## Bottom line

- **Public work pays through verification and referral, not audience.** When GitHub let existing private work become visible, visible contributors moved to bigger employers more often [S1, B]. Employers trust hard-to-fake traces over résumés [S4, A]. Freelancers still get most work by word of mouth; high earners almost never get it from social media [S7, B, dated]. Referred buyers still check the website and search the name [S8, C]. So the job of public work is to make a referrer's intro land and a stranger's 10-minute check succeed. (confidence: medium-high)
- **The lowest-discomfort system is "publish once, send directly," not "post daily."** Moderately weak ties and dormant ties carry the opportunities [S5, A][S6, A]. Sending a relevant artifact to 5 such people a week uses the work that already exists, needs no audience, and avoids the discomfort of performing to a feed. Public posts are a slow second layer that adds mental availability for the ~95% of buyers who aren't buying yet [S9, B][S23, A]. (confidence: medium. The mechanism is A-grade, but no study tests this exact system.)
- **The fear of posting is a known miscalibration, and the evidence says so directly.** People overestimate how many notice them by about 2× [S19, A], expect harsher judgment than they get [S20, A], and underestimate how much an unexpected message is appreciated [S21, A]. One fear is valid: false modesty backfires. Humblebrags lose to plain statements of results [S22, A]. So the fix is not confidence. It is stating results flatly ("80% less manual entry, here's the mechanism"). (confidence: high on the biases; medium on how far lab results transfer to LinkedIn)
- **In the AI flood, verifiable specifics cut through, and the profile already has them.** About half of new web articles are AI-written [S13, B]. Google ranks on first-hand experience [S15, A], and 86% of top-ranking pages are still human-written [S13, B]. Generic posts are now free to make, so they carry no signal. A post about the 1,135-field form and the "blank beats wrong" rule cannot be produced by someone who didn't build it. I infer this from [S4][S13][S15][S18]. No study measures "specificity → inbound" for engineers. (confidence: medium)
- **Track one number: qualified conversations per month** (a person in the target market starts or accepts a talk about paid work or a role). Everything else is a diagnostic. Own the address book (domain plus email list), because platforms reprice reach without notice [S26, B][S28, B]. (confidence: high on ownership; the metric choice is my inference)

## What the evidence says

### Q1. Does public work lead to jobs, clients or customers for engineers?

**Yes, as a signal of existing ability. Not as a substitute for it.**

| Finding | Source | Grade |
|---|---|---|
| After GitHub's 19 May 2016 change let users show private contributions, +1 SD visible contributions → **5.7% more moves to large firms**, mostly out of small firms | [S1] quasi-experiment, working paper | B |
| Developers raise OSS activity **~16%** while job-hunting, toward visible, market-valued work, so they act as if visibility pays | [S2] ~22,900 developers | B |
| Apache: contribution volume **did not** raise wages; earned merit rank did, **13–27%** | [S3] four-year panel | A (old) |
| Hiring managers read GitHub traces as more reliable than résumés because they are hard to fake; sustained history and high-status projects signal most | [S4] interviews | A (qualitative, 2013) |
| Moderately weak LinkedIn ties produce the most job moves; weak ties matter more in digital industries | [S5] randomized, 20M+ users | A |
| Reconnected dormant ties gave more valuable help than current ties | [S6] field study | A |

Three mechanisms follow, and they matter for design:

1. **What paid was making existing work visible, not making new work.** [S1] is
   the closest natural experiment to this profile: the work existed, and only
   its visibility changed. That is the profile's situation exactly.
2. **Volume alone doesn't pay. Credible, third-party-legible signals do** [S3].
   "Posted 200 times" is volume. "Shipped a system that cut manual entry 80%,
   here is how" is a merit signal.
3. **Opportunities travel through ties, not followers** [S5][S6]. A brand that
   makes it easy for an acquaintance to forward you does more than one that
   gathers likes.

**Freelance and services specifically.** Independents get most assignments by
word of mouth. Social media is a top-3 source for 18%, and for those earning
over $100k it is 1% [S7, B; the survey year is unconfirmed, c. mid-2010s].
Buyers of professional services check providers in about 3 ways: 81% visit the
website, 63% search them online, 62% ask colleagues [S8, C]. B2B buyers spend
~17% of buying time with suppliers and most of the rest researching on their
own [S11, B]. Decision-makers say substantive expert content is a more
trustworthy basis for judging capability than marketing material (73%) [S10, C;
the sponsors sell this]. *I infer* a two-step funnel: **referral or direct
contact creates the conversation, and public proof closes the credibility
gap.** Posting alone rarely creates the conversation, but its absence can kill
one.

**Demand context (will age):** AI-related work on Upwork passed $300M gross
volume in Q1 2026, up 40% y/y, and "AI integration and automation" grew 50%
[S12, B]. That is the category Primble, ECOU and the reconciliation work sit in.
Rates and channels belong to tracks 01 and 07.

### Q2. Channels compared

Grades here are for the claim in each cell. Time and payoff are my estimates
(inference) unless cited.

| Channel | Good for | Time cost | Payoff horizon | Evidence |
|---|---|---|---|---|
| **Personal site** (kaleemahmed.in) | The verification step: where referred buyers land [S8]; the canonical home of case studies; owned | Low once built; ~1 h per case study refresh | Doesn't generate traffic: 96.55% of pages get no Google traffic [S17, B], and AI Overviews cut clicks from 15% to 8% [S16, A]. Pays at the verification moment | B–A |
| **Direct sends** (email/DM an artifact to a specific person) | Activating weak and dormant ties [S5][S6]; zero audience needed | ~10 min per send | Weeks | A (mechanism) |
| **LinkedIn** | Buyers, hiring managers and ex-colleagues are already there; out-of-network posts are retrieved by topic match [S25, A], so a narrow topic finds a narrow audience without followers | 30–60 min per post | Months; compounding via repeated exposure [S23] | A for the mechanism; any "hack" is C |
| **GitHub** | Proof for technical evaluators [S4]; a README that explains a design decision | Low if repos exist | Passive; pays when someone checks | A–B |
| **Niche communities** (HN, r/LocalLLaMA-style subs, framework Discords) | Spikes of qualified technical readers; HN #1 ≈ 31.8k pageviews in one anecdote [S30, C] | 1–2 h per submission plus replying | One day of spike; long tail via links | C |
| **X** | AI-engineering discourse; link posts are throttled by the owner's own admission [S26, B] | High (cadence-driven) | Slow; volatile | B–C |
| **Newsletter** | Owned list; converts readers into reachable people | 2–4 h per issue | 6–12+ months (inference) | C |
| **YouTube** | Highest trust per viewer (inference) | Highest: script, record, edit | Longest | C |
| **Conference talks** | Credibility, room full of weak ties | Very high per talk; travel | Event-gated | No primary evidence found; gap |

For this profile, cost per opportunity points to **site + direct sends +
LinkedIn**, with GitHub as passive proof and one niche-community submission a
month. YouTube and X cost the most and fit the "avoids sharing" constraint
worst. *Inference; no comparative study across channels exists.*

### Q3. The AI flood: what still cuts through?

- **Scale of the flood.** AI-written share of new web articles passed ~50% in
  November 2024 and has plateaued (51.7% in May 2025) [S13, B; detector-based].
  A vendor flagged 54% of long LinkedIn posts as likely AI by October 2024, and
  those posts got 45% less engagement [S14, C; vendor sells the detector].
- **What the platforms say they reward.** Google: original, people-first content
  showing experience, expertise, authority and trust. AI use is neither
  penalised nor favoured, but mass-produced pages that add no value are spam
  [S15, A]. The results match: 86% of top-ranking pages are human-written
  [S13, B]. LinkedIn's published feed system matches posts to members by
  semantic topic embeddings and long interaction histories [S25, A]. *I infer*
  that a consistent, specific topic is how the system finds the right readers.
  LinkedIn publishes nothing about "authenticity scores".
- **Why specifics work (mechanism, partly by analogy).** Truthful accounts carry
  more checkable details than fabricated ones [S18, A, deception research].
  Readers can't reliably spot AI prose (track 06), so they fall back on
  whether a claim could be checked and whether only the author could have
  written it. A real artifact (a diagram of the rules-first pipeline, an eval
  gate's pass rates, a reconciliation bug that idempotency prevented) works as
  a costly signal: cheap for the builder to produce, impossible for a
  non-builder to fake. *Inference, consistent with [S3][S4].*
- **Strong opinions backed by work.** No study isolates this. Plain statements
  of results beat disguised ones [S22, A]. The profile's design rules ("blank
  over wrong", "LLM only for the gaps", "documents as a security boundary")
  are opinions with a production system behind them, which is the
  defensible kind.

### Q4. Positioning: how narrow?

No rigorous study gives an optimal niche width for engineers. Specialist-premium
claims online are mostly C (vendors and coaches). What the evidence does
support:

- Buyers enter the market on their own schedule [S9, B]. Being remembered for
  one problem when the need appears is the goal, and repeated exposure to one
  consistent theme builds liking [S23, A].
- Topic-matched retrieval on LinkedIn [S25, A] rewards a consistent topic over
  a varied feed (inference).

**Rule I propose (inference): narrow by problem and stakes, not by stack.**
"Node/Python AI engineer" is a commodity. "LLM pipelines for messy business
documents where a wrong field costs more than a blank one" is a problem with a
measured result attached (Primble: 80%+). Candidate "known-fors" from
`profile.md`, to be tested against track 05's demand data rather than chosen
on taste:

| Candidate | Proof already shipped | Risk |
|---|---|---|
| Reliable LLM document automation (forms, extraction, human gates) | Primble, ECOU | Crowded label; the "blank over wrong" rule is the differentiator |
| Making AI features safe to ship (eval gates, injection isolation) | Onlycouplez, Gaza40+ authz | Onlycouplez's category may hurt B2B credibility. Check before using it (see Questions) |
| Idempotent integrations and reconciliation (SAP/Salesforce/ecommerce) | Astrea reconciliation, Eudoro ledger | Less "AI" by label, but enterprise-budgeted |
| Arabic/RTL-first AI products for MENA | Gaza40+ | Unverified demand. Track 05 decides |

Test it, don't brainstorm it: 3–4 posts per candidate over 8 weeks, then compare
qualified conversations, not likes.

### Q5. Which metrics matter?

- **Vanity:** followers, impressions, likes. They don't map to outcomes.
  Opportunities come through specific ties [S5][S6] and verification [S8].
  Impression counts also move with platform changes you don't control
  [S26][S28].
- **Signal, in order of value:** (1) qualified conversations started, inbound or
  replies to direct sends; (2) conversion of those to paid work, an interview or
  a referral; (3) replies and DMs from people in the target market; (4) email
  subscribers (owned reach).
- **The one metric: qualified conversations per month.** It counts both
  channels (direct and public) and works in a spreadsheet. It also can't be
  gamed by posting more, because only a target-market person counts.

### Q6. Risks and owning the audience

- **Platform dependence is real and documented.** Facebook brand-page organic
  reach fell from ~16% to ~6% (2% for large pages) in two years [S28, B]. X's
  owner said link posts get less reach [S26, B]. LinkedIn's feed was rebuilt
  on new retrieval and ranking models [S25, A]. Any of these can reprice reach
  overnight. **Own:** the domain, the canonical copy of every piece (site
  first, platform second), and an email list.
- **Time sink and burnout.** 52–62% of full-time creators report burnout
  [S29, C, vendor surveys of professional creators]. The real risk for this
  profile is different: swapping 20 h/week of consumption for 20 h/week of
  feed-watching. Fix it with a hard 3–4 h weekly budget and batched posting.
  Don't check analytics daily.
- **Reputational blowups.** The likeliest source is **confidentiality**:
  Primble, ECOU and the reconciliation work are Astrea client projects.
  Writing about mechanisms and anonymised outcomes is normal practice. Naming
  clients, sharing code or posting numbers without approval could cost the job
  that funds the runway. *No source; this is a practical constraint.* Get
  written OK from Astrea on what can be said.
- **AI-assisted writing.** Track 06 found that perceived AI use costs social
  credit. Use AI to edit; the claims, numbers and opinions must be yours.

## Where sources disagree

- **Does GitHub matter?** [S1][S4] say visible work is read as a credible
  signal. [S3] says raw activity didn't pay, only earned rank did. Hiring-
  platform blogs argue GitHub is overread and most real work is private (C, not
  cited as evidence). *Reconciliation:* GitHub pays when it shows judgment
  (design decisions, READMEs, eval harnesses) and doesn't when it shows commit
  counts. A study of AI-era recruiter behaviour would settle it. The one found
  (Oliveira & Figueiredo 2024, 15 recruiters) [S31, B] surfaced no usable findings in
  summaries.
- **Weak ties vs strong ties.** Weak ties win in digital industries, strong ties
  in less digital ones [S5]. Dormant strong ties beat both for advice [S6].
  Not a contradiction: different tie types do different jobs. Ex-colleagues
  and batchmates are the dormant-tie pool.
- **Social media as a client source.** The MBO data says it is near-useless for
  high earners [S7]. Edelman/LinkedIn says thought leadership drives B2B buying
  [S10]. Both have problems: MBO is old and self-reported, and
  Edelman/LinkedIn are paid to find the effect. *Reconciliation (inference):*
  content helps the verification and memory steps, while the conversation
  still starts through people. An attribution test settles it for you: ask
  every new lead "how did you find me?" and log the answer.
- **How bad is the flood?** Graphite says AI writing passed 50% of new
  articles [S13], yet the same analysis says it hasn't taken over search
  rankings, and Axios headlined it "hasn't overwhelmed the web yet". Both are
  true: volume is AI, visibility is still mostly human. Detector error rates
  are unpublished, so treat the exact percentage as soft.

## Myths and hype to ignore

- **"Post daily or the algorithm forgets you."** No platform-published source
  supports a cadence rule. LinkedIn's published system matches on topic and
  interaction history [S25]. Consistency of topic plausibly matters more than
  frequency (inference).
- **"Links kill reach on LinkedIn by 60%."** Widely repeated, sourced to
  third-party tests only (C). Not verified. X's link throttling is
  owner-confirmed [S26]. LinkedIn's is not. Putting the link in the first
  comment costs nothing, so do it, but don't build strategy on it.
- **"73% of hiring managers value portfolios over résumés (Stack Overflow
  2024)."** Circulates widely; I could not trace it to the Stack Overflow survey,
  which surveys developers, not hiring managers. Cut.
- **"Build an audience first, monetise later."** Built for creators selling
  attention. Here the asset is work quality and the buyer is a few hundred
  people. Followers are the wrong unit [S5][S7].
- **"Go viral."** One HN #1 brought ~31.8k pageviews in a day [S30, C].
  Spikes are real but short, and they rarely contain your buyer. A viral post
  in the wrong niche can also mis-brand you.
- **"You need to be an extrovert to build a brand."** The channels that fit
  the evidence (case studies, a site, direct one-to-one sends, written posts)
  are asynchronous and text-first. Live networking is not required.
- **Personal-branding course sellers.** Their own audience is the proof they
  sell, which is survivorship bias by construction. None are cited here.

## What to do

**Minimum viable brand system: 3–4 hours/week, built entirely from existing
work.** Funded by moving 4 of the ~20 YouTube/Instagram hours (profile §7).

| Practice | How to do it | Cadence | How to measure | Evidence |
|---|---|---|---|---|
| **0. One-time setup (≈6 h, week 1)** | Get written OK from Astrea on what is publicly sayable. Rewrite kaleemahmed.in's top: one-line known-for, three case studies with numbers, a contact line. Add an email signup (Buttondown/Substack/ConvertKit, any one). Make the LinkedIn headline and Featured section match the site | Once | Site passes the 10-minute check: can a stranger state what you do and your best result? Ask 2 people | [S8] C, [S4] A |
| **1. Mine, don't create** | List 20–30 "atoms" from existing case studies, ebooks and blogs: one mechanism + one number + one decision each (e.g. "rules first, LLM for the gaps: why the 1,135-field form needed blank-over-wrong") | Once, ~2 h; refill quarterly | Backlog ≥ 8 weeks deep | Inference |
| **2. Direct sends (the core habit)** | Send 5 people one relevant artifact with a ≤60-word note: what it is, why you thought of them, no ask. Targets: dormant ties (ex-batchmates, ex-colleagues), people in the candidate niche, people who wrote something you learned from | Weekly, ~60 min | Replies; conversations started | [S5][S6][S21] A, [S24] B |
| **3. One proof post** | One atom → LinkedIn native text, 150–250 words, plain claim + number + mechanism + one diagram or screenshot; link in the comment, canonical copy on the site | Weekly, ~45 min, batched 4 at a time | Comments/DMs from target-market people (not likes) | [S25] A, [S22] A, [S13][S15] |
| **4. Substantive comments** | 3–5 comments that add a specific fact or experience on posts by people in the target niche | Weekly, ~30 min | Profile visits from target-market people; replies | [S5] A (weak-tie formation), inference |
| **5. One long-form piece** | Turn an ebook chapter or case study into a site article plus email to the list; submit the best one per quarter to one niche community (HN/Reddit) | Monthly, ~2 h | Subscribers added; inbound mentioning the piece | [S16][S17] (don't expect search traffic), [S30] C |
| **6. Attribution log** | Spreadsheet: date, person, source (direct/LinkedIn/site/referral/community), qualified? outcome | Every new conversation, 2 min | **The one metric: qualified conversations/month** | Inference |
| **7. 8-week niche test** | Rotate 2 known-for candidates through the weekly post; compare the metric per candidate | Weeks 1–8, then commit | Which candidate produced more qualified conversations | [S9][S23] |

Weekly total: sends 60 + post 45 + comments 30 + long-form ~30 (amortised) +
log ~10 ≈ **3 h**, plus slack to 4 h.

**Graded exposure for the reluctance (inference built on [S19]–[S21]).** Run
the steps in order of discomfort, and don't skip ahead: (1) publish on your own
site, where nobody is watching; (2) send to one person who will be glad to get
it [S21]; (3) post on LinkedIn; (4) comment on strangers' posts. After each
step, write down what you predicted would happen and what did. The biases
predict the gap will favour you [S19][S20]. Your own log is the evidence that
counts.

**Writing rule that answers "I don't want to brag":** state results flatly and
attribute them to the mechanism, not to yourself. "Rules first, LLM for the
gaps: manual entry fell 80%+." No humility framing, no complaint framing
[S22].

## Leading indicators

- **Qualified conversations/month after 8 weeks.** Zero after ~40 direct sends
  and 8 posts means the known-for or the proof is wrong, not the cadence.
  Revisit positioning before adding hours.
- **Attribution mix.** If almost all conversations come from direct sends and
  none from posts, cut posting to every two weeks and double the sends (and the
  reverse).
- **LinkedIn publishing a ranking change** (engineering blog) [S25]: re-check
  whether topic matching still drives out-of-network reach.
- **Search and AI answer engines.** If AI Overviews or chat answers start
  citing personal case-study pages as sources (they currently send ~1% clicks
  [S16]), the site becomes a discovery channel and long-form gets more weight.
- **AI-written share of feeds** [S13][S14]: if it climbs further, specificity
  and artifacts become worth more. If platforms start labelling AI content,
  the human-written gap becomes explicit.
- **Astrea's response** to the confidentiality ask. A "no" removes the
  strongest proof (Primble) and pushes the own projects (Eudoro, Gaza40+) to
  the front.

## Questions for me

1. What exactly will Astrea let you say publicly about Primble, ECOU and the
   reconciliation work: client names, numbers, architecture? Who do you ask, and
   by when?
2. Name 30 dormant or weak ties (batchmates, ex-interns, Gaza40+ co-builders,
   people from CodeVita or other communities). Which 5 get the first sends this
   week?
3. Of the four known-for candidates, which one would you be glad to be
   introduced as in three years, given the goal of senior AI or product engineer?
4. Is Onlycouplez something you'd show a B2B client or an Islamic-sciences
   peer? If not, which of its parts (eval gates, injection isolation) can stand
   alone as proof without the product?
5. Who is the buyer: a foreign founder, an agency's CTO, a Gulf enterprise, or a
   hiring manager? The answer changes whether LinkedIn or direct sends to agencies
   get the hours.
6. What is the actual fear: being judged by colleagues, being judged by
   strangers, or looking like you're job-hunting while at Astrea? Each has a
   different fix.
7. Which 4 hours of the 20 YouTube/Instagram hours move to this, on which days?
   Can you remove the apps from your phone during those blocks?
8. Does your existing site have a contact path and an email signup today? If a
   stranger landed there tomorrow, what would they do next?
9. Will you commit to the attribution log for 8 weeks before judging whether
   "this works"?
