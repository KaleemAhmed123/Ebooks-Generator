## Logistic regression

- Despite the name, **logistic regression** is a *classifier* — it predicts a category, not a number.
- It takes the same weighted sum as linear regression, then squashes the result through the **sigmoid** function into a probability between 0 and 1.


<svg viewBox="0 0 300 100" role="img" aria-label="The sigmoid curve mapping any input to a value between 0 and 1, crossing 0.5 at the origin" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <line x1="20" y1="55" x2="285" y2="55" stroke="#ccc"/>
  <line x1="150" y1="15" x2="150" y2="90" stroke="#ccc"/>
  <path d="M25 85 Q110 85 150 55 Q190 25 275 25" fill="none" stroke="#24405e" stroke-width="2"/>
  <text x="278" y="22" fill="#6b6b6b">1</text><text x="278" y="90" fill="#6b6b6b">0</text>
  <circle cx="150" cy="55" r="3" fill="#c0392b"/><text x="150" y="48" text-anchor="middle" fill="#c0392b">0.5</text>
</svg>

- Output above 0.5 → class 1; below → class 0. The 0.5 line is the **decision boundary**.
- For more than two classes, its cousin **softmax** outputs a full probability distribution over all classes (the one from the probability page).

### Why it is everywhere

- It is fast, interpretable, and outputs calibrated probabilities, not just a label.
- Its loss is **cross-entropy** (Module 1), and it is trained by gradient descent — the exact template every neural classifier follows.

:::note
The final layer of most classification networks *is* softmax logistic regression sitting on top of learned features. Understand this page and you understand the last layer of a deep model.
:::
