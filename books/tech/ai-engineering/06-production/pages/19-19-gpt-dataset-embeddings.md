## GPT from scratch: dataset and embeddings

- Training data is `(input, target)` pairs where the target is the input shifted by one — the model learns to predict the next token at every position. A **sliding window** over the token stream produces them.

:::mint
```python
from torch.utils.data import Dataset

class GPTDataset(Dataset):
    def __init__(self, ids, block): self.ids, self.block = torch.tensor(ids), block
    def __len__(self): return len(self.ids) - self.block
    def __getitem__(self, i):
        return (self.ids[i : i+self.block],        # x: tokens 0..n-1
                self.ids[i+1 : i+self.block+1])     # y: tokens 1..n (shifted)
```
:::

- **Embeddings turn IDs into vectors.** Two tables added together: a **token embedding** (what the token means) and a **positional embedding** (where it sits) — the model has no inherent order sense, so position must be injected (Booklet 3).

:::mint
```python
class Embeddings(nn.Module):
    def __init__(self, vocab, d_model, block):
        super().__init__()
        self.tok = nn.Embedding(vocab, d_model)   # id -> vector
        self.pos = nn.Embedding(block, d_model)   # position -> vector
    def forward(self, x):                          # x: (B,T) ids
        pos = torch.arange(x.size(1), device=x.device)
        return self.tok(x) + self.pos(pos)         # (B, T, d_model)
```
:::

- **Shapes to hold in your head:** input `(B, T)` → embeddings `(B, T, d_model)`, preserved through every layer until the final projection to `(B, T, vocab)` logits. Getting shapes right is 80% of making a model run.

:::note
The one-token-shift is the entire supervision signal of pretraining — no labels, just "predict the next token" over a corpus. That is why pretraining data is effectively unlimited (any text is training data) and why the objective is called self-supervised. Everything a base model knows, it learned from this single shifted-window task at scale; instruction-tuning and alignment (Flagship 2) only *shape* that base knowledge, they do not create it.
:::
