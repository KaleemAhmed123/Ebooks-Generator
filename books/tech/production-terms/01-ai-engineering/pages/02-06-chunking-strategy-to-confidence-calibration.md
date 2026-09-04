## Chunking Strategy

How documents are split before embedding. A chunk is both what gets matched
and what the model reads, which is why this decides retrieval quality more
than the choice of vector database does. A chunk holding half an idea can
neither be matched properly nor answered from.

<svg viewBox="0 0 460 86" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A fixed-size split cuts a sentence so one chunk holds a subject with no number and the other a number with no subject; structure-aware splitting keeps each unit whole">
  <text x="4" y="12" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">FIXED 500 TOKENS</text>
  <rect x="4" y="18" width="200" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
  <text x="14" y="31" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">…total for Q3 was</text>
  <path d="M206 14 V40" stroke="#c25a35" stroke-width="1.8"/>
  <rect x="210" y="18" width="200" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.1"/>
  <text x="220" y="31" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">240 crore, up 12%…</text>
  <text x="14" y="50" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">a subject with no number</text>
  <text x="220" y="50" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">a number with no subject</text>
  <text x="4" y="72" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">STRUCTURE-AWARE</text>
  <rect x="140" y="62" width="270" height="18" fill="#fdece5" stroke="#c25a35" stroke-width="1.3"/>
  <text x="150" y="75" font-family="Georgia,serif" font-size="9" fill="#c25a35">split on headings, sections, whole table rows</text>
</svg>

Cutting every 500 tokens ignores where meaning ends. It splits tables down the
middle, separates a heading from the section it introduces, and cuts a
definition away from the term being defined.

**When answers are poor, print the retrieved chunks before touching the prompt
or the model.** Most complaints that the model is bad at something turn out to
be chunks that were never going to contain the answer, and no amount of prompt
work repairs a retrieval problem.

## Confidence Calibration

Whether a stated or derived confidence score actually predicts correctness.
Calibrating means checking it empirically: group a few hundred outputs whose
right answers you know by their stated confidence, then compare each group's
claim against its measured accuracy. If the 0.9 bucket is right 70% of the time,
your auto-approval threshold has to come from that curve, not from the number
the model printed.

Derived signals usually calibrate better than stated ones — agreement across
several samples of the same input, retrieval similarity, whether the output
passed schema validation, token probabilities where the provider exposes them.

**Alignment training makes this worse, and it is documented.** The GPT-4
technical report plots a pre-trained model tracking the diagonal on MMLU against
the post-trained one well off it, and states plainly that post-training "hurts
calibration significantly".
