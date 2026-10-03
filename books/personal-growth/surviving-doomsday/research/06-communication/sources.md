# Sources — 06 Communication

> Checked 2026-10-03. **Verification caveat:** this session's network policy
> blocked direct page fetches, so every source was checked through search-engine
> results that quote or summarise the page, not by reading the full text. Exact
> numbers below match those summaries. Re-check each number against the full
> text before anything moves into `pages/`.

## Engineering writing: what respected orgs say

[S1] Design Docs at Google — Malte Ubl (Google engineer at the time) — 2020 — https://www.industrialempathy.com/posts/design-docs-at-google/ — essay — Grade B
     A Google insider's description of design-doc purpose (catch issues while cheap, build consensus, scale senior knowledge, organisational memory, portfolio artifact) and structure (context and scope, goals and non-goals, design, alternatives considered). Personal blog, not an official Google doc.

[S2] 2017 Letter to Shareholders — Jeff Bezos / Amazon — April 2018 — https://researchscape.com/blog/bezos-on-narratives (quotes the letter; original on aboutamazon.com / SEC) — primary document — Grade A
     Amazon writes narrative six-page memos instead of slides, reads them silently at the start of meetings; "great memos are written and re-written, shared with colleagues… set aside for a couple of days, and then edited again with a fresh mind"; a good one may take a week or more.

[S3] Site Reliability Engineering, Ch. 15 "Postmortem Culture: Learning from Failure" — Google — 2016 — https://sre.google/sre-book/postmortem-culture/ — official docs — Grade A
     Postmortem definition, triggers defined before incidents, blameless framing (assume good intent; finger-pointing makes people hide issues).

[S4] RFD 1: Requests for Discussion — Oxide Computer Company — 2020-07-24 — https://oxide.computer/blog/rfd-1-requests-for-discussion — original docs — Grade A
     Writing ideas down so they are rigorously formulated and transparently shared; RFDs used for design, process, hiring; based on Go, Rust, Kubernetes proposal processes.

[S5] Companies Using RFCs or Design Docs and Examples of These — Gergely Orosz, The Pragmatic Engineer — undated in search results (accessed 2026-10-03) — https://blog.pragmaticengineer.com/rfcs-and-design-docs/ — reporting — Grade B
     Survey of which companies use RFC/design-doc processes and how Uber's planning evolved as it grew past 2,000 engineers.

[S6] Staff Engineer: Leadership beyond the management track / staffeng.com — Will Larson — 2021 — https://staffeng.com/ — practitioner book — Grade B
     Staff archetypes; strategy built bottom-up by synthesising ~5 design docs into a strategy and ~5 strategies into a vision; writing framed as staff-level leverage.

[S7] GitLab Handbook: Communication; Asynchronous communication — GitLab — living doc (accessed 2026-10-03) — https://handbook.gitlab.com/handbook/communication/ — org docs — Grade A (for what GitLab does), B (for whether it generalises)
     Handbook-first, async-default company; proposed changes go through handbook edits, not slides or chat.

[S8] AR 25-50 Preparing and Managing Correspondence, "Standards for Army writing" — U.S. Army — current edition — https://armypubs.army.mil — official regulation — Grade A
     Army writing must put the main point first (bottom line up front) and use active voice; the stated reason is that ineffective writing fails to transmit a focused message quickly.

## Writing for decision makers

[S9] The Pyramid Principle — Barbara Minto (ex-McKinsey) — 1985 (later editions) — book — Grade B
     Answer first, supported by grouped arguments; SCQA (situation, complication, question, answer) opening. Practitioner doctrine; no controlled trials found.

[S10] Writing for Busy Readers / "When Writing for Busy Readers, Less Is More" — Todd Rogers & Jessica Lasky-Fink (Harvard Kennedy School) — 2023 — https://behavioralscientist.org/when-writing-for-busy-readers-less-is-more/ — researchers' book + their summary of field experiments — Grade B
     Field experiment, ~7,000 U.S. school board members: a 49-word request got 4.8% survey clicks vs 2.7% for a 127-word version, while lay predictors expected the long one to win. Underlying journal article not located; graded B until it is.

[S11] F-Shaped Pattern for Reading Web Content — Jakob Nielsen / Nielsen Norman Group — 2006, updated 2017 — https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content-discovered/ — eyetracking research (not peer-reviewed) — Grade B
     Readers scan: first lines, then the left edge; the pattern is one of several, driven by unstructured text.

[S12] Columbia Accident Investigation Board Report, Vol. 1 + Tufte's analysis of the Boeing slide — CAIB / Edward Tufte — Aug 2003 — https://www.edwardtufte.com/notebook/columbia-accident-investigation-board-the-boeing-powerpoint-slide/ — official report + analysis — Grade A
     Critical caveat (foam far larger than anything tested) buried at the bottom of a bullet hierarchy; Board called "the endemic use of PowerPoint briefing slides instead of technical papers" a problematic communication method at NASA.

## AI-era signal

[S13] "AI-Generated 'Workslop' Is Destroying Productivity" — BetterUp Labs + Stanford Social Media Lab, Harvard Business Review; as reported by The Register — Sept 2025 — https://www.theregister.com/2025/09/26/ai_workslop_productivity/ — survey (not peer-reviewed; co-run by a vendor) — Grade B
     n=1,150 U.S. full-time workers; 40% received workslop in the past month; ~1h56m to handle each, est. $186 per employee per month; about half saw the sender as less creative, capable and reliable; 42% less trustworthy; 37% less intelligent.

[S14] "Is there an AI workslop problem?" — Jason Collins — 2025 — https://www.jasoncollins.blog/posts/is-there-an-ai-workslop-problem — critique (blog by a behavioural economist) — Grade C
     Methodological scepticism of [S13]: self-report survey, vendor involvement. Used only to flag the counter-case.

[S15] "Evidence of a social evaluation penalty for using AI" — Reif, Larrick, Soll (Duke), PNAS — May 2025 — https://www.pnas.org/doi/10.1073/pnas.2426766122 — four preregistered experiments, n=4,439 — Grade A
     AI users are anticipated and actually rated lazier, less competent, less diligent, less independent; affects hiring judgements; penalty vanished when the task was clearly suited to AI; raters who use AI themselves penalise less.

[S16] "The transparency dilemma: How AI disclosure erodes trust" — Schilke & Reimann, Organizational Behavior and Human Decision Processes 188 — May 2025 — https://ideas.repec.org/a/eee/jobhdp/v188y2025ics0749597825000172.html — 13 preregistered experiments, >3,000 participants — Grade A
     Disclosing AI use lowers trust vs not disclosing, via perceived legitimacy; being exposed by others is worse still.

[S17] "Human heuristics for AI-generated language are flawed" — Jakesch, Hancock, Naaman, PNAS — 2023-03-07 — https://arxiv.org/abs/2206.07271 — six experiments, n=4,600 — Grade A
     People could not detect AI-written self-presentations; they rely on cues like first-person pronouns, contractions, family topics, which AI can mimic.

[S18] "Artificial intelligence in communication impacts language and social relationships" — Hohenstein et al., Scientific Reports — Oct 2023 — https://sml.stanford.edu/publications/hancock-jt/artificial-intelligence-communication-impacts-language-and-social — two randomized experiments — Grade A
     Actual smart-reply use made conversation faster, more positive, partners closer; being *suspected* of using AI made people judged more negatively.

[S19] "Professionalism and Trustworthiness in AI-Assisted Workplace Writing" — Cardon & Coman, International Journal of Business Communication — 2025 — https://news.ufl.edu/2025/08/writing-ai-work/ — survey experiment, n≈1,100 professionals — Grade A
     AI-assisted messages read as professional, but supervisors using heavy AI were seen as sincere by only 40–52% vs 83% for low assistance; penalty concentrated in relational messages (praise, motivation), not informational ones.

[S20] "Generative AI enhances individual creativity but reduces the collective diversity of novel content" — Doshi & Hauser, Science Advances 10(28) — July 2024 — https://scale.stanford.edu/ai/repository/generative-ai-enhances-individual-creativity-reduces-collective-diversity-novel — online experiment — Grade A
     AI ideas made stories rated more creative and better written, mostly for weaker writers, but the AI-assisted stories were more similar to each other.

[S21] "AI-generated poetry is indistinguishable from human-written poetry and is rated more favorably" — Porter & Machery, Scientific Reports — Nov 2024 — https://pmc.ncbi.nlm.nih.gov/articles/PMC11564748 — experiments — Grade A
     Non-experts identified AI poems below chance (46.6%) and rated them higher; simplicity read as human, complexity read as AI.

[S22] "Delving into LLM-assisted writing in biomedical publications through excess vocabulary" — Kobak et al., Science Advances 11(27) eadt3813 — 2025 — https://arxiv.org/abs/2406.07016 — corpus analysis of 15M+ PubMed abstracts — Grade A
     At least 13.5% of 2024 abstracts were LLM-processed (up to 40% in some subcorpora); spikes in style words like "delves", "showcasing", "underscores".

[S23] "Algorithmic Writing Assistance on Jobseekers' Resumes Increases Hires" — Wiles, Munyikwa, Horton, Management Science 71(12) — 2025 — https://www.nber.org/papers/w30886 — field experiment, ~480k jobseekers — Grade A
     Writing assistance (fewer errors, easier to read) raised hires 8% and wages 10%; employers were not less satisfied; better writing helped employers see ability rather than signalling it.

[S24] "Your Brain on ChatGPT: Accumulation of Cognitive Debt when Using an AI Assistant for Essay Writing Task" — Kosmyna et al., MIT Media Lab — June 2025 — https://www.media.mit.edu/publications/your-brain-on-chatgpt/ — preprint, EEG study, n=54 — Grade B (not peer-reviewed)
     LLM group showed weakest brain connectivity, lowest essay ownership, and worst ability to quote their own essay minutes later.

[S25] "Comment on: Your Brain on ChatGPT…" — arXiv 2601.00856 — Jan 2026 — https://arxiv.org/abs/2601.00856 — critique — Grade B
     Reporting inconsistencies, unclear exclusions, limited methodological detail in [S24].

## Spoken communication

[S26] "Does Stress Impact Technical Interview Performance?" — Behroozi, Shirolkar, Barik, Parnin, ESEC/FSE 2020 — Nov 2020 — https://2020.esec-fse.org/details/fse-2020-papers/140/Does-Stress-Impact-Technical-Interview-Performance- — RCT, n=48 CS students — Grade A
     Being watched at a whiteboard more than halved performance; stress and cognitive load higher than solving privately.

[S27] "Calibration trumps confidence as a basis for witness credibility" — Tenney, MacCoun, Spellman, Hastie, Psychological Science 18:46–50 — 2007 — https://www.law.stanford.edu/publications/calibration-trumps-confidence-as-a-basis-for-witness-credibility — experiments — Grade A
     Once an error is exposed, confident sources lose more credibility than hedged ones; listeners judge calibration, not raw confidence.

[S28] Ranehill et al., power-posing replication, Psychological Science — 2015; Dana Carney public statement — 2016 — https://forrt.org/open-social-psychology/chapter27.html — replication + author retraction of belief — Grade A
     Larger replication found no hormonal or behavioural effects of power posing; original lead author said she does not believe the effects are real.

[S29] "Revisiting meta-analytic estimates of validity in personnel selection" — Sackett, Zhang, Berry, Lievens, Journal of Applied Psychology — 2022 — https://www.humrro.org/blog/is-cognitive-ability-the-best-predictor-of-job-performance-new-research-says-its-time-to-think-again/ — meta-analysis — Grade A
     After correcting range-restriction overcorrection, structured interviews rank as the top predictor of job performance.

[S30] "Smart People Ask for (My) Advice: Seeking Advice Boosts Perceptions of Competence" — Brooks, Gino, Schweitzer, Management Science — 2015 — https://sloanreview.mit.edu/?p=35844 — experiments — Grade A
     Asking for advice raises perceived competence when the task is hard and the advisor is the one being asked.

[S31] "The risks and rewards of speaking up: Managerial responses to employee voice" — Ethan Burris, Academy of Management Journal 55(4):851–875 — 2012 — https://instituteforpr.org/risks-rewards-speaking-managerial-responses-employee-voice — field + lab studies — Grade A
     Managers rate challenging voice (changing policy) lower in performance and endorse its ideas less than supportive voice; mediated by perceived threat and loyalty.

## Negotiation

[S32] "First offers as anchors: the role of perspective-taking and negotiator focus" — Galinsky & Mussweiler, JPSP 81(4):657–669 — 2001 — https://pubmed.ncbi.nlm.nih.gov/11642352 — three experiments — Grade A
     The first mover gets better outcomes; the advantage disappears when the receiver focuses on the mover's alternatives, reservation price, or their own target.

[S33] "Anchoring, Information, Expertise, and Negotiation: New Insights from Meta-Analysis" — Guthrie & Orr, Ohio State Journal on Dispute Resolution — 2006 — https://ir.vanderbilt.edu/handle/1803/7415 — meta-analysis of simulated negotiations — Grade A
     Correlation of ~0.50 between anchor and outcome; ~0.37 for experienced negotiators.

[S34] "Precise offers are potent anchors" — Mason, Lee, Wiley, Ames, Journal of Experimental Social Psychology — 2013 — https://business.columbia.edu/press-release/cbs-press-releases/new-research-shows-asking-precise-not-round-number-during — experiments — Grade A
     Precise numbers draw smaller counter-adjustments because the asker seems better informed.

[S35] "Starting high and ending with nothing: The role of anchors and power in negotiations" — Schweinsberg, Ku, Wang, Pillutla, JESP — 2012 — https://www.london.edu/faculty-and-research/academic-research/s/starting-high-and-ending-with-nothing-the-role-of-anchors-and-power-in-negotiations — experiments — Grade A
     Extreme first offers offend and cause impasses; low-power counterparts are the ones who walk.

[S36] "Who asks and who receives in salary negotiation" — Marks & Harold, Journal of Organizational Behavior — 2011 — https://news.temple.edu/node/9127 — study of employees' salary negotiations — Grade A (correlational)
     Those who negotiated reported higher starting salaries (~$5,000 per year in the press summary); preparation enabled more assertive strategies.

[S37] "Social incentives for gender differences in the propensity to initiate negotiations: Sometimes it does hurt to ask" — Bowles, Babcock, Lai, OBHDP 103(1):84–103 — 2007 — https://gap.hks.harvard.edu/social-incentives-gender-differences-propensity-initiate-negotiations-sometimes-it-does-hurt-ask — four experiments — Grade A
     Evaluators penalised women more than men for initiating compensation negotiations.

[S38] "Knowing When to Ask: The Cost of Leaning In" — Exley, Niederle, Vesterlund, Journal of Political Economy — 2020 — https://nber.org/papers/w22961 — lab experiment — Grade A
     People already choose to negotiate when it pays; pushing them to negotiate more did not help and pulled in negative-outcome negotiations.

## International audiences

[S39] Write for a global audience — Google developer documentation style guide — living doc (accessed 2026-10-03) — https://developers.google.com/style/translation — official style guide — Grade A
     Short, unambiguous sentences; active voice; no idioms, colloquialisms, humour, culture-specific references; avoid phrasal verbs.

[S40] Lev-Ari & Keysar, "Why don't we believe non-native speakers?", JESP — 2010; Souza & Markman failed replication — 2013; Boduch-Grabka & Lev-Ari replication — 2021; summarised in Journal of Cognition 2024 — https://journalofcognition.org/articles/353 — experiments + replications — Grade A
     Accented trivia statements judged less true in the original; one direct replication failed, a later one succeeded: effect real but fragile.

[S41] "GPT detectors are biased against non-native English writers" — Liang, Yuksekgonul, Mao, Wu, Zou, Patterns — July 2023 — https://arxiv.org/abs/2304.02819 — experiment — Grade A
     Seven detectors flagged 61.3% of 91 TOEFL essays by Chinese students as AI-written on average, while classifying U.S. eighth-grade essays correctly.
