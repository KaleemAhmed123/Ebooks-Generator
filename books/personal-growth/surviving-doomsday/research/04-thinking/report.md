# Thinking quality (the "IQ" track)
> As of 2026-10-03 · Status: draft

## Bottom line

- **The reframe holds.** No training method reliably raises adult fluid intelligence. Working-memory and brain-training gains stay on the trained task; once placebo and publication bias are controlled, far transfer is zero [S1][S2][S3]. Schooling does raise IQ (~1–5 points per year) [S6], but that is not something an employed adult can buy cheaply. (confidence: high)
- **Effective reasoning in a field is mostly knowledge plus how you study.** Experts win on stored patterns, not raw capacity [S19][S20]. The study methods with the best evidence are retrieval practice (g ≈ 0.6), spacing, self-explanation (g ≈ 0.55), teaching others (g ≈ 0.35–0.56), and worked examples for novices [S8][S10][S12][S14][S16]. (confidence: high)
- **Protect the inputs; don't expect boosts.** Chronic short sleep quietly degrades attention and working memory, and people don't notice [S22]. Acute stress impairs working memory [S26]. Exercise's cognitive benefit for healthy adults is small and contested [S23][S24]. (confidence: high on sleep, medium on exercise)
- **AI's effect on your skill depends on who does the thinking.** Unrestricted use raises output but cuts learning: −17% on later unaided tests in a field RCT, and 50% vs 67% on a coding-concept quiz [S27][S28]. AI built to question you rather than answer for you doubled learning gains in another RCT [S30]. AI also makes you overrate your own performance [S39]. (confidence: medium-high; the RCTs are short-term and mostly involve students)
- **Few "mental models" have controlled evidence.** Debiasing training, probabilistic forecasting training, premortems, case comparison and Fermi decomposition (for extreme or uncertain quantities only) do [S40]–[S46]. I found no controlled evidence for "first principles" or "inversion" as trainable tools. They are popular, not proven. (confidence: medium)

## What the evidence says

### Q1 — Can an adult raise IQ or fluid intelligence?

- **Working-memory training transfers near but not far.** A meta-analysis of 87 publications found reliable gains on other working-memory tasks but no convincing far transfer to reasoning, reading or arithmetic against active controls. Bigger working-memory gains did not predict bigger far-transfer gains [S1, A]. A second-order meta-analysis found far-transfer effects and their true variance fall to zero once placebo effects and publication bias are controlled [S2, A].
- **Commercial brain training: same picture.** A 130+ paper review found trained-task improvement, weaker near transfer, and "very little evidence" for everyday cognition. Many vendor-cited studies were poorly designed [S3, A]. In 2016 the FTC took Lumos Labs to settlement: $2M in redress over unsupported claims about work, school and age-related decline [S4, A].
- **Education does work.** It is the one lever with good causal evidence: across 42 datasets and 600k+ people, each additional year of schooling added ~1–5 IQ points (pooled ≈ 3.4), and the gains persisted into old age [S6, A]. I infer this is mostly knowledge and practiced reasoning showing up on tests, not a faster brain. The paper does not settle that.
- **Better than expected? Partly.** The best pro-transfer meta-analysis found n-back → fluid intelligence g = 0.24 [S5, A], which later work attributes largely to passive control groups [S1][S2]. The 20-year ACTIVE follow-up (2026) is a real surprise: speed-of-processing training plus boosters went with fewer dementia diagnoses (40% vs 49%), while reasoning and memory training showed nothing significant [S7, B]. That is a dementia-diagnosis outcome in over-65s, not an IQ gain in working-age engineers.

### Q2 — What improves effective reasoning in a field?

**Mechanism.** Reasoning in a domain runs on stored patterns. Chess masters recall real positions far better than novices, but the advantage mostly disappears on random positions [S20, A]. Poor readers who knew baseball understood a baseball text better than good readers who didn't [S19, A, n = 64]. The lever is building and retrieving domain schemas, not general horsepower. Raw practice hours alone explain <1% of performance variance in professions [S18, A], so what you practice and how matters more than how long.

| Technique | Effect | Source |
|---|---|---|
| Retrieval practice (self-testing) | g = 0.61 vs other study conditions | [S8, A]; rated "high utility" [S9, A] |
| Spacing | Beats massing; optimal gap ≈ 20–40% of a 1-week retention interval, ≈ 5–10% of a 1-year one | [S10][S11, A] |
| Self-explanation prompts | g = 0.55 | [S12, A] |
| Teaching others | Preparing to teach g = 0.35; preparing + teaching g = 0.56; more when interactive | [S16, A] |
| Case comparison (two examples side by side) | d = 0.50 | [S45, A] |
| Interleaving confusable problem types | g = 0.42 overall, 0.34 for math; *reverses* for simple lists | [S13, A] |
| Generating vs. reading an answer | ≈ 0.40 | [S49, A] |
| Worked examples (novices) | ≈ +18 percentile points vs. solving problems | [S14, A] |
| Writing to learn | 0.17; larger with metacognitive prompts | [S17, A] |
| Rereading, highlighting, summarizing | Low utility | [S9, A] |

Worked examples stop helping, and can hurt, once you already have the schema. Then solving problems beats studying solutions (the *expertise-reversal effect*) [S15, A]. This matters for a senior engineer entering a new subfield: start with examples, then switch to problems early.

### Q3 — Sleep, exercise, stress

- **Sleep.** One night (≤48 h) of total sleep loss produces large drops in sustained attention (lapses g = −0.78). Reasoning-accuracy effects are small and non-significant (g = −0.13) [S21, A]. Chronic restriction hurts more than people think: 14 nights of 6 h matched one night of total deprivation on lapses and working memory, and subjects did not perceive the decline [S22, A]. Debugging and code review are attention-bound, so this is plausibly the biggest controllable cognitive variable for an engineer (inference).
- **Exercise.** Contested. One umbrella review found healthy-adult benefits shrink from d = 0.22 to a negligible 0.05 after correcting for moderators and publication bias [S23, A]. A larger 2025 umbrella review reports SMD 0.24–0.42, with the largest effects in children and ADHD [S24, A]. A single workout gives g ≈ 0.10 [S25, A]. Exercise is worth doing for health. As a thinking upgrade for a healthy adult, the effect is small at best.
- **Stress.** Acute stress impairs working memory and cognitive flexibility [S26, A], the two capacities you need for novel problems. I found no comparable meta-analytic effect sizes for chronic work stress on reasoning and won't guess one.

### Q4 — AI and thinking (2024–2026)

**When AI makes you weaker: it does the generating and you only accept.**
- Field RCT with ~1,000 high-schoolers: plain GPT-4 raised practice scores 48%, but when AI was taken away those students scored 17% *below* students who never had it [S27, A].
- RCT with 52 mostly junior engineers learning the Trio async library: AI users scored 50% vs 67% on a concept quiz (d = 0.74), with no significant speed gain. Full delegation and AI-driven debugging scored worst. Using AI for conceptual questions only scored well [S28, B; vendor study, small n, immediate test only].
- Lab RCT: ChatGPT improved essay scores but not knowledge gain or transfer, and users did less self-monitoring than those with a human coach or a checklist ("metacognitive laziness") [S36, A]. ChatGPT vs. Google for a research task: lower mental effort, shallower reasoning [S38, A].
- Calibration breaks: AI raised LSAT-logic scores ~3 points, but users overestimated by ~4. Higher AI literacy went with *worse* self-assessment [S39, A]. Knowledge workers who trusted AI more reported thinking critically less [S29, A, self-report].
- Skill decay in experts: after AI-assisted colonoscopy was introduced, endoscopists' *unassisted* detection rate fell from 28.4% to 22.4% within three months [S34, A, observational].
- Speed perception is unreliable. In a 2025 RCT, experienced open-source developers were 19% slower with AI on their own repos, yet believed they were ~20% faster [S32, B]. METR's late-2025 re-run broke down because developers refused to work without AI. METR now thinks speedups are likely larger but calls its own data weak evidence [S33, B]. (Dated; tools change fast.)

**When AI makes you sharper: it is set up to make you think.**
- The same field RCT's tutor variant, prompted to give hints rather than answers, largely removed the learning loss [S27, A].
- Harvard physics crossover RCT: a tutor engineered for guided questioning and no answer-dumping produced more than twice the learning gain of in-class active learning, in less time (49 vs 75 min median) [S30, A].
- Nigeria RCT: six weeks of teacher-guided GPT-4 tutoring gave +0.31 SD [S37, A].

**The pattern.** Across studies, outcome tracks whether AI replaces the generation step (retrieval, self-explanation, struggle; the exact techniques in Q2) or prompts it. I infer the mechanism is the generation and testing effects [S8][S49] running in reverse: if you never produce the answer, you never encode it.

### Q5 — Reasoning tools for engineers

| Tool | Evidence | Verdict |
|---|---|---|
| Debiasing training (feedback-rich) | One session cut biases 19–32%, lasting 2+ months [S40, A]. It transferred to an unannounced field case: 29% fewer confirmation-driven wrong choices [S41, A] | Supported |
| Probabilistic forecasting (reference classes, averaging, scoring) | <1 h training improved Brier scores 6–11% over 4 years [S43, A]. Training, teaming and tracking each helped [S42, A] | Supported |
| Premortem | Reduced plan overconfidence more than plain critique or pros/cons [S44, B; one conference study] | Promising, thin |
| Case comparison / analogical contrast | d = 0.50 [S45, A] | Supported |
| Fermi decomposition | Helps for extreme or uncertain quantities, *not* for ordinary ones [S46, A] | Supported, narrowly |
| Systems / stock-flow thinking | Well-educated adults reliably fail simple accumulation tasks [S47, A]. The deficit is real; I found no controlled evidence that "systems thinking" courses fix it | Need real, fix unproven |
| First-principles decomposition, inversion | No controlled studies found | Popular, unproven |

## Where sources disagree

- **Does WM training transfer at all?** Au et al. say small but real (g = 0.24) [S5]. Melby-Lervåg and Sala/Gobet say it is an artifact of passive controls and publication bias [S1][S2]. *Settle it:* large preregistered trials with active controls. Existing ones lean null.
- **Exercise and cognition in healthy adults.** Bias-corrected ≈ 0 [S23] vs. a pooled 0.24–0.42 [S24]. The gap comes from bias correction and population mix (children and clinical groups lift [S24]). *Settle it:* preregistered RCTs in healthy working-age adults.
- **Does retrieval practice work for complex material?** van Gog & Sweller say the effect shrinks or vanishes as element interactivity rises [S50]. Karpicke & Aue reply that "complexity" was undefined and counter-evidence was left out [S51]. For engineering material this is the live question. *Settle it:* direct manipulations of complexity with a measurable definition.
- **Self-explanation + worked examples.** Self-explanation prompts help on their own (g = 0.55) [S12], but adding them to worked examples did worse in the math meta-analysis [S14]. Plausibly an overload effect (inference).
- **Is AI eroding critical thinking?** Correlational evidence says strongly yes (r ≈ −0.68, n = 666) [S35, B]. But that design can't separate cause from "people who think less use AI more." An EEG preprint [S31, C] went viral on far less. RCTs show harm for *unguided* use and gains for *tutor-designed* use [S27][S30]. *Settle it:* longitudinal RCTs on working professionals with delayed, unaided skill tests. As of this date I found none.
- **AI and developer speed.** Slower in early 2025 [S32] vs. "likely faster now" with no clean data [S33]. Speed is a separate question from skill retention [S28].

## Myths and hype to ignore

- **"Brain games make you smarter."** Gains don't leave the game [S1][S2][S3]. Regulators already ruled on it [S4].
- **"Dual n-back raises your IQ."** The one positive meta-analysis is small and confounded by control-group choice [S5] vs [S1][S2].
- **"Learning styles: learn the way you prefer."** There is no adequate evidence for matching instruction to style [S48].
- **"10,000 hours."** Practice quantity explains <1% of variance in professional performance [S18].
- **"ChatGPT rots your brain" (MIT EEG study).** n = 54, preprint, EEG coupling is not skill [S31, C]. The RCT evidence is narrower: unguided use cuts *learning* [S27][S28].
- **"AI makes me 10x faster."** Self-reports of speed were wrong in direction in the only clean RCT [S32]. Any number like this rests on C-grade evidence.
- **Nootropics / "10x your brain" stacks.** Out of scope per the brief and not researched here. No source in this report supports them.
- **"Exercise is a cognitive enhancer."** For healthy adults the corrected effect is small or near zero [S23]. Exercise for health, not for IQ.
- **"Think from first principles / invert, always invert."** Fine heuristics, but no controlled evidence that training them improves decisions (none found).

## What to do

### Core practices

| Practice | How to do it | Cadence | How to measure it | Evidence |
|---|---|---|---|---|
| Retrieval over rereading | Close the doc and write what you remember, or answer your own cards. Never reread first. | Every study session | Recall % on cold quizzes | A [S8][S9] |
| Spaced review | Review at gaps that grow with how long you need to remember (roughly 1 d → 1 wk → 1 mo for long-term retention) | Daily, 15 min | Recall at 30 days | A [S10][S11] |
| Explain why | After reading code or a paper, write 3 sentences on *why* it works, not what it does | Per concept | Can you predict its behaviour on a new case? | A [S12] |
| Teach it | Write an internal note, give a talk, or explain to a peer who asks questions | Weekly | Questions you couldn't answer → gaps list | A [S16] |
| Compare two cases | Put two designs or incidents side by side and name the principle that differs | Per new concept | Can you classify a third case? | A [S45] |
| Switch examples → problems | Study worked examples until you can follow them, then stop and solve | Phase change ~week 1–2 | Problems solved unaided | A [S14][S15] |
| Forecast and score | Put probabilities on estimates, launch outcomes and incident causes. Record them and score them | Weekly log | Brier score over time | A [S42][S43] |
| Premortem big calls | "It's 6 months later and this failed. Why?" before committing | Per significant decision | Failure causes you predicted vs. not | B [S44] |
| Debias with feedback | Do a feedback-based bias exercise once, then use a confirmation-bias check in design review ("what would disconfirm this?") | Once + per review | Decisions reversed by the disconfirming test | A [S40][S41] |
| Sleep floor | ≥7 h opportunity. Don't trust your own sense of "I'm fine on 6" | Nightly | Sleep tracker average and reaction-time test | A [S21][S22] |
| Move | Exercise for health. Don't count on it as a thinking boost | 3–5×/wk | n/a for cognition | A, contested [S23][S24] |

### Rules for using AI without losing the skill

These are derived from the RCT pattern above. Each rule is an inference from [S27][S28][S30][S36][S39], not separately tested.

1. **Attempt first, then ask.** Write your own solution, hypothesis or outline before prompting. The struggle is where the learning happens [S8][S49][S27].
2. **In a domain you're learning, ask for questions and hints, not code.** Use a tutor-style system prompt ("don't give the answer; ask me the next question") [S27][S30].
3. **Ask "why", not just "do".** Conceptual questions kept comprehension intact. Full delegation and AI-led debugging destroyed it [S28].
4. **Separate production mode from learning mode.** Delegate freely in domains you have already mastered. In domains you're acquiring, follow rules 1–3. Decide which mode you're in before you start.
5. **Close the loop unaided.** After an AI-assisted task, explain or re-implement the key part without the tool. If you can't, you didn't learn it [S28][S36].
6. **Don't grade yourself while AI is on.** Your confidence is miscalibrated when AI helps [S39]. Check against tests, a reviewer, or an unaided retry.
7. **Keep a no-AI rep schedule for core skills.** Unassisted skill can decay within months of routine AI use [S34]. Regularly debug, design or review without assistance to keep the baseline.
8. **Measure speed, don't feel it.** Perceived speedup was wrong in direction in the one clean RCT [S32]. Time real tasks with and without AI.

### 30-day protocol for a new technical field

This protocol is my synthesis. Each element has evidence; the combination and schedule are untested.

| Days | Focus | Daily (~90 min) | Evidence |
|---|---|---|---|
| 1–3 | Map | Read one canonical overview. Write a one-page map of the 10–20 core concepts from memory, then check it against the source | Retrieval [S8]; knowledge drives comprehension [S19] |
| 4–10 | Worked examples | Study 2–3 worked solutions a day (official tutorials, reference implementations). Self-explain each step. Turn every concept into a retrieval card | Worked examples for novices [S14]; self-explanation [S12] |
| 11–20 | Problems | Switch to solving unaided. Interleave problem types that look alike. AI only as a hint-giver after an attempt. Compare two contrasting cases per concept | Expertise reversal [S15]; interleaving [S13]; comparison [S45]; AI rules above |
| 21–27 | Build + teach | Build one small real project. Write a teaching note or give a 20-min talk. Log every question you couldn't answer | Teaching [S16]; generation [S49] |
| 28–30 | Test | Cold test: explain the core concepts unaided, solve 3 new problems, predict the behaviour of an unfamiliar case. Record scores | Retrieval [S8] |
| Throughout | Spaced review | 15 min/day of card review. Final reviews spaced to lock in 6-month retention | Spacing [S10][S11] |
| Throughout | Inputs | Sleep floor on. Avoid high-stakes learning sessions after a short night | [S21][S22][S26] |

**Success metric:** on day 30 and again on day 90, an unaided score on the same cold test. The day-90 score is the real one [S11].

## Leading indicators

- **Longitudinal RCTs on professional engineers** using AI with delayed, unaided skill tests. These would firm up or overturn the "AI harms learning" finding, which today rests mostly on students and short-term tests [S27][S28].
- **Replications of the expert deskilling result** [S34] in software (e.g., unaided debugging or review accuracy after a period of agent use).
- **A clean re-run of METR-style productivity RCTs** that solves the opt-out bias [S33].
- **Independent replication of ACTIVE speed-training effects** [S7] without vendor ties. A replicated cognitive-training effect on a real-world outcome would reopen Q1.
- **Retrieval-practice studies on high-complexity technical material** that resolve the van Gog vs. Karpicke dispute [S50][S51].
- **Tool design shifts:** coding assistants shipping "learning modes" that withhold answers. If tutor-style designs become standard, rule 2 becomes the default rather than a discipline.

## Pending profile

`profile.md` does not exist yet. Everything above is written for a generic software/AI engineer. Once the profile exists, tailor:

- **Seniority and current stack:** decides which domains are "production mode" (delegate) vs. "learning mode" (AI-restricted), per AI rule 4.
- **The target field for the 30-day protocol:** e.g., ML systems, a new language, a business domain. The day-1 map and project change with it.
- **Sleep, health and caregiving constraints:** set a realistic sleep floor and cadence.
- **Current AI usage pattern:** how much is delegation vs. conceptual inquiry today, to set the no-AI rep schedule.
- **Whether the user writes or teaches publicly:** if so, the teach-it practice can double as brand-building (links to tracks 06 and 08).
- **Decision types they own** (architecture, hiring, client scoping): where forecasting logs and premortems pay off most.

## Questions for me

1. Which 2–3 skills must I still do *unaided* in two years, and which am I happy to delegate fully? Be specific.
2. Over the last month, what share of my AI use was delegation vs. asking "why"? How would I know?
3. What field would I run the 30-day protocol on first, and what would the day-30 cold test actually contain?
4. What is my real sleep average over the last 30 nights, measured rather than remembered?
5. When did I last debug something hard with no AI? Was I slower than I expected?
6. Which of my recent technical decisions could I have put a probability on? Am I willing to start a scored forecast log?
7. Where do I currently "learn" by rereading or watching instead of retrieving or building?
8. Who could I teach weekly (team, juniors, a blog) to get the teaching effect plus visibility?
9. Am I treating "first principles" as a method, or as a label for thinking I'd do anyway?
