## Latency Budget for AI Features

Allocating a total time budget across retrieval, reranking, generation and
post-processing, so nobody optimises a stage that was never the problem.

A three-second budget: 200ms retrieval, 150ms rerank, 400ms to first token, the
rest streaming. Written down, it made obvious that the reranker was not worth a
day of anyone's time.

### How it works

Without a budget, latency work goes wherever someone's attention landed rather
than where the time actually is.

A budget allocates a total target across stages. Writing it down does two useful
things immediately.

It reveals which stages are worth optimising. A reranker taking 150ms of a
3,000ms budget is not your problem, however inefficient the code looks when you
read it.

And it forces a decision about the target, which otherwise stays vague and
unfalsifiable — "it should feel fast" cannot be tested and cannot be missed.

**Measure each stage separately in your traces, not just the total.** A total
tells you there is a problem. The breakdown tells you where it is, and those are
different pieces of information.

### In practice

Budget **time to first token separately from total time**, because the two are
perceived completely differently. A user tolerates a long streamed answer and
does not tolerate silence.

It is often correct to accept a slower total in exchange for a faster start.
Retrieving six chunks instead of forty cuts prefill and improves the felt
experience, even if generation then runs a little longer — which the total-time
number will report as a regression.
