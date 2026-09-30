## The PyTorch training loop

- The from-scratch loop, now in real PyTorch. This is the template you will reuse for the rest of the series.
- A **DataLoader** feeds the model shuffled batches and handles the batching for you.

:::mint
```python
from torch.utils.data import DataLoader
loader = DataLoader(dataset, batch_size=64, shuffle=True)
opt = torch.optim.AdamW(model.parameters(), lr=3e-4)
loss_fn = nn.CrossEntropyLoss()

for epoch in range(10):
    model.train()
    for x, y in loader:
        x, y = x.to(device), y.to(device)
        opt.zero_grad()
        loss = loss_fn(model(x), y)
        loss.backward()
        opt.step()
```
:::

- `CrossEntropyLoss` expects **raw scores** (called logits), not probabilities — it applies the softmax internally. Feeding it softmaxed values applies softmax twice and quietly hurts training.

:::note
Wrap validation in `with torch.no_grad():` and call `model.eval()` first. `no_grad` skips building the backward graph, which halves memory and speeds inference — you are not going to call `.backward()` on validation anyway.
:::
