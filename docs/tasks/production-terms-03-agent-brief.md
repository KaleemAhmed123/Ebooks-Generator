# Agent brief — Booklet 03, Engineering Practice

You are writing one category of a glossary booklet. Four agents work in
parallel, each on its own file. Read this whole brief before writing anything.

## Read first, in this order

1. `docs/tasks/production-terms-writing-brief.md` — the writing contract. Voice,
   page structure, SVG conventions, banned words. Non-negotiable.
2. `books/tech/production-terms/06-frontend-realtime/pages/02-01-accessibility-tree-to-content-security-policy.md`
   and `.../02-07-optimistic-update-to-presence.md` — two finished pages. Match
   this register exactly.
3. `CLAUDE.md` at the repo root — house rules on research and accuracy.

## This booklet is different: nothing is transformed, everything is researched

The other seven booklets rewrote existing source material. **This one has no
source material.** Every term you write is researched from scratch.

- **Never write from memory.** Look it up. Use web search and fetch the actual
  primary source — official docs, the spec, the tool's own repo, the cloud
  provider's own pricing or docs page.
- **Primary sources only.** Not blog summaries, not aggregator posts.
- **Every number must be real and current as of 2026.** If you cite a price, a
  percentage, a threshold or a version, it came from the vendor's or project's
  own page. If you cannot verify a number, write the entry without it. A
  missing number beats an invented one.
- Where a fact is version- or date-bound, say so in the text: "as of Node 24",
  "Postgres 17 and later".
- **Cannot verify a claim? Cut it.**

## What you write

Exactly one file:

```
books/tech/production-terms/03-engineering-practice/pages/02-draft-<YOUR-SLUG>.md
```

Your slug is given in your task. Nothing else. Do not create, edit or delete any
other file anywhere in the repo — another agent owns each of the other drafts,
and the pages get regrouped by a script after you finish.

**Use the Write tool, not a bash heredoc.** Heredocs mangle SVG, backticks and
code fences. This has broken this project repeatedly.

## The shape of every entry

```markdown
## Term Name

*optional italic qualifier — only for a real alternative name or acronym*

One or two sentences: what it means.

One or two sentences: where it bites. A concrete failure, with a real number
where you have one.

**One bolded sentence: the failure mode nobody warns you about.**
```

That last part is the whole value of the book. Every term gets one.

- Every term is `##`. **Never `#`** — the cover page owns that.
- Term headings must match the names in your task **character for character**,
  including `&`, `/`, `vs` and apostrophes. A script checks them and refuses to
  run on a mismatch.
- Write your terms in the order given. A script sorts them A–Z afterwards.
- Separate terms with one blank line. No horizontal rules, no other headings.

## Length — this is the constraint that bites

Three terms have to fit one 186mm printed page. That means **each term averages
about 62mm**, which is roughly 12–14 lines of prose.

- Target 90–130 words per term including the visual.
- A term with an SVG gets less prose, not the same prose plus a picture.
- Some entries running short is fine and expected. Do not pad.

## Visuals — earn them or leave them out

**At most one visual per term, and only about one term in three should have
one.** Your category should end up with roughly a third of its terms carrying a
table or an SVG.

**A table** when the point is a comparison, a set of options, or thresholds.
This is the common case. Keep it to 3–4 rows.

**An inline SVG** only when the picture shows real structure or flow — a
pipeline, a fan-out, a loop, a timeline. Roughly one term in five at most.

**Nothing** otherwise. Deleting the visual is the right call more often than it
feels.

### SVG rules

```
viewBox="0 0 460 H"   H between 60 and 100
role="img" aria-label="a full sentence saying what the diagram shows"
```

- Ink `#1a1a1a` · muted `#6b6b6b` · rules `#e0e0e4`
- **This booklet's accent is `#0d7a7a`.** Use it for the one element that matters.
- Highlight fill `#e2fcf3`, stroked with the accent.
- Fonts `Georgia,serif` for labels, `Consolas,monospace` for code-ish text, sizes 8.5–11.
- Arrowheads: `<path d="M<x> <y> l-7 -4 v8 z" fill="#1a1a1a"/>`
- **Never mask a line with a white rectangle so a caption can sit on it.** It
  renders as two disconnected stubs. Route the line around the label, or put the
  caption below the diagram.

## Voice reminders — the ones agents get wrong

- Plain English, short sentences, one idea each. Kinda academic. Writing for
  peers, never talking down.
- **Show, don't tell.** Never call anything powerful, efficient or robust. Show
  the mechanism.
- **Banned words:** delve, foster, robust, demystify, embark, leverage (verb),
  seamless, streamline, comprehensive, crucial, vital.
- **Banned openers:** "In this section", "It is important to note", "Let's
  explore", "In conclusion". Start on the assertion.
- No recaps, no throat-clearing, no meta-commentary.
- British-ish spelling: normalise, behaviour, prioritise.
- Delete any sentence carrying no new information.

## Before you report done

Run this and paste the real output into your report:

```bash
node -e "
const fs=require('fs');
const f='books/tech/production-terms/03-engineering-practice/pages/02-draft-<YOUR-SLUG>.md';
const s=fs.readFileSync(f,'utf8');
const h=[...s.matchAll(/^## (.+)$/gm)].map(m=>m[1].trim());
console.log('headings',h.length); console.log(h.join(' | '));
console.log('h1 count (must be 0)',(s.match(/^# /gm)||[]).length);
"
```

Report:
1. That command's actual output.
2. The exact term names you wrote.
3. Which terms got a table, which got an SVG.
4. **Anything you could not verify against a primary source, and what you cut
   because of it.** This is the most useful thing in your report — do not leave
   it out.
