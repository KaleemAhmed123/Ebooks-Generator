## OCR Confidence Score

OCR engines do not return text. They return text plus, for each word or
character, a number for how certain the engine was. Most pipelines discard that
number, throwing away the most useful routing signal in the system.

Confidence is what lets a clean typed invoice and a crumpled fax be handled
differently without a person looking at either. That single mechanism is usually
what makes a document pipeline economically viable, because it concentrates
human attention on the fraction that needs it.

<svg viewBox="0 0 460 84" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A confidence scale split into three bands: low confidence goes to human review, the middle band is validated by business rules, and the high band is accepted automatically">
  <rect x="4" y="14" width="130" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="14" y="31" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">human review</text>
  <rect x="134" y="14" width="150" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="144" y="31" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">validate: do totals sum?</text>
  <rect x="284" y="14" width="142" height="26" fill="#fdece5" stroke="#c25a35" stroke-width="1.4"/>
  <text x="294" y="31" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">accept automatically</text>

  <path d="M4 48 H426" stroke="#6b6b6b" stroke-width="1"/>
  <path d="M134 44 V52 M284 44 V52" stroke="#6b6b6b" stroke-width="1"/>
  <text x="120" y="62" font-family="Consolas,monospace" font-size="8" fill="#6b6b6b">low</text>
  <text x="270" y="62" font-family="Consolas,monospace" font-size="8" fill="#6b6b6b">high</text>

  <text x="4" y="78" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">both thresholds are yours to set, and they belong to a field rather than to a document</text>
</svg>

**Set thresholds per field, not per document.** A misread supplier name is an
inconvenience; a misread payment amount is a financial error. Calibrate against
your own ground truth — confidence values are not comparable across engines, or
across versions of one engine, so an inherited threshold means nothing.

## Offline vs Online Evaluation

Offline scores a fixed dataset before you ship: fast, repeatable, cheap enough
to gate every deploy. Online measures what real users did afterwards — accepted,
retried, escalated, completed the task. Slower, noisier, and the only one
measuring the outcome you care about.

They disagree more often than you would expect, and the disagreement is the
information:

| Pattern | Usually means |
|---|---|
| Offline up, online down | your dataset does not represent real traffic |
| Offline flat, online up | your scoring misses something users notice |

**The first row is the common one, and the fix is resampling.** A golden set
built at launch describes a user population that no longer exists. Refresh part
of it from production on a schedule, and keep the historical cases as regression
tests so you do not lose the failures you already fixed.
