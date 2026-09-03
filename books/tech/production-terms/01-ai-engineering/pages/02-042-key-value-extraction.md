## Key-Value Extraction

Turning recognised text into structured fields. Template rules are exact and
brittle; models generalise and fabricate.

Template rules handled six known invoice vendors perfectly and failed on the
seventh. A model handled all of them at 94% and occasionally invented a field
that was never on the page.

### How it works

OCR gives you text. What you need is structured fields — invoice number, date,
total — and getting from one to the other is its own problem with three
approaches.

| | Handles unseen layouts | Fails by |
|---|---|---|
| Template rules — position or regex | no | breaking completely on vendor 7 |
| Layout models — learn label/value geometry | yes, with training data | needing labelled examples |
| LLM over OCR text | yes, with no per-vendor work | inventing values |

Template rules scale linearly with the number of vendors, which stops working
somewhere around a few dozen. Layout models generalise but need data. A model
over the text needs neither, and will sometimes return a total that does not
appear anywhere in the document.

**That last failure mode is the one that determines the design.**

### In practice

The hybrid that works: extract with a model, then **verify every returned value
actually appears among the OCR tokens**, and check arithmetic where it exists —
line items should sum to the stated total.

That single validation step catches most fabrication. More importantly it
converts "confidently wrong" into "flagged for review", and those are completely
different operational problems: one costs a reviewer thirty seconds, the other
costs a customer relationship.
