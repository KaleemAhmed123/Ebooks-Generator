## Pixels, channels, and tensors

- A colour image is a 3-D tensor: **height × width × channels**. The three channels are red, green, blue; mixing them makes any colour.
- Deep-learning frameworks add a fourth axis at the front — the **batch** — so a batch of images is `(N, C, H, W)`: number, channels, height, width. PyTorch puts channels *before* height and width.
- Pixel values start as integers `0–255`. Models want small, centred numbers, so the first step is always to **normalize**: divide by 255, then subtract the mean and divide by the standard deviation.

:::mint
```python
import torch
img = torch.randint(0, 256, (3, 224, 224))      # one RGB image, C×H×W
batch = img.unsqueeze(0).float() / 255.0          # -> (1, 3, 224, 224)
mean = torch.tensor([0.485, 0.456, 0.406]).view(3,1,1)
std  = torch.tensor([0.229, 0.224, 0.225]).view(3,1,1)
batch = (batch - mean) / std                       # standard ImageNet norm
```
:::

- Those exact mean/std numbers are the ImageNet averages. Pretrained models expect them; feed raw `0–255` pixels and accuracy collapses.

:::warn
Channel order is a real trap. PyTorch uses channels-first `(C,H,W)`; libraries like OpenCV load images channels-**last** `(H,W,C)` and in **BGR**, not RGB. Mixing the two silently swaps colours and axes — the model runs and quietly predicts nonsense.
:::
