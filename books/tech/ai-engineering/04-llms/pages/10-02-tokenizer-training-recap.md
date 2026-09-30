## Training the tokenizer

- Before any model trains, the **tokenizer** must exist — it defines the vocabulary of tokens the model predicts. Booklet 3 (page 05-24) covered how BPE works; here is what training one for a new model actually involves.
- The tokenizer is trained **on a sample of the pretraining data**, before the model. It learns which byte sequences are frequent enough to deserve their own token.

:::mint
```python
from tokenizers import ByteLevelBPETokenizer
tok = ByteLevelBPETokenizer()
tok.train(files=["corpus.txt"], vocab_size=50000,
          special_tokens=["<|endoftext|>", "<|pad|>"])
# now tok.encode("hello") -> a fixed list of integer ids
```
:::

- Three decisions bite later:
  - **Vocabulary size** — bigger vocab = shorter sequences (cheaper attention) but a larger embedding table and rarer tokens seen less often. Modern models sit at 100k–260k.
  - **Domain match** — a tokenizer trained on English shreds code, math, or other languages into many tokens, making them slow and costly (page 05-24's failure mode).
  - **Special tokens** — end-of-text, padding, and later chat-format markers must be reserved up front.

<svg viewBox="0 0 316 50" role="img" aria-label="A data sample trains the tokenizer, which fixes the vocabulary the model will predict over" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="10" y="16" width="72" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="46" y="29" text-anchor="middle">data sample</text>
  <rect x="118" y="16" width="80" height="20" rx="3" fill="#24405e"/><text x="158" y="29" text-anchor="middle" fill="#fff">train BPE</text>
  <rect x="236" y="16" width="72" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="272" y="29" text-anchor="middle">vocab (fixed)</text>
  <path d="M82 26 L116 26" stroke="#1a1a1a" marker-end="url(#t)"/><path d="M198 26 L234 26" stroke="#1a1a1a" marker-end="url(#t)"/>
  <defs><marker id="t" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::warn
The tokenizer is frozen for the model's life. Choose it wrong — too small a vocab, or trained on the wrong mix — and every downstream cost, context limit, and multilingual weakness is baked in permanently. You cannot re-tokenize a trained model.
:::
