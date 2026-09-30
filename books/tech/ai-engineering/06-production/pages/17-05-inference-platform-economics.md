## The inference-platform market

- Between "provider API" and "run your own Kubernetes" sits a market of **inference platforms** — they run open weights for you on rented GPUs, with better developer experience than raw hardware. As of 2026 it splits three ways. **[VERIFY vendors/pricing]**

<svg viewBox="0 0 360 108" role="img" aria-label="Three market segments: custom silicon, GPU platforms, and API-first marketplaces" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="10" y="14" width="108" height="86" rx="4" fill="#f3ede8" stroke="#8a6d3b"/><text x="64" y="28" text-anchor="middle" font-size="7" fill="#8a6d3b">custom silicon</text>
  <text x="64" y="44" text-anchor="middle" font-size="6.5">Groq · Cerebras</text><text x="64" y="55" text-anchor="middle" font-size="6.5">SambaNova</text>
  <text x="64" y="72" text-anchor="middle" font-size="6" fill="#6b6b6b">5–10× faster decode</text><text x="64" y="83" text-anchor="middle" font-size="6" fill="#6b6b6b">latency king</text>
  <rect x="126" y="14" width="108" height="86" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="180" y="28" text-anchor="middle" font-size="7" fill="#24405e">GPU platforms</text>
  <text x="180" y="44" text-anchor="middle" font-size="6.5">Fireworks · Together</text><text x="180" y="55" text-anchor="middle" font-size="6.5">Baseten · Modal</text>
  <text x="180" y="72" text-anchor="middle" font-size="6" fill="#6b6b6b">NVIDIA H100/H200/B200</text><text x="180" y="83" text-anchor="middle" font-size="6" fill="#6b6b6b">the working default</text>
  <rect x="242" y="14" width="108" height="86" rx="4" fill="#eef3ee" stroke="#3b7a57"/><text x="296" y="28" text-anchor="middle" font-size="7" fill="#3b7a57">API-first</text>
  <text x="296" y="44" text-anchor="middle" font-size="6.5">Replicate · DeepInfra</text><text x="296" y="55" text-anchor="middle" font-size="6.5">OpenRouter · Fal</text>
  <text x="296" y="72" text-anchor="middle" font-size="6" fill="#6b6b6b">broad catalog</text><text x="296" y="83" text-anchor="middle" font-size="6" fill="#6b6b6b">multimodal reach</text>
</svg>

- **Custom silicon** (Groq LPU, Cerebras WSE, SambaNova) is non-GPU hardware built for fast decode — the production pick for voice agents and real-time translation where every millisecond shows.
- **GPU platforms** are the everyday choice: Fireworks tunes latency, Together tunes catalog breadth, Baseten tunes enterprise polish (SOC 2, HIPAA), Modal tunes Python-native deploy. They differ mostly in developer experience, attribution, and SLAs — not raw speed.
- **API-first marketplaces** optimise time-to-first-call and multimodal variety, priced per prediction or per second.

:::note
Most platforms above vLLM claim a "custom engine" (FireAttention, RayTurbo). Treat that as marketing gloss: **vLLM and SGLang are roughly 80% of production open-source inference.** The honest platform-layer differentiators are DX, cost attribution, and the SLA — not a secret kernel.
:::
