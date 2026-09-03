## Context Compression

Summarising or filtering retrieved content before it enters the prompt, so long
context stays affordable and the model stays focused.

Feeding forty pages of contract text costs a lot and buries the one clause that
answers the question. Extracting only the relevant passages keeps the answer
sharp and the bill small.

### How it works

Prompt compression trims everything you send. Context compression reduces the
retrieved content specifically, before it reaches the window. There are two
approaches and they carry very different risk.

**Extractive filtering** keeps only the sentences or passages relevant to the
current query and drops the rest. It is cheap, and it preserves the original
wording — which is what grounding and citation depend on.

**Abstractive summarisation** has a model rewrite the content more compactly.
Compression is higher, and the model is now reading a summary rather than the
source.

That second point deserves to be explicit. An abstractive summary is generated
text. It can drop the specific detail that mattered, or introduce a detail that
was never in the document, and the downstream answer will be grounded in the
summary rather than in anything real.

### In practice

Compression is usually the wrong first move. Better retrieval and reranking
reduce context by **selecting** well rather than by discarding after the fact,
which improves quality instead of risking it.

Reach for compression when the relevant documents are genuinely long — a full
contract, a long transcript, a filing — and have to be read rather than merely
searched. In a grounded system, extractive filtering is the safer default, for
the simple reason that it cannot invent anything.
