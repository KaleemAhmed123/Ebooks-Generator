## Derivatives, gradients, and the chain rule

- A **derivative** `f'(x)` is the slope of `f` at `x` — how much `f(x)` changes when you nudge `x` by an infinitesimal amount. Geometrically, it is the slope of the tangent line at that point
- A **gradient** `∇f` collects all partial derivatives of a multi-variable function into one vector. It points in the direction of steepest ascent. To minimize `f`, move in the direction of `-∇f`
- The **chain rule**: if `y = f(g(x))`, then `dy/dx = f'(g(x)) · g'(x)`. Multiply local derivatives along the composition chain. This is the mathematical basis of backpropagation

### The gradient descent update

<svg viewBox="0 0 460 96" role="img" aria-label="Loss curve with gradient showing downhill direction; weight update moves in negative gradient direction by learning rate" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <text x="8" y="14">L(w)</text>
  <path d="M40 80 Q120 20 200 60 Q280 90 360 30 Q400 10 440 16" fill="none" stroke="#1a1a1a" stroke-width="1.5"/>
  <circle cx="200" cy="60" r="4" fill="#24405e"/>
  <line x1="200" y1="60" x2="240" y2="44" stroke="#24405e" stroke-width="1.5" marker-end="url(#bn)"/>
  <line x1="200" y1="60" x2="160" y2="76" stroke="#e04040" stroke-width="1.5" marker-end="url(#br)"/>
  <text x="248" y="42" font-size="8.5" fill="#24405e">+∇L (uphill)</text>
  <text x="90" y="84" font-size="8.5" fill="#e04040">−η∇L (step)</text>
  <text x="190" y="52" font-size="8">w</text>
  <text x="8" y="90" fill="#6b6b6b" font-size="8.5">w_new = w − η · dL/dw</text>
  <defs>
    <marker id="bn" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#24405e"/></marker>
    <marker id="br" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#e04040"/></marker>
  </defs>
</svg>

### Chain rule through a two-layer network

:::mint
```
Forward:  a = W₁x,  h = relu(a),  ŷ = W₂h,  L = loss(ŷ, y)

Backward (chain rule):
  dL/dW₂ = dL/dŷ · h
  dL/dh  = dL/dŷ · W₂
  dL/da  = dL/dh · relu'(a)      # 1 if a>0, else 0
  dL/dW₁ = dL/da · x
```
:::

Each gradient is a product of all downstream gradients times the local derivative at that node. The chain never breaks — that is why deep networks can be trained at all.
