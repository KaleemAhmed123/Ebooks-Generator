# Task — Frontend Mastery audit pass

**Status:** in progress — fixes applied for 4 of 8 parts
**Started:** 2026-09-04
**Last updated:** 2026-09-04

The same fact + consistency + voice pass that was run over *The Vocabulary of
Production*, aimed at `books/tech/frontend-mastery/`.

**The book:** 381 pages, ~74,800 words, 169 chapters across 8 parts — The
Browser Platform, The Language, React, State And Style, The Network And The
Framework, Fast Tested Accessible, Ship It, The Career.

**Why it needs a different prompt from the glossary:** this is a teaching book,
not a reference. A glossary entry is checked in isolation. A chapter is checked
against the chapters around it, because chapter 13 can contradict chapter 8 and
neither is wrong on its own. It also carries far more version-pinned claims —
React 19, Next 16, Tailwind 4, Vite 8 — and those are the first thing to rot.

---

## The prompt — paste this

```
Audit books/tech/frontend-mastery/ — a 381-page teaching book on frontend
engineering, 169 chapters in 8 parts. I want it checked the way a technical
editor checks a book before it prints, not the way an author re-reads their own
draft.

Split the work across parallel subagents, partitioned by part, so no two agents
read the same file. Each agent gets one part and reports on that part only.

Run four passes over every chapter.

1. FACT PASS
   Check every claim, version number, API signature, config key, CLI flag,
   default value and benchmark figure against a live primary source — the
   official docs, the spec, the project's own repo or changelog. Not blog
   posts, not summaries, not memory.

   Pay closest attention to the version-pinned material, because it is what
   rots first:
     - React 19 — hooks, the compiler, Actions, `use`, Activity, Effect Events
     - Next 16 — App Router, cache components, server actions, proxy/middleware
     - Tailwind 4 — the CSS-first theme, `@theme`, the Oxide engine
     - Vite 8 / Rolldown / Turbopack — which is default, which is opt-in
     - TypeScript — `infer`, mapped and conditional types, narrowing rules
     - Vitest, Playwright, MSW, Storybook — current API surface
     - WCAG levels, ARIA roles, CSP directives, Trusted Types, passkeys
     - any pricing or quota (Vercel, AWS Amplify, CI minutes)

   For every claim you check, report: file:line, the claim as written, the
   source URL, and a verdict — CORRECT, WRONG (with the right value), or
   UNVERIFIABLE.

   Report what you could NOT verify as loudly as what was wrong. A claim no
   primary source backs gets cut, not softened.

2. CONSISTENCY PASS
   You have the whole part, so read it as one document.
     - Does any chapter contradict another? Same concept, different number,
       different recommendation, different default.
     - Does any chapter repeat another? If chapter 14 re-teaches what chapter 6
       already taught, name both and say which should keep it.
     - Is any term used two different ways, or introduced twice as if new?
     - Does a chapter reference something it has not defined yet, or something
       that appears only in a later part?
     - Do the code samples agree with each other — same imports, same style,
       same version of the API?

3. VOICE PASS
   The book's rules, from CLAUDE.md:
     - No AI tropes: delve, foster, robust, demystify, embark, seamless,
       leverage, landscape, realm, tapestry.
     - No throat-clearing: "In this section", "It is important to note",
       "Let's dive in", "In conclusion", "As we saw earlier".
     - Show, don't tell. Never call a thing powerful, efficient, elegant or
       game-changing — show the mechanism and let the reader decide.
     - Every term gets a one-line meaning the first time it appears.
     - Short sentences, one idea each. Delete any sentence carrying no
       information — if a paragraph survives deletion it should have been
       deleted.
   Quote the offending line with its file:line. Do not rewrite it yet.

4. STRUCTURE PASS
     - One markdown file = one printed page. Flag any file that will overflow.
     - Do all chapters have the same shape, or do some carry scaffolding
       headings the others do not? Report any `###` subheading pattern that
       appears in some chapters and not others.
     - Is there a diagram where three or more sentences describe a relationship
       or a flow? Prose that should have been an SVG is a finding.
     - Is there a diagram that only decorates — where the prose still says the
       same thing? That is also a finding.

REPORTING
  One markdown file per agent, written to
  docs/tasks/frontend-mastery-audit/<part-slug>.md.
  Group findings by pass. Order them by severity: wrong facts first, then
  contradictions, then repeats, then voice, then structure.
  Every finding must carry file:line and a quote. A finding I cannot locate in
  ten seconds is not a finding.

  Do NOT edit any content file. This pass reports; a later pass fixes.

WHAT NOT TO DO
  Do not report a finding you have not verified against a source you actually
  fetched. Reasoning from a model you remember — a pricing multiplier, an API
  that used to exist, a default that changed — produces confident wrong
  findings, and one of those costs more than the ten real ones it hides.
  If you are reasoning from memory, say so and mark it UNVERIFIABLE.
```

---

## After the agents report

Do not apply the findings straight from the report. The production-terms pass
produced one finding — GitHub's CI per-minute prices — that was itself wrong:
the reviewer reasoned from a Windows multiplier GitHub no longer publishes. It
was caught only because the numbers were re-checked against the live billing
page before being changed.

So: re-verify anything that changes a number, then fix, then rebuild.

```
node tools/build.mjs frontend-mastery --html    # fast, warns on overflow
node tools/build.mjs frontend-mastery           # the PDF
```

---

## Updates

### 2026-09-04 — audit launched

Eight subagents running in parallel, one per part, partitioned by filename
prefix so no two agents read the same file.

| Part | Prefixes | Files | Report |
|---|---|---|---|
| One — The Browser Platform | `00-`, `01-`, `02-` | 54 | `part-one-browser-platform.md` |
| Two — The Language | `03-`, `04-`, `05-` | 42 | `part-two-the-language.md` |
| Three — React | `06-`–`09-` | 54 | `part-three-react.md` |
| Four — State And Style | `10-`, `11-` | 40 | `part-four-state-and-style.md` |
| Five — Network And Framework | `12-`, `13-` | 32 | `part-five-network-and-framework.md` |
| Six — Fast, Tested, Accessible | `14-`–`17-` | 70 | `part-six-fast-tested-accessible.md` |
| Seven — Ship It | `18-`–`21-` | 66 | `part-seven-ship-it.md` |
| Eight — The Career | `22-`–`24-` | 23 | `part-eight-the-career.md` |

The shared instructions live once in
`docs/tasks/frontend-mastery-audit/BRIEF.md`. Each agent reads that file rather
than carrying a copy of the prompt, so the eight briefs cannot drift apart.
Each agent prompt adds only three things: its part, its file prefixes, and the
specific primary sources that part must be checked against.

Two constraints added beyond the original prompt:

- **Agents may not run the build.** `tools/build.mjs` writes into the shared
  `dist/`; eight agents running it at once would collide. Overflow is judged by
  word count against sibling pages instead, and the real overflow check is the
  single `--html` run after the fixes land.
- **The Ship It agent carries an explicit warning about invented prices.** That
  part holds every pricing and quota claim in the book, and it is exactly where
  the production-terms pass produced its one wrong finding. Its brief requires a
  fetched vendor billing page with a pasted URL, or the claim is marked
  UNVERIFIABLE — never a price computed from a remembered multiplier.

Reports only. No content file is edited in this phase.

### 2026-09-05 — all eight agents died; restructured the pass

**What happened.** All eight agents terminated at the same moment on a shared
session token limit, every one of them mid-fact-pass. **Zero reports were
written.** `BRIEF.md` was the only file in the audit folder afterwards.

The partition was not the problem — no two agents ever touched the same file.
The concurrency was. Eight agents each reading 30–70 pages *and* fetching dozens
of live documentation pages all draw on one shared budget, and they drained it
before any of them reached the point of writing output. The failure mode is
worth recording: the work was lost not because it was wrong but because it was
all still in flight when the budget ran out.

**The restructure.** Split the four passes by what they actually cost.

Passes 3 (voice) and 4 (structure) need **no network at all**. They are banned
words, throat-clearing phrases, word counts, heading patterns and diagram
counts — grep and arithmetic. Those were run over all 381 files directly, with
no subagent, for effectively nothing. Result:
`frontend-mastery-audit/voice-and-structure-whole-book.md`.

Doing them whole-book rather than per-part turned out to be strictly better, not
just cheaper. Two of the three real findings are only visible from above:

- **30 "show, don't tell" violations** that cluster in chapter groups `10-`,
  `12-`, `20-`, `23-`, `24-` while Parts One–Three are nearly clean. A per-part
  agent sees four violations and calls it a nitpick. The whole-book view shows
  which chapters never got the voice pass the others did.
- **29 diagrams across 381 pages**, with `16-` (accessibility, 13 pages), `23-`
  (6 pages) and `24-` (8 pages) at zero. No per-part agent can know that its own
  count is low.

Also found: 17 pages print the heading `## Continued - continued`, a build
artifact from past `--split` runs. `tools/build.mjs:456` falls back to the
literal string `"Continued"` when the chunk it is splitting carries no `##`, and
line 457 appends `" - continued"`. It does **not** reach the contents page —
`build.mjs:165` filters headings ending in `- continued` out of the TOC — but it
does print as a visible `<h2>`. Fixing the 17 files without fixing line 456
means the next `--split` re-creates them.

**Pass 1 (fact) and pass 2 (consistency) still need agents**, because they need
live sources and a reader holding a whole part in mind. Those now run **two at a
time**, highest-rot part first, under an addendum brief
(`frontend-mastery-audit/BRIEF-FACT.md`) that adds three rules learned from the
failure:

- Skip passes 3 and 4 — already done, do not repeat them.
- Cap at roughly 25 web fetches, spent on a prioritised list of the specific
  claims most likely to have rotted, rather than checking everything evenly.
- **Write the report early and append.** A partial report on disk beats a
  perfect one that dies in flight. "NOT CHECKED" is a required, legitimate
  outcome, and the report must open with a budget line saying what was skipped.

Wave 1 launched: Part Three (React) and Part Five (Network and Framework) — the
two parts holding almost all of the React 19 and Next 16 version claims.

### 2026-09-05 — four of eight parts audited; consolidated into a fix list

**Done.** Parts Three, Four, Five and Seven fact- and consistency-audited.
Voice and structure done for all 381 pages. Every finding I re-verified myself
is in `frontend-mastery-audit/VERIFIED.md`; the actionable list is
`frontend-mastery-audit/FIX-LIST.md`. **No content file edited.**

**Not done.** Parts One, Two, Six and Eight — 189 pages. The Part One and Part
Six agents each died twice on the session limit, the second time with 24 fetches
already spent, at the moment they began writing. Both left a header-only stub.

**The lesson the second failure taught, which the first did not.** The
`BRIEF-FACT.md` instruction "write your report early and append" was followed
literally and uselessly: both agents wrote a placeholder header with
`_(in progress — appended as verified)_` and held every finding in memory until
the end. The instruction needs to be "append each finding to the file **as you
verify it**, before moving to the next" — a placeholder is not a partial report.
Worth fixing in the brief before the remaining four parts run.

**Stopped launching agents** rather than going for a third attempt into the same
limit. Four completed parts consolidated instead.

**Ten fixes are ready to apply**, each re-verified against a source fetched
directly rather than taken from an agent report. Highest severity: the two
chapters teaching "pin to a SHA because the comment can lie" carry
`actions/checkout@08c6903…  # v7.0.0`, and that SHA is tag **v5.0.0** (real
v7.0.0 is `9c091bb2…`, both confirmed against GitHub's ref API).

**One brief that could not be executed, which is itself the finding.** Part
Seven was briefed hardest of the eight because it was expected to hold every
price in the book and because pricing is where the production-terms pass went
wrong. It holds no prices at all — no currency symbols, no quotas, no
per-minute rates across 66 files. `20-04-vercel-vs-aws-amplify-*` is entirely
qualitative. Recorded in the fix list so that no later pass "helpfully" adds
current pricing to that chapter.

**Two number claims caught that would have survived a careless pass**, both
re-fetched from the authoritative API rather than a dashboard:
`styled-components` is at **11,459,678** weekly downloads against the book's
"fell to 6.8 million" — higher than the book's own *before* figure, so the
decline the chapter argues for is not visible in the measure it cites. And
`tailwindcss` is at **125,634,238**, ten times the book's "12 million". The
recommendation is to cut the section rather than update it: 125 M is inflated by
transitive installs and CI runs, so the corrected number would be misleading in
a different direction.

### 2026-09-05 — fixes applied

All ten verified fixes applied, plus decisions D1, D3, D4 and D6. Book rebuilds
clean: **387 pages, no overflow warnings.**

**Facts corrected.** The mislabelled `actions/checkout` pin moved to the real
v7.0.0 SHA in both files. The caching sample became `async` with
`const { id } = await params`. The framework table now sends a React team to
**React Router v7** and describes Remix v3 separately as the non-React framework
it became. The JSX chapter now teaches the automatic runtime — `_jsx` from
`react/jsx-runtime`, with `children` as a prop — and keeps `createElement` as
what the classic transform emitted. `forwardRef` became "will be deprecated".
"160ms each way" became "round trip" in prose and in the SVG label.

**Numbers kept and dated, per D5.** The npm figures now read 11.5 M for
styled-components and 126 M for Tailwind, "as of September 2026", with one line
saying what a download count actually measures — CI runs, mirrors and transitive
installs, not adoption decisions. That line matters: without it the corrected
numbers mislead in a new direction. The claim that styled-components *declined*
was cut, because it is false in the data; the chapter now says the category
split, which its mechanism section already argues.

**Voice.** 79 exclamation marks replaced across 55 files, and 31 show-don't-tell
rewrites. A full re-scan for powerful / magic / blazing / revolutionary / excels
/ incredible / enterprise-grade now returns clean. Tailwind's `!` important
modifier was excluded from the sweep by skipping any line carrying a `class`
attribute.

**D1 — the build fix.** `tools/build.mjs` no longer emits `Continued -
continued`. It strips any existing `- continued` suffix before appending one,
and emits no heading at all when the chunk has no `##` to continue — which is
the case that produced the literal string, since `cutBeforeHeading` can hand
`cutAtBlankLine` a page whose only headings are `###`. Five cases checked in
isolation (first split, second split, an existing double, `###`-only, no
heading); all pass. The `--split` path itself was **not** run, because it merges
and re-packs all 381 pages and would invalidate every `file:line` in the audit
reports. The 17 affected pages were repaired directly, each taking its real
chapter title.

**D3 — the hooks page.** `06-06` no longer re-teaches `useState`, `useEffect`
and `useRef`, which own chapters `06-03` to `06-05`. It now teaches the six that
were used but never taught: `useContext` (4 uses in Part Three), `useReducer`,
`useMemo` and `useCallback` (3 uses each), `useId` and `useLayoutEffect`. It
overflowed at 259mm, so it became `-1` and `-2` on the chapter's own convention.

**D4 — narrower than reported, and worth recording.** `"use server"` is not
missing from the book: Part Five teaches it across `13-04-server-actions-*`.
The gap was that Part Three taught `<form action={fn}>` without ever saying
where the function runs. Writing a full chapter would have duplicated Part Five,
which is what this audit exists to remove — so the fix is a bridge page,
`07-04-actions-and-form-hooks-2-2-3.md`, naming the directive and pointing
forward.

**D6 — one diagram, where prose was doing a diagram's job.** Focus trapping was
four lines describing movement. It is now an SVG contrasting tab order escaping
into the page behind against tab order wrapping to the first control, and the
prose dropped to three lines. Chapter group `16-` went from 0 diagrams to 1.

**One mistake made and caught.** Overwriting `16-02-focus-management-2-1.md`
dropped its `### The tabindex Attribute` section — `cat -n` numbers multiple
files continuously and the file boundary was misread. Caught by diffing every
changed page's headings against `HEAD`: 18 headings were missing, 17 of them the
intended `Continued - continued` replacements and one a deliberate rename, which
left exactly one real loss. The section was restored into `16-02-...-2-2.md`,
beside `focusgroup`, where it sits with the other tab-order material. **That
heading diff is worth running after any bulk page edit.**
