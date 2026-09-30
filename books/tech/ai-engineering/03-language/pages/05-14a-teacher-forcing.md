## Teacher forcing

- Training a sequence model raises a chicken-and-egg problem: to predict token 5 the model needs tokens 1–4, but during training those are its *own* predictions, which start out wrong. Feed wrong inputs and it never learns. **Teacher forcing** breaks the loop.
- The trick: during training, feed the **true** previous token as input, not the model's guess. Every step gets a correct history to condition on, so the loss signal is clean from step one.

<svg viewBox="0 0 320 76" role="img" aria-label="During training the true previous word is fed as the next input; at inference the model's own output is fed back" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <text x="80" y="12" text-anchor="middle" fill="#1a3a2a">train: feed the truth</text>
  <rect x="20" y="20" width="46" height="16" rx="2" fill="#eafaf0" stroke="#1a3a2a"/><text x="43" y="31" text-anchor="middle">"a"(true)</text>
  <rect x="86" y="20" width="46" height="16" rx="2" fill="#24405e"/><text x="109" y="31" text-anchor="middle" fill="#fff">predict</text>
  <path d="M66 28 L84 28" stroke="#1a1a1a" marker-end="url(#tf)"/>
  <text x="240" y="12" text-anchor="middle" fill="#c0392b">infer: feed own output</text>
  <rect x="188" y="20" width="46" height="16" rx="2" fill="#fbeaea" stroke="#c0392b"/><text x="211" y="31" text-anchor="middle">"a"(guess)</text>
  <rect x="254" y="20" width="46" height="16" rx="2" fill="#24405e"/><text x="277" y="31" text-anchor="middle" fill="#fff">predict</text>
  <path d="M234 28 L252 28" stroke="#1a1a1a" marker-end="url(#tf)"/>
  <path d="M277 36 C277 52, 211 52, 211 36" stroke="#c0392b" fill="none" marker-end="url(#tf2)"/>
  <defs><marker id="tf" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker><marker id="tf2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#c0392b"/></marker></defs>
</svg>

- It also makes training **parallel**: with all true tokens known up front, every position can be scored at once (exactly how transformer decoders train, page 07-12), instead of waiting for one prediction to feed the next.

:::warn
Teacher forcing causes **exposure bias**: the model only ever trained on perfect histories, but at inference it must consume its own imperfect outputs. One early mistake lands it in a state it never saw in training, and errors compound (page 08-03). This train/inference mismatch is a known weakness — mitigations include scheduled sampling (mix in the model's own guesses during training).
:::
