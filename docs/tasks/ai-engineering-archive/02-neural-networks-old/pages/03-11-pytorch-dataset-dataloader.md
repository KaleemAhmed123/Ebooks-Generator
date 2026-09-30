## PyTorch Dataset and DataLoader — data pipeline in practice

- **`Dataset`** — abstract interface with two methods: `__len__()` returns total samples, `__getitem__(idx)` returns one sample. Subclass it to wrap any data source
- **`DataLoader`** — wraps a Dataset; handles batching, shuffling, and parallel loading via worker processes. The standard way to feed data into a training loop. Never load the entire dataset at once
- **`torch.no_grad()`** — context manager that disables gradient tracking. Use during validation and inference: saves memory (no computation graph built) and speeds up forward pass by ~30%

### Custom Dataset to DataLoader

:::mint
```python
from torch.utils.data import Dataset, DataLoader

class TabularDataset(Dataset):
    def __init__(self, X, y):
        self.X = torch.tensor(X, dtype=torch.float32)
        self.y = torch.tensor(y, dtype=torch.long)
    def __len__(self):  return len(self.X)
    def __getitem__(self, i):  return self.X[i], self.y[i]

loader = DataLoader(TabularDataset(X_train, y_train), batch_size=64, shuffle=True)
```
:::

### Saving and loading models

<svg viewBox="0 0 460 68" role="img" aria-label="Model persistence: state_dict saves weights to disk, load_state_dict restores them. Saving the whole model object is fragile and not recommended" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <rect x="4" y="14" width="200" height="44" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="104" y="30" text-anchor="middle" font-weight="bold">Save (correct)</text>
  <text x="104" y="46" text-anchor="middle" fill="#6b6b6b">torch.save(model.state_dict(), path)</text>
  <rect x="220" y="14" width="236" height="44" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="338" y="30" text-anchor="middle" font-weight="bold">Load (correct)</text>
  <text x="338" y="46" text-anchor="middle" fill="#6b6b6b">model.load_state_dict(torch.load(path))</text>
  <text x="212" y="42" text-anchor="middle" font-size="14">→</text>
</svg>

`state_dict()` is a plain dict of parameter names → tensors. Portable across Python versions and PyTorch minor versions. Saving the entire `model` object with `torch.save(model)` uses pickle — breaks when class definitions change.

### GPU-agnostic code pattern

```python
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = MyModel().to(device)

for x, y in loader:
    x, y = x.to(device), y.to(device)   # must match model device
    with torch.no_grad():
        preds = model(x)
```

:::note
`num_workers` in DataLoader spawns subprocesses for parallel data loading. On Windows, this requires the `if __name__ == "__main__":` guard — without it, each worker process re-imports the script and spawns more workers, looping infinitely. Start with `num_workers=0` and only increase it if the GPU is idle waiting for data (check with `nvidia-smi` during training).
:::
