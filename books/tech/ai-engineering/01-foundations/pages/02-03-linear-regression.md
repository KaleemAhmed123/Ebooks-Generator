## Linear regression

- **Linear regression** predicts a number by fitting a straight line (or a flat plane, in more dimensions) through the data.
- The model is just a weighted sum of the inputs plus an offset: `y = w·x + b`. The weights `w` say how much each feature matters; `b` shifts the line.
- It is the simplest useful model, and the ancestor of every neural network — a single neuron with no activation is exactly this.

<svg viewBox="0 0 300 120" role="img" aria-label="Scatter of points with a best-fit straight line running through them" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <line x1="30" y1="100" x2="285" y2="100" stroke="#1a1a1a"/>
  <line x1="30" y1="100" x2="30" y2="12" stroke="#1a1a1a"/>
  <circle cx="60" cy="86" r="2.5" fill="#24405e"/><circle cx="95" cy="74" r="2.5" fill="#24405e"/><circle cx="120" cy="70" r="2.5" fill="#24405e"/><circle cx="150" cy="56" r="2.5" fill="#24405e"/><circle cx="185" cy="52" r="2.5" fill="#24405e"/><circle cx="215" cy="38" r="2.5" fill="#24405e"/><circle cx="250" cy="30" r="2.5" fill="#24405e"/>
  <line x1="45" y1="90" x2="265" y2="26" stroke="#c0392b" stroke-width="2"/>
  <text x="230" y="60" fill="#c0392b">y = w·x + b</text>
</svg>

### Why start here

- Its answer is **interpretable**: each weight is the effect of one feature, in plain units. "Each extra bedroom adds $40k."
- It trains fast and rarely overfits. It is the baseline every fancier model must beat before it earns its complexity.

:::note
"Linear" refers to the weights, not the data. By first transforming features (squaring, taking logs, crossing them), a linear model can fit curved relationships — which is why it stays useful far beyond straight lines.
:::
