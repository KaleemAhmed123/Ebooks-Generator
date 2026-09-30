## What CLIP gives a VLM — and where it fails

- CLIP is the eye in most VLMs (or its stronger cousin **SigLIP**, Google 2023, which swaps the softmax loss for a pairwise **sigmoid** loss so it trains well *without* giant batches). Know what these encoders are good and bad at, because their weaknesses become the VLM's weaknesses.

### What you get
- Patch features already aligned to language — the projector's job shrinks.
- Robust high-level semantics: objects, scenes, styles, rough relationships.

### Where it breaks
- **Blind to fine text.** CLIP is trained on short captions, so it reads gist, not the serial number on an invoice. Document VLMs need higher resolution and different data (later cluster).
- **Weak on precise counting and spatial layout.** "How many chairs?" and "is the cup left or right of the plate?" are classic CLIP failure zones.
- **Fixed low resolution.** Trained at 224 or 336 px. Feed it a 4K screenshot and detail is destroyed before the LLM ever sees it.
- **"Bag of concepts."** CLIP can match *dog* and *frisbee* to an image yet miss *dog catching frisbee* vs *dog ignoring frisbee* — it is weak on how concepts bind together.

<svg viewBox="0 0 360 78" role="img" aria-label="CLIP reads gist well but misses fine text, counts, and exact spatial relations" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="10" y="16" width="150" height="46" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="85" y="34" text-anchor="middle" font-size="8" fill="#1a3a2a">strong</text><text x="85" y="50" text-anchor="middle" font-size="6">objects · scenes · style · gist</text>
  <rect x="200" y="16" width="150" height="46" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="275" y="30" text-anchor="middle" font-size="8" fill="#a03050">weak</text><text x="275" y="44" text-anchor="middle" font-size="6">small text · counting</text><text x="275" y="55" text-anchor="middle" font-size="6">exact layout · fine detail</text>
</svg>

:::warn
A VLM cannot answer better than its encoder can see. If your product reads receipts and hallucinates the total, the fix is rarely a bigger LLM — it is a higher-resolution, document-tuned vision path. Diagnose perception before you blame reasoning.
:::
