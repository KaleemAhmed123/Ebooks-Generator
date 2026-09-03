## Reranking

A second, more expensive model that scores query and document jointly and
reorders the candidate set. Usually the single biggest retrieval quality win
available.

Vector search returns fifty candidates in 10ms. A cross-encoder reranks them in
80ms, and the top three are far more relevant.

### How it works

Retrieval and reranking use two different kinds of model, and the difference is
the whole reason the two-stage design exists.

The embedding model is a **bi-encoder**. It turns the query into a vector and
each document into a vector *separately*, then compares them. Because documents
are embedded ahead of time, search over millions is fast — and the model never
sees query and document together, so it is comparing two summaries.

A reranker is a **cross-encoder**. It reads the query and one document at the
same time and scores how well that document answers that query. Far more
accurate, and far more expensive, because nothing can be precomputed — it is a
full model pass per pair.

So each is used where it fits: the bi-encoder searches millions fast, the
cross-encoder carefully ranks the fifty it returned.

### In practice

This is reliably one of the highest-return additions to a retrieval pipeline,
for two reasons that compound.

Quality improves because the top results are genuinely more relevant. And
**because they are better, you can send fewer chunks to the model** — which cuts
cost, cuts prefill latency, and sidesteps the lost-in-the-middle problem at the
same time.

One addition, four improvements. That combination is rare enough to be worth
reaching for early rather than late.
