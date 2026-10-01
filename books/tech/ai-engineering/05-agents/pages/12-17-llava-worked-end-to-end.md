## Worked: one question through a VLM

- Trace a single query end to end so the abstractions become concrete. Model: a LLaVA-style VLM at 336 px. Question: *"How many people are in this photo?"* over one image.

<svg viewBox="0 0 360 120" role="img" aria-label="An image becomes 576 visual tokens, joins the text prompt, and the LLM generates the answer token by token" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="10" width="60" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="38" y="24" text-anchor="middle" font-size="6">336×336 img</text>
  <rect x="8" y="42" width="60" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="38" y="56" text-anchor="middle" font-size="6">→ 24×24 patch</text>
  <rect x="8" y="74" width="60" height="22" rx="3" fill="#a03050"/><text x="38" y="88" text-anchor="middle" fill="#fff" font-size="6">→ 576 tokens</text>
  <rect x="110" y="42" width="120" height="30" rx="3" fill="#f4f4f4" stroke="#888"/><text x="170" y="55" text-anchor="middle" font-size="6">[576 visual] [How many</text><text x="170" y="66" text-anchor="middle" font-size="6">people…?]</text>
  <rect x="266" y="40" width="52" height="34" rx="4" fill="#24405e"/><text x="292" y="60" text-anchor="middle" fill="#fff" font-size="6.5">LLM</text>
  <rect x="330" y="46" width="24" height="22" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="342" y="60" text-anchor="middle" font-size="7">"3"</text>
  <path d="M68 57 L108 57" stroke="#888" marker-end="url(#we)"/><path d="M230 57 L264 57" stroke="#888" marker-end="url(#we)"/><path d="M318 57 L328 57" stroke="#888" marker-end="url(#we)"/>
  <text x="180" y="112" text-anchor="middle" font-size="6" fill="#6b6b6b">visual tokens are just more tokens in the same sequence the LLM predicts over</text>
  <defs><marker id="we" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

1. **Patchify.** 336÷14 = 24 patches per side → **24×24 = 576 patches**. CLIP encodes each → 576 feature vectors.
2. **Project.** The MLP maps all 576 to LLM-width vectors → **576 visual tokens**.
3. **Assemble the sequence.** `[576 visual tokens] + [tokenized "How many people are in this photo?"]`. In many chat templates the visual block sits where an `<image>` placeholder was.
4. **Generate.** The LLM runs ordinary causal decoding. Its attention lets each answer token look back over both the 576 visual tokens and the question. It emits `"3"`.

- Total prompt length ≈ 576 + ~10 text tokens. **The image is ~98% of the tokens** — and of the cost. That single fact drives every resolution and pooling decision in the next cluster.

:::interview
"A VLM call is suddenly 50× more expensive than a text call — why?"

Because an image is not one token; it is hundreds. At 336 px a single image is ~576 tokens before the user types a word, and high-res tiling multiplies that. You are billed for visual tokens like any other. Cost control in VLMs *is* visual-token control: resolution, tiling, and pooling.
:::
