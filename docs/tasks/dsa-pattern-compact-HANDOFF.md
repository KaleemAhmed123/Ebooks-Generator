# Continuation prompt — DSA 02 Pattern Recognition, compact pass

Paste everything below the line into a new chat.

---

I'm continuing work on the DSA "Pattern Recognition" booklet in this repo:
`books/tech/DSA/02-pattern-recognition/`, branch `claude/bold-thompson-eb0v86`.
Do not merge to main until I say so.

## Read first, in this order
1. `CLAUDE.md` at the repo root: house rules, voice, "one markdown file = one printed page", primary sources only, run every code sample.
2. `docs/tasks/dsa-pattern-compact.md`: **the current task**, with my decisions and the plan. Append a dated update after each step. Never rewrite old entries.
3. `docs/tasks/dsa-pattern-audit.md`: the earlier audit and the elevation pass, including its "Explanation" section.
4. `docs/tasks/dsa-pattern-expansion.md`, section "Standing decisions".
5. The Chapter 2 pilot pages, `pages/02-*`. **They are the approved model for every other chapter.** My review PDF of them is `dist/tech/DSA/02-pattern-recognition-ch02-pilot.pdf` (rebuild it if it's missing).

## Where things stand (2026-09-27)
- The branch has about 278 pages; `main` has 69. **My target is 150–180 pages: the same knowledge, taught compactly. Cut repetition, not patterns.**
- **Chapter 2 is done in the new style** (commits `376aaa2` and `d1013cf`). Chapters 3–19 still have the old, long format.
- The book has 54 numbered patterns. Their labels live in `meta.json` → `patterns`, keyed by page ID. A key can also be a full file-name stem; that's how intro pages get an "overview" label.
- The build prints page IDs, lists them in the contents, and links in-book references (`tools/build.mjs`, switched on by `pageIds` in `meta.json`).

## My decisions — follow these exactly
1. **Every pattern page uses the compact style** (see `02-02` … `02-10`):
   - **What** (one line) · **Spot it** (the statement cues, with "X → page" for the look-alike folded in) · **Why** (the invariant, one line)
   - the diagram, where it shows the mechanism
   - a short, crisp template: the core loop only
   - **Watch out:** the one real trap, with its tiny input
   - **Also solves:** 2–5 linked problems on one line
   - An interview block only where it adds a real follow-up. It's not a fixed rule: a hard concept may take 2 pages.
2. **Pattern intro pages for the WELL-KNOWN patterns only** (about 20 in total), in the style of `02-01-sliding-window-1/2` and `02-08-0-two-pointers`, which copy my old main-branch "family" page:
   - What it is / Signal / Mechanism
   - "The moves" table (move · when to use · what it exploits)
   - a short skeleton
   - "The trap"
   - An intro placed before its first move uses file name `NN-MM-0-name.md` plus a `meta.json` label keyed by that file stem, ending in "· overview".
   - Known patterns to cover: Prefix Sum, the in-place tricks, Matrix, String keys, Intervals, Greedy, Binary Search, Stack / Monotonic Stack, Bits, Linked List pointers, Recursion / Backtracking, Tree DFS/BFS, Heap / Top-K, Graphs, DP, plus chapters 18–19.
3. **Drills:** one page per chapter, 8–11 of the most-asked problems, titled and linked, in the format `| Problem | Page · the deciding fact |`. **No disguised statements.** A problem appears in only one drill page in the whole book.
4. **Front matter:**
   - Drop the keyword index (`01-05-*`) and the look-alikes page (`01-06`).
   - Drop the generated contents page: add a per-book switch in `tools/build.mjs`.
   - `01-02` "The 54 patterns" becomes the contents: make its rows clickable links to `#p-NN-MM`.
   - Keep `01-01`, `01-03`, and the `01-04` chart. Update the chart if pages move.
5. **Drop the five checkpoint pages** (`04-08`, `08-09`, `11-05`, `14-12`, `17-08`).
6. **Keep chapters 18–19, compacted.**
7. **Plan first:** tell me the plan and any open questions before large edits, and ask before anything irreversible. Commit in small groups with short, plain messages.

## Page IDs are no longer printed (decided 2026-09-27)
- `meta.json` has `"pageIdsInText": false`, so the build turns an in-book ID into a link showing the target page's **title** ("→ 03-03" prints "→ Equal Prefixes"). The corner ID is hidden in `theme.css`.
- **When writing, use a bare ID where the title reads naturally** ("→ 03-03"). Never write "name (ID)": that prints the name twice. In tables write `**02-02**` alone.
- IDs drawn inside SVG diagrams are **not** converted, so write move names in diagrams. Still to do: `01-04` chart chips and the `01-02` map's page column (show names or printed page numbers instead), and any chapter diagram that shows IDs.

## Token budget: I care about this
- Do the work **yourself, chapter by chapter**. No parallel subagents unless I ask; they burned a lot of tokens last time.
- Reuse the helpers in `docs/tasks/reference/dsa/scripts/`:
  - `compact.py` + a spec like `spec-ch02.py`: rewrite a chapter. Old diagrams and templates are reused by page ID, and `{LC n}` expands to a linked live title.
  - `lc-map.json`: LeetCode number → title, slug, paid flag. `gfg-index.json`: all GFG practice problems (title, url).
  - `map-svg.mjs` (the 01-02 map), `chart-svg.mjs` (the 01-04 chart), `index-gen.mjs` (being dropped), `link.mjs`.
  - Paths inside them may point at the old scratch folder, so fix them before running.

## Checks after each chapter
- `node tools/build.mjs 02-pattern-recognition` must print **no `overflow` lines**. Only the full PDF build checks overflow; `--html` does not.
- Never run `--split`: it re-cuts every page.
- Any template you change: run it against a brute force with `node --experimental-strip-types`.
- Duplicate drill problems: `grep -ohE "\]\(https://[^)]+\)" pages/*drill*.md | sort | uniq -d` must print nothing.
- When a page ID changes or a page is deleted, grep for references to it (the `01-04` chart, "→ NN-MM" lines) and fix them.
- `node tools/check-pages.mjs books/tech/DSA/02-pattern-recognition`: ignore its "Module N heading" and "0 ## headings" false positives; fix any banned-word or throat-clearing hits.

## How to talk to me
Follow `~/.claude/CLAUDE.md`:
- plain English and bullets; explain each term once;
- end every substantial reply with **What I achieved / What I need from you / Next steps**;
- after implementing, give the 7-part walkthrough.

## Next step
Start with **Chapter 3 (Prefix & Running State)** in the Chapter 2 style: a Prefix Sum intro page plus the compact move pages. Show me the page count and a PDF of that chapter's pages, then continue chapter by chapter.
