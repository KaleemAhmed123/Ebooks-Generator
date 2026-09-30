## Flamingo: cross-attention inside the LLM

- LLaVA and BLIP-2 add visual tokens at the *input*. **Flamingo** (Alayrac et al., DeepMind, 2022) fuses deeper: it leaves the LLM's own layers frozen but **inserts brand-new cross-attention layers between them**, so the language model consults the image again and again as it reasons.
- This is how you fuse deeply *without* unfreezing (and risking) a huge pretrained LLM. The frozen LLM keeps all its language skill; the new layers learn to look.

<svg viewBox="0 0 360 122" role="img" aria-label="New gated cross-attention layers are interleaved between frozen language model layers" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="120" y="10" width="120" height="16" rx="2" fill="#dde" stroke="#888"/><text x="180" y="22" text-anchor="middle" font-size="6">frozen LM layer ❄</text>
  <rect x="120" y="30" width="120" height="16" rx="2" fill="#24405e"/><text x="180" y="42" text-anchor="middle" fill="#fff" font-size="6">gated cross-attn 🔥</text>
  <rect x="120" y="50" width="120" height="16" rx="2" fill="#dde" stroke="#888"/><text x="180" y="62" text-anchor="middle" font-size="6">frozen LM layer ❄</text>
  <rect x="120" y="70" width="120" height="16" rx="2" fill="#24405e"/><text x="180" y="82" text-anchor="middle" fill="#fff" font-size="6">gated cross-attn 🔥</text>
  <rect x="120" y="90" width="120" height="16" rx="2" fill="#dde" stroke="#888"/><text x="180" y="102" text-anchor="middle" font-size="6">frozen LM layer ❄</text>
  <rect x="20" y="46" width="64" height="34" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="52" y="60" text-anchor="middle" font-size="6">image</text><text x="52" y="71" text-anchor="middle" font-size="6">features</text>
  <path d="M84 54 L118 40" stroke="#a03050" marker-end="url(#fl)"/><path d="M84 66 L118 80" stroke="#a03050" marker-end="url(#fl)"/>
  <defs><marker id="fl" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#a03050"/></marker></defs>
</svg>

### The gate is the clever part
- Each new cross-attention layer is multiplied by a **tanh gate** whose value starts at **0**. At step 0 the layer contributes nothing, so the model behaves *exactly* like the original frozen LLM — no damage. As training proceeds the gate opens, and the model learns to blend in vision smoothly.
- Flamingo also handles **interleaved** image-text (photo, caption, photo, caption…), which unlocked **few-shot** visual prompting: show two labeled examples in the prompt, then a third image to label.

:::note
The zero-initialized gate is a pattern worth stealing: when you bolt a new module onto a pretrained network, start it as a no-op so early training cannot wreck what already works. The same idea reappears in LoRA adapters (Booklet 4) and in Llama's vision cross-attention.
:::
