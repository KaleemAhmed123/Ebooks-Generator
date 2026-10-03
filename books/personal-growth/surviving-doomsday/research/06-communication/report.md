# Communication
> As of 2026-10-03 · Status: draft

Verification note: direct page fetches were blocked in the research session, so
claims were checked against search-engine summaries of each source, not full
texts. Numbers flagged ⚠ come from secondary summaries of the primary work.
Re-check them against the papers before promoting anything to `pages/`.

## Bottom line

- **Write for a reader who will stop early.** Put the decision or ask in the first lines and cut words. The best field evidence: a 49-word email beat a 127-word one, 4.8% to 2.7%, while most people predicted the opposite [S10]. Doctrine from the Army, Amazon and Google says the same [S2][S8][S1]. (confidence: high)
- **Visible AI use costs you social credit, and the costs are not symmetric.** People rate AI users as lazier and less competent [S15], trust those who disclose AI use less [S16], and see heavy-AI managers as insincere in relational messages [S19]. But AI help on *informational* writing helps outcomes [S23] and is penalised less when the task suits AI [S15]. (confidence: high on the penalty; medium on where the line sits)
- **Readers can't detect AI prose, so "sounding human" is the wrong target.** They judge from flawed surface cues [S17][S21]. What survives is substance a model couldn't have supplied: specific trade-offs, your own data, a position you will defend. I infer this; the evidence shows only that substance-free polish is penalised once it is spotted [S13]. (confidence: medium)
- **In speaking and persuading, calibration beats confidence.** An exposed overconfident claim costs more credibility than a hedged one [S27]. Asking for advice on hard problems raises perceived competence [S30]. Power posing does nothing measurable [S28]. (confidence: high)
- **Negotiate with an anchor you can justify, not an extreme one.** First offers anchor outcomes (r ≈ 0.5 in simulations) [S32][S33], and precise numbers anchor harder [S34]. Extreme offers cause walk-aways [S35], and the push to "always ask" has limits [S37][S38]. (confidence: medium; mostly lab evidence)

## What the evidence says

### Q1. Which engineering writing carries weight, and what does good look like?

No study ranks document types by career impact; this part rests on what
respected orgs say about their own practice (A for the orgs' own docs, B for
practitioner synthesis). Three patterns repeat.

**Design docs and RFCs are where decisions get made, so they carry the weight.**
Google design docs exist to catch design issues while change is cheap, build
consensus, spread senior engineers' knowledge, and form organisational memory.
They are also "a summary artifact in the technical portfolio" of the author
[S1, B]. Oxide makes it explicit: writing things down forces rigorous
formulation, and RFDs cover hardware, APIs, process and even interviewing [S4, A].
Larson's staff-engineer model builds strategy bottom-up from design docs
(roughly five docs synthesise into a strategy) [S6, B]. Orosz documents RFC
processes across many tech companies, including Uber as it grew past 2,000
engineers [S5, B]. *I infer* that design docs carry most career weight. They are
the only artifact that is both the decision and the evidence of who made it.

**What "good" means, according to the orgs that do it most:**

| Org | Defining practice | Why it works (stated mechanism) |
|---|---|---|
| Google [S1, B] | Context and scope, goals **and non-goals**, design, **alternatives considered**; emphasis on trade-offs | Non-goals bound the scope; alternatives prove a decision was made, not defaulted to |
| Amazon [S2, A] | Six-page narrative, no slides; read silently at the start of the meeting; rewritten, peer-edited, rested, re-edited, often over a week | Narrative forces the logic to connect; silent reading means everyone has actually read it |
| Google SRE [S3, A] | Postmortem triggers defined *before* incidents; blameless (assume good intent, judge with the information available) | Blame makes people hide issues; pre-set triggers stop arguments about whether to write one |
| GitLab [S7, A/B] | Handbook-first: changes are proposed as edits to the written source of truth, not via slides or chat | Async across time zones; the decision and the record are the same artifact |

**The counter-example that proves the stakes.** The Columbia board found the
critical caveat, foam far larger than anything ever tested, buried at the bottom
of a bulleted slide hierarchy. It called "the endemic use of PowerPoint briefing
slides instead of technical papers" a problematic communication method at NASA
[S12, A]. Bullets hide the relationships between claims. Prose exposes them.

Status updates and proposals: I found no primary org guidance with evidence
behind it that wasn't already covered by the BLUF findings under Q2. Gap noted.

### Q2. Explaining trade-offs to non-technical decision makers

- **BLUF is official doctrine.** U.S. Army writing must put the main point first
  and use active voice, because "the greatest weakness in ineffective writing"
  is failing to transmit a focused message quickly [S8, A]. Minto's Pyramid
  Principle gives the same answer-first structure. Its SCQA opening runs
  situation → complication → question → answer [S9, B].
- **Is there evidence, not just doctrine?** Partly. Rogers and Lasky-Fink's
  field experiments show shorter, more direct messages get more action. In the
  ~7,000-recipient school-board test, the short version nearly doubled responses
  (4.8% vs 2.7%) ⚠ [S10, B]. Their conclusion is "busy readers" economics:
  readers decide within seconds whether to keep going. Eyetracking shows the same
  behaviour on screens. People read the first lines, then scan down the left
  edge [S11, B]. I found **no controlled trial of BLUF or pyramid structure
  itself**. The support is indirect: readers stop early, so whatever comes first
  is what gets read.
- **How execs actually read:** no rigorous study of executives specifically
  was found. Amazon's silent-reading meeting [S2] is a structural fix: it
  guarantees the reader reads. Vendor claims about exec read-through rates
  exist but are C-grade and are omitted.
- **Trade-off framing that holds up:** state the decision needed, then the
  options with what each costs, then your recommendation. Google's "alternatives
  considered" section [S1] and Columbia's buried caveat [S12] show why: a
  decision maker can only weigh a risk they can see.

### Q3. The AI-era signal: perception of AI-written text

| Finding | Source | Grade |
|---|---|---|
| People rate AI-using workers as lazier, less competent, less diligent; this affects hiring evaluations. The penalty vanishes when the task obviously suits AI, and is smaller from raters who use AI themselves | [S15] 4 preregistered expts, n=4,439 | A |
| Disclosing AI use lowers trust vs saying nothing; being exposed by someone else is worse | [S16] 13 expts, >3,000 | A |
| Actual AI smart-replies made chats faster, warmer, more cooperative; being *suspected* of AI use made people judged more negatively | [S18] 2 RCTs | A |
| Heavy-AI supervisor emails are seen as professional but sincere by only 40–52% of readers, vs 83% for low-AI. The hit lands on relational messages (praise, motivation), not informational ones ⚠ | [S19] n≈1,100 | A |
| 40% of U.S. workers got "workslop" (polished, substance-free AI output) in the last month; ~half then rated the sender less capable and reliable; 42% less trustworthy ⚠ | [S13] n=1,150 survey | B |
| People cannot detect AI self-descriptions; they rely on cues (first person, contractions, family talk) that AI can fake | [S17] 6 expts, n=4,600 | A |
| Non-experts rate AI poems *above* famous human poems and identify them below chance (46.6%) | [S21] | A |
| AI help makes individual stories better (mostly for weaker writers) but makes stories more alike | [S20] | A |
| ≥13.5% of 2024 PubMed abstracts show LLM processing; tell-tale words: "delves", "showcasing", "underscores" | [S22] | A |
| AI writing help on résumés raised hires 8% and wages 10%; employers weren't less satisfied | [S23] ~480k jobseekers | A |
| Essay writers using an LLM had the weakest neural engagement, felt least ownership, and could barely quote their own essay | [S24] n=54 preprint; critiqued [S25] | B |

**What this means (inference, labelled):**
1. The penalty attaches to *perceived* AI use and to *empty* output, not to AI
   per se [S13][S15][S18]. Clean, informational writing that AI helped make
   reads as better writing [S23].
2. Detection is unreliable, so readers fall back on whether the text contains
   something only you could know. "Sounds human" can be faked [S17]; "contains
   a judgement with your name on it" cannot. This is my inference from
   [S17] + [S20]; no study tests it directly.
3. Homogenisation [S20][S22] means generic AI phrasing becomes a recognisable
   house style. Distinctiveness comes from content, not from avoiding a word
   list.
4. Relational messages (thanks, feedback, apologies) are where the sincerity
   penalty is largest [S19]. Write those yourself.
5. Writing is part of thinking. If AI drafts your design doc, you may not own the
   reasoning in the review meeting [S24, B; weak evidence, plausible mechanism].

### Q4. Spoken communication: meetings, demos, interviews

- **Calibration over confidence.** Listeners track whether your confidence
  matches your accuracy. When a confident source is caught in an error, it loses
  more credibility than a hedged one [S27, A]. In a design review, say "I'm sure
  about X, unsure about Y" and be right about which is which.
- **Ask for input on hard problems.** Seeking advice raises perceived competence
  when the problem is hard and you ask the person directly [S30, A].
- **Pushback carries a cost; plan for it.** Managers rate "challenging voice"
  (proposing to change how things are done) lower than "supportive voice" and
  endorse its ideas less. The effect runs through perceived threat and loyalty
  [S31, A]. *I infer*: frame a challenge as protecting a shared goal, and put it
  in writing before the meeting so it reads as analysis rather than attack.
- **Technical interviews measure stress as well as skill.** Being watched at a
  whiteboard more than halved performance in an RCT (n=48 students) [S26, A].
  Structured interviews are the best single predictor of job performance [S29,
  A], which means interviewers score against a rubric. *I infer*: narrating the
  approach, stating assumptions, and naming trade-offs hits rubric items, and
  rehearsing *while observed* attacks the stress effect directly.
- **Image management that doesn't work:** power posing shows no hormonal or
  behavioural effects in replication; the original lead author disowned it
  [S28, A].
- **Meetings:** Amazon's silent-read start is the only meeting practice here with
  a clear mechanism and an org that runs it at scale [S2, A]. **Demos:** no
  credible research found; gap.

### Q5. Persuasion and negotiation (salary, scope, stakeholders)

- **Anchors work.** Whoever makes the first offer tends to get a better deal
  [S32, A]. A meta-analysis puts the anchor-to-outcome correlation at about 0.50,
  and about 0.37 for experienced negotiators [S33, A]. Precise numbers
  ("$187,500") anchor harder than round ones, because the asker seems informed
  [S34, A].
- **Extreme anchors backfire.** They offend, and low-power counterparts walk
  away [S35, A]. In a salary negotiation, *you* are often the lower-power side,
  but the employer may also walk if the anchor reads as unserious.
- **Defending against an anchor:** the first-mover advantage disappeared when
  the receiver focused on the other side's alternatives, their reservation
  price, or their own target [S32, A]. Write your target and walk-away down
  before the call.
- **Asking pays, on average, for those who choose to ask.** Employees who
  negotiated reported higher salaries (correlational) ⚠ [S36, A]. But
  evaluators penalised women more than men for asking [S37, A]. Pushing people
  to negotiate more did not help. People already ask when it pays [S38, A].
- **Scope negotiation with stakeholders** is the same mechanics as Q4's
  "challenging voice" [S31]: lead with the shared goal, present the options in
  writing [S1], recommend one.

### Q6. International audiences / non-native English

`profile.md` doesn't exist yet, so this covers both directions.
- Google's global-audience rules: short unambiguous sentences, active voice, no
  idioms, humour, culture-specific references or phrasal verbs [S39, A].
- An accent *may* lower perceived truthfulness: found in the original study,
  not replicated once, replicated later [S40, A]. Treat it as real but small
  and fragile. Writing removes it entirely, which favours async written
  channels.
- AI detectors flagged 61.3% of non-native TOEFL essays as AI-written [S41, A].
  A non-native writer with simple, plain phrasing is *more* likely to be
  wrongly suspected of AI use, and suspicion alone carries a penalty [S18].
  *I infer*: concrete specifics (numbers, names of systems, your own
  measurements) protect better than stylistic changes.

## Where sources disagree

1. **Does AI-assisted writing help or hurt you?** Hurts: [S15][S16][S19] and
   workslop [S13]. Helps: [S23] (hires and wages up), [S18] (better chats when
   unsuspected), [S20] (better individual stories). *Settling it*: the studies
   differ on whether the reader knows AI was used, and on whether the message is
   informational or relational. A study that crosses disclosure × message type ×
   substance would settle it. Current best reading: the polish helps, the
   perception of AI hurts, and empty output hurts most.
2. **Disclose or not?** [S16] says disclosure lowers trust, but exposure by
   others lowers it more. There's no clean dominant strategy. Norms are moving:
   the penalty shrinks among raters who use AI themselves [S15]. *Settling it*:
   replications in 2026–27 as AI use becomes normal.
3. **How big is "workslop"?** [S13] is a self-report survey co-run by BetterUp,
   which sells coaching services, and critics question its method [S14, C].
   The direction matches A-grade lab work [S15]. The size (40%, $186 per month)
   is shaky.
4. **Cognitive debt.** [S24] is a small preprint; [S25] documents reporting
   inconsistencies. The writing-is-thinking claim is widely believed by
   practitioners [S4][S2] but weakly tested.
5. **Accent credibility** [S40]: original, failed replication, successful
   replication. Unresolved; plausibly context-dependent.
6. **Should you always negotiate?** Correlational data says askers earn more
   [S36]; experimental data says people already self-select well and backlash
   is real for some groups [S37][S38].

## Myths and hype to ignore

- **"Power posing before a talk boosts performance."** Failed replication;
  originator disowned it [S28].
- **"AI detectors (or your gut) can tell AI text."** Humans are at chance or
  worse [S17][S21]; detectors misfire on non-native writers [S41].
- **"Avoid the word list ('delve', 'showcase') and you're safe."** The word
  spikes are real [S22], but readers' heuristics are flawed and fakeable [S17].
  What gets punished is emptiness once it is noticed [S13]. Dropping words is
  cosmetic.
- **"Longer, warmer emails get more replies."** The field test went the other
  way, against most people's predictions [S10].
- **"BLUF/pyramid is scientifically proven."** It is doctrine plus indirect
  evidence about busy readers [S8][S9][S10][S11]. Use it, but don't cite it as
  proven.
- **"Slides are fine for technical risk decisions."** Columbia [S12]; Amazon
  runs decisions on narratives instead of slides [S2].
- **"Always anchor as high as possible."** Extreme anchors cause impasses [S35].
- **"Everyone should always negotiate / lean in."** [S38], [S37].

## What to do

| Practice | How to do it | Cadence | How to measure it | Evidence grade |
|---|---|---|---|---|
| **Weekly one-page decision doc** | Pick one real decision from the week (a library choice, a schema change, a scope cut). Write a one-pager with the checklist below. Write it yourself; use AI afterwards only to critique it ("find the weakest assumption", "what alternative is missing") | 1 per week | Count docs shipped; track how many led to a decision without a follow-up meeting | B (org practice [S1][S2][S4]) |
| **Amazon-style rest and re-edit** | Draft → rest ≥1 day → cut 30% → send to one peer with a specific question → revise | Every doc that matters | Word count before vs after; whether the reviewer's first question is about substance rather than clarity | A for the practice existing [S2]; effect untested |
| **Feedback loop** | Ask one reader to write a one-sentence summary of your doc *before* talking to you. Compare it to your intended bottom line | Weekly | Match rate between their summary and your BLUF (target: 8 of 10) | Inference from [S10][S11] |
| **BLUF every message** | First line = ask or decision + deadline. Then context. Under ~100 words for asks | Every message | Reply rate and time-to-reply on asks (log 20, compare to baseline) | A/B [S8][S10] |
| **Write the relational ones by hand** | Thanks, feedback, apologies, congratulations: no AI drafting | Always | — | A [S19] |
| **AI for polish, you for substance** | Use AI to fix errors and readability on informational docs, after the reasoning is yours | Always | Can you defend every sentence in a review without notes? | A [S23][S15]; B [S24] |
| **Calibrated claims** | Mark each claim in reviews as confident or uncertain; keep a log of which were right | Each design review | Calibration: % of "confident" claims later proven right | A [S27] |
| **Rehearse under observation** | Mock interviews or practice demos with someone watching, thinking aloud | 2× per week in interview season | Problems solved under observation vs solo | A [S26] |
| **Negotiation prep sheet** | Before any salary or scope talk, write down: target, walk-away, their likely alternatives, a precise justified anchor with its rationale | Every negotiation | Outcome vs written target | A [S32][S33][S34][S35] |
| **Challenge in writing, framed by the shared goal** | Push back with a short doc: goal we share → risk → options → recommendation | When pushing back | Whether the proposal is adopted; whether the relationship holds | A [S31] + inference |
| **Global-English pass** | Remove idioms and phrasal verbs, split long sentences, add concrete numbers | Docs for international or cross-team readers | Questions asked about meaning rather than substance | A [S39] |

### One-page design doc checklist

Built from [S1][S2][S3][S12]; each line maps to a failure it prevents.

1. **Line 1: the decision you need, from whom, by when.** (BLUF [S8])
2. **Context in ≤3 sentences**: what exists, what changed. (SCQA [S9], scope [S1])
3. **Goals and explicit non-goals.** Non-goals stop scope creep in review. [S1]
4. **The proposal**, in prose, with one diagram if more than three parts move.
   No nested bullets for causal reasoning. [S12]
5. **Alternatives considered (≥2, including "do nothing")** and why each lost.
   [S1]
6. **Trade-offs and risks, ranked, worst first.** Never bury the biggest risk
   last. [S12]
7. **What you're unsure about.** Calibrated, so reviewers aim at it. [S27]
8. **Cost to reverse.** Say how hard it is to undo. (Inference: reviewers
   calibrate scrutiny to reversibility.)
9. **Ownership line**: one number, measurement or constraint that only you
   could have supplied. This is the anti-workslop test (inference from
   [S13][S17]).
10. **Rest-and-cut pass done**: re-read after a day, cut a third. [S2]

## Leading indicators

- Replications of the AI-use penalty [S15][S16] in populations where AI use is
  near-universal. If the penalty disappears, drop the "write relational
  messages by hand" emphasis.
- Disclosure norms: org policies, or legal requirements, mandating AI
  disclosure in work writing. That would flip the disclosure trade-off [S16].
- Peer-reviewed follow-ups to [S24] on writing and comprehension or ownership.
- Whether orgs that ran written cultures (Amazon, GitLab, Oxide) change their
  review practice in response to AI drafting. Watch their public handbooks
  [S2][S4][S7].
- Interview formats shifting to take-home or async (prompted by [S26]-style
  findings or by AI cheating). That changes which spoken skills matter.
- Watermarking or provenance tooling becoming standard. That would make
  "suspected AI" decidable, which changes [S18]'s dynamics.

## Questions for me

1. Which document did you write in the last 6 months that changed a decision?
   If none, what stopped you: no forum for docs, or no docs?
2. How much of your current writing is AI-drafted versus AI-edited? Could you
   defend every line of your last design doc in a live review?
3. Is English your first language? Do you sell or work across cultures?
   (Decides how far to push Q6.)
4. Where do you lose most: written proposals, live meetings, interviews, or
   negotiations? Name a specific recent loss.
5. When you push back on a stakeholder, do you do it live or in writing first?
   What happened the last time?
6. What's your current salary or rate, your walk-away, and do you know the
   other side's alternatives? (Feeds the negotiation prep sheet.)
7. Would you commit to one public or team-visible one-pager per week for
   8 weeks? Who is your one feedback reader?
8. Do you disclose AI use in your work writing today? Was that a deliberate
   choice or a default?

## Pending profile

`profile.md` doesn't exist yet. This report is written for a generic
software/AI engineer. Once the profile exists, tailor:

- **Q6 depth**: native vs non-native English; selling to international clients
  or not (decides whether [S39][S40][S41] become core or stay a footnote).
- **Employment mode**: employee (salary, internal docs, promotion) vs
  freelance/consulting (rates, proposals, client trust). This changes which
  rows of "What to do" lead.
- **Seniority**: below staff, the weekly doc practice matters most; at staff
  and above, strategy synthesis [S6] and pushback [S31] matter more.
- **Org writing culture**: doc-heavy (Amazon/Google-style) vs chat/meeting
  culture. Decides whether to adapt to the culture or seed it.
- **Interview plans**: actively interviewing or not (decides whether the
  observed-rehearsal row is in or out).
