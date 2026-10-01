## What's a loss landscape, and why do "flat" minima generalize better than "sharp" ones?

- The **loss landscape** is the surface of loss as a function of the weights. Training walks downhill on it; where you stop is a **minimum**.
- A **sharp** minimum sits in a narrow valley — a tiny shift in weights (or a slightly different test distribution) spikes the loss. A **flat** minimum sits in a wide basin — small perturbations barely change the loss.
- Generalisation intuition: test data shifts the landscape slightly. In a flat basin the solution stays good; in a sharp one it falls off the cliff. Flat ≈ robust.
- This explains several observations at once: SGD's noise and smaller batches bias toward flat minima; sharpness-aware minimisation (SAM) optimises for it directly; large-batch training can land in sharper minima and generalise worse.

<svg viewBox="0 0 260 72" role="img" aria-label="A wide flat basin and a narrow sharp valley; a small horizontal shift barely raises loss in the flat basin but spikes it in the sharp one" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <path d="M10 60 Q40 20 70 60" stroke="#c0392b" fill="none" stroke-width="2"/><text x="40" y="70" text-anchor="middle" fill="#c0392b">sharp</text>
  <path d="M120 60 Q170 44 220 60" stroke="#24405e" fill="none" stroke-width="2"/><text x="170" y="70" text-anchor="middle" fill="#24405e">flat</text>
  <text x="130" y="16" fill="#6b6b6b">wide basin = robust to shift</text>
</svg>

:::interview
What's really being tested:

the flat=robust-to-distribution-shift intuition, and that it ties together SGD noise, batch size, and SAM — a favourite "why does small batch help" follow-up.
:::
