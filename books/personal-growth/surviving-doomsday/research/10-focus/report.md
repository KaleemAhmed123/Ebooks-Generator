# Focus and outer noise
> As of 2026-10-03 · Status: draft

Verification caveat: full-text fetches of journal hosts were blocked in this
session. Every claim was checked against abstracts, publisher pages, or the
authors' own summaries (see the note in `sources.md`). The verification pass
should re-check the numbers below against full text.

## Bottom line

- **Interruptions cost more in stress and error than in time.** People speed up
  to absorb them [S1], but even a 3-second break doubles errors on step-by-step
  work [S2], and programmers rarely resume editing within a minute [S5]. The
  famous "23 minutes to refocus" is a field average for *returning to* a task,
  taken from an interview, not a measured refocus cost [S4]. (confidence: high)
- **Batching beats abstinence.** Three scheduled notification or email windows a
  day improved attention, mood, and stress in field experiments, while turning
  notifications off entirely raised anxiety and FoMO [S11][S12]. Self-set limits
  work because much of feed use is a self-control problem, not a choice [S13].
  (confidence: high)
- **AI anxiety is a decision-quality problem before it is a mood problem.** The
  *affective* part of job insecurity (worry, fear) drives more harm than the
  perceived threat itself [S23], and fear reliably shifts choices toward risk
  avoidance [S24]. CBT-style stress programs carry the strongest evidence for
  managing it [S27]. (confidence: medium — the base data is general job
  insecurity, not AI-specific)
- **The market signal is real but narrow, and slow.** Payroll data show a 16%
  relative employment drop for ages 22–25 in the most AI-exposed jobs [S33],
  while the overall occupational mix shows no discernible disruption [S35].
  Monthly data answers this question. Daily feeds don't. (confidence: medium;
  dated 2025-11 / 2025-10, will age)
- **Most "deep work" numbers are lore; the mechanism is not.** Switch costs,
  attention residue, and plan-making effects are solid [S6][S7][S18]. The fixed
  "N hours a day of deep work" caps and the practice-explains-expertise claim do
  not hold up: deliberate practice explains under 1% of performance variance in
  professions [S20]. (confidence: medium)

## What the evidence says

### 1. Task switching, interruptions, recovery

- **Switch cost is real and only partly preventable.** Responses are slower and
  more error-prone right after a task switch; preparation shrinks the cost but
  leaves a residual cost [S7] (A).
- **Interrupted people go faster, and pay in stress.** In a lab task (email
  replies), interrupted participants finished in *less* time with no quality
  loss, but reported more stress, frustration, time pressure, and effort [S1]
  (A). The cost of an interruption on writing-like work is mostly felt, not
  visible in output.
- **On step-by-step work, tiny interruptions break the sequence.** Interruptions
  of about 2.8 s doubled sequence errors; about 4.4 s tripled them [S2] (A).
  Deployments, migrations, incident runbooks, and code review checklists are
  this kind of work.
- **Field data on fragmentation.** Information workers had 57% of their
  "working spheres" interrupted; most interrupted work was resumed the same day,
  but only after more than two other activities [S3] (A). In a later interview,
  Mark gave an average of 23 min 15 s before returning to the interrupted work,
  from observation of 36 workers over three days [S4] (B). That is the time
  until people *came back*, filled with other tasks, not a "refocus penalty" per
  interruption.
- **Programmers specifically.** Across 10,000 recorded sessions from 85
  programmers, only about 10% had an edit within a minute of resuming; people
  rebuilt context by navigating code and running the program [S5] (A).
- **Attention residue.** After switching away from an unfinished task, thoughts
  about it persist and hurt performance on the next task; finishing first, or
  closing the first task under time pressure, reduces the residue [S6] (A).
- **Self-report diverges from behaviour.** Developers say a productive day is one
  without interruptions or context switches, yet observed developers switched
  often and still rated their days productive [S8] (A). Self-assessment of focus
  is unreliable; measure it.
- **Screen attention has shortened (one lab's data).** Mark reports the average
  time on one screen before switching fell from about 2.5 minutes (2004) to
  about 47 seconds in her recent studies [S9] (B, a book summarizing her own
  work; methods vary across years).

### 2. Interventions with evidence

| Intervention | Evidence | Effect |
|---|---|---|
| Notification batching 3×/day | Field RCT, n=237, 2 weeks [S11] (A) | More attentive, productive, better mood, more control; fewer unlocks. Zero notifications → more anxiety and FoMO. |
| Email checking 3×/day | Field experiment, n=124 [S12] (A) | Lower daily stress, which predicted higher well-being. |
| Self-set app limits | RCT, ~2,000 adults [S13] (A) | High take-up, lower use; self-control problems ≈ 31% of social media use; temporary incentives had lasting effects. |
| Platform break (4 weeks off Facebook) | RCT [S14] (A) | Higher subjective well-being. |
| Implementation intentions ("if X, then Y") | Meta-analysis, 94 tests [S15] (A) | d = 0.65 on goal attainment, including shielding goals from distraction. |
| Plan for unfinished work before stopping | Lab experiments [S18] (A) | A concrete plan removed intrusive thoughts about the unfinished goal without doing it. |
| Habit formation | n=96, 84 days [S16] (A) | Median 66 days to plateau, range 18–254; early repetitions count most. |
| Time management in general | Meta-analysis, 158 studies [S17] (A) | Moderately related to performance, more strongly to well-being. Correlational. |
| Environment: phone out of the room | Original "brain drain" study + replications [S19] (A) | Two replications failed. Physical removal may still help by removing the *option* to check, but the "mere presence drains capacity" mechanism is not established. |

No meta-analysis specific to time-blocking or calendar blocking turned up. I
infer its value from implementation intentions [S15] (a block *is* an if-then
plan: "at 9:00, then this task") and from [S17], not from direct trials.

### 3. Information diet

- **Heavy exposure to threat coverage harms, independent of real risk.** After
  the Boston Marathon bombings, repeated daily media exposure was linked to more
  acute stress than being at the event [S26] (A). The mechanism generalises
  plausibly to AI-doom content: repeated, vivid threat framing, no new action
  implied. This is inference; no AI-specific study was found.
- **Avoidance is already widespread and mood-driven.** 40% of people avoid news
  at least sometimes; 39% of avoiders cite its effect on mood and 31% the
  volume [S39] (A, 2025 data).
- **The high-signal inputs on "is my market moving" are slow.** The questions
  that matter to a career decision are answered by labour data released monthly
  or quarterly [S33][S34][S35] and by controlled productivity studies [S36], not
  by daily commentary. The design of the input set is in "What to do".

### 4. AI anxiety, job insecurity, and decisions

- **Job insecurity is broadly harmful.** It degrades job attitudes, health, and
  to some extent work behaviour [S22] (A); it is linked to 51 of 58 negative
  outcomes studied, with the *affective* component (worry, fear) a stronger
  predictor than the cognitive one (perceived likelihood of loss) [S23] (A).
  Practical consequence: the perceived threat and the worry about it can be
  worked on separately, and the worry is the bigger lever.
- **Fear changes decisions.** Across 136 effects, fear/anxiety was associated with
  less risky choice and higher risk estimates, r = 0.22, larger with real stakes
  and clinical anxiety [S24] (A). Threat also narrows information processing
  toward familiar responses [S25] (B, theory). I infer the specific failure
  mode for an engineer: under AI anxiety, either freezing on the familiar stack
  or panic-switching to whatever the feed says is urgent. Both are
  threat-driven, not evidence-driven.
- **AI-specific research is thin.** Most 2025–26 "AI anxiety" material is
  surveys or small cross-sectional studies [S32] (C). The conclusions above rest
  on the general job-insecurity literature.
- **Coping with evidence:**
  - Cognitive-behavioural stress programs: the strongest effects among
    occupational stress interventions; overall d = 0.526 across all types [S27]
    (A).
  - Workplace mindfulness training: stress g = 0.56, anxiety g = 0.62; no
    conclusion on work performance [S28] (A).
  - Physical activity: medium effects on anxiety (median ES −0.42) and distress
    (−0.60); higher intensity helped more [S29] (A).
  - Scheduled worry period (stimulus control): beat a control on worry, anxiety,
    and insomnia in two weeks in a non-clinical sample; weaker support in
    diagnosed GAD [S30] (A).
  - Plan-making for unresolved goals removes intrusive thoughts [S18] (A); a
    written career plan plausibly does the same for "what if AI takes my job"
    loops. Inference.
- **Where professional help applies.** If anxiety is present most of the time,
  affects daily life, is hard to control, and has lasted around six months, it
  meets the profile of generalised anxiety disorder; see a doctor. CBT with a
  therapist is the first-line treatment [S31] (A). Self-help techniques above are
  for normal stress, not a substitute.

### 5. Useful vs manufactured urgency

- **Useful urgency shows up in data with a lag and a specific population.** The
  canaries data shows a 16% relative employment decline for ages 22–25 in the
  most AI-exposed occupations, controlling for firm shocks, with experienced
  workers stable [S33] (A, working paper, rev. 2025-11); interest rates do not
  explain it [S34] (A, 2026-02). It is specific (entry-level, exposed roles,
  automation-type use) and actionable.
- **The same period shows no economy-wide disruption** in the occupational mix
  [S35] (A, 2025-10). Both can be true: a narrow, real shift inside a stable
  aggregate.
- **Manufactured urgency comes from interested parties with dated claims.** In
  March 2025 Anthropic's CEO said AI was 3–6 months from writing 90% of code
  [S37] (B reporting a C-grade claim); after the deadline it was unclear what
  had been measured or whether it held [S38] (B). An RCT from the same year
  found experienced developers 19% *slower* with AI while believing they were
  about 20% faster [S36] (A, n=16). Lab forecasts and vibes both overstate;
  controlled measurement corrects both.
- **A practical test (my synthesis):** urgency is useful when it (1) cites data
  about a population you belong to, (2) has a source without a stake in your
  reaction, (3) implies a specific action, and (4) would still be true next
  month. Fail two or more and treat it as noise.

### 6. Deep-work claims: supported vs lore

| Claim | Status |
|---|---|
| Switching has a cost | Supported [S7] |
| Unfinished tasks leak attention into the next one | Supported [S6]; a plan removes much of it [S18] |
| Short interruptions wreck sequential work | Supported [S2] |
| "It takes 23 minutes to refocus after any interruption" | Lore. The figure is time-to-return in field observation, from an interview [S4]; the lab data shows faster work under interruption [S1] |
| Developers know when they're focused | Not supported; self-report diverges from observed switching [S8] |
| Deliberate practice is what makes experts | Overstated: <1% of variance in professions [S20]; core violinist finding did not replicate cleanly [S21] |
| Heavy multitaskers are more distractible | Weak: d = 0.17, non-significant after bias correction [S10] |
| Your phone on the desk drains cognitive capacity | Failed replication twice [S19] |
| A fixed daily cap of deep-work hours | No primary source verified in this pass; cut |

## Where sources disagree

- **Does interruption cost time?** [S1] finds faster completion with no quality
  loss; [S2] finds doubled errors from 3-second breaks. Task type likely
  explains it: [S1] used email replies, [S2] a step-by-step procedure. Settled by
  measuring your own error rate on procedural work vs throughput on composition
  work. Don't generalise either.
- **Turn notifications off, or batch them?** Common advice is "all off". [S11]
  found that zero notifications raised anxiety and FoMO, while batching helped.
  One 2-week trial in India; a replication in knowledge workers would settle it.
- **Is AI already hitting jobs?** [S33][S34] see a real entry-level effect;
  [S35] sees no aggregate disruption. Different questions (a sub-group vs the
  whole mix), not a true contradiction, but headlines use each to "prove"
  opposite stories. Settled by a further 12–24 months of both series.
- **Do AI tools speed developers up?** Lab forecasts say yes, dramatically [S37];
  one RCT with experienced developers on their own repos says no, early 2025
  [S36]. Small n, fast-moving tools. More RCTs on newer tools would settle it.
- **Worry postponement.** Works in non-clinical samples [S30]; weaker evidence in
  diagnosed GAD. Use it for normal worry; clinical anxiety needs treatment
  [S31].
- **Practice and expertise.** Ericsson's camp vs Macnamara's [S20][S21]. For an
  engineer this matters less than it seems: no source here shows deliberate
  practice *doesn't help*, only that it explains less than claimed.

## Myths and hype to ignore

- **Dopamine detox / dopamine fasting.** Avoiding stimulation doesn't lower
  dopamine or "reset receptors"; the originator says the name isn't literal and
  the method is CBT stimulus control [S40] (B). The useful part (cut the cue,
  delay the response) is just batching and app limits [S11][S13].
- **"23 minutes to refocus."** See above. The number is real but describes
  something else [S4].
- **"Multitasking makes you permanently distractible."** The effect is weak and
  fragile [S10].
- **"AI will write all the code in N months."** A dated prediction from a party
  with a stake [S37]; the record so far is unclear [S38] and controlled data
  points the other way for one setting [S36].
- **"You're already too late."** No source in this track supports a cut-off;
  the measured effect is concentrated on entry-level hiring in exposed roles
  [S33], not on experienced engineers.

## What to do

General for a software/AI engineer until `profile.md` exists (see "Pending
profile").

| Practice | How to do it | Cadence | How to measure | Evidence |
|---|---|---|---|---|
| Notification batching | OS focus modes / notification summary at 3 fixed times (e.g. 09:00, 13:00, 17:30). Exceptions: on-call pager, family. | Daily | Phone unlocks/day (OS screen-time); 1–5 evening rating of attention | A [S11] |
| Email and chat windows | Check 3×/day; close the client between windows; set Slack/Teams status with next check time | Daily | Count of checks; daily stress 1–5 | A [S12] |
| Self-set app limits | Hard limits on feed apps (X, LinkedIn, Reddit, YouTube) via OS screen-time; a friction step to override | Set once, review weekly | Minutes/day on limited apps | A [S13] |
| If-then focus plans | Write 2–3: "If I feel the pull to check AI news during a block, then I add it to the Friday list." "If a Slack ping arrives in a block, then I reply in the next window." | Write once, revise monthly | Times the plan fired vs times you broke it | A [S15] |
| Close-out note before switching | Before leaving any task: 3 lines — where I am, next step, open question. In the repo, a `WIP:` commit or TODO at the cursor | Every switch | Minutes from sitting down to first edit (sample 5 resumes/week) | A [S5][S6][S18] |
| Protect procedural work | No interruptions during deploys, migrations, incident steps; checklist in hand | Each procedure | Errors/rollbacks per month | A [S2] |
| Focus blocks | 2 calendar blocks of 90–120 min on 4 days; block length is a choice, not an evidence-based number | Weekly plan | Blocks kept / blocks planned | B-inference [S15][S17] |
| Weekly worry slot | 20–30 min fixed time and place for career/AI worry; outside it, note the worry and defer | Weekly (daily if worry is high) | Worry minutes outside the slot; sleep onset | A, non-clinical [S30] |
| Career plan as plan-making | One page: what would make me act (thresholds), what I'll do. Re-read when an AI scare hits | Quarterly | Number of unplanned "pivots" considered | A mechanism [S18]; inference for career use |
| Exercise | Moderate-to-vigorous, most days | 3–5×/week | Weekly minutes; anxiety 1–5 | A [S29] |
| Stress skill-building | A structured CBT-based stress course or mindfulness program (8-week format) | Once, then practice | Pre/post stress scale (e.g. PSS-10) | A [S27][S28] |
| Professional help trigger | Anxiety most days, affecting daily life, hard to control, ~6 months → see a doctor / therapist | Check in the weekly audit | Yes/no | A [S31] |

### Personal noise policy (draft)

**Allowed inputs** — chosen because each one reports data or primary changes,
not reactions to them.

| Input | Why | Cadence |
|---|---|---|
| Labour data: Stanford canaries indicators [S33], Yale Budget Lab tracker [S35] | Answers "is my market moving" with data | Monthly, 15 min |
| Controlled studies on AI and dev productivity (e.g. METR [S36]) | Corrects both hype and doom | When published; batch into the weekly slot |
| Release notes / changelogs of the 3–5 tools and models you use at work | Primary docs, directly actionable | Weekly, in the Friday slot |
| One curated technical digest (pick in the tech-radar track, 09) | Coverage without the feed | Weekly |
| One long-form source per month (paper, book chapter, deep post) | Depth over volume | Monthly |
| Tech-radar review (track 09 output) | Converts inputs into adopt/trial/hold decisions | Quarterly |

**Blocked inputs**

- Algorithmic feeds as an AI news source (X/LinkedIn/Reddit/YouTube home
  feeds): app limits [S13] and no notifications.
- Push alerts from news apps and newsletters: off; batch into the weekly slot
  [S11].
- AI-lab CEO timelines and "N months until" claims: read only when a dated
  claim falls due, to score it [S37][S38].
- "You're too late" / "this changes everything" posts: no source in this track
  supports them; skip on sight.
- Live coverage of AI events (launch streams, reaction threads) on the day:
  wait 7 days for primary docs and measured takes [S26] (inference from threat
  media exposure).

### Weekly attention audit (15 minutes, Friday)

1. **Numbers (4 min).** Read from OS screen-time and calendar: unlocks/day,
   minutes on limited apps, focus blocks kept vs planned, email/chat checks.
   Log them in one line.
2. **Resumption sample (3 min).** From the week's notes: median minutes from
   sitting down to first edit on resumed tasks. Did close-out notes exist?
3. **Urgency triage (4 min).** For each AI item that grabbed you this week, run
   the four-question test (population / stake / action / still true next
   month). Move survivors to the radar list; drop the rest.
4. **Mood check (2 min).** Rate anxiety 1–5 for the week. Three or more weeks
   at 4–5, or the professional-help trigger is met → book help.
5. **One change (2 min).** Pick one rule to tighten or loosen next week. Only
   one.

## Leading indicators

- **Labour data:** the canaries series spreading from ages 22–25 to older
  cohorts in exposed roles, or Yale's aggregate measure moving [S33][S35]. That
  would turn "narrow" urgency into broad urgency and should change the career
  plan, not the noise policy.
- **New dev-productivity RCTs** showing large speed-ups on real repos with
  current tools. That would change which tool changelogs count as urgent.
- **Replications of notification batching** in knowledge workers, either way.
- **AI-specific job-insecurity studies** (longitudinal, not surveys) that
  confirm or break the general job-insecurity findings.
- **Personal:** the audit's numbers drifting (unlocks up, blocks kept down for 3
  weeks) is the earliest signal that the policy has failed.

## Questions for me

1. Which inputs actually changed a decision of yours in the last 6 months? Keep
   those, cut the rest.
2. What is your real on-call or client-response constraint, and does 3× daily
   batching break it?
3. Where does your AI news come from today, and how many minutes a day does it
   take (check the screen-time numbers, don't estimate)?
4. Which of your work is procedural (deploys, data migrations) and which is
   composition? Do you protect the first differently?
5. What threshold in the labour data or in your own pipeline would make you
   change direction? Write it down so the feed can't set it for you.
6. When AI anxiety hits, do you freeze on the familiar or chase the newest
   thing? Which happened last time?
7. Is the anxiety situational (spikes with news) or near-constant? If
   near-constant for months, what stops you from seeing a professional?
8. Do you exercise 3+ times a week now? If not, what's the smallest version
   you'd keep?

## Pending profile

`profile.md` does not exist yet. Once it does, tailor:

- The attention section's current baselines (screen time, unlocks, where AI
  news comes from) → set targets in "What to do" from them, not generic ones.
- Role and constraints: on-call, client work, time zones → adjust batching
  windows and exceptions.
- Career stage → how much weight the entry-level canaries signal [S33] gets.
- Country → the professional-help route ([S31] is UK-specific; replace with
  the local route).
- Tools and models used daily → the changelog list in the allowed inputs.
- The digest choice → from track 09 (tech radar).
