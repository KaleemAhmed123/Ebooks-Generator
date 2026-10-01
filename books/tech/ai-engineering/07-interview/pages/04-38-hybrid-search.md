## What is hybrid search, and why combine dense and sparse retrieval?

- **Dense retrieval** (embeddings) matches *meaning* — it finds paraphrases and related concepts. But it can miss **exact** terms: a specific error code, product SKU, function name, or rare proper noun.
- **Sparse retrieval** (BM25 / keyword) matches *exact tokens* — great for those precise terms, acronyms, and out-of-vocabulary strings, but blind to synonyms and paraphrase.
- **Hybrid search** runs both and fuses the results, so you get semantic recall *and* exact-term precision. It reliably beats either alone on mixed real-world queries.
- Fusion is usually **RRF (reciprocal rank fusion)** — combine by rank, no score calibration needed — or a weighted score blend.

:::note
The classic failure hybrid fixes: a user searches for an exact error string like "ERR_1042". Dense retrieval returns semantically "similar" errors; BM25 nails the exact match. Together they cover both query styles.
:::

:::interview
What's really being tested: that dense = meaning, sparse = exact tokens, and that real queries need both — plus knowing RRF as the standard fusion method.
:::
