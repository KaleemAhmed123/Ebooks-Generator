## Pretraining a mini-GPT

- Pretraining is one loop you already know (Booklet 2): predict the next token, measure the loss, step the optimizer. At scale it is the same code with more data and more GPUs.
- The objective is **causal language modelling** (Booklet 3, page 07-14): for every position, predict the next token; the loss is cross-entropy against the true next token.

:::mint
```python
for batch in data:                      # batch: [B, T] token ids
    logits = model(batch[:, :-1])       # predict each next token
    loss = cross_entropy(logits.flatten(0,1),
                         batch[:, 1:].flatten())   # shift by one
    loss.backward(); optimizer.step(); optimizer.zero_grad()
```
:::

- One clever detail: the target is just the input **shifted by one**. Every token is both an input and, one step later, a label. A single sequence gives `T` training signals — no manual labelling at all. This is why it is called **self-supervised**.

<svg viewBox="0 0 314 46" role="img" aria-label="Inputs The cat sat predict targets cat sat on, each token supervising the next" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <text x="20" y="18">input:</text><text x="70" y="18" fill="#24405e">The</text><text x="110" y="18" fill="#24405e">cat</text><text x="150" y="18" fill="#24405e">sat</text>
  <text x="20" y="38">target:</text><text x="70" y="38" fill="#1a3a2a">cat</text><text x="110" y="38" fill="#1a3a2a">sat</text><text x="150" y="38" fill="#1a3a2a">on</text>
  <path d="M78 22 L108 34" stroke="#c0392b"/><path d="M118 22 L148 34" stroke="#c0392b"/>
  <text x="240" y="28" fill="#6b6b6b" font-size="7">shift-by-one = free labels</text>
</svg>

- Loss is measured in **perplexity** — roughly, how many tokens the model is "choosing between" at each step. Lower is better; it falls fast early, then crawls, following the scaling laws (Booklet 3, page 07-20).

:::warn
Scale changes everything. At billions of parameters a single bad hyperparameter, a NaN from numerical overflow, or a hardware failure can waste days of compute worth six figures. Real pretraining is 90% **babysitting the run** — checkpointing, loss-spike recovery, and mixed-precision stability — not the loop above.
:::
