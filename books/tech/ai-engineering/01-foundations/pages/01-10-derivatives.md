## The derivative: slope at a point

- A **derivative** answers one question: if I nudge the input a tiny bit, how much does the output move, and in which direction?
- It is the **slope** of the function at a single point. Positive slope: output rises as input rises. Negative: it falls. Zero: flat.
- Written `f'(x)` or `df/dx`.

<svg viewBox="0 0 300 140" role="img" aria-label="A curve with a tangent line touching it at one point, showing the derivative as the slope of that tangent" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="10" fill="#1a1a1a">
  <line x1="20" y1="120" x2="285" y2="120" stroke="#1a1a1a"/>
  <line x1="20" y1="120" x2="20" y2="10" stroke="#1a1a1a"/>
  <path d="M25 115 Q120 115 160 70 Q200 25 275 20" fill="none" stroke="#24405e" stroke-width="2"/>
  <line x1="120" y1="105" x2="210" y2="55" stroke="#c0392b" stroke-width="1.5"/>
  <circle cx="165" cy="80" r="3.5" fill="#1a3a2a"/>
  <text x="205" y="50" fill="#c0392b">slope = f'(x)</text>
  <text x="150" y="100" fill="#1a3a2a">the point</text>
</svg>

### Why training depends on it

- A model's error is a function of its weights. The derivative of the error with respect to a weight tells you **which way to change that weight to reduce the error**.
- That is the entire signal used to train every neural network. No derivative, no learning.

:::note
The rule you use most is the power rule: the derivative of `xⁿ` is `n·xⁿ⁻¹`. So the derivative of `x²` is `2x` — at `x = 3` the slope is 6. You rarely differentiate by hand in practice; the next pages show why.
:::
