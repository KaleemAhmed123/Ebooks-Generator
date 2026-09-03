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

## The one hard rule

**One markdown file = one printed page.** If it overflows, the idea is too
big. Split the idea, not the page.

## Research before drafting

- Never write from memory. Look it up first.
- Use tools: fetch the live docs, read the actual source, check real version
  numbers.
- Content must be true **on the day it is built**. Where it matters, say so in
  the text: "as of Node 24", "Postgres 17 and later".
- Primary sources only — official docs, the spec, the repo. Not blog summaries.
- Cannot verify a claim? Cut it. A missing point beats a wrong one.

## To the point — the rule that matters most

Every page: state the idea in a few lines, show the smallest example that
proves it, name the failure mode nobody warns you about. Then stop.

- No recaps. No "in this section we covered". No throat-clearing.
- Delete every sentence that carries no information.
- If a paragraph survives being deleted, it should have been deleted.

## Diagrams

- Diagram anything with flow, structure, or more than three moving parts.
- Hand-written inline `<svg>`. Print quality, self-contained, no image files.
- A diagram replaces prose — it does not decorate it. If the paragraph still
  has to say the same thing, the diagram failed.

## Voice & UX Philosophy

Our PDFs stand out because they respect the reader's time and intelligence. The UX is defined by extreme clarity, deep research, and simplicity. We are writing elite-level content that does not sound like typical AI output.

- **Plain English & Hyper-Concise:** Short sentences not because of constraints, but because it is my style to say a paragraph in just a few sentences and still have people understand perfectly. One idea per sentence. If a sentence carries no new factual information, delete it immediately.
- **The "Kinda Academic" Tone:** Professional, authoritative, and kinda academic. Confident, not salesy. You are writing for peers, not beginners. Never talk down to the reader. 
- **Ban all AI Tropes and Meta-Commentary:** Never use words like "delve," "foster," "robust," "demystify," or "embark." Absolutely zero throat-clearing ("In this section we will...", "It is important to note that...", "In conclusion..."). Start immediately with the core assertion, prove it, and stop.
- **Show, Don't Tell:** Never say a tool or concept is "powerful" or "efficient." Show the code or the mechanism that makes it so, and let the reader conclude it is powerful.
- **Accessible & Glossary-Driven:** Every term gets a one-line meaning the exact first time it appears, and is logged in the glossary. Do not assume the reader knows proprietary acronyms, but do not waste time explaining industry-standard basics.
- **Visual First:** Prose is expensive; diagrams are cheap. Maximize the use of diagrams to explain complex flows, architecture, or data structures. If it takes more than 3 sentences to describe a relationship, draw it instead.
- **Accuracy is Non-Negotiable:** Content must be relentlessly researched and factually flawless as of the build date. No generic blog summaries—rely only on the source code, specs, and official docs.

## Glossary

- Every term introduced goes in the series' `backmatter/` glossary.
- One line, plain, never circular. Check it is not already there.

## Page structure

- `#` — book or module title.
- `##` — the page's topic. **This is what the contents page lists.**
- `###` and below — sub-points. They stay off the contents page.
- Use only the `:::` blocks the domain declares in its `meta.json` `blocks`
  list. Anything else renders as literal text.

## Verify before you call a page done

Do not mark a page finished on your own read-through. Run a separate pass:

1. **Fact pass** — spawn a subagent. Give it the page and nothing else. Ask it
   to check every claim, version number and code sample against live primary
   sources, and to report what it could **not** verify.
2. **Consistency pass** — spawn a subagent with the page plus the book's other
   pages. Ask: is anything here contradicted elsewhere, repeated elsewhere, or
   using a term differently from the glossary?
3. Fix what comes back. Cut anything still unverified.

Fresh eyes catch what the writer cannot. The agent that wrote the page is the
worst judge of whether the page is right.

## A page is not done until

- [ ] every claim checked against a current primary source
- [ ] every code sample actually run
- [ ] every term defined here or in the glossary
- [ ] it fits one printed page (`node tools/build.mjs <book> --html` warns)
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
