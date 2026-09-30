## Subword tokenization and BPE

- Word tokenizers have a fatal gap: any word not in the vocabulary becomes `[UNK]` (unknown). Character tokenizers avoid that but make sequences painfully long. **Subword tokenization** splits the difference — common words stay whole, rare words break into pieces.
- *"tokenization"* → `token` + `ization`. Both pieces are reusable across thousands of words. Nothing is ever truly unknown.

### Byte-Pair Encoding (BPE)

- The dominant algorithm — GPT, Llama, Mistral, Qwen all use it. It *learns* the vocabulary from data:
  1. Start with single characters (or raw bytes).
  2. Count every adjacent pair; **merge the most frequent pair** into a new token.
  3. Repeat until you reach the target vocabulary size.

:::mint
```python
# one merge step: find and fuse the most common adjacent pair
pairs = Counter((a, b) for w in words for a, b in zip(w, w[1:]))
best = pairs.most_common(1)[0][0]     # e.g. ('t','h') -> 'th'
# merges are ordered; inference re-applies them in the same order
```
:::

- **Byte-level BPE** (GPT-2 onward) runs over the 256 raw bytes, so *any* text in any language or emoji encodes with **zero** unknown tokens. GPT-2's vocabulary is 50,257 tokens; newer OpenAI models use ~200k (the `o200k_base` vocabulary, as of September 2026).
- Cousins: **WordPiece** (BERT) merges by likelihood not raw frequency; **Unigram** (T5) starts big and prunes.

:::warn
Tokens are not words, and this leaks into behavior. A model "counting the r's in strawberry" struggles because it never sees letters — it sees the tokens `str`, `aw`, `berry`. Token counts, not word counts, drive **cost and context limits** (you pay per token). And a tokenizer trained mostly on English shreds other languages into many more tokens, making them slower and pricier to process.
:::
