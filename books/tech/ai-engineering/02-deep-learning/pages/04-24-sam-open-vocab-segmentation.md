## SAM: promptable segmentation

- The **Segment Anything Model (SAM)** from Meta segments objects you *point at*, without a fixed class list. Click a spot, draw a box, or type a phrase, and it returns a clean mask.
- **SAM 3** (released 19 November 2025) added **promptable concept segmentation**: give a noun phrase like "yellow school bus" and it finds and masks *every* matching instance at once — where SAM 1 and 2 handled one object per prompt.
- It works on images and video, tracking the masked objects across frames. Meta trained it on the SA-Co dataset, spanning over 200,000 unique concepts.

<svg viewBox="0 0 330 100" role="img" aria-label="A prompt, either a point click or the text yellow bus, feeds SAM which outputs masks for every matching object" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="12" y="24" width="80" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="52" y="38" text-anchor="middle">point / box</text>
  <rect x="12" y="52" width="80" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="52" y="66" text-anchor="middle">"yellow bus"</text>
  <path d="M94 48 L128 48" stroke="#1a1a1a" marker-end="url(#sm)"/>
  <rect x="130" y="34" width="54" height="30" rx="3" fill="#24405e"/><text x="157" y="53" text-anchor="middle" fill="#fff">SAM 3</text>
  <path d="M186 48 L214 48" stroke="#1a1a1a" marker-end="url(#sm)"/>
  <rect x="222" y="22" width="90" height="56" fill="#f4f7fb" stroke="#c9d6e5"/>
  <rect x="232" y="34" width="30" height="24" fill="#1a3a2a" fill-opacity="0.7"/><rect x="270" y="40" width="30" height="24" fill="#1a3a2a" fill-opacity="0.7"/>
  <text x="267" y="90" text-anchor="middle" fill="#6b6b6b">all instances masked</text>
  <defs><marker id="sm" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::note
SAM is a **foundation model for segmentation**: one pretrained model that generalises to objects it never saw labelled, promptable in plain language. It replaces training a bespoke segmenter for every new class — the same shift from task-specific to general-purpose that CLIP brought to classification.
:::
