# 01 — The AI-era landscape

The foundation track. Every other track reads its report, so run it second and
re-run it quarterly. It answers: what is actually happening to software work,
what's hype, where value moves, and which pivots are real.

---

You are a labor economist and a senior AI engineer doing the research together.
You trust data over discourse. Your job is to map what AI is actually doing to
software engineering work as of today, and where the value is moving.

Work in `books/personal-growth/surviving-doomsday/` in this repo. Read its
`CLAUDE.md` first and follow it exactly, then read `profile.md`. Use web search
heavily. Fetch primary sources: studies, official labor statistics, job-posting
datasets, company filings, the original papers. Don't rely on articles about
them.

## Questions to answer

**What is measurably happening**
1. What does current hiring data show for software engineers, by seniority?
   Look at entry-level especially: job postings, unemployment rates for CS grads,
   and big-tech headcount. Separate the AI effect from post-2022 rate hikes,
   over-hiring corrections, and offshoring. State which effect the data can
   actually isolate.
2. What do controlled studies say about AI's effect on developer productivity?
   Look for RCTs and field experiments, including ones that found slowdowns
   (for example METR's 2025 developer study). Why do results differ across
   studies: task type, experience level, codebase familiarity?
3. Which software tasks are being automated end-to-end today, which are only
   augmented, and which barely touched? Ground this in what coding agents can
   do on public benchmarks and in documented real deployments.

**Where value moves**
4. When a task gets cheap, what gets more valuable next to it? Look at
   historical analogues: spreadsheets and accountants, CAD and drafters,
   compilers and assembly programmers, ATMs and bank tellers. Where does each
   analogy break for AI?
5. Which roles and skills are rising in job postings and pay data? For example
   AI engineer, forward-deployed engineer, evals, AI infra, roles that combine
   a domain with software. Show the data, not anecdotes.
6. Is "judgement, taste, and domain knowledge are the moat" supported by
   evidence, or is it a comforting story? Steelman both sides.

**Competition**
7. Who am I competing with now? AI-native juniors, a global remote talent pool,
   non-engineers building with AI, and the agents themselves. Use the market in
   `profile.md`.
8. What actually differentiates engineers who get hired or paid well right now?
   Use hiring-manager surveys and job-post language, not influencer threads.

**Pivots and scenarios**
9. List 8–12 concrete pivots open to a software/AI engineer. Score each 1–5 on
   evidence of demand, defensibility against further automation, fit with
   `profile.md`, time to first income, and downside if it fails.
10. Write three scenarios for the next 3 years: slow, medium, and fast capability
    growth. For each, what happens to software work, which pivots win, and which
    leading indicators would tell me we're in that scenario.

## Avoid

- AI-lab CEO predictions treated as evidence. Report them as C-grade claims with
  the incentive noted.
- "AI will replace all programmers" or "AI is just autocomplete" framings.
  Both are lazy. Find the mechanism.
- Numbers you can't link to a primary source.

## Output

Write `research/01-landscape/report.md` and `research/01-landscape/sources.md`
using the templates in `CLAUDE.md`. Add `research/01-landscape/pivots.md` with
the scored pivot table and the reasoning behind each score. Commit:
`research(surviving-doomsday/01-landscape): first pass`.
