## GPT from scratch: the BPE tokenizer

- A model reads token IDs, not text. **Byte-Pair Encoding (BPE)** (Booklet 3) builds the vocabulary by repeatedly merging the most frequent adjacent pair of symbols. Here is the whole trainer, runnable.

:::mint
```python
from collections import Counter

def train_bpe(text, vocab_size):
    ids = list(text.encode("utf-8"))                 # start from raw bytes (0..255)
    merges, nxt = {}, 256
    while nxt < vocab_size:
        pairs = Counter(zip(ids, ids[1:]))           # adjacent-pair counts
        if not pairs: break
        top = max(pairs, key=pairs.get)              # most frequent pair
        ids, merges[top], nxt = merge(ids, top, nxt), nxt, nxt + 1
    return merges

def merge(ids, pair, new_id):                        # replace pair with new token
    out, i = [], 0
    while i < len(ids):
        if i+1 < len(ids) and (ids[i], ids[i+1]) == pair:
            out.append(new_id); i += 2
        else: out.append(ids[i]); i += 1
    return out
```
:::

- **Starting from bytes** (0–255) means *any* text encodes with no "unknown token" — every character is at worst a sequence of byte tokens. Merges then build up common subwords ("ing", "the", " token") as single IDs, shrinking sequences.
- **Encoding** applies the learned merges in order; **decoding** maps IDs back to bytes and UTF-8-decodes. In production you'd use `tiktoken` (OpenAI) or Hugging Face `tokenizers` — this is the mechanism they implement in fast Rust.

:::warn
The self-check that catches a broken tokenizer: `decode(encode(text)) == text` for arbitrary Unicode, including emoji and non-Latin scripts. Byte-level BPE guarantees this round-trip because it can always fall back to raw bytes — but a naive character-level or word-level tokenizer *cannot*, and silently corrupts anything outside its vocabulary. Round-tripping is the one-line test every tokenizer must pass before you train on it.
:::
