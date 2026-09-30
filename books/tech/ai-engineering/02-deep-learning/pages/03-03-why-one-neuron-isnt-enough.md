## Why one neuron isn't enough

- A single perceptron draws **one straight line** and labels everything on one side "yes", the other side "no".
- That works only when the data is **linearly separable** — separable by a straight cut. It fails the moment the boundary must bend.
- The classic counter-example is **XOR** (output 1 when exactly one input is 1). No straight line separates its two classes.

<svg viewBox="0 0 320 150" role="img" aria-label="XOR plotted: points at (0,0) and (1,1) are class zero, points at (0,1) and (1,0) are class one; no straight line separates them" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <line x1="40" y1="120" x2="250" y2="120" stroke="#1a1a1a"/><line x1="40" y1="120" x2="40" y2="15" stroke="#1a1a1a"/>
  <text x="255" y="124" fill="#6b6b6b">x1</text><text x="30" y="14" fill="#6b6b6b">x2</text>
  <circle cx="70" cy="110" r="6" fill="#c0392b"/><text x="55" y="138">0,0</text>
  <circle cx="210" cy="30" r="6" fill="#c0392b"/><text x="200" y="24">1,1</text>
  <circle cx="70" cy="30" r="6" fill="#1a3a2a"/><text x="55" y="24">0,1</text>
  <circle cx="210" cy="110" r="6" fill="#1a3a2a"/><text x="200" y="138">1,0</text>
  <line x1="55" y1="20" x2="235" y2="130" stroke="#6b6b6b" stroke-dasharray="4 3"/>
  <text x="150" y="145" text-anchor="middle" fill="#6b6b6b">red = 0 · green = 1 · any line splits one colour</text>
</svg>

:::warn
Marvin Minsky and Seymour Papert proved this limit in 1969, and research funding for neural nets collapsed for over a decade — the first "AI winter". The fix already existed in principle: stack neurons into layers. It just wasn't trainable yet. Backpropagation (later this module) unlocked it.
:::
