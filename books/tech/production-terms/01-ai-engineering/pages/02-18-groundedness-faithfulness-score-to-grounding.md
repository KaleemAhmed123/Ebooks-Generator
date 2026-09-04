## Groundedness / Faithfulness Score

*faithfulness*

The fraction of claims in an answer that are supported by the retrieved context.
Split the answer into claims, check each against what was actually retrieved,
report the ratio.

It measures one property and no other: did this come from the supplied text. An
answer can be entirely true and still score badly, because the model drew on
training memory instead of your documents. In a retrieval system that is a defect
— the reason to retrieve was that your sources are current and traceable and the
weights are neither.

**A perfect score says nothing about whether the answer is any good.** Quote the
context faithfully while answering the wrong question and you score 1.0. Run it
beside a relevance or correctness metric, or you are measuring obedience rather
than quality.

## Grounding

Answering from source text you supplied rather than from parametric memory — what
the model absorbed during training. Retrieve the relevant documents, put them in
the prompt, instruct the model to use only those, require a citation.

The task changes from recall to reading comprehension. Two things come with that.
Currency, because your documents are current and the weights are frozen at
training time. And traceability, because a reviewer can check a cited claim in
seconds. Traceability is the underrated half: it converts silent wrongness into
visible wrongness.

**Retrieving something does not mean the answer was grounded in it.** The model
can ignore the context and answer from memory, and it does so most readily when
retrieval returned nothing relevant — precisely the case where you least want it
improvising.
