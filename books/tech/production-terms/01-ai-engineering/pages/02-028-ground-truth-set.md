## Ground Truth Set

Hand-labelled documents used to measure field-level accuracy. Without one, "the
OCR is good" is an opinion.

A two-hundred-document labelled set showed total amount at 97% and vendor
address at 71%. Effort went where the number was actually bad, instead of where
it felt bad.

### How it works

"The extraction is good" stays an opinion until there are documents where a
human has recorded the correct value for every field, and you can compare
against them.

**The measurement that matters is per field, not overall.** An aggregate
accuracy of 94% is close to useless — it averages the fields that work with the
ones that do not, and hides which is which.

Broken out, the picture is usually lopsided and immediately actionable:

| Field | Accuracy |
|---|---|
| Invoice number | 99% |
| Total amount | 97% |
| Line items | 88% |
| Supplier address | 71% |

Now you know exactly where the remaining effort goes, and that most of the
pipeline is already fine.

Building the set is genuine manual work — a couple of hundred documents, every
field labelled by hand. It is also the work that makes every subsequent decision
measurable instead of argued.

### In practice

Sample it to match reality, not convenience. If a fifth of production input is
photographs taken on a phone in bad light, a fifth of the ground truth set
should be too.

A set built from clean digital PDFs will report excellent accuracy and predict
nothing at all about the documents your users actually send.
