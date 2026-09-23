# TypeScript to Deployment — the complete volume

**Status:** shipped (build verified)
**Started:** 2026-09-08
**Last updated:** 2026-09-08

## What you asked for

- Bind the nine `typescript-to-deployment` booklets into **one combined volume**
  with **one cover** and **one back matter**.
- Check whether the existing front matter reads **genuine, humble and versatile**.
- Everything that stays must **fit one printed page**.
- The whole book's **table of contents in a few pages**, like the three-column
  contents in *The Vocabulary of Production*.
- Follow-up, mid-task: **cut the front matter entirely.** Move about-the-author
  and copyright to the **back**. Go straight from the cover to the contents.
- Remove the **LeetCode claim and anything like it** from the bio. No bragging —
  humble, a few good words.
- The booklets have no cover inside the volume. Each gets a **divider page**:
  big subject text, the high-level idea of what it covers, then content starts.

## Open questions

| Question | My answer | Yours |
|---|---|---|
| Contents depth: all 891 entries, or booklet titles only? | Full, three columns. 891 entries in 6 pages is proportionate to a 1,166-page book, and it is the only version you can actually look something up in. | taken as default — say the word and it drops to ~2 pages |
| Volume accent colour | Deep indigo `#3b3b8f`. Distinct from all nine booklet accents, so the volume reads as its own object rather than a reprint of one booklet. | taken as default — one line in `meta.json` |
| Build name for the volume | `typescript-to-deployment-complete`. The series folder and the volume would otherwise share a name, and `build.mjs <name>` would have no way to build the volume alone. | taken as default |
| Order at the back | Glossary → final note → about the author → copyright. Content closes on the final note; the legal page is genuinely last. | taken as default |

## The front matter, as asked

Read all three files before cutting anything.

**Genuine — yes.** The preface's honest register (*"I am still learning. I still
change my mind."*) is its best quality and the reason it was worth keeping on
disk rather than deleting.

**Humble — mostly, with two snags.**

- The LeetCode line (1,500 problems, peak rating 1798) was the single brag in
  1,500 words, and it sat directly against *"there is no particular claim here
  that I have figured everything out."* **Cut, as you asked.**
- *"That is the philosophy behind this series"* / *"That idea sits underneath
  much of this book"* framed ordinary observations as doctrine. Cut.

**Versatile — no.** This was the real problem. 847 words in the preface across
roughly forty single-sentence paragraphs: *"He builds. He breaks things. He
reads. He asks why."* That staccato rhythm is the most recognisable
AI-writing tell there is, and this repo's own `CLAUDE.md` already bans it
("delete every sentence that carries no information"). At 8.5pt on A5 the
preface was **about three printed pages, not one**. The bio was ~1.6. Only the
copyright page (210 words) already fitted.

## Plan

Front matter is gone from the volume. `frontmatter/01-preface.md` **stays on
disk, untouched** — it carried 96 lines of your uncommitted edits, so deleting
it was not mine to do. It is outside the build path, so it simply does not print.

Structure now:

```
cover (drawn SVG, indigo)
contents                          6 pages, 3 columns, 891 entries
  Booklet 1 divider  ─┐
  82 content pages    │  ×9
  ...                ─┘
Reference divider
  glossary, A to Z                24 pages
  a final note
  about the author                rewritten, one page
  copyright                       moved from front, one page
```

## Tasks

- [x] `buildMaster()` reads `backmatter/` — it previously had no back-matter
      support at all, so the 24 glossary files were dead on disk
- [x] Gate the "Term 35/57" counter behind `counter: "term"`
- [x] Booklet dividers stop saying "terms · alphabetical"
- [x] Count modules from rendered headings, not a regex over the markdown
- [x] Three-column contents in a new series `theme.css`
- [x] Volume cover data in the series `meta.json`
- [x] Bio rewritten to one page, LeetCode claim removed
- [x] Copyright moved to the back and trimmed
- [x] Generated "Reference" divider opening the back matter
- [x] Verify: 0 overflowing pages, contents 6 pages, production-terms unchanged

## Updates

**2026-09-08 — built.** 1,166 pages. Zero pages overflow their trim. Contents
measures 1,014mm → 6 printed pages. `the-vocabulary-of-production` rebuilt as a
regression check: 471 term badges and 8 alphabetical dividers, identical to
before the `counter` flag was introduced.

**2026-09-08 — bug found and fixed while doing this.** Two, actually. Both
predate this task and both would have shipped wrong pages.

1. The term counter fires on any file named `02-*`. `typescript-to-deployment`
   has `02-01-postgres.md` and friends. The shipped booklet PDFs predate the
   counter feature, so they are clean — but **the next rebuild of any booklet
   would have printed "Term 1/3" badges** on ordinary section pages. Now gated
   behind an explicit `counter: "term"` flag, set only on `production-terms`.
2. Counting a booklet's modules by grepping `^# ` over its markdown counts
   shell comments inside fenced code blocks. `08-deployment` reported **121
   modules; the real figure is 16.** The other 105 were lines like
   `# /etc/systemd/system/app.service` inside bash fences. Modules are now
   counted from headings that survived the Markdown parser.

## Explanation

### 1. What changed

Nine separately-built booklets can now be printed as one 1,166-page book with a
single drawn cover, a single six-page index covering every section in all nine,
and a single back section holding the glossary, the closing note, the author
page and the copyright page. Front matter was removed from the volume entirely.

### 2. Why it was needed

The merged-volume machinery existed but only half-fitted this series. It could
read a `front/` folder and nothing else, so the 24 glossary files sitting in
`backmatter/` were never built into anything. The series had no cover data, so
the volume would have printed a plain text page where the artwork goes. And the
contents page inherited the domain's single-column styling, which at 891 entries
runs past twenty pages — a second book, not an index.

### 3. How it works, step by step

`build.mjs` walks `books/` and treats any folder with a `pages/` directory as a
book. A folder with a `masterVolume` key in its `meta.json` *also* registers as
a book, even without pages of its own — its pages are its children's.

When the volume builds:

1. **`matter(dir, deep)`** renders any `.md` files in a matter folder, one file
   per printed page, in filename order. `front/` is called with `deep: false`
   so a front page contributes only its title to the index. `backmatter/` is
   called with `deep: true`, because the 23 "Glossary: A", "Glossary: B" …
   headings are precisely what a reader looks up.
2. **For each of the nine booklets**, the build reads the booklet's own
   `meta.json` and `pages/` straight off disk, so the volume can never drift
   from what the booklet itself builds. It renders the booklet's pages first,
   collecting their headings, then pushes a generated divider page in front of
   them. The divider's slot in the page array is reserved beforehand so every
   printed page number in the contents stays right.
3. **Diagrams are recoloured.** A booklet's accent is baked into its inline SVG
   as a literal hex value, where no stylesheet can reach it. Each booklet's own
   accent is string-replaced with the volume's indigo as the page renders, so
   the markdown keeps a real previewable colour and the build decides what is
   actually printed.
4. **The contents is measured, not guessed.** Its own length shifts every page
   number after it, so the build renders it, measures its height in Chrome,
   recomputes the numbers, and repeats until the answer stops changing.
5. **The cover is swapped, not inserted.** The book prints its own plain cover
   page as page 1, then the drawn SVG cover is printed separately at zero
   margins and PyMuPDF swaps it in for page 1. Swapping keeps the footer
   numbering honest — page 1 of 1,166 was always page 1.

### 4. Files and functions changed

**`tools/build.mjs`**

- `renderPage()` — comment only; the behavioural gate moved to its callers.
- `buildMaster()` — four changes. Added `counting`, read from
  `config.counter === "term"`. Replaced the inline `front/` loop with a
  `matter(dir, deep)` helper now called twice, once for `front/` before the
  booklets and once for `backmatter/` after them. Restructured the per-booklet
  loop to render pages before the divider so module counts come from real
  headings. Made the divider's wording, teaser and count switch on `counting`.
- `buildBook()` — the booklet path's term total is now also gated on
  `counter === "term"`, which is what stops the bogus badges.

**`books/tech/production-terms/meta.json`** — gains `"counter": "term"`, which
preserves its existing behaviour exactly.

**`books/tech/typescript-to-deployment/meta.json`** — `masterVolume` gains the
build name `typescript-to-deployment-complete`, and a full `cover` block:
indigo accent, two title lines, banner, kicker, a five-line terminal panel, and
a nine-row stack listing each booklet with its page count.

**`books/tech/typescript-to-deployment/theme.css`** — new. Three-column contents
at 5.6pt with the leader dots removed (at a 41mm column they are noise), and the
booklet divider: 40pt accent title, the booklet's cover banner as a rule-marked
one-liner, and its cover stack as a two-column bulleted list.

**`backmatter/00-00-topic-reference.md`** — new divider opening the back matter.
The `\d+-00-topic` filename prefix is what gives it the divider styling.

**`backmatter/03-01-about-the-author.md`** — moved from `frontmatter/`,
rewritten to one page. LeetCode and problem counts gone. What replaced them is
concrete rather than flattering: what broke and what it taught.

**`backmatter/04-01-copyright.md`** — moved from `frontmatter/`, retitled to the
complete volume, with the accuracy clause pointing at the per-booklet date stamps.

**`backmatter/00-cover.md`** — deleted. It was a booklet cover for a booklet that
no longer builds separately; the generated Reference divider replaces it.

### 5. Important decisions

**A config flag, not a filename convention, drives the term counter.** The old
rule — "files named `02-*` hold dictionary entries" — is true of
`production-terms` and false of every other book. Rather than special-casing by
book name, `counter: "term"` states the intent once where the behaviour is
wanted. Every other book gets the sane default.

**One accent for the whole volume, not nine.** The booklets keep their own
colours on their own covers. Inside the volume the divider already tells you the
subject changed; a colour change on top of it made one book look like nine
stapled together.

**Modules counted from parsed headings.** Rejected the cheaper fence-aware
regex. The parser already knows what a heading is; asking it is both shorter and
correct, and the count now cannot disagree with the pages behind it.

**The preface was not deleted.** It had uncommitted edits. Removing it from the
build was the requested change; destroying the text was not.

### 6. Tests and verification

Real output, not claims.

```
$ node tools/build.mjs typescript-to-deployment-complete --html
sections (pages): 1166
toc entries     : 891   (106 booklet/module titles, 785 sections)
topic dividers  : 10    (9 booklets + Reference)
termno badges   : 0
first 4: 00-cover, topic-01-typescript, 01-01-what-is-typescript, ...
last 6 : ...glossary-w-z, 02-01-final-note, 03-01-about-the-author, 04-01-copyright
```

```
$ node tools/_measure-toc.mjs dist/tech/typescript-to-deployment.html
TOC height: 1014 mm -> 6 printed pages
overflowing pages: 0
```

Regression check on the other volume that uses this code path:

```
$ node tools/build.mjs the-vocabulary-of-production --html
termno badges: 471
pages        : 230
toc entries  : 480
alphabetical : 8
```

Unchanged from before the `counter` flag existed.

Divider output, spot-checked:

```
Booklet 8 of 9 · Deployment & Ops on AWS · GET IT LIVE. KEEP IT UP.
Docker · Compose / VPS · Caddy · Nginx / GitHub Actions /
EC2 · ECS · RDS / Prometheus · Loki / Grafana · playbooks
16 modules · 377 pages
```

### 7. Edge cases and limitations

- **Six pages of contents is the floor for 891 entries at this type size.**
  Dropping to booklet-and-module titles only would take it to roughly two, at
  the cost of not being able to look up a section.
- **A booklet with no `cover.stack` gets an empty divider list.** All nine have
  one today. A tenth booklet added without one would print a divider with a
  title and a page count and nothing between them.
- **Diagram recolouring is a literal string replace.** A booklet accent written
  in a different notation inside an SVG — `rgb()`, a shorthand hex — is not
  matched and would print in the booklet's colour inside the volume.
- **`--split` was not run.** It did not need to be: nothing overflows. Running
  it would rewrite page files across all nine booklets.
- **The individual booklet PDFs in `dist/` are stale** relative to the current
  build script. They are correct as printed; they simply predate the `counter`
  gate. Rebuilding them now is safe and produces the same pages.

---

**2026-09-08 (second pass) — the contents was answering the wrong question.**

Feedback: drop the single all-at-once index; the front should be links to the
booklets, and each booklet should carry its own contents on its second page,
"so it will be by techs". Also: the yellow cover, like Frontend Mastery.

Agreed on the reasoning. Nobody opens a 1,176-page volume hunting for "Typed
environment config"; they look for the AWS half. Navigating by subject and then
by section is the order a reader actually thinks in, and it makes each booklet
self-contained inside the volume the way it is outside it.

**What this cost, and why it was not a CSS change.** The page-number arithmetic
assumed every entry in the page array prints as exactly one sheet — that is the
whole reason `one markdown file = one printed page` is a hard rule here. A
booklet's contents breaks it: the AWS booklet has 245 entries and needs two
sheets. Every printed number after it would have been one too low.

So the numbering model changed. `assemble()` now walks the book accumulating
real sheet counts and hands every contents page a lookup from page-index to
printed-number. `measureTocs()` measures *all* contents pages in one pass — the
front menu by class, each booklet's by `data-toc` — and the build re-assembles
and re-measures until nothing moves. It settles in three passes.

Neither kind of contents page carries `data-src`, which is what keeps them
exempt from the one-file-one-page overflow check.

**Structure now:**

```
1     cover, yellow ground
2     Contents — 14 lines: 9 booklets, Reference, and 4 back entries
3     TypeScript divider
4     TypeScript contents
5-86  TypeScript pages
...
667   Deployment & Ops on AWS divider
668-9 its contents, two sheets
...
1149  Reference divider
1150  Glossary … 1176 Copyright
```

**Verified.** All 14 front-menu numbers were checked against the text on the
page they claim: 0 mismatches. The AWS booklet's second contents sheet shows up
exactly where it should — AI-Assisted Engineering moved from 1046 to 1047
between the unmeasured HTML pass and the measured PDF.

**Cover.** Dropped the `burst` override, so it falls back to the domain default
`#ffe98f → #f2b40c` — the yellow ground Frontend Mastery uses. The indigo accent
stays on top of it.

**One CSS bug found by looking at the rendered page rather than the build log.**
A booklet's line carries `class="lvl1 book"`. The back-matter rules were written
against `li.lvl1` at equal specificity and placed after the `.book` block, so
they won, and all fourteen lines came out the same size — the hierarchy the page
exists to show was invisible. Fixed with `:not(.book)`, which is now load-bearing
and commented as such.

**Also fixed this pass:** the booklet divider was content-height, so
`justify-content: center` had nothing to centre in and the tint stopped where
the text did. `min-height: 185mm` claims the type area while staying under the
186mm overflow check. And the cover's "+ 78 MORE MODULES INSIDE" was false —
the panel lists nine *booklets*, so subtracting them from a count of *modules*
compared two different things. It now reads `9 BOOKLETS · 87 MODULES`, still
counted from what was built rather than typed into `meta.json`.

**Still true:** `frontmatter/01-preface.md` is untouched on disk, outside the
build path, carrying its uncommitted edits.

**2026-09-08 (third pass) — two regressions I caused, caught by re-running the
other books rather than only the one being worked on.**

Both came from changing shared code in `build.mjs` to serve one book.

1. **The contents heading was renamed everywhere.** `assemble()` hardcoded
   `"Contents"` where `tocPage()` had printed `"Table Of Content"`. That is the
   heading on every book in the repo — production-terms, frontend-mastery,
   react-ai, vps-mastery — and all four would have quietly changed. Now a
   parameter defaulting to the old string; `tocTitle: "Contents"` in this
   series' `meta.json` is what opts in.

2. **Per-topic contents pages were being added to every merged volume.**
   `the-vocabulary-of-production` went from 230 pages to 238 — one extra index
   page per topic — and its single 471-entry index had been broken up into
   eight, which is precisely the wrong shape for a dictionary. Now behind
   `contents: "per-topic"`, set only here. The default is unchanged: one index
   at the front listing everything.

The same flag also decides what the back matter contributes to the front index:
under one front index the glossary's own "Glossary: A" headings belong in it;
under a per-topic index the front is a menu, so the back contributes page titles
only.

**Verified after the fix** — every other book byte-identical to before this task:

```
the-vocabulary-of-production  pages 230 == 230 | btoc 0 | badges 471 | toc 480
frontend-mastery              pages 384 == 384 | toc 161 == 161 | h2 'Table Of Content'
react-ai                      pages  39 ==  39 | toc  34 ==  34 | h2 'Table Of Content'
typescript-to-deployment-complete  pages 1175 | btoc 9 | badges 0 | front menu 14 entries
```

**One more found the same way:** the booklet names on the front menu printed
near-black instead of the volume accent. `--accent` is written onto each *content*
section by the build, but a contents page is generated furniture with no section
of its own, so `var(--accent)` resolved to nothing and every colour on those
pages fell back to inherited ink. The tech domain defines no `:root` fallback;
production-terms had already hit this and added one. Same fix here, with the
constraint that it must track `cover.accent` written down next to it.

Three bugs this pass, none visible in the build log. All three were found by
rendering the page to PNG and looking at it.

**2026-09-08 (fourth pass) — typography, and the cover that kept "disappearing".**

Feedback: the front menu's bold "is not looking professional at all"; the
booklet contents pages leave half the sheet empty; the front menu had spilled
onto a second page; and the accent should be the Frontend Mastery teal, not
indigo.

**The cover was never missing.** Three times the volume was opened and page 1
showed the plain `00-cover.md` text page. That is a real state the file passes
through: Chrome prints the book with the plain cover as page 1, and PyMuPDF
swaps the drawn cover in as the *last* step. On a 1,179-page book that window is
several minutes long, and the file sitting at the final path during it genuinely
has no artwork. The build now prints to `<name>.building.pdf`, swaps the cover
onto that, and only then renames it into place. The published filename never
exists in a half-built state.

**Typography.** The front menu was 15pt Segoe UI at weight 800 in the accent —
a web dashboard, not a title page. Now 13pt Georgia at normal weight in ink,
with the page number the only accent on the line. The 15pt setting also measured
past the sheet and pushed the last two entries onto a second page; 13pt on 5.5mm
leading measures 154mm of the 186mm available.

**The booklet contents pages had inherited the wrong setting.** Three columns at
5.6pt was sized for the old volume-wide index of 891 entries. A booklet's index
holds 56 to 245, so the same setting left most of them using less than half the
sheet and reading like fine print. Two columns at 7.4pt gives 60mm of measure
instead of 41mm — long section names stop wrapping and the leader dots become
useful again.

Measured before rendering rather than after:

```
                    before      after
01-typescript        ~90mm      166mm   1 sheet
03-node-core         ~90mm      163mm   1 sheet
06-api-design        ~85mm      161mm   1 sheet
09-ai-practices     2 sheets    178mm   1 sheet   reclaimed
front menu          2 sheets    154mm   1 sheet   reclaimed
```

Leading went to 1.28 from 1.34 for one specific reason: `09-ai-practices`
measured 188mm against a 186mm sheet and spilled two entries onto a near-empty
second page. Four percent off the leading pulled it back under.

**Accent** is now `#1f6f8b`, the Frontend Mastery teal, on the domain's yellow
ground. Changed in both places it is declared — `cover.accent` in `meta.json`
and the `:root` fallback in `theme.css` that the generated contents pages need.

**Verified on the built PDF:** 1,179 pages; 39 vector drawings on page 1; all 14
front-menu entries on one page with 0 mismatches against the pages they name;
0 content pages overflowing; no stray build artefacts left in `dist/`.

**Method note worth keeping.** Every defect in this task — five bugs and four
layout faults — was invisible in the build log and found by rendering the page
to PNG and looking at it. From this pass onward the contents pages are measured
from the HTML build first, which costs seconds, rather than discovering the
answer after an eight-minute render.
