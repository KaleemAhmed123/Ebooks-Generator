## Encoder, decoder, encoder-decoder — when do you use each?

- **Encoder-only (BERT):** bidirectional — each token sees the whole sequence. Great for **understanding** tasks: classification, NER, embeddings, retrieval. Can't generate text left-to-right.
- **Decoder-only (GPT, Llama, Claude):** causal — each token sees only what came before. Built for **generation**, and now the default for general-purpose LLMs because next-token prediction scales and in-context learning emerges.
- **Encoder-decoder (T5, BART, original translation transformer):** the encoder reads the full input, the decoder generates while **cross-attending** to it. Natural fit for **transduction**: translation, summarisation — input and output are different sequences.
- Modern reality: decoder-only models have largely absorbed the other two by framing every task as "text in → text out," though encoder models still win for cheap, high-throughput embeddings.

:::interview
What's really being tested:

matching the attention pattern (bidirectional vs causal vs cross) to the task shape, and knowing *why* decoder-only became the general default.
:::
