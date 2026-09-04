## Jailbreak Testing

Running a maintained corpus of known bypass techniques — roleplay framing,
hypothetical scenarios, encoded requests, instruction override, escalation spread
across several turns — against every model or prompt change, automatically.

The problem it catches is silent reopening. A prompt refactor that improves answer
quality can re-enable a bypass closed months ago, because nothing about the
refactor looked security-relevant to the person making it. A provider changing the
model underneath does the same with no change on your side at all. Tracking bypass
rate over time turns a rediscovery into a number somebody watches.

**Record which layer held, not only pass or fail.** A bypass the output classifier
catches before anyone sees it is a different problem from one that reached the
user, and a boolean suite cannot tell you which you have.

## Key-Value Extraction

Turning recognised text into named fields — invoice number, date, total. Three
approaches are in use, and they fail in different directions.

| Approach | Fails by |
|---|---|
| Template rules, by position or regex | breaking outright on the first unseen layout |
| Layout models trained on label and value geometry | needing labelled examples per document type |
| A model reading the OCR text | inventing values that are nowhere on the page |

Template rules scale linearly with vendor count, which stops working somewhere
around a few dozen. Layout models generalise but need data. A model needs neither,
and will occasionally return a total that appears nowhere in the document.

**Verify every returned value against the OCR tokens.** Check arithmetic where it
exists — line items should sum to the stated total. That single step converts
"confidently wrong" into "flagged for review".
