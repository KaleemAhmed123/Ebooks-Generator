## Distributions: the shapes uncertainty takes

- A **distribution** describes how probability is spread across all possible values of a random variable.
- You do not need dozens. A handful cover almost everything in AI.

### The ones that keep showing up

| Distribution | Shape | Where you meet it |
|---|---|---|
| **Bernoulli** | one yes/no, prob `p` | a single binary label (spam / not) |
| **Categorical** | one pick from k classes | the softmax output of a classifier |
| **Gaussian (Normal)** | the bell curve | weight initialization, noise, embeddings |
| **Uniform** | every value equally likely | random seeds, dropout masks |

<svg viewBox="0 0 300 96" role="img" aria-label="A Gaussian bell curve centred on its mean with most mass within one standard deviation" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <line x1="20" y1="80" x2="285" y2="80" stroke="#1a1a1a"/>
  <path d="M25 80 Q90 80 120 40 Q150 8 180 40 Q210 80 275 80" fill="#e8f4fd" stroke="#24405e" stroke-width="2"/>
  <line x1="150" y1="80" x2="150" y2="20" stroke="#1a3a2a" stroke-dasharray="3 2"/>
  <text x="150" y="94" text-anchor="middle" fill="#1a3a2a">mean μ</text>
  <text x="205" y="72" fill="#6b6b6b">← spread = σ →</text>
</svg>

- The **Gaussian** is fixed by two numbers: its **mean** `μ` (where the centre sits) and its **standard deviation** `σ` (how wide the spread is).

:::note
Why the Gaussian is everywhere: the Central Limit Theorem says that sums of many small independent effects tend toward a bell curve, regardless of their individual shapes. Network weights, measurement noise, and initialization all inherit this shape.
:::
