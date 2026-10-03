## Show-o and Janus-Pro

- Two more unified designs, each with a distinct trick worth naming.

### Show-o (2024)
- One transformer that runs **autoregression for text** and **discrete diffusion for images** in the same model. Discrete diffusion generates image tokens by iteratively *unmasking* them (predict all, keep the confident ones, repeat) instead of strictly left-to-right — faster than token-by-token autoregression, and it can use a masked-prediction objective familiar from BERT.

### Janus-Pro (DeepSeek, 2024–2025)
- The key insight: **reading and drawing want different visual features**, so do not force one encoder to do both. Janus **decouples** the visual path — a SigLIP-style encoder for *understanding*, a separate VQ-based encoder for *generation* — feeding one shared transformer.

<svg viewBox="0 0 360 92" role="img" aria-label="Janus uses a separate understanding encoder and generation encoder into one shared transformer" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="16" width="76" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="48" y="29" text-anchor="middle" font-size="6">understand enc</text>
  <rect x="10" y="56" width="76" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="48" y="69" text-anchor="middle" font-size="6">generate enc</text>
  <rect x="140" y="34" width="90" height="28" rx="4" fill="#24405e"/><text x="185" y="52" text-anchor="middle" fill="#fff" font-size="6.5">shared transformer</text>
  <rect x="272" y="24" width="80" height="18" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="312" y="36" text-anchor="middle" font-size="6">text answer</text>
  <rect x="272" y="50" width="80" height="18" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="312" y="62" text-anchor="middle" font-size="6">new image</text>
  <path d="M86 26 L138 42" stroke="#888" marker-end="url(#js)"/><path d="M86 66 L138 54" stroke="#888" marker-end="url(#js)"/><path d="M230 44 L270 34" stroke="#888" marker-end="url(#js)"/><path d="M230 50 L270 58" stroke="#888" marker-end="url(#js)"/>
  <defs><marker id="js" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- Janus's decoupling fixes a real problem: a single encoder tuned for understanding produces weak generation features and vice versa. Two small specialized encoders beat one conflicted one — a recurring lesson (compare Booklet 2's task-specific heads).

:::note
Three unified answers, three philosophies: Transfusion keeps images continuous (two losses), Show-o makes image generation faster with discrete diffusion (parallel unmasking), Janus keeps one loss regime but splits the *encoders* by job. The field has not converged — expect the winning frontier model to borrow from all three.
:::
