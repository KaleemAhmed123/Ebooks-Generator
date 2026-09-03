# Todos

Open items, decisions parked for later, and anything worth writing down that
isn't a task doc. Task docs live in `docs/tasks/` and record *why* something
was built. This folder is just *what's left*.

Tick items off in place. Add a date when something moves.

## Approved, not started

- [ ] **Port the merged volume.** `tools/legacy/assemble-book.py` builds the
      single 1,193-page volume from all nine booklets; `tools/legacy/build-set.mjs`
      still holds the three set-level pages that open it — `masterCover()`,
      `copyrightPage()` and `contactSheet()`. Neither is wired into
      `tools/build.mjs`. Delete `tools/legacy/` once this lands.
      *Approved 2026-09-01.*

## Parked — you said later

- [ ] **Generate the copyright page from each book's own title.**
      `books/tech/typescript-to-deployment/frontmatter/03-copyright.md` is
      hand-written and names "TypeScript to Deployment". A religious or
      personal-growth book would print the wrong title. Build it from
      `meta.json` instead so it cannot be wrong.

- [ ] **Wire `shared/author/about-the-author.md` into every book.**
      The file exists and is meant to be the single bio for all domains, but
      nothing reads it yet — each series still carries its own copy in
      `frontmatter/`. Also: the current text is tech-specific ("Booklet 9 is
      that view written down") and will read oddly in another domain.

- [ ] **Write real pages in a new domain.** `books/religious/`,
      `books/personal-growth/` and `books/random/` have themes but no content,
      so none of those themes has ever been rendered against a real page.
      Expect to adjust them the first time.

## Production Terms — next up

See `docs/tasks/production-terms-ebook.md` for the whole plan.

- [ ] Booklet 02 Design & Distributed — 75 terms
- [ ] Booklets 04-08 — the remaining terse booklets
- [ ] Booklet 01 AI Engineering — 101 terms at full depth
- [ ] Booklet 03 Engineering Practice — research and write 54 new terms
- [ ] Cover data for the seven booklets that still have placeholders
- [ ] Verification pass on everything that ships

## Notes

- `pdf-snapshots/` (243MB, pre-restructure PDFs) is **not** in git. It exists
  only on this disk.
- `docs/tasks/reference/HTML-to-REACT.pdf` is deliberately gitignored — it is
  NgNinja's book, not ours to redistribute.
