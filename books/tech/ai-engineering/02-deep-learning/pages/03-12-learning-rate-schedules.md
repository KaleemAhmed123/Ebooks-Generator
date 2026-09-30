## Learning-rate schedules

- The **learning rate** is the step size for each weight update. One fixed value rarely works from start to finish.
- Early on you want big steps to move fast; later you want tiny steps to settle into a good minimum without bouncing out.
- A **schedule** changes the learning rate over training. Two are near-universal today.

<svg viewBox="0 0 340 120" role="img" aria-label="A learning rate that rises quickly during warmup then decays along a cosine curve back toward zero" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <line x1="30" y1="100" x2="320" y2="100" stroke="#1a1a1a"/><line x1="30" y1="100" x2="30" y2="15" stroke="#1a1a1a"/>
  <text x="320" y="114" text-anchor="end" fill="#6b6b6b">steps</text><text x="14" y="20" fill="#6b6b6b">lr</text>
  <path d="M30 100 L80 25" stroke="#24405e" stroke-width="2" fill="none"/>
  <path d="M80 25 C170 30 250 90 315 98" stroke="#24405e" stroke-width="2" fill="none"/>
  <line x1="80" y1="100" x2="80" y2="25" stroke="#6b6b6b" stroke-dasharray="3 3"/>
  <text x="55" y="118" text-anchor="middle" fill="#6b6b6b">warmup</text>
  <text x="200" y="55" text-anchor="middle" fill="#24405e">cosine decay</text>
</svg>

- **Warmup** — start near zero and ramp up over the first few hundred steps. It stops a large early step from wrecking freshly-initialised weights.
- **Cosine decay** — after warmup, ease the rate down along a cosine curve toward zero. Smooth, and it needs no manual step-drops.

:::note
Warmup-then-cosine is the default recipe for training transformers and most modern vision models. If a big model diverges in the first hundred steps, the first thing to add is warmup.
:::
