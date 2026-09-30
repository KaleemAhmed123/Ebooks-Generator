## Overfitting in deep nets

- A deep network has millions of weights, so it can simply **memorise** the training set — scoring near-perfect on it while failing on anything new.
- The signal: training loss keeps dropping while validation loss (loss on held-out data it never trained on) starts rising. The gap is the overfitting.
- Deep nets overfit harder than classical models because they have the capacity to fit noise, not just pattern.

<svg viewBox="0 0 320 130" role="img" aria-label="Training loss falls steadily while validation loss falls then turns upward; the turning point is where overfitting begins" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <line x1="30" y1="105" x2="310" y2="105" stroke="#1a1a1a"/><line x1="30" y1="105" x2="30" y2="15" stroke="#1a1a1a"/>
  <text x="305" y="119" text-anchor="end" fill="#6b6b6b">epochs</text><text x="14" y="20" fill="#6b6b6b">loss</text>
  <path d="M30 30 C120 95 230 100 305 102" stroke="#24405e" stroke-width="2" fill="none"/>
  <path d="M30 45 C120 90 200 80 305 40" stroke="#c0392b" stroke-width="2" fill="none"/>
  <line x1="185" y1="82" x2="185" y2="105" stroke="#6b6b6b" stroke-dasharray="3 3"/>
  <text x="185" y="128" text-anchor="middle" fill="#6b6b6b">overfitting starts</text>
  <text x="250" y="98" fill="#24405e">train</text><text x="250" y="35" fill="#c0392b">val</text>
</svg>

- The toolkit, in order of reach-for: **more data**, **data augmentation** (Module 4), **dropout**, **weight decay** (a penalty on large weights), and **early stopping** (halt at the validation low point).

:::note
Always watch validation loss, never training loss alone. A training loss of zero is not success — it is the clearest sign the model has memorised and will fail in the real world.
:::
