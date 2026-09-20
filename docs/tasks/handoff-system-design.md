# Handoff: writing the "System Design" six-booklet PDF series in the Ebook Management repo

## Context & goal

The user (git user KaleemAhmed123, email hamza.dev011@gmail.com) runs a Markdown-to-PDF "book factory" at `C:\Users\hp\Desktop\Projects-Root\Ebook Management`. Markdown pages in `books/<domain>/<series>/<book>/pages/*.md` build to styled A5 PDFs in `dist/` via `node tools/build.mjs`. They have shipped several tech books already (TypeScript to Deployment, Frontend Mastery, Production Terms glossary). They asked for one more PDF: **system design**, taught "in this unique compact way no fluff", at the same depth as the TypeScript-to-Deployment series. They are a mid-to-senior engineer preparing for distributed systems, event-driven and microservices interviews. The rough source they supplied was a cheap-model DDIA-shaped curriculum; the user asked us to validate it with our own research, fill gaps, cover everything important, and skip rare topics.

## Key decisions made

- **Both fundamentals and case studies.** User chose (c) "both".
- **A series of 6 booklets, bound into one volume at the end** exactly like `books/tech/typescript-to-deployment` (divider per booklet, one contents, glossary, preface, final note, about-the-author, copyright). User: "do in batches for those split and at last merge like we did for typescript to deployment with toc and glossary and preface and final note etc".
- **Reader:** mid engineer to senior.
- **Size:** user said "you decide — I want depth like my TypeScript to Deployment series". Settled at 80–120 pages per booklet; research landed on **585 pages** total.
- **LLD (low-level design: SOLID, class diagrams, parking lot) is NOT in this series.** User: "not in this series".
- **Folder renamed** from `books/tech/Distributed-Systems & System-Design/` to `books/tech/system-design/`. User approved. The rough source moved to `docs/tasks/reference/system-design-rough.txt`.
- **Series title:** *System Design*. **Subtitle:** *Distributed Systems · Events · Microservices*. User approved.
- **Code samples in TypeScript.** User approved.
- **Concept first, never a per-tool chapter.** Real systems (Postgres, Kafka, Redis, DynamoDB, etc.) named as examples only.
- **`:::interview` callout block** (already declared in `books/tech/meta.json` `blocks`) used for "what the interviewer is really testing", max one per page.
- **Topic list approved by the user** on 2026-09-20 ("rest topic list I approve if you think something is missing we can add later except distributed systems topics"). Distributed-systems coverage was then verified against the user's own §56 red-zone list in the rough file (all 34 items present) and a standard checklist. Only three topics were missing: **chaos engineering (add one page to booklet 05 "Surviving a dependency")**, chain replication (skip, rare), distributed snapshots / Chandy-Lamport (skip, rare).
- **Overlaps resolved, one owner per topic:** clocks → booklet 03 only (01's 5-page clocks module dropped; 01 is 87 pages not 92); "a timeout proves nothing" page dropped from 03 (03 is 93 not 94); quorums N/W/R → 02; sagas: 03 owns transactional reasoning, 04 owns message flow; idempotency: 01 owns the HTTP mechanism, 04 keeps only idempotent producer/consumer pages; rate limiting and caching: 05 owns the mechanism, 06 has the interview-design version with `→05` cross-references.
- **Cover accent colours:** volume `#24405e`; 01 `#1d4e89`; 02 `#0b6e4f`; 03 `#7a1f6b`; 04 `#b8541a`; 05 `#2f6f73`; 06 `#8b1e3f`.
- **Cover `title` must be a two-element array** (`books/tech/cover.mjs` destructures `[t1, t2]`); a one-element array crashes the build. Fixed on 2026-09-20.
- **Token-safety rule (user's explicit instruction after a session-limit crash):** "make sure we finish without hitting token limit this time … work in safe optimized way". Therefore: one booklet at a time; fact/consistency passes are one small agent per module (not per page, not six at once); research agents must write their output file early and append; never spawn six agents in parallel again.
- **Task docs live in `docs/tasks/`** (the repo's convention, with `docs/tasks/README.md` as the index), not `docs/specs/`.
- Overflow is measured **only by the full PDF build** (`node tools/build.mjs 01-foundations`), not by `--html`. The build prints `overflow <file> <mm>mm of 186mm — run --split` when a page is too long.
- Build a booklet by its short folder name: `node tools/build.mjs 01-foundations`. `system-design/01-foundations` does not match.

## Current state

**Done and on disk:**
- `docs/tasks/system-design-ebook.md` — the task file: requirements in the user's words, answered-questions table, six-booklet plan, checklist, dated updates including the merged topic list and overlap decisions.
- `docs/tasks/README.md` — index row added, status "planned — topic list awaiting approval" (now stale: it is approved and drafting has started; update it).
- `docs/tasks/system-design-research/BRIEF.md` — the research brief.
- `docs/tasks/system-design-research/01-foundations.md` (313 lines, 92 page lines), `02-data.md` (342, 81), `03-consistency.md` (306, 94), `04-events.md` (332, 107), `05-services.md` (345, 107), `06-case-studies.md` (415, 110). Each has: §1 modules and pages (one line per page: `` `NN-MM-slug` — title — the one idea — the failure mode — diagram type ``), §2 what the rough file missed, §3 cut/move list, §4 verified facts with source URL and date, §5 could not verify, §6 sources. **These page lines are the drafting order and the source of every fact.**
- `books/tech/system-design/meta.json` (series: title, subtitle, `seriesLine`, `order` of six booklets, `masterVolume: {name: "system-design-complete"}`, cover). `seriesLine` overrides the domain-level one ("TypeScript to Deployment · The Ultimate Guide") which would otherwise print on our covers.
- `books/tech/system-design/0N-<booklet>/meta.json` for all six booklets, each with `pages/` directory. Titles: 01 `["Foundations","Promises & Failure"]`, 02 `["Data","Storage & Replication"]`, 03 `["Consistency","& Consensus"]`, 04 `["Events","Queues & Streams"]`, 05 `["Services","& Building Blocks"]`, 06 `["Case","Studies"]`.
- `node tools/build.mjs --list` resolves all seven targets (six booklets + `tech/system-design-complete`).
- **Booklet 01, Module 1 (7 pages) + cover:** `00-cover.md`, `01-01-what-reliable-means.md`, `01-02-faults-come-in-families.md`, `01-03-a-first-year-of-a-cluster.md`, `01-04-describe-load-before-you-scale-it.md`, `01-05-sli-slo-sla.md`, `01-06-latency-is-a-distribution.md`, `01-07-coordinated-omission.md`. **Built to PDF with zero overflow warnings** (`dist/tech/system-design/01-foundations.pdf`, 9 pages: cover, contents, 7). Visually checked via screenshots; one SVG label clip on 01-01 was fixed after the build (not rebuilt since).
- **Booklet 01, Module 2 (7 pages):** `02-01-the-nines-table.md`, `02-02-time-based-vs-request-based.md`, `02-03-mtbf-and-mttr.md`, `02-04-hard-dependencies-multiply.md`, `02-05-redundancy-adds-nines.md`, `02-06-correlated-failure-in-practice.md`, `02-07-the-cost-of-a-nine.md`. **Written but NOT yet built, NOT overflow-checked, NOT fact-checked.**

**Mid-flight:**
- A fact-check subagent was launched on Module 1 (pages 01-01 to 01-07). Its result had not arrived when this handoff was written and **will not reach the next model**. Re-run it (prompt below).

**Not started:** Booklet 01 Modules 3–12 (80 more pages: Scaling dimensions 8 · Latency numbers 9 · Back-of-the-envelope 7 · Request lifecycle 9 · Unreliable network 9 · Timeouts 8 · Retries/backoff/jitter 9 · Idempotency 7 · Five questions and trade-off map 7 — Module 8 "Clocks and pauses" is DROPPED, do not write it); booklets 02–06; glossary; volume merge (`frontmatter/`, `backmatter/` as in `books/tech/typescript-to-deployment/`); the follow-up fix in TS2D `06-api-design/pages/05-03` (old `RateLimit` header syntax, now `RateLimit: "default";r=50;t=30` plus `RateLimit-Policy` per IETF draft-11, May 2026) — out of scope for this series, logged only.

## Work in progress (verbatim)

The work product is the set of files listed under "Current state"; they are complete on disk and are the verbatim source. Read them with the file tools before touching anything. Two items exist only in this conversation and are reproduced here in full.

**1. The fact-check prompt that was running on Module 1 (re-run it as-is, then run the same for Module 2 with `02-01-*` … `02-07-*`):**

```
You are a technical fact-checker. Repo: `C:\Users\hp\Desktop\Projects-Root\Ebook Management`. Today is 2026-09-20.

Read the seven pages `01-01-*.md` through `01-07-*.md` in `books/tech/system-design/01-foundations/pages/`. Then read section 4 ("Facts to get right") and section 5 ("Could not verify") of `docs/tasks/system-design-research/01-foundations.md` — those are the pre-verified facts and sources the pages were written from.

For every factual claim, number, attribution and definition on the seven pages:
1. Check it against the research file's verified facts first. If it matches a verified fact, mark it OK with no fetch.
2. If it is NOT in the research file, or differs from it, fetch the primary source and check. Keep fetches to the minimum: at most 8 web fetches total.
3. Do the arithmetic yourself: the 43-minute error budget, 1 − 0.99^100, the coordinated-omission example.

Do NOT edit any file. Reply with a short report, one line per finding, in three groups: WRONG (claim, what is correct, source), UNVERIFIED (claim, what you tried), OK (count only). Also list any sentence that overstates beyond what the source supports. Be concise; no preamble.
```

**2. The page conventions used for every page written so far (derived from `CLAUDE.md`, `docs/tasks/production-terms-writing-brief.md`, and `books/tech/typescript-to-deployment/06-api-design/pages/02-06-idempotency-keys.md`):**

```
- One markdown file = one printed A5 page. Printable height 186 mm. Max two visuals per page.
- First page of a module starts with `# Module N - Title` (hyphen, not en dash), then `## Page topic`.
  Every other page starts with `## Page topic`. `##` is what the contents page lists. `###` for sub-points.
- Body is short bullets, no trailing full stops on bullets. Bold the term the first time it is defined,
  define it in one line right there.
- Each page: state the idea, show the smallest example/table/diagram, name the failure mode
  (usually a `### The failure` section). Then stop.
- Voice: plain English, short sentences, "kinda academic", never salesy. Banned: delve, foster, robust,
  demystify, embark, leverage (verb), seamless, streamline, comprehensive. Banned openers: "In this section",
  "It is important to note", "Let's explore", "In conclusion". No recaps.
- Tables: plain GFM tables; theme styles them.
- SVG: inline, hand-written, `viewBox="0 0 460 H"` with H 60–110, `role="img"` and a full-sentence
  `aria-label`, `xmlns="http://www.w3.org/2000/svg"`. Ink #1a1a1a, muted #6b6b6b, rules #e0e0e4,
  highlight fill #e2fcf3 with the booklet accent as stroke (01 = #1d4e89). Fonts `Georgia,serif` for
  labels, `Consolas,monospace` for code-ish text, sizes 8.5–11. Arrowheads
  `<path d="M<x> <y> l-7 -4 v8 z" fill="#1a1a1a"/>`. Keep text inside x ≤ 452 or it clips.
  Never mask a line with a white rect for a caption.
- `:::interview` … `:::` block: max one per page, for "what the interviewer is really testing".
- Only claims present in the research file's §4 "Facts to get right", or reasoning/arithmetic the
  reader can check. Anything in §5 "Could not verify" is phrased as reasoning, never quoted as a number.
- Cover page `00-cover.md` for a booklet:
    <p class="cover-book">System Design &nbsp;·&nbsp; Distributed Systems · Events · Microservices</p>

    # Foundations

    <p class="cover-sub">Promises, Numbers, Failure - Booklet 1 of 6</p>
- After each module: `node tools/build.mjs 01-foundations` (full PDF build) and read the output for
  `overflow` lines. Then one fact-check agent for the module. Fix, cut anything still unverified.
- Screenshot helper (scratchpad, not in repo): a puppeteer-core script that loads
  dist/tech/system-design/01-foundations.html, selects `.page` elements and screenshots by index;
  Chrome is at C:/Program Files/Google/Chrome/Application/chrome.exe. Rebuild `--html` first.
```

## Rejected paths

- **One big book instead of a series** — unbuildable and uncheckable in pieces.
- **Per-tool chapters (Kafka, Redis)** — version churn; concept pages outlive them.
- **LLD booklet at the end** — different genre; user said not in this series.
- **Keeping the folder name `Distributed-Systems & System-Design`** — spaces and `&` break shell paths and `dist/` names.
- **Writing pages via bash heredocs in one batch** — the shell choked on quoting (`unexpected EOF while looking for matching '`) and wrote nothing; the Write tool per file is what works.
- **Reading PDFs with the Read tool** — `pdftoppm` is not installed; use the puppeteer screenshot approach on the `--html` build instead.
- **Six research agents at once** — all six died on a session rate limit before writing anything; they were resumed one message each after the reset. Do not repeat.
- **Case studies cut by research (do not re-add):** key-value store, unique ID generator, distributed message queue, S3-like object store (mechanisms already in 02–05); hotel reservation (folded into ticket booking); nearby friends (folded into ride matching); stock exchange, email service, Google Maps (niche); LLM inference serving (real 2025–26 trend, parked for a later book).
- **The rough file's "consistency ladder" (§50)** — mixes serializable and linearizable, two different axes; replaced.
- **The rough file's backpressure fix list (§40)** — wrong as written (more consumers past the partition count does nothing); rewritten in 04.
- **The rough file's idempotency diagram (§23)** — the buggy check-then-execute-then-store version; 01 page 11-05 must teach insert-the-key-first, catch the unique violation.
- **`hash(key) % N` as "the" sharding strategy** — it is the anti-pattern; 02 Module 8 says so.

## Tone & working preferences

- Simple words, point form, short sentences, one idea each. Explain every technical term in one line the first time it appears, assuming the user is learning the area from scratch. Bold what matters in long lists. No "Great question", no closing summary-of-summary.
- End every substantial reply with three headings in this order, never renamed or skipped: **What I achieved**, **What I need from you**, **Next steps** (numbered). If nothing is needed, write "Nothing — you're clear".
- Plan before coding anything beyond a one-line fix; restate the task, write the plan, list open questions all together with a recommended answer for each, wait for approval. Trivial work: say "this is trivial, doing it now".
- Ask open questions **all together, not one at a time** (this overrides the brainstorming skill's one-at-a-time rule).
- Spec-driven: the task file in `docs/tasks/` is appended, never rewritten; every phase gets a dated update entry.
- Teach as you go: before coding say what is being built and what is deliberately not changed; surface decisions that matter; after coding give a full walkthrough (what changed, why, how it works step by step, files, decisions, verification with real output, edge cases).
- Never silently assume; name assumptions out loud. Correct the user directly when they are wrong.
- Ponytail mode (level full) governs code: shortest working diff, no speculative abstractions, reuse what exists.
- Subagents: spawn only when 3+ independent substantial chunks; write the brief to a file first; one file per agent; run in background; verify their work yourself. **And now: never enough at once to hit a session limit.**
- Report faithfully: if something failed or was skipped, say so under "What I achieved".
- Flow diagrams: text/Mermaid by default in the task file; Excalidraw only if the user says yes.

## Immediate next step

Run `node tools/build.mjs 01-foundations` from `C:\Users\hp\Desktop\Projects-Root\Ebook Management`, confirm there are no `overflow` lines for the 14 pages of booklet 01 (Modules 1 and 2), then launch the fact-check prompt above for Module 1 and again for Module 2 (`02-01-*` … `02-07-*`), fix what comes back, and only then continue with booklet 01 Module 3 ("Scaling dimensions", 8 pages) using the page lines in `docs/tasks/system-design-research/01-foundations.md` §1 and the facts in §4.
