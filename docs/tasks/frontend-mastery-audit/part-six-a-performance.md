# Part Six A — Performance (Modules 14 + 15, first half)

**Files covered:** 39 (`pages/14-*.md`, `pages/15-*.md`)
**Passes run:** 1 (fact) and 2 (consistency) only, per `BRIEF-FACT.md`.
**Budget line:** _updated as the run proceeds — see "Budget" at the bottom._

Findings are appended in the order they were verified. WRONG first is imposed at
the end of the run in the "Ordered summary" section; the body below is
chronological so nothing is lost if the run is cut short.

---

## Findings (chronological, appended on verification)

### F1 — Core Web Vitals thresholds — **CORRECT** (all four numbers)

Source fetched: <https://web.dev/articles/vitals>

| Claim | file:line | Book says | Source says | Verdict |
|---|---|---|---|---|
| LCP goal | `14-01-core-web-vitals-1.md:13` | "Less than **2.5 seconds**" | "LCP should occur within **2.5 seconds** of when the page first starts loading" | CORRECT |
| CLS goal | `14-01-core-web-vitals-1.md:21` | "A score of less than **0.1**" | "pages should maintain a CLS of **0.1** or less" | CORRECT |
| INP goal | `14-01-core-web-vitals-2.md:4` | "Less than **200 milliseconds**" | "pages should have an INP of **200 milliseconds** or less" | CORRECT |
| INP replaced FID | `14-01-core-web-vitals-2.md:2` | "INP officially replaced First Input Delay (FID) in March 2024" | "INP became a stable Core Web Vital metric in 2024"; FID is retired | CORRECT |

The three metrics the chapter names are still the complete Core Web Vitals set as
of the fetch. No metric has been added or removed since.

### F2 — The 75th-percentile rule is **missing entirely** — GAP (not wrong, but the chapter is incomplete on its highest-value point)

`14-01-core-web-vitals-1.md` and `-2.md` state each threshold as a flat number
with no mention of how it is assessed. The source is explicit:

> "a good threshold to measure is the **75th percentile** of page loads, segmented
> across mobile and desktop devices." — <https://web.dev/articles/vitals>

Without this, a reader will read "LCP under 2.5s" as an average, which is the
single most common misreading of CWV. The prompt for this audit flagged the
75th-percentile rule specifically; it is not in the book at all.

Same gap for the **needs-improvement / poor** bands. The chapter gives only the
"good" boundary, so a reader cannot tell "needs improvement" from "poor". I could
not extract the upper band values from `web.dev/articles/vitals` (they live only
in threshold images, whose numbers the fetch did not return), so the specific
"poor" cut-offs are **UNVERIFIABLE in this run** — do not quote any from memory
when fixing this; fetch `web.dev/articles/lcp`, `/inp`, `/cls` individually.

### F3 — "Google will actively penalize your website's search ranking" — **WRONG** (overstated; Google's own docs say the opposite framing)

`14-01-core-web-vitals-1.md:9`:

> "If your Core Web Vitals are poor, Google will actively penalize your website's search ranking (SEO)."

Source fetched: <https://developers.google.com/search/docs/appearance/page-experience>

Google's wording is "**Core Web Vitals are used by our ranking systems**" and
"Google Search always seeks to show the most relevant content, **even if the page
experience is sub-par**." The doc describes page experience as a positive
contributing factor, never a penalty, and explicitly warns that a good score
"doesn't guarantee that your pages will rank at the top."

Suggested fix: "Core Web Vitals feed Google's ranking systems. They do not
outrank relevance, and a good score guarantees nothing on its own."

### F4 — "Chrome 144 added a middle setting … January 2026 introduced prerender until script" — **WRONG** (it is not shipped)

`14-05-speculation-rules-2-2-2-1.md:21-27`:

> "### Chrome 144 added a middle setting
> January 2026 introduced **prerender until script**: the browser fetches the HTML
> and begins loading subresources, then **pauses at the first blocking script
> tag**. … It is the sensible default for pages you are not confident are
> prerender-safe."

Source fetched (today): <https://developer.chrome.com/docs/web-platform/prerender-pages>

The doc describes prerender-until-script as **"under development and not yet
available by default"**, with an **origin trial starting January 2026**. January
2026 is the origin-trial date, not a ship date, and the page names no Chrome
version 144 for it.

Second source fetched, which pins it exactly:
<https://developer.chrome.com/blog/prerender-until-script-origin-trial>
(published 23 January 2026) — the origin trial runs "from Chrome 144", and the
feature is **not enabled by default**. It needs either
`chrome://flags/#prerender-until-script` locally or an origin-trial token in
production. The blog states: *"prerender until script is a new option we're
working on, and that is subject to change, so is not available for use without
enabling it first to opt in."*

So "Chrome 144" and "January 2026" are the right numbers, but attached to the
wrong event. What is wrong:
1. "**added** a middle setting" — Chrome 144 opened an *origin trial*; it did not
   add the setting. A reader shipping this today gets nothing.
2. "It is **the sensible default** for pages you are not confident are
   prerender-safe" — recommends as a default something that cannot be used
   without a token.
3. The chapter never shows the actual key. The opt-in is a third top-level
   speculation-rules key, `"prerender_until_script"`, alongside `"prefetch"` and
   `"prerender"`. Without it the section is not actionable.

Fix: retitle to "Chrome 144 opened an origin trial for a middle setting",
state it needs a token, show the `"prerender_until_script"` key, and drop the
"sensible default" recommendation.

### F4b — Ray-Ban case-study figures — **CORRECT**

`14-05-speculation-rules-1.md:81-82`: "Ray-Ban cut mobile LCP from **4.69 seconds
to 2.66 seconds**, a 43% reduction."
Source: <https://web.dev/case-studies/rayban-speculation-rules> — mobile "4.69s"
to "2.66s", "43.28%". Exact match.

### F4c — "roughly 28% of navigations already prefetched or prerendered" under moderate eagerness — **UNVERIFIABLE**

`14-05-speculation-rules-1.md:79-80`. The Ray-Ban case study I fetched reports a
**50% desktop / 29% mobile prerender rate for that one site**, and notes Ray-Ban
used moderate on desktop hover but **immediate** on mobile tiles — so it is not
the source of a general "moderate eagerness → 28%" figure. I did not locate a
primary source for the 28% number within budget. Either cite the source next to
it or cut it. Do not assume it is the Ray-Ban 29%; that is a different
measurement of a different thing.

### F4d — Monrif figures — **CORRECT**

`14-05-speculation-rules-1.md:83`: "Monrif improved desktop LCP by 17.9% and
engagement by 8.9%." Search result title and summary from
<https://web.dev/case-studies/monrif-cwv> gives "reduced LCP by 17.9%" and
"improved engagement by 8.9%". Note the book says **desktop** LCP; the source
title does not qualify the platform. Minor — verify the platform qualifier before
print, or drop the word "desktop".

### F5 — Speculation Rules eagerness table and limits table — **CORRECT** (every cell)

Source: <https://developer.chrome.com/docs/web-platform/prerender-pages>

`14-05-speculation-rules-2-2-2-1.md:3-15` matches the source cell for cell:
`conservative` = pointer/touch down; `moderate` = 200ms pointer hold or
`pointerdown` on desktop, 500ms after scrolling stops on mobile; `eager` = 10ms
pointer hold on desktop, 50ms after the anchor enters the viewport on mobile;
`immediate` = as soon as the rules are observed. Defaults: `immediate` for list
rules, `conservative` for document rules — both correct. Limits `immediate` 50
prefetch / 10 prerender and everything else 2 FIFO — both correct.

### F6 — "Chromium only. Other browsers ignore the rules entirely" — **CORRECT, with a caveat worth adding**

`14-05-speculation-rules-1.md:85`. Source support table: Chrome 109, Edge 109,
**Firefox not supported, Safari behind a flag**. The book's statement holds for
default behaviour. One clause — "Safari has it behind a flag" — would stop the
line reading as "will never happen".

