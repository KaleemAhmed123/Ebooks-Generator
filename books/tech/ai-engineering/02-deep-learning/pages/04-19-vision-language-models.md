## Vision-language models

- A **vision-language model (VLM)** takes an image *and* text together and replies in text. Ask "what is unsafe in this photo?" and it answers in a sentence. This is what lets a chatbot see.
- The standard recipe bolts three parts together: a vision encoder (often a CLIP-style ViT), a language model (Booklet 4), and a small **projector** that translates image features into the token space the language model reads.
- The image becomes a handful of "visual tokens" prepended to the text tokens. From there the language model treats seeing and reading as one sequence.

<svg viewBox="0 0 340 100" role="img" aria-label="An image goes through a vision encoder and projector into visual tokens, which join text tokens as input to a language model that outputs text" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="10" y="34" width="30" height="30" fill="#24405e"/><text x="25" y="78" text-anchor="middle" fill="#6b6b6b">image</text>
  <rect x="52" y="36" width="46" height="26" rx="3" fill="#cfe0f0" stroke="#24405e"/><text x="75" y="52" text-anchor="middle">encoder</text>
  <rect x="108" y="36" width="46" height="26" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="131" y="52" text-anchor="middle">projector</text>
  <g fill="#3d6ea5"><rect x="166" y="40" width="10" height="18"/><rect x="178" y="40" width="10" height="18"/></g>
  <g fill="#6b6b6b"><rect x="192" y="40" width="10" height="18"/><rect x="204" y="40" width="10" height="18"/></g>
  <text x="190" y="78" text-anchor="middle" fill="#6b6b6b">visual + text tokens</text>
  <rect x="226" y="34" width="50" height="30" rx="3" fill="#1a3a2a"/><text x="251" y="53" text-anchor="middle" fill="#fff">LLM</text>
  <path d="M278 49 L306 49" stroke="#1a1a1a" marker-end="url(#vl)"/><text x="316" y="53">text</text>
  <defs><marker id="vl" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Open-weight families like **LLaVA** and **Qwen-VL** made this recipe reproducible; the leading closed chat assistants use the same shape at larger scale. Training is cheap relative to the language model: often only the projector and a light fine-tune are trained.

:::warn
VLMs **hallucinate about images** — they will confidently describe an object that is not there, especially for counting, reading small text, or precise spatial layout ("is the cup left of the plate?"). Treat their vision as a strong guess, not a measurement. For exact pixels, use a detector or segmenter.
:::
