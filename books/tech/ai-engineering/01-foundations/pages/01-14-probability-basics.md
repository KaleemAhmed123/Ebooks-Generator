## Probability: the math of uncertain answers

- Models rarely output a fact. They output a **probability** — a number from 0 to 1 saying how likely something is. "0.83 cat" means the model is 83% confident.
- A **random variable** is a quantity whose value is uncertain: the label of the next image, the next word in a sentence.
- Probabilities over all possible outcomes must add up to exactly 1. Something has to happen.

### Three rules you will actually use

- **Complement** — the chance an event does *not* happen is `1 − P(event)`.
- **Joint** — the chance two independent events both happen is `P(A) × P(B)`.
- **Conditional** — `P(A | B)` is the chance of A *given that* B already happened. The bar means "given". This one underlies almost every model decision.

<svg viewBox="0 0 300 96" role="img" aria-label="A probability distribution over four classes as bars summing to one" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <line x1="30" y1="78" x2="290" y2="78" stroke="#1a1a1a"/>
  <rect x="45" y="20" width="40" height="58" fill="#24405e"/><text x="65" y="90" text-anchor="middle">cat</text><text x="65" y="16" text-anchor="middle" fill="#24405e">.83</text>
  <rect x="105" y="62" width="40" height="16" fill="#7d97b8"/><text x="125" y="90" text-anchor="middle">dog</text><text x="125" y="58" text-anchor="middle" fill="#6b6b6b">.10</text>
  <rect x="165" y="70" width="40" height="8" fill="#7d97b8"/><text x="185" y="90" text-anchor="middle">fox</text><text x="185" y="66" text-anchor="middle" fill="#6b6b6b">.05</text>
  <rect x="225" y="74" width="40" height="4" fill="#7d97b8"/><text x="245" y="90" text-anchor="middle">owl</text><text x="245" y="70" text-anchor="middle" fill="#6b6b6b">.02</text>
  <text x="160" y="12" text-anchor="middle" fill="#1a3a2a">the four bars sum to 1.00</text>
</svg>

:::note
A classifier's final layer outputs exactly this: a probability for every class, summing to 1. The function that forces a list of raw scores into such a distribution is **softmax**, covered in the classical-ML module.
:::
