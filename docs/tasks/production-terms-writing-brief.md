# Writing brief — Production Terms booklets

The contract for anyone writing a booklet in this series. Two booklets are
already finished to this spec: `01-ai-engineering` (101 terms, 105 pages) and
`02-design-distributed` (75 terms, 29 pages). Read a page or two of
`books/tech/production-terms/02-design-distributed/pages/` before starting —
it is faster than reading this twice.

---

## What the series is

*The Vocabulary of Production.* A reference for working mid-to-senior engineers.
They half-remember a phrase from a design review, look it up, and get the real
meaning in twenty seconds.

**Not a teaching book.** It does not explain how to build a rate limiter. It
tells you what someone means by *token bucket* and what goes wrong when they get
it wrong. Overlap with the author's other books is deliberate.

---

## The voice

Non-negotiable. This is what the whole project exists to protect.

- **Plain English. Short sentences. One idea each.**
- **Kinda academic.** Professional, authoritative, confident. Writing for peers,
  never talking down.
- **Show, don't tell.** Never say something is "powerful" or "efficient". Show
  the mechanism and let the reader conclude it.
- **Banned words:** delve, foster, robust, demystify, embark, leverage (as a
  verb), seamless, streamline, comprehensive.
- **Banned openers:** "In this section", "It is important to note", "Let's
  explore", "In conclusion". Start with the assertion.
- **Delete every sentence carrying no new information.** If a paragraph survives
  being deleted, it should have been deleted.
- **Name the failure mode nobody warns you about.** That is the value of the
  book. Every term should have one.
- Prefer British-ish spelling where the source uses it (normalise, behaviour).

---

## Page structure — terse booklets

**Three terms per page**, alphabetical, one file per page.

```markdown
## Term Name

*optional qualifier in italics, only if the source has a `sub` field*

One or two sentences: what it means.

One or two sentences: where it bites — the concrete failure, with a number
where the source gives one.

[a visual, only if it earns one — see below]

## Next Term
...
```

Every term is an `##`. That is what puts it on the contents page with a page
number, which is the entire point of the book. **Never use `#`** — the opener
page owns that.

`###` is available for a sub-heading inside a term, but terse terms rarely need
one.

### File naming

`02-NN-firstterm-to-lastterm.md`, zero-padded, e.g.

```
02-01-active-active-to-api-gateway.md
02-02-api-versioning-to-audit-log.md
```

Sorted filenames determine page order, and terms run A–Z across the booklet.

---

## The density ceiling — measured, not guessed

The printed area is **186mm**. The build warns when a page exceeds it.

| Page contents | Result |
|---|---|
| 3 terms + 2 SVGs | exactly 186mm — the ceiling |
| 3 terms + 1 table | comfortable |
| 3 terms + 1 code fence + 1 table | **overflows** (measured at 195mm) |

**Maximum two visuals per page.** If both are SVGs, keep each `viewBox` height
at 100 or under.

Pages carrying three short entries will leave some white space. That is fine and
expected — do not pad them.

---

## Visuals — the rule that matters

The source `diagram` field is ASCII. **None of it survives as ASCII.** Each one
becomes one of three things:

**A table** — when the "diagram" is really a two-column comparison, a list of
options, or a set of thresholds. This is the most common case by far. Set it
quietly; the theme already styles tables.

**An inline SVG** — only when the picture shows real structure or flow: a
pipeline, a fan-out, a loop, a layered index, a timeline. Roughly one term in
five earns this.

**Nothing** — when the source "diagram" adds no information the prose has not
already given. Deleting it is the right call more often than it feels.

### SVG conventions

Match the existing ones exactly. Hand-written, self-contained, no external
assets.

```
viewBox="0 0 460 H"   H between 60 and 110
role="img" aria-label="a full sentence describing what the diagram shows"
```

- Ink `#1a1a1a` · muted `#6b6b6b` · rules `#e0e0e4`
- Accent = this booklet's `cover.accent` from its `meta.json`
- Highlight fill `#e2fcf3` with the accent as stroke, for the one box that matters
- Fonts: `Georgia,serif` for labels, `Consolas,monospace` for code-ish text
- Sizes 8.5–11
- Arrowheads: `<path d="M<x> <y> l-7 -4 v8 z" fill="#1a1a1a"/>`

**Never mask a line with a white rectangle so a caption can sit on it.** It
renders as two disconnected stubs. Route the line around the text instead, or
put the caption below the diagram.

---

## The two non-term pages

**`00-cover.md`** — copy this exactly, changing only the three variables:

```markdown
<p class="cover-book">The Vocabulary of Production &nbsp;·&nbsp; Terms That Earn Their Page</p>

# <Booklet Title>

<p class="cover-sub"><Subtitle> - Booklet N of 8</p>
```

**`01-00-how-to-read.md`** — one page, starting with `# <Booklet Title>` then
`## How to read this booklet`. Say how many terms, that they are alphabetical,
what the three parts of an entry are, and — importantly — what is deliberately
**not** in this booklet, so a reader sees the cut as a decision rather than an
omission. Keep it under one printed page.

---

## Source data

Each booklet's terms are a JSON array at:

```
<scratchpad>/<booklet-dir>.json
```

Each object has `term`, `sub`, `cat`, `means`, `example`, `diagram`.

**Rewrite all of it in the house voice. Do not paste the source through.** The
source is good raw material and it is not the finished register — it is
noticeably blander and more hedged than the books.

Keep every concrete number the source gives. They are what make the pages
credible.

---

## Verify before reporting done

Run both. Do not report success without them.

```bash
# 1. every allocated term actually made it into a page
node -e '
const fs=require("fs"),path=require("path");
const dir="books/tech/production-terms/<BOOKLET>/pages";
const want=require("<SCRATCHPAD>/<BOOKLET>.json").map(t=>t.term);
const got=[];
for(const f of fs.readdirSync(dir).sort()){
  if(f.startsWith("00-")||f.startsWith("01-00-")) continue;
  for(const m of fs.readFileSync(path.join(dir,f),"utf8").matchAll(/^## (.+)$/gm)) got.push(m[1].trim());
}
const n=s=>s.toLowerCase().replace(/[^a-z0-9]/g,"");
const g=new Set(got.map(n));
console.log("expected",want.length,"written",got.length);
console.log("missing",want.filter(t=>!g.has(n(t))));
console.log("unexpected",got.filter(t=>!want.some(w=>n(w)===n(t))));
'

# 2. build — must print no "overflow" lines
node tools/build.mjs <BOOKLET>
```

Fix any overflow by cutting a sentence or shrinking an SVG, not by moving a term
to another page — that would break the alphabetical filenames.

---

## Do not touch

- `tools/` — the build
- `books/tech/theme.css`, `books/tech/production-terms/theme.css` — shared styles
- `books/tech/cover.mjs` — the cover generator
- Any other booklet's folder
- `meta.json` files — cover data is handled separately

Your booklet's `pages/` directory is the only thing you write to.
