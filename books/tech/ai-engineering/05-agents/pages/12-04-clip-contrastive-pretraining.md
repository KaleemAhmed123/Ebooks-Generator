## CLIP: teaching vision to speak text

- A raw ViT sees shapes but knows no words. **CLIP** (Contrastive Language-Image Pre-training, Radford et al., OpenAI, 2021) fixes that: it trains a vision encoder whose output lives in the *same space* as a text encoder's output. A picture of a dog and the string "a dog" land at nearly the same point.
- This alignment is why CLIP is the default VLM eye. Its patch features are already "language-shaped," so the projector's job (stage 2) is small.

### Two towers, one space
- **Image tower:** a ViT → one vector per image.
- **Text tower:** a transformer → one vector per caption.
- Train on ~400M image-caption pairs scraped from the web. No human labels — the caption *is* the label.

<svg viewBox="0 0 360 112" role="img" aria-label="Image and text encoders map into a shared space where matching pairs are close" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="10" y="16" width="56" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="38" y="29" text-anchor="middle" font-size="7">image</text>
  <rect x="10" y="72" width="56" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="38" y="85" text-anchor="middle" font-size="7">"a dog"</text>
  <rect x="86" y="14" width="52" height="24" rx="3" fill="#24405e"/><text x="112" y="29" text-anchor="middle" fill="#fff" font-size="6">ViT</text>
  <rect x="86" y="70" width="52" height="24" rx="3" fill="#a03050"/><text x="112" y="85" text-anchor="middle" fill="#fff" font-size="6">text enc</text>
  <circle cx="250" cy="54" r="40" fill="none" stroke="#bbb" stroke-dasharray="3,2"/><text x="250" y="20" text-anchor="middle" font-size="6" fill="#6b6b6b">shared space</text>
  <circle cx="248" cy="52" r="4" fill="#24405e"/><circle cx="256" cy="58" r="4" fill="#a03050"/>
  <text x="290" y="56" font-size="6" fill="#1a3a2a">close = match</text>
  <path d="M138 26 L208 46" stroke="#888" marker-end="url(#cl)"/><path d="M138 82 L208 62" stroke="#888" marker-end="url(#cl)"/>
  <defs><marker id="cl" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Zero-shot classification for free:** to label an image, embed it, embed the strings "a photo of a cat", "a photo of a dog", …, and pick the nearest. CLIP classifies categories it was never explicitly trained on, because it learned the *concept-to-word* map, not a fixed label list.

:::note
CLIP's real gift to VLMs is not the classifier. It is that after CLIP, a *patch* feature already carries meaning a language model can read. That head start is why the LLaVA line (later) can connect vision to an LLM with nothing more than a single linear layer.
:::
