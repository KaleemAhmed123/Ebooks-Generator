## Output Schema Repair

A defined path for structurally invalid model output. Without one, a value of
the wrong type or an object truncated at the token limit surfaces as an
unhandled exception three layers up and a 500 for the user.

<svg viewBox="0 0 460 84" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A three-step repair ladder: mechanical fixes, then one re-ask carrying the validation error, then a clean loud failure">
  <rect x="4" y="14" width="126" height="30" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="12" y="27" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">1 mechanical fix</text>
  <text x="12" y="38" font-family="Consolas,monospace" font-size="7.5" fill="#6b6b6b">fences, trailing comma</text>
  <path d="M130 29 H156" stroke="#1a1a1a" stroke-width="1.2"/><path d="M158 29 l-7 -4 v8 z" fill="#1a1a1a"/>

  <rect x="160" y="14" width="126" height="30" fill="#fdece5" stroke="#c25a35" stroke-width="1.4"/>
  <text x="168" y="27" font-family="Consolas,monospace" font-size="8" fill="#c25a35">2 re-ask once</text>
  <text x="168" y="38" font-family="Consolas,monospace" font-size="7.5" fill="#c25a35">quote the exact error</text>
  <path d="M286 29 H312" stroke="#1a1a1a" stroke-width="1.2"/><path d="M314 29 l-7 -4 v8 z" fill="#1a1a1a"/>

  <rect x="316" y="14" width="126" height="30" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="324" y="27" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">3 fail loudly</text>
  <text x="324" y="38" font-family="Consolas,monospace" font-size="7.5" fill="#6b6b6b">log the raw output</text>

  <text x="4" y="70" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">three defined steps and then a clean failure, instead of an exception escaping a JSON parser</text>
</svg>

Models correct readily when told precisely what failed validation, which is why
step two beats more elaborate parsing.

**Log every repair and treat the repair rate as a quality metric.** It should be
low and flat. A rise means a model update, a prompt edit, or a shift in inputs —
and because the repairs succeed, that degradation is invisible unless somebody
is counting. The system looks healthy until a repair stops working.

## Page-Level Parallelism

Processing document pages as independent jobs and reassembling by page number.
Serially, one four-hundred-page filing occupies a worker for minutes and
everything queued behind it waits, including hundreds of one-page documents that
would each have taken under a second.

That is head-of-line blocking, and it shows up as wildly unpredictable latency
for exactly the users whose documents were small.

<svg viewBox="0 0 460 88" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A serial timeline in which one long document blocks every small document behind it, against a fanned-out timeline where pages run in parallel across workers">
  <text x="4" y="16" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">serial</text>
  <rect x="52" y="8" width="300" height="12" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="60" y="18" font-family="Consolas,monospace" font-size="7.5" fill="#1a1a1a">one 400-page filing</text>
  <rect x="354" y="8" width="16" height="12" fill="none" stroke="#6b6b6b" stroke-width="1"/>
  <rect x="372" y="8" width="16" height="12" fill="none" stroke="#6b6b6b" stroke-width="1"/>
  <rect x="390" y="8" width="16" height="12" fill="none" stroke="#6b6b6b" stroke-width="1"/>
  <text x="410" y="18" font-family="Consolas,monospace" font-size="7.5" fill="#6b6b6b">waiting</text>

  <text x="4" y="48" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">fanned out</text>
  <rect x="52" y="34" width="52" height="9" fill="#fdece5" stroke="#c25a35" stroke-width="1.2"/>
  <rect x="52" y="45" width="52" height="9" fill="#fdece5" stroke="#c25a35" stroke-width="1.2"/>
  <rect x="52" y="56" width="52" height="9" fill="#fdece5" stroke="#c25a35" stroke-width="1.2"/>
  <text x="112" y="44" font-family="Consolas,monospace" font-size="7.5" fill="#c25a35">pages 1-400 across 20 workers</text>
  <rect x="112" y="52" width="16" height="12" fill="none" stroke="#6b6b6b" stroke-width="1"/>
  <rect x="130" y="52" width="16" height="12" fill="none" stroke="#6b6b6b" stroke-width="1"/>
  <rect x="148" y="52" width="16" height="12" fill="none" stroke="#6b6b6b" stroke-width="1"/>
  <text x="170" y="62" font-family="Consolas,monospace" font-size="7.5" fill="#6b6b6b">small documents no longer queue behind it</text>

  <text x="4" y="82" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">pages are independent for recognition, which is the only reason this is allowed</text>
</svg>

**Track failure per page, not per document.** One page that will not parse
should not discard the three hundred and ninety-nine that processed cleanly.
Operations that genuinely cannot be split — a table crossing a page break, a
whole-document classification — belong in a reassembly pass after the per-page
work, not in a serial path every document has to take.
