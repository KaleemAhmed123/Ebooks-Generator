## Self-supervised vision

- Labels are expensive; raw images are nearly free. **Self-supervised learning (SSL)** trains on unlabelled images by inventing a task from the image itself.
- **Masked image modelling** (e.g. MAE) hides random patches and trains the model to paint them back. To fill a hole well, it must understand the whole scene.
- **Joint-embedding methods** show the model two augmented crops of one image and train it to place them at the same spot. **Contrastive** versions (e.g. SimCLR) also push *different* images apart; **self-distillation** versions (e.g. DINO) reach the same goal with no negative pairs.

<svg viewBox="0 0 330 100" role="img" aria-label="An image with several patches masked out, and an arrow to the same image reconstructed, showing masked image modelling" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <g stroke="#24405e" fill="#e8f4fd"><rect x="20" y="20" width="70" height="70"/></g>
  <g fill="#6b6b6b"><rect x="20" y="20" width="23" height="23"/><rect x="66" y="43" width="24" height="24"/><rect x="43" y="66" width="23" height="24"/></g>
  <text x="55" y="99" text-anchor="middle" fill="#6b6b6b">mask patches</text>
  <path d="M100 55 L140 55" stroke="#1a1a1a" marker-end="url(#ss)"/><text x="120" y="48" text-anchor="middle" fill="#6b6b6b">predict</text>
  <rect x="150" y="20" width="70" height="70" fill="#cfe0f0" stroke="#24405e"/><text x="185" y="99" text-anchor="middle" fill="#6b6b6b">reconstruct</text>
  <defs><marker id="ss" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- The trained backbone then transfers to real tasks with very few labels — the same transfer-learning idea, but the pretraining needed no human annotation at all.

:::note
This is the recipe behind modern foundation models in vision. Pretrain on hundreds of millions of unlabelled images, then fine-tune on a small labelled set. SSL is why "we have no labels" stopped being a dead end.
:::
