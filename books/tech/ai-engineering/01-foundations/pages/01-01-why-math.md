# Module 1 - Math Foundations

## Why an engineer needs the math

- You can call an AI model without math. You cannot **fix** one without it.
- When a model won't learn, the answer is always in the math: a gradient went to zero, a loss diverged, a matrix was the wrong shape.
- This module teaches only the math that pays off later. No proofs for their own sake.

### The four ideas everything is built from

<svg viewBox="0 0 460 96" role="img" aria-label="Four math pillars feeding into training a model: linear algebra, calculus, probability, optimization" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <rect x="4" y="30" width="96" height="34" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="52" y="44" text-anchor="middle" font-weight="bold">Linear algebra</text>
  <text x="52" y="58" text-anchor="middle" fill="#6b6b6b">holds the data</text>
  <rect x="4" y="30" width="96" height="34" rx="3" fill="none" stroke="#1a1a1a" opacity="0"/>
  <rect x="118" y="4" width="96" height="34" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="166" y="18" text-anchor="middle" font-weight="bold">Calculus</text>
  <text x="166" y="32" text-anchor="middle" fill="#6b6b6b">finds the slope</text>
  <rect x="118" y="56" width="96" height="34" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="166" y="70" text-anchor="middle" font-weight="bold">Probability</text>
  <text x="166" y="84" text-anchor="middle" fill="#6b6b6b">handles doubt</text>
  <rect x="232" y="30" width="104" height="34" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="284" y="44" text-anchor="middle" font-weight="bold" fill="#24405e">Optimization</text>
  <text x="284" y="58" text-anchor="middle" fill="#24405e">walks downhill</text>
  <path d="M100 47 L118 24 M100 47 L118 70 M214 21 L232 41 M214 73 L232 53" stroke="#1a1a1a" fill="none"/>
  <path d="M336 47 L356 47" stroke="#24405e" fill="none" marker-end="url(#a)"/>
  <rect x="356" y="30" width="100" height="34" rx="3" fill="#1a3a2a" stroke="#1a3a2a"/>
  <text x="406" y="51" text-anchor="middle" fill="#fff" font-weight="bold">a trained model</text>
  <defs><marker id="a" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#24405e"/></marker></defs>
</svg>

- **Linear algebra** — the language of data in bulk. Every image, sentence, and sound becomes a grid of numbers.
- **Calculus** — measures how a small change in one number changes another. This is how a model knows which way to adjust.
- **Probability** — the math of uncertain answers. A model outputs "83% cat", not "cat".
- **Optimization** — the search for the numbers that make the model wrong the least often. Training *is* optimization.

:::note
You need working fluency, not a degree. If you can picture what an operation *does*, you can debug it. Every page here leads with the picture, then shows the code that proves it.
:::
