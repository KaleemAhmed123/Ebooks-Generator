## GPT from scratch: loading pretrained weights

- Training from scratch gives a *tiny* model. The payoff of matching the GPT-2 architecture exactly: you can load **real pretrained weights** and get a genuinely capable model, no training budget required.

:::mint
```python
from transformers import GPT2LMHeadModel   # pip install transformers

def load_gpt2_weights(model):
    hf = GPT2LMHeadModel.from_pretrained("gpt2").state_dict()
    ours = model.state_dict()
    # map HF names -> our names; transpose HF's Conv1D weights to Linear
    for k_hf, k_ours in name_map.items():
        w = hf[k_hf]
        if any(k_hf.endswith(s) for s in
               ("attn.c_attn.weight","attn.c_proj.weight","mlp.c_fc.weight","mlp.c_proj.weight")):
            w = w.t()                        # HF Conv1D stores transposed
        ours[k_ours].copy_(w)
    model.load_state_dict(ours)
    return model
```
:::

- **The lesson in the transpose.** GPT-2 stored its linear layers as `Conv1D` (weights transposed vs `nn.Linear`), so loading requires transposing four weight types. This is *exactly* the kind of shape-and-convention mismatch you hit converting real checkpoints — the reason weight loading is fiddly in practice, not a toy detail.
- **Eval.** Measure **perplexity** (exp of average cross-entropy — lower is better) on held-out text; generate samples and read them. A correctly loaded GPT-2 produces fluent English immediately; a broken load produces gibberish.

:::interview
"You built a GPT and can load GPT-2 weights. What does that prove you understand?"

The full stack in one artefact: tokenisation (byte-level BPE round-tripping), embeddings + positional encoding, causal multi-head attention with the mask that makes it generative, the residual/pre-norm block that makes depth trainable, weight tying, the cross-entropy training loop with clipping, and the naive generation loop that the KV cache later optimises. Loading real weights adds the production reality of checkpoint conventions (the Conv1D transpose). The point: I can reason about any GPT-family model — memory, scaling, serving cost — from the tensors up, not as a black box behind an API.
:::
