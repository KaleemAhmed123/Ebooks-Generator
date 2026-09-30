## Optimization: training, stated plainly

- **Optimization** is the search for the input that makes a function smallest (or largest).
- In AI the function is the **loss** — a single number measuring how wrong the model is. Training means finding the weights that make the loss as small as possible.
- Everything else in this module — gradients, the chain rule, autodiff — exists to serve this one search.

### The landscape picture

- Imagine the loss as a hilly surface, one dimension per weight. High ground is bad (large error); valleys are good.
- Training is a blindfolded walk downhill. You cannot see the whole surface — only the slope under your feet, which the gradient gives you.

<svg viewBox="0 0 300 120" role="img" aria-label="A loss curve with a starting point high on the slope and an arrow stepping down toward the lowest valley" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <line x1="20" y1="100" x2="285" y2="100" stroke="#1a1a1a"/>
  <text x="150" y="115" text-anchor="middle" fill="#6b6b6b">weight value →</text>
  <text x="12" y="30" fill="#6b6b6b" transform="rotate(-90 12 30)">loss →</text>
  <path d="M25 30 Q80 110 150 88 Q220 66 275 95" fill="none" stroke="#24405e" stroke-width="2"/>
  <circle cx="60" cy="72" r="4" fill="#c0392b"/><text x="60" y="64" text-anchor="middle" fill="#c0392b">start</text>
  <circle cx="150" cy="88" r="4" fill="#1a3a2a"/><text x="150" y="80" text-anchor="middle" fill="#1a3a2a">minimum</text>
  <path d="M68 74 L138 86" stroke="#1a1a1a" stroke-dasharray="3 2" marker-end="url(#o)"/>
  <defs><marker id="o" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::warn
Real loss surfaces are not a single clean valley. They have many dips (**local minima**), flat plains (where the gradient is near zero and progress stalls), and cliffs. Most of optimization is coping with a landscape you cannot see.
:::
