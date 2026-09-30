## The bias–variance tradeoff

- Every model error splits into two kinds, and reducing one tends to raise the other.
- **Bias** — error from a model too simple to capture the pattern. It **underfits**: wrong on training and test alike.
- **Variance** — error from a model so flexible it memorizes the training data's noise. It **overfits**: great on training, poor on test.

<svg viewBox="0 0 380 108" role="img" aria-label="Three fits to the same points: underfit straight line, good fit smooth curve, overfit wiggly curve through every point" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <g transform="translate(0,0)">
    <circle cx="25" cy="70" r="2" fill="#24405e"/><circle cx="45" cy="55" r="2" fill="#24405e"/><circle cx="65" cy="60" r="2" fill="#24405e"/><circle cx="85" cy="40" r="2" fill="#24405e"/><circle cx="105" cy="45" r="2" fill="#24405e"/>
    <line x1="20" y1="68" x2="110" y2="42" stroke="#c0392b" stroke-width="1.5"/>
    <text x="65" y="98" text-anchor="middle" font-weight="bold">underfit</text><text x="65" y="14" text-anchor="middle" fill="#6b6b6b">high bias</text>
  </g>
  <g transform="translate(130,0)">
    <circle cx="25" cy="70" r="2" fill="#24405e"/><circle cx="45" cy="55" r="2" fill="#24405e"/><circle cx="65" cy="60" r="2" fill="#24405e"/><circle cx="85" cy="40" r="2" fill="#24405e"/><circle cx="105" cy="45" r="2" fill="#24405e"/>
    <path d="M20 72 Q60 50 110 44" fill="none" stroke="#1a3a2a" stroke-width="1.5"/>
    <text x="65" y="98" text-anchor="middle" font-weight="bold">good fit</text><text x="65" y="14" text-anchor="middle" fill="#1a3a2a">balanced</text>
  </g>
  <g transform="translate(260,0)">
    <circle cx="25" cy="70" r="2" fill="#24405e"/><circle cx="45" cy="55" r="2" fill="#24405e"/><circle cx="65" cy="60" r="2" fill="#24405e"/><circle cx="85" cy="40" r="2" fill="#24405e"/><circle cx="105" cy="45" r="2" fill="#24405e"/>
    <path d="M25 70 Q35 45 45 55 Q55 68 65 60 Q75 30 85 40 Q95 55 105 45" fill="none" stroke="#c0392b" stroke-width="1.5"/>
    <text x="65" y="98" text-anchor="middle" font-weight="bold">overfit</text><text x="65" y="14" text-anchor="middle" fill="#6b6b6b">high variance</text>
  </g>
</svg>

:::note
The tell is the gap between training and test scores. Both bad → high bias, add capacity. Training great but test poor → high variance, add data or regularization. This single diagnostic guides most model debugging.
:::
