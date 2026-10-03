# Surviving Doomsday

A playbook for software/AI engineers surviving the AI era. It is researched
first, tested on me, and written up as a book in this repo's factory last.

The rules every agent follows are in [`CLAUDE.md`](CLAUDE.md). The folder has no
`pages/` yet, so the build ignores it until the book phase starts.

## How to use the prompt pack

Run each prompt in an agent that has web search and write access to this repo,
such as Claude Code. Start each one in a fresh session so one track's context
doesn't leak into another. Every prompt is self-contained: copy everything
below its `---` line.

| # | Prompt | Writes to | When |
|---|---|---|---|
| 00 | [Profile interview](prompts/00-profile.md) | `profile.md` | first, once |
| 01 | [AI-era landscape](prompts/01-landscape.md) | `research/01-landscape/` | second; every track reads it |
| 02 | [Judgement](prompts/02-judgement.md) | `research/02-judgement/` | any order |
| 03 | [Taste](prompts/03-taste.md) | `research/03-taste/` | any order |
| 04 | [Thinking quality (the "IQ" track)](prompts/04-thinking.md) | `research/04-thinking/` | any order |
| 05 | [Domain knowledge](prompts/05-domain.md) | `research/05-domain/` | any order |
| 06 | [Communication](prompts/06-communication.md) | `research/06-communication/` | any order |
| 07 | [Clients](prompts/07-clients.md) | `research/07-clients/` | any order |
| 08 | [Personal brand](prompts/08-brand.md) | `research/08-brand/` | any order |
| 09 | [Tech radar](prompts/09-tech-radar.md) | `research/09-tech-radar/` | any order |
| 10 | [Focus and noise](prompts/10-focus.md) | `research/10-focus/` | any order |
| 11 | [Products: projects, micro SaaS, internal tools](prompts/11-products.md) | `research/11-products/` | after 01 and 05 |
| — | [Brainstorm session](prompts/brainstorm.md) | `decisions/` | after any report; reusable |
| — | [Domain-transfer brainstorm](prompts/brainstorm-domain-transfer.md) | `decisions/` | after 05 (and 01) |
| 12 | [Synthesis](prompts/12-synthesis.md) | `playbook/` | after most tracks + brainstorms |
| 13 | [Red team](prompts/13-red-team.md) | `playbook/review.md` | last, then fix |
| 14 | [Book outline](prompts/14-book-outline.md) | `outline.md` | once the playbook survives 13 |

The loop: **research a track → brainstorm it → log decisions → synthesize →
red-team → outline the book.** When a track's leading indicators move, re-run
it. A quarterly re-run of 01 and 09 keeps the base current.

## Why it's split this way

One prompt covering everything gives you a generic listicle. Each track gets its
own context, its own questions, and its own sources. Prompt 01 is the shared
foundation. The playbook is only written from evidence plus my own decisions,
and the book only from the playbook.
