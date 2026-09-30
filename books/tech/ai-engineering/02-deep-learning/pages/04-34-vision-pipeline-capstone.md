## Vision pipeline: putting it together

- A real vision feature is never one model. It is a **pipeline**: ingest → preprocess → model(s) → post-process → serve. This page wires the module's pieces into one flow.
- Example task — a retail shelf auditor from a phone photo: detect products, read their labels, flag gaps.

<svg viewBox="0 0 340 100" role="img" aria-label="A pipeline: image in, resize and normalize, detector finds products, OCR reads labels, logic checks stock, result out" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <g fill="#e8f4fd" stroke="#24405e"><rect x="6" y="38" width="42" height="24" rx="2"/><rect x="58" y="38" width="52" height="24" rx="2"/><rect x="120" y="38" width="52" height="24" rx="2"/><rect x="182" y="38" width="44" height="24" rx="2"/><rect x="236" y="38" width="52" height="24" rx="2"/></g>
  <text x="27" y="53" text-anchor="middle">image</text><text x="84" y="53" text-anchor="middle">normalize</text><text x="146" y="53" text-anchor="middle">detect</text><text x="204" y="53" text-anchor="middle">OCR</text><text x="262" y="53" text-anchor="middle">stock check</text>
  <rect x="298" y="38" width="36" height="24" rx="2" fill="#1a3a2a"/><text x="316" y="53" text-anchor="middle" fill="#fff">report</text>
  <g stroke="#1a1a1a"><path d="M48 50 L56 50" marker-end="url(#pc)"/><path d="M110 50 L118 50" marker-end="url(#pc)"/><path d="M172 50 L180 50" marker-end="url(#pc)"/><path d="M226 50 L234 50" marker-end="url(#pc)"/><path d="M288 50 L296 50" marker-end="url(#pc)"/></g>
  <defs><marker id="pc" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- **Design choices that decide success**: which stages run on-device vs in the cloud (latency and privacy), what to do when a model is unsure (a confidence threshold routing hard cases to a human), and how to log inputs so failures can be reproduced.

:::note
The models are the easy part now — pretrained and downloadable. The engineering is the glue: shapes and colour formats between stages, latency budgets, confidence thresholds, and a fallback for every model that will, eventually, be wrong. That glue is the job.
:::
