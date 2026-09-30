## BLIP-2: freeze both towers

- Training a VLM end to end is expensive — the LLM alone is billions of parameters. **BLIP-2** (Li et al., Salesforce, 2023) asks: what if we freeze the vision encoder *and* the LLM, and train only a small bridge between them? The compute drops by orders of magnitude.
- The bridge is the **Q-Former** (Querying Transformer). It solves two problems at once: it *compresses* hundreds of patch features into a handful of tokens, and it *translates* them into something the frozen LLM can read.

<svg viewBox="0 0 360 104" role="img" aria-label="BLIP-2 freezes the image encoder and LLM and trains only the Q-Former bridge between them" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="8" y="34" width="60" height="34" rx="3" fill="#dde" stroke="#888"/><text x="38" y="50" text-anchor="middle" font-size="6">image</text><text x="38" y="61" text-anchor="middle" font-size="6">encoder ❄</text>
  <rect x="112" y="30" width="70" height="42" rx="4" fill="#24405e"/><text x="147" y="48" text-anchor="middle" fill="#fff" font-size="7">Q-Former</text><text x="147" y="61" text-anchor="middle" fill="#fc8" font-size="6">🔥 trained</text>
  <rect x="228" y="34" width="60" height="34" rx="3" fill="#dde" stroke="#888"/><text x="258" y="50" text-anchor="middle" font-size="6">LLM ❄</text><text x="258" y="61" text-anchor="middle" font-size="6">frozen</text>
  <rect x="308" y="38" width="44" height="26" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="330" y="54" text-anchor="middle" font-size="6">text</text>
  <path d="M68 51 L110 51" stroke="#888" marker-end="url(#bl)"/><path d="M182 51 L226 51" stroke="#888" marker-end="url(#bl)"/><path d="M288 51 L306 51" stroke="#888" marker-end="url(#bl)"/>
  <text x="147" y="90" text-anchor="middle" font-size="6" fill="#6b6b6b">❄ frozen = not updated · 🔥 = the only trained part</text>
  <defs><marker id="bl" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

### Two-stage training
1. **Representation stage** — connect the Q-Former to the frozen image encoder only. Train it (with image-text contrastive, matching, and captioning objectives) to pull out visual features that align with text.
2. **Generative stage** — connect the Q-Former's output to the frozen LLM. Train it to produce tokens the LLM turns into fluent captions and answers.

:::note
BLIP-2's legacy is the recipe, not the model. "Freeze the big pretrained pieces, train a cheap adapter" became the default way to build a VLM on a budget. Its weakness is the bottleneck: squeezing an image to ~32 tokens discards fine detail, which is why the field later swung back toward passing more patches through (LLaVA-NeXT, Qwen-VL).
:::
