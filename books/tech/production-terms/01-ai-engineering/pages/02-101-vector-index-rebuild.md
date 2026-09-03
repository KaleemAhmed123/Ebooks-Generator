## Vector Index Rebuild

*blue-green swap*

Rebuilding an index into a new namespace and switching reads only after
verification, instead of mutating the live one.

Re-embedding forty million chunks in place left the index half old and half new
for six hours, and retrieval quality was unpredictable throughout.

### How it works

Some changes require rebuilding everything: a new embedding model, a different
chunking strategy, a change to what metadata is stored.

The instinct is to update in place, document by document, because the pipeline
already supports upserts. **That produces a long window where the index is half
old and half new** — internally inconsistent, with unpredictable retrieval
quality, for however many hours or days the reprocessing takes.

Blue-green avoids it:

1. Build a completely separate index.
2. Populate and verify it while the live one keeps serving, unchanged.
3. Switch reads only when you are satisfied.
4. Switch back instantly if something is wrong, because the old one is still
   there.

**The verification step matters as much as the swap.** Document counts, spot
checks on known queries, and recall measured against your evaluation set —
before any user traffic reaches it.

### In practice

Keep the old index for a defined period after the swap rather than deleting it
immediately.

Retrieval regressions surface over days, not minutes. Someone notices on
Thursday that one particular kind of question stopped working properly. Instant
rollback during that window is worth the storage cost, which is trivial next to
rebuilding again under pressure.
