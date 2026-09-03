## Embedding Model Migration

Vectors from different models are not comparable. Changing models means
re-embedding the entire corpus — plan for it before you have fifty million
vectors.

Upgrading the embedding model required re-embedding forty million chunks: three
days of compute plus a dual-index period so search kept working throughout.

### How it works

A vector is only meaningful relative to the model that produced it. Two models
place the same sentence in entirely different coordinate spaces, and there is no
conversion between them — not an approximate one, not a lossy one, none.

So changing embedding model means re-embedding everything. This is not a
migration script. It is a full reprocessing of the corpus.

At small scale that is an afternoon. At forty million chunks it is days of
compute, a real bill, and a window in which search has to keep working.

**The mistake that makes it much worse is upserting new vectors into the
existing index.** You then have a collection where some vectors live in one
space and some in another, distances between them are meaningless, and quality
degrades in a way that looks random rather than like a half-finished migration.

### In practice

Do it as a blue-green swap:

1. Build a completely separate index and embed into that.
2. Verify it independently — document counts, spot checks, recall against the
   evaluation set.
3. Switch reads across only once it passes.
4. Keep the old index until you are confident, so rollback is instant.

And record the embedding model version alongside every vector, so that "which
model produced this?" is always a question with an answer.
