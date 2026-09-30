## Activation functions

- The **activation** is the bend applied to each neuron's output. A handful dominate practice.
- **ReLU** — `max(0, x)`. Cheap, and its gradient never shrinks for positive inputs. The default for hidden layers.
- **Sigmoid** — squashes any number into `(0, 1)`; reads as a probability but saturates at the ends. **Tanh** — like sigmoid but `(-1, 1)` and zero-centred.
- **GELU** / **SiLU** — smooth ReLU-like curves that let a little negative signal through; standard inside transformers (Booklet 3).

<svg viewBox="0 0 340 130" role="img" aria-label="Graphs of ReLU as a hinge at zero, sigmoid as an S-curve between 0 and 1, and tanh as an S-curve between minus 1 and 1" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <g stroke="#1a1a1a"><line x1="20" y1="65" x2="110" y2="65"/><line x1="65" y1="15" x2="65" y2="115"/></g>
  <path d="M20 90 L65 90 L108 25" stroke="#24405e" fill="none" stroke-width="2"/><text x="65" y="128" text-anchor="middle" fill="#24405e">ReLU</text>
  <g stroke="#1a1a1a"><line x1="130" y1="65" x2="220" y2="65"/><line x1="175" y1="15" x2="175" y2="115"/></g>
  <path d="M132 100 C160 100 168 30 218 30" stroke="#24405e" fill="none" stroke-width="2"/><text x="175" y="128" text-anchor="middle" fill="#24405e">sigmoid</text>
  <g stroke="#1a1a1a"><line x1="240" y1="65" x2="330" y2="65"/><line x1="285" y1="15" x2="285" y2="115"/></g>
  <path d="M242 108 C268 108 272 22 328 22" stroke="#24405e" fill="none" stroke-width="2"/><text x="285" y="128" text-anchor="middle" fill="#24405e">tanh</text>
</svg>

:::warn
The **dying ReLU**: a neuron that outputs `0` for every input has zero gradient and can never recover — it is dead weight. Leaky ReLU (a small slope for negatives) or GELU avoids it. If many neurons read zero all the time, this is why.
:::
