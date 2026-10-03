# Judgement
> As of 2026-10-03 · Status: draft

Numbers marked ★ in `sources.md` were checked against abstracts and publisher
pages only; full-text checks are pending (see the note at the top of
`sources.md`).

## Bottom line

- **Judgement can be trained, but only through scored predictions, not through
  experience alone.** A one-hour debiasing module improved forecast accuracy
  6–11% over four years [S8], and single training sessions cut bias for at least
  two months [S17][S18]. Meanwhile developers stayed overconfident in their
  estimates despite repeated, timely feedback [S14]. (confidence: high)
- **Trust your gut only where reality grades you fast.** Intuition is valid in
  predictable environments with fast, clear feedback [S1][S2]. Debugging, test
  outcomes, and small estimates qualify. Architecture, hiring, and product bets
  don't, so they need explicit base rates and written reasoning. (confidence:
  high for the principle; medium for my mapping onto software work)
- **AI output degrades judgement in a specific, measurable way: it inflates
  confidence more than it inflates quality.** Participants with an AI assistant
  wrote less secure code and believed it was more secure [S27]. Developers who
  were 19% slower believed they were faster [S32]. (confidence: medium; small
  samples, and the security counter-evidence is real [S28][S29])
- **Training and instructions don't reliably fix automation bias, but
  accountability for the verification process does** [S23][S24]. The habit has
  to be structural: a written check you must sign off, not a resolve to "be
  careful". (confidence: medium)
- **For juniors, how you use AI decides whether you learn.** Delegating code
  generation cut mastery sharply. Using AI to ask conceptual questions largely
  didn't [S34][S35]. The compressed path to senior judgement is scored reps on
  other people's decisions, such as expert-comparison scenarios [S20],
  postmortems [S21], and code review [S22]. (confidence: medium)

## What the evidence says

### Q1. What judgement is, and decision quality vs outcome

- **Working definition (I infer, from S1, S4, S7):** judgement is the ability to
  make choices under uncertainty whose *expected* value is high. It shows up
  as calibrated probabilities (your 70% claims come true about 70% of the
  time), good discrimination between cases, and choosing the right tool for
  the situation (intuition vs analysis). That definition is trainable because
  each part can be scored.
- **Quality ≠ outcome.** People rate an identical decision as better reasoned,
  and its maker as more competent, when the outcome was good [S4, A]. A 2025
  pre-registered replication reproduced the effect [S5, A]. Consequence:
  learning from outcomes alone teaches luck as if it were skill. Judging a
  decision needs a record of what was known and believed *before* the outcome.
- **Intuition vs analysis.** Kahneman and Klein, coming from opposing schools
  (heuristics-and-biases vs naturalistic decision making), agreed that
  intuition is skilled when two conditions hold. The environment must be
  regular enough to predict, and the person must have had adequate chances to
  learn its regularities through practice and feedback [S1, A]. Hogarth calls
  these "kind" learning environments (fast, clear feedback). "Wicked" ones have
  missing, slow, or biased feedback [S2, B]. Outside kind environments,
  confident intuition is not evidence of skill [S1].

### Q2. Where software work gives valid feedback

The mapping below is **my inference** from the S1/S2 criteria. No study grades
software tasks this way.

| Work | Feedback speed and clarity | Can intuition be trusted? |
|---|---|---|
| Debugging, test failures, type errors | seconds–minutes, unambiguous | Yes, after reps |
| Code review of small diffs | hours–days; bugs that escape are often never traced back | Partly |
| Task estimates (hours–days) | days, clear, but people don't score themselves | Could be; usually isn't [S12][S13][S14] |
| Incident response | minutes, clear, but rare | Only with deliberate rehearsal [S20][S21] |
| Architecture, tech choice, data model | months–years, confounded by team and market | No; use base rates and written reasoning |
| Product bets, hiring | slow, noisy, survivorship-filtered | No |

Two findings sharpen this:

- Feedback alone did not fix it even in the "kind" case. Developers who got
  repeated, timely accuracy feedback on their own estimates mostly stayed
  overconfident [S14, A, small n]. In a related study, 30-minute lessons-learned
  sessions did not improve estimate accuracy [S14]. **I infer:** feedback has
  to be *scored and compared against a stated prediction*, not just
  experienced or discussed.
- Across 18 projects, developers' "90% confident" effort intervals held the
  actual effort only 64% of the time [S13, A] ★.
- Professions are the domain where deliberate practice explains the least
  variance in performance: under 1%, vs 26% in games [S3, A] ★. This fits S1.
  Practice only pays where the environment returns a clear signal per rep.

### Q3. What forecasting research shows improves calibration

- **The baseline is poor.** In Tetlock's 20-year study, expert long-range
  political forecasts were only slightly better than chance and worse than
  simple statistical models. Eclectic, self-correcting "foxes" beat
  single-theory "hedgehogs" [S6, A book / B summary].
- **Three interventions worked in the IARPA tournament:** probability training,
  teaming, and tracking. Each improved both calibration and resolution [S7, A].
  Training taught reference classes, bias correction, and averaging multiple
  estimates [S7].
- **Training effect size:** under one hour of training ("CHAMPS KNOW") improved
  Brier scores 6–11% over control across four years. Cognitive ability and
  practice contributed independently [S8, A].
- **Skill is real, not luck.** Top forecasters did not regress to the mean over
  two years [S9, A]. The authors attribute it to ability, task-specific skill,
  motivation, and an enriched team environment [S9].
- **What transfers to engineering (I infer):** (1) state estimates as
  probabilities or 80% intervals, not points; (2) start from the outside view,
  meaning the actual record of similar past work, before adjusting for
  specifics [S10][S11]; (3) average your estimate with a colleague's or a
  second method's; (4) keep score with the Brier score (mean squared error of
  probability forecasts; lower is better) and interval hit rates.

### Q4. Tools, graded

| Tool | What the evidence actually shows | Grade |
|---|---|---|
| Probability training and keeping score | 6–11% Brier improvement, durable over years [S7][S8] | **A** |
| Game-style debiasing with feedback | Medium–large bias reduction, persisting ≥2 months; transfers to an unannounced field case (~⅓ less confirmation bias) [S17][S18] | **A** |
| Reference-class (outside-view) forecasting | Strong theory [S10]; field support mostly from large infrastructure projects [S11]; no software RCT found | **B** |
| Premortem ("it failed; why?") | One conference study: largest drop in overconfidence vs critique or pros/cons [S16]. Origin study [S15] is about outcome certainty, not a premortem test | **B** (thin) |
| Expert-comparison scenario training (ShadowBox) | +28% match to expert rankings after 3h; 26% better root-cause identification [S20]; evaluations run by the method's developers | **B** |
| Decision review checklists | 12-question checklist [S19]; McKinsey data linking bias-reducing process to up to 7pp higher returns is correlational | **B** |
| Blameless postmortems | Well-specified practice [S21]; no controlled evidence of judgement gains found | **B** practice / **C** effect |
| Code review | Main real outputs are knowledge transfer and understanding, more than defect-finding [S22] | **A** (for what it does) |
| Decision journals | **No empirical study found.** Recommended by practitioners; the mechanism (freezing pre-outcome reasoning against outcome bias [S4] and hindsight) is sound. Rests on C sources plus inference | **C** |
| Written design reviews / ADRs | No controlled evidence found; inferred to work via the same mechanism as journals plus review | **C** |
| Red-teaming | No direct study found in this pass. The closest evidence is teaming and averaging [S7] | **C** (not searched to depth) |
| Lessons-learned sessions without scored predictions | Did not improve estimates [S14] | **A** (negative) |

### Q5. Judging AI output: automation bias

- **The mechanism is general and old.** With imperfect aids, people make
  *omission* errors (missing what the aid didn't flag) and *commission* errors
  (following the aid against other valid evidence). This happens to experts
  and novices, and training or instructions alone don't prevent it [S23, A]
  [S25, A].
- **What helps:** being accountable for *how* you used the aid, not just the
  result. Participants who felt that accountability verified more and made
  fewer automation errors [S24, A].
- **AI code security.** With an AI assistant, participants wrote significantly
  less secure code *and* were more likely to rate it secure. Those who trusted
  the AI less and actively reworked prompts did better [S27, A, N=47].
  Copilot completions in high-risk CWE scenarios were frequently vulnerable
  [S26, A]. The counter-evidence is in the next section.
- **Confidence miscalibration.** Developers predicted a 24% speedup from AI and
  were 19% slower, yet still believed afterward that AI had helped [S32, A,
  n=16, early-2025 tools]. METR's late-2025 follow-up showed speedups but
  called its own data unreliable because of selection effects [S33, B]. Across
  319 knowledge workers, higher confidence in GenAI predicted less critical
  thinking [S30, B self-report].
- **The jagged frontier.** On a task just outside the model's capability,
  consultants with GPT-4 were 19pp less likely to be correct than those
  without [S31, A]. The danger isn't that AI is weak. It's that its failures
  look like its successes.
- **Verification habits the evidence supports (I infer the specific forms):**
  (a) write the acceptance check *before* reading the output, which is
  accountability for the process [S24]; (b) treat AI output as a draft from an
  unknown-quality source and require the same evidence as a human PR [S22][S27];
  (c) record your confidence that the output is right, then score it, to fix
  the confidence gap [S27][S32]; (d) know the frontier for each task type by
  keeping a log of where the model was wrong [S31].

### Q6. How seniors build judgement, and compressing it for juniors

- Code review mainly transfers knowledge and builds understanding [S22, A]. It
  is a judgement-building channel more than a defect filter.
- Postmortems turn rare, high-signal failures into shared reps. Blamelessness
  exists so contributing causes surface at all [S21].
- **The AI squeeze on reps is measurable.** Juniors learning a new library with
  AI scored 50% vs 67% on a follow-up quiz, with the biggest gap in debugging.
  Those who used AI for conceptual questions kept their mastery (≥65%); those
  delegating generation fell below 40% [S34, A; vendor-run, n=52]. In a field
  experiment, unrestricted AI raised practice scores but cut later unassisted
  exam scores 17%; a guardrailed tutor largely removed the harm [S35, A].
- **Compressing the path (I infer from S1, S8, S20):** manufacture "kind"
  feedback for wicked decisions. Have juniors commit to a prediction *before*
  seeing the expert answer. Examples: predict a postmortem's root cause before
  reading it, rank options on a past design doc before reading what was chosen
  and how it aged, and estimate before seeing the actual. This is the ShadowBox
  structure applied to engineering artifacts [S20].

## Where sources disagree

1. **Does AI-assisted code have more security bugs?** Yes: Perry et al. found
   less secure code with AI [S27], and Pearce et al. found frequent
   vulnerabilities [S26]. Barely or no: Sandoval et al. found at most 10% more
   critical bugs in a C task [S28], and Asare et al. found Copilot reproduced
   human-introduced vulnerabilities only ~33% of the time and called it "not as
   bad as humans" [S29]. These measure different things: user studies vs
   completion audits, different languages, and old models (Codex-era). **What
   would settle it:** a current-model user study with production-like tasks.
   The *overconfidence* finding [S27] is the more decision-relevant part, and
   nothing here contradicts it.
2. **Does AI make experienced developers faster?** Slower in early 2025 [S32].
   The late-2025 follow-up leaned faster but was self-declared unreliable
   [S33]. Settle with: field data on cycle time and defect escape for the same
   team, before and after. Self-reports won't settle it, because S32 shows
   self-reports are biased.
3. **Can bias be trained away?** Automation-bias research says training and
   instructions alone don't prevent it [S23]. The debiasing literature shows
   durable gains from one session [S17][S18], and forecasting shows lasting
   gains [S8]. **I infer the reconciliation:** generic "be aware" training fails,
   while training with personal feedback on scored judgements works [S17
   reports games > videos].
4. **Does practice build expertise?** Practice explains under 1% of variance in
   professions [S3], but forecasting practice measurably helps [S8]. **I
   infer:** both hold. Practice pays only when each rep is scored. Most
   professional "practice" isn't.

## Myths and hype to ignore

- **"Experienced engineers have good instincts."** Only for tasks with fast,
  clear feedback [S1]. Years of architecture decisions without scored outcomes
  can build confidence without accuracy [S1][S14].
- **"Experts are no better than a dart-throwing chimp."** This oversimplifies
  Tetlock. Average experts were slightly better than chance on long-range
  questions, foxes did better, and trained forecasters did much better
  [S6][S7][S9].
- **"Premortems are proven to prevent project failure."** The evidence is one
  study showing reduced overconfidence in a hypothetical plan [S16]. That is
  useful, but it's about confidence, not outcomes.
- **"Decision journals are evidence-based."** No controlled study found. The
  mechanism is sound [S4], but the claim of proof isn't.
- **"Just review AI output carefully."** Instructions don't prevent automation
  bias [S23]. Structure does: a pre-committed check and accountability for the
  process [S24].
- **"AI makes you X% more productive."** Self-reports of AI speedup are the
  least trustworthy number in this field [S32][S33].

## What to do

Personal adaptations below are general for a software/AI engineer. See
"Pending profile".

| Practice | How to do it | Cadence | How to measure | Evidence |
|---|---|---|---|---|
| **Prediction ledger** | Log 5–10 binary predictions per week about your own work, each with a probability (50–99%). Examples: "PR merges without rework", "migration finishes by Friday", "this AI-generated fix passes CI first time", "the model's answer to X is correct". Resolve each one later. | Weekly | Brier score per month, and a calibration table (do your 70%s happen ~70%?) | A [S7][S8] |
| **80% interval estimates** | For every task over ~2h, write a low–high range you're 80% sure of, starting from your logged actuals on similar past tasks (outside view). | Per task | Hit rate; target 75–85%. Below that, widen ranges | A [S13][S14], B [S11] |
| **Pre-committed AI check** | Before prompting, write 1–3 lines saying what "correct" means (test, invariant, security property). Before accepting, record your confidence that the output is right. | Every non-trivial AI output | % of accepted outputs later found wrong; confidence vs actual | A [S24][S27] |
| **AI frontier log** | When AI output is wrong, log the task type and failure mode in one line. | Ongoing; review monthly | Count by task type; shows where to verify hardest | A [S31] (inferred use) |
| **Decision record** | For any decision whose results arrive slowly (architecture, tool choice, scope), write a half-page: options, chosen option, why, the key assumption, a probability it works, and what would show it failed. Do a 10-minute premortem first. | Per decision | Revisit at 3 and 6 months; rate the decision's quality *before* rereading the outcome | C (journal) + B (premortem) [S4][S16] |
| **Shadow-review** | Pick a past postmortem, design doc, or senior's PR review. Write your diagnosis or ranking first, then compare with what happened or what the expert said. | Weekly | % agreement with expert or outcome; trend over months | B [S20] |
| **Second estimate** | For big bets, get one independent estimate (a colleague, or a different method) *before* sharing yours, and average them. | Per big decision | Compare error of the average vs your solo estimate over time | A [S7] |

### Weekly judgement practice (≤ 2 hours)

| Block | Minutes | What |
|---|---|---|
| Resolve | 20 | Resolve last week's due predictions and interval estimates. Update the ledger. |
| Predict | 20 | Write 5–10 new predictions with probabilities. At least 2 must be about AI output correctness. |
| Shadow-review | 40 | One case: commit a written answer, then compare it with the expert or the outcome. Score agreement 0–2. |
| Decision review | 25 | Revisit one decision record that's due. Rate the decision quality 1–5 *before* reading the outcome notes, then read them. |
| Frontier log | 10 | Skim the week's AI misses and add one verification rule if a pattern appears. |
| **Total** | **115** | |

### Scoring improvement over six months

Track these monthly in one sheet. Month 1 is the baseline.

1. **Brier score**, rolling 50 predictions. Improving means trending down. Don't
   chase a target number: the score depends on question difficulty, so compare
   yourself only to yourself on similar question types. Note that
   predictions about your own work are partly self-fulfilling, so keep some
   that you can't influence, such as AI correctness and other teams' launches.
2. **Calibration gap:** for each confidence bucket (60/70/80/90%), the absolute
   difference between stated and actual frequency. Target ≤10pp in every bucket
   with ≥10 predictions.
3. **80%-interval hit rate.** The literature baseline is far below nominal
   [S13]. Moving toward 75–85% is the win.
4. **AI acceptance error rate:** of AI outputs you accepted, the % later found
   wrong. Also track the gap between your stated confidence and your actual
   accuracy.
5. **Shadow-review agreement**, as a trend.

**Caveat:** about 25 weeks × 7 predictions ≈ 175 resolved predictions in six
months. That's enough to see a calibration trend, but too few for fine-grained
Brier comparisons (I infer from sample size; no source sets a threshold). Treat
months 1–2 as baseline, not progress.

## Leading indicators

- New user studies of AI-assisted coding security with current models. These
  would revise or confirm S27 vs S28/S29.
- METR or similar publishing a design that solves the selection problem [S33].
  This could reverse the "AI inflates confidence more than speed" bullet.
- Any controlled study of decision journals, ADRs, or premortems with outcome
  measures. This would move those tools from C/B up or down.
- Replications of S34 (skill formation) at larger n or with experienced
  developers.
- Your own data: if your calibration stalls after month 3, the practice design
  is wrong, not just slow.

## Questions for me

1. Which of my recent decisions do I *believe* were good, and can I name the
   evidence apart from how they turned out? [S4]
2. Where in my week do I get feedback within an hour, and where does it take
   months? Am I trusting my gut in the second category?
3. When I last accepted AI-written code, what exactly did I check, and would I
   have caught a subtle security bug? [S27]
4. Which task types do I already know the model gets wrong? If I can't list
   three, I don't know my frontier [S31].
5. Am I on track to log 175 predictions in six months, or will this die in
   week 3? What's the smallest version I'll actually keep?
6. Who is my "expert panel" for shadow-review: which seniors' reviews,
   postmortems, or design docs can I get access to?
7. If I mentor or work with juniors: do they use AI to generate code or to ask
   questions? [S34]
8. Which decision am I facing in the next month that deserves a written record
   and a premortem?

## Pending profile

`profile.md` doesn't exist yet. Once it does, tailor:

- The prediction ledger's question types to my actual role (IC vs lead vs
  freelancer/client work) and stack.
- Shadow-review sources: what postmortems, design docs, or open-source review
  threads I can actually access.
- The AI frontier log: the specific tools and models I use daily.
- The weekly time budget, if my real availability is below 2 hours.
- Questions 6–7, depending on whether I mentor juniors or work alone.
