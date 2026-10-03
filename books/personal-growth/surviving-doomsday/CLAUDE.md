# Surviving Doomsday — research rules

A book in the making: a playbook for **software/AI engineers surviving the AI
era**. It is personal first. I test it on myself before it gets written up.

It has two phases. In each phase, a different rule set wins:

1. **Research phase:** `research/`, `decisions/`, `playbook/`, `profile.md`.
   The rules below apply. The root book rules don't.
2. **Book phase:** `pages/`. Only once the playbook has survived the red team.
   The root `CLAUDE.md` book rules apply in full, and pages are written only
   from claims already verified in `research/`.

No `pages/` folder exists yet, so the build ignores this folder on purpose. The
first page created turns it into a book.

## Where things live (paths relative to this folder)

```
profile.md                       who I am, what I have, what I want (from prompt 00)
prompts/                         the prompt pack; see README.md for run order
research/<NN-track>/report.md    one report per track, on the template below
research/<NN-track>/sources.md   every source the report cites
decisions/YYYY-MM-DD-<topic>.md  what I decided in a brainstorm, and why
playbook/                        the synthesis; written only from research/ + decisions/
pages/                           later: the book itself (root CLAUDE.md rules)
```

## Research rules

- **Search before you write.** Never write from memory. Every factual claim cites
  a source in `sources.md` as `[S#]`.
- **Date everything.** Put "As of YYYY-MM-DD" at the top of every report. Mark
  claims that will age (jobs data, tool rankings, prices) with their date.
- **Grade the evidence.** Each source gets a grade:
  - **A** — primary data, peer-reviewed study, RCT, official statistics, original docs
  - **B** — credible reporting or a practitioner with a public track record
  - **C** — opinion, anecdote, viral post, vendor marketing
  A conclusion that rests only on C sources has to say so.
- **Look for the counter-case.** For every major claim, search for the strongest
  evidence against it. Put real disagreements under "Where sources disagree".
  Don't quietly pick a side.
- **Watch for bias.** Founder success stories, "I quit my job and made $X MRR",
  and AI-lab predictions about their own products are survivorship or incentive
  bias until better evidence backs them.
- **Label inference.** Use "the evidence shows" only when it does. Use "I infer"
  or "plausibly" when you are reasoning past the sources.
- **Unverifiable? Cut it.** A missing point beats a wrong one. This is strict
  for numbers, dates, and quotes.
- **No hype, no filler.** The root voice rules hold here too: no "delve",
  "robust", "game-changer", "unlock", no throat-clearing. Start with the claim,
  prove it, stop.

## Report template (`research/<NN-track>/report.md`)

```markdown
# <Track name>
> As of YYYY-MM-DD · Status: draft | reviewed

## Bottom line
At most 5 bullets. Each ends with (confidence: high/medium/low).

## What the evidence says
Claims grouped by question, each cited [S#] with its grade.

## Where sources disagree
The real disagreements, both sides, and what would settle them.

## Myths and hype to ignore
Popular claims the evidence does not support, with why.

## What to do
A table: practice · how to do it · cadence · how to measure it · evidence grade.

## Leading indicators
Signals to watch that would change these conclusions.

## Questions for me
5–10 sharp questions for my brainstorm session, tied to profile.md.
```

## Sources template (`research/<NN-track>/sources.md`)

```markdown
[S1] Title — Author/Org — Published date — URL — Type (study/data/docs/essay/post) — Grade A/B/C
     One line: what this source contributes.
```

## Done means

- Every claim in the report cites a source. Every source is in `sources.md`.
- The counter-case was searched for and reported.
- "What to do" holds concrete practices, not slogans.
- Committed with a message like `research(surviving-doomsday/02-judgement): first pass`.
