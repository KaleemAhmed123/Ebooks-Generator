## LLaVA-1.5 → NeXT → OneVision

- The original LLaVA proved the recipe; three follow-ups turned it into a serious model. Each change is a lesson in what actually moves VLM quality.

| Version | Key changes | Lesson |
|---|---|---|
| **LLaVA-1.5** (late 2023) | 2-layer **MLP** projector (not linear); 336 px CLIP; added academic VQA/OCR data | Better data + a slightly bigger bridge beats architectural cleverness |
| **LLaVA-NeXT / 1.6** (early 2024) | **AnyRes** high-res (tile the image); more reasoning/OCR data | Resolution is a first-class lever — small text needs more patches |
| **LLaVA-OneVision** (2024) | One model for **single image, multi-image, and video**; transfer across them | A shared token interface lets one model span modalities and *transfer* skills between them |

<svg viewBox="0 0 360 82" role="img" aria-label="LLaVA improves by adding an MLP projector, then high resolution, then multi-image and video support" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="28" width="70" height="26" rx="3" fill="#eef" stroke="#24405e"/><text x="43" y="40" text-anchor="middle" font-size="6">LLaVA</text><text x="43" y="50" text-anchor="middle" font-size="5.5" fill="#6b6b6b">linear · 224</text>
  <rect x="100" y="28" width="70" height="26" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="135" y="40" text-anchor="middle" font-size="6">1.5</text><text x="135" y="50" text-anchor="middle" font-size="5.5" fill="#6b6b6b">MLP · 336</text>
  <rect x="192" y="28" width="70" height="26" rx="3" fill="#d5e8fb" stroke="#24405e"/><text x="227" y="40" text-anchor="middle" font-size="6">NeXT</text><text x="227" y="50" text-anchor="middle" font-size="5.5" fill="#6b6b6b">AnyRes</text>
  <rect x="284" y="28" width="70" height="26" rx="3" fill="#24405e"/><text x="319" y="40" text-anchor="middle" fill="#fff" font-size="6">OneVision</text><text x="319" y="50" text-anchor="middle" fill="#cdd" font-size="5.5">img·multi·video</text>
  <path d="M78 41 L98 41" stroke="#888" marker-end="url(#ev)"/><path d="M170 41 L190 41" stroke="#888" marker-end="url(#ev)"/><path d="M262 41 L282 41" stroke="#888" marker-end="url(#ev)"/>
  <defs><marker id="ev" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- Notice what did *not* change: the core projector-VLM design. The gains came from **data quality, resolution, and coverage** — not a new fusion mechanism. That is the field's central empirical lesson.

:::note
When someone asks how to make a VLM better, the ranked answers in 2026 are: (1) more and cleaner instruction data, (2) higher effective resolution, (3) a stronger base LLM, and only then (4) a fancier connector. Teams reach for (4) first and are usually wrong.
:::
