## Convolution explained

- A **convolution** slides a small grid of weights — a **kernel** or **filter** — across the image. At each position it multiplies overlapping numbers and sums them into one output value.
- The same kernel is reused at every position. So a 3×3 kernel is just 9 weights, no matter how big the image. This weight-sharing is why CNNs are small and fast.
- The output is a new grid, the **feature map**, showing where in the image that kernel's pattern appeared.

<svg viewBox="0 0 340 130" role="img" aria-label="A 3 by 3 kernel overlaid on the top-left of an image grid, producing one number in an output feature map" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <text x="70" y="14" text-anchor="middle" fill="#6b6b6b">image</text>
  <g stroke="#c9d6e5" fill="none"><rect x="20" y="20" width="100" height="100"/><path d="M40 20 L40 120M60 20 L60 120M80 20 L80 120M100 20 L100 120M20 40 L120 40M20 60 L120 60M20 80 L120 80M20 100 L120 100"/></g>
  <rect x="20" y="20" width="60" height="60" fill="#24405e" fill-opacity="0.18" stroke="#24405e" stroke-width="1.5"/>
  <text x="50" y="54" text-anchor="middle" fill="#24405e">kernel</text>
  <path d="M128 70 L165 70" stroke="#1a1a1a" marker-end="url(#cv)"/><text x="146" y="62" text-anchor="middle" fill="#6b6b6b">Σ</text>
  <text x="255" y="14" text-anchor="middle" fill="#6b6b6b">feature map</text>
  <g stroke="#c9d6e5" fill="none"><rect x="220" y="35" width="70" height="70"/><path d="M243 35 L243 105M266 35 L266 105M220 58 L290 58M220 81 L290 81"/></g>
  <rect x="220" y="35" width="23" height="23" fill="#1a3a2a" fill-opacity="0.7"/>
  <defs><marker id="cv" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::mint
```python
import torch.nn as nn
conv = nn.Conv2d(in_channels=3, out_channels=16, kernel_size=3, padding=1)
# 3 input channels -> 16 feature maps, each from its own 3x3 kernel
```
:::

:::warn
The kernel size sets the **receptive field** — how much of the image one output value can see. A 3×3 kernel sees almost nothing on its own. Depth is how CNNs see wide: stack many 3×3 convs and each layer's view of the original image grows.
:::
