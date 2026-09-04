## Table Extraction

Recovering rows and columns from what is only a visual convention. Humans read
alignment and whitespace as structure; the parser sees text at coordinates and
has to infer the grid.

Bordered tables are easy — find the rules, the cells follow. Everything else is
inference from alignment, and that is where it breaks.

<svg viewBox="0 0 460 92" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A merged header spanning two columns causes every value in the extracted row to shift one column to the left, producing plausible numbers in the wrong fields">
  <text x="4" y="14" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">on the page</text>
  <rect x="4" y="20" width="200" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="10" y="33" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">Q3 (net)          |  Q4</text>
  <rect x="4" y="38" width="200" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="10" y="51" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">rev   120  |  140  |  160</text>
  <path d="M212 40 H246" stroke="#1a1a1a" stroke-width="1.2"/><path d="M246 40 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="256" y="14" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">what you get</text>
  <rect x="256" y="20" width="200" height="18" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <text x="262" y="33" font-family="Consolas,monospace" font-size="8" fill="#c25a35">Q3 | net | Q4</text>
  <rect x="256" y="38" width="200" height="18" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <text x="262" y="51" font-family="Consolas,monospace" font-size="8" fill="#c25a35">120 | 140 | 160</text>
  <text x="4" y="80" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">nothing throws; Q4 now reports Q3's number</text>
</svg>

The failure does not raise an error. The output is a well-formed table of
numbers in the wrong fields, plausible to everything downstream.

**Validate instead of trusting:** column counts, totals that must reconcile,
types that must match. Test multi-page tables explicitly — the header appears
once, and later rows arrive with no column context at all.

## Task Decomposition

Splitting one prompt that extracts, validates, summarises and formats into
separate calls with defined interfaces between them. A prompt with four jobs has
four ways to fail and gives you one output to inspect.

Two things improve. Accuracy, because each call has a narrower job and the
intermediate result can be checked before anything builds on it. Debuggability,
because a failure localises to one step with visible inputs and outputs instead
of hiding inside a single opaque call.

<svg viewBox="0 0 460 90" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One opaque call with a single output compared with three chained calls whose intermediate results are each checked before the next step runs">
  <text x="4" y="14" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">one call, one thing to look at</text>
  <rect x="4" y="20" width="240" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="124" y="35" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">extract + validate + summarise + format</text>
  <path d="M244 31 H272" stroke="#1a1a1a" stroke-width="1.2"/><path d="M272 31 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="278" y="34" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">wrong. where?</text>
  <text x="4" y="60" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">three calls, three checkpoints</text>
  <rect x="4" y="66" width="72" height="20" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/><text x="40" y="80" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#c25a35">extract</text>
  <path d="M76 76 H98" stroke="#1a1a1a" stroke-width="1.2"/><path d="M98 76 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="100" y="66" width="72" height="20" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/><text x="136" y="80" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#c25a35">validate</text>
  <path d="M172 76 H194" stroke="#1a1a1a" stroke-width="1.2"/><path d="M194 76 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="196" y="66" width="72" height="20" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/><text x="232" y="80" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#c25a35">summarise</text>
  <path d="M268 76 H290" stroke="#1a1a1a" stroke-width="1.2"/><path d="M290 76 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="296" y="79" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">wrong at step 2</text>
</svg>

**Splitting also lets you route each step separately** — a small model for
extraction, the expensive one only where reasoning is genuinely needed. That
often pays back the extra calls outright.
