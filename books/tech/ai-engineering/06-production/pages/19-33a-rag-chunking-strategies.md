## RAG: chunking strategies compared

- Chunking (19-32) is the most under-rated RAG lever, and there's a spectrum of strategies. The right one depends on the documents' structure — and getting it wrong caps retrieval quality no downstream step can fix.

| Strategy | How | Best for |
|---|---|---|
| **fixed-size** | N tokens, fixed overlap | uniform text, a baseline |
| **recursive/structural** | split on headings → paragraphs → sentences | structured docs (the default) |
| **semantic** | split where the topic shifts (embedding distance) | flowing prose, no clear structure |
| **document-specific** | code by function, tables as units, slides by slide | code, tables, mixed media |
| **late chunking** | embed the full doc, then pool per chunk | preserving cross-chunk context |

- **Structure-aware beats fixed-size** for most real documents (19-32): splitting on natural boundaries (headings, paragraphs, code functions) keeps each chunk a coherent unit, where a fixed-token slice cuts mid-sentence and mid-idea. Recursive splitting (headings → paragraphs → sentences, packing to a target size) is the sensible default.
- **The context-vs-precision tension** is the core tradeoff. *Large chunks* keep context but dilute retrieval (the relevant sentence is buried, lowering specificity). *Small chunks* retrieve precisely but lose context. **Parent-document retrieval** resolves it: retrieve on small chunks for precision, feed the *larger parent* to the LLM for context.

:::interview
"How do you choose a chunking strategy for RAG?"

By the documents' structure, and I measure rather than guess. **Structure-aware** (split on headings/paragraphs, or by function for code, tables as units) beats fixed-size for real documents because each chunk stays a coherent unit. The core tension is **context vs precision**: large chunks preserve context but dilute retrieval specificity; small chunks retrieve precisely but lose context. My default resolution is **parent-document retrieval** — index small chunks for precise matching, but feed the larger parent section to the LLM so it has context. Then I *measure* with retrieval recall (19-35) across chunk sizes on real queries, because chunking quality caps everything downstream — no reranker or bigger model recovers an answer that chunking split badly. Naming the context/precision tradeoff and parent-retrieval, and insisting on measuring, is the depth.
:::
