## OCR Confidence Score

Per-character or per-word certainty from the engine. It is the routing signal
for what needs a human.

Fields below 80% confidence go to a review queue; above 95% auto-approve. That
one rule cut manual review volume by 70%.

### How it works

OCR engines do not return text. They return text **plus**, for each word or
character, a number expressing how certain the engine was.

Most pipelines discard that number, which throws away the most operationally
useful signal in the system. Confidence is what lets you treat a clean typed
invoice differently from a crumpled fax, automatically, without a person looking
at either.

The pattern is threshold routing:

| Confidence | Action |
|---|---|
| Above the high threshold | accept automatically |
| In between | apply validation — do line items sum, is the date plausible |
| Below the low threshold | human review |

That single mechanism is usually what makes a document pipeline economically
viable, because it concentrates human attention on the small fraction that needs
it.

### In practice

**Set thresholds per field, not per document.** A misread supplier name is an
inconvenience. A misread payment amount is a financial error. They do not
deserve the same bar.

And calibrate against your own ground truth set. Engine confidence values are
not comparable across engines, or even across versions of one engine, so a
threshold inherited from a blog post or a previous project means nothing.
