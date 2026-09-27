# DSA 02 — Pattern Recognition: compact pass

**Status:** in progress — Chapter 2 pilot
**Started:** 2026-09-27 · **Last updated:** 2026-09-27
**Branch:** `claude/bold-thompson-eb0v86`

## What you asked for

> The book is too big (69 pages on main, ~286 on the branch). Same knowledge, taught
> more compactly; 150–180 pages. Keep all 54 patterns, diagrams and short templates.
> The nine fixed headings are overkill; a page uses only what it needs, and a hard
> concept may take two pages. A reader should get the idea in seconds.

## Decisions (your answers)

| # | Question | Answer |
|---|---|---|
| 1 | Front matter | Drop the keyword index and look-alikes; "The 54 patterns" replaces the generated contents page |
| 2 | Page style | Compact and flexible, not nine fixed headings; keep diagrams and templates |
| 3 | Templates | Keep, short and crisp (the core loop) |
| 4 | Drills | Back to linked titles, fewer rows, the most-asked problems; no disguised statements |
| 5 | Checkpoints | Drop |
| 6 | Interview block | Only where it adds a real follow-up |
| 7 | Rollout | Pilot Chapter 2, with a PDF of those pages for review, then the rest |
| 8 | Ch 18–19 | Keep, compacted |

## Plan

Page shape (a guide, not a rule):
- **What** (one line) · **Spot it** (statement cues; "not this if" folded in) · **Why** (the invariant)
- Diagram, where it shows the mechanism
- Template: the core loop, about 10–15 lines
- **Watch out:** the one failure, with its tiny input
- **Also solves:** 2–3 linked problems on one line
- Interview block only where it adds a real follow-up

Budget: front ~4 · pattern pages ~115 · openers ~12 · drills ~18 → about 150–155.

## Tasks

- [x] 1. Pilot: Chapter 2 in the compact style; PDF of its pages for review
- [ ] 2. You approve or adjust the style
- [ ] 3. Chapters 3–19 in the approved style
- [ ] 4. Front: drop the index and look-alikes; turn off the contents (per-book switch); make the 54-pattern map clickable
- [ ] 5. Drop the checkpoints; rebuild the drills as linked titles, 8–10 rows
- [ ] 6. Build 0 overflow, checker, duplicate check, re-run the front generators

## Updates

- 2026-09-27 — task opened; decisions recorded.
- 2026-09-27 — Chapter 2 pilot: 25 files → 11 pages. 02-11's decision chart moved
  into the 02-01 opener (the 01-04 chip now points to 02-01). Each pattern is one page:
  What · Spot it (with "not this" folded in) · Why, diagram, template, Watch out,
  Also solves. The interview block is kept only on 02-03 (as a one-line follow-up).
  Drills: 11 most-asked problems, titled and linked. Two templates tightened (02-05,
  02-10) and re-run against a brute force: 3,000 cases, 0 failures. Book 276 pages,
  0 overflow. Review PDF: `dist/tech/DSA/02-pattern-recognition-ch02-pilot.pdf`.
- 2026-09-27 — pattern intro pages, at the level of well-known patterns (your call),
  modelled on the main-branch family page: Sliding Window (02-01, 2 pages) and Two
  Pointers (02-08-0). `tools/build.mjs` lets a label be keyed by file stem, so an intro
  sharing an ID shows "overview". Chapter 2 is 13 pages; pilot PDF is
  `dist/tech/DSA/02-pattern-recognition-ch02-pilot.pdf`. Helpers and lookup tables
  are copied to `docs/tasks/reference/dsa/scripts/`. Continuation prompt:
  `dsa-pattern-compact-HANDOFF.md`.
