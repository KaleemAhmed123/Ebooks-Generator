## GPT and causal language modeling

- **GPT** (Generative Pretrained Transformer, OpenAI, 2018 onward) is a **decoder-only** transformer — the generating half. Every mainstream LLM in 2026 is this design.
- Its pretraining objective is the simplest possible: **predict the next token**, over and over, on a huge pile of text. Given *"the cat sat on the"*, learn to predict *"mat"*.

:::mint
```
input:    the   cat   sat   on   the
predict:  cat   sat   on   the   mat
# causal mask: each position predicts the next, seeing only the past
```
:::

- That is it. No labels, no special task — just next-token prediction (causal language modeling) at scale. To generate, you feed the model's own output back in and repeat.

### Why "just predict the next word" is enough

- To predict the next token well across the whole internet, a model must implicitly learn grammar, facts, translation, arithmetic, and reasoning — because all of those show up as next-token patterns.
- Scale this objective up (more data, more parameters) and qualitatively new abilities **emerge** — few-shot learning, instruction following — without being trained for directly. This is the discovery that GPT-3 made undeniable and that Booklet 4 builds on.

:::note
The split is now complete. **BERT (encoder)** understands with full bidirectional context but can't generate. **GPT (decoder)** generates with causal, left-to-right context and became the foundation of the LLM era. Same transformer block; the training objective — fill the gap vs. predict the next — decides everything the model can do.
:::
