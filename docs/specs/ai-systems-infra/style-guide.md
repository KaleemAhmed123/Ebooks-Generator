# The Infrastructure Engineer — STYLE CONTRACT (read before writing any page)

This is binding. Every page in `books/tech/ai-systems-infra/` must pass this bar.
It was approved by the author against Booklet 1 Module 1 (the reference pages).
When in doubt, open `01-linux-machine/pages/01-01..01-03` and match them.

## 0. The non-negotiables

1. **Research before writing.** Never write a version number, API, limit, or behaviour from memory. Re-verify against a primary source at write time. Stable concepts need no version tag; attach versions only where behaviour depends on them. If you can't verify a fact, cut it. See "Verified facts" in `../ai-systems-infra.md` for facts already confirmed on 2026-10-02 — reuse those, don't re-research.
2. **One markdown file = one printed page.** Fits in **186mm × 126mm** (A5, 8.5pt). Build the booklet to PDF (`node tools/build.mjs <slug>`) and get **zero overflow warnings** before moving on. `--html` does NOT check fit.
3. **Density:** a page holds about **one SVG (~50mm) + 12–15 dense bullet-lines**, or ~22 text lines with no diagram. Write tight the first time. Compression is the style, not a constraint.
4. **Standalone series.** Re-teach whatever is needed; never assume the AI-eng series. But assume earlier booklets in THIS series were read — don't re-define a term already defined; cross-reference it ("Module N").

## 1. Voice (from the project CLAUDE.md, enforced)

- Plain English, short sentences, one idea each. Kinda-academic, confident, peer-to-peer — never salesy, never talking down.
- **Show, don't tell.** Never call a thing "powerful"/"robust"/"efficient" — show the mechanism and let the reader conclude it.
- **Banned:** "delve, foster, robust, demystify, embark"; throat-clearing ("In this section…", "It is important to note…", "In conclusion…"); artificial recaps; filler.
- Start each page with the core assertion, prove it, stop. Every sentence carries information or it's cut.
- Explain mechanism, not just fact — give a mental model the reader can reason from.
- Every new term gets a one-line meaning the first time it appears, and goes in the glossary (backmatter, built last).

## 2. Page structure

- **Module's first page** leads with `# Module Title` then `## Page topic`. Later pages in the module use `## Page topic` only. (The `#` is what the contents lists as a module group; the `##` is the page entry.)
- `###` = sub-point, stays off the contents. Continuation pages (same idea overflowing) carry **no heading**.
- A page's shape, in order, using what the idea needs (not all every time): **assertion → why it exists / problem it solves → mental model → how it works inside → how it connects to earlier booklets → a real production example → a failure mode (`:::warn`) → when to use / not → interview framing (`:::interview`) → a hands-on (`:::lab`)**.
- **Module close:** the last page (or a short `###` tail) gives **Key concepts · one practical task · 2–3 questions · a checkpoint ("you can now…") · what's next**. Keep it compact; it still must fit the page.

## 3. Blocks (only these; defined in series meta)

- `:::mint` — a centred diagram or a formula/number block (dark code inside renders light). Use for the one exact calculation or the key illustration.
- `:::note` — an aside that adds a mental model or a connection; not a summary.
- `:::warn` — **a failure mode / gotcha / the bug people actually hit.** Renders "Failure mode". Every substantial page should earn at least one over the module.
- `:::interview` — **two paragraphs: a bold question, then a plain-text answer.** Never one all-bold line. Staff-level framing: what's really being tested.
- `:::lab` — a hands-on exercise, **local/free first** (kind, minikube, LocalStack, Docker, k6, stress-ng). Real-AWS/GPU steps must be flagged optional with a free/CPU fallback.
- `:::incident` — a "debug this" drill: symptoms given, reader reasons to the cause. Renders "Debug this".
- Anything outside this list renders as literal text — don't invent blocks.

## 4. Diagrams (hand-written inline `<svg>`)

- Diagram anything with flow, structure, relationships, or >3 moving parts. A diagram **replaces** prose — if the paragraph still says the same thing, cut one.
- Rules: `viewBox` (≈360 wide); half-page diagram `viewBox` height ≤ ~130 (renders ≈ height×0.35 mm). `role="img"` + a real `aria-label`. Fonts 5.6–8pt. Georgia for labels. Keep padding/alignment so text never overlaps or clips. Use `&amp;` for `&` in text.
- Markers/defs: give each `<marker>` a unique id; the build scopes `<style>` and recolours accents for the volume, so write a real previewable colour (the booklet accent) in shapes.
- Make every box/arrow/label mean something. Grasp-at-a-glance first, details on inspection.

## 5. Accuracy discipline

- Primary sources for every factual claim (official docs, specs, source, RFCs). Secondary sources only to understand, never to assert.
- Run every code sample mentally/actually; commands must be real and correct for 2026.
- Distinguish documented behaviour from inference. Never fill a gap with a plausible-sounding guess.
- A missing point beats a wrong one.

## 6. Per-booklet mechanics

- Folder `NN-slug/`, `meta.json` (title, subtitle, seriesLine "The Infrastructure Engineer", tocTitle "Contents", `cover{accent,title[],banner,kicker,term[],stack[],face}`), `pages/00-cover.md` (`<p class="cover-book">`, `# Title`, `<p class="cover-sub">… — Booklet N of 13</p>`).
- Accent per booklet from the palette in `outline.md`.
- Author files as **LF** (CRLF silently breaks `:::` blocks).
- Build one booklet: `node tools/build.mjs <NN-slug>` (PDF, checks fit) or `--html` (fast, no fit check). **Never** build the master volume until all `order` children exist.

## 7. Definition of done (per page)

- [ ] Every fact verified against a current primary source (or already in "Verified facts").
- [ ] Fits one page — zero overflow in the PDF build.
- [ ] Mechanism explained, not just stated; connects to prior material.
- [ ] At least the blocks the idea warrants; `:::interview` is two paragraphs.
- [ ] Every new term defined once + queued for the glossary.
- [ ] Repeats nothing already said in another page.
