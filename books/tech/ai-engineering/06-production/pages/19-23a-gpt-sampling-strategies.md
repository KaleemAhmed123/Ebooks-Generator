## GPT from scratch: sampling strategies

- The generation loop (19-22) sampled greedily (`argmax`) or from the raw distribution. Production decoding shapes that distribution with a few knobs that trade *coherence* against *diversity* — the sampling parameters every API exposes, built here.

:::mint
```python
def sample(logits, temperature=1.0, top_k=None, top_p=None):
    logits = logits / temperature                    # <1 sharpens, >1 flattens
    if top_k:                                         # keep only top-k tokens
        kth = torch.topk(logits, top_k)[0][..., -1, None]
        logits[logits < kth] = float("-inf")
    if top_p:                                         # nucleus: smallest set with cum prob ≥ p
        s, idx = torch.sort(logits, descending=True)
        cum = torch.softmax(s, -1).cumsum(-1)
        s[cum - torch.softmax(s, -1) > top_p] = float("-inf")
        logits = logits.scatter(-1, idx, s)
    return torch.multinomial(torch.softmax(logits, -1), 1)
```
:::

- **Temperature** scales the logits before softmax: below 1 sharpens toward the top token (more deterministic, coherent), above 1 flattens (more random, creative). Temperature 0 is greedy.
- **Top-k** keeps only the k most likely tokens; **top-p (nucleus)** keeps the smallest set whose cumulative probability reaches p — adapting the cutoff to how confident the model is (few tokens when sure, many when uncertain). Both prune the unreliable long tail of low-probability tokens that cause incoherence.

:::interview
"What do temperature, top-k, and top-p actually do, and when do you change them?"

They reshape the next-token distribution before sampling. **Temperature** sharpens (<1) or flattens (>1) it — low for factual/deterministic tasks (extraction, code, tool-calling), higher for creative writing. **Top-k** caps the candidate set at a fixed size; **top-p (nucleus)** caps it at a cumulative-probability mass, adapting to the model's confidence — both cut the unreliable tail that causes incoherence. Practically: for structured/factual output use low temperature + tight top-p (or greedy) for consistency and to make guided decoding well-behaved; for open-ended generation raise temperature and loosen top-p for diversity. Knowing these are *distribution-shaping* knobs, and matching them to task determinism, is the answer — not memorising default values.
:::
