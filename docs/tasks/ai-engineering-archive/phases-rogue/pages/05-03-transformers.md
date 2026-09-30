# AI Engineering: From Scratch

## The Transformer Architecture

In 2017, "Attention is All You Need" proved that if you remove RNNs entirely and rely strictly on Attention, you can process sequences in parallel. This scalability birthed the modern AI era.

### Multi-Head Attention

Instead of performing a single attention operation, Transformers split the token embeddings into multiple "heads." One head might attend to grammar, another to the subject of a sentence, and another to emotional sentiment. They run in parallel, and their outputs are concatenated.

### Positional Encodings

Because Transformers process all tokens simultaneously, they have no inherent concept of order. The model wouldn't know the difference between "Dog bites man" and "Man bites dog." To fix this, we add a positional embedding to the token embedding before feeding it into the network. 

### Encoder vs Decoder

- **Encoder:** Every token can look at every other token (Bidirectional). Used for understanding text (e.g., BERT).
- **Decoder:** Tokens can only look at *previous* tokens (Autoregressive / Causal masking). Used for generating text (e.g., GPT).
