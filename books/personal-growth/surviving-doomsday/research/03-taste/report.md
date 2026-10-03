# Taste
> As of 2026-10-03 · Status: draft

Verification caveat: direct page fetches were blocked in this session, so
claims were checked through search results that surface each primary source.
Where an exact figure came only from a secondary summary, the text says so.
Re-fetch the A-grade sources before anything here reaches `pages/`.

## Bottom line

- **Taste is not mystical. It is calibrated quality discrimination plus the will to act on it.** You can observe it: fewer special cases, smaller API surfaces, earlier cuts, and predictions about "this will hurt later" that come true. (confidence: medium)
- **The discrimination half is trainable.** Perceptual-learning research shows that many contrasted examples, interleaved and with feedback, build expert-like pattern recognition, and that explicit cues speed it up [S1][S5][S6]. No study trains "software taste" directly; the transfer to code is my inference. (confidence: medium)
- **Taste is only as good as its feedback loop.** Where outcomes never come back, experts agree with themselves poorly, as wine judges do [S11], and confidence says nothing about accuracy [S4]. Code and product give partial feedback (defects, change cost, metrics), so taste there can be checked. Treat taste you can't check as opinion. (confidence: high)
- **"Generation is cheap, so curation is the bottleneck" is half-true.** AI lifts the bottom of the skill distribution toward "good enough" and barely moves the top [S18][S19][S20]. That shrinks the premium on taste for routine work. Filtering does decide who wins among heavy AI users [S17], and quality matters most where errors are costly and hard to see [S13][S21]. Taste pays in those niches, not everywhere. (confidence: medium)
- **Taste is invisible until it is written down.** Employers predict performance best from structured interviews and work samples [S28]. So taste becomes visible through artifacts that show rejected alternatives and correct predictions, not through claims to have it. (confidence: medium; the hiring link is inference)

## What the evidence says

### 1. What taste is, operationally

No study defines "engineering taste", so this is a working definition built
from expertise research. Four components, each observable:

| Component | What it is | Observable sign |
|---|---|---|
| Discrimination | Seeing quality differences others miss | Can say *why* version B beats A, fast |
| Reference set | A stored library of good and bad examples | Names precedents; "this is the X problem again" |
| Calibration | Judgements that predict outcomes | Their "this will hurt" calls come true more often than chance |
| Action | Cutting, simplifying, saying no | Deletes code, drops features, ships smaller |

Kahneman and Klein supply the calibration test. Intuitive judgement is skilled
only in environments with valid cues and a chance to learn them. Felt
confidence is not evidence [S4] (A). Taste, then, is intuition that has passed
that test.

**By domain:**

- **Code.** Torvalds' concrete example of "good taste" is rewriting linked-list
  removal so the head stops being a special case [S29] (B). The general move is
  to reframe the problem until the edge case becomes the normal case. Local
  readability is not purely subjective: a model on simple features predicted
  120 annotators' readability judgements, and those scores correlated with
  change and defect measures [S12] (A). In review, most comments are about this
  layer (readability, consistency, dead code) [S14] (A).
- **APIs.** Bloch's maxims are the observable form: easy to use, hard to
  misuse; when in doubt, leave it out [S30] (B). Someone with API taste
  removes surface area.
- **Architecture.** Ousterhout's "red flags" make it observable: shallow
  modules, pass-through methods, information leakage [S31] (B). Code-health
  evidence says this pays: low-health code had 15x more defects and 124%
  longer development time across 39 codebases [S13] (B; authors are from the
  vendor whose metric is used).
- **Product.** Outstanding designers frame the problem actively and scope it
  well instead of analysing it exhaustively [S16] (A). Product taste shows up
  as choosing the problem, not polishing the answer.
- **Writing.** Franklin's Spectator exercise treats prose taste as finding
  where your version is worse than a model text [S33] (C). In practice, taste
  in writing means cuts.

### 2. Is taste trainable?

**Findings (A-grade):**

- **Interleaved contrast beats blocked study.** Learners shown paintings by
  several artists mixed together learned each style better than those shown one
  artist at a time. They still *rated* blocking as more effective [S1]. The
  feeling of fluency misleads.
- **Perceptual learning scales into professions.** Adaptive modules with many
  classified examples train dermatology, pathology and echocardiography pattern
  recognition faster than standard teaching [S5].
- **Tacit skill can be made explicit.** Expert chick sexers could not say how
  they judged. Once researchers isolated the key shape cue and taught it
  directly, novices improved sharply [S6]. The exact accuracy figures are not
  verified here. The lesson for taste: "I just know" is often an unextracted
  rule.
- **Exposure amplifies real differences and also creates bias.** Repeated
  exposure raised liking for Millais and lowered it for Kinkade [S2]. Yet in
  Cutting's study, exposure alone shifted preference among comparable
  paintings [S3]. Exposure helps when quality truly differs. When it doesn't,
  exposure manufactures preference.
- **Critique works only if it is aimed at the task.** Feedback helps on average
  (d = .41), but more than a third of interventions *lowered* performance,
  mostly when feedback pulled attention to the self [S8]. Peer critique tracks
  expert grading well with tight rubrics. Revising the rubric cut median error
  from 12.4% to 9.9% [S9].
- **Breadth before critique.** Novices who made several designs in parallel
  before getting feedback beat those who iterated one at a time, by
  click-through and by expert rating [S10].
- **Practice hours alone explain little in professions** (<1% of variance,
  versus 26% in games) [S7]. Part of this is because professional practice is
  hard to measure. Either way, hours of exposure are not a reliable proxy for
  taste.

**Lore (B/C), graded:**

| Practice | Who describes it | Grade | Backed by research? |
|---|---|---|---|
| Implement → review → revise against named principles | Ousterhout CS190 [S31] | B | Yes: matches feedback + explicit-cue findings [S6][S8] |
| Reconstruct a model text, then diff against it | Franklin [S33] | C | Partly: comparison with a known standard is the perceptual-learning mechanism [S5] |
| Make a lot, on a deadline | Ira Glass [S34]; ceramics parable [S35] | C | Partly: parallel prototyping [S10]. The ceramics story is a retold classroom gambit, not data [S35] |
| Study great work across fields | Paul Graham [S32] | C | Partly: exposure helps only when quality differs [S2][S3] |
| Kill your own work | widespread | C | No direct study found |

### 3. "When generation is cheap, curation and taste become the bottleneck"

**For:**
- Among 50k+ artists, AI adoption raised output 25% and favourites-per-view
  50%. Average novelty fell. The artists who explored ideas and *filtered*
  outputs gained most [S17] (A; observational).
- Volume floods force gatekeeping. Amazon capped KDP at three new titles per
  day after a wave of suspected AI books (Sept 2023) [S27] (B).
- AI raises individual creativity but makes outputs more alike [S18] (A).
  If outputs converge, distinctiveness becomes scarce.
- In code, duplicated blocks rose about 8x in 2024 and moved/refactored code
  fell from about 25% to under 10% of changed lines [S26] (C, vendor; dated
  2025). If that is accurate, the editing layer is weakening just as
  generation speeds up.
- Organisations: DORA 2025 finds AI amplifies whatever system it lands in
  [S24] (B). Adoption was 90% while 30% trust AI output little or not at all
  [S25] (B; 2025 figures).

**Against:**
- AI compresses skill gaps. Writing time fell 40% and quality rose 18%, with
  the biggest gains for weaker writers [S19] (A). Support agents gained 34%
  (novices) versus almost nothing for top performers [S20] (A). The least
  creative writers reached par with the most creative [S18] (A). For many
  tasks, "good enough" is becoming free. That shrinks the visible gap taste
  used to create.
- Adoption often rewards the worse design that ships first ("worse is better")
  [S36] (C).
- The scarce asset may be distribution, not taste [S39] (C).

**Synthesis (I infer):** Taste becomes *more* valuable where three conditions
hold: (a) errors are costly and hard to spot, as on tasks outside AI's
frontier, where AI users were 19 points less likely to be correct [S21];
(b) output is abundant and needs selection [S17]; (c) distinctiveness is what
gets paid for [S18]. Where none hold (internal CRUD, boilerplate, routine
copy), taste is a luxury. The engineer's job is to work where the conditions
hold.

### 4. Showing taste to people who can't see it

Structured interviews (~.42) and work samples (~.33) are among the best
predictors of job performance [S28] (A; figures via secondary summaries).
Hiring writers report probing for taste with open-ended take-homes and by
asking for cases where "the AI was wrong and you noticed" [S40] (C). I infer
that taste becomes visible through artifacts that show the *decision*, not
just the output:

- design docs listing rejected alternatives and why
- before/after refactors with the measured effect
- review comments that later proved right (a public prediction record)
- writing that explains a trade-off well enough for someone else to apply it

### 5. Failure modes

- **Taste as gatekeeping.** Bourdieu's data tie "good taste" to social position
  and status-marking [S37] (B). In code review at Google, pushback varied by
  author demographics, costing an estimated 1,000+ engineer-hours a day [S15]
  (A). Peer graders favoured their own country by 3.6% [S9] (A). Taste claims
  with no stated criteria are where bias hides.
- **Taste without shipping.** Glass's "gap" says beginners' taste outruns
  their output [S34] (C). Serial perfection loses to parallel exploration
  [S10] (A), and "worse" shipped designs often win adoption [S36] (C).
- **Familiarity mistaken for quality.** Exposure alone shifts preference [S3].
  Fluency feels like learning when it isn't [S1]. Expert panels can be
  inconsistent without feedback [S11]. Developers forecast a 24% AI speedup
  and measured a 19% slowdown [S22] (A, early 2025). A follow-up was declared
  unreliable because developers refused to work without AI [S23] (B, 2026).
  Your sense of what's good, including about your own tools, needs outside
  checks.

## Where sources disagree

- **Does AI raise or lower the value of quality judgement?** Skill-compression
  studies [S18][S19][S20] say it lowers the premium for routine work.
  Filtering and frontier studies [S17][S21] say it raises the premium for
  selection and error-spotting. Both can hold; they measure different tasks.
  *Settle with:* field data on wage or promotion premiums for review- and
  design-heavy roles versus implementation roles, 2024→2027.
- **Is AI degrading code quality?** GitClear [S26] (vendor) says yes, from
  churn and duplication. DORA [S24] says the effect depends on the
  organisation. METR's 2025 slowdown [S22] versus its unreliable 2026 speedup
  [S23] shows measurement is unsettled. *Settle with:* defect and change-cost
  data from independent, longitudinal codebase studies.
- **Is exposure training or bias?** Meskin [S2] says exposure reveals quality.
  Cutting [S3] says it creates preference. *Settle with:* exposure studies in
  code, such as blind pairwise ratings before and after reading high- and
  low-quality codebases.
- **Is taste a moat?** VC essays say yes [S38]. Critics say it is cloned
  instantly and distribution wins [S39]. Both sides are C-grade; neither has
  data.

## Myths and hype to ignore

- **"Taste is the new moat."** It rests on C-grade VC essays [S38] that
  themselves have an incentive (fund thesis). The A-grade evidence points to a
  narrower claim: filtering and error-spotting pay in specific conditions
  [S17][S21].
- **"Taste can't be taught; you have it or you don't."** Perceptual-learning
  and explicit-cue studies contradict it [S1][S5][S6].
- **"Just consume great work."** Exposure without contrast and feedback can
  build preference for whatever is familiar [S3].
- **"Quantity beats quality" as a proven result.** The ceramics story is an
  adapted classroom anecdote [S35]. The real evidence is narrower: parallel
  variants before critique [S10].
- **"Experts know quality when they see it."** Not without feedback [S4][S11].

## What to do

### Standing practices

| Practice | How to do it | Cadence | How to measure it | Evidence grade |
|---|---|---|---|---|
| Prediction log | Before a PR merges, a design ships, or an AI patch lands, write a one-line prediction (e.g. "this module will need rework within 3 months"). Score it later. | Every non-trivial decision | Hit rate / Brier score over 50+ predictions | A (mechanism [S4]); log design is mine |
| Contrast sets | Collect pairs of the same problem solved well and badly (from code review, OSS, your old code). Study them interleaved, not by topic. | 3×/week, 20 min | Blind pairwise picks agree with a reviewer you trust | A [S1][S5] |
| Extract the rule | When you "just know" something is wrong, write the cue down as a named red flag. | Whenever it happens | Size and reuse of your red-flag list | A [S6]; B [S31] |
| Parallel variants | For any design, API or prompt, make 3 rough versions before asking for critique. | Per design task | Chosen variant beats your first instinct how often | A [S10] |
| Rubric critique | Get critique against written criteria, aimed at the work, not you. Give it the same way. | Weekly | Agreement between your rating and reviewers' | A [S8][S9] |
| AI-output audit | Review AI-generated diffs as if from a junior: duplication, special cases, leakage. | Daily | Defects or reverts traced to merged AI code | B/C [S24][S26] |

### 12-week taste curriculum

Each block takes 3 weeks: study (contrast), make (parallel), critique (rubric),
then check (calibration). About 4–5 hours a week.

| Weeks | Study | Make | Critique | Working if… |
|---|---|---|---|---|
| 1–3 **Code** | 30 before/after pairs from merged refactors in a codebase you respect; Torvalds-style special-case removals [S29]; read Ousterhout red flags [S31] | Rewrite 3 functions from your own code in 3 ways each; one must delete a special case | Post one rewrite per week for review by a stronger engineer, using a 4-point rubric (special cases, naming, depth, duplication) | Your blind ranking of 20 new pairs matches the reviewer on ≥75% (week 1 baseline vs week 3) |
| 4–6 **APIs & architecture** | Bloch maxims [S30]; compare 2 libraries solving one problem (e.g. two HTTP clients); read their issue trackers for misuse reports | Design one small API 3 ways in parallel [S10]; write a 1-page design doc with rejected options | Peer review with a rubric: misuse-resistance, surface area, information hiding | Predictions about which design produces fewer misuse questions or bugs; start the prediction log here |
| 7–9 **Product & AI output** | 10 product teardowns: what each cut, not just what it added [S16]; review 50 AI-generated diffs and classify their failure types | Ship 3 tiny tools to real users, each with one deliberately cut feature | User behaviour as critique: what was used, what was asked for | You predicted the most-used feature before release on at least 2 of 3 |
| 10–12 **Writing & signalling** | Franklin exercise on 3 strong engineering essays [S33] | Publish 2 decision write-ups (design doc with alternatives, or a refactor with measured effect) | Ask 2 readers to apply your trade-off to their own case | Someone applies it; prediction log has 30+ scored entries above chance |

**Exit test (week 12):** rerun the week-1 blind pairwise test on fresh
material. Compare your prediction-log Brier score in weeks 4–6 to weeks 10–12.
No improvement on either means the curriculum didn't work. Change the
feedback source, not the effort.

## Leading indicators

- Wage or role-mix data showing a premium for review, design or "AI output
  owner" roles over implementation roles. That would strengthen the curation
  thesis.
- Independent (non-vendor) codebase studies of defect and change cost in
  AI-heavy repos. These would settle [S26] versus [S24].
- METR's redesigned productivity study [S23]. A clear speedup with stable
  quality would weaken "taste as quality guardian".
- Models that reliably critique architecture and product choices, not just
  code style. That would move taste's value further up the stack, toward
  problem choice.
- Platforms adding more volume caps or provenance filters like KDP's [S27].
  That would confirm the curation squeeze in more markets.

## Questions for me

1. Which of the three conditions (costly errors, abundant output,
   distinctiveness pays) does my current work actually meet, and what share of
   my week sits outside all three?
2. Where do I get real outcome feedback on my judgement today, and where am I
   flying on confidence?
3. Name three things I "just know" are bad in code or AI output. Can I state
   the cue for each?
4. Whose taste do I trust enough to calibrate against, and do they review my
   work today?
5. Do I default to serial polishing or parallel variants? What did that cost
   on my last project?
6. If an employer asked for evidence of my taste tomorrow, which artifact would
   I show, and does it record a rejected alternative?
7. Where might my "taste" be status-marking: preferences I enforce in review
   without stated criteria?
8. Am I willing to keep a public prediction log, given that it will show when
   I'm wrong?

## Pending profile

`profile.md` does not exist yet. Once it does, tailor:

- **Curriculum domains:** swap the week 1–9 study sets for my actual stack and
  products (e.g. RAG pipelines, agent tooling, the languages I ship in).
- **Critique source:** name the specific reviewers, communities or clients
  available to me.
- **Time budget:** rescale the 4–5 hours a week to my real availability.
- **Signalling artifacts:** pick the ones that match my target (employer,
  clients, or my own products, per tracks 07, 08, 11).
- **Question 1:** answer it against my real role and the client mix in the
  profile.
