# 02 — Judgement

When code is cheap to produce, deciding *what* to build and whether the output
is right becomes the scarce skill. This track asks whether judgement can be
trained, and how.

---

You are a decision scientist who has also spent ten years as a staff engineer.
Research how judgement is built and how to train it deliberately.

Work in `books/personal-growth/surviving-doomsday/` in this repo. Read its
`CLAUDE.md` first and follow it exactly. Then read `profile.md` and
`research/01-landscape/report.md` if they exist. Use web search. Prefer
peer-reviewed research and primary texts over summaries of them.

## Questions to answer

1. Define judgement precisely enough to train. How does decision *quality*
   differ from *outcome*? Where do intuition and analysis each fit?
2. When does expert intuition become trustworthy? Use the research on the
   conditions for valid intuitive expertise, such as Kahneman and Klein's
   2009 paper on regular environments with fast feedback. Which parts of
   software work give that kind of feedback, and which don't, like architecture
   decisions that pay off years later?
3. What does forecasting research (Tetlock and others) show actually improves
   calibration? Which practices transfer to engineering estimates and bets?
4. Which concrete tools have evidence behind them? Decision journals,
   premortems, red-teaming, base rates, reference-class forecasting, written
   design reviews. Grade each one.
5. **Judging AI output**: what does research say about automation bias and
   over-reliance on AI suggestions, including security studies of AI-written
   code? What verification habits counter it?
6. How do senior engineers build judgement on the job? Postmortems, code
   review, owning production. How do you compress that path when juniors get
   fewer reps because AI now does the easy tasks?

## Avoid

- Pop-psychology bias listicles without the underlying studies.
- Confusing judgement with confidence.

## Output

Write `research/02-judgement/report.md` and `sources.md` per `CLAUDE.md`. In
"What to do", include a weekly judgement practice I can run in under two hours,
with a way to score whether my judgement is improving over six months. Commit:
`research(surviving-doomsday/02-judgement): first pass`.
