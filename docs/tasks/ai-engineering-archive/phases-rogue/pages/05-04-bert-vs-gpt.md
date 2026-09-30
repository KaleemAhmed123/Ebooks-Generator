# AI Engineering: From Scratch

## BERT vs GPT

The two branches of the Transformer family tree solve fundamentally different problems.

### BERT (Masked Language Modeling)

BERT (2018) is an **Encoder-only** architecture. 
**The Training Task:** 15% of the input text is replaced with a `[MASK]` token. The model is forced to predict the missing words using bidirectional context from both the left and the right.
`The [MASK] brown fox jumps [MASK] the lazy dog.`
**Use Cases:** Because it has deep bidirectional context, BERT excels at classification, sentiment analysis, entity extraction, and generating dense embeddings for Semantic Search (RAG).

### GPT (Causal Language Modeling)

GPT is a **Decoder-only** architecture.
**The Training Task:** Predict the exact next token given the preceding context. It uses a causal mask so it cannot cheat by looking ahead.
`The quick brown fox jumps over the -> [lazy]`
**Use Cases:** Anything generative. Chatbots, code generation, translation, and open-ended reasoning. While encoders are better at specific classification tasks, decoders scale better and can solve classification via prompt-based generation.
