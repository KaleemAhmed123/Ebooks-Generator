## Glossary: Q – R

| Term | Means | In |
|---|---|---|
| **Quantization** | storing weights or activations at lower precision (e.g. 8-bit) to shrink and speed a model | B2 · B4 |
| **query engine (LlamaIndex)** | Object that answers questions over an index by retrieving relevant chunks and generating a grounded answer | B5 |
| **Query, Key, Value** | the three vectors each token projects into: what it seeks, what it offers, and what it passes on | B3 |
| **Query rewriting** | transforming a user's query (clarify, decompose, expand) before retrieval to improve results | B4 |
| **Qwen-VL** | Alibaba VLM family with dynamic resolution and native grounding (returns coordinates), favoured for GUI agents | B5 |
| **RadixAttention** | SGLang's technique caching the KV of shared prefixes in a tree so common context is computed once | B4 · B6 |
| **RAGAS** | a framework that scores RAG quality, including faithfulness and answer relevance, often via LLM-as-a-judge | B4 |
| **RAG (retrieval-augmented generation)** | fetching relevant documents and putting them in the prompt so the model answers from real text | B4 |
| **Random forest** | many decision trees bagged together and voting | B1 |
| **Random variable** | a quantity whose value is uncertain | B1 |
| **rate limiting** | Capping a caller's request or token rate (RPM/TPM) to protect the system and budget; typically enforced with a token bucket | B6 |
| **ReAct** | Reason+Act pattern: the model writes a thought, then an action, then reads the observation, repeating | B5 |
