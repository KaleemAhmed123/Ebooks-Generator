## Deploying a VLM

- Serving a VLM is serving an LLM (Booklet 4) plus a vision front-end, and the vision part dominates cost. The knobs, in the order they move the bill:

<svg viewBox="0 0 360 84" role="img" aria-label="Resolution, tiles, and pooling set the visual token count, which sets cost and latency" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="26" width="56" height="20" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="38" y="39" text-anchor="middle" font-size="6">resolution</text>
  <rect x="74" y="26" width="40" height="20" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="94" y="39" text-anchor="middle" font-size="6">tiles</text>
  <rect x="122" y="26" width="48" height="20" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="146" y="39" text-anchor="middle" font-size="6">pooling</text>
  <text x="182" y="40" font-size="7">→</text>
  <rect x="198" y="24" width="70" height="24" rx="3" fill="#a03050"/><text x="233" y="39" text-anchor="middle" fill="#fff" font-size="6">visual tokens</text>
  <text x="276" y="40" font-size="7">→</text>
  <rect x="292" y="24" width="60" height="24" rx="3" fill="#24405e"/><text x="322" y="35" text-anchor="middle" fill="#fff" font-size="6">$ + latency</text>
  <text x="180" y="66" text-anchor="middle" font-size="6" fill="#6b6b6b">everything upstream is a way to set the token count</text>
</svg>

- **Cap the visual tokens.** Set a max tile count and pool aggressively unless the task needs fine detail. This single choice can 4–10× your throughput.
- **Prefill is heavy.** Hundreds-to-thousands of visual tokens make the **prefill** stage (processing the prompt before generating) the cost center, not generation. KV-cache and paged attention (Booklet 3/4) matter as much here as in text serving.
- **Cache the vision pass.** If the same image is queried repeatedly (a document, a dashboard), encode it once and reuse the visual tokens across queries — do not re-encode per turn.
- **Batch by resolution.** Native-resolution models emit variable token counts; batching mixed sizes wastes padding. Group similar sizes. Open serving engines (vLLM, SGLang) increasingly support VLMs directly.
- **Right-size the model.** A 3B VLM on-device beats a 70B API call for simple captioning at a fraction of cost and latency. Match model size to task difficulty (the routing idea, Module 13).

:::interview
**"Your VLM feature is too slow and expensive. Where do you look first?"** Visual tokens. Count them: resolution × tiles ÷ pooling. Cut tiles, pool harder, cache the vision pass for repeated images, and drop to a smaller model where the task allows. Prefill over hundreds of image tokens — not generation — is usually the bottleneck, so shrinking the visual sequence is the highest-leverage fix.
:::
