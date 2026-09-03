## Prompt Compression

Reducing prompt tokens without losing the information that matters — trimming
examples, summarising history, dropping low-value retrieved chunks.

Cutting from twelve retrieved chunks to five reranked ones removed 60% of input
tokens **and** improved accuracy, because the model stopped drowning in
near-misses.

### How it works

Input tokens are paid on every request and dominate cost in most production
systems, because the fixed preamble is far larger than anything the user types.

Compression removes tokens that are not earning their place. The usual
candidates:

- few-shot examples the model no longer needs once the format is established
- retrieved chunks beyond the genuinely relevant ones
- verbose instructions that could be stated once
- boilerplate repeated across sections
- conversation history that could be summarised

**The counterintuitive part is that this often improves quality rather than
trading against it.** Fewer, better-chosen chunks means less near-miss material
to be distracted by, and less content sitting in the weak middle of the context
where attention is least reliable.

Forty chunks down to five reranked ones is the canonical case: significantly
cheaper and measurably more accurate at the same time.

### In practice

**Verify with your evaluation set after each cut** rather than assuming.

Compression is one of the few optimisations that can genuinely improve cost and
quality together — and it can also quietly remove the one example that was
carrying a difficult case. Cut, measure, keep or revert. One change at a time,
or you will not know which cut did what.
