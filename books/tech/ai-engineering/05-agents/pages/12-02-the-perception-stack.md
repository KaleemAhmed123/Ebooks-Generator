## The perception stack

- Every VLM, however fancy, is the same three-stage pipe. Learn the stages once and every model in this module is a swap of one part.

<svg viewBox="0 0 360 104" role="img" aria-label="Encode, project, fuse: the three stages shared by every vision-language model" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="6" y="30" width="46" height="40" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="29" y="53" text-anchor="middle" font-size="7">pixels</text>
  <rect x="74" y="28" width="66" height="44" rx="3" fill="#24405e"/><text x="107" y="47" text-anchor="middle" fill="#fff" font-size="7">1. encode</text><text x="107" y="60" text-anchor="middle" fill="#cdd" font-size="6">vision model</text>
  <rect x="162" y="28" width="66" height="44" rx="3" fill="#6a9bd0"/><text x="195" y="47" text-anchor="middle" fill="#fff" font-size="7">2. project</text><text x="195" y="60" text-anchor="middle" fill="#eef" font-size="6">into LLM space</text>
  <rect x="250" y="28" width="66" height="44" rx="3" fill="#1a3a2a"/><text x="283" y="47" text-anchor="middle" fill="#fff" font-size="7">3. fuse</text><text x="283" y="60" text-anchor="middle" fill="#cec" font-size="6">the LLM</text>
  <rect x="330" y="34" width="26" height="34" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="343" y="54" text-anchor="middle" font-size="6">text</text>
  <path d="M52 50 L72 50" stroke="#888" marker-end="url(#ps)"/><path d="M140 50 L160 50" stroke="#888" marker-end="url(#ps)"/><path d="M228 50 L248 50" stroke="#888" marker-end="url(#ps)"/><path d="M316 50 L328 50" stroke="#888" marker-end="url(#ps)"/>
  <text x="107" y="90" text-anchor="middle" font-size="6" fill="#6b6b6b">image → visual features</text>
  <text x="195" y="90" text-anchor="middle" font-size="6" fill="#6b6b6b">features → visual tokens</text>
  <text x="283" y="90" text-anchor="middle" font-size="6" fill="#6b6b6b">visual + text tokens → answer</text>
  <defs><marker id="ps" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **1. Encode.** A vision model (almost always a Vision Transformer, next page) turns the image into a grid of feature vectors — one vector per patch of the image. This is "seeing."
- **2. Project.** Those vision vectors live in the wrong space; the LLM only understands its own token embeddings. A **projector** (a small learned network) maps each vision vector into a vector the size and shape of an LLM token. Now the image is a handful of "visual tokens."
- **3. Fuse.** The visual tokens are dropped into the LLM's input sequence alongside the text tokens. The transformer attends over both at once. Answering a question about an image is now just next-token prediction over a mixed sequence.

:::note
Every architectural fight in this module is about **stage 2 and how it meets stage 3**. Bolt the visual tokens on the front (LLaVA)? Squeeze them through a learned bottleneck (BLIP-2)? Inject them via cross-attention deep inside the LLM (Flamingo)? Tokenize pixels the same way as text and skip the seam entirely (Chameleon)? Same three stages, four answers.
:::
