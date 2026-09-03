## Retrieval Evaluation Set

Question-to-document pairs that let you measure retrieval independently of
generation. Without one you tune prompts to fix a retrieval bug.

Answer quality was poor. The evaluation set showed recall@10 at 61% — the model
was fine, retrieval was starving it.

### How it works

Retrieval systems have two stages that fail independently, and a single
end-to-end quality score cannot tell you which one broke.

A retrieval evaluation set isolates the first. It is a list of questions, each
paired with the chunk IDs that genuinely contain the answer — **determined by a
human reading the corpus, not by what your current system happens to return.**

That distinction matters. A set built from current output measures whether the
system still agrees with itself, which is not the same as whether it is right.

With it you can measure retrieval on its own terms: recall@k, mean reciprocal
rank, nDCG. None of these require calling a generation model, which makes them
fast, cheap and deterministic — cheap enough to run on every ingest change.

The payoff is that you stop guessing. "Answers are bad" becomes "recall@10 is
61%", which is a specific problem with specific fixes, none of them in the
prompt.

### In practice

Build it from **real user questions** rather than invented ones.

And deliberately include questions your corpus cannot answer. The correct
retrieval behaviour there is returning nothing above threshold — and a system
that always returns its best five chunks regardless will fail that case while
scoring perfectly well on everything else, which is exactly the failure you most
want to catch.
