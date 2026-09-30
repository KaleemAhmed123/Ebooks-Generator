## A CNN end to end

- A **convolutional neural network (CNN)** stacks the pieces: convolution → activation → pooling, repeated, then a small MLP head that outputs class scores.
- The convolutional stack is the **feature extractor** — it turns pixels into a compact vector describing what is in the image. The head reads that vector and decides the class.
- Shape flows like a funnel: the grid shrinks (H, W fall) while the meaning deepens (channels rise).

<svg viewBox="0 0 380 100" role="img" aria-label="Image passes through convolution-pool blocks that shrink spatially and deepen in channels, then a flatten and dense head outputs class scores" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="8" y="30" width="34" height="44" fill="#24405e"/><text x="25" y="86" text-anchor="middle" fill="#6b6b6b">image</text>
  <rect x="70" y="34" width="28" height="36" fill="#3d6ea5"/><rect x="120" y="40" width="22" height="24" fill="#3d6ea5"/><rect x="164" y="44" width="16" height="16" fill="#3d6ea5"/>
  <text x="125" y="86" text-anchor="middle" fill="#6b6b6b">conv + pool blocks</text>
  <path d="M188 52 L214 52" stroke="#1a1a1a" marker-end="url(#ce)"/>
  <rect x="216" y="30" width="10" height="44" fill="#6b6b6b"/><text x="221" y="86" text-anchor="middle" fill="#6b6b6b">flatten</text>
  <path d="M232 52 L256 52" stroke="#1a1a1a" marker-end="url(#ce)"/>
  <rect x="258" y="34" width="60" height="36" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="288" y="56" text-anchor="middle">dense head</text>
  <path d="M320 52 L346 52" stroke="#1a1a1a" marker-end="url(#ce)"/>
  <rect x="348" y="38" width="28" height="28" rx="3" fill="#1a3a2a"/><text x="362" y="56" text-anchor="middle" fill="#fff">class</text>
  <defs><marker id="ce" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::mint
```python
net = nn.Sequential(
    nn.Conv2d(3, 16, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
    nn.Conv2d(16, 32, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
    nn.Flatten(),
    nn.Linear(32 * 56 * 56, 10))     # head: 10 classes
```
:::

:::warn
The `Linear` input size (`32*56*56`) must match the flattened feature-map size exactly, and that depends on every stride and pool before it. Get it wrong and you get a shape-mismatch error. Print the shape before the head, or use `nn.LazyLinear`, which infers it on the first pass.
:::
