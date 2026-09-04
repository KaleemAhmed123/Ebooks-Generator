# Brief — rewrite booklet 01 (AI Engineering) to house format

You are rewriting term entries in *The Vocabulary of Production*, booklet 01,
`books/tech/production-terms/01-ai-engineering/pages/`.

Read this whole file before you touch anything.

---

## Why this rewrite exists

Booklet 01 was written first, before the series format settled. It is the only
booklet of eight that uses `### How it works` / `### In practice` subheadings —
scaffolding invented to fill one printed page per term. Every booklet written
afterwards dropped it.

The numbers:

| | words per term | `###` headings |
|---|---|---|
| booklet 01 (yours) | **273** | **203** |
| booklets 02–08 | ~130 | **0** |

Your job is to bring your terms to ~130 words in the house format. **Nothing of
value is lost** — what you are cutting is elaboration the other 355 terms in
the volume never had.

---

## The house format — copy this shape exactly

```markdown
## Term Name

*alias or acronym*

Two or three sentences that say what it means. Start with the meaning. No
preamble, no "this is a technique that".

Two or three sentences on where it bites in production — the concrete
consequence, with a real number wherever a primary source gives one.

<svg viewBox="0 0 460 78" ...>…</svg>

**One bold sentence naming the thing nobody warns you about.** Then one or two
sentences that make it concrete.
```

Rules that are not negotiable:

- **`##` and nothing deeper.** No `###`. Ever. If you feel you need one, the
  entry is too long.
- **Exactly one bold-opening paragraph per term**, and it is the last thing on
  the entry. That paragraph is the payload of the book — the theme gets a tinted
  box and an accent bar around it automatically. Do not bold anything else at
  the start of a paragraph, or you will create a second box.
- **The `*alias*` line is optional.** Use it only for a genuine second name or
  expanded acronym (`*RAG*`, `*truck factor*`). Delete it otherwise.
- **110–140 words** per entry, SVG text excluded. Under is fine. Over is not.
- Inline `code` for real identifiers only — flags, keys, function names.
- Tables are allowed for genuine two-column comparisons, `| A | B |`, kept to
  four rows or fewer.

### A real entry from booklet 03, for calibration

```markdown
## Bus Factor

*truck factor*

The number of people who would have to disappear before the work stalls.
Counted per component, not per team: a team of nine can carry a bus factor of
one on the payment path.

Almost every measurement is derived from commit history, which sees only who
wrote the code.

**Commit history misses the things that actually stop you.** The one account
that can rotate the production certificate, the only approver on the deploy
path, the person whose laptop holds the working copy of the vendor's test
credentials — none of that leaves a trace in `git log`.
```

That is the target. 96 words. Notice there is no throat-clearing, no recap, and
the last paragraph tells you something the first two did not.

---

## Voice — write like an expert explaining to a smart outsider

The reader is a working engineer who has not done *this* particular thing. They
are clever and busy. Two instructions pull against each other and both must
hold:

**Be technically exact.** Real mechanism, real numbers, real names. Never write
around a thing because it is hard to explain.

**Be understandable on the first read.** Short sentences, one idea each.
Concrete before abstract. If a concept has a physical analogue that is *actually
true* — not a cute metaphor that breaks — use it in half a sentence and move on.

Every term gets its meaning the first time it appears. `p50`, `KV cache`,
`recall`, `logit` — one clause, in passing, not a definition paragraph.

**Banned outright:** delve, foster, robust, demystify, embark, seamless,
leverage, landscape, realm, tapestry, "powerful", "efficient", "game-changing",
"it is important to note", "in this section", "let's dive in", "in conclusion",
"as we saw earlier", "simply", "just".

**Show, never tell.** Do not say a technique is fast. Give the number and let
the reader conclude it.

---

## Diagrams — draw more of them

The volume runs about one diagram per five terms. Booklet 01 should sit higher
than that, because retrieval, agent loops, caching and batching are all shapes.

**Draw one when** there is a flow (A → B → C), a structure (what contains what),
a comparison of two paths, or a timeline. **Do not draw one when** the diagram
would repeat a sentence you have already written — in that case delete the
sentence or delete the diagram.

House SVG style, hand-written, self-contained, no image files:

```html
<svg viewBox="0 0 460 78" xmlns="http://www.w3.org/2000/svg" role="img"
     aria-label="Full sentence describing what the diagram shows, for screen readers and for the PDF's accessibility tree">
  <rect x="4" y="12" width="132" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="14" y="29" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">plain box</text>
  <path d="M136 25 H168" stroke="#1a1a1a" stroke-width="1.2"/><path d="M168 25 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="170" y="12" width="96" height="26" fill="#fdece5" stroke="#c25a35" stroke-width="1.4"/>
  <text x="196" y="29" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">the important box</text>
  <text x="4" y="70" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">the caption carries the punchline, not a label</text>
</svg>
```

Hard constraints:

- **`viewBox="0 0 460 H"`** — width is always 460. Height 60–110. Nothing wider,
  or it overflows the printed measure.
- **Colours: exactly these four.** `#1a1a1a` neutral ink, `#6b6b6b` caption
  grey, `#c25a35` accent, `#fdece5` accent tint fill. **`#c25a35` is booklet
  01's accent and the build rewrites it to the volume's green automatically** —
  so use that literal hex and no other accent colour, or your diagram will print
  orange inside a green book.
- Fonts: `Consolas,monospace` at 8–8.5 for labels, `Georgia,serif` at 9–9.5 for
  the caption line. No other families, no external fonts.
- Every `<svg>` needs `role="img"` and a real `aria-label`.
- Blank lines inside the SVG are fine — the build protects raw SVG from the
  markdown parser.

---

## Accuracy — check it, do not remember it

**Never write a number from memory.** Fetch the primary source: the provider's
own docs or pricing page, the paper, the library's repo or changelog. Not blog
posts, not summaries.

This matters most for anything with a version or a price attached — model
context limits, token pricing, cache discounts, index build times, library API
surface. These change monthly.

Content must be true **as of 2026-09-04**. Where a fact is version-bound, say so
in the text: "as of Claude's 2026 pricing", "HNSW in pgvector 0.8".

**If you cannot verify a claim, cut it.** A missing number beats a wrong one.
An entry with one verified number and no filler is better than an entry with
four plausible ones.

At the end, list every claim you could **not** verify, so it can be checked.

---

## Files

Your assignment names the files you own. Rules:

- **Edit only your files.** Another agent owns the rest and is editing them right
  now. Two agents writing one file loses work.
- **Do not rename, renumber, merge or delete any file.** Filenames and page
  grouping are decided later by `tools/split-pages.mjs`, which measures rendered
  height and packs pages. If you reorder by hand you will fight it and lose.
- **Do not touch** `meta.json`, `theme.css`, anything in `tools/`, anything in
  another booklet, or `docs/tasks/production-terms-data/01-ai-engineering.json`.
- New terms in your assignment get a **new file** named
  `02-new-<kebab-slug>.md` in the same `pages/` directory, one term per file.
  The packer will rename it.
- Keep the `## Term Name` heading **byte-identical** to the name in your
  assignment. The packer matches on it and refuses to run if one is missing.

## When you are done

Report back:

1. Terms rewritten, and the word count of each (a simple list).
2. Any term where you could not get to 140 words without losing something real
   — name it and say why.
3. How many diagrams you drew.
4. **Every claim you could not verify against a primary source.**

Do not report success for a file you did not write.
