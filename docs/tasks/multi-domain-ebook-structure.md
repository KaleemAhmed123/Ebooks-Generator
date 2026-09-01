# Multi-domain ebook structure

**Status:** in progress
**Started:** 2026-09-01
**Last updated:** 2026-09-01

---

## What you asked for

> "In this project I will be using this existing tech for different domains —
> religious, personal growth, random topics — and there will be many more
> domains added, and they will have different styling and other visual things.
> How should we organize the project so we utilize the approach in a great way?
> Proper folder and file structure, reusable stuff and so on."

Constraints you gave, in your words:

- Styling differs **"everything, including layout"** per domain.
- Within a domain, books differ **"rarely, one-offs."**
- A website or reader is **"later, maybe"** — files are the product today.
- Content is written by **"me + AI agents."**
- Existing 12 tech books get **moved into the new layout.**
- Non-Latin script: **"maybe, some quoted verses only"** (Arabic in English pages).
- `:::` blocks: **"each domain declares its own."**
- Tooling: **"project root, split from content."**
- Hierarchy: **domain → series → book.**
- Front matter: **"shared author, per-book rest."**
- Glossary: **"by hand but AI helps me there."**
- Diagrams: **"keep hand-written SVG only."**
- EPUB: **"PDF is the product."**
- Output: **grouped by domain/series.**
- Verification: **"can we not just mention in prompt and it does it."**
- Git: **restructure first, initialize and commit after.**

Random-topic domain holds unrelated subjects — NLP, Gut Health Optimisation,
Hairfall Research, Gym Supplements, Ayurveda, YouTube Content Making — each of
which needs its own look.

---

## Open questions

| # | Question | Recommended | Your answer |
|---|---|---|---|
| 1 | How deep does per-domain styling go? | Allow full | **Everything, including layout** |
| 2 | Do books differ inside one domain? | Optional override | **Rarely, one-offs** |
| 3 | Website or reader app? | Files only | **Later, maybe** |
| 4 | Who writes the markdown? | — | **Me + AI agents** |
| 5 | What happens to the 12 tech books? | Move | **Move into new layout** |
| 6 | Non-Latin script or RTL? | — | **Maybe, quoted verses only** |
| 7 | How do `:::` blocks work per domain? | Domain-declared | **Domain declares its own** |
| 8 | Where does build tooling live? | Project root | **Project root** |
| 9 | How are covers made? | Keep current | **Claude-generated, guided by me** |
| 10 | Which domains on day one? | — | **tech, religious, personal-growth, random (+ subdomains)** |
| 11 | Page size per domain? | Default 148×210 | **"A little bigger in some cases"** |
| 12 | What would make you reject it? | — | Content quality bar, see `CLAUDE.md` |
| 13 | Is "random" a real domain? | — | **Yes, with many unrelated subdomains** |
| 14 | Per-book brief for agents? | Yes | **Turn my standards into agent instructions** |
| 15 | Build the verify subagent pipeline? | Later | **Put it in the prompt** |
| 16 | Does EPUB matter? | — | **PDF is the product** |
| 17 | Output naming? | — | **Grouped by domain/series** |

---

## Plan

### The problem being solved

The book list was duplicated across **four** files, each holding a different
slice of the same data:

| File | Held |
|---|---|
| `docs/ebook/book.config.json` | dir, title, cover subtitle |
| `docs/ebook/covers/build-set.mjs` | accent, page count, banner, kicker, terminal, stack, face |
| `docs/ebook/covers/make-booklet-covers.py` | dir, title, companion flag |
| `docs/ebook/covers/assemble-book.py` | dir, title, colour |

Adding one book meant editing four files in agreement. Page counts
(`pages: 85`, `TOTAL_PAGES: "1,193"`) were typed by hand and went stale on
every rebuild. Styling was a single global `theme.css`.

That, not styling, was the thing that would break at five domains.

### The structure

```
Ebook Management/
├─ books/                                 all content
│  ├─ tech/
│  │  ├─ meta.json                        blocks: mint, note, interview
│  │  ├─ theme.css                        the tech look
│  │  ├─ typescript-to-deployment/        multi-book series
│  │  │  ├─ meta.json                     series title, order, masterVolume
│  │  │  ├─ frontmatter/                  preface, copyright
│  │  │  ├─ backmatter/                   glossary A–Z, final note
│  │  │  └─ 01-typescript/
│  │  │     ├─ meta.json                  title, subtitle, cover data
│  │  │     └─ pages/*.md                 one file = one printed page
│  │  ├─ frontend-mastery/                one-book series: has its own pages/
│  │  ├─ vps-mastery/
│  │  └─ react-ai/
│  ├─ religious/
│  ├─ personal-growth/
│  └─ random/                             ayurveda/, nlp/, gut-health/ …
├─ shared/
│  ├─ about-the-author.md                 one bio for every book
│  ├─ base.css                            structural rules, never varies
│  └─ defaults.json                        page size, author, running header
├─ tools/
│  ├─ build.mjs   migrate.mjs
│  └─ package.json   node_modules/
├─ dist/                                  output, grouped by domain/series
├─ CLAUDE.md                              the writing standard, auto-loaded
└─ docs/tasks/                            planning only, no content
```

### The flow

```
   books/tech/typescript-to-deployment/01-typescript/pages/*.md
                          │
                          │  one .md file = one <section class="page">
                          ▼
   ┌──────────────────────────────────────────────────────────┐
   │  discover()   walk books/, a folder with pages/ is a book│
   └──────────────────────────────────────────────────────────┘
                          │
                          ▼
   ┌──────────────────────────────────────────────────────────┐
   │  cascade()    walk the folder chain top-down             │
   │                                                          │
   │   shared/defaults.json ─┐                                │
   │   tech/meta.json ───────┼─► merged config (page, blocks) │
   │   series/meta.json ─────┤                                │
   │   book/meta.json ───────┘                                │
   │                                                          │
   │   shared/base.css ──────┐                                │
   │   tech/theme.css ───────┼─► concatenated CSS, last wins  │
   │   series/theme.css ─────┤                                │
   │   book/theme.css ───────┘                                │
   └──────────────────────────────────────────────────────────┘
                          │
                          ▼
   containers()  :::blocks from config ─► <div class="…">
   protectSvg()  hand-written <svg> held out of the markdown parser
   marked()      markdown ─► HTML
   anchored      h1/h2 collected for the contents page
                          │
                          ▼
   ┌──────────────────────────────────────────────────────────┐
   │  measure TOC height ─► how many pages sit before page 1  │
   │  reassemble with correct printed page numbers (3 passes) │
   └──────────────────────────────────────────────────────────┘
                          │
                          ▼
   ┌──────────────────────────────────────────────────────────┐
   │  generated @page geometry appended LAST, so trim size    │
   │  always agrees with what Chrome is told to print         │
   └──────────────────────────────────────────────────────────┘
                          │
                          ▼
              Chrome (headless) ─► dist/<domain>/<series>/<book>.pdf

   --split branch:  measure every page ─► any page taller than the trim
                    is cut before the last heading that fitted, or at the
                    nearest safe blank line, never inside a :::block,
                    an <svg>, or a code fence.
```

### Rejected alternatives

| Rejected | Why |
|---|---|
| React `core-ui` / `features` structure (proposed by another agent) | There is no web app in this project. It answered a question that was never asked. |
| Keeping a central book list, just nested | The duplication was the actual problem. Deleting the list beats maintaining a nicer one. |
| Separate `book.json` / `series.json` / `domain.json` names | Three names to remember. One name, `meta.json`, at every level is one sentence to explain to an agent. |
| `frontend-mastery/frontend-mastery/pages/` for standalone books | Doubled folder names. Instead: a series folder with its own `pages/` **is** a one-book series. |
| Auto-generated glossary from inline terms | You want it hand-written with AI help. |
| Mermaid diagram support | You want hand-written SVG only. |
| Styled EPUB | PDF is the product. Themes keep full print CSS freedom as a result. |
| Automated verification pipeline | Instructions in `CLAUDE.md` cost nothing and cover it. Build a pipeline when pages actually slip through. |
| Splitting `theme.css` into print/screen halves | Only needed for styled EPUB, which is out of scope. |

---

## Tasks

- [x] 1. Create skeleton: `books/`, `shared/`, `tools/`, `dist/`
- [x] 2. `shared/base.css` — structural rules only
- [x] 3. `shared/defaults.json` — page size, author, running header
- [x] 4. `shared/about-the-author.md` — one bio for every book
- [x] 5. `books/tech/theme.css` — today's theme, copied verbatim
- [x] 6. `tools/migrate.mjs` — copy content, merge the four book lists into `meta.json`
- [x] 7. Run migration — 12 books, 1,921 pages copied, source untouched
- [x] 8. `tools/build.mjs` — folder walk, both cascades, config-driven blocks
- [x] 9. Verify `01-typescript` rebuilds identically (85 pages, text identical)
- [x] 10. `CLAUDE.md` — the writing standard
- [x] 11. This task file
- [x] 12. Full `--all` rebuild and compare every book against `out/` — 12/12 identical
- [x] 13. Per-domain cover generators; cover art data moved into each `meta.json`
- [ ] 14. Generated copyright page from each book's own title
- [x] 15. Computed page counts fed to covers (kills stale `pages:` / `TOTAL_PAGES`)
- [ ] 16. Master-volume assembler ported to the new layout
- [x] 17. Scaffold `religious/`, `personal-growth/`, `random/` starter themes
- [x] 18. `git init` + first commit — project config only, 38 files
- [x] 18b. Committed the content pages — 1,950 markdown files
- [x] 19. Removed `docs/ebook/` and everything dead inside it; `out/`+`out2/` archived to `pdf-snapshots/`

---

## Updates

### 2026-09-01 — structure built, tech domain migrated, output proven identical

Built the skeleton, wrote the new build, migrated all 12 tech books by **copy**
(not move), and confirmed the output is unchanged.

Deviation from the original plan, and why: the theme cascade gained a **fourth
layer**. The plan had `shared → domain → book`. Your answer to question 13 —
that "random" holds NLP, Ayurveda, Gym Supplements and YouTube content, all of
which need different looks — meant the domain was the wrong place to pin a
look. Adding the **series** layer fixed it at zero cost, because the build was
already walking the folder chain. It improved tech too: the series is now where
"TypeScript to Deployment" pins its pink/yellow, so a future tech series can
look completely different without a fight.

Also deviated on git. You asked to restructure first and commit after. Rather
than re-argue, the migration **copies** instead of moving, so `docs/ebook/`
still holds every original file. Deleting `books/` returns the project to
exactly where it started. That is the same undo path git would give.

Verification run: `01-typescript` rebuilt from the new structure is 85 pages,
same as `out/01-typescript.pdf`, with text identical on every page. File sizes
differ by 14 bytes, which is the PDF creation timestamp.

---

## Explanation

*Written when the remaining tasks ship.*

### 2026-09-01 (later) — full rebuild verified, all 12 books identical

Rebuilt every book through the new pipeline and compared page-for-page against
the existing PDFs.

| Book | Pages | Text |
|---|---|---|
| 01-typescript | 85 | identical |
| 02-nextjs | 56 | identical |
| 03-node-core | 84 | identical |
| 04-ecosystem | 170 | identical |
| 05-data | 52 | identical |
| 06-api-design | 65 | identical |
| 07-ai-sdks | 161 | identical |
| 08-deployment | 383 | identical |
| 09-ai-practices | 103 | identical |
| frontend-mastery | 385 | identical |
| vps-mastery | 371 | identical |
| react-ai | 39 | identical to a fresh old-script build |

`react-ai` was the one that first looked wrong: 39 pages new against 40 in
`out/`. It was not a regression. The stored `out/react-ai.pdf` predates the
change that stopped listing `h3` sub-headings on the contents page — its
contents ran to 87 lines over two pages, against 37 lines on one page now.
Rebuilding `react-ai` with the **old** `docs/ebook/build.mjs` produced 39 pages
with text identical to the new pipeline, which settles it. `out/react-ai.pdf`
is a stale artifact.

Zero overflow warnings across all 1,921 pages, so no page needs re-splitting
under the new build.

Also scaffolded three starter domains — `religious` (156x234mm, serif, gold
rules, `:::verse` / `:::source` / `:::reflection`, and an inline `[lang=ar]`
rule for quoted Arabic), `personal-growth` (sans, `:::exercise` /
`:::takeaway`), and `random` (deliberately plain, because its series supply
their own looks). `books/random/ayurveda/theme.css` is a worked example of a
series-level theme: 30 lines, mostly just redefined tokens.

### 2026-09-01 (later still) — covers ported, git initialized

**Covers.** The tech cover generator moved from `docs/ebook/covers/build-set.mjs`
to `books/tech/cover.mjs`, and each book's cover art data now lives in its own
`meta.json`. 11 of 12 books draw a cover; `react-ai` never had cover data and
keeps its plain markdown cover until some is written.

Two numbers on every cover are now **counted, not typed**: the page total and
the "+ N MORE TOPICS INSIDE" figure. For 01-typescript the topic count came out
at 67 against the 61 that had been typed in by hand, so that value had drifted.

**A cover cannot live inside the book's own HTML.** The first attempt printed
the drawn cover as page 1 of the same document, which needed no PDF merging at
all. It failed for a reason worth recording: Chrome stamps the running header
and footer on every page it prints and offers no way to skip one, so the header
printed straight across the artwork. The full-bleed negative-margin trick also
mis-registered. So the cover is rendered on its own at zero margins and swapped
in for page 1 afterwards — which is what the original `make-booklet-covers.py`
did, and now the reason is documented rather than rediscovered.

Swapping rather than inserting is deliberate: the book has already printed its
plain cover as page 1 of N, so replacing that page keeps every footer number
correct.

**One migration bug found and fixed.** `09-ai-practices` silently lost its cover.
The matcher in `tools/migrate.mjs` stripped non-alphanumerics from the title
before comparing, turning "AI-Assisted" into "aiassisted", which matched
nothing. Cover data restored from source; the matcher no longer strips hyphens.
All 11 covers verified against the original accent colours.

**Completeness check before considering any deletion:** 1,950 markdown files in
`docs/ebook`, 1,950 in `books/`, zero missing, all md5-identical.

**Git initialized.** First commit is project config only, 38 files, 5,724 lines
— tooling, themes, `meta.json` files, `CLAUDE.md`, task docs. `.gitignore`
excludes `node_modules/`, `dist/`, `pdf-snapshots/` and build scratch. Content
pages, `shared/author/` and the old `docs/ebook/` tree are deliberately unstaged.

**`shared/about-me/` folded into `shared/author/`** — the bio at
`shared/author/about-the-author.md`, the raw material in
`shared/author/sources/`. Left out of the first commit because the sources
include a personal resume and PDF.

### 2026-09-01 (final) — old tree removed, docs is notes only

Removed `docs/ebook/`. It had become a second copy of every content file, which
is worse than clutter: an edit made in the wrong copy never reaches a PDF.

Checked before removing — 1,950 markdown files on each side, md5-identical,
none unaccounted for, and `theme.css` matched `books/tech/theme.css` exactly.

Kept two files as `tools/legacy/`, because they are the only things in the old
tree that were never ported:

- `assemble-book.py` — builds the single merged volume. Nothing in the new
  build does this yet.
- `build-set.mjs` — its per-book `cover()` is ported; `masterCover()`,
  `copyrightPage()` and `contactSheet()` are not.

Everything else removed was superseded or dead: the old `build.mjs`,
`theme.css`, `book.config.json`, the package files, three `.bak` files, a
`grep.exe.stackdump`, a duplicate `node_modules`, and `compile-frontend.py`
whose hardcoded paths pointed at a folder that no longer exists.

Verified after removal: `05-data` rebuilt to 52 pages with its cover drawn.

`docs/` now holds `docs/tasks/` and nothing else.

**Git history so far:**

| Commit | What |
|---|---|
| `4e4b265` | Project config — tooling, themes, meta.json files, CLAUDE.md, task docs |
| `ca8b1fe` | The book content — 1,950 markdown pages plus the author bio |
| `b21a909` | Removal of the old duplicate tree |

`.gitignore` excludes `node_modules/`, `dist/`, `pdf-snapshots/` and build
scratch. Repo is 1,996 tracked files; the working tree is 331MB, almost all of
it `pdf-snapshots/` and `dist/`, neither of which is in git.
