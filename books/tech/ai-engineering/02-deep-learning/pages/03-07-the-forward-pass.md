## The forward pass

- The **forward pass** is running an input through the network to get an output. Layer by layer, in order.
- Each layer does the same three things: multiply by weights, add the bias, apply the activation. The last layer produces the prediction.
- Everything the network "knows" sits in the weights. The forward pass just applies them.

<svg viewBox="0 0 400 90" role="img" aria-label="Data x flows through layer one then layer two to produce a prediction, each layer applying activation of X times W plus b" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="10" y="35" width="40" height="22" rx="3" fill="#24405e"/><text x="30" y="50" text-anchor="middle" fill="#fff">x</text>
  <rect x="110" y="28" width="90" height="36" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="155" y="50" text-anchor="middle">act(x·W1+b1)</text>
  <rect x="250" y="28" width="90" height="36" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="295" y="50" text-anchor="middle">act(h·W2+b2)</text>
  <rect x="360" y="35" width="34" height="22" rx="3" fill="#1a3a2a"/><text x="377" y="50" text-anchor="middle" fill="#fff">ŷ</text>
  <g stroke="#1a1a1a"><path d="M50 46 L108 46" marker-end="url(#f)"/><path d="M200 46 L248 46" marker-end="url(#f)"/><path d="M340 46 L358 46" marker-end="url(#f)"/></g>
  <text x="224" y="42" text-anchor="middle" fill="#6b6b6b">h</text>
  <defs><marker id="f" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::mint
```python
def forward(x, params, act):
    h = act(x @ params["W1"] + params["b1"])   # hidden layer
    return h @ params["W2"] + params["b2"]      # output (raw scores)
```
:::

:::note
Nothing learns during the forward pass — it is pure evaluation. Learning needs a second, backward pass, and that needs one number saying how wrong the output was. That number is the **loss**, next page.
:::
