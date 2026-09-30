## The Vision Transformer (ViT)

- The encoder in almost every VLM is a **Vision Transformer (ViT)** (Dosovitskiy et al., "An Image Is Worth 16×16 Words", 2020). You met it briefly in Booklet 2; here is the part that matters for VLMs.
- The idea is a refusal to invent anything new: treat an image exactly like a sentence. Cut it into fixed squares, call each square a "word," and feed the sequence to the ordinary transformer encoder from Booklet 3.

### From image to patch tokens
1. Split a 224×224 image into a grid of 16×16 patches → a 14×14 grid = **196 patches**.
2. Flatten each patch (16·16·3 = 768 numbers) and pass it through one linear layer → a 768-dim **patch embedding**. This is the "linear projection of flattened patches."
3. Add a learned **positional embedding** so the model knows where each patch sat.
4. Prepend one extra learnable **[CLS] token** whose final vector is used as a whole-image summary.

<svg viewBox="0 0 360 96" role="img" aria-label="An image is cut into a grid of patches, each becoming one token in a sequence" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <g stroke="#24405e" fill="#e8f4fd"><rect x="12" y="16" width="16" height="16"/><rect x="28" y="16" width="16" height="16"/><rect x="44" y="16" width="16" height="16"/><rect x="12" y="32" width="16" height="16"/><rect x="28" y="32" width="16" height="16"/><rect x="44" y="32" width="16" height="16"/><rect x="12" y="48" width="16" height="16"/><rect x="28" y="48" width="16" height="16"/><rect x="44" y="48" width="16" height="16"/></g>
  <text x="36" y="78" text-anchor="middle" font-size="6" fill="#6b6b6b">image → patches</text>
  <path d="M64 40 L96 40" stroke="#888" marker-end="url(#vt)"/>
  <g fill="#6a9bd0"><rect x="104" y="34" width="14" height="14" rx="2"/><rect x="122" y="34" width="14" height="14" rx="2"/><rect x="140" y="34" width="14" height="14" rx="2"/><rect x="158" y="34" width="14" height="14" rx="2"/></g>
  <text x="140" y="66" text-anchor="middle" font-size="6" fill="#6b6b6b">patch embeddings + position</text>
  <path d="M178 40 L206 40" stroke="#888" marker-end="url(#vt)"/>
  <rect x="212" y="24" width="70" height="34" rx="4" fill="#24405e"/><text x="247" y="45" text-anchor="middle" fill="#fff" font-size="7">transformer</text>
  <path d="M282 40 L308 40" stroke="#888" marker-end="url(#vt)"/>
  <rect x="314" y="28" width="40" height="26" rx="3" fill="#1a3a2a"/><text x="334" y="44" text-anchor="middle" fill="#fff" font-size="6">features</text>
  <defs><marker id="vt" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- The output is **196 feature vectors**, one per patch — a spatial map of what is where. A VLM ignores the [CLS] summary and hands the LLM the full patch grid, because "the cat is *top-left*" needs every patch, not one average.

:::note
One number governs cost for the rest of this module: **patch count = (height/patch) × (width/patch)**. It is the length of the visual sequence, and attention cost grows with the *square* of sequence length. Double the resolution → 4× the patches → ~16× the attention cost. Every "high-resolution VLM" trick later is a way to dodge this bill.
:::
