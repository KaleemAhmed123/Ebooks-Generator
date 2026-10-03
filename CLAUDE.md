# What this project is

This project is a highly custom, zero-bloat, Markdown-to-PDF Ebook factory.
I want to create a system where I can write ebooks in markdown format and convert them to pdf format. It should be highly custom and zero-bloat.

# How books get written here

This repo is a book factory. Markdown in `books/`, styled PDFs out in `dist/`.
Read this before writing a single page.

## Where things live

```
books/<domain>/[series]/<book>/pages/*.md    the content — you write here
books/<domain>/[series]/<book>/meta.json     this book's title and cover data
shared/about-the-author.md                   one bio, used by every book
tools/build.mjs                              the build — do not edit while writing
dist/                                        output, generated, never edited by hand
```

Any folder may hold a `meta.json` and a `theme.css`. They cascade top-down:
`shared` → domain → series → book. The deepest one wins. A folder is a book
because it has a `pages/` directory — nothing lists the books anywhere.

## The page rule

**One markdown file = one printed page by default.** If the content overflows,
compress it first. Some ideas genuinely deserve multiple pages; in those cases,
split deliberately at a meaningful conceptual boundary, never arbitrarily
because the page ran out of room.

A continuation page is the same idea, so it gets **no heading** — no `##`, no
"- continued" title. The content simply carries on from the previous page, and
nothing from it appears on the contents page. A `###` sub-point may still open
it if the split falls on one.

## Research before drafting

- Never write from memory. Look it up first.
- Use tools: fetch the live docs, read the actual source, check real version
  numbers.
- Content must be true **on the day it is built**. Where it matters, say so in
  the text ("as of Node 24", "Postgres 17 and later") — only where it matters,
  not on every claim.
- Primary sources for factual claims. Use official docs, specifications, source
  code, and authoritative technical references for behavior, APIs, versions,
  limits, and exact numbers. Secondary sources may help you understand a hard
  concept or competing interpretations, but never serve as the authority for a
  factual claim when a primary source exists.
- Separate stable knowledge from version-specific facts. Do not attach version
  qualifiers to stable concepts. Use explicit versions only where behavior,
  syntax, limits, APIs, or implementation details depend on the version.
- Never fill an information gap with a plausible-sounding explanation. If the
  source does not establish the claim, investigate further or omit it. Clearly
  distinguish documented behavior from inference.
- Cannot verify a claim? Cut it. A missing point beats a wrong one. This is
  strict for exact facts — numbers, versions, limits, dates, news. Explanations,
  analogies, and mental models may go beyond the sources' wording, as long as
  they introduce no new unverified facts.

## To the point — the rule that matters most

Every page: state the idea in a few sentences that carry a lot, then show the
smallest realistic example that makes the idea undeniable. Prefer a minimal
example that exposes the mechanism over a toy example that merely demonstrates
syntax. Then stop.

- No recaps. No "in this section we covered". No throat-clearing or similar
  filler. Delete every sentence that carries no information; if a paragraph can
  be deleted without reducing understanding, delete it.
- Keep the writing information-dense: say as much as possible in as few
  sentences as possible without sacrificing understanding. The goal is not
  brevity but compression of ideas — keep the reasoning, relationships, and
  context; remove repetition, obvious statements, and low-value words.
  Sometimes a single dense paragraph should replace an entire page if it
  communicates the same idea more clearly. Every word should earn its place.
- Dense does not mean incomplete. Compress explanations; do not compress away
  the reasoning, mechanism, example, or context required to make the idea
  understandable.
- Explain mechanisms, not just facts. Give the reader a mental model that lets
  them reason about unfamiliar cases rather than memorize isolated facts.
- Each page adds a new layer of understanding. Assume the reader has read the
  previous pages: do not restate definitions or re-explain a concept merely
  because it is relevant again. Use precise terminology, explain only the new
  aspect, and move toward mechanism, consequence, trade-off, edge case, or
  application as the subject requires.
- Do not structure content merely because structure is available. A heading,
  bullet list, table, or other structure must reduce cognitive load, clarify
  hierarchy, or expose a relationship. Otherwise use prose.
- When useful, include one non-obvious failure mode, trade-off, surprising
  constraint, or impressive fact. Never add trivia merely to satisfy this
  pattern.

## Math is a black box

Applied AI engineers need little math, and much less of it up front. Treat math
as a black box in every book here that carries it.

- **Teach what a math idea *does* and *why it matters* — never how to derive it.**
  No proofs, no symbol-pushing, no notation the reader must parse to follow along.
- **Each math page answers three things and stops:** what it does · why it
  matters · what it looks like in code — plus one worked numeric example where it
  earns its place.
- **Mark genuine deep-math pages optional.** Open them with a `note` block —
  "**Optional deep-dive — safe to skip on a first read.**" — so a beginner skips
  without losing the thread, while the page stays for whoever wants it.
- **Never use `$$…$$` or `$…$` LaTeX.** The build (`marked`) does not render it;
  it prints as raw text (`\frac`, `\nabla`). Write the idea in plain words, a
  small table, a diagram, or code.

## Diagrams

- Diagram anything with flow, structure, relationships, or more than three
  moving parts. Hand-written inline `<svg>`: rich, print quality,
  self-contained, no image files.
- Use proper spacing, padding, alignment, and hierarchy so text never gets
  hidden, overlaps, or looks cluttered.
- Make relationships and mechanics immediately visible — not just boxes
  connected by arrows. Every box, arrow, label, and connection must communicate
  something meaningful; cut everything else.
- Optimize for comprehension at a glance: the reader grasps the overall
  structure first, then inspects the details.
- A diagram replaces prose — it does not decorate it. If the paragraph still
  has to say the same thing, the diagram failed. A few sentences are still
  appropriate when the diagram needs interpretation, contains non-obvious
  details, or cannot carry the full idea at first glance.

## Voice & UX Philosophy

Our PDFs stand out because they respect the reader's time and intelligence. The UX is defined by extreme clarity, deep research, and simplicity. We are writing elite-level content that does not sound like typical AI output.

- **Plain English & Hyper-Concise:** Short sentences not because of constraints, but because it is our style to say a paragraph in just a few sentences and still have people understand perfectly. **The goal is not merely fewer words; it is more meaning in fewer sentences without losing the reasoning or context needed to understand the idea.** One primary idea per sentence, with closely related clauses allowed when they improve compression and understanding. **Prefer a dense, well-written paragraph over several shallow bullets when the paragraph communicates the idea more naturally.**
- **The "Kinda Academic" Tone:** Professional, authoritative, and kinda academic. Confident, not salesy. You are writing for peers. Never talk down to the reader.
- **Ban all AI Tropes and Meta-Commentary:** Never use words like "delve," "foster," "robust," "demystify," or "embark." Absolutely zero throat-clearing ("In this section we will...", "It is important to note that...", "In conclusion..."). Start immediately with the core assertion, prove it, and stop. **No artificial summaries or repetition just to make the content feel complete.**
- **Show, Don't Tell:** Never say a tool or concept is "powerful" or "efficient." Show the code or the mechanism that makes it so, and let the reader conclude it is powerful.
- **Accessible & Glossary-Driven:** Every term gets a one-line meaning the exact first time it appears, and is logged in the glossary. Do not assume the reader knows proprietary acronyms, but do not waste time explaining industry-standard basics.
- **Visual First:** Prose is expensive; diagrams are cheap. Maximize the use of diagrams to explain complex flows, architecture, or data structures. If it takes more than 3 sentences to describe a relationship, draw it instead.
- **Accuracy is Non-Negotiable:** Content must be relentlessly researched and factually flawless as of the build date. No generic blog summaries. **When sources disagree, investigate the discrepancy rather than silently choosing whichever explanation is convenient.**

## Glossary

- Every term introduced goes in the series' `backmatter/` glossary.
- One line, plain, never circular. Check it is not already there.

## Page structure

- `#` — book or module title.
- `##` — the page's topic. **This is what the contents page lists.**
- `###` and below — sub-points. They stay off the contents page.
- Continuation pages follow "The page rule" above — no heading.
- Use only the `:::` blocks the domain declares in its `meta.json` `blocks`
  list. Anything else renders as literal text.

## Verify before you call a page done

Do not mark a page finished on the read-through you did while writing it.
Verification is a **separate pass, run by the main agent — no subagents**
(they burn too many tokens; waiting is fine). It may run later, batched across
many pages.

1. **Fact pass** — take the page alone and check every factual claim, version
   number, API behavior, and code sample against live primary sources. Re-fetch
   the sources; do not rely on what you remember from drafting. Report each
   claim as **verified, contradicted, or unverified**.
2. **Consistency pass** — take the page plus the book's other pages. Is
   anything here contradicted elsewhere, repeated elsewhere, or using a term
   differently from the glossary?
3. Fix what comes back. Cut anything still unverified.

The writer is the worst judge of whether the page is right. During the pass,
treat the draft as someone else's work: assume it is wrong until a source
proves it.

## A page is not done until

- [ ] every claim checked against a current primary source
- [ ] every code sample actually run
- [ ] every term defined here or in the glossary
- [ ] it fits one printed page, or splits at a real conceptual boundary
      (`node tools/build.mjs <book> --html` warns on overflow)
- [ ] it repeats nothing from another page

## Building

```
node tools/build.mjs --list             show every book and its resolved settings
node tools/build.mjs <book>             one book -> dist/
node tools/build.mjs <domain>           every book in a domain
node tools/build.mjs --all              everything
node tools/build.mjs <book> --html      fast preview, no Chrome PDF pass
node tools/build.mjs <book> --split     re-pack pages that overflow
```

## Adding things

- **A book** — make a folder with a `pages/` directory and a `meta.json`.
  That is the whole procedure. Nothing else to register.
- **A domain** — make a folder under `books/` with a `theme.css` and a
  `meta.json` declaring its `blocks`.
- **A `:::` block** — add its name to the domain's `blocks` list and style the
  matching CSS class. No code change.
