## Grounding

Tying answers to retrieved source material, so claims are traceable and
verifiable rather than generated from parametric memory.

"Revenue was ₹240 crore" with no source is a guess. The same sentence with a
citation to page 4 of the Q3 filing is auditable.

### How it works

An ungrounded model answers from what it absorbed during training — compressed,
undated and impossible to verify. Grounding means handing it the actual source
text and asking it to answer from that instead.

Mechanically it is simple: retrieve the relevant documents, put them in the
prompt, instruct the model to use only those. You have changed the task from
recall to reading comprehension, which models are considerably better at.

Two things are gained. **Currency**, because your documents are current and the
training data is not. And **traceability**, because the answer can point at the
passage it came from.

Traceability is the underrated half. It changes the failure mode from silent
wrongness to visible wrongness — a reviewer can check a cited claim in seconds,
and an uncited one is immediately suspicious.

### In practice

**Grounding is not automatic just because you retrieved something.** The model
can still ignore the provided context and answer from memory, and it does so
more often precisely when retrieval returned nothing relevant — the case where
you least want it to.

That is why groundedness is measured as its own metric, separate from whether
the answer happened to be correct. Correct-but-ungrounded is a failure that
passes every accuracy check you have.
