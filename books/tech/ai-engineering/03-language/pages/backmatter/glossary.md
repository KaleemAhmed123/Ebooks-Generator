# Glossary

## Glossary

Every term introduced in this booklet, defined once, plainly.

### A – B

- **Abstractive summarization** — writing new sentences that capture a text's gist, rather than copying existing ones.
- **Attention** — computing an output as a weighted blend of values, where the weights come from how well a query matches each key.
- **Autoregressive decoding** — generating a sequence one token at a time, feeding each output back in to produce the next.
- **Bag of words (BoW)** — representing a document as a vector of word counts, ignoring order.
- **BART** — an encoder–decoder transformer pretrained by corrupting text and learning to reconstruct it; strong at summarization.
- **BERT** — an encoder-only transformer pretrained with masked language modeling; built for understanding, not generation.
- **BIO tagging** — labeling each token as Begin, Inside, or Outside an entity, so multi-word entities are marked cleanly.
- **BLEU** — a translation metric scoring word-sequence overlap with a human reference.
- **BM25** — a refined keyword-search ranking that extends TF-IDF with document length and term-saturation adjustments.
- **BPE (Byte-Pair Encoding)** — a subword tokenizer that repeatedly merges the most frequent adjacent pair of symbols.
- **Byte-level BPE** — BPE run over raw bytes, so any text in any language encodes with no unknown tokens.

### C – D

- **Causal masking** — blocking each token from attending to later tokens, required for left-to-right generation.
- **Causal language modeling** — the next-token-prediction training objective used by GPT-style decoders.
- **CBOW** — a word2vec variant that predicts a center word from its surrounding context.
- **Chinchilla** — the 2022 result that compute-optimal training uses roughly 20 training tokens per parameter.
- **Chunking** — splitting a long document into smaller pieces before embedding them for retrieval.
- **Constrained decoding** — masking out any next token that would violate a required output grammar, guaranteeing valid structure.
- **Context length (context window)** — the maximum number of tokens a model can attend to at once.
- **Context vector** — in seq2seq, the fixed-size vector the encoder squeezes the whole input into.
- **Contrastive learning** — training that pulls matching pairs together in vector space and pushes non-matching pairs apart.
- **Coreference resolution** — deciding which words (often pronouns) refer to the same real-world thing.
- **Cosine similarity** — closeness measured by the angle between two vectors, ignoring their length.
- **Cross-attention** — attention where queries come from the decoder and keys/values come from the encoder.
- **Curse of dimensionality** — the loss of meaningful distances when data is spread across too many sparse dimensions.
- **Decoder** — the transformer half that generates output token by token with causal attention.
- **Dialogue state tracking (DST)** — maintaining a structured record of what a user has specified across conversation turns.
- **Distributional hypothesis** — the idea that words appearing in similar contexts have similar meanings.
- **Draft model** — a small fast model that proposes tokens for a larger model to verify in speculative decoding.

### E – G

- **Embedding** — a dense vector standing in for a piece of text, learned so similar meanings sit close.
- **Embedding model** — a model that maps a sentence or document to a single vector tuned for similarity search.
- **Encoder** — the transformer half that reads input with bidirectional attention into context-rich vectors.
- **Encoder–decoder** — the full transformer with both halves, used to turn one sequence into another.
- **Entity linking** — connecting a text mention to a specific entry in a knowledge base.
- **Extractive summarization** — building a summary by selecting sentences directly from the source.
- **fastText** — an embedding method that represents a word as the sum of its character n-grams, handling unseen words.
- **Exposure bias** — the mismatch from training only on true histories (teacher forcing) but feeding the model its own imperfect outputs at inference.
- **Feed-forward network (FFN)** — the per-token two-layer network in a transformer block that transforms each token's content.
- **FlashAttention** — an IO-aware attention implementation that computes the exact result without storing the full score matrix, saving memory.
- **FLOP** — one floating-point operation; used to estimate training cost (≈6·params·tokens) and inference cost (≈2·params per token).
- **GELU** — a smooth nonlinearity common in transformer feed-forward blocks.
- **GloVe** — an embedding method trained on a global word co-occurrence count matrix.
- **GPQA** — a benchmark of PhD-level science questions that non-experts cannot easily look up.
- **GPT** — a decoder-only transformer trained on next-token prediction; the basis of modern LLMs.
- **GQA (grouped-query attention)** — attention where groups of heads share key/value sets, cutting memory with little quality loss.
- **GRU (gated recurrent unit)** — a simpler two-gate cousin of the LSTM.

### H – L

- **Hallucination** — a model stating fluent, confident information that is not supported by its input or the facts.
- **Head (attention head)** — one of several parallel attention operations, each learning a different way tokens relate.
- **Hybrid search** — combining keyword and semantic search and fusing their rankings.
- **IDF (inverse document frequency)** — a weight that scales a word down the more documents it appears in.
- **Information retrieval (IR)** — finding the documents most relevant to a query.
- **Knowledge graph** — a network of entities (nodes) connected by labeled relationships (edges).
- **KV cache** — stored key and value vectors from earlier tokens, reused so each generation step does constant work.
- **LayerNorm** — rescaling each token's vector to a stable mean and variance to steady deep-network training.
- **LDA (Latent Dirichlet Allocation)** — a topic model treating each document as a mixture of word-distribution topics.
- **Lemmatization** — reducing a word to its dictionary form using grammatical knowledge.
- **Lexical search** — search that matches query words to document words directly.
- **LLM-as-a-judge** — using a strong language model to score another model's outputs against a rubric.
- **Load-balancing loss** — an extra training term that keeps a mixture-of-experts router using all experts evenly.
- **Lost in the middle** — the tendency of long-context models to use facts at the start and end but ignore the middle.
- **LSTM (long short-term memory)** — a recurrent cell with a gated memory belt that carries information across long sequences.

### M – N

- **Machine translation** — automatically translating text from one language to another.
- **Masked language modeling (MLM)** — pretraining by hiding tokens and predicting them from both-side context (BERT).
- **Medusa / EAGLE** — speculative-decoding variants that add lightweight prediction heads to the target model instead of a separate draft model.
- **Mixture of experts (MoE)** — replacing one feed-forward block with many, activating only a few per token to grow capacity cheaply.
- **MMLU-Pro** — a hard, reasoning-focused multiple-choice benchmark across many subjects.
- **MQA (multi-query attention)** — attention where all heads share a single key/value set.
- **Multi-head attention** — running several attention operations in parallel and combining their outputs.
- **n-gram model** — a language model estimating the next word from the previous n−1 words by counting.
- **Named entity recognition (NER)** — finding and labeling real-world entities (people, places, orgs) in text.
- **Natural language inference (NLI)** — deciding whether a hypothesis follows from, contradicts, or is neutral to a premise.
- **Needle in a haystack (NIAH)** — a long-context test that hides one fact in a large document for the model to retrieve.
- **Negative sampling** — training on a few random non-neighbor words instead of a full-vocabulary softmax (word2vec).
- **NLP (natural language processing)** — getting computers to work with human language as data.

### P – R

- **Positional encoding** — information added to token embeddings so the model knows word order.
- **POS tagging** — labeling each word with its part of speech (noun, verb, adjective).
- **Parsing** — building a sentence's grammatical structure (constituency phrases or dependency links).
- **Query, Key, Value** — the three vectors each token projects into: what it seeks, what it offers, and what it passes on.
- **Relation extraction** — pulling structured (subject, relation, object) facts out of prose.
- **Residual connection** — adding a block's input back to its output, giving gradients a clean path through deep stacks.
- **RMSNorm** — a cheaper LayerNorm variant that skips mean-centering, common in modern LLMs.
- **RNN (recurrent neural network)** — a network that reads a sequence step by step, carrying a running hidden state.
- **RoPE (rotary positional encoding)** — encoding position by rotating query and key vectors; standard in modern LLMs.
- **ROUGE** — a summarization metric scoring overlap with a human reference.
- **RULER** — a long-context benchmark testing reasoning over scattered facts, not just single-fact retrieval.

### S – T

- **Scaled dot-product attention** — attention scores divided by √d_k before softmax to keep gradients healthy.
- **Scaling laws** — the empirical rule that loss falls predictably as parameters, data, and compute grow.
- **Self-attention** — attention where queries, keys, and values all come from the same sequence.
- **Semantic search** — retrieval by embedding query and documents into vectors and comparing meaning.
- **seq2seq (sequence to sequence)** — the encoder–decoder pattern mapping an input sequence to an output sequence.
- **Sentiment analysis** — classifying the emotional polarity (positive/negative) of a text.
- **Skip-gram** — a word2vec variant that predicts context words from a center word.
- **Sliding-window attention** — limiting each token to attend to a local window, cutting the quadratic cost.
- **Speculative decoding** — speeding generation by drafting tokens with a small model and verifying them with the large one in parallel.
- **Stemming** — chopping word suffixes with blind rules to get a rough root.
- **Structured outputs** — model output constrained to a valid machine-readable schema such as JSON.
- **Subword tokenization** — splitting text into word pieces so common words stay whole and rare words break down.
- **T5** — an encoder–decoder transformer that casts every NLP task as text-in, text-out.
- **Term frequency (TF)** — how often a word appears in a single document.
- **TF-IDF** — term frequency weighted by inverse document frequency, downweighting common words.
- **Token** — the unit of text a model consumes (word, subword, or byte).
- **Teacher forcing** — feeding the true previous token (not the model's guess) as input during sequence training, giving a clean signal and parallel training.
- **Tokenization** — splitting text into tokens.
- **Topic modeling** — discovering hidden themes across a document collection without labels.
- **Transformer** — the attention-based architecture behind modern language, vision, and speech models.

### V – Z

- **Vanishing / exploding gradient** — gradients shrinking to nothing or blowing up over long sequences or deep stacks.
- **word2vec** — the 2013 method that learns word embeddings from context via skip-gram or CBOW.
- **Word embedding** — a dense vector representing a single word.
- **WordPiece** — a subword tokenizer (BERT) that merges pairs by corpus likelihood rather than raw frequency.
- **Zero-shot classification** — labeling text with categories the model was never explicitly trained on, often via NLI.
