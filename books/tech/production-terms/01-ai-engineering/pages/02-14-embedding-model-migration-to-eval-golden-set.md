## Embedding Model Migration

Two models place the same sentence in entirely different coordinate spaces, and
there is no conversion between them — not an approximate one, not a lossy one,
none. Changing embedding model therefore means re-embedding the whole corpus.
This is not a migration script; it is a full reprocessing.

Do it as a blue-green swap. Build a completely separate index and embed into
that. Verify it independently: document counts, spot checks, recall against the
evaluation set. Switch reads across only once it passes, and keep the old index
until you are confident, so rollback is instant.

**The mistake that makes it far worse is upserting new vectors into the existing
index.** Some vectors then live in one space and some in another, distances
between them are meaningless, and quality degrades in a way that looks random
rather than like a half-finished migration.

## Eval / Golden Set

A fixed set of inputs with known-good outputs, plus a way to score how close an
answer came, run on every prompt or model change. Its purpose is to turn opinion
into measurement: "does this change help" stops being settled by whoever tried
three examples and liked what they saw.

Scoring depends on the task. Extraction and classification can be exact-match.
Open-ended answers need a rubric, a model-based judge, or human review of a
sample.

**Building it well matters far more than building it large.** Draw the cases
from real traffic and include the hard ones — ambiguous inputs, malformed
documents, questions the corpus genuinely cannot answer. Then version the set
and freeze it: if the cases move at the same time as the prompt, you can no
longer tell which one moved the score.
