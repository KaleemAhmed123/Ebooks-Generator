# Research brief — System Design series

You are researching the topic list for ONE booklet of a six-booklet series
called *System Design — Distributed Systems · Events · Microservices*.
Today is 2026-09-19. Everything must be true on this date.

## The book you are helping write

- Reader: mid engineer moving to senior. Preparing for system design rounds at
  product companies and FAANG-tier, but the book teaches the mechanism, not
  interview tricks.
- Style: one markdown file = one printed A5 page. Each page states one idea in
  a few lines, shows the smallest example or diagram that proves it, and names
  the failure mode nobody warns you about. Then stops.
- Concept first. Real systems (Postgres, Kafka, Redis, DynamoDB, Cassandra,
  S3, etcd) are named as examples. Never a chapter about one tool.
- Code samples in TypeScript.
- Cover everything that is important and commonly asked. Skip the rare stuff
  nobody talks about.

## Inputs

1. The rough curriculum: `docs/tasks/reference/system-design-rough.txt`.
   Read the sections assigned to your booklet. It is a cheap-model output —
   a decent skeleton, thin in places, and it must be validated, not trusted.
2. The six-booklet split in `docs/tasks/system-design-ebook.md` (Plan section).
   Stay inside your booklet. If a topic belongs in another booklet, list it
   under "belongs elsewhere" and move on.
3. Read two pages of `books/tech/typescript-to-deployment/06-api-design/pages/`
   to see the page grain. That is the size of one topic.

## What to do

1. Read the rough file's sections for your booklet.
2. Research with web search and fetching primary sources — official docs, the
   spec, the paper, the repo, the engineering blog of the company that built
   it. Not blog summaries, not course marketing pages. For the case-studies
   booklet, also check what system design questions are actually reported as
   asked in 2025–2026 (Glassdoor, Blind, LeetCode discuss, Hello Interview,
   Alex Xu's outlines) so the set matches reality.
3. Produce the page-level topic list.

## Output — write exactly ONE file

`docs/tasks/system-design-research/<your-file>.md`. Nothing else. Do not touch
any other file in the repo.

Sections, in this order:

### 1. Modules and pages

Group pages into modules (a module = a `#` title in the book, 4–10 pages).
For each page, one line:

```
- `NN-MM-slug` — Page title — the one idea — the failure mode — diagram? (svg / table / code / none)
```

Target 80–120 pages for the booklet. Order pages so each one builds on the
last. If a topic needs two pages, say so with `-1` / `-2` suffixes.

### 2. What the rough file missed

Bullet list. Each: topic, why it matters, one primary source URL.

### 3. What the rough file has that should be cut or moved

Bullet list. Each: topic, reason (rare / wrong / belongs in booklet N).

### 4. Facts to get right

Concrete numbers and claims the pages will need, each with its primary source
URL and the version or date it is true for. Examples: latency numbers, Raft
election timeout defaults, Kafka's exactly-once scope, Postgres default
isolation level, Redis single-thread model. Only things you actually verified.
If you could not verify something, list it under "could not verify" instead.

### 5. Could not verify

Anything you wanted to include but found no primary source for.

### 6. Sources

Every URL you used, one per line, with a three-word note on what it gave you.

## Rules

- Primary sources only. If the only source is a blog summary, say so.
- Do not write book prose. This is a topic list with evidence, not a draft.
- Do not pad. A page that exists only to reach the count is worse than a
  shorter booklet.
- Report what you could NOT do. An honest gap is useful; a confident guess
  is not.
