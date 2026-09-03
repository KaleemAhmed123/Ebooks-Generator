## PII Redaction Pipeline

Detecting and removing personal data before it reaches a model, a log, or a
training set. Once it is in a provider's logs it is outside your control.

A support transcript containing card details and phone numbers was going
verbatim to a provider and being stored in traces. Redaction at the boundary
made it compliant.

### How it works

Anything sent to a provider may be logged on their side and retained under their
policy. Anything stored in your own traces falls under your retention and access
rules — and traces are usually the least governed data any team holds.

A redaction pipeline detects personal data and removes or replaces it before
either happens.

**Detection needs both approaches, because each misses what the other catches.**
Regular expressions handle structured formats — card numbers, email addresses,
national IDs. Named entity recognition handles names, addresses and
organisations. Regex misses anything unstructured; NER misses formats it was not
trained on.

Where the original value is needed in the response, **tokenise rather than
delete**: replace with a placeholder and substitute the real value back after
generation.

### In practice

**Tune detection for recall over precision.** Over-redacting degrades an answer.
Under-redacting is a compliance incident. Those are not symmetrical costs and
the threshold should not be set as though they are.

Redact consistently across every path — prompts, trace logs, evaluation
datasets, fine-tuning data. A carefully redacted prompt path is undone entirely
by an evaluation set built from raw production requests, and that set is
typically built by someone who never saw the redaction work.
