## Groundedness / Faithfulness Score

Measuring whether each claim in an answer is actually supported by the retrieved
context. The core quality metric for retrieval systems.

An answer can be factually true and still ungrounded — the model used training
memory rather than your documents. In a RAG system that is a defect, not a
lucky escape.

### How it works

A retrieved answer can be wrong in two distinct ways, and measuring only one of
them hides the other.

It can be factually incorrect, which is straightforward. Or it can be factually
correct but **ungrounded** — produced from what the model absorbed in training
rather than from the documents you supplied.

The second looks fine and is a real bug. The entire reason to retrieve is so
answers come from your sources: current, traceable, correct for your
organisation. An answer the model simply happened to know is one that will be
confidently wrong the moment your data differs from the internet's.

Groundedness measures this specifically. Break the answer into claims, check
each against the retrieved context, and score the fraction that is actually
supported.

### In practice

**Ungrounded answers spike when retrieval returns nothing useful.** Asked a
question with no supporting context, the model tends to answer anyway. So a
rising ungrounded rate is usually a retrieval alarm rather than a generation
one, and chasing it in the prompt wastes the week.

Pair the metric with an abstention policy. When retrieval comes back empty or
weak, saying so is the correct output — and it is the only output that keeps the
groundedness number honest.
