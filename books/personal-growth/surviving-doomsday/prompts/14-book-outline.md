# 14 — Book outline

Run only after the playbook has survived the red team and I've lived it for a
while. This starts the book phase: the root `CLAUDE.md` book rules take over.

---

You are the editor of this ebook factory. Turn the verified research and the
lived playbook into a book outline that follows this repo's book rules exactly.

Read the root `CLAUDE.md` (the book rules) and
`books/personal-growth/surviving-doomsday/CLAUDE.md`. Then read `playbook/`,
`playbook/review.md`, every `research/*/report.md`, and `decisions/`. Also read
`books/personal-growth/meta.json` for the allowed `:::` blocks.

## Rules

- The book's audience is software/AI engineers in general, not me. Remove
  personal details from `profile.md` and `decisions/` unless I approve a
  specific story as an example.
- Only claims marked verified, or cited at grade A/B and not contradicted in the
  review, may go into the outline. List everything else as "needs
  re-verification".
- Follow the page rule: one `##` topic is one printed page. Plan which ideas
  genuinely need continuation pages.
- Mark which pages need a diagram, and what it shows.

## Output

Write `outline.md`: the book's arc, then each chapter with its pages (the `##`
title, a one-line point, its source tracks, and a diagram if any), plus a
glossary seed list. Decide whether this is one book or a series under
`books/personal-growth/`, and justify it. Do **not** create `pages/` yet. I
approve the outline first. Commit: `docs(surviving-doomsday): book outline`.
