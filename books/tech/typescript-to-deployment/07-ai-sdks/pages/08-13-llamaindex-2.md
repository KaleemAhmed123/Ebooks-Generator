### What it adds beyond the basic pipeline

- **Query engines** for shapes that are hard to hand-roll: sub-question decomposition, routing across several indexes, summarizing a whole document
- **Node postprocessors** for reranking and metadata filtering as a pipeline step
- **LlamaParse** for documents that defeat ordinary extraction, which is a paid service and often worth it

### The trade

- The defaults get you a good prototype quickly and hide the decisions from Module 7 that determine production quality
- **Know what it chose for you** before shipping: chunk size, overlap, top k, and the prompt it wrapped your question in
