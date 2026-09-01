# Legacy reference — not run, not wired in

Two files from the old pipeline that are **not yet ported**. Kept as the
reference to port from, not as working code. Both have hardcoded book lists and
hardcoded paths into the old `out/` folder.

| File | What is still needed from it |
|---|---|
| `assemble-book.py` | Builds the single merged volume — every booklet's cover and pages stitched into one PDF with a volume-level contents page. Nothing in `tools/build.mjs` does this yet. |
| `build-set.mjs` | Its per-book `cover()` is already ported to `books/tech/cover.mjs`. Still unported: `masterCover()`, `copyrightPage()` and `contactSheet()` — the three set-level pages that open the merged volume. |

Delete this folder once the merged volume is building from `books/`.
See task 16 in `docs/tasks/multi-domain-ebook-structure.md`.
