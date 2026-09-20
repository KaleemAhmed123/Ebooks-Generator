# Handoff: rewriting the "System Design" six-booklet PDF series, booklets 02–06

## Context & goal

The user (git user KaleemAhmed123) runs a Markdown-to-PDF book factory at `C:\Users\hp\Desktop\Projects-Root\Ebook Management`. Pages in `books/<domain>/<series>/<book>/pages/*.md` build to A5 PDFs in `dist/` with `node tools/build.mjs <booklet-folder-name>`. Read the repo's `CLAUDE.md` first; it is the style contract. The series is *System Design — Distributed Systems · Events · Microservices*, six booklets under `books/tech/system-design/`, bound into one volume at the end like `books/tech/typescript-to-deployment`. A cheaper model drafted all six booklets from approved research page-lists (commit `f0bf529`). The job is to bring each booklet to house style: cut what interviews rarely ask, keep what is common, merge repeats, verify every number, and fit every page. **Booklet 01 is done (commit `71479a5`, 71 pages). Booklets 02–06 remain.** The user is on a tight token budget; the working method below exists to keep each booklet under roughly 250K tokens.

## Key decisions made

- Six booklets, then one bound volume with contents, preface, glossary, final note, about-the-author, copyright, exactly like TS2D. LLD is out of scope. Series title *System Design*, subtitle *Distributed Systems · Events · Microservices*. Code in TypeScript. Concept first, no per-tool chapters.
- **Rare-topic rule:** keep a topic if it appears in DDIA, Alex Xu, or Hello Interview's commonly-asked lists; cut it if it lives only in papers. Already cut: TrueTime, 3PC, hinted handoff, chain replication, distributed snapshots, Byzantine faults, compression costs, cloud price list. Add one chaos-engineering page to booklet 05 module "Surviving a dependency".
- **One owner per topic across booklets:** clocks → 03 only; quorums → 02; sagas: 03 owns transactional reasoning, 04 owns message flow; idempotency → 01 (04 keeps only idempotent producer/consumer pages); rate limiting and caching → 05 owns the mechanism, 06 has the interview-design version with `→05` cross-references.
- **Target size:** 60–85 pages per booklet, ~400–440 total. 01 landed at 71.
- **Rejection test for every page:** sounds like AI · a sentence with no information · a diagram that decorates · a number without a source · overflow.
- **Interview blocks:** `:::interview` … `:::` = a real interview question plus a crisp answer, max one per page, only where the question is genuinely asked. Never a quiz.
- **Edit where the draft is good, rewrite where it is not**, page by page. Booklet 01's draft tracked the research list closely; samples from 04 and 06 were chattier ("what if…", "crippled", "drastically", quiz-style interview blocks) and will need more rewriting. 02 has 64 pages against 81 approved and 04 has 70 against 107, so those two have gaps to fill from the research lists.
- **Unverified numbers are cut, not softened.** Anything in the research file's §5 "Could not verify" is phrased as reasoning, never quoted as a number.
- **Glossing:** a one-line bold definition at first use for terms a mid-level engineer may not know (SRE, control plane, split brain, token bucket, optimistic locking, fencing token, …). Industry basics (TCP, DNS, load balancer, HTTP) are not glossed on the page; they go in the volume glossary at merge time.
- Cover `title` in each booklet `meta.json` must be a two-element array or `books/tech/cover.mjs` crashes. All six are already set.
- Overflow is measured only by the full PDF build, not `--html`. The build prints `overflow <file> <mm>mm of 186mm` for each page that is too long.
- Task docs live in `docs/tasks/` (repo convention). `docs/tasks/system-design-ebook.md` is the task file; append a dated entry under "## Updates" per booklet, never rewrite old entries.
- One commit per finished booklet, plain human message, ending with `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.

## The token-lean working method (agreed with the user on 2026-09-20 — follow it)

1. **No research agents.** Research is done: `docs/tasks/system-design-research/0N-*.md`, one per booklet. §1 is the approved page list (drafting order and page titles), §4 the verified facts with source URL and date, §5 what could not be verified.
2. **Read the draft with SVG bodies stripped** to save tokens: `grep -v "^  <" file.md`. Read one module at a time, edit, move on. Do not re-print files after editing.
3. **Edit by script, not by hand-retyping.** Write a Python file to the scratchpad with exact `str.replace` pairs and `assert a in s`, run it once. Do not use bash heredocs for multi-line content on this Windows Git Bash — they choke on quotes; use the Write tool for files and scripts.
4. **Mechanical checks by script, zero tokens:** `node tools/check-pages.mjs books/tech/system-design/0N-<booklet>` checks `# Module N - Title` on opening pages, exactly one `##` per page, ≤2 visuals, ≤1 interview block, banned words, throat-clearing, exclamation marks, literal `\n`, and every "Module N, page M" / "page M of this module" cross-reference. Run it before the build.
5. **Two builds per booklet, not eight.** Edit the whole booklet, then `node tools/build.mjs 0N-<booklet>`, fix every overflow line in one batch, build again. No screenshots unless a diagram was newly written.
6. **One fact-check agent per booklet, on Sonnet, not Opus** (`subagent_type: general-purpose`, `model: "sonnet"`, `run_in_background: true`). Give it: the booklet's pages, the research file's §4 and §5, a hard cap of 10 web fetches, and this rule: a claim that matches §4 is OK with no fetch; only check what the draft added. Ask for WRONG / UNVERIFIED / CODE / OVERSTATED lines, no prose. Nothing else runs in parallel with it. No separate consistency agent: repeats are caught while editing with targeted greps (e.g. `grep -l "1 − 0.99" pages/*.md`), the rest by the script.
7. **Code samples must run.** Write a tiny self-check in the scratchpad (`node x.mjs`, assertions, a mock where a database would be needed) and run it. Booklet 01's checks are `retry-check.mjs` and `idem-check.mjs` in the previous session's scratchpad; they are not in the repo. Note in the task file what was run and what it asserted; do not put "verified:" lines on the page itself.
8. **Fresh chat per booklet.** Long conversations re-send their whole history on every tool call. Finish a booklet, commit, update this handoff and the task file, stop. The next booklet starts from this file.

## Current state

**Done:** booklet 01 Foundations, 71 pages, 11 modules, zero overflow, fact-checked and consistency-checked, committed `71479a5`; docs commit `3a3846e`. `tools/check-pages.mjs` written and run clean on 01 (uncommitted at the time of writing; commit it with the next booklet or on its own). The task file's Updates section has a full entry for 01 including everything the passes caught; read it once — the same classes of error will recur (fabricated quotes, misdescribed incidents, mixed formulas in one table, stale cross-references after renumbering, `fetch` assumed to throw on 5xx, pseudo-SQL with invented error codes).

**Not started:** booklets 02 Data (draft 64 pages, approved 81), 03 Consistency (93 / 93), 04 Events (70 / 107), 05 Services (107 / 107), 06 Case Studies (110 / 110); the glossary; the bound volume (`frontmatter/`, `backmatter/` as in TS2D; series `meta.json` already has `masterVolume: {name: "system-design-complete"}` and `order`); the one-line follow-up in TS2D `06-api-design/pages/05-03` (old `RateLimit` header syntax) which is out of scope for this series.

**Awaiting:** the user's read of `dist/tech/system-design/01-foundations.pdf`. Their notes calibrate 02–06. If they have given none, proceed with 02.

## Work in progress (verbatim)

The work product is the set of files on disk. Nothing is mid-edit. The one text that exists only here is the fact-check prompt to reuse per booklet (fill in N and the module range):

```
You are a technical fact-checker. Repo: `C:\Users\hp\Desktop\Projects-Root\Ebook Management`. Today is <date>.

Read every page in `books/tech/system-design/0N-<booklet>/pages/` except `00-cover.md`. Then read sections 4 ("Facts to get right") and 5 ("Could not verify") of `docs/tasks/system-design-research/0N-<booklet>.md`; those are the pre-verified facts, with sources, the pages were written from.

For every number, named source, quotation, default value, config key, HTTP status and definition on the pages:
1. If it matches a fact in §4, mark OK, no fetch.
2. If it is NOT in §4 or differs from it, fetch the primary source and check. Hard cap: 10 web fetches total. Prefer official docs, RFCs, papers, the engineering blog of the company that built it. If you run out, list the rest as UNVERIFIED.
3. Redo any arithmetic yourself.
4. For TypeScript samples: does the code use real API names and real error codes; does `fetch` get treated as throwing on a 5xx (it does not); would it run.
5. Check every "Module N, page M" cross-reference points at an existing page on that topic (list the files).

Do NOT edit any file. Reply with a concise report: WRONG (claim → correct value → source), UNVERIFIED (claim → what you tried), CODE (file → problem), CROSS-REF BROKEN, OVERSTATED (sentence beyond its source), then one line with the OK count. No preamble.
```

## Rejected paths

- Six research agents at once, or Opus for the checkers, or three check agents per booklet — that is how booklet 01 spent ~70% of a session budget. See the method above.
- A blanket rewrite of every page — wasteful where the draft is good; edit those.
- One big book; per-tool chapters; an LLD booklet; the folder name with spaces and `&`.
- Bash heredocs for page content on this machine (quoting failures wrote nothing twice).
- Reading PDFs with the Read tool (`pdftoppm` not installed). If a visual check is truly needed: build with `--html`, then a puppeteer-core script that screenshots `.page` elements; Chrome is at `C:/Program Files/Google/Chrome/Application/chrome.exe`.
- The rough file's "consistency ladder" (mixes serializable and linearizable), its backpressure fix list (more consumers past the partition count does nothing), its idempotency diagram (check-then-execute race), and `hash(key) % N` as a sharding strategy — all corrected in the research files; do not reintroduce.
- Case studies already cut by research (do not re-add): KV store, ID generator, message queue, object store, hotel reservation, nearby friends, stock exchange, email, Maps, LLM inference serving.

## Tone & working preferences

- Plain words, point form, short sentences, one idea each; define every technical term in one line at first appearance; bold what matters in long lists; no "Great question", no summary of the summary.
- End every substantial reply with three headings in this order: **What I achieved** / **What I need from you** / **Next steps** (numbered). Only claim what is done and verified; say what failed or was skipped.
- Plan before anything beyond a one-line fix; ask open questions all together with a recommended answer each; wait for a go. Trivial work: say "this is trivial, doing it now".
- After finishing a booklet give the full walkthrough: what changed, why, how it works step by step, files, decisions, real verification output, edge cases.
- Never silently assume; say assumptions out loud. Correct the user directly when they are wrong.
- Ponytail mode (level full): shortest working diff, reuse what exists, no speculative abstractions.
- The user's explicit instruction after the rate-limit crash: work in a token-safe way; never enough agents at once to hit a session limit.
- Spec-driven: the task file is appended with dated entries, never rewritten.

## Immediate next step

If the user has left notes on booklet 01's PDF, apply them first. Otherwise start booklet 02: run `git status` to confirm the tree, commit `tools/check-pages.mjs` if still uncommitted, read `docs/tasks/system-design-research/02-data.md` §1 and §4, then read the draft pages of `books/tech/system-design/02-data/pages/` one module at a time with SVG bodies stripped, and edit/cut/fill toward the approved 81-page list at 60–85 pages, following the method above.
